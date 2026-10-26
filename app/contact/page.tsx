import type { Metadata } from 'next';
import { Clock3, Phone, Instagram } from 'lucide-react';
import ProjectForm from '@/components/project-form';

export const metadata: Metadata = {
  title: 'Parlons de votre projet',
  description: 'Un produit à lancer, une app à faire grandir, une entreprise à digitaliser ou une acquisition à rendre plus performante : parlons-en.',
};

/* Page « Parlons de votre projet » : introduction à gauche, formulaire de qualification en 4 étapes à droite. */
export default function ContactPage() {
  return <section className="contact-page" aria-labelledby="contact-title">
    <div className="contact-glow" aria-hidden="true" />
    <div className="container contact-grid">
      <div className="contact-intro">
        <span className="hero-badge">Parlons de votre projet</span>
        <h1 id="contact-title">Votre prochaine étape <em>commence ici.</em></h1>
        <p className="contact-lead">Un produit à lancer, une app à faire grandir, une entreprise à digitaliser ou une acquisition à rendre plus performante : parlons-en.</p>
        <ul className="contact-facts">
          <li><Clock3 size={17} strokeWidth={1.9} aria-hidden="true" />4 étapes, moins d’une minute</li>
          <li><Phone size={17} strokeWidth={1.9} aria-hidden="true" />Vous préférez appeler ? <a href="tel:+212661912916">+212 6 61 91 29 16</a></li>
          <li><Instagram size={17} strokeWidth={1.9} aria-hidden="true" /><a href="https://www.instagram.com/medialead.agency/" target="_blank" rel="noreferrer">@medialead.agency</a></li>
        </ul>
      </div>
      <ProjectForm />
    </div>
  </section>;
}
