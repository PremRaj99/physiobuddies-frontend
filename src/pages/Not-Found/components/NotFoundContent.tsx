import React from 'react';
import { Button } from '@/components/ui/button';

interface NotFoundContentProps {
  onGoBack: () => void;
}

export const NotFoundContent: React.FC<NotFoundContentProps> = ({ onGoBack }) => {
  return (
    <div className="h-body flex flex-col items-center justify-center gap-4">
      <h1 className="text-4xl font-bold">404 - Not Found</h1>
      <p className="text-lg text-gray-600">The page you are looking for does not exist.</p>
      <Button onClick={onGoBack}>Go Back</Button>
    </div>
  );
};
