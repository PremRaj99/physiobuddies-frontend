'use client';

import { motion } from 'framer-motion';
import { ArrowLeft, Calendar, Clock, Eye, Heart, Share2 } from 'lucide-react';
import ActionCTA from '@/components/custom/cta/cta';
import Footer from '@/components/custom/footer/footer';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { Skeleton } from '@/components/ui/skeleton';
import { useBlogDetails } from './hooks/useBlogDetails';
import { ArticleComments } from './components/ArticleComments';

export default function BlogDetailPage() {
  const {
    blog,
    isLoading,
    isLiked,
    displayLikeCount,
    reviewText,
    setReviewText,
    handleLike,
    handleReviewSubmit,
    isSubmittingReview,
  } = useBlogDetails();

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
      <div className="h-2 w-full bg-[#a9d6e5]" />

      <article className="mx-auto max-w-6xl px-4 pt-8 pb-12 sm:px-6 md:pt-12 lg:px-8">
        <Button
          variant="ghost"
          className="text-muted-foreground mb-8 pl-0 hover:bg-transparent hover:text-[#013a63]"
          onClick={() => window.history.back()}
        >
          <ArrowLeft className="mr-2 h-4 w-4" /> Back to Articles
        </Button>

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

        <motion.div
          initial={{ opacity: 0, scale: 0.98 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="border-border mb-12 h-75 w-full overflow-hidden rounded-2xl border shadow-sm md:h-112.5"
        >
          <img src={blog.thumbnail} alt={blog.title} className="h-full w-full object-cover" />
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="prose prose-lg md:prose-xl prose-headings:text-[#013a63] prose-headings:font-bold prose-a:text-primary hover:prose-a:text-[#013a63] prose-a:transition-colors prose-blockquote:border-l-primary prose-blockquote:bg-secondary/10 prose-blockquote:py-1 prose-blockquote:px-6 prose-blockquote:rounded-r-lg prose-blockquote:text-[#013a63] prose-blockquote:italic prose-strong:text-[#012a4a] prose-li:marker:text-primary max-w-none text-[#012a4a]/90"
          dangerouslySetInnerHTML={{ __html: blog.content }}
        />

        <Separator className="bg-border/60 my-12" />

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

        <ArticleComments
          reviews={blog.reviews}
          reviewText={reviewText}
          setReviewText={setReviewText}
          onSubmit={handleReviewSubmit}
          isSubmitting={isSubmittingReview}
        />
      </article>
      <ActionCTA />
      <Footer />
    </div>
  );
}
