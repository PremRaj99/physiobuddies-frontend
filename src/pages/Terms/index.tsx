'use client';

import { AnimatePresence } from 'framer-motion';
import { Building2, FileText, Home, MonitorSmartphone, User } from 'lucide-react';
import PageHeader from '@/components/custom/page-header/page-header';
import { Card } from '@/components/ui/card';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import ActionCTA from '@/components/custom/cta/cta';
import Footer from '@/components/custom/footer/footer';
import { useTerms } from './hooks/useTerms';
import {
  GeneralTerms,
  PatientTerms,
  HomeVisitTerms,
  ClinicTerms,
  OnlineTerms,
} from './components/TermsTabs';

export default function TermsPage() {
  useTerms();

  return (
    <div className="min-h-screen bg-[#f8fbfa] font-sans">
      <PageHeader
        heading="Legal & Policies"
        subheading="Please read these terms carefully before using our services. They outline the rights, responsibilities, and protections for all members of the Physiobuddies community."
      />

      <main className="relative z-20 mx-auto -mt-8 mb-10 max-w-6xl px-4 sm:px-6">
        <Card className="border-border overflow-hidden bg-white py-0 shadow-xl shadow-[#012a4a]/5">
          <Tabs defaultValue="general" className="flex flex-col md:flex-row!">
            <div className="bg-secondary/20 border-border w-full shrink-0 border-r p-4! sm:p-6 md:w-56 lg:w-60">
              <p className="ml-2 pb-4 text-xs font-bold tracking-wider text-[#013a63] uppercase">
                Categories
              </p>
              <TabsList className="flex h-auto! w-full flex-col items-stretch space-y-1 bg-transparent p-0">
                <TabsTrigger
                  value="general"
                  className="text-primary hover:bg-secondary data-[state=active]:bg-primary justify-start rounded-md px-3 py-2 text-sm font-medium transition-colors data-[state=active]:text-white"
                >
                  <FileText className="mr-3 h-4 w-4 shrink-0" /> General Terms
                </TabsTrigger>
                <TabsTrigger
                  value="patients"
                  className="text-primary hover:bg-secondary data-[state=active]:bg-primary justify-start rounded-md px-3 py-2 text-sm font-medium transition-colors data-[state=active]:text-white"
                >
                  <User className="mr-3 h-4 w-4 shrink-0" /> For Patients
                </TabsTrigger>
                <TabsTrigger
                  value="home"
                  className="text-primary hover:bg-secondary data-[state=active]:bg-primary justify-start rounded-md px-3 py-2 text-sm font-medium transition-colors data-[state=active]:text-white"
                >
                  <Home className="mr-3 h-4 w-4 shrink-0" /> Home Visit Therapists
                </TabsTrigger>
                <TabsTrigger
                  value="clinics"
                  className="text-primary hover:bg-secondary data-[state=active]:bg-primary justify-start rounded-md px-3 py-2 text-sm font-medium transition-colors data-[state=active]:text-white"
                >
                  <Building2 className="mr-3 h-4 w-4 shrink-0" /> Partner Clinics
                </TabsTrigger>
                <TabsTrigger
                  value="online"
                  className="text-primary hover:bg-secondary data-[state=active]:bg-primary justify-start rounded-md px-3 py-2 text-sm font-medium transition-colors data-[state=active]:text-white"
                >
                  <MonitorSmartphone className="mr-3 h-4 w-4 shrink-0" /> Online Services
                </TabsTrigger>
              </TabsList>
            </div>

            <div className="min-w-0 flex-1">
              <ScrollArea className="h-[70vh] w-full md:h-200">
                <div className="p-6 md:p-10">
                  <AnimatePresence mode="wait">
                    <TabsContent value="general" className="mt-0 outline-none">
                      <GeneralTerms />
                    </TabsContent>
                    <TabsContent value="patients" className="mt-0 outline-none">
                      <PatientTerms />
                    </TabsContent>
                    <TabsContent value="home" className="mt-0 outline-none">
                      <HomeVisitTerms />
                    </TabsContent>
                    <TabsContent value="clinics" className="mt-0 outline-none">
                      <ClinicTerms />
                    </TabsContent>
                    <TabsContent value="online" className="mt-0 outline-none">
                      <OnlineTerms />
                    </TabsContent>
                  </AnimatePresence>
                </div>
              </ScrollArea>
            </div>
          </Tabs>
        </Card>
      </main>
      <ActionCTA />
      <Footer />
    </div>
  );
}
