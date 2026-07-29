import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Camera, Lock, Mail, MapPin, Phone, ShieldCheck, User } from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';
import { Textarea } from '@/components/ui/textarea';

const LockedFieldWarning = () => (
  <p className="mt-1 flex items-center gap-1 text-xs text-amber-600">
    <Lock className="h-3 w-3" /> Contact Support to change
  </p>
);

export interface TherapistProfile {
  name: string;
  email: string;
  phone: string;
  image: string;
  displayAddress: string;
  about: string;
  gender: 'male' | 'female' | 'other';
  dob: string;
  mode: 'home_visit' | 'online' | 'clinic';
  clinic: string | null;
  verifiedAt: string | null;
}

export const GeneralInfoTab = ({
  profile,
  onSave,
  isSaving,
}: {
  profile: TherapistProfile;
  onSave: (p: TherapistProfile) => void;
  isSaving: boolean;
}) => {
  const [formData, setFormData] = useState(profile);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(formData);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <Card className="border-border shadow-sm">
        <CardHeader>
          <CardTitle className="text-2xl text-[#012a4a]">General Information</CardTitle>
          <CardDescription>
            Update your public-facing contact and biographical details.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="flex flex-col items-center gap-6 pb-6 sm:flex-row">
              <div className="group relative">
                <Avatar className="h-24 w-24 border-4 border-white bg-[#a9d6e5] shadow-md">
                  <AvatarImage src={formData.image} className="object-cover" />
                  <AvatarFallback className="text-2xl font-bold text-[#013a63]">
                    {formData.name.charAt(0)}
                  </AvatarFallback>
                </Avatar>
                <div className="absolute inset-0 flex cursor-pointer items-center justify-center rounded-full bg-[#012a4a]/40 opacity-0 transition-opacity group-hover:opacity-100">
                  <Camera className="h-6 w-6 text-white" />
                </div>
              </div>
              <div>
                <h3 className="mb-1 text-xl font-bold text-[#012a4a]">{formData.name}</h3>
                <div className="flex items-center gap-2">
                  {formData.verifiedAt ? (
                    <Badge className="bg-success hover:bg-success text-white">
                      <ShieldCheck className="mr-1 h-3 w-3" /> Verified
                    </Badge>
                  ) : (
                    <Badge variant="secondary" className="bg-amber-100 text-amber-800">
                      Pending Verification
                    </Badge>
                  )}
                  <Badge variant="outline" className="border-[#014f86] text-[#014f86] capitalize">
                    {formData.mode.replace('_', ' ')}
                  </Badge>
                </div>
              </div>
            </div>

            <Separator />

            <div className="grid grid-cols-1 gap-6 pt-4 md:grid-cols-2">
              <div className="space-y-2">
                <Label className="text-[#012a4a]">Full Name</Label>
                <div className="relative">
                  <User className="text-muted-foreground absolute top-2.5 left-3 h-4 w-4" />
                  <Input
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="pl-9 focus-visible:ring-[#014f86]"
                    required
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label className="text-[#012a4a]">Email Address</Label>
                <div className="relative">
                  <Mail className="text-muted-foreground absolute top-2.5 left-3 h-4 w-4" />
                  <Input
                    value={formData.email}
                    disabled
                    className="border-gray-200 bg-gray-50 pl-9"
                  />
                </div>
                <LockedFieldWarning />
              </div>

              <div className="space-y-2">
                <Label className="text-[#012a4a]">Phone Number</Label>
                <div className="relative">
                  <Phone className="text-muted-foreground absolute top-2.5 left-3 h-4 w-4" />
                  <Input
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    className="pl-9 focus-visible:ring-[#014f86]"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label className="text-[#012a4a]">Date of Birth</Label>
                <Input
                  type="date"
                  value={formData.dob}
                  onChange={(e) => setFormData({ ...formData, dob: e.target.value })}
                  className="focus-visible:ring-[#014f86]"
                />
              </div>

              <div className="space-y-2 md:col-span-2">
                <Label className="text-[#012a4a]">Display Address</Label>
                <div className="relative">
                  <MapPin className="text-muted-foreground absolute top-2.5 left-3 h-4 w-4" />
                  <Input
                    value={formData.displayAddress}
                    onChange={(e) => setFormData({ ...formData, displayAddress: e.target.value })}
                    className="pl-9 focus-visible:ring-[#014f86]"
                  />
                </div>
              </div>

              <div className="space-y-2 md:col-span-2">
                <Label className="text-[#012a4a]">About Me</Label>
                <Textarea
                  value={formData.about}
                  onChange={(e) => setFormData({ ...formData, about: e.target.value })}
                  rows={4}
                  className="focus-visible:ring-[#014f86]"
                />
              </div>
            </div>

            <div className="flex justify-end pt-4">
              <Button type="submit" disabled={isSaving} className="bg-[#014f86] hover:bg-[#013a63]">
                {isSaving ? 'Saving...' : 'Save General Info'}
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </motion.div>
  );
};
