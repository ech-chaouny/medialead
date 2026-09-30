'use client';
import { useEffect, useRef, useState } from 'react';

/* Compteur pour un chiffre validé (« ≈ 200K MAD », « 10+ »). Le texte complet est rendu côté serveur. */
export default function CountUp({ value }: { value: string }) {
  const match = value.match(/\d+/);
  const target = match ? Number(match[0]) : 0;
  const [before, after] = match ? [value.slice(0, match.index), value.slice((match.index ?? 0) + match[0].length)] : [value, ''];
  const ref = useRef<HTMLSpanElement>(null);
  const [n, setN] = useState<number | null>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el || !match || matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    setN(0);
    const io = new IntersectionObserver(([entry]) => {
      if (!entry.isIntersecting) return;
      io.disconnect();
      const start = performance.now();
      const tick = (t: number) => {
        const p = Math.min(1, (t - start) / 1400);
        setN(Math.round(target * (1 - Math.pow(1 - p, 3))));
        if (p < 1) requestAnimationFrame(tick);
      };
      requestAnimationFrame(tick);
    }, { threshold: 0.4 });
    io.observe(el);
    return () => io.disconnect();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [target]);
  return <span ref={ref} aria-label={value}>{before}{n === null ? match?.[0] : n}{after}</span>;
}
