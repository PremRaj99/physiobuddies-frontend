'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  User,
  MapPin,
  CreditCard,
  Clock,
  CheckCircle2,
  Plus,
  ChevronLeft,
  ChevronRight,
  ShieldCheck,
  AlertCircle,
  Stethoscope,
  Home,
  Tag,
  Activity,
  CheckCircle,
} from 'lucide-react';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { Checkbox } from '@/components/ui/checkbox';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Textarea } from '@/components/ui/textarea';
import { cn } from '@/lib/utils';
import { useNavigate } from 'react-router-dom';

// --- Types ---
type Gender = 'MALE' | 'FEMALE' | 'OTHER';

interface Patient {
  id: string;
  name: string;
  dob: string;
  gender: Gender;
  phone: string;
  heightCm: number;
  weightKg: number;
  updatedAt: string;
}

interface Location {
  id: string;
  address: string;
  landmark: string | null;
  city: string;
  state: string;
  country: string;
  postalCode: string;
  location: { lat: number; lng: number };
  updatedAt: string;
}

interface BookingSession {
  therapistName: string;
  therapistImage: string;
  date: string;
  mode: 'home_visit' | 'online' | 'clinic';
  timeSlot: string;
  basePrice: number;
  discountedPrice: number;
  distanceKm: number;
  perKmPrice: number; // Applied for distance > 5km
}

// --- Mock Data ---
const MOCK_SESSION: BookingSession = {
  therapistName: 'Dr. Sarah Jenkins',
  therapistImage:
    'https://images.unsplash.com/photo-1594824436998-d7037b52479e?auto=format&fit=crop&q=80&w=200',
  date: 'May 22, 2026',
  timeSlot: '10:00 AM - 11:00 AM',
  mode: 'home_visit',
  basePrice: 2000,
  discountedPrice: 1500,
  distanceKm: 8, // 3km over the 5km limit
  perKmPrice: 50,
};

const INITIAL_PATIENTS: Patient[] = [
  {
    id: 'p1',
    name: 'John Doe',
    dob: '1990-05-15',
    gender: 'MALE',
    phone: '+91 9876543210',
    heightCm: 175,
    weightKg: 70,
    updatedAt: '2026-05-10',
  },
  {
    id: 'p2',
    name: 'Jane Doe',
    dob: '1992-08-22',
    gender: 'FEMALE',
    phone: '+91 9876543211',
    heightCm: 160,
    weightKg: 62,
    updatedAt: '2026-05-12',
  },
];

const INITIAL_LOCATIONS: Location[] = [
  {
    id: 'l1',
    address: 'Apt 4B, Wellness Heights',
    landmark: 'Near Central Park',
    city: 'New Delhi',
    state: 'Delhi',
    country: 'India',
    postalCode: '110001',
    location: { lat: 28.6139, lng: 77.209 },
    updatedAt: '2026-05-01',
  },
];

const CONDITIONS = [
  {
    id: 'ortho',
    title: 'Ortho',
    desc: 'Joint, bone, or muscle pain',
    image:
      'https://images.unsplash.com/photo-1579684385127-1ef15d508118?auto=format&fit=crop&q=80&w=300',
  },
  {
    id: 'neuro',
    title: 'Neuro',
    desc: 'Nerve issues, stroke rehab',
    image:
      'https://images.unsplash.com/photo-1559757175-5700dde675bc?auto=format&fit=crop&q=80&w=300',
  },
  {
    id: 'sport',
    title: 'Sport',
    desc: 'Athletic recovery & injury',
    image:
      'https://images.unsplash.com/photo-1461896836934-ffe607ba8211?auto=format&fit=crop&q=80&w=300',
  },
  {
    id: 'post_surgical',
    title: 'Post Surgical',
    desc: 'Recovery after operations',
    image:
      'https://images.unsplash.com/photo-1581595220892-b0739db3ba8c?auto=format&fit=crop&q=80&w=300',
  },
  {
    id: 'cardio',
    title: 'Cardio',
    desc: 'Heart & lung rehabilitation',
    image:
      'https://images.unsplash.com/photo-1505506874110-6a7a6c9924cb?auto=format&fit=crop&q=80&w=300',
  },
  {
    id: 'geriatric',
    title: 'Geriatric',
    desc: 'Elderly care & mobility',
    image:
      'https://images.unsplash.com/photo-1516801968815-534d3d4b6849?auto=format&fit=crop&q=80&w=300',
  },
  {
    id: 'pediatric',
    title: 'Pediatric',
    desc: 'Child physical development',
    image:
      'https://images.unsplash.com/photo-1502086223501-7ea6ecd79368?auto=format&fit=crop&q=80&w=300',
  },
  {
    id: 'womens_health',
    title: "Women's Health",
    desc: 'Pregnancy & postpartum',
    image:
      'https://images.unsplash.com/photo-1515377905703-c4788e51af15?auto=format&fit=crop&q=80&w=300',
  },
  {
    id: 'ergonomics',
    title: 'Ergonomics',
    desc: 'Posture & workplace pain',
    image:
      'https://images.unsplash.com/photo-1497215848590-50d44b58e727?auto=format&fit=crop&q=80&w=300',
  },
  {
    id: 'general',
    title: 'General',
    desc: 'Routine checkups & wellness',
    image:
      'https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?auto=format&fit=crop&q=80&w=300',
  },
];

