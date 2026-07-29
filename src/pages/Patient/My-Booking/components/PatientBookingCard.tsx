import React from 'react';
import { Building2, CalendarDays, ChevronRight, Clock, Home, Video } from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import type { TreatmentMode, TreatmentStatus } from '../hooks/usePatientBookings';

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

const getStatusColor = (status: TreatmentStatus) => {
  switch (status) {
    case 'UPCOMING':
      return 'bg-[#014f86] text-white hover:bg-[#013a63]';
    case 'COMPLETED':
      return 'bg-success text-white hover:bg-emerald-600';
    case 'PENDING':
      return 'bg-amber-500 text-white hover:bg-amber-600';
    case 'CANCELLED':
      return 'bg-muted text-muted-foreground hover:bg-muted';
    default:
      return 'bg-secondary text-secondary-foreground';
  }
};

const getModeIcon = (mode: TreatmentMode) => {
  switch (mode) {
    case 'home_visit':
      return <Home className="h-4 w-4" />;
    case 'online':
      return <Video className="h-4 w-4" />;
    case 'clinic':
      return <Building2 className="h-4 w-4" />;
  }
};

const getModeLabel = (mode: TreatmentMode) => {
  switch (mode) {
    case 'home_visit':
      return 'Home Visit';
    case 'online':
      return 'Online';
    case 'clinic':
      return 'Clinic';
  }
};

export const PatientBookingCard: React.FC<PatientBookingCardProps> = ({ booking, onNavigate }) => {
  return (
    <Card
      onClick={() => onNavigate(booking.id)}
      className="border-border group cursor-pointer overflow-hidden py-0 transition-all duration-300 hover:border-[#a9d6e5] hover:shadow-md"
    >
      <CardContent className="p-0">
        <div className="flex flex-col md:flex-row">
          <div className="border-border/50 bg-secondary/10 flex items-center gap-4 border-b p-5 md:w-2/5 md:border-r md:border-b-0">
            <Avatar className="h-16 w-16 border-2 border-white shadow-sm">
              <AvatarImage src={booking.therapistImage} className="object-cover" />
              <AvatarFallback className="bg-[#a9d6e5] text-xl font-bold text-[#013a63]">
                {booking.therapistName ? booking.therapistName.replace('Dr. ', '').charAt(0) : 'T'}
              </AvatarFallback>
            </Avatar>
            <div>
              <h3 className="text-lg leading-tight font-bold text-[#012a4a] transition-colors group-hover:text-[#014f86]">
                {booking.therapistName}
              </h3>
              <p className="text-muted-foreground mt-0.5 text-sm capitalize">
                {booking.therapistGender ? booking.therapistGender.toLowerCase() : 'male'} •
                Therapist
              </p>
            </div>
          </div>

          <div className="flex flex-col justify-center space-y-3 p-5 md:w-2/5">
            <div className="flex items-center gap-3 text-[#012a4a]">
              <div className="bg-secondary/50 flex h-8 w-8 shrink-0 items-center justify-center rounded-full">
                <CalendarDays className="h-4 w-4 text-[#014f86]" />
              </div>
              <div>
                <p className="text-muted-foreground text-xs font-medium tracking-wider uppercase">
                  Date
                </p>
                <p className="font-semibold">{booking.lastSessionDate}</p>
              </div>
            </div>

            <div className="flex items-center gap-3 text-[#012a4a]">
              <div className="bg-secondary/50 flex h-8 w-8 shrink-0 items-center justify-center rounded-full">
                <Clock className="h-4 w-4 text-[#014f86]" />
              </div>
              <div>
                <p className="text-muted-foreground text-xs font-medium tracking-wider uppercase">
                  Time
                </p>
                <p className="font-semibold">{booking.lastSessionTime}</p>
              </div>
            </div>
          </div>

          <div className="border-border/50 flex flex-row items-center justify-between border-t bg-gray-50/50 p-5 md:w-1/5 md:flex-col md:items-end md:justify-center md:border-t-0">
            <div className="flex flex-col items-start gap-2 md:items-end">
              <Badge
                className={`${getStatusColor(booking.status)} border-transparent px-3 py-1 font-semibold`}
              >
                {booking.status}
              </Badge>

              <Badge
                variant="outline"
                className="border-border flex items-center gap-1.5 bg-white text-[#013a63] shadow-sm"
              >
                {getModeIcon(booking.treatmentMode)}
                {getModeLabel(booking.treatmentMode)}
              </Badge>
            </div>

            <Button
              variant="ghost"
              size="icon"
              className="mt-4 hidden text-[#014f86] group-hover:bg-[#a9d6e5]/30 md:flex"
            >
              <ChevronRight className="h-5 w-5" />
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
