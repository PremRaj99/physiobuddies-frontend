import { useMemo, useState } from 'react';
import { useNavigate } from 'react-router';
import { toast } from 'sonner';
import { useCreateBookingSession } from '@/hooks/usePatient';
import type { AvailabilityDay } from '@/services/therapist.service';
import { groupSlotsByPeriod, type TimeSlot } from '../types';

export function usePhysioBooking(id: string, availability: AvailabilityDay[]) {
  const navigate = useNavigate();
  const [selectedDate, setSelectedDate] = useState('');
  const [selectedSlot, setSelectedSlot] = useState<TimeSlot | null>(null);

  const activeDate = selectedDate || availability[0]?.date || '';
  const activeDay = availability.find((d) => d.date === activeDate);
  const slots = useMemo(() => groupSlotsByPeriod(activeDay), [activeDay]);

  const handleDateSelect = (date: string) => {
    setSelectedDate(date);
    setSelectedSlot(null);
  };

  const createBookingSession = useCreateBookingSession();

  const handleBook = () => {
    if (!selectedSlot || !id) {
      toast.error('Please select a time slot.');
      return;
    }

    const [dd, mm, yyyy] = selectedSlot.date.split('-');
    const isoDate = `${yyyy}-${mm}-${dd}T00:00:00.000Z`;

    createBookingSession.mutate(
      { therapistId: id, date: isoDate, startHour: selectedSlot.startHour },
      {
        onSuccess: (res) => {
          const sessionId = res.data?.sessionId;
          if (sessionId) {
            navigate(`/booking/${sessionId}`);
          }
        },
        onError: (e: unknown) => {
          const err = e as { response?: { data?: { message?: string } } };
          toast.error(err.response?.data?.message || 'Could not reserve this slot.');
        },
      },
    );
  };

  return {
    selectedDate,
    activeDate,
    selectedSlot,
    setSelectedSlot,
    slots,
    handleDateSelect,
    handleBook,
    isBooking: createBookingSession.isPending,
  };
}
