import React from 'react';
import { motion, type Variants } from 'framer-motion';
import { Card, CardContent } from '@/components/ui/card';

interface BenefitItem {
  title: string;
  desc: string;
  icon: React.ElementType;
}

interface ClinicBenefitsProps {
  benefits: BenefitItem[];
  staggerContainer: Variants;
  fadeUpVariant: Variants;
}

export const ClinicBenefits: React.FC<ClinicBenefitsProps> = ({
  benefits,
  staggerContainer,
  fadeUpVariant,
}) => {
  return (
    <section className="bg-secondary/10 border-border border-y px-4 py-20 md:py-28 lg:px-8">
      <div className="mx-auto max-w-6xl">
        <div className="mb-16 text-center">
          <h2 className="text-3xl font-bold text-[#012a4a] md:text-4xl">
            Exclusive Benefits For Clinic Partners
          </h2>
          <p className="text-muted-foreground mt-4 text-lg">
            Tools and exposure designed to scale your physical practice.
          </p>
        </div>

        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-50px' }}
          className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3"
        >
          {benefits.map((item, idx) => {
            const Icon = item.icon;
            return (
              <motion.div key={idx} variants={fadeUpVariant} whileHover={{ y: -5 }}>
                <Card className="border-border hover:shadow-primary/5 hover:border-primary/20 h-full bg-white shadow-sm transition-shadow hover:shadow-lg">
                  <CardContent className="flex flex-col items-start p-8">
                    <div className="bg-secondary/30 text-primary mb-6 rounded-2xl p-3.5">
                      <Icon className="h-7 w-7" />
                    </div>
                    <h3 className="mb-3 text-xl font-bold text-[#012a4a]">{item.title}</h3>
                    <p className="text-muted-foreground text-sm leading-relaxed">{item.desc}</p>
                  </CardContent>
                </Card>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
};
