import { motion } from 'framer-motion';
import {
  Award,
  BookOpen,
  CalendarDays,
  Clock,
  Home,
  Info,
  MapPin,
  MessageSquare,
  ShieldCheck,
  Video,
} from 'lucide-react';
import { useMemo, useState } from 'react';

import StarRating from '@/components/custom/star-rating/star-rating';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { Skeleton } from '@/components/ui/skeleton';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useNavigate, useParams } from 'react-router';
import { toast } from 'sonner';
import {
  useTherapistArticlesById,
  useTherapistAvailability,
  useTherapistDetail,
  useTherapistFaqsById,
  useTherapistReviews,
} from '@/hooks/useTherapist';
import type { AvailabilityDay } from '@/services/therapist.service';

interface TimeSlot {
  id: string; // `${date}_${startHour}`
  time: string; // "10:00 AM - 10:40 AM"
  available: boolean;
  startHour: number;
  date: string; // DD-MM-YYYY
}

type PeriodKey = 'morning' | 'evening' | 'night';
type PeriodData = Record<PeriodKey, TimeSlot[]>;

const minutesToTime = (mins: number) => {
  const h = Math.floor(mins / 60);
  const m = mins % 60;
  const period = h >= 12 ? 'PM' : 'AM';
  const hr = h % 12 === 0 ? 12 : h % 12;
  return `${hr}:${String(m).padStart(2, '0')} ${period}`;
};

const groupSlotsByPeriod = (day: AvailabilityDay | undefined): PeriodData => {
  const grouped: PeriodData = { morning: [], evening: [], night: [] };
  if (!day) return grouped;

  for (const slot of day.timeSlots) {
    grouped[slot.category].push({
      id: `${day.date}_${slot.startHour}`,
      time: `${minutesToTime(slot.startTime)} - ${minutesToTime(slot.endTime)}`,
      available: slot.status === 'open',
      startHour: slot.startHour,
      date: day.date,
    });
  }
  return grouped;
};

const TimeSlotsUI = ({
  timeSlots,
  selectedTime,
  onSlotSelect,
}: {
  timeSlots: PeriodData;
  selectedTime: string;
  onSlotSelect: (slot: TimeSlot) => void;
}) => {
  const [selectedPeriod, setSelectedPeriod] = useState<PeriodKey>('morning');

  const periods: { id: PeriodKey; label: string; icon: string }[] = [
    { id: 'morning', label: 'Morning', icon: '🌅' },
    { id: 'evening', label: 'Evening', icon: '🌇' },
    { id: 'night', label: 'Night', icon: '🌃' },
  ];

  return (
    <div className="space-y-6">
      <div className="bg-secondary flex w-fit gap-2 rounded-xl p-1">
        {periods.map((period) => (
          <button
            key={period.id}
            onClick={() => setSelectedPeriod(period.id)}
            className={`relative z-10 rounded-lg px-4 py-2 text-sm font-medium transition-colors ${
              selectedPeriod === period.id
                ? 'text-primary-foreground'
                : 'text-[#012a4a] hover:bg-white/50'
            }`}
          >
            {selectedPeriod === period.id && (
              <motion.div
                layoutId="activePeriod"
                className="bg-primary absolute inset-0 -z-10 rounded-lg shadow-sm"
                transition={{ type: 'spring', stiffness: 300, damping: 30 }}
              />
            )}
            <span className="flex items-center gap-2">
              <span>{period.icon}</span>
              {period.label}
            </span>
          </button>
        ))}
      </div>

      <motion.div
        key={selectedPeriod}
        initial={{ opacity: 0, y: 5 }}
        animate={{ opacity: 1, y: 0 }}
        className="grid grid-cols-3 gap-3 sm:grid-cols-4"
      >
        {timeSlots[selectedPeriod].length > 0 ? (
          timeSlots[selectedPeriod].map((slot) => (
            <button
              key={slot.id}
              disabled={!slot.available}
              onClick={() => onSlotSelect(slot)}
              className={`relative flex flex-col items-center justify-center rounded-xl border py-3 transition-all ${
                !slot.available
                  ? 'bg-muted text-muted-foreground cursor-not-allowed border-transparent opacity-60'
                  : selectedTime === slot.id
                    ? 'bg-primary border-primary text-primary-foreground shadow-md'
                    : 'bg-background border-border hover:border-primary/50 hover:bg-secondary/20 text-[#012a4a]'
              }`}
            >
              <span className="text-xs font-semibold">{slot.time}</span>
              {!slot.available && (
                <span className="mt-1 text-[10px] tracking-wider uppercase">Booked</span>
              )}
            </button>
          ))
        ) : (
          <div className="text-muted-foreground col-span-full flex flex-col items-center gap-2 py-8 text-center text-sm">
            <CalendarDays className="h-8 w-8 opacity-20" />
            No slots available for this period.
          </div>
        )}
      </motion.div>
    </div>
  );
};

