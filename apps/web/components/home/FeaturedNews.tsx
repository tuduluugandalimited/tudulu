// D:\tudulu\apps\web\components\home\FeaturedNews.tsx

import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { Badge } from "@/components/ui/Badge";
import { newsPosts } from "@/app/data/news";
import { ArrowRight, Clock, User } from "lucide-react";

export function FeaturedNews() {
  const featuredPosts = newsPosts.slice(0, 3);

  return (
    <section className="py-20 sm:py-28 bg-[var(--td-bg)] text-[var(--td-text)] border-b border-[var(--td-border-subtle)]">
      <Container size="lg">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 sm:mb-16 pb-6 border-b border-[var(--td-border-subtle)]">
          <div className="max-w-2xl">
            <p className="text-xs font-semibold text-[var(--td-color-primary)] uppercase tracking-widest mb-2">
              Intelligence & Field Updates
            </p>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-[var(--td-text)] tracking-tight">
              Latest Impact News
            </h2>
            <p className="text-[var(--td-text-light)] text-base sm:text-lg mt-2">
              Analysis, sector reports, and field stories across African health,
              development, and tech.
            </p>
          </div>
          <Link
            href="/news"
            className="mt-6 md:mt-0 inline-flex items-center gap-1.5 text-sm font-semibold text-[var(--td-color-primary)] hover:opacity-80 transition-opacity group shrink-0"
          >
            <span>View all stories</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>

        {/* News Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 sm:gap-10">
          {featuredPosts.map((post) => (
            <article
              key={post.id}
              className="group flex flex-col justify-between bg-[var(--td-bg-soft)] hover:bg-[var(--td-bg-surface-elevated)] rounded-[var(--td-radius-lg)] border border-[var(--td-border-subtle)] hover:border-[var(--td-border)] hover:shadow-md overflow-hidden transition-all duration-200"
            >
              <div className="p-6 space-y-4">
                <div className="flex items-center justify-between text-xs">
                  <Badge variant="blue">{post.category}</Badge>
                  <span className="inline-flex items-center gap-1 text-[var(--td-text-muted)] font-medium shrink-0">
                    <Clock className="w-3 h-3 shrink-0" />
                    <span>{post.readingTimeMinutes} min read</span>
                  </span>
                </div>

                <h3 className="text-xl font-bold text-[var(--td-text)] group-hover:text-[var(--td-color-primary)] transition-colors leading-snug">
                  <Link href={`/news/${post.slug}`}>{post.title}</Link>
                </h3>

                <p className="text-[var(--td-text-light)] text-sm leading-relaxed line-clamp-3">
                  {post.summary}
                </p>
              </div>

              <div className="px-6 pb-6 pt-2 flex items-center justify-between text-xs text-[var(--td-text-muted)] font-medium border-t border-[var(--td-border-subtle)]">
                <span className="inline-flex items-center gap-1.5 text-[var(--td-text)] truncate mr-2">
                  <User className="w-3.5 h-3.5 text-[var(--td-text-muted)] shrink-0" />
                  <span className="truncate">{post.author.name}</span>
                </span>
                <time className="shrink-0">{post.publishedAt}</time>
              </div>
            </article>
          ))}
        </div>
      </Container>
    </section>
  );
}