// --- Sub-Components ---

const SessionExpired = () => (
  <div className="flex min-h-[60vh] flex-col items-center justify-center px-4 text-center">
    <div className="mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-red-50">
      <Clock className="h-10 w-10 text-red-500" />
    </div>
    <h2 className="mb-4 text-3xl font-bold text-[#012a4a]">Session Expired</h2>
    <p className="text-muted-foreground mb-8 max-w-md">
      For your security and to ensure fair slot availability, your booking session has expired.
      Please restart the booking process.
    </p>
    <Button className="bg-[#014f86] hover:bg-[#013a63]" onClick={() => window.location.reload()}>
      Start Over
    </Button>
  </div>
);

const TimerHeader = ({ timeLeft, currentStep }: { timeLeft: number; currentStep: number }) => {
  const minutes = Math.floor(timeLeft / 60);
  const seconds = timeLeft % 60;
  const isUrgent = timeLeft < 120; // Less than 2 mins

  const steps = [
    { num: 1, label: 'Patient', icon: User },
    { num: 2, label: 'Location', icon: MapPin },
    { num: 3, label: 'Condition', icon: Activity },
    { num: 4, label: 'Checkout', icon: CreditCard },
  ];

  return (
    <div className="border-border sticky top-0 z-50 mb-8 border-b bg-white/80 py-4 backdrop-blur-md">
      <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-4 px-4 md:flex-row">
        {/* Stepper */}
        <div className="flex w-full items-center gap-1 overflow-x-auto pb-2 [-ms-overflow-style:none] [scrollbar-width:none] sm:gap-3 md:w-auto md:pb-0 [&::-webkit-scrollbar]:hidden">
          {steps.map((step, idx) => {
            const isActive = currentStep === step.num;
            const isPast = currentStep > step.num;
            return (
              <div key={step.num} className="flex shrink-0 items-center">
                <div
                  className={`flex h-8 w-8 items-center justify-center rounded-full text-sm font-bold transition-colors ${
                    isActive
                      ? 'bg-[#014f86] text-white'
                      : isPast
                        ? 'text-success border-transparent bg-[#ffffff]'
                        : 'bg-secondary text-muted-foreground'
                  }`}
                >
                  {isPast ? <CheckCircle className="h-6 w-6" /> : step.num}
                </div>
                <span
                  className={`ml-2 hidden text-sm font-semibold sm:block ${
                    isActive || isPast ? 'text-[#012a4a]' : 'text-muted-foreground'
                  }`}
                >
                  {step.label}
                </span>
                {idx < steps.length - 1 && (
                  <div
                    className={`mx-2 h-1 w-6 rounded-full sm:mx-3 sm:w-10 ${isPast ? 'bg-[#a9d6e5]' : 'bg-secondary'}`}
                  />
                )}
              </div>
            );
          })}
        </div>

        {/* Timer */}
        <div
          className={`flex shrink-0 items-center gap-2 rounded-full px-4 py-2 font-bold tracking-widest ${
            isUrgent
              ? 'border border-red-200 bg-red-50 text-red-600'
              : 'bg-[#a9d6e5]/30 text-[#013a63]'
          }`}
        >
          <Clock className="h-4 w-4" />
          {String(minutes).padStart(2, '0')}:{String(seconds).padStart(2, '0')}
        </div>
      </div>
    </div>
  );
};

