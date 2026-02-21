'use client';

import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { useContext } from "react";
import { LanguageContext } from "@/context/language-context";
import { translations } from "@/lib/translations";
import { useDynamicSeo } from "@/hooks/use-dynamic-seo";

export default function OurTeamPage() {
  const context = useContext(LanguageContext);
  const lang = context?.language || 'en';
  const headerT = translations[lang].header;
  const pageT = translations[lang].pages.ourTeam;

  useDynamicSeo({
    title: headerT.ourTeam,
    description: pageT.description,
  });

  return (
    <div className="flex flex-col min-h-dvh bg-background">
      <Header />
      <main className="flex-1 container mx-auto px-4 py-8">
        <h1 className="text-4xl font-bold font-headline">{headerT.ourTeam}</h1>
        <p className="mt-4 text-lg text-muted-foreground">
          {pageT.contentPlaceholder}
        </p>
      </main>
      <Footer />
    </div>
  );
}
