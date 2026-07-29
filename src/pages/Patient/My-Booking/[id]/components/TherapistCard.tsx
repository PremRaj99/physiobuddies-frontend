import { Building2, Home, Stethoscope, Video } from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import type { Therapist, TreatmentMode } from '../hooks/usePatientBookingFlow';

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
      return 'Clinic Visit';
  }
};

interface TherapistCardProps {
  therapist: Therapist;
}

export const TherapistCard = ({ therapist }: TherapistCardProps) => (
  <Card className="border-border gap-0 overflow-hidden bg-white py-0 shadow-sm">
    <div className="bg-secondary/30 border-border flex items-center justify-between border-b px-6 py-4">
      <h3 className="flex items-center gap-2 font-semibold text-[#013a63]">
        <Stethoscope className="h-4 w-4 text-[#014f86]" /> Primary Therapist
      </h3>
      <Badge
        variant="outline"
        className="flex items-center gap-1.5 border-[#014f86] bg-white text-[#014f86]"
      >
        {getModeIcon(therapist.mode)}
        {getModeLabel(therapist.mode)}
      </Badge>
    </div>
    <CardContent className="p-6">
      <div className="flex items-center gap-5">
        <Avatar className="border-secondary h-20 w-20 border-2 shadow-sm">
          <AvatarImage src={therapist.image} className="object-cover" />
          <AvatarFallback className="bg-[#a9d6e5] text-xl font-bold text-[#013a63]">
            {therapist.name.replace('Dr. ', '').charAt(0)}
          </AvatarFallback>
        </Avatar>
        <div>
          <h2 className="text-2xl leading-tight font-bold text-[#012a4a]">{therapist.name}</h2>
          <div className="text-muted-foreground mt-1.5 flex items-center gap-3 text-sm">
            <span className="bg-secondary/50 rounded px-2 py-0.5 font-mono text-xs text-[#013a63]">
              ID: {therapist.id}
            </span>
            <span>•</span>
            <span className="capitalize">{therapist.gender.toLowerCase()}</span>
          </div>
        </div>
      </div>
    </CardContent>
  </Card>
);
