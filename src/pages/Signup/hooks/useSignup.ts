import { useState, useRef } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';
import { useSendOtp, useSignupPatient, useSignupPhysiotherapist } from '@/hooks/useAuth';
import { useCurrUser } from '@/store/userStore';
import { getCurrentUser } from '@/services/user.service';
import type { SignupPatientPayload, SignupPhysiotherapistPayload } from '@/services/auth.service';

export type PatientFormValues = Omit<SignupPatientPayload, 'token'>;
export type TherapistFormValues = Omit<SignupPhysiotherapistPayload, 'token'>;

export const useSignup = () => {
  const navigate = useNavigate();
  const setUser = useCurrUser((state) => state.setUser);

  const [role, setRole] = useState<'patient' | 'therapist'>('patient');
  const [step, setStep] = useState<'form' | 'otp'>('form');
  const [otp, setOtp] = useState(['', '', '', '', '', '']);
  const otpRefs = useRef<(HTMLInputElement | null)[]>([]);

  // Mutations
  const sendOtpMutation = useSendOtp();
  const signupPatientMutation = useSignupPatient();
  const signupPhysiotherapistMutation = useSignupPhysiotherapist();

  // Forms
  const patientForm = useForm<PatientFormValues>({
    defaultValues: {
      name: '',
      email: '',
      mobile: '',
      password: '',
    },
  });

  const therapistForm = useForm<TherapistFormValues>({
    defaultValues: {
      name: '',
      email: '',
      mobile: '',
      password: '',
      gender: 'male',
      mode: 'clinic',
      displayAddress: '',
      location: { lat: 0, lng: 0 },
    },
  });

  const patientEmail = patientForm.watch('email');
  const therapistEmail = therapistForm.watch('email');
  const registeredEmail = role === 'patient' ? patientEmail : therapistEmail;

  // Pin Map
  const handlePinMap = () => {
    if (!navigator.geolocation) {
      toast.error('Geolocation is not supported by your browser.');
      return;
    }

    const toastId = toast.loading('Retrieving location...');

    navigator.geolocation.getCurrentPosition(
      (position) => {
        therapistForm.setValue('location', {
          lat: position.coords.latitude,
          lng: position.coords.longitude,
        });
        toast.success(
          `Location pinned successfully! (${position.coords.latitude.toFixed(4)}, ${position.coords.longitude.toFixed(4)})`,
          { id: toastId },
        );
      },
      () => {
        toast.error('Unable to retrieve location. Using default coordinates (0, 0).', {
          id: toastId,
        });
        therapistForm.setValue('location', { lat: 0, lng: 0 });
      },
      { enableHighAccuracy: true, timeout: 8000 },
    );
  };

  // Submit OTP email request
  const onPatientSubmit = (data: PatientFormValues) => {
    sendOtpMutation.mutate(
      { email: data.email },
      {
        onSuccess: () => {
          toast.success('Verification code sent to ' + data.email);
          setStep('otp');
        },
        onError: (err: unknown) => {
          const response = (err as { response?: { data?: { message?: string } } }).response;
          const errMsg =
            response?.data?.message || 'Failed to send verification code. Please try again.';
          toast.error(errMsg);
        },
      },
    );
  };

  const onTherapistSubmit = (data: TherapistFormValues) => {
    sendOtpMutation.mutate(
      { email: data.email },
      {
        onSuccess: () => {
          toast.success('Verification code sent to ' + data.email);
          setStep('otp');
        },
        onError: (err: unknown) => {
          const response = (err as { response?: { data?: { message?: string } } }).response;
          const errMsg =
            response?.data?.message || 'Failed to send verification code. Please try again.';
          toast.error(errMsg);
        },
      },
    );
  };

  // OTP Handlers
  const handleOtpChange = (index: number, value: string) => {
    if (isNaN(Number(value))) return;

    const newOtp = [...otp];
    newOtp[index] = value.substring(value.length - 1);
    setOtp(newOtp);

    if (value && index < 5 && otpRefs.current[index + 1]) {
      otpRefs.current[index + 1]?.focus();
    }
  };

  const handleOtpKeyDown = (index: number, e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Backspace' && !otp[index] && index > 0) {
      otpRefs.current[index - 1]?.focus();
    }
  };

  const handleResendOtp = () => {
    if (!registeredEmail) {
      toast.error('Email address is missing.');
      return;
    }
    sendOtpMutation.mutate(
      { email: registeredEmail },
      {
        onSuccess: () => {
          toast.success('Verification code resent successfully to ' + registeredEmail);
          setOtp(['', '', '', '', '', '']);
          otpRefs.current[0]?.focus();
        },
        onError: (err: unknown) => {
          const response = (err as { response?: { data?: { message?: string } } }).response;
          const errMsg = response?.data?.message || 'Failed to resend code.';
          toast.error(errMsg);
        },
      },
    );
  };

  const handleOtpVerify = () => {
    const tokenStr = otp.join('');
    if (tokenStr.length !== 6) {
      toast.error('Please enter a valid 6-digit verification code.');
      return;
    }

    if (role === 'patient') {
      const formValues = patientForm.getValues();
      signupPatientMutation.mutate(
        {
          ...formValues,
          token: tokenStr,
        },
        {
          onSuccess: async () => {
            toast.success('Account registered successfully!');
            try {
              const userRes = await getCurrentUser();
              if (userRes.success && userRes.data) {
                setUser({
                  id: userRes.data.id,
                  name: userRes.data.name,
                  email: userRes.data.email,
                  phone: userRes.data.phone || null,
                  role: userRes.data.role,
                });
              }
            } catch (err) {
              console.error('Error fetching registered user details:', err);
            }
            navigate('/search');
          },
          onError: (err: unknown) => {
            const response = (err as { response?: { data?: { message?: string } } }).response;
            const errMsg = response?.data?.message || 'Verification failed. Please try again.';
            toast.error(errMsg);
          },
        },
      );
    } else {
      const formValues = therapistForm.getValues();
      signupPhysiotherapistMutation.mutate(
        {
          ...formValues,
          token: tokenStr,
        },
        {
          onSuccess: async () => {
            toast.success('Therapist registered successfully!');
            try {
              const userRes = await getCurrentUser();
              if (userRes.success && userRes.data) {
                setUser({
                  id: userRes.data.id,
                  name: userRes.data.name,
                  email: userRes.data.email,
                  phone: userRes.data.phone || null,
                  role: userRes.data.role,
                });
              }
            } catch (err) {
              console.error('Error fetching registered user details:', err);
            }
            navigate('/therapist/onboarding');
          },
          onError: (err: unknown) => {
            const response = (err as { response?: { data?: { message?: string } } }).response;
            const errMsg = response?.data?.message || 'Verification failed. Please try again.';
            toast.error(errMsg);
          },
        },
      );
    }
  };

  return {
    role,
    setRole,
    step,
    setStep,
    otp,
    otpRefs,
    patientForm,
    therapistForm,
    registeredEmail,
    isFormSubmitting: sendOtpMutation.isPending,
    isOtpVerifying: signupPatientMutation.isPending || signupPhysiotherapistMutation.isPending,
    handlePinMap,
    onPatientSubmit,
    onTherapistSubmit,
    handleOtpChange,
    handleOtpKeyDown,
    handleResendOtp,
    handleOtpVerify,
  };
};
