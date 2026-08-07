import { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { usePatientBookingDetail } from '@/hooks/usePatient';
import {
  useCancelTreatmentSession,
  useSeeMoreSlots,
  useBookMoreSession,
} from '@/hooks/useTreatmentSession';
import type {
  TreatmentMode,
  Gender,
  SessionStatus,
  ClinicalAssessmentRecord,
  SessionImprovementRecordItem,
} from '@/types';

export type { TreatmentMode, Gender, SessionStatus };

export interface Therapist {
  id: string;
  therapistId?: string;
  name: string;
  image: string;
  gender: Gender;
  mode: TreatmentMode;
  rating?: number;
}

export interface Patient {
  name: string;
  dob: string;
  gender: Gender;
  phone: string;
}

export interface Location {
  address: string;
  landmark: string | null;
  city: string;
  state: string;
  country: string;
  postalCode: string;
  coords: { lat: number; lng: number };
}

export interface TreatmentSessionItem {
  id: string;
  date: string;
  scheduledTime: string;
  actualStartTime?: string;
  actualEndTime?: string;
  status: SessionStatus;
}

export interface DocumentItem {
  id: string;
  title: string;
  type: string;
  date: string;
  url?: string;
}

export interface BookingDetails {
  bookingId: string;
  overallStatus: 'IN_PROGRESS' | 'COMPLETED' | 'CANCELLED';
  therapist: Therapist;
  patient: Patient;
  location: Location;
  sessions: TreatmentSessionItem[];
  condition: { title: string };
  problemDescription: string;
  documents: DocumentItem[];
  clinicalAssessments?: ClinicalAssessmentRecord[];
  improvementRecords?: SessionImprovementRecordItem[];
}

const getOverallStatus = (
  status?: string,
  overallStatus?: string,
): BookingDetails['overallStatus'] => {
  const normalized = (overallStatus || status || '').toUpperCase();

  if (normalized === 'COMPLETED') return 'COMPLETED';
  if (normalized === 'CANCELLED') return 'CANCELLED';

  return 'IN_PROGRESS';
};

const getSessionStatus = (status?: string): SessionStatus => {
  switch ((status || '').toUpperCase()) {
    case 'CONFIRMED':
      return 'confirmed';
    case 'ACTIVE':
    case 'IN_PROGRESS':
      return 'active';
    case 'COMPLETED':
      return 'completed';
    case 'SETTLED':
      return 'settled';
    case 'CANCELLED':
      return 'cancelled';
    case 'NO_SHOW':
      return 'no_show';
    case 'UPCOMING':
      return 'confirmed';
    case 'PENDING':
    default:
      return 'pending';
  }
};

const formatDate = (value?: string) => {
  if (!value) return 'N/A';

  const parsed = new Date(value);
  if (Number.isNaN(parsed.getTime())) return value;

  return parsed.toLocaleDateString('en-US', {
    month: 'short',
    day: '2-digit',
    year: 'numeric',
  });
};

const formatTime = (value?: string) => {
  if (!value) return undefined;

  const parsed = new Date(value);
  if (Number.isNaN(parsed.getTime())) return value;

  return parsed.toLocaleTimeString('en-US', {
    hour: '2-digit',
    minute: '2-digit',
  });
};

import { parseSlotDateToIso } from '@/utils/slots';

const toIsoDateString = (value: string) => {
  return parseSlotDateToIso(value);
};

export const usePatientBookingFlow = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const { data: bookingRes, isLoading, refetch } = usePatientBookingDetail(id || '');
  const booking = bookingRes?.data;
  const treatmentPlanId = booking?.treatmentPlanId;

  const data: BookingDetails | null = booking
    ? {
        bookingId: booking.id || id || '',
        overallStatus: getOverallStatus(booking.status, booking.overallStatus),
        therapist: {
          id: booking.therapist?.id || '',
          therapistId: booking.therapist?.therapistId || booking.therapist?.id || '',
          name: booking.therapist?.name || 'Dr. Physical Therapist',
          image:
            booking.therapist?.image ||
            'https://images.unsplash.com/photo-1594824436998-d7037b52479e?auto=format&fit=crop&q=80&w=200',
          gender: booking.therapist?.gender || 'FEMALE',
          mode: booking.mode || 'home_visit',
          rating: booking.therapist?.rating ?? 4.8,
        },
        patient: {
          name: booking.patient?.name || 'Patient',
          dob: formatDate(booking.patient?.dob),
          gender: booking.patient?.gender || 'MALE',
          phone: booking.patient?.phone || 'N/A',
        },
        condition: booking.condition || { title: 'Physiotherapy Treatment' },
        problemDescription: booking.problemDescription || 'No description provided.',
        location: {
          address: booking.location?.address || 'Address not provided',
          landmark: booking.location?.landmark || null,
          city: booking.location?.city || '',
          state: booking.location?.state || '',
          country: booking.location?.country || '',
          postalCode: booking.location?.postalCode || '',
          coords: {
            lat: booking.location?.coords?.lat || 0,
            lng: booking.location?.coords?.lng || 0,
          },
        },
        sessions: (booking.sessions || []).map((session) => ({
          id: session.id,
          date: formatDate(session.date),
          scheduledTime: session.scheduledTime || 'N/A',
          actualStartTime: formatTime(session.actualStartTime),
          actualEndTime: formatTime(session.actualEndTime),
          status: getSessionStatus(session.status),
        })),
        documents: (booking.documents || []).map((document) => ({
          id: document.id,
          title: document.name,
          type: document.fileType || 'Medical Report',
          date: formatDate(document.createdAt),
          url: document.url,
        })),
        clinicalAssessments: booking.clinicalAssessments || [],
        improvementRecords: booking.improvementRecords || [],
      }
    : null;

  // Treatment Session Mutations & Hooks
  const cancelMutation = useCancelTreatmentSession();
  const bookMoreMutation = useBookMoreSession();
  const { data: seeMoreSlotsRes, isLoading: isLoadingFollowUpSlots } =
    useSeeMoreSlots(treatmentPlanId);
  const followUpAvailability = seeMoreSlotsRes?.data?.availableSlots || [];
  const followUpSlotCount = followUpAvailability.reduce(
    (count, day) => count + day.timeSlots.filter((slot) => slot.status === 'open').length,
    0,
  );
  const hasFollowUpSlots = followUpSlotCount > 0;

  const visitFrequency = booking?.clinicalAssessments?.at?.(0)?.visitFrequency || '';
  const suggestedTreatmentDaysLeft =
    (booking?.clinicalAssessments?.at?.(0)?.suggestedTreatmentDays || 0) -
    (booking?.sessions?.length || 0);

  // Cancellation Dialog State
  const [isCancelOpen, setIsCancelOpen] = useState(false);
  const [cancelReason, setCancelReason] = useState('');
  const [targetSessionId, setTargetSessionId] = useState<string | null>(null);

  // Follow-Up Booking State
  const [isBookMoreOpen, setIsBookMoreOpen] = useState(false);
  const [bookMoreDate, setBookMoreDate] = useState('');
  const [bookMoreHour, setBookMoreHour] = useState(10);

  const handleCancelSubmit = async () => {
    const sessionId = targetSessionId || booking?.sessions?.[0]?.id || '';
    if (!sessionId) return;
    try {
      await cancelMutation.mutateAsync({ sessionId, reason: cancelReason });
      setIsCancelOpen(false);
      setCancelReason('');
      await refetch();
    } catch (err: unknown) {
      const error = err as { response?: { data?: { message?: string } }; message?: string };
      alert(error?.response?.data?.message || error?.message || 'Failed to cancel session');
    }
  };

  const handleBookMoreSubmit = async () => {
    if (!treatmentPlanId || !bookMoreDate) {
      alert('Please select an available follow-up slot');
      return;
    }
    try {
      await bookMoreMutation.mutateAsync({
        treatmentPlanId,
        date: toIsoDateString(bookMoreDate),
        startHour: Number(bookMoreHour),
      });
      setIsBookMoreOpen(false);
      await refetch();
    } catch (err: unknown) {
      const error = err as { response?: { data?: { message?: string } }; message?: string };
      alert(error?.response?.data?.message || error?.message || 'Failed to book follow-up session');
    }
  };

  const openCancelModal = (sessionId: string) => {
    setTargetSessionId(sessionId);
    setIsCancelOpen(true);
  };

  return {
    id,
    navigate,
    booking,
    isLoading,
    data,
    treatmentPlanId,
    seeMoreSlotsRes,
    isLoadingFollowUpSlots,
    hasFollowUpSlots,
    followUpSlotCount,
    visitFrequency,
    suggestedTreatmentDaysLeft,
    // Modals
    isCancelOpen,
    setIsCancelOpen,
    cancelReason,
    setCancelReason,
    isBookMoreOpen,
    setIsBookMoreOpen,
    bookMoreDate,
    setBookMoreDate,
    bookMoreHour,
    setBookMoreHour,
    // Actions
    openCancelModal,
    handleCancelSubmit,
    handleBookMoreSubmit,
    isCancelling: cancelMutation.isPending,
    isBookingMore: bookMoreMutation.isPending,
  };
};
