'use client';
import { useEffect, useRef } from 'react';
import { banners, sectors, type Banner } from '@/lib/banners';

/* Bannières de projets en format bannière (16:9) qui défilent seules sur toute la largeur de la scène (onglet Développement).
   Pause au survol et hors écran ; en mouvement réduit, les bannières restent fixes. */
const sectorLabel = (id: string) => sectors.find(s => s.id === id)?.label ?? '';
const COLUMNS = 1;

function Card({ b, hidden }: { b: Banner; hidden?: boolean }) {
  return <figure className={`sc-card is-${b.format}`} aria-hidden={hidden || undefined}>
    {b.src
      ? <img src={b.src} alt={hidden ? '' : `${b.project} — ${b.title}`} decoding="async" draggable={false} />
      : <div className={`sc-empty sc-${b.sector}`}><i aria-hidden="true" /><strong>{b.project}</strong><span>{sectorLabel(b.sector)}</span></div>}
    {b.src && <figcaption className="sc-cap"><strong>{b.project}</strong><span>{b.title} · {sectorLabel(b.sector)}</span></figcaption>}
  </figure>;
}

export default function BannerScroller() {
  const cols = Array.from({ length: COLUMNS }, (_, c) => banners.filter((_, i) => i % COLUMNS === c));
  const stage = useRef<HTMLDivElement>(null);

  // L'animation s'arrête quand la scène sort de l'écran : le défilement de la page reste fluide.
  useEffect(() => {
    const el = stage.current;
    if (!el) return;
    const io = new IntersectionObserver(([e]) => el.classList.toggle('is-off', !e.isIntersecting));
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return <div className="sc-stage is-compact" ref={stage}>
    {cols.map((col, c) => <div className={`sc-col${c % 2 ? ' is-down' : ''}`} key={c} style={{ '--dur': `${24 + c * 8}s` } as React.CSSProperties}>
      <div className="sc-track">
        {col.map(b => <Card key={b.id} b={b} />)}
        {col.map(b => <Card key={`${b.id}-dup`} b={b} hidden />)}
      </div>
    </div>)}
  </div>;
}
