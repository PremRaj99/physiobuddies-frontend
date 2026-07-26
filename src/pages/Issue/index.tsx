'use client';

import { AnimatePresence, motion } from 'framer-motion';
import {
  AlertCircle,
  ArrowLeft,
  CheckCircle2,
  ChevronRight,
  Clock,
  Headset,
  MessageSquareWarning,
  Plus,
  Send,
  User as UserIcon,
  XCircle,
} from 'lucide-react';
import { type FormEvent, useState } from 'react';
import { toast } from 'sonner';

import PageHeader from '@/components/custom/page-header/page-header';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { ScrollArea } from '@/components/ui/scroll-area';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Skeleton } from '@/components/ui/skeleton';
import { Textarea } from '@/components/ui/textarea';
import { useAddComplaintReply, useComplaints, useCreateComplaint } from '@/hooks/useComplaint';
import type { Complaint, ComplaintStatus } from '@/services/complaint.service';

const formatListDate = (iso: string) =>
  new Date(iso).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });

const formatChatTime = (iso: string) =>
  new Date(iso).toLocaleString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
    hour: 'numeric',
    minute: '2-digit',
  });

const isReplyable = (status: ComplaintStatus) => status === 'pending' || status === 'processing';

const getStatusBadge = (status: ComplaintStatus) => {
  switch (status) {
    case 'pending':
      return (
        <Badge className="border-amber-200 bg-amber-100 text-amber-700 hover:bg-amber-100">
          <AlertCircle className="mr-1 h-3 w-3" /> Open
        </Badge>
      );
    case 'processing':
      return (
        <Badge className="border-blue-200 bg-blue-100 text-blue-700 hover:bg-blue-100">
          <Clock className="mr-1 h-3 w-3" /> In Progress
        </Badge>
      );
    case 'completed':
      return (
        <Badge className="border-emerald-200 bg-emerald-100 text-emerald-700 hover:bg-emerald-100">
          <CheckCircle2 className="mr-1 h-3 w-3" /> Resolved
        </Badge>
      );
    case 'rejected':
      return (
        <Badge className="border-rose-200 bg-rose-100 text-rose-700 hover:bg-rose-100">
          <XCircle className="mr-1 h-3 w-3" /> Closed
        </Badge>
      );
  }
};

const parseErrorMessage = (err: unknown, fallback: string) => {
  const response = (err as { response?: { data?: { message?: string } } }).response;
  return response?.data?.message || fallback;
};

