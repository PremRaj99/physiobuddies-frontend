'use client';

import { AnimatePresence, motion } from 'framer-motion';
import { Building2, ChevronRight, FileText, Home, MonitorSmartphone, User } from 'lucide-react';

import PageHeader from '@/components/custom/page-header/page-header';
import { Card } from '@/components/ui/card';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import ActionCTA from '@/components/custom/cta/cta';
import Footer from '@/components/custom/footer/footer';

// --- Sub-Components for Typography ---
const SectionTitle = ({ children }: { children: React.ReactNode }) => (
  <h2 className="border-border mt-8 mb-4 flex items-center gap-2 border-b pb-2 text-xl font-bold text-[#012a4a]">
    <ChevronRight className="h-5 w-5 text-[#014f86]" /> {children}
  </h2>
);

const SubTitle = ({ children }: { children: React.ReactNode }) => (
  <h4 className="mt-6 mb-2 text-base font-semibold text-[#013a63]">{children}</h4>
);

const Paragraph = ({ children }: { children: React.ReactNode }) => (
  <p className="mb-4 text-sm leading-relaxed text-[#012a4a]/80">{children}</p>
);

const List = ({ children }: { children: React.ReactNode }) => (
  <ul className="mb-6 ml-1 space-y-2">{children}</ul>
);

