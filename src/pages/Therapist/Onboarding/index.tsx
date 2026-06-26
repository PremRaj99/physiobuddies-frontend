'use client';

import { AnimatePresence, motion } from 'framer-motion';
import {
  Briefcase,
  CheckCircle2,
  ChevronLeft,
  ChevronRight,
  FileText,
  GraduationCap,
  Info,
  MapPin,
  ShieldCheck,
  UploadCloud,
  User,
} from 'lucide-react';
import { useState } from 'react';

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';
import { Textarea } from '@/components/ui/textarea';
import { cn } from '@/lib/utils';
import { useNavigate } from 'react-router-dom';

/* STREAMING_CHUNK:Defining Constants and Types... */

const SPECIALIZATIONS = [
  'General',
  'Geriatric',
  'Neuro',
  'Sport',
  'Post Surgical',
  'Ortho',
  'Cardio',
  'Pediatric',
  "Women's Health",
  'Ergonomics',
];

const EDUCATIONS = [
  'BPT',
  'MPT (Ortho)',
  'MPT (Neuro)',
  'MPT (Sports)',
  'MPT (Cardio)',
  'PhD in Physiotherapy',
  'Diploma in Rehab',
];

const LANGUAGES = [
  'English',
  'Hindi',
  'Bengali',
  'Marathi',
  'Telugu',
  'Tamil',
  'Gujarati',
  'Urdu',
  'Kannada',
  'Odia',
  'Malayalam',
  'Punjabi',
  'Assamese',
];

const STEPS = [
  { id: 1, title: 'Personal', icon: User },
  { id: 2, title: 'Professional', icon: Briefcase },
  { id: 3, title: 'Expertise', icon: GraduationCap },
  { id: 4, title: 'Documents', icon: FileText },
  { id: 5, title: 'Review', icon: ShieldCheck },
];

