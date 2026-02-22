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
      <main className="flex-1 -mt-24">
        <PageHero title={headerT.ourTeam} subtitle={pageT.description} />
        <section className="py-16 sm:py-24">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 gap-8 md:gap-12 max-w-5xl mx-auto">
              {teamMembers.map((member, index) => {
                const avatarImage = PlaceHolderImages.find(p => p.id === member.avatarId);
                return (
                  <AnimateOnScroll key={member.id} className="fade-in zoom-in-95 duration-700" style={{ animationDelay: `${index * 100}ms` }}>
                    <Card className="flex flex-col md:flex-row md:items-center overflow-hidden">
                      
                      {/* Image */}
                      <div className="relative w-full md:w-64 flex-shrink-0 h-80">
                        {avatarImage && (
                          <Image
                            src={avatarImage.imageUrl}
                            alt={member.name}
                            fill
                            className="object-cover"
                            data-ai-hint={avatarImage.imageHint}
                          />
                        )}
                      </div>

                      {/* Content */}
                      <div className="flex-1 p-6 sm:p-8">
                        <div>
                          <CardTitle className="font-headline text-2xl">{member.name}</CardTitle>
                          <p className="text-primary font-medium mt-1">{member.title}</p>
                          <p className="mt-4 text-muted-foreground">{member.description}</p>
                        </div>
                        <div className="mt-6 pt-6 border-t border-border/50 flex items-center gap-2">
                           <Button variant="outline" size="sm" asChild>
                            <a href={`mailto:${member.email}`}>
                              <Mail className="mr-2 h-4 w-4" /> Email
                            </a>
                          </Button>
                          <Button variant="outline" size="sm" asChild>
                            <a href={member.linkedin} target="_blank" rel="noopener noreferrer">
                              <Linkedin className="mr-2 h-4 w-4" /> LinkedIn
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
