import { useState } from 'react';

export function useTerms() {
  const [activeTab, setActiveTab] = useState('general');

  return {
    activeTab,
    setActiveTab,
  };
}
