import { axios } from '@/utils/axios';
import type { ApiResponse } from './index';

export interface AdminUser {
  id: string;
  name: string;
  email: string;
  createdAt: string;
  role: 'therapist' | 'patient' | 'admin';
  image: string | null;
  phone: string | null;
}

export const getAdminUsers = async (): Promise<ApiResponse<AdminUser[]>> => {
  const { data } = await axios.get<ApiResponse<AdminUser[]>>('/admin/users');
  return data;
};

export const toggleBlockUser = async (id: string): Promise<ApiResponse<string>> => {
  const { data } = await axios.patch<ApiResponse<string>>(`/admin/users/${id}/block`);
  return data;
};
