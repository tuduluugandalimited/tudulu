import Link from "next/link";
import { Heart, MapPin, Calendar, Building2 } from "lucide-react";

interface Organization {
  name: string;
}

interface VolunteeringItem {
  id: string;
  slug?: string;
  title: string;
  description: string;
  commitment?: string;
  isRemote?: boolean;
  location?: string;
  deadline?: string;
  organization?: Organization;
}

async function getVolunteeringOpportunities(): Promise<VolunteeringItem[]> {
  try {
    const apiUrl =
      process.env.NEXT_PUBLIC_API_URL || "http://localhost:3001/api/v1";
    const res = await fetch(`${apiUrl}/volunteering`, { cache: "no-store" });
    if (!res.ok) return [];
    return res.json();
  } catch {
    return [];
  }
}

export default async function VolunteeringPage() {
  const opportunities = await getVolunteeringOpportunities();

  return (
    <div className="min-h-screen bg-[var(--td-bg-soft)] text-[var(--td-text)] py-12 px-4">
      <div className="max-w-6xl mx-auto space-y-8">
        {/* Header Section */}
        <div className="text-center space-y-3 max-w-2xl mx-auto">
          <h1 className="text-4xl font-extrabold tracking-tight">
            Volunteering Opportunities
          </h1>
          <p className="text-sm text-[var(--td-text-muted)]">
            Connect with grassroots projects, non-profits, and community
            initiatives across Africa.
          </p>
        </div>

        {opportunities.length === 0 ? (
          <div className="p-12 text-center bg-[var(--td-bg-surface-elevated)] border border-[var(--td-border-subtle)] rounded-2xl">
            <Heart className="w-10 h-10 text-rose-500/40 mx-auto mb-3" />
            <h3 className="text-lg font-bold">
              No volunteering roles listed yet
            </h3>
            <p className="text-xs text-[var(--td-text-muted)] mt-1">
              Check back soon or register your organization to post an
              opportunity.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {opportunities.map((item) => (
              <div
                key={item.id}
                className="bg-[var(--td-bg-surface-elevated)] border border-[var(--td-border-subtle)] hover:border-[var(--td-color-primary)] rounded-2xl p-6 transition-all shadow-sm flex flex-col justify-between space-y-4"
              >
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="px-2.5 py-1 text-xs font-semibold rounded-full bg-rose-500/10 text-rose-600 dark:text-rose-400 border border-rose-500/20">
                      {item.commitment || "Flexible"}
                    </span>
                    {item.isRemote && (
                      <span className="text-xs font-medium text-emerald-600 dark:text-emerald-400">
                        Remote Allowed
                      </span>
                    )}
                  </div>

                  <h3 className="text-lg font-bold">{item.title}</h3>

                  <p className="text-xs text-[var(--td-text-muted)] line-clamp-3">
                    {item.description}
                  </p>
                </div>

                <div className="space-y-3 pt-4 border-t border-[var(--td-border-subtle)] text-xs text-[var(--td-text-muted)]">
                  {item.organization && (
                    <div className="flex items-center gap-2">
                      <Building2 className="w-3.5 h-3.5 text-[var(--td-color-primary)] shrink-0" />
                      <span className="truncate">{item.organization.name}</span>
                    </div>
                  )}

                  {item.location && (
                    <div className="flex items-center gap-2">
                      <MapPin className="w-3.5 h-3.5 text-[var(--td-color-primary)] shrink-0" />
                      <span className="truncate">{item.location}</span>
                    </div>
                  )}

                  {item.deadline && (
                    <div className="flex items-center gap-2">
                      <Calendar className="w-3.5 h-3.5 text-[var(--td-color-primary)] shrink-0" />
                      <span>Deadline: {item.deadline}</span>
                    </div>
                  )}

                  <Link
                    href={`/volunteering/${item.slug || item.id}`}
                    className="inline-flex items-center justify-center w-full mt-2 px-4 py-2 bg-[var(--td-color-primary)] text-white rounded-xl font-medium hover:opacity-90 transition"
                  >
                    View Details & Apply
                  </Link>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
