import React from 'react';
import { motion } from 'framer-motion';
import { Camera, Info, MapPin, Navigation } from 'lucide-react';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Alert } from '@/components/ui/alert';
import { Textarea } from '@/components/ui/textarea';

interface ProfileLocationStepProps {
  formData: {
    about: string;
    address: string;
    lat: string;
    lng: string;
  };
  imagePreview: string;
  isDetectingLocation: boolean;
  handleImageChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  updateField: (field: string, value: string) => void;
  detectLocation: () => void;
}

export const ProfileLocationStep: React.FC<ProfileLocationStepProps> = ({
  formData,
  imagePreview,
  isDetectingLocation,
  handleImageChange,
  updateField,
  detectLocation,
}) => {
  return (
    <motion.div
      key="step1"
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
      className="space-y-8"
    >
      <div>
        <h2 className="mb-2 text-2xl font-bold text-[#012a4a]">Profile & Location</h2>
        <p className="text-muted-foreground mb-6">
          Ensure your practice area is accurately mapped.
        </p>

        <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
          <div className="space-y-3 md:col-span-2">
            <div className="flex items-center justify-between">
              <Label className="font-bold text-[#012a4a]">Profile Image</Label>
              <span className="bg-secondary/50 flex items-center gap-1 rounded px-2 py-0.5 text-[10px] text-[#014f86]">
                <Info className="h-3 w-3" /> Can update later
              </span>
            </div>
            <input
              type="file"
              id="final-profile-image-input"
              className="hidden"
              accept="image/*"
              onChange={handleImageChange}
            />
            <label
              htmlFor="final-profile-image-input"
              className="hover:bg-secondary/10 block cursor-pointer rounded-xl border-2 border-dashed border-[#a9d6e5] bg-[#f8fbfa] p-8 text-center transition-colors"
            >
              {imagePreview ? (
                <div className="relative mx-auto h-24 w-24">
                  <img
                    src={imagePreview}
                    alt="Profile Preview"
                    className="h-full w-full rounded-full object-cover"
                  />
                  <div className="bg-primary/80 absolute right-0 bottom-0 rounded-full bg-[#014f86] p-1 text-white shadow-md">
                    <Camera className="size-4" />
                  </div>
                </div>
              ) : (
                <>
                  <Camera className="mx-auto mb-2 h-8 w-8 text-[#014f86]" />
                  <p className="text-sm font-medium text-[#013a63]">Upload Professional Photo</p>
                </>
              )}
            </label>
          </div>

          <div className="space-y-3 md:col-span-2">
            <div className="flex items-center justify-between">
              <Label className="font-bold text-[#012a4a]">About Me</Label>
              <span className="bg-secondary/50 flex items-center gap-1 rounded px-2 py-0.5 text-[10px] text-[#014f86]">
                <Info className="h-3 w-3" /> Can update later
              </span>
            </div>
            <Textarea
              placeholder="Write a brief introduction for your patients..."
              value={formData.about}
              onChange={(e) => updateField('about', e.target.value)}
              className="min-h-36.25 focus-visible:ring-[#014f86]"
            />
          </div>
        </div>
      </div>

      <Separator />

      <div className="space-y-4">
        <Label className="text-lg font-bold text-[#012a4a]">
          Verify Treatment Area Coordinates
        </Label>
        {formData.lat && formData.lng ? (
          <Alert variant="default" className="text-success border-transparent p-0">
            <MapPin className="mr-1 size-4" />
            <span className="text-sm">
              {formData.address} | {formData.lat}, {formData.lng}
            </span>
          </Alert>
        ) : null}
        <div className="flex flex-col items-end gap-4 sm:flex-row">
          <div className="flex w-full items-center gap-2">
            <Button
              type="button"
              variant="outline"
              onClick={detectLocation}
              disabled={isDetectingLocation}
              className="hover:bg-secondary/20 h-10 flex-1 border-[#014f86] text-[#014f86]"
            >
              <Navigation className="mr-1 h-4 w-4" />
              {isDetectingLocation ? 'Detecting...' : 'My Location'}
            </Button>
            <Button
              type="button"
              onClick={() => {
                updateField('lat', '28.4744');
                updateField('lng', '77.5040');
              }}
              className="h-10 flex-1"
            >
              <MapPin className="mr-1 h-4 w-4" />
              Choose Map
            </Button>
          </div>
        </div>
        <p className="text-muted-foreground mt-2 flex items-center gap-1 text-xs">
          <MapPin className="h-3 w-3" /> Exact coordinates are required to dispatch home visit
          requests efficiently.
        </p>
      </div>
    </motion.div>
  );
};

// Local separator component to avoid importing separate components when possible
const Separator: React.FC = () => <div className="bg-border my-6 h-px" />;
