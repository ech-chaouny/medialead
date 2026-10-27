'use client';
import { useEffect, useLayoutEffect, useRef, useState } from 'react';
import { Play, Smartphone, Image as ImageIcon, MonitorSmartphone, LayoutGrid, UtensilsCrossed, Droplets, Store, Car, GraduationCap, RadioTower } from 'lucide-react';
import { portfolio, sectors, type Kind, type PortfolioItem } from '@/lib/portfolio';

/* Galerie pleine largeur en mosaïque, filtrable par secteur. Les vidéos tournent sans son
   uniquement quand elles sont visibles ; en mouvement réduit, seule l'image d'aperçu s'affiche. */
const kindIcons: Record<Kind, typeof Play> = { 'Vidéo': Play, 'Créative': ImageIcon, 'Application': Smartphone, 'Site web': MonitorSmartphone };
const tabIcons: Record<string, typeof Play> = { all: LayoutGrid, livraison: UtensilsCrossed, lavage: Droplets, marketplace: Store, auto: Car, education: GraduationCap, telecom: RadioTower };
const sectorLabel = (id: string) => sectors.find(s => s.id === id)?.label ?? '';

function Tile({ item }: { item: PortfolioItem }) {
  const video = useRef<HTMLVideoElement>(null);
  const Icon = kindIcons[item.kind];
  const isVideo = item.kind === 'Vidéo' && item.src?.endsWith('.mp4');

  useEffect(() => {
    const v = video.current;
    if (!v || matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const io = new IntersectionObserver(([e]) => { if (e.isIntersecting) v.play().catch(() => {}); else v.pause(); }, { threshold: 0.35 });
    io.observe(v);
    return () => io.disconnect();
  }, []);

  return <figure className="pg-tile" style={{ aspectRatio: item.ratio }}>
    {item.src
      ? isVideo
        ? <video ref={video} src={item.src} poster={item.poster} muted loop playsInline preload="none" aria-label={`${item.title} — ${sectorLabel(item.sector)}`} />
        : <img src={item.src} alt={`${item.title} — ${sectorLabel(item.sector)}`} loading="lazy" />
      : <div className="pg-empty" role="img" aria-label={`Emplacement réservé : ${item.kind} — ${sectorLabel(item.sector)}`}><Icon size={22} strokeWidth={1.6} aria-hidden="true" /><span>{item.kind}</span></div>}
    <figcaption className="pg-cap">
      <span className="pg-kind"><Icon size={13} strokeWidth={2} aria-hidden="true" />{item.kind}</span>
      <strong>{item.title}</strong>
      <em>{sectorLabel(item.sector)}</em>
    </figcaption>
  </figure>;
}

export default function PortfolioGallery() {
  const [active, setActive] = useState('all');
  const shown = active === 'all' ? portfolio : portfolio.filter(p => p.sector === active);
  const tabs = [{ id: 'all', label: 'Tous' }, ...sectors];
  const bar = useRef<HTMLDivElement>(null);
  const [pill, setPill] = useState<{ x: number; w: number } | null>(null);

  // La pastille orange glisse sous l'onglet actif ; elle se recale si la largeur change.
  useLayoutEffect(() => {
    const place = () => {
      const btn = bar.current?.querySelector<HTMLButtonElement>(`[data-id="${active}"]`);
      if (btn) setPill({ x: btn.offsetLeft, w: btn.offsetWidth });
    };
    place();
    const ro = new ResizeObserver(place);
    if (bar.current) ro.observe(bar.current);
    return () => ro.disconnect();
  }, [active]);
  const choose = (id: string, el: HTMLButtonElement) => { setActive(id); el.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'center' }); };

  return <div className="pg">
    <div className="pg-filter-scroll">
      <div className="pg-filters" role="group" aria-label="Filtrer par secteur" ref={bar}>
        {pill && <span className="pg-pill" aria-hidden="true" style={{ transform: `translateX(${pill.x}px)`, width: pill.w }} />}
        {tabs.map(t => { const Icon = tabIcons[t.id]; return <button type="button" key={t.id} data-id={t.id} aria-pressed={active === t.id} className={active === t.id ? 'is-active' : undefined} onClick={e => choose(t.id, e.currentTarget)}>
          <Icon size={16} strokeWidth={1.9} aria-hidden="true" />{t.label}<sup>{t.id === 'all' ? portfolio.length : portfolio.filter(p => p.sector === t.id).length}</sup>
        </button>; })}
      </div>
    </div>
    <div className="pg-grid" key={active}>{shown.map(item => <Tile key={item.id} item={item} />)}</div>
  </div>;
}
