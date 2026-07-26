import { useMemo } from 'react';
import {
  useTherapistArticlesById,
  useTherapistAvailability,
  useTherapistDetail,
  useTherapistFaqsById,
  useTherapistReviews,
} from '@/hooks/useTherapist';

export function usePhysioDetails(id: string) {
  const { data: detailRes, isLoading, isError } = useTherapistDetail(id);
  const { data: reviewsRes } = useTherapistReviews(id);
  const { data: articlesRes } = useTherapistArticlesById(id);
  const { data: faqsRes } = useTherapistFaqsById(id);
  const { data: availabilityRes, isLoading: slotsLoading } = useTherapistAvailability(id);

  const physio = detailRes?.data;
  const reviews = useMemo(() => reviewsRes?.data ?? [], [reviewsRes]);
  const articles = useMemo(() => articlesRes?.data ?? [], [articlesRes]);
  const faqs = useMemo(() => faqsRes?.data ?? [], [faqsRes]);
  const availability = useMemo(() => availabilityRes?.data ?? [], [availabilityRes]);

  const discountPercentage = useMemo(() => {
    if (physio?.originalPrice && physio.originalPrice > physio.discountedPrice) {
      return Math.round((1 - physio.discountedPrice / physio.originalPrice) * 100);
    }
    return 0;
  }, [physio]);

  return {
    physio,
    reviews,
    articles,
    faqs,
    availability,
    discountPercentage,
    isLoading,
    isError,
    slotsLoading,
  };
}
