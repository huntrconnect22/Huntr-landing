import type { Metadata, Viewport } from 'next';
import './globals.css';
import { ClientProviders } from '@/components/client-providers';
import { StructuredData } from '@/components/seo/structured-data';
import { translations } from '@/lib/translations';

const defaultUrl = 'https://huntr.id';
const ogImageUrl = '/assets/img/logo-dark.png';

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  themeColor: '#f7f5f0',
};

export const metadata: Metadata = {
  metadataBase: new URL(defaultUrl),
  title: translations.en.metadata.title,
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
    title: translations.en.metadata.title,
    description: translations.en.metadata.description,
    url: defaultUrl,
    siteName: 'HUNTR',
    images: [
      {
        url: ogImageUrl,
        width: 384,
        height: 71,
        alt: 'HUNTR — B2B Procurement Platform',
      },
    ],
    locale: 'en_US',
    alternateLocale: ['id_ID'],
    type: 'website',
  },
  twitter: {
    card: 'summary',
    site: '@huntr_id',
    creator: '@huntr_id',
    title: translations.en.metadata.title,
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
    url: `${defaultUrl}/assets/img/logo-dark.png`,
    width: 384,
    height: 71,
  },
  sameAs: [
    'https://www.linkedin.com/company/huntr-id',
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
};

const softwareAppSchema = {
  '@context': 'https://schema.org',
  '@type': 'SoftwareApplication',
  name: 'HUNTR',
  operatingSystem: 'Web',
  applicationCategory: 'BusinessApplication',
  description: translations.en.metadata.description,
  url: `${defaultUrl}/`,
  publisher: {
    '@id': `${defaultUrl}/#organization`,
  },
  featureList: [
    'Strategic Sourcing Technology',
    'Supplier Discovery & RFQ Management',
    'B2B Product Marketplace',
    'Digital Procurement Tools & Agentic Procurement',
    'Vendor & Contract Management',
    'HUNTR Pay — Transaction Support',
  ],
  applicationSubCategory: 'B2B Procurement Platform',
  inLanguage: ['en-US', 'id-ID'],
};

// ────────────────────────────────────────────────────────────────────────────

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <head>
        {/* Google Tag Manager */}
        <script
          id="gtm-script"
          dangerouslySetInnerHTML={{
            __html: `(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
})(window,document,'script','dataLayer','GTM-NTGS9G8H');`,
          }}
        />
        {/* End Google Tag Manager */}
        <StructuredData data={organizationSchema} />
        <StructuredData data={websiteSchema} />
        <StructuredData data={softwareAppSchema} />
      </head>
      <body className="antialiased">
        {/* Google Tag Manager (noscript) */}
        <noscript>
          <iframe
            src="https://www.googletagmanager.com/ns.html?id=GTM-NTGS9G8H"
            height="0"
            width="0"
            style={{ display: 'none', visibility: 'hidden' }}
          />
        </noscript>
        {/* End Google Tag Manager (noscript) */}
        <ClientProviders>{children}</ClientProviders>
      </body>
    </html>
  );
}
