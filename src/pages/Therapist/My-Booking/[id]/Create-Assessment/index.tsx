import { zodResolver } from '@hookform/resolvers/zod';
import { AnimatePresence, motion } from 'framer-motion';
import {
  Activity,
  AlertCircle,
  CheckCircle,
  CheckCircle2,
  ChevronLeft,
  ChevronRight,
  HeartPulse,
  Save,
  Stethoscope,
} from 'lucide-react';
import { useState } from 'react';
import { Controller, type Path, type Resolver, useForm, useWatch } from 'react-hook-form';
import * as z from 'zod';

import AnimatedSuccess from '@/components/custom/animated-success/AnimatedSuccess';
import PageHeader from '@/components/custom/page-header/page-header';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Separator } from '@/components/ui/separator';
import { Switch } from '@/components/ui/switch';
import { Textarea } from '@/components/ui/textarea';
import { cn } from '@/lib/utils';
import { useNavigate, useParams } from 'react-router';

/* STREAMING_CHUNK:Defining Schema and Types... */

// --- ENUMS ---
const AssessmentTypeEnum = z.enum([
  'ORTHO',
  'POST_SURGICAL',
  'SPORTS',
  'NEURO',
  'GERIATRIC',
  'CARDIOPULMONARY',
  'GENERAL',
]);

const DurationEnum = z.enum(['< 1 Week', '1-4 Weeks', '1-3 Months', '3-6 Months', '> 6 Months']);

const ROMEnum = z.enum(['Full', 'Mild Restriction', 'Moderate Restriction', 'Severe Restriction']);

const StrengthEnum = z.enum([
  'Normal (5/5)',
  'Mild Weakness (4/5)',
  'Moderate Weakness (3/5)',
  'Severe Weakness (<=2/5)',
]);

const VisitFrequencyEnum = z.enum([
  'Daily',
  'Alternate Days',
  '3 Times/Week',
  '2 Times/Week',
  'Weekly',
]);

// Helper for optional numbers from HTML inputs to prevent NaN/0 issues
const optionalNumber = z
  .union([z.coerce.number(), z.literal('')])
  .optional()
  .transform((v) => (v === '' ? undefined : v));

// --- MAIN SCHEMA ---
export const PhysiotherapyAssessmentSchema = z
  .object({
    // STEP 1: Core Universal Fields
    assessmentType: AssessmentTypeEnum,
    chiefComplaint: z.array(z.string()).min(1, 'Select at least one complaint'),
    durationOfSymptoms: DurationEnum,
    painScore: z.coerce.number().min(0).max(10, 'Pain score must be between 0 and 10'),
    painCharacteristics: z.array(z.string()).optional(),
    rom: ROMEnum,
    muscleStrength: StrengthEnum,

    // STEP 2: Conditional Fields
    // Module A: Functional & Mobility
    mobilityStatus: z.string().optional(),
    assistiveDevice: z.string().optional(),
    fallRisk: z.enum(['Low', 'Moderate', 'High']).optional(),
    functionalLimitations: z.array(z.string()).optional(),

    // Module B: Post-Surgical & Sports
    dateOfSurgery: z.coerce.date().optional(),
    surgeryType: z.string().optional(),
    sportPlayed: z.string().optional(),
    mechanismOfInjury: z.string().optional(),

    // Module C: Neurological
    cognitiveStatus: z.string().optional(),
    muscleTone: z.string().optional(),

    // Module D: Cardiopulmonary
    heartRateBpm: optionalNumber,
    bloodPressureSys: optionalNumber,
    bloodPressureDia: optionalNumber,
    spo2Percentage: optionalNumber,
    oxygenSupportType: z.string().optional(),

    // STEP 3: Treatment & Conclusion
    problemsIdentified: z.array(z.string()).min(1, 'Select at least one identified problem'),
    treatmentPlan: z.array(z.string()).min(1, 'Select at least one treatment plan item'),
    visitFrequency: VisitFrequencyEnum,
    hepGiven: z.boolean(),
    therapistNotes: z.string().optional(),
    documentUrls: z.array(z.string().url()).optional(),
  })
  // --- CONDITIONAL VALIDATION LOGIC ---
  .superRefine((data, ctx) => {
    // Conditionally require Cardiopulmonary vitals
    if (data.assessmentType === 'CARDIOPULMONARY') {
      if (!data.heartRateBpm) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: 'Heart rate is required',
          path: ['heartRateBpm'],
        });
      }
      if (!data.spo2Percentage) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: 'SpO2 percentage is required',
          path: ['spo2Percentage'],
        });
      }
    }

    // Conditionally require Surgical details
    if (data.assessmentType === 'POST_SURGICAL') {
      if (!data.dateOfSurgery || isNaN(data.dateOfSurgery.getTime())) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: 'Valid date of surgery is required',
          path: ['dateOfSurgery'],
        });
      }
      if (!data.surgeryType) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: 'Surgery type is required',
          path: ['surgeryType'],
        });
      }
    }

    // Conditionally require Sports details
    if (data.assessmentType === 'SPORTS' && !data.sportPlayed) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: 'Sport played is required',
        path: ['sportPlayed'],
      });
    }
  });

