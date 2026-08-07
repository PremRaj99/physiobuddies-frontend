import { axios } from '@/utils/axios';
import type { ApiResponse } from './index';

export interface PatientDetail {
  id: string;
  name: string;
  dob: string;
  gender: 'male' | 'female' | 'other';
  phone: string;
  heightCm?: number;
  weightKg?: number;
}

export interface CreatePatientDetailPayload {
  name: string;
  dob: string; // ISO / yyyy-mm-dd
  gender: 'male' | 'female' | 'other';
  phone: string;
  heightCm?: number;
  weightKg?: number;
}

export interface PatientLocationItem {
  id: string;
  address: string;
  landmark: string | null;
  city: string;
  state: string;
  postalCode: string;
  country: string;
  location: { lat: number; lng: number };
}

export interface CreatePatientLocationPayload {
  address: string;
  landmark: string;
  city: string;
  state: string;
  postalCode: string;
  location: { lat: number; lng: number };
  country: string;
}

export const getPatientDetails = async (): Promise<ApiResponse<PatientDetail[]>> => {
  const { data } = await axios.get<ApiResponse<PatientDetail[]>>('/patient/details');
  return data;
};

export const createPatientDetail = async (
  payload: CreatePatientDetailPayload,
): Promise<ApiResponse> => {
  const { data } = await axios.post<ApiResponse>('/patient/details', payload);
  return data;
};

export const getPatientLocations = async (): Promise<ApiResponse<PatientLocationItem[]>> => {
  const { data } = await axios.get<ApiResponse<PatientLocationItem[]>>('/patient/location');
  return data;
};

export const createPatientLocation = async (
  payload: CreatePatientLocationPayload,
): Promise<ApiResponse> => {
  const { data } = await axios.post<ApiResponse>('/patient/location', payload);
  return data;
};

export interface PatientBookingRecord {
  id: string;
  therapistId: string;
  therapistName: string;
  therapistImage: string;
  therapistGender: 'MALE' | 'FEMALE' | 'OTHER';
  treatmentMode: 'home_visit' | 'online' | 'clinic';
  status: 'UPCOMING' | 'COMPLETED' | 'CANCELLED' | 'PENDING';
  lastSessionDate: string;
  lastSessionTime: string;
}

export const getPatientMyBookings = async (): Promise<ApiResponse<PatientBookingRecord[]>> => {
  const { data } = await axios.get<ApiResponse<PatientBookingRecord[]>>('/patient/my-bookings');
  return data;
};

import type { ClinicalAssessmentRecord, SessionImprovementRecordItem } from '@/types';

export type { ClinicalAssessmentRecord, SessionImprovementRecordItem };

export interface PatientBookingDetail {
  id: string;
  mode: 'home_visit' | 'online' | 'clinic';
  overallStatus: string;
  status?: 'UPCOMING' | 'COMPLETED' | 'CANCELLED' | 'PENDING';
  therapist: {
    id: string;
    therapistId?: string;
    name: string;
    image: string;
    gender: 'MALE' | 'FEMALE' | 'OTHER';
    rating?: number;
  };
  patient: {
    id: string;
    name: string;
    dob: string;
    gender: 'MALE' | 'FEMALE' | 'OTHER';
    phone: string;
  };
  condition?: {
    title: string;
  };
  problemDescription?: string;
  location?: {
    address?: string;
    landmark?: string | null;
    city?: string;
    state?: string;
    postalCode?: string;
    country?: string;
    coords?: { lat: number; lng: number };
  };
  sessions?: Array<{
    id: string;
    date: string;
    scheduledTime: string;
    actualStartTime?: string;
    actualEndTime?: string;
    status: string;
  }>;
  documents?: Array<{
    id: string;
    name: string;
    fileType?: string;
    url?: string;
    createdAt?: string;
  }>;
  clinicalAssessments?: ClinicalAssessmentRecord[];
  improvementRecords?: SessionImprovementRecordItem[];
  treatmentPlanId?: string;
}

export const getPatientBookingById = async (
  id: string,
): Promise<ApiResponse<PatientBookingDetail>> => {
  const { data } = await axios.get<ApiResponse<PatientBookingDetail>>(`/patient/my-bookings/${id}`);
  return data;
};
