import { CalendarClock, CalendarDays, Clock, PlayCircle } from 'lucide-react';
import { formatBookingDate, SessionStatusBadge } from '@/components/my-booking';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

interface SessionItem {
  id: string;
  date: string;
  scheduledTime: string;
  status: string;
  actualStartTime?: string;
  actualEndTime?: string;
}

interface TreatmentTimelineProps {
  overallStatus: string;
  sessions: SessionItem[];
  sessionActive: boolean;
  isAccepting: boolean;
  isGeneratingOtp: boolean;
  handleAccept: () => void;
  handleStartSessionOtp: () => void;
  handleEndSessionAction: (sessionId: string, sessionIndex?: number) => void;
  openAddDocsModal: (sessionId: string) => void;
  openRescheduleModal: (sessionId: string) => void;
}

const canStartSessionNow = (session: SessionItem, sessionActive: boolean): boolean => {
  // If therapist already has an active session, don't show Start for another
  if (sessionActive) return false;

  const rawStatus = (session.status || '').toUpperCase().trim();

  // Statuses that MUST NOT show "Start Session Now"
  const nonStartableStatuses = [
    'COMPLETED',
    'NO_SHOW',
    'NO SHOW',
    'CANCELLED',
    'EXPIRED',
    'MISSED',
    'ACTIVE',
  ];
  if (nonStartableStatuses.includes(rawStatus)) {
    return false;
  }

  // Check session date & time window
  if (!session.date) return false;
  const sessionDate = new Date(session.date);
  if (isNaN(sessionDate.getTime())) return false;

  const now = new Date();

  // Determine scheduled start time
  const startTime = new Date(sessionDate);

  if (session.scheduledTime) {
    const timeMatch = session.scheduledTime.match(/(\d{1,2}):(\d{2})\s*(AM|PM)/i);
    if (timeMatch) {
      let hours = parseInt(timeMatch[1], 10);
      const minutes = parseInt(timeMatch[2], 10);
      const ampm = timeMatch[3].toUpperCase();
      if (ampm === 'PM' && hours < 12) hours += 12;
      if (ampm === 'AM' && hours === 12) hours = 0;
      startTime.setHours(hours, minutes, 0, 0);
    }
  }

  // Start window: allow starting from 30 mins before scheduled start time up to 2 hours after scheduled start time
  const windowStart = new Date(startTime.getTime() - 30 * 60 * 1000);
  const windowEnd = new Date(startTime.getTime() + 2 * 60 * 60 * 1000);

  return now >= windowStart && now <= windowEnd;
};

export const TreatmentTimeline = ({
  overallStatus,
  sessions,
  sessionActive,
  isAccepting,
  isGeneratingOtp,
  handleAccept,
  handleStartSessionOtp,
  handleEndSessionAction,
  openRescheduleModal,
}: TreatmentTimelineProps) => {
  return (
    <Card className="border-border shadow-sm">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-4">
        <div>
          <CardTitle className="flex items-center gap-2 text-[#012a4a]">
            <CalendarDays className="h-5 w-5 text-[#014f86]" /> Treatment Timeline
          </CardTitle>
          <CardDescription>
            Track and manage scheduled sessions for this treatment plan.
          </CardDescription>
        </div>
        <Badge variant="secondary" className="bg-[#a9d6e5]/30 text-[#013a63]">
          {sessions.length} Sessions Total
        </Badge>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {sessions.map((session, idx) => {
            const isStartable = canStartSessionNow(session, sessionActive);
            const rawStatus = (session.status || '').toUpperCase().trim();
            const isActive = rawStatus === 'ACTIVE' || (idx === 0 && sessionActive);
            const nonReschedulableStatuses = [
              'COMPLETED',
              'NO_SHOW',
              'NO SHOW',
              'CANCELLED',
              'EXPIRED',
            ];
            const canReschedule = !nonReschedulableStatuses.includes(rawStatus);

            return (
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

                <div className="flex flex-wrap items-center justify-between gap-3 pl-14 sm:w-auto sm:justify-end sm:pl-0">
                  <SessionStatusBadge status={session.status} />

                  {/* Therapist Action Buttons */}
                  <div className="flex flex-wrap items-center gap-2">
                    {overallStatus === 'PENDING' && idx === 0 && (
                      <Button
                        onClick={handleAccept}
                        disabled={isAccepting}
                        size="sm"
                        className="h-9 bg-emerald-600 text-xs font-bold text-white hover:bg-emerald-700"
                      >
                        {isAccepting ? 'Accepting...' : 'Accept Session'}
                      </Button>
                    )}

                    {isStartable && (
                      <Button
                        onClick={handleStartSessionOtp}
                        disabled={isGeneratingOtp}
                        size="sm"
                        className="h-9 animate-pulse bg-emerald-600 text-xs font-bold text-white shadow-md shadow-emerald-100 hover:bg-emerald-700"
                      >
                        <PlayCircle className="mr-1.5 h-3.5 w-3.5" />
                        {isGeneratingOtp ? 'Sending OTP...' : 'Start Session Now'}
                      </Button>
                    )}

                    {isActive && (
                      <Button
                        onClick={() => handleEndSessionAction(session.id, idx)}
                        size="sm"
                        className="h-9 bg-amber-600 text-xs font-bold text-white hover:bg-amber-700"
                      >
                        <Clock className="mr-1.5 h-3.5 w-3.5" /> End Session
                      </Button>
                    )}

                    {canReschedule && (
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => openRescheduleModal(session.id)}
                        className="h-9 border-slate-200 text-xs text-[#013a63] hover:bg-slate-50"
                      >
                        <CalendarClock className="mr-1.5 h-3.5 w-3.5" /> Reschedule
                      </Button>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </CardContent>
    </Card>
  );
};
