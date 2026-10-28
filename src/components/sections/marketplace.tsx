'use client';

import React, { useContext, useState, useEffect } from 'react';
import Image from 'next/image';
import { LanguageContext } from '@/context/language-context';
import { useModal } from '@/context/modal-context';
import { translations, SampleProduct } from '@/lib/translations';

interface ApiProduct {
  id: string;
  name: string;
  category?: string | null;
  uom?: string | null;
  image_url?: string | null;
  brand?: string | null;
  company?: {
    name: string;
  };
}

export function Marketplace() {
  const langContext = useContext(LanguageContext);
  const lang = langContext?.language || 'en';
  const { openModal } = useModal();
  const t = translations[lang].marketplace;

  const [products, setProducts] = useState<ApiProduct[]>([]);
  const [loading, setLoading] = useState(true);
  const [isUsingFallback, setIsUsingFallback] = useState(false);

  useEffect(() => {
    async function loadProducts() {
      setLoading(true);
      try {
        const res = await fetch('/api/catalogues?per_page=8&page=1');
        if (!res.ok) throw new Error('Failed to fetch catalogues');
        const json = await res.json();
        const list: ApiProduct[] = Array.isArray(json) ? json : json.data ?? [];

        if (list.length > 0) {
          setProducts(list.slice(0, 8));
          setIsUsingFallback(false);
        } else {
          setIsUsingFallback(true);
        }
      } catch {
        setIsUsingFallback(true);
      } finally {
        setLoading(false);
      }
    }

    loadProducts();
  }, []);

  return (
    <section className="section" id="marketplace">
      <div className="wrap">
        <div className="sectionhead">
          <div className="eyebrow">{t.eyebrow}</div>
          <h2>{t.title}</h2>
          <p>{t.lead}</p>
        </div>

        {/* Product Grid */}
        {loading ? (
          <div className="py-12 text-center text-sm font-semibold text-muted">
            {t.loading}
          </div>
        ) : !isUsingFallback && products.length > 0 ? (
          <div className="product-grid">
            {products.map((item, idx) => {
              const defaultIcons = ['▣', '▱', '▤', '▰'];
              const icon = defaultIcons[idx % defaultIcons.length];
              return (
                <article className="product-card" key={item.id}>
                  <div className="product-image">
                    {item.image_url ? (
                      <Image
                        src={item.image_url}
                        alt={item.name}
                        fill
                        className="object-cover"
                        sizes="(max-width: 768px) 100vw, 25vw"
                      />
                    ) : (
                      <span>{icon}</span>
                    )}
                  </div>
                  <div className="product-body">
                    <div className="product-tags">
                      {item.category && (
                        <span className="product-tag">{item.category}</span>
                      )}
                      {item.uom && <span className="product-tag">{item.uom}</span>}
                    </div>

                    <div className="product-header">
                      <h3 className="product-title" title={item.name}>
                        {item.name}
                      </h3>
                    </div>

                    <div className="product-desc-wrap">
                      <p className="product-desc">
                        {item.company?.name
                          ? `Offered by ${item.company.name}`
                          : 'Verified commercial product listing from HUNTR vendor.'}
                      </p>
                    </div>

                    <div className="product-action">
                      <button
                        type="button"
                        className="btn primary"
                        onClick={() => openModal('buyer', item.name)}
                      >
                        {t.requestDetails}
                      </button>
                    </div>
                  </div>
                </article>
              );
            })}
          </div>
        ) : (
          <div className="product-grid">
            {t.sampleProducts.map((item: SampleProduct) => (
              <article className="product-card" key={item.id}>
                <div className="product-image">
                  <span>{item.icon}</span>
                </div>
                <div className="product-body">
                  <div className="product-tags">
                    {item.tags.map((tag, i) => (
                      <span className="product-tag" key={i}>
                        {tag}
                      </span>
                    ))}
                  </div>

                  <div className="product-header">
                    <h3 className="product-title" title={item.title}>
                      {item.title}
                    </h3>
                  </div>

                  <div className="product-desc-wrap">
                    <p className="product-desc">{item.desc}</p>
                  </div>

                  <div className="product-action">
                    <button
                      type="button"
                      className="btn primary"
                      onClick={() => openModal('buyer', item.title)}
                    >
                      {t.requestDetails}
                    </button>
                  </div>
                </div>
              </article>
            ))}
          </div>
        )}

        <div className="actions" style={{ justifyContent: 'center', marginTop: '28px' }}>
          <a
            className="btn primary"
            href="https://app.huntr.id/marketplace"
            target="_blank"
            rel="noopener noreferrer"
          >
            {t.exploreMarketplace}
          </a>
        </div>

        <p className="approval-note">{t.approvalNote}</p>
      </div>
    </section>
  );
}
