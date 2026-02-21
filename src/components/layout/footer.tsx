'use client';

import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Twitter, Linkedin, Facebook } from 'lucide-react';
import { useEffect, useState, useContext } from "react";
import { LanguageContext } from "@/context/language-context";
import { translations } from "@/lib/translations";

export function Footer() {
  const [currentYear, setCurrentYear] = useState<number | null>(null);
  const context = useContext(LanguageContext);
  const lang = context?.language || 'en';
  const t = translations[lang].footer;
  const headerT = translations[lang].header;

  useEffect(() => {
    setCurrentYear(new Date().getFullYear());
  }, []);

  const insightLinks = [
    { href: '/use-case', label: headerT.useCase },
    { href: '/news', label: headerT.news },
    { href: '/article', label: headerT.article },
  ];

  const companyLinks = [
    { href: '/our-company', label: headerT.ourCompany },
    { href: '/our-team', label: headerT.ourTeam },
    { href: '/careers', label: headerT.careers },
    { href: '/investor-relations', label: headerT.investorRelations },
  ];

  const legalLinks = [
    { href: '/privacy-policy', label: headerT.privacyPolicy },
  ];

  return (
    <footer className="border-t bg-secondary/50">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-5 gap-8">
          {/* Left Section */}
          <div className="md:col-span-2">
            <Link href="/" className="flex items-center space-x-2 mb-4">
              <Image src="/assets/img/logo-dark.png" alt="Huntr Logo" width={120} height={30} />
            </Link>
            <p className="text-muted-foreground max-w-sm mb-6">
              {t.description}
            </p>
            <div className="flex gap-2">
              <Button variant="ghost" size="icon" asChild>
                <Link href="#" aria-label="Twitter">
                  <Twitter className="h-5 w-5" />
                </Link>
              </Button>
              <Button variant="ghost" size="icon" asChild>
                <Link href="#" aria-label="LinkedIn">
                  <Linkedin className="h-5 w-5" />
                </Link>
              </Button>
              <Button variant="ghost" size="icon" asChild>
                <Link href="#" aria-label="Facebook">
                  <Facebook className="h-5 w-5" />
                </Link>
              </Button>
            </div>
          </div>

          {/* Right Section - Links */}
          <div className="md:col-span-3 grid grid-cols-2 sm:grid-cols-3 gap-8">
            <div>
              <h4 className="font-headline font-bold mb-4">{t.insight}</h4>
              <ul className="space-y-2">
                {insightLinks.map(link => (
                  <li key={link.href}>
                    <Link href={link.href} className="text-muted-foreground hover:text-primary transition-colors">
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h4 className="font-headline font-bold mb-4">{t.company}</h4>
              <ul className="space-y-2">
                {companyLinks.map(link => (
                  <li key={link.href}>
                    <Link href={link.href} className="text-muted-foreground hover:text-primary transition-colors">
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h4 className="font-headline font-bold mb-4">{t.legal}</h4>
              <ul className="space-y-2">
                {legalLinks.map(link => (
                  <li key={link.href}>
                    <Link href={link.href} className="text-muted-foreground hover:text-primary transition-colors">
                      {link.label}
                    </Link>
                  </li>
                ))}
                 <li>
                    <Link href="/contact" className="text-muted-foreground hover:text-primary transition-colors">
                      {headerT.contact}
                    </Link>
                  </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
      <div className="border-t">
        <div className="container mx-auto px-4 py-4 text-center text-sm text-muted-foreground">
          &copy; {currentYear} {t.copy}
        </div>
      </div>
    </footer>
  );
}
