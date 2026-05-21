'use client';

import { motion } from 'framer-motion';
import { ShieldCheck, ChevronRight, Mail, Phone, MapPin } from 'lucide-react';

import { Card, CardContent } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import PageHeader from '@/components/custom/page-header/page-header'; // Assuming this is your custom header
import ActionCTA from '@/components/custom/cta/cta';
import Footer from '@/components/custom/footer/footer';

// --- Sub-Components for Typography ---
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

// --- Main Page Wrapper ---

export default function PrivacyPolicyPage() {
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

              <Paragraph className="bg-secondary/10 border-border rounded-xl border p-5 text-base">
                This Privacy Policy explains how Physiobuddies ("we", "us", or "our") collects,
                uses, discloses, and safeguards your personal information when you use our website,
                mobile app, and related services (collectively, the "Services"). By accessing or
                using our Services, you agree to the collection and use of your information in
                accordance with this Privacy Policy. If you do not agree with our practices, please
                do not use our Services.
              </Paragraph>

              {/* SECTION 1 */}
              <SectionTitle>1. Information We Collect</SectionTitle>

              <SubTitle>1.1 Personal Information</SubTitle>
              <Paragraph>
                We may collect the following personal information when you register for and use our
                Services:
              </Paragraph>
              <List>
                <ListItem title="Account Details:">
                  Full name, email address, phone number, mailing address, and other contact
                  information.
                </ListItem>
                <ListItem title="Health Information:">
                  For patients, details such as medical history, current conditions, and treatment
                  information necessary for effective physiotherapy services.
                </ListItem>
                <ListItem title="Professional Data:">
                  For physiotherapists and clinics, this includes credentials, licenses,
                  qualifications, and professional photos.
                </ListItem>
                <ListItem title="Payment Information:">
                  Billing details and payment method information, which are processed securely
                  through our payment gateway.
                </ListItem>
              </List>

              <SubTitle>1.2 Location Data</SubTitle>
              <Paragraph>
                When you book an appointment, we may collect your location data, including your
                address or geolocation information. This data is used to:
              </Paragraph>
              <List>
                <ListItem>Verify your booking and assign you to a nearby physiotherapist.</ListItem>
                <ListItem>Ensure timely and efficient service delivery.</ListItem>
                <ListItem>Provide localized service options tailored to your area.</ListItem>
              </List>

              <SubTitle>1.3 Technical and Usage Data</SubTitle>
              <Paragraph>
                We automatically collect certain technical and usage data, including:
              </Paragraph>
              <List>
                <ListItem title="Log Data:">
                  IP address, browser type, operating system, referring URLs, pages visited, and
                  timestamps.
                </ListItem>
                <ListItem title="Device Information:">
                  Unique device identifiers, mobile network information, and other hardware data.
                </ListItem>
                <ListItem title="Cookies and Tracking Technologies:">
                  To enhance your experience, analyze usage trends, and improve our Services. For
                  detailed information, please review our Cookie Policy.
                </ListItem>
              </List>

              {/* SECTION 2 */}
              <SectionTitle>2. How We Use Your Information</SectionTitle>
              <Paragraph>
                We use the collected information for various purposes, including to:
              </Paragraph>
              <List>
                <ListItem title="Provide and Enhance Services:">
                  Process registrations, manage accounts, deliver physiotherapy services
                  (clinic-based, home visit, and online), and improve our platform.
                </ListItem>
                <ListItem title="Personalize Your Experience:">
                  Tailor content, recommendations, and service offerings based on your preferences
                  and usage patterns.
                </ListItem>
                <ListItem title="Communicate with You:">
                  Send account-related notifications, updates, newsletters, marketing materials, and
                  customer support communications.
                </ListItem>
                <ListItem title="Process Transactions:">
                  Handle billing, payments, refunds, and related financial transactions securely.
                </ListItem>
                <ListItem title="Compliance:">
                  Adhere to legal obligations and enforce our Terms and Conditions.
                </ListItem>
                <ListItem title="Analyze and Improve:">
                  Monitor and analyze usage patterns to optimize our Services and enhance
                  performance.
                </ListItem>
              </List>

              {/* SECTION 3 */}
              <SectionTitle>3. How We Share Your Information</SectionTitle>
              <Paragraph>Your information may be shared in the following circumstances:</Paragraph>
              <List>
                <ListItem title="With Service Providers:">
                  We may share data with trusted third-party vendors (e.g., payment processors, IT
                  services, analytics providers) who assist us in operating our Services, under
                  strict confidentiality agreements.
                </ListItem>
                <ListItem title="With Healthcare Providers:">
                  Necessary information may be shared with the physiotherapists or clinics providing
                  treatment to ensure the delivery of appropriate healthcare services.
                </ListItem>
                <ListItem title="For Legal and Regulatory Reasons:">
                  When required by law or in response to a valid legal request, we may disclose your
                  information to public authorities or regulatory bodies.
                </ListItem>
                <ListItem title="Business Transfers:">
                  In the event of a merger, acquisition, or sale of assets, your information may be
                  transferred as part of the transaction, subject to confidentiality safeguards.
                </ListItem>
              </List>

              {/* SECTION 4 */}
              <SectionTitle>4. Data Retention</SectionTitle>
              <Paragraph>
                We retain your personal information for as long as necessary to fulfill the purposes
                outlined in this Privacy Policy, including compliance with legal, accounting, or
                reporting requirements. Once the data is no longer needed, we will securely delete
                or anonymize it.
              </Paragraph>

              {/* SECTION 5 */}
              <SectionTitle>5. Data Security</SectionTitle>
              <Paragraph>We implement industry-standard security measures, including:</Paragraph>
              <List>
                <ListItem title="Encryption:">
                  Data is encrypted during transmission (via SSL/TLS) and when stored.
                </ListItem>
                <ListItem title="Access Controls:">
                  Only authorized personnel have access to your personal information.
                </ListItem>
                <ListItem title="Regular Audits:">
                  Ongoing reviews of our security practices ensure the continued protection of your
                  data.
                </ListItem>
              </List>
              <Paragraph className="text-muted-foreground border-muted border-l-4 pl-4 text-xs italic">
                Note: While we strive to protect your personal information, no security system is
                completely foolproof. We cannot guarantee absolute security.
              </Paragraph>

              {/* SECTION 6 */}
              <SectionTitle>6. Your Rights and Choices</SectionTitle>
              <Paragraph>
                You have certain rights regarding your personal data, including:
              </Paragraph>
              <List>
                <ListItem title="Access and Correction:">
                  Request access to or correction of your personal information.
                </ListItem>
                <ListItem title="Deletion:">
                  Request that we delete your personal data, subject to legal obligations.
                </ListItem>
                <ListItem title="Data Portability:">
                  Request a copy of your data in a commonly used format.
                </ListItem>
                <ListItem title="Opt-Out:">
                  Opt out of receiving promotional communications by following the unsubscribe
                  instructions provided in our emails.
                </ListItem>
              </List>

              {/* SECTION 7 */}
              <SectionTitle>7. Children's Privacy</SectionTitle>
              <Paragraph>
                Our Services are not directed to individuals under the age of 18. We do not
                knowingly collect personal information from children. If we become aware of such
                collection, we will take steps to delete the information promptly.
              </Paragraph>

              {/* SECTION 8 */}
              <SectionTitle>8. International Data Transfers</SectionTitle>
              <Paragraph>
                Your information may be transferred to, stored, and processed in countries other
                than your own. We ensure that appropriate safeguards are in place to protect your
                data in accordance with applicable laws.
              </Paragraph>

              {/* SECTION 9 */}
              <SectionTitle>9. Third-Party Links and Services</SectionTitle>
              <Paragraph>
                Our Services may include links to third-party websites or services that are not
                operated by us. We are not responsible for the privacy practices or content of these
                external sites. We recommend reviewing their privacy policies before providing any
                personal information.
              </Paragraph>

              {/* SECTION 10 */}
              <SectionTitle>10. Changes to This Privacy Policy</SectionTitle>
              <Paragraph>
                We reserve the right to update this Privacy Policy at any time. Any changes will be
                posted on this page with an updated "Last Updated" date. Your continued use of our
                Services after any modifications constitutes your acceptance of the updated policy.
              </Paragraph>

              <Separator className="my-10" />

              {/* Contact Footer */}
              <div className="rounded-xl bg-[#012a4a] p-6 text-white md:p-8">
                <h2 className="mb-2 text-2xl font-bold">11. Contact Us</h2>
                <p className="mb-6 text-sm text-gray-300">
                  If you have any questions, concerns, or requests regarding this Privacy Policy or
                  our data practices, please contact us at:
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
                    <a
                      href="tel:+918882286214"
                      className="text-sm font-medium hover:text-[#a9d6e5]"
                    >
                      +91 8882286214
                    </a>
                  </div>
                  <div className="flex items-center gap-3 rounded-lg bg-white/10 p-4 transition-colors hover:bg-white/20">
                    <MapPin className="h-5 w-5 text-[#a9d6e5]" />
                    <span className="text-sm font-medium">Pi-1, Gr. Noida</span>
                  </div>
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
