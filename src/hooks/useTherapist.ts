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
  searchTherapists,
  type SearchTherapistParams,
  getTherapistById,
  getTherapistReviews,
  getTherapistArticlesById,
  getTherapistFaqsById,
  getTherapistAvailability,
  getTherapistBookings,
  getTherapistBookingById,
} from '@/services/therapist.service';

export const useSearchTherapists = (params: SearchTherapistParams) => {
  return useQuery({
    queryKey: ['therapists', 'search', params],
    queryFn: () => searchTherapists(params),
    placeholderData: (prev) => prev,
  });
};

export const useTherapistDetail = (id: string, location?: { lat?: number; lng?: number }) => {
  return useQuery({
    queryKey: ['therapist', id, location],
    queryFn: () => getTherapistById(id, location),
    enabled: !!id,
  });
};

export const useTherapistReviews = (id: string) => {
  return useQuery({
    queryKey: ['therapist', id, 'reviews'],
    queryFn: () => getTherapistReviews(id),
    enabled: !!id,
  });
};

export const useTherapistArticlesById = (id: string) => {
  return useQuery({
    queryKey: ['therapist', id, 'articles'],
    queryFn: () => getTherapistArticlesById(id),
    enabled: !!id,
  });
};

export const useTherapistFaqsById = (id: string) => {
  return useQuery({
    queryKey: ['therapist', id, 'faqs'],
    queryFn: () => getTherapistFaqsById(id),
    enabled: !!id,
  });
};

export const useTherapistAvailability = (id: string) => {
  return useQuery({
    queryKey: ['therapist', id, 'availability'],
    queryFn: () => getTherapistAvailability(id),
    enabled: !!id,
  });
};

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

export const useTherapistBookings = () => {
  return useQuery({
    queryKey: ['therapist-bookings'],
    queryFn: () => getTherapistBookings(),
  });
};

export const useTherapistBookingDetail = (id: string) => {
  return useQuery({
    queryKey: ['therapist-booking', id],
    queryFn: () => getTherapistBookingById(id),
    enabled: !!id,
  });
};
