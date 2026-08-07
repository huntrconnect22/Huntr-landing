'use client';

import { Header } from "@/components/layout/header";
import { Hero } from "@/components/sections/hero";
import { DemoBanner } from "@/components/sections/demo-banner";
import { Solutions } from "@/components/sections/solutions";
import { Features } from "@/components/sections/features";
import { CatalogueProducts } from "@/components/sections/catalogue-products";
import { Footer } from "@/components/layout/footer";
import { Testimonials } from "@/components/sections/testimonials";
import { Cta } from "@/components/sections/cta";
import { Faq } from "@/components/sections/faq";
import { Clients } from "@/components/sections/clients";
import { useDynamicSeo } from "@/hooks/use-dynamic-seo";
import { useContext } from "react";
import { LanguageContext } from "@/context/language-context";
import { translations } from "@/lib/translations";

export function HomeClient() {
  const context = useContext(LanguageContext);
  const lang = context?.language || 'en';
  
  useDynamicSeo({
    title: translations[lang].metadata.title,
    description: translations[lang].metadata.description,
    keywords: translations[lang].metadata.keywords,
  });

  return (
    <div className="flex flex-col min-h-dvh bg-background">
      <Header />
      <main className="flex-1 -mt-24">
        <Hero />
        <DemoBanner />
        <Solutions />
        <Features />
        <CatalogueProducts />
        <Clients />
        <Testimonials />
        <Faq />
        <Cta />
      </main>
      <Footer />
    </div>
  );
}
