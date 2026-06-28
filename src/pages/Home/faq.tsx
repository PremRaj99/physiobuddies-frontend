import { useState } from 'react';
import { motion, AnimatePresence, type Variants } from 'framer-motion';
import { Button } from '@/components/ui/button';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { ChevronDown } from 'lucide-react';

// Assuming this comes from your data file
import { faqData } from '@/data/dummy/faq';

export default function FAQ() {
  const [showAll, setShowAll] = useState(false);
  const initialDisplayCount = 5;

  // Determine which FAQs to show based on state
  const displayedFaqs = showAll ? faqData : faqData.slice(0, initialDisplayCount);

  // Framer Motion variants for smooth list expansion
  const itemVariants: Variants = {
    hidden: { opacity: 0, height: 0, y: -10 },
    visible: {
      opacity: 1,
      height: 'auto',
      y: 0,
      transition: { duration: 0.3, ease: 'easeOut' },
    },
    exit: {
      opacity: 0,
      height: 0,
      y: -10,
      transition: { duration: 0.2, ease: 'easeIn' },
    },
  };

  return (
    <section className="bg-background min-h-body px-4 py-8 md:px-8 md:py-16">
      <div className="mx-auto flex max-w-3xl flex-col items-center">
        {/* Header Area */}
        <div className="mb-8 space-y-4 text-center lg:mb-16">
          <h2 className="text-3xl font-bold tracking-tight text-[#012a4a] md:text-4xl">
            Frequently Asked <span className="text-primary">Questions</span>
          </h2>
          <p className="mx-auto max-w-xl text-xs font-medium text-[#012a4a]/70 lg:text-sm">
            Find answers to common questions about our clinical services, consultations, and
            personalized care plans.
          </p>
        </div>

        {/* Accordion List */}
        <Accordion type="single" collapsible className="w-full space-y-4">
          <AnimatePresence initial={false}>
            {displayedFaqs.map((faq, index) => (
              <motion.div
                key={index}
                variants={itemVariants}
                initial="hidden"
                animate="visible"
                exit="exit"
                layout
              >
                <AccordionItem
                  value={`item-${index}`}
                  // Removing the default bottom border to style it as a floating card
                  className="border-border overflow-hidden rounded-2xl border border-b bg-white px-6 shadow-sm"
                >
                  <AccordionTrigger className="hover:text-primary py-5 text-left text-sm font-medium text-[#012a4a] transition-colors hover:no-underline md:text-base [&[data-state=open]>svg]:rotate-180">
                    {faq.question}
                  </AccordionTrigger>
                  <AccordionContent className="text-muted-foreground pr-6 pb-5 text-xs leading-relaxed">
                    {faq.answer}
                  </AccordionContent>
                </AccordionItem>
              </motion.div>
            ))}
          </AnimatePresence>
        </Accordion>

        {/* Toggle Button */}
        {faqData.length > initialDisplayCount && (
          <motion.div layout className="mt-8">
            <Button
              variant="outline"
              onClick={() => setShowAll(!showAll)}
              className="border-primary/20 hover:bg-secondary/30 hover:text-primary text-[#014f86] shadow-sm transition-all"
            >
              {showAll ? 'Show Less' : 'Read More FAQs'}
              <ChevronDown
                className={`ml-2 h-4 w-4 transition-transform duration-300 ${showAll ? 'rotate-180' : ''}`}
              />
            </Button>
          </motion.div>
        )}
      </div>
    </section>
  );
}
