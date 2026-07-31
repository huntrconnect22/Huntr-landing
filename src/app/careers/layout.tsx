import type { Metadata } from 'next';
import { StructuredData } from '@/components/seo/structured-data';
import { translations } from '@/lib/translations';

const pageUrl = 'https://huntr.id/careers';
const ogImageUrl = '/og-image.jpg';
const t = translations.en.careers;

export const metadata: Metadata = {
  title: t.seoTitle,
  description: t.seoDescription,
  keywords: t.seoKeywords,
  alternates: { canonical: '/careers' },
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
      { '@type': 'ListItem', position: 2, name: 'Careers', item: pageUrl },
    ],
  },
};

const jobPostingSchema = {
  '@context': 'https://schema.org',
  '@type': 'JobPosting',
  title: 'Open Positions at HUNTR',
  description:
    'HUNTR is hiring talented individuals to help build the future of B2B procurement technology in Indonesia.',
  hiringOrganization: {
    '@type': 'Organization',
    '@id': 'https://huntr.id/#organization',
    name: 'HUNTR',
    sameAs: 'https://huntr.id',
  },
  jobLocation: {
    '@type': 'Place',
    address: { '@type': 'PostalAddress', addressCountry: 'ID' },
  },
  employmentType: 'FULL_TIME',
  datePosted: '2025-01-01',
  validThrough: '2026-12-31',
};

export default function CareersLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <StructuredData data={webPageSchema} />
      <StructuredData data={jobPostingSchema} />
      {children}
    </>
  );
}
