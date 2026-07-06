import React from 'react';
import { motion } from 'framer-motion';
import { Info, MapPin, UploadCloud } from 'lucide-react';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';

interface PersonalStepProps {
  formData: {
    dob: string;
    displayAddress: string;
    about: string;
  };
  imagePreview: string;
  handleImageChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  updateField: (field: string, value: string | File | null) => void;
  setImagePreview: React.Dispatch<React.SetStateAction<string>>;
}

export const PersonalStep: React.FC<PersonalStepProps> = ({
  formData,
  imagePreview,
  handleImageChange,
  updateField,
  setImagePreview,
}) => {
  return (
    <motion.div
      key="step1"
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
      className="space-y-6"
    >
      <h2 className="mb-6 text-2xl font-bold text-[#012a4a]">Personal Information</h2>

      <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
        <div className="space-y-2 md:col-span-2">
          <div className="flex items-center justify-between">
            <Label>Profile Image</Label>
            <span className="bg-secondary/50 flex items-center gap-1 rounded px-2 py-0.5 text-[10px] text-[#014f86]">
              <Info className="h-3 w-3" /> Can update later
            </span>
          </div>
          <input
            type="file"
            id="profile-image-input"
            className="hidden"
            accept="image/*"
            onChange={handleImageChange}
          />
          <label
            htmlFor="profile-image-input"
            className="border-border hover:bg-secondary/10 block cursor-pointer rounded-xl border-2 border-dashed p-6 text-center transition-colors"
          >
            {imagePreview ? (
              <div className="relative mx-auto h-24 w-24">
                <img
                  src={imagePreview}
                  alt="Profile Preview"
                  className="h-full w-full rounded-full object-cover"
                />
                <button
                  type="button"
                  onClick={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    updateField('image', null);
                    setImagePreview('');
                  }}
                  className="bg-destructive absolute -top-1 -right-1 flex h-6 w-6 items-center justify-center rounded-full text-white shadow-md hover:bg-red-600"
                >
                  &times;
                </button>
              </div>
            ) : (
              <>
                <UploadCloud className="text-muted-foreground mx-auto mb-2 h-8 w-8" />
                <p className="text-sm font-medium text-[#013a63]">Click to upload photo</p>
                <p className="text-muted-foreground mt-1 text-xs">JPG, PNG up to 5MB</p>
              </>
            )}
          </label>
        </div>

        <div className="space-y-2">
          <Label className="text-[#012a4a]">Date of Birth</Label>
          <Input
            type="date"
            value={formData.dob}
            onChange={(e) => updateField('dob', e.target.value)}
            className="focus-visible:ring-[#014f86]"
          />
        </div>

        <div className="space-y-2">
          <Label className="text-[#012a4a]">Display Address (Public)</Label>
          <div className="relative">
            <MapPin className="text-muted-foreground absolute top-2.5 left-3 h-4 w-4" />
            <Input
              placeholder="e.g. Wellness Clinic, Sector 14, Delhi"
              value={formData.displayAddress}
              onChange={(e) => updateField('displayAddress', e.target.value)}
              className="pl-9 focus-visible:ring-[#014f86]"
            />
          </div>
        </div>

        <div className="space-y-2 md:col-span-2">
          <div className="flex items-center justify-between">
            <Label className="text-[#012a4a]">About Me</Label>
            <span className="bg-secondary/50 flex items-center gap-1 rounded px-2 py-0.5 text-[10px] text-[#014f86]">
              <Info className="h-3 w-3" /> Can update later
            </span>
          </div>
          <Textarea
            placeholder="Tell patients about your approach to physiotherapy..."
            value={formData.about}
            onChange={(e) => updateField('about', e.target.value)}
            className="min-h-25 focus-visible:ring-[#014f86]"
          />
        </div>
      </div>
    </motion.div>
  );
};
