import { motion } from 'framer-motion';
import { CircleCheckBig } from 'lucide-react';
const MotionCheck = motion(CircleCheckBig);

export default function AnimatedSuccess() {
  return (
    <div className="relative flex items-center gap-2">
      <MotionCheck
        className="check size-8 text-green-500"
        // -65 pulls the line from the correct side so it draws forwards
        initial={{ strokeDasharray: 65, strokeDashoffset: -65, opacity: 0 }}
        whileInView={{ strokeDashoffset: 0, opacity: 1 }}
        transition={{ duration: 0.7, ease: 'easeOut' }}
        viewport={{ once: true }}
      />
    </div>
  );
}
