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
import { useState } from 'react';

import AnimatedSuccess from '@/components/custom/animated-success/AnimatedSuccess';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { useSubmitTherapistOnboarding, useUpdateAvatar, useUploadFile } from '@/hooks/useUser';
import { cn } from '@/lib/utils';
import { getCurrentUser } from '@/services/user.service';
import { useCurrUser } from '@/store/userStore';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';

import { DocumentsStep, type OnboardingFormData } from './components/DocumentsStep';
import { ExpertiseStep } from './components/ExpertiseStep';
import { PersonalStep } from './components/PersonalStep';
import { ProfessionalStep } from './components/ProfessionalStep';
import { ReviewStep } from './components/ReviewStep';

const STEPS = [
  { id: 1, title: 'Personal', icon: User },
  { id: 2, title: 'Professional', icon: Briefcase },
  { id: 3, title: 'Expertise', icon: GraduationCap },
  { id: 4, title: 'Documents', icon: FileText },
  { id: 5, title: 'Review', icon: ShieldCheck },
];

// --- Main Page Component ---
export default function TherapistOnboardingPage() {
  const user = useCurrUser((state) => state.user);
  const setUser = useCurrUser((state) => state.setUser);
  const [step, setStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(!!user.therapistStatus?.isOnboardingFilled);
  const navigate = useNavigate();

  const uploadMutation = useUploadFile();
  const onboardingMutation = useSubmitTherapistOnboarding();
  const updateAvatarMutation = useUpdateAvatar();

  const [imagePreview, setImagePreview] = useState(user.image || '');

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.size > 5 * 1024 * 1024) {
        toast.error('Profile image size must be less than 5MB');
        return;
      }
      updateField('image', file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  /* STREAMING_CHUNK:Initializing Form State... */
  const [formData, setFormData] = useState<OnboardingFormData>({
    // Step 1: Personal
    image: null as File | null,
    dob: '',
    displayAddress: '',
    about: '',
    // Step 2: Professional
    experience: '',
    iapId: '',
    affiliation: '',
    // Step 3: Expertise
    specializations: [] as string[],
    education: [] as string[],
    languages: [] as string[],
    // Step 4: Documents
    resume: null as File | null,
    certificates: [] as File[],
  });

  /* STREAMING_CHUNK:Handling Inputs and Multi-selects... */
  const updateField = (field: string, value: string | File | null | string[]) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const toggleArrayItem = (field: 'specializations' | 'education' | 'languages', item: string) => {
    setFormData((prev) => {
      const array = prev[field];
      if (array.includes(item)) {
        return { ...prev, [field]: array.filter((i) => i !== item) };
      } else {
        return { ...prev, [field]: [...array, item] };
      }
    });
  };

  const handleNext = () => setStep((p) => Math.min(5, p + 1));
  const handleBack = () => setStep((p) => Math.max(1, p - 1));

  const handleSubmit = async () => {
    setIsSubmitting(true);
    try {
      let avatarUrl = '';
      if (formData.image) {
        const uploadRes = await uploadMutation.mutateAsync(formData.image);
        if (uploadRes.success && uploadRes.data) {
          avatarUrl = uploadRes.data.url;
          await updateAvatarMutation.mutateAsync({ avatar: avatarUrl });
        }
      }

      let resumeUrl = '';
      if (formData.resume) {
        const uploadRes = await uploadMutation.mutateAsync(formData.resume);
        if (uploadRes.success && uploadRes.data) {
          resumeUrl = uploadRes.data.url;
        }
      }

      const certificateUrls: string[] = [];
      if (formData.certificates && formData.certificates.length > 0) {
        for (const certFile of formData.certificates) {
          const uploadRes = await uploadMutation.mutateAsync(certFile);
          if (uploadRes.success && uploadRes.data) {
            certificateUrls.push(uploadRes.data.url);
          }
        }
      }

      const payload = {
        dob: formData.dob,
        displayAddress: formData.displayAddress,
        about: formData.about,
        experience: Number(formData.experience),
        iapId: formData.iapId,
        affiliation: formData.affiliation,
        specializations: formData.specializations,
        education: formData.education,
        languages: formData.languages,
        resume: resumeUrl,
        certificates: certificateUrls,
      };

      onboardingMutation.mutate(payload, {
        onSuccess: async () => {
          setIsSuccess(true);
          toast.success('Onboarding profile submitted successfully!');
          try {
            const userRes = await getCurrentUser();
            if (userRes.success && userRes.data) {
              setUser(userRes.data);
            }
          } catch (err) {
            console.error('Error fetching user profile:', err);
          }
        },
        onError: (err: unknown) => {
          const response = (err as { response?: { data?: { message?: string } } }).response;
          const errMsg = response?.data?.message || 'Failed to submit onboarding profile.';
          toast.error(errMsg);
        },
        onSettled: () => {
          setIsSubmitting(false);
        },
      });
    } catch (error) {
      console.error('Error uploading documents:', error);
      toast.error('Failed to upload onboarding documents.');
      setIsSubmitting(false);
    }
  };

  /* STREAMING_CHUNK:Rendering Success Screen... */
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

  /* STREAMING_CHUNK:Rendering the Form Wizard... */
  return (
    <div className="min-h-body bg-[#f8fbfa] pb-24 font-sans">
      {/* Header Decorator */}

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
