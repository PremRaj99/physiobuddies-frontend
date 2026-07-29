'use client';

import { motion } from 'framer-motion';
import ActionCTA from '@/components/custom/cta/cta';
import Footer from '@/components/custom/footer/footer';
import PageHeader from '@/components/custom/page-header/page-header';
import { Card, CardContent } from '@/components/ui/card';
import { useRefundPolicy } from './hooks/useRefundPolicy';
import { RefundContent } from './components/RefundContent';

export default function RefundPolicyPage() {
  useRefundPolicy();

  return (
    <div className="bg-background min-h-screen font-sans">
      <PageHeader
        heading="Refund Policy"
        subheading="Clear, transparent guidelines on cancellations, refunds, and fee processing for all Physiobuddies users."
      />

      <main className="relative z-20 mx-auto -mt-8 mb-10 max-w-6xl px-4 sm:px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <Card className="border-border overflow-hidden bg-white py-0 shadow-xl shadow-[#012a4a]/5">
            <CardContent className="p-6 md:p-10 lg:p-12">
              <p className="text-muted-foreground mb-8 text-sm font-semibold">
                Last Updated:{' '}
                {new Date().toLocaleDateString('en-US', {
                  month: 'long',
                  day: 'numeric',
                  year: 'numeric',
                })}
              </p>

              <RefundContent />
            </CardContent>
          </Card>
        </motion.div>
      </main>
      <ActionCTA />
      <Footer />
    </div>
  );
}
