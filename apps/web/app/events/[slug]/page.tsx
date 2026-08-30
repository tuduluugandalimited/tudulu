import { notFound } from "next/navigation";
import {
  Calendar,
  MapPin,
  Video,
  ExternalLink,
  ArrowLeft,
  ArrowRight,
} from "lucide-react";
import { Container } from "@/components/ui/Container";
import Link from "next/link";

interface Event {
  id: string;
  title: string;
  slug: string;
  description: string;
  location: string | null;
  isVirtual: boolean;
  eventUrl: string | null;
  startDate: string;
  endDate: string | null;
  type: string;
  organizationId: string | null;
  organization: {
    id: string;
    name: string;
    slug: string;
    logoUrl: string | null;
  } | null;
}

async function getEvent(slug: string): Promise<Event | null> {
  try {
    const baseUrl = process.env.NEXT_PUBLIC_API_URL || "";
    const res = await fetch(`${baseUrl}/api/events/${slug}`, {
      cache: "no-store",
    });

    if (!res.ok) {
      if (res.status === 404) {
        return null;
      }
      console.error(`Failed to fetch event: ${res.status} ${res.statusText}`);
      return null;
    }

    const data = await res.json();
    return data || null;
  } catch (error) {
    console.error("Failed to fetch event:", error);
    return null;
  }
}

export default async function EventDetailPage({
  params,
}: {
  params: { slug: string };
}) {
  const event = await getEvent(params.slug);

  if (!event) {
    notFound();
  }

  const formattedDate = new Date(event.startDate).toLocaleDateString("en-US", {
    weekday: "long",
    month: "long",
    day: "numeric",
    year: "numeric",
  });

  return (
    <main className="min-h-screen py-12 bg-white">
      <Container size="md">
        {/* Back Button */}
        <Link
          href="/events"
          className="inline-flex items-center gap-2 text-sm font-medium text-slate-600 hover:text-emerald-800 transition-colors mb-6"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Events
        </Link>

        <article className="space-y-6">
          {/* Event Type Badge */}
          <div className="inline-flex items-center gap-2 text-xs font-semibold text-emerald-700 bg-emerald-50 px-3 py-1.5 rounded-full">
            {event.isVirtual ? (
              <Video className="w-4 h-4" />
            ) : (
              <MapPin className="w-4 h-4" />
            )}
            {event.type}
            {event.isVirtual && (
              <span className="ml-1 text-emerald-600">(Virtual)</span>
            )}
          </div>

          {/* Title */}
          <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900">
            {event.title}
          </h1>

          {/* Event Metadata */}
          <div className="flex flex-wrap gap-6 text-sm text-slate-600 border-y border-slate-100 py-4">
            <div className="flex items-center gap-2">
              <Calendar className="w-4 h-4 text-slate-400" />
              <span>{formattedDate}</span>
            </div>
            {event.location && (
              <div className="flex items-center gap-2">
                <MapPin className="w-4 h-4 text-slate-400" />
                <span>{event.location}</span>
              </div>
            )}
            {event.organization && (
              <div className="flex items-center gap-2">
                <span className="text-slate-400">Organized by</span>
                <span className="font-medium text-slate-700">
                  {event.organization.name}
                </span>
              </div>
            )}
          </div>

          {/* Description */}
          <div className="prose max-w-none text-slate-700 leading-relaxed whitespace-pre-line">
            {event.description}
          </div>

          {/* Event URL / Registration Button */}
          {event.eventUrl && (
            <div className="pt-4 border-t border-slate-100">
              <a
                href={event.eventUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-6 py-3 bg-emerald-800 text-white font-medium rounded-xl hover:bg-emerald-900 transition-colors shadow-sm hover:shadow-md"
              >
                Register for Event <ExternalLink className="w-4 h-4" />
              </a>
            </div>
          )}

          {/* If no event URL but has organization */}
          {!event.eventUrl && event.organization?.website && (
            <div className="pt-4 border-t border-slate-100">
              <a
                href={event.organization.website}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-6 py-3 bg-slate-800 text-white font-medium rounded-xl hover:bg-slate-900 transition-colors shadow-sm hover:shadow-md"
              >
                Visit Organization <ExternalLink className="w-4 h-4" />
              </a>
            </div>
          )}
        </article>
      </Container>
    </main>
  );
}
