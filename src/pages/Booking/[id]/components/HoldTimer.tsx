import React, { useState, useEffect, useCallback } from 'react';
import { Clock, ShieldCheck } from 'lucide-react';

interface HoldTimerProps {
  expiresAt: string; // ISO datetime string from backend
  onExpire: () => void;
}

export const HoldTimer: React.FC<HoldTimerProps> = ({ expiresAt, onExpire }) => {
  const calculateRemainingSeconds = useCallback(() => {
    if (!expiresAt) return 0;
    const expiryTime = new Date(expiresAt).getTime();
    const now = Date.now();
    const diff = Math.max(0, Math.floor((expiryTime - now) / 1000));
    return diff;
  }, [expiresAt]);

  const [timeLeft, setTimeLeft] = useState(calculateRemainingSeconds);

  useEffect(() => {
    const initial = calculateRemainingSeconds();
    setTimeLeft(initial);
    if (initial <= 0) {
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
  }, [calculateRemainingSeconds, onExpire]);

  const minutes = Math.floor(timeLeft / 60);
  const seconds = timeLeft % 60;
  const isUrgent = timeLeft < 120;

  return (
    <div className="mb-6 flex items-center justify-between rounded-xl border border-[#a9d6e5] bg-white p-4 shadow-xs">
      <div className="flex items-center gap-2 text-sm text-[#013a63]">
        <ShieldCheck className="h-5 w-5 text-emerald-600" />
        <span>Your slot is held while you complete booking & payment.</span>
      </div>
      <div
        className={`flex items-center gap-2 rounded-lg px-3 py-1.5 font-semibold text-sm transition-colors ${
          isUrgent ? 'bg-red-50 text-red-600 animate-pulse' : 'bg-[#a9d6e5]/20 text-[#014f86]'
        }`}
      >
        <Clock className="h-4 w-4" />
        <span>
          {String(minutes).padStart(2, '0')}:{String(seconds).padStart(2, '0')}
        </span>
      </div>
    </div>
  );
};
