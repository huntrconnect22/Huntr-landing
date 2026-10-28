'use client';

import React, { useContext } from 'react';
import { LanguageContext } from '@/context/language-context';
import { useModal } from '@/context/modal-context';
import { translations } from '@/lib/translations';

export function Hero() {
  const langContext = useContext(LanguageContext);
  const lang = langContext?.language || 'en';
  const { openModal } = useModal();
  const t = translations[lang].hero;

  return (
    <section className="hero" id="home">
      <div className="wrap hero-grid">
        <div>
          <div className="eyebrow">{t.eyebrow}</div>
          <h1>{t.title}</h1>
          <p className="tagline">{t.tagline}</p>
          <p className="lead">{t.lead}</p>
          <div className="actions">
            <a className="btn primary" href="#how">
              {t.explore}
            </a>
            <button className="btn dark" type="button" onClick={() => openModal('talk')}>
              {t.talkTeam}
            </button>
          </div>
          <p className="micro">{t.micro}</p>
        </div>

        <div className="visual" aria-hidden="true">
          <div className="visualtop">
            <span>{t.visualLabel}</span>
            <span>{t.visualAudience}</span>
          </div>
          <div className="orbit">
            <div className="hub">
              {t.hubTitle}
              <small>{t.hubSub}</small>
            </div>
            <div className="node n1">
              <span>{t.nodeBuyers}</span>
              <small>{t.nodeBuyersSub}</small>
            </div>
            <div className="node n2">
              <span>{t.nodeVendors}</span>
              <small>{t.nodeVendorsSub}</small>
            </div>
            <div className="node n3">
              <span>{t.nodePurchasing}</span>
              <small>{t.nodePurchasingSub}</small>
            </div>
            <div className="node n4">
              <span>{t.nodeProgress}</span>
              <small>{t.nodeProgressSub}</small>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
