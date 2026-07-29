import { Activity, Phone, User } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import type { Patient } from '../hooks/usePatientBookingFlow';

interface PatientInfoCardProps {
  patient: Patient;
  condition?: { title: string };
  problemDescription?: string;
}

export const PatientInfoCard = ({
  patient,
  condition,
  problemDescription,
}: PatientInfoCardProps) => (
  <Card className="border-border gap-0 bg-white pt-0 shadow-sm">
    <CardHeader className="bg-secondary/30 border-border flex items-center justify-between border-b px-6 py-4">
      <CardTitle className="flex items-center gap-2 text-lg text-[#013a63]">
        <User className="h-5 w-5" /> Patient Details
      </CardTitle>
    </CardHeader>
    <CardContent className="space-y-4 pt-6">
      <div>
        <p className="text-muted-foreground mb-1 text-sm">Full Name</p>
        <p className="font-semibold text-[#012a4a]">{patient.name}</p>
      </div>
      <div className="grid grid-cols-2 gap-4">
        <div>
          <p className="text-muted-foreground mb-1 text-sm">Date of Birth</p>
          <p className="font-semibold text-[#012a4a]">{patient.dob}</p>
        </div>
        <div>
          <p className="text-muted-foreground mb-1 text-sm">Gender</p>
          <p className="font-semibold text-[#012a4a] capitalize">{patient.gender.toLowerCase()}</p>
        </div>
      </div>
      <div>
        <p className="text-muted-foreground mb-1 text-sm">Phone Number</p>
        <div className="flex items-center gap-2 font-semibold text-[#012a4a]">
          <Phone className="h-4 w-4 text-[#014f86]" /> {patient.phone}
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
