import { axios } from '@/utils/axios';
import type { ApiResponse } from './index';

export interface BlogCard {
  id: string;
  title: string;
  summary: string;
  tags: string;
  thumbnail: string;
  slug: string;
  readTime: string | null;
  views: number;
  createdAt: string;
}

export interface BlogReview {
  id: string;
  userName: string;
  comment: string;
  createdAt: string;
}

export interface BlogDetail {
  id: string;
  title: string;
  content: string;
  summary: string;
  tags: string;
  thumbnail: string;
  slug: string;
  readTime: string | null;
  views: number;
  createdAt: string;
  updatedAt: string;
  likes: number;
  reviews: BlogReview[];
}

export interface AdminBlog {
  id: string;
  title: string;
  content: string;
  summary: string;
  tags: string;
  thumbnail: string;
  slug: string;
  readTime: string | null;
  views: number;
  createdAt: string;
  updatedAt: string;
}

export interface LikeBlogResponse {
  liked: boolean;
  likes: number;
}

export interface ListBlogParams {
  page?: number;
  limit?: number;
  search?: string;
  tag?: string;
}

export interface CreateBlogPayload {
  title: string;
  content: string;
  summary: string;
  tags: string;
  thumbnail: string;
  slug: string;
  readTime?: string;
}

export type UpdateBlogPayload = Partial<CreateBlogPayload>;

export const getBlogs = async (params?: ListBlogParams): Promise<ApiResponse<BlogCard[]>> => {
  const { data } = await axios.get<ApiResponse<BlogCard[]>>('/blog', { params });
  return data;
};

export const getBlogBySlug = async (slug: string): Promise<ApiResponse<BlogDetail>> => {
  const { data } = await axios.get<ApiResponse<BlogDetail>>(`/blog/${slug}`);
  return data;
};

export const likeBlog = async (id: string): Promise<ApiResponse<LikeBlogResponse>> => {
  const { data } = await axios.post<ApiResponse<LikeBlogResponse>>(`/blog/${id}/like`);
  return data;
};

export const createBlogReview = async (
  id: string,
  comment: string,
): Promise<ApiResponse<BlogReview>> => {
  const { data } = await axios.post<ApiResponse<BlogReview>>(`/blog/${id}/review`, { comment });
  return data;
};

export const getAdminBlogs = async (): Promise<ApiResponse<AdminBlog[]>> => {
  const { data } = await axios.get<ApiResponse<AdminBlog[]>>('/blog/admin/all');
  return data;
};

export const createBlog = async (payload: CreateBlogPayload): Promise<ApiResponse<null>> => {
  const { data } = await axios.post<ApiResponse<null>>('/blog', payload);
  return data;
};

export const updateBlog = async (
  id: string,
  payload: UpdateBlogPayload,
): Promise<ApiResponse<null>> => {
  const { data } = await axios.put<ApiResponse<null>>(`/blog/admin/${id}`, payload);
  return data;
};

export const deleteBlog = async (id: string): Promise<ApiResponse<null>> => {
  const { data } = await axios.delete<ApiResponse<null>>(`/blog/${id}`);
  return data;
};
