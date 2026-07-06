import React from 'react';
import { motion } from 'framer-motion';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';

interface ProfessionalStepProps {
  formData: {
    experience: string;
    iapId: string;
    affiliation: string;
  };
  updateField: (field: string, value: string) => void;
}

export const ProfessionalStep: React.FC<ProfessionalStepProps> = ({ formData, updateField }) => {
  return (
    <motion.div
      key="step2"
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
      className="space-y-6"
    >
      <h2 className="mb-6 text-2xl font-bold text-[#012a4a]">Professional Details</h2>

      <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
        <div className="space-y-2">
          <Label className="text-[#012a4a]">Years of Experience</Label>
          <Input
            type="number"
            placeholder="e.g. 5"
            value={formData.experience}
            onChange={(e) => updateField('experience', e.target.value)}
            className="focus-visible:ring-[#014f86]"
          />
        </div>

        <div className="space-y-2">
          <Label className="text-[#012a4a]">IAP Registration ID</Label>
          <Input
            placeholder="Enter your valid IAP ID"
            value={formData.iapId}
            onChange={(e) => updateField('iapId', e.target.value)}
            className="focus-visible:ring-[#014f86]"
          />
        </div>

        <div className="space-y-2 md:col-span-2">
          <Label className="text-[#012a4a]">Current Affiliation (Clinic / Hospital Name)</Label>
          <Input
            placeholder="Where do you currently practice?"
            value={formData.affiliation}
            onChange={(e) => updateField('affiliation', e.target.value)}
            className="focus-visible:ring-[#014f86]"
          />
        </div>
      </div>
    </motion.div>
  );
};
