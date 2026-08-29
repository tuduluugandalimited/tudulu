"use client";

import { useState, useEffect, FormEvent } from "react";
import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import {
  Mail,
  Trash2,
  UserPlus,
  Send,
  Loader2,
  CheckCircle2,
  AlertCircle,
  Users,
  ArrowLeft,
} from "lucide-react";

interface Subscriber {
  id: string;
  email: string;
  isActive: boolean;
  createdAt: string;
}

export default function AdminNewsletterPage() {
  const [subscribers, setSubscribers] = useState<Subscriber[]>([]);
  const [loading, setLoading] = useState(true);
  const [newEmail, setNewEmail] = useState("");
  const [addingEmail, setAddingEmail] = useState(false);

  // Broadcast Form State
  const [subject, setSubject] = useState("");
  const [content, setContent] = useState("");
  const [sendingBroadcast, setSendingBroadcast] = useState(false);
  const [statusMessage, setStatusMessage] = useState<{
    text: string;
    type: "success" | "error";
  } | null>(null);

  const fetchSubscribers = async () => {
    try {
      const token = localStorage.getItem("accessToken");
      const res = await fetch("/api/v1/newsletter/subscribers", {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (res.ok) {
        const data = await res.json();
        setSubscribers(Array.isArray(data) ? data : []);
      }
    } catch (err) {
      console.error("Failed to fetch subscribers", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSubscribers();
  }, []);

  const handleAddSubscriber = async (e: FormEvent) => {
    e.preventDefault();
    if (!newEmail) return;

    setAddingEmail(true);
    try {
      const token = localStorage.getItem("accessToken");
      const res = await fetch("/api/v1/newsletter/subscribers", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ email: newEmail }),
      });

      if (res.ok) {
        const createdSub = await res.json();
        if (createdSub?.id) {
          setSubscribers((prev) => [createdSub, ...prev]);
        } else {
          fetchSubscribers();
        }
        setNewEmail("");
      }
    } catch (err) {
      console.error("Failed to add subscriber", err);
    } finally {
      setAddingEmail(false);
    }
  };

  const handleDeleteSubscriber = async (id: string) => {
    try {
      const token = localStorage.getItem("accessToken");
      const res = await fetch(`/api/v1/newsletter/subscribers/${id}`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${token}` },
      });

      if (res.ok) {
        setSubscribers((prev) => prev.filter((sub) => sub.id !== id));
      }
    } catch (err) {
      console.error("Failed to delete subscriber", err);
    }
  };

  const handleSendBroadcast = async (e: FormEvent) => {
    e.preventDefault();
    if (!subject || !content) return;

    setSendingBroadcast(true);
    setStatusMessage(null);

    try {
      const token = localStorage.getItem("accessToken");
      const res = await fetch("/api/v1/newsletter/broadcast", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ subject, content }),
      });

      const data = await res.json();

      if (res.ok) {
        setStatusMessage({
          text: data.message || "Newsletter broadcast successfully dispatched!",
          type: "success",
        });
        setSubject("");
        setContent("");
      } else {
        setStatusMessage({
          text: data.message || "Failed to send broadcast.",
          type: "error",
        });
      }
    } catch {
      setStatusMessage({
        text: "Error connecting to service.",
        type: "error",
      });
    } finally {
      setSendingBroadcast(false);
    }
  };

  return (
    <div className="min-h-screen bg-[var(--td-bg-soft)] text-[var(--td-text)] py-12">
      <Container size="lg" className="space-y-8">
        <div className="space-y-4">
          <Link
            href="/admin"
            className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-xl bg-[var(--td-bg-surface-elevated)] border border-[var(--td-border-subtle)] hover:border-[var(--td-color-primary)] text-xs font-semibold text-[var(--td-text-muted)] hover:text-[var(--td-text)] transition shadow-sm w-fit"
          >
            <ArrowLeft className="w-3.5 h-3.5" /> Back to Admin Dashboard
          </Link>
          <div>
            <h1 className="text-3xl font-extrabold tracking-tight">
              Newsletter Dashboard
            </h1>
            <p className="text-[var(--td-text-muted)] text-sm">
              Manage your subscribers and dispatch email blasts across Africa.
            </p>
          </div>
        </div>

        {/* Section 1: Composer & Quick Subscriber Add */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Main Email Composer */}
          <div className="lg:col-span-8 space-y-6">
            <Card className="td-card p-6 space-y-4">
              <div className="flex items-center gap-2 border-b border-[var(--td-border-subtle)] pb-3">
                <Send className="w-5 h-5 text-[var(--td-color-primary)]" />
                <h2 className="text-lg font-bold">Compose & Send Newsletter</h2>
              </div>

              {statusMessage && (
                <div
                  className={`p-3 rounded-md flex items-center gap-2 text-sm ${
                    statusMessage.type === "success"
                      ? "bg-emerald-500/10 border border-emerald-500/20 text-emerald-600 dark:text-emerald-400"
                      : "bg-red-500/10 border border-red-500/20 text-red-600 dark:text-red-400"
                  }`}
                >
                  {statusMessage.type === "success" ? (
                    <CheckCircle2 className="w-4 h-4 shrink-0" />
                  ) : (
                    <AlertCircle className="w-4 h-4 shrink-0" />
                  )}
                  {statusMessage.text}
                </div>
              )}

              <form onSubmit={handleSendBroadcast} className="space-y-4">
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-[var(--td-text-muted)] mb-1">
                    Subject Line
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="Weekly Opportunity Digest #42"
                    value={subject}
                    onChange={(e) => setSubject(e.target.value)}
                    className="w-full px-4 py-2.5 rounded-[var(--td-radius-md)] bg-[var(--td-bg)] border border-[var(--td-border)] text-sm focus:outline-none focus:border-[var(--td-color-primary)]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-[var(--td-text-muted)] mb-1">
                    Content (Plain text or Basic HTML)
                  </label>
                  <textarea
                    required
                    rows={8}
                    placeholder="Write your update here..."
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                    className="w-full px-4 py-3 rounded-[var(--td-radius-md)] bg-[var(--td-bg)] border border-[var(--td-border)] text-sm focus:outline-none focus:border-[var(--td-color-primary)]"
                  />
                </div>

                <Button
                  type="submit"
                  disabled={sendingBroadcast}
                  className="w-full py-3 bg-[var(--td-color-primary)] hover:bg-[var(--td-color-primary-hover)] text-white font-bold text-sm flex items-center justify-center gap-2 cursor-pointer"
                >
                  {sendingBroadcast ? (
                    <Loader2 className="w-4 h-4 animate-spin" />
                  ) : (
                    <Send className="w-4 h-4" />
                  )}
                  {sendingBroadcast
                    ? "Sending Broadcast..."
                    : "Send Newsletter"}
                </Button>
              </form>
            </Card>
          </div>

          {/* Quick Add Subscriber Card */}
          <div className="lg:col-span-4 space-y-6">
            <Card className="td-card p-6 space-y-4">
              <div className="flex items-center gap-2 border-b border-[var(--td-border-subtle)] pb-3">
                <UserPlus className="w-5 h-5 text-[var(--td-color-primary)]" />
                <h2 className="text-lg font-bold">Add Single Subscriber</h2>
              </div>
              <p className="text-xs text-[var(--td-text-muted)]">
                Manually append an email to your global subscriber list.
              </p>

              <form onSubmit={handleAddSubscriber} className="space-y-3">
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-[var(--td-text-muted)] mb-1">
                    Email Address
                  </label>
                  <input
                    type="email"
                    required
                    placeholder="user@example.com"
                    value={newEmail}
                    onChange={(e) => setNewEmail(e.target.value)}
                    className="w-full px-3 py-2 rounded-[var(--td-radius-md)] bg-[var(--td-bg)] border border-[var(--td-border)] text-xs focus:outline-none focus:border-[var(--td-color-primary)]"
                  />
                </div>
                <Button
                  type="submit"
                  disabled={addingEmail}
                  className="w-full py-2 bg-[var(--td-color-primary)] text-white font-bold text-xs flex items-center justify-center gap-1 shrink-0 cursor-pointer"
                >
                  {addingEmail ? (
                    <Loader2 className="w-3 h-3 animate-spin" />
                  ) : (
                    <UserPlus className="w-3 h-3" />
                  )}
                  {addingEmail ? "Adding..." : "Add Subscriber"}
                </Button>
              </form>
            </Card>
          </div>
        </div>

        {/* Section 2: Subscribed Users Table */}
        <Card className="td-card p-6 space-y-4">
          <div className="flex items-center justify-between border-b border-[var(--td-border-subtle)] pb-4">
            <div className="flex items-center gap-2">
              <Users className="w-5 h-5 text-[var(--td-color-primary)]" />
              <h2 className="text-lg font-bold">
                Subscribed Users ({subscribers.length})
              </h2>
            </div>
            <Button
              onClick={fetchSubscribers}
              variant="outline"
              className="text-xs px-3 py-1.5"
            >
              Refresh List
            </Button>
          </div>

          <div className="overflow-x-auto">
            {loading ? (
              <div className="flex items-center justify-center py-12">
                <Loader2 className="w-6 h-6 animate-spin text-[var(--td-color-primary)]" />
              </div>
            ) : subscribers.length === 0 ? (
              <p className="text-xs text-[var(--td-text-muted)] text-center py-12">
                No active subscribers found in system.
              </p>
            ) : (
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="border-b border-[var(--td-border-subtle)] text-[11px] font-bold uppercase tracking-wider text-[var(--td-text-muted)] bg-[var(--td-bg)]">
                    <th className="py-3 px-4">Email Address</th>
                    <th className="py-3 px-4">Status</th>
                    <th className="py-3 px-4">Date Subscribed</th>
                    <th className="py-3 px-4 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[var(--td-border-subtle)] text-xs">
                  {subscribers.map((sub) => (
                    <tr
                      key={sub.id}
                      className="hover:bg-[var(--td-bg-surface-elevated)] transition-colors"
                    >
                      <td className="py-3.5 px-4 font-medium text-[var(--td-text)]">
                        <div className="flex items-center gap-2">
                          <Mail className="w-3.5 h-3.5 text-[var(--td-text-muted)] shrink-0" />
                          <span className="truncate">{sub.email}</span>
                        </div>
                      </td>
                      <td className="py-3.5 px-4">
                        <span
                          className={`inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-semibold ${
                            sub.isActive !== false
                              ? "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20"
                              : "bg-amber-500/10 text-amber-600 dark:text-amber-400 border border-amber-500/20"
                          }`}
                        >
                          {sub.isActive !== false ? "Active" : "Unsubscribed"}
                        </span>
                      </td>
                      <td className="py-3.5 px-4 text-[var(--td-text-muted)]">
                        {new Date(sub.createdAt).toLocaleDateString(undefined, {
                          year: "numeric",
                          month: "short",
                          day: "numeric",
                        })}
                      </td>
                      <td className="py-3.5 px-4 text-right">
                        <button
                          onClick={() => handleDeleteSubscriber(sub.id)}
                          className="inline-flex items-center gap-1 text-red-500 hover:text-red-700 hover:bg-red-500/10 px-2 py-1 rounded transition-all cursor-pointer font-semibold"
                          title="Remove subscriber"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                          <span>Remove</span>
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>
        </Card>
      </Container>
    </div>
  );
}
