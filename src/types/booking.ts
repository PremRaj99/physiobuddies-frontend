// Centralized Booking & Clinical Assessment Domain Types

export type TreatmentMode = 'home_visit' | 'online' | 'clinic';
export type Gender = 'MALE' | 'FEMALE' | 'OTHER';
export type SessionStatus =
  | 'pending'
  | 'confirmed'
  | 'active'
  | 'completed'
  | 'settled'
  | 'cancelled'
  | 'no_show';

export type BookingOverallStatus = 'IN_PROGRESS' | 'COMPLETED' | 'CANCELLED';

export interface LocationCoords {
  lat: number;
  lng: number;
}

export interface LocationDetail {
  address: string;
  landmark: string | null;
  city: string;
  state: string;
  country: string;
  postalCode: string;
  coords: LocationCoords;
}

export interface TherapistSummary {
  id: string;
  therapistId?: string;
  name: string;
  image: string;
  gender: Gender;
  mode?: TreatmentMode;
  rating?: number;
}

export interface PatientSummary {
  id?: string;
  name: string;
  dob: string;
  gender: Gender;
  phone: string;
}

export interface TreatmentSessionItem {
  id: string;
  date: string;
  scheduledTime: string;
  actualStartTime?: string;
  actualEndTime?: string;
  status: SessionStatus;
  otpVerified?: boolean;
}

export interface DocumentRecordItem {
  id: string;
  title?: string;
  name?: string;
  type?: string;
  fileType?: string;
  date?: string;
  url?: string;
  createdAt?: string;
}

export interface ClinicalAssessmentRecord {
  id?: string;
  treatmentPlanId?: string;
  assessmentType?: string;
  chiefComplaint?: string[];
  durationOfSymptoms?: string;
  painScore?: number;
  painCharacteristics?: string[];
  rom?: string | Record<string, unknown>;
  muscleStrength?: string | Record<string, unknown>;
  mobilityDetails?: Record<string, unknown>;
  surgicalDetails?: Record<string, unknown>;
  sportsDetails?: Record<string, unknown>;
  neurologicalDetails?: Record<string, unknown>;
  cardiopulmonaryVitals?: Record<string, unknown>;
  problemsIdentified?: string[];
  treatmentPlanItems?: string[];
  suggestedTreatmentDays?: number;
  visitFrequency?: string;
  hepGiven?: boolean;
  therapistNotes?: string | null;
  documentUrls?: string[];
  createdAt?: string;
  updatedAt?: string;
}

export interface SessionImprovementRecordItem {
  id?: string;
  sessionId?: string;
  painScoreBefore?: number;
  painScoreAfter?: number;
  improvementNotes?: string;
  exercisesGiven?: string[];
  createdAt?: string;
  sessionDate?: string;
}
