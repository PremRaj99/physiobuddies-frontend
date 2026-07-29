import { CalendarRange, Globe2, Headset, Laptop, Video, Wallet } from 'lucide-react';

export function useOnlineNetwork() {
  const benefits = [
    {
      title: 'HD Telehealth Platform',
      desc: 'Conduct seamless, high-definition video consultations with built-in clinical tools.',
      icon: Video,
    },
    {
      title: 'Global Patient Access',
      desc: 'Break geographical barriers and treat patients from across the country and worldwide.',
      icon: Globe2,
    },
    {
      title: 'Complete Flexibility',
      desc: 'Set your own online consultation hours. Work from your clinic or home office.',
      icon: CalendarRange,
    },
    {
      title: 'Secure Payments',
      desc: 'Automated, secure payment collection before the session begins. Zero follow-ups needed.',
      icon: Wallet,
    },
    {
      title: 'Digital Prescription Tools',
      desc: 'Issue exercise plans, prescription notes, and follow-up routines in 1-click.',
      icon: Laptop,
    },
    {
      title: '24/7 Platform Support',
      desc: 'Dedicated technical and administrative support team for tele-rehab practitioners.',
      icon: Headset,
    },
  ];

  const steps = [
    {
      step: '01',
      title: 'Register & Verify',
      desc: 'Submit your license credentials for tele-physiotherapy certification.',
    },
    {
      step: '02',
      title: 'Set Video Slots',
      desc: 'Define your online consultation hours on your slot management page.',
    },
    {
      step: '03',
      title: 'Conduct Virtual Sessions',
      desc: 'Connect with patients via our secure HD video interface.',
    },
    {
      step: '04',
      title: 'Direct Payouts',
      desc: 'Receive transparent payments directly into your bank account.',
    },
  ];

  const faqs = [
    {
      q: 'What equipment do I need for online consultations?',
      a: 'A computer or tablet with a HD camera, microphone, and a stable broadband internet connection.',
    },
    {
      q: 'How does digital exercise prescribing work?',
      a: 'Our built-in video consultation interface includes pre-loaded exercise libraries and customizable prescription templates you can send instantly.',
    },
    {
      q: 'Is patient data protected during tele-rehab sessions?',
      a: 'Yes! All video consultations and patient medical notes are end-to-end encrypted under healthcare compliance standards.',
    },
  ];

  return {
    benefits,
    steps,
    faqs,
  };
}
