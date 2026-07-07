import { AnimatePresence, motion } from 'framer-motion';
import {
  Briefcase,
  CheckCircle,
  ChevronLeft,
  ChevronRight,
  FileText,
  GraduationCap,
  ShieldCheck,
  User,
} from 'lucide-react';

import AnimatedSuccess from '@/components/custom/animated-success/AnimatedSuccess';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { cn } from '@/lib/utils';

import { DocumentsStep } from './components/DocumentsStep';
import { ExpertiseStep } from './components/ExpertiseStep';
import { PersonalStep } from './components/PersonalStep';
import { ProfessionalStep } from './components/ProfessionalStep';
import { ReviewStep } from './components/ReviewStep';
import { useTherapistOnboarding } from './hooks/useTherapistOnboarding';

const STEPS = [
  { id: 1, title: 'Personal', icon: User },
  { id: 2, title: 'Professional', icon: Briefcase },
  { id: 3, title: 'Expertise', icon: GraduationCap },
  { id: 4, title: 'Documents', icon: FileText },
  { id: 5, title: 'Review', icon: ShieldCheck },
];

export default function TherapistOnboardingPage() {
  const {
    step,
    isSubmitting,
    isSuccess,
    imagePreview,
    setImagePreview,
    formData,
    setFormData,
    updateField,
    toggleArrayItem,
    handleImageChange,
    handleNext,
    handleBack,
    handleSubmit,
    navigate,
  } = useTherapistOnboarding();

  if (isSuccess) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-[#f8fbfa] p-4">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="w-full max-w-md"
        >
          <Card className="border-border gap-0 bg-white px-6 pt-12 text-center shadow-xl shadow-[#012a4a]/5">
            <div className="bg-success/10 mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-full">
              <AnimatedSuccess />
            </div>
            <h1 className="mb-4 text-3xl font-bold text-[#012a4a]">Application Submitted!</h1>
            <p className="mb-8 leading-relaxed text-[#013a63]">
              Thank you for completing your profile. Our medical board will review your credentials
              shortly.
              <strong>
                {' '}
                We'll schedule your interview soon. Be active on your registered email.
              </strong>
            </p>
            <Button onClick={() => navigate('/')}>Return to Home</Button>
          </Card>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-body bg-[#f8fbfa] pb-24 font-sans">
      <main className="mx-auto max-w-4xl px-4 pt-4 sm:px-6">
        <Card className="border-border gap-0 overflow-hidden py-0 shadow-xl shadow-[#012a4a]/5">
          {/* Stepper Header */}
          <div className="bg-secondary/20 border-border border-b p-6">
            <div className="relative flex items-center justify-between">
              <div className="bg-border absolute top-1/2 left-0 -z-10 h-1 w-full -translate-y-1/2" />
              <div
                className="absolute top-1/2 left-0 -z-10 h-1 -translate-y-1/2 bg-[#014f86] transition-all duration-500"
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

          {/* Form Content */}
          <CardContent className="min-h-100 p-6 md:p-10">
            <AnimatePresence mode="wait">
              {step === 1 && (
                <PersonalStep
                  formData={formData}
                  imagePreview={imagePreview}
                  handleImageChange={handleImageChange}
                  updateField={updateField}
                  setImagePreview={setImagePreview}
                />
              )}

              {step === 2 && <ProfessionalStep formData={formData} updateField={updateField} />}

              {step === 3 && (
                <ExpertiseStep formData={formData} toggleArrayItem={toggleArrayItem} />
              )}

              {step === 4 && (
                <DocumentsStep
                  formData={formData}
                  updateField={updateField}
                  setFormData={setFormData}
                />
              )}

              {step === 5 && <ReviewStep formData={formData} />}
            </AnimatePresence>
          </CardContent>

          {/* Footer Actions */}
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
