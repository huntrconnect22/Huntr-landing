// Server component — enables static metadata export and server-side JSON-LD injection.
import { HomeClient } from '@/components/home-client';
import { HomeJsonLd } from '@/components/seo/home-jsonld';

export default function Home() {
  return (
    <>
      <HomeJsonLd />
      <HomeClient />
    </>
  );
}
