import React from 'react';
import { CheckCircle2 } from 'lucide-react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';

interface SuccessStepProps {
  navigate: (path: string) => void;
}

export const SuccessStep: React.FC<SuccessStepProps> = ({ navigate }) => {
  return (
    <div className="mx-auto flex h-full w-full max-w-sm flex-col items-center justify-center space-y-6 text-center">
      <motion.div
        initial={{ scale: 0.5, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ type: 'spring', stiffness: 200, delay: 0.1 }}
        className="bg-success/10 mb-2 flex h-20 w-20 items-center justify-center rounded-full"
      >
        <CheckCircle2 className="text-success h-10 w-10" />
      </motion.div>

      <div className="space-y-2">
        <h2 className="text-2xl font-bold text-[#012a4a]">Password Updated!</h2>
        <p className="text-muted-foreground text-sm">
          Your account has been secured with your new password. You can now log in.
        </p>
      </div>

      <Button
        onClick={() => navigate('/login')}
        className="bg-primary mt-4 h-10 w-full text-white shadow-md transition-all hover:bg-[#013a63]"
      >
        Return to Login
      </Button>
    </div>
  );
};
