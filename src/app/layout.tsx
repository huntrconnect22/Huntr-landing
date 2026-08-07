import type { Metadata, Viewport } from 'next';
import { Lato, Montserrat } from 'next/font/google';
import './globals.css';
import { ClientProviders } from '@/components/client-providers';
import { StructuredData } from '@/components/seo/structured-data';
import { translations } from '@/lib/translations';
import { DEMO_URL } from '@/lib/api-config';

const lato = Lato({
  subsets: ['latin'],
  weight: ['400', '700', '900'],
  variable: '--font-lato',
});

const montserrat = Montserrat({
  subsets: ['latin'],
  weight: ['400', '500', '700'],
  variable: '--font-montserrat',
});

const defaultUrl = 'https://huntr.id';
// Self-hosted OG image — place a 1200×630 file at /public/og-image.jpg
const ogImageUrl = '/og-image.jpg';

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#ffffff' },
    { media: '(prefers-color-scheme: dark)', color: '#0a0a0a' },
  ],
};

export const metadata: Metadata = {
  metadataBase: new URL(defaultUrl),
  title: {
    default: translations.en.metadata.title,
    template: `%s | HUNTR`,
  },
  description: translations.en.metadata.description,
  keywords: translations.en.metadata.keywords,
  authors: [{ name: 'HUNTR', url: defaultUrl }],
  creator: 'HUNTR',
  publisher: 'HUNTR',
  alternates: {
    canonical: '/',
    languages: {
      'en-US': '/',
      'id-ID': '/',
    },
  },
  openGraph: {
    title: {
      default: translations.en.metadata.title,
      template: `%s | HUNTR`,
    },
    description: translations.en.metadata.description,
    url: defaultUrl,
    siteName: 'HUNTR',
    images: [
      {
        url: ogImageUrl,
        width: 1200,
        height: 630,
        alt: 'HUNTR — Integrated Business Platform',
      },
    ],
    locale: 'en_US',
    alternateLocale: ['id_ID'],
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    site: '@huntr_id',
    creator: '@huntr_id',
    title: {
      default: translations.en.metadata.title,
      template: `%s | HUNTR`,
    },
    description: translations.en.metadata.description,
    images: [ogImageUrl],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  verification: {
    // google: 'your-google-search-console-token',
    // yandex: 'your-yandex-token',
  },
};

// ── JSON-LD Schemas ──────────────────────────────────────────────────────────

const organizationSchema = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  '@id': `${defaultUrl}/#organization`,
  name: 'HUNTR',
  alternateName: ['huntr.id', 'HUNTR Platform', 'PT Huntr'],
  description: translations.en.metadata.description,
  url: defaultUrl,
  logo: {
    '@type': 'ImageObject',
    url: `${defaultUrl}/huntr-logo.png`,
    width: 200,
    height: 60,
  },
  sameAs: [
    'https://www.linkedin.com/company/huntr-id',
    'https://www.instagram.com/huntr.id',
  ],
  contactPoint: [
    {
      '@type': 'ContactPoint',
      email: 'support@huntr.id',
      contactType: 'customer support',
      areaServed: 'ID',
      availableLanguage: ['English', 'Indonesian'],
    },
  ],
  address: {
    '@type': 'PostalAddress',
    addressCountry: 'ID',
  },
};

const websiteSchema = {
  '@context': 'https://schema.org',
  '@type': 'WebSite',
  '@id': `${defaultUrl}/#website`,
  url: `${defaultUrl}/`,
  name: 'HUNTR',
  description: translations.en.metadata.description,
  publisher: {
    '@id': `${defaultUrl}/#organization`,
  },
  inLanguage: ['en-US', 'id-ID'],
  potentialAction: [
    {
      '@type': 'RegisterAction',
      name: translations.en.metadata.demoTitle,
      target: {
        '@type': 'EntryPoint',
        urlTemplate: DEMO_URL,
      },
    },
    {
      '@type': 'SearchAction',
      target: {
        '@type': 'EntryPoint',
        urlTemplate: `${defaultUrl}/search?q={search_term_string}`,
      },
      'query-input': 'required name=search_term_string',
    },
  ],
};

const softwareAppSchema = {
  '@context': 'https://schema.org',
  '@type': 'SoftwareApplication',
  name: 'HUNTR',
  operatingSystem: 'Web',
  applicationCategory: 'BusinessApplication',
  description:
    'A comprehensive B2B procurement platform offering e-procurement, e-supply chain, spend analysis, and secure payment solutions for enterprises in Indonesia.',
  url: `${defaultUrl}/`,
  downloadUrl: DEMO_URL,
  publisher: {
    '@id': `${defaultUrl}/#organization`,
  },
  offers: {
    '@type': 'Offer',
    price: '0',
    priceCurrency: 'IDR',
    url: DEMO_URL,
    description: 'Free demo account at demo.huntr.id — 14-day trial, then transaction-based platform fee.',
  },
  featureList: [
    'E-Procurement System',
    'E-Supply Chain Management',
    'Spend Analysis & Reporting',
    'HUNTR Pay — Secure B2B Payments',
    'Vendor Management',
    'Contract Management',
    'HUNTR Crowd Buy',
  ],
  applicationSubCategory: 'E-Procurement',
  inLanguage: ['en-US', 'id-ID'],
};

// ────────────────────────────────────────────────────────────────────────────

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${lato.variable} ${montserrat.variable} scroll-smooth`}
    >
      <head>
        <StructuredData data={organizationSchema} />
        <StructuredData data={websiteSchema} />
        <StructuredData data={softwareAppSchema} />
      </head>
      <body className="font-body antialiased">
        <ClientProviders>{children}</ClientProviders>
      </body>
    </html>
  );
}
