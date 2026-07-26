import { axios } from '@/utils/axios';
import type { ApiResponse } from './index';

export type ComplaintStatus = 'pending' | 'processing' | 'completed' | 'rejected';
export type ReplyRole = 'user' | 'support';

export interface ComplaintReply {
  id: string;
  role: ReplyRole;
  message: string;
  createdAt: string;
}

export interface Complaint {
  id: string;
  type: string;
  description: string;
  status: ComplaintStatus;
  createdAt: string;
  reply: ComplaintReply[];
}

export interface CreateComplaintPayload {
  type: string;
  description: string;
}

export const getComplaints = async (): Promise<ApiResponse<Complaint[]>> => {
  const { data } = await axios.get<ApiResponse<Complaint[]>>('/complaint');
  return data;
};

export const createComplaint = async (
  payload: CreateComplaintPayload,
): Promise<ApiResponse<Complaint>> => {
  const { data } = await axios.post<ApiResponse<Complaint>>('/complaint', payload);
  return data;
};

export const addComplaintReply = async (
  id: string,
  message: string,
): Promise<ApiResponse<ComplaintReply>> => {
  const { data } = await axios.post<ApiResponse<ComplaintReply>>(`/complaint/${id}/reply`, {
    message,
  });
  return data;
};
