import { useState } from 'react';
import {
  Activity,
  BadgeCheck,
  CalendarCheck,
  CreditCard,
  LayoutDashboard,
  Search,
  Stethoscope,
  UserPlus,
} from 'lucide-react';

export interface FlowStep {
  icon: React.ElementType;
  title: string;
  description: string;
  tip?: string;
}

export function useGuide() {
  const [activeRole, setActiveRole] = useState<'patient' | 'therapist'>('patient');

  const patientSteps: FlowStep[] = [
    {
      icon: Search,
      title: 'Find a Specialist',
      description:
        'Browse verified physiotherapists by specialization, location, ratings, or treatment type (Clinic, Home Visit, or Online).',
      tip: 'Filter by symptoms or specific conditions like sports injury or back pain for best matches.',
    },
    {
      icon: CalendarCheck,
      title: 'Book a Slot',
      description:
        'Select your preferred date, time slot, and consultation mode. Fill out basic patient details and initial symptoms.',
    },
    {
      icon: CreditCard,
      title: 'Pay & Confirm',
      description:
        'Complete payment securely via Razorpay or choose pay-at-clinic if eligible. You will receive immediate SMS & email confirmations.',
    },
    {
      icon: Stethoscope,
      title: 'Attend Session & Track Recovery',
      description:
        'Join the video call or welcome your physio at home/clinic. Access prescription notes, digital exercise plans, and medical records anytime.',
      tip: 'Check your Patient Dashboard for session logs and follow-up schedules.',
    },
  ];

  const therapistSteps: FlowStep[] = [
    {
      icon: UserPlus,
      title: 'Register & Submit Profile',
      description:
        'Sign up as a therapist and upload degree certificates, council registration, experience details, and clinic locations.',
    },
    {
      icon: BadgeCheck,
      title: 'Admin Verification',
      description:
        'Our clinical operations team verifies your credentials within 24-48 hours. You will receive an approval notification via email.',
      tip: 'Ensure uploaded documents are clear and legible to speed up verification.',
    },
    {
      icon: LayoutDashboard,
      title: 'Set Availability & Manage Slots',
      description:
        'Configure weekly working hours for home visits, clinic consults, or tele-rehab. Override specific dates as needed.',
    },
    {
      icon: Activity,
      title: 'Deliver Care & Track Earnings',
      description:
        'Accept incoming booking requests, record digital assessments, issue treatment logs, and track direct bank payouts via your therapist portal.',
    },
  ];

  return {
    activeRole,
    setActiveRole,
    patientSteps,
    therapistSteps,
  };
}
