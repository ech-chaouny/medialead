import Link from 'next/link';
import { Instagram, ArrowUpRight } from 'lucide-react';

export default function Footer() {
  return <footer className="site-footer container">
    <div className="footer-main">
      <div className="footer-brand">
        <Link href="/" aria-label="Medialead — Accueil"><img src="/images/medialead-logo-dark.png" alt="Medialead" width="190" height="40" /></Link>
        <p>Le produit, le marketing et la data.<br />Une même direction : votre croissance.</p>
        <a className="footer-social" href="https://www.instagram.com/medialead.agency/" target="_blank" rel="noreferrer" aria-label="Medialead sur Instagram"><Instagram size={19} strokeWidth={1.5} /></a>
        <a className="footer-phone" href="tel:+212661912916">+212 6 61 91 29 16</a>
      </div>
      <div><h4>EXPERTISES</h4><a href="#expertises">Product Development</a><a href="#expertises">App Marketing</a><a href="#expertises">Growth & Acquisition</a><a href="#expertises">Measurement & Data</a></div>
      <div><h4>NOTRE APPROCHE</h4><a href="#methode">Growth System</a><a href="#realisations">Nos réalisations</a><a href="#expertises">Nos solutions</a></div>
      <div><h4>L’AGENCE</h4><a href="#agence">Notre équipe</a><a href="#contact">Parlons de votre projet <ArrowUpRight size={13} /></a></div>
    </div>
    <div className="footer-bottom"><span>© {new Date().getFullYear()} Medialead. Tous droits réservés.</span><span>Casablanca, Maroc <span className="footer-dot">·</span> <em>Build. Launch. Grow.</em></span></div>
    <div className="footer-wordmark" aria-hidden="true">MEDIALEAD</div>
  </footer>;
}
