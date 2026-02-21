'use client';

import { Header } from "@/components/layout/header";
import { Hero } from "@/components/sections/hero";
import { Solutions } from "@/components/sections/solutions";
import { Features } from "@/components/sections/features";
import { Footer } from "@/components/layout/footer";
import { Testimonials } from "@/components/sections/testimonials";
import { Cta } from "@/components/sections/cta";
import { Faq } from "@/components/sections/faq";
import { useDynamicSeo } from "@/hooks/use-dynamic-seo";
import { useContext } from "react";
import { LanguageContext } from "@/context/language-context";
import { translations } from "@/lib/translations";

export default function Home() {
  const context = useContext(LanguageContext);
  const lang = context?.language || 'en';
  
  useDynamicSeo({
    title: translations[lang].metadata.title,
    description: translations[lang].metadata.description
  });

  return (
    <div className="flex flex-col min-h-dvh bg-background">
      <Header />
      <main className="flex-1 -mt-24">
        <Hero />
        <Solutions />
        <Features />
        <Testimonials />
        <Faq />
        <Cta />
      </main>
      <Footer />
    </div>
  );
}
