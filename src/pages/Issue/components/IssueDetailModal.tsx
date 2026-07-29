import React, { type FormEvent } from 'react';
import { Headset, Send, User as UserIcon } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Textarea } from '@/components/ui/textarea';
import type { Complaint } from '@/services/complaint.service';
import { formatChatTime, isReplyable } from '../hooks/useIssue';

interface IssueDetailModalProps {
  complaint: Complaint | null;
  onClose: () => void;
  replyText: string;
  setReplyText: (val: string) => void;
  onSubmitReply: (e: FormEvent) => void;
  isReplying: boolean;
}

export const IssueDetailModal: React.FC<IssueDetailModalProps> = ({
  complaint,
  onClose,
  replyText,
  setReplyText,
  onSubmitReply,
  isReplying,
}) => {
  if (!complaint) return null;

  const canReply = isReplyable(complaint.status);

  return (
    <Dialog open={!!complaint} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="max-w-2xl overflow-hidden rounded-2xl bg-white p-0 shadow-2xl">
        <DialogHeader className="border-b border-slate-100 p-6 pb-4">
          <div className="flex items-center justify-between">
            <div>
              <DialogTitle className="text-xl font-bold text-[#012a4a] uppercase">
                {complaint.type}
              </DialogTitle>
              <p className="text-muted-foreground mt-0.5 text-xs">
                Ref ID: <span className="font-mono">{complaint.id}</span>
              </p>
            </div>
          </div>
        </DialogHeader>

        <ScrollArea className="max-h-[60vh] p-6">
          {/* Main Description */}
          <div className="mb-6 rounded-2xl bg-slate-50 p-4">
            <h4 className="mb-1 text-xs font-bold tracking-wider text-[#013a63] uppercase">
              Initial Request
            </h4>
            <p className="text-sm leading-relaxed text-[#012a4a]">{complaint.description}</p>
          </div>

          {/* Conversation Thread */}
          <div className="space-y-4">
            <h4 className="text-xs font-bold tracking-wider text-slate-400 uppercase">
              Thread History ({(complaint.reply || []).length})
            </h4>

            {(complaint.reply || []).length === 0 ? (
              <p className="py-4 text-center text-xs text-slate-400 italic">
                No replies recorded yet. Support team is investigating.
              </p>
            ) : (
              (complaint.reply || []).map((r) => {
                const isAdmin = r.role === 'support';
                return (
                  <div
                    key={r.id}
                    className={`flex gap-3 ${isAdmin ? 'justify-start' : 'justify-end'}`}
                  >
                    {isAdmin && (
                      <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-[#014f86] text-white">
                        <Headset className="h-4 w-4" />
                      </div>
                    )}
                    <div
                      className={`max-w-[80%] rounded-2xl p-4 text-sm ${
                        isAdmin ? 'bg-slate-100 text-[#012a4a]' : 'bg-[#014f86] text-white'
                      }`}
                    >
                      <div className="mb-1 flex items-center justify-between gap-4 text-[10px] opacity-80">
                        <span className="font-bold">{isAdmin ? 'Clinical Ops' : 'You'}</span>
                        <span>{formatChatTime(r.createdAt)}</span>
                      </div>
                      <p className="leading-relaxed">{r.message}</p>
                    </div>
                    {!isAdmin && (
                      <div className="bg-secondary/60 flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-[#013a63]">
                        <UserIcon className="h-4 w-4" />
                      </div>
                    )}
                  </div>
                );
              })
            )}
          </div>
        </ScrollArea>

        {/* Reply Box */}
        {canReply ? (
          <form onSubmit={onSubmitReply} className="border-t border-slate-100 bg-slate-50/50 p-4">
            <div className="flex gap-2">
              <Textarea
                placeholder="Type your response here..."
                value={replyText}
                onChange={(e) => setReplyText(e.target.value)}
                className="min-h-12 resize-none bg-white text-sm focus-visible:ring-[#014f86]"
              />
              <Button
                type="submit"
                disabled={isReplying || !replyText.trim()}
                className="h-auto bg-[#014f86] px-4 text-white hover:bg-[#013a63]"
              >
                <Send className="h-4 w-4" />
              </Button>
            </div>
          </form>
        ) : (
          <div className="border-t border-slate-100 bg-slate-50 p-4 text-center text-xs text-slate-500">
            This issue is marked as <strong>{complaint.status}</strong> and is no longer accepting
            new replies.
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
};
