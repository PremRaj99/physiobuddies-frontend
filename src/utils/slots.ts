import { Moon, Sun, Sunset, type LucideIcon } from 'lucide-react';
import type { AvailabilityDay } from '@/services/therapist.service';

// --- CENTRALIZED TYPES ---
export type SlotCategory = 'morning' | 'evening' | 'night';
export type PeriodKey = SlotCategory;

export interface SlotOption {
  startHour: number;
  timeLabel: string;
  category: SlotCategory;
  available?: boolean;
}

export interface DayOption {
  date: string; // YYYY-MM-DD
  timeSlots?: SlotOption[];
  availableCount?: number;
}

export interface TimeSlot {
  id: string; // `${date}_${startHour}`
  time: string; // "10:00 AM - 10:40 AM"
  available: boolean;
  startHour: number;
  date: string; // DD-MM-YYYY
  status: string;
}

export type PeriodData = Record<PeriodKey, TimeSlot[]>;

export interface TimePeriodConfig {
  id: SlotCategory;
  label: string;
  icon: LucideIcon;
  emoji: string;
  range: [number, number]; // [startHour, endHour]
}

// --- CENTRALIZED CONFIG & CONSTANTS ---
export const SLOT_DURATION = 40; // minutes

export const TIME_PERIODS: TimePeriodConfig[] = [
  { id: 'morning', label: 'Morning', icon: Sun, emoji: '🌅', range: [6, 11] },
  { id: 'evening', label: 'Evening', icon: Sunset, emoji: '🌇', range: [12, 17] },
  { id: 'night', label: 'Night', icon: Moon, emoji: '🌃', range: [18, 23] },
];

// --- CENTRALIZED HELPER FUNCTIONS ---

/** Converts minutes from midnight (e.g. 600) to formatted AM/PM string (e.g. "10:00 AM") */
export const minutesToTime = (mins: number): string => {
  const h = Math.floor(mins / 60);
  const m = mins % 60;
  const period = h >= 12 ? 'PM' : 'AM';
  const hr = h % 12 === 0 ? 12 : h % 12;
  return `${hr}:${String(m).padStart(2, '0')} ${period}`;
};

/** Formats an hour integer into a slot time range (e.g. 10 -> "10:00 AM - 10:40 AM") */
export const formatHourToRange = (
  hour: number,
  durationMinutes: number = SLOT_DURATION,
): string => {
  const periodStart = hour >= 12 ? 'PM' : 'AM';
  const displayStart = hour % 12 === 0 ? 12 : hour % 12;
  const startStr = `${displayStart}:00 ${periodStart}`;

  const totalEndMins = hour * 60 + durationMinutes;
  const endHour = Math.floor(totalEndMins / 60);
  const endMins = totalEndMins % 60;
  const periodEnd = endHour >= 12 ? 'PM' : 'AM';
  const displayEnd = endHour % 12 === 0 ? 12 : endHour % 12;
  const endStr = `${displayEnd}:${String(endMins).padStart(2, '0')} ${periodEnd}`;

  return `${startStr} - ${endStr}`;
};

/** Categorizes an hour integer into 'morning' | 'evening' | 'night' based on centralized TIME_PERIODS */
export const getCategoryForHour = (hour: number): SlotCategory => {
  for (const period of TIME_PERIODS) {
    if (hour >= period.range[0] && hour <= period.range[1]) {
      return period.id;
    }
  }
  if (hour < 12) return 'morning';
  if (hour < 18) return 'evening';
  return 'night';
};

/** Generates default array of SlotOptions covering operational periods (default 6 AM to 9 PM) */
export const getDefaultSlotOptions = (startHour = 6, endHour = 21): SlotOption[] => {
  return Array.from({ length: endHour - startHour + 1 }, (_, i) => {
    const hour = startHour + i;
    return {
      startHour: hour,
      timeLabel: formatHourToRange(hour),
      category: getCategoryForHour(hour),
      available: true,
    };
  });
};

/** Groups therapist availability day slots into morning, evening, night periods */
export const groupSlotsByPeriod = (day: AvailabilityDay | undefined): PeriodData => {
  const grouped: PeriodData = { morning: [], evening: [], night: [] };
  if (!day) return grouped;

  for (const slot of day.timeSlots) {
    const cat = (slot.category as SlotCategory) || getCategoryForHour(slot.startHour);
    if (grouped[cat]) {
      grouped[cat].push({
        id: `${day.date}_${slot.startHour}`,
        time: `${minutesToTime(slot.startTime)} - ${minutesToTime(slot.endTime)}`,
        available: slot.status === 'open',
        startHour: slot.startHour,
        date: day.date,
        status: slot.status,
      });
    }
  }
  return grouped;
};

/** Generates text slot labels for slot management range (e.g. 6 to 11 -> ["06:00 AM - 06:40 AM", ...]) */
export const generateSlotsForPeriod = (startHour: number, endHour: number): string[] => {
  const slots: string[] = [];
  for (let h = startHour; h <= endHour; h++) {
    const displayHStr = String(h % 12 === 0 ? 12 : h % 12).padStart(2, '0');
    const ampm = h >= 12 ? 'PM' : 'AM';
    slots.push(`${displayHStr}:00 ${ampm} - ${displayHStr}:40 ${ampm}`);
  }
  return slots;
};

/** Parses a slot label string (e.g., "09:00 AM - 09:40 AM") back into an integer start hour */
export const parseSlotToHour = (slotStr: string): number => {
  const timePart = slotStr.split(' ')[0]; // "09:00"
  const ampm = slotStr.split(' ')[1]; // "AM"
  if (!timePart || !ampm) return 6;
  let hour = parseInt(timePart.split(':')[0], 10);
  if (ampm === 'PM' && hour !== 12) hour += 12;
  if (ampm === 'AM' && hour === 12) hour = 0;
  return hour;
};
