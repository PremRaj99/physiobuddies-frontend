import React from 'react';
import { motion } from 'framer-motion';
import { Activity } from 'lucide-react';

interface AnnouncementBannerProps {
  text: string;
  secondText?: string;
}

export default function AnnouncementBanner({ text, secondText = '' }: AnnouncementBannerProps) {
  // Combine the text strings into a single array for easier mapping
  const messages = [text, secondText].filter(Boolean);

  // We duplicate the items enough times to ensure the screen is filled
  // so the -50% translation loop is perfectly seamless.
  const repeatedMessages = Array(8).fill(messages).flat();

  return (
    <div className="relative flex overflow-hidden border-b border-[#012a4a]/20 bg-[#013a63] py-2.5 text-white">
      <motion.div
        className="flex w-max items-center whitespace-nowrap"
        // Move from 0 to -50% of its own width, then instantly snap back to 0
        animate={{ x: [0, '-50%'] }}
        transition={{
          repeat: Infinity,
          ease: 'linear',
          duration: 40, // Adjust this higher for a slower, calmer reading pace
        }}
      >
        {/* First Set */}
        <div className="flex items-center justify-around">
          {repeatedMessages.map((msg, idx) => (
            <React.Fragment key={`set1-${idx}`}>
              <span className="inline-block px-4 text-xs font-medium tracking-wider uppercase md:px-8 md:text-sm">
                {msg}
              </span>
              <Activity className="h-3.5 w-3.5 text-[#a9d6e5]/60" />
            </React.Fragment>
          ))}
        </div>

        {/* Exact Duplicate Set for Seamless Looping */}
        <div className="flex items-center justify-around">
          {repeatedMessages.map((msg, idx) => (
            <React.Fragment key={`set2-${idx}`}>
              <span className="inline-block px-4 text-xs font-medium tracking-wider uppercase md:px-8 md:text-sm">
                {msg}
              </span>
              <Activity className="h-3.5 w-3.5 text-[#a9d6e5]/60" />
            </React.Fragment>
          ))}
        </div>
      </motion.div>
    </div>
  );
}
