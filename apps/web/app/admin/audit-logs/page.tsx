"use client";

import { useState, useEffect } from "react";
import {
  ShieldAlert,
  Search,
  Filter,
  AlertCircle,
  Activity,
  User,
  Calendar,
  Clock,
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

  useEffect(() => {
    fetchAuditLogs();
  }, []);

  const fetchAuditLogs = async () => {
    try {
      setLoading(true);
      const res = await fetch("http://localhost:4000/api/audit-logs");
      if (!res.ok) throw new Error("Failed to fetch system audit logs.");
      const data = await res.json();
      setLogs(data.data || data);
    } catch (err: any) {
      setError(err.message || "An unexpected error occurred.");
    } finally {
      setLoading(false);
    }
  };

  const filteredLogs = logs.filter((log) => {
    const matchesSearch =
      log.action.toLowerCase().includes(searchQuery.toLowerCase()) ||
      log.entity.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (log.userEmail &&
        log.userEmail.toLowerCase().includes(searchQuery.toLowerCase()));
    const matchesAction =
      actionFilter === "ALL" || log.action.toUpperCase().includes(actionFilter);
    return matchesSearch && matchesAction;
  });

  return (
    <div className="p-8 max-w-7xl mx-auto space-y-8 font-sans">
      {/* Header Section */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-slate-900 dark:text-white flex items-center gap-3">
            <ShieldAlert className="w-8 h-8 text-indigo-600" />
            System Audit Trails & Security Logs
          </h1>
          <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">
            Track accountability, administrator actions, and entity updates
            across the Tudulu platform.
          </p>
        </div>
      </div>

      {/* Filters and Search Bar */}
      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-4 shadow-sm flex flex-col sm:flex-row gap-4 items-center justify-between">
        <div className="relative w-full sm:w-96">
          <Search className="absolute left-3.5 top-3 w-4 h-4 text-slate-400" />
          <input
            type="text"
            placeholder="Search action, entity, or user email..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 text-slate-900 dark:text-slate-100"
          />
        </div>

        <div className="flex items-center gap-3 w-full sm:w-auto justify-end">
          <div className="flex items-center gap-2 text-sm text-slate-500">
            <Filter className="w-4 h-4" />
            <span>Action Type:</span>
          </div>
          <select
            value={actionFilter}
            onChange={(e) => setActionFilter(e.target.value)}
            className="bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 text-slate-900 dark:text-slate-100"
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
      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl shadow-sm overflow-hidden">
        {loading ? (
          <div className="p-12 text-center text-slate-500 flex flex-col items-center gap-3">
            <div className="w-6 h-6 border-2 border-indigo-600 border-t-transparent rounded-full animate-spin" />
            Loading security logs...
          </div>
        ) : error ? (
          <div className="p-12 text-center text-rose-500 flex flex-col items-center gap-2">
            <AlertCircle className="w-6 h-6" />
            <p>{error}</p>
          </div>
        ) : filteredLogs.length === 0 ? (
          <div className="p-12 text-center text-slate-500">
            No audit log entries found matching your criteria.
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-800/50 text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider">
                  <th className="py-4 px-6">Action & Entity</th>
                  <th className="py-4 px-6">Performed By</th>
                  <th className="py-4 px-6">IP Address</th>
                  <th className="py-4 px-6 text-right">Timestamp</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200 dark:divide-slate-800 text-sm">
                {filteredLogs.map((log) => (
                  <tr
                    key={log.id}
                    className="hover:bg-slate-50/50 dark:hover:bg-slate-800/50 transition-colors"
                  >
                    <td className="py-4 px-6 space-y-1">
                      <div className="font-semibold text-slate-900 dark:text-white flex items-center gap-2">
                        <Activity className="w-4 h-4 text-indigo-600 shrink-0" />
                        <span>{log.action}</span>
                      </div>
                      <div className="text-xs text-slate-500 dark:text-slate-400 font-mono">
                        Target: {log.entity}{" "}
                        {log.entityId ? `(${log.entityId.slice(0, 8)}...)` : ""}
                      </div>
                    </td>
                    <td className="py-4 px-6">
                      <div className="flex items-center gap-1.5 text-xs text-slate-700 dark:text-slate-300">
                        <User className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                        <span className="font-medium">
                          {log.userEmail || log.userId}
                        </span>
                      </div>
                    </td>
                    <td className="py-4 px-6 font-mono text-xs text-slate-500 dark:text-slate-400">
                      {log.ipAddress || "127.0.0.1"}
                    </td>
                    <td className="py-4 px-6 text-right text-xs text-slate-500 dark:text-slate-400">
                      <div className="flex items-center justify-end gap-1">
                        <Clock className="w-3.5 h-3.5 text-slate-400" />
                        <span>{new Date(log.createdAt).toLocaleString()}</span>
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
  );
}
