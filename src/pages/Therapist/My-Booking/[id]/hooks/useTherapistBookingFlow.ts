import { useState } from 'react';
import { useNavigate, useParams } from 'react-router';
import { useTherapistBookingDetail } from '@/hooks/useTherapist';
import {
  acceptBooking,
  generateSessionOtp,
  verifySessionOtp,
  completeTreatmentPlan,
} from '@/services/therapist.service';
import {
  useRescheduleSessionSlot,
  useAddSessionDocs,
  useSubmitImprovementRecord,
} from '@/hooks/useTreatmentSession';
import { toast } from 'sonner';

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

export const useTherapistBookingFlow = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  // Modal Visibility States
  const [isRescheduleOpen, setIsRescheduleOpen] = useState(false);
  const [isDocsOpen, setIsDocsOpen] = useState(false);
  const [isImprovementOpen, setIsImprovementOpen] = useState(false);
  const [isOtpOpen, setIsOtpOpen] = useState(false);
  const [isCompletePlanOpen, setIsCompletePlanOpen] = useState(false);

  // Lifecycle States
  const [isAccepting, setIsAccepting] = useState(false);
  const [otpInput, setOtpInput] = useState('');
  const [isGeneratingOtp, setIsGeneratingOtp] = useState(false);
  const [isVerifyingOtp, setIsVerifyingOtp] = useState(false);
  const [devOtpCode, setDevOtpCode] = useState<string | null>(null);
  const [otpError, setOtpError] = useState<string | null>(null);

  const [sessionActive, setSessionActive] = useState(false);

  // Complete Plan Form State
  const [beforeImg, setBeforeImg] = useState('');
  const [afterImg, setAfterImg] = useState('');
  const [finalNotes, setFinalNotes] = useState('');
  const [isCompletingPlan, setIsCompletingPlan] = useState(false);

  // Treatment Session Hooks
  const rescheduleMutation = useRescheduleSessionSlot();
  const addDocsMutation = useAddSessionDocs();
  const improvementMutation = useSubmitImprovementRecord();

  // Reschedule Form State
  const [rescheduleDate, setRescheduleDate] = useState('');
  const [rescheduleHour, setRescheduleHour] = useState(10);
  const [rescheduleReason, setRescheduleReason] = useState('');
  const [activeSessionId, setActiveSessionId] = useState<string>('');

  // Docs Form State
  const [docName, setDocName] = useState('');
  const [docUrl, setDocUrl] = useState('');
  const [docFileType, setDocFileType] = useState('pdf');

  // Improvement Record State
  const [painBefore, setPainBefore] = useState(8);
  const [painAfter, setPainAfter] = useState(4);
  const [improvementNotes, setImprovementNotes] = useState('');
  const [exercisesGiven, setExercisesGiven] = useState('');

  const { data: bookingRes, isLoading, refetch } = useTherapistBookingDetail(id || '');
  const booking = bookingRes?.data;

  const handleAccept = async () => {
    if (!id) return;
    setIsAccepting(true);
    try {
      await acceptBooking(id);
      await refetch();
    } catch (err: unknown) {
      const error = err as { response?: { data?: { message?: string } }; message?: string };
      alert(error?.response?.data?.message || 'Failed to accept booking');
    } finally {
      setIsAccepting(false);
    }
  };

  const handleStartSessionOtp = async () => {
    if (!id) return;
    setIsGeneratingOtp(true);
    setOtpError(null);
    try {
      const res = await generateSessionOtp(id);
      if (res.data?.otpCode) {
        setDevOtpCode(res.data.otpCode);
      }
      setIsOtpOpen(true);
    } catch (err: unknown) {
      const error = err as { response?: { data?: { message?: string } }; message?: string };
      toast.error(error?.response?.data?.message || 'Failed to generate OTP');
    } finally {
      setIsGeneratingOtp(false);
    }
  };

  const handleVerifyOtp = async () => {
    if (!id || !otpInput) return;
    setIsVerifyingOtp(true);
    setOtpError(null);
    try {
      await verifySessionOtp(id, otpInput);
      setIsOtpOpen(false);
      setSessionActive(true);
      await refetch();
    } catch (err: unknown) {
      const error = err as { response?: { data?: { message?: string } }; message?: string };
      setOtpError(error?.response?.data?.message || error?.message || 'Invalid OTP');
    } finally {
      setIsVerifyingOtp(false);
    }
  };

  const handleEndSessionAction = (sessionId: string, sessionIndex: number = 0) => {
    setActiveSessionId(sessionId);
    if (sessionIndex === 0) {
      navigate(`/therapist/my-booking/${id}/create-assessment`);
    } else {
      setIsImprovementOpen(true);
    }
  };

  const openRescheduleModal = (sessionId: string) => {
    setActiveSessionId(sessionId);
    setIsRescheduleOpen(true);
  };

  const openAddDocsModal = (sessionId: string) => {
    setActiveSessionId(sessionId);
    setIsDocsOpen(true);
  };

  const handleRescheduleSubmit = async () => {
    if (!rescheduleDate) {
      alert('Please select a date');
      return;
    }
    try {
      await rescheduleMutation.mutateAsync({
        sessionId: activeSessionId || id || '',
        payload: {
          date: new Date(rescheduleDate).toISOString(),
          startHour: Number(rescheduleHour),
          reason: rescheduleReason,
        },
      });
      setIsRescheduleOpen(false);
      setRescheduleDate('');
      setRescheduleReason('');
      await refetch();
    } catch (err: unknown) {
      const error = err as { response?: { data?: { message?: string } }; message?: string };
      alert(error?.response?.data?.message || error?.message || 'Failed to reschedule slot');
    }
  };

  const handleAddDocsSubmit = async () => {
    if (!docName || !docUrl) {
      alert('Please enter document name and URL');
      return;
    }
    try {
      await addDocsMutation.mutateAsync({
        sessionId: activeSessionId || id || '',
        payload: {
          documents: [
            {
              name: docName,
              url: docUrl,
              fileType: docFileType,
            },
          ],
        },
      });
      setIsDocsOpen(false);
      setDocName('');
      setDocUrl('');
      await refetch();
    } catch (err: unknown) {
      const error = err as { response?: { data?: { message?: string } }; message?: string };
      alert(error?.response?.data?.message || error?.message || 'Failed to add document');
    }
  };

  const handleImprovementSubmit = async () => {
    if (!improvementNotes) {
      alert('Please enter improvement notes');
      return;
    }
    try {
      await improvementMutation.mutateAsync({
        sessionId: activeSessionId || id || '',
        payload: {
          painScoreBefore: Number(painBefore),
          painScoreAfter: Number(painAfter),
          improvementNotes,
          exercisesGiven: exercisesGiven ? exercisesGiven.split(',').map((s) => s.trim()) : [],
        },
      });
      setIsImprovementOpen(false);
      setSessionActive(false);
      await refetch();
    } catch (err: unknown) {
      const error = err as { response?: { data?: { message?: string } }; message?: string };
      alert(error?.response?.data?.message || error?.message || 'Failed to submit improvement record');
    }
  };

  const handleCompletePlanSubmit = async () => {
    if (!id) return;
    setIsCompletingPlan(true);
    try {
      await completeTreatmentPlan(id, {
        beforeTherapyImg: beforeImg,
        afterTherapyImg: afterImg,
        finalImprovement: finalNotes,
      });
      setIsCompletePlanOpen(false);
      await refetch();
    } catch (err: unknown) {
      const error = err as { response?: { data?: { message?: string } }; message?: string };
      alert(error?.response?.data?.message || 'Failed to complete treatment plan');
    } finally {
      setIsCompletingPlan(false);
    }
  };

  return {
    id,
    navigate,
    booking,
    isLoading,
    // Modals visibility
    isOtpOpen,
    setIsOtpOpen,
    isRescheduleOpen,
    setIsRescheduleOpen,
    isDocsOpen,
    setIsDocsOpen,
    isImprovementOpen,
    setIsImprovementOpen,
    isCompletePlanOpen,
    setIsCompletePlanOpen,
    // Session state
    sessionActive,
    isAccepting,
    isGeneratingOtp,
    isVerifyingOtp,
    devOtpCode,
    otpError,
    otpInput,
    setOtpInput,
    // Form states
    rescheduleDate,
    setRescheduleDate,
    rescheduleHour,
    setRescheduleHour,
    rescheduleReason,
    setRescheduleReason,
    docName,
    setDocName,
    docUrl,
    setDocUrl,
    docFileType,
    setDocFileType,
    painBefore,
    setPainBefore,
    painAfter,
    setPainAfter,
    improvementNotes,
    setImprovementNotes,
    exercisesGiven,
    setExercisesGiven,
    beforeImg,
    setBeforeImg,
    afterImg,
    setAfterImg,
    finalNotes,
    setFinalNotes,
    isCompletingPlan,
    // Handlers
    handleAccept,
    handleStartSessionOtp,
    handleVerifyOtp,
    handleEndSessionAction,
    openRescheduleModal,
    openAddDocsModal,
    handleRescheduleSubmit,
    handleAddDocsSubmit,
    handleImprovementSubmit,
    handleCompletePlanSubmit,
    // Mutations pending states
    isRescheduling: rescheduleMutation.isPending,
    isAddingDocs: addDocsMutation.isPending,
    isSubmittingImprovement: improvementMutation.isPending,
  };
};
