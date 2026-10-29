'use client';

import React, { useContext, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { LanguageContext } from '@/context/language-context';
import { useModal } from '@/context/modal-context';
import { translations } from '@/lib/translations';
import { Menu, X } from 'lucide-react';

export function Header() {
  const langContext = useContext(LanguageContext);
  const lang = langContext?.language || 'en';
  const setLang = langContext?.setLanguage || (() => {});
  const { openModal } = useModal();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const t = translations[lang].nav;

  const navLinks = [
    { href: '#how', label: t.how },
    { href: '#tenders', label: t.tenders },
    { href: '#marketplace', label: t.marketplace },
    { href: '#about', label: t.about },
    { href: '#faq', label: t.faq },
  ];

  return (
    <header className="site-header">
      <div className="wrap nav">
        <Link href="#home" className="brand" aria-label="HUNTR home">
          <Image
            src="/assets/img/logo-dark.png"
            alt="HUNTR logo"
            width={166}
            height={31}
            priority
            className="w-[140px] sm:w-[166px] h-auto object-contain"
          />
        </Link>

        <div className="navright">
          <nav className="main-nav" aria-label="Main Navigation">
            {navLinks.map((link) => (
              <a key={link.href} href={link.href}>
                {link.label}
              </a>
            ))}
          </nav>

          <div className="lang" aria-label="Language selector">
            <button
              type="button"
              className={lang === 'en' ? 'active' : ''}
              onClick={() => setLang('en')}
            >
              EN
            </button>
            <button
              type="button"
              className={lang === 'id' ? 'active' : ''}
              onClick={() => setLang('id')}
            >
              ID
            </button>
          </div>

          <button
            type="button"
            className="btn primary hidden sm:inline-flex"
            onClick={() => openModal('talk')}
          >
            {t.talk}
          </button>

          {/* Mobile menu trigger */}
          <button
            type="button"
            className="p-2 sm:hidden text-ink hover:text-orange transition-colors"
            aria-label="Toggle mobile menu"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="sm:hidden border-t border-line bg-cream px-6 py-4 flex flex-col gap-3 shadow-lg">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="py-2 text-sm font-bold text-ink hover:text-orange"
              onClick={() => setMobileMenuOpen(false)}
            >
              {link.label}
            </a>
          ))}
          <div className="pt-2">
            <button
              type="button"
              className="btn primary w-full text-sm"
              onClick={() => {
                setMobileMenuOpen(false);
                openModal('talk');
              }}
            >
              {t.talk}
            </button>
          </div>
        </div>
      )}
    </header>
  );
}
