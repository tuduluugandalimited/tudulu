"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import {
  ArrowLeft,
  Users,
  Shield,
  Trash2,
  CheckCircle,
  XCircle,
  UserPlus,
  X,
} from "lucide-react";

interface User {
  id: string;
  email: string;
  name?: string;
  fullName?: string;
  role: string;
  isActive?: boolean;
}

export default function AdminUsersPage() {
  const router = useRouter();
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // Modal State for Adding New User
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newEmail, setNewEmail] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [newName, setNewName] = useState("");
  const [submitting, setSubmitting] = useState(false);

  const fetchUsers = async () => {
    const token = localStorage.getItem("accessToken");
    try {
      const res = await fetch("/api/v1/users", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (res.status === 401 || res.status === 403) {
        throw new Error("Unauthorized or forbidden access");
      }
      if (!res.ok) throw new Error("Failed to fetch users registry");
      const data = await res.json();
      setUsers(Array.isArray(data) ? data : data.users || []);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const token = localStorage.getItem("accessToken");
    const userRole = localStorage.getItem("userRole");

    if (!token) {
      router.push("/auth/login");
      return;
    }

    const normalizedRole = (userRole || "").toUpperCase();
    if (
      userRole &&
      normalizedRole !== "ADMIN" &&
      normalizedRole !== "SUPER_ADMIN"
    ) {
      setError("Unauthorized or forbidden access");
      setLoading(false);
      return;
    }

    fetchUsers();
  }, [router]);

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this user?")) return;
    const token = localStorage.getItem("accessToken");
    try {
      const res = await fetch(`/api/v1/users/${id}`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${token}` },
      });
      if (!res.ok) throw new Error("Failed to delete user");
      setUsers(users.filter((u) => u.id !== id));
    } catch (err: any) {
      alert(err.message);
    }
  };

  const handleCreateUser = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    const token = localStorage.getItem("accessToken");

    try {
      const res = await fetch("/api/v1/users", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          email: newEmail,
          password: newPassword,
          name: newName,
        }),
      });

      const data = await res.json();
      if (!res.ok) {
        const errorMsg = Array.isArray(data.message)
          ? data.message.join(", ")
          : data.message || "Failed to create new user";
        throw new Error(errorMsg);
      }

      // Reset modal state and refresh user list
      setIsModalOpen(false);
      setNewEmail("");
      setNewPassword("");
      setNewName("");
      fetchUsers();
    } catch (err: any) {
      alert(err.message);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-[var(--td-bg-soft)] text-[var(--td-text)]">
      <div className="max-w-6xl mx-auto space-y-8 py-10 px-4">
        {/* Header matching Admin Control Center */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 border-b border-[var(--td-border-subtle)] pb-6">
          <div className="space-y-1">
            <Link
              href="/admin"
              className="inline-flex items-center gap-1.5 text-xs font-semibold text-[var(--td-color-primary)] hover:underline mb-2"
            >
              <ArrowLeft className="w-4 h-4" /> Back to Control Center
            </Link>
            <h1 className="text-3xl font-extrabold tracking-tight text-[var(--td-text)]">
              User & Role Management
            </h1>
            <p className="text-[var(--td-text-muted)] text-sm">
              Manage platform users, permissions, and administrative accounts.
            </p>
          </div>
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-2 px-3 py-2 rounded-xl bg-[var(--td-bg-surface-elevated)] border border-[var(--td-border-subtle)] text-xs text-[var(--td-text)] shadow-xs">
              <Users className="w-3.5 h-3.5 text-rose-500" />
              <span>
                Total Registry:{" "}
                <strong className="font-medium">{users.length}</strong>
              </span>
            </div>
            <button
              onClick={() => setIsModalOpen(true)}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-[var(--td-color-primary)] text-[var(--td-text-inverse)] hover:opacity-95 text-xs font-bold transition shadow-sm cursor-pointer"
            >
              <UserPlus className="w-4 h-4" /> Add New User
            </button>
          </div>
        </div>

        {loading ? (
          <div className="min-h-[40vh] flex items-center justify-center text-[var(--td-text-muted)] text-sm font-medium">
            Verifying users registry...
          </div>
        ) : error ? (
          <div className="p-4 rounded-2xl bg-red-500/10 border border-red-500/20 text-red-600 dark:text-red-400 text-sm backdrop-blur-md">
            {error}
          </div>
        ) : (
          <div className="rounded-2xl bg-[var(--td-bg-surface-elevated)] border border-[var(--td-border-subtle)] shadow-xl overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="border-b border-[var(--td-border-subtle)] text-xs font-semibold text-[var(--td-text-muted)] uppercase tracking-wider bg-[var(--td-bg-soft)]">
                    <th className="py-4 px-6">User Account</th>
                    <th className="py-4 px-6">Assigned Role</th>
                    <th className="py-4 px-6">Status</th>
                    <th className="py-4 px-6 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[var(--td-border-subtle)] text-sm text-[var(--td-text)]">
                  {users.map((user) => (
                    <tr
                      key={user.id}
                      className="hover:bg-[var(--td-bg-soft)] transition"
                    >
                      <td className="py-4 px-6 font-medium">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 rounded-xl bg-[var(--td-bg-soft)] border border-[var(--td-border-subtle)] flex items-center justify-center text-rose-500 font-bold shadow-xs">
                            {user.email
                              ? user.email.charAt(0).toUpperCase()
                              : "U"}
                          </div>
                          <div>
                            <div className="font-semibold">
                              {user.name || user.fullName || "Unnamed User"}
                            </div>
                            <div className="text-xs text-[var(--td-text-muted)]">
                              {user.email}
                            </div>
                          </div>
                        </div>
                      </td>
                      <td className="py-4 px-6">
                        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-rose-500/10 border border-rose-500/20 text-rose-600 dark:text-rose-400">
                          <Shield className="w-3.5 h-3.5" />{" "}
                          {user.role || "USER"}
                        </span>
                      </td>
                      <td className="py-4 px-6">
                        <span
                          className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium ${
                            user.isActive !== false
                              ? "bg-emerald-500/10 border border-emerald-500/20 text-emerald-600 dark:text-emerald-400"
                              : "bg-amber-500/10 border border-amber-500/20 text-amber-600 dark:text-amber-400"
                          }`}
                        >
                          {user.isActive !== false ? (
                            <CheckCircle className="w-3.5 h-3.5" />
                          ) : (
                            <XCircle className="w-3.5 h-3.5" />
                          )}
                          {user.isActive !== false ? "Active" : "Inactive"}
                        </span>
                      </td>
                      <td className="py-4 px-6 text-right">
                        <button
                          onClick={() => handleDelete(user.id)}
                          className="p-2.5 rounded-xl bg-red-500/10 border border-red-500/20 text-red-600 dark:text-red-400 hover:bg-red-500/20 transition shadow-xs hover:scale-105 cursor-pointer"
                          title="Delete User"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* Add User Modal */}
        {isModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-xs px-4">
            <div className="max-w-md w-full bg-[var(--td-bg-surface-elevated)] border border-[var(--td-border-subtle)] rounded-2xl p-6 shadow-2xl space-y-6">
              <div className="flex items-center justify-between border-b border-[var(--td-border-subtle)] pb-4">
                <div className="flex items-center gap-2">
                  <div className="p-2 rounded-xl bg-[var(--td-color-primary)]/10 text-[var(--td-color-primary)]">
                    <UserPlus className="w-5 h-5" />
                  </div>
                  <h3 className="text-lg font-bold text-[var(--td-text)]">
                    Create New User
                  </h3>
                </div>
                <button
                  onClick={() => setIsModalOpen(false)}
                  className="p-2 rounded-xl bg-[var(--td-bg-soft)] text-[var(--td-text-muted)] hover:text-[var(--td-text)] transition cursor-pointer"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              <form onSubmit={handleCreateUser} className="space-y-4">
                <div>
                  <label className="block text-xs font-semibold text-[var(--td-text-light)] mb-1">
                    Name
                  </label>
                  <input
                    type="text"
                    required
                    value={newName}
                    onChange={(e) => setNewName(e.target.value)}
                    placeholder="Asaph Musan"
                    className="w-full px-3.5 py-2.5 text-xs bg-[var(--td-bg-soft)] border border-[var(--td-border-subtle)] rounded-xl text-[var(--td-text)] focus:outline-none focus:border-[var(--td-color-primary)] transition-all"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-[var(--td-text-light)] mb-1">
                    Email Address
                  </label>
                  <input
                    type="email"
                    required
                    value={newEmail}
                    onChange={(e) => setNewEmail(e.target.value)}
                    placeholder="name@example.com"
                    className="w-full px-3.5 py-2.5 text-xs bg-[var(--td-bg-soft)] border border-[var(--td-border-subtle)] rounded-xl text-[var(--td-text)] focus:outline-none focus:border-[var(--td-color-primary)] transition-all"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-[var(--td-text-light)] mb-1">
                    Password
                  </label>
                  <input
                    type="password"
                    required
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                    placeholder="••••••••"
                    className="w-full px-3.5 py-2.5 text-xs bg-[var(--td-bg-soft)] border border-[var(--td-border-subtle)] rounded-xl text-[var(--td-text)] focus:outline-none focus:border-[var(--td-color-primary)] transition-all"
                  />
                </div>

                <div className="flex items-center justify-end gap-3 pt-2">
                  <button
                    type="button"
                    onClick={() => setIsModalOpen(false)}
                    className="px-4 py-2.5 rounded-xl bg-[var(--td-bg-soft)] border border-[var(--td-border-subtle)] text-xs font-semibold text-[var(--td-text)] hover:bg-[var(--td-border-subtle)] transition cursor-pointer"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={submitting}
                    className="px-4 py-2.5 rounded-xl bg-[var(--td-color-primary)] text-[var(--td-text-inverse)] hover:opacity-95 text-xs font-bold transition shadow-sm disabled:opacity-50 cursor-pointer"
                  >
                    {submitting ? "Creating..." : "Save User"}
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
