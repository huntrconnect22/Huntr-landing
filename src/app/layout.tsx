import type { Metadata } from 'next';
import { Lato, Montserrat } from 'next/font/google';
import './globals.css';
import { ClientProviders } from '@/components/client-providers';
import { StructuredData } from '@/components/seo/structured-data';
import { translations } from '@/lib/translations';

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

export const metadata: Metadata = {
  metadataBase: new URL(defaultUrl),
  title: {
    default: translations.en.metadata.title,
    template: `%s | Huntr`,
  },
  description: translations.en.metadata.description,
  keywords: ['e-procurement', 'e-supply chain', 'spend analysis', 'huntr pay', 'b2b procurement', 'platform pengadaan', 'rantai pasok digital', 'huntr.id'],
  openGraph: {
    title: {
      default: translations.en.metadata.title,
      template: `%s | Huntr`,
    },
    description: translations.en.metadata.description,
    url: defaultUrl,
    siteName: 'Huntr',
    locale: 'en_US',
    alternateLocale: ['id_ID'],
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: {
      default: translations.en.metadata.title,
      template: `%s | Huntr`,
    },
    description: translations.en.metadata.description,
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

const organizationSchema = {
  "@context": "https://schema.org",
  "@type": "Organization",
  "name": "Huntr",
  "url": "https://huntr.id",
  "logo": "https://huntr.id/huntr-logo.png",
  "contactPoint": {
    "@type": "ContactPoint",
    "telephone": "+62-21-555-0123",
    "contactType": "Customer Service",
    "areaServed": "ID",
    "availableLanguage": ["English", "Indonesian"]
  }
};

const websiteSchema = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "url": "https://huntr.id/",
    "potentialAction": {
      "@type": "SearchAction",
      "target": {
        "@type": "EntryPoint",
        "urlTemplate": "https://huntr.id/search?q={search_term_string}"
      },
      "query-input": "required name=search_term_string"
    }
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${lato.variable} ${montserrat.variable} !scroll-smooth`}>
      <head>
        <StructuredData data={organizationSchema} />
        <StructuredData data={websiteSchema} />
      </head>
      <body className="font-body antialiased">
        <ClientProviders>
          {children}
        </ClientProviders>
      </body>
    </html>
  );
}
