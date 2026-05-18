import { AnimatePresence, motion } from 'framer-motion';
import { ArrowRight, Calendar, Clock, Eye, Filter, Search } from 'lucide-react';
import { useMemo, useState } from 'react';

// Shadcn UI Imports
import ActionCTA from '@/components/custom/cta/cta';
import Footer from '@/components/custom/footer/footer';
import PageHeader from '@/components/custom/page-header/page-header';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from '@/components/ui/pagination';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { useNavigate } from 'react-router-dom';

// --- Mock Data (Based on your Prisma Schema) ---
const MOCK_BLOGS = [
  {
    id: '1',
    title: 'Understanding the Mind-Body Connection in Recovery',
    summary:
      'Explore how mental well-being directly impacts physical healing and recovery times after major surgeries or injuries.',
    tags: 'Mental Health, Recovery',
    thumbnail:
      'https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?auto=format&fit=crop&q=80&w=600',
    slug: 'understanding-mind-body-connection',
    readTime: '5 min',
    views: 1240,
    createdAt: new Date('2026-05-10T10:00:00Z'),
  },
  {
    id: '2',
    title: '5 Stretches to Alleviate Lower Back Pain',
    summary:
      'Sitting at a desk all day? These five clinically approved stretches can help relieve chronic lower back pain safely.',
    tags: 'Physiotherapy, Exercise',
    thumbnail:
      'https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?auto=format&fit=crop&q=80&w=600',
    slug: '5-stretches-lower-back-pain',
    readTime: '4 min',
    views: 3102,
    createdAt: new Date('2026-05-12T08:30:00Z'),
  },
  {
    id: '3',
    title: 'Nutrition for Joint Health and Inflammation',
    summary:
      'Discover the top anti-inflammatory foods that physical therapists recommend to keep your joints healthy and pain-free.',
    tags: 'Nutrition, Wellness',
    thumbnail:
      'https://images.unsplash.com/photo-1490645935967-10de6ba17061?auto=format&fit=crop&q=80&w=600',
    slug: 'nutrition-for-joint-health',
    readTime: '7 min',
    views: 890,
    createdAt: new Date('2026-05-15T14:15:00Z'),
  },
  {
    id: '4',
    title: 'Navigating Post-Op Knee Rehabilitation',
    summary:
      'A comprehensive guide on what to expect during the first 6 weeks of physiotherapy following a knee replacement.',
    tags: 'Recovery, Physiotherapy',
    thumbnail:
      'https://images.unsplash.com/photo-1583454110551-21f2fa2afe61?auto=format&fit=crop&q=80&w=600',
    slug: 'navigating-post-op-knee',
    readTime: '10 min',
    views: 4520,
    createdAt: new Date('2026-05-17T09:20:00Z'),
  },
  {
    id: '5',
    title: 'The Importance of Sleep in Muscle Recovery',
    summary:
      'Why getting 8 hours of sleep is just as important as your physical therapy sessions for muscle tissue repair.',
    tags: 'Wellness, Sleep',
    thumbnail:
      'https://images.unsplash.com/photo-1511295742362-92c96b12a806?auto=format&fit=crop&q=80&w=600',
    slug: 'importance-of-sleep',
    readTime: '6 min',
    views: 2150,
    createdAt: new Date('2026-05-18T11:45:00Z'),
  },
];

const ITEMS_PER_PAGE = 3;

