import { motion } from 'framer-motion';
import { ArrowRight, HeartPulse, Lock, Mail, ShieldCheck } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';
import { FcGoogle } from 'react-icons/fc';

const LoginPage = () => {
  // Subtle animation variants for the clinical, calm feel
  const fadeIn = {
    initial: { opacity: 0, y: 10 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.5, ease: 'easeOut' },
  } as const;

  return (
    <div className="bg-background flex min-h-[calc(100vh-80px)] w-full items-center justify-center md:p-4">
      <div className="md:border-border flex w-full max-w-5xl overflow-hidden bg-white md:rounded-2xl md:border md:shadow-lg">
        {/* Left Side: Decorative & Trust Building (Hidden on Mobile) */}
        <div className="bg-secondary relative hidden w-1/2 flex-col justify-between overflow-hidden p-12 lg:flex">
          {/* Abstract Medical Decorator */}
          <div className="absolute top-[-10%] right-[-10%] h-64 w-64 rounded-full bg-[#014f86]/5 blur-3xl" />
          <div className="absolute bottom-[-5%] left-[-5%] h-48 w-48 rounded-full bg-[#013a63]/10 blur-2xl" />

          <motion.div {...fadeIn} className="relative z-10">
            <div className="mb-8 flex items-center gap-2">
              <img src="/logo.png" alt="Logo" className="h-10 w-auto" />
            </div>
            <h2 className="mb-4 text-3xl leading-tight font-bold text-[#012a4a]">
              Your Journey to Professional <br /> Recovery Starts Here.
            </h2>
            <p className="max-w-md text-lg text-[#014f86]">
              Access your personalized therapy plans and clinical consultations with ease.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="relative z-10 flex flex-col gap-4"
          >
            <div className="flex items-center gap-3 text-[#012a4a]">
              <div className="rounded-lg bg-white p-2 shadow-sm">
                <ShieldCheck className="text-primary h-5 w-5" />
              </div>
              <span className="text-sm font-medium">Verified Medical Professionals</span>
            </div>
            <div className="flex items-center gap-3 text-[#012a4a]">
              <div className="rounded-lg bg-white p-2 shadow-sm">
                <HeartPulse className="text-primary h-5 w-5" />
              </div>
              <span className="text-sm font-medium">Personalized Care Management</span>
            </div>
          </motion.div>
        </div>

        {/* Right Side: Login Form */}
        <div className="flex w-full flex-col justify-center p-8 md:p-16 lg:w-1/2">
          <motion.div {...fadeIn} className="mx-auto w-full max-w-sm">
            <div className="mb-8 flex justify-center lg:hidden">
              <img src="/logo.png" alt="Logo" className="h-10 w-auto" />
            </div>

            <div className="mb-4 space-y-2 text-center lg:text-left">
              <h1 className="text-2xl font-bold text-[#012a4a]">Welcome Back</h1>
              <p className="text-muted-foreground text-sm">
                Please enter your clinical credentials
              </p>
            </div>

            <div className="space-y-2">
              {/* Google Login */}
              <Button
                variant="outline"
                className="border-border hover:bg-secondary/30 w-full py-6 text-[#012a4a] transition-all duration-200"
              >
                <FcGoogle className="mr-2 h-4 w-4" />
                Continue with Google
              </Button>

              <div className="relative py-2">
                <div className="absolute inset-0 flex items-center">
                  <Separator />
                </div>
                <div className="relative flex justify-center text-xs uppercase">
                  <span className="text-muted-foreground bg-white px-2">Or email access</span>
                </div>
              </div>

              {/* Email & Password Form */}
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="email" className="font-medium text-[#012a4a]">
                    Email Address
                  </Label>
                  <div className="relative">
                    <Mail className="text-muted-foreground absolute top-3 left-3 h-4 w-4" />
                    <Input
                      id="email"
                      type="email"
                      placeholder="akash@example.com"
                      className="focus-visible:ring-primary border-border pl-10"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <Label htmlFor="password" className="font-medium text-[#012a4a]">
                      Password
                    </Label>
                    <Button
                      variant="link"
                      className="text-primary px-0 text-xs font-medium hover:text-[#013a63]"
                    >
                      Forgot password?
                    </Button>
                  </div>
                  <div className="relative">
                    <Lock className="text-muted-foreground absolute top-3 left-3 h-4 w-4" />
                    <Input
                      id="password"
                      type="password"
                      placeholder="••••••••"
                      className="focus-visible:ring-primary border-border pl-10"
                    />
                  </div>
                </div>

                <Button className="bg-primary w-full py-6 text-white shadow-md transition-all hover:bg-[#013a63] hover:shadow-lg">
                  Sign In to Wellness
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </div>

              <div className="pt-2 text-center">
                <p className="text-muted-foreground text-sm">
                  Don't have an account?{' '}
                  <Button
                    variant="link"
                    className="text-primary p-0 font-semibold hover:text-[#013a63]"
                  >
                    Sign up now
                  </Button>
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
