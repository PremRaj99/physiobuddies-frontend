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

const MOCK_DATA: BookingDetails = {
  bookingId: 'BKG-2026-9823',
  overallStatus: 'IN_PROGRESS',
  therapist: {
    id: 'TH-PT-1042',
    name: 'Dr. Sarah Jenkins',
    image:
      'https://images.unsplash.com/photo-1594824436998-d7037b52479e?auto=format&fit=crop&q=80&w=200',
    gender: 'FEMALE',
    mode: 'home_visit',
  },
  patient: {
    name: 'Robert Fox',
    dob: '1985-06-15',
    gender: 'MALE',
    phone: '+1 (555) 123-4567',
  },
  condition: {
    title: 'Post Surgical',
  },
  problemDescription:
    'Experiencing severe stiffness and limited range of motion in the left knee after ACL reconstruction surgery 3 weeks ago.',
  location: {
    address: '123 Wellness Ave, Apt 4B',
    landmark: 'Near Central Park',
    city: 'New York',
    state: 'NY',
    country: 'USA',
    postalCode: '10001',
    coords: { lat: 40.7128, lng: -74.006 },
  },
  sessions: [
    {
      id: 's1',
      date: 'May 10, 2026',
      scheduledTime: '10:00 AM - 11:00 AM',
      actualStartTime: '10:02 AM',
      actualEndTime: '11:05 AM',
      status: 'settled',
    },
    {
      id: 's2',
      date: 'May 12, 2026',
      scheduledTime: '10:00 AM - 11:00 AM',
      actualStartTime: '10:05 AM',
      actualEndTime: '11:00 AM',
      status: 'completed',
    },
    { id: 's3', date: 'May 15, 2026', scheduledTime: '10:00 AM - 11:00 AM', status: 'cancelled' },
    { id: 's4', date: 'May 18, 2026', scheduledTime: '10:00 AM - 11:00 AM', status: 'confirmed' },
    { id: 's5', date: 'May 21, 2026', scheduledTime: '10:00 AM - 11:00 AM', status: 'pending' },
  ],
  documents: [
    {
      id: 'doc1',
      title: 'Initial Physical Assessment',
      type: 'Assessment Report',
      date: 'May 10, 2026',
    },
    { id: 'doc2', title: 'Pain Management Plan', type: 'Prescription', date: 'May 12, 2026' },
  ],
};

export const usePatientBookingFlow = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const { data: sessionRes, refetch } = useTreatmentSession(id);
  const liveSession = sessionRes?.data;

  // Build merged data using live session or fallback mock
  const data: BookingDetails = {
    bookingId: liveSession?.id || id || MOCK_DATA.bookingId,
    overallStatus:
      liveSession?.status === 'completed'
        ? 'COMPLETED'
        : liveSession?.status === 'cancelled'
        ? 'CANCELLED'
        : MOCK_DATA.overallStatus,
    therapist: liveSession?.treatmentPlan?.therapist
      ? {
          id: liveSession.treatmentPlan.therapist.id,
          name: liveSession.treatmentPlan.therapist.user?.name || 'Dr. Physical Therapist',
          image: liveSession.treatmentPlan.therapist.user?.image || MOCK_DATA.therapist.image,
          gender: 'FEMALE',
          mode: 'home_visit',
        }
      : MOCK_DATA.therapist,
    patient: liveSession?.treatmentPlan?.patient
      ? {
          name: liveSession.treatmentPlan.patient.user?.name || 'Patient',
          dob: '1990-01-01',
          gender: 'MALE',
          phone: '+91 9876543210',
        }
      : MOCK_DATA.patient,
    condition: { title: liveSession?.condition || MOCK_DATA.condition.title },
    problemDescription: liveSession?.DescribedAs || MOCK_DATA.problemDescription,
    location: MOCK_DATA.location,
    sessions: liveSession
      ? [
          {
            id: liveSession.id,
            date: new Date(liveSession.date || liveSession.startAt || Date.now()).toLocaleDateString('en-US', {
              month: 'short',
              day: '2-digit',
              year: 'numeric',
            }),
            scheduledTime: `${liveSession.startHour || 10}:00 AM - ${(liveSession.startHour || 10) + 1}:00 AM`,
            actualStartTime: liveSession.actualStartTime
              ? new Date(liveSession.actualStartTime).toLocaleTimeString()
              : undefined,
            actualEndTime: liveSession.actualEndTime
              ? new Date(liveSession.actualEndTime).toLocaleTimeString()
              : undefined,
            status: (liveSession.status || 'pending') as SessionStatus,
          },
        ]
      : MOCK_DATA.sessions,
    documents: liveSession?.treatmentPlan?.docRecords
      ? liveSession.treatmentPlan.docRecords.map((d: any) => ({
          id: d.id,
          title: d.name,
          type: d.fileType || 'Medical Report',
          date: new Date(d.createdAt).toLocaleDateString(),
        }))
      : MOCK_DATA.documents,
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
    } catch (err: any) {
      alert(err?.response?.data?.message || err?.message || 'Failed to cancel session');
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
    } catch (err: any) {
      alert(err?.response?.data?.message || err?.message || 'Failed to book follow-up session');
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
