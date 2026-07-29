'use client';

import PageHeader from '@/components/custom/page-header/page-header';
import { useTherapistDashboard } from './hooks/useTherapistDashboard';
import { DashboardMetrics } from './components/DashboardMetrics';
import { UpcomingSessions } from './components/UpcomingSessions';

export default function TherapistDashboardPage() {
  const { navigate, sessions } = useTherapistDashboard();

  return (
    <div className="min-h-screen bg-[#f8fbfa] pb-24 font-sans">
      <PageHeader
        heading="Therapist Clinical Dashboard"
        subheading="Welcome back, Dr. Clinical Partner! Track your sessions, earnings, and patient appointments."
      />

      <main className="mx-auto max-w-6xl px-4 pt-6 sm:px-6">
        <DashboardMetrics />
        <UpcomingSessions sessions={sessions} onNavigate={navigate} />
      </main>
    </div>
  );
}
