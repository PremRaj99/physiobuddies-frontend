import React from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { MoonStar, Settings2 } from 'lucide-react';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Separator } from '@/components/ui/separator';
import { Card, CardContent } from '@/components/ui/card';
import { DAYS_OF_WEEK, TIME_PERIODS, generateSlotsForPeriod } from '../utils';
import type { DaySchedule } from '../utils';

interface WeeklyDefaultsTabProps {
  selectedDay: string;
  setSelectedDay: (day: string) => void;
  schedule: Record<string, DaySchedule>;
  handleToggleSlot: (slot: string) => void;
  handleToggleDayOff: () => void;
  handleBulkPeriodAction: (slots: string[], action: 'enable' | 'disable') => void;
}

export const WeeklyDefaultsTab: React.FC<WeeklyDefaultsTabProps> = ({
  selectedDay,
  setSelectedDay,
  schedule,
  handleToggleSlot,
  handleToggleDayOff,
  handleBulkPeriodAction,
}) => {
  const renderPeriodCard = (period: (typeof TIME_PERIODS)[0], disabledSlots: string[]) => {
    const slots = generateSlotsForPeriod(period.range[0], period.range[1]);
    const isShiftEnabled = slots.some((s) => !disabledSlots.includes(s));

    return (
      <Card
        key={period.id}
        className="border-border mb-4 gap-0 overflow-hidden bg-white py-0 shadow-sm"
      >
        <div className="bg-secondary/10 border-border flex items-center justify-between border-b px-4 py-3">
          <div className="flex items-center gap-3">
            <period.icon
              className={`h-5 w-5 ${isShiftEnabled ? 'text-[#014f86]' : 'text-muted-foreground'}`}
            />
            <div>
              <h4
                className={`text-sm font-bold ${isShiftEnabled ? 'text-[#012a4a]' : 'text-muted-foreground'}`}
              >
                {period.label} Shift
              </h4>
              <p className="text-muted-foreground text-[10px]">
                {slots[0].split(' - ')[0]} - {slots[slots.length - 1].split(' - ')[1]}
              </p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-muted-foreground text-xs font-semibold">
              {isShiftEnabled ? 'Active' : 'Inactive'}
            </span>
            <Switch
              checked={isShiftEnabled}
              onCheckedChange={() =>
                handleBulkPeriodAction(slots, isShiftEnabled ? 'disable' : 'enable')
              }
              className="data-[state=checked]:bg-[#014f86]"
            />
          </div>
        </div>
        <CardContent className="bg-gray-50/50 p-4">
          <div className="flex flex-wrap gap-2">
            {slots.map((slot) => {
              const isSlotDisabled = disabledSlots.includes(slot);
              return (
                <button
                  key={slot}
                  type="button"
                  disabled={!isShiftEnabled}
                  onClick={() => {
                    if (isShiftEnabled) {
                      handleToggleSlot(slot);
                    }
                  }}
                  className={`rounded-md border px-3 py-1.5 text-xs font-semibold transition-all ${
                    isSlotDisabled
                      ? 'border-red-200 bg-red-50 text-red-600 line-through opacity-80 hover:bg-red-100/50'
                      : 'border-border bg-white text-[#014f86] shadow-sm hover:bg-[#a9d6e5]/10'
                  } ${!isShiftEnabled ? 'cursor-not-allowed opacity-40' : 'cursor-pointer'}`}
                >
                  {slot}
                </button>
              );
            })}
          </div>
        </CardContent>
      </Card>
    );
  };

  const dayData = schedule[selectedDay] || { isOff: false, disabledSlots: [] };

  return (
    <div className="space-y-6">
      <div className="flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-center">
        <div className="flex flex-wrap gap-2">
          {DAYS_OF_WEEK.map((day) => (
            <button
              key={day}
              onClick={() => setSelectedDay(day)}
              className={`rounded-full px-4 py-2 text-sm font-bold transition-all ${
                selectedDay === day
                  ? 'bg-[#012a4a] text-white shadow-md'
                  : 'bg-secondary/30 hover:bg-secondary/60 border-border border text-[#013a63]'
              }`}
            >
              {day.substring(0, 3)}
            </button>
          ))}
        </div>
      </div>

      <Separator />

      <div className="flex items-center justify-between rounded-xl border border-[#a9d6e5]/50 bg-[#a9d6e5]/20 p-4">
        <div>
          <Label className="text-base font-bold text-[#012a4a]">
            Mark {selectedDay} as Day Off
          </Label>
          <p className="text-muted-foreground text-sm">
            Disable all bookings for every {selectedDay}.
          </p>
        </div>
        <Switch
          checked={dayData.isOff}
          onCheckedChange={handleToggleDayOff}
          className="data-[state=checked]:bg-destructive"
        />
      </div>

      {!dayData.isOff && (
        <div className="flex items-start gap-2 rounded-lg border border-blue-100 bg-blue-50/60 p-3.5 text-xs text-[#014f86]">
          <Settings2 className="mt-0.5 h-4 w-4 shrink-0" />
          <div>
            <span className="font-bold">Weekly Default Shifts:</span> Configure your general working
            shifts (Morning, Evening, Night) for each day here. If you need to block or unblock
            specific individual hours for a particular calendar date, please use the{' '}
            <strong className="underline">Date Overrides</strong> tab.
          </div>
        </div>
      )}

      <AnimatePresence mode="wait">
        {dayData.isOff ? (
          <motion.div
            key="day-disabled"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="py-12 text-center"
          >
            <MoonStar className="text-muted-foreground/30 mx-auto mb-4 h-12 w-12" />
            <h3 className="text-lg font-bold text-[#012a4a]">Day Disabled</h3>
            <p className="text-muted-foreground">
              You are not accepting appointments on {selectedDay}s.
            </p>
          </motion.div>
        ) : (
          <motion.div
            key="day-active"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            className="space-y-4"
          >
            <div className="mb-2 flex items-end justify-between">
              <h3 className="text-lg font-bold text-[#013a63]">Manage Weekly Shifts</h3>
              <p className="text-muted-foreground text-xs">
                Enable or disable shifts for this day.
              </p>
            </div>
            {TIME_PERIODS.map((period) => renderPeriodCard(period, dayData.disabledSlots))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
