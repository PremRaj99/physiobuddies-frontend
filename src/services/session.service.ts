import { axios } from '@/utils/axios';
import type { ApiResponse } from './index';

export interface UserSession {
  id: string;
  agent: string;
  location: string;
  ip: string;
  lastLoggedAt: string | null;
  createdAt: string;
  isCurrentSession: boolean;
}

export const getSessions = async (): Promise<ApiResponse<UserSession[]>> => {
  const { data } = await axios.get<ApiResponse<UserSession[]>>('/user/sessions');
  return data;
};

export const revokeSession = async (id: string): Promise<ApiResponse> => {
  const { data } = await axios.delete<ApiResponse>(`/user/sessions/${id}`);
  return data;
};
