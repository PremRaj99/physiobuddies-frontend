import { axios } from '@/utils/axios';
import type { ApiResponse } from '.';

export interface SendOtpPayload {
  email: string;
}

export interface SignupPatientPayload {
  name: string;
  email: string;
  token: string;
  mobile: string;
  password: string;
}

export interface SignupPhysiotherapistPayload {
  name: string;
  email: string;
  token: string;
  mobile: string;
  password: string;
  location: {
    lng: number;
    lat: number;
  };
  displayAddress: string;
  gender: 'male' | 'female' | 'other';
  mode: 'home_visit' | 'clinic' | 'online';
}

export interface SignupResponseData {
  accessToken: string;
  refreshToken: string;
}

export const sendOtpBeforeSignup = async (payload: SendOtpPayload): Promise<ApiResponse> => {
  const { data } = await axios.post<ApiResponse>('/auth/send-email-before-signup', payload);
  return data;
};

export const signupPatient = async (
  payload: SignupPatientPayload,
): Promise<ApiResponse<SignupResponseData>> => {
  const { data } = await axios.post<ApiResponse<SignupResponseData>>(
    '/auth/signup-patient',
    payload,
  );
  return data;
};

export const signupPhysiotherapist = async (
  payload: SignupPhysiotherapistPayload,
): Promise<ApiResponse<SignupResponseData>> => {
  const { data } = await axios.post<ApiResponse<SignupResponseData>>(
    '/auth/signup-physiotherapist',
    payload,
  );
  return data;
};

export interface LoginPayload {
  email: string;
  password: string;
}

export interface UserProfile {
  id: string;
  name: string;
  email: string;
  role: 'therapist' | 'patient' | 'admin';
  phone?: string;
  therapistStatus?: {
    isOnboardingFilled: boolean;
    isVerified: boolean;
    isFinalOnboardingFilled: boolean;
  } | null;
}

export const login = async (payload: LoginPayload): Promise<ApiResponse<SignupResponseData>> => {
  const { data } = await axios.post<ApiResponse<SignupResponseData>>('/auth/login', payload);
  return data;
};

export const getCurrentUser = async (): Promise<ApiResponse<UserProfile>> => {
  const { data } = await axios.get<ApiResponse<UserProfile>>('/user');
  return data;
};
