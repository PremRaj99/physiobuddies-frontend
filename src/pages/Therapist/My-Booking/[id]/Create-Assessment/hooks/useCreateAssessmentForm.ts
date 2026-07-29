import { useState } from 'react';
import { useNavigate, useParams } from 'react-router';

export function useCreateAssessmentForm() {
  const { id: bookingId } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [step, setStep] = useState<number>(1);
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [isSuccess, setIsSuccess] = useState<boolean>(false);

  const handleNext = () => {
    setStep((prev) => Math.min(prev + 1, 4));
  };

  const handleBack = () => {
    setStep((prev) => Math.max(prev - 1, 1));
  };

  return {
    bookingId,
    navigate,
    step,
    setStep,
    isSubmitting,
    setIsSubmitting,
    isSuccess,
    setIsSuccess,
    handleNext,
    handleBack,
  };
}
