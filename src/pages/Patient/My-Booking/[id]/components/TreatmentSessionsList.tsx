import { CalendarDays, Clock, Download, MoreVertical, XCircle } from 'lucide-react';
import { formatBookingDate, SessionStatusBadge } from '@/components/my-booking';
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
import type { TreatmentSessionItem } from '../hooks/usePatientBookingFlow';

interface TreatmentSessionsListProps {
  sessions: TreatmentSessionItem[];
  onCancelRequest: (sessionId: string) => void;
  onBookMoreRequest?: () => void;
  hasFollowUpSlots?: boolean;
  isLoadingFollowUpSlots?: boolean;
  followUpSlotCount?: number;
  suggestedTreatmentDaysLeft: number;
}

export const TreatmentSessionsList = ({
  sessions,
  onCancelRequest,
  onBookMoreRequest,
  suggestedTreatmentDaysLeft,
  hasFollowUpSlots = false,
  isLoadingFollowUpSlots = false,
}: TreatmentSessionsListProps) => {
  return (
    <Card className="border-border shadow-sm">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-4">
        <div>
          <CardTitle className="flex items-center gap-2 text-[#012a4a]">
            <CalendarDays className="h-5 w-5 text-[#014f86]" /> Treatment Sessions
          </CardTitle>
          <CardDescription>
            View and manage your scheduled sessions for this treatment plan.
          </CardDescription>
        </div>
        <div className="flex items-center gap-3">
          <Badge variant="secondary" className="bg-[#a9d6e5]/30 text-[#013a63]">
            {sessions.length} Sessions Total
          </Badge>

          {suggestedTreatmentDaysLeft > 0 && (
            <Button
              onClick={onBookMoreRequest}
              disabled={!isLoadingFollowUpSlots && !hasFollowUpSlots}
              className="bg-[#014f86] font-bold text-white hover:bg-[#013a63] disabled:bg-slate-300 disabled:text-slate-600"
            >
              {`+ ${suggestedTreatmentDaysLeft} Sessions Left`}
            </Button>
          )}
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {sessions.map((session, idx) => (
            <div
              key={session.id}
              className="border-border/60 hover:border-border flex flex-col justify-between gap-4 rounded-xl border bg-white p-4 transition-colors sm:flex-row sm:items-center"
            >
              <div className="flex items-start gap-4">
                <div className="bg-secondary/30 flex h-10 w-10 shrink-0 items-center justify-center rounded-full font-bold text-[#014f86]">
                  {idx + 1}
                </div>
                <div>
                  <h4 className="font-bold text-[#012a4a]">{formatBookingDate(session.date)}</h4>
                  <div className="text-muted-foreground mt-1 flex items-center gap-2 text-sm">
                    <Clock className="h-3.5 w-3.5" />
                    <span>{session.scheduledTime}</span>
                  </div>
                  {session.actualStartTime && session.actualEndTime && (
                    <div className="mt-1.5 text-xs font-medium text-emerald-600">
                      Actual: {session.actualStartTime} - {session.actualEndTime}
                    </div>
                  )}
                </div>
              </div>

              <div className="flex w-full items-center justify-between gap-4 pl-14 sm:w-auto sm:justify-end sm:pl-0">
                <SessionStatusBadge status={session.status} />

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
