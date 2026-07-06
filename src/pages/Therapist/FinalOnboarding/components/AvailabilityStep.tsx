import React from 'react';
import { motion } from 'framer-motion';
import { Sun, Sunset, Moon } from 'lucide-react';
import { cn } from '@/lib/utils';

export const DAYS = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
export const PERIODS = [
  { id: 'morning', label: 'Morning', icon: Sun },
  { id: 'evening', label: 'Evening', icon: Sunset },
  { id: 'night', label: 'Night', icon: Moon },
];

interface AvailabilityStepProps {
  formData: {
    slots: Record<string, string[]>;
  };
  toggleSlot: (day: string, period: string) => void;
}

export const AvailabilityStep: React.FC<AvailabilityStepProps> = ({ formData, toggleSlot }) => {
  return (
    <motion.div
      key="step4"
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
      className="space-y-6"
    >
      <h2 className="mb-2 text-2xl font-bold text-[#012a4a]">Weekly Availability</h2>
      <p className="text-muted-foreground mb-6">
        Select the general time periods you are available for bookings each day.
      </p>

      <div className="border-border overflow-hidden rounded-xl border bg-white">
        <div className="grid grid-cols-4 bg-[#012a4a] p-4 text-sm font-bold text-white">
          <div>Day</div>
          <div className="text-center">Morning</div>
          <div className="text-center">Evening</div>
          <div className="text-center">Night</div>
        </div>
        <div className="divide-border divide-y">
          {DAYS.map((day) => (
            <div
              key={day}
              className="grid grid-cols-4 items-center p-2 transition-colors hover:bg-gray-50"
            >
              <div className="pl-2 font-bold text-[#013a63]">{day}</div>
              {PERIODS.map((period) => {
                const isSelected = formData.slots[day]?.includes(period.id);
                return (
                  <div key={period.id} className="flex justify-center">
                    <button
                      type="button"
                      onClick={() => toggleSlot(day, period.id)}
                      className={cn(
                        `flex h-10 w-10 items-center justify-center rounded-full transition-all`,
                        isSelected
                          ? 'scale-110 bg-[#014f86] text-white shadow-md'
                          : 'bg-secondary/30 text-muted-foreground hover:bg-secondary/60 border-border border',
                      )}
                    >
                      <period.icon className="h-5 w-5" />
                    </button>
                  </div>
                );
              })}
            </div>
          ))}
        </div>
      </div>
      <p className="text-muted-foreground mt-4 text-center text-xs">
        You can fine-tune specific 30-minute slots in your Dashboard later.
      </p>
    </motion.div>
  );
};