const PatientStep = ({
  patients,
  selectedId,
  onSelect,
  onNext,
}: {
  patients: Patient[];
  selectedId: string | null;
  onSelect: (id: string) => void;
  onNext: () => void;
}) => {
  const [showNewForm, setShowNewForm] = useState(false);

  // Calculate BMI if height and weight exist
  const getBmiLabel = (height: number, weight: number) => {
    const heightM = height / 100;
    const bmi = (weight / (heightM * heightM)).toFixed(1);
    return `BMI: ${bmi}`;
  };

  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
    >
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-[#012a4a]">Select Patient</h2>
          <p className="text-muted-foreground">Who is this booking for?</p>
        </div>
        <Button
          variant="outline"
          className="border-[#014f86] text-[#014f86]"
          onClick={() => setShowNewForm(!showNewForm)}
        >
          <Plus className="mr-2 h-4 w-4" /> New Patient
        </Button>
      </div>

      {showNewForm ? (
        <Card className="mb-6 border-[#a9d6e5] bg-[#f8fbfa] pt-0">
          <CardHeader>
            <CardTitle className="py-4 text-[#013a63]">Add New Patient</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="name">Full Name</Label>
                <Input id="name" placeholder="Enter patient name" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="dob">Date of Birth</Label>
                <Input id="dob" type="date" />
              </div>
              <div className="space-y-2">
                <Label>Gender</Label>
                <RadioGroup defaultValue="MALE" className="flex gap-4">
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="MALE" id="r1" />
                    <Label htmlFor="r1">Male</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="FEMALE" id="r2" />
                    <Label htmlFor="r2">Female</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="OTHER" id="r3" />
                    <Label htmlFor="r3">Other</Label>
                  </div>
                </RadioGroup>
              </div>
              <div className="space-y-2">
                <Label htmlFor="phone">Phone Number</Label>
                <Input id="phone" placeholder="+91 XXXXX XXXXX" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="height">Height (cm)</Label>
                <Input id="height" type="number" placeholder="e.g. 170" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="weight">Weight (kg)</Label>
                <Input id="weight" type="number" placeholder="e.g. 65" />
              </div>
            </div>
            <div className="mt-4 flex justify-end gap-2">
              <Button variant="ghost" onClick={() => setShowNewForm(false)}>
                Cancel
              </Button>
              <Button className="bg-[#014f86] hover:bg-[#013a63]">Save & Select</Button>
            </div>
          </CardContent>
        </Card>
      ) : (
        <div className="mb-8 grid grid-cols-1 gap-4 md:grid-cols-2">
          {patients.map((p) => (
            <Card
              key={p.id}
              className={cn(
                `cursor-pointer py-0 transition-all`,
                selectedId === p.id
                  ? 'border-[#014f86] bg-[#014f86]/5 ring-1 ring-[#014f86]'
                  : 'hover:border-[#a9d6e5]',
              )}
              onClick={() => onSelect(p.id)}
            >
              <CardContent className="flex items-start gap-4 p-4">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#a9d6e5]/40">
                  <User className="h-5 w-5 text-[#013a63]" />
                </div>
                <div>
                  <h4 className="font-bold text-[#012a4a]">{p.name}</h4>
                  <div className="text-muted-foreground mt-0.5 flex flex-wrap items-center gap-1.5 text-sm">
                    <span className="capitalize">{p.gender.toLowerCase()}</span>
                    <span>•</span>
                    <span>{p.dob}</span>
                    {(p.heightCm || p.weightKg) && (
                      <>
                        <span>•</span>
                        <Badge
                          variant="secondary"
                          className="bg-[#a9d6e5]/20 py-0 text-[10px] text-[#013a63] hover:bg-[#a9d6e5]/20"
                        >
                          {getBmiLabel(p.heightCm, p.weightKg) || 'Vitals saved'}
                        </Badge>
                      </>
                    )}
                  </div>
                  <p className="text-muted-foreground mt-1 text-sm">{p.phone}</p>
                </div>
                {selectedId === p.id && (
                  <CheckCircle2 className="ml-auto h-5 w-5 shrink-0 text-[#014f86]" />
                )}
              </CardContent>
            </Card>
          ))}
        </div>
      )}

      <div className="flex justify-end">
        <Button
          size="lg"
          className="bg-[#014f86] hover:bg-[#013a63]"
          disabled={!selectedId || showNewForm}
          onClick={onNext}
        >
          Continue to Location <ChevronRight className="ml-2 h-4 w-4" />
        </Button>
      </div>
    </motion.div>
  );
};

