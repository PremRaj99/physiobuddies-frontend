import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { getAdminUsers, toggleBlockUser } from '@/services/adminUser.service';

export const useAdminUsers = () => {
  return useQuery({
    queryKey: ['admin', 'users'],
    queryFn: () => getAdminUsers(),
  });
};

export const useToggleBlockUser = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id: string) => toggleBlockUser(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['admin', 'users'] });
    },
  });
};
