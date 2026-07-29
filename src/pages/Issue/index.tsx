'use client';

import PageHeader from '@/components/custom/page-header/page-header';
import { useIssue } from './hooks/useIssue';
import { CreateIssueModal } from './components/CreateIssueModal';
import { IssueListCard } from './components/IssueListCard';
import { IssueDetailModal } from './components/IssueDetailModal';

export default function IssuePage() {
  const {
    complaints,
    isLoading,
    activeComplaint,
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
    isCreating,
    isReplying,
  } = useIssue();

  return (
    <div className="min-h-screen bg-[#f8fbfa] pb-20 font-sans">
      <PageHeader
        heading="Support & Clinical Complaints"
        subheading="Track active inquiries, communicate directly with clinical operations, and submit new support tickets."
      />

      <main className="mx-auto max-w-4xl px-4 py-8 sm:px-6">
        <div className="mb-6 flex items-center justify-between">
          <div>
            <h2 className="text-xl font-bold text-[#012a4a]">Your Support History</h2>
            <p className="text-xs text-slate-500">View resolution progress and message history.</p>
          </div>
          <CreateIssueModal
            isOpen={isCreateOpen}
            onOpenChange={setIsCreateOpen}
            topic={newTopic}
            setTopic={setNewTopic}
            desc={newDesc}
            setDesc={setNewDesc}
            onSubmit={handleCreateSubmit}
            isSubmitting={isCreating}
          />
        </div>

        <IssueListCard
          complaints={complaints}
          isLoading={isLoading}
          onSelect={(c) => setSelectedComplaint(c)}
        />

        <IssueDetailModal
          complaint={activeComplaint}
          onClose={() => setSelectedComplaint(null)}
          replyText={replyText}
          setReplyText={setReplyText}
          onSubmitReply={handleReplySubmit}
          isReplying={isReplying}
        />
      </main>
    </div>
  );
}
