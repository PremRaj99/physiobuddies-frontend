import { ClipboardList, Headset, PieChart, ShieldCheck, Target, TrendingUp } from 'lucide-react';

export function useClinicNetwork() {
  const benefits = [
    {
      title: 'Enhance Online Visibility',
      desc: 'Showcase your clinic to thousands of patients actively seeking physiotherapy.',
      icon: TrendingUp,
    },
    {
      title: 'Reduce Admin Burden',
      desc: 'Automated booking and patient management directly through the platform.',
      icon: ClipboardList,
    },
    {
      title: 'Build Patient Trust',
      desc: 'Leverage our verified clinical network badge to increase conversion rates.',
      icon: ShieldCheck,
    },
    {
      title: 'Dedicated Support',
      desc: 'Access a 24/7 dedicated B2B partner support team for your clinic.',
      icon: Headset,
    },
    {
      title: 'Targeted Marketing',
      desc: 'Promote specialized treatments (e.g. neuro, ortho, sports) to relevant demographics.',
      icon: Target,
    },
    {
      title: 'Real-time Analytics',
      desc: 'Track referrals, patient reviews, and revenue metrics on your clinic portal.',
      icon: PieChart,
    },
  ];

  const steps = [
    {
      step: '01',
      title: 'Submit Clinic Profile',
      desc: 'Fill out the partnership application with clinic details and practitioner list.',
    },
    {
      step: '02',
      title: 'Verification & Audit',
      desc: 'Our clinical team reviews credentials and facility standards.',
    },
    {
      step: '03',
      title: 'Choose Subscription',
      desc: 'Select a flexible B2B plan suited to your clinic capacity.',
    },
    {
      step: '04',
      title: 'Receive Bookings',
      desc: 'Start receiving patient referrals directly via your dashboard.',
    },
  ];

  const pricingPlans = [
    {
      name: 'Starter Clinic',
      price: '₹1,999',
      period: '/ month',
      desc: 'Ideal for solo practitioners & small neighborhood clinics.',
      features: [
        'Up to 3 Therapists',
        'Standard Profile Listing',
        'Basic Analytics',
        'Email Support',
      ],
      highlight: false,
    },
    {
      name: 'Growth Clinic',
      price: '₹3,999',
      period: '/ month',
      desc: 'Best for established clinics aiming to expand local market share.',
      features: [
        'Up to 8 Therapists',
        'Featured Network Badge',
        'Advanced Analytics Dashboard',
        'Priority Partner Support',
        '18% Commission per booking',
      ],
      highlight: true,
    },
    {
      name: 'Multi-Chain Enterprise',
      price: 'Custom',
      period: '',
      desc: 'For healthcare chains & hospital physiotherapy departments.',
      features: [
        'Unlimited Therapists',
        'Multi-location Dashboard',
        'Custom API Integration',
        'Dedicated Account Manager',
      ],
      highlight: false,
    },
  ];

  const faqs = [
    {
      q: 'How does Physiobuddies refer patients to our clinic?',
      a: 'Patients search by location, specialization, and availability on our platform. Your clinic appears in local search results with real-time booking slots.',
    },
    {
      q: 'What is the commission structure?',
      a: 'We operate on a transparent subscription model plus an 18% commission fee for verified patient consults generated via the platform.',
    },
    {
      q: 'Can we manage multiple therapists under one clinic profile?',
      a: 'Yes! Depending on your subscription plan, you can add multiple physiotherapists and manage their individual schedules under one clinic hub.',
    },
  ];

  return {
    benefits,
    steps,
    pricingPlans,
    faqs,
  };
}
