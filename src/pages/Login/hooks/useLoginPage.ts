import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';
import { useLogin, useGoogleLoginMutation } from '@/hooks/useAuth';
import { useCurrUser } from '@/store/userStore';
import { getCurrentUser } from '@/services/auth.service';
import type { LoginPayload, UserProfile } from '@/services/auth.service';

export const useLoginPage = () => {
  const navigate = useNavigate();
  const setUser = useCurrUser((state) => state.setUser);
  const loginMutation = useLogin();
  const googleLoginMutation = useGoogleLoginMutation();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginPayload>({
    defaultValues: {
      email: '',
      password: '',
    },
  });

  const handleSuccessRedirect = (userData: UserProfile) => {
    setUser({
      id: userData.id,
      name: userData.name,
      email: userData.email,
      phone: userData.phone || null,
      role: userData.role,
      therapistStatus: userData.therapistStatus || null,
    });

    if (userData.role === 'patient') {
      navigate('/search');
    } else if (userData.role === 'therapist') {
      const status = userData.therapistStatus;
      if (!status || !status.isOnboardingFilled) {
        navigate('/therapist/onboarding');
      } else if (status.isVerified && !status.isFinalOnboardingFilled) {
        navigate('/therapist/onboarding/final');
      } else if (status.isFinalOnboardingFilled) {
        navigate('/therapist/dashboard');
      } else {
        // Filled but not verified yet, show success / pending screen
        navigate('/therapist/onboarding');
      }
    } else {
      navigate('/');
    }
  };

  const onSubmit = (data: LoginPayload) => {
    loginMutation.mutate(data, {
      onSuccess: async () => {
        toast.success('Successfully logged in!');
        try {
          const userRes = await getCurrentUser();
          if (userRes.success && userRes.data) {
            handleSuccessRedirect(userRes.data);
          }
        } catch (err) {
          console.error('Error fetching user profile:', err);
          toast.error('Failed to load user profile. Please try again.');
        }
      },
      onError: (err: unknown) => {
        const response = (err as { response?: { data?: { message?: string } } }).response;
        const errMsg = response?.data?.message || 'Login failed. Please check your credentials.';
        toast.error(errMsg);
      },
    });
  };

  const handleGoogleSuccess = (code: string) => {
    googleLoginMutation.mutate(
      { code },
      {
        onSuccess: async () => {
          toast.success('Successfully logged in via Google!');
          try {
            const userRes = await getCurrentUser();
            if (userRes.success && userRes.data) {
              handleSuccessRedirect(userRes.data);
            }
          } catch (err) {
            console.error('Error fetching user profile:', err);
            toast.error('Failed to load user profile. Please try again.');
          }
        },
        onError: (err: unknown) => {
          const response = (err as { response?: { data?: { message?: string } } }).response;
          const errMsg = response?.data?.message || 'Google authentication failed.';
          toast.error(errMsg);
        },
      },
    );
  };

  return {
    register,
    handleSubmit,
    errors,
    onSubmit,
    handleGoogleSuccess,
    isFormSubmitting: loginMutation.isPending || googleLoginMutation.isPending,
    navigate,
  };
};
export type UseLoginPageReturn = ReturnType<typeof useLoginPage>;
