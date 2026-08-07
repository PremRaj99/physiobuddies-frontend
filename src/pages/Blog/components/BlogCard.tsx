import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Calendar, Clock, Eye } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card';
import type { BlogCard as BlogType } from '@/services/blog.service';

interface BlogCardProps {
  blog: BlogType;
  onReadMore: (id: string) => void;
}

export const BlogCard: React.FC<BlogCardProps> = ({ blog, onReadMore }) => {
  return (
    <motion.div
      variants={{
        hidden: { opacity: 0, y: 20 },
        show: { opacity: 1, y: 0, transition: { duration: 0.4 } },
      }}
    >
      <Card className="border-border group flex h-full flex-col overflow-hidden bg-white py-0 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-md">
        <div className="relative h-48 w-full overflow-hidden bg-slate-100">
          <img
            src={blog.thumbnail}
            alt={blog.title}
            className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-linear-to-t from-black/60 via-transparent to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
          <div className="absolute top-3 right-3 flex items-center gap-1 rounded-full bg-white/90 px-2.5 py-1 text-[11px] font-semibold text-[#012a4a] shadow-sm backdrop-blur-sm">
            <Eye className="h-3 w-3 text-[#014f86]" />
            {blog.views}
          </div>
        </div>

        <CardHeader className="p-5 pb-2">
          <div className="mb-2 flex flex-wrap gap-1.5">
            {blog.tags.split(',').map((tag: string) => (
              <Badge
                key={tag}
                variant="secondary"
                className="bg-secondary/40 text-[10px] font-bold text-[#013a63]"
              >
                {tag.trim()}
              </Badge>
            ))}
          </div>
          <h3 className="line-clamp-2 text-lg font-bold text-[#012a4a] transition-colors group-hover:text-[#014f86]">
            {blog.title}
          </h3>
        </CardHeader>

        <CardContent className="grow p-5 pt-0">
          <p className="line-clamp-3 text-sm text-slate-600">{blog.summary}</p>
        </CardContent>

        <CardFooter className="flex items-center justify-between border-t border-slate-100 p-5 pt-4">
          <div className="flex items-center gap-3 text-xs font-medium text-slate-500">
            <span className="flex items-center gap-1">
              <Calendar className="h-3.5 w-3.5 text-[#014f86]" />
              {new Date(blog.createdAt).toLocaleDateString('en-US', {
                month: 'short',
                day: 'numeric',
              })}
            </span>
            <span className="flex items-center gap-1">
              <Clock className="h-3.5 w-3.5 text-[#014f86]" />
              {blog.readTime || '5 min read'}
            </span>
          </div>

          <Button
            variant="ghost"
            size="sm"
            onClick={() => onReadMore(blog.id)}
            className="group/btn text-[#014f86] hover:bg-[#014f86]/10 hover:text-[#013a63]"
          >
            Read{' '}
            <ArrowRight className="ml-1 h-3.5 w-3.5 transition-transform group-hover/btn:translate-x-1" />
          </Button>
        </CardFooter>
      </Card>
    </motion.div>
  );
};
