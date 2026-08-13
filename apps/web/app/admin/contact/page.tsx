"use client";

import { useState, useEffect } from "react";
import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import {
  MapPin,
  Mail,
  Phone,
  Save,
  Loader2,
  CheckCircle2,
  AlertCircle,
} from "lucide-react";

interface ContactFormState {
  headquarters: string;
  email: string;
  phone: string;
}

export default function AdminContactPage() {
  const [form, setForm] = useState<ContactFormState>({
    headquarters: "",
    email: "",
    phone: "",
  });
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [status, setStatus] = useState<{
    type: "success" | "error";
    text: string;
  } | null>(null);

  useEffect(() => {
    const token = localStorage.getItem("accessToken");

    fetch("/api/v1/contact-info", {
      headers: {
        ...(token && { Authorization: `Bearer ${token}` }),
      },
    })
      .then((res) => {
        if (!res.ok) throw new Error("Failed to fetch contact details");
        return res.json();
      })
      .then((data) => {
        if (data) setForm(data);
        setLoading(false);
      })
      .catch(() => {
        setLoading(false);
      });
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setStatus(null);

    const token = localStorage.getItem("accessToken");

    try {
      const res = await fetch("/api/v1/contact-info", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          ...(token && { Authorization: `Bearer ${token}` }),
        },
        body: JSON.stringify(form),
      });

      if (res.ok) {
        setStatus({
          type: "success",
          text: "Contact details updated successfully!",
        });
      } else {
        setStatus({
          type: "error",
          text: "Failed to update contact info. Please try again.",
        });
      }
    } catch {
      setStatus({ type: "error", text: "An error occurred while saving." });
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-[400px] flex flex-col items-center justify-center gap-3 text-xs text-[var(--td-text-muted)] font-medium">
        <Loader2 className="w-6 h-6 animate-spin text-[var(--td-color-primary)]" />
        Loading contact settings...
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto space-y-6 py-8 px-4">
      <div>
        <h1 className="text-2xl font-extrabold text-[var(--td-text)]">
          Manage Contact Details
        </h1>
        <p className="text-xs text-[var(--td-text-muted)] mt-1">
          Update the global contact information displayed across the platform.
        </p>
      </div>

      <Card className="p-6 bg-[var(--td-bg-surface-elevated)] border border-[var(--td-border-subtle)] rounded-2xl shadow-sm">
        <form onSubmit={handleSubmit} className="space-y-5">
          {status && (
            <div
              className={`p-4 rounded-xl flex items-center gap-3 text-xs font-semibold ${
                status.type === "success"
                  ? "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20"
                  : "bg-rose-500/10 text-rose-600 dark:text-rose-400 border border-rose-500/20"
              }`}
            >
              {status.type === "success" ? (
                <CheckCircle2 className="w-4 h-4 shrink-0" />
              ) : (
                <AlertCircle className="w-4 h-4 shrink-0" />
              )}
              {status.text}
            </div>
          )}

          <div className="space-y-1.5">
            <label className="flex items-center gap-2 text-xs font-semibold text-[var(--td-text)]">
              <MapPin className="w-3.5 h-3.5 text-[var(--td-text-muted)]" />
              Headquarters Location
            </label>
            <input
              type="text"
              value={form.headquarters}
              onChange={(e) =>
                setForm({ ...form, headquarters: e.target.value })
              }
              placeholder="e.g. 123 Innovation Way, Nairobi, Kenya"
              className="w-full px-3.5 py-2.5 rounded-xl bg-[var(--td-bg-soft)] border border-[var(--td-border-subtle)] text-[var(--td-text)] placeholder-[var(--td-text-muted)] text-xs focus:outline-none focus:ring-2 focus:ring-[var(--td-color-primary)] transition"
            />
          </div>

          <div className="space-y-1.5">
            <label className="flex items-center gap-2 text-xs font-semibold text-[var(--td-text)]">
              <Mail className="w-3.5 h-3.5 text-[var(--td-text-muted)]" />
              Email Address
            </label>
            <input
              type="email"
              value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
              placeholder="e.g. contact@tudulu.org"
              className="w-full px-3.5 py-2.5 rounded-xl bg-[var(--td-bg-soft)] border border-[var(--td-border-subtle)] text-[var(--td-text)] placeholder-[var(--td-text-muted)] text-xs focus:outline-none focus:ring-2 focus:ring-[var(--td-color-primary)] transition"
            />
          </div>

          <div className="space-y-1.5">
            <label className="flex items-center gap-2 text-xs font-semibold text-[var(--td-text)]">
              <Phone className="w-3.5 h-3.5 text-[var(--td-text-muted)]" />
              Phone / WhatsApp
            </label>
            <input
              type="text"
              value={form.phone}
              onChange={(e) => setForm({ ...form, phone: e.target.value })}
              placeholder="e.g. +254 700 000 000"
              className="w-full px-3.5 py-2.5 rounded-xl bg-[var(--td-bg-soft)] border border-[var(--td-border-subtle)] text-[var(--td-text)] placeholder-[var(--td-text-muted)] text-xs focus:outline-none focus:ring-2 focus:ring-[var(--td-color-primary)] transition"
            />
          </div>

          <div className="pt-2">
            <Button
              type="submit"
              disabled={saving}
              className="inline-flex items-center gap-2 px-5 py-2.5 bg-[var(--td-color-primary)] text-white hover:opacity-90 rounded-xl text-xs font-bold transition cursor-pointer disabled:opacity-50"
            >
              {saving ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  Saving...
                </>
              ) : (
                <>
                  <Save className="w-4 h-4" />
                  Save Changes
                </>
              )}
            </Button>
          </div>
        </form>
      </Card>
    </div>
  );
}
