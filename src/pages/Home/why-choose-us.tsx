'use client';

import React from 'react';
import { Link } from 'react-router-dom';
import { motion, type Variants } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { whyChooseUsData } from '@/data/dummy/whyChooseUs';

// ==========================================
// 1. The Compact Card Component
// ==========================================
interface WhyChooseUsCardProps {
  icon: React.ElementType;
  title: string;
  desc: string;
}

const WhyChooseUsCard = ({ icon: Icon, title, desc }: WhyChooseUsCardProps) => {
  // Subtle animation variants for individual cards
  const itemVariants: Variants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5, ease: 'easeOut' },
    },
  };

  return (
    <motion.div
      variants={itemVariants}
      whileHover={{ y: -4 }}
      className="group border-border flex h-full flex-col rounded-[20px] border bg-white p-5 shadow-sm transition-all duration-300 hover:shadow-md"
    >
      {/* Icon Header */}
      <div className="mb-3 flex items-center gap-3">
        <div className="bg-secondary/40 text-primary group-hover:bg-primary rounded-xl p-2.5 transition-colors duration-300 group-hover:text-white">
          <Icon className="h-5 w-5" />
        </div>
        <h3 className="text-sm leading-tight font-bold text-[#012a4a] md:text-base">{title}</h3>
      </div>

      {/* Description */}
      <p className="text-muted-foreground grow text-xs leading-relaxed md:text-sm">{desc}</p>

      {/* Subtle Micro-Interaction Link */}
      <div className="border-border/50 mt-4 border-t pt-3">
        <Link
          to="/about"
          className="group/link inline-flex items-center text-[11px] font-bold tracking-wider text-[#014f86] uppercase transition-colors hover:text-[#013a63]"
        >
          Learn More
          <ArrowRight className="ml-1 h-3 w-3 transition-transform duration-300 group-hover/link:translate-x-1" />
        </Link>
      </div>
    </motion.div>
  );
};

// ==========================================
// 2. The Main Container Component
// ==========================================
export default function WhyChooseUs() {
  // Stagger animation container
  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1, // Smooth cascade effect
      },
    },
  };

  const headerVariants: Variants = {
    hidden: { opacity: 0, y: -10 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
  };

  return (
    <section className="bg-background min-h-body px-6 py-8 md:px-12 lg:px-24">
      <div className="mx-auto max-w-6xl">
        {/* Header Area */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-50px' }}
          variants={headerVariants}
          className="mb-8 space-y-4 text-center lg:mb-16"
        >
          <h2 className="text-3xl font-bold tracking-tight text-[#012a4a] md:text-4xl">
            Why <span className="text-primary">Choose Us</span>
          </h2>
          <p className="mx-auto max-w-xl text-xs font-medium text-[#012a4a]/70 lg:text-sm">
            We combine clinical excellence with empathetic care to ensure your recovery is safe,
            effective, and entirely focused on you.
          </p>
        </motion.div>

        {/* Responsive Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-50px' }}
          className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:gap-6 lg:grid-cols-3"
        >
          {whyChooseUsData.map((item, index) => (
            <WhyChooseUsCard key={index} icon={item.icon} title={item.title} desc={item.desc} />
          ))}
        </motion.div>
      </div>
    </section>
  );
}
