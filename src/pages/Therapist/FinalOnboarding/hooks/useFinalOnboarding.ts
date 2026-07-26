import { useSubmitTherapistFinalOnboarding, useUpdateAvatar, useUploadFile } from '@/hooks/useUser';
import { getCurrentUser } from '@/services/user.service';
import { useCurrUser } from '@/store/userStore';
import { useEffect, useState } from 'react';
import { toast } from 'sonner';

export type FormData = {
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

export function useFinalOnboarding() {
  const [formData, setFormData] = useState<FormData>({
    about: '',
    address: '',
    lat: '',
    lng: '',
    accountName: '',
    bankName: '',
    branchName: '',
    accountNumber: '',
    ifsc: '',
    upiId: '',
    planId: '6m',
    slots: {} as Record<string, string[]>,
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

  const [imagePreview, setImagePreview] = useState(user?.image || '');

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

    const dayMap: Record<string, string> = {
      Mon: 'monday',
      Tue: 'tuesday',
      Wed: 'wednesday',
      Thu: 'thursday',
      Fri: 'friday',
      Sat: 'saturday',
      Sun: 'sunday',
    };

    const mappedSlots: Record<string, string[]> = {};
    Object.entries(formData.slots).forEach(([day, periods]) => {
      const fullDay = dayMap[day] || day.toLowerCase();
      mappedSlots[fullDay] = periods;
    });

    const payload = {
      ...formData,
      slots: mappedSlots,
    };

    finalOnboardingMutation.mutate(payload, {
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

  return {
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
  };
}
