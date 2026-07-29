'use client';

import PageHeader from '@/components/custom/page-header/page-header';
import { useTherapistSubscription } from './hooks/useTherapistSubscription';
import { SubscriptionPlanCard } from './components/SubscriptionPlanCard';

export default function TherapistSubscriptionPage() {
  const { plans, selectedPlanId, handleSelectPlan } = useTherapistSubscription();

  return (
    <div className="min-h-screen bg-[#f8fbfa] pb-24 font-sans">
      <PageHeader
        heading="Therapist Subscription Plans"
        subheading="Choose a flexible subscription plan to activate your clinical profile and start receiving patient bookings."
      />

      <main className="mx-auto max-w-6xl px-4 pt-10 sm:px-6">
        <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
          {plans.map((plan) => (
            <SubscriptionPlanCard
              key={plan.id}
              plan={plan}
              isSelected={selectedPlanId === plan.id}
              onSelect={handleSelectPlan}
            />
          ))}
        </div>
      </main>
    </div>
  );
}
