'use client';

import { AnimatePresence } from 'framer-motion';
import { BadgeCheck, LogIn, Stethoscope } from 'lucide-react';
import ActionCTA from '@/components/custom/cta/cta';
import Footer from '@/components/custom/footer/footer';
import PageHeader from '@/components/custom/page-header/page-header';
import { Card } from '@/components/ui/card';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useGuide } from './hooks/useGuide';
import { StepTimeline } from './components/StepTimeline';

export default function GuidePage() {
  const { patientSteps, therapistSteps } = useGuide();

  return (
    <div className="min-h-screen bg-[#f8fbfa] font-sans">
      <PageHeader
        heading="How Physiobuddies Works"
        subheading="A simple, step-by-step guide to getting the most out of Physiobuddies — whether you are here to recover or to care for others."
      />

      <main className="relative z-20 mx-auto -mt-8 mb-10 max-w-6xl px-4 sm:px-6">
        <Card className="border-border overflow-hidden bg-white py-0 shadow-xl shadow-[#012a4a]/5">
          <Tabs defaultValue="patient" className="flex flex-col md:flex-row!">
            <div className="bg-secondary/20 border-border w-full shrink-0 border-r p-4! sm:p-6 md:w-56 lg:w-64">
              <p className="ml-2 pb-4 text-xs font-bold tracking-wider text-[#013a63] uppercase">
                Choose your journey
              </p>
              <TabsList className="flex h-auto! w-full flex-col items-stretch space-y-1 bg-transparent p-0">
                <TabsTrigger
                  value="patient"
                  className="text-primary hover:bg-secondary data-[state=active]:bg-primary justify-start rounded-md px-3 py-2 text-sm font-medium transition-colors data-[state=active]:text-white"
                >
                  <LogIn className="mr-3 h-4 w-4 shrink-0" /> For Patients
                </TabsTrigger>
                <TabsTrigger
                  value="therapist"
                  className="text-primary hover:bg-secondary data-[state=active]:bg-primary justify-start rounded-md px-3 py-2 text-sm font-medium transition-colors data-[state=active]:text-white"
                >
                  <Stethoscope className="mr-3 h-4 w-4 shrink-0" /> For Therapists
                </TabsTrigger>
              </TabsList>

              <div className="border-border mt-8 hidden rounded-xl border bg-white p-4 md:block">
                <BadgeCheck className="text-success mb-2 h-6 w-6" />
                <h4 className="mb-1 text-sm font-bold text-[#012a4a]">Verified & Secure</h4>
                <p className="text-muted-foreground text-xs leading-relaxed">
                  Every physiotherapist is screened and verified, and all payments are processed
                  securely.
                </p>
              </div>
            </div>

            <div className="min-w-0 flex-1">
              <ScrollArea className="h-[70vh] w-full md:h-200">
                <div className="p-6 md:p-10">
                  <AnimatePresence mode="wait">
                    <TabsContent value="patient" className="mt-0 outline-none">
                      <div className="mb-8">
                        <h1 className="mb-2 text-2xl font-bold text-[#012a4a] md:text-3xl">
                          Your recovery journey
                        </h1>
                        <p className="text-muted-foreground text-sm">
                          From finding the right expert to tracking your progress — here is how it
                          works for patients.
                        </p>
                      </div>
                      <StepTimeline steps={patientSteps} />
                    </TabsContent>

                    <TabsContent value="therapist" className="mt-0 outline-none">
                      <div className="mb-8">
                        <h1 className="mb-2 text-2xl font-bold text-[#012a4a] md:text-3xl">
                          Grow your practice
                        </h1>
                        <p className="text-muted-foreground text-sm">
                          From registration to payouts — here is how physiotherapists work with
                          Physiobuddies.
                        </p>
                      </div>
                      <StepTimeline steps={therapistSteps} />
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
