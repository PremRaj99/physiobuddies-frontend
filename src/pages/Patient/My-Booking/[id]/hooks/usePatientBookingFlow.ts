import { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import {
  useTreatmentSession,
  useCancelTreatmentSession,
  useSeeMoreSlots,
  useBookMoreSession,
} from '@/hooks/useTreatmentSession';

export type TreatmentMode = 'home_visit' | 'online' | 'clinic';
export type Gender = 'MALE' | 'FEMALE' | 'OTHER';
export type SessionStatus =
  | 'pending'
  | 'confirmed'
  | 'active'
  | 'completed'
  | 'settled'
  | 'cancelled'
  | 'no_show';

export interface Therapist {
  id: string;
  name: string;
  image: string;
  gender: Gender;
  mode: TreatmentMode;
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
}

export const usePatientBookingFlow = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const { data: sessionRes, refetch } = useTreatmentSession(id);
  const liveSession = sessionRes?.data;

  // Build merged data using live session data
  const data: BookingDetails = {
    bookingId: liveSession?.id || id || '',
    overallStatus:
      liveSession?.status === 'completed'
        ? 'COMPLETED'
        : liveSession?.status === 'cancelled'
          ? 'CANCELLED'
          : 'IN_PROGRESS',
    therapist: {
      id: liveSession?.treatmentPlan?.therapist?.id || '',
      name: liveSession?.treatmentPlan?.therapist?.user?.name || 'Dr. Physical Therapist',
      image:
        liveSession?.treatmentPlan?.therapist?.user?.image ||
        'https://images.unsplash.com/photo-1594824436998-d7037b52479e?auto=format&fit=crop&q=80&w=200',
      gender: (liveSession?.treatmentPlan?.therapist?.user?.gender as Gender) || 'FEMALE',
      mode: (liveSession?.treatmentPlan?.therapist?.mode as TreatmentMode) || 'home_visit',
    },
    patient: {
      name: liveSession?.treatmentPlan?.patient?.user?.name || 'Patient',
      dob: liveSession?.treatmentPlan?.patient?.dob || 'N/A',
      gender: (liveSession?.treatmentPlan?.patient?.user?.gender as Gender) || 'MALE',
      phone: liveSession?.treatmentPlan?.patient?.user?.phone || 'N/A',
    },
    condition: { title: liveSession?.condition || 'Physiotherapy Treatment' },
    problemDescription: liveSession?.DescribedAs || 'No description provided.',
    location: {
      address: liveSession?.reservation?.address || liveSession?.location?.address || 'Address not provided',
      landmark: liveSession?.reservation?.landmark || liveSession?.location?.landmark || null,
      city: liveSession?.reservation?.city || liveSession?.location?.city || '',
      state: liveSession?.reservation?.state || liveSession?.location?.state || '',
      country: liveSession?.reservation?.country || liveSession?.location?.country || '',
      postalCode: liveSession?.reservation?.postalCode || liveSession?.location?.postalCode || '',
      coords: {
        lat: liveSession?.reservation?.lat || liveSession?.location?.coords?.lat || 0,
        lng: liveSession?.reservation?.lng || liveSession?.location?.coords?.lng || 0,
      },
    },
    sessions: liveSession
      ? (() => {
        const sessionDate = liveSession.date || liveSession.startAt;
        return [
          {
            id: liveSession.id,
            date: sessionDate
              ? new Date(sessionDate).toLocaleDateString('en-US', {
                month: 'short',
                day: '2-digit',
                year: 'numeric',
              })
              : 'N/A',
            scheduledTime: `${liveSession.startHour || 10}:00 AM - ${(liveSession.startHour || 10) + 1}:00 AM`,
            actualStartTime: liveSession.actualStartTime
              ? new Date(liveSession.actualStartTime).toLocaleTimeString()
              : undefined,
            actualEndTime: liveSession.actualEndTime
              ? new Date(liveSession.actualEndTime).toLocaleTimeString()
              : undefined,
            status: (liveSession.status?.toLowerCase() as SessionStatus) || 'pending',
          },
        ];
      })()
      : [],
    documents: liveSession?.treatmentPlan?.docRecords
      ? liveSession.treatmentPlan.docRecords.map(
        (d: { id: string; name: string; fileType?: string; createdAt: string }) => ({
          id: d.id,
          title: d.name,
          type: d.fileType || 'Medical Report',
          date: new Date(d.createdAt).toLocaleDateString(),
        })
      )
      : [],
  };

  // Treatment Session Mutations & Hooks
  const cancelMutation = useCancelTreatmentSession();
  const bookMoreMutation = useBookMoreSession();
  const treatmentPlanId = liveSession?.treatmentPlanId;
  const { data: seeMoreSlotsRes } = useSeeMoreSlots(treatmentPlanId);

  // Cancellation Dialog State
  const [isCancelOpen, setIsCancelOpen] = useState(false);
  const [cancelReason, setCancelReason] = useState('');
  const [targetSessionId, setTargetSessionId] = useState<string | null>(null);

  // Follow-Up Booking State
  const [isBookMoreOpen, setIsBookMoreOpen] = useState(false);
  const [bookMoreDate, setBookMoreDate] = useState('');
  const [bookMoreHour, setBookMoreHour] = useState(10);

  const handleCancelSubmit = async () => {
    const sessionId = targetSessionId || id || '';
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
      alert('Please select a date for the follow-up session');
      return;
    }
    try {
      await bookMoreMutation.mutateAsync({
        treatmentPlanId,
        date: new Date(bookMoreDate).toISOString(),
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
    data,
    treatmentPlanId,
    seeMoreSlotsRes,
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
