import { axios } from '@/utils/axios';
import type { ApiResponse } from './index';

export type TreatmentMode = 'home_visit' | 'online' | 'clinic';
export type Gender = 'male' | 'female' | 'other';

export interface AdminTherapist {
  id: string;
  userId: string;
  therapistId: string;
  location: { lat: number; lng: number };
  displayAddress: string;
  price: number;
  priceAlt: number | null;
  commissionRate: number;
  updateCommissionRateAt: string | null;
  rating: number | null;
  gender: Gender;
  mode: TreatmentMode;
  clinic: string | null;
  about: string | null;
  verifiedAt: string | null;
  deletedAt: string | null;
  createdAt: string;
}

export interface UpdateAdminTherapistPayload {
  location?: { lat: number; lng: number };
  displayAddress?: string;
  price?: number;
  priceAlt?: number;
  rating?: number;
  gender?: Gender;
  mode?: TreatmentMode;
  clinic?: string;
  about?: string;
  dob?: string;
  experience?: number;
  specialization?: string[];
  languagesSpoken?: string[];
  educationQualification?: string[];
  currentlyAffiliation?: string;
  IAPId?: string;
  professionalCertificates?: string[];
}

export interface UpdateCommissionRatePayload {
  commissionRate: number;
}

export const getAdminTherapists = async (): Promise<ApiResponse<AdminTherapist[]>> => {
  const { data } = await axios.get<ApiResponse<AdminTherapist[]>>('/admin/therapist');
  return data;
};

export const verifyTherapist = async (id: string): Promise<ApiResponse<string>> => {
  const { data } = await axios.patch<ApiResponse<string>>(`/admin/therapist/${id}/verify`);
  return data;
};

export const updateTherapist = async (
  id: string,
  payload: UpdateAdminTherapistPayload,
): Promise<ApiResponse<string>> => {
  const { data } = await axios.patch<ApiResponse<string>>(`/admin/therapist/${id}/update`, payload);
  return data;
};

export const updateCommissionRate = async (
  id: string,
  payload: UpdateCommissionRatePayload,
): Promise<ApiResponse<string>> => {
  const { data } = await axios.patch<ApiResponse<string>>(
    `/admin/therapist/${id}/commission-rate`,
    payload,
  );
  return data;
};
