'use client';
import { useRef } from 'react';
import { ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui';

/* Événements que Medialead instrumente dans les produits et les parcours clients. Aucune donnée réelle. */
const events: [string, string][] = [
  ['app_install', 'Installation'],
  ['sign_up', 'Inscription'],
  ['first_order', 'Première commande'],
  ['booking_created', 'Réservation créée'],
  ['wash_completed', 'Lavage réalisé'],
  ['lead_created', 'Nouveau lead'],
  ['whatsapp_contact', 'Contact WhatsApp'],
  ['lead_qualified', 'Lead qualifié'],
  ['enrollment', 'Inscription formation'],
  ['installation_done', 'Installation fibre'],
  ['repeat_order', 'Réachat'],
];

export default function HeroSignal() {
  const ref = useRef<HTMLElement>(null);
  const move = (e: React.PointerEvent<HTMLElement>) => {
    const el = ref.current; if (!el) return;
    const r = el.getBoundingClientRect();
    el.style.setProperty('--x', `${e.clientX - r.left}px`);
    el.style.setProperty('--y', `${e.clientY - r.top}px`);
  };
  return <section className="hero" aria-labelledby="hero-title" ref={ref} onPointerMove={move}>
    <div className="hero-grid" aria-hidden="true" />
    <div className="hero-spot" aria-hidden="true" />
    <div className="container hero-inner">
      <div className="hero-meta"><span>Medialead</span><span>Product · Growth · Data</span><span>Casablanca, MA</span></div>
      <h1 id="hero-title" className="hero-title">
        <span className="hero-line"><span>We build.</span></span>
        <span className="hero-line"><span>We launch.</span></span>
        <span className="hero-line is-accent"><span>We grow.</span></span>
      </h1>
      <div className="hero-bottom">
        <div className="hero-copy">
          <p className="hero-sub">From product to measurable growth.</p>
          <p className="hero-body">Nous construisons des produits digitaux et des systèmes de croissance qui relient la technologie, l’acquisition et la data à des résultats business réels.</p>
          <div className="hero-actions">
            <Button href="#contact">Parlons de votre projet</Button>
            <a className="link-arrow" href="#realisations">Voir nos réalisations<ArrowRight size={16} strokeWidth={2} /></a>
          </div>
        </div>
        <aside className="event-stream" aria-label="Exemples d’événements que nous suivons">
          <div className="stream-head"><span className="live-dot" />Événements suivis</div>
          <div className="stream-window">
            <ul className="stream-track">{[...events, ...events].map(([code, label], i) => <li key={i} aria-hidden={i >= events.length || undefined}><code>{code}</code><span>{label}</span></li>)}</ul>
          </div>
          <p className="stream-foot">Du clic au résultat business.</p>
        </aside>
      </div>
    </div>
  </section>;
}
