import { motion } from 'framer-motion';
import { CalendarDays } from 'lucide-react';
import { useState } from 'react';
import { TIME_PERIODS } from '@/utils/slots';
import type { PeriodData, PeriodKey, TimeSlot } from '../types';

interface TimeSlotsUIProps {
  timeSlots: PeriodData;
  selectedTime: string;
  onSlotSelect: (slot: TimeSlot) => void;
}

export function TimeSlotsUI({ timeSlots, selectedTime, onSlotSelect }: TimeSlotsUIProps) {
  const [selectedPeriod, setSelectedPeriod] = useState<PeriodKey>('morning');

  return (
    <div className="space-y-6">
      <div className="bg-secondary flex w-fit gap-2 rounded-xl p-1">
        {TIME_PERIODS.map((period) => (
          <button
            key={period.id}
            onClick={() => setSelectedPeriod(period.id)}
            className={`relative z-10 rounded-lg px-4 py-2 text-sm font-medium transition-colors ${
              selectedPeriod === period.id
                ? 'text-primary-foreground'
                : 'text-[#012a4a] hover:bg-white/50'
            }`}
          >
            {selectedPeriod === period.id && (
              <motion.div
                layoutId="activePeriod"
                className="bg-primary absolute inset-0 -z-10 rounded-lg shadow-sm"
                transition={{ type: 'spring', stiffness: 300, damping: 30 }}
              />
            )}
            <span className="flex items-center gap-2">
              <span>{period.emoji}</span>
              {period.label}
            </span>
          </button>
        ))}
      </div>

      <motion.div
        key={selectedPeriod}
        initial={{ opacity: 0, y: 5 }}
        animate={{ opacity: 1, y: 0 }}
        className="grid grid-cols-3 gap-3 sm:grid-cols-4"
      >
        {timeSlots[selectedPeriod].length > 0 ? (
          timeSlots[selectedPeriod].map((slot) => (
            <button
              key={slot.id}
              disabled={!slot.available}
              onClick={() => onSlotSelect(slot)}
              className={`relative flex flex-col items-center justify-center rounded-xl border py-3 transition-all ${
                !slot.available
                  ? 'bg-muted text-muted-foreground cursor-not-allowed border-transparent opacity-60'
                  : selectedTime === slot.id
                    ? 'bg-primary border-primary text-primary-foreground shadow-md'
                    : 'bg-background border-border hover:border-primary/50 hover:bg-secondary/20 text-[#012a4a]'
              }`}
            >
              <span className="text-xs font-semibold">{slot.time}</span>
              {!slot.available && (
                <span className="mt-1 text-[10px] tracking-wider uppercase">{slot.status}</span>
              )}
            </button>
          ))
        ) : (
          <div className="text-muted-foreground col-span-full flex flex-col items-center gap-2 py-8 text-center text-sm">
            <CalendarDays className="h-8 w-8 opacity-20" />
            No slots available for this period.
          </div>
        )}
      </motion.div>
    </div>
  );
}
