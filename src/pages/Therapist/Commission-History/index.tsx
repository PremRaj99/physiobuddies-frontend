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
import { useMemo, useState } from 'react';
import { Bar, BarChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';

import PageHeader from '@/components/custom/page-header/page-header';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
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

/* STREAMING_CHUNK:Defining Data Structures and Mocks... */

// --- Types ---
interface Transaction {
  id: string;
  date: string;
  day: number;
  patientName: string;
  mode: 'home_visit' | 'clinic' | 'online';
  amount: number;
  commissionRate: number;
  status: 'settled' | 'pending';
}

interface ChartDataPoint {
  day: string;
  revenue: number;
  commission: number;
}

// --- Mock Data Generator ---
// Simulating data for June 2026
const generateMockTransactions = (): Transaction[] => {
  const transactions: Transaction[] = [];
  for (let i = 1; i <= 30; i++) {
    // Randomly generate 0 to 3 sessions per day
    const sessionsToday = Math.floor(Math.random() * 4);
    for (let j = 0; j < sessionsToday; j++) {
      const amount = [1000, 1500, 2000][Math.floor(Math.random() * 3)];
      transactions.push({
        id: `TRX-6${String(i).padStart(2, '0')}-${Math.floor(1000 + Math.random() * 9000)}`,
        date: `Jun ${String(i).padStart(2, '0')}, 2026`,
        day: i,
        patientName: [
          'Robert Fox',
          'Eleanor Pena',
          'Albert Flores',
          'Jane Cooper',
          'Esther Howard',
        ][Math.floor(Math.random() * 5)],
        mode: ['home_visit', 'clinic', 'online'][Math.floor(Math.random() * 3)] as unknown as
          | 'home_visit'
          | 'clinic'
          | 'online',
        amount: amount,
        commissionRate: 18, // 18% standard platform commission
        status: i > 25 ? 'pending' : 'settled', // Recent ones are pending
      });
    }
  }
  return transactions.reverse(); // Latest first
};

const MOCK_TRANSACTIONS = generateMockTransactions();
const MONTHS = [
  'January 2026',
  'February 2026',
  'March 2026',
  'April 2026',
  'May 2026',
  'June 2026',
];

/* STREAMING_CHUNK:Helper Functions and Sub-components... */

// Custom Tooltip for Recharts
const CustomTooltip = ({
  active,
  payload,
  label,
}: {
  active?: boolean;
  payload?: {
    value: number;
    name: string;
    fill: string;
  }[];
  label?: string | number;
}) => {
  if (active && payload && payload.length) {
    return (
      <div className="border-border rounded-lg border bg-white p-3 shadow-lg">
        <p className="mb-2 font-bold text-[#012a4a]">June {label}, 2026</p>
        <div className="space-y-1 text-sm">
          <p className="font-semibold text-[#014f86]">Revenue: ₹{payload[0].value}</p>
          <p className="font-semibold text-[#a9d6e5] drop-shadow-sm">
            Commission: ₹{payload[1].value}
          </p>
          <div className="border-border mt-2 border-t pt-2">
            <p className="text-success font-bold">Net: ₹{payload[0].value - payload[1].value}</p>
          </div>
        </div>
      </div>
    );
  }
  return null;
};

// --- Main Page Component ---
export default function CommissionHistoryPage() {
  const [selectedMonth, setSelectedMonth] = useState<string>('June 2026');
  const [searchQuery, setSearchQuery] = useState('');

  /* STREAMING_CHUNK:Calculating Aggregates and Chart Data... */

  // In a real app, you would fetch new data when `selectedMonth` changes.
  // Here we use the mock data and filter by search.
  const filteredTransactions = useMemo(() => {
    return MOCK_TRANSACTIONS.filter(
      (t) =>
        t.patientName.toLowerCase().includes(searchQuery.toLowerCase()) ||
        t.id.toLowerCase().includes(searchQuery.toLowerCase()),
    );
  }, [searchQuery]);

  // Aggregate stats for the summary cards
  const stats = useMemo(() => {
    let totalRevenue = 0;
    let totalCommission = 0;

    MOCK_TRANSACTIONS.forEach((t) => {
      totalRevenue += t.amount;
      totalCommission += (t.amount * t.commissionRate) / 100;
    });

    return {
      totalTherapies: MOCK_TRANSACTIONS.length,
      totalRevenue,
      totalCommission,
      netEarnings: totalRevenue - totalCommission,
    };
  }, []);

  // Aggregate data for the daily bar chart
  const chartData = useMemo(() => {
    const dailyData: Record<number, ChartDataPoint> = {};

    // Initialize 30 days
    for (let i = 1; i <= 30; i++) {
      dailyData[i] = { day: String(i), revenue: 0, commission: 0 };
    }

    MOCK_TRANSACTIONS.forEach((t) => {
      const comm = (t.amount * t.commissionRate) / 100;
      dailyData[t.day].revenue += t.amount;
      dailyData[t.day].commission += comm;
    });

    return Object.values(dailyData);
  }, []);

  /* STREAMING_CHUNK:Rendering the Dashboard UI... */

  return (
    <div className="min-h-body bg-[#f8fbfa] pb-24 font-sans">
      {/* Header Decorator */}
      <PageHeader
        heading={
          <span>
            <span className="text-[#a9d6e5]">Financial</span> Overview
          </span>
        }
        subheading="Track your monthly earnings, platform commissions, and session history."
      />

      <main className="mx-auto max-w-6xl px-4 pt-12 sm:px-6">
        {/* Top Actions & Header */}
        <div className="mb-8 flex flex-col items-start justify-between gap-4 md:flex-row md:items-center">
          <div>
            <h1 className="flex items-center gap-3 text-3xl font-bold text-[#012a4a]">
              <Wallet className="h-8 w-8 text-[#014f86]" /> Financial Overview
            </h1>
            <p className="mt-2 text-[#013a63]">
              Track your monthly earnings, platform commissions, and session history.
            </p>
          </div>

          <div className="border-border flex items-center gap-3 rounded-xl border bg-white p-2 shadow-sm">
            <CalendarDays className="text-muted-foreground ml-2 h-5 w-5 shrink-0" />
            <Select value={selectedMonth} onValueChange={setSelectedMonth}>
              <SelectTrigger className="w-45 border-none font-semibold text-[#012a4a] shadow-none focus:ring-0">
                <SelectValue placeholder="Select Month" />
              </SelectTrigger>
              <SelectContent>
                {MONTHS.map((m) => (
                  <SelectItem key={m} value={m} className="font-medium text-[#012a4a]">
                    {m}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
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
                  <h3 className="text-3xl font-bold text-[#012a4a]">{stats.totalTherapies}</h3>
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
                  <h3 className="text-3xl font-bold text-[#012a4a]">
                    ₹{stats.totalRevenue.toLocaleString()}
                  </h3>
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
                  <h3 className="text-3xl font-bold text-[#014f86]">
                    ₹{stats.totalCommission.toLocaleString()}
                  </h3>
                </div>
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-[#a9d6e5]/40 text-[#013a63]">
                  <PieChart className="h-6 w-6" />
                </div>
              </div>
              <p className="text-muted-foreground mt-2 text-xs">18% standard deduction.</p>
            </CardContent>
          </Card>

          <Card className="border-none bg-[#012a4a] py-0 text-white shadow-md">
            <CardContent className="p-4">
              <div className="flex items-start justify-between">
                <div>
                  <p className="mb-2 text-sm font-bold tracking-wider text-[#a9d6e5] uppercase">
                    Net Earnings
                  </p>
                  <h3 className="text-3xl font-bold text-white">
                    ₹{stats.netEarnings.toLocaleString()}
                  </h3>
                </div>
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-[#a9d6e5]/20 text-[#a9d6e5]">
                  <Wallet className="h-6 w-6" />
                </div>
              </div>
              <p className="mt-2 text-xs text-gray-300">Ready for final payout.</p>
            </CardContent>
          </Card>
        </motion.div>

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
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={chartData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
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

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <Card className="border-border gap-0 bg-white py-0 shadow-sm">
            <CardHeader className="border-border bg-secondary/10 flex flex-col items-start justify-between gap-4 border-b py-4 sm:flex-row sm:items-center">
              <div>
                <CardTitle className="flex items-center gap-2 text-xl text-[#012a4a]">
                  <FileText className="h-5 w-5 text-[#014f86]" /> Monthly Transactions
                </CardTitle>
                <CardDescription>Detailed ledger of all sessions and deductions.</CardDescription>
              </div>
              <div className="relative w-full sm:w-64">
                <Search className="text-muted-foreground absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2" />
                <Input
                  placeholder="Search Trx ID or Patient..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="border-border bg-white pl-9 text-[#012a4a] focus-visible:ring-[#014f86]"
                />
              </div>
            </CardHeader>
            <CardContent className="p-0">
              {filteredTransactions.length > 0 ? (
                <div className="overflow-x-auto">
                  <Table>
                    <TableHeader className="bg-gray-50/50">
                      <TableRow className="hover:bg-transparent">
                        <TableHead className="font-bold text-[#013a63]">Date & ID</TableHead>
                        <TableHead className="font-bold text-[#013a63]">Patient Details</TableHead>
                        <TableHead className="text-right font-bold text-[#013a63]">
                          Gross Amount
                        </TableHead>
                        <TableHead className="text-right font-bold text-[#013a63]">
                          Commission (-18%)
                        </TableHead>
                        <TableHead className="text-right font-bold text-[#013a63]">
                          Net Earnings
                        </TableHead>
                        <TableHead className="text-center font-bold text-[#013a63]">
                          Status
                        </TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {filteredTransactions.map((trx) => {
                        const commissionAmt = (trx.amount * trx.commissionRate) / 100;
                        const netAmt = trx.amount - commissionAmt;
                        return (
                          <TableRow
                            key={trx.id}
                            className="hover:bg-secondary/10 border-border/60 transition-colors"
                          >
                            <TableCell className="py-4">
                              <p className="font-semibold whitespace-nowrap text-[#012a4a]">
                                {trx.date}
                              </p>
                              <p className="text-muted-foreground mt-0.5 font-mono text-xs">
                                {trx.id}
                              </p>
                            </TableCell>
                            <TableCell>
                              <p className="font-semibold text-[#012a4a]">{trx.patientName}</p>
                              <Badge
                                variant="outline"
                                className="mt-1 border-[#014f86]/30 bg-white text-[10px] text-[#014f86] capitalize"
                              >
                                {trx.mode.replace('_', ' ')}
                              </Badge>
                            </TableCell>
                            <TableCell className="text-right font-medium text-[#012a4a]">
                              ₹{trx.amount.toLocaleString()}
                            </TableCell>
                            <TableCell className="text-right font-medium text-[#014f86]">
                              -₹{commissionAmt.toLocaleString()}
                            </TableCell>
                            <TableCell className="text-success text-right font-bold">
                              ₹{netAmt.toLocaleString()}
                            </TableCell>
                            <TableCell className="text-center">
                              {trx.status === 'settled' ? (
                                <Badge className="bg-success hover:bg-success text-white">
                                  Settled
                                </Badge>
                              ) : (
                                <Badge
                                  variant="secondary"
                                  className="bg-amber-100 text-amber-800 hover:bg-amber-100"
                                >
                                  Pending
                                </Badge>
                              )}
                            </TableCell>
                          </TableRow>
                        );
                      })}
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
        </motion.div>
      </main>
    </div>
  );
}
