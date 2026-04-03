import { cn } from '@/lib/utils';
import { motion, type Variants } from 'framer-motion';

const fadeUpVariant: Variants = {
  hidden: { opacity: 0, y: 15 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: 'easeOut' } },
};

export default function PageHeader({
  heading,
  subheading,
  className = '',
}: {
  heading: string;
  subheading: string;
  className?: string;
}) {
  return (
    <div
      className={cn(
        '"relative md:py-16" w-full overflow-hidden bg-[#013a63] px-4 py-12',
        className,
      )}
    >
      <div className="pointer-events-none absolute top-0 right-0 h-96 w-96 translate-x-1/3 -translate-y-1/2 rounded-full bg-[#014f86] opacity-30 blur-[100px]" />

      <motion.div
        initial="hidden"
        animate="visible"
        variants={fadeUpVariant}
        className="relative z-10 mx-auto max-w-3xl text-center"
      >
        <h1 className="mb-3 text-2xl font-bold tracking-tight text-white md:text-3xl">{heading}</h1>
        <p className="mx-auto max-w-xl text-base font-light text-[#a9d6e5]">{subheading}</p>
      </motion.div>
    </div>
  );
}
