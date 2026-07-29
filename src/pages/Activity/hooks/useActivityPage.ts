import { useMemo, useState } from 'react';
import { toast } from 'sonner';
import { useActivities } from '@/hooks/useActivity';
import type { ActivityType } from '@/services/activity.service';

export const getTypeBadgeProps = (type: ActivityType) => {
  switch (type) {
    case 'frequent':
      return { label: 'Frequent', style: 'bg-slate-100 text-slate-800 border-slate-200' };
    case 'likely':
      return { label: 'Likely', style: 'bg-emerald-50 text-emerald-700 border-emerald-200' };
    case 'possible':
      return { label: 'Possible', style: 'bg-amber-50 text-amber-700 border-amber-200' };
    case 'rare':
      return { label: 'Rare Event', style: 'bg-indigo-50 text-indigo-700 border-indigo-200' };
    case 'unlikely':
      return { label: 'Unlikely Action', style: 'bg-rose-50 text-rose-700 border-rose-200' };
  }
};

export const parseJsonSafe = (jsonStr: string | null): Record<string, unknown> | null => {
  if (!jsonStr) return null;
  try {
    return JSON.parse(jsonStr) as Record<string, unknown>;
  } catch {
    return { value: jsonStr };
  }
};

export function useActivityPage() {
  const { data: activitiesRes, isLoading } = useActivities();
  const activities = useMemo(() => activitiesRes?.data ?? [], [activitiesRes]);

  const [searchQuery, setSearchQuery] = useState('');
  const [typeFilter, setTypeFilter] = useState<string>('ALL');
  const [expandedId, setExpandedId] = useState<string | null>(null);

  const toggleRow = (id: string) => {
    setExpandedId(expandedId === id ? null : id);
  };

  const copyToClipboard = (text: string, subject: string) => {
    navigator.clipboard.writeText(text);
    toast.success(`${subject} copied to clipboard!`);
  };

  const filteredActivities = useMemo(() => {
    return activities.filter((act) => {
      const matchesSearch =
        (act.title ?? '').toLowerCase().includes(searchQuery.toLowerCase()) ||
        (act.data ?? '').toLowerCase().includes(searchQuery.toLowerCase()) ||
        (act.ip ?? '').includes(searchQuery) ||
        (act.id ?? '').includes(searchQuery);

      const matchesType = typeFilter === 'ALL' || act.type === typeFilter;

      return matchesSearch && matchesType;
    });
  }, [activities, searchQuery, typeFilter]);

  return {
    activities,
    filteredActivities,
    isLoading,
    searchQuery,
    setSearchQuery,
    typeFilter,
    setTypeFilter,
    expandedId,
    toggleRow,
    copyToClipboard,
  };
}
