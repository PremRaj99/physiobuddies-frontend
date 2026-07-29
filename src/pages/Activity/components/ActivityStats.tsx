import React from 'react';
import { Database, ShieldAlert, MapPin, CheckCircle } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';

interface ActivityStatsProps {
  isLoading: boolean;
  stats: {
    total: number;
    unusual: number;
    uniqueIps: number;
    recent: number;
  };
}

export const ActivityStats: React.FC<ActivityStatsProps> = ({ isLoading, stats }) => {
  return (
    <div className="mb-8 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
      <Card className="border-border py-0 shadow-sm">
        <CardContent className="flex items-center justify-between p-5">
          <div>
            <p className="text-muted-foreground mb-1 text-xs font-bold tracking-wider uppercase">
              Total Audit Logs
            </p>
            {isLoading ? (
              <Skeleton className="h-8 w-12" />
            ) : (
              <h3 className="text-2xl font-bold text-[#012a4a]">{stats.total}</h3>
            )}
          </div>
          <div className="rounded-full bg-[#014f86]/10 p-2.5 text-[#014f86]">
            <Database className="h-5 w-5" />
          </div>
        </CardContent>
      </Card>

      <Card className="border-border py-0 shadow-sm">
        <CardContent className="flex items-center justify-between p-5">
          <div>
            <p className="text-muted-foreground mb-1 text-xs font-bold tracking-wider uppercase">
              Security Alerts
            </p>
            {isLoading ? (
              <Skeleton className="h-8 w-12" />
            ) : (
              <h3 className="text-2xl font-bold text-rose-600">{stats.unusual}</h3>
            )}
          </div>
          <div className="rounded-full bg-rose-50 p-2.5 text-rose-600">
            <ShieldAlert className="h-5 w-5" />
          </div>
        </CardContent>
      </Card>

      <Card className="border-border py-0 shadow-sm">
        <CardContent className="flex items-center justify-between p-5">
          <div>
            <p className="text-muted-foreground mb-1 text-xs font-bold tracking-wider uppercase">
              Unique IP Locations
            </p>
            {isLoading ? (
              <Skeleton className="h-8 w-12" />
            ) : (
              <h3 className="text-2xl font-bold text-[#012a4a]">{stats.uniqueIps}</h3>
            )}
          </div>
          <div className="bg-secondary/40 rounded-full p-2.5 text-[#014f86]">
            <MapPin className="h-5 w-5" />
          </div>
        </CardContent>
      </Card>

      <Card className="border-border py-0 shadow-sm">
        <CardContent className="flex items-center justify-between p-5">
          <div>
            <p className="text-muted-foreground mb-1 text-xs font-bold tracking-wider uppercase">
              Recent Actions (48h)
            </p>
            {isLoading ? (
              <Skeleton className="h-8 w-12" />
            ) : (
              <h3 className="text-2xl font-bold text-[#012a4a]">{stats.recent}</h3>
            )}
          </div>
          <div className="rounded-full bg-emerald-50 p-2.5 text-emerald-600">
            <CheckCircle className="h-5 w-5" />
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
