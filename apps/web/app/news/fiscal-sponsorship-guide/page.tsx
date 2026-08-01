import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { Badge } from "@/components/ui/Badge";
import { Card } from "@/components/ui/Card";

export const metadata: Metadata = {
  title:
    "Fiscal Sponsorship: A Gateway to International Funding for African NGOs",
  description:
    "Learn how African NGOs can leverage fiscal sponsorship to unlock international grants, satisfy donor compliance, and bridge administrative gaps.",
  openGraph: {
    title:
      "Fiscal Sponsorship for African NGOs | Tudulu Development Intelligence",
    description:
      "A strategic guide on accessing global grants before full institutional registration, inspired by insights from Margaret Gitau.",
    images: [
      {
        url: "/articles/fiscal-sponsorship.jpg",
        width: 1200,
        height: 630,
        alt: "Fiscal Sponsorship for African NGOs",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    images: ["/articles/fiscal-sponsorship.jpg"],
  },
};

export default function FiscalSponsorshipArticlePage() {
  return (
    <>
      {/* Header / Hero Section */}
      <Section spacing="lg" className="bg-white border-b border-slate-200">
        <Container size="md" className="space-y-6">
          <div className="flex flex-wrap items-center gap-2">
            <Badge variant="blue">Development Intelligence</Badge>
            <Badge variant="slate">Grant Management</Badge>
            <span className="text-xs text-slate-500">5 min read</span>
          </div>

          <h1 className="text-3xl sm:text-5xl font-extrabold text-slate-900 tracking-tight leading-tight">
            Fiscal Sponsorship: A Gateway to International Funding for African
            NGOs
          </h1>

          <p className="text-lg text-slate-600 leading-relaxed">
            Many African grassroots organizations miss out on international
            funding—not because their projects lack impact, but because they
            don't meet complex legal or administrative requirements of overseas
            donors.
          </p>

          {/* Featured Article Cover Image */}
          <div className="relative w-full aspect-video rounded-2xl overflow-hidden shadow-lg border border-slate-200">
            <Image
              src="/articles/fiscal-sponsorship.jpg"
              alt="Fiscal Sponsorship & Legal Partnerships in Nonprofits"
              fill
              priority
              className="object-cover"
            />
          </div>

          {/* Editorial Attribution Box */}
          <div className="p-4 bg-sky-50/80 border border-sky-100 rounded-xl text-xs sm:text-sm text-sky-950 flex items-start gap-3">
            <span className="text-sky-600 text-lg leading-none">💡</span>
            <p>
              <strong>Editorial Note & Attribution:</strong> Inspired by
              insights shared by{" "}
              <span className="font-semibold text-slate-900">
                Margaret Gitau
              </span>
              , Founder & Lead Consultant at NobleCause Consultancy Firm, with
              additional editorial analysis, African context framing, and
              platform grant integration by{" "}
              <strong>Tudulu Uganda Limited</strong>.
            </p>
          </div>
        </Container>
      </Section>

      {/* Content Body */}
      <Section spacing="lg" className="bg-slate-50">
        <Container size="md">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
            {/* Main Article Stream */}
            <article className="lg:col-span-8 space-y-8 text-slate-700 leading-relaxed text-base">
              {/* Introduction */}
              <section className="space-y-4">
                <h2 className="text-2xl font-bold text-slate-900 tracking-tight">
                  Understanding Fiscal Sponsorship
                </h2>
                <p>
                  <strong>Fiscal sponsorship</strong> is a formal arrangement
                  where an established, legally registered nonprofit
                  organization receives and administers funding on behalf of
                  another organization, project, or coalition.
                </p>
                <p>
                  For emerging African NGOs, social enterprises, and
                  community-based organizations (CBOs), this mechanism creates a
                  legitimate bridge to access grants and philanthropic donations
                  that would otherwise be off-limits due to tax-status
                  constraints or registration backlogs.
                </p>
              </section>

              {/* Core Benefits */}
              <section className="space-y-4">
                <h2 className="text-2xl font-bold text-slate-900 tracking-tight">
                  Why It Matters in the African Context
                </h2>
                <p>
                  Major grantmakers in North America and Western Europe are
                  often bound by strict tax codes (such as US 501(c)(3)
                  equivalency determinations). Without dedicated legal teams or
                  expensive international compliance audits, local organizations
                  can get stuck in administrative limbo.
                </p>

                <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs space-y-3">
                  <h3 className="font-bold text-slate-900 text-sm uppercase tracking-wider text-sky-600">
                    Key Advantages of Fiscal Sponsorship:
                  </h3>
                  <ul className="space-y-2 text-sm text-slate-600 list-disc list-inside">
                    <li>
                      <strong>Expands Grant Access:</strong> Unlocks funding
                      from donors who only disburse to entities with recognized
                      tax-exempt status in their home country.
                    </li>
                    <li>
                      <strong>Accelerates Project Launch:</strong> Allows urgent
                      community health, agricultural, or education projects to
                      begin before local NGO board registration is finalized.
                    </li>
                    <li>
                      <strong>Financial Oversight:</strong> The sponsor handles
                      accounting, tax reporting, and audit trails, building
                      confidence among international risk managers.
                    </li>
                    <li>
                      <strong>Institutional Credibility:</strong> Working
                      alongside a reputable sponsor validates your operational
                      integrity to future independent funders.
                    </li>
                  </ul>
                </div>
              </section>

              {/* Strategic Considerations */}
              <section className="space-y-4">
                <h2 className="text-2xl font-bold text-slate-900 tracking-tight">
                  Strategic Considerations & Long-Term Vision
                </h2>
                <p>
                  While fiscal sponsorship is a powerful doorway,{" "}
                  <strong>
                    it is not a permanent substitute for institutional maturity
                  </strong>
                  .
                </p>
                <p>
                  African organizations should utilize fiscal sponsorship
                  strategically as a stepping stone. While under a sponsorship
                  umbrella, executive teams must actively build internal
                  governance, strengthen financial management software, and
                  complete local regulatory requirements.
                </p>

                <Card className="p-6 bg-slate-900 text-slate-200 space-y-3 border-none">
                  <span className="text-xs font-semibold text-sky-400 uppercase tracking-widest">
                    Tudulu Strategic Guidance
                  </span>
                  <p className="text-sm leading-relaxed text-slate-300">
                    "Treat fiscal sponsorship as an incubator. The primary goal
                    is not just receiving funds, but learning audit compliance
                    and project reporting so your organization can graduate to
                    direct grant stewardship."
                  </p>
                </Card>
              </section>

              {/* Development Glossary */}
              <section className="space-y-4 pt-4 border-t border-slate-200">
                <h3 className="text-xl font-bold text-slate-900">
                  Glossary of Key Terms
                </h3>
                <dl className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs sm:text-sm">
                  <div className="bg-white p-4 rounded-xl border border-slate-200">
                    <dt className="font-bold text-slate-900">Fiscal Sponsor</dt>
                    <dd className="text-slate-600 mt-1">
                      The registered 501(c)(3) or charitable entity that legally
                      holds and manages grant funds for a project.
                    </dd>
                  </div>
                  <div className="bg-white p-4 rounded-xl border border-slate-200">
                    <dt className="font-bold text-slate-900">
                      Equivalency Determination (ED)
                    </dt>
                    <dd className="text-slate-600 mt-1">
                      A legal process verifying that a foreign non-US NGO is
                      equivalent to a US public charity.
                    </dd>
                  </div>
                </dl>
              </section>
            </article>

            {/* Sidebar: Related Opportunities & Platform Tools */}
            <aside className="lg:col-span-4 space-y-6">
              {/* Related Opportunities Box */}
              <Card className="p-6 space-y-4 bg-white border-slate-200">
                <div className="flex items-center justify-between">
                  <Badge variant="emerald">Live Opportunities</Badge>
                  <span className="text-xs text-slate-400">Tudulu Grants</span>
                </div>

                <h3 className="font-bold text-slate-900 text-base">
                  Active Grants Accepting Fiscally Sponsored Projects
                </h3>

                <div className="space-y-3 text-sm">
                  <div className="p-3 rounded-lg bg-slate-50 border border-slate-100 hover:border-sky-300 transition-colors">
                    <p className="font-semibold text-slate-900 text-xs">
                      East Africa Community Health Innovation Grant 2026
                    </p>
                    <p className="text-xs text-slate-500 mt-1">
                      Up to $50,000 USD • Open to CBOs with fiscal sponsors.
                    </p>
                    <Link
                      href="/opportunities"
                      className="text-xs font-semibold text-sky-600 hover:underline mt-2 inline-block"
                    >
                      View Details &rarr;
                    </Link>
                  </div>

                  <div className="p-3 rounded-lg bg-slate-50 border border-slate-100 hover:border-sky-300 transition-colors">
                    <p className="font-semibold text-slate-900 text-xs">
                      Grassroots Grasslands & Climate Resilience Fund
                    </p>
                    <p className="text-xs text-slate-500 mt-1">
                      Up to $25,000 USD • Requires registered tax-exempt
                      partner.
                    </p>
                    <Link
                      href="/opportunities"
                      className="text-xs font-semibold text-sky-600 hover:underline mt-2 inline-block"
                    >
                      View Details &rarr;
                    </Link>
                  </div>
                </div>

                <Link
                  href="/opportunities"
                  className="block w-full text-center py-2 px-3 rounded-lg text-xs font-bold text-white bg-sky-600 hover:bg-sky-500 transition-colors"
                >
                  Browse All Opportunities
                </Link>
              </Card>

              {/* Organization Directory CTA */}
              <Card className="p-6 space-y-3 bg-slate-900 text-white border-none">
                <Badge variant="blue">Tudulu Directory</Badge>
                <h4 className="font-bold text-base">
                  Are you a registered Fiscal Sponsor in East Africa?
                </h4>
                <p className="text-xs text-slate-300 leading-relaxed">
                  List your organization on Tudulu so emerging grassroots
                  initiatives can connect with you for partnership.
                </p>
                <Link
                  href="/organizations"
                  className="inline-block text-xs font-semibold text-sky-400 hover:underline"
                >
                  Register Your Organization &rarr;
                </Link>
              </Card>
            </aside>
          </div>
        </Container>
      </Section>
    </>
  );
}
