import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import {
  getBlogs,
  getBlogBySlug,
  likeBlog,
  createBlogReview,
  getAdminBlogs,
  createBlog,
  updateBlog,
  deleteBlog,
  type ListBlogParams,
  type CreateBlogPayload,
  type UpdateBlogPayload,
} from '@/services/blog.service';

export const useBlogs = (params?: ListBlogParams) => {
  return useQuery({
    queryKey: ['blogs', params],
    queryFn: () => getBlogs(params),
    placeholderData: (prev) => prev,
  });
};

export const useBlogDetail = (slug: string) => {
  return useQuery({
    queryKey: ['blog', slug],
    queryFn: () => getBlogBySlug(slug),
    enabled: !!slug,
  });
};

export const useLikeBlog = (slug?: string) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id: string) => likeBlog(id),
    onSuccess: () => {
      if (slug) {
        queryClient.invalidateQueries({ queryKey: ['blog', slug] });
      }
    },
  });
};

export const useCreateReview = (slug?: string) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, comment }: { id: string; comment: string }) => createBlogReview(id, comment),
    onSuccess: () => {
      if (slug) {
        queryClient.invalidateQueries({ queryKey: ['blog', slug] });
      }
    },
  });
};

export const useAdminBlogs = () => {
  return useQuery({
    queryKey: ['blogs', 'admin'],
    queryFn: () => getAdminBlogs(),
  });
};

export const useCreateBlog = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (payload: CreateBlogPayload) => createBlog(payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['blogs'] });
    },
  });
};

export const useUpdateBlog = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, payload }: { id: string; payload: UpdateBlogPayload }) =>
      updateBlog(id, payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['blogs'] });
    },
  });
};

export const useDeleteBlog = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id: string) => deleteBlog(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['blogs'] });
    },
  });
};
