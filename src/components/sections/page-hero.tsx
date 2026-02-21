'use client';

import { PlaceHolderImages } from "@/lib/placeholder-images";

const heroImage = PlaceHolderImages.find(p => p.id === 'hero-background');

interface PageHeroProps {
  title: string;
  subtitle: string;
}

export function PageHero({ title, subtitle }: PageHeroProps) {
  if (!heroImage) {
    return (
      <section className="relative pt-40 pb-24 sm:pt-48 sm:pb-32 bg-secondary">
        <div className="relative z-10 container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl font-bold font-headline text-foreground">
            {title}
          </h1>
          <p className="mt-4 max-w-3xl mx-auto text-lg text-muted-foreground">
            {subtitle}
          </p>
        </div>
      </section>
    );
  }
  
  return (
    <section 
      className="relative pt-40 pb-24 sm:pt-48 sm:pb-32 bg-cover bg-center bg-fixed"
      style={{ backgroundImage: `url(${heroImage.imageUrl})` }}
      aria-label={heroImage.description}
    >
      <div className="absolute inset-0 bg-black/50" />
      <div className="relative z-10 container mx-auto px-4 text-center">
        <h1 className="text-4xl md:text-5xl font-bold font-headline text-white">
          {title}
        </h1>
        <p className="mt-4 max-w-3xl mx-auto text-lg text-white/80">
          {subtitle}
        </p>
      </div>
    </section>
  );
}
