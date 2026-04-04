import { motion, type Variants } from 'framer-motion';
import { CheckCircle2, ShieldCheck, HeartPulse } from 'lucide-react';
import ImpactDashboard from './impact-dashboard';
import StarRating from '@/components/custom/star-ratting/star-rating';

// Shadcn UI Imports
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/components/ui/carousel';
import PageHeader from '@/components/custom/page-header/page-header';
import AuraMedicalCTA from '@/components/custom/cta/cta';
import Footer from '@/components/custom/footer/footer';

export default function About() {
  const images = [
    'https://physiobuddies-public.s3.ap-south-1.amazonaws.com/common/Gemini_Generated_Image_n6v39sn6v39sn6v3.png',
    'https://images.unsplash.com/photo-1540205895360-4ad4cffb3aa8?q=80&w=1887&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1581090465357-c8a1f71f0407?q=80&w=1887&auto=format&fit=crop',
    'https://physiobuddies-public.s3.ap-south-1.amazonaws.com/common/WhatsApp+Image+2025-07-25+at+01.21.38_59d164b0.jpg',
  ];

  const MedicalColors = {
    Primary: '#014f86',
    Secondary: '#a9d6e5',
    DarkBlue: '#013a63',
    DeepNavy: '#012a4a',
  };

  const metrics = [
    { name: 'Physiotherapists', value: 1000, color: MedicalColors.Primary },
    { name: 'Patients Treated', value: 10000, color: MedicalColors.DarkBlue },
    { name: 'Clinics Partnered', value: 100, color: MedicalColors.Secondary },
    { name: 'Home Visits', value: 2500, color: MedicalColors.DeepNavy },
  ];

  const coverageData = [
    { name: 'Cities Covered', percentage: 25 },
    { name: 'Positive Feedback', percentage: 90 },
    { name: 'Rebook Rate', percentage: 80 },
  ];

  const pieData = [
    { name: 'Positive Feedback', value: 90 },
    { name: 'Other Feedback', value: 10 },
  ];

  const COLORS = [MedicalColors.Primary, MedicalColors.Secondary];

  const feedback = [
    {
      title: 'Back Pain – Pain-Free Living Achieved!',
      quote: 'Physiobuddies connected me with a professional physiotherapist... effortless.',
      author: 'Amit Sharma',
      location: 'New Delhi',
      star: 5,
    },
    {
      title: 'ACL Injury – Back to Sports in No Time!',
      quote: 'After my ACL surgery, I struggled with mobility. Found a homevisit physio!',
      author: 'Sneha Kapoor',
      location: 'Gurugram',
      star: 5,
    },
    {
      title: 'Online Physiotherapy – Effective!',
      quote:
        'I was skeptical about online physiotherapy, but the video consultation was just as effective.',
      author: 'Rahul Mehta',
      location: 'Noida',
      star: 4.5,
    },
    {
      title: 'Frozen Shoulder – Movement Restored!',
      quote: 'I couldn’t even wear my shirt without pain. Helped me regain my mobility!',
      author: 'Rajat Malhotra',
      location: 'Mumbai',
      star: 4.5,
    },
  ];

  const physioTestimonial = [
    {
      name: 'Dr. Priya',
      location: 'Greater Noida',
      testimonial: 'Physiobuddies transformed my practice. I now have a steady flow of patients!',
      rating: 5,
    },
    {
      name: 'Dr. Kunal',
      location: 'Greater Noida',
      testimonial:
        'The platform made it easy for me to provide home visits, increasing my earnings by 40%!',
      rating: 5,
    },
    {
      name: 'Dr. Meera',
      location: 'Rohini',
      testimonial: 'Joining Physiobuddies has been the best career decision. Amazing support team!',
      rating: 5,
    },
  ];

  const fadeUpVariant: Variants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: 'easeOut' } },
  };

  const staggerContainer = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.15 } },
  };

  return (
    <div className="bg-background min-h-body flex flex-col overflow-x-hidden font-sans">
      {/* Hero Header */}
      <PageHeader
        heading={
          <span>
            About <span className="text-[#a9d6e5]">Physiobuddies</span>
          </span>
        }
        subheading="Your Trusted Partner in Clinical Physiotherapy & Rehabilitation."
      />

      {/* Responsive adjustments: Reduced space-y on mobile (16) vs desktop (24) */}
      <div className="mx-auto w-full max-w-6xl space-y-16 bg-white px-4 py-12 md:space-y-24 md:px-8 md:py-16 lg:px-16">
        {/* Intro & Images Section */}
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-100px' }}
          className="grid items-center gap-10 md:gap-16 lg:grid-cols-12"
        >
          <div className="col-span-1 space-y-6 lg:col-span-7">
            <motion.h2
              variants={fadeUpVariant}
              className="text-2xl leading-tight font-bold text-[#012a4a] lg:text-3xl"
            >
              Accessible, Reliable, and Convenient Care.
            </motion.h2>
            <motion.p
              variants={fadeUpVariant}
              className="text-muted-foreground text-base leading-relaxed md:text-lg"
            >
              <strong className="font-semibold text-[#012a4a]">At Physiobuddies,</strong> we
              understand that finding the right physiotherapist can be overwhelming. That’s why we
              connect you with highly qualified, verified professionals who provide personalized
              care at home, in-clinic, or online.
            </motion.p>

            <motion.div variants={fadeUpVariant} className="space-y-4 pt-2 md:pt-4">
              <div className="bg-secondary/20 flex items-start gap-4 rounded-2xl p-4 md:rounded-3xl">
                <ShieldCheck className="text-primary mt-0.5 h-6 w-6 shrink-0 md:mt-0 md:h-8 md:w-8" />
                <div>
                  <h4 className="text-sm font-bold text-[#012a4a] md:text-base">
                    Verified Professionals
                  </h4>
                  <p className="text-muted-foreground mt-1 text-xs md:mt-0 md:text-sm">
                    Rigorous screening process ensures top-tier quality care.
                  </p>
                </div>
              </div>
              <div className="bg-secondary/20 flex items-start gap-4 rounded-2xl p-4 md:rounded-3xl">
                <HeartPulse className="text-primary mt-0.5 h-6 w-6 shrink-0 md:mt-0 md:h-8 md:w-8" />
                <div>
                  <h4 className="text-sm font-bold text-[#012a4a] md:text-base">
                    Science-Backed Recovery
                  </h4>
                  <p className="text-muted-foreground mt-1 text-xs md:mt-0 md:text-sm">
                    Personalized treatment plans designed for long-term results.
                  </p>
                </div>
              </div>
            </motion.div>
          </div>

          {/* Elegant Staggered Image Grid - Mobile overflow fixes */}
          <motion.div
            variants={fadeUpVariant}
            className="col-span-1 grid grid-cols-2 gap-3 px-2 py-6 sm:px-0 md:gap-4 md:py-0 lg:col-span-5"
          >
            {/* Reduced translation distance on mobile to prevent clipping */}
            <div className="flex translate-y-4 flex-col gap-3 md:translate-y-8 md:gap-4">
              <img
                src={images[0]}
                alt="Physio session"
                className="h-3/5 w-full rounded-3xl object-cover shadow-lg md:rounded-4xl"
              />
              <img
                src={images[1]}
                alt="Physio clinic"
                className="h-2/5 w-full rounded-3xl object-cover shadow-lg md:rounded-4xl"
              />
            </div>
            <div className="flex -translate-y-4 flex-col gap-3 md:-translate-y-8 md:gap-4">
              <img
                src={images[2]}
                alt="Online consultation"
                className="h-2/5 w-full rounded-3xl object-cover shadow-lg md:rounded-4xl"
              />
              <img
                src={images[3]}
                alt="Home visit"
                className="h-3/5 w-full rounded-3xl object-cover shadow-lg md:rounded-4xl"
              />
            </div>
          </motion.div>
        </motion.div>

        {/* Vision & Mission */}
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-100px' }}
          className="relative overflow-hidden rounded-4xl bg-[#012a4a] p-8 text-white sm:p-10 md:rounded-[3rem] md:p-16"
        >
          <div className="bg-primary absolute top-0 left-0 h-48 w-48 -translate-x-1/2 -translate-y-1/2 rounded-full opacity-30 blur-3xl md:h-64 md:w-64" />
          <div className="relative z-10 grid gap-10 md:grid-cols-2 md:gap-12">
            <div className="space-y-3 md:space-y-4">
              <h2 className="text-secondary text-xs font-bold tracking-widest uppercase md:text-sm">
                Our Vision
              </h2>
              <h3 className="text-2xl leading-tight font-bold md:text-3xl">
                Revolutionizing Physiotherapy Access
              </h3>
              <p className="text-sm leading-relaxed text-white/80 md:text-base">
                We envision a world where quality physiotherapy is easily accessible to everyone. We
                bridge the gap between patients and expert physiotherapists, ensuring seamless care
                and setting new standards in clinical excellence.
              </p>
            </div>
            <div className="space-y-3 md:space-y-4">
              <h2 className="text-secondary text-xs font-bold tracking-widest uppercase md:text-sm">
                Our Mission
              </h2>
              <ul className="space-y-3 text-sm text-white/80 md:space-y-4 md:text-base">
                <li className="flex items-start gap-3">
                  <CheckCircle2 className="text-secondary mt-0.5 h-4 w-4 shrink-0 md:h-5 md:w-5" />
                  <span>
                    <strong className="text-white">For Patients:</strong> Fast recovery and better
                    mobility through a network of verified experts.
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle2 className="text-secondary mt-0.5 h-4 w-4 shrink-0 md:h-5 md:w-5" />
                  <span>
                    <strong className="text-white">For Professionals:</strong> Grow practices
                    seamlessly while we handle admin and bookings.
                  </span>
                </li>
              </ul>
            </div>
          </div>
        </motion.div>

        {/* Impact Dashboard & Stats */}
        <div className="space-y-8 md:space-y-12">
          <div className="space-y-3 text-center md:space-y-4">
            <h2 className="text-2xl font-bold text-[#012a4a] md:text-4xl">Our Clinical Impact</h2>
            <p className="text-muted-foreground text-base md:text-lg">
              Trusted by thousands across the nation.
            </p>
          </div>

          <ImpactDashboard
            metrics={metrics}
            COLORS={COLORS}
            pieData={pieData}
            coverageData={coverageData}
          />

          {/* Quick Stats Banner */}
          <div className="grid grid-cols-2 gap-4 md:grid-cols-4 md:gap-6">
            {metrics.map((metric, idx) => (
              <motion.div
                key={metric.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.1 }}
                viewport={{ once: true }}
                className="bg-secondary/20 rounded-2xl p-4 text-center shadow-sm md:rounded-3xl md:p-6"
              >
                <div
                  className="mb-1 text-2xl font-bold sm:text-3xl md:mb-2 md:text-4xl"
                  style={{ color: metric.color }}
                >
                  {metric.value.toLocaleString()}+
                </div>
                <div className="text-muted-foreground text-xs leading-tight font-medium sm:text-sm md:leading-normal">
                  {metric.name}
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Shadcn Carousels for Testimonials */}
        <div className="space-y-16 pt-6 md:space-y-24 md:pt-10">
          {/* Patient Feedback Carousel */}
          <div className="space-y-6 md:space-y-8">
            <div className="space-y-2 text-center">
              <h2 className="text-2xl font-bold text-[#012a4a] md:text-3xl">
                Patient Success Stories
              </h2>
              <p className="text-muted-foreground text-sm md:text-base">
                Real recovery journeys from our community.
              </p>
            </div>

            <Carousel opts={{ align: 'start', loop: true }} className="w-full">
              <CarouselContent className="-ml-4">
                {feedback.map((feed, index) => (
                  <CarouselItem key={index} className="pl-4 md:basis-1/2 lg:basis-1/3">
                    <div className="h-full p-1">
                      <div className="border-border flex h-full flex-col rounded-[20px] border bg-white p-5 shadow-sm transition-shadow hover:shadow-md md:rounded-3xl md:p-6">
                        <h3 className="mb-3 line-clamp-2 text-base font-bold text-[#012a4a] md:text-lg">
                          {feed.title}
                        </h3>
                        <p className="text-muted-foreground mb-6 grow text-xs leading-relaxed italic md:text-sm">
                          "{feed.quote}"
                        </p>
                        <div className="border-border/50 mt-auto flex items-center justify-between border-t pt-4">
                          <div>
                            <p className="text-xs font-bold text-[#014f86] md:text-sm">
                              {feed.author}
                            </p>
                            <p className="text-muted-foreground text-[10px] md:text-xs">
                              {feed.location}
                            </p>
                          </div>
                          {/* Ensure your StarRating component scales or fits on mobile */}
                          <div className="origin-right scale-75 md:scale-100">
                            <StarRating rating={feed.star} />
                          </div>
                        </div>
                      </div>
                    </div>
                  </CarouselItem>
                ))}
              </CarouselContent>
              <div className="mt-6 flex justify-center gap-4 md:mt-8">
                <CarouselPrevious className="static translate-y-0" />
                <CarouselNext className="static translate-y-0" />
              </div>
            </Carousel>
          </div>

          {/* Physio Testimonial Carousel */}
          <div className="space-y-6 md:space-y-8">
            <div className="space-y-2 text-center">
              <h2 className="text-2xl font-bold text-[#012a4a] md:text-3xl">
                Physiotherapist Stories
              </h2>
              <p className="text-muted-foreground text-sm md:text-base">
                Empowering careers in clinical wellness.
              </p>
            </div>

            <Carousel opts={{ align: 'start', loop: true }} className="w-full">
              <CarouselContent className="-ml-4">
                {physioTestimonial.map((testimonial, index) => (
                  <CarouselItem key={index} className="pl-4 md:basis-1/2 lg:basis-1/3">
                    <div className="h-full p-1">
                      <div className="flex h-full flex-col rounded-[20px] bg-[#012a4a] p-5 text-white shadow-sm md:rounded-3xl md:p-6">
                        <p className="mb-6 grow text-xs leading-relaxed text-white/80 italic md:text-sm">
                          "{testimonial.testimonial}"
                        </p>
                        <div className="mt-auto flex items-center justify-between border-t border-white/20 pt-4">
                          <div>
                            <p className="text-secondary text-xs font-bold md:text-sm">
                              {testimonial.name}
                            </p>
                            <p className="text-[10px] text-white/60 md:text-xs">
                              {testimonial.location}
                            </p>
                          </div>
                          <div className="origin-right scale-75 md:scale-100">
                            <StarRating rating={testimonial.rating} />
                          </div>
                        </div>
                      </div>
                    </div>
                  </CarouselItem>
                ))}
              </CarouselContent>
              <div className="mt-6 flex justify-center gap-4 md:mt-8">
                <CarouselPrevious className="static translate-y-0" />
                <CarouselNext className="static translate-y-0" />
              </div>
            </Carousel>
          </div>
        </div>

        {/* Video Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mx-auto max-w-4xl space-y-6 pt-8 text-center md:space-y-8 md:pt-10"
        >
          <h2 className="text-2xl font-bold text-[#012a4a] md:text-3xl">Watch Our Journey</h2>
          <div className="border-border overflow-hidden rounded-3xl border bg-white p-1.5 shadow-xl md:rounded-[2.5rem] md:p-2 md:shadow-2xl">
            <div className="bg-secondary/10 relative h-0 overflow-hidden rounded-2xl pb-[56.25%] md:rounded-4xl">
              <iframe
                className="absolute top-0 left-0 h-full w-full"
                src="https://www.youtube.com/embed/K6G-d9vlGQw?si=eG4pONXBkmhM00-W"
                title="Physiobuddies Journey"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                referrerPolicy="strict-origin-when-cross-origin"
                allowFullScreen
              ></iframe>
            </div>
          </div>
        </motion.div>
      </div>
      <AuraMedicalCTA />
      <Footer />
    </div>
  );
}
