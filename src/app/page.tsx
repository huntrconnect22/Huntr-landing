// Server component — enables static metadata export and server-side JSON-LD injection.
import type { Metadata } from 'next';
import { HomeClient } from '@/components/home-client';
import { HomeJsonLd } from '@/components/seo/home-jsonld';
import { translations } from '@/lib/translations';

const meta = translations.en.metadata;

export const metadata: Metadata = {
  title: meta.title,
  description: meta.description,
  keywords: `${meta.keywords}, ${meta.demoKeywords}`,
  alternates: {
    canonical: '/',
  },
  openGraph: {
    title: meta.title,
    description: meta.description,
    url: 'https://huntr.id/',
    type: 'website',
  },
  twitter: {
    title: meta.title,
    description: meta.description,
  },
};

export default function Home() {
  return (
    <>
      <HomeJsonLd />
      <HomeClient />
    </>
  );
}
