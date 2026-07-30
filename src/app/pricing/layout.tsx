import type { Metadata } from 'next';
import { StructuredData } from '@/components/seo/structured-data';
import { translations } from '@/lib/translations';

const pageUrl = 'https://huntr.id/pricing';
const ogImageUrl = 'https://images.unsplash.com/photo-1497366811353-6870744d04b2?crop=entropy&cs=tinysrgb&fit=crop&fm=jpg&ixid=M3w3NDE5ODJ8MHwxfHNlYXJjaHwxfHxtb2Rlcm4lMjBvZmZpY2V8ZW58MHx8fHwxNzY5NTUxNDUzfDA&ixlib=rb-4.1.0&q=80&w=1200&h=630';

export const metadata: Metadata = {
  title: translations.en.pricing.seoTitle,
  description: translations.en.pricing.seoDescription,
  keywords: translations.en.pricing.seoKeywords,
  alternates: {
    canonical: '/pricing',
  },
  openGraph: {
    title: translations.en.pricing.seoTitle,
    description: translations.en.pricing.seoDescription,
    url: pageUrl,
    siteName: 'HUNTR',
    images: [
      {
        url: ogImageUrl,
        width: 1200,
        height: 630,
        alt: 'HUNTR Pricing and Platform Fee',
      },
    ],
    locale: 'en_US',
    alternateLocale: ['id_ID'],
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: translations.en.pricing.seoTitle,
    description: translations.en.pricing.seoDescription,
    images: [ogImageUrl],
  },
};

const pricingWebPageSchema = {
  '@context': 'https://schema.org',
  '@type': 'WebPage',
  name: 'HUNTR Pricing & Platform Fee',
  description: translations.en.pricing.seoDescription,
  url: pageUrl,
  inLanguage: 'en',
  isPartOf: {
    '@type': 'WebSite',
    name: 'HUNTR',
    url: 'https://huntr.id/',
  },
  about: {
    '@type': 'Service',
    name: 'HUNTR Platform Fee Pricing',
    serviceType: 'B2B Procurement Platform Pricing',
  },
};

const pricingServiceSchema = {
  '@context': 'https://schema.org',
  '@type': 'Service',
  name: 'HUNTR Platform Fee Pricing',
  serviceType: 'B2B Procurement Platform Pricing',
  description:
    'HUNTR offers a 14-day free trial followed by tiered platform fees of 5%, 3%, and 2%, charged only on successful transactions.',
  provider: {
    '@type': 'Organization',
    name: 'HUNTR',
    url: 'https://huntr.id',
    email: 'support@huntr.id',
  },
  areaServed: {
    '@type': 'Country',
    name: 'Indonesia',
  },
  hasOfferCatalog: {
    '@type': 'OfferCatalog',
    name: 'HUNTR Platform Fee Tiers',
    itemListElement: [
      {
        '@type': 'Offer',
        name: '14-Day Free Trial',
        description: 'Free trial for 14 calendar days starting from successful account registration.',
        itemOffered: {
          '@type': 'Service',
          name: 'HUNTR Free Trial',
        },
      },
      {
        '@type': 'Offer',
        name: 'Platform Fee 5%',
        description: '5% service fee for successful transactions from Rp0 to Rp100,000,000.',
        itemOffered: {
          '@type': 'Service',
          name: 'Successful Transaction Platform Fee',
        },
      },
      {
        '@type': 'Offer',
        name: 'Platform Fee 3%',
        description: '3% service fee for successful transactions from Rp100,000,001 to Rp250,000,000.',
        itemOffered: {
          '@type': 'Service',
          name: 'Successful Transaction Platform Fee',
        },
      },
      {
        '@type': 'Offer',
        name: 'Platform Fee 2%',
        description: '2% service fee for successful transactions above Rp250,000,000.',
        itemOffered: {
          '@type': 'Service',
          name: 'Successful Transaction Platform Fee',
        },
      },
    ],
  },
};

export default function PricingLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <StructuredData data={pricingWebPageSchema} />
      <StructuredData data={pricingServiceSchema} />
      {children}
    </>
  );
}
