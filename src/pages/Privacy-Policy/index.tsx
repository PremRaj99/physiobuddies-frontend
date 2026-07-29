'use client';

import { motion } from 'framer-motion';
import { ShieldCheck } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import PageHeader from '@/components/custom/page-header/page-header';
import ActionCTA from '@/components/custom/cta/cta';
import Footer from '@/components/custom/footer/footer';
import { usePrivacyPolicy } from './hooks/usePrivacyPolicy';
import { PrivacySections } from './components/PrivacySections';

export default function PrivacyPolicyPage() {
  usePrivacyPolicy();

  return (
    <div className="bg-background min-h-screen font-sans">
      <PageHeader
        heading="Privacy Policy"
        subheading="Learn how Physiobuddies collects, uses, and safeguards your personal and medical information."
      />

      <main className="relative z-20 mx-auto -mt-8 mb-10 max-w-6xl px-4 sm:px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <Card className="border-border overflow-hidden bg-white py-0 shadow-xl shadow-[#012a4a]/5">
            <CardContent className="p-6 md:p-10 lg:p-12">
              <div className="text-muted-foreground mb-8 flex items-center gap-3 text-sm font-semibold">
                <ShieldCheck className="text-success h-5 w-5" />
                <span>
                  Last Updated:{' '}
                  {new Date().toLocaleDateString('en-US', {
                    month: 'long',
                    day: 'numeric',
                    year: 'numeric',
                  })}
                </span>
              </div>

              <PrivacySections />
            </CardContent>
          </Card>
        </motion.div>
      </main>
      <ActionCTA />
      <Footer />
    </div>
  );
}
