import React from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import {
  ArrowRight,
  CheckCircle,
  Copy,
  Eye,
  EyeOff,
  History,
  Info,
  MapPin,
  Terminal,
} from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import type { ActivityRecord as ActivityLog } from '@/services/activity.service';
import { getTypeBadgeProps, parseJsonSafe } from '../hooks/useActivityPage';

interface ActivityLogTableProps {
  isLoading: boolean;
  filteredActivities: ActivityLog[];
  expandedId: string | null;
  toggleRow: (id: string) => void;
  copyToClipboard: (text: string, subject: string) => void;
}

export const ActivityLogTable: React.FC<ActivityLogTableProps> = ({
  isLoading,
  filteredActivities,
  expandedId,
  toggleRow,
  copyToClipboard,
}) => {
  return (
    <Card className="border-border overflow-hidden bg-white py-0 shadow-sm">
      <Table>
        <TableHeader className="bg-gray-50/50">
          <TableRow className="hover:bg-transparent">
            <TableHead className="w-12"></TableHead>
            <TableHead className="font-bold text-[#013a63]">Timestamp</TableHead>
            <TableHead className="font-bold text-[#013a63]">Activity & description</TableHead>
            <TableHead className="font-bold text-[#013a63]">Type</TableHead>
            <TableHead className="font-bold text-[#013a63]">Source IP</TableHead>
            <TableHead className="w-20 text-right"></TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {isLoading ? (
            [0, 1, 2, 3, 4].map((i) => (
              <TableRow key={i}>
                <TableCell colSpan={6} className="py-4">
                  <Skeleton className="h-8 w-full" />
                </TableCell>
              </TableRow>
            ))
          ) : filteredActivities.length > 0 ? (
            filteredActivities.map((act) => {
              const isExpanded = expandedId === act.id;
              const beforeData = parseJsonSafe(act.before);
              const afterData = parseJsonSafe(act.after);
              const hasDetails = beforeData || afterData;
              const badgeProps = getTypeBadgeProps(act.type);

              return (
                <React.Fragment key={act.id}>
                  <TableRow
                    onClick={() => toggleRow(act.id)}
                    className={`hover:bg-secondary/10 border-border cursor-pointer transition-colors ${
                      isExpanded ? 'bg-secondary/5' : ''
                    }`}
                  >
                    <TableCell className="text-center font-medium">
                      {hasDetails ? (
                        isExpanded ? (
                          <EyeOff className="text-muted-foreground h-4 w-4" />
                        ) : (
                          <Eye className="h-4 w-4 text-[#014f86]" />
                        )
                      ) : (
                        <Info className="text-muted-foreground/30 h-4 w-4" />
                      )}
                    </TableCell>
                    <TableCell className="text-xs font-semibold whitespace-nowrap text-[#012a4a]">
                      {new Date(act.createdAt).toLocaleDateString('en-US', {
                        month: 'short',
                        day: 'numeric',
                        year: 'numeric',
                      })}{' '}
                      <span className="text-muted-foreground ml-1">
                        {new Date(act.createdAt).toLocaleTimeString('en-US', {
                          hour: '2-digit',
                          minute: '2-digit',
                          second: '2-digit',
                        })}
                      </span>
                    </TableCell>
                    <TableCell>
                      <div className="text-sm font-semibold text-[#012a4a]">{act.title}</div>
                      <div className="text-muted-foreground mt-0.5 max-w-lg truncate text-xs">
                        {act.data}
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge variant="outline" className={`text-[10px] ${badgeProps.style}`}>
                        {badgeProps.label}
                      </Badge>
                    </TableCell>
                    <TableCell className="font-mono text-xs font-medium text-[#013a63]">
                      {act.ip}
                    </TableCell>
                    <TableCell className="text-right">
                      <Button
                        size="sm"
                        variant="ghost"
                        onClick={(e) => {
                          e.stopPropagation();
                          copyToClipboard(act.id, 'Log ID');
                        }}
                        className="text-muted-foreground h-8 px-2 hover:text-[#014f86]"
                      >
                        <Copy className="h-3.5 w-3.5" />
                      </Button>
                    </TableCell>
                  </TableRow>

                  {/* Expandable diff box */}
                  <AnimatePresence initial={false}>
                    {isExpanded && hasDetails && (
                      <TableRow className="hover:bg-transparent">
                        <TableCell colSpan={6} className="border-t-0 p-0">
                          <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: 'auto', opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            transition={{ duration: 0.25 }}
                            className="border-border overflow-hidden border-b bg-slate-50/50 p-6"
                          >
                            <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                              {/* Before state changes */}
                              <div>
                                <h4 className="mb-3 flex items-center gap-1.5 text-xs font-bold tracking-wider text-rose-700 uppercase">
                                  <Terminal className="h-3.5 w-3.5" /> Previous Value (Before)
                                </h4>
                                {beforeData ? (
                                  <div className="max-h-60 space-y-1 overflow-y-auto rounded-xl border border-red-100 bg-red-50/20 p-4 font-mono text-xs text-[#012a4a]">
                                    {Object.entries(beforeData).map(([key, val]) => (
                                      <div
                                        key={key}
                                        className="flex flex-col gap-1 border-b border-red-50/50 py-1 last:border-0 sm:flex-row"
                                      >
                                        <span className="font-bold text-rose-800">{key}:</span>
                                        <span className="font-medium text-red-950 sm:ml-2">
                                          {typeof val === 'object'
                                            ? JSON.stringify(val)
                                            : String(val)}
                                        </span>
                                      </div>
                                    ))}
                                  </div>
                                ) : (
                                  <div className="text-muted-foreground rounded-xl border border-dashed border-slate-200 p-4 text-center text-xs italic">
                                    No values recorded (Creation event)
                                  </div>
                                )}
                              </div>

                              {/* After state changes */}
                              <div>
                                <h4 className="mb-3 flex items-center gap-1.5 text-xs font-bold tracking-wider text-emerald-700 uppercase">
                                  <CheckCircle className="h-3.5 w-3.5" /> Updated Value (After)
                                </h4>
                                {afterData ? (
                                  <div className="max-h-60 space-y-1 overflow-y-auto rounded-xl border border-emerald-100 bg-emerald-50/20 p-4 font-mono text-xs text-[#012a4a]">
                                    {Object.entries(afterData).map(([key, val]) => {
                                      const isChanged = beforeData && beforeData[key] !== val;
                                      return (
                                        <div
                                          key={key}
                                          className={`flex flex-col gap-1 border-b border-emerald-50/50 py-1 last:border-0 sm:flex-row ${
                                            isChanged
                                              ? '-mx-2 rounded bg-emerald-100/30 px-2 font-bold'
                                              : ''
                                          }`}
                                        >
                                          <span className="font-bold text-emerald-800">{key}:</span>
                                          <span className="flex flex-wrap items-center gap-1 font-medium text-emerald-950 sm:ml-2">
                                            {typeof val === 'object'
                                              ? JSON.stringify(val)
                                              : String(val)}
                                            {isChanged && (
                                              <Badge className="ml-2 flex items-center gap-0.5 bg-emerald-600 px-1 py-0 text-[8px] font-normal text-white select-none">
                                                Modified <ArrowRight className="h-2 w-2" />
                                              </Badge>
                                            )}
                                          </span>
                                        </div>
                                      );
                                    })}
                                  </div>
                                ) : (
                                  <div className="text-muted-foreground rounded-xl border border-dashed border-slate-200 p-4 text-center text-xs italic">
                                    No values recorded (Deletion event)
                                  </div>
                                )}
                              </div>
                            </div>

                            <div className="text-muted-foreground mt-4 flex flex-wrap items-center justify-between gap-2 border-t border-slate-200/50 pt-4 text-[10px]">
                              <span>
                                Log Reference:{' '}
                                <code className="rounded bg-slate-100 px-1 py-0.5 font-mono text-slate-700">
                                  {act.id}
                                </code>
                              </span>
                              <span className="flex items-center gap-1">
                                <MapPin className="h-3 w-3" /> Activity logged from IP: {act.ip}
                              </span>
                            </div>
                          </motion.div>
                        </TableCell>
                      </TableRow>
                    )}
                  </AnimatePresence>
                </React.Fragment>
              );
            })
          ) : (
            <TableRow>
              <TableCell colSpan={6} className="py-16 text-center">
                <History className="text-muted-foreground/30 mx-auto mb-3 h-12 w-12" />
                <h3 className="text-lg font-bold text-[#012a4a]">No audit logs found</h3>
                <p className="text-muted-foreground mt-1 text-sm">
                  Try updating your search query or choosing a different filter category.
                </p>
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </Card>
  );
};
