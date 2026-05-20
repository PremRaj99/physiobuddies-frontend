import { useState } from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Camera, Mail, Phone, ShieldCheck, User } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';

export interface UserProfile {
  name: string;
  email: string;
  phone: string;
  image: string;
  patientId: string;
}

export const INITIAL_PROFILE: UserProfile = {
  name: 'Robert Fox',
  email: 'robert.fox@example.com',
  phone: '+1 (555) 123-4567',
  image:
    'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=200',
  patientId: 'PAT-2024-001',
};

export const ProfileTab = ({
  profile,
  onSave,
}: {
  profile: UserProfile;
  onSave: (p: UserProfile) => void;
}) => {
  const [formData, setFormData] = useState(profile);
  const [isSaving, setIsSaving] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);
    setTimeout(() => {
      onSave(formData);
      setIsSaving(false);
    }, 800);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <Card className="border-border shadow-sm">
        <CardHeader>
          <CardTitle className="text-2xl font-bold text-[#012a4a]">Personal Information</CardTitle>
          <CardDescription>Update your primary account details here.</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="flex flex-col items-center gap-4 pb-6 text-center sm:flex-row sm:text-left">
              <div className="group relative">
                <Avatar className="h-24 w-24 border-4 border-white bg-[#a9d6e5] shadow-md">
                  <AvatarImage src={formData.image} className="object-cover" />
                  <AvatarFallback className="text-2xl font-bold text-[#013a63]">
                    {formData.name.charAt(0)}
                  </AvatarFallback>
                </Avatar>
                <div className="absolute inset-0 flex cursor-pointer items-center justify-center rounded-full bg-[#012a4a]/40 opacity-100 transition-opacity md:opacity-0 md:group-hover:opacity-100">
                  <Camera className="h-6 w-6 text-white" />
                </div>
              </div>
              <div>
                <div className="mb-1 flex items-center gap-2">
                  <Badge
                    variant="outline"
                    className="bg-secondary/30 border-[#014f86] text-[#014f86]"
                  >
                    {formData.patientId}
                  </Badge>
                  <ShieldCheck className="text-success h-4 w-4" />
                </div>
                <p className="text-muted-foreground text-sm">
                  Click the avatar to update your photo.
                </p>
              </div>
            </div>

            <Separator />

            <div className="grid grid-cols-1 gap-6 pt-4 md:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="name" className="text-[#012a4a]">
                  Full Name
                </Label>
                <div className="relative">
                  <User className="text-muted-foreground absolute top-2.5 left-3 h-4 w-4" />
                  <Input
                    id="name"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="pl-9 focus-visible:ring-[#014f86]"
                    required
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="email" className="text-[#012a4a]">
                  Email Address (Fixed)
                </Label>
                <div className="relative">
                  <Mail className="text-muted-foreground absolute top-2.5 left-3 h-4 w-4" />
                  <Input
                    id="email"
                    value={formData.email}
                    className="cursor-not-allowed border-gray-200 bg-gray-50 pl-9 text-gray-500"
                    disabled
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="phone" className="text-[#012a4a]">
                  Phone Number
                </Label>
                <div className="relative">
                  <Phone className="text-muted-foreground absolute top-2.5 left-3 h-4 w-4" />
                  <Input
                    id="phone"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    className="pl-9 focus-visible:ring-[#014f86]"
                  />
                </div>
              </div>
            </div>

            <div className="flex justify-end pt-4">
              <Button
                type="submit"
                disabled={isSaving}
                className="min-w-30 bg-[#014f86] text-white hover:bg-[#013a63]"
              >
                {isSaving ? 'Saving...' : 'Save Changes'}
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </motion.div>
  );
};
