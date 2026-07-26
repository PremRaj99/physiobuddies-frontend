import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import {
  getPatientDetails,
  createPatientDetail,
  getPatientLocations,
  createPatientLocation,
  type CreatePatientDetailPayload,
  type CreatePatientLocationPayload,
} from '@/services/patient.service';
import { axios } from '@/utils/axios';
import type { ApiResponse } from '@/services/index';

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
