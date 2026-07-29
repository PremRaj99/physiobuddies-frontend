import { useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useBlogs } from '@/hooks/useBlog';

const ITEMS_PER_PAGE = 3;

export function useBlogPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedTag, setSelectedTag] = useState('All');
  const [currentPage, setCurrentPage] = useState(1);

  const navigate = useNavigate();
  const { data, isLoading } = useBlogs();
  const blogs = useMemo(() => data?.data ?? [], [data]);

  const allTags = useMemo(() => {
    const tagsSet = new Set<string>();
    blogs.forEach((blog) => {
      blog.tags.split(',').forEach((tag) => tagsSet.add(tag.trim()));
    });
    return ['All', ...Array.from(tagsSet)];
  }, [blogs]);

  const filteredBlogs = useMemo(() => {
    return blogs.filter((blog) => {
      const matchesSearch =
        blog.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        blog.summary.toLowerCase().includes(searchQuery.toLowerCase());

      const matchesTag =
        selectedTag === 'All' ||
        blog.tags
          .split(',')
          .map((t) => t.trim())
          .includes(selectedTag);

      return matchesSearch && matchesTag;
    });
  }, [searchQuery, selectedTag, blogs]);

  const totalPages = Math.max(1, Math.ceil(filteredBlogs.length / ITEMS_PER_PAGE));
  const currentBlogs = filteredBlogs.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE,
  );

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
    setCurrentPage(1);
  };

  const handleTagChange = (value: string) => {
    setSelectedTag(value);
    setCurrentPage(1);
  };

  return {
    navigate,
    isLoading,
    searchQuery,
    selectedTag,
    currentPage,
    setCurrentPage,
    allTags,
    filteredBlogs,
    currentBlogs,
    totalPages,
    handleSearchChange,
    handleTagChange,
  };
}
