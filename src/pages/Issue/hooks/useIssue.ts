import { type FormEvent, useState } from 'react';
import { toast } from 'sonner';
import { useAddComplaintReply, useComplaints, useCreateComplaint } from '@/hooks/useComplaint';
import type { Complaint, ComplaintStatus } from '@/services/complaint.service';

export const formatListDate = (iso: string) =>
  new Date(iso).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });

export const formatChatTime = (iso: string) =>
  new Date(iso).toLocaleString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
    hour: 'numeric',
    minute: '2-digit',
  });

export const isReplyable = (status: ComplaintStatus) =>
  status === 'pending' || status === 'processing';

export function useIssue() {
  const { data: complaintsRes, isLoading } = useComplaints();
  const complaints = complaintsRes?.data ?? [];

  const createComplaint = useCreateComplaint();
  const addReply = useAddComplaintReply();

  const [selectedComplaint, setSelectedComplaint] = useState<Complaint | null>(null);
  const [isCreateOpen, setIsCreateOpen] = useState(false);
  const [newTopic, setNewTopic] = useState('');
  const [newDesc, setNewDesc] = useState('');
  const [replyText, setReplyText] = useState('');

  const activeComplaint =
    complaints.find((c) => c.id === selectedComplaint?.id) ?? selectedComplaint;

  const handleCreateSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!newTopic.trim() || !newDesc.trim()) return;

    try {
      await createComplaint.mutateAsync({ type: newTopic.trim(), description: newDesc.trim() });
      toast.success('Support request created successfully');
      setNewTopic('');
      setNewDesc('');
      setIsCreateOpen(false);
    } catch {
      toast.error('Failed to submit support request');
    }
  };

  const handleReplySubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!replyText.trim() || !activeComplaint) return;

    try {
      await addReply.mutateAsync({ id: activeComplaint.id, message: replyText.trim() });
      setReplyText('');
      toast.success('Reply sent');
    } catch {
      toast.error('Failed to send reply');
    }
  };

  return {
    complaints,
    isLoading,
    activeComplaint,
    selectedComplaint,
    setSelectedComplaint,
    isCreateOpen,
    setIsCreateOpen,
    newTopic,
    setNewTopic,
    newDesc,
    setNewDesc,
    replyText,
    setReplyText,
    handleCreateSubmit,
    handleReplySubmit,
    isCreating: createComplaint.isPending,
    isReplying: addReply.isPending,
  };
}
