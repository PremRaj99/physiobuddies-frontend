'use client';

import { AnimatePresence, motion } from 'framer-motion';
import {
  AlertTriangle,
  Award,
  Banknote,
  Camera,
  Edit2,
  FileText,
  Flag,
  Lock,
  Mail,
  MapPin,
  Phone,
  Plus,
  ShieldCheck,
  Star,
  Trash2,
  User,
} from 'lucide-react';
import { useState } from 'react';

import PageHeader from '@/components/custom/page-header/page-header';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Textarea } from '@/components/ui/textarea';

// --- Types ---
type Gender = 'male' | 'female' | 'other';
type Mode = 'home_visit' | 'online' | 'clinic';
type PayoutMethod = 'bank_transfer' | 'upi';

interface TherapistProfile {
  name: string;
  email: string; // Fixed
  phone: string;
  image: string;
  displayAddress: string;
  about: string;
  gender: Gender;
  dob: string;

  // Fixed / Locked Fields
  mode: Mode;
  clinic: string | null;
  price: number;
  commissionRate: number;
  rating: number;
  verifiedAt: string | null;
  experience: number;
  specialization: string[];
  languagesSpoken: string[];
  educationQualification: string[];
  currentlyAffiliation: string | null;
  IAPId: string | null;
  resume: string | null;
}

interface BankAccount {
  accountHolderName: string;
  bankName: string;
  branchName: string;
  accountNumber: string;
  ifsc: string;
  upi: string;
  isDefault: boolean;
  payoutMethod: PayoutMethod;
}

interface Article {
  id: string;
  title: string;
  content: string;
}
interface FAQ {
  id: string;
  question: string;
  answer: string;
}
interface Review {
  id: string;
  patientName: string;
  rating: number;
  comment: string;
  createdAt: string;
}

// --- Mock Data ---
const MOCK_PROFILE: TherapistProfile = {
  name: 'Dr. Sarah Jenkins',
  email: 'sarah.jenkins@example.com',
  phone: '+91 9876543210',
  image:
    'https://images.unsplash.com/photo-1594824436998-d7037b52479e?auto=format&fit=crop&q=80&w=200',
  displayAddress: 'Sector 14, Greater Noida',
  about: 'Passionate about helping people regain mobility and live pain-free lives.',
  gender: 'female',
  dob: '1988-04-12',
  mode: 'home_visit',
  clinic: null,
  price: 1500,
  commissionRate: 18,
  rating: 4.8,
  verifiedAt: '2024-01-15T00:00:00.000Z',
  experience: 8,
  specialization: ['Orthopedic', 'Sports Rehabilitation'],
  languagesSpoken: ['English', 'Hindi'],
  educationQualification: ['BPT', 'MPT (Ortho)'],
  currentlyAffiliation: 'City Hospital',
  IAPId: 'IAP-12345',
  resume: 'resume_url.pdf',
};

const MOCK_BANK: BankAccount = {
  accountHolderName: 'Sarah Jenkins',
  bankName: 'HDFC Bank',
  branchName: 'Greater Noida',
  accountNumber: 'XXXXXXXX1234',
  ifsc: 'HDFC0001234',
  upi: 'sarahj@hdfc',
  isDefault: true,
  payoutMethod: 'bank_transfer',
};

const MOCK_ARTICLES: Article[] = [
  { id: 'a1', title: '5 Stretches for Lower Back Pain', content: 'Detailed content here...' },
];

const MOCK_FAQS: FAQ[] = [
  {
    id: 'f1',
    question: 'Do I need equipment for a home visit?',
    answer: 'No, I bring all necessary portable equipment.',
  },
];

const MOCK_REVIEWS: Review[] = [
  {
    id: 'r1',
    patientName: 'Robert Fox',
    rating: 5,
    comment: 'Excellent care and very punctual.',
    createdAt: '2026-05-10',
  },
];

// --- Sub-Components ---

const LockedFieldWarning = () => (
  <p className="mt-1 flex items-center gap-1 text-xs text-amber-600">
    <Lock className="h-3 w-3" /> Contact Support to change
  </p>
);

