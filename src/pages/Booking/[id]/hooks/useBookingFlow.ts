import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { toast } from 'sonner';

import {
  usePatientDetails,
  usePatientLocations,
  useBookingSession,
  useUpdateBookingForm,
  useInitiatePayment,
  useFinalizeBooking,
} from '@/hooks/usePatient';

export const useBookingFlow = () => {
  const { id: sessionId } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const [step, setStepState] = useState(1);
  const [selectedPatientId, setSelectedPatientId] = useState<string | null>(null);
  const [selectedLocationId, setSelectedLocationId] = useState<string | null>(null);
  const [selectedConditionId, setSelectedConditionId] = useState<string | null>(null);
  const [problemDesc, setProblemDesc] = useState('');
  const [sessionExpired, setSessionExpired] = useState(false);

  const { data: sessionResponse, isLoading: sessionLoading, error: sessionError } = useBookingSession(sessionId);
  const { data: patientDetails = [], isLoading: patientsLoading } = usePatientDetails();
  const { data: patientLocations = [], isLoading: locationsLoading } = usePatientLocations();

  const updateFormMutation = useUpdateBookingForm();
  const initiatePaymentMutation = useInitiatePayment();
  const finalizeBookingMutation = useFinalizeBooking();

  const sessionData = sessionResponse?.data;

  // Restore session data on load
  useEffect(() => {
    if (!sessionData) return;

    if (sessionData.isConfirmed) {
      toast.success('This booking is already confirmed!');
      navigate('/patient/my-bookings');
      return;
    }

    if (sessionData.step) setStepState(sessionData.step);
    if (sessionData.formData?.patientDetailId) setSelectedPatientId(sessionData.formData.patientDetailId);
    if (sessionData.formData?.locationId) setSelectedLocationId(sessionData.formData.locationId);
    if (sessionData.formData?.conditionId) setSelectedConditionId(sessionData.formData.conditionId);
    if (sessionData.formData?.problemDesc) setProblemDesc(sessionData.formData.problemDesc);
  }, [sessionData, navigate]);

  useEffect(() => {
    if (sessionError) {
      setSessionExpired(true);
    }
  }, [sessionError]);

  const setStep = (newStep: number) => {
    setStepState(newStep);
    if (sessionId) {
      updateFormMutation.mutate({
        sessionId,
        formData: {
          step: newStep,
          patientDetailId: selectedPatientId,
          locationId: selectedLocationId,
          conditionId: selectedConditionId,
          problemDesc,
        },
      });
    }
  };

  const handleSelectPatient = (patientId: string) => {
    setSelectedPatientId(patientId);
    if (sessionId) {
      updateFormMutation.mutate({
        sessionId,
        formData: { patientDetailId: patientId },
      });
    }
  };

  const handleSelectLocation = (locationId: string) => {
    setSelectedLocationId(locationId);
    if (sessionId) {
      updateFormMutation.mutate({
        sessionId,
        formData: { locationId },
      });
    }
  };

  const handleSelectCondition = (conditionId: string) => {
    setSelectedConditionId(conditionId);
    if (sessionId) {
      updateFormMutation.mutate({
        sessionId,
        formData: { conditionId },
      });
    }
  };

  const handleDescChange = (desc: string) => {
    setProblemDesc(desc);
  };

  const handleConfirm = async () => {
    if (!sessionId || !selectedPatientId || !selectedLocationId) {
      toast.error('Please complete all required fields.');
      return;
    }

    try {
      // 1. Initiate payment order
      await initiatePaymentMutation.mutateAsync(sessionId);

      // 2. Finalize booking (simulating successful payment/webhook)
      await finalizeBookingMutation.mutateAsync({ sessionId });

      toast.success('Payment completed & booking confirmed!');
      navigate('/patient/my-bookings');
    } catch (e: unknown) {
      const err = e as { response?: { data?: { message?: string } } };
      toast.error(err.response?.data?.message || 'Payment failed. Please try again.');
    }
  };

  const therapist = sessionData?.therapist
    ? {
        name: sessionData.therapist.name,
        image: sessionData.therapist.image,
        price: sessionData.therapist.price,
        priceAlt: sessionData.therapist.priceAlt,
        mode: sessionData.therapist.mode || 'home_visit',
      }
    : null;

  const slotDate = sessionData?.date
    ? new Date(sessionData.date).toLocaleDateString('en-GB')
    : undefined;
  const startHour = sessionData?.startHour;

  const selectedPatient = patientDetails.find((p) => p.id === selectedPatientId) ?? null;
  const selectedLocation = patientLocations.find((l) => l.id === selectedLocationId) ?? null;

  return {
    sessionId,
    therapistId: sessionData?.therapistId,
    slotDate,
    startHour,
    expiresAt: sessionData?.expiresAt,
    step,
    setStep,
    selectedPatientId,
    setSelectedPatientId: handleSelectPatient,
    selectedLocationId,
    setSelectedLocationId: handleSelectLocation,
    selectedConditionId,
    setSelectedConditionId: handleSelectCondition,
    problemDesc,
    setProblemDesc: handleDescChange,
    couponCode: sessionData?.formData?.couponCode,
    couponDiscount: sessionData?.formData?.couponDiscount,
    reservationId: sessionData?.reservationId,
    sessionExpired,
    setSessionExpired,
    therapist,
    therapistLoading: sessionLoading,
    patientDetails,
    patientsLoading,
    patientLocations,
    locationsLoading,
    selectedPatient,
    selectedLocation,
    handleConfirm,
    isConfirming: initiatePaymentMutation.isPending || finalizeBookingMutation.isPending,
    navigate,
  };
};
