import React from 'react';
import { BookingCard, type TreatmentMode, type TreatmentStatus } from '@/components/my-booking';
import { Badge } from '@/components/ui/badge';

interface TherapistBookingCardProps {
  booking: {
    id: string;
    patientName: string;
    patientID?: string | null;
    patientGender: string;
    patientAge?: number | null;
    treatmentMode: TreatmentMode;
    status: TreatmentStatus;
    lastSessionDate: string;
    lastSessionTime: string;
  };
  onNavigate: (id: string) => void;
}

export const TherapistBookingCard: React.FC<TherapistBookingCardProps> = ({
  booking,
  onNavigate,
}) => {
  const subtitleInfo = (
    <>
      {booking.patientID && (
        <Badge className="mr-1 rounded-md" variant="outline">
          {booking.patientID}
        </Badge>
      )}
      • {booking.patientGender?.toLowerCase()} • {booking.patientAge && `${booking.patientAge} yrs`}
    </>
  );

  return (
    <BookingCard
      booking={{
        id: booking.id,
        title: booking.patientName,
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
