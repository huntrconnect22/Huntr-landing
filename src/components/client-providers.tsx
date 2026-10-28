'use client';

import { Toaster } from "@/components/ui/toaster";
import { LanguageProvider, LanguageContext } from '@/context/language-context';
import { ModalProvider } from '@/context/modal-context';
import { useContext, useEffect } from 'react';
import { CookieConsent } from "./cookie-consent";

const MainContent = ({ children }: { children: React.ReactNode }) => {
  const context = useContext(LanguageContext);
  const lang = context?.language || 'en';
  
  useEffect(() => {
    document.documentElement.lang = lang;
  }, [lang]);
  
  return <>{children}</>;
};

export function ClientProviders({ children }: { children: React.ReactNode }) {
  return (
    <LanguageProvider>
      <ModalProvider>
        <MainContent>{children}</MainContent>
        <Toaster />
        <CookieConsent />
      </ModalProvider>
    </LanguageProvider>
  );
}
