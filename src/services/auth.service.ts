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

export const login = async (payload: LoginPayload): Promise<ApiResponse<SignupResponseData>> => {
  const { data } = await axios.post<ApiResponse<SignupResponseData>>('/auth/login', payload);
  return data;
};

export interface ForgotPasswordPayload {
  email: string;
}

export interface VerifyEmailPayload {
  email: string;
  token: string;
}

export interface ResetPasswordPayload {
  email: string;
  token: string;
  newPassword: string;
}

export const forgotPassword = async (payload: ForgotPasswordPayload): Promise<ApiResponse> => {
  const { data } = await axios.post<ApiResponse>('/auth/forgot-password', payload);
  return data;
};

export const verifyEmailOtp = async (payload: VerifyEmailPayload): Promise<ApiResponse> => {
  const { data } = await axios.post<ApiResponse>('/auth/verify-email', payload);
  return data;
};

export const resetPassword = async (payload: ResetPasswordPayload): Promise<ApiResponse> => {
  const { data } = await axios.post<ApiResponse>('/auth/reset-password', payload);
  return data;
};

export const logout = async (): Promise<ApiResponse> => {
  const { data } = await axios.post<ApiResponse>('/auth/logout');
  return data;
};

export interface GoogleLoginPayload {
  code: string;
}

export const googleLogin = async (
  payload: GoogleLoginPayload,
): Promise<ApiResponse<SignupResponseData>> => {
  const { data } = await axios.post<ApiResponse<SignupResponseData>>(
    `/auth/google?code=${payload.code}`,
  );
  return data;
};
