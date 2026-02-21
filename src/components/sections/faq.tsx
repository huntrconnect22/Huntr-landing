'use client';

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { useContext } from "react";
import { LanguageContext } from "@/context/language-context";
import { translations } from "@/lib/translations";
import { AnimateOnScroll } from "../animate-on-scroll";

export function Faq() {
  const context = useContext(LanguageContext);
  const lang = context?.language || 'en';
  const t = translations[lang].faq;

  if (!t) return null;

  const faqs = [
    {
      question: t.q1,
      answer: t.a1,
    },
    {
      question: t.q2,
      answer: t.a2,
    },
    {
      question: t.q3,
      answer: t.a3,
    },
    {
      question: t.q4,
      answer: t.a4,
    },
  ];

  return (
    <section id="faq" className="py-16 sm:py-24">
      <div className="container mx-auto px-4">
        <AnimateOnScroll className="text-center max-w-3xl mx-auto mb-12 fade-in zoom-in-95 duration-500">
          <h2 className="text-3xl sm:text-4xl font-headline font-bold">{t.title}</h2>
          <p className="mt-4 text-lg text-muted-foreground">
            {t.subtitle}
          </p>
        </AnimateOnScroll>
        <AnimateOnScroll className="max-w-3xl mx-auto fade-in slide-in-from-bottom-10 duration-700">
          <Accordion type="single" collapsible className="w-full">
            {faqs.map((faq, index) => (
              <AccordionItem value={`item-${index}`} key={index}>
                <AccordionTrigger className="text-left">{faq.question}</AccordionTrigger>
                <AccordionContent>
                  <p className="text-muted-foreground">{faq.answer}</p>
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </AnimateOnScroll>
      </div>
    </section>
  );
}
