/**
 * Server component — renders JSON-LD schemas specific to the home page.
 */
import { StructuredData } from './structured-data';
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
};

const faqSchema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: translations.en.faq.items.map((item) => ({
    '@type': 'Question',
    name: item.q,
    acceptedAnswer: {
      '@type': 'Answer',
      text: item.a,
    },
  })),
};

export function HomeJsonLd() {
  return (
    <>
      <StructuredData data={homeWebPageSchema} />
      <StructuredData data={faqSchema} />
    </>
  );
}
