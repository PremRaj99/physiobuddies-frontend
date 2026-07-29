import { axios } from '@/utils/axios';
import type { ApiResponse } from './index';

export type TreatmentPlanStatus =
  | 'created'
  | 'treatment_planned'
  | 'ongoing'
  | 'completed'
  | 'cancelled'
  | 'abandoned';

export interface TreatmentPlanSession {
  id: string;
  date: string | null;
  startTime: string | null;
  endTime: string | null;
}

// `location` and `email` are JSON snapshots stored on the plan; shape defensively.
export interface AdminTreatmentPlanListItem {
  id: string;
  location: unknown;
  email: unknown;
  status: TreatmentPlanStatus;
  sessions: TreatmentPlanSession[];
}

export interface AdminTreatmentPlanDetail {
  id: string;
  status: TreatmentPlanStatus;
  createdAt: string;
  updatedAt: string;
  patientDetailsSnapshot: unknown;
  locationSnapshot: unknown;
  therapistSnapshot: unknown;
  sessions: TreatmentPlanSession[];
  [key: string]: unknown;
}

export const getAdminTreatmentPlans = async (): Promise<
  ApiResponse<AdminTreatmentPlanListItem[]>
> => {
  const { data } =
    await axios.get<ApiResponse<AdminTreatmentPlanListItem[]>>('/admin/treatment-plan');
  return data;
};

export const getAdminTreatmentPlanById = async (
  id: string,
): Promise<ApiResponse<AdminTreatmentPlanDetail>> => {
  const { data } = await axios.get<ApiResponse<AdminTreatmentPlanDetail>>(
    `/admin/treatment-plan/${id}`,
  );
  return data;
};
