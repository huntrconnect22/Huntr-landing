'use client';

import React, { useContext } from 'react';
import { LanguageContext } from '@/context/language-context';
import { translations } from '@/lib/translations';

export function Benefits() {
  const langContext = useContext(LanguageContext);
  const lang = langContext?.language || 'en';
  const t = translations[lang].benefits;

  return (
    <section className="section yellowbg" id="benefits">
      <div className="wrap">
        <div className="benefitintro">
          <div className="eyebrow">{t.eyebrow}</div>
          <h2>{t.title}</h2>
          <p>{t.lead}</p>
        </div>

        <div className="benefits">
          <article className="benefit">
            <div>
              <div className="tag">{t.b1Tag}</div>
              <h3>{t.b1Title}</h3>
              <p>{t.b1Text}</p>
            </div>
            <div className="icon">⌕</div>
          </article>

          <article className="benefit">
            <div>
              <div className="tag">{t.b2Tag}</div>
              <h3>{t.b2Title}</h3>
              <p>{t.b2Text}</p>
            </div>
            <div className="icon">≡</div>
          </article>

          <article className="benefit">
            <div>
              <div className="tag">{t.b3Tag}</div>
              <h3>{t.b3Title}</h3>
              <p>{t.b3Text}</p>
            </div>
            <div className="icon">↔</div>
          </article>

          <article className="benefit">
            <div>
              <div className="tag">{t.b4Tag}</div>
              <h3>{t.b4Title}</h3>
              <p>{t.b4Text}</p>
            </div>
            <div className="icon">✓</div>
          </article>
        </div>

        <p className="note">{t.note}</p>
      </div>
    </section>
  );
}

