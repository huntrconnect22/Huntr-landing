'use client';

import { useContext } from 'react';
import { Header } from '@/components/layout/header';
import { Footer } from '@/components/layout/footer';
import { Hero } from '@/components/sections/hero';
import { Challenge } from '@/components/sections/challenge';
import { Journey } from '@/components/sections/journey';
import { Tenders } from '@/components/sections/tenders';
import { Marketplace } from '@/components/sections/marketplace';
import { Benefits } from '@/components/sections/benefits';
import { Capabilities } from '@/components/sections/capabilities';
import { Products } from '@/components/sections/products';
import { VendorBand } from '@/components/sections/vendor-band';
import { Pricing } from '@/components/sections/pricing';
import { About } from '@/components/sections/about';
import { Testimonials } from '@/components/sections/testimonials';
import { Faq } from '@/components/sections/faq';
import { Cta } from '@/components/sections/cta';
import { TalkModal } from '@/components/modal/talk-modal';
import { WhatsAppButton } from '@/components/layout/whatsapp-button';
import { LanguageContext } from '@/context/language-context';
import { translations } from '@/lib/translations';
import { useDynamicSeo } from '@/hooks/use-dynamic-seo';

export function HomeClient() {
  const context = useContext(LanguageContext);
  const lang = context?.language || 'en';

  useDynamicSeo({
    title: translations[lang].metadata.title,
    description: translations[lang].metadata.description,
    keywords: translations[lang].metadata.keywords,
  });

  return (
    <div className="flex flex-col min-h-dvh" style={{ background: 'var(--cream)' }}>
      <Header />
      <main className="flex-1">
        <Hero />
        <Challenge />
        <Journey />
        <Tenders />
        <Marketplace />
        <Benefits />
        <Capabilities />
        <Products />
        <VendorBand />
        <Pricing />
        <About />
        <Testimonials />
        <Faq />
        <Cta />
      </main>
      <Footer />
      <TalkModal />
      <WhatsAppButton />
    </div>
  );
}
