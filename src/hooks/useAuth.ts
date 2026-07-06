import { useMutation } from '@tanstack/react-query';
import {
  sendOtpBeforeSignup,
  signupPatient,
  signupPhysiotherapist,
  login,
  forgotPassword,
  verifyEmailOtp,
  resetPassword,
  logout,
  googleLogin,
  type SendOtpPayload,
  type SignupPatientPayload,
  type SignupPhysiotherapistPayload,
  type LoginPayload,
  type ForgotPasswordPayload,
  type VerifyEmailPayload,
  type ResetPasswordPayload,
  type GoogleLoginPayload,
} from '@/services/auth.service';

export const useSendOtp = () => {
  return useMutation({
    mutationFn: (payload: SendOtpPayload) => sendOtpBeforeSignup(payload),
  });
};

export const useSignupPatient = () => {
  return useMutation({
    mutationFn: (payload: SignupPatientPayload) => signupPatient(payload),
  });
};

export const useSignupPhysiotherapist = () => {
  return useMutation({
    mutationFn: (payload: SignupPhysiotherapistPayload) => signupPhysiotherapist(payload),
  });
};

export const useLogin = () => {
  return useMutation({
    mutationFn: (payload: LoginPayload) => login(payload),
  });
};

export const useForgotPassword = () => {
  return useMutation({
    mutationFn: (payload: ForgotPasswordPayload) => forgotPassword(payload),
  });
};

export const useVerifyEmailOtp = () => {
  return useMutation({
    mutationFn: (payload: VerifyEmailPayload) => verifyEmailOtp(payload),
  });
};

export const useResetPassword = () => {
  return useMutation({
    mutationFn: (payload: ResetPasswordPayload) => resetPassword(payload),
  });
};

export const useLogout = () => {
  return useMutation({
    mutationFn: () => logout(),
  });
};

export const useGoogleLoginMutation = () => {
  return useMutation({
    mutationFn: (payload: GoogleLoginPayload) => googleLogin(payload),
  });
};
