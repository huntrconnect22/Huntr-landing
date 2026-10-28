'use client';

import React, { useContext } from 'react';
import { LanguageContext } from '@/context/language-context';
import { translations, PricingRow } from '@/lib/translations';

export function Pricing() {
  const langContext = useContext(LanguageContext);
  const lang = langContext?.language || 'en';
  const t = translations[lang].pricing;

  return (
    <section className="section white" id="pricing">
      <div className="wrap">
        <div className="sectionhead">
          <div className="eyebrow">{t.eyebrow}</div>
          <h2>{t.title}</h2>
          <p>{t.lead}</p>
        </div>

        {/* 3 Highlights */}
        <div className="pricing-highlights">
          <div className="price-highlight">
            <strong>{t.h1Title}</strong>
            <span>{t.h1Desc}</span>
          </div>
          <div className="price-highlight">
            <strong>{t.h2Title}</strong>
            <span>{t.h2Desc}</span>
          </div>
          <div className="price-highlight">
            <strong>{t.h3Title}</strong>
            <span>{t.h3Desc}</span>
          </div>
        </div>

        {/* Pricing Grid */}
        <div className="pricing-grid">
          <div className="price-panel">
            <h3>{t.trialTitle}</h3>
            <div className="trialbox">
              <small className="tracking-widest uppercase font-bold text-xs">{t.trialBadge}</small>
              <strong>{t.trialHighlight}</strong>
            </div>
            <p className="text-xs text-muted leading-relaxed">{t.trialDesc}</p>
          </div>

          <div className="price-panel">
            <h3>{t.tierTitle}</h3>
            <p className="text-xs text-muted mb-3">{t.tierDesc}</p>
            <div className="overflow-x-auto">
              <table className="pricing-table">
                <thead>
                  <tr>
                    <th>{t.tableThValue}</th>
                    <th>{t.tableThFee}</th>
                    <th>{t.tableThDetails}</th>
                  </tr>
                </thead>
                <tbody>
                  {t.tableRows.map((row: PricingRow, idx: number) => (
                    <tr key={idx}>
                      <td>{row.tier}</td>
                      <td>{row.fee}</td>
                      <td>{row.details}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        <p className="approval-note">{t.approvalNote}</p>
      </div>
    </section>
  );
}

