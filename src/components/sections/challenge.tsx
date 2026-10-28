'use client';

import React, { useContext } from 'react';
import { LanguageContext } from '@/context/language-context';
import { translations } from '@/lib/translations';

export function Challenge() {
  const langContext = useContext(LanguageContext);
  const lang = langContext?.language || 'en';
  const t = translations[lang].challenge;

  return (
    <section className="section white" id="problems">
      <div className="wrap">
        <div className="sectionhead">
          <div className="eyebrow">{t.eyebrow}</div>
          <h2>{t.title}</h2>
          <p>{t.lead}</p>
        </div>
        <div className="cards">
          <article className="problem">
            <div className="num">01 / <span>{t.findLabel}</span></div>
            <h3>{t.p1Title}</h3>
            <p>{t.p1Text}</p>
          </article>
          <article className="problem">
            <div className="num">02 / <span>{t.organiseLabel}</span></div>
            <h3>{t.p2Title}</h3>
            <p>{t.p2Text}</p>
          </article>
          <article className="problem">
            <div className="num">03 / <span>{t.trackLabel}</span></div>
            <h3>{t.p3Title}</h3>
            <p>{t.p3Text}</p>
          </article>
        </div>
      </div>
    </section>
  );
}

