'use client';

import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import Image from "next/image";
import { PlaceHolderImages } from "@/lib/placeholder-images";
import { useContext } from "react";
import { LanguageContext } from "@/context/language-context";
import { translations } from "@/lib/translations";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Eye, Target } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";
import { PageHero } from "@/components/sections/page-hero";
import { useDynamicSeo } from "@/hooks/use-dynamic-seo";
import { AnimateOnScroll } from "@/components/animate-on-scroll";

const mainImage = PlaceHolderImages.find(p => p.id === 'our-company-main');

export default function OurCompanyPage() {
  const context = useContext(LanguageContext);
  const lang = context?.language || 'en';
  const t = translations[lang].ourCompany;

  useDynamicSeo({
    title: t.title,
    description: t.subtitle,
  });

  // If translations are not ready, render a loading state or nothing
  if (!t) {
    return (
      <div className="flex flex-col min-h-dvh bg-background">
        <Header />
        <main className="flex-1 container mx-auto px-4 py-8 space-y-8">
          <Skeleton className="h-12 w-1/2" />
          <Skeleton className="h-8 w-3/4" />
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="space-y-4">
              <Skeleton className="h-8 w-1/4" />
              <Skeleton className="h-20 w-full" />
              <Skeleton className="h-20 w-full" />
            </div>
            <Skeleton className="h-80 w-full" />
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="flex flex-col min-h-dvh bg-background">
      <Header />
      <main className="flex-1 -mt-24">
        <PageHero title={t.title} subtitle={t.subtitle} />

        {/* Main Content Section */}
        <section className="py-16 sm:py-24">
          <div className="container mx-auto px-4">
            <AnimateOnScroll className="grid md:grid-cols-2 gap-12 items-center fade-in slide-in-from-bottom-10 duration-700">
              <div className="prose lg:prose-lg max-w-none text-muted-foreground">
                <h2 className="text-3xl font-bold font-headline text-foreground">{t.historyTitle}</h2>
                <p>{t.historyText1}</p>
                <p>{t.historyText2}</p>
              </div>
              {mainImage && (
                <div className="relative h-80 w-full rounded-lg overflow-hidden shadow-lg">
                  <Image
                    src={mainImage.imageUrl}
                    alt={mainImage.description}
                    fill
                    className="object-cover"
                    data-ai-hint={mainImage.imageHint}
                  />
                </div>
              )}
            </AnimateOnScroll>
          </div>
        </section>

        {/* Vision & Mission Section */}
        <section 
          className="relative py-16 sm:py-24 bg-cover bg-center"
          style={{
            backgroundImage: "url('/assets/img/section-bg1.webp')",
            backgroundAttachment: 'fixed'
          }}
        >
          <div className="absolute inset-0 bg-black/30" />
          <div className="relative container mx-auto px-4">
            <AnimateOnScroll className="text-center max-w-3xl mx-auto mb-12 fade-in zoom-in-95 duration-500">
              <h2 className="text-3xl sm:text-4xl font-headline font-bold text-white">{t.visionMissionTitle}</h2>
            </AnimateOnScroll>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
              <AnimateOnScroll className="fade-in zoom-in-95 duration-700">
                <Card className="bg-black/20 border-white/10">
                  <CardHeader className="flex-row items-center gap-4">
                    <Eye className="h-10 w-10 text-primary" />
                    <CardTitle className="font-headline text-white">{t.visionTitle}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-white/80">{t.visionText}</p>
                  </CardContent>
                </Card>
              </AnimateOnScroll>
              <AnimateOnScroll className="fade-in zoom-in-95 duration-700" style={{ animationDelay: '100ms' }}>
                <Card className="bg-black/20 border-white/10">
                  <CardHeader className="flex-row items-center gap-4">
                    <Target className="h-10 w-10 text-primary" />
                    <CardTitle className="font-headline text-white">{t.missionTitle}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-white/80">{t.missionText}</p>
                  </CardContent>
                </Card>
              </AnimateOnScroll>
            </div>
          </div>
        </section>

      </main>
      <Footer />
    </div>
  );
}
