"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import {
  Heart,
  Plus,
  Trash2,
  Edit2,
  ArrowLeft,
  Building2,
  MapPin,
  Clock,
  Globe,
  X,
} from "lucide-react";

interface Organization {
  id: string;
  name: string;
}

interface Volunteering {
  id: string;
  title: string;
  slug: string;
  description: string;
  commitment?: string;
  location?: string;
  isRemote: boolean;
  organizationId: string;
  organization?: Organization;
  createdAt: string;
}

export default function AdminVolunteeringPage() {
  const router = useRouter();
  const [items, setItems] = useState<Volunteering[]>([]);
  const [organizations, setOrganizations] = useState<Organization[]>([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingItem, setEditingItem] = useState<Volunteering | null>(null);

  const [formData, setFormData] = useState({
    title: "",
    slug: "",
    description: "",
    commitment: "",
    location: "",
    isRemote: false,
    organizationId: "",
  });

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    const token = localStorage.getItem("accessToken");
    if (!token) {
      router.push("/auth/login");
      return;
    }

    try {
      const [volRes, orgRes] = await Promise.all([
        fetch("/api/v1/volunteering", {
          headers: { Authorization: `Bearer ${token}` },
        }),
        fetch("/api/v1/organizations", {
          headers: { Authorization: `Bearer ${token}` },
        }),
      ]);

      if (volRes.ok) setItems(await volRes.json());
      if (orgRes.ok) setOrganizations(await orgRes.json());
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleTitleChange = (val: string) => {
    setFormData((prev) => ({
      ...prev,
      title: val,
      slug: editingItem
        ? prev.slug
        : val
            .toLowerCase()
            .replace(/[^a-z0-9]+/g, "-")
            .replace(/(^-|-$)+/g, ""),
    }));
  };

  const openCreateModal = () => {
    setEditingItem(null);
    setFormData({
      title: "",
      slug: "",
      description: "",
      commitment: "",
      location: "",
      isRemote: false,
      organizationId: organizations[0]?.id || "",
    });
    setIsModalOpen(true);
  };

  const openEditModal = (item: Volunteering) => {
    setEditingItem(item);
    setFormData({
      title: item.title,
      slug: item.slug,
      description: item.description,
      commitment: item.commitment || "",
      location: item.location || "",
      isRemote: item.isRemote,
      organizationId: item.organizationId,
    });
    setIsModalOpen(true);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const token = localStorage.getItem("accessToken");
    const url = editingItem
      ? `/api/v1/volunteering/${editingItem.id}`
      : "/api/v1/volunteering";
    const method = editingItem ? "PATCH" : "POST";

    const res = await fetch(url, {
      method,
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(formData),
    });

    if (res.ok) {
      setIsModalOpen(false);
      fetchData();
    } else {
      alert("Failed to save volunteering opportunity.");
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this opportunity?")) return;
    const token = localStorage.getItem("accessToken");

    const res = await fetch(`/api/v1/volunteering/${id}`, {
      method: "DELETE",
      headers: { Authorization: `Bearer ${token}` },
    });

    if (res.ok) {
      fetchData();
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-[var(--td-bg-soft)] flex items-center justify-center text-xs text-[var(--td-text-muted)]">
        Loading Volunteering Directory...
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[var(--td-bg-soft)] text-[var(--td-text)] py-10 px-4">
      <div className="max-w-6xl mx-auto space-y-8">
        {/* Header Bar */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 border-b border-[var(--td-border-subtle)] pb-6">
          <div className="space-y-1">
            <Link
              href="/admin"
              className="inline-flex items-center gap-1.5 text-xs font-semibold text-[var(--td-color-primary)] hover:underline mb-2 transition"
            >
              <ArrowLeft className="w-3.5 h-3.5" /> Back to Admin Dashboard
            </Link>
            <h1 className="text-3xl font-extrabold tracking-tight flex items-center gap-3">
              <Heart className="w-8 h-8 text-rose-500" />
              Volunteering Opportunities
            </h1>
            <p className="text-xs text-[var(--td-text-muted)]">
              Manage non-profit initiatives, community service calls, and
              grassroots causes.
            </p>
          </div>
          <button
            onClick={openCreateModal}
            className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-[var(--td-color-primary)] text-white text-xs font-semibold hover:opacity-90 transition shadow-sm cursor-pointer"
          >
            <Plus className="w-4 h-4" /> Add Opportunity
          </button>
        </div>

        {/* Data Table / Cards */}
        {items.length === 0 ? (
          <div className="p-12 text-center bg-[var(--td-bg-surface-elevated)] border border-[var(--td-border-subtle)] rounded-2xl">
            <Heart className="w-10 h-10 text-rose-500/40 mx-auto mb-3" />
            <h3 className="text-lg font-bold">
              No volunteering roles configured
            </h3>
            <p className="text-xs text-[var(--td-text-muted)] mt-1">
              Click &quot;Add Opportunity&quot; to publish a new community role.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {items.map((item) => (
              <div
                key={item.id}
                className="bg-[var(--td-bg-surface-elevated)] border border-[var(--td-border-subtle)] rounded-2xl p-6 flex flex-col justify-between space-y-4 shadow-sm"
              >
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="px-2.5 py-1 text-xs font-semibold rounded-full bg-rose-500/10 text-rose-600 dark:text-rose-400 border border-rose-500/20">
                      {item.commitment || "Flexible"}
                    </span>
                    {item.isRemote && (
                      <span className="text-xs font-medium text-emerald-600 dark:text-emerald-400 flex items-center gap-1">
                        <Globe className="w-3 h-3" /> Remote
                      </span>
                    )}
                  </div>
                  <h3 className="text-lg font-bold">{item.title}</h3>
                  <p className="text-xs text-[var(--td-text-muted)] line-clamp-2">
                    {item.description}
                  </p>
                </div>

                <div className="space-y-2 pt-4 border-t border-[var(--td-border-subtle)] text-xs text-[var(--td-text-muted)]">
                  {item.organization && (
                    <div className="flex items-center gap-2">
                      <Building2 className="w-3.5 h-3.5 text-[var(--td-color-primary)]" />
                      <span>{item.organization.name}</span>
                    </div>
                  )}
                  {item.location && (
                    <div className="flex items-center gap-2">
                      <MapPin className="w-3.5 h-3.5 text-[var(--td-color-primary)]" />
                      <span>{item.location}</span>
                    </div>
                  )}

                  <div className="flex items-center gap-2 pt-2">
                    <button
                      onClick={() => openEditModal(item)}
                      className="flex-1 inline-flex items-center justify-center gap-1.5 px-3 py-1.5 rounded-xl bg-amber-500/10 border border-amber-500/20 text-amber-600 dark:text-amber-400 hover:bg-amber-500/20 text-xs font-medium transition cursor-pointer"
                    >
                      <Edit2 className="w-3 h-3" /> Edit
                    </button>
                    <button
                      onClick={() => handleDelete(item.id)}
                      className="inline-flex items-center justify-center p-2 rounded-xl bg-red-500/10 border border-red-500/20 text-red-600 dark:text-red-400 hover:bg-red-500/20 text-xs transition cursor-pointer"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Modal Form */}
        {isModalOpen && (
          <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
            <div className="bg-[var(--td-bg-surface-elevated)] border border-[var(--td-border-subtle)] w-full max-w-lg rounded-2xl shadow-xl overflow-hidden">
              <div className="flex items-center justify-between p-6 border-b border-[var(--td-border-subtle)]">
                <h2 className="text-lg font-bold">
                  {editingItem
                    ? "Edit Volunteering Opportunity"
                    : "Create Volunteering Opportunity"}
                </h2>
                <button
                  onClick={() => setIsModalOpen(false)}
                  className="p-1 rounded-lg text-[var(--td-text-muted)] hover:text-[var(--td-text)] transition cursor-pointer"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <form onSubmit={handleSubmit} className="p-6 space-y-4 text-xs">
                <div>
                  <label className="block font-semibold mb-1">Title</label>
                  <input
                    type="text"
                    required
                    value={formData.title}
                    onChange={(e) => handleTitleChange(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl bg-[var(--td-bg-soft)] border border-[var(--td-border-subtle)] focus:outline-none focus:border-[var(--td-color-primary)] text-[var(--td-text)]"
                    placeholder="e.g., Community Youth Mentor"
                  />
                </div>

                <div>
                  <label className="block font-semibold mb-1">URL Slug</label>
                  <input
                    type="text"
                    required
                    value={formData.slug}
                    onChange={(e) =>
                      setFormData({ ...formData, slug: e.target.value })
                    }
                    className="w-full px-3 py-2 rounded-xl bg-[var(--td-bg-soft)] border border-[var(--td-border-subtle)] focus:outline-none focus:border-[var(--td-color-primary)] text-[var(--td-text)]"
                    placeholder="community-youth-mentor"
                  />
                </div>

                <div>
                  <label className="block font-semibold mb-1">
                    Host Organization
                  </label>
                  <select
                    required
                    value={formData.organizationId}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        organizationId: e.target.value,
                      })
                    }
                    className="w-full px-3 py-2 rounded-xl bg-[var(--td-bg-soft)] border border-[var(--td-border-subtle)] focus:outline-none focus:border-[var(--td-color-primary)] text-[var(--td-text)] cursor-pointer"
                  >
                    <option value="" disabled>
                      Select Organization
                    </option>
                    {organizations.map((org) => (
                      <option key={org.id} value={org.id}>
                        {org.name}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block font-semibold mb-1">
                      Commitment
                    </label>
                    <input
                      type="text"
                      value={formData.commitment}
                      onChange={(e) =>
                        setFormData({ ...formData, commitment: e.target.value })
                      }
                      className="w-full px-3 py-2 rounded-xl bg-[var(--td-bg-soft)] border border-[var(--td-border-subtle)] focus:outline-none focus:border-[var(--td-color-primary)] text-[var(--td-text)]"
                      placeholder="e.g., 5 hrs / week"
                    />
                  </div>

                  <div>
                    <label className="block font-semibold mb-1">Location</label>
                    <input
                      type="text"
                      value={formData.location}
                      onChange={(e) =>
                        setFormData({ ...formData, location: e.target.value })
                      }
                      className="w-full px-3 py-2 rounded-xl bg-[var(--td-bg-soft)] border border-[var(--td-border-subtle)] focus:outline-none focus:border-[var(--td-color-primary)] text-[var(--td-text)]"
                      placeholder="e.g., Kampala, Uganda"
                    />
                  </div>
                </div>

                <div className="flex items-center gap-2 pt-1">
                  <input
                    type="checkbox"
                    id="isRemote"
                    checked={formData.isRemote}
                    onChange={(e) =>
                      setFormData({ ...formData, isRemote: e.target.checked })
                    }
                    className="rounded border-[var(--td-border-subtle)] text-[var(--td-color-primary)] focus:ring-0 cursor-pointer"
                  />
                  <label
                    htmlFor="isRemote"
                    className="font-semibold cursor-pointer"
                  >
                    Remote Position Allowed
                  </label>
                </div>

                <div>
                  <label className="block font-semibold mb-1">
                    Description
                  </label>
                  <textarea
                    required
                    rows={4}
                    value={formData.description}
                    onChange={(e) =>
                      setFormData({ ...formData, description: e.target.value })
                    }
                    className="w-full px-3 py-2 rounded-xl bg-[var(--td-bg-soft)] border border-[var(--td-border-subtle)] focus:outline-none focus:border-[var(--td-color-primary)] text-[var(--td-text)]"
                    placeholder="Detailed explanation of responsibilities and goals..."
                  />
                </div>

                <div className="flex justify-end gap-3 pt-4 border-t border-[var(--td-border-subtle)]">
                  <button
                    type="button"
                    onClick={() => setIsModalOpen(false)}
                    className="px-4 py-2 rounded-xl border border-[var(--td-border-subtle)] hover:bg-[var(--td-bg-soft)] font-medium transition cursor-pointer"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-4 py-2 rounded-xl bg-[var(--td-color-primary)] text-white font-semibold hover:opacity-90 transition cursor-pointer"
                  >
                    {editingItem ? "Update Role" : "Create Role"}
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
