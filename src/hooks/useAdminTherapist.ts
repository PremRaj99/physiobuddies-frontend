import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import {
  getAdminTherapists,
  verifyTherapist,
  updateTherapist,
  updateCommissionRate,
  type UpdateAdminTherapistPayload,
  type UpdateCommissionRatePayload,
} from '@/services/adminTherapist.service';

export const useAdminTherapists = () => {
  return useQuery({
    queryKey: ['admin', 'therapists'],
    queryFn: () => getAdminTherapists(),
  });
};

export const useVerifyTherapist = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id: string) => verifyTherapist(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['admin', 'therapists'] });
    },
  });
};

export const useUpdateTherapist = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, payload }: { id: string; payload: UpdateAdminTherapistPayload }) =>
      updateTherapist(id, payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['admin', 'therapists'] });
    },
  });
};

export const useUpdateCommissionRate = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, payload }: { id: string; payload: UpdateCommissionRatePayload }) =>
      updateCommissionRate(id, payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['admin', 'therapists'] });
    },
  });
};
