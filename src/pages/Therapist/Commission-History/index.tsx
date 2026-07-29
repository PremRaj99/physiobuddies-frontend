'use client';

import { motion } from 'framer-motion';
import {
  Activity,
  CalendarDays,
  FileText,
  PieChart,
  Search,
  TrendingUp,
  Wallet,
} from 'lucide-react';
import { Bar, BarChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Skeleton } from '@/components/ui/skeleton';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog';
import type { PayoutStatus } from '@/services/wallet.service';

import { useCommissionHistory } from './hooks/useCommissionHistory';

const formatCurrency = (n: number) => `₹${n.toLocaleString('en-IN')}`;

const formatDate = (iso: string) =>
  new Date(iso).toLocaleDateString('en-IN', { day: '2-digit', month: 'short', year: 'numeric' });

const PAYOUT_STATUS_STYLE: Record<PayoutStatus, string> = {
  requested: 'bg-amber-100 text-amber-800 hover:bg-amber-100',
  processed: 'bg-success text-white hover:bg-success',
  rejected: 'bg-red-100 text-red-800 hover:bg-red-100',
};

// Custom Tooltip for Recharts
const CustomTooltip = ({
  active,
  payload,
  label,
}: {
  active?: boolean;
  payload?: { value: number; name: string; fill: string }[];
  label?: string | number;
}) => {
  if (active && payload && payload.length) {
    return (
      <div className="border-border rounded-lg border bg-white p-3 shadow-lg">
        <p className="mb-2 font-bold text-[#012a4a]">Day {label}</p>
        <div className="space-y-1 text-sm">
          <p className="font-semibold text-[#014f86]">
            Revenue: {formatCurrency(payload[0].value)}
          </p>
          <p className="font-semibold text-[#a9d6e5] drop-shadow-sm">
            Commission: {formatCurrency(payload[1].value)}
          </p>
          <div className="border-border mt-2 border-t pt-2">
            <p className="text-success font-bold">
              Net: {formatCurrency(payload[0].value - payload[1].value)}
            </p>
          </div>
        </div>
      </div>
    );
  }
  return null;
};

