import { axios } from '@/utils/axios';
import type { ApiResponse } from './index';

export type WalletEntryType = 'earning' | 'payout' | 'penalty' | 'adjust' | 'hold';
export type PayoutStatus = 'requested' | 'rejected' | 'processed';

export interface WalletEntry {
  id: string;
  therapistId: string;
  amount: number;
  type: WalletEntryType;
  referenceId: string | null;
  balanceHold: number | null;
  balanceAfter: number | null;
  createdAt: string;
}

export interface WalletInfo {
  balance: number;
  entries: WalletEntry[];
}

export interface Commission {
  id: string;
  billId: string;
  therapistId: string;
  therapistName: string;
  sessionDate: string;
  patientName: string;
  sessionAmount: number;
  platformFee: number;
  therapistAmount: number;
  platformRateUsed: number;
  calculatedAt: string;
}

export interface EarningsSummary {
  totalEarned: number;
  totalPlatformFee: number;
  totalGross: number;
  count: number;
}

export interface Payout {
  id: string;
  therapistId: string;
  amount: number;
  status: PayoutStatus;
  transactionRef: string | null;
  processedAt: string | null;
  createdAt: string;
}

export interface RequestPayoutPayload {
  amount: number;
}

export const getWallet = async (): Promise<ApiResponse<WalletInfo>> => {
  const { data } = await axios.get<ApiResponse<WalletInfo>>('/therapist/wallet');
  return data;
};

export const getEarnings = async (): Promise<ApiResponse<Commission[]>> => {
  const { data } = await axios.get<ApiResponse<Commission[]>>('/therapist/earnings');
  return data;
};

export const getEarningsSummary = async (): Promise<ApiResponse<EarningsSummary>> => {
  const { data } = await axios.get<ApiResponse<EarningsSummary>>('/therapist/earnings/summary');
  return data;
};

export const getPayouts = async (): Promise<ApiResponse<Payout[]>> => {
  const { data } = await axios.get<ApiResponse<Payout[]>>('/therapist/payout');
  return data;
};

export const requestPayout = async (
  payload: RequestPayoutPayload,
): Promise<ApiResponse<Payout>> => {
  const { data } = await axios.post<ApiResponse<Payout>>('/therapist/payout/request', payload);
  return data;
};
