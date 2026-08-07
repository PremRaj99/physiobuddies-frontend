import React, { useMemo } from 'react';
import { Sparkles } from 'lucide-react';
import { SlotSelectorModal, type DayOption } from '@/components/my-booking';
import { Badge } from '@/components/ui/badge';
import type { ApiResponse } from '@/services';
import type { SeeMoreSlotsResponse } from '@/services/treatmentSession.service';
import { minutesToTime } from '@/utils/slots';

const formatReadableText = (text?: string) => {
  if (!text) return '';
  return text.replace(/_/g, ' ');
};

interface BookMoreModalProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  bookMoreDate: string;
  setBookMoreDate: (date: string) => void;
  bookMoreHour: number;
  setBookMoreHour: (hour: number) => void;
  seeMoreSlotsRes?: ApiResponse<SeeMoreSlotsResponse> | null;
  isBookingMore: boolean;
  suggestedTreatmentDaysLeft: number;
  visitFrequency: string;
  onSubmit: () => void;
}

export const BookMoreModal: React.FC<BookMoreModalProps> = ({
  isOpen,
  onOpenChange,
  bookMoreDate,
  setBookMoreDate,
  bookMoreHour,
  setBookMoreHour,
  seeMoreSlotsRes,
  isBookingMore,
  suggestedTreatmentDaysLeft,
  visitFrequency,
  onSubmit,
}) => {
  const availabilityDays: DayOption[] = useMemo(() => {
    const raw = seeMoreSlotsRes?.data?.availableSlots || [];
    return raw.map((day) => ({
      date: day.date,
      availableCount: day.timeSlots.filter((slot) => slot.status === 'open').length,
      timeSlots: day.timeSlots.map((slot) => ({
        startHour: slot.startHour,
        timeLabel: `${minutesToTime(slot.startTime)} - ${minutesToTime(slot.endTime)}`,
        category: slot.category,
        available: slot.status === 'open',
      })),
    }));
  }, [seeMoreSlotsRes]);

  const badgeContent = (
    <>
      <Badge className="bg-[#014f86] px-3 py-1 font-semibold text-white hover:bg-[#014f86]">
        Suggested: {suggestedTreatmentDaysLeft} Days Plan
      </Badge>
      <Badge
        variant="outline"
        className="border-emerald-300 bg-emerald-50 px-3 py-1 font-medium text-emerald-800"
      >
        <Sparkles className="mr-1 inline h-3 w-3 text-emerald-600" />
        Frequency: {formatReadableText(visitFrequency)}
      </Badge>
    </>
  );

  return (
    <SlotSelectorModal
      isOpen={isOpen}
      onOpenChange={onOpenChange}
      title="Book Follow-Up Session"
      description="Select an available date and time slot to schedule your follow-up therapy."
      selectedDate={bookMoreDate}
      setSelectedDate={setBookMoreDate}
      selectedHour={bookMoreHour}
      setSelectedHour={setBookMoreHour}
      availabilityDays={availabilityDays}
      isSubmitting={isBookingMore}
      submitButtonText="Confirm & Book Follow-Up Session"
      submittingText="Booking Follow-Up..."
      badgeContent={badgeContent}
      onSubmit={onSubmit}
    />
  );
};