const GeneralInfoTab = ({
  profile,
  onSave,
}: {
  profile: TherapistProfile;
  onSave: (p: TherapistProfile) => void;
}) => {
  const [formData, setFormData] = useState(profile);
  const [isSaving, setIsSaving] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);
    setTimeout(() => {
      onSave(formData);
      setIsSaving(false);
    }, 800);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <Card className="border-border shadow-sm">
        <CardHeader>
          <CardTitle className="text-2xl text-[#012a4a]">General Information</CardTitle>
          <CardDescription>
            Update your public-facing contact and biographical details.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="flex flex-col items-center gap-6 pb-6 sm:flex-row">
              <div className="group relative">
                <Avatar className="h-24 w-24 border-4 border-white bg-[#a9d6e5] shadow-md">
                  <AvatarImage src={formData.image} className="object-cover" />
                  <AvatarFallback className="text-2xl font-bold text-[#013a63]">
                    {formData.name.charAt(0)}
                  </AvatarFallback>
                </Avatar>
                <div className="absolute inset-0 flex cursor-pointer items-center justify-center rounded-full bg-[#012a4a]/40 opacity-0 transition-opacity group-hover:opacity-100">
                  <Camera className="h-6 w-6 text-white" />
                </div>
              </div>
              <div>
                <h3 className="mb-1 text-xl font-bold text-[#012a4a]">{formData.name}</h3>
                <div className="flex items-center gap-2">
                  {formData.verifiedAt ? (
                    <Badge className="bg-success hover:bg-success text-white">
                      <ShieldCheck className="mr-1 h-3 w-3" /> Verified
                    </Badge>
                  ) : (
                    <Badge variant="secondary" className="bg-amber-100 text-amber-800">
                      Pending Verification
                    </Badge>
                  )}
                  <Badge variant="outline" className="border-[#014f86] text-[#014f86] capitalize">
                    {formData.mode.replace('_', ' ')}
                  </Badge>
                </div>
              </div>
            </div>

            <Separator />

            <div className="grid grid-cols-1 gap-6 pt-4 md:grid-cols-2">
              <div className="space-y-2">
                <Label className="text-[#012a4a]">Full Name</Label>
                <div className="relative">
                  <User className="text-muted-foreground absolute top-2.5 left-3 h-4 w-4" />
                  <Input
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="pl-9 focus-visible:ring-[#014f86]"
                    required
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label className="text-[#012a4a]">Email Address</Label>
                <div className="relative">
                  <Mail className="text-muted-foreground absolute top-2.5 left-3 h-4 w-4" />
                  <Input
                    value={formData.email}
                    disabled
                    className="border-gray-200 bg-gray-50 pl-9"
                  />
                </div>
                <LockedFieldWarning />
              </div>

              <div className="space-y-2">
                <Label className="text-[#012a4a]">Phone Number</Label>
                <div className="relative">
                  <Phone className="text-muted-foreground absolute top-2.5 left-3 h-4 w-4" />
                  <Input
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    className="pl-9 focus-visible:ring-[#014f86]"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label className="text-[#012a4a]">Date of Birth</Label>
                <Input
                  type="date"
                  value={formData.dob}
                  onChange={(e) => setFormData({ ...formData, dob: e.target.value })}
                  className="focus-visible:ring-[#014f86]"
                />
              </div>

              <div className="space-y-2 md:col-span-2">
                <Label className="text-[#012a4a]">Display Address</Label>
                <div className="relative">
                  <MapPin className="text-muted-foreground absolute top-2.5 left-3 h-4 w-4" />
                  <Input
                    value={formData.displayAddress}
                    onChange={(e) => setFormData({ ...formData, displayAddress: e.target.value })}
                    className="pl-9 focus-visible:ring-[#014f86]"
                  />
                </div>
              </div>

              <div className="space-y-2 md:col-span-2">
                <Label className="text-[#012a4a]">About Me</Label>
                <Textarea
                  value={formData.about}
                  onChange={(e) => setFormData({ ...formData, about: e.target.value })}
                  className="min-h-25 focus-visible:ring-[#014f86]"
                />
              </div>
            </div>

            <div className="flex justify-end pt-4">
              <Button
                type="submit"
                disabled={isSaving}
                className="min-w-30 bg-[#014f86] text-white hover:bg-[#013a63]"
              >
                {isSaving ? 'Saving...' : 'Save Changes'}
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </motion.div>
  );
};