export default function BlogListPage() {
  // State inference (avoids erasableSyntaxOnly errors)
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedTag, setSelectedTag] = useState('All');
  const [currentPage, setCurrentPage] = useState(1);

  const navigate = useNavigate();

  // Extract unique tags from the comma-separated strings
  const allTags = useMemo(() => {
    const tagsSet = new Set<string>();
    MOCK_BLOGS.forEach((blog) => {
      blog.tags.split(',').forEach((tag) => tagsSet.add(tag.trim()));
    });
    return ['All', ...Array.from(tagsSet)];
  }, []);

  // Filter and Search Logic
  const filteredBlogs = useMemo(() => {
    return MOCK_BLOGS.filter((blog) => {
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
  }, [searchQuery, selectedTag]);

  // Pagination Logic
  const totalPages = Math.ceil(filteredBlogs.length / ITEMS_PER_PAGE);
  const currentBlogs = filteredBlogs.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE,
  );

  // Reset to page 1 when filters change
  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
    setCurrentPage(1);
  };

  const handleTagChange = (value: string) => {
    setSelectedTag(value);
    setCurrentPage(1);
  };

  // Framer Motion Variants
  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: { staggerChildren: 0.1 },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0, transition: { duration: 0.4, ease: 'easeOut' } },
  } as const;

  return (
    <div className="bg-background min-h-screen">
      {/* Hero / Decorator Section */}
      <PageHeader
        heading="Wellness Insights"
        subheading="Expert articles, clinical advice, and holistic approaches to help you manage pain,
            recover faster, and live healthier."
      />

      <div className="relative z-10 mx-auto -mt-8 max-w-6xl px-4 pb-8 sm:px-6 lg:px-8">
        {/* Controls: Search and Filter Card */}
        <Card className="border-border mb-12 bg-white shadow-sm">
          <CardContent className="flex flex-col items-center justify-between gap-4 p-4 sm:flex-row sm:p-6">
            <div className="relative w-full sm:max-w-md">
              <Search className="text-muted-foreground absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2" />
              <Input
                placeholder="Search articles..."
                value={searchQuery}
                onChange={handleSearchChange}
                className="border-border focus-visible:ring-primary h-11 pl-9 text-[#012a4a]"
              />
            </div>

            <div className="flex w-full items-center gap-3 sm:w-auto">
              <Filter className="text-muted-foreground hidden h-4 w-4 sm:block" />
              <Select value={selectedTag} onValueChange={handleTagChange}>
                <SelectTrigger className="border-border h-11 w-full text-[#012a4a] sm:w-50">
                  <SelectValue placeholder="Filter by Topic" />
                </SelectTrigger>
                <SelectContent>
                  {allTags.map((tag) => (
                    <SelectItem key={tag} value={tag} className="text-[#012a4a]">
                      {tag}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </CardContent>
        </Card>

        {/* Blog Grid */}
        <AnimatePresence mode="wait">
          {currentBlogs.length > 0 ? (
            <motion.div
              key={currentPage + selectedTag + searchQuery}
              variants={containerVariants}
              initial="hidden"
              animate="show"
              className="mb-12 grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3"
            >
              {currentBlogs.map((blog) => (
                <motion.div key={blog.id} variants={itemVariants} className="h-full">
                  <Card
                    onClick={() => navigate(`/blog/${blog.slug}`)}
                    className="border-border hover:border-primary/30 group flex h-full flex-col overflow-hidden bg-white py-0 transition-all duration-300 hover:shadow-md"
                  >
                    {/* Thumbnail */}
                    <div className="bg-secondary/50 relative h-48 overflow-hidden">
                      <img
                        src={blog.thumbnail}
                        alt={blog.title}
                        className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                      />
                      <div className="absolute top-3 left-3 flex flex-wrap gap-2">
                        {blog.tags.split(',').map((tag) => (
                          <Badge
                            key={tag}
                            variant="secondary"
                            className="bg-white/90 text-[#013a63] shadow-sm backdrop-blur-sm"
                          >
                            {tag.trim()}
                          </Badge>
                        ))}
                      </div>
                    </div>

                    <CardHeader className="pt-5 pb-3">
                      <div className="text-muted-foreground mb-3 flex items-center gap-4 text-xs font-medium">
                        <span className="flex items-center gap-1.5">
                          <Calendar className="h-3.5 w-3.5" />
                          {blog.createdAt.toLocaleDateString('en-US', {
                            month: 'short',
                            day: 'numeric',
                            year: 'numeric',
                          })}
                        </span>
                        <span className="flex items-center gap-1.5">
                          <Clock className="h-3.5 w-3.5" />
                          {blog.readTime}
                        </span>
                      </div>
                      <h3 className="group-hover:text-primary line-clamp-2 text-xl leading-tight font-bold text-[#012a4a] transition-colors">
                        {blog.title}
                      </h3>
                    </CardHeader>

                    <CardContent className="grow">
                      <p className="line-clamp-3 text-sm leading-relaxed text-[#012a4a]/75">
                        {blog.summary}
                      </p>
                    </CardContent>

                    <CardFooter className="border-border/50 flex items-center justify-between border-t bg-gray-50/50 pt-4 pb-5">
                      <div className="text-muted-foreground flex items-center gap-1.5 text-xs font-medium">
                        <Eye className="h-3.5 w-3.5" />
                        {blog.views.toLocaleString()} views
                      </div>

                      <Button
                        variant="ghost"
                        size="sm"
                        className="text-primary p-0 font-semibold hover:bg-transparent hover:text-[#013a63]"
                      >
                        Read Article <ArrowRight className="ml-1 h-4 w-4" />
                      </Button>
                    </CardFooter>
                  </Card>
                </motion.div>
              ))}
            </motion.div>
          ) : (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="py-24 text-center"
            >
              <div className="bg-secondary/50 mb-4 inline-flex rounded-full p-4">
                <Search className="text-primary/40 h-8 w-8" />
              </div>
              <h3 className="mb-2 text-xl font-bold text-[#012a4a]">No articles found</h3>
              <p className="text-muted-foreground mx-auto max-w-md">
                We couldn't find any articles matching your search criteria. Try adjusting your
                keywords or changing the category filter.
              </p>
              <Button
                variant="outline"
                className="border-border mt-6 text-[#012a4a]"
                onClick={() => {
                  setSearchQuery('');
                  setSelectedTag('All');
                }}
              >
                Clear Filters
              </Button>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Pagination */}
        {totalPages > 1 && (
          <Pagination className="mt-8">
            <PaginationContent>
              <PaginationItem>
                <Button
                  variant="ghost"
                  className={`pl-2.5 text-[#012a4a] ${currentPage === 1 ? 'pointer-events-none opacity-50' : 'hover:bg-secondary/50'}`}
                  onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                  disabled={currentPage === 1}
                >
                  <PaginationPrevious className="hover:bg-transparent hover:text-inherit" />
                </Button>
              </PaginationItem>

              {Array.from({ length: totalPages }).map((_, i) => (
                <PaginationItem key={i}>
                  <PaginationLink
                    onClick={() => setCurrentPage(i + 1)}
                    isActive={currentPage === i + 1}
                    className={`cursor-pointer ${
                      currentPage === i + 1
                        ? 'bg-primary text-primary-foreground hover:bg-primary hover:text-primary-foreground border-primary'
                        : 'hover:bg-secondary/50 border-transparent text-[#012a4a]'
                    }`}
                  >
                    {i + 1}
                  </PaginationLink>
                </PaginationItem>
              ))}

              <PaginationItem>
                <Button
                  variant="ghost"
                  className={`pr-2.5 text-[#012a4a] ${currentPage === totalPages ? 'pointer-events-none opacity-50' : 'hover:bg-secondary/50'}`}
                  onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
                  disabled={currentPage === totalPages}
                >
                  <PaginationNext className="hover:bg-transparent hover:text-inherit" />
                </Button>
              </PaginationItem>
            </PaginationContent>
          </Pagination>
        )}
      </div>
      <ActionCTA />
      <Footer />
    </div>
  );
}
