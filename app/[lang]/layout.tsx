import type {Metadata} from 'next';
import {notFound} from 'next/navigation';
import Header from '@/components/header';
import Footer from '@/components/footer';
import Reveal from '@/components/reveal';
import AttributionKeeper from '@/components/attribution-keeper';
import ConsentManager from '@/components/consent-manager';
import WhatsAppButton from '@/components/whatsapp-button';
import LangProvider from '@/components/lang-provider';
import {langs, isLang} from '@/lib/i18n';
import '../globals.css';

const meta={
  fr:{title:'Medialead · Agence growth et développement à Casablanca',description:'Medialead, agence growth et développement à Casablanca. Génération de leads, applications et outils sur mesure pour les entreprises de services.',locale:'fr_MA'},
  en:{title:'Medialead · Growth and development agency in Casablanca',description:'Medialead, a growth and development agency in Casablanca. Lead generation, apps and custom tools for service businesses.',locale:'en_US'},
};
export const dynamicParams=false;
export function generateStaticParams(){return langs.map(lang=>({lang}))}
export async function generateMetadata({params}:LayoutProps<'/[lang]'>):Promise<Metadata>{
  const {lang}=await params; const m=meta[isLang(lang)?lang:'fr'];
  return {metadataBase:new URL('https://medialead.ma'),title:{default:m.title,template:'%s · Medialead'},description:m.description,openGraph:{type:'website',locale:m.locale,siteName:'Medialead',title:m.title,description:m.description}};
}
export default async function RootLayout({children,params}:LayoutProps<'/[lang]'>){
  const {lang}=await params;
  if(!isLang(lang))notFound();
  return <html lang={lang}><body><LangProvider lang={lang}><a href="#main" className="skip-link">{lang==='en'?'Skip to content':'Aller au contenu'}</a><Header/><main id="main">{children}</main><Footer lang={lang}/><WhatsAppButton lang={lang}/><ConsentManager/><Reveal/><AttributionKeeper/></LangProvider></body></html>;
}
