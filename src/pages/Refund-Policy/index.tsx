'use client';

import { motion } from 'framer-motion';
import {
  ChevronRight,
  HelpCircle,
  Info,
  Mail,
  Phone,
  Stethoscope,
  Users,
  type LucideIcon,
} from 'lucide-react';

import ActionCTA from '@/components/custom/cta/cta';
import Footer from '@/components/custom/footer/footer';
import PageHeader from '@/components/custom/page-header/page-header';
import { Card, CardContent } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';

// --- Sub-Components for Typography ---
const SectionHeader = ({ icon: Icon, title }: { icon: LucideIcon; title: string }) => (
  <div className="border-border mt-10 mb-6 flex items-center gap-3 border-b pb-3">
    <div className="bg-secondary/30 flex h-10 w-10 items-center justify-center rounded-full text-[#014f86]">
      <Icon className="h-5 w-5" />
    </div>
    <h2 className="text-2xl font-bold text-[#012a4a]">{title}</h2>
  </div>
);

const SubTitle = ({ children }: { children: React.ReactNode }) => (
  <h4 className="mt-6 mb-3 flex items-center gap-2 text-lg font-semibold text-[#013a63]">
    <ChevronRight className="h-4 w-4 text-[#014f86]" /> {children}
  </h4>
);

const Paragraph = ({ children }: { children: React.ReactNode }) => (
  <p className="mb-4 pl-6 text-sm leading-relaxed text-[#012a4a]/80">{children}</p>
);

const List = ({ children }: { children: React.ReactNode }) => (
  <ul className="mb-6 ml-6 space-y-3 pl-2">{children}</ul>
);

