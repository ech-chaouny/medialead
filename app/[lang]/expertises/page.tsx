import type { Metadata } from 'next';
import PageHero from '@/components/page-hero';
import ExpertiseSections, { AppGrowthSection } from '@/components/expertise-sections';
import { CTA } from '@/components/ui';
import type { Lang } from '@/lib/i18n';

const copy = {
  fr: { meta: { title: 'Nos expertises', description: 'App Growth, transformation digitale et lead generation, mesure et data, reprise de produit : comment Medialead accompagne votre croissance.' }, badge: 'Nos expertises', title: 'Du produit', accent: 'au chiffre d’affaires.', lead: 'App Growth, transformation digitale, lead generation, mesure et reprise de produits : une seule équipe pour chaque étape.' },
  en: { meta: { title: 'Our expertise', description: 'App Growth, digital transformation and lead generation, measurement and data, product takeover: how Medialead supports your growth.' }, badge: 'Our expertise', title: 'From product', accent: 'to revenue.', lead: 'App Growth, digital transformation, lead generation, measurement and product takeover: one team for every step.' },
};
export async function generateMetadata({ params }: PageProps<'/[lang]/expertises'>): Promise<Metadata> { return copy[(await params).lang as Lang].meta; }

/* Expertises détaillées, déplacées telles quelles de l'accueil. */
export default async function Expertises({ params }: PageProps<'/[lang]/expertises'>) {
  const lang = (await params).lang as Lang;
  const t = copy[lang];
  return <>
    <PageHero badge={t.badge} title={t.title} accent={t.accent} lead={t.lead} />
    <AppGrowthSection lang={lang} />
    <ExpertiseSections lang={lang} />
    <CTA lang={lang} />
  </>;
}
