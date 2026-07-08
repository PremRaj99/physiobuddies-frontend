import { AnimatePresence, motion } from 'framer-motion';
import {
  Banknote,
  CalendarDays,
  CheckCircle,
  ChevronLeft,
  ChevronRight,
  CreditCard,
  MapPin,
  ShieldCheck,
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useFinalOnboarding } from './hooks/useFinalOnboarding';

import AnimatedSuccess from '@/components/custom/animated-success/AnimatedSuccess';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { cn } from '@/lib/utils';

import { AvailabilityStep } from './components/AvailabilityStep';
import { FinancialsStep } from './components/FinancialsStep';
import { ProfileLocationStep } from './components/ProfileLocationStep';
import { ReviewStep } from './components/ReviewStep';
import { SubscriptionStep } from './components/SubscriptionStep';

const STEPS = [
  { id: 1, title: 'Profile & Location', icon: MapPin },
  { id: 2, title: 'Financials', icon: Banknote },
  { id: 3, title: 'Subscription', icon: CreditCard },
  { id: 4, title: 'Availability', icon: CalendarDays },
  { id: 5, title: 'Review', icon: ShieldCheck },
];

// --- Main Page Component ---
export default function TherapistFinalOnboarding() {
  const navigate = useNavigate();
  const {
    formData,
    step,
    isSubmitting,
    isSuccess,
    isDetectingLocation,
    imagePreview,
    handleImageChange,
    updateField,
    detectLocation,
    toggleSlot,
    handleNext,
    handleBack,
    handleSubmit,
  } = useFinalOnboarding();

  /* STREAMING_CHUNK:Rendering Success Screen... */
  if (isSuccess) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-[#f8fbfa] p-4 pt-12 font-sans">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="w-full max-w-md"
        >
          <Card className="border-border gap-0 bg-white px-6 text-center shadow-xl shadow-[#012a4a]/5">
            <div className="bg-success/10 mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-full">
              <AnimatedSuccess />
            </div>
            <h1 className="mb-4 text-3xl font-bold text-[#012a4a]">Saved Successfully!</h1>
            <p className="mb-8 leading-relaxed text-[#013a63]">
              Congratulations! Your profile has been successfully updated. You can now access your
              dashboard and manage your account.
            </p>
            <Button
              className="w-full bg-[#014f86] text-white hover:bg-[#013a63]"
              onClick={() => navigate('/therapist/dashboard')}
            >
              Go to Dashboard
            </Button>
          </Card>
        </motion.div>
      </div>
    );
  }

  /* STREAMING_CHUNK:Rendering Wizard Header... */
  return (
    <div className="min-h-body bg-background pb-24 font-sans">
      <main className="mx-auto max-w-5xl px-4 pt-6 sm:px-6">
        <Card className="border-border gap-0 overflow-hidden py-0 shadow-xl shadow-[#012a4a]/5">
          {/* Stepper Header */}
          <div className="bg-secondary/20 border-border border-b p-6">
            <div className="relative flex items-center justify-between">
              <div className="bg-border absolute top-1/2 left-0 -z-10 h-1 w-full -translate-y-1/2" />
              <div
                className="absolute top-1/2 left-8 -z-10 h-1 -translate-y-1/2 bg-[#014f86] transition-all duration-500"
                style={{ width: `${((step - 1) / 4) * 100}%` }}
              />
              {STEPS.map((s) => {
                const isActive = s.id === step;
                const isPassed = s.id < step;
                return (
                  <div key={s.id} className="flex flex-col items-center px-2">
                    <div
                      className={cn(
                        `flex h-10 w-10 items-center justify-center rounded-full border-2 transition-colors`,
                        isActive
                          ? 'border-[#014f86] bg-[#014f86] text-white'
                          : isPassed
                            ? 'text-success border-transparent bg-[#ffffff]'
                            : 'border-border text-muted-foreground bg-gray-50',
                      )}
                    >
                      {isPassed ? (
                        <CheckCircle className="h-6 w-6" />
                      ) : (
                        <s.icon className="h-5 w-5" />
                      )}
                    </div>
                    <span
                      className={cn(
                        `mt-2 hidden text-xs font-bold sm:block`,
                        isActive || isPassed ? 'text-[#012a4a]' : 'text-muted-foreground',
                      )}
                    >
                      {s.title}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>

          <CardContent className="min-h-112.5 p-6 md:p-10">
            <AnimatePresence mode="wait">
              {step === 1 && (
                <ProfileLocationStep
                  formData={formData}
                  imagePreview={imagePreview}
                  isDetectingLocation={isDetectingLocation}
                  handleImageChange={handleImageChange}
                  updateField={updateField}
                  detectLocation={detectLocation}
                />
              )}

              {step === 2 && <FinancialsStep formData={formData} updateField={updateField} />}

              {step === 3 && <SubscriptionStep formData={formData} updateField={updateField} />}

              {step === 4 && <AvailabilityStep formData={formData} toggleSlot={toggleSlot} />}

              {step === 5 && <ReviewStep formData={formData} />}
            </AnimatePresence>
          </CardContent>
          <div className="border-border flex items-center justify-between border-t bg-gray-50 p-6">
            <Button
              variant="ghost"
              onClick={handleBack}
              disabled={step === 1 || isSubmitting}
              className="text-[#013a63]"
            >
              <ChevronLeft className="mr-2 h-4 w-4" /> Back
            </Button>

            {step < 5 ? (
              <Button
                onClick={handleNext}
                className="bg-[#014f86] px-8 text-white hover:bg-[#013a63]"
              >
                Next <ChevronRight className="ml-2 h-4 w-4" />
              </Button>
            ) : (
              <Button
                onClick={handleSubmit}
                disabled={isSubmitting}
                className="bg-success px-8 font-bold text-white hover:bg-emerald-600"
              >
                {isSubmitting ? 'Submitting...' : 'Submit for Verification'}
              </Button>
            )}
          </div>
        </Card>
      </main>
    </div>
  );
}