const ListItem = ({ title, children }: { title?: string; children: React.ReactNode }) => (
  <li className="flex items-start gap-3 text-sm leading-relaxed text-[#012a4a]/80">
    <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-[#014f86]" />
    <div>
      {title && <span className="mb-0.5 block font-bold text-[#012a4a]">{title}</span>}
      <span>{children}</span>
    </div>
  </li>
);

// --- Main Page Wrapper ---

export default function RefundPolicyPage() {
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

              <p className="bg-secondary/10 border-border rounded-xl border p-5 text-base leading-relaxed text-[#012a4a]/90">
                This Refund Policy outlines the procedures and conditions under which refunds may be
                granted to users of the Physiobuddies platform. It applies to all users, including
                physiotherapists (during the registration and onboarding process) and patients
                booking appointments. By using our Services, you agree to the terms outlined in this
                Refund Policy.
              </p>

              {/* SECTION 1: Patients */}
              <SectionHeader icon={Users} title="1. For Patients" />

              <SubTitle>1.1 Appointment Cancellations and Rescheduling</SubTitle>
              <List>
                <ListItem title="Patient-Initiated Cancellations:">
                  <ul className="border-secondary/50 mt-2 space-y-2 border-l-2 py-1 pl-4">
                    <li>
                      <strong className="text-[#013a63]">100% Refund:</strong> If cancelled 12 hours
                      or more before the scheduled session.
                    </li>
                    <li>
                      <strong className="text-[#013a63]">70% Refund:</strong> If cancelled between 6
                      to 12 hours before the session.
                    </li>
                    <li>
                      <strong className="text-destructive">No Refund:</strong> If cancelled less
                      than 6 hours before the session or in case of a no-show.
                    </li>
                  </ul>
                </ListItem>
                <ListItem title="Physiotherapist-Initiated Cancellations:">
                  Full Refund or Reschedule Option: If a physiotherapist cancels a session, the
                  patient will either receive a full refund or have the option to reschedule the
                  appointment without incurring additional charges.
                </ListItem>
              </List>

              <SubTitle>1.2 Additional Considerations</SubTitle>
              <List>
                <ListItem title="Processing Time:">
                  Refunds will be processed through the approved payment gateway. Please allow up to
                  7–10 business days for the refund to be reflected in your account, depending on
                  your bank or payment provider.
                </ListItem>
                <ListItem title="Service Delivery:">
                  No refunds will be issued for sessions that have been completed or for which the
                  services have already been rendered.
                </ListItem>
                <ListItem title="Partial Refunds:">
                  In exceptional circumstances where only a portion of a service has been delivered
                  due to early termination or interruption, refunds will be calculated on a prorated
                  basis.
                </ListItem>
              </List>

              {/* SECTION 2: Therapists */}
              <SectionHeader icon={Stethoscope} title="2. For Physiotherapists" />

              <SubTitle>2.1 Registration Fee</SubTitle>
              <List>
                <ListItem title="Non-Refundable:">
                  The registration fee of ₹200 is strictly non-refundable. This fee is required to
                  ensure commitment and cover administrative costs during the initial application
                  process.
                </ListItem>
              </List>

              <SubTitle>2.2 Onboarding & Subscription Fee</SubTitle>
              <Paragraph>
                Upon successful completion of the interview and selection into the Physiobuddies
                network, physiotherapists are required to pay the onboarding and subscription fee
                based on their chosen plan:
              </Paragraph>
              <div className="mb-4 ml-6 grid grid-cols-1 gap-3 sm:grid-cols-3">
                <div className="bg-secondary/20 border-border rounded-lg border p-3 text-center">
                  <div className="font-bold text-[#012a4a]">3 Months</div>
                  <div className="mt-1 font-mono text-[#014f86]">₹449</div>
                </div>
                <div className="bg-secondary/20 border-border rounded-lg border p-3 text-center">
                  <div className="font-bold text-[#012a4a]">6 Months</div>
                  <div className="mt-1 font-mono text-[#014f86]">₹749</div>
                </div>
                <div className="bg-secondary/20 border-border rounded-lg border p-3 text-center">
                  <div className="font-bold text-[#012a4a]">12 Months</div>
                  <div className="mt-1 font-mono text-[#014f86]">₹1199</div>
                </div>
              </div>
              <Paragraph>
                Access to the platform, visibility, and other professional benefits will be
                activated after payment of the selected subscription plan.
              </Paragraph>
              <List>
                <ListItem title="Refund Conditions:">
                  <ul className="border-secondary/50 mt-2 space-y-2 border-l-2 py-1 pl-4">
                    <li>
                      If the onboarding process is halted or if a candidate is not accepted into the
                      network, the onboarding fee may be eligible for a refund.
                    </li>
                    <li>
                      Refunds for the onboarding fee are considered on a case-by-case basis and will
                      be subject to review.
                    </li>
                    <li>
                      Any approved refund will be processed through the original payment method
                      within 10 business days.
                    </li>
                  </ul>
                </ListItem>
              </List>

              {/* SECTION 3: General */}
              <SectionHeader icon={Info} title="3. General Refund Guidelines" />
              <List>
                <ListItem title="Non-Refundable Charges:">
                  Any fees associated with account registration, service processing, or
                  administrative costs may be non-refundable as specified in the relevant sections
                  of our Terms and Conditions.
                </ListItem>
                <ListItem title="Dispute Resolution:">
                  Any disputes regarding refunds must be raised with our customer support team
                  within 7 days of the transaction or cancellation. We will review each case
                  individually and communicate the outcome via email.
                </ListItem>
                <ListItem title="Changes to Policy:">
                  Physiobuddies reserves the right to modify this Refund Policy at any time. Any
                  changes will be effective immediately upon posting on our website, and continued
                  use of our Services constitutes your acceptance of the updated policy.
                </ListItem>
              </List>

              {/* SECTION 4: Contact */}
              <SectionHeader icon={HelpCircle} title="4. How to Request a Refund" />
              <List>
                <ListItem title="Submit a Request:">
                  Log in to your account and navigate to the Refund Request section, or contact our
                  support team directly.
                </ListItem>
                <ListItem title="Provide Details:">
                  Include your transaction details, appointment reference (if applicable), and the
                  clear reason for the refund request.
                </ListItem>
                <ListItem title="Review Process:">
                  Our team will review your request and may contact you for further clarification.
                </ListItem>
                <ListItem title="Resolution:">
                  You will receive a confirmation email with details on the final outcome of your
                  refund request.
                </ListItem>
              </List>

              <Separator className="my-10" />

              {/* Contact Footer */}
              <div className="rounded-xl bg-[#012a4a] p-6 text-center text-white">
                <h4 className="mb-2 text-lg font-bold">Need further assistance?</h4>
                <p className="mb-6 text-sm text-gray-300">
                  For any questions regarding this Refund Policy, please reach out to our dedicated
                  support team.
                </p>
                <div className="flex flex-col items-center justify-center gap-6 text-sm font-medium sm:flex-row">
                  <a
                    href="mailto:physiobuddies.in@gmail.com"
                    className="flex items-center gap-2 transition-colors hover:text-[#a9d6e5]"
                  >
                    <Mail className="h-4 w-4" /> physiobuddies.in@gmail.com
                  </a>
                  <a
                    href="tel:+918882286214"
                    className="flex items-center gap-2 transition-colors hover:text-[#a9d6e5]"
                  >
                    <Phone className="h-4 w-4" /> +91 8882286214
                  </a>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </main>
      <ActionCTA />
      <Footer />
    </div>
  );
}
