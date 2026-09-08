'use client';

import Image from "next/image";
import { useContext } from "react";
import { LanguageContext } from "@/context/language-context";
import { translations } from "@/lib/translations";
import { AnimateOnScroll } from "../animate-on-scroll";

const clients = [
  {
    name: "PT Angkasindo Dunia (Niagara)",
    logo: "/assets/img/client-logo/angkasindo-dunia.webp",
    altKey: "altAngkasindo" as const,
  },
  {
    name: "PT Benderang Hidup Indonesia",
    logo: "/assets/img/client-logo/benderang-hidup-indonesia.png",
    altKey: "altBenderang" as const,
  },
  {
    name: "PT Bestoolindo Multi Teknik",
    logo: "/assets/img/client-logo/bestolindo.webp",
    altKey: "altBestolindo" as const,
  },
  {
    name: "PT Jaya Sentral Cemerlang",
    logo: "/assets/img/client-logo/jaya-sentral-cemerlang.jpeg",
    altKey: "altJayaSentral" as const,
  },
  {
    name: "PajakExpress",
    logo: "/assets/img/client-logo/PajakExpress.png",
    altKey: "altPajakExpress" as const,
  },
];

export function Clients() {
  const context = useContext(LanguageContext);
  const lang = context?.language || 'en';
  const t = translations[lang].clients;

  return (
    <section
      id="clients"
      aria-label={t.title}
      className="py-16 sm:py-20 bg-muted/40"
    >
      <div className="container mx-auto px-4">
        <AnimateOnScroll className="text-center max-w-2xl mx-auto mb-12 fade-in zoom-in-95 duration-500">
          <p className="text-sm font-semibold uppercase tracking-widest text-primary mb-3">
            Clients
          </p>
          <h2 className="text-3xl sm:text-4xl font-headline font-bold">
            {t.title}
          </h2>
          <p className="mt-4 text-lg text-muted-foreground">{t.subtitle}</p>
        </AnimateOnScroll>

        <ul
          className="flex flex-wrap items-center justify-center gap-8 sm:gap-12"
          aria-label="Client logos"
        >
          {clients.map((client, index) => (
            <AnimateOnScroll
              key={client.name}
              className="fade-in zoom-in-95 duration-700"
              style={{ animationDelay: `${index * 80}ms` }}
            >
              <li className="flex items-center justify-center">
                <div className="relative h-14 w-40 grayscale opacity-70 hover:grayscale-0 hover:opacity-100 transition-all duration-300">
                  <Image
                    src={client.logo}
                    alt={t[client.altKey]}
                    fill
                    sizes="160px"
                    className="object-contain"
                    title={client.name}
                  />
                </div>
              </li>
            </AnimateOnScroll>
          ))}
        </ul>
      </div>
    </section>
  );
}
