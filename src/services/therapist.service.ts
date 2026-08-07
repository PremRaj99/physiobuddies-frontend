import { axios } from '@/utils/axios';
import type { ApiResponse } from './index';
import type { BackendDaySchedule } from '@/pages/Therapist/Slot-Management/utils';
import type { SlotCategory } from '@/utils/slots';

export interface SearchTherapistItem {
  id: string;
  name: string;
  specializations?: string[];
  experience?: number;
  rating: number | null;
  totalReviews: number;
  originalPrice: number | null;
  discountedPrice: number;
  displayAddress: string;
  image: string | null;
  distance: number | null;
}

export interface SearchTherapistParams {
  lng?: number;
  lat?: number;
  radius?: number;
  mode?: 'home_visit' | 'online' | 'clinic';
  gender?: 'male' | 'female' | 'other';
  specialization?: string[];
  price?: [number, number];
  experience?: [number, number];
  sort?: 'rating' | 'experience' | 'price' | 'distance';
  page?: number;
  limit?: number;
}

export const searchTherapists = async (
  params: SearchTherapistParams,
): Promise<ApiResponse<SearchTherapistItem[]>> => {
  const { data } = await axios.get<ApiResponse<SearchTherapistItem[]>>('/therapist', { params });
  return data;
};

export interface TherapistDetail {
  id: string;
  name: string;
  specializations?: string[];
  experience?: number;
  rating: number | null;
  totalReviews: number;
  originalPrice: number | null;
  discountedPrice: number;
  displayAddress: string;
  image: string | null;
  about: string | null;
  distance: number | null;
}

export interface TherapistReviewItem {
  rating: number;
  comment: string;
  createdAt: string;
  reviewerName: string;
  reviewerImage: string | null;
}

export interface TherapistArticleItem {
  title: string;
  content: string;
  createdAt: string;
}

export interface TherapistFaqItem {
  question: string;
  answer: string;
}

export interface AvailabilitySlot {
  startHour: number;
  startTime: number; // minutes from midnight
  endTime: number; // minutes from midnight
  category: SlotCategory;
  status: string; // "open" | "booked" | "hold" | "blocked" | ...
}

export interface AvailabilityDay {
  date: string; // DD-MM-YYYY
  timeSlots: AvailabilitySlot[];
}

export const getTherapistById = async (
  id: string,
  location?: { lat?: number; lng?: number },
): Promise<ApiResponse<TherapistDetail>> => {
  const { data } = await axios.get<ApiResponse<TherapistDetail>>(`/therapist/${id}`, {
    params: location,
  });
  return data;
};

export const getTherapistReviews = async (
  id: string,
  params?: { page?: number; limit?: number },
): Promise<ApiResponse<TherapistReviewItem[]>> => {
  const { data } = await axios.get<ApiResponse<TherapistReviewItem[]>>(`/therapist/${id}/reviews`, {
    params,
  });
  return data;
};

export const getTherapistArticlesById = async (
  id: string,
  params?: { page?: number; limit?: number },
): Promise<ApiResponse<TherapistArticleItem[]>> => {
  const { data } = await axios.get<ApiResponse<TherapistArticleItem[]>>(
    `/therapist/${id}/articles`,
    { params },
  );
  return data;
};

export const getTherapistFaqsById = async (
  id: string,
  params?: { page?: number; limit?: number },
): Promise<ApiResponse<TherapistFaqItem[]>> => {
  const { data } = await axios.get<ApiResponse<TherapistFaqItem[]>>(`/therapist/${id}/faqs`, {
    params,
  });
  return data;
};

export const getTherapistAvailability = async (
  id: string,
): Promise<ApiResponse<AvailabilityDay[]>> => {
  const { data } = await axios.get<ApiResponse<AvailabilityDay[]>>(`/therapist/${id}/availability`);
  return data;
};

export interface WeeklySchedulePayload {
  schedule: Record<string, BackendDaySchedule>;
}

export const getWeeklySchedule = async (): Promise<
  ApiResponse<{ schedule: Record<string, BackendDaySchedule | string[]> }>
> => {
  const { data } = await axios.get<
    ApiResponse<{ schedule: Record<string, BackendDaySchedule | string[]> }>
  >('/therapist/slots/schedule');
  return data;
};

export const updateWeeklySchedule = async (
  payload: WeeklySchedulePayload,
): Promise<ApiResponse<{ schedule: Record<string, BackendDaySchedule> }>> => {
  const { data } = await axios.put<ApiResponse<{ schedule: Record<string, BackendDaySchedule> }>>(
    '/therapist/slots/schedule',
    payload,
  );
  return data;
};

export interface BlockSlotsPayload {
  date: string; // ISO string
  startHours: number[];
}

export interface BlocksAndLeavesResponse {
  isOff: boolean;
  blockedHours: number[];
}

export const getBlocksAndLeaves = async (
  date: string,
): Promise<ApiResponse<BlocksAndLeavesResponse>> => {
  const { data } = await axios.get<ApiResponse<BlocksAndLeavesResponse>>(
    `/therapist/slots/blocks-and-leaves?date=${date}`,
  );
  return data;
};

export const blockSlots = async (
  payload: BlockSlotsPayload,
): Promise<ApiResponse<{ message: string; blockedHours?: number[] }>> => {
  const { data } = await axios.post<ApiResponse<{ message: string; blockedHours?: number[] }>>(
    '/therapist/slots/block',
    payload,
  );
  return data;
};

