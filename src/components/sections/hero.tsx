'use client';

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { PlaceHolderImages } from "@/lib/placeholder-images";
import { useContext } from "react";
import { LanguageContext } from "@/context/language-context";
import { translations } from "@/lib/translations";

const heroImage = PlaceHolderImages.find(p => p.id === 'hero-background');

export function Hero() {
  const context = useContext(LanguageContext);
  const lang = context?.language || 'en';
  const t = translations[lang].hero;

  return (
    <section 
      className="relative w-full h-screen flex items-center justify-center text-center bg-cover bg-center"
      style={{ 
        backgroundImage: heroImage ? `url(${heroImage.imageUrl})` : 'none',
        backgroundAttachment: 'fixed'
      }}
      aria-label={heroImage ? heroImage.description : 'Hero background'}
    >
      <div className="absolute inset-0 bg-black/50" />
      <div className="relative z-10 p-4 sm:p-6 text-white max-w-4xl mx-auto animate-in fade-in slide-in-from-bottom-8 duration-1000">
        <h1 className="text-4xl sm:text-5xl md:text-6xl font-headline font-black tracking-tight">
          {t.title}
        </h1>
        <p className="mt-4 text-lg sm:text-xl text-white/80 max-w-2xl mx-auto">
          {t.subtitle}
        </p>
        <div className="mt-8 flex justify-center gap-4">
          <Button size="lg" asChild>
            <Link href="/contact">{t.getStarted}</Link>
          </Button>
          <Button size="lg" variant="outline" className="bg-transparent text-white border-white hover:bg-white hover:text-black" asChild>
            <Link href="/#solutions">{t.learnMore}</Link>
          </Button>
        </div>
      </div>
    </section>
  );
}
