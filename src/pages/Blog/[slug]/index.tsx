'use client';

import { motion } from 'framer-motion';
import {
  ArrowLeft,
  Calendar,
  CheckCircle2,
  Clock,
  Eye,
  Heart,
  MessageSquare,
  Share2,
} from 'lucide-react';
import type { FormEvent } from 'react';
import { useState } from 'react';
import { useParams } from 'react-router-dom';

// Shadcn UI Imports
import ActionCTA from '@/components/custom/cta/cta';
import Footer from '@/components/custom/footer/footer';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { Skeleton } from '@/components/ui/skeleton';
import { Textarea } from '@/components/ui/textarea';
import { useBlogDetail, useLikeBlog, useCreateReview } from '@/hooks/useBlog';

// --- Main Page Component ---
export default function BlogDetailPage() {
  const { slug = '' } = useParams();

  const { data, isLoading } = useBlogDetail(slug);
  const blog = data?.data ?? null;

  const likeMutation = useLikeBlog(slug);
  const reviewMutation = useCreateReview(slug);

  const [isLiked, setIsLiked] = useState(false);
  const [likeCount, setLikeCount] = useState<number | null>(null);
  const [reviewText, setReviewText] = useState('');

  const displayLikeCount = likeCount ?? blog?.likes ?? 0;

  const handleLike = () => {
    if (!blog) return;
    likeMutation.mutate(blog.id, {
      onSuccess: (res) => {
        setIsLiked(res.data.liked);
        setLikeCount(res.data.likes);
      },
    });
  };

  const handleReviewSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!reviewText.trim() || !blog) return;

    reviewMutation.mutate(
      { id: blog.id, comment: reviewText },
      {
        onSuccess: () => {
          setReviewText('');
        },
      },
    );
  };

  const isSubmittingReview = reviewMutation.isPending;

  if (isLoading) {
    return (
      <div className="bg-background mx-auto min-h-screen max-w-6xl space-y-8 p-6 md:p-12">
        <Skeleton className="h-8 w-24 rounded-md" />
        <Skeleton className="h-100 w-full rounded-2xl" />
        <div className="space-y-4">
          <Skeleton className="h-12 w-3/4" />
          <Skeleton className="h-6 w-1/2" />
        </div>
        <div className="space-y-2 pt-8">
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-5/6" />
        </div>
      </div>
    );
  }

  if (!blog) return <div className="py-24 text-center text-[#012a4a]">Article not found.</div>;

  return (
    <div className="bg-background min-h-screen font-sans">
      {/* Top Decorator Bar - Secondary Soft Light Blue */}
      <div className="h-2 w-full bg-[#a9d6e5]" />

      <article className="mx-auto max-w-6xl px-4 pt-8 pb-12 sm:px-6 md:pt-12 lg:px-8">
        {/* Back Navigation */}
        <Button
          variant="ghost"
          className="text-muted-foreground mb-8 pl-0 hover:bg-transparent hover:text-[#013a63]"
          onClick={() => window.history.back()}
        >
          <ArrowLeft className="mr-2 h-4 w-4" /> Back to Articles
        </Button>

        {/* Header Section */}
        <motion.header
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-10 space-y-6"
        >
          <div className="flex flex-wrap gap-2">
            {blog.tags.split(',').map((tag) => (
              <Badge
                key={tag}
                variant="secondary"
                className="bg-secondary/40 hover:bg-secondary/60 text-[#013a63]"
              >
                {tag.trim()}
              </Badge>
            ))}
          </div>

          <h1 className="text-4xl leading-tight font-bold tracking-tight text-[#012a4a] md:text-5xl">
            {blog.title}
          </h1>

          <div className="text-muted-foreground border-border/60 flex flex-wrap items-center gap-6 border-b pb-6 text-sm font-medium">
            <div className="flex items-center gap-2">
              <Calendar className="h-4 w-4" />
              {new Date(blog.createdAt).toLocaleDateString('en-US', {
                month: 'long',
                day: 'numeric',
                year: 'numeric',
              })}
            </div>
            <div className="flex items-center gap-2">
              <Clock className="h-4 w-4" />
              {blog.readTime}
            </div>
            <div className="flex items-center gap-2">
              <Eye className="h-4 w-4" />
              {blog.views.toLocaleString()} views
            </div>
          </div>
        </motion.header>

        {/* Thumbnail Hero Image */}
        <motion.div
          initial={{ opacity: 0, scale: 0.98 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="border-border mb-12 h-75 w-full overflow-hidden rounded-2xl border shadow-sm md:h-112.5"
        >
          <img src={blog.thumbnail} alt={blog.title} className="h-full w-full object-cover" />
        </motion.div>

        {/* Article Content */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="prose prose-lg md:prose-xl prose-headings:text-[#013a63] prose-headings:font-bold prose-a:text-primary hover:prose-a:text-[#013a63] prose-a:transition-colors prose-blockquote:border-l-primary prose-blockquote:bg-secondary/10 prose-blockquote:py-1 prose-blockquote:px-6 prose-blockquote:rounded-r-lg prose-blockquote:text-[#013a63] prose-blockquote:italic prose-strong:text-[#012a4a] prose-li:marker:text-primary max-w-none text-[#012a4a]/90"
          dangerouslySetInnerHTML={{ __html: blog.content }}
        />

        <Separator className="bg-border/60 my-12" />

        {/* Article Actions (Like & Share) */}
        <div className="mb-16 flex items-center justify-between">
          <Button
            variant={isLiked ? 'default' : 'outline'}
            size="lg"
            onClick={handleLike}
            className={`gap-2 transition-all ${
              isLiked
                ? 'bg-primary text-primary-foreground hover:bg-[#013a63]'
                : 'border-border hover:bg-secondary/20 text-[#012a4a]'
            }`}
          >
            <Heart className={`h-5 w-5 ${isLiked ? 'fill-current' : ''}`} />
            {isLiked ? 'Liked' : 'Like'} ({displayLikeCount})
          </Button>

          <Button variant="ghost" className="hover:bg-secondary/20 gap-2 text-[#013a63]">
            <Share2 className="h-5 w-5" />
            Share Article
          </Button>
        </div>

        {/* Reviews / Comments Section */}
        <section className="border-border rounded-2xl border bg-white p-6 shadow-sm md:p-8">
          <div className="mb-8 flex items-center gap-3">
            <MessageSquare className="text-primary h-6 w-6" />
            <h3 className="text-2xl font-bold text-[#012a4a]">
              Discussion ({blog.reviews.length})
            </h3>
          </div>

          {/* Add Review Form */}
          <form onSubmit={handleReviewSubmit} className="mb-10 space-y-4">
            <Textarea
              placeholder="Share your thoughts or ask a question..."
              value={reviewText}
              onChange={(e) => setReviewText(e.target.value)}
              className="border-border focus-visible:ring-primary min-h-30 resize-none text-[#012a4a]"
            />
            <div className="flex justify-end">
              <Button
                type="submit"
                disabled={!reviewText.trim() || isSubmittingReview}
                className="bg-primary text-white hover:bg-[#013a63]"
              >
                {isSubmittingReview ? 'Posting...' : 'Post Comment'}
              </Button>
            </div>
          </form>

          {/* Reviews List */}
          <div className="space-y-6">
            {blog.reviews.length === 0 ? (
              <p className="text-muted-foreground py-6 text-center">
                No comments yet. Be the first to share your thoughts!
              </p>
            ) : (
              blog.reviews.map((review) => (
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
                    <p className="mt-1 text-sm leading-relaxed text-[#012a4a]/80">
                      {review.comment}
                    </p>
                  </div>
                </div>
              ))
            )}
          </div>
        </section>
      </article>
      <ActionCTA />
      <Footer />
    </div>
  );
}
