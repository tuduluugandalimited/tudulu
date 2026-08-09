"use client";

import { useState, useEffect } from "react";
import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";

export default function AdminContactPage() {
  const [form, setForm] = useState({
    headquarters: "",
    email: "",
    phone: "",
  });
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState("");

  useEffect(() => {
    fetch(
      `${process.env.NEXT_PUBLIC_API_URL || "http://localhost:3001"}/contact-info`,
    )
      .then((res) => res.json())
      .then((data) => {
        if (data) setForm(data);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setMessage("");

    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL || "http://localhost:3001"}/contact-info`,
        {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(form),
        },
      );
      if (res.ok) {
        setMessage("Contact details updated successfully!");
      } else {
        setMessage("Failed to update contact info.");
      }
    } catch {
      setMessage("An error occurred.");
    } finally {
      setSaving(false);
    }
  };

  if (loading) return <div className="p-8 text-white">Loading...</div>;

  return (
    <div className="max-w-2xl mx-auto space-y-6 py-8">
      <h1 className="text-2xl font-bold">Manage Contact Details</h1>
      <Card className="p-6">
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-1">
              Headquarters Location
            </label>
            <input
              type="text"
              value={form.headquarters}
              onChange={(e) =>
                setForm({ ...form, headquarters: e.target.value })
              }
              className="w-full p-2 rounded bg-slate-800 border border-slate-700 text-white"
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">
              Email Address
            </label>
            <input
              type="email"
              value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
              className="w-full p-2 rounded bg-slate-800 border border-slate-700 text-white"
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">
              Phone / WhatsApp
            </label>
            <input
              type="text"
              value={form.phone}
              onChange={(e) => setForm({ ...form, phone: e.target.value })}
              className="w-full p-2 rounded bg-slate-800 border border-slate-700 text-white"
            />
          </div>
          <Button type="submit" disabled={saving}>
            {saving ? "Saving..." : "Save Changes"}
          </Button>
          {message && <p className="text-sm mt-2 text-green-400">{message}</p>}
        </form>
      </Card>
    </div>
  );
}
