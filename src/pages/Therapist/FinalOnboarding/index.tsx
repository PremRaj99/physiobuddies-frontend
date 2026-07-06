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
import { useEffect, useState } from 'react';

import AnimatedSuccess from '@/components/custom/animated-success/AnimatedSuccess';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { useSubmitTherapistFinalOnboarding, useUpdateAvatar, useUploadFile } from '@/hooks/useUser';
import { cn } from '@/lib/utils';
import { getCurrentUser } from '@/services/user.service';
import { useCurrUser } from '@/store/userStore';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';

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

type FormData = {
  about: string;
  address: string;
  lat: string;
  lng: string;
  accountName: string;
  bankName: string;
  branchName: string;
  accountNumber: string;
  ifsc: string;
  upiId: string;
  planId: string;
  slots: Record<string, string[]>;
};

// --- Main Page Component ---
export default function TherapistFinalOnboarding() {
  const [formData, setFormData] = useState<FormData>({
    // Step 1: Profile & Location
    about: '',
    address: '',
    lat: '',
    lng: '',

    // Step 2: Financials
    accountName: '',
    bankName: '',
    branchName: '',
    accountNumber: '',
    ifsc: '',
    upiId: '',

    // Step 3: Subscription
    planId: '6m', // Default selection

    // Step 4: Slots
    slots: {} as Record<string, string[]>, // e.g., { "Mon": ["morning", "evening"] }
  });

  const [step, setStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [isDetectingLocation, setIsDetectingLocation] = useState(false);

  const finalOnboardingMutation = useSubmitTherapistFinalOnboarding();
  const uploadMutation = useUploadFile();
  const updateAvatarMutation = useUpdateAvatar();
  const user = useCurrUser((state) => state.user);
  const setUser = useCurrUser((state) => state.setUser);

  const navigate = useNavigate();

  const [imagePreview, setImagePreview] = useState(user.image || '');

  // Prefill formData fields from user profile once loaded
  useEffect(() => {
    if (user?.therapistProfile) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setFormData((prev) => ({
        ...prev,
        about: prev.about || user.therapistProfile?.about || '',
        address: prev.address || user.therapistProfile?.displayAddress || '',
        lat: prev.lat || user.therapistProfile?.location?.lat?.toString() || '',
        lng: prev.lng || user.therapistProfile?.location?.lng?.toString() || '',
      }));
    }
    if (user?.image) {
      setImagePreview(user.image);
    }
  }, [user]);

  const handleImageChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.size > 5 * 1024 * 1024) {
        toast.error('Image size must be less than 5MB');
        return;
      }

      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result as string);
      };
      reader.readAsDataURL(file);

      try {
        const uploadRes = await uploadMutation.mutateAsync(file);
        if (uploadRes.success && uploadRes.data) {
          const avatarUrl = uploadRes.data.url;
          await updateAvatarMutation.mutateAsync({ avatar: avatarUrl });
          toast.success('Profile picture updated successfully!');

          const userRes = await getCurrentUser();
          if (userRes.success && userRes.data) {
            setUser(userRes.data);
          }
        }
      } catch {
        toast.error('Failed to upload profile picture.');
      }
    }
  };

  /* STREAMING_CHUNK:Helper Functions... */
  const updateField = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const detectLocation = () => {
    setIsDetectingLocation(true);
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        async (position) => {
          const { latitude, longitude } = position.coords;
          updateField('lat', latitude.toString());
          updateField('lng', longitude.toString());

          try {
            const response = await fetch(
              `https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}`,
            );
            const data = await response.json();
            if (data && data.display_name) {
              updateField('address', data.display_name);
            } else {
              updateField('address', `Location: ${latitude}, ${longitude}`);
            }
          } catch (err) {
            console.error('Reverse geocoding failed:', err);
            updateField('address', `Location: ${latitude}, ${longitude}`);
          }
          setIsDetectingLocation(false);
        },
        (error) => {
          console.error(error);
          toast.error('Failed to detect location. Please search manually.');
          setIsDetectingLocation(false);
        },
      );
    } else {
      toast.error('Geolocation is not supported by your browser.');
      setIsDetectingLocation(false);
    }
  };

  const toggleSlot = (day: string, period: string) => {
    setFormData((prev) => {
      const currentDaySlots = prev.slots[day] || [];
      const newDaySlots = currentDaySlots.includes(period)
        ? currentDaySlots.filter((p) => p !== period)
        : [...currentDaySlots, period];
      return { ...prev, slots: { ...prev.slots, [day]: newDaySlots } };
    });
  };

  const handleNext = () => {
    if (step === 1) {
      if (!formData.about.trim()) {
        toast.error('Please write something in the About section.');
        return;
      }
      if (!formData.address.trim() || !formData.lat || !formData.lng) {
        toast.error('Please verify coordinates by clicking Detect Location or Choose Map.');
        return;
      }
    } else if (step === 2) {
      const hasBankDetails =
        formData.accountName.trim() &&
        formData.bankName.trim() &&
        formData.branchName.trim() &&
        formData.accountNumber.trim() &&
        formData.ifsc.trim();
      const hasUpi = formData.upiId.trim();

      if (!hasBankDetails && !hasUpi) {
        toast.error('Please fill in bank account details or enter a UPI ID.');
        return;
      }
      if (hasBankDetails && !hasUpi) {
        if (formData.accountNumber.length < 9) {
          toast.error('Account number must be at least 9 digits.');
          return;
        }
        if (formData.ifsc.length < 11) {
          toast.error('IFSC code must be exactly 11 characters.');
          return;
        }
      }
    } else if (step === 4) {
      const hasSlots = Object.values(formData.slots).some((arr) => arr && arr.length > 0);
      if (!hasSlots) {
        toast.error('Please select at least one availability slot.');
        return;
      }
    }
    setStep((p) => Math.min(5, p + 1));
  };
  const handleBack = () => setStep((p) => Math.max(1, p - 1));

  const handleSubmit = () => {
    setIsSubmitting(true);
    finalOnboardingMutation.mutate(formData, {
      onSuccess: async () => {
        setIsSuccess(true);
        toast.success('Final onboarding details submitted successfully!');
        try {
          const userRes = await getCurrentUser();
          if (userRes.success && userRes.data) {
            setUser({
              id: userRes.data.id,
              name: userRes.data.name,
              email: userRes.data.email,
              phone: userRes.data.phone || null,
              role: userRes.data.role,
              therapistStatus: userRes.data.therapistStatus || null,
            });
          }
        } catch (err) {
          console.error('Error fetching user profile:', err);
        }
      },
      onError: (err: unknown) => {
        const response = (err as { response?: { data?: { message?: string } } }).response;
        const errMsg = response?.data?.message || 'Failed to submit final onboarding.';
        toast.error(errMsg);
      },
      onSettled: () => {
        setIsSubmitting(false);
      },
    });
  };

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