const LocationStep = ({
  locations,
  selectedId,
  onSelect,
  onNext,
  onBack,
}: {
  locations: Location[];
  selectedId: string | null;
  onSelect: (id: string) => void;
  onNext: () => void;
  onBack: () => void;
}) => {
  const [showNewForm, setShowNewForm] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
    >
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-[#012a4a]">Treatment Location</h2>
          <p className="text-muted-foreground">Where should the therapist visit?</p>
        </div>
        <Button
          variant="outline"
          className="border-[#014f86] text-[#014f86]"
          onClick={() => setShowNewForm(!showNewForm)}
        >
          <Plus className="mr-2 h-4 w-4" /> New Location
        </Button>
      </div>

      {showNewForm ? (
        <Card className="mb-6 border-[#a9d6e5] bg-[#f8fbfa] pt-0">
          <CardHeader>
            <CardTitle className="py-4 text-[#013a63]">Add New Address</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
              <div className="space-y-2 md:col-span-2">
                <Label htmlFor="address">Street Address</Label>
                <Input id="address" placeholder="House/Flat No., Street Name" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="landmark">Landmark (Optional)</Label>
                <Input id="landmark" placeholder="Near..." />
              </div>
              <div className="space-y-2">
                <Label htmlFor="city">City</Label>
                <Input id="city" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="state">State</Label>
                <Input id="state" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="zip">Postal Code</Label>
                <Input id="zip" />
              </div>
            </div>
            <div className="mt-4 flex justify-end gap-2">
              <Button variant="ghost" onClick={() => setShowNewForm(false)}>
                Cancel
              </Button>
              <Button className="bg-[#014f86] hover:bg-[#013a63]">Save & Select</Button>
            </div>
          </CardContent>
        </Card>
      ) : (
        <div className="mb-8 grid grid-cols-1 gap-4 md:grid-cols-2">
          {locations.map((l) => (
            <Card
              key={l.id}
              className={cn(
                `cursor-pointer py-0 transition-all`,
                selectedId === l.id
                  ? 'border-[#014f86] bg-[#014f86]/5 ring-1 ring-[#014f86]'
                  : 'hover:border-[#a9d6e5]',
              )}
              onClick={() => onSelect(l.id)}
            >
              <CardContent className="flex items-start gap-4 p-4">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#a9d6e5]/40">
                  <MapPin className="h-5 w-5 text-[#013a63]" />
                </div>
                <div>
                  <h4 className="font-bold text-[#012a4a]">{l.address}</h4>
                  <p className="text-muted-foreground text-sm">
                    {l.city}, {l.state} {l.postalCode}
                  </p>
                  {l.landmark && (
                    <p className="text-muted-foreground mt-1 text-xs">Landmark: {l.landmark}</p>
                  )}
                </div>
                {selectedId === l.id && <CheckCircle2 className="ml-auto h-5 w-5 text-[#014f86]" />}
              </CardContent>
            </Card>
          ))}
        </div>
      )}

      <div className="flex justify-between">
        <Button variant="outline" onClick={onBack}>
          <ChevronLeft className="mr-2 h-4 w-4" /> Back
        </Button>
        <Button
          size="lg"
          className="bg-[#014f86] hover:bg-[#013a63]"
          disabled={!selectedId || showNewForm}
          onClick={onNext}
        >
          Condition Details <ChevronRight className="ml-2 h-4 w-4" />
        </Button>
      </div>
    </motion.div>
  );
};

