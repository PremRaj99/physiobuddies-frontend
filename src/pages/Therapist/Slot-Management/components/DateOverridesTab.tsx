import React from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { CalendarDays, CalendarSearch, Trash2, Settings2 } from 'lucide-react';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Switch } from '@/components/ui/switch';
import { Button } from '@/components/ui/button';
import { TIME_PERIODS, generateSlotsForPeriod, getWeekdayName } from '../utils';
import type { DateOverride, DaySchedule } from '../utils';
import type { DateOverrideItem } from '@/services/therapist.service';

interface DateOverridesTabProps {
  overrideDate: string;
  setOverrideDate: (date: string) => void;
  getOverrideData: () => DateOverride;
  schedule: Record<string, DaySchedule>;
  handleToggleOverrideDayOff: () => void;
  handleToggleOverrideSlot: (slot: string) => void;
  overridesList?: { data?: DateOverrideItem[] };
  handleDeleteOverride: (date: string) => void;
}

export const DateOverridesTab: React.FC<DateOverridesTabProps> = ({
  overrideDate,
  setOverrideDate,
  getOverrideData,
  schedule,
  handleToggleOverrideDayOff,
  handleToggleOverrideSlot,
  overridesList,
  handleDeleteOverride,
}) => {
  const currentOverride = getOverrideData();
  const selectedDayName = getWeekdayName(overrideDate);
  const defaultDayConfig = schedule[selectedDayName];
  const isDefaultDayOff = defaultDayConfig?.isOff;

  return (
    <div className="m-0 space-y-6">
      <div className="bg-secondary/10 border-border rounded-xl border p-5">
        <Label className="mb-3 block text-base font-bold text-[#012a4a]">
          Select a specific date to modify
        </Label>
        <div className="flex flex-col gap-4 sm:flex-row">
          <Input
            type="date"
            value={overrideDate}
            onChange={(e) => setOverrideDate(e.target.value)}
            className="w-full border-[#a9d6e5] focus-visible:ring-[#014f86] sm:w-64"
          />
          {overrideDate && currentOverride.isOff && (
            <Badge variant="destructive" className="flex items-center justify-center">
              Currently Marked as Day Off
            </Badge>
          )}
        </div>
        <p className="text-muted-foreground mt-2 text-xs">
          Use this to block out vacation days or adjust slots for a specific holiday without
          changing your weekly defaults.
        </p>
      </div>

      <AnimatePresence mode="wait">
        {overrideDate ? (
          <motion.div
            key="override-active"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="space-y-6"
          >
            <div className="flex items-center justify-between rounded-xl border border-amber-200 bg-amber-50 p-4">
              <div>
                <Label className="text-base font-bold text-amber-900">
                  Mark entire date as Day Off
                </Label>
                <p className="text-sm text-amber-700">Disable all bookings for {overrideDate}.</p>
              </div>
              <Switch
                checked={currentOverride.isOff || isDefaultDayOff}
                disabled={isDefaultDayOff}
                onCheckedChange={handleToggleOverrideDayOff}
                className="data-[state=checked]:bg-destructive"
              />
            </div>

            {isDefaultDayOff && (
              <div className="flex items-start gap-2 rounded-lg border border-amber-200 bg-amber-50 p-3.5 text-xs text-amber-800">
                <Settings2 className="mt-0.5 h-4 w-4 shrink-0 text-amber-600" />
                <div>
                  <span className="font-bold">Weekly Default Day Off:</span> This date falls on a{' '}
                  {selectedDayName}, which is configured as a weekly Day Off. All slots are blocked
                  by default.
                </div>
              </div>
            )}

            {!currentOverride.isOff && (
              <div className="space-y-4">
                <h3 className="text-lg font-bold text-[#013a63]">Block/Unblock Specific Slots</h3>
                {TIME_PERIODS.map((period) => {
                  const slots = generateSlotsForPeriod(period.range[0], period.range[1]);
                  return (
                    <div key={period.id} className="border-border rounded-xl border p-4">
                      <h4 className="mb-3 flex items-center gap-2 font-bold text-[#012a4a]">
                        <period.icon className="h-4 w-4 text-[#014f86]" /> {period.label}
                      </h4>
                      <div className="flex flex-wrap gap-2">
                        {slots.map((slot) => {
                          const isWeeklyDayOff = defaultDayConfig?.isOff;
                          const isWeeklyBlocked = defaultDayConfig?.disabledSlots.includes(slot);

                          const isCustomBlocked = currentOverride.blockedSlots.includes(slot);
                          const isBlocked = isWeeklyDayOff || isWeeklyBlocked || isCustomBlocked;

                          const isLocked = isWeeklyDayOff || isWeeklyBlocked;

                          return (
                            <button
                              key={slot}
                              disabled={isLocked}
                              onClick={() => {
                                if (!isLocked) {
                                  handleToggleOverrideSlot(slot);
                                }
                              }}
                              className={`rounded-md border px-3 py-1.5 text-xs font-semibold transition-all ${
                                isBlocked
                                  ? 'border-red-200 bg-red-50 text-red-600 line-through'
                                  : 'border-border hover:bg-secondary/30 bg-white text-[#014f86]'
                              } ${isLocked ? 'cursor-not-allowed border-red-100 bg-red-50/50 opacity-50' : 'cursor-pointer'}`}
                              title={
                                isWeeklyDayOff
                                  ? 'Blocked by weekly default day off'
                                  : isWeeklyBlocked
                                    ? 'Blocked by weekly default schedule'
                                    : undefined
                              }
                            >
                              {slot}
                            </button>
                          );
                        })}
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </motion.div>
        ) : (
          <motion.div
            key="override-empty"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="py-12 text-center"
          >
            <CalendarSearch className="text-muted-foreground/30 mx-auto mb-4 h-12 w-12" />
            <h3 className="text-lg font-bold text-[#012a4a]">No Date Selected</h3>
            <p className="text-muted-foreground">
              Select a date above to manage its specific slots.
            </p>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Active Overrides List */}
      <div className="border-border space-y-4 rounded-xl border bg-white p-5">
        <h3 className="flex items-center gap-2 text-base font-bold text-[#012a4a]">
          <CalendarDays className="h-5 w-5 text-[#014f86]" />
          Active Overrides List
        </h3>
        <p className="text-muted-foreground text-xs">
          Dates where you have custom working hours or marked yourself off.
        </p>

        <div className="max-h-64 space-y-2 overflow-y-auto pr-1">
          {overridesList?.data && overridesList.data.length > 0 ? (
            overridesList.data.map((item) => {
              const [y, m, d] = item.date.split('-');
              const formatted = new Date(
                parseInt(y),
                parseInt(m) - 1,
                parseInt(d),
              ).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });

              return (
                <div
                  key={item.date}
                  className="border-border/80 flex items-center justify-between rounded-lg border bg-gray-50/50 p-3 transition-colors hover:bg-gray-50"
                >
                  <div className="space-y-1">
                    <div className="text-sm font-bold text-[#012a4a]">{formatted}</div>
                    <div className="flex flex-wrap items-center gap-1">
                      {item.isOff ? (
                        <Badge variant="destructive" className="px-2 py-0.5 text-[10px] font-bold">
                          Day Off
                        </Badge>
                      ) : (
                        <span className="text-muted-foreground text-xs">
                          {item.blockedHours.length} slots blocked
                        </span>
                      )}
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => setOverrideDate(item.date)}
                      className="h-8 border-[#014f86] text-xs font-semibold text-[#014f86] hover:bg-[#a9d6e5]/10"
                    >
                      Edit
                    </Button>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => handleDeleteOverride(item.date)}
                      className="text-destructive hover:bg-destructive/10 hover:text-destructive h-8 w-8"
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              );
            })
          ) : (
            <div className="text-muted-foreground border-border/60 rounded-lg border border-dashed py-6 text-center text-sm">
              No active date overrides.
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
