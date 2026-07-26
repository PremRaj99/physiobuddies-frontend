import { axios } from '@/utils/axios';
import type { ApiResponse } from './index';

export type PaymentStatus = 'pending' | 'completed' | 'failed' | 'refunded';
export type PaymentPurpose = 'therapy_session' | 'subscription';
export type PayoutStatus = 'requested' | 'rejected' | 'processed';

export interface PaymentUser {
  id: string;
  name: string;
  email: string;
}

export interface AdminPayment {
  id: string;
  userId: string;
  invoiceId: string;
  gatewayPaymentId: string | null;
  gatewayOrderId: string | null;
  status: PaymentStatus;
  amount: number;
  paidAt: string | null;
  failedAt: string | null;
  refundedAt: string | null;
  processedAt: string | null;
  createdAt: string;
  purpose: PaymentPurpose;
  user: PaymentUser;
}

export interface AdminCommission {
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

export interface AdminPayout {
  id: string;
  therapistId: string;
  amount: number;
  status: PayoutStatus;
  transactionRef: string | null;
  processedAt: string | null;
  createdAt: string;
}

export const getAdminPayments = async (): Promise<ApiResponse<AdminPayment[]>> => {
  const { data } = await axios.get<ApiResponse<AdminPayment[]>>('/admin/payments');
  return data;
};

export const getAdminCommissions = async (): Promise<ApiResponse<AdminCommission[]>> => {
  const { data } = await axios.get<ApiResponse<AdminCommission[]>>('/admin/commissions');
  return data;
};

export const getAdminPayouts = async (): Promise<ApiResponse<AdminPayout[]>> => {
  const { data } = await axios.get<ApiResponse<AdminPayout[]>>('/admin/payouts');
  return data;
};

export const processPayout = async (id: string): Promise<ApiResponse<string>> => {
  const { data } = await axios.post<ApiResponse<string>>(`/admin/payouts/${id}/process`);
  return data;
};

export const processRefund = async (sessionId: string): Promise<ApiResponse<string>> => {
  const { data } = await axios.post<ApiResponse<string>>(`/admin/refunds/${sessionId}`);
  return data;
};
