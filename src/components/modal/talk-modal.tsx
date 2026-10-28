'use client';

import React, { useState, useEffect } from 'react';
import { useModal } from '@/context/modal-context';
import { useContext } from 'react';
import { LanguageContext } from '@/context/language-context';
import { translations } from '@/lib/translations';

export function TalkModal() {
  const { isOpen, kind, productContext, closeModal } = useModal();
  const langContext = useContext(LanguageContext);
  const lang = langContext?.language || 'en';
  const t = translations[lang].modal;

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [interest, setInterest] = useState<'buyer' | 'vendor' | 'learn'>('buyer');
  const [message, setMessage] = useState('');
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    if (kind === 'buyer') {
      setInterest('buyer');
    } else if (kind === 'vendor') {
      setInterest('vendor');
    } else {
      setInterest('learn');
    }

    if (productContext) {
      setMessage(
        lang === 'id'
          ? `Saya tertarik dengan produk: ${productContext}`
          : `I am interested in product: ${productContext}`
      );
    } else {
      setMessage('');
    }

    setSubmitted(false);
  }, [kind, productContext, lang, isOpen]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        closeModal();
      }
    };
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleKeyDown);
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, closeModal]);

  if (!isOpen) return null;

  const modalTitle =
    kind === 'buyer'
      ? t.titleBuyer
      : kind === 'vendor'
      ? t.titleVendor
      : t.titleTalk;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <div
      className="modal"
      role="dialog"
      aria-modal="true"
      aria-labelledby="modalTitle"
      onClick={(e) => {
        if (e.target === e.currentTarget) closeModal();
      }}
    >
      <div className="modalbox">
        <button className="close" aria-label="Close" onClick={closeModal}>
          ×
        </button>
        <h2 id="modalTitle">{modalTitle}</h2>
        <p>{t.lead}</p>

        <form onSubmit={handleSubmit}>
          <div className="field">
            <label htmlFor="modal-name">{t.nameLabel}</label>
            <input
              id="modal-name"
              required
              placeholder={t.namePlaceholder}
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>

          <div className="field">
            <label htmlFor="modal-email">{t.emailLabel}</label>
            <input
              id="modal-email"
              type="email"
              required
              placeholder={t.emailPlaceholder}
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <div className="field">
            <label htmlFor="modal-interest">{t.interestLabel}</label>
            <select
              id="modal-interest"
              value={interest}
              onChange={(e) => setInterest(e.target.value as 'buyer' | 'vendor' | 'learn')}
            >
              <option value="buyer">{t.interestBuyer}</option>
              <option value="vendor">{t.interestVendor}</option>
              <option value="learn">{t.interestLearn}</option>
            </select>
          </div>

          <div className="field">
            <label htmlFor="modal-message">{t.messageLabel}</label>
            <textarea
              id="modal-message"
              placeholder={t.messagePlaceholder}
              value={message}
              onChange={(e) => setMessage(e.target.value)}
            />
          </div>

          <button className="btn primary w-full" type="submit">
            {t.submit}
          </button>

          {submitted ? (
            <p className="mt-3 text-xs font-semibold text-emerald-600 bg-emerald-50 p-2.5 rounded-lg border border-emerald-200">
              {t.formMessage}
            </p>
          ) : (
            <p className="formnote">{t.formNote}</p>
          )}
        </form>
      </div>
    </div>
  );
}

