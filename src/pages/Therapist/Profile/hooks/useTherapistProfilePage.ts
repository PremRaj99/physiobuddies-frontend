import { useState } from 'react';
import { useCurrentUser, useUpdateUserInfo } from '@/hooks/useUser';
import { useTherapistDetail } from '@/hooks/useTherapist';

export function useTherapistProfilePage() {
  const { data: userRes, isLoading: isUserLoading } = useCurrentUser();
  const user = userRes?.data;

  const therapistId = user?.therapistProfile?.id;
  const { data: therapistRes, isLoading: isTherapistLoading } = useTherapistDetail(
    therapistId || '',
  );
  const therapist = therapistRes?.data;

  const updateUserInfo = useUpdateUserInfo();

  const [activeTab, setActiveTab] = useState('personal');

  return {
    user,
    therapist,
    isLoading: isUserLoading || isTherapistLoading,
    activeTab,
    setActiveTab,
    updateUserInfo,
  };
}
