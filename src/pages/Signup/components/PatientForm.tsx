import React from 'react';
import { type UseFormReturn } from 'react-hook-form';
import { User, Phone, Mail, Lock, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Spinner } from '@/components/ui/spinner';
import { type PatientFormValues } from '../hooks/useSignup';

interface PatientFormProps {
  patientForm: UseFormReturn<PatientFormValues>;
  onPatientSubmit: (data: PatientFormValues) => void;
  isFormSubmitting: boolean;
}

export const PatientForm: React.FC<PatientFormProps> = ({
  patientForm,
  onPatientSubmit,
  isFormSubmitting,
}) => {
  return (
    <form onSubmit={patientForm.handleSubmit(onPatientSubmit)}>
      <div className="mb-3 grid grid-cols-1 gap-3 md:grid-cols-2">
        <div className="space-y-1">
          <Label htmlFor="patient-name" className="text-xs font-medium text-[#012a4a]">
            Full Name
          </Label>
          <div className="relative">
            <User className="text-muted-foreground absolute top-2.5 left-3 h-4 w-4" />
            <Input
              id="patient-name"
              required
              placeholder="Akash Yadav"
              {...patientForm.register('name', { required: true, minLength: 3 })}
              className="focus-visible:ring-primary h-9 pl-9"
            />
          </div>
        </div>
        <div className="space-y-1">
          <Label htmlFor="patient-phone" className="text-xs font-medium text-[#012a4a]">
            Phone Number
          </Label>
          <div className="relative">
            <Phone className="text-muted-foreground absolute top-2.5 left-3 h-4 w-4" />
            <Input
              id="patient-phone"
              type="tel"
              required
              placeholder="+91 98765 43210"
              {...patientForm.register('mobile', { required: true })}
              className="focus-visible:ring-primary h-9 pl-9"
            />
          </div>
        </div>
      </div>

      <div className="mb-3 space-y-1">
        <Label htmlFor="patient-email" className="text-xs font-medium text-[#012a4a]">
          Email Address
        </Label>
        <div className="relative">
          <Mail className="text-muted-foreground absolute top-2.5 left-3 h-4 w-4" />
          <Input
            id="patient-email"
            type="email"
            required
            placeholder="akash@example.com"
            {...patientForm.register('email', { required: true })}
            className="focus-visible:ring-primary h-9 pl-9"
          />
        </div>
      </div>

      <div className="mb-3 space-y-1">
        <Label htmlFor="patient-password" className="text-xs font-medium text-[#012a4a]">
          Password
        </Label>
        <div className="relative">
          <Lock className="text-muted-foreground absolute top-2.5 left-3 h-4 w-4" />
          <Input
            id="patient-password"
            type="password"
            required
            placeholder="••••••••"
            {...patientForm.register('password', { required: true, minLength: 6 })}
            className="focus-visible:ring-primary h-9 pl-9"
          />
        </div>
      </div>

      <Button
        type="submit"
        disabled={isFormSubmitting}
        className="bg-primary mt-4 h-10 w-full text-sm text-white shadow-md transition-all hover:bg-[#013a63]"
      >
        {isFormSubmitting ? (
          <span className="flex items-center justify-center gap-2">
            <Spinner className="h-4 w-4" /> Sending Code...
          </span>
        ) : (
          <span className="flex items-center justify-center gap-2">
            Create Patient Account <ArrowRight className="h-4 w-4" />
          </span>
        )}
      </Button>
    </form>
  );
};
