import { useState, useEffect, useRef } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { toast } from 'sonner';

import {
  usePatientDetails,
  usePatientLocations,
  useBookingSession,
  useUpdateBookingForm,
  useInitiatePayment,
  useFinalizeBooking,
  useVerifyPayment,
} from '@/hooks/usePatient';
import { useRazorpay } from '@/hooks/useRazorpay';

export const useBookingFlow = () => {
  const { id: sessionId } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { processPayment, isProcessing: isRazorpayProcessing } = useRazorpay();

  const [step, setStepState] = useState(1);
  const [selectedPatientId, setSelectedPatientId] = useState<string | null>(null);
  const [selectedLocationId, setSelectedLocationId] = useState<string | null>(null);
  const [selectedConditionId, setSelectedConditionId] = useState<string | null>(null);
  const [problemDesc, setProblemDesc] = useState('');
  const restoredRef = useRef(false);

  const [manualExpired, setManualExpired] = useState(false);

  const {
    data: sessionResponse,
    isLoading: sessionLoading,
    error: sessionError,
  } = useBookingSession(sessionId);
  const { data: patientDetails = [], isLoading: patientsLoading } = usePatientDetails();
  const { data: patientLocations = [], isLoading: locationsLoading } = usePatientLocations();

  const updateFormMutation = useUpdateBookingForm();
  const initiatePaymentMutation = useInitiatePayment();
  const verifyPaymentMutation = useVerifyPayment();
  const finalizeBookingMutation = useFinalizeBooking();

  const sessionData = sessionResponse?.data;

  // Restore session data on load
  useEffect(() => {
    if (!sessionData || restoredRef.current) return;

    if (sessionData.isConfirmed) {
      toast.success('This booking is already confirmed!');
      navigate('/patient/my-bookings');
      return;
    }

    restoredRef.current = true;
    queueMicrotask(() => {
      if (sessionData.step) setStepState(sessionData.step);
      if (sessionData.formData?.patientDetailId)
        setSelectedPatientId(sessionData.formData.patientDetailId);
      if (sessionData.formData?.locationId) setSelectedLocationId(sessionData.formData.locationId);
      if (sessionData.formData?.conditionId)
        setSelectedConditionId(sessionData.formData.conditionId);
      if (sessionData.formData?.problemDesc) setProblemDesc(sessionData.formData.problemDesc);
    });
  }, [sessionData, navigate]);

  const sessionExpired = Boolean(sessionError) || manualExpired;

  const rawDate = sessionData?.date;
  const slotDate = rawDate
    ? isNaN(Date.parse(rawDate))
      ? rawDate
      : new Date(rawDate).toLocaleDateString('en-US', {
          month: 'short',
          day: 'numeric',
          year: 'numeric',
        })
    : '';

  const startHour = sessionData?.startHour;
  const expiresAt = sessionData?.expiresAt;
  const therapist = sessionData?.therapist;
  const therapistLoading = sessionLoading;

  const couponCode = sessionData?.formData?.couponCode || null;
  const couponDiscount = sessionData?.formData?.couponDiscount || 0;

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
      // 1. Initiate payment order (creates Razorpay Order on server)
      const res = await initiatePaymentMutation.mutateAsync(sessionId);
      const paymentData = res.data;

      if (!paymentData?.razorpayOrderId) {
        // Fallback for dev/test if order creation fails/skipped
        await finalizeBookingMutation.mutateAsync({ sessionId });
        toast.success('Booking confirmed!');
        navigate('/patient/my-bookings');
        return;
      }

      // 2. Open Razorpay Checkout modal
      const razorpayResponse = await processPayment({
        orderId: paymentData.razorpayOrderId,
        amount: paymentData.amount,
        keyId: paymentData.razorpayKeyId,
        description: 'PhysioBuddies Therapy Session',
        prefill: {
          name: selectedPatient?.name || '',
          contact: selectedPatient?.phone || '',
        },
        notes: {
          sessionId,
          paymentId: paymentData.paymentId,
        },
      });

      // 3. Verify payment signature on server (which also finalizes booking)
      await verifyPaymentMutation.mutateAsync({
        razorpay_payment_id: razorpayResponse.razorpay_payment_id,
        razorpay_order_id: razorpayResponse.razorpay_order_id,
        razorpay_signature: razorpayResponse.razorpay_signature,
        sessionId,
        internalPaymentId: paymentData.paymentId,
      });

      toast.success('Payment completed & booking confirmed!');
      navigate('/patient/my-bookings');
    } catch (e: unknown) {
      const err = e as { message?: string; response?: { data?: { message?: string } } };
      const errorMessage =
        err.response?.data?.message || err.message || 'Payment failed. Please try again.';
      toast.error(errorMessage);
    }
  };

  const selectedPatient = patientDetails.find((p) => p.id === selectedPatientId);
  const selectedLocation = patientLocations.find((l) => l.id === selectedLocationId);

  const isSubmitting =
    updateFormMutation.isPending ||
    initiatePaymentMutation.isPending ||
    verifyPaymentMutation.isPending ||
    finalizeBookingMutation.isPending ||
    isRazorpayProcessing;

  return {
    sessionId,
    slotDate,
    startHour,
    expiresAt,
    step,
    setStep,
    sessionData,
    sessionLoading,
    sessionExpired,
    setSessionExpired: setManualExpired,
    therapist,
    therapistLoading,
    patientDetails,
    patientsLoading,
    patientLocations,
    locationsLoading,
    selectedPatientId,
    setSelectedPatientId: handleSelectPatient,
    selectedLocationId,
    setSelectedLocationId: handleSelectLocation,
    selectedConditionId,
    setSelectedConditionId: handleSelectCondition,
    problemDesc,
    setProblemDesc: handleDescChange,
    couponCode,
    couponDiscount,
    selectedPatient,
    selectedLocation,
    handleSelectPatient,
    handleSelectLocation,
    handleSelectCondition,
    handleDescChange,
    handleConfirm,
    isConfirming: isSubmitting,
    isSubmitting,
    navigate,
  };
};
