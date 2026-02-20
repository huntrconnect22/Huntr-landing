'use client';

import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import Image from "next/image";
import { PlaceHolderImages } from "@/lib/placeholder-images";
import { useContext, useState, useEffect } from "react";
import { LanguageContext } from "@/context/language-context";
import { translations } from "@/lib/translations";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const heroImage = PlaceHolderImages.find(p => p.id === 'hero-background');

export default function PrivacyPolicyPage() {
  const context = useContext(LanguageContext);
  const lang = context?.language || 'en';
  const t = translations[lang].privacyPolicy;
  const [date, setDate] = useState('');

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
        {/* Hero Section */}
        <section className="relative py-24 sm:py-32">
          {heroImage && (
            <Image
              src={heroImage.imageUrl}
              alt={heroImage.description}
              fill
              className="object-cover"
              data-ai-hint={heroImage.imageHint}
            />
          )}
          <div className="absolute inset-0 bg-black/50" />
          <div className="relative z-10 container mx-auto px-4 text-center">
            <h1 className="text-4xl md:text-5xl font-bold font-headline text-white">
              {t.title}
            </h1>
            <p className="mt-4 max-w-3xl mx-auto text-lg text-white/80">
              {t.subtitle}
            </p>
          </div>
        </section>

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
