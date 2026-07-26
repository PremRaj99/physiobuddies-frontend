import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

import {
  getEarnings,
  getEarningsSummary,
  getPayouts,
  getWallet,
  requestPayout,
} from '@/services/wallet.service';
import type { RequestPayoutPayload } from '@/services/wallet.service';

export const useWallet = () =>
  useQuery({
    queryKey: ['therapist-wallet'],
    queryFn: getWallet,
    select: (res) => res.data,
  });

export const useEarnings = () =>
  useQuery({
    queryKey: ['therapist-earnings'],
    queryFn: getEarnings,
    select: (res) => res.data,
  });

export const useEarningsSummary = () =>
  useQuery({
    queryKey: ['therapist-earnings', 'summary'],
    queryFn: getEarningsSummary,
    select: (res) => res.data,
  });

export const usePayouts = () =>
  useQuery({
    queryKey: ['therapist-payouts'],
    queryFn: getPayouts,
    select: (res) => res.data,
  });

export const useRequestPayout = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (payload: RequestPayoutPayload) => requestPayout(payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['therapist-wallet'] });
      queryClient.invalidateQueries({ queryKey: ['therapist-payouts'] });
    },
  });
};
