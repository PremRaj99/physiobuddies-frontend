import { motion } from 'framer-motion';
import { AlertCircle, Laptop, LogOut, Smartphone } from 'lucide-react';

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';
import { useRevokeSession, useSessions } from '@/hooks/useSession';

const formatLastActive = (iso: string | null): string => {
  if (!iso) return 'Unknown';
  const diffMs = Date.now() - new Date(iso).getTime();
  const mins = Math.floor(diffMs / 60000);
  if (mins < 1) return 'Active now';
  if (mins < 60) return `${mins} minute${mins === 1 ? '' : 's'} ago`;
  const hours = Math.floor(mins / 60);
  if (hours < 24) return `${hours} hour${hours === 1 ? '' : 's'} ago`;
  const days = Math.floor(hours / 24);
  if (days < 30) return `${days} day${days === 1 ? '' : 's'} ago`;
  return new Date(iso).toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  });
};

interface ParsedAgent {
  label: string;
  isMobile: boolean;
}

const parseAgent = (agent: string): ParsedAgent => {
  const ua = agent.toLowerCase();
  const isMobile = /android|iphone|ipad|ipod|mobile/i.test(ua);

  let browser = 'Browser';
  if (/edg\//.test(ua)) browser = 'Edge';
  else if (/opr\/|opera/.test(ua)) browser = 'Opera';
  else if (/chrome/.test(ua)) browser = 'Chrome';
  else if (/safari/.test(ua)) browser = 'Safari';
  else if (/firefox/.test(ua)) browser = 'Firefox';

  let os = 'Unknown OS';
  if (/windows/.test(ua)) os = 'Windows';
  else if (/mac os|macintosh/.test(ua)) os = 'macOS';
  else if (/android/.test(ua)) os = 'Android';
  else if (/iphone|ipad|ipod/.test(ua)) os = 'iOS';
  else if (/linux/.test(ua)) os = 'Linux';

  return { label: `${os} • ${browser}`, isMobile };
};

const DeviceIcon = ({ isMobile }: { isMobile: boolean }) =>
  isMobile ? <Smartphone className="h-6 w-6" /> : <Laptop className="h-6 w-6" />;

export const DevicesTab = () => {
  const { data: sessionsRes, isLoading } = useSessions();
  const sessions = sessionsRes?.data ?? [];

  const revokeSession = useRevokeSession();

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <Card className="border-border shadow-sm">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-2xl text-[#012a4a]">
            <Smartphone className="h-6 w-6 text-[#014f86]" /> Active Devices
          </CardTitle>
          <CardDescription>Manage devices currently logged into your account.</CardDescription>
        </CardHeader>
        <CardContent className="pt-6">
          <div className="mb-6 flex gap-3 rounded-xl border border-amber-200 bg-amber-50 p-4 text-amber-800">
            <AlertCircle className="mt-0.5 h-5 w-5 shrink-0" />
            <p className="text-sm leading-relaxed">
              If you see an unfamiliar device, log it out immediately and change your password in
              the Security tab.
            </p>
          </div>

          <div className="space-y-4">
            {isLoading ? (
              [0, 1, 2].map((i) => (
                <div
                  key={i}
                  className="border-border flex items-center gap-4 rounded-xl border bg-white p-4"
                >
                  <Skeleton className="h-12 w-12 shrink-0 rounded-full" />
                  <div className="flex-1 space-y-2">
                    <Skeleton className="h-4 w-48" />
                    <Skeleton className="h-3 w-64" />
                  </div>
                </div>
              ))
            ) : sessions.length === 0 ? (
              <div className="text-muted-foreground py-8 text-center">No active devices found.</div>
            ) : (
              sessions.map((session) => {
                const { label, isMobile } = parseAgent(session.agent);
                const locationText = session.location || 'Unknown location';
                return (
                  <div
                    key={session.id}
                    className="border-border flex flex-col justify-between gap-4 rounded-xl border bg-white p-4 transition-colors hover:border-[#a9d6e5] sm:flex-row sm:items-center"
                  >
                    <div className="flex items-center gap-4">
                      <div className="bg-secondary/30 flex h-12 w-12 shrink-0 items-center justify-center rounded-full text-[#014f86]">
                        <DeviceIcon isMobile={isMobile} />
                      </div>
                      <div>
                        <h4 className="flex items-center gap-2 font-bold text-[#012a4a]">
                          {label}
                          {session.isCurrentSession && (
                            <Badge
                              variant="secondary"
                              className="bg-success/10 text-success border-success/20 text-[10px] uppercase"
                            >
                              Current Session
                            </Badge>
                          )}
                        </h4>
                        <p className="text-muted-foreground mt-0.5 text-sm">
                          IP: {session.ip || 'Unknown'} • {locationText} • Last active:{' '}
                          {formatLastActive(session.lastLoggedAt)}
                        </p>
                      </div>
                    </div>

                    {!session.isCurrentSession && (
                      <Button
                        variant="outline"
                        disabled={revokeSession.isPending}
                        className="text-destructive border-destructive/30 hover:bg-destructive/10 hover:border-destructive w-full sm:w-auto"
                        onClick={() => revokeSession.mutate(session.id)}
                      >
                        <LogOut className="mr-2 h-4 w-4" /> Log Out Device
                      </Button>
                    )}
                  </div>
                );
              })
            )}
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
};
