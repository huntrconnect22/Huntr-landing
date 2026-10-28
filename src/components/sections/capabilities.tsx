'use client';

import React, { useContext } from 'react';
import { LanguageContext } from '@/context/language-context';
import { translations, CapabilityItem } from '@/lib/translations';

export function Capabilities() {
  const langContext = useContext(LanguageContext);
  const lang = langContext?.language || 'en';
  const t = translations[lang].capabilities;

  return (
    <section className="section black" id="capabilities">
      <div className="wrap">
        <div className="sectionhead">
          <div className="eyebrow">{t.eyebrow}</div>
          <h2>{t.title}</h2>
          <p>{t.lead}</p>
        </div>

        <div className="capabilities">
          {t.items.map((item: CapabilityItem) => (
            <article className="capability" key={item.no}>
              <div className="capno">{item.no}</div>
              <h3>{item.title}</h3>
              <p>{item.desc}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

