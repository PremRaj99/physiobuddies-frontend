import { Clock, Headset, ShieldCheck, Wallet } from 'lucide-react';

export function useHomeNetwork() {
  const refinedBenefits = [
    {
      title: 'Pre-Screened Patients',
      desc: 'Receive verified patient requests directly in your app.',
      icon: ShieldCheck,
    },
    {
      title: 'Zero Upfront Investment',
      desc: 'No hidden costs or platform fees to start your practice.',
      icon: Wallet,
    },
    {
      title: 'Total Calendar Control',
      desc: 'Set your own availability and accept visits on your terms.',
      icon: Clock,
    },
    {
      title: 'Dedicated Support',
      desc: 'Our administrative team handles the backend so you can focus on care.',
      icon: Headset,
    },
  ];

  const steps = [
    {
      step: '01',
      title: 'Sign Up & Verify',
      desc: 'Upload your qualifications and identity documents securely.',
    },
    {
      step: '02',
      title: 'Set Schedule',
      desc: 'Define your preferred visit zones and free hours.',
    },
    {
      step: '03',
      title: 'Accept Visits',
      desc: 'Receive instant notifications for home visit requests nearby.',
    },
    {
      step: '04',
      title: 'Earn & Grow',
      desc: 'Get direct weekly payouts and build your reputation.',
    },
  ];

  const faqs = [
    {
      q: 'What qualifications do I need to join the home visit network?',
      a: 'You must hold a valid BPT or MPT degree from a recognized university and have an active registration with your state or national council.',
    },
    {
      q: 'How are visit payouts calculated and processed?',
      a: 'You receive your session earnings minus platform commission directly to your bank account on a transparent weekly schedule.',
    },
    {
      q: 'Can I set my own geographical working areas?',
      a: 'Yes! You have full control over your service radiuses and preferred neighborhood zones in your profile settings.',
    },
  ];

  return {
    refinedBenefits,
    steps,
    faqs,
  };
}
