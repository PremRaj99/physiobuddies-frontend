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
import { CommissionTable } from './components/CommissionTable';

const formatCurrency = (n: number) => `₹${n.toLocaleString('en-IN')}`;

const formatDate = (iso: string) =>
  new Date(iso).toLocaleDateString('en-IN', { day: '2-digit', month: 'short', year: 'numeric' });

const PAYOUT_STATUS_STYLE: Record<PayoutStatus, string> = {
  requested: 'bg-amber-100 text-amber-800 hover:bg-amber-100',
  processed: 'bg-success text-white hover:bg-success',
  rejected: 'bg-red-100 text-red-800 hover:bg-red-100',
};

export default function CommissionHistoryPage() {
  const {
    stats,
    filteredCommissions,
    payouts,
    wallet,
    availableMonths,
    selectedMonth,
    setSelectedMonth,
    searchQuery,
    setSearchQuery,
    isLoading,
    payoutsLoading,
    payoutAmountInput,
    setPayoutAmountInput,
    handleRequestPayout,
    isRequestingPayout,
  } = useCommissionHistory();

  return (
    <div className="min-h-screen bg-[#f8fbfa] pb-24 font-sans">
      <main className="mx-auto max-w-6xl px-4 pt-8 sm:px-6">
        <div className="mb-8 flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-center">
          <div>
            <h1 className="text-3xl font-bold text-[#012a4a]">Earnings & Commissions</h1>
            <p className="text-muted-foreground mt-1 text-sm">
              Track session revenue, platform commission split, and wallet payouts.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <Select value={selectedMonth} onValueChange={setSelectedMonth}>
              <SelectTrigger className="border-border w-48 bg-white text-[#012a4a] shadow-sm">
                <CalendarDays className="mr-2 h-4 w-4 text-[#014f86]" />
                <SelectValue placeholder="Select Month" />
              </SelectTrigger>
              <SelectContent>
                {availableMonths.map((m) => (
                  <SelectItem key={m.value} value={m.value}>
                    {m.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            {wallet && wallet.balance > 0 && (
              <AlertDialog>
                <AlertDialogTrigger asChild>
                  <Button className="bg-primary hover:bg-primary/90 font-bold text-white">
                    <Wallet className="mr-2 h-4 w-4" /> Request Payout (
                    {formatCurrency(wallet.balance)})
                  </Button>
                </AlertDialogTrigger>
                <AlertDialogContent className="max-w-md rounded-2xl bg-white">
                  <AlertDialogHeader>
                    <AlertDialogTitle className="text-[#012a4a]">
                      Request Wallet Payout
                    </AlertDialogTitle>
                    <AlertDialogDescription className="text-xs text-slate-500">
                      Available balance: <strong>{formatCurrency(wallet.balance)}</strong>. Payouts
                      are transferred to your default registered bank account within 24-48 hours.
                    </AlertDialogDescription>
                  </AlertDialogHeader>
                  <div className="space-y-2 py-4">
                    <label className="text-xs font-bold text-[#012a4a]">Payout Amount (₹)</label>
                    <Input
                      type="number"
                      placeholder={`Max ${wallet.balance}`}
                      value={payoutAmountInput}
                      onChange={(e) => setPayoutAmountInput(e.target.value)}
                      max={wallet.balance}
                    />
                  </div>
                  <AlertDialogFooter>
                    <AlertDialogCancel>Cancel</AlertDialogCancel>
                    <Button
                      onClick={handleRequestPayout}
                      disabled={isRequestingPayout || !payoutAmountInput}
                      className="bg-[#014f86] text-white"
                    >
                      {isRequestingPayout ? 'Submitting...' : 'Confirm Payout Request'}
                    </Button>
                  </AlertDialogFooter>
                </AlertDialogContent>
              </AlertDialog>
            )}
          </div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="mb-8 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4"
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
            </CardContent>
          </Card>
        </motion.div>

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
                  <CommissionTable
                    commissions={filteredCommissions}
                    isLoading={isLoading}
                    formatCurrency={formatCurrency}
                    formatDate={formatDate}
                  />
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
