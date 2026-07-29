import { motion } from 'framer-motion';
import ActionCTA from '@/components/custom/cta/cta';
import Footer from '@/components/custom/footer/footer';
import PageHeader from '@/components/custom/page-header/page-header';
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from '@/components/ui/pagination';
import { useBlogPage } from './hooks/useBlogPage';
import { BlogFilter } from './components/BlogFilter';
import { BlogCard } from './components/BlogCard';

export default function BlogListPage() {
  const {
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
  } = useBlogPage();

  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: { staggerChildren: 0.1 },
    },
  };

  return (
    <div className="min-h-body bg-[#f8fbfa] font-sans">
      <PageHeader
        heading={
          <span>
            Knowledge & Insights <span className="text-[#a9d6e5]">Blog</span>
          </span>
        }
        subheading="Expert advice, physiotherapy guides, and wellness tips from leading physical health professionals."
      />

      <main className="mx-auto max-w-6xl px-4 py-10 sm:px-6">
        <BlogFilter
          searchQuery={searchQuery}
          onSearchChange={handleSearchChange}
          selectedTag={selectedTag}
          onTagChange={handleTagChange}
          allTags={allTags}
        />

        {isLoading ? (
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
            {[1, 2, 3].map((i) => (
              <div key={i} className="h-96 w-full animate-pulse rounded-2xl bg-slate-200/60" />
            ))}
          </div>
        ) : filteredBlogs.length > 0 ? (
          <>
            <motion.div
              variants={containerVariants}
              initial="hidden"
              animate="show"
              className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3"
            >
              {currentBlogs.map((blog) => (
                <BlogCard key={blog.id} blog={blog} onReadMore={(id) => navigate(`/blog/${id}`)} />
              ))}
            </motion.div>

            {totalPages > 1 && (
              <div className="mt-12 flex justify-center">
                <Pagination>
                  <PaginationContent>
                    <PaginationItem>
                      <PaginationPrevious
                        onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
                        className={
                          currentPage === 1
                            ? 'pointer-events-none opacity-50'
                            : 'cursor-pointer hover:bg-[#014f86]/10'
                        }
                      />
                    </PaginationItem>
                    {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                      <PaginationItem key={page}>
                        <PaginationLink
                          onClick={() => setCurrentPage(page)}
                          isActive={currentPage === page}
                          className={
                            currentPage === page
                              ? 'bg-[#014f86] text-white hover:bg-[#013a63]'
                              : 'cursor-pointer hover:bg-[#014f86]/10'
                          }
                        >
                          {page}
                        </PaginationLink>
                      </PaginationItem>
                    ))}
                    <PaginationItem>
                      <PaginationNext
                        onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
                        className={
                          currentPage === totalPages
                            ? 'pointer-events-none opacity-50'
                            : 'cursor-pointer hover:bg-[#014f86]/10'
                        }
                      />
                    </PaginationItem>
                  </PaginationContent>
                </Pagination>
              </div>
            )}
          </>
        ) : (
          <div className="py-20 text-center">
            <h3 className="text-xl font-bold text-[#012a4a]">No articles found</h3>
            <p className="mt-2 text-sm text-slate-500">
              Try adjusting your search criteria or tag filters.
            </p>
          </div>
        )}
      </main>

      <ActionCTA />
      <Footer />
    </div>
  );
}
