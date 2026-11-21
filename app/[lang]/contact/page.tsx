import type { Metadata } from 'next';
import { Clock3, Phone, Instagram, Mail, MapPin } from 'lucide-react';
import ProjectForm from '@/components/project-form';
import { site } from '@/lib/site';
import type { Lang } from '@/lib/i18n';

const copy = {
  fr: { meta: 'Parlons de votre projet', badge: 'Parlons de votre projet', title: <>Votre prochaine étape <em>commence ici.</em></>, lead: 'Un produit à lancer, une app à faire grandir, une entreprise à digitaliser ou une acquisition à rendre plus performante : parlons-en.', steps: '4 étapes, moins d’une minute', call: 'Vous préférez appeler ?' },
  en: { meta: 'Let’s talk about your project', badge: 'Let’s talk about your project', title: <>Your next step <em>starts here.</em></>, lead: 'A product to launch, an app to grow, a business to digitise or acquisition to make more effective: let’s talk.', steps: '4 steps, under a minute', call: 'Prefer to call?' },
};

export async function generateMetadata({ params }: PageProps<'/[lang]/contact'>): Promise<Metadata> {
  const t = copy[(await params).lang as Lang];
  return { title: t.meta, description: t.lead };
}

/* Page « Parlons de votre projet » : introduction à gauche, formulaire de qualification en 4 étapes à droite. */
export default async function ContactPage({ params }: PageProps<'/[lang]/contact'>) {
  const t = copy[(await params).lang as Lang];
  return <section className="contact-page" aria-labelledby="contact-title">
    <div className="contact-glow" aria-hidden="true" />
    <div className="container contact-grid">
      <div className="contact-intro">
        <span className="hero-badge">{t.badge}</span>
        <h1 id="contact-title">{t.title}</h1>
        <p className="contact-lead">{t.lead}</p>
        <ul className="contact-facts">
          <li><Clock3 size={17} strokeWidth={1.9} aria-hidden="true" />{t.steps}</li>
          <li><Phone size={17} strokeWidth={1.9} aria-hidden="true" />{t.call} <a href={site.phoneHref}>{site.phone}</a></li>
          <li><Mail size={17} strokeWidth={1.9} aria-hidden="true" /><a href={`mailto:${site.email}`}>{site.email}</a></li>
          <li><MapPin size={17} strokeWidth={1.9} aria-hidden="true" />{site.address}</li>
          <li><Instagram size={17} strokeWidth={1.9} aria-hidden="true" /><a href="https://www.instagram.com/medialead.agency/" target="_blank" rel="noreferrer">@medialead.agency</a></li>
        </ul>
      </div>
      <ProjectForm />
    </div>
  </section>;
}
