import { Metadata } from "next";
import ContactForm from "@/components/ContactForm";
import { Card } from "@/components/ui/Card";
import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";

export const metadata: Metadata = {
  title: "Contact Us | Tudulu Uganda Limited",
  description:
    "Reach out to Tudulu Uganda Limited for inquiries regarding digital health systems, field data platforms, or technical partnerships.",
};

async function getContactInfo() {
  try {
    const apiUrl =
      process.env.API_URL ||
      process.env.NEXT_PUBLIC_API_URL ||
      "http://localhost:3001";
    const res = await fetch(`${apiUrl}/contact-info`, {
      next: { revalidate: 3600 }, // Cache for 1 hour instead of blocking every render
    });
    if (!res.ok) throw new Error("Failed to fetch contact details");
    return res.json();
  } catch {
    return {
      headquarters: "Kampala, Uganda",
      email: "tuduluugandalimited@gmail.com",
      phone: "+256 750 692 621",
    };
  }
}

export default async function ContactPage() {
  const contact = await getContactInfo();

  return (
    <div className="min-h-screen bg-[var(--td-bg-soft)] text-[var(--td-text)] flex flex-col font-sans">
      <main className="flex-1">
        <Section
          spacing="lg"
          className="relative overflow-hidden bg-[var(--td-bg)] border-b border-[var(--td-border-subtle)] py-20 sm:py-28"
        >
          <div className="absolute inset-0 td-glow-hero pointer-events-none" />
          <Container size="md" className="relative z-10 text-center space-y-4">
            <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight">
              Contact{" "}
              <span className="td-gradient-text">Tudulu Uganda Limited</span>
            </h1>
            <p className="text-base sm:text-lg text-[var(--td-text-light)] max-w-2xl mx-auto leading-relaxed">
              Have questions about our digital health systems, field data
              platforms, or technical partnerships? Reach out directly to our
              team.
            </p>
          </Container>
        </Section>

        <Section spacing="lg" className="py-16 sm:py-20 bg-[var(--td-bg-soft)]">
          <Container size="lg">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
              <div className="lg:col-span-5 space-y-6">
                <Card className="td-card p-8 space-y-6">
                  <h2 className="text-lg font-bold border-b border-[var(--td-border-subtle)] pb-4">
                    Contact Details
                  </h2>

                  {/* Headquarters */}
                  <div className="flex items-start space-x-4">
                    <div>
                      <h3 className="text-xs font-bold text-[var(--td-text-muted)] uppercase tracking-wider">
                        Headquarters
                      </h3>
                      <p className="text-[var(--td-text)] text-sm sm:text-base mt-0.5 font-semibold">
                        {contact.headquarters}
                      </p>
                    </div>
                  </div>

                  {/* Email */}
                  <div className="flex items-start space-x-4 pt-4 border-t border-[var(--td-border-subtle)]">
                    <div>
                      <h3 className="text-xs font-bold text-[var(--td-text-muted)] uppercase tracking-wider">
                        Email Inquiry
                      </h3>
                      <a
                        href={`mailto:${contact.email}`}
                        className="text-[var(--td-color-primary)] hover:underline text-sm sm:text-base mt-0.5 block font-semibold break-all"
                      >
                        {contact.email}
                      </a>
                    </div>
                  </div>

                  {/* Phone */}
                  <div className="flex items-start space-x-4 pt-4 border-t border-[var(--td-border-subtle)]">
                    <div>
                      <h3 className="text-xs font-bold text-[var(--td-text-muted)] uppercase tracking-wider">
                        Phone / WhatsApp
                      </h3>
                      <a
                        href={`tel:${contact.phone.replace(/\s+/g, "")}`}
                        className="text-[var(--td-color-primary)] hover:underline text-sm sm:text-base mt-0.5 block font-semibold"
                      >
                        {contact.phone}
                      </a>
                    </div>
                  </div>
                </Card>
              </div>

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
