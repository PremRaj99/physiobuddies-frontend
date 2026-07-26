import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import {
  uploadFile,
  submitTherapistOnboarding,
  submitTherapistFinalOnboarding,
  updateAvatar,
  getCurrentUser,
  updateUserInfo,
  type TherapistOnboardingPayload,
  type TherapistFinalOnboardingPayload,
  type UpdateUserInfoPayload,
} from '@/services/user.service';

export const useCurrentUser = () => {
  return useQuery({
    queryKey: ['currentUser'],
    queryFn: () => getCurrentUser(),
  });
};

export const useUpdateUserInfo = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (payload: UpdateUserInfoPayload) => updateUserInfo(payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['currentUser'] });
    },
  });
};

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
