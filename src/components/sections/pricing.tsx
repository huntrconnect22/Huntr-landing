'use client';

import React, { useContext } from 'react';
import { LanguageContext } from '@/context/language-context';
import { useModal } from '@/context/modal-context';
import { translations, PricingPackage } from '@/lib/translations';

export function Pricing() {
  const langContext = useContext(LanguageContext);
  const lang = langContext?.language || 'en';
  const { openModal } = useModal();
  const t = translations[lang].pricing;

  return (
    <section className="section white" id="pricing">
      <div className="wrap">
        <div className="sectionhead" style={{ textAlign: 'center', margin: '0 auto 32px' }}>
          <div className="eyebrow">{t.eyebrow}</div>
          <h2>{t.title}</h2>
          <p style={{ margin: '0 auto' }}>{t.lead}</p>
        </div>

        {/* 3 Packages Grid */}
        <div className="pricing-grid">
          {t.packages.map((pkg: PricingPackage) => {
            const isPopular = pkg.popular;
            return (
              <article
                key={pkg.id}
                className={`pricing-card ${isPopular ? 'popular' : ''}`}
              >
                {isPopular && pkg.popularBadge && (
                  <span className="pricing-badge">{pkg.popularBadge}</span>
                )}

                <div className="pricing-header">
                  <h3>{pkg.name}</h3>
                </div>

                <div className="pricing-price-wrap">
                  <span className="pricing-price">{pkg.price}</span>
                  <span className="pricing-period">{pkg.period}</span>
                </div>

                <ul className="pricing-features">
                  {pkg.features.map((feature: string, idx: number) => (
                    <li key={idx} className="pricing-feature">
                      <span className="pricing-feature-icon">✓</span>
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>

                <button
                  type="button"
                  className={`btn ${isPopular ? 'primary' : 'dark'}`}
                  onClick={() => openModal('buyer', `Paket ${pkg.name}`)}
                >
                  {pkg.cta}
                </button>
              </article>
            );
          })}
        </div>

        <p className="approval-note" style={{ textAlign: 'center', marginTop: '36px' }}>
          {t.approvalNote}
        </p>
      </div>
    </section>
  );
}
