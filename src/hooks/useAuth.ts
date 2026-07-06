import { useMutation } from '@tanstack/react-query';
import {
  sendOtpBeforeSignup,
  signupPatient,
  signupPhysiotherapist,
  login,
  type SendOtpPayload,
  type SignupPatientPayload,
  type SignupPhysiotherapistPayload,
  type LoginPayload,
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
