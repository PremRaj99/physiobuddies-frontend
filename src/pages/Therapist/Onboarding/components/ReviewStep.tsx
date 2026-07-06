import React from 'react';
import { motion } from 'framer-motion';
import { Badge } from '@/components/ui/badge';

interface ReviewStepProps {
  formData: {
    dob: string;
    experience: string;
    iapId: string;
    affiliation: string;
    displayAddress: string;
    specializations: string[];
    education: string[];
    languages: string[];
    resume: File | null;
    certificates: File[];
  };
}

export const ReviewStep: React.FC<ReviewStepProps> = ({ formData }) => {
  return (
    <motion.div
      key="step5"
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
      className="space-y-6"
    >
      <h2 className="mb-2 text-2xl font-bold text-[#012a4a]">Review Application</h2>
      <p className="text-muted-foreground mb-6">
        Please verify your details before submitting for approval.
      </p>

      <div className="bg-secondary/10 border-border space-y-6 rounded-xl border p-6">
        <div>
          <h4 className="border-border mb-3 border-b pb-2 font-bold text-[#013a63]">
            Personal & Professional
          </h4>
          <div className="grid grid-cols-2 gap-4 text-sm">
            <div>
              <span className="text-muted-foreground">DOB:</span>{' '}
              <span className="font-medium text-[#012a4a]">{formData.dob || 'Not provided'}</span>
            </div>
            <div>
              <span className="text-muted-foreground">Experience:</span>{' '}
              <span className="font-medium text-[#012a4a]">{formData.experience} Years</span>
            </div>
            <div>
              <span className="text-muted-foreground">IAP ID:</span>{' '}
              <span className="font-medium text-[#012a4a]">{formData.iapId || 'Not provided'}</span>
            </div>
            <div>
              <span className="text-muted-foreground">Affiliation:</span>{' '}
              <span className="font-medium text-[#012a4a]">{formData.affiliation || 'None'}</span>
            </div>
            <div className="col-span-2">
              <span className="text-muted-foreground">Address:</span>{' '}
              <span className="font-medium text-[#012a4a]">
                {formData.displayAddress || 'Not provided'}
              </span>
            </div>
          </div>
        </div>

        <div>
          <h4 className="border-border mb-3 border-b pb-2 font-bold text-[#013a63]">Expertise</h4>
          <div className="space-y-3 text-sm">
            <div>
              <span className="text-muted-foreground mb-1 block">Specializations:</span>
              <div className="flex flex-wrap gap-1">
                {formData.specializations.length
                  ? formData.specializations.map((s) => (
                      <Badge key={s} variant="outline" className="bg-white">
                        {s}
                      </Badge>
                    ))
                  : 'None selected'}
              </div>
            </div>
            <div>
              <span className="text-muted-foreground mb-1 block">Education:</span>
              <div className="flex flex-wrap gap-1">
                {formData.education.length
                  ? formData.education.map((e) => (
                      <Badge key={e} variant="outline" className="bg-white">
                        {e}
                      </Badge>
                    ))
                  : 'None selected'}
              </div>
            </div>
            <div>
              <span className="text-muted-foreground mb-1 block">Languages:</span>
              <div className="flex flex-wrap gap-1">
                {formData.languages.length
                  ? formData.languages.map((l) => (
                      <Badge key={l} variant="outline" className="bg-white">
                        {l}
                      </Badge>
                    ))
                  : 'None selected'}
              </div>
            </div>
          </div>
        </div>

        <div>
          <h4 className="border-border mb-3 border-b pb-2 font-bold text-[#013a63]">
            Uploaded Documents
          </h4>
          <div className="space-y-2 text-sm">
            <div>
              <span className="text-muted-foreground">Resume:</span>{' '}
              <span className="font-medium text-[#012a4a]">
                {formData.resume ? formData.resume.name : 'Not uploaded'}
              </span>
            </div>
            <div>
              <span className="text-muted-foreground">Certificates:</span>{' '}
              <span className="font-medium text-[#012a4a]">
                {formData.certificates.length
                  ? formData.certificates.map((c) => c.name).join(', ')
                  : 'None uploaded'}
              </span>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};
