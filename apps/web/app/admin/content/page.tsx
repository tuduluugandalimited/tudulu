// app/admin/content/page.tsx
"tsx";
"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function AdminContentDashboard() {
  const [stats, setStats] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem("accessToken");
    if (!token) {
      router.push("/auth/login");
      return;
    }

    fetch("http://localhost:3000/admin/dashboard-stats", {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((res) => {
        if (!res.ok) throw new Error("Unauthorized");
        return res.json();
      })
      .then((data) => {
        setStats(data);
        setLoading(false);
      })
      .catch(() => {
        router.push("/auth/login");
      });
  }, [router]);

  if (loading)
    return <div className="p-8 text-center">Loading Admin CMS...</div>;

  const sections = [
    "News & Articles",
    "Organizations",
    "Grants & Funding",
    "Jobs & Tenders",
    "Tags & Taxonomies",
    "Users & Roles",
    "Analytics",
  ];

  return (
    <div className="flex min-h-screen bg-gray-100">
      {/* Sidebar */}
      <aside className="w-64 bg-slate-900 text-white p-6 space-y-6">
        <h1 className="text-xl font-bold text-blue-400">Tudulu Admin CMS</h1>
        <nav className="space-y-2">
          {sections.map((section, idx) => (
            <button
              key={idx}
              className="w-full text-left px-3 py-2 rounded hover:bg-slate-800 transition text-sm font-medium"
            >
              {section}
            </button>
          ))}
        </nav>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 p-8">
        <header className="flex justify-between items-center pb-6 border-b">
          <h2 className="text-2xl font-bold text-gray-800">
            Content Management Overview
          </h2>
          <button
            onClick={() => {
              localStorage.removeItem("accessToken");
              router.push("/auth/login");
            }}
            className="px-4 py-2 bg-red-500 text-white rounded-lg text-sm hover:bg-red-600 transition"
          >
            Sign Out
          </button>
        </header>

        <section className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="p-6 bg-white rounded-xl shadow-sm border">
            <p className="text-sm text-gray-500">System Status</p>
            <p className="text-lg font-semibold text-green-600">
              Active & Connected
            </p>
          </div>
          <div className="p-6 bg-white rounded-xl shadow-sm border">
            <p className="text-sm text-gray-500">Backend Message</p>
            <p className="text-sm font-medium text-gray-800">
              {stats?.message}
            </p>
          </div>
        </section>
      </main>
    </div>
  );
}
