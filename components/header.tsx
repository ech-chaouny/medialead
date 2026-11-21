'use client';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { usePathname } from 'next/navigation';
import { ArrowRight, Menu, X } from 'lucide-react';
import { useLang } from '@/components/lang-provider';
import { localePath, stripLang, LANG_COOKIE, type Lang } from '@/lib/i18n';

const copy = {
  fr: { links: [['/#expertises', 'Expertises'], ['/#methode', 'Notre méthode'], ['/#realisations', 'Réalisations'], ['/#agence', 'L’agence']], cta: 'Parlons de votre projet', open: 'Ouvrir le menu', close: 'Fermer le menu', nav: 'Navigation principale', home: 'Medialead — Accueil', switchTo: 'Switch to English' },
  en: { links: [['/#expertises', 'Expertise'], ['/#methode', 'Our method'], ['/#realisations', 'Work'], ['/#agence', 'The agency']], cta: 'Let’s talk about your project', open: 'Open menu', close: 'Close menu', nav: 'Main navigation', home: 'Medialead — Home', switchTo: 'Passer en français' },
};

/* Mémorise la langue choisie (cookie fonctionnel, 1 an) : le proxy s'en sert aux visites suivantes. */
const remember = (lang: Lang) => { document.cookie = `${LANG_COOKIE}=${lang}; path=/; max-age=31536000; samesite=lax`; };

/* Header en verre flottant : se resserre au scroll, marque la section en cours, bouton FR / EN. */
export default function Header() {
  const lang = useLang();
  const t = copy[lang];
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [active, setActive] = useState('');
  const pathname = usePathname();
  const other: Lang = lang === 'fr' ? 'en' : 'fr';
  const otherHref = localePath(other, stripLang(pathname));

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    const sections = t.links.map(([href]) => document.getElementById(href.split('#')[1])).filter((el): el is HTMLElement => el !== null);
    const io = new IntersectionObserver(entries => {
      entries.forEach(e => { if (e.isIntersecting) setActive(`/#${e.target.id}`); });
    }, { rootMargin: '-45% 0px -50% 0px' });
    sections.forEach(s => io.observe(s));
    setActive('');
    return () => { window.removeEventListener('scroll', onScroll); io.disconnect(); };
  }, [pathname, t.links]);

  // Logo : sur l'accueil, remonte en haut de la page (et retire l'ancre de l'adresse) ; ailleurs, ramène à l'accueil.
  const toTop = (e: React.MouseEvent) => {
    setOpen(false);
    if (stripLang(pathname) !== '/') return;
    e.preventDefault();
    history.replaceState(null, '', localePath(lang, '/'));
    window.scrollTo({ top: 0, behavior: matchMedia('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth' });
  };

  const switcher = <a className="lang-switch" href={otherHref} hrefLang={other} lang={other} aria-label={t.switchTo} onClick={() => remember(other)}>
    <span className={lang === 'fr' ? 'is-on' : undefined}>FR</span><span className={lang === 'en' ? 'is-on' : undefined}>EN</span>
  </a>;

  return <header className={`site-header${scrolled ? ' is-scrolled' : ''}${open ? ' is-open' : ''}`}>
    <div className="nav-wrap container">
      <Link href={localePath(lang, '/')} className="brand" aria-label={t.home} onClick={toTop}><img src="/images/medialead-logo-dark.webp" alt="Medialead" width="170" height="36" /></Link>
      <nav aria-label={t.nav} className={open ? 'nav open' : 'nav'}>
        {t.links.map(([href, label]) => <a key={href} href={localePath(lang, href)} className={active === href ? 'is-active' : undefined} aria-current={active === href ? 'location' : undefined} onClick={() => setOpen(false)}>{label}</a>)}
        <a className="button nav-mobile-cta" href={localePath(lang, '/contact')} onClick={() => setOpen(false)}><span className="button-label">{t.cta}</span><ArrowRight className="button-icon" size={16} strokeWidth={1.8} aria-hidden="true" /></a>
      </nav>
      <div className="nav-end">
        {switcher}
        <a className="button nav-cta" href={localePath(lang, '/contact')}><span className="button-label">{t.cta}</span><ArrowRight className="button-icon" size={16} strokeWidth={1.8} aria-hidden="true" /></a>
        <button className="menu-toggle" aria-label={open ? t.close : t.open} aria-expanded={open} onClick={() => setOpen(!open)}>{open ? <X /> : <Menu />}</button>
      </div>
    </div>
  </header>;
}