const CredentialsTab = ({ profile }: { profile: TherapistProfile }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <Card className="border-border pt-0 shadow-sm">
        <CardHeader className="bg-secondary/10 border-border border-b py-4">
          <CardTitle className="flex items-center gap-2 text-2xl text-[#012a4a]">
            <Award className="h-6 w-6 text-[#014f86]" /> Professional Credentials
          </CardTitle>
          <CardDescription>
            These details are locked to maintain platform integrity. Contact support if you need to
            update them.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-8 pt-6">
          <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
            <div className="space-y-4">
              <div>
                <Label className="font-bold text-[#012a4a]">Experience</Label>
                <p className="text-muted-foreground mt-1">{profile.experience} Years</p>
              </div>
              <div>
                <Label className="font-bold text-[#012a4a]">IAP Registration ID</Label>
                <p className="text-muted-foreground mt-1">{profile.IAPId || 'N/A'}</p>
              </div>
              <div>
                <Label className="font-bold text-[#012a4a]">Current Affiliation</Label>
                <p className="text-muted-foreground mt-1">
                  {profile.currentlyAffiliation || 'Independent Practitioner'}
                </p>
              </div>
            </div>

            <div className="border-border space-y-4 rounded-xl border bg-gray-50 p-5">
              <h4 className="flex items-center gap-2 font-bold text-[#012a4a]">
                <Banknote className="h-4 w-4 text-[#014f86]" /> Pricing & Commission
              </h4>
              <Separator />
              <div className="flex justify-between">
                <span className="text-muted-foreground">Session Price</span>
                <span className="font-semibold text-[#012a4a]">₹{profile.price}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Platform Commission</span>
                <span className="font-semibold text-[#012a4a]">{profile.commissionRate}%</span>
              </div>
            </div>
          </div>

          <Separator />

          <div>
            <Label className="mb-3 block font-bold text-[#012a4a]">Specializations</Label>
            <div className="flex flex-wrap gap-2">
              {profile.specialization.map((spec) => (
                <Badge key={spec} variant="secondary" className="bg-secondary/40 text-[#013a63]">
                  {spec}
                </Badge>
              ))}
            </div>
          </div>

          <div>
            <Label className="mb-3 block font-bold text-[#012a4a]">
              Education & Qualifications
            </Label>
            <div className="flex flex-wrap gap-2">
              {profile.educationQualification.map((edu) => (
                <Badge key={edu} variant="outline" className="border-[#014f86] text-[#014f86]">
                  {edu}
                </Badge>
              ))}
            </div>
          </div>

          <div>
            <Label className="mb-3 block font-bold text-[#012a4a]">Languages Spoken</Label>
            <p className="text-muted-foreground">{profile.languagesSpoken.join(', ')}</p>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
};

