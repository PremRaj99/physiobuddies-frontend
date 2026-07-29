import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import {
  getTreatmentSession,
  confirmBookingSession,
  sendSessionOtp,
  verifySessionOtp,
  rescheduleSessionSlot,
  cancelTreatmentSession,
  markSessionNoShow,
  addSessionDocs,
  submitImprovementRecord,
  getSeeMoreSlots,
  bookMoreSession,
  type RescheduleSlotPayload,
  type AddDocsPayload,
  type ImprovementRecordPayload,
  type BookMoreSessionPayload,
} from '@/services/treatmentSession.service';

export const useTreatmentSession = (sessionId: string | undefined) => {
  return useQuery({
    queryKey: ['treatment-session', sessionId],
    queryFn: () => getTreatmentSession(sessionId!),
    enabled: Boolean(sessionId),
  });
};

export const useConfirmBookingSession = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (sessionId: string) => confirmBookingSession(sessionId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['treatment-session'] });
      queryClient.invalidateQueries({ queryKey: ['therapist-booking'] });
    },
  });
};

export const useSendSessionOtp = () => {
  return useMutation({
    mutationFn: (sessionId: string) => sendSessionOtp(sessionId),
  });
};

export const useVerifySessionOtp = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ sessionId, otp }: { sessionId: string; otp: string }) =>
      verifySessionOtp(sessionId, otp),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['treatment-session'] });
      queryClient.invalidateQueries({ queryKey: ['therapist-booking'] });
    },
  });
};

export const useRescheduleSessionSlot = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ sessionId, payload }: { sessionId: string; payload: RescheduleSlotPayload }) =>
      rescheduleSessionSlot(sessionId, payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['treatment-session'] });
      queryClient.invalidateQueries({ queryKey: ['therapist-booking'] });
    },
  });
};

export const useCancelTreatmentSession = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ sessionId, reason }: { sessionId: string; reason?: string }) =>
      cancelTreatmentSession(sessionId, reason),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['treatment-session'] });
      queryClient.invalidateQueries({ queryKey: ['therapist-booking'] });
      queryClient.invalidateQueries({ queryKey: ['patient'] });
    },
  });
};

export const useMarkSessionNoShow = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (sessionId: string) => markSessionNoShow(sessionId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['treatment-session'] });
      queryClient.invalidateQueries({ queryKey: ['therapist-booking'] });
    },
  });
};

export const useAddSessionDocs = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ sessionId, payload }: { sessionId: string; payload: AddDocsPayload }) =>
      addSessionDocs(sessionId, payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['treatment-session'] });
      queryClient.invalidateQueries({ queryKey: ['therapist-booking'] });
    },
  });
};

export const useSubmitImprovementRecord = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({
      sessionId,
      payload,
    }: {
      sessionId: string;
      payload: ImprovementRecordPayload;
    }) => submitImprovementRecord(sessionId, payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['treatment-session'] });
      queryClient.invalidateQueries({ queryKey: ['therapist-booking'] });
    },
  });
};

export const useSeeMoreSlots = (treatmentPlanId: string | undefined) => {
  return useQuery({
    queryKey: ['see-more-slots', treatmentPlanId],
    queryFn: () => getSeeMoreSlots(treatmentPlanId!),
    enabled: Boolean(treatmentPlanId),
  });
};

export const useBookMoreSession = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (payload: BookMoreSessionPayload) => bookMoreSession(payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['patient'] });
      queryClient.invalidateQueries({ queryKey: ['treatment-session'] });
    },
  });
};