const ConditionStep = ({
  selectedConditionId,
  onSelectCondition,
  problemDesc,
  onChangeDesc,
  onNext,
  onBack,
}: {
  selectedConditionId: string | null;
  onSelectCondition: (id: string) => void;
  problemDesc: string;
  onChangeDesc: (desc: string) => void;
  onNext: () => void;
  onBack: () => void;
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
    >
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-[#012a4a]">Primary Condition</h2>
        <p className="text-muted-foreground">
          Select the category that best describes your needs to help the therapist prepare.
        </p>
      </div>

      <div className="mb-8 grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-5">
        {CONDITIONS.map((cond) => {
          const isSelected = selectedConditionId === cond.id;
          return (
            <Card
              key={cond.id}
              onClick={() => onSelectCondition(cond.id)}
              className={cn(
                `cursor-pointer overflow-hidden transition-all duration-300`,
                isSelected
                  ? 'border-[#014f86] bg-blue-50/50 shadow-md ring-2 ring-[#014f86]'
                  : 'bg-white hover:border-[#a9d6e5] hover:shadow-sm',
              )}
            >
              <div className="bg-secondary relative h-24 w-full overflow-hidden">
                <img
                  src={cond.image}
                  alt={cond.title}
                  className="h-full w-full object-cover transition-transform duration-500 hover:scale-110"
                />
                <div className="absolute inset-0 bg-linear-to-t from-black/60 to-transparent" />
                <h4 className="absolute right-2 bottom-2 left-2 text-sm font-bold text-white">
                  {cond.title}
                </h4>
              </div>
              <CardContent className="p-3">
                <p className="text-muted-foreground text-xs leading-tight">{cond.desc}</p>
                {isSelected && (
                  <div className="mt-2 flex justify-end">
                    <CheckCircle2 className="h-4 w-4 text-[#014f86]" />
                  </div>
                )}
              </CardContent>
            </Card>
          );
        })}
      </div>

      <div className="mb-8">
        <Label htmlFor="problem-desc" className="mb-2 block text-lg font-bold text-[#012a4a]">
          Describe your problem{' '}
          <span className="text-muted-foreground text-sm font-normal">(Optional)</span>
        </Label>
        <Textarea
          id="problem-desc"
          placeholder="Briefly describe your pain, recent surgeries, or specific areas of concern..."
          className="min-h-30 focus-visible:ring-[#014f86]"
          value={problemDesc}
          onChange={(e) => onChangeDesc(e.target.value)}
        />
        <p className="text-muted-foreground mt-2 text-xs">
          This helps the therapist bring the right equipment and tailor the session to you.
        </p>
      </div>

      <div className="flex justify-between">
        <Button variant="outline" onClick={onBack}>
          <ChevronLeft className="mr-2 h-4 w-4" /> Back
        </Button>
        <Button
          size="lg"
          className="bg-[#014f86] hover:bg-[#013a63]"
          disabled={!selectedConditionId}
          onClick={onNext}
        >
          Review & Checkout <ChevronRight className="ml-2 h-4 w-4" />
        </Button>
      </div>
    </motion.div>
  );
};

const CheckoutStep = ({
  session,
  patient,
  location,
  conditionId,
  problemDesc,
  onBack,
  onComplete,
}: {
  session: BookingSession;
  patient: Patient;
  location: Location;
  conditionId: string | null;
  problemDesc: string;
  onBack: () => void;
  onComplete: () => void;
}) => {
  const [coupon, setCoupon] = useState('');
  const [discountApplied, setDiscountApplied] = useState(0);
  const [termsAccepted, setTermsAccepted] = useState(false);

  const navigate = useNavigate();
  // Bill Calculations
  const travelFee =
    session.mode === 'home_visit' && session.distanceKm > 5
      ? (session.distanceKm - 5) * session.perKmPrice
      : 0;

  const subTotal = session.discountedPrice + travelFee;
  const finalTotal = Math.max(0, subTotal - discountApplied);

  const applyCoupon = () => {
    if (coupon.toUpperCase() === 'WELLNESS200') {
      setDiscountApplied(200);
    } else {
      alert('Invalid Coupon Code');
      setDiscountApplied(0);
    }
  };

  const selectedCondition = CONDITIONS.find((c) => c.id === conditionId);

  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
    >
      <h2 className="mb-6 text-2xl font-bold text-[#012a4a]">Review & Checkout</h2>

      <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
        {/* Left Column: Details */}
        <div className="space-y-6 lg:col-span-2">
          <Card className="border-border pt-0">
            <CardHeader className="bg-secondary/20 py-4">
              <CardTitle className="flex items-center gap-2 text-lg text-[#013a63]">
                <Stethoscope className="h-5 w-5" /> Session Details
              </CardTitle>
            </CardHeader>
            <CardContent className="pt-6">
              <div className="mb-6 flex items-center gap-4">
                <img
                  src={session.therapistImage}
                  alt={session.therapistName}
                  className="h-16 w-16 rounded-full border-2 border-[#a9d6e5] object-cover"
                />
                <div>
                  <h3 className="text-lg font-bold text-[#012a4a]">{session.therapistName}</h3>
                  <div className="mt-1 flex gap-2">
                    <Badge variant="outline" className="border-[#014f86] text-[#014f86]">
                      {session.mode === 'home_visit'
                        ? 'Home Visit'
                        : session.mode === 'online'
                          ? 'Online'
                          : 'Clinic'}
                    </Badge>
                  </div>
                </div>
              </div>

              <div className="border-border mb-6 grid grid-cols-2 gap-4 border-b pb-6 text-sm">
                <div>
                  <p className="text-muted-foreground mb-1">Date & Time</p>
                  <p className="font-semibold text-[#012a4a]">{session.date}</p>
                  <p className="font-semibold text-[#012a4a]">{session.timeSlot}</p>
                </div>
                <div>
                  <p className="text-muted-foreground mb-1">Patient</p>
                  <p className="font-semibold text-[#012a4a]">{patient.name}</p>
                  <p className="text-muted-foreground">{patient.phone}</p>
                </div>
              </div>

              {/* Display Condition Details */}
              <div className="text-sm">
                <p className="text-muted-foreground mb-2 flex items-center gap-2">
                  <Activity className="h-4 w-4" /> Primary Condition
                </p>
                {selectedCondition ? (
                  <Badge className="mb-3 border-none bg-[#a9d6e5]/30 text-[#013a63] hover:bg-[#a9d6e5]/40">
                    {selectedCondition.title}
                  </Badge>
                ) : (
                  <span className="text-muted-foreground">Not specified</span>
                )}

                {problemDesc && (
                  <div className="border-border rounded-md border bg-gray-50 p-3">
                    <p className="text-xs leading-relaxed text-[#012a4a] italic">"{problemDesc}"</p>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>

          {session.mode === 'home_visit' && (
            <Card className="border-border pt-0">
              <CardHeader className="bg-secondary/20 py-4">
                <CardTitle className="flex items-center gap-2 text-lg text-[#013a63]">
                  <Home className="h-5 w-5" /> Visit Location
                </CardTitle>
              </CardHeader>
              <CardContent className="pt-6">
                <p className="font-semibold text-[#012a4a]">{location.address}</p>
                <p className="text-muted-foreground mt-1 text-sm">
                  {location.city}, {location.state} {location.postalCode}
                </p>
                <p className="text-warning mt-3 flex items-center gap-1 text-sm font-medium">
                  <AlertCircle className="h-4 w-4" /> Distance from clinic: {session.distanceKm}km
                  (Travel fee applies beyond 5km)
                </p>
              </CardContent>
            </Card>
          )}
        </div>

        {/* Right Column: Billing */}
        <div>
          <Card className="border-border sticky top-28 pt-0">
            <CardHeader className="rounded-t-lg bg-[#012a4a] py-4 text-white">
              <CardTitle className="text-lg">Bill Summary</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4 pt-6">
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Consultation Fee</span>
                <span className="text-muted-foreground font-medium line-through">
                  ₹{session.basePrice}
                </span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Discounted Price</span>
                <span className="font-semibold text-[#012a4a]">₹{session.discountedPrice}</span>
              </div>

              {travelFee > 0 && (
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">
                    Travel Fee ({session.distanceKm - 5}km extra)
                  </span>
                  <span className="font-semibold text-[#012a4a]">₹{travelFee}</span>
                </div>
              )}

              {discountApplied > 0 && (
                <div className="text-success flex justify-between text-sm">
                  <span>Coupon Applied</span>
                  <span className="font-bold">- ₹{discountApplied}</span>
                </div>
              )}

              <Separator />

              <div className="flex gap-2">
                <Input
                  placeholder="Enter Coupon Code"
                  value={coupon}
                  onChange={(e) => setCoupon(e.target.value)}
                  className="h-10 border-[#a9d6e5] uppercase"
                />
                <Button
                  variant="outline"
                  className="h-10 border-[#014f86] text-[#014f86]"
                  onClick={applyCoupon}
                >
                  Apply
                </Button>
              </div>
              <p className="text-muted-foreground flex items-center gap-1 text-xs italic">
                <Tag className="h-3 w-3" /> Try code 'WELLNESS200'
              </p>

              <Separator />

              <div className="flex items-center justify-between text-lg font-bold text-[#012a4a]">
                <span>Total Amount</span>
                <span>₹{finalTotal}</span>
              </div>

              <div className="flex items-start gap-2 pt-4">
                <Checkbox
                  id="terms"
                  checked={termsAccepted}
                  onCheckedChange={(c) => setTermsAccepted(c as boolean)}
                  className="mt-1 border-[#014f86] data-[state=checked]:bg-[#014f86]"
                />
                <Label
                  htmlFor="terms"
                  className="text-muted-foreground inline-block text-xs leading-relaxed"
                >
                  I agree to the{' '}
                  <span
                    onClick={() => navigate('/terms')}
                    className="cursor-pointer text-[#014f86] underline"
                  >
                    Terms & Conditions
                  </span>{' '}
                  and understand the cancellation policy.
                </Label>
              </div>
            </CardContent>

            <CardFooter className="flex-col gap-3">
              <Button
                size="lg"
                className="bg-success h-12 w-full font-bold text-white hover:bg-emerald-600"
                disabled={!termsAccepted}
                onClick={onComplete}
              >
                Pay ₹{finalTotal} & Book
              </Button>
              <Button variant="ghost" className="text-muted-foreground w-full" onClick={onBack}>
                <ChevronLeft className="mr-2 h-4 w-4" /> Back to Condition
              </Button>
            </CardFooter>
          </Card>
        </div>
      </div>
    </motion.div>
  );
};

// --- Main Page Wrapper ---

export default function BookingProcessPage() {
  const [currentStep, setCurrentStep] = useState(1);
  const [timeLeft, setTimeLeft] = useState(600); // 10 minutes in seconds

  // Form selections
  const [patients] = useState<Patient[]>(INITIAL_PATIENTS);
  const [selectedPatientId, setSelectedPatientId] = useState<string | null>(null);

  const [locations] = useState<Location[]>(INITIAL_LOCATIONS);
  const [selectedLocationId, setSelectedLocationId] = useState<string | null>(null);

  const [selectedConditionId, setSelectedConditionId] = useState<string | null>(null);
  const [problemDescription, setProblemDescription] = useState<string>('');

  // Timer Effect
  useEffect(() => {
    if (timeLeft <= 0) {
      return;
    }
    const timer = setInterval(() => setTimeLeft((prev) => prev - 1), 1000);
    return () => clearInterval(timer);
  }, [timeLeft]);

  if (timeLeft <= 0) return <SessionExpired />;

  const handleFinalCheckout = () => {
    alert('Payment Processing... Booking Confirmed!');
    // Route to confirmation page
  };

  return (
    <div className="bg-background min-h-screen pb-24 font-sans">
      <TimerHeader timeLeft={timeLeft} currentStep={currentStep} />

      <main className="mx-auto max-w-6xl px-4">
        <div className="mb-8 flex items-center gap-2 text-[#013a63]">
          <ShieldCheck className="text-success h-5 w-5" />
          <span className="text-sm font-medium">Secure Checkout Environment</span>
        </div>

        <AnimatePresence mode="wait">
          {currentStep === 1 && (
            <PatientStep
              key="step1"
              patients={patients}
              selectedId={selectedPatientId}
              onSelect={setSelectedPatientId}
              onNext={() => setCurrentStep(2)}
            />
          )}

          {currentStep === 2 && (
            <LocationStep
              key="step2"
              locations={locations}
              selectedId={selectedLocationId}
              onSelect={setSelectedLocationId}
              onBack={() => setCurrentStep(1)}
              onNext={() => setCurrentStep(3)}
            />
          )}

          {currentStep === 3 && (
            <ConditionStep
              key="step3"
              selectedConditionId={selectedConditionId}
              onSelectCondition={setSelectedConditionId}
              problemDesc={problemDescription}
              onChangeDesc={setProblemDescription}
              onBack={() => setCurrentStep(2)}
              onNext={() => setCurrentStep(4)}
            />
          )}

          {currentStep === 4 && selectedPatientId && selectedLocationId && (
            <CheckoutStep
              key="step4"
              session={MOCK_SESSION}
              patient={patients.find((p) => p.id === selectedPatientId)!}
              location={locations.find((l) => l.id === selectedLocationId)!}
              conditionId={selectedConditionId}
              problemDesc={problemDescription}
              onBack={() => setCurrentStep(3)}
              onComplete={handleFinalCheckout}
            />
          )}
        </AnimatePresence>
      </main>
    </div>
  );
}
