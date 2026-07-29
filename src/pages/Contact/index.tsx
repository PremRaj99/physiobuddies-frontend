import { motion, type Variants } from 'framer-motion';
import Footer from '@/components/custom/footer/footer';
import PageHeader from '@/components/custom/page-header/page-header';
import AuraMedicalCTA from '@/components/custom/cta/cta';
import { useContact } from './hooks/useContact';
import { ContactInfoCard } from './components/ContactInfoCard';
import { ContactForm } from './components/ContactForm';

export default function ContactUs() {
  const { formData, isSubmitted, isSubmitting, handleChange, handleSelectChange, handleSubmit } =
    useContact();

  const fadeUpVariant: Variants = {
    hidden: { opacity: 0, y: 15 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: 'easeOut' } },
  };

  return (
    <div className="bg-background min-h-body flex flex-col font-sans">
      <PageHeader
        heading={
          <>
            <span className="text-[#a9d6e5]">Contact</span> Our Clinical Team
          </>
        }
        subheading="Support for your journey to recovery."
      />

      <div className="grow bg-white px-4 py-10 md:px-8 lg:py-12">
        <motion.div
          initial="hidden"
          animate="visible"
          className="mx-auto grid max-w-6xl grid-cols-1 items-start gap-10 lg:grid-cols-2 lg:gap-16"
        >
          <ContactInfoCard fadeUpVariant={fadeUpVariant} />
          <ContactForm
            formData={formData}
            isSubmitted={isSubmitted}
            isSubmitting={isSubmitting}
            onChange={handleChange}
            onSelectChange={handleSelectChange}
            onSubmit={handleSubmit}
            fadeUpVariant={fadeUpVariant}
          />
        </motion.div>
      </div>
      <AuraMedicalCTA />
      <Footer />
    </div>
  );
}
