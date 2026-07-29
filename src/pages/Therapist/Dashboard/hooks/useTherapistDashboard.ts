import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export type TreatmentMode = 'home_visit' | 'online' | 'clinic';
export type SessionStatus = 'UPCOMING' | 'COMPLETED' | 'CANCELLED' | 'PENDING';

export interface SessionRecord {
  id: string;
  patientName: string;
  patientAge: number;
  patientGender: string;
  timeSlot: string;
  mode: TreatmentMode;
  status: SessionStatus;
}

export const TODAY_SESSIONS: SessionRecord[] = [
  {
    id: 'BKG-001',
    patientName: 'John Doe',
    patientAge: 30,
    patientGender: 'Male',
    timeSlot: '10:00 AM - 11:00 AM',
    mode: 'home_visit',
    status: 'COMPLETED',
  },
  {
    id: 'BKG-002',
    patientName: 'Jane Smith',
    patientAge: 25,
    patientGender: 'Female',
    timeSlot: '02:30 PM - 03:15 PM',
    mode: 'online',
    status: 'UPCOMING',
  },
  {
    id: 'BKG-003',
    patientName: 'Robert Fox',
    patientAge: 45,
    patientGender: 'Male',
    timeSlot: '04:00 PM - 05:00 PM',
    mode: 'clinic',
    status: 'UPCOMING',
  },
  {
    id: 'BKG-004',
    patientName: 'Esther Howard',
    patientAge: 38,
    patientGender: 'Female',
    timeSlot: '06:00 PM - 07:00 PM',
    mode: 'online',
    status: 'PENDING',
  },
];

export const WEEKLY_SESSION_TREND = [
  { day: 'Mon', sessions: 5 },
  { day: 'Tue', sessions: 7 },
  { day: 'Wed', sessions: 6 },
  { day: 'Thu', sessions: 8 },
  { day: 'Fri', sessions: 9 },
  { day: 'Sat', sessions: 4 },
  { day: 'Sun', sessions: 2 },
];

export const MODE_DISTRIBUTION = [
  { name: 'Home Visit', value: 45, color: '#014f86' },
  { name: 'Online', value: 30, color: '#a9d6e5' },
  { name: 'Clinic', value: 25, color: '#013a63' },
];

export function useTherapistDashboard() {
  const navigate = useNavigate();
  const [sessions] = useState<SessionRecord[]>(TODAY_SESSIONS);

  return {
    navigate,
    sessions,
    weeklyTrend: WEEKLY_SESSION_TREND,
    modeDistribution: MODE_DISTRIBUTION,
  };
}
