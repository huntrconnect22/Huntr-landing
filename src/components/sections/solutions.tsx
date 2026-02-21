'use client';

import Image from 'next/image';
import { useContext } from 'react';
import { LanguageContext } from '@/context/language-context';
import { translations } from '@/lib/translations';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import { CheckCircle } from 'lucide-react';
import { cn } from '@/lib/utils';

export function Solutions() {
  const context = useContext(LanguageContext);
  const lang = context?.language || 'en';
  const t = translations[lang].solutions;

  const solutionImages = {
    eprocurement: PlaceHolderImages.find(p => p.id === 'solution-eprocurement'),
    esupplychain: PlaceHolderImages.find(p => p.id === 'solution-esupplychain'),
    crowdbuy: PlaceHolderImages.find(p => p.id === 'solution-crowdbuy'),
  };

  return (
    <section id="solutions" className="relative py-16 sm:py-24 bg-cover bg-center" style={{backgroundImage: "url('/assets/img/section-bg1.webp')"}}>
      <div className="absolute inset-0 bg-background/50 backdrop-blur-sm" />
      <div className="relative container mx-auto px-4">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl sm:text-4xl font-headline font-bold">{t.title}</h2>
          <p className="mt-4 text-lg text-muted-foreground">
            {t.subtitle}
          </p>
        </div>
        
        <div className="space-y-24">
          {t.items.map((solution, index) => {
            const image = solutionImages[solution.id as keyof typeof solutionImages];
            return (
              <div key={solution.id} className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center animate-in fade-in slide-in-from-bottom-10 duration-700">
                {/* Image Section */}
                <div className={cn("relative h-80 w-full rounded-lg overflow-hidden shadow-lg", index % 2 !== 0 && "md:order-last")}>
                  {image && (
                    <Image
                      src={image.imageUrl}
                      alt={image.description}
                      fill
                      className="object-cover"
                      data-ai-hint={image.imageHint}
                    />
                  )}
                </div>

                {/* Text Content Section */}
                <div className="space-y-4">
                  <h3 className="text-2xl font-bold font-headline">{solution.title}</h3>
                  <p className="text-muted-foreground lg:text-lg">{solution.description}</p>
                  <ul className="space-y-3 pt-2">
                    {solution.benefits.map((benefit, i) => (
                      <li key={i} className="flex items-start gap-3">
                        <CheckCircle className="h-6 w-6 text-primary mt-0.5 flex-shrink-0" />
                        <span className="text-muted-foreground">{benefit}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
