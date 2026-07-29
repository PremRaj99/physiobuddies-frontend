import { useState } from 'react';

export function useSettings() {
  const [activeTab, setActiveTab] = useState('security');

  return {
    activeTab,
    setActiveTab,
  };
}
