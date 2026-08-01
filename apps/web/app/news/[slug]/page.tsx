import Link from "next/link";
import { notFound } from "next/navigation";
import { Metadata } from "next";
import { newsPosts } from "../../data/news";
import { Card } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return newsPosts.map((article) => ({
    slug: article.slug,
  }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const article = newsPosts.find(
    (item) => item.slug === slug || item.id === slug,
  );

  if (!article) {
    return { title: "Article Not Found | Tudulu" };
  }

  return {
    title: `${article.title} | Tudulu News`,
    description: article.summary,
  };
}

export default async function NewsDetailPage({ params }: Props) {
  const { slug } = await params;
  const currentIndex = newsPosts.findIndex(
    (item) => item.slug === slug || item.id === slug,
  );

  if (currentIndex === -1) {
    notFound();
  }

  const article = newsPosts[currentIndex];
  const prevArticle = currentIndex > 0 ? newsPosts[currentIndex - 1] : null;
  const nextArticle =
    currentIndex < newsPosts.length - 1 ? newsPosts[currentIndex + 1] : null;

  return (
    <Section spacing="lg" className="bg-white border-b border-slate-200">
      <Container size="md">
        {/* Breadcrumb Back Link */}
        <div className="mb-6">
          <Link
            href="/news"
            className="text-xs font-semibold text-sky-600 hover:text-sky-700 transition-colors inline-flex items-center space-x-1"
          >
            <span>&larr;</span>
            <span>Back to Latest News</span>
          </Link>
        </div>

        {/* Article Header */}
        <header className="space-y-4 border-b border-slate-200 pb-8">
          <div className="flex items-center space-x-3 text-xs">
            <Badge variant="blue">{article.category}</Badge>
            <span className="text-slate-500 font-medium">
              {article.publishedAt}
            </span>
            <span className="text-slate-300">•</span>
            <span className="text-slate-500 font-medium">
              {article.readingTimeMinutes} min read
            </span>
          </div>

          <h1 className="text-3xl sm:text-5xl font-extrabold text-slate-900 leading-tight tracking-tight">
            {article.title}
          </h1>

          <div className="flex items-center space-x-3 pt-2 text-xs font-medium text-slate-600">
            <span>By {article.author.name}</span>
            <span>•</span>
            <span>{article.author.role}</span>
          </div>

          <p className="text-slate-600 text-base sm:text-lg leading-relaxed pt-4 italic border-l-2 border-sky-500 pl-4">
            {article.summary}
          </p>
        </header>

        {/* Article Content Body */}
        <article className="prose prose-slate max-w-none pt-8 space-y-6 text-slate-700 text-sm sm:text-base leading-relaxed">
          <p>
            In primary care facilities and regional health centers across East
            Africa, network instability and frequent power blackouts create
            critical gaps in patient continuity of care. Standard web-first
            electronic health record (EHR) solutions fail when connection is
            lost, stalling clinical workflows at the point of care.
          </p>

          <h2 className="text-xl font-bold text-slate-900 pt-4">
            Local-First Synchronisation & Resilient Caching
          </h2>

          <p>
            To address these field realities, systems built on edge-first
            architectures utilize local relational databases (such as SQLite or
            IndexedDB) directly on local hardware nodes. When connectivity
            drops, operations continue uninterrupted locally. Once connection is
            restored, background web workers handle queue synchronization and
            conflict resolution automatically.
          </p>

          <Card className="bg-slate-50 border border-slate-200 rounded-xl p-6 my-6">
            <h3 className="text-xs font-bold text-sky-600 uppercase tracking-wider mb-3">
              Key Technical Takeaways
            </h3>
            <ul className="list-disc list-inside space-y-2 text-xs sm:text-sm text-slate-600">
              <li>
                Zero-latency local reads and writes via client-side storage
                engine.
              </li>
              <li>
                Background queue sync with automatic retries and exponential
                backoff.
              </li>
              <li>
                IndexedDB PDF and report caching for continuous offline
                printing.
              </li>
            </ul>
          </Card>

          <p>
            Deploying resilient, offline-ready technology empowers clinical
            staff and field administrators to focus on care delivery rather than
            system uptime constraints.
          </p>
        </article>

        {/* Next / Previous Article Navigation */}
        <div className="pt-10 mt-12 border-t border-slate-200 grid grid-cols-1 sm:grid-cols-2 gap-4">
          {prevArticle ? (
            <Link
              href={`/news/${prevArticle.slug || prevArticle.id}`}
              className="group p-4 bg-slate-50 border border-slate-200 rounded-xl hover:border-sky-300 transition-colors flex flex-col justify-between space-y-2"
            >
              <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider group-hover:text-sky-600 transition-colors">
                &larr; Previous Article
              </span>
              <span className="text-xs sm:text-sm font-bold text-slate-900 line-clamp-2">
                {prevArticle.title}
              </span>
            </Link>
          ) : (
            <div />
          )}

          {nextArticle ? (
            <Link
              href={`/news/${nextArticle.slug || nextArticle.id}`}
              className="group p-4 bg-slate-50 border border-slate-200 rounded-xl hover:border-sky-300 transition-colors flex flex-col justify-between space-y-2 text-right sm:col-start-2"
            >
              <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider group-hover:text-sky-600 transition-colors">
                Next Article &rarr;
              </span>
              <span className="text-xs sm:text-sm font-bold text-slate-900 line-clamp-2">
                {nextArticle.title}
              </span>
            </Link>
          ) : (
            <div />
          )}
        </div>
      </Container>
    </Section>
  );
}
