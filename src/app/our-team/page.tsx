'use client';

import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import Image from "next/image";
import { useContext } from "react";
import { LanguageContext } from "@/context/language-context";
import { translations } from "@/lib/translations";
import { useDynamicSeo } from "@/hooks/use-dynamic-seo";
import { PageHero } from "@/components/sections/page-hero";
import { AnimateOnScroll } from "@/components/animate-on-scroll";
import { Card, CardTitle } from "@/components/ui/card";
import { PlaceHolderImages } from "@/lib/placeholder-images";
import { StructuredData } from "@/components/seo/structured-data";
import { Linkedin, Mail } from "lucide-react";
import { Button } from "@/components/ui/button";

const teamMembers = [
  {
    id: "deny-esa-saputra",
    name: "Deny Esa Saputra",
    title: "Founder & CEO",
    description: "Leveraging over 15 years in Procurement and Supply Chain Management and 5+ years in After Sales Service Support and Business Development Management, He bring a proven track record of optimizing operations across various industries. His core competencies include developing global procurement strategies, driving cost efficiencies, managing vendor relationships, optimizing logistics and inventory, providing exceptional customer support, and leading supply chain digital transformations. He is a proactive, results-oriented leader, exceptionally skilled at problem-solving and adapting to evolving market demands to deliver sustained operational excellence.",
    email: "denyesa@huntr.id",
    linkedin: "https://www.linkedin.com/in/deny-esa-saputra-cscp-3586042a",
    avatarId: "avatar-deny"
  },
  {
    id: "muhamad-a-wildan-m",
    name: "Muhamad A. Wildan M.",
    title: "Co-Founder & CTO",
    description: "Fullstack Engineer & System Architect and as Developer since 2016 using VB. Net and Transformation to UI/UX Developer Since 2022-2023, and back to dev position as Fullstack Engineer Since 2024 - Now",
    email: "wildan@huntr.id",
    linkedin: "https://www.linkedin.com/in/asepwildan",
    avatarId: "avatar-wildan"
  }
];

const siteUrl = 'https://huntr.id';

const teamStructuredData = {
  "@context": "https://schema.org",
  "@type": "ItemList",
  "itemListElement": teamMembers.map((member, index) => {
    const avatarImage = PlaceHolderImages.find(p => p.id === member.avatarId);
    return {
      "@type": "ListItem",
      "position": index + 1,
      "item": {
        "@type": "Person",
        "name": member.name,
        "jobTitle": member.title,
        "image": avatarImage ? `${siteUrl}${avatarImage.imageUrl}` : `${siteUrl}/assets/img/team/${member.avatarId}.jpeg`,
        "sameAs": [member.linkedin],
        "email": member.email,
        "description": member.description
      }
    };
  })
};

export default function OurTeamPage() {
  const context = useContext(LanguageContext);
  const lang = context?.language || 'en';
  const headerT = translations[lang].header;
  const pageT = translations[lang].pages.ourTeam;

  useDynamicSeo({
    title: headerT.ourTeam,
    description: pageT.description,
  });

  return (
    <div className="flex flex-col min-h-dvh bg-background">
      <Header />
      <StructuredData data={teamStructuredData} />
      <main className="flex-1 -mt-24">
        <PageHero title={headerT.ourTeam} subtitle={pageT.description} />
        <section className="py-16 sm:py-24 relative overflow-hidden">
          {/* Decorative background blur */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-primary/5 rounded-full blur-[100px] -z-10 pointer-events-none" />

          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 gap-10 md:gap-14 max-w-5xl mx-auto">
              {teamMembers.map((member, index) => {
                const avatarImage = PlaceHolderImages.find(p => p.id === member.avatarId);
                return (
                  <AnimateOnScroll key={member.id} className="fade-in zoom-in-95 duration-700">
                    <Card className="flex flex-col md:flex-row overflow-hidden group hover:shadow-2xl transition-all duration-500 border-border/50 hover:border-primary/30 bg-card/80 backdrop-blur-sm relative">
                      
                      {/* Image Container (Left) */}
                      <div className="relative w-full md:w-[320px] shrink-0 h-[360px] md:h-auto overflow-hidden bg-muted">
                        {avatarImage && (
                          <Image
                            src={avatarImage.imageUrl}
                            alt={avatarImage.imageAlt || `${member.name}, ${member.title} at HUNTR`}
                            title={avatarImage.imageAlt || `${member.name}, ${member.title} at HUNTR`}
                            fill
                            className="object-cover object-top transition-transform duration-700 group-hover:scale-105"
                            data-ai-hint={avatarImage.imageHint}
                            sizes="(max-width: 768px) 100vw, 320px"
                          />
                        )}
                        <div className="absolute inset-0 bg-gradient-to-t md:bg-gradient-to-r from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                      </div>

                      {/* Content (Right) */}
                      <div className="p-8 md:p-10 flex flex-col flex-1 relative bg-card justify-center">
                        <div className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-3/4 bg-gradient-to-b from-transparent via-primary/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 hidden md:block" />
                        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-3/4 h-1 bg-gradient-to-r from-transparent via-primary/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 md:hidden" />
                        
                        <div className="text-left mb-5">
                          <CardTitle className="font-headline text-2xl md:text-3xl font-bold mb-3 group-hover:text-primary transition-colors">{member.name}</CardTitle>
                          <span className="inline-block px-4 py-1.5 rounded-full bg-primary/10 text-primary font-semibold text-sm">
                            {member.title}
                          </span>
                        </div>
                        
                        <div className="text-muted-foreground text-left leading-relaxed text-sm md:text-base mb-8 flex-1">
                          {member.description}
                        </div>
                        
                        <div className="flex items-center justify-start gap-4 mt-auto pt-6 border-t border-border/50">
                          <Button variant="outline" className="rounded-full hover:bg-primary hover:text-primary-foreground transition-all duration-300" asChild>
                            <a href={`mailto:${member.email}`} aria-label={`Email ${member.name}`}>
                              <Mail className="h-4 w-4 mr-2" /> Email
                            </a>
                          </Button>
                          <Button variant="outline" className="rounded-full hover:bg-[#0A66C2] hover:text-white transition-all duration-300 hover:border-[#0A66C2]" asChild>
                            <a href={member.linkedin} target="_blank" rel="noopener noreferrer" aria-label={`${member.name}'s LinkedIn`}>
                              <Linkedin className="h-4 w-4 mr-2" /> LinkedIn
                            </a>
                          </Button>
                        </div>
                      </div>

                    </Card>
                  </AnimateOnScroll>
                )
              })}
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}

