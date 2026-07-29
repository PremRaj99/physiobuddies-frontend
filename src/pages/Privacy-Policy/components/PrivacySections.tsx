import React from 'react';
import { ChevronRight, Mail, MapPin, Phone } from 'lucide-react';
import { Separator } from '@/components/ui/separator';

const SectionTitle = ({ children }: { children: React.ReactNode }) => (
  <h2 className="border-border mt-10 mb-4 flex items-center gap-2 border-b pb-3 text-xl font-bold text-[#012a4a]">
    <ChevronRight className="h-5 w-5 text-[#014f86]" /> {children}
  </h2>
);

const SubTitle = ({ children }: { children: React.ReactNode }) => (
  <h4 className="mt-6 mb-3 text-lg font-semibold text-[#013a63]">{children}</h4>
);

const Paragraph = ({
  children,
  className = '',
}: {
  children: React.ReactNode;
  className?: string;
}) => <p className={`mb-4 text-sm leading-relaxed text-[#012a4a]/80 ${className}`}>{children}</p>;

const List = ({ children }: { children: React.ReactNode }) => (
  <ul className="border-secondary/50 mb-6 ml-2 space-y-3 border-l-2 pl-4">{children}</ul>
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

export const PrivacySections = () => {
  return (
    <>
      <Paragraph className="bg-secondary/10 border-border rounded-xl border p-5 text-base">
        This Privacy Policy explains how Physiobuddies ("we", "us", or "our") collects, uses,
        discloses, and safeguards your personal information when you use our website, mobile app,
        and related services (collectively, the "Services"). By accessing or using our Services, you
        agree to the collection and use of your information in accordance with this Privacy Policy.
        If you do not agree with our practices, please do not use our Services.
      </Paragraph>

      <SectionTitle>1. Information We Collect</SectionTitle>
      <SubTitle>1.1 Personal Information</SubTitle>
      <Paragraph>
        We may collect the following personal information when you register for and use our
        Services:
      </Paragraph>
      <List>
        <ListItem title="Account Details:">
          Full name, email address, phone number, mailing address, and other contact information.
        </ListItem>
        <ListItem title="Health Information:">
          For patients, details such as medical history, current conditions, and treatment
          information necessary for effective physiotherapy services.
        </ListItem>
        <ListItem title="Professional Data:">
          For physiotherapists and clinics, this includes credentials, licenses, qualifications, and
          professional photos.
        </ListItem>
        <ListItem title="Payment Information:">
          Billing details and payment method information, which are processed securely through our
          payment gateway.
        </ListItem>
      </List>

      <SubTitle>1.2 Location Data</SubTitle>
      <Paragraph>
        When you book an appointment, we may collect your location data, including your address or
        geolocation information. This data is used to:
      </Paragraph>
      <List>
        <ListItem>Verify your booking and assign you to a nearby physiotherapist.</ListItem>
        <ListItem>Ensure timely and efficient service delivery.</ListItem>
        <ListItem>Provide localized service options tailored to your area.</ListItem>
      </List>

      <SubTitle>1.3 Technical and Usage Data</SubTitle>
      <Paragraph>We automatically collect certain technical and usage data, including:</Paragraph>
      <List>
        <ListItem title="Log Data:">
          IP address, browser type, operating system, referring URLs, pages visited, and timestamps.
        </ListItem>
        <ListItem title="Device Information:">
          Unique device identifiers, mobile network information, and other hardware data.
        </ListItem>
        <ListItem title="Cookies and Tracking Technologies:">
          To enhance your experience, analyze usage trends, and improve our Services.
        </ListItem>
      </List>

      <SectionTitle>2. How We Use Your Information</SectionTitle>
      <Paragraph>We use the collected information for various purposes, including to:</Paragraph>
      <List>
        <ListItem title="Provide and Enhance Services:">
          Process registrations, manage accounts, deliver physiotherapy services (clinic-based, home
          visit, and online), and improve our platform.
        </ListItem>
        <ListItem title="Personalize Your Experience:">
          Tailor content, recommendations, and service offerings based on your preferences and usage
          patterns.
        </ListItem>
        <ListItem title="Communicate with You:">
          Send account-related notifications, updates, newsletters, marketing materials, and
          customer support communications.
        </ListItem>
        <ListItem title="Process Transactions:">
          Handle billing, payments, refunds, and related financial transactions securely.
        </ListItem>
      </List>

      <SectionTitle>3. How We Share Your Information</SectionTitle>
      <Paragraph>Your information may be shared in the following circumstances:</Paragraph>
      <List>
        <ListItem title="With Service Providers:">
          We may share data with trusted third-party vendors who assist us in operating our
          Services.
        </ListItem>
        <ListItem title="With Healthcare Providers:">
          Necessary information may be shared with the physiotherapists or clinics providing
          treatment.
        </ListItem>
        <ListItem title="For Legal and Regulatory Reasons:">
          When required by law or in response to a valid legal request.
        </ListItem>
      </List>

      <SectionTitle>4. Data Retention & Security</SectionTitle>
      <Paragraph>
        We retain your personal information for as long as necessary to fulfill service purposes and
        legal compliance.
      </Paragraph>

      <Separator className="my-10" />

      <div className="rounded-xl bg-[#012a4a] p-6 text-white md:p-8">
        <h2 className="mb-2 text-2xl font-bold">11. Contact Us</h2>
        <p className="mb-6 text-sm text-gray-300">
          If you have any questions, concerns, or requests regarding this Privacy Policy or our data
          practices, please contact us at:
        </p>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
          <div className="flex items-center gap-3 rounded-lg bg-white/10 p-4 transition-colors hover:bg-white/20">
            <Mail className="h-5 w-5 text-[#a9d6e5]" />
            <a
              href="mailto:physiobuddies.in@gmail.com"
              className="text-sm font-medium hover:text-[#a9d6e5]"
            >
              physiobuddies.in@gmail.com
            </a>
          </div>
          <div className="flex items-center gap-3 rounded-lg bg-white/10 p-4 transition-colors hover:bg-white/20">
            <Phone className="h-5 w-5 text-[#a9d6e5]" />
            <a href="tel:+918882286214" className="text-sm font-medium hover:text-[#a9d6e5]">
              +91 8882286214
            </a>
          </div>
          <div className="flex items-center gap-3 rounded-lg bg-white/10 p-4 transition-colors hover:bg-white/20">
            <MapPin className="h-5 w-5 text-[#a9d6e5]" />
            <span className="text-sm font-medium">Pi-1, Gr. Noida</span>
          </div>
        </div>
      </div>
    </>
  );
};
