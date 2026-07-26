import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import {
  getAdminPayments,
  getAdminCommissions,
  getAdminPayouts,
  processPayout,
  processRefund,
} from '@/services/adminFinance.service';

export const useAdminPayments = () => {
  return useQuery({
    queryKey: ['admin', 'payments'],
    queryFn: () => getAdminPayments(),
  });
};

export const useAdminCommissions = () => {
  return useQuery({
    queryKey: ['admin', 'commissions'],
    queryFn: () => getAdminCommissions(),
  });
};

export const useAdminPayouts = () => {
  return useQuery({
    queryKey: ['admin', 'payouts'],
    queryFn: () => getAdminPayouts(),
  });
};

export const useProcessPayout = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id: string) => processPayout(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['admin', 'payouts'] });
    },
  });
};

export const useProcessRefund = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (sessionId: string) => processRefund(sessionId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['admin', 'payments'] });
    },
  });
};
