import React from 'react';
import { Badge } from '@/components/ui/badge';
import { Skeleton } from '@/components/ui/skeleton';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';

interface CommissionRecord {
  id: string;
  sessionDate: string;
  patientName: string;
  sessionAmount: number;
  platformFee: number;
  platformRateUsed: number;
  therapistAmount: number;
}

interface CommissionTableProps {
  commissions: CommissionRecord[];
  isLoading: boolean;
  formatCurrency: (n: number) => string;
  formatDate: (iso: string) => string;
}

export const CommissionTable: React.FC<CommissionTableProps> = ({
  commissions,
  isLoading,
  formatCurrency,
  formatDate,
}) => {
  if (isLoading) {
    return (
      <div className="space-y-3 p-6">
        <Skeleton className="h-10 w-full" />
        <Skeleton className="h-10 w-full" />
        <Skeleton className="h-10 w-full" />
      </div>
    );
  }

  return (
    <div className="overflow-x-auto">
      <Table>
        <TableHeader className="bg-gray-50/50">
          <TableRow className="hover:bg-transparent">
            <TableHead className="font-bold text-[#013a63]">Date & ID</TableHead>
            <TableHead className="font-bold text-[#013a63]">Patient</TableHead>
            <TableHead className="text-right font-bold text-[#013a63]">Gross Amount</TableHead>
            <TableHead className="text-right font-bold text-[#013a63]">Commission</TableHead>
            <TableHead className="text-right font-bold text-[#013a63]">Net Earnings</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {commissions.map((c) => (
            <TableRow
              key={c.id}
              className="hover:bg-secondary/10 border-border/60 transition-colors"
            >
              <TableCell className="py-4">
                <p className="font-semibold whitespace-nowrap text-[#012a4a]">
                  {formatDate(c.sessionDate)}
                </p>
                <p className="text-muted-foreground mt-0.5 font-mono text-xs">{c.id}</p>
              </TableCell>
              <TableCell>
                <p className="font-semibold text-[#012a4a]">{c.patientName}</p>
                <Badge
                  variant="outline"
                  className="mt-1 border-[#014f86]/30 bg-white text-[10px] text-[#014f86]"
                >
                  {c.platformRateUsed}% rate
                </Badge>
              </TableCell>
              <TableCell className="text-right font-medium text-[#012a4a]">
                {formatCurrency(c.sessionAmount)}
              </TableCell>
              <TableCell className="text-right font-medium text-[#014f86]">
                -{formatCurrency(c.platformFee)}
              </TableCell>
              <TableCell className="text-success text-right font-bold">
                {formatCurrency(c.therapistAmount)}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};
