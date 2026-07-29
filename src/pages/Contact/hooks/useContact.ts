import { useState } from 'react';

export function useContact() {
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    topic: 'general',
    desc: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSelectChange = (value: string) => {
    setFormData((prev) => ({ ...prev, topic: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      setIsSubmitted(true);
      setFormData({ name: '', phone: '', email: '', topic: 'general', desc: '' });
      setTimeout(() => setIsSubmitted(false), 5000);
    } catch (error) {
      console.error('Failed to submit contact form', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return {
    formData,
    isSubmitted,
    isSubmitting,
    handleChange,
    handleSelectChange,
    handleSubmit,
  };
}
