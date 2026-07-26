import React, { useState, useEffect } from 'react';
import { Clock, ShieldCheck } from 'lucide-react';

interface HoldTimerProps {
  expiresAt: string; // ISO datetime string from backend
  onExpire: () => void;
}

export const HoldTimer: React.FC<HoldTimerProps> = ({ expiresAt, onExpire }) => {
  const calculateRemainingSeconds = () => {
    if (!expiresAt) return 0;
    const expiryTime = new Date(expiresAt).getTime();
    const now = Date.now();
    const diff = Math.max(0, Math.floor((expiryTime - now) / 1000));
    return diff;
  };

  const [timeLeft, setTimeLeft] = useState(calculateRemainingSeconds());

  useEffect(() => {
    setTimeLeft(calculateRemainingSeconds());
  }, [expiresAt]);

  useEffect(() => {
    if (timeLeft <= 0) {
      onExpire();
      return;
    }
    const t = setInterval(() => {
      const remaining = calculateRemainingSeconds();
      setTimeLeft(remaining);
      if (remaining <= 0) {
        onExpire();
      }
    }, 1000);
    return () => clearInterval(t);
  }, [expiresAt, onExpire]);

  const minutes = Math.floor(timeLeft / 60);
  const seconds = timeLeft % 60;
  const isUrgent = timeLeft < 120;

  return (
    <div className="mb-6 flex items-center justify-between rounded-xl border border-[#a9d6e5] bg-white p-4 shadow-xs">
      <div className="flex items-center gap-2 text-sm text-[#013a63]">
        <ShieldCheck className="text-emerald-600 h-5 w-5" />
        <span className="font-medium">Slot held — complete your booking before the timer ends.</span>
      </div>
      <div
        className={`flex shrink-0 items-center gap-2 rounded-full px-4 py-2 font-bold tracking-widest ${
          isUrgent ? 'border border-red-200 bg-red-50 text-red-600 animate-pulse' : 'bg-[#a9d6e5]/30 text-[#013a63]'
        }`}
      >
        <Clock className="h-4 w-4" />
        {String(minutes).padStart(2, '0')}:{String(seconds).padStart(2, '0')}
      </div>
    </div>
  );
};
