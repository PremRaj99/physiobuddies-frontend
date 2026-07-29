import React, { useMemo } from 'react';
import PageHeader from '@/components/custom/page-header/page-header';
import { useActivityPage } from './hooks/useActivityPage';
import { ActivityStats } from './components/ActivityStats';
import { ActivityFilterHeader } from './components/ActivityFilterHeader';
import { ActivityLogTable } from './components/ActivityLogTable';

export default function ActivityPage() {
  const {
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
  } = useActivityPage();

  const [now] = React.useState(() => Date.now());

  const stats = useMemo(() => {
    const uniqueIps = new Set(activities.map((act) => act.ip)).size;
    const unusualEvents = activities.filter(
      (act) => act.type === 'rare' || act.type === 'unlikely',
    ).length;

    return {
      total: activities.length,
      unusual: unusualEvents,
      uniqueIps,
      recent: activities.filter((act) => now - new Date(act.createdAt).getTime() < 86400000 * 2)
        .length,
    };
  }, [activities, now]);

  return (
    <div className="min-h-body bg-[#f8fbfa] pb-24 font-sans">
      <PageHeader
        heading={
          <span>
            Security & Activity <span className="text-[#a9d6e5]">Logs</span>
          </span>
        }
        subheading="Track account changes, system audits, login sequences, and state updates."
      />

      <main className="mx-auto max-w-6xl px-4 pt-4 sm:px-6">
        <ActivityStats isLoading={isLoading} stats={stats} />
        <ActivityFilterHeader
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
          typeFilter={typeFilter}
          setTypeFilter={setTypeFilter}
        />
        <ActivityLogTable
          isLoading={isLoading}
          filteredActivities={filteredActivities}
          expandedId={expandedId}
          toggleRow={toggleRow}
          copyToClipboard={copyToClipboard}
        />
      </main>
    </div>
  );
}
