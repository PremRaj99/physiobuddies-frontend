import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';
import { useSubmitTherapistOnboarding, useUpdateAvatar, useUploadFile } from '@/hooks/useUser';
import { getCurrentUser } from '@/services/user.service';
import { useCurrUser } from '@/store/userStore';
import { useHeader } from '@/components/custom/header/hooks/useHeader';
import { type OnboardingFormData } from '../components/DocumentsStep';

export function useTherapistOnboarding() {
  const user = useCurrUser((state) => state.user);
  const setUser = useCurrUser((state) => state.setUser);
  const navigate = useNavigate();
  const { handleLogout } = useHeader();

  const [step, setStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(!!user.therapistStatus?.isOnboardingFilled);
  const [imagePreview, setImagePreview] = useState(user.image || '');

  const uploadMutation = useUploadFile();
  const onboardingMutation = useSubmitTherapistOnboarding();
  const updateAvatarMutation = useUpdateAvatar();

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

  const handleNext = () => {
    if (step === 1) {
      if (!imagePreview && !formData.image) {
        toast.error('Profile image is required');
        return;
      }
      if (!formData.dob) {
        toast.error('Date of birth is required');
        return;
      }
      const age = new Date().getFullYear() - new Date(formData.dob).getFullYear();
      if (age < 18) {
        toast.error('You must be 18 or older to use this platform.');
        return;
      }
      if (!formData.displayAddress.trim()) {
        toast.error('Display address is required');
        return;
      }
      if (!formData.about.trim()) {
        toast.error('About section is required');
        return;
      }
    }

    if (step === 2) {
      if (!formData.experience.trim()) {
        toast.error('Years of experience is required');
        return;
      }
      const expNum = Number(formData.experience);
      if (isNaN(expNum) || expNum < 0) {
        toast.error('Please enter a valid number of years of experience');
        return;
      }
    }

    if (step === 3) {
      if (formData.specializations.length === 0) {
        toast.error('Please select at least one specialization');
        return;
      }
      if (formData.education.length === 0) {
        toast.error('Please select at least one educational qualification');
        return;
      }
      if (formData.languages.length === 0) {
        toast.error('Please select at least one language');
        return;
      }
    }

    if (step === 4) {
      if (!formData.resume) {
        toast.error('Resume is required');
        return;
      }
      if (formData.certificates.length === 0) {
        toast.error('Please upload at least one certificate or license');
        return;
      }
    }

    setStep((p) => Math.min(5, p + 1));
  };

  const handleBack = () => setStep((p) => Math.max(1, p - 1));

  const handleSubmit = async () => {
    // Validate everything before submission
    if (!imagePreview && !formData.image) {
      toast.error('Profile image is required');
      setStep(1);
      return;
    }
    if (!formData.dob) {
      toast.error('Date of birth is required');
      setStep(1);
      return;
    }
    if (!formData.displayAddress.trim()) {
      toast.error('Display address is required');
      setStep(1);
      return;
    }
    if (!formData.about.trim()) {
      toast.error('About section is required');
      setStep(1);
      return;
    }
    if (!formData.experience.trim()) {
      toast.error('Years of experience is required');
      setStep(2);
      return;
    }
    const expNum = Number(formData.experience);
    if (isNaN(expNum) || expNum < 0) {
      toast.error('Please enter a valid number of years of experience');
      setStep(2);
      return;
    }
    if (formData.specializations.length === 0) {
      toast.error('Please select at least one specialization');
      setStep(3);
      return;
    }
    if (formData.education.length === 0) {
      toast.error('Please select at least one educational qualification');
      setStep(3);
      return;
    }
    if (formData.languages.length === 0) {
      toast.error('Please select at least one language');
      setStep(3);
      return;
    }
    if (!formData.resume) {
      toast.error('Resume is required');
      setStep(4);
      return;
    }
    if (formData.certificates.length === 0) {
      toast.error('Please upload at least one certificate or license');
      setStep(4);
      return;
    }

    setIsSubmitting(true);
    try {
      let avatarUrl = '';
      if (formData.image) {
        const uploadRes = await uploadMutation.mutateAsync(formData.image);
        if (uploadRes.success && uploadRes.data) {
          avatarUrl = uploadRes.data.url;
          // TODO: fix before deployment
          await updateAvatarMutation.mutateAsync({ avatar: `http://localhost:3000${avatarUrl}` });
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

  useEffect(() => {
    if (!isSuccess) return;

    const fetchUser = async () => {
      try {
        const userRes = await getCurrentUser();
        if (userRes.success && userRes.data) {
          setUser(userRes.data);
        }
      } catch {
        toast.error('Something went wrong. Please Log in again.', {
          position: 'top-center',
        });
        handleLogout();
      }
    };
    fetchUser();
  }, [isSuccess, setUser, handleLogout]);

  return {
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
  };
}
