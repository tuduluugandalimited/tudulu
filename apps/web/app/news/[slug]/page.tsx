"use client";

import { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import { Newspaper, Calendar, ArrowLeft, Tag, User } from "lucide-react";

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

export default function NewsDetailPage() {
  const params = useParams();
  const slug = params?.slug as string;

  const [article, setArticle] = useState<NewsArticle | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [formattedDate, setFormattedDate] = useState<string>("");

  useEffect(() => {
    if (!slug) return;

    const apiUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3001";

    fetch(`${apiUrl}/news/${slug}`, {
      headers: {
        Accept: "application/json",
      },
    })
      .then(async (res) => {
        const contentType = res.headers.get("content-type");
        if (!contentType || !contentType.includes("application/json")) {
          const text = await res.text();
          throw new Error(
            `Received HTML/Non-JSON response from ${apiUrl}/news/${slug}. Check backend server on port 3001. Preview: ${text.substring(0, 80)}`,
          );
        }
        if (!res.ok) {
          throw new Error(`Failed to fetch article (Status: ${res.status})`);
        }
        return res.json();
      })
      .then((data) => {
        setArticle(data);
        const rawDate = data?.publishedAt || data?.createdAt;
        if (rawDate) {
          setFormattedDate(new Date(rawDate).toLocaleDateString());
        } else {
          setFormattedDate("Recent Dispatch");
        }
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  }, [slug]);

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-50 py-16 px-4 text-center text-slate-500 text-sm font-medium">
        Loading article dispatch...
      </div>
    );
  }

  if (error || !article) {
    return (
      <div className="min-h-screen bg-slate-50 py-16 px-4">
        <div className="max-w-3xl mx-auto bg-white rounded-2xl border border-slate-200 p-8 text-center shadow-sm">
          <Newspaper className="w-12 h-12 text-slate-300 mx-auto mb-3" />
          <h1 className="text-lg font-bold text-slate-800 mb-2">
            Article Not Found
          </h1>
          <p className="text-xs text-slate-500 mb-6 font-mono">
            {error || "The requested dispatch could not be loaded."}
          </p>
          <Link
            href="/news"
            className="inline-flex items-center gap-2 px-5 py-2.5 bg-slate-900 hover:bg-emerald-700 text-white rounded-xl text-xs font-semibold transition-all"
          >
            <ArrowLeft className="w-3.5 h-3.5" /> Back to News & Intelligence
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 py-10 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        <div className="mb-6">
          <Link
            href="/news"
            className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-600 hover:text-emerald-700 transition-colors bg-white px-3.5 py-2 rounded-xl border border-slate-200 shadow-sm"
          >
            <ArrowLeft className="w-3.5 h-3.5" /> Back to News & Intelligence
          </Link>
        </div>

        <article className="bg-white rounded-2xl border border-slate-200 p-6 sm:p-10 shadow-sm">
          <div className="flex flex-wrap items-center gap-3 text-xs text-slate-500 mb-4">
            <span className="flex items-center gap-1 font-medium text-emerald-700 bg-emerald-50 px-3 py-1 rounded-md">
              <Calendar className="w-3.5 h-3.5" />{" "}
              {formattedDate || "Recent Dispatch"}
            </span>
            {article.author?.name && (
              <span className="flex items-center gap-1 font-medium text-slate-600 bg-slate-100 px-3 py-1 rounded-md">
                <User className="w-3.5 h-3.5 text-slate-400" />{" "}
                {article.author.name}
              </span>
            )}
          </div>

          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight mb-4">
            {article.title}
          </h1>

          {article.summary && (
            <p className="text-sm font-medium text-slate-600 leading-relaxed bg-slate-50 p-4 rounded-xl border border-slate-100 mb-6">
              {article.summary}
            </p>
          )}

          {article.tags && article.tags.length > 0 && (
            <div className="flex flex-wrap gap-2 mb-6 pb-6 border-b border-slate-100">
              {article.tags.map((tag, idx) => (
                <span
                  key={idx}
                  className="text-xs font-medium bg-slate-100 text-slate-600 px-2.5 py-1 rounded-md flex items-center gap-1"
                >
                  <Tag className="w-3.5 h-3.5 text-slate-400" /> {tag.name}
                </span>
              ))}
            </div>
          )}

          <div className="prose prose-slate max-w-none text-xs sm:text-sm text-slate-800 leading-relaxed space-y-4">
            {article.content ? (
              <div dangerouslySetInnerHTML={{ __html: article.content }} />
            ) : (
              <p className="text-slate-500 italic">
                No additional content provided for this dispatch.
              </p>
            )}
          </div>
        </article>
      </div>
    </div>
  );
}
