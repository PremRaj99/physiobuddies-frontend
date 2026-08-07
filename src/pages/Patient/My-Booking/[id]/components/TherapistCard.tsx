import { Star, Stethoscope, UserCheck } from 'lucide-react';
import { BookingModeBadge } from '@/components/my-booking';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import type { Therapist } from '../hooks/usePatientBookingFlow';

interface TherapistCardProps {
  therapist: Therapist;
}

export const TherapistCard = ({ therapist }: TherapistCardProps) => (
  <Card className="border-border gap-0 overflow-hidden bg-white py-0 shadow-sm">
    <div className="bg-secondary/30 border-border flex items-center justify-between border-b px-6 py-4">
      <h3 className="flex items-center gap-2 font-semibold text-[#013a63]">
        <Stethoscope className="h-4 w-4 text-[#014f86]" /> Primary Therapist
      </h3>
      <BookingModeBadge mode={therapist.mode} className="border-[#014f86] text-[#014f86]" />
    </div>
    <CardContent className="p-6">
      <div className="flex items-center gap-5">
        <Avatar className="border-secondary h-20 w-20 shrink-0 border-2 shadow-sm">
          <AvatarImage src={therapist.image} className="object-cover" />
          <AvatarFallback className="bg-[#a9d6e5] text-xl font-bold text-[#013a63]">
            {therapist.name ? therapist.name.replace('Dr. ', '').charAt(0) : 'T'}
          </AvatarFallback>
        </Avatar>
        <div className="min-w-0 space-y-1.5">
          <h2 className="truncate text-2xl leading-tight font-bold text-[#012a4a]">
            {therapist.name}
          </h2>
          <div className="flex flex-wrap items-center gap-2 text-sm">
            {(therapist.therapistId || therapist.id) && (
              <Badge
                variant="outline"
                className="border-slate-300 bg-slate-100/80 font-mono text-xs text-slate-700"
              >
                {therapist.therapistId || therapist.id}
              </Badge>
            )}

            <Badge
              variant="secondary"
              className="border border-[#a9d6e5]/50 bg-[#eef6f9] text-xs font-medium text-[#014f86]"
            >
              <UserCheck className="mr-1 inline h-3 w-3" />
              <span className="capitalize">
                {therapist.gender ? therapist.gender.toLowerCase() : 'Therapist'}
              </span>
            </Badge>

            {therapist.rating && (
              <Badge
                variant="secondary"
                className="flex items-center gap-1 border border-amber-200 bg-amber-50 text-xs font-semibold text-amber-800"
              >
                <Star className="h-3.5 w-3.5 fill-amber-400 text-amber-400" />
                <span>{therapist.rating.toFixed(1)} / 5.0 Rating</span>
              </Badge>
            )}
          </div>
        </div>
      </div>
    </CardContent>
  </Card>
);
