import Link from 'next/link';
import { Instagram, ArrowUpRight, ArrowUp, Phone, Mail, MapPin } from 'lucide-react';
import { services } from '@/lib/content';
import { site } from '@/lib/site';
import { localePath, type Lang } from '@/lib/i18n';
import ManageCookies from '@/components/manage-cookies';

const copy = {
  fr: {
    tagline: 'Le produit, le marketing et la data. Une même direction : votre croissance.', cta: 'Parlons de votre projet',
    expertise: 'Expertises', navigation: 'Navigation', contact: 'Contact', rights: 'Tous droits réservés.', top: 'Haut de page', home: 'Medialead — Accueil',
    nav: [['/expertises', 'Expertises'], ['/#methode', 'Notre méthode'], ['/realisations', 'Réalisations'], ['/#agence', 'L’agence'], ['/#audit', 'Growth Audit'], ['/contact', 'Contact']],
    legal: [['/mentions-legales', 'Mentions légales'], ['/confidentialite', 'Confidentialité'], ['/cookies', 'Cookies']], cookies: 'Gérer mes cookies',
  },
  en: {
    tagline: 'Product, marketing and data. One direction: your growth.', cta: 'Let’s talk about your project',
    expertise: 'Expertise', navigation: 'Navigation', contact: 'Contact', rights: 'All rights reserved.', top: 'Back to top', home: 'Medialead — Home',
    nav: [['/expertises', 'Expertise'], ['/#methode', 'Our method'], ['/realisations', 'Work'], ['/#agence', 'The agency'], ['/#audit', 'Growth Audit'], ['/contact', 'Contact']],
    legal: [['/mentions-legales', 'Legal notice'], ['/confidentialite', 'Privacy'], ['/cookies', 'Cookies']], cookies: 'Manage cookies',
  },
};

/* Footer sombre : marque, trois colonnes (expertises, navigation, contact), barre légale, grand wordmark. */
export default function Footer({ lang }: { lang: Lang }) {
  const t = copy[lang];
  const to = (p: string) => localePath(lang, p);
  return <footer className="site-footer">
    <div className="container">
      <div className="footer-main">
        <div className="footer-brand">
          <Link href={to('/')} aria-label={t.home}><img src="/images/medialead-logo.webp" alt="Medialead" width="190" height="40" /></Link>
          <p>{t.tagline}</p>
          <a className="footer-cta" href={to('/contact')}>{t.cta}<ArrowUpRight size={16} strokeWidth={2} aria-hidden="true" /></a>
        </div>
        <nav aria-label={t.expertise}><h4>{t.expertise}</h4>{services.map(s => <a key={s.slug} href={to('/expertises')}>{s.name}</a>)}</nav>
        <nav aria-label={t.navigation}><h4>{t.navigation}</h4>{t.nav.map(([href, label]) => <a key={href} href={to(href)}>{label}</a>)}</nav>
        <div><h4>{t.contact}</h4>
          <a href={site.phoneHref}><Phone size={15} strokeWidth={1.8} aria-hidden="true" />{site.phone}</a>
          <a href={`mailto:${site.email}`}><Mail size={15} strokeWidth={1.8} aria-hidden="true" />{site.email}</a>
          <a href="https://www.instagram.com/medialead.agency/" target="_blank" rel="noreferrer"><Instagram size={15} strokeWidth={1.8} aria-hidden="true" />@medialead.agency</a>
          <span className="footer-place"><MapPin size={15} strokeWidth={1.8} aria-hidden="true" />{site.address}</span>
        </div>
      </div>
      <div className="footer-bottom">
        <span className="footer-legal">© {new Date().getFullYear()} Medialead. {t.rights}{t.legal.map(([href, label]) => <Link key={href} href={to(href)}>{label}</Link>)}<ManageCookies label={t.cookies} /></span>
        <span className="footer-motto">Build. Launch. <em>Grow.</em></span>
        <a className="footer-top" href="#top">{t.top}<ArrowUp size={14} strokeWidth={2} aria-hidden="true" /></a>
      </div>
    </div>
    <div className="footer-wordmark" aria-hidden="true">MEDIALEAD</div>
  </footer>;
}
