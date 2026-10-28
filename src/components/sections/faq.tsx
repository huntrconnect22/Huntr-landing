'use client';

import { useContext } from 'react';
import { LanguageContext } from '@/context/language-context';
import { translations } from '@/lib/translations';

export function Faq() {
  const context = useContext(LanguageContext);
  const lang = context?.language || 'en';
  const t = translations[lang].faq;

  return (
    <section className="section white" id="faq">
      <div className="wrap">
        <div className="sectionhead">
          <div className="eyebrow">{t.eyebrow}</div>
          <h2>{t.title}</h2>
          <p>{t.lead}</p>
        </div>
        <div className="faqs">
          {t.items.map((item, index) => (
            <details key={index}>
              <summary>{item.q}</summary>
              <p>{item.a}</p>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}
