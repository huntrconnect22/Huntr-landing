'use client';

import React, { useContext, useEffect, useState } from 'react';
import { FaWhatsapp } from 'react-icons/fa';
import { X } from 'lucide-react';
import { LanguageContext } from '@/context/language-context';
import { translations } from '@/lib/translations';

const WHATSAPP_URL = 'https://wa.me/6285719965558';

export function WhatsAppButton() {
  const langContext = useContext(LanguageContext);
  const lang = langContext?.language || 'en';
  const t = translations[lang].whatsapp;
  const [showBubble, setShowBubble] = useState(false);
  const [dismissed, setDismissed] = useState(false);

  useEffect(() => {
    if (dismissed) return;
    const timer = setTimeout(() => setShowBubble(true), 2500);
    return () => clearTimeout(timer);
  }, [dismissed]);

  return (
    <div className="wa-float">
      {showBubble && !dismissed && (
        <div className="wa-card" role="dialog" aria-label={t.label}>
          <button
            type="button"
            className="wa-close"
            aria-label="Close"
            onClick={() => {
              setDismissed(true);
              setShowBubble(false);
            }}
          >
            <X className="h-3.5 w-3.5" />
          </button>

          <div className="wa-head">
            <span className="wa-avatar">
              <FaWhatsapp className="h-5 w-5" />
            </span>
            <span className="wa-headtext">
              <strong>{t.name}</strong>
              <small>{t.status}</small>
            </span>
          </div>

          <p className="wa-message">{t.message}</p>

          <a
            className="wa-cta"
            href={WHATSAPP_URL}
            target="_blank"
            rel="noopener noreferrer"
          >
            <FaWhatsapp className="h-4 w-4" />
            {t.cta}
          </a>
        </div>
      )}

      <a
        className="wa-btn"
        href={WHATSAPP_URL}
        target="_blank"
        rel="noopener noreferrer"
        aria-label={t.label}
        onClick={() => setShowBubble(false)}
      >
        <FaWhatsapp className="h-7 w-7" />
        {!dismissed && !showBubble && <span className="wa-ping" aria-hidden="true" />}
      </a>
    </div>
  );
}
