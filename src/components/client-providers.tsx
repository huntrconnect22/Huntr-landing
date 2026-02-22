'use client';

import { Toaster } from "@/components/ui/toaster";
import { LanguageProvider, LanguageContext } from '@/context/language-context';
import { useContext, useEffect } from 'react';
import { CookieConsent } from "./cookie-consent";

const MainContent = ({ children }: { children: React.ReactNode }) => {
  const context = useContext(LanguageContext);
  const lang = context?.language || 'en';
  
  useEffect(() => {
    // This only sets the lang attribute for accessibility and client-side logic
    document.documentElement.lang = lang;
  }, [lang]);
  
  return <>{children}</>;
};

export function ClientProviders({ children }: { children: React.ReactNode }) {
  return (
    <LanguageProvider>
      <MainContent>{children}</MainContent>
      <Toaster />
      <CookieConsent />
    </LanguageProvider>
  );
}
