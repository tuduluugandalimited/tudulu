"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

interface Category {
  id: string;
  name: string;
  slug: string;
  isActive: boolean;
  _count?: {
    articles: number;
    opportunities: number;
  };
}

export default function CategoryManagementPage() {
  const [categories, setCategories] = useState<Category[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [name, setName] = useState("");
  const [slug, setSlug] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const API_URL =
    // process.env.NEXT_PUBLIC_API_URL || "http://localhost:3000/api";
    process.env.NEXT_PUBLIC_API_URL || "http://localhost:3001/api/v1";

  // Fetch categories from NestJS API
  const fetchCategories = async () => {
    try {
      const res = await fetch(`${API_URL}/categories`);
      if (res.ok) {
        const data = await res.json();
        setCategories(data);
      }
    } catch (err) {
      console.error("Failed to fetch categories:", err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  // Auto-generate slug from Category name
  const handleNameChange = (val: string) => {
    setName(val);
    setSlug(
      val
        .toLowerCase()
        .trim()
        .replace(/[^a-z0-9 -]/g, "")
        .replace(/\s+/g, "-"),
    );
  };

  // Submit new Category
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !slug) return;

    setIsSubmitting(true);
    try {
      const res = await fetch(`${API_URL}/categories`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, slug, isActive: true }),
      });

      if (res.ok) {
        setName("");
        setSlug("");
        fetchCategories(); // Reload category list
      } else {
        alert("Failed to create category. Ensure slug is unique.");
      }
    } catch (err) {
      console.error("Error creating category:", err);
    } finally {
      setIsSubmitting(false);
    }
  };

  // Toggle Category Active status
  const toggleStatus = async (id: string, currentStatus: boolean) => {
    await fetch(`${API_URL}/categories/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ isActive: !currentStatus }),
    });
    fetchCategories();
  };

  return (
    <div className="max-w-6xl mx-auto p-6 space-y-8">
      {/* Top Header & Back Navigation */}
      <div className="space-y-4">
        <Link
          href="/admin"
          className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg bg-gray-100 hover:bg-gray-200 border border-gray-200 text-xs font-semibold text-gray-700 transition w-fit"
        >
          <ArrowLeft className="w-3.5 h-3.5" /> Back to Admin Dashboard
        </Link>

        <div>
          <h1 className="text-2xl font-bold text-gray-900">
            Manage Categories & Sectors
          </h1>
          <p className="text-gray-500 text-sm">
            Configure classifications and structural tags for articles and
            opportunities across Tudulu.
          </p>
        </div>
      </div>

      {/* Form: Add Category */}
      <form
        onSubmit={handleSubmit}
        className="bg-white p-6 rounded-lg shadow border space-y-4"
      >
        <h2 className="text-lg font-semibold text-gray-800">
          Add New Category
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Category Name
            </label>
            <input
              type="text"
              value={name}
              onChange={(e) => handleNameChange(e.target.value)}
              placeholder="e.g. Agriculture & Food Security"
              className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">
              URL Slug
            </label>
            <input
              type="text"
              value={slug}
              onChange={(e) => setSlug(e.target.value)}
              placeholder="agriculture-food-security"
              className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>
        </div>
        <button
          type="submit"
          disabled={isSubmitting}
          className="bg-blue-600 hover:bg-blue-700 text-white font-medium text-sm px-4 py-2 rounded-md disabled:opacity-50 cursor-pointer"
        >
          {isSubmitting ? "Saving..." : "Create Category"}
        </button>
      </form>

      {/* Category List */}
      <div className="bg-white rounded-lg shadow border overflow-hidden">
        <div className="p-4 border-b">
          <h2 className="text-lg font-semibold text-gray-800">
            Existing Categories
          </h2>
        </div>
        {isLoading ? (
          <div className="p-6 text-center text-gray-500">
            Loading categories...
          </div>
        ) : (
          <table className="w-full text-left text-sm text-gray-600">
            <thead className="bg-gray-50 text-gray-700 font-medium">
              <tr>
                <th className="p-3">Name</th>
                <th className="p-3">Slug</th>
                <th className="p-3">Linked Items</th>
                <th className="p-3">Status</th>
                <th className="p-3 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {categories.map((cat) => (
                <tr key={cat.id}>
                  <td className="p-3 font-medium text-gray-900">{cat.name}</td>
                  <td className="p-3 text-gray-500">{cat.slug}</td>
                  <td className="p-3 text-gray-500">
                    {cat._count?.articles ?? 0} Articles,{" "}
                    {cat._count?.opportunities ?? 0} Grants
                  </td>
                  <td className="p-3">
                    <span
                      className={`inline-block px-2 py-1 text-xs font-semibold rounded-full ${
                        cat.isActive
                          ? "bg-green-100 text-green-800"
                          : "bg-gray-100 text-gray-800"
                      }`}
                    >
                      {cat.isActive ? "Active" : "Inactive"}
                    </span>
                  </td>
                  <td className="p-3 text-right space-x-2">
                    <button
                      onClick={() => toggleStatus(cat.id, cat.isActive)}
                      className="text-xs text-blue-600 hover:underline cursor-pointer"
                    >
                      {cat.isActive ? "Deactivate" : "Activate"}
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}