const ListItem = ({ children }: { children: React.ReactNode }) => (
  <li className="flex items-start gap-2 text-sm leading-relaxed text-[#012a4a]/80">
    <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-[#014f86]" />
    <span>{children}</span>
  </li>
);

// --- Main Content Components ---

const GeneralTerms = () => (
  <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.4 }}>
    <div className="mb-8">
      <h1 className="mb-2 text-3xl font-bold text-[#012a4a]">General Terms & Conditions</h1>
      <p className="text-muted-foreground">Last updated: May 2026</p>
    </div>

    <SectionTitle>1. Introduction</SectionTitle>
    <Paragraph>
      Welcome to Physiobuddies! These Terms and Conditions ("Terms") govern your use of our website,
      mobile app, and all related services ("Services"). By accessing or using our Services, you
      agree to be bound by these Terms. Please read them carefully. If you do not agree, please
      refrain from using our Services.
    </Paragraph>

    <SectionTitle>2. Definitions</SectionTitle>
    <List>
      <ListItem>
        "Physiobuddies," "we," "our," or "us" refers to the entity providing the Services.
      </ListItem>
      <ListItem>
        "User" refers to any individual or entity using our Services, including patients,
        physiotherapists, and clinics.
      </ListItem>
      <ListItem>
        "Physiotherapist" refers to a licensed professional providing physiotherapy services through
        our platform.
      </ListItem>
      <ListItem>"Patient" refers to an individual seeking physiotherapy treatment.</ListItem>
      <ListItem>
        "Services" includes clinic-based, home visit, and online physiotherapy consultations, along
        with any related tools and resources provided on the platform.
      </ListItem>
    </List>

    <SectionTitle>3. Eligibility</SectionTitle>
    <List>
      <ListItem>
        Users must be at least 18 years of age and legally able to enter into binding contracts.
      </ListItem>
      <ListItem>
        Physiotherapists must hold valid credentials and licenses as required by law.
      </ListItem>
      <ListItem>Clinics and partners must comply with local regulatory requirements.</ListItem>
    </List>

    <SectionTitle>4. Registration and Account</SectionTitle>
    <List>
      <ListItem>
        To use our Services, you must create an account by providing accurate and complete
        information.
      </ListItem>
      <ListItem>
        Physiotherapists are required to complete our registration process, which includes a
        verification step and payment of a nominal registration fee.
      </ListItem>
      <ListItem>
        You are responsible for maintaining the confidentiality of your account details and for all
        activities that occur under your account.
      </ListItem>
    </List>

    <SectionTitle>5. Payment Terms</SectionTitle>
    <SubTitle>5.1. Registration Fee</SubTitle>
    <List>
      <ListItem>
        All physiotherapists applying to join the Physiobuddies network must pay a non-refundable
        registration fee of ₹200. This fee helps ensure that only serious and committed
        professionals join our platform.
      </ListItem>
      <ListItem>
        Upon payment, you will receive an invitation link to join our exclusive WhatsApp community,
        where further information and next steps (including interview scheduling) will be provided.
      </ListItem>
    </List>
    <SubTitle>5.2. Onboarding Fee</SubTitle>
    <List>
      <ListItem>
        After the initial screening and a one-on-one interview process, selected physiotherapists
        will be required to pay an onboarding fee of ₹1500. As a token of appreciation for your
        commitment, a ₹200 coupon will be applied, reducing the final payable amount to ₹1300.
      </ListItem>
      <ListItem>
        Payment for both fees is processed securely through our designated payment gateway. All
        payments are final and subject to our refund policy as detailed below.
      </ListItem>
    </List>
    <SubTitle>5.3. Refund Policy</SubTitle>
    <List>
      <ListItem>The ₹200 registration fee is non-refundable.</ListItem>
      <ListItem>
        Onboarding fees will only be processed once the interview process is completed and the
        candidate is officially accepted. Refunds, if any, will be handled on a case-by-case basis
        as outlined in our refund policy.
      </ListItem>
    </List>

    <SectionTitle>6. Service Delivery</SectionTitle>
    <List>
      <ListItem>
        Appointment Booking: Patients can schedule appointments through our platform for clinic,
        home visit, or online consultations. All bookings are subject to availability.
      </ListItem>
      <ListItem>
        Consultation and Treatment: Our network of verified physiotherapists will provide
        personalized treatment plans based on patient needs. We are not responsible for the direct
        treatment outcome; all treatment decisions remain with the healthcare provider and patient.
      </ListItem>
      <ListItem>
        Cancellation and Rescheduling: Users and physiotherapists must adhere to our cancellation
        policies, including potential fees for late cancellations or no-shows, as detailed in our
        Appointment Policy.
      </ListItem>
    </List>

    <SectionTitle>14. Governing Law and Dispute Resolution</SectionTitle>
    <List>
      <ListItem>
        These Terms shall be governed by and construed in accordance with the laws of India.
      </ListItem>
      <ListItem>
        Any disputes arising out of these Terms or your use of our Services shall be resolved
        through arbitration or in the courts of Greater Noida, India.
      </ListItem>
    </List>

    <SectionTitle>16. Contact Information</SectionTitle>
    <List>
      <ListItem>
        If you have any questions or concerns regarding these Terms, please contact us at:
      </ListItem>
      <ListItem>Email: physiobuddies.in@gmail.com</ListItem>
      <ListItem>Phone: +91 8882286214</ListItem>
      <ListItem>Address: Pi-1, Gr. Noida</ListItem>
    </List>
  </motion.div>
);

