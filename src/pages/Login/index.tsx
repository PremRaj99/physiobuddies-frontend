import { motion } from 'framer-motion';
import { HeartPulse, ShieldCheck } from 'lucide-react';
import { LoginForm } from './components/LoginForm';
import { useLoginPage } from './hooks/useLoginPage';

const LoginPage = () => {
  const { register, handleSubmit, errors, onSubmit, isFormSubmitting, navigate } = useLoginPage();

  // Subtle animation variants for the clinical, calm feel
  const fadeIn = {
    initial: { opacity: 0, y: 10 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.5, ease: 'easeOut' },
  } as const;

  return (
    <div className="bg-background min-h-body flex w-full items-center justify-center md:p-4">
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

        {/* Right Side: Login Form Area */}
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

            <LoginForm
              register={register}
              handleSubmit={handleSubmit}
              errors={errors}
              onSubmit={onSubmit}
              isFormSubmitting={isFormSubmitting}
              navigate={navigate}
            />
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
