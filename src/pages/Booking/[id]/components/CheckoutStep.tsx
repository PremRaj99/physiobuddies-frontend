import React, { useState } from 'react';
import { motion } from 'framer-motion';
import {
  User,
  MapPin,
  CreditCard,
  Clock,
  ChevronLeft,
  Tag,
  CheckCircle2,
  X,
  Phone,
  Calendar,
  Ruler,
  Scale,
  Globe,
  ExternalLink,
  Edit2,
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import type { PatientDetail, PatientLocationItem } from '@/services/patient.service';
import { CONDITIONS } from '../constants';
import { useApplyCoupon, useRemoveCoupon } from '@/hooks/usePatient';

interface TherapistSummary {
  name: string;
  image: string | null;
  price: number;
  priceAlt: number | null;
  mode: string;
}

interface CheckoutStepProps {
  sessionId: string;
  therapist: TherapistSummary;
  slotDate: string;
  slotHour: number;
  patient: PatientDetail;
  location: PatientLocationItem;
  conditionId: string | null;
  problemDesc: string;
  couponCode?: string | null;
  couponDiscount?: number;
  onBack: () => void;
  onComplete: () => void;
  isConfirming: boolean;
  onEditPatient?: () => void;
  onEditLocation?: () => void;
}

const calculateAge = (dobString?: string) => {
  if (!dobString) return null;
  const birthDate = new Date(dobString);
  if (isNaN(birthDate.getTime())) return null;
  const today = new Date();
  let age = today.getFullYear() - birthDate.getFullYear();
  const monthDiff = today.getMonth() - birthDate.getMonth();
  if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
    age--;
  }
  return age >= 0 ? age : null;
};

