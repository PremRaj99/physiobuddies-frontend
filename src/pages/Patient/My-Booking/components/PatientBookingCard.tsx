import React from 'react';
import { BookingCard, type TreatmentMode, type TreatmentStatus } from '@/components/my-booking';

interface PatientBookingCardProps {
  booking: {
    id: string;
    therapistName: string;
    therapistImage?: string;
    therapistGender?: string;
    treatmentMode: TreatmentMode;
    status: TreatmentStatus;
    lastSessionDate: string;
    lastSessionTime: string;
  };
  onNavigate: (id: string) => void;
}

export const PatientBookingCard: React.FC<PatientBookingCardProps> = ({ booking, onNavigate }) => {
  const avatarFallback = booking.therapistName
    ? booking.therapistName.replace('Dr. ', '').charAt(0)
    : 'T';

  const subtitleInfo = (
    <span>
      {booking.therapistGender ? booking.therapistGender.toLowerCase() : 'male'} • Therapist
    </span>
  );

  return (
    <BookingCard
      booking={{
        id: booking.id,
        title: booking.therapistName,
        avatarUrl: booking.therapistImage,
        avatarFallback,
        subtitleInfo,
        treatmentMode: booking.treatmentMode,
        status: booking.status,
        date: booking.lastSessionDate,
        time: booking.lastSessionTime,
      }}
      onNavigate={onNavigate}
    />
  );
};
