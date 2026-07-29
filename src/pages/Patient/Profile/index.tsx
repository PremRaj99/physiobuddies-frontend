'use client';

import { AnimatePresence } from 'framer-motion';
import { MapPin, User, Users } from 'lucide-react';

import PageHeader from '@/components/custom/page-header/page-header';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { LocationsTab } from './components/location-tab';
import { PatientsTab } from './components/patient-tab';
import { ProfileTab } from './components/profile-tab';
import { usePatientProfile } from './hooks/usePatientProfile';

export default function PatientProfilePage() {
  const {
    profile,
    patients,
    locations,
    handleSaveProfile,
    handleSavePatient,
    handleDeletePatient,
    handleSaveLocation,
    handleDeleteLocation,
  } = usePatientProfile();

  return (
    <div className="min-h-screen bg-[#f8fbfa] font-sans">
      <div className="absolute top-0 left-0 -z-10 h-32 w-full bg-[#a9d6e5]" />
      <PageHeader
        heading="My Profile"
        subheading="Manage your personal information, family members, and addresses."
      />

      <main className="mx-auto max-w-6xl px-3 pt-8 pb-20 sm:px-6 md:pt-12">
        <Tabs defaultValue="profile" className="flex h-full w-full pt-6 md:pt-0">
          <TabsList className="mb-14 flex flex-col items-start gap-2 bg-transparent p-0 md:mb-4 md:flex-row md:items-center">
            <TabsTrigger
              value="profile"
              className="text-muted-foreground data-[state=active]:border-border border-border data-[state=active]:bg-primary justify-start rounded-lg border px-4 py-3 transition-all hover:bg-white/50 data-[state=active]:text-white data-[state=active]:shadow-sm"
            >
              <User className="mr-2.5 h-4 w-4" /> Personal Details
            </TabsTrigger>
            <TabsTrigger
              value="patients"
              className="text-muted-foreground data-[state=active]:border-border border-border data-[state=active]:bg-primary justify-start rounded-lg border px-4 py-3 transition-all hover:bg-white/50 data-[state=active]:text-white data-[state=active]:shadow-sm"
            >
              <Users className="mr-2.5 h-4 w-4" /> Patients & Family
            </TabsTrigger>
            <TabsTrigger
              value="locations"
              className="text-muted-foreground data-[state=active]:border-border border-border data-[state=active]:bg-primary justify-start rounded-lg border px-4 py-3 transition-all hover:bg-white/50 data-[state=active]:text-white data-[state=active]:shadow-sm"
            >
              <MapPin className="mr-2.5 h-4 w-4" /> Saved Addresses
            </TabsTrigger>
          </TabsList>

          <div className="min-w-0 flex-1">
            <AnimatePresence mode="wait">
              <TabsContent value="profile" className="mt-0 outline-none">
                <ProfileTab profile={profile} onSave={handleSaveProfile} />
              </TabsContent>

              <TabsContent value="patients" className="mt-0 outline-none">
                <PatientsTab
                  patients={patients}
                  onSave={handleSavePatient}
                  onDelete={handleDeletePatient}
                />
              </TabsContent>

              <TabsContent value="locations" className="mt-0 outline-none">
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
