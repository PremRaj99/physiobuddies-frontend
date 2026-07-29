import {
  AlertCircle,
  CalendarDays,
  CheckCircle,
  CheckCircle2,
  Clock,
  Download,
  MoreVertical,
  PlayCircle,
  ShieldCheck,
  XCircle,
} from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Separator } from '@/components/ui/separator';
import type { SessionStatus, TreatmentSessionItem } from '../hooks/usePatientBookingFlow';

const getSessionStatusBadge = (status: SessionStatus) => {
  switch (status) {
    case 'pending':
      return (
        <Badge variant="outline" className="border-amber-200 bg-amber-50 text-amber-600">
          <Clock className="mr-1 h-3 w-3" /> Pending
        </Badge>
      );
    case 'confirmed':
      return (
        <Badge variant="outline" className="border-blue-200 bg-blue-50 text-blue-600">
          <CheckCircle className="mr-1 h-3 w-3" /> Confirmed
        </Badge>
      );
    case 'active':
      return (
        <Badge variant="outline" className="border-emerald-200 bg-emerald-50 text-emerald-600">
          <PlayCircle className="mr-1 h-3 w-3" /> Active
        </Badge>
      );
    case 'completed':
      return (
        <Badge variant="default" className="bg-success hover:bg-success text-white">
          <CheckCircle2 className="mr-1 h-3 w-3" /> Completed
        </Badge>
      );
    case 'settled':
      return (
        <Badge variant="outline" className="border-purple-200 bg-purple-50 text-purple-600">
          <ShieldCheck className="mr-1 h-3 w-3" /> Settled
        </Badge>
      );
    case 'cancelled':
      return (
        <Badge
          variant="outline"
          className="bg-destructive/10 text-destructive border-destructive/20"
        >
          <XCircle className="mr-1 h-3 w-3" /> Cancelled
        </Badge>
      );
    case 'no_show':
      return (
        <Badge variant="secondary" className="text-muted-foreground">
          <AlertCircle className="mr-1 h-3 w-3" /> No Show
        </Badge>
      );
  }
};

interface TreatmentSessionsListProps {
  sessions: TreatmentSessionItem[];
  onCancelRequest: (sessionId: string) => void;
}

export const TreatmentSessionsList = ({
  sessions,
  onCancelRequest,
}: TreatmentSessionsListProps) => {
  return (
    <Card className="border-border gap-0 py-0 shadow-sm">
      <CardHeader className="border-border rounded-t-xl border-b bg-white py-4">
        <div className="flex items-center justify-between">
          <div>
            <CardTitle className="flex items-center gap-2 text-xl text-[#012a4a]">
              <CalendarDays className="h-5 w-5 text-[#014f86]" /> Treatment Sessions
            </CardTitle>
            <CardDescription>
              Track the schedule and status of individual therapy sessions.
            </CardDescription>
          </div>
          <Badge variant="secondary" className="bg-secondary text-[#013a63]">
            {sessions.length} Total
          </Badge>
        </div>
      </CardHeader>
      <CardContent className="p-0">
        <div className="divide-border/60 divide-y">
          {sessions.map((session, idx) => (
            <div
              key={session.id}
              className="group flex flex-col justify-between gap-4 p-5 transition-colors hover:bg-gray-50/50 sm:flex-row sm:items-center"
            >
              <div className="flex items-start gap-4">
                <div className="bg-secondary/30 mt-0.5 flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-[#a9d6e5]/50 text-sm font-bold text-[#014f86]">
                  {idx + 1}
                </div>
                <div>
                  <p className="text-base font-bold text-[#012a4a]">{session.date}</p>
                  <div className="text-muted-foreground mt-1 flex items-center gap-1.5 text-sm">
                    <Clock className="h-3.5 w-3.5" /> Scheduled: {session.scheduledTime}
                  </div>

                  {/* Conditionally render Actual Times if completed/settled */}
                  {(session.status === 'completed' || session.status === 'settled') &&
                    session.actualStartTime &&
                    session.actualEndTime && (
                      <div className="text-success bg-success/10 mt-1.5 flex w-fit items-center gap-1.5 rounded px-2 py-0.5 text-xs font-medium">
                        <CheckCircle2 className="h-3.5 w-3.5" />
                        Actual: {session.actualStartTime} - {session.actualEndTime}
                      </div>
                    )}
                </div>
              </div>

              <div className="flex w-full items-center justify-between gap-4 pl-14 sm:w-auto sm:justify-end sm:pl-0">
                {getSessionStatusBadge(session.status)}

                {/* Triple Dot Actions Menu */}
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="text-muted-foreground hover:bg-secondary/50 hover:text-[#012a4a]"
                    >
                      <MoreVertical className="h-4 w-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end" className="w-48">
                    <DropdownMenuItem className="cursor-pointer text-[#012a4a]">
                      <Download className="mr-2 h-4 w-4" /> Download Bill
                    </DropdownMenuItem>
                    {/* Only allow cancellation on future/pending sessions */}
                    {(session.status === 'pending' || session.status === 'confirmed') && (
                      <>
                        <Separator className="my-1" />
                        <DropdownMenuItem
                          onClick={() => onCancelRequest(session.id)}
                          className="text-destructive focus:text-destructive focus:bg-destructive/10 cursor-pointer"
                        >
                          <XCircle className="mr-2 h-4 w-4" /> Request Cancel
                        </DropdownMenuItem>
                      </>
                    )}
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};
