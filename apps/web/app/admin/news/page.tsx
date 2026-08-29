"use client";

import { useState, useEffect, FormEvent, ChangeEvent, useMemo } from "react";
import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import {
  Newspaper,
  Plus,
  Trash2,
  Edit2,
  Pin,
  ExternalLink,
  Loader2,
  CheckCircle2,
  AlertCircle,
  Image as ImageIcon,
  Tag,
  Eye,
  X,
  Globe,
  FileText,
  Upload,
  ArrowLeft,
  Search,
  Filter,
  RefreshCw,
} from "lucide-react";

interface NewsArticle {
  id: string;
  title: string;
  slug: string;
  content: string;
  summary?: string;
  category: string;
  coverImage?: string;
  externalLink?: string;
  linkText?: string;
  isPinned: boolean;
  isPublished: boolean;
  createdAt: string;
  updatedAt?: string;
}

const CATEGORIES = [
  "Announcement",
  "Press Release",
  "Product Update",
  "Grant Alert",
  "Community Story",
  "Event Highlight",
];

export default function AdminNewsPage() {
  const [newsList, setNewsList] = useState<NewsArticle[]>([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);

  // Filter & Search States
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategoryFilter, setSelectedCategoryFilter] = useState("All");

  // Form State
  const [editingId, setEditingId] = useState<string | null>(null);
  const [title, setTitle] = useState("");
  const [summary, setSummary] = useState("");
  const [content, setContent] = useState("");
  const [category, setCategory] = useState("Announcement");
  const [coverImage, setCoverImage] = useState("");
  const [externalLink, setExternalLink] = useState("");
  const [linkText, setLinkText] = useState("");
  const [isPinned, setIsPinned] = useState(false);
  const [isPublished, setIsPublished] = useState(true);

  // UI States
  const [saving, setSaving] = useState(false);
  const [uploadingImage, setUploadingImage] = useState(false);
  const [previewArticle, setPreviewArticle] = useState<NewsArticle | null>(
    null,
  );
  const [statusMessage, setStatusMessage] = useState<{
    text: string;
    type: "success" | "error";
  } | null>(null);

  const fetchNews = async (isManualRefresh = false) => {
    try {
      if (isManualRefresh) setRefreshing(true);
      const token = localStorage.getItem("accessToken");
      const res = await fetch("/api/v1/news", {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (res.ok) {
        const data = await res.json();
        setNewsList(Array.isArray(data) ? data : []);
      } else {
        throw new Error("Failed to load registry");
      }
    } catch (err) {
      console.error("Failed to fetch news articles", err);
      setStatusMessage({
        text: "Could not retrieve latest news items.",
        type: "error",
      });
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  useEffect(() => {
    fetchNews();
  }, []);

  const resetForm = () => {
    setEditingId(null);
    setTitle("");
    setSummary("");
    setContent("");
    setCategory("Announcement");
    setCoverImage("");
    setExternalLink("");
    setLinkText("");
    setIsPinned(false);
    setIsPublished(true);
  };

  const handleEditClick = (article: NewsArticle) => {
    setEditingId(article.id);
    setTitle(article.title);
    setSummary(article.summary || "");
    setContent(article.content);
    setCategory(article.category || "Announcement");
    setCoverImage(article.coverImage || "");
    setExternalLink(article.externalLink || "");
    setLinkText(article.linkText || "");
    setIsPinned(article.isPinned);
    setIsPublished(article.isPublished);
    setStatusMessage(null);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  // Handle image upload from local machine with optimization guard
  const handleFileUpload = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith("image/")) {
      setStatusMessage({
        text: "Please select a valid image file (PNG, JPG, WEBP).",
        type: "error",
      });
      return;
    }

    if (file.size > 5 * 1024 * 1024) {
      setStatusMessage({
        text: "Image size must be less than 5MB.",
        type: "error",
      });
      return;
    }

    setUploadingImage(true);
    setStatusMessage(null);

    const reader = new FileReader();
    reader.onloadend = () => {
      setCoverImage(reader.result as string);
      setUploadingImage(false);
    };
    reader.onerror = () => {
      setStatusMessage({
        text: "Failed to read local image file.",
        type: "error",
      });
      setUploadingImage(false);
    };
    reader.readAsDataURL(file);
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!title.trim() || !content.trim()) {
      setStatusMessage({
        text: "Title and Main Article Body are required fields.",
        type: "error",
      });
      return;
    }

    setSaving(true);
    setStatusMessage(null);

    const payload = {
      title: title.trim(),
      summary: summary.trim(),
      content: content.trim(),
      category,
      coverImage,
      externalLink: externalLink.trim(),
      linkText: linkText.trim() || (externalLink ? "Learn More" : undefined),
      isPinned,
      isPublished,
    };

    try {
      const token = localStorage.getItem("accessToken");
      const url = editingId ? `/api/v1/news/${editingId}` : "/api/v1/news";
      const method = editingId ? "PATCH" : "POST";

      const res = await fetch(url, {
        method,
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(payload),
      });

      const data = await res.json();

      if (res.ok) {
        setStatusMessage({
          text: editingId
            ? "Article successfully updated!"
            : "Article successfully created and published!",
          type: "success",
        });
        resetForm();
        fetchNews();
      } else {
        setStatusMessage({
          text: data.message || "Failed to save news article.",
          type: "error",
        });
      }
    } catch {
      setStatusMessage({
        text: "Network error connecting to news service.",
        type: "error",
      });
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (
      !confirm("Are you sure you want to permanently delete this news article?")
    )
      return;

    try {
      const token = localStorage.getItem("accessToken");
      const res = await fetch(`/api/v1/news/${id}`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${token}` },
      });

      if (res.ok) {
        setNewsList((prev) => prev.filter((item) => item.id !== id));
        setStatusMessage({
          text: "Article deleted successfully.",
          type: "success",
        });
      } else {
        throw new Error();
      }
    } catch (err) {
      console.error("Failed to delete article", err);
      setStatusMessage({ text: "Failed to delete article.", type: "error" });
    }
  };

  const handleTogglePin = async (article: NewsArticle) => {
    try {
      const token = localStorage.getItem("accessToken");
      const res = await fetch(`/api/v1/news/${article.id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ isPinned: !article.isPinned }),
      });

      if (res.ok) {
        setNewsList((prev) =>
          prev.map((item) =>
            item.id === article.id
              ? { ...item, isPinned: !item.isPinned }
              : item,
          ),
        );
      }
    } catch (err) {
      console.error("Failed to toggle pin state", err);
    }
  };

  // Filtered list based on search and category tabs
  const filteredNewsList = useMemo(() => {
    return newsList.filter((item) => {
      const matchesSearch =
        item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.content.toLowerCase().includes(searchQuery.toLowerCase()) ||
        (item.summary &&
          item.summary.toLowerCase().includes(searchQuery.toLowerCase()));

      const matchesCategory =
        selectedCategoryFilter === "All" ||
        item.category === selectedCategoryFilter;

      return matchesSearch && matchesCategory;
    });
  }, [newsList, searchQuery, selectedCategoryFilter]);

  return (
    <div className="min-h-screen bg-[var(--td-bg-soft)] text-[var(--td-text)] py-12">
      <Container size="lg" className="space-y-8">
        {/* Header Section */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div>
            <div className="mb-2">
              <Link
                href="/admin"
                className="inline-flex items-center gap-1.5 text-xs font-semibold text-[var(--td-text-muted)] hover:text-[var(--td-color-primary)] transition-colors"
              >
                <ArrowLeft className="w-3.5 h-3.5" /> Back to Dashboard
              </Link>
            </div>
            <h1 className="text-3xl font-extrabold tracking-tight flex items-center gap-2">
              <Newspaper className="w-8 h-8 text-[var(--td-color-primary)]" />
              News & Press Center
            </h1>
            <p className="text-[var(--td-text-muted)] text-sm">
              Publish ecosystem announcements, press releases, grant alerts, and
              featured story highlights.
            </p>
          </div>
          {editingId && (
            <Button
              onClick={resetForm}
              variant="outline"
              className="text-xs flex items-center gap-1.5 cursor-pointer"
            >
              <X className="w-3.5 h-3.5" /> Cancel Editing
            </Button>
          )}
        </div>

        {/* Global Status Banner */}
        {statusMessage && (
          <div
            className={`p-4 rounded-xl flex items-center justify-between gap-3 text-sm animate-fadeIn ${
              statusMessage.type === "success"
                ? "bg-emerald-500/10 border border-emerald-500/20 text-emerald-600 dark:text-emerald-400"
                : "bg-red-500/10 border border-red-500/20 text-red-600 dark:text-red-400"
            }`}
          >
            <div className="flex items-center gap-2">
              {statusMessage.type === "success" ? (
                <CheckCircle2 className="w-4 h-4 shrink-0" />
              ) : (
                <AlertCircle className="w-4 h-4 shrink-0" />
              )}
              <span>{statusMessage.text}</span>
            </div>
            <button
              onClick={() => setStatusMessage(null)}
              className="text-xs opacity-70 hover:opacity-100"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        )}

        {/* Section 1: Article Composer & Editor */}
        <Card className="td-card p-6 space-y-6">
          <div className="flex items-center justify-between border-b border-[var(--td-border-subtle)] pb-4">
            <h2 className="text-lg font-bold flex items-center gap-2">
              {editingId ? (
                <Edit2 className="w-5 h-5 text-amber-500" />
              ) : (
                <Plus className="w-5 h-5 text-[var(--td-color-primary)]" />
              )}
              {editingId ? "Edit News Article" : "Compose New Announcement"}
            </h2>
            {editingId && (
              <span className="text-xs font-semibold px-2.5 py-1 rounded-md bg-amber-500/10 text-amber-600 border border-amber-500/20">
                Active Edit Mode
              </span>
            )}
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Title & Category Row */}
            <div className="grid grid-cols-1 md:grid-cols-12 gap-4">
              <div className="md:col-span-8">
                <label className="block text-xs font-bold uppercase tracking-wider text-[var(--td-text-muted)] mb-1">
                  Article Title *
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Tudulu Launches $50,000 African Tech Grant Initiative"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-[var(--td-radius-md)] bg-[var(--td-bg)] border border-[var(--td-border)] text-sm focus:outline-none focus:border-[var(--td-color-primary)] transition-colors"
                />
              </div>

              <div className="md:col-span-4">
                <label className="block text-xs font-bold uppercase tracking-wider text-[var(--td-text-muted)] mb-1 flex items-center gap-1">
                  <Tag className="w-3 h-3" /> Category
                </label>
                <select
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-[var(--td-radius-md)] bg-[var(--td-bg)] border border-[var(--td-border)] text-sm focus:outline-none focus:border-[var(--td-color-primary)] cursor-pointer"
                >
                  {CATEGORIES.map((cat) => (
                    <option key={cat} value={cat}>
                      {cat}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* Summary Excerpt */}
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-[var(--td-text-muted)] mb-1">
                Short Summary (Excerpt for Cards & Feeds)
              </label>
              <input
                type="text"
                placeholder="A brief 1-2 sentence overview shown in featured feeds..."
                value={summary}
                onChange={(e) => setSummary(e.target.value)}
                className="w-full px-4 py-2 rounded-[var(--td-radius-md)] bg-[var(--td-bg)] border border-[var(--td-border)] text-xs focus:outline-none focus:border-[var(--td-color-primary)]"
              />
            </div>

            {/* Rich Content Body */}
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-[var(--td-text-muted)] mb-1 flex items-center gap-1">
                <FileText className="w-3 h-3" /> Main Article Body (Plain text
                or HTML) *
              </label>
              <textarea
                required
                rows={7}
                placeholder="Write the full news story here..."
                value={content}
                onChange={(e) => setContent(e.target.value)}
                className="w-full px-4 py-3 rounded-[var(--td-radius-md)] bg-[var(--td-bg)] border border-[var(--td-border)] text-sm focus:outline-none focus:border-[var(--td-color-primary)] leading-relaxed"
              />
            </div>

            {/* Media & Link Configuration Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 p-4 rounded-xl bg-[var(--td-bg)] border border-[var(--td-border-subtle)]">
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-[var(--td-text-muted)] mb-1 flex items-center gap-1">
                  <ImageIcon className="w-3 h-3" /> Cover Image
                </label>
                <div className="space-y-2">
                  <input
                    type="text"
                    placeholder="Image URL or upload below..."
                    value={coverImage}
                    onChange={(e) => setCoverImage(e.target.value)}
                    className="w-full px-3 py-2 rounded-[var(--td-radius-md)] bg-[var(--td-bg-surface-elevated)] border border-[var(--td-border)] text-xs focus:outline-none focus:border-[var(--td-color-primary)]"
                  />
                  <div className="flex items-center gap-2">
                    <label className="flex items-center gap-1.5 px-3 py-1.5 rounded-[var(--td-radius-md)] bg-[var(--td-bg-surface-elevated)] hover:bg-[var(--td-border-subtle)] border border-[var(--td-border)] text-xs font-medium cursor-pointer text-[var(--td-text)] transition-colors">
                      {uploadingImage ? (
                        <Loader2 className="w-3.5 h-3.5 animate-spin" />
                      ) : (
                        <Upload className="w-3.5 h-3.5" />
                      )}
                      <span>Upload Image</span>
                      <input
                        type="file"
                        accept="image/*"
                        onChange={handleFileUpload}
                        className="hidden"
                      />
                    </label>
                    {coverImage && (
                      <button
                        type="button"
                        onClick={() => setCoverImage("")}
                        className="p-1.5 text-xs text-red-500 hover:bg-red-500/10 rounded transition-colors"
                        title="Clear Image"
                      >
                        <X className="w-3.5 h-3.5" />
                      </button>
                    )}
                  </div>
                  {coverImage && (
                    <div className="mt-2 relative w-full h-20 rounded-md overflow-hidden border border-[var(--td-border-subtle)] bg-black/5">
                      <img
                        src={coverImage}
                        alt="Preview"
                        className="w-full h-full object-cover"
                      />
                    </div>
                  )}
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-[var(--td-text-muted)] mb-1 flex items-center gap-1">
                  <Globe className="w-3 h-3" /> External Link / URL
                </label>
                <input
                  type="url"
                  placeholder="https://external-press.com/article"
                  value={externalLink}
                  onChange={(e) => setExternalLink(e.target.value)}
                  className="w-full px-3 py-2 rounded-[var(--td-radius-md)] bg-[var(--td-bg-surface-elevated)] border border-[var(--td-border)] text-xs focus:outline-none focus:border-[var(--td-color-primary)]"
                />
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-[var(--td-text-muted)] mb-1">
                  Button Label
                </label>
                <input
                  type="text"
                  placeholder="e.g. Read Full Article"
                  value={linkText}
                  onChange={(e) => setLinkText(e.target.value)}
                  className="w-full px-3 py-2 rounded-[var(--td-radius-md)] bg-[var(--td-bg-surface-elevated)] border border-[var(--td-border)] text-xs focus:outline-none focus:border-[var(--td-color-primary)]"
                />
              </div>
            </div>

            {/* Flags & Controls */}
            <div className="flex flex-wrap items-center justify-between gap-4 pt-2">
              <div className="flex items-center gap-6">
                <label className="flex items-center gap-2 text-xs font-semibold cursor-pointer select-none">
                  <input
                    type="checkbox"
                    checked={isPinned}
                    onChange={(e) => setIsPinned(e.target.checked)}
                    className="w-4 h-4 rounded text-[var(--td-color-primary)] focus:ring-0 cursor-pointer"
                  />
                  <Pin className="w-3.5 h-3.5 text-amber-500" /> Pin to
                  Dashboard Banner
                </label>

                <label className="flex items-center gap-2 text-xs font-semibold cursor-pointer select-none">
                  <input
                    type="checkbox"
                    checked={isPublished}
                    onChange={(e) => setIsPublished(e.target.checked)}
                    className="w-4 h-4 rounded text-[var(--td-color-primary)] focus:ring-0 cursor-pointer"
                  />
                  Publish Immediately
                </label>
              </div>

              <div className="flex items-center gap-3 w-full sm:w-auto">
                {editingId && (
                  <Button
                    type="button"
                    onClick={resetForm}
                    variant="outline"
                    className="px-4 py-2 text-xs cursor-pointer"
                  >
                    Cancel
                  </Button>
                )}
                <Button
                  type="submit"
                  disabled={saving || uploadingImage}
                  className="flex-1 sm:flex-initial px-6 py-2.5 bg-[var(--td-color-primary)] hover:bg-[var(--td-color-primary-hover)] text-white font-bold text-xs flex items-center justify-center gap-2 cursor-pointer"
                >
                  {saving ? (
                    <Loader2 className="w-4 h-4 animate-spin" />
                  ) : editingId ? (
                    <CheckCircle2 className="w-4 h-4" />
                  ) : (
                    <Plus className="w-4 h-4" />
                  )}
                  {saving
                    ? "Saving..."
                    : editingId
                      ? "Update News Article"
                      : "Publish News Article"}
                </Button>
              </div>
            </div>
          </form>
        </Card>

        {/* Section 2: News Articles Management Registry */}
        <Card className="td-card p-6 space-y-4">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-[var(--td-border-subtle)] pb-4">
            <div className="flex items-center gap-2">
              <Newspaper className="w-5 h-5 text-[var(--td-color-primary)]" />
              <h2 className="text-lg font-bold">
                Published News Registry ({filteredNewsList.length})
              </h2>
            </div>

            <div className="flex flex-wrap items-center gap-3 w-full sm:w-auto">
              {/* Search filter */}
              <div className="relative flex-1 sm:w-56">
                <Search className="w-3.5 h-3.5 absolute left-3 top-1/2 -translate-y-1/2 text-[var(--td-text-muted)]" />
                <input
                  type="text"
                  placeholder="Search articles..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-8 pr-3 py-1.5 rounded-[var(--td-radius-md)] bg-[var(--td-bg)] border border-[var(--td-border)] text-xs focus:outline-none focus:border-[var(--td-color-primary)]"
                />
              </div>

              {/* Category filter dropdown */}
              <div className="relative flex items-center gap-1.5">
                <Filter className="w-3.5 h-3.5 text-[var(--td-text-muted)]" />
                <select
                  value={selectedCategoryFilter}
                  onChange={(e) => setSelectedCategoryFilter(e.target.value)}
                  className="px-3 py-1.5 rounded-[var(--td-radius-md)] bg-[var(--td-bg)] border border-[var(--td-border)] text-xs focus:outline-none focus:border-[var(--td-color-primary)] cursor-pointer"
                >
                  <option value="All">All Categories</option>
                  {CATEGORIES.map((cat) => (
                    <option key={cat} value={cat}>
                      {cat}
                    </option>
                  ))}
                </select>
              </div>

              <Button
                onClick={() => fetchNews(true)}
                variant="outline"
                className="text-xs px-3 py-1.5 flex items-center gap-1.5 cursor-pointer"
                title="Refresh Registry"
              >
                <RefreshCw
                  className={`w-3.5 h-3.5 ${refreshing ? "animate-spin" : ""}`}
                />
                Refresh
              </Button>
            </div>
          </div>

          <div className="overflow-x-auto">
            {loading ? (
              <div className="flex items-center justify-center py-12">
                <Loader2 className="w-6 h-6 animate-spin text-[var(--td-color-primary)]" />
              </div>
            ) : filteredNewsList.length === 0 ? (
              <div className="text-center py-12 space-y-2">
                <Newspaper className="w-8 h-8 text-[var(--td-text-muted)] mx-auto opacity-50" />
                <p className="text-xs text-[var(--td-text-muted)]">
                  {newsList.length === 0
                    ? "No news articles or announcements published yet."
                    : "No matching articles found for your filter/search criteria."}
                </p>
              </div>
            ) : (
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="border-b border-[var(--td-border-subtle)] text-[11px] font-bold uppercase tracking-wider text-[var(--td-text-muted)] bg-[var(--td-bg)]">
                    <th className="py-3 px-4">Article</th>
                    <th className="py-3 px-4">Category</th>
                    <th className="py-3 px-4">Status</th>
                    <th className="py-3 px-4">Date</th>
                    <th className="py-3 px-4 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[var(--td-border-subtle)] text-xs">
                  {filteredNewsList.map((item) => (
                    <tr
                      key={item.id}
                      className="hover:bg-[var(--td-bg-surface-elevated)] transition-colors"
                    >
                      <td className="py-3.5 px-4 max-w-xs">
                        <div className="flex items-start gap-3">
                          {item.coverImage ? (
                            <img
                              src={item.coverImage}
                              alt=""
                              className="w-10 h-10 rounded object-cover shrink-0 border border-[var(--td-border-subtle)]"
                            />
                          ) : (
                            <div className="w-10 h-10 rounded bg-[var(--td-bg)] border border-[var(--td-border-subtle)] flex items-center justify-center text-[var(--td-text-muted)] shrink-0">
                              <Newspaper className="w-5 h-5" />
                            </div>
                          )}
                          <div className="truncate">
                            <p className="font-bold text-[var(--td-text)] truncate flex items-center gap-1.5">
                              {item.isPinned && (
                                <Pin className="w-3 h-3 text-amber-500 fill-amber-500 shrink-0" />
                              )}
                              {item.title}
                            </p>
                            {item.externalLink && (
                              <a
                                href={item.externalLink}
                                target="_blank"
                                rel="noreferrer"
                                className="inline-flex items-center gap-1 text-[10px] text-[var(--td-color-primary)] hover:underline"
                              >
                                {item.linkText || "External Link"}{" "}
                                <ExternalLink className="w-2.5 h-2.5" />
                              </a>
                            )}
                          </div>
                        </div>
                      </td>

                      <td className="py-3.5 px-4">
                        <span className="inline-flex items-center px-2 py-0.5 rounded text-[10px] font-semibold bg-[var(--td-bg)] border border-[var(--td-border-subtle)]">
                          {item.category || "General"}
                        </span>
                      </td>

                      <td className="py-3.5 px-4">
                        <span
                          className={`inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-semibold ${
                            item.isPublished
                              ? "bg-emerald-500/10 text-emerald-600 border border-emerald-500/20"
                              : "bg-gray-500/10 text-gray-500 border border-gray-500/20"
                          }`}
                        >
                          {item.isPublished ? "Published" : "Draft"}
                        </span>
                      </td>

                      <td className="py-3.5 px-4 text-[var(--td-text-muted)]">
                        {new Date(item.createdAt).toLocaleDateString(
                          undefined,
                          {
                            month: "short",
                            day: "numeric",
                            year: "numeric",
                          },
                        )}
                      </td>

                      <td className="py-3.5 px-4 text-right">
                        <div className="flex items-center justify-end gap-1.5">
                          <button
                            onClick={() => setPreviewArticle(item)}
                            className="p-1.5 rounded hover:bg-[var(--td-bg)] text-[var(--td-text-muted)] hover:text-[var(--td-text)] transition-colors cursor-pointer"
                            title="Preview Article"
                          >
                            <Eye className="w-4 h-4" />
                          </button>

                          <button
                            onClick={() => handleTogglePin(item)}
                            className={`p-1.5 rounded hover:bg-[var(--td-bg)] transition-colors cursor-pointer ${
                              item.isPinned
                                ? "text-amber-500"
                                : "text-[var(--td-text-muted)]"
                            }`}
                            title={
                              item.isPinned ? "Unpin Article" : "Pin Article"
                            }
                          >
                            <Pin className="w-4 h-4" />
                          </button>

                          <button
                            onClick={() => handleEditClick(item)}
                            className="p-1.5 rounded hover:bg-amber-500/10 text-amber-600 transition-colors cursor-pointer"
                            title="Edit Article"
                          >
                            <Edit2 className="w-4 h-4" />
                          </button>

                          <button
                            onClick={() => handleDelete(item.id)}
                            className="p-1.5 rounded hover:bg-red-500/10 text-red-500 transition-colors cursor-pointer"
                            title="Delete Article"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>
        </Card>

        {/* Article Quick Preview Modal */}
        {previewArticle && (
          <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
            <div className="bg-[var(--td-bg-surface-elevated)] border border-[var(--td-border-subtle)] max-w-xl w-full rounded-2xl p-6 space-y-4 shadow-2xl relative max-h-[90vh] overflow-y-auto">
              <button
                onClick={() => setPreviewArticle(null)}
                className="absolute top-4 right-4 text-[var(--td-text-muted)] hover:text-[var(--td-text)] cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="flex items-center gap-2">
                <span className="px-2.5 py-0.5 rounded text-[10px] font-bold bg-[var(--td-color-primary)]/10 text-[var(--td-color-primary)] border border-[var(--td-color-primary)]/20">
                  {previewArticle.category}
                </span>
                {previewArticle.isPinned && (
                  <span className="px-2.5 py-0.5 rounded text-[10px] font-bold bg-amber-500/10 text-amber-600 border border-amber-500/20 flex items-center gap-1">
                    <Pin className="w-3 h-3" /> Pinned
                  </span>
                )}
              </div>

              <h3 className="text-xl font-bold text-[var(--td-text)]">
                {previewArticle.title}
              </h3>

              {previewArticle.coverImage && (
                <img
                  src={previewArticle.coverImage}
                  alt=""
                  className="w-full h-48 rounded-xl object-cover border border-[var(--td-border-subtle)]"
                />
              )}

              {previewArticle.summary && (
                <p className="text-xs font-semibold text-[var(--td-text-muted)] italic">
                  {previewArticle.summary}
                </p>
              )}

              <div className="text-xs text-[var(--td-text)] whitespace-pre-wrap leading-relaxed">
                {previewArticle.content}
              </div>

              {previewArticle.externalLink && (
                <a
                  href={previewArticle.externalLink}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center justify-center gap-2 w-full py-2.5 rounded-xl bg-[var(--td-color-primary)] hover:bg-[var(--td-color-primary-hover)] text-white font-bold text-xs transition-colors"
                >
                  {previewArticle.linkText || "Visit External Link"}{" "}
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
              )}
            </div>
          </div>
        )}
      </Container>
    </div>
  );
}
