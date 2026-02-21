'use client';

import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { useContext } from "react";
import { LanguageContext } from "@/context/language-context";
import { translations } from "@/lib/translations";
import { useDynamicSeo } from "@/hooks/use-dynamic-seo";
import { PageHero } from "@/components/sections/page-hero";
import { AnimateOnScroll } from "@/components/animate-on-scroll";

export default function CareersPage() {
  const context = useContext(LanguageContext);
  const lang = context?.language || 'en';
  const headerT = translations[lang].header;
  const pageT = translations[lang].pages.careers;

  useDynamicSeo({
    title: headerT.careers,
    description: pageT.description,
  });

  return (
    <div className="flex flex-col min-h-dvh bg-background">
      <Header />
      <main className="flex-1 -mt-24">
         <PageHero title={headerT.careers} subtitle={pageT.description} />
        <section className="py-16 sm:py-24">
          <div className="container mx-auto px-4">
            <AnimateOnScroll className="max-w-3xl mx-auto text-center fade-in zoom-in-95 duration-700">
              <h2 className="text-3xl font-bold font-headline">Join Our Team</h2>
              <p className="mt-4 text-lg text-muted-foreground">
                {pageT.contentPlaceholder}
              </p>
            </AnimateOnScroll>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
