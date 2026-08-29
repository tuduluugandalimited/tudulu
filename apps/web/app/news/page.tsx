"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Newspaper, Calendar, ArrowRight, Search, Tag } from "lucide-react";

interface NewsArticle {
  id: string;
  slug: string;
  title: string;
  summary?: string;
  content?: string;
  category?: string | { id?: string; name: string };
  coverImage?: string;
  externalLink?: string;
  linkText?: string;
  isPinned?: boolean;
  isPublished?: boolean;
  publishedAt?: string;
  createdAt?: string;
  author?:
    | {
        id: string;
        name: string;
      }
    | string;
  tags?: Array<{ id?: string; name: string } | string>;
}

export default function NewsPage() {
  const [articles, setArticles] = useState<NewsArticle[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");

  useEffect(() => {
    fetch("/api/v1/news", {
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
              `Unable to retrieve news articles (Status ${res.status}).`,
          );
        }

        if (!isJson) {
          throw new Error(
            "Received an invalid response format from the server.",
          );
        }

        return res.json();
      })
      .then((data) => {
        let list: NewsArticle[] = [];

        if (Array.isArray(data)) {
          list = data;
        } else if (data && typeof data === "object") {
          list = data.news || data.data || data.items || data.results || [];
        }

        const publishedOnly = list.filter(
          (item) => item.isPinned || item.isPublished !== false,
        );
        setArticles(publishedOnly);
        setLoading(false);
      })
      .catch((err) => {
        setError(
          err.message || "An unexpected error occurred while fetching news.",
        );
        setLoading(false);
      });
  }, []);

  // Helper to safely extract string category
  const getCategoryName = (cat?: string | { id?: string; name: string }) => {
    if (!cat) return "";
    if (typeof cat === "object" && cat !== null) return cat.name || "";
    return String(cat);
  };

  const categories = [
    "All",
    ...Array.from(
      new Set(articles.map((a) => getCategoryName(a.category)).filter(Boolean)),
    ),
  ];

  const filteredArticles = articles.filter((article) => {
    const query = searchQuery.toLowerCase();
    const titleMatch = (article.title?.toLowerCase() || "").includes(query);
    const summaryMatch = (article.summary?.toLowerCase() || "").includes(query);
    const catName = getCategoryName(article.category);
    const categoryMatch =
      selectedCategory === "All" || catName === selectedCategory;
    return (titleMatch || summaryMatch) && categoryMatch;
  });

  return (
    <div className="min-h-screen bg-[var(--td-bg-soft)] text-[var(--td-text)] py-10 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto space-y-8">
        {/* Header Hero */}
        <div className="bg-[var(--td-bg-surface-elevated)] rounded-2xl border border-[var(--td-border-subtle)] p-6 sm:p-8 shadow-sm">
          <div className="max-w-2xl">
            <span className="text-xs font-semibold text-[var(--td-color-primary)] bg-[var(--td-color-primary)]/10 px-3 py-1 rounded-md mb-3 inline-block border border-[var(--td-color-primary)]/20">
              News & Intelligence
            </span>
            <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight mb-2">
              Development Intelligence & Dispatches
            </h1>
            <p className="text-[var(--td-text-muted)] text-sm leading-relaxed">
              Actionable insights, policy breakdowns, and technical perspectives
              connecting organizations to global opportunities.
            </p>
          </div>

          <div className="mt-6 flex flex-col sm:flex-row items-stretch sm:items-center gap-4">
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3.5 top-3.5 w-4 h-4 text-[var(--td-text-muted)]" />
              <input
                type="text"
                placeholder="Search articles and insights..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 bg-[var(--td-bg)] border border-[var(--td-border)] rounded-xl text-xs font-medium text-[var(--td-text)] focus:outline-none focus:border-[var(--td-color-primary)] transition-all"
              />
            </div>

            {/* Category Filter Pills */}
            <div className="flex flex-wrap items-center gap-1.5">
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors cursor-pointer ${
                    selectedCategory === cat
                      ? "bg-[var(--td-color-primary)] text-white shadow-sm"
                      : "bg-[var(--td-bg)] text-[var(--td-text-muted)] hover:bg-[var(--td-border-subtle)] border border-[var(--td-border)]"
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>
        </div>

        <div className="flex items-center justify-between px-2">
          <p className="text-xs font-semibold text-[var(--td-text-muted)]">
            Showing{" "}
            <span className="text-[var(--td-text)]">
              {filteredArticles.length}
            </span>{" "}
            dispatches
          </p>
        </div>

        {loading ? (
          <div className="bg-[var(--td-bg-surface-elevated)] rounded-2xl border border-[var(--td-border-subtle)] p-12 text-center text-[var(--td-text-muted)] text-sm font-medium shadow-sm">
            Fetching latest intelligence reports...
          </div>
        ) : error ? (
          <div className="bg-red-500/10 rounded-2xl border border-red-500/20 p-8 text-center text-red-600 dark:text-red-400 text-xs shadow-sm">
            <p className="font-bold text-sm mb-1">Failed to Load News</p>
            <p className="mt-2">{error}</p>
          </div>
        ) : filteredArticles.length === 0 ? (
          <div className="bg-[var(--td-bg-surface-elevated)] rounded-2xl border border-[var(--td-border-subtle)] p-12 text-center shadow-sm">
            <Newspaper className="w-10 h-10 text-[var(--td-text-muted)] mx-auto mb-3 opacity-50" />
            <h3 className="text-base font-bold text-[var(--td-text)] mb-1">
              No news articles found
            </h3>
            <p className="text-xs text-[var(--td-text-muted)]">
              Check back soon for system updates, grant insights, and field
              dispatches.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {filteredArticles.map((article) => {
              const rawDate = article.publishedAt || article.createdAt;
              const dateStr = rawDate
                ? new Date(rawDate).toLocaleDateString()
                : "Recent";
              const targetRoute = `/news/${article.slug || article.id}`;
              const catName = getCategoryName(article.category);

              return (
                <Link
                  key={article.id || article.slug}
                  href={targetRoute}
                  className="bg-[var(--td-bg-surface-elevated)] rounded-2xl border border-[var(--td-border-subtle)] p-6 shadow-sm hover:border-[var(--td-color-primary)] hover:shadow-md transition-all flex flex-col justify-between group"
                >
                  <div>
                    {article.coverImage && (
                      <div className="mb-4 w-full h-40 rounded-xl overflow-hidden border border-[var(--td-border-subtle)]">
                        <img
                          src={article.coverImage}
                          alt=""
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                        />
                      </div>
                    )}

                    <div className="flex items-center justify-between text-xs text-[var(--td-text-muted)] mb-3">
                      <span className="flex items-center gap-1.5 font-medium text-[var(--td-color-primary)] bg-[var(--td-color-primary)]/10 px-2.5 py-0.5 rounded border border-[var(--td-color-primary)]/20">
                        <Calendar className="w-3.5 h-3.5" /> {dateStr}
                      </span>
                      {catName && (
                        <span className="text-[10px] font-semibold px-2 py-0.5 rounded bg-[var(--td-bg)] border border-[var(--td-border-subtle)]">
                          {catName}
                        </span>
                      )}
                    </div>

                    <h2 className="text-lg font-bold text-[var(--td-text)] group-hover:text-[var(--td-color-primary)] transition-colors mb-2">
                      {article.title}
                    </h2>

                    {article.summary && (
                      <p className="text-xs text-[var(--td-text-muted)] leading-relaxed line-clamp-3 mb-4">
                        {article.summary}
                      </p>
                    )}
                  </div>

                  <div className="pt-4 border-t border-[var(--td-border-subtle)] flex items-center justify-between">
                    <div className="flex flex-wrap gap-1">
                      {article.tags?.slice(0, 2).map((tag, idx) => {
                        const tagName =
                          typeof tag === "object" && tag !== null
                            ? tag.name
                            : String(tag);
                        return (
                          <span
                            key={idx}
                            className="text-[10px] font-medium bg-[var(--td-bg)] border border-[var(--td-border-subtle)] text-[var(--td-text-muted)] px-2 py-0.5 rounded flex items-center gap-1"
                          >
                            <Tag className="w-3 h-3 text-[var(--td-text-muted)]" />{" "}
                            {tagName}
                          </span>
                        );
                      })}
                    </div>

                    <span className="text-xs font-semibold text-[var(--td-color-primary)] group-hover:underline flex items-center gap-1">
                      Read Dispatch <ArrowRight className="w-3.5 h-3.5" />
                    </span>
                  </div>
                </Link>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
