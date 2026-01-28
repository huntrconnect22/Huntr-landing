'use client';

import Link from 'next/link';
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

export function Header() {
  const context = useContext(LanguageContext);
  const lang = context?.language || 'en';
  const t = translations[lang].header;

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-14 max-w-screen-2xl items-center px-6">
        <div className="mr-4 flex items-center">
          <Link href="/" className="mr-6 flex items-center space-x-2">
            <HuntrLogo className="h-6 w-6 text-primary" />
            <span className="font-bold sm:inline-block font-headline">
              Huntr
            </span>
          </Link>
          <nav className="hidden items-center gap-6 text-sm md:flex">
            <Link
              href="/#solutions"
              className="font-medium text-foreground/60 transition-colors hover:text-foreground/80"
            >
              {t.solutions}
            </Link>
            <Link
              href="/#features"
              className="font-medium text-foreground/60 transition-colors hover:text-foreground/80"
            >
              {t.features}
            </Link>

            <DropdownMenu>
              <DropdownMenuTrigger className="flex items-center gap-1 font-medium text-foreground/60 transition-colors hover:text-foreground/80 focus:outline-none">
                {t.insight}
                <ChevronDown className="h-4 w-4" />
              </DropdownMenuTrigger>
              <DropdownMenuContent align="start">
                <DropdownMenuItem asChild>
                  <Link href="/use-case">{t.useCase}</Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link href="/news">{t.news}</Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link href="/article">{t.article}</Link>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>

            <Link
              href="/#contact"
              className="font-medium text-foreground/60 transition-colors hover:text-foreground/80"
            >
              {t.contact}
            </Link>
          </nav>
        </div>
        <div className="flex flex-1 items-center justify-end space-x-2">
          <LanguageToggle />
          <Button asChild>
            <Link href="/#contact">{t.requestDemo}</Link>
          </Button>
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="outline" size="icon" className="md:hidden">
                <Menu className="h-4 w-4" />
                <span className="sr-only">{t.openMenu}</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="right">
              <Link href="/" className="mr-6 flex items-center space-x-2">
                <HuntrLogo className="h-6 w-6 text-primary" />
                <span className="font-bold font-headline">Huntr</span>
              </Link>
              <div className="mt-6 flex flex-col gap-4">
                <Link
                  href="/#solutions"
                  className="font-medium text-foreground/60 transition-colors hover:text-foreground/80"
                >
                  {t.solutions}
                </Link>
                <Link
                  href="/#features"
                  className="font-medium text-foreground/60 transition-colors hover:text-foreground/80"
                >
                  {t.features}
                </Link>
                
                <div className="flex flex-col gap-3 pt-2">
                  <h4 className="font-semibold text-foreground/80">{t.insight}</h4>
                  <Link href="/use-case" className="pl-2 font-medium text-foreground/60 transition-colors hover:text-foreground/80">
                    {t.useCase}
                  </Link>
                  <Link href="/news" className="pl-2 font-medium text-foreground/60 transition-colors hover:text-foreground/80">
                    {t.news}
                  </Link>
                  <Link href="/article" className="pl-2 font-medium text-foreground/60 transition-colors hover:text-foreground/80">
                    {t.article}
                  </Link>
                </div>

                <Link
                  href="/#contact"
                  className="pt-2 font-medium text-foreground/60 transition-colors hover:text-foreground/80"
                >
                  {t.contact}
                </Link>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}
