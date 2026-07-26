import { axios } from '@/utils/axios';
import type { ApiResponse } from './index';

export type ActivityType = 'frequent' | 'likely' | 'possible' | 'rare' | 'unlikely';

export interface ActivityRecord {
  id: string;
  userId: string;
  title: string;
  data: string;
  before: string | null;
  after: string | null;
  ip: string;
  type: ActivityType;
  createdAt: string;
}

export const getActivities = async (): Promise<ApiResponse<ActivityRecord[]>> => {
  const { data } = await axios.get<ApiResponse<ActivityRecord[]>>('/activities');
  return data;
};
