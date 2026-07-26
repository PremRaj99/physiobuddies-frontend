import { useMemo, useState } from 'react';
import { toast } from 'sonner';

import { useEarnings, usePayouts, useRequestPayout, useWallet } from '@/hooks/useWallet';
import type { Commission } from '@/services/wallet.service';

interface ChartDataPoint {
  day: string;
  revenue: number;
  commission: number;
}

const monthKey = (iso: string) => {
  const d = new Date(iso);
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}`;
};

const monthLabel = (key: string) => {
  const [year, month] = key.split('-').map(Number);
  return new Date(year, month - 1).toLocaleDateString('en-IN', {
    month: 'long',
    year: 'numeric',
  });
};

const parseErrorMessage = (err: unknown, fallback: string) => {
  const response = (err as { response?: { data?: { message?: string } } }).response;
  return response?.data?.message || fallback;
};

export const useCommissionHistory = () => {
  const earningsQuery = useEarnings();
  const walletQuery = useWallet();
  const payoutsQuery = usePayouts();
  const requestPayout = useRequestPayout();

  const commissions = useMemo<Commission[]>(() => earningsQuery.data ?? [], [earningsQuery.data]);

  // Distinct months present in the data (newest first), as { key, label } pairs.
  const months = useMemo(() => {
    const keys = Array.from(new Set(commissions.map((c) => monthKey(c.sessionDate))));
    keys.sort((a, b) => b.localeCompare(a));
    return keys.map((key) => ({ key, label: monthLabel(key) }));
  }, [commissions]);

  const [selectedMonth, setSelectedMonth] = useState<string>('');
  const [searchQuery, setSearchQuery] = useState('');
  const [payoutDialogOpen, setPayoutDialogOpen] = useState(false);
  const [payoutAmount, setPayoutAmount] = useState('');

  // Default to the newest month once data arrives.
  const activeMonth = selectedMonth || months[0]?.key || '';

  const monthCommissions = useMemo(
    () => commissions.filter((c) => monthKey(c.sessionDate) === activeMonth),
    [commissions, activeMonth],
  );

  const filteredCommissions = useMemo(() => {
    const q = searchQuery.toLowerCase();
    return monthCommissions.filter(
      (c) => c.patientName.toLowerCase().includes(q) || c.id.toLowerCase().includes(q),
    );
  }, [monthCommissions, searchQuery]);

  const stats = useMemo(() => {
    let totalRevenue = 0;
    let totalCommission = 0;
    let netEarnings = 0;
    monthCommissions.forEach((c) => {
      totalRevenue += c.sessionAmount;
      totalCommission += c.platformFee;
      netEarnings += c.therapistAmount;
    });
    return {
      totalTherapies: monthCommissions.length,
      totalRevenue,
      totalCommission,
      netEarnings,
    };
  }, [monthCommissions]);

  const chartData = useMemo<ChartDataPoint[]>(() => {
    const daily: Record<number, ChartDataPoint> = {};
    monthCommissions.forEach((c) => {
      const day = new Date(c.sessionDate).getDate();
      if (!daily[day]) daily[day] = { day: String(day), revenue: 0, commission: 0 };
      daily[day].revenue += c.sessionAmount;
      daily[day].commission += c.platformFee;
    });
    return Object.values(daily).sort((a, b) => Number(a.day) - Number(b.day));
  }, [monthCommissions]);

  const balance = walletQuery.data?.balance ?? 0;

  const submitPayout = () => {
    const amount = Number(payoutAmount);
    if (!Number.isFinite(amount) || amount <= 0) {
      toast.error('Enter a valid amount greater than 0.');
      return;
    }
    if (amount > balance) {
      toast.error('Amount exceeds your available balance.');
      return;
    }
    requestPayout.mutate(
      { amount },
      {
        onSuccess: () => {
          toast.success('Payout requested successfully.');
          setPayoutAmount('');
          setPayoutDialogOpen(false);
        },
        onError: (err: unknown) => toast.error(parseErrorMessage(err, 'Failed to request payout.')),
      },
    );
  };

  return {
    isLoading: earningsQuery.isLoading,
    months,
    selectedMonth: activeMonth,
    setSelectedMonth,
    searchQuery,
    setSearchQuery,
    filteredCommissions,
    stats,
    chartData,
    balance,
    balanceLoading: walletQuery.isLoading,
    payouts: payoutsQuery.data ?? [],
    payoutsLoading: payoutsQuery.isLoading,
    payoutDialogOpen,
    setPayoutDialogOpen,
    payoutAmount,
    setPayoutAmount,
    submitPayout,
    isRequesting: requestPayout.isPending,
  };
};
