import {
  TIME_PERIODS,
  SLOT_DURATION,
  generateSlotsForPeriod,
  parseSlotToHour,
} from '@/utils/slots';

export { TIME_PERIODS, SLOT_DURATION, generateSlotsForPeriod, parseSlotToHour };

export const DAYS_OF_WEEK = [
  'Monday',
  'Tuesday',
  'Wednesday',
  'Thursday',
  'Friday',
  'Saturday',
  'Sunday',
];

export interface DaySchedule {
  isOff: boolean;
  disabledSlots: string[];
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

export const getWeekdayName = (dateStr: string): string => {
  if (!dateStr) return '';
  const [y, m, d] = dateStr.split('-');
  const date = new Date(parseInt(y), parseInt(m) - 1, parseInt(d));
  return date.toLocaleDateString('en-US', { weekday: 'long' });
};

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
