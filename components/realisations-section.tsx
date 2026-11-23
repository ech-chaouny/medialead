import { Button, SectionHead } from '@/components/ui';
import Realisations from '@/components/realisations';
import { localePath, type Lang } from '@/lib/i18n';

/* Section Réalisations (applications, systèmes, contenus), affichée sur l'accueil et sur la page /realisations. */
const copy = {
  fr: { eyebrow: 'RÉALISATIONS', title: 'Des transformations,', accent: 'pas des livraisons.', lead: 'Applications, systèmes et contenus : un aperçu du travail livré pour nos clients.', ctaTitle: 'Un projet en tête ?', cta: 'Parlons de votre projet', all: 'Voir toutes les réalisations' },
  en: { eyebrow: 'OUR WORK', title: 'Transformations,', accent: 'not just deliveries.', lead: 'Apps, systems and content: a look at the work delivered for our clients.', ctaTitle: 'Have a project in mind?', cta: 'Let’s talk about your project', all: 'See all our work' },
};

export default function RealisationsSection({ lang, head = true, linkToPage = false }: { lang: Lang; head?: boolean; linkToPage?: boolean }) {
  const t = copy[lang];
  return <section className="section" id="realisations">
    {head && <div className="container"><SectionHead center eyebrow={t.eyebrow} title={t.title} accent={t.accent} lead={t.lead} href={linkToPage ? localePath(lang, '/realisations') : undefined} cta={linkToPage ? t.all : undefined} /></div>}
    <Realisations />
    <div className="container rz-cta" data-reveal>
      <h3>{t.ctaTitle}</h3>
      <Button href={localePath(lang, '/contact')}>{t.cta}</Button>
    </div>
  </section>;
}
