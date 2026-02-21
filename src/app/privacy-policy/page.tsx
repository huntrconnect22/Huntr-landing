'use client';

import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { useContext, useState, useEffect } from "react";
import { LanguageContext } from "@/context/language-context";
import { translations } from "@/lib/translations";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { PageHero } from "@/components/sections/page-hero";
import { useDynamicSeo } from "@/hooks/use-dynamic-seo";

export default function PrivacyPolicyPage() {
  const context = useContext(LanguageContext);
  const lang = context?.language || 'en';
  const t = translations[lang].privacyPolicy;
  const [date, setDate] = useState('');

  useDynamicSeo({
    title: t.title,
    description: t.subtitle,
  });

  useEffect(() => {
    setDate(new Date().toLocaleDateString(lang === 'id' ? 'id-ID' : 'en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    }));
  }, [lang]);

  if (!t) {
    return null; // Or a skeleton loader
  }

  return (
    <div className="flex flex-col min-h-dvh bg-background">
      <Header />
      <main className="flex-1 -mt-24">
        <PageHero title={t.title} subtitle={t.subtitle} />

        {/* Main Content Section */}
        <section className="py-16 sm:py-24">
          <div className="container mx-auto px-4">
            <Card className="max-w-4xl mx-auto">
              <CardHeader>
                <CardTitle className="text-3xl font-headline">{t.title}</CardTitle>
                <p className="text-sm text-muted-foreground">{t.lastUpdated.replace('[Date]', date)}</p>
              </CardHeader>
              <CardContent className="space-y-6 text-muted-foreground">
                <div>
                  <h2 className="text-2xl font-bold font-headline text-foreground mb-2">{t.introductionTitle}</h2>
                  <p>{t.introductionText}</p>
                </div>
                
                <div>
                  <h2 className="text-2xl font-bold font-headline text-foreground mb-2">{t.informationCollectionTitle}</h2>
                  <p>{t.informationCollectionText}</p>
                </div>

                <div>
                  <h2 className="text-2xl font-bold font-headline text-foreground mb-2">{t.howWeUseTitle}</h2>
                  <p>{t.howWeUseText}</p>
                </div>
              </CardContent>
            </Card>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
