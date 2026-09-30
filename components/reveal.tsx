'use client';
import { useEffect } from 'react';

/* Apparition douce des blocs [data-reveal] au scroll. Sans JS ou en mouvement réduit, tout reste visible. */
export default function Reveal() {
  useEffect(() => {
    const els = [...document.querySelectorAll<HTMLElement>('[data-reveal]')];
    if (!('IntersectionObserver' in window) || matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    els.forEach(el => { if (el.getBoundingClientRect().top < innerHeight) el.classList.add('is-in'); });
    document.documentElement.classList.add('js-reveal');
    const io = new IntersectionObserver(entries => entries.forEach(e => {
      if (e.isIntersecting) { e.target.classList.add('is-in'); io.unobserve(e.target); }
    }), { threshold: 0.12, rootMargin: '0px 0px -8% 0px' });
    els.forEach(el => io.observe(el));
    return () => io.disconnect();
  }, []);
  return null;
}
