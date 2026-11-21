import type { Metadata } from 'next';
import Link from 'next/link';
import LegalPage from '@/components/legal-page';
import { site } from '@/lib/site';
import { localePath, type Lang } from '@/lib/i18n';

const meta = {
  fr: { title: 'Mentions légales', description: 'Éditeur du site medialead.ma, propriété intellectuelle, responsabilité et droit applicable.' },
  en: { title: 'Legal notice', description: 'Publisher of medialead.ma, intellectual property, liability and governing law.' },
};
export async function generateMetadata({ params }: PageProps<'/[lang]/mentions-legales'>): Promise<Metadata> { return meta[(await params).lang as Lang]; }

/* Modèle de départ, à faire relire par un juriste ou le comptable avant publication définitive. */
export default async function MentionsLegales({ params }: PageProps<'/[lang]/mentions-legales'>) {
  const lang = (await params).lang as Lang;
  const contact = <ul>
    <li>{lang === 'en' ? 'Trade register: no. 526079 – Casablanca Court' : 'Registre de commerce : n° 526079 – Tribunal de Casablanca'}</li>
    <li>ICE : 002970877000083</li>
    <li>{lang === 'en' ? 'Phone' : 'Téléphone'} : <a href={site.phoneHref}>{site.phone}</a></li>
    <li>Email : <a href={`mailto:${site.email}`}>{site.email}</a></li>
  </ul>;
  const privacy = localePath(lang, '/confidentialite');

  if (lang === 'en') return <LegalPage lang={lang} title="Legal notice">
    <h2>Publisher</h2>
    <p>The website <a href="https://www.medialead.ma">www.medialead.ma</a> is published by MEDIALIK, operating the Medialead brand, with a share capital of 100,000 dirhams, whose registered office is at 3, rue Sidi Bennour, 4th floor, apartment 20, Casablanca, Morocco.</p>
    {contact}
    <h2>Intellectual property</h2>
    <p>All content on the site (texts, visuals, videos, logos, structure) is the property of MEDIALIK or is used under authorisation. Any reproduction, in whole or in part, without prior written authorisation is prohibited. Client logos shown on the site remain the property of their respective owners and are used with their consent.</p>
    <h2>Results presented</h2>
    <p>The figures presented in the case studies correspond to real projects and specific periods. They do not guarantee results for other projects.</p>
    <h2>Liability</h2>
    <p>MEDIALIK strives to provide accurate and up-to-date information, without being able to guarantee the absence of errors. The site may contain links to third-party sites, for which MEDIALIK is not responsible.</p>
    <h2>Personal data</h2>
    <p>The processing of personal data collected on this site is described in the <Link href={privacy}>Privacy policy</Link>.</p>
    <h2>Governing law</h2>
    <p>This notice is governed by Moroccan law. Any dispute falls under the jurisdiction of the courts of Casablanca.</p>
  </LegalPage>;

  return <LegalPage lang={lang} title="Mentions légales">
    <h2>Éditeur du site</h2>
    <p>Le site <a href="https://www.medialead.ma">www.medialead.ma</a> est édité par la société MEDIALIK, exploitant la marque Medialead, au capital de 100 000 dirhams, dont le siège social est situé au 3, rue Sidi Bennour, 4e étage, appartement 20, Casablanca, Maroc.</p>
    {contact}
    <h2>Propriété intellectuelle</h2>
    <p>L’ensemble des contenus du site (textes, visuels, vidéos, logos, structure) est la propriété de MEDIALIK ou fait l’objet d’une autorisation d’utilisation. Toute reproduction, totale ou partielle, sans autorisation écrite préalable est interdite. Les logos des clients présentés sur le site restent la propriété de leurs titulaires respectifs et sont utilisés avec leur accord.</p>
    <h2>Résultats présentés</h2>
    <p>Les résultats chiffrés présentés dans les études de cas correspondent à des projets réels et à des périodes précises. Ils ne constituent pas une garantie de résultat pour d’autres projets.</p>
    <h2>Responsabilité</h2>
    <p>MEDIALIK s’efforce de fournir des informations exactes et à jour, sans pouvoir garantir l’absence d’erreurs. Le site peut contenir des liens vers des sites tiers, dont MEDIALIK n’est pas responsable.</p>
    <h2>Données personnelles</h2>
    <p>Le traitement des données personnelles collectées sur ce site est décrit dans la <Link href={privacy}>Politique de confidentialité</Link>.</p>
    <h2>Droit applicable</h2>
    <p>Les présentes mentions sont régies par le droit marocain. Tout litige relève de la compétence des tribunaux de Casablanca.</p>
  </LegalPage>;
}
