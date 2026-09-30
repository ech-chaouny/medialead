'use client';
import { useRef } from 'react';
import { ArrowLeft, ArrowRight, RadioTower } from 'lucide-react';
import { projects, projectHighlights } from '@/lib/content';

/* Visuel par projet : créative réelle quand elle existe, sinon tuile de marque. */
const media: Record<string, { src: string; kind: 'cover' | 'brand' | 'icon'; alt: string }> = {
  drok: { src: '/images/hero/drok-creative.webp', kind: 'cover', alt: 'Créative DROK présentant l’application de livraison' },
  washroc: { src: '/images/hero/washroc-creative.webp', kind: 'cover', alt: 'Créative WashRoc présentant la réservation de lavage' },
  omak: { src: '/images/clients/omak.jpeg', kind: 'brand', alt: 'Logo OMAK Service' },
  fnm: { src: '/images/clients/fnm.png', kind: 'brand', alt: 'Logo Formation Naturopathie Maroc' },
  privu: { src: '/images/clients/pending-brand.webp', kind: 'brand', alt: 'Logo Privu' },
  /* Réseau commercial : pas de marque opérateur sans autorisation (V5 §14). */
  telecom: { src: '', kind: 'icon', alt: '' },
};
/* V5 §8 : Product & App Growth, puis Digital Transformation & Lead Generation. */
const order = ['drok', 'washroc', 'privu', 'fnm', 'omak', 'telecom'];

export default function WorkRail() {
  const rail = useRef<HTMLDivElement>(null);
  const step = (dir: 1 | -1) => {
    const el = rail.current; if (!el) return;
    const card = el.querySelector<HTMLElement>('.work-card');
    el.scrollBy({ left: dir * ((card?.offsetWidth ?? 320) + 20), behavior: 'smooth' });
  };
  return <div className="work-rail-wrap">
    <div className="work-rail" ref={rail} tabIndex={0} aria-label="Réalisations — faites défiler horizontalement">
      {order.map((slug, i) => {
        const p = projects.find(x => x.slug === slug)!; const h = projectHighlights[slug]; const m = media[slug];
        return <article className={`work-card work-${slug}`} key={slug}>
          <div className={`work-media work-media-${m.kind === 'icon' ? 'brand' : m.kind}`}>
            {m.kind === 'icon' ? <span className="work-icon" aria-hidden="true"><RadioTower size={44} strokeWidth={1.5} /></span> : <img src={m.src} alt={m.alt} loading={i < 2 ? 'eager' : 'lazy'} />}
            <span className="work-index">0{i + 1}</span>
          </div>
          <div className="work-body">
            <span className="work-category">{p.category}</span>
            <h3>{p.name}</h3>
            <p className="work-transformation">{h.transformation}</p>
            <p className={h.metric ? 'work-metric' : 'work-metric pending'}>{h.metric && <strong>{h.metric}</strong>}<span>{h.metricLabel}</span></p>
          </div>
        </article>;
      })}
    </div>
    <div className="work-controls">
      <button type="button" onClick={() => step(-1)} aria-label="Projets précédents"><ArrowLeft size={18} /></button>
      <button type="button" onClick={() => step(1)} aria-label="Projets suivants"><ArrowRight size={18} /></button>
    </div>
  </div>;
}
