'use client';

import React, { useContext } from 'react';
import { LanguageContext } from '@/context/language-context';
import { translations } from '@/lib/translations';

export function About() {
  const langContext = useContext(LanguageContext);
  const lang = langContext?.language || 'en';
  const t = translations[lang].about;

  return (
    <section className="section black" id="about">
      <div className="wrap">
        <div className="sectionhead">
          <div className="eyebrow">{t.eyebrow}</div>
          <h2>{t.title}</h2>
          <p>{t.lead}</p>
        </div>

        <div className="about-grid">
          <article className="about-card">
            <h3>{t.journeyTitle}</h3>
            <p>{t.journeyP1}</p>
            <p className="mt-3">{t.journeyP2}</p>
          </article>

          <article className="about-card">
            <h3>{t.visionTitle}</h3>
            <p>{t.visionDesc}</p>
            <h3 style={{ marginTop: '22px' }}>{t.missionTitle}</h3>
            <p>{t.missionDesc}</p>
          </article>
        </div>

        <p className="approval-note" style={{ color: '#c9c5bf' }}>
          {t.approvalNote}
        </p>
      </div>
    </section>
  );
}