const PatientTerms = () => (
  <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.4 }}>
    <div className="mb-8">
      <h1 className="mb-2 text-3xl font-bold text-[#012a4a]">Terms & Conditions for Patients</h1>
    </div>

    <SectionTitle>1. Introduction</SectionTitle>
    <Paragraph>
      These terms and conditions govern the use of the Physiobuddies platform for patients seeking
      physiotherapy services. By registering on Physiobuddies, patients agree to these terms and
      conditions, which outline the rights, responsibilities, and obligations of both patients and
      the platform.
    </Paragraph>

    <SectionTitle>2. Account Registration</SectionTitle>
    <SubTitle>2.1 Eligibility</SubTitle>
    <List>
      <ListItem>
        To register on Physiobuddies, patients must be 18 years of age or older. If under 18, the
        account must be registered by a parent or legal guardian who will be responsible for all
        interactions and payments on behalf of the minor.
      </ListItem>
      <ListItem>
        Patients are required to provide accurate and up-to-date personal information during
        registration, including full name, contact details, address and medical information
        necessary for treatment.
      </ListItem>
    </List>
    <SubTitle>2.2 Account Security</SubTitle>
    <List>
      <ListItem>
        Patients are responsible for maintaining the confidentiality of their login credentials and
        must notify Physiobuddies immediately in case of any unauthorized use of their account.
      </ListItem>
      <ListItem>
        Sharing of accounts is strictly prohibited. Each patient must have their individual account
        for service booking and management.
      </ListItem>
    </List>

    <SectionTitle>3. Booking and Scheduling</SectionTitle>
    <SubTitle>3.1 Real-Time Booking</SubTitle>
    <List>
      <ListItem>
        Patients can book physiotherapy sessions in real-time based on the availability of
        physiotherapists listed on the Physiobuddies platform.
      </ListItem>
      <ListItem>
        Patients are required to provide detailed information about their health condition and any
        medical history necessary for the physiotherapist to understand and provide appropriate
        care.
      </ListItem>
    </List>
    <SubTitle>3.2 Cancellations and No-Shows</SubTitle>
    <List>
      <ListItem>
        Patients can cancel or reschedule appointments via the app or website. Cancellations must be
        made at least 6 hours before the scheduled session.
      </ListItem>
      <ListItem>
        Late cancellations or frequent no-shows may result in penalties or restrictions on future
        bookings.
      </ListItem>
      <ListItem>
        If a physiotherapist cancels a session, patients will be given the option to reschedule with
        the same physiotherapist or book a new appointment with another available professional.
      </ListItem>
    </List>

    <SectionTitle>5. Patient Responsibilities</SectionTitle>
    <SubTitle>5.4 Verification of Physiobuddies Personnel</SubTitle>
    <Paragraph>
      Before treatment patients are required to verify the identity of the Physiobuddies
      professional arriving at their home by matching the individual with the photo and details
      provided on our website or app. For your safety, ensure that the physiotherapist displays
      proper identification and matches the profile information. If you notice any discrepancies,
      please contact us immediately to confirm the legitimacy of the personnel before proceeding
      with treatment. Physiobuddies is not responsible for any issues arising from failure to verify
      the therapist’s identity.
    </Paragraph>
  </motion.div>
);

const HomeVisitTerms = () => (
  <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.4 }}>
    <div className="mb-8">
      <h1 className="mb-2 text-3xl font-bold text-[#012a4a]">Terms for Home Visit Therapists</h1>
    </div>

    <SectionTitle>1. Introduction</SectionTitle>
    <Paragraph>
      Physiobuddies is a service-based company that connects qualified physiotherapists with
      patients seeking treatment in the comfort of their homes. As a Physiotherapist registered with
      Physiobuddies, you agree to the following terms and conditions, which are designed to maintain
      the highest level of service, ensure mutual respect between professionals and patients, and
      provide clear guidelines on working with our platform.
    </Paragraph>

    <SectionTitle>2. Eligibility and Requirements</SectionTitle>
    <SubTitle>2.1 Qualifications</SubTitle>
    <List>
      <ListItem>
        Physiotherapists must hold a valid Bachelor’s or master's degree in Physiotherapy (BPT/MPT)
        from an institution recognized by the respective national or state physiotherapy council.
      </ListItem>
      <ListItem>
        You must be a licensed physiotherapist, registered with a state or national physiotherapy
        council, and provide proof of registration.
      </ListItem>
    </List>

    <SectionTitle>5. Payment Structure and Commission</SectionTitle>
    <SubTitle>5.1 Service Fees and Commission</SubTitle>
    <List>
      <ListItem>
        Physiotherapists will earn per session completed. The total fee for the service will be
        agreed upon in advance and displayed at the time of booking.
      </ListItem>
      <ListItem>
        Physiobuddies will retain a 18% commission from each service provided. This commission
        covers platform usage, marketing, customer service, and other operational costs.
      </ListItem>
    </List>

    <SectionTitle>11. Non-Compete Agreement</SectionTitle>
    <Paragraph>
      Physiotherapists agree not to solicit Physiobuddies patients for private services outside the
      platform for the duration of their engagement and for 6 months after termination of their
      contract.
    </Paragraph>
  </motion.div>
);

