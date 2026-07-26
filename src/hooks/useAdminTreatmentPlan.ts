import { useQuery } from '@tanstack/react-query';
import {
  getAdminTreatmentPlans,
  getAdminTreatmentPlanById,
} from '@/services/adminTreatmentPlan.service';

export const useAdminTreatmentPlans = () => {
  return useQuery({
    queryKey: ['admin', 'treatment-plans'],
    queryFn: () => getAdminTreatmentPlans(),
  });
};

export const useAdminTreatmentPlanDetail = (id: string, enabled = false) => {
  return useQuery({
    queryKey: ['admin', 'treatment-plan', id],
    queryFn: () => getAdminTreatmentPlanById(id),
    enabled: enabled && !!id,
  });
};
