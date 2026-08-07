'use client';

import { useCallback, useContext, useEffect, useState } from 'react';
import Link from 'next/link';
import { ArrowRight, BarChart3, Rocket, Sparkles, Zap } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  type CarouselApi,
} from '@/components/ui/carousel';
import { LanguageContext } from '@/context/language-context';
import { translations } from '@/lib/translations';
import { cn } from '@/lib/utils';

import { DEMO_URL } from '@/lib/api-config';

const slideIcons = [Rocket, Sparkles, BarChart3] as const;

export function DemoBanner() {
  const context = useContext(LanguageContext);
  const lang = context?.language || 'en';
  const t = translations[lang].demoBanner;

  const [api, setApi] = useState<CarouselApi>();
  const [activeIndex, setActiveIndex] = useState(0);

  const onSelect = useCallback(() => {
    if (!api) return;
    setActiveIndex(api.selectedScrollSnap());
  }, [api]);

  useEffect(() => {
    if (!api) return;
    onSelect();
    api.on('select', onSelect);
    return () => {
      api.off('select', onSelect);
    };
  }, [api, onSelect]);

  useEffect(() => {
    if (!api) return;
    const interval = setInterval(() => {
      api.scrollNext();
    }, 5000);
    return () => clearInterval(interval);
  }, [api]);

  return (
    <section
      id="demo"
      aria-label={t.ariaLabel}
      className="relative overflow-hidden bg-slate-950 py-16 sm:py-20"
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0"
      >
        <div className="absolute -left-24 top-0 h-72 w-72 rounded-full bg-primary/25 blur-3xl" />
        <div className="absolute -right-16 bottom-0 h-80 w-80 rounded-full bg-accent/20 blur-3xl" />
        <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.04)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.04)_1px,transparent_1px)] bg-[size:3rem_3rem] [mask-image:radial-gradient(ellipse_at_center,black_30%,transparent_80%)]" />
      </div>

      <div className="container relative mx-auto px-4">
        <div className="mx-auto max-w-4xl text-center">
          <span className="inline-flex items-center gap-2 rounded-full border border-primary/30 bg-primary/10 px-4 py-1.5 text-sm font-semibold text-primary">
            <Zap className="h-4 w-4" aria-hidden="true" />
            {t.badge}
          </span>

          <Carousel
            setApi={setApi}
            opts={{ loop: true, align: 'center' }}
            className="mt-8"
          >
            <CarouselContent>
              {t.slides.map((slide, index) => {
                const Icon = slideIcons[index];
                return (
                  <CarouselItem key={slide.title}>
                    <div className="px-2 sm:px-8">
                      <div className="mx-auto mb-5 flex h-14 w-14 items-center justify-center rounded-2xl bg-primary/15 ring-1 ring-primary/30">
                        <Icon className="h-7 w-7 text-primary" aria-hidden="true" />
                      </div>
                      <h2 className="font-headline text-3xl font-bold tracking-tight text-white sm:text-4xl md:text-5xl">
                        {slide.title}
                      </h2>
                      <p className="mx-auto mt-4 max-w-2xl text-base text-slate-300 sm:text-lg">
                        {slide.description}
                      </p>
                    </div>
                  </CarouselItem>
                );
              })}
            </CarouselContent>
          </Carousel>

          <div className="mt-6 flex justify-center gap-2" aria-hidden="true">
            {t.slides.map((slide, index) => (
              <button
                key={slide.title}
                type="button"
                onClick={() => api?.scrollTo(index)}
                className={cn(
                  'h-2 rounded-full transition-all duration-300',
                  activeIndex === index
                    ? 'w-8 bg-primary'
                    : 'w-2 bg-white/25 hover:bg-white/40'
                )}
                aria-label={`${t.goToSlide} ${index + 1}`}
              />
            ))}
          </div>

          <div className="mt-10 flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
            <Button
              size="lg"
              className="h-12 px-8 text-base shadow-lg shadow-primary/25 transition-transform hover:scale-105"
              asChild
            >
              <Link href={DEMO_URL} target="_blank" rel="noopener noreferrer">
                {t.ctaButton}
                <ArrowRight className="ml-2 h-5 w-5" aria-hidden="true" />
              </Link>
            </Button>
            <p className="text-sm text-slate-400">{t.ctaNote}</p>
          </div>
        </div>
      </div>
    </section>
  );
}