export const unblockSlots = async (
  payload: BlockSlotsPayload,
): Promise<ApiResponse<{ message: string }>> => {
  const { data } = await axios.delete<ApiResponse<{ message: string }>>('/therapist/slots/block', {
    data: payload,
  });
  return data;
};

export interface DateOverrideItem {
  date: string;
  blockedHours: number[];
  isOff: boolean;
}

export const getOverrides = async (): Promise<ApiResponse<DateOverrideItem[]>> => {
  const { data } = await axios.get<ApiResponse<DateOverrideItem[]>>('/therapist/slots/overrides');
  return data;
};

export interface TherapistBookingRecord {
  id: string;
  patientID: string;
  patientName: string;
  patientGender: 'MALE' | 'FEMALE' | 'OTHER';
  patientAge: number | null;
  treatmentMode: 'home_visit' | 'online' | 'clinic';
  status: 'UPCOMING' | 'COMPLETED' | 'CANCELLED' | 'PENDING';
  lastSessionDate: string;
  lastSessionTime: string;
}

import type {
  ClinicalAssessmentRecord,
  SessionImprovementRecordItem,
  DocumentRecordItem,
} from '@/types';

export type { ClinicalAssessmentRecord, SessionImprovementRecordItem, DocumentRecordItem };

export interface TherapistBookingDetail {
  id: string;
  therapistId?: string;
  therapist?: {
    id: string;
    name?: string;
  };
  mode: 'home_visit' | 'online' | 'clinic';
  overallStatus: string;
  status?: 'UPCOMING' | 'COMPLETED' | 'CANCELLED' | 'PENDING';
  patient: {
    id: string;
    name: string;
    dob: string;
    gender: 'MALE' | 'FEMALE' | 'OTHER';
    phone: string;
    image?: string;
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
  };
  sessions?: Array<{
    id: string;
    date: string;
    scheduledTime: string;
    status: string;
  }>;
  documents?: DocumentRecordItem[];
  clinicalAssessments?: ClinicalAssessmentRecord[];
  improvementRecords?: SessionImprovementRecordItem[];
}

export const getTherapistBookings = async (): Promise<ApiResponse<TherapistBookingRecord[]>> => {
  const { data } = await axios.get<ApiResponse<TherapistBookingRecord[]>>(
    '/therapist/sessions/my-bookings',
  );
  return data;
};

export const getTherapistBookingById = async (
  id: string,
): Promise<ApiResponse<TherapistBookingDetail>> => {
  const { data } = await axios.get<ApiResponse<TherapistBookingDetail>>(
    `/therapist/sessions/my-bookings/${id}`,
  );
  return data;
};

export const acceptBooking = async (id: string): Promise<ApiResponse<{ message: string }>> => {
  const { data } = await axios.patch<ApiResponse<{ message: string }>>(
    `/therapist/sessions/my-bookings/${id}/accept`,
  );
  return data;
};

export const generateSessionOtp = async (
  id: string,
): Promise<ApiResponse<{ message: string; otpCode?: string }>> => {
  const { data } = await axios.post<ApiResponse<{ message: string; otpCode?: string }>>(
    `/therapist/sessions/my-bookings/${id}/generate-otp`,
  );
  return data;
};

export const verifySessionOtp = async (
  id: string,
  otp: string,
): Promise<ApiResponse<{ message: string; session?: unknown }>> => {
  const { data } = await axios.post<ApiResponse<{ message: string; session?: unknown }>>(
    `/therapist/sessions/my-bookings/${id}/verify-otp`,
    { otp },
  );
  return data;
};

export const endSession = async (
  id: string,
): Promise<ApiResponse<{ message: string; durationMinutes?: number }>> => {
  const { data } = await axios.post<ApiResponse<{ message: string; durationMinutes?: number }>>(
    `/therapist/sessions/my-bookings/${id}/end`,
  );
  return data;
};

export const completeTreatmentPlan = async (
  planId: string,
  payload: { beforeTherapyImg?: string; afterTherapyImg?: string; finalImprovement?: string },
): Promise<ApiResponse<{ message: string }>> => {
  const { data } = await axios.post<ApiResponse<{ message: string }>>(
    `/therapist/sessions/plan/${planId}/complete`,
    payload,
  );
  return data;
};

export interface TherapistDashboardData {
  todaySessions: Array<{
    id: string;
    patientName: string;
    patientAge: number;
    patientGender: string;
    timeSlot: string;
    mode: 'home_visit' | 'online' | 'clinic';
    status: 'UPCOMING' | 'COMPLETED' | 'CANCELLED' | 'PENDING';
  }>;
  activePatients: number;
  newPatientsThisWeek: number;
  monthlyRevenue: number;
  commissionRate: number;
  rating: number;
  totalRatings: number;
  weeklyTrend: Array<{ day: string; sessions: number }>;
  monthlyTrend: Array<{ month: string; earnings: number }>;
  treatmentModeData: Array<{ name: string; value: number; color: string }>;
}

export const getTherapistDashboard = async (): Promise<ApiResponse<TherapistDashboardData>> => {
  const { data } = await axios.get<ApiResponse<TherapistDashboardData>>('/therapist/dashboard');
  return data;
};
