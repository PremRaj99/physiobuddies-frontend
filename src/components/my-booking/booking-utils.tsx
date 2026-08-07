import React from 'react';
import { format, isValid, parseISO } from 'date-fns';
import {
  AlertCircle,
  Building2,
  CheckCircle,
  CheckCircle2,
  Clock,
  Home,
  PlayCircle,
  ShieldCheck,
  Video,
  XCircle,
} from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import type { TreatmentMode, TreatmentStatus } from './types';

export const formatBookingDate = (dateInput?: string | Date | null): string => {
  if (!dateInput) return '';
  if (dateInput instanceof Date) {
    return isValid(dateInput) ? format(dateInput, 'MMM dd, yyyy') : '';
  }

  const str = String(dateInput).trim();
  if (!str) return '';

  // If pure YYYY-MM-DD format, construct local date to avoid timezone shift
  if (/^\d{4}-\d{2}-\d{2}$/.test(str)) {
    const [year, month, day] = str.split('-').map(Number);
    const dateObj = new Date(year, month - 1, day);
    if (isValid(dateObj)) {
      return format(dateObj, 'MMM dd, yyyy');
    }
  }

  try {
    const parsedISO = parseISO(str);
    if (isValid(parsedISO)) {
      return format(parsedISO, 'MMM dd, yyyy');
    }
    const d = new Date(str);
    if (isValid(d)) {
      return format(d, 'MMM dd, yyyy');
    }
  } catch {
    // Fallback to original string if unparseable
  }

  return str;
};

export const getStatusColor = (status: TreatmentStatus): string => {
  switch (status) {
    case 'UPCOMING':
      return 'bg-[#014f86] text-white hover:bg-[#013a63]';
    case 'COMPLETED':
      return 'bg-success text-white hover:bg-emerald-600';
    case 'PENDING':
      return 'bg-amber-500 text-white hover:bg-amber-600';
    case 'CANCELLED':
      return 'bg-muted text-muted-foreground hover:bg-muted';
    default:
      return 'bg-secondary text-secondary-foreground';
  }
};

export const getModeIcon = (mode: TreatmentMode): React.ReactElement => {
  switch (mode) {
    case 'home_visit':
      return <Home className="h-4 w-4" />;
    case 'online':
      return <Video className="h-4 w-4" />;
    case 'clinic':
      return <Building2 className="h-4 w-4" />;
  }
};

export const getModeLabel = (mode: TreatmentMode): string => {
  switch (mode) {
    case 'home_visit':
      return 'Home Visit';
    case 'online':
      return 'Online';
    case 'clinic':
      return 'Clinic';
  }
};

interface BookingStatusBadgeProps {
  status: TreatmentStatus;
  className?: string;
}

export const BookingStatusBadge: React.FC<BookingStatusBadgeProps> = ({
  status,
  className = '',
}) => (
  <Badge
    className={`${getStatusColor(status)} border-transparent px-3 py-1 font-semibold ${className}`}
  >
    {status}
  </Badge>
);

interface BookingModeBadgeProps {
  mode: TreatmentMode;
  className?: string;
}

export const BookingModeBadge: React.FC<BookingModeBadgeProps> = ({ mode, className = '' }) => (
  <Badge
    variant="outline"
    className={`border-border flex items-center gap-1.5 bg-white text-[#013a63] shadow-sm ${className}`}
  >
    {getModeIcon(mode)}
    {getModeLabel(mode)}
  </Badge>
);

interface SessionStatusBadgeProps {
  status?: string;
  className?: string;
}

export const SessionStatusBadge: React.FC<SessionStatusBadgeProps> = ({
  status,
  className = '',
}) => {
  if (!status) {
    return (
      <Badge
        variant="outline"
        className={`border-blue-200 bg-blue-50 px-2.5 py-0.5 text-xs font-bold text-[#014f86] ${className}`}
      >
        Upcoming
      </Badge>
    );
  }

  const rawStatus = String(status).toUpperCase().trim();
  const label = rawStatus.replace(/_/g, ' ');

  if (rawStatus.includes('NO_SHOW') || rawStatus.includes('NO SHOW')) {
    return (
      <Badge
        variant="outline"
        className={`border-rose-200 bg-rose-50 px-2.5 py-0.5 text-xs font-bold tracking-wider text-rose-700 uppercase ${className}`}
      >
        <AlertCircle className="mr-1 inline h-3 w-3 text-rose-600" /> No Show
      </Badge>
    );
  }
  if (rawStatus.includes('COMPLETED')) {
    return (
      <Badge
        variant="outline"
        className={`border-emerald-200 bg-emerald-50 px-2.5 py-0.5 text-xs font-bold tracking-wider text-emerald-700 uppercase ${className}`}
      >
        <CheckCircle2 className="mr-1 inline h-3 w-3 text-emerald-600" /> Completed
      </Badge>
    );
  }
  if (rawStatus.includes('CANCEL')) {
    return (
      <Badge
        variant="outline"
        className={`border-slate-200 bg-slate-100 px-2.5 py-0.5 text-xs font-bold tracking-wider text-slate-600 uppercase ${className}`}
      >
        <XCircle className="mr-1 inline h-3 w-3 text-slate-500" /> Cancelled
      </Badge>
    );
  }
  if (rawStatus.includes('ACTIVE') || rawStatus.includes('PROGRESS')) {
    return (
      <Badge
        variant="outline"
        className={`border-amber-200 bg-amber-50 px-2.5 py-0.5 text-xs font-bold tracking-wider text-amber-700 uppercase ${className}`}
      >
        <PlayCircle className="mr-1 inline h-3 w-3 animate-pulse text-amber-600" /> Active Now
      </Badge>
    );
  }
  if (rawStatus.includes('CONFIRMED')) {
    return (
      <Badge
        variant="outline"
        className={`border-blue-200 bg-blue-50 px-2.5 py-0.5 text-xs font-bold tracking-wider text-blue-700 uppercase ${className}`}
      >
        <CheckCircle className="mr-1 inline h-3 w-3 text-blue-600" /> Confirmed
      </Badge>
    );
  }
  if (rawStatus.includes('SETTLED')) {
    return (
      <Badge
        variant="outline"
        className={`border-purple-200 bg-purple-50 px-2.5 py-0.5 text-xs font-bold tracking-wider text-purple-700 uppercase ${className}`}
      >
        <ShieldCheck className="mr-1 inline h-3 w-3 text-purple-600" /> Settled
      </Badge>
    );
  }
  if (rawStatus.includes('PENDING')) {
    return (
      <Badge
        variant="outline"
        className={`border-amber-200 bg-amber-50 px-2.5 py-0.5 text-xs font-bold tracking-wider text-amber-700 uppercase ${className}`}
      >
        <Clock className="mr-1 inline h-3 w-3 text-amber-600" /> Pending
      </Badge>
    );
  }

  return (
    <Badge
      variant="outline"
      className={`border-blue-200 bg-blue-50 px-2.5 py-0.5 text-xs font-bold tracking-wider text-[#014f86] uppercase ${className}`}
    >
      {label}
    </Badge>
  );
};
