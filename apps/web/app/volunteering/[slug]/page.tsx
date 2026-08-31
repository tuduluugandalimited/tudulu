export const dynamic = "force-dynamic";

import Link from "next/link";
import { notFound } from "next/navigation";
import {
  Heart,
  MapPin,
  Building2,
  ArrowLeft,
  CheckCircle2,
  Globe,
  Clock,
} from "lucide-react";

interface VolunteeringDetailPageProps {
  params: Promise<{
    slug: string;
  }>;
}

async function getVolunteeringDetail(slug: string) {
  try {
    // Use the proxy route - NO /api/v1
    const res = await fetch(`/api/volunteering/${slug}`, {
      cache: "no-store",
    });
    if (!res.ok) return null;
    return res.json();
  } catch {
    return null;
  }
}

export default async function VolunteeringDetailPage({
  params,
}: VolunteeringDetailPageProps) {
  const { slug } = await params;
  const item = await getVolunteeringDetail(slug);

  if (!item) {
    notFound();
  }

  return (
    <div className="min-h-screen bg-[var(--td-bg-soft)] text-[var(--td-text)] py-12 px-4">
      <div className="max-w-4xl mx-auto space-y-8">
        {/* Back Navigation */}
        <div>
          <Link
            href="/volunteering"
            className="inline-flex items-center gap-2 text-xs font-semibold text-[var(--td-text-muted)] hover:text-[var(--td-color-primary)] transition"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Volunteering Opportunities
          </Link>
        </div>

        {/* Header Card */}
        <div className="bg-[var(--td-bg-surface-elevated)] border border-[var(--td-border-subtle)] rounded-3xl p-8 space-y-6 shadow-sm">
          <div className="flex flex-wrap items-center gap-3">
            <span className="px-3 py-1 text-xs font-semibold rounded-full bg-rose-500/10 text-rose-600 dark:text-rose-400 border border-rose-500/20">
              {item.commitment || "Flexible"}
            </span>
            {item.isRemote && (
              <span className="inline-flex items-center gap-1.5 text-xs font-medium text-emerald-600 dark:text-emerald-400 bg-emerald-500/10 px-3 py-1 rounded-full border border-emerald-500/20">
                <Globe className="w-3.5 h-3.5" />
                Remote Allowed
              </span>
            )}
          </div>

          <h1 className="text-3xl md:text-4xl font-extrabold tracking-tight">
            {item.title}
          </h1>

          <div className="flex flex-wrap items-center gap-6 text-xs text-[var(--td-text-muted)] pt-2">
            {item.organization && (
              <div className="flex items-center gap-2">
                <Building2 className="w-4 h-4 text-[var(--td-color-primary)]" />
                <span className="font-medium text-[var(--td-text)]">
                  {item.organization.name}
                </span>
              </div>
            )}
            {item.location && (
              <div className="flex items-center gap-2">
                <MapPin className="w-4 h-4 text-[var(--td-color-primary)]" />
                <span>{item.location}</span>
              </div>
            )}
          </div>
        </div>

        {/* Content Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Description */}
          <div className="lg:col-span-2 space-y-6 bg-[var(--td-bg-surface-elevated)] border border-[var(--td-border-subtle)] rounded-3xl p-8 shadow-sm">
            <h3 className="text-lg font-bold">About the Role</h3>
            <div className="text-sm text-[var(--td-text-muted)] leading-relaxed whitespace-pre-line">
              {item.description}
            </div>

            <div className="space-y-4 pt-6 border-t border-[var(--td-border-subtle)]">
              <h4 className="text-sm font-bold">What You Will Gain / Impact</h4>
              <ul className="space-y-2.5 text-xs text-[var(--td-text-muted)]">
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                  <span>
                    Direct involvement in grassroots community initiatives
                    across Africa.
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                  <span>
                    Direct recommendation and verified certificate of
                    contribution upon successful completion.
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                  <span>
                    Networking opportunities with leading non-profits and sector
                    professionals.
                  </span>
                </li>
              </ul>
            </div>
          </div>

          {/* Sidebar Action Card */}
          <div className="space-y-6">
            <div className="bg-[var(--td-bg-surface-elevated)] border border-[var(--td-border-subtle)] rounded-3xl p-6 space-y-6 shadow-sm sticky top-6">
              <div className="space-y-2">
                <h4 className="font-bold text-sm">
                  Ready to make a difference?
                </h4>
                <p className="text-xs text-[var(--td-text-muted)]">
                  Submit your application to connect directly with the
                  organizing team.
                </p>
              </div>

              <button
                type="button"
                className="w-full py-3 px-4 bg-[var(--td-color-primary)] text-white rounded-xl font-medium text-sm hover:opacity-95 transition shadow-sm"
              >
                Apply for this Role
              </button>

              {item.organization?.email && (
                <div className="pt-4 border-t border-[var(--td-border-subtle)] text-xs space-y-1">
                  <span className="text-[var(--td-text-muted)]">
                    Direct Contact:
                  </span>
                  <p className="font-medium text-[var(--td-text)] break-all">
                    {item.organization.email}
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
