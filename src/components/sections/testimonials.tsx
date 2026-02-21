'use client';

import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { PlaceHolderImages } from "@/lib/placeholder-images";
import { useContext } from "react";
import { LanguageContext } from "@/context/language-context";
import { translations } from "@/lib/translations";
import { AnimateOnScroll } from "../animate-on-scroll";

const avatarImage = PlaceHolderImages.find(p => p.id === 'success-story-avatar');

export function Testimonials() {
  const context = useContext(LanguageContext);
  const lang = context?.language || 'en';
  const t = translations[lang].testimonials;
  
  const testimonials = [
    {
      quote: t.testimonial1,
      name: t.client1Name,
      title: t.client1Title,
    },
    {
      quote: t.testimonial2,
      name: t.client2Name,
      title: t.client2Title,
    },
  ];

  return (
    <section id="testimonials" className="relative py-16 sm:py-24 bg-cover bg-center" style={{
      backgroundImage: "url('/assets/img/section-bg2.webp')",
      backgroundAttachment: 'fixed'
    }}>
      <div className="absolute inset-0 bg-black/30" />
      <div className="relative container mx-auto px-4">
        <AnimateOnScroll className="text-center max-w-3xl mx-auto mb-12 fade-in zoom-in-95 duration-500">
          <h2 className="text-3xl sm:text-4xl font-headline font-bold text-white">{t.title}</h2>
          <p className="mt-4 text-lg text-white/80">{t.subtitle}</p>
        </AnimateOnScroll>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
          {testimonials.map((testimonial, index) => (
            <AnimateOnScroll
              key={index}
              className="fade-in zoom-in-95 duration-700"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <Card className="flex flex-col h-full bg-black/20 border-white/10">
                <CardContent className="flex-1 flex flex-col justify-center items-center p-8 text-center">
                  <p className="text-white/80 italic">"{testimonial.quote}"</p>
                  <div className="mt-6 flex items-center gap-4">
                    {avatarImage && (
                       <Avatar>
                        <AvatarImage src={avatarImage.imageUrl} alt={testimonial.name} data-ai-hint={avatarImage.imageHint} />
                        <AvatarFallback>{testimonial.name.charAt(0)}</AvatarFallback>
                      </Avatar>
                    )}
                    <div>
                      <p className="font-bold font-headline text-white">{testimonial.name}</p>
                      <p className="text-sm text-white/70">{testimonial.title}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </AnimateOnScroll>
          ))}
        </div>
      </div>
    </section>
  );
}
