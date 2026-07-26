import { motion } from 'framer-motion';
import { BookOpen, Info, MessageSquare, ShieldCheck } from 'lucide-react';
import { useState } from 'react';

import StarRating from '@/components/custom/star-rating/star-rating';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import type {
  TherapistArticleItem,
  TherapistDetail,
  TherapistFaqItem,
  TherapistReviewItem,
} from '@/services/therapist.service';

interface PhysioInfoTabsProps {
  physio: TherapistDetail;
  reviews: TherapistReviewItem[];
  articles: TherapistArticleItem[];
  faqs: TherapistFaqItem[];
}

export function PhysioInfoTabs({ physio, reviews, articles, faqs }: PhysioInfoTabsProps) {
  const [expandedArticles, setExpandedArticles] = useState<Record<number, boolean>>({});

  const toggleArticle = (idx: number) =>
    setExpandedArticles((prev) => ({ ...prev, [idx]: !prev[idx] }));

  return (
    <Tabs defaultValue="info" className="w-full">
      <TabsList className="bg-secondary mb-6 h-auto w-full flex-wrap justify-start rounded-xl p-1 md:flex-nowrap">
        {[
          { id: 'info', icon: Info, label: 'Information' },
          { id: 'reviews', icon: MessageSquare, label: 'Reviews' },
          { id: 'articles', icon: BookOpen, label: 'Articles' },
          { id: 'faq', icon: ShieldCheck, label: 'FAQs' },
        ].map((tab) => (
          <TabsTrigger
            key={tab.id}
            value={tab.id}
            className="data-[state=active]:text-primary flex-1 rounded-lg py-3 text-[#013a63] transition-all data-[state=active]:bg-white"
          >
            <tab.icon className="mr-2 hidden h-4 w-4 sm:block" />
            {tab.label}
          </TabsTrigger>
        ))}
      </TabsList>

      <div className="border-border min-h-75 rounded-2xl border bg-white p-6 shadow-sm sm:p-8">
        {/* Info Tab */}
        <TabsContent value="info" className="mt-0 space-y-6 outline-none">
          <h3 className="text-xl font-bold text-[#012a4a]">About Dr. {physio.name}</h3>
          <p className="leading-relaxed text-[#012a4a]/80">
            {physio.about || 'No description provided yet.'}
          </p>
        </TabsContent>

        {/* Reviews Tab */}
        <TabsContent value="reviews" className="mt-0 space-y-4 outline-none">
          <div className="mb-6 flex items-center justify-between">
            <h3 className="text-xl font-bold text-[#012a4a]">Patient Feedback</h3>
            <div className="bg-secondary/50 flex items-center gap-2 rounded-full px-4 py-2">
              <StarRating rating={physio.rating ?? 0} />
              <span className="font-bold text-[#012a4a]">{physio.rating ?? 0}</span>
            </div>
          </div>

          {reviews.length === 0 ? (
            <p className="text-muted-foreground py-6 text-center text-sm">No reviews yet.</p>
          ) : (
            reviews.map((review, idx) => (
              <div
                key={idx}
                className="border-border bg-background hover:border-primary/20 rounded-xl border p-5 transition-colors"
              >
                <div className="mb-3 flex items-center gap-3">
                  <Avatar className="border-secondary h-10 w-10 border">
                    <AvatarImage src={review.reviewerImage || ''} />
                    <AvatarFallback className="bg-primary/10 text-primary font-bold">
                      {review.reviewerName.charAt(0)}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="font-semibold text-[#012a4a]">{review.reviewerName}</p>
                    <p className="text-muted-foreground text-xs">
                      {new Date(review.createdAt).toLocaleDateString()}
                    </p>
                  </div>
                </div>
                <StarRating rating={review.rating} />
                <p className="mt-3 leading-relaxed text-[#012a4a]/80">{review.comment}</p>
              </div>
            ))
          )}
        </TabsContent>

        {/* Articles Tab */}
        <TabsContent value="articles" className="mt-0 space-y-4 outline-none">
          <h3 className="mb-6 text-xl font-bold text-[#012a4a]">Health Articles & Insights</h3>
          {articles.length === 0 ? (
            <p className="text-muted-foreground py-6 text-center text-sm">
              No articles published yet.
            </p>
          ) : (
            articles.map((article, idx) => {
              const isExpanded = expandedArticles[idx];
              const preview = isExpanded
                ? article.content
                : `${article.content.substring(0, 120)}${article.content.length > 120 ? '...' : ''}`;
              return (
                <motion.div
                  layout
                  key={idx}
                  className="border-border bg-background cursor-pointer rounded-xl border p-6 transition-shadow hover:shadow-md"
                  onClick={() => toggleArticle(idx)}
                >
                  <h4 className="mb-2 text-lg font-bold text-[#013a63]">{article.title}</h4>
                  <motion.p layout className="text-sm leading-relaxed text-[#012a4a]/80">
                    {preview}
                  </motion.p>
                  {article.content.length > 120 && (
                    <div className="text-primary mt-4 text-sm font-medium">
                      {isExpanded ? 'Show less' : 'Read more'}
                    </div>
                  )}
                </motion.div>
              );
            })
          )}
        </TabsContent>

        {/* FAQs Tab */}
        <TabsContent value="faq" className="mt-0 outline-none">
          <h3 className="mb-6 text-xl font-bold text-[#012a4a]">Frequently Asked Questions</h3>
          {faqs.length === 0 ? (
            <p className="text-muted-foreground py-6 text-center text-sm">No FAQs added yet.</p>
          ) : (
            <Accordion type="single" collapsible className="w-full">
              {faqs.map((faq, idx) => (
                <AccordionItem key={idx} value={`item-${idx}`} className="border-border">
                  <AccordionTrigger className="hover:text-primary font-semibold text-[#013a63] hover:no-underline">
                    {faq.question}
                  </AccordionTrigger>
                  <AccordionContent className="leading-relaxed text-[#012a4a]/80">
                    {faq.answer}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          )}
        </TabsContent>
      </div>
    </Tabs>
  );
}
