'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { HuntrLogo } from '@/components/icons';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { Menu, ChevronDown } from 'lucide-react';
import { useContext } from 'react';
import { LanguageContext } from '@/context/language-context';
import { translations } from '@/lib/translations';
import { LanguageToggle } from '@/components/language-toggle';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Separator } from '@/components/ui/separator';
import { cn } from '@/lib/utils';

export function Header() {
  const context = useContext(LanguageContext);
  const lang = context?.language || 'en';
  const t = translations[lang].header;
  const pathname = usePathname();

  const navLinks = [
    {
      title: t.insight,
      items: [
        { href: '/use-case', title: t.useCase },
        { href: '/news', title: t.news },
        { href: '/article', title: t.article },
      ],
    },
    {
      title: t.about,
      items: [
        { href: '/our-company', title: t.ourCompany },
        { href: '/our-team', title: t.ourTeam },
        { href: '/privacy-policy', title: t.privacyPolicy },
      ]
    }
  ];

  return (
    <header className="sticky top-0 z-50 w-full">
      <div className="relative mx-auto mt-4 flex h-20 max-w-4xl items-center justify-between rounded-2xl border border-border/40 bg-background/95 px-4 shadow-sm backdrop-blur supports-[backdrop-filter]:bg-background/60">
        
        {/* Left side: Logo & Mobile Menu Trigger */}
        <div className="flex items-center">
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="outline" size="icon" className="md:hidden mr-4">
                <Menu className="h-4 w-4" />
                <span className="sr-only">{t.openMenu}</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="w-full max-w-sm">
               <div className="flex items-center justify-between">
                <Link href="/" className="flex items-center space-x-2">
                  <HuntrLogo className="h-6 w-6 text-primary" />
                  <span className="font-bold font-headline">Huntr</span>
                </Link>
                <LanguageToggle />
              </div>
              <Separator className="my-4"/>

              <div className="flex h-[calc(100%-5rem)] flex-col">
                <div className="flex flex-col gap-2">
                  <Link href="/" className={cn("px-2 py-2 font-medium transition-colors hover:text-primary", pathname === "/" ? "text-primary" : "text-foreground/80")}>
                      {t.home}
                  </Link>
                  <Accordion type="single" collapsible className="w-full">
                    {navLinks.map((link) => {
                      const isActive = link.items.some((item) => pathname.startsWith(item.href));
                      return (
                        <AccordionItem value={link.title} key={link.title} className="border-b-0">
                          <AccordionTrigger className={cn("px-2 py-2 font-medium hover:no-underline hover:text-primary", isActive ? "text-primary" : "text-foreground/80")}>
                            {link.title}
                          </AccordionTrigger>
                          <AccordionContent>
                            <div className="flex flex-col gap-4 pl-6 pt-2">
                              {link.items.map((item) => (
                                <Link key={item.href} href={item.href} className={cn("transition-colors hover:text-primary", pathname.startsWith(item.href) ? "text-primary" : "text-foreground/60")}>
                                    {item.title}
                                  </Link>
                              ))}
                            </div>
                          </AccordionContent>
                        </AccordionItem>
                      )
                    })}
                  </Accordion>
                  <Link href="/contact" className={cn("px-2 py-2 font-medium transition-colors hover:text-primary", pathname === "/contact" ? "text-primary" : "text-foreground/80")}>
                    {t.contact}
                  </Link>
                </div>
              </div>
            </SheetContent>
          </Sheet>
          
          <Link href="/" className="flex items-center space-x-2">
            <HuntrLogo className="h-6 w-6 text-primary" />
            <span className="font-bold sm:inline-block font-headline">
              Huntr
            </span>
          </Link>
        </div>

        {/* Center Nav (Desktop) */}
        <nav className="absolute left-1/2 top-1/2 hidden -translate-x-1/2 -translate-y-1/2 items-center justify-center gap-6 text-sm md:flex">
          <Link
            href="/"
            className={cn("font-medium transition-colors hover:text-primary", pathname === "/" ? "text-primary" : "text-foreground/80")}
          >
            {t.home}
          </Link>
          {navLinks.map((link) => {
            const isActive = link.items.some(item => pathname.startsWith(item.href));
            return (
             <DropdownMenu key={link.title}>
              <DropdownMenuTrigger className={cn("flex items-center gap-1 font-medium transition-colors hover:text-primary focus:outline-none", isActive ? "text-primary" : "text-foreground/80")}>
                {link.title}
                <ChevronDown className="h-4 w-4" />
              </DropdownMenuTrigger>
              <DropdownMenuContent align="center">
                {link.items.map((item) => (
                  <DropdownMenuItem key={item.href} asChild className={pathname.startsWith(item.href) ? 'bg-accent' : ''}>
                    <Link href={item.href}>{item.title}</Link>
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>
          )})}
           <Link
            href="/contact"
            className={cn("font-medium transition-colors hover:text-primary", pathname === "/contact" ? "text-primary" : "text-foreground/80")}
          >
            {t.contact}
          </Link>
        </nav>

        {/* Right Side: Actions */}
        <div className="flex items-center justify-end gap-2">
          <div className="hidden md:flex items-center gap-2">
             <LanguageToggle />
          </div>
        </div>
      </div>
    </header>
  );
}
