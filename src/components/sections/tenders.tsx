'use client';

import React, { useContext, useState, useEffect, useCallback } from 'react';
import { LanguageContext } from '@/context/language-context';
import { useModal } from '@/context/modal-context';
import { translations, SampleTender } from '@/lib/translations';

interface ApiRfqItem {
  id: string;
  title: string;
  status: string;
  description?: string;
  company?: {
    name: string;
  };
  created_at?: string;
}

export function Tenders() {
  const langContext = useContext(LanguageContext);
  const lang = langContext?.language || 'en';
  const { openModal } = useModal();
  const t = translations[lang].tenders;

  const [search, setSearch] = useState('');
  const [filter, setFilter] = useState<'all' | 'open' | 'closed'>('all');
  const [apiItems, setApiItems] = useState<ApiRfqItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [isUsingFallback, setIsUsingFallback] = useState(false);

  // Fetch RFQs from API
  const fetchRfqs = useCallback(async () => {
    setLoading(true);
    try {
      const params = new URLSearchParams({
        per_page: '12',
        status: filter,
      });
      if (search.trim()) {
        params.set('search', search.trim());
      }
      const res = await fetch(`/api/rfqs?${params.toString()}`);
      if (!res.ok) throw new Error('API request failed');
      const json = await res.json();
      const list: ApiRfqItem[] = Array.isArray(json) ? json : json.data ?? [];

      if (list.length > 0) {
        setApiItems(list);
        setIsUsingFallback(false);
      } else {
        // Fallback to sample items if no data from remote
        setIsUsingFallback(true);
      }
    } catch {
      setIsUsingFallback(true);
    } finally {
      setLoading(false);
    }
  }, [filter, search]);

  useEffect(() => {
    fetchRfqs();
  }, [fetchRfqs]);

  // If using fallback, filter locally
  const fallbackFiltered = t.sampleItems.filter((item: SampleTender) => {
    const okStatus = filter === 'all' || item.status === filter;
    const okText =
      !search.trim() ||
      (item.title + ' ' + item.org + ' ' + item.desc + ' ' + item.searchTags)
        .toLowerCase()
        .includes(search.toLowerCase());
    return okStatus && okText;
  });

  return (
    <section className="section white" id="tenders">
      <div className="wrap">
        <div className="sectionhead">
          <div className="eyebrow">{t.eyebrow}</div>
          <h2>{t.title}</h2>
          <p>{t.lead}</p>
        </div>

        {/* Search & Filter pills */}
        <div className="tender-tools">
          <input
            id="tenderSearch"
            type="search"
            placeholder={t.searchPlaceholder}
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          <div className="filter-pills">
            <button
              type="button"
              className={filter === 'all' ? 'active' : ''}
              onClick={() => setFilter('all')}
            >
              {t.filterAll}
            </button>
            <button
              type="button"
              className={filter === 'open' ? 'active' : ''}
              onClick={() => setFilter('open')}
            >
              {t.filterOpen}
            </button>
            <button
              type="button"
              className={filter === 'closed' ? 'active' : ''}
              onClick={() => setFilter('closed')}
            >
              {t.filterClosed}
            </button>
          </div>
        </div>

        {/* Tenders Grid */}
        {loading ? (
          <div className="py-12 text-center text-sm font-semibold text-muted">
            {t.loading}
          </div>
        ) : !isUsingFallback && apiItems.length > 0 ? (
          <div className="tender-grid">
            {apiItems.map((item) => {
              const isOpen = item.status === 'open' || item.status === 'active';
              const detailUrl = 'https://app.huntr.id/rfq';
              return (
                <article className="tender-card" key={item.id}>
                  <div className="tender-header">
                    <span className={`status ${isOpen ? '' : 'closed'}`}>
                      {isOpen ? t.filterOpen : t.filterClosed}
                    </span>
                  </div>
                  <h3>
                    <a href={detailUrl} target="_blank" rel="noopener noreferrer">
                      {item.title}
                    </a>
                  </h3>
                  <div className="org">{item.company?.name || 'HUNTR Verified Buyer'}</div>
                  <div className="desc-wrap">
                    <p className="desc-text">
                      {item.description || 'Request for procurement quotation and commercial proposal.'}
                    </p>
                    <a
                      href={detailUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="read-more-link"
                    >
                      {t.readMore}
                    </a>
                  </div>
                  <div className="tender-meta">
                    <span>{t.postedRecent}</span>
                    <a
                      href={detailUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="hover:underline font-bold"
                    >
                      {isOpen ? t.viewOpportunity : t.opportunityClosed}
                    </a>
                  </div>
                </article>
              );
            })}
          </div>
        ) : (
          <div className="tender-grid">
            {fallbackFiltered.map((item) => {
              const isOpen = item.status === 'open';
              const detailUrl = 'https://app.huntr.id/rfq';
              return (
                <article className="tender-card" key={item.id}>
                  <div className="tender-header">
                    <span className={`status ${isOpen ? '' : 'closed'}`}>
                      {isOpen ? t.filterOpen : t.filterClosed}
                    </span>
                  </div>
                  <h3>
                    <a href={detailUrl} target="_blank" rel="noopener noreferrer">
                      {item.title}
                    </a>
                  </h3>
                  <div className="org">{item.org}</div>
                  <div className="desc-wrap">
                    <p className="desc-text">{item.desc}</p>
                    <a
                      href={detailUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="read-more-link"
                    >
                      {t.readMore}
                    </a>
                  </div>
                  <div className="tender-meta">
                    <span>{t.postedRecent}</span>
                    <a
                      href={detailUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="hover:underline font-bold"
                    >
                      {isOpen ? t.viewOpportunity : t.opportunityClosed}
                    </a>
                  </div>
                </article>
              );
            })}
          </div>
        )}

        <p className="approval-note">{t.approvalNote}</p>

        {/* Actions */}
        <div className="actions">
          <button
            type="button"
            className="btn primary"
            onClick={() => openModal('vendor')}
          >
            {t.joinVendor}
          </button>
          <a
            className="btn dark"
            href="mailto:support@huntr.id?subject=HUNTR%20open%20tenders"
          >
            {t.askTenders}
          </a>
          <a
            className="btn outline"
            href="https://app.huntr.id/rfq"
            target="_blank"
            rel="noopener noreferrer"
          >
            {t.seeMore}
          </a>
        </div>
      </div>
    </section>
  );
}
