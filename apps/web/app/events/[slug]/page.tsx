import { notFound } from "next/navigation";
import { Calendar, MapPin, Video, ExternalLink } from "lucide-react";
import { Container } from "@/components/ui/Container";

async function getEvent(slug: string) {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL || ""}/api/events/${slug}`, // Use /api/events
      {
        cache: "no-store",
      },
    );
    if (!res.ok) return null;
    return res.json();
  } catch {
    return null;
  }
}

export default async function EventDetailPage({
  params,
}: {
  params: { slug: string };
}) {
  const event = await getEvent(params.slug);

  if (!event) notFound();

  return (
    <main className="min-h-screen py-12 bg-white">
      <Container size="md">
        <div className="space-y-6">
          <div className="inline-flex items-center gap-2 text-xs font-semibold text-emerald-700 bg-emerald-50 px-3 py-1 rounded-full">
            {event.isVirtual ? (
              <Video className="w-4 h-4" />
            ) : (
              <MapPin className="w-4 h-4" />
            )}
            {event.type}
          </div>

          <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900">
            {event.title}
          </h1>

          <div className="flex flex-wrap gap-6 text-sm text-slate-600 border-y border-slate-100 py-4">
            <div className="flex items-center gap-2">
              <Calendar className="w-4 h-4 text-slate-400" />
              <span>{new Date(event.startDate).toLocaleDateString()}</span>
            </div>
            {event.location && (
              <div className="flex items-center gap-2">
                <MapPin className="w-4 h-4 text-slate-400" />
                <span>{event.location}</span>
              </div>
            )}
          </div>

          <div className="prose max-w-none text-slate-700 leading-relaxed whitespace-pre-line">
            {event.description}
          </div>

          {event.eventUrl && (
            <div className="pt-6">
              <a
                href={event.eventUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-6 py-3 bg-emerald-800 text-white font-medium rounded-xl hover:bg-emerald-900 transition-colors"
              >
                Register for Event <ExternalLink className="w-4 h-4" />
              </a>
            </div>
          )}
        </div>
      </Container>
    </main>
  );
}
