'use client';
import { Button } from '@/components/ui';
import { useLang } from '@/components/lang-provider';
import { localePath } from '@/lib/i18n';

export default function NotFound() {
  const lang = useLang();
  return lang === 'en'
    ? <section className="container empty-state"><div className="eyebrow">404 / ANOTHER PATH</div><h1>This page doesn’t exist.</h1><p>Find our expertise and projects from the home page.</p><Button href={localePath(lang, '/')}>Back to home</Button></section>
    : <section className="container empty-state"><div className="eyebrow">404 / UN AUTRE CHEMIN</div><h1>Cette page n’existe pas.</h1><p>Retrouvez nos expertises et nos projets depuis l’accueil.</p><Button href="/">Retour à l’accueil</Button></section>;
}
