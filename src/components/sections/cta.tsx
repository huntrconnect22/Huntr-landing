'use client';

import { Button } from "@/components/ui/button";
import Link from "next/link";
import { useContext } from "react";
import { LanguageContext } from "@/context/language-context";
import { translations } from "@/lib/translations";

export function Cta() {
  const context = useContext(LanguageContext);
  const lang = context?.language || 'en';
  const t = translations[lang].cta;

  return (
    <section id="cta" className="py-16 sm:py-24 bg-primary/5">
      <div className="container mx-auto px-4 text-center animate-in fade-in zoom-in-95 duration-500">
        <h2 className="text-3xl sm:text-4xl font-headline font-bold text-primary">
          {t.title}
        </h2>
        <p className="mt-4 max-w-2xl mx-auto text-lg text-muted-foreground">
          {t.subtitle}
        </p>
        <div className="mt-8">
          <Button size="lg" asChild>
            <Link href="/contact">{t.button}</Link>
          </Button>
        </div>
      </div>
    </section>
  );
}
