import type { Metadata } from 'next';
import { StructuredData } from '@/components/seo/structured-data';

const pageUrl = 'https://huntr.id/rfq';
const ogImageUrl = '/og-image.jpg';

// ── SEO Metadata ──────────────────────────────────────────────────────────────

export const metadata: Metadata = {
  title: 'Daftar Tender & RFQ Terbuka — Papan Pengadaan Publik',
  description:
    'Temukan semua Request for Quotation (RFQ) terbuka dari perusahaan buyer di platform Huntr. Daftar sebagai vendor dan kirimkan penawaran harga terbaik Anda untuk memenangkan tender pengadaan B2B.',
  keywords: [
    'RFQ tender terbuka Indonesia',
    'daftar pengadaan perusahaan',
    'tender vendor Indonesia',
    'request for quotation publik',
    'pengadaan B2B Huntr',
    'papan tender online',
    'mencari vendor pengadaan',
    'tender barang dan jasa',
    'vendor RFQ Indonesia',
    'e-procurement tender',
  ].join(', '),
  alternates: {
    canonical: '/rfq',
  },
  openGraph: {
    title: 'Daftar Tender & RFQ Terbuka — Huntr Procurement Board',
    description:
      'Jelajahi semua RFQ (Request for Quotation) terbuka di platform Huntr. Daftar sebagai vendor dan kirimkan penawaran untuk memenangkan pengadaan perusahaan-perusahaan buyer.',
    url: pageUrl,
    siteName: 'HUNTR',
    images: [
      {
        url: ogImageUrl,
        width: 1200,
        height: 630,
        alt: 'Daftar Tender & RFQ Terbuka — Huntr Papan Pengadaan',
      },
    ],
    locale: 'id_ID',
    alternateLocale: ['en_US'],
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Daftar Tender & RFQ Terbuka — Huntr',
    description:
      'Temukan semua pengadaan terbuka di platform Huntr. Daftar vendor dan tawarkan harga terbaik Anda.',
    images: [ogImageUrl],
  },
};

// ── JSON-LD Schemas ───────────────────────────────────────────────────────────

const webPageSchema = {
  '@context': 'https://schema.org',
  '@type': 'WebPage',
  '@id': `${pageUrl}#webpage`,
  name: 'Daftar Tender & RFQ Terbuka — Huntr Papan Pengadaan',
  description:
    'Temukan semua Request for Quotation (RFQ) terbuka dari perusahaan buyer di platform Huntr. Daftar sebagai vendor dan kirimkan penawaran Anda.',
  url: pageUrl,
  inLanguage: 'id-ID',
  isPartOf: {
    '@type': 'WebSite',
    name: 'HUNTR',
    url: 'https://huntr.id/',
  },
  breadcrumb: {
    '@type': 'BreadcrumbList',
    itemListElement: [
      {
        '@type': 'ListItem',
        position: 1,
        name: 'Beranda',
        item: 'https://huntr.id/',
      },
      {
        '@type': 'ListItem',
        position: 2,
        name: 'Daftar RFQ',
        item: pageUrl,
      },
    ],
  },
};

const serviceSchema = {
  '@context': 'https://schema.org',
  '@type': 'Service',
  '@id': `${pageUrl}#service`,
  name: 'Papan Tender & RFQ Publik Huntr',
  serviceType: 'B2B Procurement Tender Board',
  description:
    'Platform papan tender publik Huntr menghubungkan perusahaan buyer yang membutuhkan barang/jasa dengan vendor-vendor terverifikasi di seluruh Indonesia melalui proses Request for Quotation (RFQ) yang transparan.',
  url: pageUrl,
  provider: {
    '@type': 'Organization',
    name: 'HUNTR',
    url: 'https://huntr.id',
    email: 'support@huntr.id',
    logo: {
      '@type': 'ImageObject',
      url: 'https://huntr.id/huntr-logo.png',
    },
  },
  areaServed: {
    '@type': 'Country',
    name: 'Indonesia',
  },
  hasOfferCatalog: {
    '@type': 'OfferCatalog',
    name: 'Daftar RFQ Terbuka',
    description: 'Kumpulan Request for Quotation dari perusahaan-perusahaan buyer aktif di platform Huntr.',
  },
  audience: {
    '@type': 'Audience',
    audienceType: 'Vendor, Supplier, B2B Seller',
    geographicArea: {
      '@type': 'Country',
      name: 'Indonesia',
    },
  },
};

const faqSchema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
    {
      '@type': 'Question',
      name: 'Apa itu RFQ (Request for Quotation) di Huntr?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'RFQ (Request for Quotation) adalah permintaan penawaran harga yang dibuat oleh perusahaan buyer di platform Huntr. Buyer membuat RFQ dengan menyebutkan barang atau jasa yang dibutuhkan, dan vendor dapat merespons dengan mengirimkan penawaran harga mereka.',
      },
    },
    {
      '@type': 'Question',
      name: 'Bagaimana cara merespons RFQ sebagai vendor di Huntr?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Untuk merespons RFQ, daftarkan perusahaan Anda sebagai vendor di Huntr (app.huntr.id/register), lalu login dan kirimkan proposal penawaran harga untuk RFQ yang Anda minati. Proses seleksi dilakukan secara transparan oleh buyer.',
      },
    },
    {
      '@type': 'Question',
      name: 'Apakah ada biaya untuk berpartisipasi dalam tender di Huntr?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Huntr menawarkan trial 14 hari gratis. Setelah itu, platform fee hanya dikenakan pada transaksi yang berhasil (success-based fee), bukan biaya langganan bulanan atau biaya pendaftaran.',
      },
    },
    {
      '@type': 'Question',
      name: 'Siapa yang bisa membuat RFQ di Huntr?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'RFQ dapat dibuat oleh perusahaan yang terdaftar sebagai buyer di platform Huntr. Proses persetujuan RFQ melibatkan manajer pembelian internal untuk memastikan transparansi dan akuntabilitas.',
      },
    },
  ],
};

// ─────────────────────────────────────────────────────────────────────────────

export default function RfqLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <StructuredData data={webPageSchema} />
      <StructuredData data={serviceSchema} />
      <StructuredData data={faqSchema} />
      {children}
    </>
  );
}
