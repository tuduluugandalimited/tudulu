"use client";

import { useState, useEffect, useCallback } from "react";
import Link from "next/link";
import {
  ShieldAlert,
  Search,
  Filter,
  AlertCircle,
  Activity,
  User,
  Clock,
  ArrowLeft,
} from "lucide-react";

interface AuditLog {
  id: string;
  action: string;
  entity: string;
  entityId?: string;
  userId: string;
  userEmail?: string;
  ipAddress?: string;
  createdAt: string;
}

export default function AdminAuditLogsPage() {
  const [logs, setLogs] = useState<AuditLog[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [actionFilter, setActionFilter] = useState<string>("ALL");
  const [error, setError] = useState<string | null>(null);

  const fetchAuditLogs = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const token = localStorage.getItem("accessToken");
      const res = await fetch("/api/v1/admin/audit-logs", {
        headers: token ? { Authorization: `Bearer ${token}` } : {},
      });
      if (!res.ok) throw new Error("Failed to fetch system audit logs.");
      const data = await res.json();
      setLogs(Array.isArray(data) ? data : data.data || []);
    } catch (err: any) {
      setError(err.message || "An unexpected error occurred.");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchAuditLogs();
  }, [fetchAuditLogs]);

  const filteredLogs = logs.filter((log) => {
    const matchesSearch =
      log.action?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      log.entity?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (log.userEmail &&
        log.userEmail.toLowerCase().includes(searchQuery.toLowerCase()));
    const matchesAction =
      actionFilter === "ALL" ||
      log.action?.toUpperCase().includes(actionFilter);
    return matchesSearch && matchesAction;
  });

  return (
    <div className="min-h-screen bg-[var(--td-bg-soft)] text-[var(--td-text)]">
      <div className="max-w-7xl mx-auto space-y-8 py-10 px-4">
        {/* Header Section */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 border-b border-[var(--td-border-subtle)] pb-6">
          <div className="space-y-1">
            <Link
              href="/admin"
              className="inline-flex items-center gap-1.5 text-xs font-semibold text-[var(--td-color-primary)] hover:underline mb-2"
            >
              <ArrowLeft className="w-4 h-4" /> Back to Control Center
            </Link>
            <h1 className="text-3xl font-extrabold tracking-tight text-[var(--td-text)] flex items-center gap-3">
              <ShieldAlert className="w-8 h-8 text-[var(--td-color-primary)]" />
              System Audit Trails & Security Logs
            </h1>
            <p className="text-xs text-[var(--td-text-muted)]">
              Track accountability, administrator actions, and entity updates
              across the Tudulu platform.
            </p>
          </div>
        </div>

        {/* Filters and Search Bar */}
        <div className="bg-[var(--td-bg-surface-elevated)] border border-[var(--td-border-subtle)] rounded-2xl p-4 shadow-sm flex flex-col sm:flex-row gap-4 items-center justify-between">
          <div className="relative w-full sm:w-96">
            <Search className="absolute left-3.5 top-3 w-4 h-4 text-[var(--td-text-muted)]" />
            <input
              type="text"
              placeholder="Search action, entity, or user email..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2 bg-[var(--td-bg-soft)] border border-[var(--td-border-subtle)] rounded-xl text-xs focus:outline-none focus:border-[var(--td-color-primary)] text-[var(--td-text)] transition-all"
            />
          </div>

          <div className="flex items-center gap-3 w-full sm:w-auto justify-end">
            <div className="flex items-center gap-2 text-xs text-[var(--td-text-muted)]">
              <Filter className="w-4 h-4" />
              <span>Action Type:</span>
            </div>
            <select
              value={actionFilter}
              onChange={(e) => setActionFilter(e.target.value)}
              className="bg-[var(--td-bg-soft)] border border-[var(--td-border-subtle)] rounded-xl px-3 py-2 text-xs focus:outline-none focus:border-[var(--td-color-primary)] text-[var(--td-text)] transition-all cursor-pointer"
            >
              <option value="ALL">All Actions</option>
              <option value="CREATE">Create</option>
              <option value="UPDATE">Update</option>
              <option value="DELETE">Delete</option>
              <option value="VERIFY">Verify</option>
            </select>
          </div>
        </div>

        {/* Main Table Container */}
        <div className="bg-[var(--td-bg-surface-elevated)] border border-[var(--td-border-subtle)] rounded-2xl shadow-xl overflow-hidden">
          {loading ? (
            <div className="p-12 text-center text-[var(--td-text-muted)] flex flex-col items-center gap-3 text-xs font-medium">
              <div className="w-6 h-6 border-2 border-[var(--td-color-primary)] border-t-transparent rounded-full animate-spin" />
              Loading security logs...
            </div>
          ) : error ? (
            <div className="p-12 text-center text-rose-500 flex flex-col items-center gap-2 text-xs">
              <AlertCircle className="w-6 h-6" />
              <p>{error}</p>
            </div>
          ) : filteredLogs.length === 0 ? (
            <div className="p-12 text-center text-[var(--td-text-muted)] text-xs">
              No audit log entries found matching your criteria.
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="border-b border-[var(--td-border-subtle)] bg-[var(--td-bg-soft)] text-xs font-semibold text-[var(--td-text-muted)] uppercase tracking-wider">
                    <th className="py-4 px-6">Action & Entity</th>
                    <th className="py-4 px-6">Performed By</th>
                    <th className="py-4 px-6">IP Address</th>
                    <th className="py-4 px-6 text-right">Timestamp</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[var(--td-border-subtle)] text-sm">
                  {filteredLogs.map((log) => (
                    <tr
                      key={log.id}
                      className="hover:bg-[var(--td-bg-soft)] transition-colors"
                    >
                      <td className="py-4 px-6 space-y-1">
                        <div className="font-semibold text-[var(--td-text)] flex items-center gap-2">
                          <Activity className="w-4 h-4 text-[var(--td-color-primary)] shrink-0" />
                          <span>{log.action}</span>
                        </div>
                        <div className="text-xs text-[var(--td-text-muted)] font-mono">
                          Target: {log.entity}{" "}
                          {log.entityId
                            ? `(${log.entityId.slice(0, 8)}...)`
                            : ""}
                        </div>
                      </td>
                      <td className="py-4 px-6">
                        <div className="flex items-center gap-1.5 text-xs text-[var(--td-text)]">
                          <User className="w-3.5 h-3.5 text-[var(--td-text-muted)] shrink-0" />
                          <span className="font-medium">
                            {log.userEmail || log.userId}
                          </span>
                        </div>
                      </td>
                      <td className="py-4 px-6 font-mono text-xs text-[var(--td-text-muted)]">
                        {log.ipAddress || "127.0.0.1"}
                      </td>
                      <td className="py-4 px-6 text-right text-xs text-[var(--td-text-muted)]">
                        <div className="flex items-center justify-end gap-1">
                          <Clock className="w-3.5 h-3.5 text-[var(--td-text-muted)]" />
                          <span>
                            {new Date(log.createdAt).toLocaleString()}
                          </span>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