const ClinicTerms = () => (
  <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.4 }}>
    <div className="mb-8">
      <h1 className="mb-2 text-3xl font-bold text-[#012a4a]">Terms for Partner Clinics</h1>
    </div>

    <SectionTitle>1. Introduction</SectionTitle>
    <Paragraph>
      These terms and conditions govern the participation of physiotherapy clinics on the
      Physiobuddies platform. By registering, clinics agree to the following terms regarding
      subscription fees, commissions, service quality, and responsibilities.
    </Paragraph>

    <SectionTitle>3. Subscription-Based Model</SectionTitle>
    <SubTitle>3.1 Subscription Fees</SubTitle>
    <List>
      <ListItem>
        Clinics are required to choose from a range of subscription plans offered by Physiobuddies.
        The subscription grants the clinic access to the platform, enabling patient referrals,
        profile listing, and marketing support.
      </ListItem>
      <ListItem>
        Subscription fees will be billed on a monthly or annual basis. Non-payment of subscription
        fees will result in the temporary suspension of the clinic’s profile until payment is made.
      </ListItem>
    </List>
    <SubTitle>3.2 Commission Structure</SubTitle>
    <List>
      <ListItem>
        In addition to the subscription fee, Physiobuddies will charge 18% commission on every
        successful patient visit referred through the platform.
      </ListItem>
      <ListItem>
        The commission will be deducted from the total fee paid by the patient for each session.
      </ListItem>
    </List>
  </motion.div>
);

const OnlineTerms = () => (
  <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.4 }}>
    <div className="mb-8">
      <h1 className="mb-2 text-3xl font-bold text-[#012a4a]">Terms for Online Services</h1>
    </div>

    <SectionTitle>1. Introduction</SectionTitle>
    <Paragraph>
      Physiobuddies offers online physiotherapy services that connect qualified physiotherapists
      with patients via our secure digital platform. By accessing or providing online sessions
      through Physiobuddies, both physiotherapists and patients agree to abide by these terms and
      conditions, which are designed to ensure high-quality care, maintain professional standards,
      and facilitate smooth digital interactions.
    </Paragraph>

    <SectionTitle>3. Service Standards and Professional Conduct</SectionTitle>
    <List>
      <ListItem>
        Physiotherapists agree to deliver patient-centered, evidence-based care via the online
        platform.
      </ListItem>
      <ListItem>
        You must adhere to the clinical protocols and guidelines provided by Physiobuddies and
        tailor your virtual treatment plans to meet individual patient needs.
      </ListItem>
      <ListItem>
        Professionalism is paramount: maintain punctuality, use appropriate attire for video
        sessions, and communicate respectfully with patients.
      </ListItem>
      <ListItem>
        Ethical standards as outlined by the Indian Association of Physiotherapists (IAP) or the
        relevant governing body must be strictly followed.
      </ListItem>
    </List>
  </motion.div>
);

// --- Main Page Wrapper ---

export default function TermsPage() {
  return (
    <div className="min-h-screen bg-[#f8fbfa] font-sans">
      {/* Header Decorator */}

      <PageHeader
        heading="Legal & Policies"
        subheading="Please read these terms carefully before using our services. They outline the rights, responsibilities, and protections for all members of the Physiobuddies community."
      />

      <main className="relative z-20 mx-auto -mt-8 mb-10 max-w-6xl px-4 sm:px-6">
        <Card className="border-border overflow-hidden bg-white py-0 shadow-xl shadow-[#012a4a]/5">
          <Tabs defaultValue="general" className="flex flex-col md:flex-row!">
            {/* Sidebar Navigation */}
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

              {/* <div className="border-border mt-8 rounded-xl border bg-white p-4">
                <ShieldCheck className="text-success mb-2 h-6 w-6" />
                <h4 className="mb-1 text-sm font-bold text-[#012a4a]">Secure Platform</h4>
                <p className="text-muted-foreground text-xs leading-relaxed">
                  Your data privacy is our top priority. Protected under the Indian IT Act, 2000.
                </p>
              </div> */}
            </div>

            {/* Document Content Area */}
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
