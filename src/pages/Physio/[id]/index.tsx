import { motion } from 'framer-motion';
import {
  Award,
  BookOpen,
  CalendarDays,
  CheckCircle2,
  ChevronRight,
  Clock,
  Home,
  Info,
  MapPin,
  MessageSquare,
  ShieldCheck,
  Video,
} from 'lucide-react';
import { useState } from 'react';

// Shadcn Components (Ensure you have these installed via CLI)
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
import { Input } from '@/components/ui/input';
import { Separator } from '@/components/ui/separator';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useNavigate } from 'react-router';
import { toast } from 'sonner';

// --- Types based on your schema ---
interface TimeSlot {
  id: string;
  time: string;
  available: boolean;
}

interface PeriodData {
  [key: string]: TimeSlot[];
}

// --- Mock Data for instant preview ---
const MOCK_PHYSIO = {
  id: 'pt-123',
  name: 'Dr. Sarah Jenkins',
  specializations: ['Sports Injury', 'Post-Op Rehab', 'Neurological Physio'],
  experience: 12,
  rating: 4.8,
  totalReviews: 124,
  originalPrice: 2000,
  discountedPrice: 1500,
  displayAddress: 'Wellness Center, 123 Healing Blvd, NY',
  image:
    'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?q=80&w=200&auto=format&fit=crop',
  about:
    '<p>Dr. Sarah Jenkins is a board-certified physiotherapist specializing in sports rehabilitation and post-operative care. With over a decade of clinical experience, she utilizes evidence-based practices to ensure optimal recovery.</p>',
  distance: 2.4,
  isVerified: true,
  isOnline: true,
  languages: ['English', 'Spanish'],
  reviews: [
    {
      rating: 5,
      comment: 'Incredible attention to detail. My knee feels 100% better.',
      createdAt: new Date(),
      reviewerName: 'Michael R.',
      reviewerImage: null,
    },
    {
      rating: 4,
      comment: 'Very professional and calming environment.',
      createdAt: new Date(),
      reviewerName: 'Emily S.',
      reviewerImage: null,
    },
  ],
  articles: [
    {
      id: 1,
      title: 'Understanding Rotator Cuff Tears',
      preview:
        'The rotator cuff is a crucial group of muscles and tendons... Here is how you can manage early symptoms before they worsen.',
      createdAt: new Date(),
    },
    {
      id: 2,
      title: 'Post-Op Knee Replacement Care',
      preview:
        "Recovery after a knee replacement requires strict adherence to physical therapy protocols. Let's break down the first 4 weeks.",
      createdAt: new Date(),
    },
  ],
  faqs: [
    {
      question: 'Do I need to bring X-Rays to my first session?',
      answer:
        'Yes, if you have recent imaging, please bring it. It helps tailor your recovery plan accurately.',
    },
    {
      question: 'What should I wear?',
      answer:
        'Comfortable, loose-fitting athletic clothing that allows access to the area being treated.',
    },
  ],
};

const MOCK_SLOTS: PeriodData = {
  morning: [
    { id: 's1', time: '09:00 AM', available: false },
    { id: 's2', time: '10:00 AM', available: true },
    { id: 's3', time: '11:00 AM', available: true },
  ],
  noon: [
    { id: 's4', time: '12:00 PM', available: true },
    { id: 's5', time: '01:00 PM', available: false },
  ],
  evening: [
    { id: 's6', time: '04:00 PM', available: true },
    { id: 's7', time: '05:00 PM', available: true },
  ],
};

// --- Sub-Components ---

