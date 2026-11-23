'use client';
import { useEffect, useRef, useState } from 'react';
import { Play } from 'lucide-react';
import { type Realisation } from '@/lib/realisations';

/* Carte vidéo de l'onglet « Création de contenu » : extrait muet en boucle quand elle est visible,
   vidéo complète avec le son au clic (chargée seulement à ce moment-là). */
export default function DeckVideo({ item, title, playLabel }: { item: Realisation; title: string; playLabel: string }) {
  const ref = useRef<HTMLVideoElement>(null);
  const [full, setFull] = useState(false);

  useEffect(() => {
    const v = ref.current;
    if (!v || full || matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const io = new IntersectionObserver(([e]) => { if (e.isIntersecting) v.play().catch(() => {}); else v.pause(); }, { threshold: 0.4 });
    io.observe(v);
    return () => io.disconnect();
  }, [full]);

  return <div className="media-slot deck-video">
    {full
      ? <video src={item.video} poster={item.image} controls autoPlay playsInline />
      : <button type="button" onClick={() => setFull(true)} aria-label={`${playLabel} : ${title}`}>
          <video ref={ref} src={item.preview} poster={item.image} muted loop playsInline preload="none" aria-hidden="true" />
          <span className="rz-play" aria-hidden="true"><Play size={20} strokeWidth={2} fill="currentColor" /></span>
        </button>}
  </div>;
}
