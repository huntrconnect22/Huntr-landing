import type { Metadata } from 'next';
import { StructuredData } from '@/components/seo/structured-data';
import { translations } from '@/lib/translations';

const pageUrl = 'https://huntr.id/use-case';
const ogImageUrl = '/og-image.jpg';
const t = translations.en.useCase;

export const metadata: Metadata = {
  title: t.seoTitle,
  description: t.seoDescription,
  keywords: t.seoKeywords,
  alternates: { canonical: '/use-case' },
  openGraph: {
    title: t.seoTitle,
    description: t.seoDescription,
    url: pageUrl,
    siteName: 'HUNTR',
    images: [{ url: ogImageUrl, width: 1200, height: 630, alt: t.seoTitle }],
    locale: 'en_US',
    alternateLocale: ['id_ID'],
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: t.seoTitle,
    description: t.seoDescription,
    images: [ogImageUrl],
  },
};

const webPageSchema = {
  '@context': 'https://schema.org',
  '@type': 'WebPage',
  name: t.seoTitle,
  description: t.seoDescription,
  url: pageUrl,
  inLanguage: ['en-US', 'id-ID'],
  isPartOf: { '@type': 'WebSite', name: 'HUNTR', url: 'https://huntr.id/' },
  breadcrumb: {
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://huntr.id/' },
      { '@type': 'ListItem', position: 2, name: 'Use Case', item: pageUrl },
    ],
  },
};

const serviceSchema = {
  '@context': 'https://schema.org',
  '@type': 'Service',
  name: 'HUNTR Integrated Business Platform',
  serviceType: 'B2B Procurement Solutions',
  description:
    'HUNTR provides integrated B2B solutions including E-Procurement, E-Supply Chain management, and secure B2B payments through HUNTR Pay.',
  url: pageUrl,
  provider: {
    '@type': 'Organization',
    '@id': 'https://huntr.id/#organization',
    name: 'HUNTR',
  },
  areaServed: { '@type': 'Country', name: 'Indonesia' },
  hasOfferCatalog: {
    '@type': 'OfferCatalog',
    name: 'HUNTR Services',
    itemListElement: [
      { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'E-Procurement System' } },
      { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'E-Supply Chain Management' } },
      { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'HUNTR Pay — Secure B2B Payments' } },
    ],
  },
};

export default function UseCaseLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <StructuredData data={webPageSchema} />
      <StructuredData data={serviceSchema} />
      {children}
    </>
  );
}
