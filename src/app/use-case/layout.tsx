import { StructuredData } from '@/components/seo/structured-data';

const serviceSchema = {
  "@context": "https://schema.org",
  "@type": "Service",
  "serviceType": "B2B Procurement Solutions",
  "provider": {
    "@type": "Organization",
    "name": "Huntr"
  },
  "areaServed": {
    "@type": "Country",
    "name": "ID"
  },
  "description": "Huntr provides integrated B2B solutions including E-Procurement, E-Supply Chain management, and secure B2B payments through HUNTR Pay.",
  "name": "Huntr Integrated Business Platform",
  "hasOfferCatalog": {
    "@type": "OfferCatalog",
    "name": "Huntr Services",
    "itemListElement": [
      {
        "@type": "Offer",
        "itemOffered": {
          "@type": "Service",
          "name": "E-Procurement System"
        }
      },
      {
        "@type": "Offer",
        "itemOffered": {
          "@type": "Service",
          "name": "E-Supply Chain Management"
        }
      },
      {
        "@type": "Offer",
        "itemOffered": {
          "@type": "Service",
          "name": "HUNTR Pay - Secure B2B Payments"
        }
      }
    ]
  }
};


export default function UseCaseLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <StructuredData data={serviceSchema} />
      {children}
    </>
  );
}
