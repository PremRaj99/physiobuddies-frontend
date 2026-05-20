'use client';

import { AnimatePresence } from 'framer-motion';
import { MapPin, User, Users } from 'lucide-react';
import { useState } from 'react';

import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { INITIAL_LOCATIONS, LocationsTab, type PatientLocation } from './location-tab';
import { INITIAL_PATIENTS, PatientsTab, type PatientDetail } from './patient-tab';
import { INITIAL_PROFILE, ProfileTab, type UserProfile } from './profile-tab';
import PageHeader from '@/components/custom/page-header/page-header';

export default function PatientProfilePage() {
  const [profile, setProfile] = useState<UserProfile>(INITIAL_PROFILE);
  const [patients, setPatients] = useState<PatientDetail[]>(INITIAL_PATIENTS);
  const [locations, setLocations] = useState<PatientLocation[]>(INITIAL_LOCATIONS);

  // Handlers
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

  return (
    <div className="min-h-screen bg-[#f8fbfa] font-sans">
      {/* Header Decorator */}
      <div className="absolute top-0 left-0 -z-10 h-32 w-full bg-[#a9d6e5]" />
      <PageHeader
        heading="My Profile"
        subheading="Manage your personal information, family members, and addresses."
      />

      <main className="mx-auto max-w-6xl px-3 pt-8 pb-20 sm:px-6 md:pt-12">
        {/* Desktop/Tablet Layout using Tabs */}
        <Tabs defaultValue="profile" className="flex h-full w-full pt-6 md:pt-0">
          {/* Sidebar Nav */}
          <TabsList className="mb-14 flex flex-col items-start gap-2 bg-transparent p-0 md:mb-4 md:flex-row md:items-center">
            <TabsTrigger
              value="profile"
              className="text-muted-foreground data-[state=active]:border-primary border-border data-[state=active]:bg-primary justify-start rounded-lg border px-4 py-3 transition-all hover:bg-white/50 data-[state=active]:text-white data-[state=active]:shadow-sm"
            >
              <User className="mr-3 h-4 w-4" /> Profile Details
            </TabsTrigger>
            <TabsTrigger
              value="patients"
              className="text-muted-foreground data-[state=active]:border-primary border-border data-[state=active]:bg-primary justify-start rounded-lg border px-4 py-3 transition-all hover:bg-white/50 data-[state=active]:text-white data-[state=active]:shadow-sm"
            >
              <Users className="mr-3 h-4 w-4" /> Saved Patients
            </TabsTrigger>
            <TabsTrigger
              value="locations"
              className="text-muted-foreground data-[state=active]:border-primary border-border data-[state=active]:bg-primary justify-start rounded-lg border px-4 py-3 transition-all hover:bg-white/50 data-[state=active]:text-white data-[state=active]:shadow-sm"
            >
              <MapPin className="mr-3 h-4 w-4" /> Saved Addresses
            </TabsTrigger>
          </TabsList>

          {/* Main Content Area */}
          <div className="min-w-0 flex-1">
            <AnimatePresence mode="wait">
              <TabsContent
                value="profile"
                className="border-border mt-0 border-t pt-6 outline-none"
              >
                <ProfileTab profile={profile} onSave={handleSaveProfile} />
              </TabsContent>

              <TabsContent
                value="patients"
                className="border-border mt-0 border-t pt-6 outline-none"
              >
                <PatientsTab
                  patients={patients}
                  onSave={handleSavePatient}
                  onDelete={handleDeletePatient}
                />
              </TabsContent>

              <TabsContent
                value="locations"
                className="border-border mt-0 border-t pt-6 outline-none"
              >
                <LocationsTab
                  locations={locations}
                  onSave={handleSaveLocation}
                  onDelete={handleDeleteLocation}
                />
              </TabsContent>
            </AnimatePresence>
          </div>
        </Tabs>
      </main>
    </div>
  );
}
