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

const heroImage = PlaceHolderImages.find(p => p.id === 'hero-background');
const eprocurementImage = PlaceHolderImages.find(p => p.id === 'use-case-eprocurement');
const esupplychainImage = PlaceHolderImages.find(p => p.id === 'use-case-esupplychain');
const huntrPayImage = PlaceHolderImages.find(p => p.id === 'use-case-huntrpay');

export default function UseCasePage() {
  const context = useContext(LanguageContext);
  const lang = context?.language || 'en';
  const t = translations[lang].useCase;

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
        {/* Hero Section */}
        <section className="relative py-24 sm:py-32">
          {heroImage && (
            <Image
              src={heroImage.imageUrl}
              alt={heroImage.description}
              fill
              className="object-cover"
              data-ai-hint={heroImage.imageHint}
            />
          )}
          <div className="absolute inset-0 bg-black/50" />
          <div className="relative z-10 container mx-auto px-4 text-center">
            <h1 className="text-4xl md:text-5xl font-bold font-headline text-white">
              {t.title}
            </h1>
            <p className="mt-4 max-w-3xl mx-auto text-lg text-white/80">
              {t.subtitle}
            </p>
          </div>
        </section>

        {/* Main Content Section */}
        <section className="py-16 sm:py-24">
          <div className="container mx-auto px-4">
            <Tabs defaultValue="eprocurement" className="w-full">
              <TabsList className="grid w-full grid-cols-1 md:grid-cols-3 mb-8">
                <TabsTrigger value="eprocurement">{t.tab1}</TabsTrigger>
                <TabsTrigger value="esupplychain">{t.tab2}</TabsTrigger>
                <TabsTrigger value="huntrpay">{t.tab3}</TabsTrigger>
              </TabsList>
              
              {useCases.map((useCase) => (
                <TabsContent value={useCase.value} key={useCase.value}>
                  <Card>
                    <CardContent className="p-6">
                      <div className="grid md:grid-cols-2 gap-8 items-center">
                        <div className="space-y-4">
                          <h3 className="text-2xl font-bold font-headline">{useCase.title}</h3>
                          <p className="text-muted-foreground">{useCase.description}</p>
                          <ul className="space-y-2">
                            {useCase.benefits.map((benefit, i) => (
                              <li key={i} className="flex items-start gap-2">
                                <CheckCircle className="h-5 w-5 text-primary mt-1 flex-shrink-0" />
                                <span className="text-muted-foreground">{benefit}</span>
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
                      </div>
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
