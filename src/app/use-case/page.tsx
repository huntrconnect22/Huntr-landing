'use client';

import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import Image from "next/image";
import { PlaceHolderImages } from "@/lib/placeholder-images";
import { useContext } from "react";
import { LanguageContext } from "@/context/language-context";
import { translations } from "@/lib/translations";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent } from "@/components/ui/card";
import { CheckCircle } from "lucide-react";
import { PageHero } from "@/components/sections/page-hero";
import { useDynamicSeo } from "@/hooks/use-dynamic-seo";
import { AnimateOnScroll } from "@/components/animate-on-scroll";

const eprocurementImage = PlaceHolderImages.find(p => p.id === 'use-case-eprocurement');
const esupplychainImage = PlaceHolderImages.find(p => p.id === 'use-case-esupplychain');
const huntrPayImage = PlaceHolderImages.find(p => p.id === 'use-case-huntrpay');

export default function UseCasePage() {
  const context = useContext(LanguageContext);
  const lang = context?.language || 'en';
  const t = translations[lang].useCase;

  useDynamicSeo({
    title: t.title,
    description: t.subtitle,
  });

  const useCases = [
    {
      value: "eprocurement",
      trigger: t.tab1,
      title: t.procurementTitle,
      description: t.procurementDesc,
      benefits: [
        t.procurementBenefit1,
        t.procurementBenefit2,
        t.procurementBenefit3,
        t.procurementBenefit4,
      ],
      image: eprocurementImage
    },
    {
      value: "esupplychain",
      trigger: t.tab2,
      title: t.supplyChainTitle,
      description: t.supplyChainDesc,
      benefits: [
        t.supplyChainBenefit1,
        t.supplyChainBenefit2,
        t.supplyChainBenefit3,
        t.supplyChainBenefit4,
      ],
      image: esupplychainImage
    },
    {
      value: "huntrpay",
      trigger: t.tab3,
      title: t.huntrPayTitle,
      description: t.huntrPayDesc,
      benefits: [
        t.huntrPayBenefit1,
        t.huntrPayBenefit2,
        t.huntrPayBenefit3,
        t.huntrPayBenefit4,
      ],
      image: huntrPayImage
    },
  ];

  if (!t) return null;

  return (
    <div className="flex flex-col min-h-dvh bg-background">
      <Header />
      <main className="flex-1 -mt-24">
        <PageHero title={t.title} subtitle={t.subtitle} />

        {/* Main Content Section */}
        <section 
          className="relative py-16 sm:py-24 bg-cover bg-center"
          style={{
            backgroundImage: "url('/assets/img/section-bg2.webp')",
          }}
        >
          <div className="absolute inset-0 bg-black/30 backdrop-blur-sm" />
          <div className="relative container mx-auto px-4">
            <Tabs defaultValue="eprocurement" className="w-full">
              <TabsList className="grid w-full grid-cols-1 md:grid-cols-3 h-auto md:h-10 mb-8 bg-black/20 text-white/70">
                <TabsTrigger value="eprocurement" className="data-[state=active]:bg-white/20 data-[state=active]:text-white focus-visible:ring-white">{t.tab1}</TabsTrigger>
                <TabsTrigger value="esupplychain" className="data-[state=active]:bg-white/20 data-[state=active]:text-white focus-visible:ring-white">{t.tab2}</TabsTrigger>
                <TabsTrigger value="huntrpay" className="data-[state=active]:bg-white/20 data-[state=active]:text-white focus-visible:ring-white">{t.tab3}</TabsTrigger>
              </TabsList>
              
              {useCases.map((useCase) => (
                <TabsContent value={useCase.value} key={useCase.value}>
                  <Card className="bg-black/20 border-white/10">
                    <CardContent className="p-6">
                      <AnimateOnScroll className="grid md:grid-cols-2 gap-8 items-center fade-in-50 duration-500">
                        <div className="space-y-4">
                          <h3 className="text-2xl font-bold font-headline text-white">{useCase.title}</h3>
                          <p className="text-white/80">{useCase.description}</p>
                          <ul className="space-y-2">
                            {useCase.benefits.map((benefit, i) => (
                              <li key={i} className="flex items-start gap-2">
                                <CheckCircle className="h-5 w-5 text-primary mt-1 flex-shrink-0" />
                                <span className="text-white/80">{benefit}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                        {useCase.image && (
                          <div className="relative h-80 w-full rounded-lg overflow-hidden shadow-md">
                            <Image
                              src={useCase.image.imageUrl}
                              alt={useCase.image.description}
                              fill
                              className="object-cover"
                              data-ai-hint={useCase.image.imageHint}
                            />
                          </div>
                        )}
                      </AnimateOnScroll>
                    </CardContent>
                  </Card>
                </TabsContent>
              ))}
            </Tabs>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
