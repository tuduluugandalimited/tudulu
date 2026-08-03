import { Metadata } from "next";
import ContactForm from "@/components/ContactForm";
import { Card } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";

export const metadata: Metadata = {
  title: "Contact Us | Tudulu Uganda Limited",
  description:
    "Get in touch with Tudulu Uganda Limited for inquiries regarding digital health systems, edge data architectures, and field engineering partnerships.",
};

export default function ContactPage() {
  return (
    <div className="min-h-screen bg-[var(--td-bg-soft)] text-[var(--td-text)] flex flex-col font-sans selection:bg-[var(--td-color-primary)] selection:text-[var(--td-text-inverse)]">
      <main className="flex-1">
        {/* Header / Hero Section */}
        <Section
          spacing="lg"
          className="relative overflow-hidden bg-[var(--td-bg)] border-b border-[var(--td-border-subtle)] py-20 sm:py-28"
        >
          <div className="absolute inset-0 td-glow-hero pointer-events-none" />
          <Container size="md" className="relative z-10 text-center space-y-4">
            <Badge
              variant="emerald"
              className="px-3 py-1 text-xs font-medium rounded-full bg-[var(--td-color-primary-light)] text-[var(--td-color-primary)]"
            >
              Get In Touch
            </Badge>

            <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight">
              Contact{" "}
              <span className="td-gradient-text">Tudulu Uganda Limited</span>
            </h1>

            <p className="text-base sm:text-lg text-[var(--td-text-light)] max-w-2xl mx-auto leading-relaxed font-normal">
              Have questions about our digital health systems, field data
              platforms, or technical partnerships? Reach out directly to our
              team.
            </p>
          </Container>
        </Section>

        {/* Contact Form & Information Grid */}
        <Section spacing="lg" className="py-16 sm:py-20 bg-[var(--td-bg-soft)]">
          <Container size="lg">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
              {/* Left Column: Direct Info Cards */}
              <div className="lg:col-span-5 space-y-6">
                <Card className="td-card p-8 space-y-6">
                  <h2 className="text-lg font-bold text-[var(--td-text)] border-b border-[var(--td-border-subtle)] pb-4">
                    Contact Details
                  </h2>

                  {/* Office Location */}
                  <div className="flex items-start space-x-4">
                    <div className="p-3 bg-[var(--td-bg-surface-elevated)] text-[var(--td-text)] rounded-[var(--td-radius-md)] shrink-0 mt-0.5">
                      <svg
                        className="w-5 h-5 text-[var(--td-color-primary)]"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                        />
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                        />
                      </svg>
                    </div>
                    <div>
                      <h3 className="text-xs font-bold text-[var(--td-text-muted)] uppercase tracking-wider">
                        Headquarters
                      </h3>
                      <p className="text-[var(--td-text)] text-sm sm:text-base mt-0.5 font-semibold">
                        Kampala, Uganda
                      </p>
                    </div>
                  </div>

                  {/* Email */}
                  <div className="flex items-start space-x-4 pt-4 border-t border-[var(--td-border-subtle)]">
                    <div className="p-3 bg-[var(--td-color-primary-light)] text-[var(--td-color-primary)] rounded-[var(--td-radius-md)] shrink-0 mt-0.5">
                      <svg
                        className="w-5 h-5"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 002-2H5a2 2 0 0-2 2v10a2 2 0 002 2z"
                        />
                      </svg>
                    </div>
                    <div>
                      <h3 className="text-xs font-bold text-[var(--td-text-muted)] uppercase tracking-wider">
                        Email Inquiry
                      </h3>
                      <a
                        href="mailto:tuduluugandalimited@gmail.com"
                        className="text-[var(--td-color-primary)] hover:underline text-sm sm:text-base mt-0.5 block font-semibold transition-colors break-all"
                      >
                        tuduluugandalimited@gmail.com
                      </a>
                    </div>
                  </div>

                  {/* Phone */}
                  <div className="flex items-start space-x-4 pt-4 border-t border-[var(--td-border-subtle)]">
                    <div className="p-3 bg-[var(--td-color-gold-light)] text-[var(--td-color-gold)] rounded-[var(--td-radius-md)] shrink-0 mt-0.5">
                      <svg
                        className="w-5 h-5"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                        />
                      </svg>
                    </div>
                    <div>
                      <h3 className="text-xs font-bold text-[var(--td-text-muted)] uppercase tracking-wider">
                        Phone / WhatsApp
                      </h3>
                      <a
                        href="tel:+256750692621"
                        className="text-[var(--td-color-primary)] hover:underline text-sm sm:text-base mt-0.5 block font-semibold transition-colors"
                      >
                        +256 750 692 621
                      </a>
                    </div>
                  </div>
                </Card>

                {/* Direct Support Note */}
                <Card className="p-8 bg-[var(--td-bg-dark)] text-white border-0 rounded-[var(--td-radius-lg)] shadow-[var(--td-shadow-md)] space-y-2 relative overflow-hidden">
                  <div className="absolute inset-0 td-glow-dark opacity-30 pointer-events-none" />
                  <div className="relative z-10 space-y-2">
                    <h3 className="text-base font-bold text-slate-100">
                      Looking for Partnerships?
                    </h3>
                    <p className="text-slate-300 text-xs sm:text-sm leading-relaxed">
                      We actively collaborate with healthcare organizations,
                      research groups, and government stakeholders. Send us a
                      detailed note to discuss technical integration or field
                      pilot initiatives.
                    </p>
                  </div>
                </Card>
              </div>

              {/* Right Column: Client Form Component */}
              <div className="lg:col-span-7">
                <Card className="td-card p-8">
                  <ContactForm />
                </Card>
              </div>
            </div>
          </Container>
        </Section>
      </main>
    </div>
  );
}