export default function PhysioPage() {
  const { id = '' } = useParams();
  const navigate = useNavigate();

  const { data: detailRes, isLoading, isError } = useTherapistDetail(id);
  const { data: reviewsRes } = useTherapistReviews(id);
  const { data: articlesRes } = useTherapistArticlesById(id);
  const { data: faqsRes } = useTherapistFaqsById(id);
  const { data: availabilityRes, isLoading: slotsLoading } = useTherapistAvailability(id);

  const physio = detailRes?.data;
  const reviews = reviewsRes?.data ?? [];
  const articles = articlesRes?.data ?? [];
  const faqs = faqsRes?.data ?? [];
  const availability = useMemo(() => availabilityRes?.data ?? [], [availabilityRes]);

  const [selectedDate, setSelectedDate] = useState('');
  const [selectedSlot, setSelectedSlot] = useState<TimeSlot | null>(null);
  const [expandedArticles, setExpandedArticles] = useState<Record<number, boolean>>({});

  // Default to the first available day once data loads.
  const activeDate = selectedDate || availability[0]?.date || '';
  const activeDay = availability.find((d) => d.date === activeDate);
  const slots = useMemo(() => groupSlotsByPeriod(activeDay), [activeDay]);

  const toggleArticle = (idx: number) =>
    setExpandedArticles((prev) => ({ ...prev, [idx]: !prev[idx] }));

  const handleBook = () => {
    if (!selectedSlot) {
      toast.error('Please select a time slot.');
      return;
    }
    navigate(`/booking/${id}`, {
      state: { date: selectedSlot.date, startHour: selectedSlot.startHour },
    });
  };

  const discountPercentage =
    physio?.originalPrice && physio.originalPrice > physio.discountedPrice
      ? Math.round((1 - physio.discountedPrice / physio.originalPrice) * 100)
      : 0;

  if (isLoading) {
    return (
      <div className="mx-auto max-w-5xl space-y-6 px-4 pt-12 sm:px-6">
        <Skeleton className="h-72 w-full rounded-3xl" />
        <Skeleton className="h-48 w-full rounded-2xl" />
        <Skeleton className="h-64 w-full rounded-2xl" />
      </div>
    );
  }

  if (isError || !physio) {
    return (
      <div className="flex min-h-[60vh] flex-col items-center justify-center gap-4 px-4 text-center">
        <Info className="text-primary/40 h-12 w-12" />
        <h2 className="text-2xl font-bold text-[#012a4a]">Physiotherapist not found</h2>
        <p className="text-[#012a4a]/70">This profile may have been removed or is unavailable.</p>
        <Button onClick={() => navigate('/search')} className="bg-primary text-white">
          Back to Search
        </Button>
      </div>
    );
  }

  return (
    <div className="bg-background relative min-h-screen pb-24">
      <div className="bg-secondary absolute top-0 right-0 left-0 -z-10 h-72 overflow-hidden rounded-b-[3rem]">
        <div className="absolute -top-24 -right-24 h-96 w-96 rounded-full bg-white/20 blur-3xl" />
        <div className="bg-primary/5 absolute top-12 -left-12 h-64 w-64 rounded-full blur-2xl" />
      </div>

      <div className="mx-auto max-w-5xl px-4 pt-12 sm:px-6">
        {/* Profile Card */}
        <Card className="bg-background mb-8 overflow-hidden border-none py-0 shadow-xl shadow-[#012a4a]/5">
          <div className="flex flex-col md:flex-row">
            <div className="relative md:w-2/5">
              <img
                src={physio.image || '/placeholder.jpg'}
                alt={physio.name}
                className="h-75 w-full object-cover object-top md:h-full"
              />
              {physio.distance !== null && (
                <div className="absolute top-4 left-4">
                  <Badge variant="secondary" className="bg-white/90 text-[#012a4a] backdrop-blur-sm">
                    {physio.distance.toFixed(1)} km away
                  </Badge>
                </div>
              )}
            </div>

            <CardContent className="flex flex-col justify-center p-6 sm:p-8 md:w-3/5">
              <div className="mb-2 flex items-start justify-between">
                <div>
                  <h1 className="flex items-center gap-2 text-3xl font-bold text-[#012a4a]">
                    Dr. {physio.name}
                    <ShieldCheck className="text-primary h-6 w-6" />
                  </h1>
                  <p className="mt-1 font-medium text-[#013a63]">Physiotherapist (PT)</p>
                </div>
              </div>

              <div className="mt-4 mb-6 flex flex-wrap gap-2">
                {(physio.specializations ?? []).map((spec, idx) => (
                  <Badge
                    key={idx}
                    variant="outline"
                    className="bg-secondary/30 border-secondary text-[#013a63]"
                  >
                    {spec}
                  </Badge>
                ))}
              </div>

              <div className="mb-6 grid grid-cols-2 gap-4 text-sm text-[#012a4a]/80">
                <div className="flex items-center gap-2">
                  <Award className="text-primary h-4 w-4" />
                  {physio.experience ?? 0} Years Experience
                </div>
                <div className="flex items-center gap-2">
                  <StarRating rating={physio.rating ?? 0} />
                  <span className="font-medium">
                    {physio.rating ?? 0} ({physio.totalReviews})
                  </span>
                </div>
                <div className="col-span-2 flex items-center gap-2">
                  <MapPin className="text-primary h-4 w-4 shrink-0" />
                  {physio.displayAddress}
                </div>
              </div>

              <Separator className="mb-4" />

              <div className="flex items-center gap-6">
                <div className="text-primary flex items-center gap-2 font-medium">
                  <Home className="h-5 w-5" /> Home Visit Available
                </div>
                <div className="text-success flex items-center gap-2 font-medium">
                  <Video className="h-5 w-5" /> Online Consultation
                </div>
              </div>
            </CardContent>
          </div>
        </Card>

        {/* Booking & Scheduling Section */}
        <Card className="border-border mb-8 shadow-sm">
          <CardContent className="p-6 sm:p-8">
            <div className="mb-6 flex items-center gap-2">
              <Clock className="text-primary h-6 w-6" />
              <h2 className="text-xl font-bold text-[#012a4a]">Schedule Appointment</h2>
            </div>

            {slotsLoading ? (
              <div className="space-y-4">
                <Skeleton className="h-10 w-64" />
                <Skeleton className="h-24 w-full" />
              </div>
            ) : availability.length === 0 ? (
              <div className="text-muted-foreground flex flex-col items-center gap-2 py-10 text-center text-sm">
                <CalendarDays className="h-8 w-8 opacity-20" />
                No available slots in the next few days.
              </div>
            ) : (
              <div className="grid gap-8 md:grid-cols-3">
                <div className="md:col-span-1">
                  <label className="mb-3 block text-sm font-semibold text-[#013a63]">
                    Select Date
                  </label>
                  <div className="flex flex-col gap-2">
                    {availability.map((day) => (
                      <button
                        key={day.date}
                        onClick={() => {
                          setSelectedDate(day.date);
                          setSelectedSlot(null);
                        }}
                        className={`rounded-xl border px-4 py-3 text-left text-sm font-medium transition-all ${
                          activeDate === day.date
                            ? 'bg-primary border-primary text-primary-foreground shadow-sm'
                            : 'border-border hover:border-primary/50 text-[#012a4a]'
                        }`}
                      >
                        {day.date}
                      </button>
                    ))}
                  </div>
                </div>
                <div className="md:col-span-2">
                  <label className="mb-3 block text-sm font-semibold text-[#013a63]">
                    Select Time Slot
                  </label>
                  <TimeSlotsUI
                    timeSlots={slots}
                    selectedTime={selectedSlot?.id ?? ''}
                    onSlotSelect={setSelectedSlot}
                  />
                </div>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Information Tabs */}
        <Tabs defaultValue="info" className="w-full">
          <TabsList className="bg-secondary mb-6 h-auto w-full flex-wrap justify-start rounded-xl p-1 md:flex-nowrap">
            {[
              { id: 'info', icon: Info, label: 'Information' },
              { id: 'reviews', icon: MessageSquare, label: 'Reviews' },
              { id: 'articles', icon: BookOpen, label: 'Articles' },
              { id: 'faq', icon: ShieldCheck, label: 'FAQs' },
            ].map((tab) => (
              <TabsTrigger
                key={tab.id}
                value={tab.id}
                className="data-[state=active]:text-primary flex-1 rounded-lg py-3 text-[#013a63] transition-all data-[state=active]:bg-white"
              >
                <tab.icon className="mr-2 hidden h-4 w-4 sm:block" />
                {tab.label}
              </TabsTrigger>
            ))}
          </TabsList>

          <div className="border-border min-h-75 rounded-2xl border bg-white p-6 shadow-sm sm:p-8">
            {/* Info Tab */}
            <TabsContent value="info" className="mt-0 space-y-6 outline-none">
              <h3 className="text-xl font-bold text-[#012a4a]">About Dr. {physio.name}</h3>
              <p className="leading-relaxed text-[#012a4a]/80">
                {physio.about || 'No description provided yet.'}
              </p>
            </TabsContent>

            {/* Reviews Tab */}
            <TabsContent value="reviews" className="mt-0 space-y-4 outline-none">
              <div className="mb-6 flex items-center justify-between">
                <h3 className="text-xl font-bold text-[#012a4a]">Patient Feedback</h3>
                <div className="bg-secondary/50 flex items-center gap-2 rounded-full px-4 py-2">
                  <StarRating rating={physio.rating ?? 0} />
                  <span className="font-bold text-[#012a4a]">{physio.rating ?? 0}</span>
                </div>
              </div>

              {reviews.length === 0 ? (
                <p className="text-muted-foreground py-6 text-center text-sm">No reviews yet.</p>
              ) : (
                reviews.map((review, idx) => (
                  <div
                    key={idx}
                    className="border-border bg-background hover:border-primary/20 rounded-xl border p-5 transition-colors"
                  >
                    <div className="mb-3 flex items-center gap-3">
                      <Avatar className="border-secondary h-10 w-10 border">
                        <AvatarImage src={review.reviewerImage || ''} />
                        <AvatarFallback className="bg-primary/10 text-primary font-bold">
                          {review.reviewerName.charAt(0)}
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <p className="font-semibold text-[#012a4a]">{review.reviewerName}</p>
                        <p className="text-muted-foreground text-xs">
                          {new Date(review.createdAt).toLocaleDateString()}
                        </p>
                      </div>
                    </div>
                    <StarRating rating={review.rating} />
                    <p className="mt-3 leading-relaxed text-[#012a4a]/80">{review.comment}</p>
                  </div>
                ))
              )}
            </TabsContent>

            {/* Articles Tab */}
            <TabsContent value="articles" className="mt-0 space-y-4 outline-none">
              <h3 className="mb-6 text-xl font-bold text-[#012a4a]">Health Articles & Insights</h3>
              {articles.length === 0 ? (
                <p className="text-muted-foreground py-6 text-center text-sm">
                  No articles published yet.
                </p>
              ) : (
                articles.map((article, idx) => {
                  const isExpanded = expandedArticles[idx];
                  const preview = isExpanded
                    ? article.content
                    : `${article.content.substring(0, 120)}${article.content.length > 120 ? '...' : ''}`;
                  return (
                    <motion.div
                      layout
                      key={idx}
                      className="border-border bg-background cursor-pointer rounded-xl border p-6 transition-shadow hover:shadow-md"
                      onClick={() => toggleArticle(idx)}
                    >
                      <h4 className="mb-2 text-lg font-bold text-[#013a63]">{article.title}</h4>
                      <motion.p layout className="text-sm leading-relaxed text-[#012a4a]/80">
                        {preview}
                      </motion.p>
                      {article.content.length > 120 && (
                        <div className="text-primary mt-4 text-sm font-medium">
                          {isExpanded ? 'Show less' : 'Read more'}
                        </div>
                      )}
                    </motion.div>
                  );
                })
              )}
            </TabsContent>

            {/* FAQs Tab */}
            <TabsContent value="faq" className="mt-0 outline-none">
              <h3 className="mb-6 text-xl font-bold text-[#012a4a]">Frequently Asked Questions</h3>
              {faqs.length === 0 ? (
                <p className="text-muted-foreground py-6 text-center text-sm">
                  No FAQs added yet.
                </p>
              ) : (
                <Accordion type="single" collapsible className="w-full">
                  {faqs.map((faq, idx) => (
                    <AccordionItem key={idx} value={`item-${idx}`} className="border-border">
                      <AccordionTrigger className="hover:text-primary font-semibold text-[#013a63] hover:no-underline">
                        {faq.question}
                      </AccordionTrigger>
                      <AccordionContent className="leading-relaxed text-[#012a4a]/80">
                        {faq.answer}
                      </AccordionContent>
                    </AccordionItem>
                  ))}
                </Accordion>
              )}
            </TabsContent>
          </div>
        </Tabs>

      </div>

      {/* Sticky Book Now Footer */}
      <div className="border-border fixed right-0 bottom-0 left-0 z-50 border-t bg-white shadow-[0_-10px_30px_rgba(1,42,74,0.05)]">
        <div className="mx-auto flex max-w-5xl flex-col items-center justify-between gap-4 px-4 py-4 sm:flex-row sm:px-6">
          <div className="flex w-full items-center justify-between gap-3 sm:w-auto sm:justify-start">
            <div className="flex flex-col">
              {physio.originalPrice && physio.originalPrice > physio.discountedPrice && (
                <span className="text-muted-foreground text-sm font-medium line-through">
                  ₹{physio.originalPrice}
                </span>
              )}
              <span className="text-2xl font-bold text-[#012a4a]">₹{physio.discountedPrice}</span>
            </div>
            {discountPercentage > 0 && (
              <Badge variant="default" className="bg-[#10b981] text-white hover:bg-[#10b981]">
                {discountPercentage}% OFF
              </Badge>
            )}
          </div>

          <Button
            size="lg"
            disabled={!selectedSlot}
            onClick={handleBook}
            className={`h-12 w-full text-base font-bold transition-all sm:w-64 ${
              selectedSlot
                ? 'bg-primary text-primary-foreground shadow-primary/25 shadow-lg hover:bg-[#013a63]'
                : 'bg-muted text-muted-foreground'
            }`}
          >
            {selectedSlot ? 'Book Appointment' : 'Select a Time Slot'}
          </Button>
        </div>
      </div>
    </div>
  );
}

