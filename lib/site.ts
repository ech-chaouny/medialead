import type { Lang } from './i18n';

/* Coordonnées de Medialead, utilisées dans le footer, la page contact, les pages légales et le bouton WhatsApp. */
export const site = {
  phone: '+212 6 61 91 29 16',
  phoneHref: 'tel:+212661912916',
  email: 'contact@medialead.ma',
  address: '3, rue Sidi Bennour, 4e étage, appt 20, Casablanca',
};

const whatsappText: Record<Lang, string> = {
  fr: 'Bonjour Medialead, je souhaite un audit gratuit pour mon entreprise.',
  en: 'Hello Medialead, I would like a free audit for my business.',
};
export const whatsappHref = (lang: Lang = 'fr') => `https://wa.me/212661912916?text=${encodeURIComponent(whatsappText[lang])}`;
