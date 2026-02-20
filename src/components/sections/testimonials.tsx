'use client';

import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { PlaceHolderImages } from "@/lib/placeholder-images";
import { useContext } from "react";
import { LanguageContext } from "@/context/language-context";
import { translations } from "@/lib/translations";

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
    <section id="testimonials" className="py-16 sm:py-24 bg-secondary">
      <div className="container mx-auto px-4">
        <div className="text-center max-w-3xl mx-auto mb-12">
          <h2 className="text-3xl sm:text-4xl font-headline font-bold">{t.title}</h2>
          <p className="mt-4 text-lg text-muted-foreground">{t.subtitle}</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
          {testimonials.map((testimonial, index) => (
            <Card key={index} className="flex flex-col">
              <CardContent className="flex-1 flex flex-col justify-center items-center p-8 text-center">
                <p className="text-muted-foreground italic">"{testimonial.quote}"</p>
                <div className="mt-6 flex items-center gap-4">
                  {avatarImage && (
                     <Avatar>
                      <AvatarImage src={avatarImage.imageUrl} alt={testimonial.name} data-ai-hint={avatarImage.imageHint} />
                      <AvatarFallback>{testimonial.name.charAt(0)}</AvatarFallback>
                    </Avatar>
                  )}
                  <div>
                    <p className="font-bold font-headline">{testimonial.name}</p>
                    <p className="text-sm text-muted-foreground">{testimonial.title}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
