import type { Metadata } from 'next';
import PageHero from '@/components/page-hero';
import RealisationsSection from '@/components/realisations-section';
import { TransformationSection } from '@/components/expertise-sections';
import type { Lang } from '@/lib/i18n';

const copy = {
  fr: { meta: { title: 'Réalisations', description: 'Applications, back-offices et contenus livrés par Medialead, présentés par secteur.' }, badge: 'Réalisations', title: 'Des transformations,', accent: 'pas des livraisons.', lead: 'Applications, systèmes et contenus : un aperçu du travail livré pour nos clients, présentés par secteur.' },
  en: { meta: { title: 'Our work', description: 'Apps, back-offices and content delivered by Medialead, presented by sector.' }, badge: 'Our work', title: 'Transformations,', accent: 'not just deliveries.', lead: 'Apps, systems and content: a look at the work delivered for our clients, presented by sector.' },
};
export async function generateMetadata({ params }: PageProps<'/[lang]/realisations'>): Promise<Metadata> { return copy[(await params).lang as Lang].meta; }

/* Transformation & Lead Generation en premier, puis la même section Réalisations que sur l'accueil (contenus en grille). */
export default async function RealisationsPage({ params }: PageProps<'/[lang]/realisations'>) {
  const lang = (await params).lang as Lang;
  const t = copy[lang];
  return <>
    <PageHero badge={t.badge} title={t.title} accent={t.accent} lead={t.lead} />
    <TransformationSection lang={lang} />
    <RealisationsSection lang={lang} head={false} gridContent />
  </>;
}
