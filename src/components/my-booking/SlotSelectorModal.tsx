import React, { useEffect, useMemo } from 'react';
import { CalendarClock, Clock } from 'lucide-react';

import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Textarea } from '@/components/ui/textarea';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { getDefaultSlotOptions, type DayOption, type SlotOption } from '@/utils/slots';

export type { DayOption, SlotOption };

export interface SlotSelectorModalProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  title?: string;
  description?: string;
  selectedDate: string;
  setSelectedDate: (date: string) => void;
  selectedHour: number;
  setSelectedHour: (hour: number) => void;
  reason?: string;
  setReason?: (reason: string) => void;
  showReasonInput?: boolean;
  availabilityDays?: DayOption[];
  isSubmitting?: boolean;
  submitButtonText?: string;
  submittingText?: string;
  badgeContent?: React.ReactNode;
  onSubmit: () => void;
}

const defaultHours: SlotOption[] = getDefaultSlotOptions();

const generateDefault3Days = (): DayOption[] => {
  const days: DayOption[] = [];
  const today = new Date();

  for (let i = 0; i < 3; i++) {
    const d = new Date(today);
    d.setDate(today.getDate() + i);
    const yyyy = d.getFullYear();
    const mm = String(d.getMonth() + 1).padStart(2, '0');
    const dd = String(d.getDate()).padStart(2, '0');
    const dateStr = `${yyyy}-${mm}-${dd}`;

    days.push({
      date: dateStr,
      timeSlots: defaultHours,
      availableCount: defaultHours.length,
    });
  }

  return days;
};

const parseDateObj = (dateStr: string): Date => {
  if (!dateStr) return new Date();
  if (/^\d{4}-\d{2}-\d{2}$/.test(dateStr)) {
    const [yyyy, mm, dd] = dateStr.split('-').map(Number);
    return new Date(yyyy, mm - 1, dd);
  }
  if (/^\d{2}-\d{2}-\d{4}$/.test(dateStr)) {
    const [dd, mm, yyyy] = dateStr.split('-').map(Number);
    return new Date(yyyy, mm - 1, dd);
  }
  return new Date(dateStr);
};

const isDateToday = (dateStr: string): boolean => {
  const d = parseDateObj(dateStr);
  const today = new Date();
  return (
    d.getFullYear() === today.getFullYear() &&
    d.getMonth() === today.getMonth() &&
    d.getDate() === today.getDate()
  );
};

const isSlotInFutureBuffer = (dateStr: string, startHour: number): boolean => {
  if (!isDateToday(dateStr)) return true;

  const now = new Date();
  const cutoffTime = new Date(now.getTime() + 60 * 60 * 1000); // 1 hour buffer

  const slotStartTime = parseDateObj(dateStr);
  slotStartTime.setHours(startHour, 0, 0, 0);

  return slotStartTime >= cutoffTime;
};

const formatDayName = (dateStr: string): string => {
  const d = parseDateObj(dateStr);
  if (Number.isNaN(d.getTime())) return '';
  return d.toLocaleDateString('en-US', { weekday: 'short' });
};

const formatMonthDay = (dateStr: string): string => {
  const d = parseDateObj(dateStr);
  if (Number.isNaN(d.getTime())) return dateStr;
  return d.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
};

