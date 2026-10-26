import Link from 'next/link';
import { Instagram, ArrowUpRight, ArrowUp, Phone, MapPin } from 'lucide-react';
import { services } from '@/lib/content';

const nav = [['/#realisations', 'Réalisations'], ['/#methode', 'Notre méthode'], ['/#agence', 'L’agence'], ['/#audit', 'Growth Audit'], ['/contact', 'Contact']];

/* Footer sombre : marque, trois colonnes (expertises, navigation, contact), barre légale, grand wordmark. */
export default function Footer() {
  return <footer className="site-footer">
    <div className="container">
      <div className="footer-main">
        <div className="footer-brand">
          <Link href="/" aria-label="Medialead — Accueil"><img src="/images/medialead-logo.png" alt="Medialead" width="190" height="40" /></Link>
          <p>Le produit, le marketing et la data. Une même direction : votre croissance.</p>
          <a className="footer-cta" href="/contact">Parlons de votre projet<ArrowUpRight size={16} strokeWidth={2} aria-hidden="true" /></a>
        </div>
        <nav aria-label="Expertises"><h4>Expertises</h4>{services.map(s => <a key={s.slug} href="/#expertises">{s.name}</a>)}</nav>
        <nav aria-label="Navigation"><h4>Navigation</h4>{nav.map(([href, label]) => <a key={href} href={href}>{label}</a>)}</nav>
        <div><h4>Contact</h4>
          <a href="tel:+212661912916"><Phone size={15} strokeWidth={1.8} aria-hidden="true" />+212 6 61 91 29 16</a>
          <a href="https://www.instagram.com/medialead.agency/" target="_blank" rel="noreferrer"><Instagram size={15} strokeWidth={1.8} aria-hidden="true" />@medialead.agency</a>
          <span className="footer-place"><MapPin size={15} strokeWidth={1.8} aria-hidden="true" />Casablanca, Maroc</span>
        </div>
      </div>
      <div className="footer-bottom">
        <span>© {new Date().getFullYear()} Medialead. Tous droits réservés.</span>
        <span className="footer-motto">Build. Launch. <em>Grow.</em></span>
        <a className="footer-top" href="#top">Haut de page<ArrowUp size={14} strokeWidth={2} aria-hidden="true" /></a>
      </div>
    </div>
    <div className="footer-wordmark" aria-hidden="true">MEDIALEAD</div>
  </footer>;
}
