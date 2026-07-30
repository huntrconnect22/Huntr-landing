'use client';

import { useContext } from "react";
import { CircleCheckBig, Clock3, HandCoins } from "lucide-react";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { LanguageContext } from "@/context/language-context";
import { translations } from "@/lib/translations";
import { PageHero } from "@/components/sections/page-hero";
import { useDynamicSeo } from "@/hooks/use-dynamic-seo";
import { AnimateOnScroll } from "@/components/animate-on-scroll";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

export default function PricingPage() {
  const context = useContext(LanguageContext);
  const lang = context?.language || 'en';
  const t = translations[lang].pricing;

  useDynamicSeo({
    title: t.seoTitle,
    description: t.seoDescription,
    keywords: t.seoKeywords,
  });

  const highlights = [
    {
      title: t.summaryTrial,
      icon: Clock3,
    },
    {
      title: t.summarySuccess,
      icon: CircleCheckBig,
    },
    {
      title: t.summaryNoTx,
      icon: HandCoins,
    },
  ];

  return (
    <div className="flex min-h-dvh flex-col bg-background">
      <Header />
      <main className="flex-1 -mt-24">
        <PageHero title={t.title} subtitle={t.subtitle} />

        <section className="py-16 sm:py-24">
          <div className="container mx-auto px-4">
            <AnimateOnScroll className="mx-auto max-w-5xl fade-in slide-in-from-bottom-10 duration-700">
              <div className="rounded-3xl border border-primary/10 bg-gradient-to-br from-primary/10 via-background to-background p-6 shadow-sm sm:p-8">
                <Badge className="mb-4">{t.heroBadge}</Badge>
                <div className="grid gap-4 md:grid-cols-3">
                  {highlights.map((item) => {
                    const Icon = item.icon;

                    return (
                      <div key={item.title} className="rounded-2xl border border-border/70 bg-background/90 p-5">
                        <Icon className="h-8 w-8 text-primary" />
                        <p className="mt-4 text-lg font-semibold text-foreground">{item.title}</p>
                      </div>
                    );
                  })}
                </div>
              </div>
            </AnimateOnScroll>
          </div>
        </section>

        <section className="pb-16 sm:pb-24">
          <div className="container mx-auto px-4">
            <div className="mx-auto grid max-w-5xl gap-8 lg:grid-cols-[1.05fr_1.4fr]">
              <AnimateOnScroll className="fade-in zoom-in-95 duration-700">
                <Card className="h-full border-primary/10 shadow-sm">
                  <CardHeader>
                    <CardTitle className="text-2xl font-headline text-foreground">{t.trialTitle}</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-5">
                    <div className="rounded-2xl bg-primary px-5 py-4 text-primary-foreground">
                      <p className="text-sm uppercase tracking-[0.2em] text-primary-foreground/80">Free Trial</p>
                      <p className="mt-2 text-2xl font-bold">{t.trialHighlight}</p>
                    </div>
                    <p className="leading-7 text-muted-foreground">{t.trialBody}</p>
                  </CardContent>
                </Card>
              </AnimateOnScroll>

              <AnimateOnScroll className="fade-in zoom-in-95 duration-700" style={{ animationDelay: '100ms' }}>
                <Card className="h-full border-primary/10 shadow-sm">
                  <CardHeader>
                    <CardTitle className="text-2xl font-headline text-foreground">{t.feeTitle}</CardTitle>
                    <p className="text-muted-foreground">{t.feeDescription}</p>
                  </CardHeader>
                  <CardContent>
                    <div className="overflow-hidden rounded-2xl border">
                      <Table>
                        <TableHeader className="bg-secondary/60">
                          <TableRow>
                            <TableHead>{t.tableValue}</TableHead>
                            <TableHead>{t.tableFee}</TableHead>
                            <TableHead>{t.tableDetail}</TableHead>
                          </TableRow>
                        </TableHeader>
                        <TableBody>
                          {t.tiers.map((tier: { range: string; fee: string; detail: string }) => (
                            <TableRow key={tier.range}>
                              <TableCell className="font-medium text-foreground">{tier.range}</TableCell>
                              <TableCell className="text-lg font-bold text-primary">{tier.fee}</TableCell>
                              <TableCell className="text-muted-foreground">{tier.detail}</TableCell>
                            </TableRow>
                          ))}
                        </TableBody>
                      </Table>
                    </div>
                  </CardContent>
                </Card>
              </AnimateOnScroll>
            </div>
          </div>
        </section>

        <section className="pb-20 sm:pb-24">
          <div className="container mx-auto px-4">
            <AnimateOnScroll className="mx-auto max-w-5xl fade-in slide-in-from-bottom-10 duration-700">
              <Card className="border-primary/10 bg-secondary/30 shadow-sm">
                <CardHeader>
                  <CardTitle className="text-2xl font-headline text-foreground">{t.ruleTitle}</CardTitle>
                  <p className="text-muted-foreground">{t.ruleDescription}</p>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="grid gap-4 md:grid-cols-2">
                    {t.rules.map((rule: string) => (
                      <div key={rule} className="flex gap-3 rounded-2xl border bg-background p-5">
                        <CircleCheckBig className="mt-0.5 h-5 w-5 shrink-0 text-primary" />
                        <p className="text-muted-foreground">{rule}</p>
                      </div>
                    ))}
                  </div>
                  <div className="rounded-2xl border border-dashed border-primary/30 bg-background px-5 py-4">
                    <p className="font-semibold text-foreground">{t.noteTitle}</p>
                    <p className="mt-2 text-muted-foreground">{t.noteBody}</p>
                  </div>
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