export const SlotSelectorModal: React.FC<SlotSelectorModalProps> = ({
  isOpen,
  onOpenChange,
  title = 'Reschedule Session',
  selectedDate,
  setSelectedDate,
  selectedHour,
  setSelectedHour,
  reason = '',
  setReason,
  showReasonInput = false,
  availabilityDays,
  isSubmitting = false,
  submitButtonText = 'Confirm Reschedule',
  submittingText = 'Rescheduling...',
  badgeContent,
  onSubmit,
}) => {
  const daysList = useMemo(() => {
    let rawDays: DayOption[] = [];
    if (availabilityDays && availabilityDays.length > 0) {
      rawDays = availabilityDays;
    } else {
      rawDays = generateDefault3Days();
    }

    const limitedDays = rawDays.slice(0, 3);

    return limitedDays.map((day) => {
      const slots = (day.timeSlots || defaultHours).map((slot) => {
        const meetsBuffer = isSlotInFutureBuffer(day.date, slot.startHour);
        return {
          ...slot,
          available: slot.available !== false && meetsBuffer,
        };
      });

      return {
        ...day,
        timeSlots: slots,
        availableCount: slots.filter((s) => s.available).length,
      };
    });
  }, [availabilityDays]);

  const activeDate = selectedDate || daysList[0]?.date || '';
  const activeDay = daysList.find((d) => d.date === activeDate) || daysList[0];

  const currentSlots: SlotOption[] = useMemo(() => {
    if (!activeDay || !activeDay.timeSlots) return defaultHours;
    return activeDay.timeSlots;
  }, [activeDay]);

  useEffect(() => {
    if (!isOpen) return;

    if (!selectedDate && daysList.length > 0) {
      setSelectedDate(daysList[0].date);
    }
    if (!selectedHour && currentSlots.length > 0) {
      const firstOpen = currentSlots.find((s) => s.available) || currentSlots[0];
      if (firstOpen) {
        setSelectedHour(firstOpen.startHour);
      }
    }
  }, [
    isOpen,
    daysList,
    selectedDate,
    selectedHour,
    currentSlots,
    setSelectedDate,
    setSelectedHour,
  ]);

  const handleDateClick = (dateStr: string) => {
    setSelectedDate(dateStr);
    const dayObj = daysList.find((d) => d.date === dateStr);
    const slots = dayObj?.timeSlots || defaultHours;
    const firstOpen = slots.find((s) => s.available) || slots[0];
    if (firstOpen) {
      setSelectedHour(firstOpen.startHour);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="w-[92vw] overflow-hidden rounded-2xl border border-slate-200 bg-white p-5 text-slate-900 shadow-xl sm:max-w-md!">
        {/* MODAL HEADER */}
        <DialogHeader className="pb-1">
          <DialogTitle className="flex items-center gap-2 text-base font-bold text-[#012a4a] sm:text-lg">
            <CalendarClock className="h-5 w-5 text-[#014f86]" />
            {title}
          </DialogTitle>
          {badgeContent && (
            <div className="mt-2 flex flex-wrap items-center gap-2">{badgeContent}</div>
          )}
        </DialogHeader>

        {/* MODAL FORM FIELDS */}
        <div className="space-y-4 py-2">
          {/* 1. DATE SELECTOR TABS */}
          <div className="space-y-1.5">
            <label className="text-[11px] font-bold tracking-wider text-slate-500 uppercase">
              Select Date
            </label>
            <div className="grid grid-cols-3 gap-2">
              {daysList.map((day) => {
                const isSelected = activeDate === day.date;
                return (
                  <button
                    key={day.date}
                    type="button"
                    onClick={() => handleDateClick(day.date)}
                    className={`rounded-xl px-1 py-2 text-center transition-all ${
                      isSelected
                        ? 'bg-[#014f86] font-bold text-white shadow-xs'
                        : 'bg-slate-100 font-semibold text-slate-700 hover:bg-slate-200'
                    }`}
                  >
                    <div
                      className={`text-[10px] tracking-wider uppercase ${isSelected ? 'text-white/80' : 'text-slate-400'}`}
                    >
                      {formatDayName(day.date)}
                    </div>
                    <div className="mt-0.5 text-xs sm:text-sm">{formatMonthDay(day.date)}</div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* 2. TIME SLOT DROPDOWN */}
          <div className="space-y-1.5">
            <label className="text-[11px] font-bold tracking-wider text-slate-500 uppercase">
              Select Time Slot
            </label>
            <Select
              value={selectedHour ? String(selectedHour) : ''}
              onValueChange={(val) => setSelectedHour(Number(val))}
            >
              <SelectTrigger className="h-10 w-full rounded-xl border-slate-300 bg-white text-xs font-medium text-slate-800 focus:border-[#014f86] sm:text-sm">
                <SelectValue placeholder="Choose an available slot..." />
              </SelectTrigger>
              <SelectContent className="z-100 max-h-56 bg-white">
                {currentSlots.map((slot) => (
                  <SelectItem
                    key={slot.startHour}
                    value={String(slot.startHour)}
                    disabled={!slot.available}
                    className="py-2 text-xs font-medium text-slate-800"
                  >
                    <div className="flex items-center gap-2">
                      <Clock className="h-3.5 w-3.5 text-[#014f86]" />
                      <span>{slot.timeLabel}</span>
                      {!slot.available && (
                        <span className="text-[10px] text-slate-400 italic">(Unavailable)</span>
                      )}
                    </div>
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* 3. REASON INPUT (OPTIONAL) */}
          {showReasonInput && setReason && (
            <div className="space-y-1.5">
              <label className="text-[11px] font-bold tracking-wider text-slate-500 uppercase">
                Reason (Optional)
              </label>
              <Textarea
                value={reason}
                onChange={(e) => setReason(e.target.value)}
                placeholder="Brief reason for rescheduling..."
                className="resize-none rounded-xl border-slate-300 bg-white text-xs focus:border-[#014f86]"
                rows={2.5}
              />
            </div>
          )}
        </div>

        {/* MODAL FOOTER */}
        <DialogFooter className="flex flex-row justify-end gap-2 border-t border-slate-100 pt-3">
          <Button
            variant="outline"
            onClick={() => onOpenChange(false)}
            className="h-10 flex-1 rounded-xl text-xs"
          >
            Cancel
          </Button>
          <Button
            onClick={onSubmit}
            disabled={isSubmitting || !activeDate || !selectedHour}
            className="h-10 flex-1 rounded-xl bg-[#014f86] text-xs font-bold text-white hover:bg-[#013a63]"
          >
            {isSubmitting ? submittingText : submitButtonText}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
