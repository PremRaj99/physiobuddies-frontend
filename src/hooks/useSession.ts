import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { getSessions, revokeSession } from '@/services/session.service';

export const useSessions = () => {
  return useQuery({
    queryKey: ['sessions'],
    queryFn: () => getSessions(),
  });
};

export const useRevokeSession = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id: string) => revokeSession(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['sessions'] });
    },
  });
};