export const CheckoutStep: React.FC<CheckoutStepProps> = ({
  sessionId,
  therapist,
  slotDate,
  slotHour,
  patient,
  location,
  conditionId,
  problemDesc,
  couponCode: initialCouponCode,
  couponDiscount: initialCouponDiscount = 0,
  onBack,
  onComplete,
  isConfirming,
  onEditPatient,
  onEditLocation,
}) => {
  const [termsAccepted, setTermsAccepted] = useState(false);
  const [couponInput, setCouponInput] = useState('');
  const navigate = useNavigate();

  const applyCouponMutation = useApplyCoupon();
  const removeCouponMutation = useRemoveCoupon();

  const condition = CONDITIONS.find((c) => c.id === conditionId);

  const handleApplyCoupon = async () => {
    if (!couponInput.trim()) return;
    try {
      const res = await applyCouponMutation.mutateAsync({
        sessionId,
        couponCode: couponInput.trim(),
      });
      toast.success(res.message || 'Coupon applied successfully!');
      setCouponInput('');
    } catch (e: unknown) {
      const err = e as { response?: { data?: { message?: string } } };
      toast.error(err.response?.data?.message || 'Invalid coupon code.');
    }
  };

  const handleRemoveCoupon = async () => {
    try {
      await removeCouponMutation.mutateAsync(sessionId);
      toast.success('Coupon removed.');
    } catch {
      toast.error('Failed to remove coupon.');
    }
  };

  const discountAmount = initialCouponDiscount || 0;
  const finalPrice = Math.max(0, therapist.price - discountAmount);
  const patientAge = calculateAge(patient.dob);

  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
    >
      <h2 className="mb-6 text-2xl font-bold text-[#012a4a]">Review & Confirm Booking</h2>

      <div className="grid gap-6 lg:grid-cols-3">
        <div className="space-y-4 lg:col-span-2">
          {/* Session Summary */}
          <Card className="border-[#a9d6e5] pt-0 shadow-xs">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 py-4 text-[#013a63]">
                <Clock className="h-4 w-4" /> Session Details
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3 text-sm">
              <div className="flex items-center gap-3">
                <img
                  src={
                    therapist.image ||
                    'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?auto=format&fit=crop&q=80&w=200'
                  }
                  className="h-12 w-12 rounded-full border border-[#a9d6e5] object-cover"
                  alt={therapist.name}
                />
                <div>
                  <p className="font-bold text-[#012a4a]">{therapist.name}</p>
                  <p className="text-muted-foreground capitalize">
                    {therapist.mode.replace('_', ' ')}
                  </p>
                </div>
              </div>
              <Separator />
              <div className="flex justify-between">
                <span className="text-muted-foreground">Date</span>
                <span className="font-medium">{slotDate}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Time Slot</span>
                <span className="font-medium">
                  {String(slotHour).padStart(2, '0')}:00 –{' '}
                  {String((slotHour + 1) % 24).padStart(2, '0')}:00
                </span>
              </div>
              {condition && (
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Condition Category</span>
                  <span className="font-medium">{condition.title}</span>
                </div>
              )}
              {problemDesc && (
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Problem Description</span>
                  <span className="max-w-62.5 truncate font-medium">{problemDesc}</span>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Patient & Location Cards */}
          <div className="grid gap-4 sm:grid-cols-2">
            {/* Complete Patient Info */}
            <Card className="border-[#a9d6e5] pt-0 shadow-xs">
              <CardHeader className="flex flex-row items-center justify-between py-3 pb-0">
                <CardTitle className="flex items-center gap-2 text-base font-semibold text-[#013a63]">
                  <User className="h-4 w-4 text-[#014f86]" /> Patient Info
                </CardTitle>
                {onEditPatient && (
                  <Button
                    variant="ghost"
                    size="sm"
                    className="h-7 px-2 text-xs text-[#014f86] hover:bg-[#e8f4f8]"
                    onClick={onEditPatient}
                  >
                    <Edit2 className="mr-1 h-3 w-3" /> Change
                  </Button>
                )}
              </CardHeader>
              <CardContent className="space-y-3 pt-3 text-sm">
                <div>
                  <p className="text-base font-bold text-[#012a4a]">{patient.name}</p>
                  <p className="text-muted-foreground mt-0.5 flex items-center gap-1 text-xs">
                    <Phone className="h-3 w-3" /> {patient.phone}
                  </p>
                </div>
                <Separator />
                <div className="space-y-1.5 text-xs">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground flex items-center gap-1">Gender:</span>
                    <span className="font-medium text-[#012a4a] capitalize">{patient.gender}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground flex items-center gap-1">
                      <Calendar className="inline h-3 w-3" /> Date of Birth:
                    </span>
                    <span className="font-medium text-[#012a4a]">
                      {patient.dob ? new Date(patient.dob).toLocaleDateString() : 'N/A'}
                      {patientAge !== null && ` (${patientAge} yrs)`}
                    </span>
                  </div>
                  {patient.heightCm !== undefined && patient.heightCm !== null && (
                    <div className="flex justify-between">
                      <span className="text-muted-foreground flex items-center gap-1">
                        <Ruler className="inline h-3 w-3" /> Height:
                      </span>
                      <span className="font-medium text-[#012a4a]">{patient.heightCm} cm</span>
                    </div>
                  )}
                  {patient.weightKg !== undefined && patient.weightKg !== null && (
                    <div className="flex justify-between">
                      <span className="text-muted-foreground flex items-center gap-1">
                        <Scale className="inline h-3 w-3" /> Weight:
                      </span>
                      <span className="font-medium text-[#012a4a]">{patient.weightKg} kg</span>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>

            {/* Complete Location Info */}
            <Card className="border-[#a9d6e5] pt-0 shadow-xs">
              <CardHeader className="flex flex-row items-center justify-between py-3 pb-0">
                <CardTitle className="flex items-center gap-2 text-base font-semibold text-[#013a63]">
                  <MapPin className="h-4 w-4 text-[#014f86]" /> Location Details
                </CardTitle>
                {onEditLocation && (
                  <Button
                    variant="ghost"
                    size="sm"
                    className="h-7 px-2 text-xs text-[#014f86] hover:bg-[#e8f4f8]"
                    onClick={onEditLocation}
                  >
                    <Edit2 className="mr-1 h-3 w-3" /> Change
                  </Button>
                )}
              </CardHeader>
              <CardContent className="space-y-3 pt-3 text-sm">
                <div>
                  <p className="text-sm leading-snug font-bold text-[#012a4a]">
                    {location.address}
                  </p>
                  {location.landmark && (
                    <p className="text-muted-foreground mt-1 text-xs">
                      Landmark:{' '}
                      <span className="font-medium text-[#012a4a]">{location.landmark}</span>
                    </p>
                  )}
                </div>
                <Separator />
                <div className="space-y-1.5 text-xs">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">City & State:</span>
                    <span className="font-medium text-[#012a4a]">
                      {location.city}, {location.state}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Postal Code:</span>
                    <span className="font-medium text-[#012a4a]">{location.postalCode}</span>
                  </div>
                  {location.country && (
                    <div className="flex justify-between">
                      <span className="text-muted-foreground flex items-center gap-1">
                        <Globe className="inline h-3 w-3" /> Country:
                      </span>
                      <span className="font-medium text-[#012a4a]">{location.country}</span>
                    </div>
                  )}
                  {location.location?.lat !== undefined && location.location?.lng !== undefined && (
                    <div className="pt-1 text-right">
                      <a
                        href={`https://www.google.com/maps?q=${location.location.lat},${location.location.lng}`}
                        target="_blank"
                        rel="noreferrer"
                        className="inline-flex items-center gap-1 text-[11px] font-medium text-[#014f86] hover:underline"
                      >
                        Map Pin ({location.location.lat.toFixed(4)},{' '}
                        {location.location.lng.toFixed(4)})
                        <ExternalLink className="h-3 w-3" />
                      </a>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Payment & Coupon Card */}
        <div className="space-y-4">
          {/* Coupon Code Section */}
          <Card className="border-[#a9d6e5] pt-0 shadow-xs">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 py-4 text-[#013a63]">
                <Tag className="h-4 w-4" /> Apply Coupon
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {initialCouponCode ? (
                <div className="flex items-center justify-between rounded-lg border border-emerald-200 bg-emerald-50 p-3 text-sm">
                  <div className="flex items-center gap-2 font-medium text-emerald-800">
                    <CheckCircle2 className="h-4 w-4 text-emerald-600" />
                    <span>Coupon '{initialCouponCode}' applied!</span>
                  </div>
                  <Button
                    size="sm"
                    variant="ghost"
                    className="h-7 w-7 p-0 text-emerald-700 hover:bg-emerald-100"
                    onClick={handleRemoveCoupon}
                    disabled={removeCouponMutation.isPending}
                  >
                    <X className="h-4 w-4" />
                  </Button>
                </div>
              ) : (
                <div className="flex items-center gap-2">
                  <Input
                    placeholder="Enter coupon code"
                    value={couponInput}
                    onChange={(e) => setCouponInput(e.target.value.toUpperCase())}
                    className="border-[#a9d6e5] uppercase"
                  />
                  <Button
                    onClick={handleApplyCoupon}
                    disabled={applyCouponMutation.isPending || !couponInput.trim()}
                    className="bg-[#014f86] text-white hover:bg-[#013a63]"
                  >
                    {applyCouponMutation.isPending ? 'Applying...' : 'Apply'}
                  </Button>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Payment Card */}
          <Card className="h-fit border-[#a9d6e5] pt-0 shadow-xs">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 py-4 text-[#013a63]">
                <CreditCard className="h-4 w-4" /> Payment Breakdown
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3 text-sm">
              <div className="text-muted-foreground flex justify-between">
                <span>Session Fee</span>
                <span>₹{therapist.price}</span>
              </div>
              {discountAmount > 0 && (
                <div className="flex justify-between font-medium text-emerald-600">
                  <span>Coupon Discount</span>
                  <span>-₹{discountAmount}</span>
                </div>
              )}
              <Separator />
              <div className="flex justify-between text-lg font-bold text-[#012a4a]">
                <span>Total Amount</span>
                <span>₹{finalPrice}</span>
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
                  <span
                    onClick={() => navigate('/terms')}
                    className="cursor-pointer text-[#014f86] underline"
                  >
                    Terms & Conditions
                  </span>{' '}
                  and cancellation policy.
                </Label>
              </div>
            </CardContent>
            <CardFooter className="flex-col gap-3">
              <Button
                size="lg"
                className="h-12 w-full bg-emerald-600 font-bold text-white hover:bg-emerald-700"
                disabled={!termsAccepted || isConfirming}
                onClick={onComplete}
              >
                {isConfirming ? 'Processing Payment...' : `Pay ₹${finalPrice} & Complete Booking`}
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
