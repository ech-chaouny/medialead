import type { Metadata } from 'next';
import LegalPage from '@/components/legal-page';
import ManageCookies from '@/components/manage-cookies';
import type { Lang } from '@/lib/i18n';

const copy = {
  fr: {
    meta: { title: 'Politique cookies', description: 'Les cookies utilisés sur medialead.ma et comment modifier votre choix.' },
    title: 'Politique cookies',
    intro: 'Un cookie est un petit fichier déposé sur votre appareil lorsque vous visitez un site. Sur medialead.ma, nous utilisons trois catégories de cookies :',
    head: ['Catégorie', 'Outil', 'Rôle', 'Consentement'],
    rows: [['Nécessaires', 'Site', 'Fonctionnement du site, mémorisation de votre choix de cookies et de votre langue', 'Non requis'], ['Mesure d’audience', 'Google Analytics 4, Google Tag Manager', 'Statistiques de visite anonymisées', 'Requis'], ['Publicité', 'Meta Pixel, Google Ads', 'Mesurer l’efficacité de nos publicités et vous montrer des publicités pertinentes', 'Requis']],
    keep: 'Votre choix est conservé 6 mois. Vous pouvez le modifier à tout moment via le lien « Gérer mes cookies » en bas de chaque page.',
    none: 'Aucun cookie de mesure ou de publicité n’est déposé avant que vous ayez cliqué sur « Tout accepter » ou activé la catégorie correspondante dans « Personnaliser ».',
    manage: 'Gérer mes cookies',
  },
  en: {
    meta: { title: 'Cookie policy', description: 'The cookies used on medialead.ma and how to change your choice.' },
    title: 'Cookie policy',
    intro: 'A cookie is a small file stored on your device when you visit a website. On medialead.ma, we use three categories of cookies:',
    head: ['Category', 'Tool', 'Purpose', 'Consent'],
    rows: [['Necessary', 'Site', 'Site operation, remembering your cookie choice and your language', 'Not required'], ['Audience measurement', 'Google Analytics 4, Google Tag Manager', 'Anonymised visit statistics', 'Required'], ['Advertising', 'Meta Pixel, Google Ads', 'Measure the effectiveness of our ads and show you relevant ads', 'Required']],
    keep: 'Your choice is kept for 6 months. You can change it at any time via the “Manage cookies” link at the bottom of every page.',
    none: 'No measurement or advertising cookie is set before you click “Accept all” or enable the matching category in “Customise”.',
    manage: 'Manage cookies',
  },
};
export async function generateMetadata({ params }: PageProps<'/[lang]/cookies'>): Promise<Metadata> { return copy[(await params).lang as Lang].meta; }

export default async function Cookies({ params }: PageProps<'/[lang]/cookies'>) {
  const lang = (await params).lang as Lang;
  const t = copy[lang];
  return <LegalPage lang={lang} title={t.title}>
    <p>{t.intro}</p>
    <div className="legal-table-wrap">
      <table className="legal-table">
        <thead><tr>{t.head.map(h => <th scope="col" key={h}>{h}</th>)}</tr></thead>
        <tbody>{t.rows.map(r => <tr key={r[0]}>{r.map((c, i) => i === 0 ? <th scope="row" key={i}>{c}</th> : <td key={i}>{c}</td>)}</tr>)}</tbody>
      </table>
    </div>
    <p>{t.keep}</p>
    <p>{t.none}</p>
    <p><ManageCookies className="button" label={t.manage} /></p>
  </LegalPage>;
}
