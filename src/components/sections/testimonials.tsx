'use client';

import { useContext } from 'react';
import { LanguageContext } from '@/context/language-context';
import { translations } from '@/lib/translations';

export function Testimonials() {
  const context = useContext(LanguageContext);
  const lang = context?.language || 'en';
  const t = translations[lang].testimonials;

  return (
    <section className="section black" id="testimonials" style={{ paddingTop: 0 }}>
      <div className="wrap">
        <div className="sectionhead" style={{ textAlign: 'center', margin: 'auto' }}>
          <div className="eyebrow">{t.eyebrow}</div>
          <h2>{t.title}</h2>
          <p>{t.lead}</p>
        </div>
        <div className="quote-grid">
          <article className="quote-card">
            <blockquote>{t.quote1}</blockquote>
            <strong>{t.author1}</strong>
            <small>{t.role1}</small>
          </article>
          <article className="quote-card">
            <blockquote>{t.quote2}</blockquote>
            <strong>{t.author2}</strong>
            <small>{t.role2}</small>
          </article>
        </div>
        <p className="approval-note" style={{ color: '#c9c5bf' }}>
          {t.approvalNote}
        </p>
      </div>
    </section>
  );
}
