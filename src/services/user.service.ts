import { axios } from '@/utils/axios';
import type { ApiResponse } from '.';

export interface UserProfile {
  id: string;
  name: string;
  email: string;
  role: 'therapist' | 'patient' | 'admin';
  phone?: string;
  image?: string | null;
  therapistStatus?: {
    isOnboardingFilled: boolean;
    isVerified: boolean;
    isFinalOnboardingFilled: boolean;
  } | null;
  therapistProfile?: {
    id: string;
    about?: string | null;
    displayAddress?: string | null;
    location?: { lat: number; lng: number } | null;
  } | null;
}

export interface TherapistOnboardingPayload {
  dob: string;
  displayAddress: string;
  about: string;
  experience: number;
  iapId?: string | null;
  affiliation?: string | null;
  specializations: string[];
  education: string[];
  languages: string[];
  resume?: string | null;
  certificates?: string[] | null;
}

export interface TherapistFinalOnboardingPayload {
  about: string;
  address: string;
  lat: string | number;
  lng: string | number;
  accountName: string;
  bankName: string;
  branchName: string;
  accountNumber: string;
  ifsc: string;
  upiId?: string | null;
  planId: string;
  slots: Record<string, string[]>;
}

export const getCurrentUser = async (): Promise<ApiResponse<UserProfile>> => {
  const { data } = await axios.get<ApiResponse<UserProfile>>('/user');
  return data;
};

export const uploadFile = async (file: File): Promise<ApiResponse<{ url: string }>> => {
  const formData = new FormData();
  formData.append('file', file);
  const { data } = await axios.post<ApiResponse<{ url: string }>>('/file-upload/single', formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
  return data;
};

export const submitTherapistOnboarding = async (
  payload: TherapistOnboardingPayload,
): Promise<ApiResponse> => {
  const { data } = await axios.post<ApiResponse>('/therapist/meta/onboarding', payload);
  return data;
};

export const submitTherapistFinalOnboarding = async (
  payload: TherapistFinalOnboardingPayload,
): Promise<ApiResponse> => {
  const { data } = await axios.post<ApiResponse>('/therapist/meta/onboarding/final', payload);
  return data;
};

export const updateAvatar = async (payload: { avatar: string }): Promise<ApiResponse> => {
  const { data } = await axios.patch<ApiResponse>('/user/avatar', payload);
  return data;
};
