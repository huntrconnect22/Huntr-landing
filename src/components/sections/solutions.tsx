'use client';

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Combine, ShoppingCart, Workflow } from "lucide-react";
import { useContext } from "react";
import { LanguageContext } from "@/context/language-context";
import { translations } from "@/lib/translations";

export function Solutions() {
  const context = useContext(LanguageContext);
  const lang = context?.language || 'en';
  const t = translations[lang].solutions;

  const solutions = [
    {
      icon: <ShoppingCart className="h-8 w-8 text-primary" />,
      title: t.card1Title,
      description: t.card1Description,
    },
    {
      icon: <Workflow className="h-8 w-8 text-primary" />,
      title: t.card2Title,
      description: t.card2Description,
    },
    {
      icon: <Combine className="h-8 w-8 text-primary" />,
      title: t.card3Title,
      description: t.card3Description,
    },
  ];

  return (
    <section id="solutions" className="py-16 sm:py-24 bg-secondary">
      <div className="container mx-auto px-4">
        <div className="text-center max-w-3xl mx-auto mb-12">
          <h2 className="text-3xl sm:text-4xl font-headline font-bold">{t.title}</h2>
          <p className="mt-4 text-lg text-muted-foreground">
            {t.subtitle}
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {solutions.map((solution, index) => (
            <Card key={index} className="text-center">
              <CardHeader className="items-center">
                {solution.icon}
                <CardTitle className="mt-4 font-headline">{solution.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">{solution.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
