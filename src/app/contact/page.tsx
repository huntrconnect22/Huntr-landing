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

export default function ContactPage() {
  const context = useContext(LanguageContext);
  const lang = context?.language || 'en';
  const t = translations[lang].contact;

  return (
    <div className="flex flex-col min-h-dvh bg-background">
      <Header />
      <main className="flex-1 -mt-24">
        <PageHero title={t.title} subtitle={t.description} />

        <section className="py-16 sm:py-24">
          <div className="container mx-auto px-4">
            <div className="max-w-xl mx-auto">
              <Card>
                <CardContent className="pt-6">
                  <form className="space-y-4">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="name">{t.nameLabel}</Label>
                        <Input id="name" placeholder={t.namePlaceholder} />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="email">{t.emailLabel}</Label>
                        <Input id="email" type="email" placeholder={t.emailPlaceholder} />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="company">{t.companyLabel}</Label>
                      <Input id="company" placeholder={t.companyPlaceholder} />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="message">{t.messageLabel}</Label>
                      <Textarea id="message" placeholder={t.messagePlaceholder} />
                    </div>
                    <Button type="submit" className="w-full">{t.submitButton}</Button>
                  </form>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
