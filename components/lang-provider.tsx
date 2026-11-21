'use client';
import { createContext, useContext } from 'react';
import type { Lang } from '@/lib/i18n';

/* Langue de la page, transmise par le layout aux composants client. */
const LangContext = createContext<Lang>('fr');
export const useLang = () => useContext(LangContext);
export default function LangProvider({ lang, children }: { lang: Lang; children: React.ReactNode }) {
  return <LangContext.Provider value={lang}>{children}</LangContext.Provider>;
}
