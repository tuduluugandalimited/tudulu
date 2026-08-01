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
    <div className="min-h-screen bg-slate-50 text-slate-900 flex flex-col font-sans selection:bg-sky-500 selection:text-white">
      <main className="flex-1">
        {/* Header / Hero Section */}
        <Section
          spacing="lg"
          className="relative overflow-hidden bg-white border-b border-slate-100 py-16 sm:py-20"
        >
          <div className="absolute inset-0 bg-[linear-gradient(to_right,#e2e8f015_1px,transparent_1px),linear-gradient(to_bottom,#e2e8f015_1px,transparent_1px)] bg-[size:4rem_4rem] pointer-events-none" />
          <Container size="md" className="relative z-10 text-center space-y-4">
            <Badge variant="emerald">Get In Touch</Badge>

            <h1 className="text-4xl sm:text-5xl font-extrabold text-slate-900 tracking-tight">
              Contact Tudulu Uganda Limited
            </h1>

            <p className="text-base sm:text-lg text-slate-600 max-w-2xl mx-auto leading-relaxed font-normal">
              Have questions about our digital health systems, field data
              platforms, or technical partnerships? Reach out directly to our
              team.
            </p>
          </Container>
        </Section>

        {/* Contact Form & Information Grid */}
        <Section spacing="lg" className="py-12 sm:py-16">
          <Container size="lg">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
              {/* Left Column: Direct Info Cards */}
              <div className="lg:col-span-5 space-y-4">
                <Card className="p-6 bg-white border border-slate-200 shadow-xs space-y-6">
                  <h2 className="text-lg font-bold text-slate-900 border-b border-slate-100 pb-3">
                    Contact Details
                  </h2>

                  {/* Office Location */}
                  <div className="flex items-start space-x-4">
                    <div className="p-2.5 bg-slate-100 text-slate-700 rounded-lg shrink-0 mt-0.5">
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
                      <h3 className="text-xs font-bold text-slate-500 uppercase tracking-wider">
                        Headquarters
                      </h3>
                      <p className="text-slate-900 text-sm mt-0.5 font-semibold">
                        Kampala, Uganda
                      </p>
                    </div>
                  </div>

                  {/* Email */}
                  <div className="flex items-start space-x-4 pt-2 border-t border-slate-100">
                    <div className="p-2.5 bg-sky-50 text-sky-600 rounded-lg shrink-0 mt-0.5">
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
                      <h3 className="text-xs font-bold text-slate-500 uppercase tracking-wider">
                        Email Inquiry
                      </h3>
                      <a
                        href="mailto:tuduluugandalimited@gmail.com"
                        className="text-sky-600 hover:text-sky-700 hover:underline text-sm mt-0.5 block font-semibold transition-colors break-all"
                      >
                        tuduluugandalimited@gmail.com
                      </a>
                    </div>
                  </div>

                  {/* Phone */}
                  <div className="flex items-start space-x-4 pt-2 border-t border-slate-100">
                    <div className="p-2.5 bg-emerald-50 text-emerald-600 rounded-lg shrink-0 mt-0.5">
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
                      <h3 className="text-xs font-bold text-slate-500 uppercase tracking-wider">
                        Phone / WhatsApp
                      </h3>
                      <a
                        href="tel:+256750692621"
                        className="text-sky-600 hover:text-sky-700 hover:underline text-sm mt-0.5 block font-semibold transition-colors"
                      >
                        +256 750 692 621
                      </a>
                    </div>
                  </div>
                </Card>

                {/* Direct Support Note */}
                <Card className="p-6 bg-slate-900 text-white border-0 shadow-xs">
                  <h3 className="text-sm font-bold text-slate-100 mb-1">
                    Looking for Partnerships?
                  </h3>
                  <p className="text-slate-400 text-xs leading-relaxed">
                    We actively collaborate with healthcare organizations,
                    research groups, and government stakeholders. Send us a
                    detailed note to discuss technical integration or field
                    pilot initiatives.
                  </p>
                </Card>
              </div>

              {/* Right Column: Client Form Component */}
              <div className="lg:col-span-7">
                <ContactForm />
              </div>
            </div>
          </Container>
        </Section>
      </main>
    </div>
  );
}
