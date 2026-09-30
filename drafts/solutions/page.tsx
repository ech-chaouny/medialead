import type {Metadata} from 'next';
import {Eyebrow,ServiceCard,CTA} from '@/components/ui';
import {services} from '@/lib/content';
export const metadata:Metadata={title:'Nos expertises',description:'Product Development, App Marketing, Growth, Digital Transformation, Data et Launch : les expertises connectées de Medialead.'};
export default function Solutions(){return <><div className="page-hero container"><Eyebrow>NOS EXPERTISES</Eyebrow><h1>Plusieurs expertises.<br/><span>Un même système.</span></h1><p>Nous combinons technologie, acquisition et mesure selon votre point de départ. Chaque intervention répond à un problème précis.</p></div><section className="container section" style={{paddingTop:0}}><div className="services-grid">{services.map(s=><ServiceCard key={s.slug} service={s}/>)}</div></section><CTA/></>}
