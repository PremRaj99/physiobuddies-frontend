import { AnimatePresence } from 'framer-motion';
import { ChevronLeft } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { Skeleton } from '@/components/ui/skeleton';

import { BOOKING_STEPS } from './constants';
import { useBookingFlow } from './hooks/useBookingFlow';
import { SessionExpired } from './components/SessionExpired';
import { HoldTimer } from './components/HoldTimer';
import { StepIndicator } from './components/StepIndicator';
import { PatientStep } from './components/PatientStep';
import { LocationStep } from './components/LocationStep';
import { ConditionStep } from './components/ConditionStep';
import { CheckoutStep } from './components/CheckoutStep';

const BookingPage = () => {
  const {
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
    isConfirming,
    navigate,
  } = useBookingFlow();

  if (!slotDate || startHour === undefined) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <p className="text-muted-foreground">Invalid booking link. Please select a slot from the therapist page.</p>
      </div>
    );
  }

  if (sessionExpired) {
    return <SessionExpired onRestart={() => navigate(-1)} />;
  }

  return (
    <div className="min-h-screen bg-linear-to-br from-[#e8f4f8] to-white">
      <div className="mx-auto max-w-5xl px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <Button variant="ghost" className="mb-4 text-[#014f86]" onClick={() => navigate(-1)}>
            <ChevronLeft className="mr-2 h-4 w-4" /> Back
          </Button>
          <h1 className="text-3xl font-bold text-[#012a4a]">Book a Session</h1>
          {therapistLoading ? (
            <Skeleton className="mt-1 h-5 w-48" />
          ) : therapist ? (
            <p className="text-muted-foreground mt-1">
              with Dr. {therapist.name} · {slotDate} at {startHour}:00
            </p>
          ) : null}
        </div>

        {/* Timer */}
        {reservationId && (
          <HoldTimer durationMinutes={10} onExpire={() => setSessionExpired(true)} />
        )}

        {/* Step Indicator */}
        <StepIndicator steps={BOOKING_STEPS} currentStep={step} />

        {/* Step Content */}
        <AnimatePresence mode="wait">
          {step === 1 && (
            <PatientStep
              key="patient"
              patients={patientDetails}
              selectedId={selectedPatientId}
              onSelect={setSelectedPatientId}
              onNext={() => setStep(2)}
              isLoading={patientsLoading}
            />
          )}
          {step === 2 && (
            <LocationStep
              key="location"
              locations={patientLocations}
              selectedId={selectedLocationId}
              onSelect={setSelectedLocationId}
              onNext={() => setStep(3)}
              onBack={() => setStep(1)}
              isLoading={locationsLoading}
            />
          )}
          {step === 3 && (
            <ConditionStep
              key="condition"
              selectedConditionId={selectedConditionId}
              onSelectCondition={setSelectedConditionId}
              problemDesc={problemDesc}
              onChangeDesc={setProblemDesc}
              onBack={() => setStep(2)}
              onNext={() => setStep(4)}
            />
          )}
          {step === 4 && therapist && selectedPatient && selectedLocation && (
            <CheckoutStep
              key="checkout"
              therapist={therapist}
              slotDate={slotDate}
              slotHour={startHour}
              patient={selectedPatient}
              location={selectedLocation}
              conditionId={selectedConditionId}
              problemDesc={problemDesc}
              onBack={() => setStep(3)}
              onComplete={handleConfirm}
              isConfirming={isConfirming}
            />
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default BookingPage;
