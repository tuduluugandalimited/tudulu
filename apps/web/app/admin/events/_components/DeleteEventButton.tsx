"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { Trash2, Loader2 } from "lucide-react";

export function DeleteEventButton({ id }: { id: string }) {
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleDelete = async () => {
    if (!confirm("Are you sure you want to delete this event?")) return;

    setLoading(true);
    try {
      const API_URL =
        process.env.NEXT_PUBLIC_API_URL || "http://localhost:3001";
      const res = await fetch(`${API_URL}/v1/events/${id}`, {
        method: "DELETE",
      });

      if (res.ok) {
        router.refresh();
      } else {
        alert("Failed to delete event.");
      }
    } catch (err) {
      console.error(err);
      alert("Error deleting event.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <button
      onClick={handleDelete}
      disabled={loading}
      className="inline-flex p-2 text-slate-400 hover:text-red-600 rounded-lg hover:bg-slate-100 transition-colors disabled:opacity-50"
    >
      {loading ? (
        <Loader2 className="w-4 h-4 animate-spin" />
      ) : (
        <Trash2 className="w-4 h-4" />
      )}
    </button>
  );
}
