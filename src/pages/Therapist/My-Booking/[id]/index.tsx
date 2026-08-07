import { ArrowLeft } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';

import { useTherapistBookingFlow } from './hooks/useTherapistBookingFlow';
import { PatientHeader } from './components/PatientHeader';
import { TreatmentTimeline } from './components/TreatmentTimeline';
import { MedicalRecordsSection } from './components/MedicalRecordsSection';
import { VisitLogistics } from './components/VisitLogistics';
import { ClinicalSupport } from './components/ClinicalSupport';
import { OtpModal } from './components/OtpModal';
import { RescheduleModal } from './components/RescheduleModal';
import { AddDocumentModal } from './components/AddDocumentModal';
import { ImprovementRecordModal } from './components/ImprovementRecordModal';
import { CompletePlanModal } from './components/CompletePlanModal';

export default function TherapistBookingDetailPage() {
  const {
    navigate,
    booking,
    isLoading,
    // Modals visibility
    isOtpOpen,
    setIsOtpOpen,
    isRescheduleOpen,
    setIsRescheduleOpen,
    isDocsOpen,
    setIsDocsOpen,
    isImprovementOpen,
    setIsImprovementOpen,
    isCompletePlanOpen,
    setIsCompletePlanOpen,
    // Session state
    sessionActive,
    isAccepting,
    isGeneratingOtp,
    isVerifyingOtp,
    devOtpCode,
    otpError,
    otpInput,
    setOtpInput,
    // Form states
    rescheduleDate,
    setRescheduleDate,
    rescheduleHour,
    setRescheduleHour,
    rescheduleReason,
    setRescheduleReason,
    docName,
    setDocName,
    docUrl,
    setDocUrl,
    docFileType,
    setDocFileType,
    painBefore,
    setPainBefore,
    painAfter,
    setPainAfter,
    improvementNotes,
    setImprovementNotes,
    exercisesGiven,
    setExercisesGiven,
    beforeImg,
    setBeforeImg,
    afterImg,
    setAfterImg,
    finalNotes,
    setFinalNotes,
    isCompletingPlan,
    // Handlers
    handleAccept,
    handleStartSessionOtp,
    handleVerifyOtp,
    handleEndSessionAction,
    openRescheduleModal,
    openAddDocsModal,
    handleRescheduleSubmit,
    handleAddDocsSubmit,
    handleImprovementSubmit,
    handleCompletePlanSubmit,
    // Pending states
    isRescheduling,
    isAddingDocs,
    isSubmittingImprovement,
  } = useTherapistBookingFlow();

  if (isLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-[#f8fbfa]">
        <div className="h-12 w-12 animate-spin rounded-full border-b-2 border-[#014f86]"></div>
      </div>
    );
  }

  if (!booking) {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center gap-4 bg-[#f8fbfa]">
        <p className="font-medium text-gray-600">Booking not found.</p>
        <Button onClick={() => navigate('/therapist/my-bookings')} variant="outline">
          Back to Bookings
        </Button>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#f8fbfa] pb-24 font-sans">
      {/* Header Decorator */}
      <div className="relative w-full overflow-hidden border-b border-[#014f86]/10 bg-[#a9d6e5] px-4 pt-8 pb-32 sm:px-6">
        <div className="absolute top-0 right-0 -mt-20 -mr-20 h-96 w-96 rounded-full bg-white/20 blur-3xl" />
        <div className="relative z-10 mx-auto flex max-w-6xl flex-col justify-between gap-4 sm:flex-row sm:items-center">
          <div>
            <Button
              variant="ghost"
              onClick={() => navigate('/therapist/my-bookings')}
              className="mb-4 pl-0 text-[#013a63] hover:bg-white/40"
            >
              <ArrowLeft className="mr-2 h-4 w-4" /> Schedule Overview
            </Button>
            <h1 className="flex items-center gap-3 text-3xl font-bold text-[#012a4a] md:text-4xl">
              Appointment Details
            </h1>
            <p className="mt-2 flex items-center gap-2 font-medium text-[#013a63]">
              <Badge className="bg-[#014f86] text-white hover:bg-[#014f86]">
                {(booking.overallStatus || 'IN_PROGRESS').replace('_', ' ')}
              </Badge>
            </p>
          </div>
        </div>
      </div>

      <main className="relative z-20 mx-auto -mt-20 max-w-6xl px-4 sm:px-6">
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
          {/* LEFT: Session Tracking */}
          <div className="space-y-8 lg:col-span-2">
            <PatientHeader
              patient={booking.patient}
              mode={booking.mode}
              condition={booking.condition}
              problemDescription={booking.problemDescription}
            />

            <TreatmentTimeline
              overallStatus={booking.overallStatus}
              sessions={booking.sessions || []}
              sessionActive={sessionActive}
              isAccepting={isAccepting}
              isGeneratingOtp={isGeneratingOtp}
              handleAccept={handleAccept}
              handleStartSessionOtp={handleStartSessionOtp}
              handleEndSessionAction={handleEndSessionAction}
              openAddDocsModal={openAddDocsModal}
              openRescheduleModal={openRescheduleModal}
            />

            <MedicalRecordsSection
              bookingId={booking.id}
              documents={booking.documents}
              clinicalAssessments={booking.clinicalAssessments || []}
              improvementRecords={booking.improvementRecords}
              openAddDocsModal={openAddDocsModal}
            />
          </div>

          {/* RIGHT: Logistics & Support */}
          <div className="space-y-8">
            <VisitLogistics location={booking.location} />
            <ClinicalSupport onCompletePlanClick={() => setIsCompletePlanOpen(true)} />
          </div>
        </div>

        {/* Dialog Modals */}
        <OtpModal
          isOpen={isOtpOpen}
          onOpenChange={setIsOtpOpen}
          otpInput={otpInput}
          setOtpInput={setOtpInput}
          devOtpCode={devOtpCode}
          otpError={otpError}
          isVerifyingOtp={isVerifyingOtp}
          onVerify={handleVerifyOtp}
        />

        <RescheduleModal
          isOpen={isRescheduleOpen}
          onOpenChange={setIsRescheduleOpen}
          rescheduleDate={rescheduleDate}
          setRescheduleDate={setRescheduleDate}
          rescheduleHour={rescheduleHour}
          setRescheduleHour={setRescheduleHour}
          rescheduleReason={rescheduleReason}
          setRescheduleReason={setRescheduleReason}
          isRescheduling={isRescheduling}
          onSubmit={handleRescheduleSubmit}
        />

        <AddDocumentModal
          isOpen={isDocsOpen}
          onOpenChange={setIsDocsOpen}
          docName={docName}
          setDocName={setDocName}
          docUrl={docUrl}
          setDocUrl={setDocUrl}
          docFileType={docFileType}
          setDocFileType={setDocFileType}
          isAddingDocs={isAddingDocs}
          onSubmit={handleAddDocsSubmit}
        />

        <ImprovementRecordModal
          isOpen={isImprovementOpen}
          onOpenChange={setIsImprovementOpen}
          painBefore={painBefore}
          setPainBefore={setPainBefore}
          painAfter={painAfter}
          setPainAfter={setPainAfter}
          improvementNotes={improvementNotes}
          setImprovementNotes={setImprovementNotes}
          exercisesGiven={exercisesGiven}
          setExercisesGiven={setExercisesGiven}
          isSubmittingImprovement={isSubmittingImprovement}
          onSubmit={handleImprovementSubmit}
        />

        <CompletePlanModal
          isOpen={isCompletePlanOpen}
          onOpenChange={setIsCompletePlanOpen}
          beforeImg={beforeImg}
          setBeforeImg={setBeforeImg}
          afterImg={afterImg}
          setAfterImg={setAfterImg}
          finalNotes={finalNotes}
          setFinalNotes={setFinalNotes}
          isCompletingPlan={isCompletingPlan}
          onSubmit={handleCompletePlanSubmit}
        />
      </main>
    </div>
  );
}