const TimeSlotsUI = ({
  timeSlots,
  selectedTime,
  onTimeSelect,
  setSelectedSlot,
}: {
  timeSlots: PeriodData;
  selectedTime: string;
  onTimeSelect: (time: string) => void;
  setSelectedSlot: (slot: TimeSlot) => void;
}) => {
  const [selectedPeriod, setSelectedPeriod] = useState('morning');

  const periods = [
    { id: 'morning', label: 'Morning', icon: '🌅' },
    { id: 'noon', label: 'Noon', icon: '☀️' },
    { id: 'evening', label: 'Evening', icon: '🌇' },
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
        {timeSlots[selectedPeriod]?.length > 0 ? (
          timeSlots[selectedPeriod].map((slot: TimeSlot) => (
            <button
              key={slot.id}
              disabled={!slot.available}
              onClick={() => {
                setSelectedSlot(slot);
                onTimeSelect(slot.time);
              }}
              className={`relative flex flex-col items-center justify-center rounded-xl border py-3 transition-all ${
                !slot.available
                  ? 'bg-muted text-muted-foreground cursor-not-allowed border-transparent opacity-60'
                  : selectedTime === slot.time
                    ? 'bg-primary border-primary text-primary-foreground shadow-md'
                    : 'bg-background border-border hover:border-primary/50 hover:bg-secondary/20 text-[#012a4a]'
              }`}
            >
              <span className="font-semibold">{slot.time}</span>
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

// --- Main Page Component ---

export default function PhysioPage() {
  const [selectedDate, setSelectedDate] = useState(() => {
    return new Date().toISOString().split('T')[0];
  });
  const [selectedTime, setSelectedTime] = useState('');
  const [selectedSlot, setSelectedSlot] = useState<TimeSlot | null>(null);
  const [expandedArticles, setExpandedArticles] = useState<Record<string, boolean>>({});
  const navigate = useNavigate();

  const toggleArticle = (id: string) => {
    setExpandedArticles((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const handleBook = async () => {
    if (!selectedTime) return;
    if (!selectedSlot) return;
    const sessionId = await startSession(selectedSlot.id, MOCK_PHYSIO.id);
    navigate(`/booking/${sessionId}`);
  };

  const startSession = async (slotId: string, physioId: string) => {
    // Mock API call to start session
    if (!slotId || !physioId) {
      toast.error('Invalid slot or physiotherapist selection.');
      return;
    }
    const sessionId = await new Promise((resolve) => setTimeout(resolve, 1000));
    return sessionId;
  };

  const discountPercentage = Math.round(
    (1 - MOCK_PHYSIO.discountedPrice / MOCK_PHYSIO.originalPrice) * 100,
  );

  return (
    <div className="bg-background relative min-h-screen pb-24">
      {/* Brand Decorator Header - Uses Secondary Soft Light Blue */}
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
                src={MOCK_PHYSIO.image}
                alt={MOCK_PHYSIO.name}
                className="h-75 w-full object-cover object-top md:h-full"
              />
              <div className="absolute top-4 left-4">
                <Badge variant="secondary" className="bg-white/90 text-[#012a4a] backdrop-blur-sm">
                  {MOCK_PHYSIO.distance} miles away
                </Badge>
              </div>
            </div>

            <CardContent className="flex flex-col justify-center p-6 sm:p-8 md:w-3/5">
              <div className="mb-2 flex items-start justify-between">
                <div>
                  <h1 className="flex items-center gap-2 text-3xl font-bold text-[#012a4a]">
                    {MOCK_PHYSIO.name}
                    {MOCK_PHYSIO.isVerified && <ShieldCheck className="text-primary h-6 w-6" />}
                  </h1>
                  <p className="mt-1 font-medium text-[#013a63]">Physiotherapist (PT)</p>
                </div>
              </div>

              <div className="mt-4 mb-6 flex flex-wrap gap-2">
                {MOCK_PHYSIO.specializations.map((spec, idx) => (
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
                  {MOCK_PHYSIO.experience} Years Experience
                </div>
                <div className="flex items-center gap-2">
                  <StarRating rating={MOCK_PHYSIO.rating} />
                  <span className="font-medium">
                    {MOCK_PHYSIO.rating} ({MOCK_PHYSIO.totalReviews})
                  </span>
                </div>
                <div className="col-span-2 flex items-center gap-2">
                  <MapPin className="text-primary h-4 w-4 shrink-0" />
                  {MOCK_PHYSIO.displayAddress}
                </div>
              </div>

              <Separator className="mb-4" />

              <div className="flex items-center gap-6">
                {MOCK_PHYSIO.isOnline ? (
                  <div className="text-success flex items-center gap-2 font-medium">
                    <Video className="h-5 w-5" /> Online Consultation
                  </div>
                ) : (
                  <div className="text-primary flex items-center gap-2 font-medium">
                    <Home className="h-5 w-5" /> Home Visit Available
                  </div>
                )}
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

            <div className="grid gap-8 md:grid-cols-3">
              <div className="md:col-span-1">
                <label className="mb-3 block text-sm font-semibold text-[#013a63]">
                  Select Date
                </label>
                <Input
                  type="date"
                  className="border-border focus-visible:ring-primary h-12 font-medium text-[#012a4a]"
                  value={selectedDate}
                  min={new Date().toISOString().split('T')[0]}
                  onChange={(e) => setSelectedDate(e.target.value)}
                />
              </div>
              <div className="md:col-span-2">
                <label className="mb-3 block text-sm font-semibold text-[#013a63]">
                  Select Time Slot
                </label>
                <TimeSlotsUI
                  timeSlots={MOCK_SLOTS}
                  selectedTime={selectedTime}
                  onTimeSelect={setSelectedTime}
                  setSelectedSlot={setSelectedSlot}
                />
              </div>
            </div>
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
              <h3 className="text-xl font-bold text-[#012a4a]">About {MOCK_PHYSIO.name}</h3>
              <div
                className="prose prose-blue max-w-none leading-relaxed text-[#012a4a]/80"
                dangerouslySetInnerHTML={{ __html: MOCK_PHYSIO.about }}
              />
              <Separator />
              <div>
                <h4 className="mb-3 font-semibold text-[#013a63]">Languages Spoken</h4>
                <div className="flex gap-3">
                  {MOCK_PHYSIO.languages.map((lang, idx) => (
                    <div
                      key={idx}
                      className="bg-secondary/20 border-border flex items-center gap-2 rounded-md border px-3 py-1.5 text-sm text-[#012a4a]/80"
                    >
                      <CheckCircle2 className="text-primary h-4 w-4" /> {lang}
                    </div>
                  ))}
                </div>
              </div>
            </TabsContent>

            {/* Reviews Tab */}
            <TabsContent value="reviews" className="mt-0 space-y-4 outline-none">
              <div className="mb-6 flex items-center justify-between">
                <h3 className="text-xl font-bold text-[#012a4a]">Patient Feedback</h3>
                <div className="bg-secondary/50 flex items-center gap-2 rounded-full px-4 py-2">
                  <StarRating rating={MOCK_PHYSIO.rating} />
                  <span className="font-bold text-[#012a4a]">{MOCK_PHYSIO.rating}</span>
                </div>
              </div>

              {MOCK_PHYSIO.reviews.map((review, idx) => (
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
                        {review.createdAt.toLocaleDateString()}
                      </p>
                    </div>
                  </div>
                  <StarRating rating={review.rating} />
                  <p className="mt-3 leading-relaxed text-[#012a4a]/80">{review.comment}</p>
                </div>
              ))}
            </TabsContent>

            {/* Articles Tab */}
            <TabsContent value="articles" className="mt-0 space-y-4 outline-none">
              <h3 className="mb-6 text-xl font-bold text-[#012a4a]">Health Articles & Insights</h3>
              {MOCK_PHYSIO.articles.map((article) => {
                const isExpanded = expandedArticles[article.id];
                return (
                  <motion.div
                    layout
                    key={article.id}
                    className="border-border bg-background cursor-pointer rounded-xl border p-6 transition-shadow hover:shadow-md"
                    onClick={() => toggleArticle(article.id.toString())}
                  >
                    <h4 className="mb-2 text-lg font-bold text-[#013a63]">{article.title}</h4>
                    <motion.p layout className="text-sm leading-relaxed text-[#012a4a]/80">
                      {isExpanded ? article.preview : `${article.preview.substring(0, 80)}...`}
                    </motion.p>
                    <div className="text-primary mt-4 flex items-center text-sm font-medium">
                      {isExpanded ? 'Show less' : 'Read more'}
                      <ChevronRight
                        className={`ml-1 h-4 w-4 transition-transform ${isExpanded ? 'rotate-90' : ''}`}
                      />
                    </div>
                  </motion.div>
                );
              })}
            </TabsContent>

            {/* FAQs Tab */}
            <TabsContent value="faq" className="mt-0 outline-none">
              <h3 className="mb-6 text-xl font-bold text-[#012a4a]">Frequently Asked Questions</h3>
              <Accordion type="single" collapsible className="w-full">
                {MOCK_PHYSIO.faqs.map((faq, idx) => (
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
            </TabsContent>
          </div>
        </Tabs>
      </div>

      {/* Sticky Book Now Footer */}
      <div className="border-border fixed right-0 bottom-0 left-0 z-50 border-t bg-white shadow-[0_-10px_30px_rgba(1,42,74,0.05)]">
        <div className="mx-auto flex max-w-5xl flex-col items-center justify-between gap-4 px-4 py-4 sm:flex-row sm:px-6">
          <div className="flex w-full items-center justify-between gap-3 sm:w-auto sm:justify-start">
            <div className="flex flex-col">
              <span className="text-muted-foreground text-sm font-medium line-through">
                ₹{MOCK_PHYSIO.originalPrice}
              </span>
              <span className="text-2xl font-bold text-[#012a4a]">
                ₹{MOCK_PHYSIO.discountedPrice}
              </span>
            </div>
            <Badge variant="default" className="bg-[#10b981] text-white hover:bg-[#10b981]">
              {' '}
              {/* Success Emerald */}
              {discountPercentage}% OFF
            </Badge>
          </div>

          <Button
            size="lg"
            disabled={!selectedTime}
            onClick={handleBook}
            className={`h-12 w-full text-base font-bold transition-all sm:w-64 ${
              selectedTime
                ? 'bg-primary text-primary-foreground shadow-primary/25 shadow-lg hover:bg-[#013a63]'
                : 'bg-muted text-muted-foreground'
            }`}
          >
            {selectedTime ? 'Book Appointment' : 'Select a Time Slot'}
          </Button>
        </div>
      </div>
    </div>
  );
}