const BankDetailsTab = ({ bankDetails }: { bankDetails: BankAccount }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <Card className="border-border shadow-sm">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-2xl text-[#012a4a]">
            <Banknote className="h-6 w-6 text-[#014f86]" /> Payout & Bank Details
          </CardTitle>
          <CardDescription>Manage where you receive your session payouts.</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
              <div className="space-y-2">
                <Label>Account Holder Name</Label>
                <Input value={bankDetails.accountHolderName} className="bg-gray-50" readOnly />
              </div>
              <div className="space-y-2">
                <Label>Bank Name</Label>
                <Input value={bankDetails.bankName} className="bg-gray-50" readOnly />
              </div>
              <div className="space-y-2">
                <Label>Account Number</Label>
                <Input
                  value={bankDetails.accountNumber}
                  type="password"
                  placeholder="••••"
                  className="bg-gray-50"
                  readOnly
                />
              </div>
              <div className="space-y-2">
                <Label>IFSC Code</Label>
                <Input value={bankDetails.ifsc} className="bg-gray-50" readOnly />
              </div>
              <div className="space-y-2 md:col-span-2">
                <Label>UPI ID</Label>
                <Input value={bankDetails.upi} className="bg-gray-50" readOnly />
              </div>
            </div>

            <div className="flex items-start gap-3 rounded-lg border border-amber-200 bg-amber-50 p-4">
              <AlertTriangle className="mt-0.5 h-5 w-5 shrink-0 text-amber-600" />
              <p className="text-sm leading-relaxed text-amber-800">
                For security reasons, bank details cannot be changed directly from the portal.
                Please contact administrative support to initiate a bank detail update.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
};

const ContentManagementTab = ({
  articles: initialArticles,
  faqs: initialFaqs,
}: {
  articles: Article[];
  faqs: FAQ[];
}) => {
  const [activeSubTab, setActiveSubTab] = useState('articles');

  // Basic structure for CRUD UI - keeping it simple for the single file constraint
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <Card className="border-border shadow-sm">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-2xl text-[#012a4a]">
            <FileText className="h-6 w-6 text-[#014f86]" /> Content Management
          </CardTitle>
          <CardDescription>Share your knowledge and answer common patient queries.</CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs value={activeSubTab} onValueChange={setActiveSubTab}>
            <TabsList className="bg-secondary/30 mb-6 grid w-full grid-cols-2">
              <TabsTrigger
                value="articles"
                className="data-[state=active]:bg-white data-[state=active]:text-[#014f86]"
              >
                My Articles
              </TabsTrigger>
              <TabsTrigger
                value="faqs"
                className="data-[state=active]:bg-white data-[state=active]:text-[#014f86]"
              >
                My FAQs
              </TabsTrigger>
            </TabsList>

            <TabsContent value="articles" className="space-y-4 outline-none">
              <div className="flex justify-end">
                <Button className="bg-[#014f86] text-white hover:bg-[#013a63]">
                  <Plus className="mr-2 h-4 w-4" /> Write Article
                </Button>
              </div>
              {initialArticles.map((a) => (
                <div
                  key={a.id}
                  className="border-border flex items-start justify-between rounded-xl border p-4 transition-colors hover:border-[#a9d6e5]"
                >
                  <div>
                    <h4 className="font-bold text-[#012a4a]">{a.title}</h4>
                    <p className="text-muted-foreground mt-1 line-clamp-2 text-sm">{a.content}</p>
                  </div>
                  <div className="flex shrink-0 gap-2">
                    <Button variant="ghost" size="icon" className="text-[#014f86]">
                      <Edit2 className="h-4 w-4" />
                    </Button>
                    <Button variant="ghost" size="icon" className="text-destructive">
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              ))}
            </TabsContent>

            <TabsContent value="faqs" className="space-y-4 outline-none">
              <div className="flex justify-end">
                <Button className="bg-[#014f86] text-white hover:bg-[#013a63]">
                  <Plus className="mr-2 h-4 w-4" /> Add FAQ
                </Button>
              </div>
              {initialFaqs.map((f) => (
                <div
                  key={f.id}
                  className="border-border flex items-start justify-between rounded-xl border p-4 transition-colors hover:border-[#a9d6e5]"
                >
                  <div>
                    <h4 className="font-bold text-[#012a4a]">Q: {f.question}</h4>
                    <p className="text-muted-foreground mt-1 text-sm">A: {f.answer}</p>
                  </div>
                  <div className="flex shrink-0 gap-2">
                    <Button variant="ghost" size="icon" className="text-[#014f86]">
                      <Edit2 className="h-4 w-4" />
                    </Button>
                    <Button variant="ghost" size="icon" className="text-destructive">
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              ))}
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </motion.div>
  );
};

const ReviewsTab = ({ reviews }: { reviews: Review[] }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <Card className="border-border shadow-sm">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-2xl text-[#012a4a]">
            <Star className="h-6 w-6 text-[#014f86]" /> Patient Reviews
          </CardTitle>
          <CardDescription>View feedback from your completed sessions.</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {reviews.map((r) => (
              <div
                key={r.id}
                className="border-border rounded-xl border p-5 transition-colors hover:border-[#a9d6e5]"
              >
                <div className="mb-3 flex items-start justify-between">
                  <div>
                    <h4 className="font-bold text-[#012a4a]">{r.patientName}</h4>
                    <p className="text-muted-foreground text-xs">{r.createdAt}</p>
                  </div>
                  <div className="bg-secondary/30 flex items-center rounded px-2 py-1">
                    <Star className="mr-1 h-3 w-3 fill-current text-[#014f86]" />
                    <span className="text-sm font-bold text-[#014f86]">{r.rating}</span>
                  </div>
                </div>
                <p className="text-sm leading-relaxed text-[#012a4a]/80">{r.comment}</p>
                <div className="border-border mt-4 flex justify-end border-t pt-3">
                  <Button
                    variant="ghost"
                    size="sm"
                    className="text-muted-foreground hover:text-destructive hover:bg-destructive/10"
                  >
                    <Flag className="mr-2 h-4 w-4" /> Report Issue
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
};

// --- Main Page Wrapper ---

export default function TherapistProfilePage() {
  const [profile, setProfile] = useState<TherapistProfile>(MOCK_PROFILE);

  const handleSaveProfile = (updatedProfile: TherapistProfile) => {
    setProfile(updatedProfile);
  };

  return (
    <div className="min-h-screen bg-[#f8fbfa] pb-24 font-sans">
      {/* Header Decorator */}
      <div className="absolute top-0 left-0 -z-10 h-32 w-full bg-[#a9d6e5]" />

      <PageHeader
        heading="Therapist Profile"
        subheading="Manage your professional profile, content, and credentials."
      />
      <main className="mx-auto max-w-6xl px-4 pt-12 sm:px-6">
        <Tabs defaultValue="profile" className="mt-8 flex flex-col gap-8 md:flex-row">
          {/* Sidebar Nav */}
          <TabsList className="mt-6 mb-16 flex flex-col items-stretch gap-2 bg-transparent p-0 md:m-0 md:flex-row">
            <TabsTrigger
              value="profile"
              className="text-muted-foreground data-[state=active]:border-border border-border data-[state=active]:bg-primary justify-start rounded-lg border px-4 py-3 transition-all hover:bg-white/50 data-[state=active]:text-white data-[state=active]:shadow-sm"
            >
              <User className="mr-3 h-4 w-4" /> Profile Details
            </TabsTrigger>
            <TabsTrigger
              value="credentials"
              className="text-muted-foreground data-[state=active]:border-border border-border data-[state=active]:bg-primary justify-start rounded-lg border px-4 py-3 transition-all hover:bg-white/50 data-[state=active]:text-white data-[state=active]:shadow-sm"
            >
              <Award className="mr-3 h-4 w-4" /> Credentials & Pricing
            </TabsTrigger>
            <TabsTrigger
              value="bank"
              className="text-muted-foreground data-[state=active]:border-border border-border data-[state=active]:bg-primary justify-start rounded-lg border px-4 py-3 transition-all hover:bg-white/50 data-[state=active]:text-white data-[state=active]:shadow-sm"
            >
              <Banknote className="mr-3 h-4 w-4" /> Payout Details
            </TabsTrigger>
            <TabsTrigger
              value="content"
              className="text-muted-foreground data-[state=active]:border-border border-border data-[state=active]:bg-primary justify-start rounded-lg border px-4 py-3 transition-all hover:bg-white/50 data-[state=active]:text-white data-[state=active]:shadow-sm"
            >
              <FileText className="mr-3 h-4 w-4" /> Articles & FAQs
            </TabsTrigger>
            <TabsTrigger
              value="reviews"
              className="text-muted-foreground data-[state=active]:border-border border-border data-[state=active]:bg-primary justify-start rounded-lg border px-4 py-3 transition-all hover:bg-white/50 data-[state=active]:text-white data-[state=active]:shadow-sm"
            >
              <Star className="mr-3 h-4 w-4" /> Patient Reviews
            </TabsTrigger>
          </TabsList>

          {/* Main Content Area */}
          <div className="min-w-0 flex-1">
            <AnimatePresence mode="wait">
              <TabsContent value="profile" className="mt-0 outline-none">
                <GeneralInfoTab profile={profile} onSave={handleSaveProfile} />
              </TabsContent>
              <TabsContent value="credentials" className="mt-0 outline-none">
                <CredentialsTab profile={profile} />
              </TabsContent>
              <TabsContent value="bank" className="mt-0 outline-none">
                <BankDetailsTab bankDetails={MOCK_BANK} />
              </TabsContent>
              <TabsContent value="content" className="mt-0 outline-none">
                <ContentManagementTab articles={MOCK_ARTICLES} faqs={MOCK_FAQS} />
              </TabsContent>
              <TabsContent value="reviews" className="mt-0 outline-none">
                <ReviewsTab reviews={MOCK_REVIEWS} />
              </TabsContent>
            </AnimatePresence>
          </div>
        </Tabs>
      </main>
    </div>
  );
}
