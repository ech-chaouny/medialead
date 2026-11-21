'use client';
import { openConsent } from '@/lib/consent';

/* Lien « Gérer mes cookies » : rouvre le panneau de choix. */
export default function ManageCookies({ className, label = 'Gérer mes cookies' }: { className?: string; label?: string }) {
  return <button type="button" className={className} onClick={openConsent}>{label}</button>;
}
