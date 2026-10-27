'use client';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { usePathname } from 'next/navigation';
import { ArrowRight, Menu, X } from 'lucide-react';

const links = [['/#expertises', 'Expertises'], ['/#realisations', 'Réalisations'], ['/#methode', 'Notre méthode'], ['/#agence', 'L’agence']];

/* Header en verre flottant : se resserre au scroll et marque la section en cours. */
export default function Header() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [active, setActive] = useState('');
  const pathname = usePathname();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    const sections = links.map(([href]) => document.getElementById(href.split('#')[1])).filter((el): el is HTMLElement => el !== null);
    const io = new IntersectionObserver(entries => {
      entries.forEach(e => { if (e.isIntersecting) setActive(`/#${e.target.id}`); });
    }, { rootMargin: '-45% 0px -50% 0px' });
    sections.forEach(s => io.observe(s));
    setActive('');
    return () => { window.removeEventListener('scroll', onScroll); io.disconnect(); };
  }, [pathname]);

  return <header className={`site-header${scrolled ? ' is-scrolled' : ''}${open ? ' is-open' : ''}`}>
    <div className="nav-wrap container">
      <Link href="/" className="brand" aria-label="Medialead — Accueil" onClick={() => setOpen(false)}><img src="/images/medialead-logo-dark.webp" alt="Medialead" width="170" height="36" /></Link>
      <nav aria-label="Navigation principale" className={open ? 'nav open' : 'nav'}>
        {links.map(([href, label]) => <a key={href} href={href} className={active === href ? 'is-active' : undefined} aria-current={active === href ? 'location' : undefined} onClick={() => setOpen(false)}>{label}</a>)}
        <a className="button nav-mobile-cta" href="/contact" onClick={() => setOpen(false)}><span className="button-label">Parlons de votre projet</span><ArrowRight className="button-icon" size={16} strokeWidth={1.8} aria-hidden="true" /></a>
      </nav>
      <a className="button nav-cta" href="/contact"><span className="button-label">Parlons de votre projet</span><ArrowRight className="button-icon" size={16} strokeWidth={1.8} aria-hidden="true" /></a>
      <button className="menu-toggle" aria-label={open ? 'Fermer le menu' : 'Ouvrir le menu'} aria-expanded={open} onClick={() => setOpen(!open)}>{open ? <X /> : <Menu />}</button>
    </div>
  </header>;
}
