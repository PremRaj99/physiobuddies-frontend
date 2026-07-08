import { Moon, Sun, Sunset } from 'lucide-react';

export const DAYS_OF_WEEK = [
  'Monday',
  'Tuesday',
  'Wednesday',
  'Thursday',
  'Friday',
  'Saturday',
  'Sunday',
];

export const TIME_PERIODS = [
  { id: 'morning', label: 'Morning', icon: Sun, range: [6, 11] },
  { id: 'evening', label: 'Evening', icon: Sunset, range: [12, 17] },
  { id: 'night', label: 'Night', icon: Moon, range: [18, 23] },
];

export const SLOT_DURATION = 40; // minutes

export interface DaySchedule {
  isOff: boolean;
  disabledSlots: string[]; // List of specific slots that are disabled
}

export interface DateOverride {
  isOff: boolean;
  blockedSlots: string[];
}

export interface UpcomingBooking {
  id: string;
  patientName: string;
  date: string;
  time: string;
  mode: 'online' | 'clinic' | 'home_visit';
}

export interface BackendDaySchedule {
  shifts: string[];
  disabledHours: number[];
}

export const generateSlotsForPeriod = (startHour: number, endHour: number) => {
  const slots = [];
  for (let h = startHour; h <= endHour; h++) {
    const isPM = h >= 12;
    const displayH = h % 12 === 0 ? 12 : h % 12;
    const ampm = isPM ? 'PM' : 'AM';
    const displayHStr = String(displayH).padStart(2, '0');
    slots.push(`${displayHStr}:00 ${ampm} - ${displayHStr}:40 ${ampm}`);
  }
  return slots;
};

export const parseSlotToHour = (slotStr: string): number => {
  const timePart = slotStr.split(' ')[0]; // "09:00"
  const ampm = slotStr.split(' ')[1]; // "AM"
  if (!timePart || !ampm) return 6;
  let hour = parseInt(timePart.split(':')[0], 10);
  if (ampm === 'PM' && hour !== 12) hour += 12;
  if (ampm === 'AM' && hour === 12) hour = 0;
  return hour;
};

export const getWeekdayName = (dateStr: string): string => {
  if (!dateStr) return '';
  const [y, m, d] = dateStr.split('-');
  const date = new Date(parseInt(y), parseInt(m) - 1, parseInt(d));
  return date.toLocaleDateString('en-US', { weekday: 'long' });
};

export const INITIAL_SCHEDULE: Record<string, DaySchedule> = DAYS_OF_WEEK.reduce(
  (acc, day) => {
    acc[day] = { isOff: day === 'Sunday', disabledSlots: [] };
    return acc;
  },
  {} as Record<string, DaySchedule>,
);

export const MOCK_BOOKINGS: UpcomingBooking[] = [
  {
    id: 'BKG-01',
    patientName: 'Robert Fox',
    date: 'Jun 22, 2026',
    time: '09:00 AM - 09:40 AM',
    mode: 'online',
  },
  {
    id: 'BKG-02',
    patientName: 'Eleanor Pena',
    date: 'Jun 22, 2026',
    time: '11:00 AM - 11:40 AM',
    mode: 'clinic',
  },
  {
    id: 'BKG-03',
    patientName: 'Albert Flores',
    date: 'Jun 23, 2026',
    time: '04:00 PM - 04:40 PM',
    mode: 'home_visit',
  },
  {
    id: 'BKG-04',
    patientName: 'Jane Cooper',
    date: 'Jun 24, 2026',
    time: '10:00 AM - 10:40 AM',
    mode: 'online',
  },
];

export const mapBackendToUiSchedule = (
  backendSchedule: Record<string, BackendDaySchedule | string[]>,
): Record<string, DaySchedule> => {
  const uiSchedule: Record<string, DaySchedule> = {};

  DAYS_OF_WEEK.forEach((day) => {
    const backendKey = day.toLowerCase();
    const daySchedule = backendSchedule[backendKey];

    let shifts: string[] = [];
    let disabledHours: number[] = [];

    if (Array.isArray(daySchedule)) {
      shifts = daySchedule;
    } else if (daySchedule && typeof daySchedule === 'object') {
      shifts = daySchedule.shifts || [];
      disabledHours = daySchedule.disabledHours || [];
    }

    const isOff = shifts.length === 0;
    const disabledSlots: string[] = [];

    TIME_PERIODS.forEach((period) => {
      const periodSlots = generateSlotsForPeriod(period.range[0], period.range[1]);
      if (!shifts.includes(period.id)) {
        disabledSlots.push(...periodSlots);
      } else {
        periodSlots.forEach((slot) => {
          const hour = parseSlotToHour(slot);
          if (disabledHours.includes(hour)) {
            disabledSlots.push(slot);
          }
        });
      }
    });

    uiSchedule[day] = {
      isOff,
      disabledSlots,
    };
  });

  return uiSchedule;
};

export const mapUiToBackendSchedule = (
  uiSchedule: Record<string, DaySchedule>,
): Record<string, BackendDaySchedule> => {
  const backendSchedule: Record<string, BackendDaySchedule> = {};

  Object.entries(uiSchedule).forEach(([day, dayData]) => {
    const backendKey = day.toLowerCase();
    if (dayData.isOff) {
      backendSchedule[backendKey] = {
        shifts: [],
        disabledHours: [],
      };
      return;
    }

    const shifts: string[] = [];
    const disabledHours: number[] = [];

    TIME_PERIODS.forEach((period) => {
      const periodSlots = generateSlotsForPeriod(period.range[0], period.range[1]);
      const hasEnabledSlot = periodSlots.some((slot) => !dayData.disabledSlots.includes(slot));
      if (hasEnabledSlot) {
        shifts.push(period.id);
        periodSlots.forEach((slot) => {
          if (dayData.disabledSlots.includes(slot)) {
            disabledHours.push(parseSlotToHour(slot));
          }
        });
      }
    });

    backendSchedule[backendKey] = {
      shifts,
      disabledHours,
    };
  });

  return backendSchedule;
};
