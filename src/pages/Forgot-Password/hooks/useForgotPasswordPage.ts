import { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';
import { useForgotPassword, useVerifyEmailOtp, useResetPassword } from '@/hooks/useAuth';

export type Step = 'email' | 'otp' | 'password' | 'success';

export const useForgotPasswordPage = () => {
  const navigate = useNavigate();

  // Navigation State
  const [step, setStep] = useState<Step>('email');
  const [email, setEmail] = useState('');

  // OTP State
  const [otp, setOtp] = useState(['', '', '', '', '', '']);
  const otpRefs = useRef<(HTMLInputElement | null)[]>([]);

  // Password State
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  // Mutation hooks
  const forgotPasswordMutation = useForgotPassword();
  const verifyOtpMutation = useVerifyEmailOtp();
  const resetPasswordMutation = useResetPassword();

  // Handlers
  const handleEmailSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;

    forgotPasswordMutation.mutate(
      { email },
      {
        onSuccess: () => {
          toast.success('Verification code sent to your email.');
          setStep('otp');
        },
        onError: (err: unknown) => {
          const response = (err as { response?: { data?: { message?: string } } }).response;
          const errMsg = response?.data?.message || 'Failed to send verification code.';
          toast.error(errMsg);
        },
      },
    );
  };

  const handleOtpChange = (index: number, value: string) => {
    if (isNaN(Number(value))) return;
    const newOtp = [...otp];
    newOtp[index] = value.substring(value.length - 1);
    setOtp(newOtp);

    // Auto-advance
    if (value && index < 5 && otpRefs.current[index + 1]) {
      otpRefs.current[index + 1]?.focus();
    }
  };

  const handleOtpKeyDown = (index: number, e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Backspace' && !otp[index] && index > 0) {
      otpRefs.current[index - 1]?.focus();
    }
  };

  const handleOtpSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const otpValue = otp.join('');
    if (otpValue.length !== 6) {
      toast.error('Please enter a valid 6-digit recovery code.');
      return;
    }

    verifyOtpMutation.mutate(
      { email, token: otpValue },
      {
        onSuccess: () => {
          toast.success('Identity verified.');
          setStep('password');
        },
        onError: (err: unknown) => {
          const response = (err as { response?: { data?: { message?: string } } }).response;
          const errMsg = response?.data?.message || 'Invalid or expired code.';
          toast.error(errMsg);
        },
      },
    );
  };

  const handleResendOtp = () => {
    if (!email) return;

    forgotPasswordMutation.mutate(
      { email },
      {
        onSuccess: () => {
          toast.success('Recovery code resent.');
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

  const handlePasswordSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (password.length < 6) {
      toast.error('Password must be at least 6 characters long.');
      return;
    }
    if (password !== confirmPassword) {
      toast.error('Passwords do not match.');
      return;
    }

    const otpValue = otp.join('');
    resetPasswordMutation.mutate(
      { email, token: otpValue, newPassword: password },
      {
        onSuccess: () => {
          toast.success('Password reset successfully.');
          setStep('success');
        },
        onError: (err: unknown) => {
          const response = (err as { response?: { data?: { message?: string } } }).response;
          const errMsg = response?.data?.message || 'Failed to reset password.';
          toast.error(errMsg);
        },
      },
    );
  };

  return {
    step,
    setStep,
    email,
    setEmail,
    otp,
    otpRefs,
    password,
    setPassword,
    confirmPassword,
    setConfirmPassword,
    isEmailSending: forgotPasswordMutation.isPending,
    isOtpVerifying: verifyOtpMutation.isPending,
    isPasswordUpdating: resetPasswordMutation.isPending,
    handleEmailSubmit,
    handleOtpChange,
    handleOtpKeyDown,
    handleOtpSubmit,
    handleResendOtp,
    handlePasswordSubmit,
    navigate,
  };
};
