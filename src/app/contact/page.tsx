'use client';

import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useContext } from "react";
import { LanguageContext } from "@/context/language-context";
import { translations } from "@/lib/translations";
import { PageHero } from "@/components/sections/page-hero";
import { useDynamicSeo } from "@/hooks/use-dynamic-seo";
import { PlaceHolderImages } from "@/lib/placeholder-images";
import { AnimateOnScroll } from "@/components/animate-on-scroll";

const heroImage = PlaceHolderImages.find(p => p.id === 'hero-background');

export default function ContactPage() {
  const context = useContext(LanguageContext);
  const lang = context?.language || 'en';
  const t = translations[lang].contact;

  useDynamicSeo({
    title: t.title,
    description: t.description,
  });

  return (
    <div className="flex flex-col min-h-dvh bg-background">
      <Header />
      <main className="flex-1 -mt-24">
        <PageHero title={t.title} subtitle={t.description} />

        <section 
          className="relative py-16 sm:py-24 bg-cover"
          style={{ 
            backgroundImage: heroImage ? `url(${heroImage.imageUrl})` : 'none',
            backgroundPosition: 'center'
          }}
          aria-label={heroImage ? heroImage.description : 'Contact form background'}
        >
          <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" />
          <div className="relative container mx-auto px-4">
            <AnimateOnScroll className="max-w-xl mx-auto fade-in zoom-in-95 duration-700">
              <Card className="bg-black/20 border-white/10">
                <CardContent className="pt-6">
                  <form className="space-y-4">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="name" className="text-white">{t.nameLabel}</Label>
                        <Input 
                          id="name" 
                          placeholder={t.namePlaceholder} 
                          className="bg-white/10 border-white/20 text-white placeholder:text-white/60 focus:bg-white/20"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="email" className="text-white">{t.emailLabel}</Label>
                        <Input 
                          id="email" 
                          type="email" 
                          placeholder={t.emailPlaceholder} 
                          className="bg-white/10 border-white/20 text-white placeholder:text-white/60 focus:bg-white/20"
                        />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="company" className="text-white">{t.companyLabel}</Label>
                      <Input 
                        id="company" 
                        placeholder={t.companyPlaceholder} 
                        className="bg-white/10 border-white/20 text-white placeholder:text-white/60 focus:bg-white/20"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="message" className="text-white">{t.messageLabel}</Label>
                      <Textarea 
                        id="message" 
                        placeholder={t.messagePlaceholder} 
                        className="bg-white/10 border-white/20 text-white placeholder:text-white/60 focus:bg-white/20"
                      />
                    </div>
                    <Button type="submit" className="w-full">{t.submitButton}</Button>
                  </form>
                </CardContent>
              </Card>
            </AnimateOnScroll>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
