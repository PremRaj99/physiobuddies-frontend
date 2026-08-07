import { Activity, Calendar, MessageSquare, Phone, User, UserCheck } from 'lucide-react';
import { BookingModeBadge, type TreatmentMode } from '@/components/my-booking';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import type { Gender } from '../hooks/useTherapistBookingFlow';

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
  <Card className="border-border mb-8 gap-0 overflow-hidden bg-white py-0 shadow-sm">
    <div className="bg-secondary/30 border-border flex items-center justify-between border-b px-6 py-4">
      <h3 className="flex items-center gap-2 font-semibold text-[#013a63]">
        <User className="h-4 w-4 text-[#014f86]" /> Patient Context
      </h3>
      <BookingModeBadge mode={mode} className="border-[#014f86] text-[#014f86]" />
    </div>

    <CardContent className="p-6">
      <div className="flex flex-col gap-5 md:flex-row md:items-center md:justify-between">
        <div className="flex min-w-0 items-center gap-5">
          <Avatar className="border-secondary h-20 w-20 shrink-0 border-2 shadow-sm">
            <AvatarImage src={patient.image} className="object-cover" />
            <AvatarFallback className="bg-[#a9d6e5] text-xl font-bold text-[#013a63]">
              {patient.name ? patient.name.charAt(0) : 'P'}
            </AvatarFallback>
          </Avatar>

          <div className="min-w-0 space-y-2">
            <h2 className="truncate text-2xl leading-tight font-bold text-[#012a4a]">
              {patient.name}
            </h2>

            <div className="flex flex-wrap items-center gap-2 text-sm">
              {patient.id && (
                <Badge
                  variant="outline"
                  className="border-slate-300 bg-slate-100/80 font-mono text-xs text-slate-700"
                >
                  ID: {patient.id}
                </Badge>
              )}

              <Badge
                variant="secondary"
                className="border border-[#a9d6e5]/50 bg-[#eef6f9] text-xs font-medium text-[#014f86]"
              >
                <UserCheck className="mr-1 inline h-3 w-3" />
                <span className="capitalize">
                  {patient.gender ? patient.gender.toLowerCase() : 'Patient'}
                </span>
              </Badge>

              {patient.dob && (
                <Badge
                  variant="secondary"
                  className="border border-slate-200 bg-slate-50 text-xs font-medium text-slate-700"
                >
                  <Calendar className="mr-1 inline h-3 w-3 text-slate-500" />
                  <span>DOB: {patient.dob}</span>
                </Badge>
              )}
            </div>
          </div>
        </div>

        <div className="flex shrink-0 items-center gap-2.5 self-start md:self-center">
          <Button
            variant="outline"
            size="sm"
            className="h-9 border-[#014f86] text-[#014f86] hover:bg-[#014f86]/10"
          >
            <MessageSquare className="mr-1.5 h-4 w-4" /> Chat
          </Button>
          <Button size="sm" className="h-9 bg-[#014f86] text-white hover:bg-[#013a63]">
            <Phone className="mr-1.5 h-4 w-4" /> Call Patient
          </Button>
        </div>
      </div>

      {(condition || problemDescription) && (
        <>
          <Separator className="my-5" />
          <div>
            <p className="text-muted-foreground mb-3 flex items-center gap-1.5 text-xs font-bold tracking-wider uppercase">
              <Activity className="h-4 w-4 text-[#014f86]" /> Primary Condition & Medical Notes
            </p>
            <div className="flex flex-col gap-3">
              {condition && (
                <Badge className="shrink-0 border-none bg-[#a9d6e5]/30 px-3.5 py-1.5 text-xs font-semibold text-[#013a63] hover:bg-[#a9d6e5]/40">
                  {condition.title}
                </Badge>
              )}
              {problemDescription && (
                <div className="border-border relative flex-1 rounded-lg border bg-gray-50/80 p-3.5">
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
