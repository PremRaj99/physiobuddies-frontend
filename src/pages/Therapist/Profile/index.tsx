'use client';

import { AnimatePresence } from 'framer-motion';
import { ShieldCheck, User } from 'lucide-react';

import PageHeader from '@/components/custom/page-header/page-header';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Skeleton } from '@/components/ui/skeleton';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useTherapistProfilePage } from './hooks/useTherapistProfilePage';
import { GeneralInfoTab } from './components/GeneralInfoTab';

export default function TherapistProfilePage() {
  const { user, therapist, isLoading, activeTab, setActiveTab, updateUserInfo } =
    useTherapistProfilePage();

  if (isLoading) {
    return (
      <div className="min-h-screen bg-[#f8fbfa] pb-24 font-sans">
        <PageHeader heading="Therapist Profile Settings" subheading="Loading profile..." />
        <div className="mx-auto max-w-5xl px-4 py-8">
          <Skeleton className="h-64 w-full rounded-2xl" />
        </div>
      </div>
    );
  }

  const profileData = {
    name: user?.name || therapist?.name || 'Dr. Clinical Partner',
    email: user?.email || 'therapist@physiobuddies.in',
    phone: user?.phone || '+91 98765 43210',
    image: user?.image || therapist?.image || '',
    displayAddress:
      therapist?.displayAddress || user?.therapistProfile?.displayAddress || 'Greater Noida, UP',
    about:
      therapist?.about || user?.therapistProfile?.about || 'Experienced physical rehab specialist.',
    gender: 'male' as const,
    dob: '1992-05-15',
    mode: 'home_visit' as const,
    clinic: null,
    verifiedAt: null,
  };

  return (
    <div className="min-h-screen bg-[#f8fbfa] pb-24 font-sans">
      <PageHeader
        heading="Therapist Profile Settings"
        subheading="Manage your clinical profile, practice mode, qualifications, and payout preferences."
      />

      <main className="mx-auto max-w-5xl px-4 pt-6 sm:px-6">
        <div className="border-border mb-8 flex items-center justify-between rounded-2xl border bg-white p-6 shadow-sm">
          <div className="flex items-center gap-4">
            <Avatar className="h-16 w-16 border-2 border-white shadow-sm">
              <AvatarImage src={profileData.image} className="object-cover" />
              <AvatarFallback className="bg-[#a9d6e5] text-xl font-bold text-[#013a63]">
                {profileData.name.charAt(0)}
              </AvatarFallback>
            </Avatar>
            <div>
              <h2 className="text-xl font-bold text-[#012a4a]">{profileData.name}</h2>
              <p className="text-sm text-slate-500">{profileData.email}</p>
            </div>
          </div>
          <Badge className="border-emerald-200 bg-emerald-50 text-emerald-700">
            <ShieldCheck className="mr-1 h-3.5 w-3.5" /> Active Practitioner
          </Badge>
        </div>

        <Tabs defaultValue="personal" value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="bg-secondary/40 mb-8 flex h-auto flex-wrap justify-start gap-2 rounded-xl p-1.5">
            <TabsTrigger
              value="personal"
              className="font-medium text-[#013a63] data-[state=active]:bg-[#014f86] data-[state=active]:text-white"
            >
              <User className="mr-2 h-4 w-4" /> Personal & Contact
            </TabsTrigger>
          </TabsList>

          <AnimatePresence mode="wait">
            <TabsContent value="personal" className="mt-0 outline-none">
              <GeneralInfoTab
                profile={profileData}
                onSave={(updated) => {
                  updateUserInfo.mutate({
                    name: updated.name,
                    mobile: updated.phone,
                  });
                }}
                isSaving={updateUserInfo.isPending}
              />
            </TabsContent>
          </AnimatePresence>
        </Tabs>
      </main>
    </div>
  );
}
