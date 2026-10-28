'use client';

import React, { useContext, useState } from 'react';
import { LanguageContext } from '@/context/language-context';
import { useModal } from '@/context/modal-context';
import { translations } from '@/lib/translations';

export function Journey() {
  const langContext = useContext(LanguageContext);
  const lang = langContext?.language || 'en';
  const { openModal } = useModal();
  const t = translations[lang].journey;

  const [activeTab, setActiveTab] = useState<'buyer' | 'vendor'>('buyer');

  const title = activeTab === 'buyer' ? t.buyerTitle : t.vendorTitle;
  const desc = activeTab === 'buyer' ? t.buyerDesc : t.vendorDesc;
  const ctaText = activeTab === 'buyer' ? t.buyerCta : t.vendorCta;
  const steps = activeTab === 'buyer' ? t.buyerSteps : t.vendorSteps;

  return (
    <section className="section" id="how">
      <div className="wrap">
        <div className="sectionhead">
          <div className="eyebrow">{t.eyebrow}</div>
          <h2>{t.title}</h2>
          <p>{t.lead}</p>
        </div>

        <div className="journey">
          <div className="tabs" role="tablist">
            <button
              type="button"
              id="buyerTab"
              role="tab"
              aria-selected={activeTab === 'buyer'}
              className={activeTab === 'buyer' ? 'active' : ''}
              onClick={() => setActiveTab('buyer')}
            >
              {t.buyerTab}
            </button>
            <button
              type="button"
              id="vendorTab"
              role="tab"
              aria-selected={activeTab === 'vendor'}
              className={activeTab === 'vendor' ? 'active' : ''}
              onClick={() => setActiveTab('vendor')}
            >
              {t.vendorTab}
            </button>
          </div>

          <div className="journeycontent">
            <div>
              <h3>{title}</h3>
              <p>{desc}</p>
              <button
                type="button"
                className="btn primary"
                onClick={() => openModal(activeTab)}
              >
                {ctaText}
              </button>
            </div>

            <div className="steps">
              {steps.map((step, idx) => (
                <div className="step" key={idx}>
                  <div className="stepno">{idx + 1}</div>
                  <div>
                    <strong>{step.title}</strong>
                    <span>{step.desc}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

