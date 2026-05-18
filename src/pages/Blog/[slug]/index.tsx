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
import { useEffect, useState } from 'react';

// Shadcn UI Imports
import ActionCTA from '@/components/custom/cta/cta';
import Footer from '@/components/custom/footer/footer';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { Skeleton } from '@/components/ui/skeleton';
import { Textarea } from '@/components/ui/textarea';

// --- Types matching your Prisma Schema ---
interface BlogReview {
  id: string;
  userName: string;
  comment: string;
  createdAt: Date;
}

interface Blog {
  id: string;
  title: string;
  content: string;
  summary: string;
  tags: string;
  thumbnail: string;
  slug: string;
  readTime: string | null;
  views: number;
  createdAt: Date;
  updatedAt: Date;
  reviews: BlogReview[];
  likes: number; // Simplified from BlogLike[] for UI purposes
}

// --- Mock Fetch Function (Simulating DB call using Slug) ---
const fetchBlogBySlug = async (slug: string): Promise<Blog> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        id: '64f1b2c3e4b0a1234567890',
        title: 'Understanding the Mind-Body Connection in Recovery',
        slug: slug,
        summary:
          'Explore how mental well-being directly impacts physical healing and recovery times after major surgeries or injuries.',
        content: `
          <p>When we think of physical recovery, our minds immediately go to physical therapy, medications, and rest. However, clinical studies increasingly show that <strong>psychological well-being plays an equally critical role</strong> in how quickly and effectively our bodies heal.</p>
          
          <h2>The Science of Stress and Healing</h2>
          <p>Cortisol, the body's primary stress hormone, is necessary in small doses. But chronic stress elevates cortisol levels indefinitely, which actively suppresses the immune system and increases inflammation. In a post-operative or injury state, this can delay tissue repair by up to 40%.</p>
          
          <ul>
            <li><strong>Reduced Inflammation:</strong> Mindfulness and deep breathing lower inflammatory markers.</li>
            <li><strong>Pain Perception:</strong> Anxiety amplifies pain signals in the brain. A calm mind requires less pain medication.</li>
            <li><strong>Sleep Quality:</strong> Mental peace leads to deeper REM sleep, which is when the majority of cellular repair occurs.</li>
          </ul>

          <h2>Integrating Mindfulness into Physical Therapy</h2>
          <p>At Medical-Trust Wellness, we integrate cognitive relaxation techniques into our physical routines. Taking just 10 minutes before a physio session to engage in guided breathing can significantly improve range of motion and reduce session discomfort.</p>

          <blockquote>"Healing is not a linear physical process; it is a holistic journey that requires the mind to permit the body to rest." - Dr. Sarah Jenkins</blockquote>
          
          <p>If you are struggling with a prolonged recovery, it may be time to evaluate your stress levels and mental health support systems alongside your physical treatments.</p>
        `,
        tags: 'Mental Health, Recovery, Wellness',
        thumbnail:
          'https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?auto=format&fit=crop&q=80&w=1200',
        readTime: '5 min',
        views: 1240,
        createdAt: new Date('2026-05-10T10:00:00Z'),
        updatedAt: new Date('2026-05-11T08:00:00Z'),
        likes: 142,
        reviews: [
          {
            id: 'r1',
            userName: 'David M.',
            comment:
              "This article completely changed how I'm approaching my ACL rehab. Thank you for the insights.",
            createdAt: new Date('2026-05-12T09:15:00Z'),
          },
          {
            id: 'r2',
            userName: 'Elena R.',
            comment:
              "Very informative. I've started doing 5 minutes of meditation before my exercises and it really helps.",
            createdAt: new Date('2026-05-14T14:20:00Z'),
          },
        ],
      });
    }, 1200); // Simulate network latency
  });
};

// --- Main Page Component ---
export default function BlogDetailPage({
  slug = 'understanding-mind-body-connection',
}: {
  slug?: string;
}) {
  const [blog, setBlog] = useState<Blog | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isLiked, setIsLiked] = useState(false);
  const [likeCount, setLikeCount] = useState(0);
  const [reviewText, setReviewText] = useState('');
  const [isSubmittingReview, setIsSubmittingReview] = useState(false);

  useEffect(() => {
    const loadBlog = async () => {
      setIsLoading(true);
      const data = await fetchBlogBySlug(slug);
      setBlog(data);
      setLikeCount(data.likes);
      setIsLoading(false);
    };
    loadBlog();
  }, [slug]);

  const handleLike = () => {
    setIsLiked(!isLiked);
    setLikeCount((prev) => (isLiked ? prev - 1 : prev + 1));
  };

  const handleReviewSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!reviewText.trim()) return;

    setIsSubmittingReview(true);
    // Simulate API call
    setTimeout(() => {
      if (blog) {
        const newReview: BlogReview = {
          id: `r-${Date.now()}`,
          userName: 'Current User', // Would come from auth context
          comment: reviewText,
          createdAt: new Date(),
        };
        setBlog({ ...blog, reviews: [newReview, ...blog.reviews] });
      }
      setReviewText('');
      setIsSubmittingReview(false);
    }, 1000);
  };

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
              {blog.createdAt.toLocaleDateString('en-US', {
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
            {isLiked ? 'Liked' : 'Like'} ({likeCount})
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
                        {review.createdAt.toLocaleDateString('en-US', {
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