export default function SupportIssuesPage() {
  const { data: complaintsRes, isLoading } = useComplaints();
  const complaints: Complaint[] = complaintsRes?.data ?? [];

  const [selectedTicketId, setSelectedTicketId] = useState<string | null>(null);
  const [replyText, setReplyText] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);

  const [newType, setNewType] = useState('');
  const [newDesc, setNewDesc] = useState('');

  const createComplaint = useCreateComplaint();
  const addReply = useAddComplaintReply();

  const selectedTicket = complaints.find((c) => c.id === selectedTicketId) ?? null;

  const handleCreateIssue = (e: FormEvent) => {
    e.preventDefault();
    createComplaint.mutate(
      { type: newType, description: newDesc },
      {
        onSuccess: () => {
          toast.success('Issue reported successfully.');
          setIsModalOpen(false);
          setNewType('');
          setNewDesc('');
        },
        onError: (err) => toast.error(parseErrorMessage(err, 'Could not submit the ticket.')),
      },
    );
  };

  const handleSendReply = (e: FormEvent) => {
    e.preventDefault();
    if (!replyText.trim() || !selectedTicket) return;
    addReply.mutate(
      { id: selectedTicket.id, message: replyText },
      {
        onSuccess: () => {
          setReplyText('');
        },
        onError: (err) => toast.error(parseErrorMessage(err, 'Could not send your reply.')),
      },
    );
  };

  return (
    <div className="bg-background min-h-screen pb-24 font-sans">
      <PageHeader
        heading={
          <>
            Support <span className="text-[#a9d6e5]">Issues</span>
          </>
        }
        subheading="Track your reported issues, billing queries, and feedback in one place."
      />

      <main className="relative z-20 mx-auto -mt-8 max-w-6xl px-4 sm:px-6">
        <AnimatePresence mode="wait">
          {/* LIST VIEW */}
          {!selectedTicket && (
            <motion.div
              key="list-view"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.3 }}
            >
              <Card className="border-border bg-white py-0 shadow-xl shadow-[#012a4a]/5">
                <CardHeader className="border-border bg-secondary/10 flex flex-row items-center justify-between border-b py-4">
                  <div>
                    <CardTitle className="flex items-center gap-2 text-[#012a4a]">
                      <MessageSquareWarning className="h-5 w-5 text-[#014f86]" /> My Issues
                    </CardTitle>
                    <CardDescription>
                      Click on a ticket to view replies or add more details.
                    </CardDescription>
                  </div>

                  {/* Create Issue Dialog */}
                  <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
                    <DialogTrigger asChild>
                      <Button className="bg-[#014f86] text-white hover:bg-[#013a63]">
                        <Plus className="mr-2 h-4 w-4" /> Report Issue
                      </Button>
                    </DialogTrigger>
                    <DialogContent className="bg-white/90 backdrop-blur-sm sm:max-w-106.25">
                      <DialogHeader>
                        <DialogTitle className="text-[#012a4a]">Report a New Issue</DialogTitle>
                        <DialogDescription>
                          Our support team typically responds within 2 hours.
                        </DialogDescription>
                      </DialogHeader>
                      <form onSubmit={handleCreateIssue} className="space-y-4 pt-4">
                        <div className="space-y-2">
                          <Label htmlFor="type" className="text-[#012a4a]">
                            Issue Category
                          </Label>
                          <Select value={newType} onValueChange={setNewType} required>
                            <SelectTrigger id="type" className="border-border focus:ring-[#014f86]">
                              <SelectValue placeholder="Select a category" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="Billing Issue">Billing & Payments</SelectItem>
                              <SelectItem value="Technical Support">App/Technical Support</SelectItem>
                              <SelectItem value="Therapist Feedback">Therapist Feedback</SelectItem>
                              <SelectItem value="Rescheduling">Booking & Rescheduling</SelectItem>
                              <SelectItem value="Other">Other</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="desc" className="text-[#012a4a]">
                            Description
                          </Label>
                          <Textarea
                            id="desc"
                            placeholder="Please provide details about your issue..."
                            className="border-border min-h-30 resize-none focus-visible:ring-[#014f86]"
                            value={newDesc}
                            onChange={(e) => setNewDesc(e.target.value)}
                            required
                          />
                        </div>
                        <div className="flex justify-end pt-4">
                          <Button
                            type="submit"
                            disabled={createComplaint.isPending}
                            className="w-full bg-[#014f86] text-white hover:bg-[#013a63]"
                          >
                            {createComplaint.isPending ? 'Submitting...' : 'Submit Ticket'}
                          </Button>
                        </div>
                      </form>
                    </DialogContent>
                  </Dialog>
                </CardHeader>
                <CardContent className="p-0">
                  {isLoading ? (
                    <div className="space-y-2 p-5">
                      <Skeleton className="h-16 w-full" />
                      <Skeleton className="h-16 w-full" />
                      <Skeleton className="h-16 w-full" />
                    </div>
                  ) : complaints.length === 0 ? (
                    <div className="py-24 text-center">
                      <MessageSquareWarning className="text-muted-foreground/30 mx-auto mb-4 h-12 w-12" />
                      <h3 className="text-lg font-bold text-[#012a4a]">No active issues</h3>
                      <p className="text-muted-foreground">You haven't reported any issues yet.</p>
                    </div>
                  ) : (
                    <div className="divide-border divide-y">
                      {complaints.map((ticket) => (
                        <div
                          key={ticket.id}
                          onClick={() => setSelectedTicketId(ticket.id)}
                          className="hover:bg-secondary/20 group flex cursor-pointer flex-col justify-between gap-4 p-5 transition-colors sm:flex-row sm:items-center"
                        >
                          <div className="space-y-1">
                            <div className="flex items-center gap-3">
                              <span className="rounded bg-[#a9d6e5]/30 px-2 py-0.5 font-mono text-xs font-bold text-[#014f86]">
                                {ticket.id.slice(-6).toUpperCase()}
                              </span>
                              <span className="font-semibold text-[#012a4a] transition-colors group-hover:text-[#014f86]">
                                {ticket.type}
                              </span>
                            </div>
                            <p className="text-muted-foreground line-clamp-1 max-w-xl text-sm">
                              {ticket.description}
                            </p>
                          </div>

                          <div className="flex w-full shrink-0 items-center justify-between gap-4 sm:w-auto sm:justify-end">
                            <div className="text-right">
                              {getStatusBadge(ticket.status)}
                              <p className="text-muted-foreground mt-1.5 text-xs">
                                {formatListDate(ticket.createdAt)}
                              </p>
                            </div>
                            <div className="bg-secondary/50 text-muted-foreground flex h-8 w-8 items-center justify-center rounded-full transition-colors group-hover:bg-[#014f86] group-hover:text-white">
                              <ChevronRight className="h-4 w-4" />
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </CardContent>
              </Card>
            </motion.div>
          )}

          {/* DETAIL VIEW (CHAT THREAD) */}
          {selectedTicket && (
            <motion.div
              key="detail-view"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
              transition={{ duration: 0.3 }}
            >
              <Card className="border-border flex h-[75vh] flex-col bg-white py-0 shadow-xl shadow-[#012a4a]/5">
                {/* Thread Header */}
                <CardHeader className="border-border bg-secondary/10 flex flex-row items-center gap-4 border-b py-4">
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => setSelectedTicketId(null)}
                    className="shrink-0 hover:bg-white"
                  >
                    <ArrowLeft className="h-5 w-5 text-[#013a63]" />
                  </Button>
                  <div className="min-w-0 flex-1">
                    <div className="mb-1 flex items-center gap-3">
                      <span className="rounded bg-[#a9d6e5]/30 px-2 py-0.5 font-mono text-xs font-bold text-[#014f86]">
                        {selectedTicket.id.slice(-6).toUpperCase()}
                      </span>
                      {getStatusBadge(selectedTicket.status)}
                    </div>
                    <CardTitle className="truncate text-lg text-[#012a4a]">
                      {selectedTicket.type}
                    </CardTitle>
                  </div>
                </CardHeader>

                {/* Chat Area */}
                <ScrollArea className="flex-1 p-6">
                  <div className="space-y-6">
                    {/* Original Complaint (Always first) */}
                    <div className="mb-8 flex flex-col items-center">
                      <Badge variant="outline" className="bg-muted/50 text-muted-foreground mb-4">
                        Ticket Created: {formatListDate(selectedTicket.createdAt)}
                      </Badge>
                    </div>

                    {selectedTicket.reply.map((msg) => {
                      const isUser = msg.role === 'user';
                      return (
                        <div
                          key={msg.id}
                          className={`flex max-w-[85%] gap-3 ${isUser ? 'ml-auto flex-row-reverse' : 'mr-auto'}`}
                        >
                          <div
                            className={`mt-1 flex h-8 w-8 shrink-0 items-center justify-center rounded-full ${isUser ? 'bg-[#a9d6e5] text-[#013a63]' : 'bg-[#012a4a] text-white'}`}
                          >
                            {isUser ? (
                              <UserIcon className="h-4 w-4" />
                            ) : (
                              <Headset className="h-4 w-4" />
                            )}
                          </div>

                          <div className={`flex flex-col ${isUser ? 'items-end' : 'items-start'}`}>
                            <div
                              className={`rounded-2xl p-4 ${isUser
                                  ? 'rounded-tr-sm bg-[#014f86] text-white'
                                  : 'border-border rounded-tl-sm border bg-gray-100 text-[#012a4a]'
                                }`}
                            >
                              <p className="text-sm leading-relaxed whitespace-pre-wrap">
                                {msg.message}
                              </p>
                            </div>
                            <span className="text-muted-foreground mt-1.5 px-1 text-[10px] font-medium">
                              {formatChatTime(msg.createdAt)}
                            </span>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </ScrollArea>

                {/* Reply Input Area */}
                {isReplyable(selectedTicket.status) ? (
                  <div className="border-border mt-auto border-t bg-white px-4 py-2">
                    <form onSubmit={handleSendReply} className="flex gap-3">
                      <Input
                        placeholder="Type your reply here..."
                        value={replyText}
                        onChange={(e) => setReplyText(e.target.value)}
                        className="h-12 flex-1 focus-visible:ring-[#014f86]"
                      />
                      <Button
                        type="submit"
                        disabled={!replyText.trim() || addReply.isPending}
                        className="h-12 bg-[#014f86] px-6 text-white hover:bg-[#013a63]"
                      >
                        <Send className="mr-2 h-4 w-4" /> Send
                      </Button>
                    </form>
                  </div>
                ) : (
                  <div className="border-border mt-auto border-t bg-gray-50 p-4 text-center">
                    <p className="text-muted-foreground flex items-center justify-center gap-2 text-sm">
                      <CheckCircle2 className="h-4 w-4" /> This ticket has been closed for new
                      replies.
                    </p>
                  </div>
                )}
              </Card>
            </motion.div>
          )}
        </AnimatePresence>
      </main>
    </div>
  );
}
