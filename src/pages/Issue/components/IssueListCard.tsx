import React from 'react';
import { motion } from 'framer-motion';
import {
  AlertCircle,
  CheckCircle2,
  ChevronRight,
  Clock,
  MessageSquareWarning,
  XCircle,
} from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';
import type { Complaint } from '@/services/complaint.service';
import { formatListDate } from '../hooks/useIssue';

interface IssueListCardProps {
  complaints: Complaint[];
  isLoading: boolean;
  onSelect: (complaint: Complaint) => void;
}

const getStatusBadge = (status: string) => {
  switch (status) {
    case 'resolved':
      return (
        <Badge className="flex items-center gap-1 border-emerald-200 bg-emerald-50 font-semibold text-emerald-700">
          <CheckCircle2 className="h-3 w-3" /> Resolved
        </Badge>
      );
    case 'processing':
      return (
        <Badge className="flex items-center gap-1 border-amber-200 bg-amber-50 font-semibold text-amber-700">
          <Clock className="h-3 w-3" /> In Progress
        </Badge>
      );
    case 'rejected':
      return (
        <Badge className="flex items-center gap-1 border-rose-200 bg-rose-50 font-semibold text-rose-700">
          <XCircle className="h-3 w-3" /> Rejected
        </Badge>
      );
    default:
      return (
        <Badge className="flex items-center gap-1 border-slate-200 bg-slate-100 font-semibold text-slate-700">
          <AlertCircle className="h-3 w-3" /> Pending Review
        </Badge>
      );
  }
};

export const IssueListCard: React.FC<IssueListCardProps> = ({
  complaints,
  isLoading,
  onSelect,
}) => {
  if (isLoading) {
    return (
      <div className="space-y-4">
        {[1, 2, 3].map((i) => (
          <Skeleton key={i} className="h-24 w-full rounded-2xl" />
        ))}
      </div>
    );
  }

  if (complaints.length === 0) {
    return (
      <Card className="border-border bg-white p-12 text-center shadow-sm">
        <MessageSquareWarning className="mx-auto mb-3 h-12 w-12 text-slate-300" />
        <h3 className="text-lg font-bold text-[#012a4a]">No Support Requests Found</h3>
        <p className="mt-1 text-sm text-slate-500">
          You haven't raised any issues yet. Click "Raise New Issue" above if you need assistance.
        </p>
      </Card>
    );
  }

  return (
    <div className="space-y-4">
      {complaints.map((c) => (
        <motion.div key={c.id} whileHover={{ y: -2 }} transition={{ duration: 0.2 }}>
          <Card
            onClick={() => onSelect(c)}
            className="border-border group cursor-pointer bg-white py-0 shadow-sm transition-all hover:border-[#014f86] hover:shadow-md"
          >
            <CardContent className="flex items-center justify-between p-5">
              <div className="flex flex-col gap-1.5">
                <div className="flex items-center gap-3">
                  <span className="text-base font-bold text-[#012a4a] uppercase transition-colors group-hover:text-[#014f86]">
                    {c.type}
                  </span>
                  {getStatusBadge(c.status)}
                </div>
                <p className="line-clamp-1 max-w-xl text-xs text-slate-600">{c.description}</p>
                <div className="flex items-center gap-4 text-[11px] font-medium text-slate-400">
                  <span>Logged: {formatListDate(c.createdAt)}</span>
                  <span>•</span>
                  <span>{(c.reply || []).length} messages</span>
                </div>
              </div>
              <ChevronRight className="h-5 w-5 text-slate-400 transition-transform group-hover:translate-x-1 group-hover:text-[#014f86]" />
            </CardContent>
          </Card>
        </motion.div>
      ))}
    </div>
  );
};
