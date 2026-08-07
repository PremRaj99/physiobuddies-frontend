import type { ReactNode } from 'react';

export type TreatmentMode = 'home_visit' | 'online' | 'clinic';
export type TreatmentStatus = 'UPCOMING' | 'COMPLETED' | 'CANCELLED' | 'PENDING';

export interface TabOption {
  value: string;
  label: string;
}

export interface BookingCardItem {
  id: string;
  title: string;
  avatarUrl?: string;
  avatarFallback?: string;
  subtitleInfo?: ReactNode;
  treatmentMode: TreatmentMode;
  status: TreatmentStatus;
  date: string;
  time: string;
}
