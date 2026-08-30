export default function EventDetailPage({
  params,
}: {
  params: { slug: string };
}) {
  return (
    <div className="min-h-screen py-12 px-4 bg-white">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-3xl font-bold text-blue-600 mb-4">
          Event Detail Page
        </h1>
        <p className="text-gray-600 mb-2">
          Slug: <strong>{params.slug}</strong>
        </p>
        <Link
          href="/events"
          className="inline-block px-4 py-2 bg-emerald-800 text-white rounded-lg hover:bg-emerald-900"
        >
          Back to Events
        </Link>
      </div>
    </div>
  );
}
