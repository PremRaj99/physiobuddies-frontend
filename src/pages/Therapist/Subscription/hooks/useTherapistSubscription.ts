import { useState } from 'react';

export interface PlanItem {
  id: string;
  name: string;
  months: number;
  price: number;
  monthlyEquivalent: number;
  savings: string;
  popular: boolean;
  description: string;
  features: string[];
  buttonText: string;
}

export const PLANS: PlanItem[] = [
  {
    id: '3m',
    name: 'Quarterly',
    months: 3,
    price: 449,
    monthlyEquivalent: Math.round(449 / 3),
    savings: '',
    popular: false,
    description: 'Perfect for getting started and experiencing the platform.',
    features: [
      'Verified Therapist Profile',
      'Real-time Appointment Booking',
      'Basic Patient Management',
      'Standard Email Support',
    ],
    buttonText: 'Start 3 Months',
  },
  {
    id: '6m',
    name: 'Half-Yearly',
    months: 6,
    price: 749,
    monthlyEquivalent: Math.round(749 / 6),
    savings: 'Save 16%',
    popular: true,
    description: 'Our most popular plan for committed professionals.',
    features: [
      'Everything in Quarterly',
      'Featured Profile Placement',
      'Advanced Analytics Dashboard',
      'Priority Chat Support',
    ],
    buttonText: 'Choose Popular Plan',
  },
  {
    id: '12m',
    name: 'Annually',
    months: 12,
    price: 1199,
    monthlyEquivalent: Math.round(1199 / 12),
    savings: 'Save 33%',
    popular: false,
    description: 'Maximum value for long-term growth and practice expansion.',
    features: [
      'Everything in Half-Yearly',
      'Top-tier Search Ranking',
      'Custom Article Publishing',
      '24/7 Dedicated Phone Support',
    ],
    buttonText: 'Get Annual Pass',
  },
];

export function useTherapistSubscription() {
  const [selectedPlanId, setSelectedPlanId] = useState('6m');

  const handleSelectPlan = (id: string) => {
    setSelectedPlanId(id);
  };

  return {
    plans: PLANS,
    selectedPlanId,
    handleSelectPlan,
  };
}
