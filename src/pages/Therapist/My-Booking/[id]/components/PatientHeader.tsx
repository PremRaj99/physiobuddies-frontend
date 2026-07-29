import { Activity, Building2, Home, MessageSquare, Phone, User, Video } from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import type { TreatmentMode, Gender } from '../hooks/useTherapistBookingFlow';

interface PatientHeaderProps {
  patient: {
    id: string;
    name: string;
    dob: string;
    gender: Gender;
    phone: string;
    image?: string;
  };
  mode: TreatmentMode;
  condition?: { title: string };
  problemDescription?: string;
}

export const PatientHeader = ({
  patient,
  mode,
  condition,
  problemDescription,
}: PatientHeaderProps) => (
  <Card className="border-border mb-8 overflow-hidden bg-white py-0 shadow-sm">
    <div className="bg-secondary/30 border-border flex items-center justify-between border-b px-6 py-6">
      <h3 className="flex items-center gap-2 font-semibold text-[#013a63]">
        <User className="h-4 w-4 text-[#014f86]" /> Patient Context
      </h3>
      <Badge
        variant="outline"
        className="flex items-center gap-1.5 border-[#014f86] bg-white text-[10px] font-bold tracking-wider text-[#014f86] uppercase"
      >
        {mode === 'home_visit' ? (
          <Home className="h-3 w-3" />
        ) : mode === 'online' ? (
          <Video className="h-3 w-3" />
        ) : (
          <Building2 className="h-3 w-3" />
        )}
        {mode.replace('_', ' ')}
      </Badge>
    </div>
    <CardContent className="p-6 pt-0">
      <div className="flex flex-col gap-6 md:flex-row md:items-center">
        <Avatar className="border-secondary h-20 w-20 border-2 shadow-sm">
          <AvatarImage src={patient.image} className="object-cover" />
          <AvatarFallback className="bg-[#a9d6e5] text-xl font-bold text-[#013a63]">
            {patient.name.charAt(0)}
          </AvatarFallback>
        </Avatar>
        <div className="flex-1">
          <div className="flex flex-col justify-between gap-2 md:flex-row md:items-center">
            <h2 className="text-2xl font-bold text-[#012a4a]">{patient.name}</h2>
            <div className="flex items-center gap-3">
              <Button variant="outline" size="sm" className="h-8 border-[#014f86] text-[#014f86]">
                <MessageSquare className="mr-2 h-4 w-4" /> Chat
              </Button>
              <Button size="sm" className="h-8 bg-[#014f86] text-white hover:bg-[#013a63]">
                <Phone className="mr-2 h-4 w-4" /> Call Patient
              </Button>
            </div>
          </div>
          <div className="mt-3 grid grid-cols-2 gap-4 text-sm md:grid-cols-4">
            <div>
              <p className="text-muted-foreground text-xs font-bold uppercase opacity-60">DOB</p>
              <p className="font-semibold text-[#012a4a]">{patient.dob}</p>
            </div>
            <div>
              <p className="text-muted-foreground text-xs font-bold uppercase opacity-60">Gender</p>
              <p className="font-semibold text-[#012a4a] capitalize">
                {patient.gender.toLowerCase()}
              </p>
            </div>
            <div className="col-span-2">
              <p className="text-muted-foreground text-xs font-bold uppercase opacity-60">
                Patient ID
              </p>
              <p className="font-mono font-bold text-[#014f86]">{patient.id}</p>
            </div>
          </div>
        </div>
      </div>
      {(condition || problemDescription) && (
        <>
          <Separator className="my-6" />
          <div>
            <p className="text-muted-foreground mb-3 flex items-center gap-1.5 text-xs font-bold uppercase opacity-60">
              <Activity className="h-4 w-4 text-[#014f86]" /> Primary Condition & Notes
            </p>
            <div className="flex flex-col gap-4">
              {condition && (
                <Badge className="shrink-0 border-none bg-[#a9d6e5]/30 px-4 py-2 text-sm whitespace-nowrap text-[#013a63] hover:bg-[#a9d6e5]/40">
                  {condition.title}
                </Badge>
              )}
              {problemDescription && (
                <div className="border-border relative flex-1 rounded-lg border bg-gray-50 p-4">
                  <div className="absolute top-0 left-0 h-full w-1 rounded-l-lg bg-[#014f86]" />
                  <p className="pl-2 text-sm leading-relaxed text-[#012a4a] italic">
                    "{problemDescription}"
                  </p>
                </div>
              )}
            </div>
          </div>
        </>
      )}
    </CardContent>
  </Card>
);
