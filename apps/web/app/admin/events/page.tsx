import Link from "next/link";
import { Plus, Edit, Calendar, MapPin, Video } from "lucide-react";
import { DeleteEventButton } from "./_components/DeleteEventButton";
import { BackButton } from "../_components/BackButton";

async function getAdminEvents() {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL || "http://localhost:3001"}/v1/events`,
      { cache: "no-store" },
    );
    if (!res.ok) return [];
    return res.json();
  } catch {
    return [];
  }
}

export default async function AdminEventsPage() {
  const events = await getAdminEvents();

  return (
    <div className="p-6 max-w-7xl mx-auto space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Manage Events</h1>
          <p className="text-sm text-slate-500">
            Create, edit, or remove platform events.
          </p>
        </div>

        {/* Uniform Button Group Header */}
        <div className="flex items-center gap-3">
          <BackButton href="/admin" label="Back to Dashboard" />
          <Link
            href="/admin/events/new"
            className="inline-flex items-center gap-2 px-4 py-2 bg-emerald-800 text-white rounded-xl text-sm font-medium hover:bg-emerald-900 transition-colors"
          >
            <Plus className="w-4 h-4" /> Add Event
          </Link>
        </div>
      </div>

      <div className="bg-white border border-slate-200 rounded-2xl overflow-hidden shadow-xs">
        <table className="w-full text-left text-sm text-slate-600">
          <thead className="bg-slate-50 border-b border-slate-200 text-slate-700 font-semibold uppercase text-xs">
            <tr>
              <th className="px-6 py-4">Title</th>
              <th className="px-6 py-4">Type</th>
              <th className="px-6 py-4">Date</th>
              <th className="px-6 py-4">Format</th>
              <th className="px-6 py-4 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {events.length === 0 ? (
              <tr>
                <td
                  colSpan={5}
                  className="px-6 py-8 text-center text-slate-400"
                >
                  No events created yet.
                </td>
              </tr>
            ) : (
              events.map((evt: any) => (
                <tr
                  key={evt.id}
                  className="hover:bg-slate-50/80 transition-colors"
                >
                  <td className="px-6 py-4 font-medium text-slate-900">
                    {evt.title}
                  </td>
                  <td className="px-6 py-4">
                    <span className="px-2.5 py-1 text-xs font-semibold rounded-full bg-slate-100 text-slate-700">
                      {evt.type}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-1.5 text-xs text-slate-500">
                      <Calendar className="w-3.5 h-3.5" />
                      {new Date(evt.startDate).toLocaleDateString()}
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className="inline-flex items-center gap-1 text-xs text-slate-600">
                      {evt.isVirtual ? (
                        <Video className="w-3.5 h-3.5 text-indigo-500" />
                      ) : (
                        <MapPin className="w-3.5 h-3.5 text-emerald-500" />
                      )}
                      {evt.isVirtual ? "Virtual" : "In-Person"}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-right space-x-2">
                    <Link
                      href={`/admin/events/${evt.id}/edit`}
                      className="inline-flex p-2 text-slate-600 hover:text-emerald-800 rounded-lg hover:bg-slate-100"
                    >
                      <Edit className="w-4 h-4" />
                    </Link>
                    <DeleteEventButton id={evt.id} />
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
