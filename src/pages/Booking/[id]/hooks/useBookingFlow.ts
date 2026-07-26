import { useState, useEffect } from 'react';
import { useParams, useLocation, useNavigate } from 'react-router-dom';
import { toast } from 'sonner';

import {
  usePatientDetails,
  usePatientLocations,
  useHoldReservation,
  useConfirmReservation,
} from '@/hooks/usePatient';
import { useTherapistDetail } from '@/hooks/useTherapist';

export const useBookingFlow = () => {
  const { id: therapistId } = useParams<{ id: string }>();
  const location = useLocation();
  const navigate = useNavigate();
  const { date: slotDate, startHour } = (location.state ?? {}) as { date?: string; startHour?: number };

  const [step, setStep] = useState(1);
  const [selectedPatientId, setSelectedPatientId] = useState<string | null>(null);
  const [selectedLocationId, setSelectedLocationId] = useState<string | null>(null);
  const [selectedConditionId, setSelectedConditionId] = useState<string | null>(null);
  const [problemDesc, setProblemDesc] = useState('');
  const [reservationId, setReservationId] = useState<string | null>(null);
  const [sessionExpired, setSessionExpired] = useState(false);

  const { data: therapistData, isLoading: therapistLoading } = useTherapistDetail(therapistId!);
  const { data: patientDetails = [], isLoading: patientsLoading } = usePatientDetails();
  const { data: patientLocations = [], isLoading: locationsLoading } = usePatientLocations();

  const holdReservation = useHoldReservation();
  const confirmReservation = useConfirmReservation();

  // Hold slot on mount
  useEffect(() => {
    if (!therapistId || !slotDate || startHour === undefined) return;
    const [dd, mm, yyyy] = slotDate.split('-');
    const isoDate = `${yyyy}-${mm}-${dd}T00:00:00.000Z`;
    holdReservation.mutate(
      { therapistId, date: isoDate, startHour },
      {
        onSuccess: (res) => setReservationId(res.data?.reservationId ?? null),
        onError: (e: unknown) => {
          const err = e as { response?: { data?: { message?: string } } };
          toast.error(err.response?.data?.message || 'Could not hold this slot. It may already be taken.')},
      },
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleConfirm = async () => {
    if (!reservationId || !selectedPatientId || !selectedLocationId) return;
    try {
      await confirmReservation.mutateAsync(reservationId);
      toast.success('Booking confirmed!');
      navigate('/patient/my-bookings');
    } catch {
      toast.error('Booking failed. Please try again.');
    }
  };

  const detail = therapistData?.data;
  const therapist = detail
    ? {
        name: detail.name,
        image: detail.image ?? null,
        price: detail.discountedPrice,
        priceAlt: detail.originalPrice ?? null,
        mode: 'home_visit',
      }
    : null;

  const selectedPatient = patientDetails.find((p) => p.id === selectedPatientId) ?? null;
  const selectedLocation = patientLocations.find((l) => l.id === selectedLocationId) ?? null;

  return {
    therapistId,
    slotDate,
    startHour,
    step,
    setStep,
    selectedPatientId,
    setSelectedPatientId,
    selectedLocationId,
    setSelectedLocationId,
    selectedConditionId,
    setSelectedConditionId,
    problemDesc,
    setProblemDesc,
    reservationId,
    sessionExpired,
    setSessionExpired,
    therapist,
    therapistLoading,
    patientDetails,
    patientsLoading,
    patientLocations,
    locationsLoading,
    selectedPatient,
    selectedLocation,
    handleConfirm,
    isConfirming: confirmReservation.isPending,
    navigate,
  };
};
