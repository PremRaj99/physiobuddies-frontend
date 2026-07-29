import { type FormEvent, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useBlogDetail, useLikeBlog, useCreateReview } from '@/hooks/useBlog';

export function useBlogDetails() {
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

  return {
    blog,
    isLoading,
    isLiked,
    displayLikeCount,
    reviewText,
    setReviewText,
    handleLike,
    handleReviewSubmit,
    isSubmittingReview: reviewMutation.isPending,
  };
}
