import { Link } from 'react-router-dom';
import { motion, type Variants } from 'framer-motion';
import {
  FaFacebookF as Facebook,
  FaInstagram as Instagram,
  FaYoutube as Youtube,
  FaLinkedinIn as Linkedin,
  FaEnvelope as Mail,
  FaPhoneAlt as Phone,
  FaArrowRight as ArrowRight,
} from 'react-icons/fa';
import { FaXTwitter as Twitter } from 'react-icons/fa6';

import { Button } from '@/components/ui/button';
import img from '@/assets/footer-images/footerImage.png';
import logo from '@/assets/logo.png'; // Keep your logo path

// Assuming you have your Corousel component available
import Corousel from './AnnouncementBanner';

export default function Footer() {
  // Animation variants for links
  const linkVariants = {
    initial: { x: 0, color: 'rgba(255, 255, 255, 0.7)' },
    hover: {
      x: 4,
      color: 'rgba(255, 255, 255, 1)',
      transition: { duration: 0.2 },
    },
  };

  const socialVariants: Variants = {
    initial: { scale: 1, color: 'rgba(255, 255, 255, 0.7)' },
    hover: {
      scale: 1.1,
      color: 'var(--secondary)', // Soft Light Blue
      transition: { type: 'spring', stiffness: 300 },
    },
  };

  return (
    <div className="relative flex w-full flex-col overflow-hidden pt-12">
      {/* Banner */}
      <Corousel
        text="✦ Your Recovery, Our Mission"
        secondText="✦ Get a Personalized Consultation @ ₹99*"
      />

      {/* Overlapping Contact Card */}
      <div className="relative z-10 mx-4 mt-12 -mb-24 md:mx-12 lg:mx-32">
        <div className="border-border flex flex-col items-center justify-between gap-8 overflow-hidden rounded-3xl border bg-white p-8 shadow-xl md:p-12 lg:flex-row lg:py-0">
          {/* Decorative Background Blob */}
          <div className="bg-secondary/30 pointer-events-none absolute top-0 right-0 h-64 w-64 translate-x-1/3 -translate-y-1/2 rounded-full blur-3xl" />

          <div className="relative z-10 flex flex-1 flex-col items-center gap-4 text-center lg:items-start lg:text-left">
            <h2 className="text-3xl font-bold tracking-tight text-[#012a4a] md:text-3xl">
              Ready to start your recovery?
            </h2>
            <p className="text-muted-foreground max-w-lg text-sm leading-relaxed">
              Whether you have questions about our services, want to book an appointment, or just
              need some clinical advice, our expert team is here to help.
            </p>
            <Link to="/contact" className="mt-2 w-full md:w-auto">
              <Button className="bg-primary group h-10 w-full rounded-full px-6 text-white shadow-md transition-all hover:bg-[#013a63] md:w-auto">
                Contact Us
                <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Button>
            </Link>
          </div>

          <div className="relative z-10 hidden flex-1 justify-center md:flex lg:justify-end">
            {/* Optional: Add a subtle entry animation if the image supports it */}
            <motion.img
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              src={img}
              className="w-full max-w-72 object-contain drop-shadow-md"
              alt="Medical Professional"
            />
          </div>
        </div>
      </div>

      {/* Main Deep Navy Footer */}
      <footer className="mt-2 rounded-t-[40px] bg-[#012a4a] px-6 pt-36 pb-8 md:px-12 lg:px-24">
        <div className="mx-auto flex max-w-7xl flex-col flex-wrap justify-between gap-12 md:flex-row lg:gap-8">
          {/* Logo and Description Area */}
          <div className="flex max-w-sm flex-col gap-6">
            <div className="w-fit rounded-xl bg-white/10 p-4 backdrop-blur-sm">
              <img
                src={logo}
                alt="Medical-Trust Wellness Logo"
                className="h-10 w-auto brightness-0 invert" // Ensures logo is white if it has a dark version
              />
            </div>
            <p className="text-justify text-sm leading-relaxed text-white/70 md:text-left">
              At Physiobuddies, we are committed to providing personalized physiotherapy care that
              empowers you to overcome pain, restore mobility, and enhance your quality of life
              through expert clinical guidance.
            </p>

            {/* Social Icons */}
            <div className="flex items-center gap-4 pt-2">
              {[
                { Icon: Facebook, href: 'https://www.facebook.com/profile.php?id=61573444822909' },
                {
                  Icon: Instagram,
                  href: 'https://www.instagram.com/Physiobuddies.in?igsh=MTFla3p5c3I2ZGgzNg==',
                },
                { Icon: Youtube, href: 'https://youtube.com/@Physiobuddiesin?si=k4tEa8jEfgglspul' },
                { Icon: Linkedin, href: 'https://www.linkedin.com/company/physiobuddies/' },
                { Icon: Twitter, href: 'https://x.com/Physiobuddies' },
              ].map((social, idx) => (
                <motion.a
                  key={idx}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  variants={socialVariants}
                  initial="initial"
                  whileHover="hover"
                  className="rounded-full bg-white/5 p-2 transition-colors hover:bg-white/10"
                >
                  <social.Icon className="h-5 w-5" />
                </motion.a>
              ))}
            </div>
          </div>

          {/* Links Grid */}
          <div className="grid flex-1 grid-cols-2 gap-8 md:grid-cols-3 md:gap-16 lg:justify-items-end">
            {/* Company Links */}
            <div className="flex flex-col gap-4">
              <span className="text-lg font-bold tracking-wide text-white">Company</span>
              <ul className="flex flex-col gap-3">
                {[
                  { name: 'About Us', path: '/about' },
                  { name: 'Contact Us', path: '/contact' },
                  { name: 'Refund Policy', path: '/refund-policy' },
                  { name: 'Privacy Policy', path: '/privacy-policy' },
                  { name: 'Terms & Conditions', path: '/terms' },
                ].map((link, idx) => (
                  <li key={idx}>
                    <Link to={link.path}>
                      <motion.span
                        variants={linkVariants}
                        initial="initial"
                        whileHover="hover"
                        className="block text-sm"
                      >
                        {link.name}
                      </motion.span>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Quick Links */}
            <div className="flex flex-col gap-4">
              <span className="text-lg font-bold tracking-wide text-white">Resources</span>
              <ul className="flex flex-col gap-3">
                {[
                  { name: 'Clinical Blogs', path: '/blog' },
                  { name: 'Physiobuddies Hub', path: '/' },
                ].map((link, idx) => (
                  <li key={idx}>
                    <Link to={link.path}>
                      <motion.span
                        variants={linkVariants}
                        initial="initial"
                        whileHover="hover"
                        className="block text-sm"
                      >
                        {link.name}
                      </motion.span>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Contact Information */}
            <div className="col-span-2 flex flex-col gap-4 md:col-span-1">
              <span className="text-lg font-bold tracking-wide text-white">Get in Touch</span>
              <ul className="flex flex-col gap-4">
                <li>
                  <a
                    href="mailto:support@physiobuddies.in"
                    className="group flex items-center gap-3 text-white/70 transition-colors hover:text-white"
                  >
                    <div className="group-hover:bg-primary rounded-lg bg-white/10 p-2 transition-colors">
                      <Mail className="h-4 w-4" />
                    </div>
                    <span className="text-sm break-all">support@physiobuddies.in</span>
                  </a>
                </li>
                <li>
                  <a
                    href="tel:+918882286214"
                    className="group flex items-center gap-3 text-white/70 transition-colors hover:text-white"
                  >
                    <div className="group-hover:bg-primary rounded-lg bg-white/10 p-2 transition-colors">
                      <Phone className="h-4 w-4" />
                    </div>
                    <span className="text-sm">+91 88822 86214</span>
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mx-auto mt-16 flex max-w-7xl flex-col items-center justify-between gap-4 border-t border-white/10 pt-8 text-center md:flex-row">
          <p className="text-xs text-white/50 md:text-sm">
            Copyright © {new Date().getFullYear()} by Physiobuddies. All Rights Reserved.
          </p>
          <div className="text-xs text-white/50">Designed for Clinical Excellence</div>
        </div>
      </footer>
    </div>
  );
}