export default function CommissionHistoryPage() {
  const {
    isLoading,
    months,
    selectedMonth,
    setSelectedMonth,
    searchQuery,
    setSearchQuery,
    filteredCommissions,
    stats,
    chartData,
    balance,
    balanceLoading,
    payouts,
    payoutsLoading,
    payoutDialogOpen,
    setPayoutDialogOpen,
    payoutAmount,
    setPayoutAmount,
    submitPayout,
    isRequesting,
  } = useCommissionHistory();

  return (
    <div className="min-h-body bg-[#f8fbfa] pb-24 font-sans">
      <main className="mx-auto max-w-6xl px-4 pt-8 sm:px-6">
        {/* Top Actions & Header */}
        <div className="mb-8 flex flex-col items-start justify-between gap-4 md:flex-row md:items-center">
          <div>
            <h1 className="flex items-center gap-3 text-2xl font-bold text-[#012a4a]">
              <Wallet className="h-6 w-6 text-[#014f86]" /> Financial Overview
            </h1>
            <p className="mt-2 text-sm text-[#013a63]">
              Track your monthly earnings, platform commissions, and session history.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <div className="border-border flex items-center gap-3 rounded-xl border bg-white px-2 shadow-sm">
              <CalendarDays className="text-muted-foreground h-5 w-5 shrink-0" />
              <Select value={selectedMonth} onValueChange={setSelectedMonth}>
                <SelectTrigger className="mx-w-45 border-none font-semibold text-[#012a4a] shadow-none focus:ring-0">
                  <SelectValue placeholder="Select Month" />
                </SelectTrigger>
                <SelectContent>
                  {months.length === 0 ? (
                    <SelectItem value="none" disabled>
                      No data
                    </SelectItem>
                  ) : (
                    months.map((m) => (
                      <SelectItem key={m.key} value={m.key} className="font-medium text-[#012a4a]">
                        {m.label}
                      </SelectItem>
                    ))
                  )}
                </SelectContent>
              </Select>
            </div>

            <AlertDialog open={payoutDialogOpen} onOpenChange={setPayoutDialogOpen}>
              <AlertDialogTrigger asChild>
                <Button className="bg-[#014f86] text-white hover:bg-[#013a63]">
                  Request Payout
                </Button>
              </AlertDialogTrigger>
              <AlertDialogContent>
                <AlertDialogHeader>
                  <AlertDialogTitle>Request a Payout</AlertDialogTitle>
                  <AlertDialogDescription>
                    Available balance: {balanceLoading ? '…' : formatCurrency(balance)}. Enter the
                    amount to withdraw to your default payout account.
                  </AlertDialogDescription>
                </AlertDialogHeader>
                <Input
                  type="number"
                  min={1}
                  placeholder="Amount"
                  value={payoutAmount}
                  onChange={(e) => setPayoutAmount(e.target.value)}
                />
                <AlertDialogFooter>
                  <AlertDialogCancel disabled={isRequesting}>Cancel</AlertDialogCancel>
                  <Button
                    onClick={submitPayout}
                    disabled={isRequesting}
                    className="bg-[#014f86] text-white hover:bg-[#013a63]"
                  >
                    {isRequesting ? 'Requesting...' : 'Confirm Request'}
                  </Button>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
          </div>
        </div>

        {/* Summary Cards */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="mb-8 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4"
        >
          <Card className="border-border py-0 shadow-sm transition-colors hover:border-[#a9d6e5]">
            <CardContent className="p-4">
              <div className="flex items-start justify-between">
                <div>
                  <p className="text-muted-foreground mb-2 text-sm font-bold tracking-wider uppercase">
                    Monthly Therapies
                  </p>
                  {isLoading ? (
                    <Skeleton className="h-9 w-16" />
                  ) : (
                    <h3 className="text-3xl font-bold text-[#012a4a]">{stats.totalTherapies}</h3>
                  )}
                </div>
                <div className="bg-secondary/40 flex h-12 w-12 items-center justify-center rounded-full text-[#014f86]">
                  <Activity className="h-6 w-6" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-border py-0 shadow-sm transition-colors hover:border-[#a9d6e5]">
            <CardContent className="p-4">
              <div className="flex items-start justify-between">
                <div>
                  <p className="text-muted-foreground mb-2 text-sm font-bold tracking-wider uppercase">
                    Total Amount
                  </p>
                  {isLoading ? (
                    <Skeleton className="h-9 w-28" />
                  ) : (
                    <h3 className="text-3xl font-bold text-[#012a4a]">
                      {formatCurrency(stats.totalRevenue)}
                    </h3>
                  )}
                </div>
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-blue-50 text-blue-600">
                  <TrendingUp className="h-6 w-6" />
                </div>
              </div>
              <p className="text-muted-foreground mt-2 text-xs">
                Gross revenue collected from patients.
              </p>
            </CardContent>
          </Card>

          <Card className="border-border py-0 shadow-sm transition-colors hover:border-[#a9d6e5]">
            <CardContent className="p-4">
              <div className="flex items-start justify-between">
                <div>
                  <p className="text-muted-foreground mb-2 text-sm font-bold tracking-wider uppercase">
                    Platform Commission
                  </p>
                  {isLoading ? (
                    <Skeleton className="h-9 w-28" />
                  ) : (
                    <h3 className="text-3xl font-bold text-[#014f86]">
                      {formatCurrency(stats.totalCommission)}
                    </h3>
                  )}
                </div>
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-[#a9d6e5]/40 text-[#013a63]">
                  <PieChart className="h-6 w-6" />
                </div>
              </div>
              <p className="text-muted-foreground mt-2 text-xs">Deducted from gross revenue.</p>
            </CardContent>
          </Card>

          <Card className="border-none bg-[#012a4a] py-0 text-white shadow-md">
            <CardContent className="p-4">
              <div className="flex items-start justify-between">
                <div>
                  <p className="mb-2 text-sm font-bold tracking-wider text-[#a9d6e5] uppercase">
                    Net Earnings
                  </p>
                  {isLoading ? (
                    <Skeleton className="h-9 w-28 bg-white/20" />
                  ) : (
                    <h3 className="text-3xl font-bold text-white">
                      {formatCurrency(stats.netEarnings)}
                    </h3>
                  )}
                </div>
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-[#a9d6e5]/20 text-[#a9d6e5]">
                  <Wallet className="h-6 w-6" />
                </div>
              </div>
              <p className="mt-2 text-xs text-gray-300">Your share for the month.</p>
            </CardContent>
          </Card>
        </motion.div>

        {/* Daily Chart */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          <Card className="border-border mb-8 overflow-hidden bg-white pt-0 shadow-sm">
            <CardHeader className="bg-secondary/10 border-border border-b py-4">
              <CardTitle className="flex items-center gap-2 text-xl text-[#012a4a]">
                <PieChart className="h-5 w-5 text-[#014f86]" /> Daily Earnings Breakdown
              </CardTitle>
              <CardDescription>
                Visualizing gross revenue versus platform commission per day.
              </CardDescription>
            </CardHeader>
            <CardContent className="pt-6 pl-0 sm:pl-6">
              <div className="h-87.5 w-full">
                {chartData.length === 0 ? (
                  <div className="text-muted-foreground flex h-full items-center justify-center text-sm">
                    No earnings to chart for this month.
                  </div>
                ) : (
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart
                      data={chartData}
                      margin={{ top: 10, right: 10, left: -20, bottom: 0 }}
                    >
                      <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
                      <XAxis
                        dataKey="day"
                        axisLine={false}
                        tickLine={false}
                        tick={{ fontSize: 12, fill: '#64748b' }}
                        dy={10}
                      />
                      <YAxis
                        axisLine={false}
                        tickLine={false}
                        tick={{ fontSize: 12, fill: '#64748b' }}
                        tickFormatter={(v) => `₹${v}`}
                        dx={-10}
                      />
                      <Tooltip content={<CustomTooltip />} cursor={{ fill: '#f8fafc' }} />
                      <Bar
                        dataKey="revenue"
                        stackId="a"
                        fill="#014f86"
                        radius={[0, 0, 4, 4]}
                        name="Revenue"
                      />
                      <Bar
                        dataKey="commission"
                        stackId="a"
                        fill="#a9d6e5"
                        radius={[4, 4, 0, 0]}
                        name="Commission"
                      />
                    </BarChart>
                  </ResponsiveContainer>
                )}
              </div>
              <div className="mt-4 flex items-center justify-center gap-6">
                <div className="flex items-center gap-2">
                  <div className="h-3 w-3 rounded-full bg-[#014f86]" />
                  <span className="text-sm font-medium text-[#012a4a]">Gross Revenue</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="h-3 w-3 rounded-full bg-[#a9d6e5]" />
                  <span className="text-sm font-medium text-[#012a4a]">Platform Commission</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Transactions & Payouts */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <Tabs defaultValue="transactions" className="w-full">
            <TabsList className="mb-4 grid w-full max-w-md grid-cols-2">
              <TabsTrigger
                value="transactions"
                className="data-[state=active]:bg-[#014f86] data-[state=active]:text-white"
              >
                Transactions
              </TabsTrigger>
              <TabsTrigger
                value="payouts"
                className="data-[state=active]:bg-[#014f86] data-[state=active]:text-white"
              >
                Payouts
              </TabsTrigger>
            </TabsList>

            <TabsContent value="transactions">
              <Card className="border-border gap-0 bg-white py-0 shadow-sm">
                <CardHeader className="border-border bg-secondary/10 flex flex-col items-start justify-between gap-4 border-b py-4 sm:flex-row sm:items-center">
                  <div>
                    <CardTitle className="flex items-center gap-2 text-xl text-[#012a4a]">
                      <FileText className="h-5 w-5 text-[#014f86]" /> Monthly Transactions
                    </CardTitle>
                    <CardDescription>
                      Detailed ledger of all sessions and deductions.
                    </CardDescription>
                  </div>
                  <div className="relative w-full sm:w-64">
                    <Search className="text-muted-foreground absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2" />
                    <Input
                      placeholder="Search ID or Patient..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="border-border bg-white pl-9 text-[#012a4a] focus-visible:ring-[#014f86]"
                    />
                  </div>
                </CardHeader>
                <CardContent className="p-0">
                  {isLoading ? (
                    <div className="space-y-3 p-6">
                      <Skeleton className="h-10 w-full" />
                      <Skeleton className="h-10 w-full" />
                      <Skeleton className="h-10 w-full" />
                    </div>
                  ) : filteredCommissions.length > 0 ? (
                    <div className="overflow-x-auto">
                      <Table>
                        <TableHeader className="bg-gray-50/50">
                          <TableRow className="hover:bg-transparent">
                            <TableHead className="font-bold text-[#013a63]">Date & ID</TableHead>
                            <TableHead className="font-bold text-[#013a63]">Patient</TableHead>
                            <TableHead className="text-right font-bold text-[#013a63]">
                              Gross Amount
                            </TableHead>
                            <TableHead className="text-right font-bold text-[#013a63]">
                              Commission
                            </TableHead>
                            <TableHead className="text-right font-bold text-[#013a63]">
                              Net Earnings
                            </TableHead>
                          </TableRow>
                        </TableHeader>
                        <TableBody>
                          {filteredCommissions.map((c) => (
                            <TableRow
                              key={c.id}
                              className="hover:bg-secondary/10 border-border/60 transition-colors"
                            >
                              <TableCell className="py-4">
                                <p className="font-semibold whitespace-nowrap text-[#012a4a]">
                                  {formatDate(c.sessionDate)}
                                </p>
                                <p className="text-muted-foreground mt-0.5 font-mono text-xs">
                                  {c.id}
                                </p>
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
                  ) : (
                    <div className="py-16 text-center">
                      <FileText className="text-muted-foreground/30 mx-auto mb-3 h-12 w-12" />
                      <h3 className="text-lg font-bold text-[#012a4a]">No transactions found</h3>
                      <p className="text-muted-foreground text-sm">
                        Adjust your search or select a different month.
                      </p>
                    </div>
                  )}
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="payouts">
              <Card className="border-border gap-0 bg-white py-0 shadow-sm">
                <CardHeader className="border-border bg-secondary/10 border-b py-4">
                  <CardTitle className="flex items-center gap-2 text-xl text-[#012a4a]">
                    <Wallet className="h-5 w-5 text-[#014f86]" /> Payout History
                  </CardTitle>
                  <CardDescription>All payout requests and their current status.</CardDescription>
                </CardHeader>
                <CardContent className="p-0">
                  {payoutsLoading ? (
                    <div className="space-y-3 p-6">
                      <Skeleton className="h-10 w-full" />
                      <Skeleton className="h-10 w-full" />
                      <Skeleton className="h-10 w-full" />
                    </div>
                  ) : payouts.length > 0 ? (
                    <div className="overflow-x-auto">
                      <Table>
                        <TableHeader className="bg-gray-50/50">
                          <TableRow className="hover:bg-transparent">
                            <TableHead className="font-bold text-[#013a63]">Requested</TableHead>
                            <TableHead className="text-right font-bold text-[#013a63]">
                              Amount
                            </TableHead>
                            <TableHead className="text-center font-bold text-[#013a63]">
                              Status
                            </TableHead>
                            <TableHead className="font-bold text-[#013a63]">Reference</TableHead>
                          </TableRow>
                        </TableHeader>
                        <TableBody>
                          {payouts.map((p) => (
                            <TableRow
                              key={p.id}
                              className="hover:bg-secondary/10 border-border/60 transition-colors"
                            >
                              <TableCell className="py-4">
                                <p className="font-semibold whitespace-nowrap text-[#012a4a]">
                                  {formatDate(p.createdAt)}
                                </p>
                                <p className="text-muted-foreground mt-0.5 font-mono text-xs">
                                  {p.id}
                                </p>
                              </TableCell>
                              <TableCell className="text-right font-bold text-[#012a4a]">
                                {formatCurrency(p.amount)}
                              </TableCell>
                              <TableCell className="text-center">
                                <Badge className={`capitalize ${PAYOUT_STATUS_STYLE[p.status]}`}>
                                  {p.status}
                                </Badge>
                              </TableCell>
                              <TableCell className="text-muted-foreground font-mono text-xs">
                                {p.transactionRef ?? '—'}
                              </TableCell>
                            </TableRow>
                          ))}
                        </TableBody>
                      </Table>
                    </div>
                  ) : (
                    <div className="py-16 text-center">
                      <Wallet className="text-muted-foreground/30 mx-auto mb-3 h-12 w-12" />
                      <h3 className="text-lg font-bold text-[#012a4a]">No payouts yet</h3>
                      <p className="text-muted-foreground text-sm">
                        Request a payout to see it listed here.
                      </p>
                    </div>
                  )}
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </motion.div>
      </main>
    </div>
  );
}
