'use client';

import React, { useContext } from 'react';
import { LanguageContext } from '@/context/language-context';
import { useModal } from '@/context/modal-context';
import { translations } from '@/lib/translations';

export function VendorBand() {
  const langContext = useContext(LanguageContext);
  const lang = langContext?.language || 'en';
  const { openModal } = useModal();
  const t = translations[lang].vendorBand;

  return (
    <section className="section" id="vendors">
      <div className="wrap">
        <div className="vendorband">
          <div>
            <div className="eyebrow">{t.eyebrow}</div>
            <h2>{t.title}</h2>
            <p>{t.lead}</p>
          </div>
          <button
            type="button"
            className="btn dark"
            onClick={() => openModal('vendor')}
          >
            {t.cta}
          </button>
        </div>
      </div>
    </section>
  );
}

