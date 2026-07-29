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
  availableSlots: any[];
}

export const getTreatmentSession = async (sessionId: string): Promise<ApiResponse<any>> => {
  const { data } = await axios.get<ApiResponse<any>>(`/treatment-session/${sessionId}`);
  return data;
};

export const confirmBookingSession = async (
  sessionId: string,
): Promise<ApiResponse<{ message: string }>> => {
  const { data } = await axios.post<ApiResponse<{ message: string }>>('/treatment-session/confirm', {
    sessionId,
  });
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
): Promise<ApiResponse<any>> => {
  const { data } = await axios.post<ApiResponse<any>>(
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
