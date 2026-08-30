"use client";

import { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import {
  Newspaper,
  Calendar,
  ArrowLeft,
  Tag,
  User,
  Clock,
  Share2,
  Check,
  ExternalLink,
} from "lucide-react";

interface NewsArticle {
  id: string;
  slug: string;
  title: string;
  summary?: string;
  content?: string;
  category?: string;
  coverImage?: string;
  externalLink?: string;
  linkText?: string;
  publishedAt?: string;
  createdAt?: string;
  author?: {
    id: string;
    name: string;
  };
  tags?: Array<{ id?: string; name: string }>;
}

export default function NewsDetailPage() {
  const params = useParams();
  const slug = params?.slug as string;

  const [article, setArticle] = useState<NewsArticle | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [copied, setCopied] = useState<boolean>(false);

  useEffect(() => {
    if (!slug) return;

    let isMounted = true;
    setLoading(true);
    setError(null);

    fetch(`/api/news/${slug}`, {
      headers: {
        Accept: "application/json",
      },
    })
      .then(async (res) => {
        const contentType = res.headers.get("content-type") || "";
        const isJson = contentType.includes("application/json");

        if (!res.ok) {
          const errorPayload = isJson
            ? await res.json().catch(() => null)
            : null;
          throw new Error(
            errorPayload?.message ||
              `Unable to load dispatch (Status ${res.status}).`,
          );
        }

        if (!isJson) {
          throw new Error("Invalid response format received.");
        }

        return res.json();
      })
      .then((data) => {
        if (!isMounted) return;
        setArticle(data);
        setLoading(false);
      })
      .catch((err) => {
        if (!isMounted) return;
        setError(err.message || "An unexpected error occurred.");
        setLoading(false);
      });

    return () => {
      isMounted = false;
    };
  }, [slug]);

  const handleShare = () => {
    if (typeof window === "undefined") return;
    navigator.clipboard.writeText(window.location.href);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-[var(--td-bg-soft)] py-16 px-4 flex items-center justify-center">
        <div className="bg-[var(--td-bg-surface-elevated)] rounded-2xl border border-[var(--td-border-subtle)] p-8 shadow-sm text-center text-[var(--td-text-muted)] text-xs font-medium">
          Loading article dispatch...
        </div>
      </div>
    );
  }

  if (error || !article) {
    return (
      <div className="min-h-screen bg-[var(--td-bg-soft)] py-16 px-4">
        <div className="max-w-3xl mx-auto bg-[var(--td-bg-surface-elevated)] rounded-2xl border border-[var(--td-border-subtle)] p-8 text-center shadow-sm">
          <Newspaper className="w-12 h-12 text-[var(--td-text-muted)] mx-auto mb-3 opacity-50" />
          <h1 className="text-lg font-bold text-[var(--td-text)] mb-2">
            Dispatch Not Available
          </h1>
          <p className="text-xs text-[var(--td-text-muted)] mb-6 font-mono bg-[var(--td-bg)] p-3 rounded-lg border border-[var(--td-border-subtle)]">
            {error || "The requested article could not be located."}
          </p>
          <Link
            href="/news"
            className="inline-flex items-center gap-2 px-5 py-2.5 bg-[var(--td-color-primary)] hover:bg-[var(--td-color-primary-hover)] text-white rounded-xl text-xs font-semibold transition-all shadow-sm"
          >
            <ArrowLeft className="w-3.5 h-3.5" /> Back to News & Intelligence
          </Link>
        </div>
      </div>
    );
  }

  const rawDate = article.publishedAt || article.createdAt;
  const formattedDate = rawDate
    ? new Date(rawDate).toLocaleDateString()
    : "Recent Dispatch";

  const calculateReadTime = (content?: string) => {
    if (!content) return "3 min read";
    const plainText = content.replace(/<[^>]*>/g, "");
    const wordCount = plainText.split(/\s+/).filter(Boolean).length;
    const minutes = Math.max(1, Math.ceil(wordCount / 200));
    return `${minutes} min read`;
  };

  const readTime = calculateReadTime(article.content);

  return (
    <div className="min-h-screen bg-[var(--td-bg-soft)] text-[var(--td-text)] py-10 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        {/* Navigation & Actions Header */}
        <div className="flex items-center justify-between mb-6">
          <Link
            href="/news"
            className="inline-flex items-center gap-1.5 text-xs font-semibold text-[var(--td-text-muted)] hover:text-[var(--td-color-primary)] transition-colors bg-[var(--td-bg-surface-elevated)] px-3.5 py-2 rounded-xl border border-[var(--td-border-subtle)] shadow-sm"
          >
            <ArrowLeft className="w-3.5 h-3.5" /> Back to News
          </Link>

          <button
            onClick={handleShare}
            className="inline-flex items-center gap-1.5 text-xs font-semibold text-[var(--td-text-muted)] hover:text-[var(--td-color-primary)] transition-colors bg-[var(--td-bg-surface-elevated)] px-3.5 py-2 rounded-xl border border-[var(--td-border-subtle)] shadow-sm cursor-pointer"
          >
            {copied ? (
              <>
                <Check className="w-3.5 h-3.5 text-emerald-600" /> Link Copied
              </>
            ) : (
              <>
                <Share2 className="w-3.5 h-3.5" /> Share Article
              </>
            )}
          </button>
        </div>

        {/* Main Article Card */}
        <article className="bg-[var(--td-bg-surface-elevated)] rounded-2xl border border-[var(--td-border-subtle)] p-6 sm:p-10 shadow-sm space-y-6">
          <div className="flex flex-wrap items-center gap-3 text-xs text-[var(--td-text-muted)]">
            <span className="flex items-center gap-1 font-medium text-[var(--td-color-primary)] bg-[var(--td-color-primary)]/10 px-3 py-1 rounded-md border border-[var(--td-color-primary)]/20">
              <Calendar className="w-3.5 h-3.5" /> {formattedDate}
            </span>
            <span className="flex items-center gap-1 font-medium text-[var(--td-text-muted)] bg-[var(--td-bg)] px-3 py-1 rounded-md border border-[var(--td-border-subtle)]">
              <Clock className="w-3.5 h-3.5 text-[var(--td-text-muted)]" />{" "}
              {readTime}
            </span>
            {article.category && (
              <span className="flex items-center gap-1 font-medium text-[var(--td-text)] bg-[var(--td-bg)] px-3 py-1 rounded-md border border-[var(--td-border-subtle)]">
                {article.category}
              </span>
            )}
            {article.author?.name && (
              <span className="flex items-center gap-1 font-medium text-[var(--td-text)] bg-[var(--td-bg)] px-3 py-1 rounded-md border border-[var(--td-border-subtle)]">
                <User className="w-3.5 h-3.5 text-[var(--td-text-muted)]" />{" "}
                {article.author.name}
              </span>
            )}
          </div>

          <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
            {article.title}
          </h1>

          {article.coverImage && (
            <div className="w-full h-64 sm:h-80 rounded-xl overflow-hidden border border-[var(--td-border-subtle)]">
              <img
                src={article.coverImage}
                alt=""
                className="w-full h-full object-cover"
              />
            </div>
          )}

          {article.summary && (
            <p className="text-xs sm:text-sm font-medium text-[var(--td-text-muted)] leading-relaxed bg-[var(--td-bg)] p-4 rounded-xl border border-[var(--td-border-subtle)]">
              {article.summary}
            </p>
          )}

          {article.tags && article.tags.length > 0 && (
            <div className="flex flex-wrap gap-2 pb-2 border-b border-[var(--td-border-subtle)]">
              {article.tags.map((tag, idx) => (
                <span
                  key={idx}
                  className="text-xs font-medium bg-[var(--td-bg)] border border-[var(--td-border-subtle)] text-[var(--td-text-muted)] px-2.5 py-1 rounded-md flex items-center gap-1"
                >
                  <Tag className="w-3.5 h-3.5 text-[var(--td-text-muted)]" />{" "}
                  {tag.name}
                </span>
              ))}
            </div>
          )}

          <div className="prose dark:prose-invert max-w-none text-xs sm:text-sm leading-relaxed space-y-4">
            {article.content ? (
              <div dangerouslySetInnerHTML={{ __html: article.content }} />
            ) : (
              <p className="text-[var(--td-text-muted)] italic">
                No additional body content provided for this dispatch.
              </p>
            )}
          </div>

          {article.externalLink && (
            <div className="pt-4 border-t border-[var(--td-border-subtle)]">
              <a
                href={article.externalLink}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center justify-center gap-2 w-full py-3 rounded-xl bg-[var(--td-color-primary)] hover:bg-[var(--td-color-primary-hover)] text-white font-bold text-xs transition-colors shadow-sm"
              >
                {article.linkText || "Visit External Reference"}{" "}
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            </div>
          )}
        </article>
      </div>
    </div>
  );
}
