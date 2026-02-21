'use client';

import { BarChart3, CreditCard, FileText, Users } from "lucide-react";
import { useContext } from "react";
import { LanguageContext } from "@/context/language-context";
import { translations } from "@/lib/translations";
import { AnimateOnScroll } from "../animate-on-scroll";

export function Features() {
  const context = useContext(LanguageContext);
  const lang = context?.language || 'en';
  const t = translations[lang].features;

  const features = [
    {
      icon: <BarChart3 className="h-10 w-10 text-primary" />,
      title: t.feature1Title,
      description: t.feature1Description,
    },
    {
      icon: <CreditCard className="h-10 w-10 text-primary" />,
      title: t.feature2Title,
      description: t.feature2Description,
    },
    {
      icon: <Users className="h-10 w-10 text-primary" />,
      title: t.feature3Title,
      description: t.feature3Description,
    },
    {
      icon: <FileText className="h-10 w-10 text-primary" />,
      title: t.feature4Title,
      description: t.feature4Description,
    },
  ];

  return (
    <section id="features" className="py-16 sm:py-24">
      <div className="container mx-auto px-4">
        <AnimateOnScroll className="text-center max-w-3xl mx-auto mb-12 fade-in zoom-in-95 duration-500">
          <h2 className="text-3xl sm:text-4xl font-headline font-bold">{t.title}</h2>
          <p className="mt-4 text-lg text-muted-foreground">
            {t.subtitle}
          </p>
        </AnimateOnScroll>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          {features.map((feature, index) => (
            <AnimateOnScroll 
              key={index} 
              className="flex gap-6 fade-in slide-in-from-bottom-10 duration-700" 
              style={{ animationDelay: `${index * 100}ms` }}>
              <div className="flex-shrink-0">
                {feature.icon}
              </div>
              <div>
                <h3 className="text-xl font-headline font-bold">{feature.title}</h3>
                <p className="mt-2 text-muted-foreground">{feature.description}</p>
              </div>
            </AnimateOnScroll>
          ))}
        </div>
      </div>
    </section>
  );
}
