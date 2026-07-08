import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import {
  getWeeklySchedule,
  updateWeeklySchedule,
  type WeeklySchedulePayload,
  getBlocksAndLeaves,
  blockSlots,
  unblockSlots,
  type BlockSlotsPayload,
  getOverrides,
} from '@/services/therapist.service';

export const useWeeklySchedule = () => {
  return useQuery({
    queryKey: ['weekly-schedule'],
    queryFn: () => getWeeklySchedule(),
  });
};

export const useUpdateWeeklySchedule = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (payload: WeeklySchedulePayload) => updateWeeklySchedule(payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['weekly-schedule'] });
    },
  });
};

export const useBlocksAndLeaves = (date: string, enabled = true) => {
  return useQuery({
    queryKey: ['blocks-and-leaves', date],
    queryFn: () => getBlocksAndLeaves(date),
    enabled: enabled && !!date,
  });
};

export const useBlockSlots = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (payload: BlockSlotsPayload) => blockSlots(payload),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: ['blocks-and-leaves', variables.date] });
    },
  });
};

export const useUnblockSlots = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (payload: BlockSlotsPayload) => unblockSlots(payload),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: ['blocks-and-leaves', variables.date] });
    },
  });
};

export const useOverrides = () => {
  return useQuery({
    queryKey: ['overrides'],
    queryFn: () => getOverrides(),
  });
};
