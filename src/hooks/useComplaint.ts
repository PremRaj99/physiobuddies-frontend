import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import {
  getComplaints,
  createComplaint,
  addComplaintReply,
  type CreateComplaintPayload,
} from '@/services/complaint.service';

export const useComplaints = () => {
  return useQuery({
    queryKey: ['complaints'],
    queryFn: () => getComplaints(),
  });
};

export const useCreateComplaint = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (payload: CreateComplaintPayload) => createComplaint(payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['complaints'] });
    },
  });
};

export const useAddComplaintReply = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, message }: { id: string; message: string }) =>
      addComplaintReply(id, message),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['complaints'] });
    },
  });
};
