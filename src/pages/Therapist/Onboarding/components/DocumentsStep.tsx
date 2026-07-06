import React from 'react';
import { motion } from 'framer-motion';
import { UploadCloud } from 'lucide-react';
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';
import { toast } from 'sonner';

export interface OnboardingFormData {
  image: File | null;
  dob: string;
  displayAddress: string;
  about: string;
  experience: string;
  iapId: string;
  affiliation: string;
  specializations: string[];
  education: string[];
  languages: string[];
  resume: File | null;
  certificates: File[];
}

interface DocumentsStepProps {
  formData: {
    resume: File | null;
    certificates: File[];
  };
  updateField: (field: string, value: File | null) => void;
  setFormData: React.Dispatch<React.SetStateAction<OnboardingFormData>>;
}

export const DocumentsStep: React.FC<DocumentsStepProps> = ({
  formData,
  updateField,
  setFormData,
}) => {
  return (
    <motion.div
      key="step4"
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
      className="space-y-6"
    >
      <h2 className="mb-6 text-2xl font-bold text-[#012a4a]">Verification Documents</h2>

      <div className="space-y-6">
        <div className="space-y-2">
          <Label className="text-[#012a4a]">Upload Resume (CV)</Label>
          <input
            type="file"
            id="resume-input"
            className="hidden"
            accept=".pdf,.doc,.docx"
            onChange={(e) => {
              const file = e.target.files?.[0];
              if (file) {
                if (file.size > 5 * 1024 * 1024) {
                  toast.error('Resume size must be less than 5MB');
                  return;
                }
                updateField('resume', file);
              }
            }}
          />
          <label
            htmlFor="resume-input"
            className="bg-secondary/10 hover:bg-secondary/20 block cursor-pointer rounded-xl border-2 border-dashed border-[#a9d6e5] p-8 text-center transition-colors"
          >
            {formData.resume ? (
              <div className="flex items-center justify-between rounded-lg border bg-white p-3">
                <span className="max-w-[80%] truncate text-sm font-medium text-[#012a4a]">
                  {formData.resume.name}
                </span>
                <button
                  type="button"
                  onClick={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    updateField('resume', null);
                  }}
                  className="text-destructive text-sm font-bold hover:text-red-600"
                >
                  Remove
                </button>
              </div>
            ) : (
              <>
                <UploadCloud className="mx-auto mb-2 h-8 w-8 text-[#014f86]" />
                <p className="text-sm font-medium text-[#013a63]">Click or drag file to upload</p>
                <p className="text-muted-foreground mt-1 text-xs">PDF, DOCX up to 5MB</p>
              </>
            )}
          </label>
        </div>

        <Separator />

        <div className="space-y-2">
          <Label className="text-[#012a4a]">Professional Certificates & Licenses</Label>
          <p className="text-muted-foreground mb-2 text-xs">
            Upload your degree, IAP registration certificate, etc.
          </p>
          <input
            type="file"
            id="certificates-input"
            className="hidden"
            multiple
            accept="image/*,.pdf"
            onChange={(e) => {
              const files = Array.from(e.target.files || []);
              const validFiles = files.filter((f) => f.size <= 5 * 1024 * 1024);
              if (validFiles.length < files.length) {
                toast.error('Some files exceeded the 5MB size limit and were skipped.');
              }
              setFormData((prev: OnboardingFormData) => ({
                ...prev,
                certificates: [...prev.certificates, ...validFiles],
              }));
            }}
          />
          <label
            htmlFor="certificates-input"
            className="border-border block cursor-pointer rounded-xl border-2 border-dashed bg-gray-50 p-8 text-center transition-colors hover:bg-gray-100"
          >
            <UploadCloud className="text-muted-foreground mx-auto mb-2 h-8 w-8" />
            <p className="text-sm font-medium text-[#013a63]">Click to upload multiple files</p>
            <p className="text-muted-foreground mt-1 text-xs">JPG, PNG, PDF up to 5MB per file</p>
          </label>

          {formData.certificates.length > 0 && (
            <div className="mt-4 space-y-2">
              {formData.certificates.map((cert, index) => (
                <div
                  key={index}
                  className="flex items-center justify-between rounded-lg border bg-white p-3 text-sm"
                >
                  <span className="max-w-[80%] truncate font-medium text-[#012a4a]">
                    {cert.name}
                  </span>
                  <button
                    type="button"
                    onClick={() => {
                      setFormData((prev: OnboardingFormData) => ({
                        ...prev,
                        certificates: prev.certificates.filter((_: File, i: number) => i !== index),
                      }));
                    }}
                    className="text-destructive font-bold hover:text-red-600"
                  >
                    Remove
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </motion.div>
  );
};
