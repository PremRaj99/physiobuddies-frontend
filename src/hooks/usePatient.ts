import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import {
  getPatientDetails,
  createPatientDetail,
  getPatientLocations,
  createPatientLocation,
  getPatientMyBookings,
  type CreatePatientDetailPayload,
  type CreatePatientLocationPayload,
} from '@/services/patient.service';
import { axios } from '@/utils/axios';
import type { ApiResponse } from '@/services/index';

export const usePatientMyBookings = () =>
  useQuery({
    queryKey: ['patient', 'my-bookings'],
    queryFn: getPatientMyBookings,
    select: (res) => res.data ?? [],
  });

export const usePatientDetails = () =>
  useQuery({
    queryKey: ['patient', 'details'],
    queryFn: getPatientDetails,
    select: (res) => res.data ?? [],
  });

export const useCreatePatientDetail = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (payload: CreatePatientDetailPayload) => createPatientDetail(payload),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['patient', 'details'] }),
  });
};

export const usePatientLocations = () =>
  useQuery({
    queryKey: ['patient', 'locations'],
    queryFn: getPatientLocations,
    select: (res) => res.data ?? [],
  });

export const useCreatePatientLocation = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (payload: CreatePatientLocationPayload) => createPatientLocation(payload),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['patient', 'locations'] }),
  });
};

export interface CreateBookingSessionPayload {
  therapistId: string;
  date: string; // ISO datetime
  startHour: number;
}

export interface CreateBookingSessionResult {
  sessionId: string;
  createdAt: string;
  expiresAt: string;
}

export interface BookingSessionDataResponse {
  sessionId: string;
  reservationId: string;
  therapistId: string;
  patientId: string;
  date: string;
  startHour: number;
  createdAt: string;
  expiresAt: string;
  step: number;
  formData: {
    patientDetailId: string | null;
    locationId: string | null;
    conditionId: string | null;
    problemDesc: string;
    couponCode: string | null;
    couponDiscount: number;
  };
  paymentPhase: boolean;
  paymentId: string | null;
  therapist: {
    id: string;
    name: string;
    image: string | null;
    price: number;
    priceAlt: number | null;
    mode: string;
    clinic: string | null;
    address: string;
  } | null;
  isConfirmed?: boolean;
}

export const useCreateBookingSession = () =>
  useMutation({
    mutationFn: async (
      payload: CreateBookingSessionPayload,
    ): Promise<ApiResponse<CreateBookingSessionResult>> => {
      const { data } = await axios.post<ApiResponse<CreateBookingSessionResult>>(
        '/reservation/session',
        payload,
      );
      return data;
    },
  });

export const useBookingSession = (sessionId: string | undefined) =>
  useQuery({
    queryKey: ['booking-session', sessionId],
    queryFn: async (): Promise<ApiResponse<BookingSessionDataResponse>> => {
      const { data } = await axios.get<ApiResponse<BookingSessionDataResponse>>(
        `/reservation/session/${sessionId}`,
      );
      return data;
    },
    enabled: Boolean(sessionId),
    staleTime: 5000,
    retry: 1,
  });

export const useUpdateBookingForm = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async ({
      sessionId,
      formData,
    }: {
      sessionId: string;
      formData: Partial<BookingSessionDataResponse['formData']> & { step?: number };
    }) => {
      const { data } = await axios.patch<ApiResponse>(
        `/reservation/session/${sessionId}/form`,
        formData,
      );
      return data;
    },
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: ['booking-session', variables.sessionId] });
    },
  });
};

export const useApplyCoupon = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async ({
      sessionId,
      couponCode,
    }: {
      sessionId: string;
      couponCode: string;
    }): Promise<ApiResponse<{ message: string; discount: number; finalPrice: number }>> => {
      const { data } = await axios.post<
        ApiResponse<{ message: string; discount: number; finalPrice: number }>
      >(`/reservation/session/${sessionId}/apply-coupon`, { couponCode });
      return data;
    },
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: ['booking-session', variables.sessionId] });
    },
  });
};

export const useRemoveCoupon = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (sessionId: string): Promise<ApiResponse> => {
      const { data } = await axios.delete<ApiResponse>(
        `/reservation/session/${sessionId}/remove-coupon`,
      );
      return data;
    },
    onSuccess: (_, sessionId) => {
      queryClient.invalidateQueries({ queryKey: ['booking-session', sessionId] });
    },
  });
};

export interface InitiatePaymentResult {
  paymentId: string;
  invoiceId: string;
  amount: number;
  currency: string;
  razorpayOrderId: string;
  razorpayKeyId?: string;
}

export const useInitiatePayment = () =>
  useMutation({
    mutationFn: async (
      sessionId: string,
    ): Promise<ApiResponse<InitiatePaymentResult>> => {
      const { data } = await axios.post<ApiResponse<InitiatePaymentResult>>(
        `/reservation/session/${sessionId}/initiate-payment`,
      );
      return data;
    },
  });

export interface VerifyPaymentPayload {
  razorpay_payment_id: string;
  razorpay_order_id: string;
  razorpay_signature: string;
  sessionId?: string;
  internalPaymentId?: string;
}

export const useVerifyPayment = () =>
  useMutation({
    mutationFn: async (
      payload: VerifyPaymentPayload,
    ): Promise<ApiResponse<{ verified: boolean; reservation?: unknown }>> => {
      const { data } = await axios.post<
        ApiResponse<{ verified: boolean; reservation?: unknown }>
      >('/payment/confirm', payload);
      return data;
    },
  });

export const useFinalizeBooking = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async ({
      sessionId,
      gatewayPaymentId,
    }: {
      sessionId: string;
      gatewayPaymentId?: string;
    }): Promise<ApiResponse<{ reservationId: string; message: string }>> => {
      const { data } = await axios.post<
        ApiResponse<{ reservationId: string; message: string }>
      >(`/reservation/session/${sessionId}/finalize`, { gatewayPaymentId });
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['patient'] });
    },
  });
};

export interface HoldReservationPayload {
  therapistId: string;
  date: string; // ISO datetime
  startHour: number;
}

interface HoldReservationResult {
  reservationId: string;
  message: string;
  expiresAt: string;
}

export const useHoldReservation = () =>
  useMutation({
    mutationFn: async (
      payload: HoldReservationPayload,
    ): Promise<ApiResponse<HoldReservationResult>> => {
      const { data } = await axios.post<ApiResponse<HoldReservationResult>>(
        '/reservation/hold',
        payload,
      );
      return data;
    },
  });

export const useConfirmReservation = () =>
  useMutation({
    mutationFn: async (
      reservationId: string,
    ): Promise<ApiResponse<{ reservationId: string; message: string }>> => {
      const { data } = await axios.patch<ApiResponse<{ reservationId: string; message: string }>>(
        `/reservation/${reservationId}/confirm`,
      );
      return data;
    },
  });

export const useCancelReservation = () =>
  useMutation({
    mutationFn: async (reservationId: string): Promise<ApiResponse> => {
      const { data } = await axios.delete<ApiResponse>(`/reservation/${reservationId}`);
      return data;
    },
  });
