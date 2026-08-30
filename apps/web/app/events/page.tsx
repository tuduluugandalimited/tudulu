import Link from "next/link";

export default function EventsPage() {
  return (
    <div className="min-h-screen py-12 px-4 bg-slate-50">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-3xl font-bold text-slate-900 mb-4">Events Page</h1>
        <p className="text-slate-600 mb-8">
          This is the events page. Dynamic routes should work below.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Link
            href="/events/test-event-do-not-delete"
            className="p-4 bg-white rounded-lg border hover:shadow-md transition"
          >
            Test Event
          </Link>
          <Link
            href="/events/regional-data-protection-cybersecurity-symposium-2026"
            className="p-4 bg-white rounded-lg border hover:shadow-md transition"
          >
            Data Protection Symposium
          </Link>
        </div>
      </div>
    </div>
  );
}
