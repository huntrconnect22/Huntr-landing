/**
 * Server component — renders JSON-LD schemas specific to the home page.
 */
import { StructuredData } from './structured-data';
import { DEMO_URL } from '@/lib/api-config';
import { translations } from '@/lib/translations';

const baseUrl = 'https://huntr.id';
const meta = translations.en.metadata;

const homeWebPageSchema = {
  '@context': 'https://schema.org',
  '@type': 'WebPage',
  '@id': `${baseUrl}/#webpage`,
  name: meta.title,
  description: meta.description,
  url: `${baseUrl}/`,
  inLanguage: ['en-US', 'id-ID'],
  isPartOf: { '@type': 'WebSite', '@id': `${baseUrl}/#website` },
  about: { '@type': 'Organization', '@id': `${baseUrl}/#organization` },
  breadcrumb: {
    '@type': 'BreadcrumbList',
    '@id': `${baseUrl}/#breadcrumb`,
    itemListElement: [
      {
        '@type': 'ListItem',
        position: 1,
        name: 'Home',
        item: `${baseUrl}/`,
      },
    ],
  },
  potentialAction: [
    {
      '@type': 'RegisterAction',
      '@id': `${baseUrl}/#create-demo-account`,
      name: meta.demoTitle,
      description: meta.demoDescription,
      target: {
        '@type': 'EntryPoint',
        urlTemplate: DEMO_URL,
        actionPlatform: [
          'http://schema.org/DesktopWebPlatform',
          'http://schema.org/MobileWebPlatform',
        ],
      },
    },
  ],
};

const demoOfferSchema = {
  '@context': 'https://schema.org',
  '@type': 'Offer',
  '@id': `${baseUrl}/#demo-offer`,
  name: meta.demoTitle,
  description: meta.demoDescription,
  url: DEMO_URL,
  price: '0',
  priceCurrency: 'IDR',
  availability: 'https://schema.org/InStock',
  eligibleCustomerType: 'Business',
  offeredBy: { '@type': 'Organization', '@id': `${baseUrl}/#organization` },
};

const faqSchema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
    {
      '@type': 'Question',
      name: 'How do I create a free HUNTR demo account?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Visit demo.huntr.id and click Create Demo Account. You get instant access to explore e-procurement, supply chain, and spend analytics — no credit card required.',
      },
    },
    {
      '@type': 'Question',
      name: 'How secure is our data on HUNTR?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'HUNTR uses end-to-end data encryption and advanced cloud infrastructure with layered security protocols. All sensitive data between buyers and sellers is isolated and only accessible by authorized parties.',
      },
    },
    {
      '@type': 'Question',
      name: 'What makes HUNTR different from other e-procurement platforms?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Our integrated Strategic Sourcing Technology unifies the entire demand and supply chain on a single platform, focusing on process efficiency and automatically matching buyers with the best sellers.',
      },
    },
    {
      '@type': 'Question',
      name: 'How long does it take to start using HUNTR?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'HUNTR is cloud-based with an intuitive interface, so your company can be integrated and operating in a matter of days without any hardware installation.',
      },
    },
    {
      '@type': 'Question',
      name: 'Can HUNTR handle high transaction volumes?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Yes. Our highly scalable cloud architecture ensures the platform grows with your business, maintaining fast and stable performance regardless of transaction volume.',
      },
    },
    {
      '@type': 'Question',
      name: 'Is HUNTR accessible from mobile devices?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Yes, HUNTR is mobile-ready. You can manage procurement approvals and check supply status from any smartphone or tablet with an internet connection.',
      },
    },
  ],
};

export function HomeJsonLd() {
  return (
    <>
      <StructuredData data={homeWebPageSchema} />
      <StructuredData data={demoOfferSchema} />
      <StructuredData data={faqSchema} />
    </>
  );
}
