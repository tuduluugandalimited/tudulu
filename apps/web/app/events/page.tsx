import Link from "next/link";
import { Calendar, MapPin, Video, ArrowRight } from "lucide-react";
import { Container } from "@/components/ui/Container";

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

async function getEvents(): Promise<Event[]> {
  try {
    const baseUrl = process.env.NEXT_PUBLIC_API_URL || "";
    const res = await fetch(`${baseUrl}/api/events`, {
      cache: "no-store",
    });

    if (!res.ok) {
      console.error(`Failed to fetch events: ${res.status} ${res.statusText}`);
      return [];
    }

    const data = await res.json();
    return Array.isArray(data) ? data : [];
  } catch (error) {
    console.error("Failed to fetch events:", error);
    return [];
  }
}

export default async function EventsPage() {
  const events = await getEvents();

  return (
    <main className="min-h-screen py-12 bg-slate-50">
      <Container size="lg">
        <div className="max-w-2xl mb-10">
          <h1 className="text-3xl font-extrabold text-slate-900 sm:text-4xl">
            Development Events & Summits
          </h1>
          <p className="mt-2 text-slate-600">
            Discover upcoming conferences, workshops, and webinars across
            Africa.
          </p>
        </div>

        {events.length === 0 ? (
          <div className="p-12 text-center bg-white border border-slate-200 rounded-2xl shadow-xs">
            <p className="text-slate-500 font-medium">
              No upcoming events found right now.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {events.map((event) => (
              <div
                key={event.id}
                className="bg-white border border-slate-200 rounded-2xl p-6 flex flex-col justify-between shadow-xs hover:shadow-md transition-all group"
              >
                <div>
                  <div className="flex items-center gap-2 text-xs font-semibold text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded-full w-fit mb-4">
                    {event.isVirtual ? (
                      <Video className="w-3.5 h-3.5" />
                    ) : (
                      <MapPin className="w-3.5 h-3.5" />
                    )}
                    <span>{event.type}</span>
                  </div>

                  <h2 className="text-xl font-bold text-slate-900 mb-2 line-clamp-2 group-hover:text-emerald-800 transition-colors">
                    {event.title}
                  </h2>

                  {event.description && (
                    <p className="text-sm text-slate-600 line-clamp-3 mb-6">
                      {event.description}
                    </p>
                  )}
                </div>

                <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
                  <div className="flex items-center text-xs text-slate-500 gap-1.5">
                    <Calendar className="w-4 h-4 text-slate-400" />
                    <span>
                      {new Date(event.startDate).toLocaleDateString("en-US", {
                        month: "short",
                        day: "numeric",
                        year: "numeric",
                      })}
                    </span>
                  </div>

                  <Link
                    href={`/events/${event.slug}`}
                    className="text-xs font-semibold text-emerald-800 hover:text-emerald-900 inline-flex items-center gap-1 transition-colors"
                  >
                    Details <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </div>
            ))}
          </div>
        )}
      </Container>
    </main>
  );
}
