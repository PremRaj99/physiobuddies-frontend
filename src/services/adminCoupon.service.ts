import { axios } from '@/utils/axios';
import type { ApiResponse } from './index';

export type CouponStatus = 'active' | 'inactive';
export type CouponAssignmentType = 'whitelist' | 'blacklist';

export interface CouponAssignment {
  id: string;
  patientId: string;
  type: CouponAssignmentType;
}

export interface CouponTherapistConstraint {
  id: string;
  therapistId: string;
}

export interface AdminCoupon {
  id: string;
  code: string;
  discount: number;
  minPrice: number;
  expiresOn: string;
  status: CouponStatus;
  isGlobal: boolean;
  createdAt: string;
  updatedAt: string;
  assignments: CouponAssignment[];
  therapistConstraints: CouponTherapistConstraint[];
  therapistId: string | null;
}

export interface CreateCouponPayload {
  code: string;
  minPrice: number;
  discount: number;
  expiresOn: string;
  status?: CouponStatus;
  isGlobal?: boolean;
  therapistIds?: string[];
  patientIds?: string[];
}

export type UpdateCouponPayload = Partial<CreateCouponPayload>;

export const getAdminCoupons = async (): Promise<ApiResponse<AdminCoupon[]>> => {
  const { data } = await axios.get<ApiResponse<AdminCoupon[]>>('/admin/coupon');
  return data;
};

export const createCoupon = async (payload: CreateCouponPayload): Promise<ApiResponse<null>> => {
  const { data } = await axios.post<ApiResponse<null>>('/admin/coupon', payload);
  return data;
};

export const updateCoupon = async (
  id: string,
  payload: UpdateCouponPayload,
): Promise<ApiResponse<null>> => {
  const { data } = await axios.patch<ApiResponse<null>>(`/admin/coupon/${id}`, payload);
  return data;
};

export const deleteCoupon = async (id: string): Promise<ApiResponse<null>> => {
  const { data } = await axios.delete<ApiResponse<null>>(`/admin/coupon/${id}`);
  return data;
};
