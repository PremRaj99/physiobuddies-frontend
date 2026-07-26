import React, { useState } from 'react';
import { motion, AnimatePresence, type Variants } from 'framer-motion';
import {
  CheckCircle2,
  Send,
  User,
  Phone,
  Mail,
  MessageSquare,
  HelpCircle,
  MapPin,
  Clock,
} from 'lucide-react';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

import physio from '@/assets/contact-images/Physio.gif';
import Footer from '@/components/custom/footer/footer';
import PageHeader from '@/components/custom/page-header/page-header';
import AuraMedicalCTA from '@/components/custom/cta/cta';

export default function ContactUs() {
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    topic: 'general',
    desc: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSelectChange = (value: string) => {
    setFormData((prev) => ({ ...prev, topic: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      setIsSubmitted(true);
      setFormData({ name: '', phone: '', email: '', topic: 'general', desc: '' });
      setTimeout(() => setIsSubmitted(false), 5000);
    } catch (error) {
      console.error('Failed to submit contact form', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const fadeUpVariant: Variants = {
    hidden: { opacity: 0, y: 15 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: 'easeOut' } },
  };

  const floatVariant: Variants = {
    animate: {
      y: [0, -8, 0],
      transition: { duration: 5, repeat: Infinity, ease: 'easeInOut' },
    },
  };

  return (
    <div className="bg-background min-h-body flex flex-col font-sans">
      {/* Hero Header - Compacted */}
      <PageHeader
        heading={
          <>
            <span className="text-[#a9d6e5]">Contact</span> Our Clinical Team
          </>
        }
        subheading="Support for your journey to recovery."
      />

      {/* Main Content Area - Optimized Padding */}
      <div className="grow bg-white px-4 py-10 md:px-8 lg:py-12">
        <motion.div
          initial="hidden"
          animate="visible"
          className="mx-auto grid max-w-6xl grid-cols-1 items-start gap-10 lg:grid-cols-2 lg:gap-16"
        >
          {/* Left Side: Welcoming Content */}
          <motion.div variants={fadeUpVariant} className="flex flex-col space-y-6">
            <div className="space-y-3">
              <span className="text-primary text-[10px] font-bold tracking-[0.2em] uppercase">
                Physiobuddies
              </span>
              <h2 className="text-2xl leading-tight font-bold text-[#012a4a] md:text-3xl">
                Relieve Pain, Restore Movement.
              </h2>
              <p className="text-muted-foreground max-w-md text-sm leading-relaxed">
                Get expert physiotherapy to reduce pain and improve mobility. Reach out to our
                specialists today.
              </p>
            </div>

            {/* Contact Info (Compact Row) */}
            <div className="flex flex-wrap gap-6 pt-2">
              <div className="flex items-center gap-3">
                <div className="bg-secondary/30 text-primary rounded-lg p-2">
                  <MapPin className="h-5 w-5" />
                </div>
                <div>
                  <p className="text-muted-foreground text-[10px] font-bold tracking-widest uppercase">
                    Location
                  </p>
                  <p className="text-sm font-semibold text-[#012a4a]">Dehradun, UK</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <div className="bg-secondary/30 text-primary rounded-lg p-2">
                  <Clock className="h-5 w-5" />
                </div>
                <div>
                  <p className="text-muted-foreground text-[10px] font-bold tracking-widest uppercase">
                    Support
                  </p>
                  <p className="text-sm font-semibold text-[#012a4a]">24/7 Assistance</p>
                </div>
              </div>
            </div>

            <motion.div variants={floatVariant} animate="animate" className="hidden pt-4 lg:block">
              <img
                src={physio}
                alt="Physiotherapy"
                className="h-auto w-full max-w-xs rounded-3xl object-cover shadow-xl shadow-[#014f86]/5"
              />
            </motion.div>
          </motion.div>

          {/* Right Side: Compact Form */}
          <motion.div variants={fadeUpVariant} className="bg-white">
            <div className="w-full space-y-6">
              <div className="space-y-1">
                <h3 className="text-xl font-bold text-[#012a4a]">Get in Touch</h3>
                <p className="text-muted-foreground text-xs">
                  Fill out the form below. We'll reach out shortly.
                </p>
              </div>

              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                  <div className="space-y-1.5">
                    <Label htmlFor="name" className="text-xs font-semibold text-[#012a4a]">
                      Full Name
                    </Label>
                    <div className="relative">
                      <User className="text-muted-foreground absolute top-3 left-3 h-4 w-4" />
                      <Input
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        placeholder="Akash Yadav"
                        required
                        className="h-10 rounded-lg bg-transparent pl-10 text-sm"
                      />
                    </div>
                  </div>

                  <div className="space-y-1.5">
                    <Label htmlFor="phone" className="text-xs font-semibold text-[#012a4a]">
                      Phone
                    </Label>
                    <div className="relative">
                      <Phone className="text-muted-foreground absolute top-3 left-3 h-4 w-4" />
                      <Input
                        id="phone"
                        name="phone"
                        type="tel"
                        value={formData.phone}
                        onChange={handleChange}
                        placeholder="+91 98765 43210"
                        required
                        className="h-10 rounded-lg bg-transparent pl-10 text-sm"
                      />
                    </div>
                  </div>
                </div>

                <div className="space-y-1.5">
                  <Label htmlFor="email" className="text-xs font-semibold text-[#012a4a]">
                    Email Address
                  </Label>
                  <div className="relative">
                    <Mail className="text-muted-foreground absolute top-3 left-3 h-4 w-4" />
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="akash@example.com"
                      required
                      className="h-10 rounded-lg bg-transparent pl-10 text-sm"
                    />
                  </div>
                </div>

                <div className="space-y-1.5">
                  <Label htmlFor="topic" className="text-xs font-semibold text-[#012a4a]">
                    Topic
                  </Label>
                  <div className="relative">
                    <HelpCircle className="text-muted-foreground absolute top-3 left-3 z-10 h-4 w-4" />
                    <Select value={formData.topic} onValueChange={handleSelectChange}>
                      <SelectTrigger className="h-10 rounded-lg bg-transparent pl-10 text-sm">
                        <SelectValue placeholder="Select a topic" />
                      </SelectTrigger>
                      <SelectContent className="rounded-lg">
                        <SelectItem value="general">General Clinical Inquiry</SelectItem>
                        <SelectItem value="appointment">Book an Appointment</SelectItem>
                        <SelectItem value="feedback">Patient Feedback</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="space-y-1.5">
                  <Label htmlFor="desc" className="text-xs font-semibold text-[#012a4a]">
                    Description
                  </Label>
                  <div className="relative">
                    <MessageSquare className="text-muted-foreground absolute top-3 left-3 h-4 w-4" />
                    <Textarea
                      id="desc"
                      name="desc"
                      value={formData.desc}
                      onChange={handleChange}
                      placeholder="Details about your condition..."
                      required
                      className="min-h-25 rounded-lg bg-transparent pt-2.5 pl-10 text-sm"
                    />
                  </div>
                </div>

                <AnimatePresence>
                  {isSubmitted && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      exit={{ opacity: 0, height: 0 }}
                      className="bg-success/5 border-success/20 flex items-start gap-2 rounded-lg border p-3"
                    >
                      <CheckCircle2 className="text-success mt-0.5 h-4 w-4 shrink-0" />
                      <p className="text-success text-[11px] leading-tight font-medium">
                        Secure Request Received. We will contact you shortly.
                      </p>
                    </motion.div>
                  )}
                </AnimatePresence>

                <Button
                  type="submit"
                  disabled={isSubmitting}
                  className="bg-primary h-11 w-full rounded-lg text-sm font-semibold text-white transition-all hover:bg-[#013a63]"
                >
                  {isSubmitting ? 'Transmitting...' : 'Submit Secure Request'}
                  {!isSubmitting && <Send className="ml-2 h-3.5 w-3.5" />}
                </Button>

                <p className="text-muted-foreground mt-2 text-center text-[9px] font-medium tracking-widest uppercase">
                  Encrypted Secure Connection
                </p>
              </form>
            </div>
          </motion.div>
        </motion.div>
      </div>
      <AuraMedicalCTA />
      <Footer />
    </div>
  );
}
