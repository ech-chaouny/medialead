'use client';
import Link from 'next/link';
import { site, whatsappHref } from '@/lib/site';
import { localePath } from '@/lib/i18n';
import { useLang } from '@/components/lang-provider';

/* Phrase d'acceptation affichée sous le bouton d'envoi : l'envoi du formulaire vaut acceptation (pas de case à cocher). */
export function FormLegal({ className = 'form-legal' }: { className?: string }) {
  const lang = useLang();
  const mail = <a href={`mailto:${site.email}`}>{site.email}</a>;
  const policy = localePath(lang, '/confidentialite');
  return lang === 'en'
    ? <p className={className}>By sending this form, you accept our <Link href={policy}>privacy policy</Link>. Your data is only used to get back to you. Right of access, rectification and objection (Moroccan law 09-08): {mail}.</p>
    : <p className={className}>En envoyant ce formulaire, vous acceptez notre <Link href={policy}>politique de confidentialité</Link>. Vos données sont utilisées uniquement pour vous recontacter. Droit d’accès, de rectification et d’opposition (loi n° 09-08) : {mail}.</p>;
}

/* Message de confirmation après envoi, commun aux deux formulaires. */
export function SentMessage() {
  const lang = useLang();
  const wa = <a href={whatsappHref(lang)} target="_blank" rel="noopener noreferrer">{lang === 'en' ? 'Message us on WhatsApp' : 'Écrivez-nous sur WhatsApp'}</a>;
  return lang === 'en'
    ? <>We will get back to you within 24 working hours. Need a faster answer? {wa}.</>
    : <>Nous vous recontactons sous 24 h ouvrées. Besoin d’une réponse plus rapide ? {wa}.</>;
}
