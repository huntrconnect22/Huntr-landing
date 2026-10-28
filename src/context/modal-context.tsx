'use client';

import React, { createContext, useContext, useState, ReactNode } from 'react';

export type ModalKind = 'talk' | 'buyer' | 'vendor';

interface ModalContextType {
  isOpen: boolean;
  kind: ModalKind;
  productContext?: string;
  openModal: (kind?: ModalKind, productContext?: string) => void;
  closeModal: () => void;
}

const ModalContext = createContext<ModalContextType | undefined>(undefined);

export function ModalProvider({ children }: { children: ReactNode }) {
  const [isOpen, setIsOpen] = useState(false);
  const [kind, setKind] = useState<ModalKind>('talk');
  const [productContext, setProductContext] = useState<string | undefined>(undefined);

  const openModal = (nextKind: ModalKind = 'talk', nextProduct?: string) => {
    setKind(nextKind);
    setProductContext(nextProduct);
    setIsOpen(true);
  };

  const closeModal = () => {
    setIsOpen(false);
    setProductContext(undefined);
  };

  return (
    <ModalContext.Provider value={{ isOpen, kind, productContext, openModal, closeModal }}>
      {children}
    </ModalContext.Provider>
  );
}

export function useModal() {
  const ctx = useContext(ModalContext);
  if (!ctx) {
    throw new Error('useModal must be used within a ModalProvider');
  }
  return ctx;
}

