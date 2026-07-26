import { CalendarDays, Clock } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';
import type { AvailabilityDay } from '@/services/therapist.service';
import type { PeriodData, TimeSlot } from '../types';
import { TimeSlotsUI } from './TimeSlotsUI';

interface PhysioBookingSectionProps {
  availability: AvailabilityDay[];
  slotsLoading: boolean;
  activeDate: string;
  selectedSlot: TimeSlot | null;
  slots: PeriodData;
  onDateSelect: (date: string) => void;
  onSlotSelect: (slot: TimeSlot) => void;
}

export function PhysioBookingSection({
  availability,
  slotsLoading,
  activeDate,
  selectedSlot,
  slots,
  onDateSelect,
  onSlotSelect,
}: PhysioBookingSectionProps) {
  return (
    <Card className="border-border mb-8 shadow-sm">
      <CardContent className="p-6 sm:p-8">
        <div className="mb-6 flex items-center gap-2">
          <Clock className="text-primary h-6 w-6" />
          <h2 className="text-xl font-bold text-[#012a4a]">Schedule Appointment</h2>
        </div>

        {slotsLoading ? (
          <div className="space-y-4">
            <Skeleton className="h-10 w-64" />
            <Skeleton className="h-24 w-full" />
          </div>
        ) : availability.length === 0 ? (
          <div className="text-muted-foreground flex flex-col items-center gap-2 py-10 text-center text-sm">
            <CalendarDays className="h-8 w-8 opacity-20" />
            No available slots in the next few days.
          </div>
        ) : (
          <div className="grid gap-8 md:grid-cols-3">
            <div className="md:col-span-1">
              <label className="mb-3 block text-sm font-semibold text-[#013a63]">Select Date</label>
              <div className="flex flex-col gap-2">
                {availability.map((day) => (
                  <button
                    key={day.date}
                    onClick={() => onDateSelect(day.date)}
                    className={`rounded-xl border px-4 py-3 text-left text-sm font-medium transition-all ${
                      activeDate === day.date
                        ? 'bg-primary border-primary text-primary-foreground shadow-sm'
                        : 'border-border hover:border-primary/50 text-[#012a4a]'
                    }`}
                  >
                    {day.date}
                  </button>
                ))}
              </div>
            </div>
            <div className="md:col-span-2">
              <label className="mb-3 block text-sm font-semibold text-[#013a63]">
                Select Time Slot
              </label>
              <TimeSlotsUI
                timeSlots={slots}
                selectedTime={selectedSlot?.id ?? ''}
                onSlotSelect={onSlotSelect}
              />
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
