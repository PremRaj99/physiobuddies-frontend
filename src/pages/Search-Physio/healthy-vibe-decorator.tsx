import { useIsMobile } from '@/hooks/use-mobile';
import { motion } from 'framer-motion';

const leafCount = 8; // Adjusted to have a "storm" of leaves
const leafImage = `https://pngshree.ai.in/img/Inside/Leaves/Maple/maple%20green%20laef.png`;
const images = [
  {
    src: `https://png.pngtree.com/png-vector/20230728/ourmid/pngtree-counseling-clipart-man-and-woman-having-psychological-discussions-cartoon-vector-png-image_6801599.png`,
    position: 'top-10 left-10', // Top Left
    delay: 0,
  },
  {
    src: `https://clipart-library.com/8300/2368/IlloDot_PhysicalTherapy-18bb10abe5ce4e4892b22c999dfd61f1.png`,
    position: 'top-24 right-10', // Top Right
    delay: 2,
  },
];
const leavesData = Array.from({ length: leafCount }).map((_, i) => ({
  id: i,
  // Scatter leaves randomly across the viewable area, avoiding the very edges
  startPos: {
    top: `${Math.random() * 80 + 10}%`,
    left: `${Math.random() * 80 + 10}%`,
  },
  // randomize leaf sizes between h-12 and h-20 (approx 48px to 80px)
  sizePx: Math.floor(Math.random() * 32 + 48),
  // Define unique movement paths for each leaf
  animation: {
    y: [
      0, // start
      Math.random() * 100 - 50, // float up/down randomly +/- 50px
      Math.random() * -80 - 20, // drift up again
      0, // return to start
    ],
    x: [
      0,
      Math.random() * 80 - 40, // sway left/right randomly +/- 40px
      0,
    ],
    rotate: [
      Math.random() * 360, // Start tumbling
      Math.random() * -360, // Reverse tumble
      Math.random() * 360, // Tumble back
    ],
    scale: [1, 1 + Math.random() * 0.25, 1], // Gentle pulsate/depth effect
  },
  duration: Math.random() * 8 + 12, // randomized duration 12s - 20s loop
  delay: Math.random() * 5, // randomized starting delay 0s - 5s
}));

export default function BackgroundDecor() {
  const isMobile = useIsMobile();
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden">
      {/* 1. Base depth orbs: Swapped to a slightly brighter blue and increased opacity to stand out against #013a63 */}
      <div className="absolute top-0 right-0 h-96 w-96 translate-x-1/3 -translate-y-1/2 rounded-full bg-[#468faf] opacity-50 blur-[100px]" />
      <div className="absolute top-0 left-0 h-96 w-96 -translate-x-1/3 -translate-y-1/2 rounded-full bg-[#468faf] opacity-50 blur-[100px]" />

      {!isMobile &&
        images.map((img, index) => (
          <motion.div
            key={index}
            animate={{
              y: [-15, 15, -15],
              x: [-5, 5, -5],
              rotate: [-2, 2, -2],
            }}
            transition={{
              duration: 18,
              repeat: Infinity,
              ease: 'easeInOut',
              delay: img.delay, // Stagger the animations so they don't move in sync
            }}
            className={`absolute ${img.position} h-65 w-65 opacity-30 mix-blend-overlay`}
            style={{
              backgroundImage: `url('${img.src}')`,
              backgroundSize: 'cover',
              backgroundPosition: 'center',
              borderRadius: '24px', // Soft rounded corners for the images
              // filter: 'blur(2px)', // Slight blur to keep them in the background
            }}
          />
        ))}

      {isMobile && (
        <motion.div
          animate={{
            y: [-10, 10, -10],
            x: [-5, 5, -5],
            rotate: [-2, 2, -2],
          }}
          transition={{
            duration: 6,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
          className="absolute top-1/4 left-1/2 w-full -translate-x-1/2 -translate-y-1/2 px-4"
        >
          <img
            src={`https://png.pngtree.com/png-vector/20230728/ourmid/pngtree-counseling-clipart-man-and-woman-having-psychological-discussions-cartoon-vector-png-image_6801599.png`}
            alt="Decorative counseling image"
            className="mx-auto h-40 w-auto opacity-20"
          />
        </motion.div>
      )}

      {/* 4. Mapped Random Maple Leaves Storm */}
      {leavesData.map((leaf) => (
        <motion.div
          key={`leaf-${leaf.id}`}
          animate={leaf.animation}
          transition={{
            duration: leaf.duration,
            repeat: Infinity,
            ease: 'linear', // Use linear for smooth, consistent leaf fall feel
            delay: leaf.delay,
          }}
          // Stylistic settings for the leaves
          className="absolute opacity-12 mix-blend-difference" // multiply makes green subtle on blue
          style={{
            ...leaf.startPos, // Position assigned from generated data
            width: `${leaf.sizePx}px`,
            height: `${leaf.sizePx}px`,
            backgroundImage: `url('${leafImage}')`,
            backgroundSize: 'contain', // Keep leaf proportions safe
            backgroundPosition: 'center',
            backgroundRepeat: 'no-repeat',
            transformOrigin: 'center center', // Tumble around the center
          }}
        />
      ))}
    </div>
  );
}
