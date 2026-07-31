import type { Metadata } from 'next';
import { StructuredData } from '@/components/seo/structured-data';
import { translations } from '@/lib/translations';

const pageUrl = 'https://huntr.id/privacy-policy';
const ogImageUrl = '/og-image.jpg';
const t = translations.en.privacyPolicy;

export const metadata: Metadata = {
  title: t.seoTitle,
  description: t.seoDescription,
  keywords: t.seoKeywords,
  alternates: { canonical: '/privacy-policy' },
  // Privacy policy should not be indexed by alternative scrapers but still by Google
  robots: { index: true, follow: false },
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
      { '@type': 'ListItem', position: 2, name: 'Privacy Policy', item: pageUrl },
    ],
  },
};

export default function PrivacyPolicyLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <StructuredData data={webPageSchema} />
      {children}
    </>
  );
}
