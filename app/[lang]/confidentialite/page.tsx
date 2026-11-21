import type { Metadata } from 'next';
import Link from 'next/link';
import LegalPage from '@/components/legal-page';
import { site } from '@/lib/site';
import { localePath, type Lang } from '@/lib/i18n';

const meta = {
  fr: { title: 'Politique de confidentialité', description: 'Données collectées, finalité, durée de conservation et vos droits (loi n° 09-08).' },
  en: { title: 'Privacy policy', description: 'Data collected, purpose, retention period and your rights (Moroccan law 09-08).' },
};
export async function generateMetadata({ params }: PageProps<'/[lang]/confidentialite'>): Promise<Metadata> { return meta[(await params).lang as Lang]; }

/* Référence : loi n° 09-08. Modèle de départ, à faire relire par un juriste avant publication définitive. */
export default async function Confidentialite({ params }: PageProps<'/[lang]/confidentialite'>) {
  const lang = (await params).lang as Lang;
  const mail = <a href={`mailto:${site.email}`}>{site.email}</a>;
  const cndp = <a href="https://www.cndp.ma" target="_blank" rel="noopener noreferrer">www.cndp.ma</a>;
  const cookies = localePath(lang, '/cookies');

  if (lang === 'en') return <LegalPage lang={lang} title="Privacy policy" updated="Last updated: November 2026">
    <h2>1. Data controller</h2>
    <p>MEDIALIK (Medialead), 3, rue Sidi Bennour, 4th floor, apartment 20, Casablanca, Morocco. Contact: {mail}.</p>
    <h2>2. Acceptance</h2>
    <p>By sending your details through a form on the site, by WhatsApp or by phone, you accept this privacy policy and the processing of your data under the conditions described below.</p>
    <h2>3. Data collected</h2>
    <p>We only collect the information you voluntarily provide: last name, first name, company, phone, email and the content of your message or your Growth Audit answers.</p>
    <h2>4. Single purpose</h2>
    <p>This data is used only to get back to you and answer your request (information, audit or quote). It is never sold, rented or used to send you advertising messages.</p>
    <h2>5. Recipients</h2>
    <p>Your data is accessible only to the Medialead team handling your request.</p>
    <h2>6. Retention period</h2>
    <p>Your data is kept for 3 years from the last exchange, then deleted.</p>
    <h2>7. Your rights</h2>
    <p>Under Moroccan law 09-08, you have the right to access, rectify and, for legitimate reasons, object to the processing of your data. To exercise these rights, write to {mail} stating your request. You may also lodge a complaint with the National Commission for the Protection of Personal Data (CNDP): {cndp}.</p>
    <h2>8. Security</h2>
    <p>We take appropriate measures to protect your data against unauthorised access, loss or alteration: secure connection (HTTPS) and access limited to the team concerned.</p>
    <h2>9. Cookies</h2>
    <p>The cookies used on the site are described on the <Link href={cookies}>Cookies</Link> page.</p>
  </LegalPage>;

  return <LegalPage lang={lang} title="Politique de confidentialité" updated="Dernière mise à jour : novembre 2026">
    <h2>1. Responsable du traitement</h2>
    <p>MEDIALIK (Medialead), 3, rue Sidi Bennour, 4e étage, appartement 20, Casablanca, Maroc. Contact : {mail}.</p>
    <h2>2. Acceptation</h2>
    <p>En envoyant vos coordonnées via un formulaire du site, par WhatsApp ou par téléphone, vous acceptez la présente politique de confidentialité et le traitement de vos données dans les conditions décrites ci-dessous.</p>
    <h2>3. Données collectées</h2>
    <p>Nous collectons uniquement les informations que vous nous transmettez volontairement : nom, prénom, entreprise, téléphone, email et le contenu de votre message ou de vos réponses au Growth Audit.</p>
    <h2>4. Finalité unique</h2>
    <p>Ces données sont utilisées uniquement pour vous recontacter et répondre à votre demande (information, audit ou devis). Elles ne sont ni vendues, ni louées, ni utilisées pour vous envoyer des messages publicitaires.</p>
    <h2>5. Destinataires</h2>
    <p>Vos données sont accessibles uniquement à l’équipe Medialead chargée de traiter votre demande.</p>
    <h2>6. Durée de conservation</h2>
    <p>Vos données sont conservées 3 ans à compter du dernier échange, puis supprimées.</p>
    <h2>7. Vos droits</h2>
    <p>Conformément à la loi n° 09-08, vous disposez d’un droit d’accès, de rectification et d’opposition, pour des motifs légitimes, au traitement de vos données. Pour exercer ces droits, écrivez à {mail} en précisant votre demande. Vous pouvez également adresser une réclamation à la Commission nationale de contrôle de la protection des données à caractère personnel (CNDP) : {cndp}.</p>
    <h2>8. Sécurité</h2>
    <p>Nous prenons des mesures adaptées pour protéger vos données contre l’accès non autorisé, la perte ou l’altération : connexion sécurisée (HTTPS) et accès limité à l’équipe concernée.</p>
    <h2>9. Cookies</h2>
    <p>Les cookies utilisés sur le site sont décrits sur la page <Link href={cookies}>Cookies</Link>.</p>
  </LegalPage>;
}
