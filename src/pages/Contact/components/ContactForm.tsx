import React from 'react';
import { AnimatePresence, motion, type Variants } from 'framer-motion';
import { CheckCircle2, HelpCircle, Mail, MessageSquare, Phone, Send, User } from 'lucide-react';
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

interface ContactFormProps {
  formData: {
    name: string;
    phone: string;
    email: string;
    topic: string;
    desc: string;
  };
  isSubmitted: boolean;
  isSubmitting: boolean;
  onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  onSelectChange: (value: string) => void;
  onSubmit: (e: React.FormEvent) => void;
  fadeUpVariant: Variants;
}

export const ContactForm: React.FC<ContactFormProps> = ({
  formData,
  isSubmitted,
  isSubmitting,
  onChange,
  onSelectChange,
  onSubmit,
  fadeUpVariant,
}) => {
  return (
    <motion.div variants={fadeUpVariant} className="bg-white">
      <div className="w-full space-y-6">
        <div className="space-y-1">
          <h3 className="text-xl font-bold text-[#012a4a]">Get in Touch</h3>
          <p className="text-muted-foreground text-xs">
            Fill out the form below. We'll reach out shortly.
          </p>
        </div>

        <form onSubmit={onSubmit} className="space-y-4">
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
                  onChange={onChange}
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
                  onChange={onChange}
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
                onChange={onChange}
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
              <Select value={formData.topic} onValueChange={onSelectChange}>
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
                onChange={onChange}
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
  );
};
