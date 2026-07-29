import React from 'react';
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
import { Separator } from '@/components/ui/separator';

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

export const RefundContent = () => {
  return (
    <>
      <p className="bg-secondary/10 border-border rounded-xl border p-5 text-base leading-relaxed text-[#012a4a]/90">
        This Refund Policy outlines the procedures and conditions under which refunds may be granted
        to users of the Physiobuddies platform. It applies to all users, including physiotherapists
        (during the registration and onboarding process) and patients booking appointments. By using
        our Services, you agree to the terms outlined in this Refund Policy.
      </p>

      <SectionHeader icon={Users} title="1. For Patients" />
      <SubTitle>1.1 Appointment Cancellations and Rescheduling</SubTitle>
      <List>
        <ListItem title="Patient-Initiated Cancellations:">
          <ul className="border-secondary/50 mt-2 space-y-2 border-l-2 py-1 pl-4">
            <li>
              <strong className="text-[#013a63]">100% Refund:</strong> If cancelled 12 hours or more
              before the scheduled session.
            </li>
            <li>
              <strong className="text-[#013a63]">70% Refund:</strong> If cancelled between 6 to 12
              hours before the session.
            </li>
            <li>
              <strong className="text-destructive">No Refund:</strong> If cancelled less than 6
              hours before the session or in case of a no-show.
            </li>
          </ul>
        </ListItem>
        <ListItem title="Physiotherapist-Initiated Cancellations:">
          Full Refund or Reschedule Option: If a physiotherapist cancels a session, the patient will
          either receive a full refund or have the option to reschedule the appointment without
          incurring additional charges.
        </ListItem>
      </List>

      <SectionHeader icon={Stethoscope} title="2. For Physiotherapists" />
      <SubTitle>2.1 Registration Fee</SubTitle>
      <List>
        <ListItem title="Non-Refundable:">
          The registration fee of ₹200 is strictly non-refundable. This fee is required to ensure
          commitment and cover administrative costs during the initial application process.
        </ListItem>
      </List>

      <SectionHeader icon={Info} title="3. General Refund Guidelines" />
      <List>
        <ListItem title="Non-Refundable Charges:">
          Any fees associated with account registration, service processing, or administrative costs
          may be non-refundable.
        </ListItem>
        <ListItem title="Dispute Resolution:">
          Any disputes regarding refunds must be raised with our customer support team within 7 days
          of the transaction.
        </ListItem>
      </List>

      <SectionHeader icon={HelpCircle} title="4. How to Request a Refund" />
      <List>
        <ListItem title="Submit a Request:">
          Log in to your account and navigate to the Refund Request section, or contact our support
          team directly.
        </ListItem>
      </List>

      <Separator className="my-10" />

      <div className="rounded-xl bg-[#012a4a] p-6 text-center text-white">
        <h4 className="mb-2 text-lg font-bold">Need further assistance?</h4>
        <p className="mb-6 text-sm text-gray-300">
          For any questions regarding this Refund Policy, please reach out to our dedicated support
          team.
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
    </>
  );
};
