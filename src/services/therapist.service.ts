import { axios } from '@/utils/axios';
import type { ApiResponse } from './index';
import type { BackendDaySchedule } from '@/pages/Therapist/Slot-Management/utils';

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
