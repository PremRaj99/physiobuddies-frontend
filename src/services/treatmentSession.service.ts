import { axios } from '@/utils/axios';
import type { ApiResponse } from './index';

export interface RescheduleSlotPayload {
  date: string; // ISO string
  startHour: number;
  reason?: string;
}

export interface AddDocsPayload {
  documents: Array<{
    url: string;
    name: string;
    fileType: string;
  }>;
}

export interface ImprovementRecordPayload {
  painScoreBefore?: number;
  painScoreAfter: number;
  improvementNotes: string;
  exercisesGiven?: string[];
}

export interface BookMoreSessionPayload {
  treatmentPlanId: string;
  date: string;
  startHour: number;
}

export interface SeeMoreSlotsResponse {
  treatmentPlanId: string;
  recommendationRule: string | null;
  visitFrequency: string | null;
  suggestedTreatmentDays: number | null;
  availableSlots: unknown[];
}

export interface TreatmentSessionDocRecord {
  id: string;
  name: string;
  fileType?: string;
  url?: string;
  createdAt: string;
}

export interface TreatmentSessionTherapist {
  id: string;
  mode?: string;
  user?: {
    name?: string;
    image?: string;
    gender?: string;
  };
}

export interface TreatmentSessionPatient {
  id: string;
  dob?: string;
  user?: {
    name?: string;
    phone?: string;
    gender?: string;
  };
}

export interface TreatmentPlan {
  id?: string;
  therapist?: TreatmentSessionTherapist;
  patient?: TreatmentSessionPatient;
  docRecords?: TreatmentSessionDocRecord[];
}

export interface TreatmentSessionReservation {
  address?: string;
  landmark?: string | null;
  city?: string;
  state?: string;
  country?: string;
  postalCode?: string;
  lat?: number;
  lng?: number;
}

export interface TreatmentSession {
  id: string;
  status: string;
  date?: string;
  startAt?: string;
  startHour?: number;
  scheduledTime?: string;
  actualStartTime?: string;
  actualEndTime?: string;
  condition?: string;
  DescribedAs?: string;
  treatmentPlanId?: string;
  treatmentPlan?: TreatmentPlan;
  reservation?: TreatmentSessionReservation;
  location?: {
    address?: string;
    landmark?: string | null;
    city?: string;
    state?: string;
    country?: string;
    postalCode?: string;
    coords?: { lat: number; lng: number };
  };
}

export const getTreatmentSession = async (
  sessionId: string,
): Promise<ApiResponse<TreatmentSession>> => {
  const { data } = await axios.get<ApiResponse<TreatmentSession>>(
    `/treatment-session/${sessionId}`,
  );
  return data;
};

export const confirmBookingSession = async (
  sessionId: string,
): Promise<ApiResponse<{ message: string }>> => {
  const { data } = await axios.post<ApiResponse<{ message: string }>>(
    '/treatment-session/confirm',
    {
      sessionId,
    },
  );
  return data;
};

export const sendSessionOtp = async (
  sessionId: string,
): Promise<ApiResponse<{ message: string; expiresInMinutes?: number }>> => {
  const { data } = await axios.post<ApiResponse<{ message: string; expiresInMinutes?: number }>>(
    `/treatment-session/${sessionId}/send-otp`,
  );
  return data;
};

export const verifySessionOtp = async (
  sessionId: string,
  otp: string,
): Promise<ApiResponse<{ message: string }>> => {
  const { data } = await axios.post<ApiResponse<{ message: string }>>(
    `/treatment-session/${sessionId}/verify-otp`,
    { otp },
  );
  return data;
};

export const rescheduleSessionSlot = async (
  sessionId: string,
  payload: RescheduleSlotPayload,
): Promise<ApiResponse<{ message: string }>> => {
  const { data } = await axios.post<ApiResponse<{ message: string }>>(
    `/treatment-session/${sessionId}/reschedule-slot`,
    payload,
  );
  return data;
};

export const cancelTreatmentSession = async (
  sessionId: string,
  reason?: string,
): Promise<ApiResponse<{ message: string }>> => {
  const { data } = await axios.post<ApiResponse<{ message: string }>>(
    `/treatment-session/${sessionId}/cancel`,
    { reason },
  );
  return data;
};

export const markSessionNoShow = async (
  sessionId: string,
): Promise<ApiResponse<{ message: string }>> => {
  const { data } = await axios.post<ApiResponse<{ message: string }>>(
    `/treatment-session/${sessionId}/no-show`,
  );
  return data;
};

export const addSessionDocs = async (
  sessionId: string,
  payload: AddDocsPayload,
): Promise<ApiResponse<unknown>> => {
  const { data } = await axios.post<ApiResponse<unknown>>(
    `/treatment-session/${sessionId}/add-docs`,
    payload,
  );
  return data;
};

export const submitImprovementRecord = async (
  sessionId: string,
  payload: ImprovementRecordPayload,
): Promise<ApiResponse<{ message: string }>> => {
  const { data } = await axios.post<ApiResponse<{ message: string }>>(
    `/treatment-session/${sessionId}/improvement-record`,
    payload,
  );
  return data;
};

export const getSeeMoreSlots = async (
  treatmentPlanId: string,
): Promise<ApiResponse<SeeMoreSlotsResponse>> => {
  const { data } = await axios.get<ApiResponse<SeeMoreSlotsResponse>>(
    `/treatment-session/${treatmentPlanId}/see-more-slots`,
  );
  return data;
};

export const bookMoreSession = async (
  payload: BookMoreSessionPayload,
): Promise<ApiResponse<{ sessionId: string; reservationId: string; message: string }>> => {
  const { data } = await axios.post<
    ApiResponse<{ sessionId: string; reservationId: string; message: string }>
  >('/treatment-session/book-more-session', payload);
  return data;
};

export const submitAssessment = async (
  sessionId: string,
  payload: unknown,
): Promise<ApiResponse<{ message: string }>> => {
  const { data } = await axios.post<ApiResponse<{ message: string }>>(
    `/treatment-session/${sessionId}/assessment`,
    payload,
  );
  return data;
};
