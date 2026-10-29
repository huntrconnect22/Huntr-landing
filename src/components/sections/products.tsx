'use client';

import React, { useContext } from 'react';
import { LanguageContext } from '@/context/language-context';
import { translations, ProductServiceItem } from '@/lib/translations';

export function Products() {
  const langContext = useContext(LanguageContext);
  const lang = langContext?.language || 'en';
  const t = translations[lang].products;

  return (
    <section className="section white" id="products">
      <div className="wrap">
        <div className="sectionhead">
          <div className="eyebrow">{t.eyebrow}</div>
          <h2>{t.title}</h2>
          <p>{t.lead}</p>
        </div>

        <div className="products">
          {t.items.map((item: ProductServiceItem) => (
            <article className="product-service" key={item.name}>
              <div className="picon">{item.icon}</div>
              <div className="ptag">{item.tag}</div>
              <h3>{item.name}</h3>
              <p>{item.desc}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
