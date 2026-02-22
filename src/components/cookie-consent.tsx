'use client';

import { useState, useEffect, useContext } from 'react';
import { Button } from '@/components/ui/button';
import { LanguageContext } from '@/context/language-context';
import { translations } from '@/lib/translations';

export function CookieConsent() {
  const [showConsent, setShowConsent] = useState(false);
  const context = useContext(LanguageContext);
  const lang = context?.language || 'en';
  const t = translations[lang].cookie;

  useEffect(() => {
    try {
      const consent = localStorage.getItem('cookie_consent');
      if (consent === null) {
        setShowConsent(true);
      }
    } catch (e) {
      // localStorage is not available
      console.error('Could not access localStorage:', e);
    }
  }, []);

  const handleResponse = (consent: boolean) => {
     try {
      localStorage.setItem('cookie_consent', consent.toString());
      setShowConsent(false);
    } catch (e) {
      console.error('Could not access localStorage:', e);
    }
  };

  if (!showConsent || !t) {
    return null;
  }

  return (
    <div className="fixed bottom-4 left-4 right-4 z-[200] animate-in fade-in slide-in-from-bottom-5 duration-500 sm:left-auto">
      <div className="max-w-md rounded-lg border border-white/10 bg-black/30 p-4 shadow-lg backdrop-blur-sm">
        <p className="text-sm text-white/80">
          {t.message}
        </p>
        <div className="mt-4 flex items-center gap-2">
          <Button 
            className="flex-1 bg-primary text-primary-foreground hover:bg-primary/90"
            size="sm" 
            onClick={() => handleResponse(true)}
          >
            {t.accept}
          </Button>
          <Button 
            className="flex-1 border-white/20 bg-white/10 text-white hover:bg-white/20"
            variant="outline" 
            size="sm" 
            onClick={() => handleResponse(false)}
          >
            {t.decline}
          </Button>
        </div>
      </div>
    </div>
  );
}
