'use client';

import { useState, useEffect, useContext } from 'react';
import { Button } from '@/components/ui/button';
import { LanguageContext } from '@/context/language-context';

export function CookieConsent() {
  const [showConsent, setShowConsent] = useState(false);
  const context = useContext(LanguageContext);
  const lang = context?.language || 'en';

  const t = lang === 'id'
    ? {
        message: 'Kami menggunakan cookie untuk meningkatkan pengalaman penjelajahan Anda di platform kami.',
        accept: 'Terima',
        decline: 'Tolak',
      }
    : {
        message: 'We use cookies to enhance your browsing experience on our platform.',
        accept: 'Accept',
        decline: 'Decline',
      };

  useEffect(() => {
    try {
      const consent = localStorage.getItem('cookie_consent');
      if (consent === null) {
        setShowConsent(true);
      }
    } catch (e) {
      console.error('Could not access localStorage:', e);
    }
  }, []);

  const handleResponse = (consent: boolean) => {
    try {
      localStorage.setItem('cookie_consent', consent.toString());
      setShowConsent(false);
    } catch (e) {
      console.error('Could not access localStorage:', e);
      setShowConsent(false);
    }
  };

  if (!showConsent) {
    return null;
  }

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 p-4 bg-background/80 backdrop-blur-md border-t border-border">
      <div className="container mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
        <p className="text-sm text-muted-foreground text-center sm:text-left">
          {t.message}
        </p>
        <div className="flex gap-2">
          <Button variant="outline" size="sm" onClick={() => handleResponse(false)}>
            {t.decline}
          </Button>
          <Button size="sm" onClick={() => handleResponse(true)}>
            {t.accept}
          </Button>
        </div>
      </div>
    </div>
  );
}
