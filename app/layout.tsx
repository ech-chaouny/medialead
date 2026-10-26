import type {Metadata} from 'next';
import Header from '@/components/header';
import Footer from '@/components/footer';
import Reveal from '@/components/reveal';
import AttributionKeeper from '@/components/attribution-keeper';
import './globals.css';
export const metadata:Metadata={metadataBase:new URL('https://medialead.ma'),title:{default:'Medialead — Product. Growth. Data.',template:'%s | Medialead'},description:'Votre partenaire Product, Growth & Data à Casablanca. Applications, acquisition et mesure : nous connectons le produit à la croissance de votre entreprise.'};
export default function RootLayout({children}:{children:React.ReactNode}){return <html lang="fr"><body><a href="#main" className="skip-link">Aller au contenu</a><Header/><main id="main">{children}</main><Footer/><Reveal/><AttributionKeeper/></body></html>}
