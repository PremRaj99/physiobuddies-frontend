import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { User, MapPin, CreditCard, Clock, ChevronLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';
import type { PatientDetail, PatientLocationItem } from '@/services/patient.service';
import { CONDITIONS } from '../constants';

interface TherapistSummary {
  name: string;
  image: string | null;
  price: number;
  priceAlt: number | null;
  mode: string;
}

interface CheckoutStepProps {
  therapist: TherapistSummary;
  slotDate: string;
  slotHour: number;
  patient: PatientDetail;
  location: PatientLocationItem;
  conditionId: string | null;
  problemDesc: string;
  onBack: () => void;
  onComplete: () => void;
  isConfirming: boolean;
}

export const CheckoutStep: React.FC<CheckoutStepProps> = ({
  therapist,
  slotDate,
  slotHour,
  patient,
  location,
  conditionId,
  problemDesc,
  onBack,
  onComplete,
  isConfirming,
}) => {
  const [termsAccepted, setTermsAccepted] = useState(false);
  const navigate = useNavigate();
  const condition = CONDITIONS.find((c) => c.id === conditionId);
  const discount =
    therapist.priceAlt && therapist.priceAlt > therapist.price
      ? Math.round((1 - therapist.price / therapist.priceAlt) * 100)
      : 0;

  return (
    <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}>
      <h2 className="mb-6 text-2xl font-bold text-[#012a4a]">Review & Confirm</h2>

      <div className="grid gap-6 lg:grid-cols-3">
        <div className="space-y-4 lg:col-span-2">
          {/* Session Summary */}
          <Card className="border-[#a9d6e5] pt-0">
            <CardHeader>
              <CardTitle className="py-4 text-[#013a63] flex items-center gap-2">
                <Clock className="h-4 w-4" /> Session Details
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3 text-sm">
              <div className="flex items-center gap-3">
                <img src={therapist.image || '/placeholder.jpg'} className="h-12 w-12 rounded-full object-cover" alt={therapist.name} />
                <div>
                  <p className="font-bold text-[#012a4a]">Dr. {therapist.name}</p>
                  <p className="text-muted-foreground capitalize">{therapist.mode.replace('_', ' ')}</p>
                </div>
              </div>
              <Separator />
              <div className="flex justify-between"><span className="text-muted-foreground">Date</span><span className="font-medium">{slotDate}</span></div>
              <div className="flex justify-between"><span className="text-muted-foreground">Time</span><span className="font-medium">{slotHour}:00 – {slotHour}:40</span></div>
              {condition && <div className="flex justify-between"><span className="text-muted-foreground">Condition</span><span className="font-medium">{condition.title}</span></div>}
              {problemDesc && <div className="flex justify-between"><span className="text-muted-foreground">Notes</span><span className="font-medium">{problemDesc}</span></div>}
            </CardContent>
          </Card>

          {/* Patient & Location */}
          <div className="grid gap-4 sm:grid-cols-2">
            <Card className="border-[#a9d6e5] pt-0">
              <CardHeader>
                <CardTitle className="py-4 text-[#013a63] flex items-center gap-2">
                  <User className="h-4 w-4" /> Patient
                </CardTitle>
              </CardHeader>
              <CardContent className="text-sm space-y-1">
                <p className="font-bold text-[#012a4a]">{patient.name}</p>
                <p className="text-muted-foreground capitalize">{patient.gender} · {new Date(patient.dob).toLocaleDateString()}</p>
                <p className="text-muted-foreground">{patient.phone}</p>
              </CardContent>
            </Card>
            <Card className="border-[#a9d6e5] pt-0">
              <CardHeader>
                <CardTitle className="py-4 text-[#013a63] flex items-center gap-2">
                  <MapPin className="h-4 w-4" /> Location
                </CardTitle>
              </CardHeader>
              <CardContent className="text-sm space-y-1">
                <p className="font-bold text-[#012a4a]">{location.address}</p>
                <p className="text-muted-foreground">{location.city}, {location.state}</p>
                {location.landmark && <p className="text-muted-foreground text-xs">{location.landmark}</p>}
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Payment Card */}
        <Card className="border-[#a9d6e5] pt-0 h-fit">
          <CardHeader>
            <CardTitle className="py-4 text-[#013a63] flex items-center gap-2">
              <CreditCard className="h-4 w-4" /> Payment
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3 text-sm">
            {therapist.priceAlt && (
              <div className="flex justify-between text-muted-foreground">
                <span>Base Price</span><span className="line-through">₹{therapist.priceAlt}</span>
              </div>
            )}
            {discount > 0 && (
              <div className="flex justify-between text-green-600">
                <span>Discount</span><span>-{discount}%</span>
              </div>
            )}
            <Separator />
            <div className="flex justify-between text-lg font-bold text-[#012a4a]">
              <span>Total</span><span>₹{therapist.price}</span>
            </div>
            <div className="flex items-start gap-2 pt-2">
              <Checkbox
                id="terms"
                checked={termsAccepted}
                onCheckedChange={(c) => setTermsAccepted(c as boolean)}
                className="mt-1 border-[#014f86] data-[state=checked]:bg-[#014f86]"
              />
              <Label htmlFor="terms" className="text-muted-foreground text-xs leading-relaxed">
                I agree to the{' '}
                <span onClick={() => navigate('/terms')} className="cursor-pointer text-[#014f86] underline">Terms & Conditions</span>
                {' '}and cancellation policy.
              </Label>
            </div>
          </CardContent>
          <CardFooter className="flex-col gap-3">
            <Button
              size="lg"
              className="bg-success h-12 w-full font-bold text-white hover:bg-emerald-600"
              disabled={!termsAccepted || isConfirming}
              onClick={onComplete}
            >
              {isConfirming ? 'Confirming...' : `Pay ₹${therapist.price} & Book`}
            </Button>
            <Button variant="ghost" className="text-muted-foreground w-full" onClick={onBack}>
              <ChevronLeft className="mr-2 h-4 w-4" /> Back
            </Button>
          </CardFooter>
        </Card>
      </div>
    </motion.div>
  );
};
