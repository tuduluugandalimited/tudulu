// D:\tudulu\apps\web\app\news\page.tsx
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
  publishedAt?: string;
  createdAt?: string;
  author?: {
    name: string;
  };
  tags?: Array<{ name: string }>;
}

export default function NewsPage() {
  const [articles, setArticles] = useState<NewsArticle[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    // Relative endpoint uses Next.js API catch-all proxy to target Fly.io safely
    const fetchUrl = "/api/news";

    fetch(fetchUrl, {
      headers: {
        Accept: "application/json",
      },
    })
      .then(async (res) => {
        const contentType = res.headers.get("content-type");
        if (!contentType || !contentType.includes("application/json")) {
          const text = await res.text();
          throw new Error(
            `Received non-JSON response from ${fetchUrl}. Preview: ${text.substring(0, 80)}`,
          );
        }
        if (!res.ok)
          throw new Error("Failed to fetch news articles from backend server.");
        return res.json();
      })
      .then((data) => {
        let list: any[] = [];
        if (Array.isArray(data)) {
          list = data;
        } else if (data && typeof data === "object") {
          list = data.news || data.data || data.items || data.results || [];
        }

        if (!Array.isArray(list)) {
          throw new Error(
            `API returned invalid payload format. Expected an array of articles.`,
          );
        }

        setArticles(list);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  }, []);

  const filteredArticles = articles.filter((article) => {
    const matchesSearch =
      (article.title?.toLowerCase() || "").includes(
        searchQuery.toLowerCase(),
      ) ||
      (article.summary?.toLowerCase() || "").includes(
        searchQuery.toLowerCase(),
      );
    return matchesSearch;
  });

  return (
    <div className="min-h-screen bg-slate-50 py-10 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        {/* Page Header */}
        <div className="bg-white rounded-2xl border border-slate-200 p-6 sm:p-8 shadow-sm mb-8">
          <div className="max-w-2xl">
            <span className="text-xs font-semibold text-emerald-700 bg-emerald-50 px-3 py-1 rounded-md mb-3 inline-block">
              News & Intelligence
            </span>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight mb-2">
              Latest News & Technical Briefs
            </h1>
            <p className="text-slate-600 text-sm leading-relaxed">
              Insights, technical breakdowns, and updates on our field
              engineering, offline medical systems, and edge data architectures.
            </p>
          </div>

          {/* Search Bar */}
          <div className="mt-6 max-w-md relative">
            <Search className="absolute left-3.5 top-3.5 w-4 h-4 text-slate-400" />
            <input
              type="text"
              placeholder="Search articles and insights..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-medium text-slate-800 focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-600 transition-all"
            />
          </div>
        </div>

        {/* Results Info */}
        <div className="flex items-center justify-between mb-4 px-2">
          <p className="text-xs font-semibold text-slate-500">
            Showing{" "}
            <span className="text-slate-800">{filteredArticles.length}</span>{" "}
            articles
          </p>
        </div>

        {/* Listings Grid */}
        {loading ? (
          <div className="bg-white rounded-2xl border border-slate-200 p-12 text-center text-slate-500 text-sm font-medium shadow-sm">
            Fetching latest intelligence reports...
          </div>
        ) : error ? (
          <div className="bg-red-50 rounded-2xl border border-red-200 p-8 text-center text-red-700 text-xs shadow-sm">
            <p className="font-bold text-sm mb-1">Failed to Load News</p>
            <p className="font-mono bg-red-100 p-2 rounded inline-block mt-2">
              {error}
            </p>
          </div>
        ) : filteredArticles.length === 0 ? (
          <div className="bg-white rounded-2xl border border-slate-200 p-12 text-center shadow-sm">
            <Newspaper className="w-10 h-10 text-slate-300 mx-auto mb-3" />
            <h3 className="text-base font-bold text-slate-800 mb-1">
              No news articles found
            </h3>
            <p className="text-xs text-slate-500">
              Check back soon for system updates, architectural publications,
              and field dispatches.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {filteredArticles.map((article) => {
              const dateStr =
                article.publishedAt || article.createdAt
                  ? new Date(
                      article.publishedAt || article.createdAt!,
                    ).toLocaleDateString()
                  : "Recent";

              const targetRoute = `/news/${article.slug || article.id}`;

              return (
                <Link
                  key={article.id || article.slug}
                  href={targetRoute}
                  className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm hover:border-emerald-500/50 hover:shadow-md transition-all flex flex-col justify-between group"
                >
                  <div>
                    <div className="flex items-center justify-between text-xs text-slate-500 mb-3">
                      <span className="flex items-center gap-1.5 font-medium text-emerald-700 bg-emerald-50 px-2.5 py-0.5 rounded">
                        <Calendar className="w-3.5 h-3.5" /> {dateStr}
                      </span>
                      {article.author?.name && (
                        <span className="font-medium text-slate-600">
                          By {article.author.name}
                        </span>
                      )}
                    </div>

                    <h2 className="text-lg font-bold text-slate-900 group-hover:text-emerald-700 transition-colors mb-2">
                      {article.title}
                    </h2>

                    {article.summary && (
                      <p className="text-xs text-slate-600 leading-relaxed line-clamp-3 mb-4">
                        {article.summary}
                      </p>
                    )}
                  </div>

                  <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
                    <div className="flex flex-wrap gap-1">
                      {article.tags?.slice(0, 2).map((tag, idx) => (
                        <span
                          key={idx}
                          className="text-[10px] font-medium bg-slate-100 text-slate-600 px-2 py-0.5 rounded flex items-center gap-1"
                        >
                          <Tag className="w-3 h-3 text-slate-400" /> {tag.name}
                        </span>
                      ))}
                    </div>

                    <span className="text-xs font-semibold text-emerald-700 group-hover:underline flex items-center gap-1">
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
