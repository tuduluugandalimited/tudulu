export default function TestPage() {
  return (
    <div className="min-h-screen py-12 px-4 bg-white">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-3xl font-bold text-green-600 mb-4">
          ✅ Test Page Works!
        </h1>
        <p className="text-gray-600">
          If you can see this, the events routing is working.
        </p>
        <p className="text-gray-600 mt-2">
          The issue is with the [slug] folder.
        </p>
        <a
          href="/events"
          className="inline-block mt-4 px-4 py-2 bg-emerald-800 text-white rounded-lg hover:bg-emerald-900"
        >
          Back to Events
        </a>
      </div>
    </div>
  );
}