// --- Main Page Component ---
export default function TherapistOnboardingPage() {
  const [step, setStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const navigate = useNavigate();

  /* STREAMING_CHUNK:Initializing Form State... */
  const [formData, setFormData] = useState({
    // Step 1: Personal
    image: null as File | null,
    dob: '',
    displayAddress: '',
    about: '',
    // Step 2: Professional
    experience: '',
    iapId: '',
    affiliation: '',
    // Step 3: Expertise
    specializations: [] as string[],
    education: [] as string[],
    languages: [] as string[],
    // Step 4: Documents
    resume: null as File | null,
    certificates: [] as File[],
  });

  /* STREAMING_CHUNK:Handling Inputs and Multi-selects... */
  const updateField = (field: string, value: string | File | null | string[]) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const toggleArrayItem = (field: 'specializations' | 'education' | 'languages', item: string) => {
    setFormData((prev) => {
      const array = prev[field];
      if (array.includes(item)) {
        return { ...prev, [field]: array.filter((i) => i !== item) };
      } else {
        return { ...prev, [field]: [...array, item] };
      }
    });
  };

  const handleNext = () => setStep((p) => Math.min(5, p + 1));
  const handleBack = () => setStep((p) => Math.max(1, p - 1));

  const handleSubmit = () => {
    setIsSubmitting(true);
    // Simulate API submission
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSuccess(true);
    }, 2000);
  };

  /* STREAMING_CHUNK:Rendering Success Screen... */
  if (isSuccess) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-[#f8fbfa] p-4">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="w-full max-w-md"
        >
          <Card className="border-border bg-white px-6 pt-12 text-center shadow-xl shadow-[#012a4a]/5">
            <div className="bg-success/10 mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-full">
              <CheckCircle2 className="text-success h-10 w-10" />
            </div>
            <h1 className="mb-4 text-3xl font-bold text-[#012a4a]">Application Submitted!</h1>
            <p className="mb-8 leading-relaxed text-[#013a63]">
              Thank you for completing your profile. Our medical board will review your credentials
              shortly.
              <strong>
                {' '}
                We'll schedule your interview soon. Be active on your registered email.
              </strong>
            </p>
            <Button onClick={() => navigate('/')}>Return to Home</Button>
          </Card>
        </motion.div>
      </div>
    );
  }

  /* STREAMING_CHUNK:Rendering the Form Wizard... */
  return (
    <div className="min-h-body bg-[#f8fbfa] pb-24 font-sans">
      {/* Header Decorator */}

      <main className="mx-auto max-w-4xl px-4 pt-4 sm:px-6">
        <Card className="border-border gap-0 overflow-hidden py-0 shadow-xl shadow-[#012a4a]/5">
          {/* Stepper Header */}
          <div className="bg-secondary/20 border-border border-b p-6">
            <div className="relative flex items-center justify-between">
              <div className="bg-border absolute top-1/2 left-0 -z-10 h-1 w-full -translate-y-1/2" />
              <div
                className="absolute top-1/2 left-0 -z-10 h-1 -translate-y-1/2 bg-[#014f86] transition-all duration-500"
                style={{ width: `${((step - 1) / 4) * 100}%` }}
              />
              {STEPS.map((s) => {
                const isActive = s.id === step;
                const isPassed = s.id < step;
                return (
                  <div key={s.id} className="flex flex-col items-center px-2">
                    <div
                      className={`flex h-10 w-10 items-center justify-center rounded-full border-2 transition-colors ${
                        isActive
                          ? 'border-[#014f86] bg-[#014f86] text-white'
                          : isPassed
                            ? 'border-[#014f86] bg-[#a9d6e5] text-[#013a63]'
                            : 'border-border text-muted-foreground bg-gray-50'
                      }`}
                    >
                      {isPassed ? (
                        <CheckCircle2 className="h-5 w-5" />
                      ) : (
                        <s.icon className="h-5 w-5" />
                      )}
                    </div>
                    <span
                      className={`mt-2 hidden text-xs font-bold sm:block ${isActive || isPassed ? 'text-[#012a4a]' : 'text-muted-foreground'}`}
                    >
                      {s.title}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Form Content */}
          <CardContent className="min-h-100 p-6 md:p-10">
            <AnimatePresence mode="wait">
              {/* STEP 1: PERSONAL */}
              {step === 1 && (
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
                      <div className="border-border hover:bg-secondary/10 cursor-pointer rounded-xl border-2 border-dashed p-6 text-center transition-colors">
                        <UploadCloud className="text-muted-foreground mx-auto mb-2 h-8 w-8" />
                        <p className="text-sm font-medium text-[#013a63]">Click to upload photo</p>
                        <p className="text-muted-foreground mt-1 text-xs">JPG, PNG up to 5MB</p>
                      </div>
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
              )}

              {/* STEP 2: PROFESSIONAL */}
              {step === 2 && (
                <motion.div
                  key="step2"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  className="space-y-6"
                >
                  <h2 className="mb-6 text-2xl font-bold text-[#012a4a]">Professional Details</h2>

                  <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                    <div className="space-y-2">
                      <Label className="text-[#012a4a]">Years of Experience</Label>
                      <Input
                        type="number"
                        placeholder="e.g. 5"
                        value={formData.experience}
                        onChange={(e) => updateField('experience', e.target.value)}
                        className="focus-visible:ring-[#014f86]"
                      />
                    </div>

                    <div className="space-y-2">
                      <Label className="text-[#012a4a]">IAP Registration ID</Label>
                      <Input
                        placeholder="Enter your valid IAP ID"
                        value={formData.iapId}
                        onChange={(e) => updateField('iapId', e.target.value)}
                        className="focus-visible:ring-[#014f86]"
                      />
                    </div>

                    <div className="space-y-2 md:col-span-2">
                      <Label className="text-[#012a4a]">
                        Current Affiliation (Clinic / Hospital Name)
                      </Label>
                      <Input
                        placeholder="Where do you currently practice?"
                        value={formData.affiliation}
                        onChange={(e) => updateField('affiliation', e.target.value)}
                        className="focus-visible:ring-[#014f86]"
                      />
                    </div>
                  </div>
                </motion.div>
              )}

              {/* STEP 3: EXPERTISE */}
              {step === 3 && (
                <motion.div
                  key="step3"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  className="space-y-8"
                >
                  <h2 className="text-2xl font-bold text-[#012a4a]">Expertise & Languages</h2>

                  <div>
                    <Label className="mb-3 block text-base text-[#012a4a]">
                      Specializations (Select all that apply)
                    </Label>
                    <div className="flex flex-wrap gap-2">
                      {SPECIALIZATIONS.map((spec) => {
                        const isSelected = formData.specializations.includes(spec);
                        return (
                          <Badge
                            key={spec}
                            variant="outline"
                            onClick={() => toggleArrayItem('specializations', spec)}
                            className={cn(
                              `cursor-pointer rounded-sm p-4 text-sm transition-all`,
                              isSelected
                                ? 'border-[#014f86] bg-[#014f86] text-white'
                                : 'border-border bg-white text-[#013a63] hover:border-[#a9d6e5]',
                            )}
                          >
                            {spec}
                          </Badge>
                        );
                      })}
                    </div>
                  </div>

                  <Separator />

                  <div>
                    <Label className="mb-3 block text-base text-[#012a4a]">
                      Educational Qualifications
                    </Label>
                    <div className="flex flex-wrap gap-2">
                      {EDUCATIONS.map((edu) => {
                        const isSelected = formData.education.includes(edu);
                        return (
                          <Badge
                            key={edu}
                            variant="outline"
                            onClick={() => toggleArrayItem('education', edu)}
                            className={cn(
                              `cursor-pointer rounded-sm p-4 text-sm transition-all`,
                              isSelected
                                ? 'border-[#014f86] bg-[#014f86] text-white'
                                : 'border-border bg-white text-[#013a63] hover:border-[#a9d6e5]',
                            )}
                          >
                            {edu}
                          </Badge>
                        );
                      })}
                    </div>
                  </div>

                  <Separator />

                  <div>
                    <Label className="mb-3 block text-base text-[#012a4a]">Languages Spoken</Label>
                    <div className="flex flex-wrap gap-2">
                      {LANGUAGES.map((lang) => {
                        const isSelected = formData.languages.includes(lang);
                        return (
                          <Badge
                            key={lang}
                            variant="outline"
                            onClick={() => toggleArrayItem('languages', lang)}
                            className={cn(
                              `cursor-pointer rounded-sm p-4 text-sm transition-all`,
                              isSelected
                                ? 'border-[#014f86] bg-[#014f86] text-white'
                                : 'border-border bg-white text-[#013a63] hover:border-[#a9d6e5]',
                            )}
                          >
                            {lang}
                          </Badge>
                        );
                      })}
                    </div>
                  </div>
                </motion.div>
              )}

              {/* STEP 4: DOCUMENTS */}
              {step === 4 && (
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
                      <div className="bg-secondary/10 hover:bg-secondary/20 cursor-pointer rounded-xl border-2 border-dashed border-[#a9d6e5] p-8 text-center transition-colors">
                        <UploadCloud className="mx-auto mb-2 h-8 w-8 text-[#014f86]" />
                        <p className="text-sm font-medium text-[#013a63]">
                          Click or drag file to upload
                        </p>
                        <p className="text-muted-foreground mt-1 text-xs">PDF, DOCX up to 5MB</p>
                      </div>
                    </div>

                    <Separator />

                    <div className="space-y-2">
                      <Label className="text-[#012a4a]">Professional Certificates & Licenses</Label>
                      <p className="text-muted-foreground mb-2 text-xs">
                        Upload your degree, IAP registration certificate, etc.
                      </p>
                      <div className="border-border cursor-pointer rounded-xl border-2 border-dashed bg-gray-50 p-8 text-center transition-colors hover:bg-gray-100">
                        <UploadCloud className="text-muted-foreground mx-auto mb-2 h-8 w-8" />
                        <p className="text-sm font-medium text-[#013a63]">
                          Click to upload multiple files
                        </p>
                        <p className="text-muted-foreground mt-1 text-xs">
                          JPG, PNG, PDF up to 10MB total
                        </p>
                      </div>
                    </div>
                  </div>
                </motion.div>
              )}

              {/* STEP 5: REVIEW */}
              {step === 5 && (
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
                          <span className="font-medium text-[#012a4a]">
                            {formData.dob || 'Not provided'}
                          </span>
                        </div>
                        <div>
                          <span className="text-muted-foreground">Experience:</span>{' '}
                          <span className="font-medium text-[#012a4a]">
                            {formData.experience} Years
                          </span>
                        </div>
                        <div>
                          <span className="text-muted-foreground">IAP ID:</span>{' '}
                          <span className="font-medium text-[#012a4a]">
                            {formData.iapId || 'Not provided'}
                          </span>
                        </div>
                        <div>
                          <span className="text-muted-foreground">Affiliation:</span>{' '}
                          <span className="font-medium text-[#012a4a]">
                            {formData.affiliation || 'None'}
                          </span>
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
                      <h4 className="border-border mb-3 border-b pb-2 font-bold text-[#013a63]">
                        Expertise
                      </h4>
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
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </CardContent>

          {/* Footer Actions */}
          <div className="border-border flex items-center justify-between border-t bg-gray-50 p-6">
            <Button
              variant="ghost"
              onClick={handleBack}
              disabled={step === 1 || isSubmitting}
              className="text-[#013a63]"
            >
              <ChevronLeft className="mr-2 h-4 w-4" /> Back
            </Button>

            {step < 5 ? (
              <Button
                onClick={handleNext}
                className="bg-[#014f86] px-8 text-white hover:bg-[#013a63]"
              >
                Next <ChevronRight className="ml-2 h-4 w-4" />
              </Button>
            ) : (
              <Button
                onClick={handleSubmit}
                disabled={isSubmitting}
                className="bg-success px-8 font-bold text-white hover:bg-emerald-600"
              >
                {isSubmitting ? 'Submitting...' : 'Submit for Verification'}
              </Button>
            )}
          </div>
        </Card>
      </main>
    </div>
  );
}
