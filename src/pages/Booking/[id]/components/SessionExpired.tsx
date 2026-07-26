import React from 'react';
import { Clock } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface SessionExpiredProps {
  onRestart: () => void;
}

export const SessionExpired: React.FC<SessionExpiredProps> = ({ onRestart }) => (
  <div className="flex min-h-[60vh] flex-col items-center justify-center px-4 text-center">
    <div className="mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-red-50">
      <Clock className="h-10 w-10 text-red-500" />
    </div>
    <h2 className="mb-4 text-3xl font-bold text-[#012a4a]">Session Expired</h2>
    <p className="text-muted-foreground mb-8 max-w-md">
      For your security and to ensure fair slot availability, your booking session has expired.
      Please restart the booking process.
    </p>
    <Button className="bg-[#014f86] hover:bg-[#013a63]" onClick={onRestart}>
      Start Over
    </Button>
  </div>
);
