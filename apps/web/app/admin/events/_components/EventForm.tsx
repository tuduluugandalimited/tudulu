"use client";

import { useState, FormEvent, ChangeEvent } from "react";
import { useRouter } from "next/navigation";

interface EventFormProps {
  initialData?: any;
  isEditing?: boolean;
}

export function EventForm({ initialData, isEditing = false }: EventFormProps) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  // Store uploaded file object and local preview URL
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string>(
    initialData?.imageUrl || "",
  );

  const [form, setForm] = useState({
    title: initialData?.title || "",
    slug: initialData?.slug || "",
    description: initialData?.description || "",
    location: initialData?.location || "",
    isVirtual: initialData?.isVirtual ?? false,
    eventUrl: initialData?.eventUrl || "",
    externalUrl: initialData?.externalUrl || "",
    imageUrl: initialData?.imageUrl || "",
    startDate: initialData?.startDate
      ? new Date(initialData.startDate).toISOString().slice(0, 16)
      : "",
    endDate: initialData?.endDate
      ? new Date(initialData.endDate).toISOString().slice(0, 16)
      : "",
    type: initialData?.type || "CONFERENCE",
  });

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setSelectedFile(file);
      // Generate immediate local preview for uploaded picture
      setPreviewUrl(URL.createObjectURL(file));
    }
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setLoading(true);

    const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3001";
    const endpoint = isEditing
      ? `${API_URL}/v1/events/${initialData.id}`
      : `${API_URL}/v1/events`;
    const method = isEditing ? "PATCH" : "POST";

    try {
      let response;

      // Option A: If a local file from device was picked, submit using FormData (multipart/form-data)
      if (selectedFile) {
        const formData = new FormData();
        formData.append("file", selectedFile);

        // Append all remaining form fields to payload
        Object.entries(form).forEach(([key, value]) => {
          formData.append(key, String(value));
        });

        response = await fetch(endpoint, {
          method,
          body: formData, // Browser sets Content-Type automatically for multipart/form-data
        });
      }
      // Option B: Fallback to JSON payload if relying solely on URL inputs
      else {
        response = await fetch(endpoint, {
          method,
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(form),
        });
      }

      if (response.ok) {
        router.push("/admin/events");
        router.refresh();
      } else {
        const error = await response.json();
        alert(`Error: ${error.message || "Failed to save event"}`);
      }
    } catch (error) {
      console.error(error);
      alert("An unexpected error occurred.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-6 max-w-2xl bg-white p-6 border border-slate-200 rounded-2xl shadow-xs"
    >
      <div>
        <label className="block text-sm font-semibold text-slate-700 mb-1">
          Title
        </label>
        <input
          type="text"
          required
          value={form.title}
          onChange={(e) => setForm({ ...form, title: e.target.value })}
          className="w-full px-4 py-2 border border-slate-200 rounded-xl text-sm focus:ring-2 focus:ring-emerald-800 outline-none"
        />
      </div>

      <div>
        <label className="block text-sm font-semibold text-slate-700 mb-1">
          Slug
        </label>
        <input
          type="text"
          required
          value={form.slug}
          onChange={(e) => setForm({ ...form, slug: e.target.value })}
          className="w-full px-4 py-2 border border-slate-200 rounded-xl text-sm focus:ring-2 focus:ring-emerald-800 outline-none"
          placeholder="e.g. africa-tech-summit-2026"
        />
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-semibold text-slate-700 mb-1">
            Event Type
          </label>
          <select
            value={form.type}
            onChange={(e) => setForm({ ...form, type: e.target.value })}
            className="w-full px-4 py-2 border border-slate-200 rounded-xl text-sm focus:ring-2 focus:ring-emerald-800 outline-none"
          >
            <option value="CONFERENCE">Conference</option>
            <option value="WORKSHOP">Workshop</option>
            <option value="WEBINAR">Webinar</option>
            <option value="NETWORKING">Networking</option>
            <option value="SUMMIT">Summit</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-semibold text-slate-700 mb-1">
            Format
          </label>
          <div className="flex items-center gap-4 pt-2">
            <label className="inline-flex items-center gap-2 text-sm text-slate-600">
              <input
                type="checkbox"
                checked={form.isVirtual}
                onChange={(e) =>
                  setForm({ ...form, isVirtual: e.target.checked })
                }
                className="rounded border-slate-300 text-emerald-800 focus:ring-emerald-800"
              />
              Is Virtual / Online
            </label>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-semibold text-slate-700 mb-1">
            Start Date & Time
          </label>
          <input
            type="datetime-local"
            required
            value={form.startDate}
            onChange={(e) => setForm({ ...form, startDate: e.target.value })}
            className="w-full px-4 py-2 border border-slate-200 rounded-xl text-sm focus:ring-2 focus:ring-emerald-800 outline-none"
          />
        </div>

        <div>
          <label className="block text-sm font-semibold text-slate-700 mb-1">
            End Date & Time
          </label>
          <input
            type="datetime-local"
            value={form.endDate}
            onChange={(e) => setForm({ ...form, endDate: e.target.value })}
            className="w-full px-4 py-2 border border-slate-200 rounded-xl text-sm focus:ring-2 focus:ring-emerald-800 outline-none"
          />
        </div>
      </div>

      {/* Upload Picture section */}
      <div className="space-y-3">
        <label className="block text-sm font-semibold text-slate-700">
          Cover Picture
        </label>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* File input from laptop */}
          <div>
            <label className="block text-xs text-slate-500 mb-1">
              Upload file from device
            </label>
            <input
              type="file"
              accept="image/*"
              onChange={handleFileChange}
              className="w-full text-sm text-slate-500 file:mr-4 file:py-2 file:px-4 file:rounded-xl file:border-0 file:text-sm file:font-semibold file:bg-emerald-50 file:text-emerald-800 hover:file:bg-emerald-100 cursor-pointer"
            />
          </div>

          {/* Or external image URL link */}
          <div>
            <label className="block text-xs text-slate-500 mb-1">
              Or paste image URL
            </label>
            <input
              type="url"
              value={form.imageUrl}
              onChange={(e) => {
                setForm({ ...form, imageUrl: e.target.value });
                if (!selectedFile) setPreviewUrl(e.target.value);
              }}
              className="w-full px-4 py-2 border border-slate-200 rounded-xl text-sm focus:ring-2 focus:ring-emerald-800 outline-none"
              placeholder="https://..."
            />
          </div>
        </div>

        {/* Local Preview display */}
        {previewUrl && (
          <div className="mt-2">
            <p className="text-xs text-slate-500 mb-1">Preview:</p>
            <img
              src={previewUrl}
              alt="Event Cover Preview"
              className="h-32 w-auto object-cover rounded-xl border border-slate-200"
            />
          </div>
        )}
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-semibold text-slate-700 mb-1">
            Location / Venue
          </label>
          <input
            type="text"
            value={form.location}
            onChange={(e) => setForm({ ...form, location: e.target.value })}
            className="w-full px-4 py-2 border border-slate-200 rounded-xl text-sm focus:ring-2 focus:ring-emerald-800 outline-none"
            placeholder="e.g. Kampala, Uganda or Online"
          />
        </div>

        <div>
          <label className="block text-sm font-semibold text-slate-700 mb-1">
            Registration URL
          </label>
          <input
            type="url"
            value={form.eventUrl}
            onChange={(e) => setForm({ ...form, eventUrl: e.target.value })}
            className="w-full px-4 py-2 border border-slate-200 rounded-xl text-sm focus:ring-2 focus:ring-emerald-800 outline-none"
            placeholder="https://..."
          />
        </div>
      </div>

      <div>
        <label className="block text-sm font-semibold text-slate-700 mb-1">
          External / Info Link
        </label>
        <input
          type="url"
          value={form.externalUrl}
          onChange={(e) => setForm({ ...form, externalUrl: e.target.value })}
          className="w-full px-4 py-2 border border-slate-200 rounded-xl text-sm focus:ring-2 focus:ring-emerald-800 outline-none"
          placeholder="https://..."
        />
      </div>

      <div>
        <label className="block text-sm font-semibold text-slate-700 mb-1">
          Description
        </label>
        <textarea
          rows={5}
          required
          value={form.description}
          onChange={(e) => setForm({ ...form, description: e.target.value })}
          className="w-full px-4 py-2 border border-slate-200 rounded-xl text-sm focus:ring-2 focus:ring-emerald-800 outline-none"
        />
      </div>

      <div className="flex items-center justify-end gap-3 pt-4 border-t border-slate-100">
        <button
          type="button"
          onClick={() => router.back()}
          className="px-4 py-2 text-sm text-slate-600 hover:text-slate-900"
        >
          Cancel
        </button>
        <button
          type="submit"
          disabled={loading}
          className="px-6 py-2 bg-emerald-800 text-white rounded-xl text-sm font-medium hover:bg-emerald-900 transition-colors disabled:opacity-50"
        >
          {loading ? "Saving..." : isEditing ? "Update Event" : "Create Event"}
        </button>
      </div>
    </form>
  );
}
