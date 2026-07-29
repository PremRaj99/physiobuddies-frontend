import { motion } from 'framer-motion';
import { ArrowLeft, ShieldCheck } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';

import { usePatientBookingFlow } from './hooks/usePatientBookingFlow';
import { TherapistCard } from './components/TherapistCard';
import { PatientInfoCard } from './components/PatientInfoCard';
import { LocationCard } from './components/LocationCard';
import { TreatmentSessionsList } from './components/TreatmentSessionsList';
import { MedicalDocumentsList } from './components/MedicalDocumentsList';
import { CancelSessionModal } from './components/CancelSessionModal';
import { BookMoreModal } from './components/BookMoreModal';

export default function BookingDetailPage() {
  const {
    navigate,
    data,
    treatmentPlanId,
    seeMoreSlotsRes,
    // Modals
    isCancelOpen,
    setIsCancelOpen,
    cancelReason,
    setCancelReason,
    isBookMoreOpen,
    setIsBookMoreOpen,
    bookMoreDate,
    setBookMoreDate,
    bookMoreHour,
    setBookMoreHour,
    // Actions
    openCancelModal,
    handleCancelSubmit,
    handleBookMoreSubmit,
    isCancelling,
    isBookingMore,
  } = usePatientBookingFlow();

  // Framer Motion Variants
  const containerVariants = {
    hidden: { opacity: 0 },
    show: { opacity: 1, transition: { staggerChildren: 0.1 } },
  };
  const itemVariants = {
    hidden: { opacity: 0, y: 15 },
    show: { opacity: 1, y: 0, transition: { duration: 0.4 } },
  };

  return (
    <div className="min-h-screen bg-[#f8fbfa] pb-24 font-sans">
      {/* Header Decorator */}
      <div className="relative w-full overflow-hidden border-b border-[#014f86]/10 bg-[#a9d6e5] px-4 pt-8 pb-32 sm:px-6">
        <div className="absolute top-0 right-0 -mt-20 -mr-20 h-96 w-96 rounded-full bg-white/20 blur-3xl" />

        <div className="relative z-10 mx-auto flex max-w-6xl flex-col justify-between gap-4 sm:flex-row sm:items-center">
          <div>
            <Button
              onClick={() => navigate('/patient/my-bookings')}
              variant="ghost"
              className="mb-4 pl-0 text-[#013a63] hover:bg-white/40"
            >
              <ArrowLeft className="mr-2 h-4 w-4" /> Back to Bookings
            </Button>
            <h1 className="flex items-center gap-3 text-3xl font-bold text-[#012a4a] md:text-4xl">
              Booking Details
            </h1>
            <p className="mt-2 flex items-center gap-2 font-medium text-[#013a63]">
              <span className="rounded bg-white/50 px-2 py-0.5 font-mono text-sm tracking-wide">
                {data.bookingId}
              </span>
              <Badge className="bg-[#014f86] text-white hover:bg-[#014f86]">
                {data.overallStatus.replace('_', ' ')}
              </Badge>
            </p>
          </div>
          {treatmentPlanId && (
            <Button
              onClick={() => setIsBookMoreOpen(true)}
              className="bg-[#014f86] font-bold text-white hover:bg-[#013a63]"
            >
              + Book Follow-Up Session
            </Button>
          )}
        </div>
      </div>

      <main className="relative z-20 mx-auto -mt-20 max-w-6xl px-4 sm:px-6">
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
          {/* LEFT COLUMN: Main Content */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="show"
            className="space-y-8 lg:col-span-2"
          >
            <motion.div variants={itemVariants}>
              <TherapistCard therapist={data.therapist} />
            </motion.div>

            {/* Treatment Sessions Timeline */}
            <motion.div variants={itemVariants}>
              <TreatmentSessionsList sessions={data.sessions} onCancelRequest={openCancelModal} />
            </motion.div>

            {/* Documents & Assessments */}
            <motion.div variants={itemVariants}>
              <MedicalDocumentsList documents={data.documents} />
            </motion.div>
          </motion.div>

          {/* RIGHT COLUMN: Info Panels */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="show"
            className="space-y-8"
          >
            <motion.div variants={itemVariants}>
              <PatientInfoCard
                patient={data.patient}
                condition={data.condition}
                problemDescription={data.problemDescription}
              />
            </motion.div>

            <motion.div variants={itemVariants}>
              <LocationCard location={data.location} mode={data.therapist.mode} />
            </motion.div>

            {/* Help & Support Card */}
            <motion.div variants={itemVariants}>
              <Card className="border-border bg-[#012a4a] py-2 text-white shadow-sm">
                <CardContent className="p-6">
                  <h3 className="mb-2 flex items-center gap-2 text-lg font-bold">
                    <ShieldCheck className="h-5 w-5 text-[#a9d6e5]" /> Need Help?
                  </h3>
                  <p className="mb-4 text-sm leading-relaxed text-gray-300">
                    If you have questions about your sessions or need to reschedule, our support
                    team is available 24/7.
                  </p>
                  <Button className="w-full bg-[#a9d6e5] text-[#012a4a] transition-colors hover:bg-white">
                    Contact Support
                  </Button>
                </CardContent>
              </Card>
            </motion.div>
          </motion.div>
        </div>

        {/* Cancellation Dialog */}
        <CancelSessionModal
          isOpen={isCancelOpen}
          onOpenChange={setIsCancelOpen}
          cancelReason={cancelReason}
          setCancelReason={setCancelReason}
          isCancelling={isCancelling}
          onSubmit={handleCancelSubmit}
        />

        {/* Book Follow-Up Session Dialog */}
        <BookMoreModal
          isOpen={isBookMoreOpen}
          onOpenChange={setIsBookMoreOpen}
          bookMoreDate={bookMoreDate}
          setBookMoreDate={setBookMoreDate}
          bookMoreHour={bookMoreHour}
          setBookMoreHour={setBookMoreHour}
          seeMoreSlotsRes={seeMoreSlotsRes}
          isBookingMore={isBookingMore}
          onSubmit={handleBookMoreSubmit}
        />
      </main>
    </div>
  );
}
