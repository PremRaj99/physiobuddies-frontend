import React, { type FormEvent } from 'react';
import { CheckCircle2, MessageSquare } from 'lucide-react';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';

interface ReviewItem {
  id: string;
  userName: string;
  comment: string;
  createdAt: string;
}

interface ArticleCommentsProps {
  reviews: ReviewItem[];
  reviewText: string;
  setReviewText: (val: string) => void;
  onSubmit: (e: FormEvent) => void;
  isSubmitting: boolean;
}

export const ArticleComments: React.FC<ArticleCommentsProps> = ({
  reviews,
  reviewText,
  setReviewText,
  onSubmit,
  isSubmitting,
}) => {
  return (
    <section className="border-border rounded-2xl border bg-white p-6 shadow-sm md:p-8">
      <div className="mb-8 flex items-center gap-3">
        <MessageSquare className="text-primary h-6 w-6" />
        <h3 className="text-2xl font-bold text-[#012a4a]">Discussion ({reviews.length})</h3>
      </div>

      <form onSubmit={onSubmit} className="mb-10 space-y-4">
        <Textarea
          placeholder="Share your thoughts or ask a question..."
          value={reviewText}
          onChange={(e) => setReviewText(e.target.value)}
          className="border-border focus-visible:ring-primary min-h-30 resize-none text-[#012a4a]"
        />
        <div className="flex justify-end">
          <Button
            type="submit"
            disabled={!reviewText.trim() || isSubmitting}
            className="bg-primary text-white hover:bg-[#013a63]"
          >
            {isSubmitting ? 'Posting...' : 'Post Comment'}
          </Button>
        </div>
      </form>

      <div className="space-y-6">
        {reviews.length === 0 ? (
          <p className="text-muted-foreground py-6 text-center">
            No comments yet. Be the first to share your thoughts!
          </p>
        ) : (
          reviews.map((review) => (
            <div
              key={review.id}
              className="hover:bg-secondary/10 flex gap-4 rounded-xl p-4 transition-colors"
            >
              <Avatar className="border-border h-10 w-10 border">
                <AvatarFallback className="bg-primary/10 text-primary font-bold">
                  {review.userName.charAt(0)}
                </AvatarFallback>
              </Avatar>
              <div className="flex-1 space-y-1">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="font-semibold text-[#012a4a]">{review.userName}</span>
                    <CheckCircle2 className="text-success h-3.5 w-3.5" />
                  </div>
                  <span className="text-muted-foreground text-xs">
                    {new Date(review.createdAt).toLocaleDateString('en-US', {
                      month: 'short',
                      day: 'numeric',
                      year: 'numeric',
                    })}
                  </span>
                </div>
                <p className="mt-1 text-sm leading-relaxed text-[#012a4a]/80">{review.comment}</p>
              </div>
            </div>
          ))
        )}
      </div>
    </section>
  );
};
