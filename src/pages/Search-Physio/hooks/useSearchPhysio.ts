import { useState } from 'react';
import { useSearchTherapists } from '@/hooks/useTherapist';
import type { SearchTherapistParams } from '@/services/therapist.service';

export type Filters = {
  lng: number;
  lat: number;
  radius: number;
  mode: 'home_visit' | 'online' | 'clinic' | undefined;
  price: number[];
  experience: number[];
  gender: 'male' | 'female' | 'other' | 'any';
  specialization: string[];
  sort: 'price' | 'rating' | 'experience' | 'distance';
  page: number;
  limit: number;
};

export const initialFilterState: Filters = {
  lng: 77.1025,
  lat: 28.7041,
  radius: 10,
  mode: undefined,
  price: [0, 5000],
  gender: 'any',
  specialization: [],
  experience: [0, 10],
  sort: 'rating',
  page: 1,
  limit: 10,
};

export const buildSearchParams = (filters: Filters): SearchTherapistParams => ({
  lng: filters.lng,
  lat: filters.lat,
  radius: filters.radius,
  ...(filters.mode && { mode: filters.mode }),
  ...(filters.gender !== 'any' && { gender: filters.gender }),
  ...(filters.specialization.length > 0 && { specialization: filters.specialization }),
  price: [filters.price[0], filters.price[1]],
  experience: [filters.experience[0], filters.experience[1]],
  sort: filters.sort,
  page: filters.page,
  limit: filters.limit,
});

export function useSearchPhysio() {
  const [filters, setFilters] = useState<Filters>(initialFilterState);
  const [isMobileFilterOpen, setIsMobileFilterOpen] = useState(false);

  const { data: searchResults, isLoading } = useSearchTherapists(buildSearchParams(filters));
  const therapists = searchResults?.data ?? [];

  return {
    filters,
    setFilters,
    isMobileFilterOpen,
    setIsMobileFilterOpen,
    therapists,
    isLoading,
  };
}
