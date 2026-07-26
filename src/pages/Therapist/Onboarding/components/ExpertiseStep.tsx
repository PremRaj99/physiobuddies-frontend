import React from 'react';
import { motion } from 'framer-motion';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { cn } from '@/lib/utils';

export const SPECIALIZATIONS = [
  'General',
  'Geriatric',
  'Neuro',
  'Sport',
  'Post Surgical',
  'Ortho',
  'Cardio',
  'Pediatric',
  "Women's Health",
  'Ergonomics',
];

export const EDUCATIONS = [
  'BPT',
  'MPT (Ortho)',
  'MPT (Neuro)',
  'MPT (Sports)',
  'MPT (Cardio)',
  'PhD in Physiotherapy',
  'Diploma in Rehab',
];

export const LANGUAGES = [
  'English',
  'Hindi',
  'Bengali',
  'Marathi',
  'Telugu',
  'Tamil',
  'Gujarati',
  'Urdu',
  'Kannada',
  'Odia',
  'Malayalam',
  'Punjabi',
  'Assamese',
];

interface ExpertiseStepProps {
  formData: {
    specializations: string[];
    education: string[];
    languages: string[];
  };
  toggleArrayItem: (field: 'specializations' | 'education' | 'languages', item: string) => void;
}

export const ExpertiseStep: React.FC<ExpertiseStepProps> = ({ formData, toggleArrayItem }) => {
  return (
    <motion.div
      key="step3"
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
      className="space-y-8"
    >
      <h2 className="text-2xl font-bold text-[#012a4a]">Expertise & Languages</h2>

      <div>
        <LabelWithLayout className="mb-3 block text-base text-[#012a4a]">
          Specializations (Select all that apply) <span className="text-destructive">*</span>
        </LabelWithLayout>
        <div className="flex flex-wrap gap-2">
          {SPECIALIZATIONS.map((spec) => {
            const isSelected = formData.specializations.includes(spec);
            return (
              <Badge
                key={spec}
                variant="outline"
                onClick={() => toggleArrayItem('specializations', spec)}
                className={cn(
                  `cursor-pointer rounded-sm p-4 text-sm transition-all`,
                  isSelected
                    ? 'border-[#014f86] bg-[#014f86] text-white'
                    : 'border-border bg-white text-[#013a63] hover:border-[#a9d6e5]',
                )}
              >
                {spec}
              </Badge>
            );
          })}
        </div>
      </div>

      <Separator />

      <div>
        <LabelWithLayout className="mb-3 block text-base text-[#012a4a]">
          Educational Qualifications <span className="text-destructive">*</span>
        </LabelWithLayout>
        <div className="flex flex-wrap gap-2">
          {EDUCATIONS.map((edu) => {
            const isSelected = formData.education.includes(edu);
            return (
              <Badge
                key={edu}
                variant="outline"
                onClick={() => toggleArrayItem('education', edu)}
                className={cn(
                  `cursor-pointer rounded-sm p-4 text-sm transition-all`,
                  isSelected
                    ? 'border-[#014f86] bg-[#014f86] text-white'
                    : 'border-border bg-white text-[#013a63] hover:border-[#a9d6e5]',
                )}
              >
                {edu}
              </Badge>
            );
          })}
        </div>
      </div>

      <Separator />

      <div>
        <LabelWithLayout className="mb-3 block text-base text-[#012a4a]">
          Languages Spoken <span className="text-destructive">*</span>
        </LabelWithLayout>
        <div className="flex flex-wrap gap-2">
          {LANGUAGES.map((lang) => {
            const isSelected = formData.languages.includes(lang);
            return (
              <Badge
                key={lang}
                variant="outline"
                onClick={() => toggleArrayItem('languages', lang)}
                className={cn(
                  `cursor-pointer rounded-sm p-4 text-sm transition-all`,
                  isSelected
                    ? 'border-[#014f86] bg-[#014f86] text-white'
                    : 'border-border bg-white text-[#013a63] hover:border-[#a9d6e5]',
                )}
              >
                {lang}
              </Badge>
            );
          })}
        </div>
      </div>
    </motion.div>
  );
};

// Helper component since we use standard label styles here
const LabelWithLayout: React.FC<React.LabelHTMLAttributes<HTMLLabelElement>> = ({
  children,
  className,
  ...props
}) => (
  <label className={className} {...props}>
    {children}
  </label>
);
