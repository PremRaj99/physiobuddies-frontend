import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { User, Plus, CheckCircle2, ChevronRight } from 'lucide-react';
import { useForm, useWatch } from 'react-hook-form';
import { toast } from 'sonner';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Skeleton } from '@/components/ui/skeleton';
import { cn } from '@/lib/utils';
import { useCreatePatientDetail } from '@/hooks/usePatient';
import type { PatientDetail } from '@/services/patient.service';

type NewPatientForm = {
  name: string;
  dob: string;
  gender: 'male' | 'female' | 'other';
  phone: string;
  heightCm?: number;
  weightKg?: number;
};

interface PatientStepProps {
  patients: PatientDetail[];
  selectedId: string | null;
  onSelect: (id: string) => void;
  onNext: () => void;
  isLoading: boolean;
}

export const PatientStep: React.FC<PatientStepProps> = ({
  patients,
  selectedId,
  onSelect,
  onNext,
  isLoading,
}) => {
  const [showNewForm, setShowNewForm] = useState(false);
  const createPatient = useCreatePatientDetail();
  const { register, handleSubmit, setValue, control, reset, formState } = useForm<NewPatientForm>({
    defaultValues: { gender: 'male' },
  });
  const genderValue = useWatch({ control, name: 'gender' });

  const onSubmit = async (data: NewPatientForm) => {
    try {
      const payload = {
        ...data,
        heightCm: data.heightCm ? Number(data.heightCm) : undefined,
        weightKg: data.weightKg ? Number(data.weightKg) : undefined,
      };
      await createPatient.mutateAsync(payload);
      toast.success('Patient added.');
      reset();
      setShowNewForm(false);
    } catch (e: unknown) {
      const err = e as { response?: { data?: { message?: string } } };
      toast.error(err.response?.data?.message || "Could not add patient.");
    }
  };

  return (
    <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}>
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-[#012a4a]">Select Patient</h2>
          <p className="text-muted-foreground">Who is this booking for?</p>
        </div>
        <Button variant="outline" className="border-[#014f86] text-[#014f86]" onClick={() => setShowNewForm(!showNewForm)}>
          <Plus className="mr-2 h-4 w-4" /> New Patient
        </Button>
      </div>

      {showNewForm ? (
        <Card className="mb-6 border-[#a9d6e5] bg-[#f8fbfa] pt-0">
          <CardHeader>
            <CardTitle className="py-4 text-[#013a63]">Add New Patient</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
              <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="name">Full Name</Label>
                  <Input id="name" placeholder="Enter patient name" {...register('name', { required: true, minLength: 3 })} />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="dob">Date of Birth</Label>
                  <Input id="dob" type="date" {...register('dob', { required: true })} />
                </div>
                <div className="space-y-2">
                  <Label>Gender</Label>
                  <RadioGroup value={genderValue} onValueChange={(v) => setValue('gender', v as NewPatientForm['gender'])} className="flex gap-4">
                    {(['male', 'female', 'other'] as const).map((g) => (
                      <div key={g} className="flex items-center space-x-2">
                        <RadioGroupItem value={g} id={`r-${g}`} />
                        <Label htmlFor={`r-${g}`} className="capitalize">{g}</Label>
                      </div>
                    ))}
                  </RadioGroup>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="phone">Phone Number</Label>
                  <Input id="phone" placeholder="10-digit number" {...register('phone', { required: true })} />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="heightCm">Height (cm) <span className="text-muted-foreground text-xs font-normal">(Optional)</span></Label>
                  <Input id="heightCm" type="number" placeholder="e.g. 175" {...register('heightCm', { valueAsNumber: true })} />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="weightKg">Weight (kg) <span className="text-muted-foreground text-xs font-normal">(Optional)</span></Label>
                  <Input id="weightKg" type="number" placeholder="e.g. 70" {...register('weightKg', { valueAsNumber: true })} />
                </div>
              </div>
              <div className="mt-4 flex justify-end gap-2">
                <Button type="button" variant="ghost" onClick={() => setShowNewForm(false)}>Cancel</Button>
                <Button type="submit" className="bg-[#014f86] hover:bg-[#013a63]" disabled={createPatient.isPending || !formState.isValid}>
                  {createPatient.isPending ? 'Saving...' : 'Save Patient'}
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      ) : isLoading ? (
        <div className="mb-8 grid grid-cols-1 gap-4 md:grid-cols-2">
          <Skeleton className="h-24 w-full rounded-xl" />
          <Skeleton className="h-24 w-full rounded-xl" />
        </div>
      ) : patients.length === 0 ? (
        <p className="text-muted-foreground mb-8 py-8 text-center text-sm">
          No saved patients. Add one to continue.
        </p>
      ) : (
        <div className="mb-8 grid grid-cols-1 gap-4 md:grid-cols-2">
          {patients.map((p) => (
            <Card
              key={p.id}
              className={cn(`cursor-pointer py-0 transition-all`, selectedId === p.id ? 'border-[#014f86] bg-[#014f86]/5 ring-1 ring-[#014f86]' : 'hover:border-[#a9d6e5]')}
              onClick={() => onSelect(p.id)}
            >
              <CardContent className="flex items-start gap-4 p-4">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#a9d6e5]/40">
                  <User className="h-5 w-5 text-[#013a63]" />
                </div>
                <div>
                  <h4 className="font-bold text-[#012a4a]">{p.name}</h4>
                  <div className="text-muted-foreground mt-0.5 flex flex-wrap items-center gap-1.5 text-sm">
                    <span className="capitalize">{p.gender}</span>
                    <span>•</span>
                    <span>{new Date(p.dob).toLocaleDateString()}</span>
                    {p.heightCm && (
                      <>
                        <span>•</span>
                        <span>{p.heightCm} cm</span>
                      </>
                    )}
                    {p.weightKg && (
                      <>
                        <span>•</span>
                        <span>{p.weightKg} kg</span>
                      </>
                    )}
                  </div>
                  <p className="text-muted-foreground mt-1 text-sm">{p.phone}</p>
                </div>
                {selectedId === p.id && <CheckCircle2 className="ml-auto h-5 w-5 shrink-0 text-[#014f86]" />}
              </CardContent>
            </Card>
          ))}
        </div>
      )}

      <div className="flex justify-end">
        <Button size="lg" className="bg-[#014f86] hover:bg-[#013a63]" disabled={!selectedId || showNewForm} onClick={onNext}>
          Continue to Location <ChevronRight className="ml-2 h-4 w-4" />
        </Button>
      </div>
    </motion.div>
  );
};
