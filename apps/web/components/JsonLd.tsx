// components/JsonLd.tsx
import { SITE_CONFIG } from "@/constants/siteConfig";

interface JsonLdProps {
  data?: Record<string, any>;
}

export default function JsonLd({ data }: JsonLdProps) {
  const defaultSchema = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: SITE_CONFIG.name,
    legalName: SITE_CONFIG.legalName,
    description: SITE_CONFIG.description,
    foundingDate: SITE_CONFIG.companyDetails.founded,
    industry: SITE_CONFIG.companyDetails.industry,
    email: SITE_CONFIG.contact.email,
    address: {
      "@type": "PostalAddress",
      addressLocality: "Kampala",
      addressCountry: SITE_CONFIG.companyDetails.country,
    },
    telephone: SITE_CONFIG.contact.phones[0]?.raw,
    sameAs: SITE_CONFIG.socials?.map((s) => s.href) || [],
  };

  const schemaToRender = data || defaultSchema;

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaToRender) }}
    />
  );
}
