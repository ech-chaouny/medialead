import type {Metadata} from 'next';
import {Eyebrow,CTA} from '@/components/ui';
import WorkGrid from '@/components/work-grid';
export const metadata:Metadata={title:'Nos réalisations',description:'DROK, WashRoc, OMAK, FNM et Privu : découvrez les projets Product, Growth & Data de Medialead.'};
export default function Work(){return <><div className="page-hero container"><Eyebrow>NOS RÉALISATIONS</Eyebrow><h1>Des projets.<br/><span>De vraies transformations.</span></h1><p>Applications, nouveaux parcours, acquisition : découvrez le contexte et les décisions derrière chaque projet.</p></div><section className="section container" style={{paddingTop:0}}><WorkGrid/></section><CTA/></>}
