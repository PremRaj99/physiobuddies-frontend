import { useState } from 'react';
import type { PatientLocation } from '../components/location-tab';
import type { PatientDetail } from '../components/patient-tab';
import type { UserProfile } from '../components/profile-tab';

export function usePatientProfile() {
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [patients, setPatients] = useState<PatientDetail[]>([]);
  const [locations, setLocations] = useState<PatientLocation[]>([]);

  const handleSaveProfile = (updatedProfile: UserProfile) => {
    setProfile(updatedProfile);
  };

  const handleSavePatient = (patient: PatientDetail) => {
    setPatients((prev) => {
      const exists = prev.find((p) => p.id === patient.id);
      if (exists) return prev.map((p) => (p.id === patient.id ? patient : p));
      return [...prev, patient];
    });
  };

  const handleDeletePatient = (id: string) => {
    setPatients((prev) => prev.filter((p) => p.id !== id));
  };

  const handleSaveLocation = (location: PatientLocation) => {
    setLocations((prev) => {
      const exists = prev.find((l) => l.id === location.id);
      if (exists) return prev.map((l) => (l.id === location.id ? location : l));
      return [...prev, location];
    });
  };

  const handleDeleteLocation = (id: string) => {
    setLocations((prev) => prev.filter((l) => l.id !== id));
  };

  return {
    profile,
    patients,
    locations,
    handleSaveProfile,
    handleSavePatient,
    handleDeletePatient,
    handleSaveLocation,
    handleDeleteLocation,
  };
}
