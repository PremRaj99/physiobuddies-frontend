import { useMutation } from '@tanstack/react-query';
import {
  uploadFile,
  submitTherapistOnboarding,
  submitTherapistFinalOnboarding,
  updateAvatar,
  type TherapistOnboardingPayload,
  type TherapistFinalOnboardingPayload,
} from '@/services/user.service';

export const useUploadFile = () => {
  return useMutation({
    mutationFn: (file: File) => uploadFile(file),
  });
};

export const useSubmitTherapistOnboarding = () => {
  return useMutation({
    mutationFn: (payload: TherapistOnboardingPayload) => submitTherapistOnboarding(payload),
  });
};

export const useSubmitTherapistFinalOnboarding = () => {
  return useMutation({
    mutationFn: (payload: TherapistFinalOnboardingPayload) =>
      submitTherapistFinalOnboarding(payload),
  });
};

export const useUpdateAvatar = () => {
  return useMutation({
    mutationFn: (payload: { avatar: string }) => updateAvatar(payload),
  });
};
