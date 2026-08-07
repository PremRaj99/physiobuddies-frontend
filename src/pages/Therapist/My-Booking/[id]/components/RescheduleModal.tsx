import React from 'react';
import { SlotSelectorModal } from '@/components/my-booking';

interface RescheduleModalProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  rescheduleDate: string;
  setRescheduleDate: (date: string) => void;
  rescheduleHour: number;
  setRescheduleHour: (hour: number) => void;
  rescheduleReason: string;
  setRescheduleReason: (reason: string) => void;
  isRescheduling: boolean;
  onSubmit: () => void;
}

export const RescheduleModal: React.FC<RescheduleModalProps> = ({
  isOpen,
  onOpenChange,
  rescheduleDate,
  setRescheduleDate,
  rescheduleHour,
  setRescheduleHour,
  rescheduleReason,
  setRescheduleReason,
  isRescheduling,
  onSubmit,
}) => {
  return (
    <SlotSelectorModal
      isOpen={isOpen}
      onOpenChange={onOpenChange}
      title="Reschedule Treatment Session"
      description="Select an available date, start time, and provide an optional note to update this session."
      selectedDate={rescheduleDate}
      setSelectedDate={setRescheduleDate}
      selectedHour={rescheduleHour}
      setSelectedHour={setRescheduleHour}
      reason={rescheduleReason}
      setReason={setRescheduleReason}
      showReasonInput={true}
      isSubmitting={isRescheduling}
      submitButtonText="Confirm & Reschedule Session"
      submittingText="Rescheduling..."
      onSubmit={onSubmit}
    />
  );
};
