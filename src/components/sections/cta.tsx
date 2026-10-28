'use client';

import { useContext } from 'react';
import { LanguageContext } from '@/context/language-context';
import { translations } from '@/lib/translations';
import { useModal } from '@/context/modal-context';

export function Cta() {
  const context = useContext(LanguageContext);
  const lang = context?.language || 'en';
  const t = translations[lang].cta;
  const { openModal } = useModal();

  return (
    <section className="section">
      <div className="wrap">
        <div className="ctapanel">
          <div>
            <div className="eyebrow">{t.eyebrow}</div>
            <h2>{t.title}</h2>
            <p>{t.lead}</p>
            <div className="contactline">
              <a href={`mailto:${t.email}`}>{t.email}</a>
              <a
                href="https://www.linkedin.com/company/huntr-id/posts/?feedView=all"
                target="_blank"
                rel="noopener noreferrer"
              >
                {t.linkedinText}
              </a>
            </div>
          </div>
          <button
            className="btn yellow"
            onClick={() => openModal('talk')}
            type="button"
          >
            {t.btn}
          </button>
        </div>
      </div>
    </section>
  );
}
