import type { Lang } from '@/lib/i18n';

/* Gabarit des pages légales : titre, date éventuelle, sections. En anglais, rappel que la version française fait foi. */
export default function LegalPage({ title, updated, lang, children }: { title: string; updated?: string; lang: Lang; children: React.ReactNode }) {
  return <article className="legal">
    <div className="container legal-inner">
      <span className="hero-badge">{lang === 'en' ? 'Legal information' : 'Informations légales'}</span>
      <h1>{title}</h1>
      {updated && <p className="legal-updated">{updated}</p>}
      {lang === 'en' && <p className="legal-updated">This translation is provided for information purposes. The French version prevails.</p>}
      <div className="legal-body">{children}</div>
    </div>
  </article>;
}
