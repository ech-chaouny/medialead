'use client';
import { useEffect } from 'react';
import { usePathname } from 'next/navigation';
import { rememberAttribution } from '@/lib/attribution';

/* Mémorise les UTM de la page d'arrivée pour toute la session. */
export default function AttributionKeeper() {
  const pathname = usePathname();
  useEffect(() => { rememberAttribution(); }, [pathname]);
  return null;
}