export type PhysiotherapyAssessment = z.infer<typeof PhysiotherapyAssessmentSchema>;

/* STREAMING_CHUNK:Options Lists for UI Multi-selects... */

const CHIEF_COMPLAINTS = [
  'Pain',
  'Stiffness',
  'Weakness',
  'Swelling',
  'Instability',
  'Numbness',
  'Restricted Mobility',
  'Balance Issues',
  'Postural Fault',
];
const PAIN_CHARS = [
  'Sharp',
  'Dull',
  'Aching',
  'Burning',
  'Radiating',
  'Throbbing',
  'Intermittent',
  'Constant',
];
const PROBLEMS_LIST = [
  'Decreased ROM',
  'Reduced Strength',
  'Poor Balance',
  'Gait Deviation',
  'Postural Fault',
  'Joint Instability',
  'Edema',
  'Muscle Spasm',
];
const TREATMENT_LIST = [
  'Manual Therapy',
  'Therapeutic Exercise',
  'Electrotherapy (TENS/IFT)',
  'Gait Training',
  'Balance Training',
  'Cryotherapy',
  'Heat Therapy',
  'Patient Education',
];
const FALL_RISK_OPTIONS = ['Low', 'Moderate', 'High'];

// --- Main Page Component ---
export default function CreateAssessmentPage() {
  const [step, setStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const navigate = useNavigate();
  const { id: bookingId } = useParams<{ id: string }>();

  /* STREAMING_CHUNK:Initializing React Hook Form... */
  const {
    register,
    handleSubmit,
    control,
    watch,
    setValue,
    trigger,
    getValues,
    formState: { errors },
  } = useForm<PhysiotherapyAssessment>({
    // cast resolver to any to avoid conflicting Resolver type definitions across packages
    resolver: zodResolver(
      PhysiotherapyAssessmentSchema,
    ) as unknown as Resolver<PhysiotherapyAssessment>,
    defaultValues: {
      assessmentType: 'GENERAL',
      chiefComplaint: [],
      painCharacteristics: [],
      problemsIdentified: [],
      treatmentPlan: [],
      hepGiven: true,
      painScore: 5,
    },
    mode: 'onChange',
  });

  const selectedType = watch('assessmentType');
  const hepGivenVal = watch('hepGiven');

  /* STREAMING_CHUNK:Step Navigation and Validation Handlers... */
  const handleNext = async () => {
    let fieldsToValidate: Path<PhysiotherapyAssessment>[] = [];

    if (step === 1) {
      fieldsToValidate = [
        'assessmentType',
        'durationOfSymptoms',
        'painScore',
        'rom',
        'muscleStrength',
        'chiefComplaint',
      ];
    } else if (step === 2) {
      // Step 2 conditional validation based on type (respecting superRefine)
      if (selectedType === 'CARDIOPULMONARY')
        fieldsToValidate.push('heartRateBpm', 'spo2Percentage');
      if (selectedType === 'POST_SURGICAL') fieldsToValidate.push('dateOfSurgery', 'surgeryType');
      if (selectedType === 'SPORTS') fieldsToValidate.push('sportPlayed');
    } else if (step === 3) {
      fieldsToValidate = ['problemsIdentified', 'treatmentPlan', 'visitFrequency'];
    }

    const isStepValid = await trigger(fieldsToValidate);
    if (isStepValid) {
      setStep((p) => Math.min(4, p + 1));
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const handleBack = () => {
    setStep((p) => Math.max(1, p - 1));
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const onSubmit = async (data: PhysiotherapyAssessment) => {
    setIsSubmitting(true);
    // Simulate API Call
    setTimeout(() => {
      console.log('Submitted Data:', data);
      setIsSubmitting(false);
      setIsSuccess(true);
    }, 2000);
  };

  /* STREAMING_CHUNK:Helper for Multi-select Badges... */
  const MultiSelectBadge = ({
    fieldName,
    item,
  }: {
    fieldName: Path<PhysiotherapyAssessment>;
    item: string;
  }) => {
    const currentArray = (useWatch({ control, name: fieldName }) as string[]) || [];
    const isSelected = currentArray.includes(item);

    const toggle = () => {
      if (isSelected) {
        setValue(
          fieldName,
          currentArray.filter((i) => i !== item),
          { shouldValidate: true, shouldDirty: true },
        );
      } else {
        setValue(fieldName, [...currentArray, item], { shouldValidate: true, shouldDirty: true });
      }
    };

    return (
      <Badge
        variant="outline"
        onClick={toggle}
        className={`cursor-pointer rounded-md p-4 text-sm transition-all select-none ${
          isSelected
            ? 'border-[#014f86] bg-[#014f86] text-white shadow-sm'
            : 'border-border bg-white text-[#013a63] hover:border-[#a9d6e5]'
        }`}
      >
        {item}
      </Badge>
    );
  };

  /* STREAMING_CHUNK:Rendering Success Screen... */
  if (isSuccess) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-[#f8fbfa] p-4 font-sans">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="w-full max-w-md"
        >
          <Card className="border-border bg-white px-6 py-12 text-center shadow-xl shadow-[#012a4a]/5">
            <div className="bg-success/10 mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-full">
              <AnimatedSuccess />
            </div>
            <h1 className="mb-4 text-3xl font-bold text-[#012a4a]">Assessment Saved!</h1>
            <p className="mb-8 leading-relaxed text-[#013a63]">
              The clinical assessment has been securely logged in the patient's records and
              treatment plan updated.
            </p>
            <Button onClick={() => navigate(`/therapist/my-booking/${bookingId}`)}>
              Return to Dashboard
            </Button>
          </Card>
        </motion.div>
      </div>
    );
  }

  /* STREAMING_CHUNK:Rendering the Main UI... */
  return (
    <div className="min-h-body bg-[#f8fbfa] pb-12 font-sans">
      <PageHeader
        heading="Clinical Assessment"
        subheading="Record patient evaluation, diagnosis, and treatment plan."
      />

      <main className="mx-auto max-w-6xl px-4 pt-4 sm:px-6">
        <Card className="border-border gap-0 overflow-hidden bg-white py-0 shadow-xl shadow-[#012a4a]/5">
          {/* Stepper Header */}
          <div className="bg-secondary/20 border-border border-b p-4 sm:p-6">
            <div className="relative flex items-center justify-between px-2 sm:px-8">
              <div className="bg-border absolute top-1/2 right-2 left-2 -z-10 h-1 -translate-y-1/2 sm:right-8 sm:left-8" />
              <div
                className="absolute top-1/2 left-2 -z-10 h-1 -translate-y-1/2 bg-[#014f86] transition-all duration-500 sm:left-8"
                style={{ width: `${((step - 1) / 3) * (100 - 16 / 3)}%` }}
              />
              {[
                { num: 1, label: 'Core Vitals', icon: Activity },
                { num: 2, label: 'Specifics', icon: Stethoscope },
                { num: 3, label: 'Treatment', icon: HeartPulse },
                { num: 4, label: 'Preview', icon: CheckCircle2 },
              ].map((s) => {
                const isActive = s.num === step;
                const isPassed = s.num < step;
                return (
                  <div key={s.num} className="flex flex-col items-center bg-transparent">
                    <div
                      className={cn(
                        `flex h-10 w-10 items-center justify-center rounded-full border-2 transition-colors`,
                        isActive
                          ? 'border-[#014f86] bg-[#014f86] text-white'
                          : isPassed
                            ? 'text-success border-transparent bg-[#ffffff]'
                            : 'border-border text-muted-foreground bg-gray-50',
                      )}
                    >
                      {isPassed ? (
                        <CheckCircle className="h-6 w-6" />
                      ) : (
                        <s.icon className="h-5 w-5" />
                      )}
                    </div>
                    <span
                      className={cn(
                        `mt-2 hidden text-xs font-bold sm:block`,
                        isActive || isPassed ? 'text-[#012a4a]' : 'text-muted-foreground',
                      )}
                    >
                      {s.label}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>

          <CardContent className="min-h-100 p-6 md:p-10">
            <AnimatePresence mode="wait">
              {/* STEP 1: CORE DETAILS */}
              {step === 1 && (
                <motion.div
                  key="step1"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  className="space-y-8"
                >
                  <div className="border-border flex items-center gap-3 border-b pb-4">
                    <Activity className="h-6 w-6 text-[#014f86]" />
                    <h2 className="text-2xl font-bold text-[#012a4a]">Core Assessment Details</h2>
                  </div>

                  <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                    <div className="space-y-2">
                      <Label className="font-bold text-[#012a4a]">Assessment Category *</Label>
                      <Controller
                        name="assessmentType"
                        control={control}
                        render={({ field }) => (
                          <Select onValueChange={field.onChange} defaultValue={field.value}>
                            <SelectTrigger
                              className={`border-border focus:ring-[#014f86] ${errors.assessmentType ? 'border-destructive' : ''}`}
                            >
                              <SelectValue placeholder="Select Category" />
                            </SelectTrigger>
                            <SelectContent>
                              {AssessmentTypeEnum.options.map((opt) => (
                                <SelectItem key={opt} value={opt}>
                                  {opt.replace('_', ' ')}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                        )}
                      />
                      {errors.assessmentType && (
                        <p className="text-destructive text-xs">{errors.assessmentType.message}</p>
                      )}
                    </div>

                    <div className="space-y-2">
                      <Label className="font-bold text-[#012a4a]">Duration of Symptoms *</Label>
                      <Controller
                        name="durationOfSymptoms"
                        control={control}
                        render={({ field }) => (
                          <Select onValueChange={field.onChange} defaultValue={field.value}>
                            <SelectTrigger
                              className={`border-border focus:ring-[#014f86] ${errors.durationOfSymptoms ? 'border-destructive' : ''}`}
                            >
                              <SelectValue placeholder="Select Duration" />
                            </SelectTrigger>
                            <SelectContent>
                              {DurationEnum.options.map((opt) => (
                                <SelectItem key={opt} value={opt}>
                                  {opt}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                        )}
                      />
                      {errors.durationOfSymptoms && (
                        <p className="text-destructive text-xs">
                          {errors.durationOfSymptoms.message}
                        </p>
                      )}
                    </div>

                    <div className="space-y-2 md:col-span-2">
                      <Label className="font-bold text-[#012a4a]">Chief Complaints *</Label>
                      <div className="flex flex-wrap gap-2 pt-1">
                        {CHIEF_COMPLAINTS.map((c) => (
                          <MultiSelectBadge key={c} fieldName="chiefComplaint" item={c} />
                        ))}
                      </div>
                      {errors.chiefComplaint && (
                        <p className="text-destructive mt-1 text-xs">
                          {errors.chiefComplaint.message}
                        </p>
                      )}
                    </div>

                    <div className="space-y-2 md:col-span-2">
                      <Label className="font-bold text-[#012a4a]">Pain Characteristics</Label>
                      <div className="flex flex-wrap gap-2 pt-1">
                        {PAIN_CHARS.map((c) => (
                          <MultiSelectBadge key={c} fieldName="painCharacteristics" item={c} />
                        ))}
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label className="flex justify-between font-bold text-[#012a4a]">
                        <span>Pain Score (0-10) *</span>
                        <span className="text-[#014f86]">{watch('painScore') || 0}/10</span>
                      </Label>
                      <div className="flex items-center gap-4">
                        <input
                          type="range"
                          min="0"
                          max="10"
                          {...register('painScore')}
                          className="w-full accent-[#014f86]"
                        />
                      </div>
                      {errors.painScore && (
                        <p className="text-destructive text-xs">{errors.painScore.message}</p>
                      )}
                    </div>

                    <div className="space-y-2">
                      <Label className="font-bold text-[#012a4a]">Range of Motion (ROM) *</Label>
                      <Controller
                        name="rom"
                        control={control}
                        render={({ field }) => (
                          <Select onValueChange={field.onChange} defaultValue={field.value}>
                            <SelectTrigger
                              className={`border-border focus:ring-[#014f86] ${errors.rom ? 'border-destructive' : ''}`}
                            >
                              <SelectValue placeholder="Select ROM" />
                            </SelectTrigger>
                            <SelectContent>
                              {ROMEnum.options.map((opt) => (
                                <SelectItem key={opt} value={opt}>
                                  {opt}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                        )}
                      />
                      {errors.rom && (
                        <p className="text-destructive text-xs">{errors.rom.message}</p>
                      )}
                    </div>

                    <div className="space-y-2 md:col-span-2">
                      <Label className="font-bold text-[#012a4a]">Muscle Strength *</Label>
                      <Controller
                        name="muscleStrength"
                        control={control}
                        render={({ field }) => (
                          <Select onValueChange={field.onChange} defaultValue={field.value}>
                            <SelectTrigger
                              className={`border-border focus:ring-[#014f86] ${errors.muscleStrength ? 'border-destructive' : ''}`}
                            >
                              <SelectValue placeholder="Select Strength" />
                            </SelectTrigger>
                            <SelectContent>
                              {StrengthEnum.options.map((opt) => (
                                <SelectItem key={opt} value={opt}>
                                  {opt}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                        )}
                      />
                      {errors.muscleStrength && (
                        <p className="text-destructive text-xs">{errors.muscleStrength.message}</p>
                      )}
                    </div>
                  </div>
                </motion.div>
              )}

              {/* STEP 2: DYNAMIC SPECIFICS */}
              {step === 2 && (
                <motion.div
                  key="step2"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  className="space-y-8"
                >
                  <div className="border-border flex items-center gap-3 border-b pb-4">
                    <Stethoscope className="h-6 w-6 text-[#014f86]" />
                    <h2 className="text-2xl font-bold text-[#012a4a] capitalize">
                      {selectedType.replace('_', ' ')} Assessment
                    </h2>
                  </div>

                  <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                    {/* CONDITION: POST SURGICAL */}
                    {selectedType === 'POST_SURGICAL' && (
                      <>
                        <div className="space-y-2">
                          <Label className="font-bold text-[#012a4a]">Date of Surgery *</Label>
                          <Input
                            type="date"
                            {...register('dateOfSurgery')}
                            className={errors.dateOfSurgery ? 'border-destructive' : ''}
                          />
                          {errors.dateOfSurgery && (
                            <p className="text-destructive text-xs">
                              {errors.dateOfSurgery.message}
                            </p>
                          )}
                        </div>
                        <div className="space-y-2">
                          <Label className="font-bold text-[#012a4a]">Surgery Type *</Label>
                          <Input
                            placeholder="e.g. ACL Reconstruction"
                            {...register('surgeryType')}
                            className={errors.surgeryType ? 'border-destructive' : ''}
                          />
                          {errors.surgeryType && (
                            <p className="text-destructive text-xs">{errors.surgeryType.message}</p>
                          )}
                        </div>
                      </>
                    )}

                    {/* CONDITION: SPORTS */}
                    {selectedType === 'SPORTS' && (
                      <>
                        <div className="space-y-2">
                          <Label className="font-bold text-[#012a4a]">Sport Played *</Label>
                          <Input
                            placeholder="e.g. Football"
                            {...register('sportPlayed')}
                            className={errors.sportPlayed ? 'border-destructive' : ''}
                          />
                          {errors.sportPlayed && (
                            <p className="text-destructive text-xs">{errors.sportPlayed.message}</p>
                          )}
                        </div>
                        <div className="space-y-2">
                          <Label className="font-bold text-[#012a4a]">Mechanism of Injury</Label>
                          <Input
                            placeholder="e.g. Twisting on planted foot"
                            {...register('mechanismOfInjury')}
                          />
                        </div>
                      </>
                    )}

                    {/* CONDITION: NEURO */}
                    {selectedType === 'NEURO' && (
                      <>
                        <div className="space-y-2">
                          <Label className="font-bold text-[#012a4a]">Cognitive Status</Label>
                          <Input
                            placeholder="e.g. Alert, Confused"
                            {...register('cognitiveStatus')}
                          />
                        </div>
                        <div className="space-y-2">
                          <Label className="font-bold text-[#012a4a]">Muscle Tone</Label>
                          <Input
                            placeholder="e.g. Hypertonic, Flaccid"
                            {...register('muscleTone')}
                          />
                        </div>
                      </>
                    )}

                    {/* CONDITION: CARDIOPULMONARY */}
                    {selectedType === 'CARDIOPULMONARY' && (
                      <>
                        <div className="space-y-2">
                          <Label className="font-bold text-[#012a4a]">Heart Rate (bpm) *</Label>
                          <Input
                            type="number"
                            {...register('heartRateBpm')}
                            className={errors.heartRateBpm ? 'border-destructive' : ''}
                          />
                          {errors.heartRateBpm && (
                            <p className="text-destructive text-xs">
                              {errors.heartRateBpm.message}
                            </p>
                          )}
                        </div>
                        <div className="space-y-2">
                          <Label className="font-bold text-[#012a4a]">SpO2 (%) *</Label>
                          <Input
                            type="number"
                            {...register('spo2Percentage')}
                            className={errors.spo2Percentage ? 'border-destructive' : ''}
                          />
                          {errors.spo2Percentage && (
                            <p className="text-destructive text-xs">
                              {errors.spo2Percentage.message}
                            </p>
                          )}
                        </div>
                        <div className="space-y-2">
                          <Label className="font-bold text-[#012a4a]">BP Systolic</Label>
                          <Input type="number" {...register('bloodPressureSys')} />
                        </div>
                        <div className="space-y-2">
                          <Label className="font-bold text-[#012a4a]">BP Diastolic</Label>
                          <Input type="number" {...register('bloodPressureDia')} />
                        </div>
                        <div className="space-y-2 md:col-span-2">
                          <Label className="font-bold text-[#012a4a]">Oxygen Support Type</Label>
                          <Input
                            placeholder="e.g. Nasal Cannula 2L/min"
                            {...register('oxygenSupportType')}
                          />
                        </div>
                      </>
                    )}

                    {/* ALWAYS SHOW FUNCTIONAL/MOBILITY */}
                    <div className="border-border space-y-2 border-t pt-4 md:col-span-2">
                      <h3 className="mb-4 font-bold text-[#013a63]">Functional & Mobility</h3>
                    </div>

                    <div className="space-y-2">
                      <Label className="font-bold text-[#012a4a]">Mobility Status</Label>
                      <Input
                        placeholder="e.g. Independent, Requires Assistance"
                        {...register('mobilityStatus')}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label className="font-bold text-[#012a4a]">Assistive Device</Label>
                      <Input
                        placeholder="e.g. Walker, Cane, None"
                        {...register('assistiveDevice')}
                      />
                    </div>
                    <div className="space-y-2 md:col-span-2">
                      <Label className="font-bold text-[#012a4a]">Fall Risk</Label>
                      <Controller
                        name="fallRisk"
                        control={control}
                        render={({ field }) => (
                          <Select onValueChange={field.onChange} defaultValue={field.value}>
                            <SelectTrigger className="border-border focus:ring-[#014f86]">
                              <SelectValue placeholder="Select Risk Level" />
                            </SelectTrigger>
                            <SelectContent>
                              {FALL_RISK_OPTIONS.map((opt) => (
                                <SelectItem key={opt} value={opt}>
                                  {opt}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                        )}
                      />
                    </div>
                  </div>
                </motion.div>
              )}

              {/* STEP 3: TREATMENT PLAN */}
              {step === 3 && (
                <motion.div
                  key="step3"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  className="space-y-8"
                >
                  <div className="border-border flex items-center gap-3 border-b pb-4">
                    <HeartPulse className="h-6 w-6 text-[#014f86]" />
                    <h2 className="text-2xl font-bold text-[#012a4a]">Treatment & Conclusion</h2>
                  </div>

                  <div className="space-y-6">
                    <div className="space-y-2">
                      <Label className="font-bold text-[#012a4a]">Problems Identified *</Label>
                      <div className="flex flex-wrap gap-2 pt-1">
                        {PROBLEMS_LIST.map((p) => (
                          <MultiSelectBadge key={p} fieldName="problemsIdentified" item={p} />
                        ))}
                      </div>
                      {errors.problemsIdentified && (
                        <p className="text-destructive mt-1 text-xs">
                          {errors.problemsIdentified.message}
                        </p>
                      )}
                    </div>

                    <div className="space-y-2">
                      <Label className="font-bold text-[#012a4a]">Treatment Plan *</Label>
                      <div className="flex flex-wrap gap-2 pt-1">
                        {TREATMENT_LIST.map((t) => (
                          <MultiSelectBadge key={t} fieldName="treatmentPlan" item={t} />
                        ))}
                      </div>
                      {errors.treatmentPlan && (
                        <p className="text-destructive mt-1 text-xs">
                          {errors.treatmentPlan.message}
                        </p>
                      )}
                    </div>

                    <div className="border-border grid grid-cols-1 gap-6 border-t pt-4 md:grid-cols-2">
                      <div className="space-y-2">
                        <Label className="font-bold text-[#012a4a]">
                          Recommended Visit Frequency *
                        </Label>
                        <Controller
                          name="visitFrequency"
                          control={control}
                          render={({ field }) => (
                            <Select onValueChange={field.onChange} defaultValue={field.value}>
                              <SelectTrigger
                                className={`border-border focus:ring-[#014f86] ${errors.visitFrequency ? 'border-destructive' : ''}`}
                              >
                                <SelectValue placeholder="Select Frequency" />
                              </SelectTrigger>
                              <SelectContent>
                                {VisitFrequencyEnum.options.map((opt) => (
                                  <SelectItem key={opt} value={opt}>
                                    {opt}
                                  </SelectItem>
                                ))}
                              </SelectContent>
                            </Select>
                          )}
                        />
                        {errors.visitFrequency && (
                          <p className="text-destructive text-xs">
                            {errors.visitFrequency.message}
                          </p>
                        )}
                      </div>

                      <div className="flex flex-col justify-center space-y-2">
                        <Label className="mb-3 font-bold text-[#012a4a]">
                          Home Exercise Program (HEP) Given?
                        </Label>
                        <div className="flex items-center gap-3">
                          <Switch
                            checked={hepGivenVal}
                            onCheckedChange={(val) => setValue('hepGiven', val)}
                            className="data-[state=checked]:bg-[#014f86]"
                          />
                          <span className="text-sm font-medium text-[#012a4a]">
                            {hepGivenVal ? 'Yes, provided to patient' : 'No'}
                          </span>
                        </div>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label className="font-bold text-[#012a4a]">Therapist Notes</Label>
                      <Textarea
                        placeholder="Additional clinical observations or instructions..."
                        {...register('therapistNotes')}
                        className="min-h-25 focus-visible:ring-[#014f86]"
                      />
                    </div>
                  </div>
                </motion.div>
              )}

              {/* STEP 4: PREVIEW */}
              {step === 4 && (
                <motion.div
                  key="step4"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  className="space-y-8"
                >
                  <div className="border-border flex items-center gap-3 border-b pb-4">
                    <CheckCircle2 className="h-6 w-6 text-[#014f86]" />
                    <h2 className="text-2xl font-bold text-[#012a4a]">Review Assessment</h2>
                  </div>

                  <div className="bg-secondary/10 border-border space-y-6 rounded-xl border p-6">
                    <div>
                      <h4 className="border-border/50 mb-3 border-b pb-2 text-sm font-bold tracking-wider text-[#014f86] uppercase">
                        Core Vitals
                      </h4>
                      <div className="grid grid-cols-2 gap-y-4 text-sm">
                        <div>
                          <span className="text-muted-foreground mb-1 block">Assessment Type</span>{' '}
                          <span className="font-bold text-[#012a4a]">
                            {getValues('assessmentType')}
                          </span>
                        </div>
                        <div>
                          <span className="text-muted-foreground mb-1 block">Duration</span>{' '}
                          <span className="font-bold text-[#012a4a]">
                            {getValues('durationOfSymptoms')}
                          </span>
                        </div>
                        <div>
                          <span className="text-muted-foreground mb-1 block">Pain Score</span>{' '}
                          <span className="font-bold text-[#012a4a]">
                            {getValues('painScore')}/10
                          </span>
                        </div>
                        <div>
                          <span className="text-muted-foreground mb-1 block">ROM / Strength</span>{' '}
                          <span className="font-bold text-[#012a4a]">
                            {getValues('rom')} / {getValues('muscleStrength')}
                          </span>
                        </div>
                        <div className="col-span-2">
                          <span className="text-muted-foreground mb-1 block">Chief Complaints</span>
                          <div className="mt-1 flex flex-wrap gap-1">
                            {getValues('chiefComplaint').map((c) => (
                              <Badge key={c} variant="outline" className="bg-white">
                                {c}
                              </Badge>
                            ))}
                          </div>
                        </div>
                      </div>
                    </div>

                    <Separator />

                    <div>
                      <h4 className="border-border/50 mb-3 border-b pb-2 text-sm font-bold tracking-wider text-[#014f86] uppercase">
                        Treatment Plan
                      </h4>
                      <div className="grid grid-cols-2 gap-y-4 text-sm">
                        <div>
                          <span className="text-muted-foreground mb-1 block">Frequency</span>{' '}
                          <span className="font-bold text-[#012a4a]">
                            {getValues('visitFrequency')}
                          </span>
                        </div>
                        <div>
                          <span className="text-muted-foreground mb-1 block">HEP Given</span>{' '}
                          <span className="font-bold text-[#012a4a]">
                            {getValues('hepGiven') ? 'Yes' : 'No'}
                          </span>
                        </div>
                        <div className="col-span-2">
                          <span className="text-muted-foreground mb-1 block">
                            Identified Problems
                          </span>
                          <div className="mt-1 flex flex-wrap gap-1">
                            {getValues('problemsIdentified').map((p) => (
                              <Badge key={p} variant="outline" className="bg-white">
                                {p}
                              </Badge>
                            ))}
                          </div>
                        </div>
                        <div className="col-span-2">
                          <span className="text-muted-foreground mb-1 block">Interventions</span>
                          <div className="mt-1 flex flex-wrap gap-1">
                            {getValues('treatmentPlan').map((t) => (
                              <Badge key={t} variant="outline" className="bg-white">
                                {t}
                              </Badge>
                            ))}
                          </div>
                        </div>
                        {getValues('therapistNotes') && (
                          <div className="border-border col-span-2 mt-2 rounded-lg border bg-white p-3">
                            <span className="text-muted-foreground mb-1 block text-xs font-bold">
                              Notes
                            </span>
                            <span className="font-medium text-[#012a4a] italic">
                              "{getValues('therapistNotes')}"
                            </span>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>

                  <div className="flex items-start gap-3 rounded-lg border border-blue-200 bg-blue-50 p-4">
                    <AlertCircle className="mt-0.5 h-5 w-5 shrink-0 text-blue-600" />
                    <p className="text-sm leading-relaxed text-blue-800">
                      Please verify all clinical inputs. Once submitted, this assessment will be
                      added to the patient's permanent medical record and cannot be altered without
                      administrative override.
                    </p>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </CardContent>

          {/* Footer Actions */}
          <div className="border-border flex flex-col-reverse items-center justify-between gap-4 border-t bg-gray-50 p-4 sm:flex-row sm:p-6">
            <Button
              type="button"
              variant="ghost"
              onClick={handleBack}
              disabled={step === 1 || isSubmitting}
              className="hover:bg-secondary/40 w-full text-[#013a63] sm:w-auto"
            >
              <ChevronLeft className="mr-2 h-4 w-4" /> Back
            </Button>

            {step < 4 ? (
              <Button
                type="button"
                onClick={handleNext}
                className="w-full bg-[#014f86] px-4 font-bold text-white hover:bg-[#013a63] sm:w-auto"
              >
                Next <ChevronRight className="ml-2 h-4 w-4" />
              </Button>
            ) : (
              <Button
                type="button"
                onClick={handleSubmit(onSubmit)}
                disabled={isSubmitting}
                className="bg-success shadow-success/20 w-full px-4 font-bold text-white shadow-lg hover:bg-emerald-600 sm:w-auto"
              >
                {isSubmitting ? (
                  'Saving Record...'
                ) : (
                  <>
                    <Save className="mr-2 h-4 w-4" /> Submit Assessment
                  </>
                )}
              </Button>
            )}
          </div>
        </Card>
      </main>
    </div>
  );
}
