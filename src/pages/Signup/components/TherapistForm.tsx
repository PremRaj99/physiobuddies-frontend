import React from 'react';
import { Controller, type UseFormReturn } from 'react-hook-form';
import {
  Stethoscope,
  Phone,
  Mail,
  Building2,
  Home as HomeIcon,
  Globe,
  MapPin,
  Lock,
  ArrowRight,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Spinner } from '@/components/ui/spinner';
import { type TherapistFormValues } from '../hooks/useSignup';

interface TherapistFormProps {
  therapistForm: UseFormReturn<TherapistFormValues>;
  onTherapistSubmit: (data: TherapistFormValues) => void;
  isFormSubmitting: boolean;
  handlePinMap: () => void;
}

export const TherapistForm: React.FC<TherapistFormProps> = ({
  therapistForm,
  onTherapistSubmit,
  isFormSubmitting,
  handlePinMap,
}) => {
  return (
    <form onSubmit={therapistForm.handleSubmit(onTherapistSubmit)}>
      <div className="mb-3 grid grid-cols-1 gap-3 md:grid-cols-2">
        <div className="space-y-1">
          <Label htmlFor="therapist-name" className="text-xs font-medium text-[#012a4a]">
            Full Name
          </Label>
          <div className="relative">
            <Stethoscope className="text-muted-foreground absolute top-2.5 left-3 h-4 w-4" />
            <Input
              id="therapist-name"
              required
              placeholder="Dr. John Doe"
              {...therapistForm.register('name', { required: true, minLength: 3 })}
              className="focus-visible:ring-primary h-9 pl-9"
            />
          </div>
        </div>
        <div className="space-y-1">
          <Label htmlFor="therapist-mobile" className="text-xs font-medium text-[#012a4a]">
            Mobile Number
          </Label>
          <div className="relative">
            <Phone className="text-muted-foreground absolute top-2.5 left-3 h-4 w-4" />
            <Input
              id="therapist-mobile"
              type="tel"
              required
              placeholder="+91 98765 43210"
              {...therapistForm.register('mobile', { required: true })}
              className="focus-visible:ring-primary h-9 pl-9"
            />
          </div>
        </div>
      </div>

      <div className="mb-3 grid grid-cols-1 gap-3 md:grid-cols-1">
        <div className="space-y-1">
          <Label htmlFor="therapist-email" className="text-xs font-medium text-[#012a4a]">
            Email Address
          </Label>
          <div className="relative">
            <Mail className="text-muted-foreground absolute top-2.5 left-3 h-4 w-4" />
            <Input
              id="therapist-email"
              type="email"
              required
              placeholder="doctor@clinic.com"
              {...therapistForm.register('email', { required: true })}
              className="focus-visible:ring-primary h-9 pl-9"
            />
          </div>
        </div>
      </div>

      <div className="mb-3 grid grid-cols-1 gap-3 md:grid-cols-2">
        <div className="space-y-1">
          <Label className="text-xs font-medium text-[#012a4a]">Gender</Label>
          <Controller
            control={therapistForm.control}
            name="gender"
            rules={{ required: true }}
            render={({ field }) => (
              <Select onValueChange={field.onChange} value={field.value}>
                <SelectTrigger className="focus:ring-primary h-9 w-full">
                  <SelectValue placeholder="Select Gender" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="male">Male</SelectItem>
                  <SelectItem value="female">Female</SelectItem>
                  <SelectItem value="other">Other</SelectItem>
                </SelectContent>
              </Select>
            )}
          />
        </div>
        <div className="space-y-1">
          <Label className="text-xs font-medium text-[#012a4a]">Primary Practice</Label>
          <Controller
            control={therapistForm.control}
            name="mode"
            rules={{ required: true }}
            render={({ field }) => (
              <Select onValueChange={field.onChange} value={field.value}>
                <SelectTrigger className="focus:ring-primary h-9 w-full">
                  <SelectValue placeholder="Select Mode" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="clinic">
                    <span className="flex items-center gap-2">
                      <Building2 className="h-3.5 w-3.5" /> Clinic
                    </span>
                  </SelectItem>
                  <SelectItem value="home_visit">
                    <span className="flex items-center gap-2">
                      <HomeIcon className="h-3.5 w-3.5" /> Home Visit
                    </span>
                  </SelectItem>
                  <SelectItem value="online">
                    <span className="flex items-center gap-2">
                      <Globe className="h-3.5 w-3.5" /> Online
                    </span>
                  </SelectItem>
                </SelectContent>
              </Select>
            )}
          />
        </div>
      </div>

      <div className="bg-secondary/30 border-border mb-3 space-y-1.5 rounded-lg border p-3">
        <Label htmlFor="display-address" className="text-xs font-medium text-[#012a4a]">
          Base Location
        </Label>
        <div className="flex gap-2">
          <div className="relative flex-1">
            <MapPin className="text-muted-foreground absolute top-2.5 left-3 h-4 w-4" />
            <Input
              id="display-address"
              required
              placeholder="123 Wellness Ave, City"
              {...therapistForm.register('displayAddress', { required: true })}
              className="focus-visible:ring-primary h-9 bg-white pl-9 text-sm"
            />
          </div>
          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={handlePinMap}
            className="border-primary text-primary hover:bg-primary/10 h-9 shrink-0"
          >
            <MapPin className="mr-1.5 h-3.5 w-3.5" /> Pin Map
          </Button>
        </div>
      </div>

      <div className="mb-3 space-y-1">
        <Label htmlFor="therapist-password" className="text-xs font-medium text-[#012a4a]">
          Password
        </Label>
        <div className="relative">
          <Lock className="text-muted-foreground absolute top-2.5 left-3 h-4 w-4" />
          <Input
            id="therapist-password"
            required
            type="password"
            placeholder="••••••••"
            {...therapistForm.register('password', { required: true, minLength: 6 })}
            className="focus-visible:ring-primary h-9 pl-9"
          />
        </div>
      </div>

      <Button
        type="submit"
        disabled={isFormSubmitting}
        className="mt-4 h-10 w-full bg-[#013a63] text-sm text-white shadow-md transition-all hover:bg-[#012a4a]"
      >
        {isFormSubmitting ? (
          <span className="flex items-center justify-center gap-2">
            <Spinner className="h-4 w-4" /> Sending Code...
          </span>
        ) : (
          <span className="flex items-center justify-center gap-2">
            Register as Therapist <ArrowRight className="h-4 w-4" />
          </span>
        )}
      </Button>
    </form>
  );
};
