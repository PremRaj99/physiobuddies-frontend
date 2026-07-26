import type { AvailabilityDay } from '@/services/therapist.service';

export interface TimeSlot {
  id: string; // `${date}_${startHour}`
  time: string; // "10:00 AM - 10:40 AM"
  available: boolean;
  startHour: number;
  date: string; // DD-MM-YYYY
  status: string;
}

export type PeriodKey = 'morning' | 'evening' | 'night';
export type PeriodData = Record<PeriodKey, TimeSlot[]>;

export const minutesToTime = (mins: number): string => {
  const h = Math.floor(mins / 60);
  const m = mins % 60;
  const period = h >= 12 ? 'PM' : 'AM';
  const hr = h % 12 === 0 ? 12 : h % 12;
  return `${hr}:${String(m).padStart(2, '0')} ${period}`;
};

export const groupSlotsByPeriod = (day: AvailabilityDay | undefined): PeriodData => {
  const grouped: PeriodData = { morning: [], evening: [], night: [] };
  if (!day) return grouped;

  for (const slot of day.timeSlots) {
    grouped[slot.category].push({
      id: `${day.date}_${slot.startHour}`,
      time: `${minutesToTime(slot.startTime)} - ${minutesToTime(slot.endTime)}`,
      available: slot.status === 'open',
      startHour: slot.startHour,
      date: day.date,
      status: slot.status,
    });
  }
  return grouped;
};
