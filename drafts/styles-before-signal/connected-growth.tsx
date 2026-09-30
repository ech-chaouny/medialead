'use client';

import { useEffect, useRef, useState } from 'react';
import { Code2, Megaphone, ChartNoAxesCombined, UserCheck, Check, X } from 'lucide-react';

const pillars = [{name:'Produit',Icon:Code2},{name:'Acquisition',Icon:Megaphone},{name:'Data',Icon:ChartNoAxesCombined}];

export default function ConnectedGrowth(){
  const ref=useRef<HTMLDivElement>(null);
  const [visible,setVisible]=useState(false);
  useEffect(()=>{
    const observer=new IntersectionObserver(([entry])=>{if(entry.isIntersecting){setVisible(true);observer.disconnect();}},{threshold:.3});
    if(ref.current)observer.observe(ref.current);
    return ()=>observer.disconnect();
  },[]);
  return <div ref={ref} className={`connection-comparison${visible?' is-visible':''}`}>
    <div className="connection-grid">
      {[false,true].map(joined=><article className={`connection-card ${joined?'connection-joined':'connection-fragmented'}`} key={String(joined)}>
        <div className="connection-caption"><span>{joined?'L’APPROCHE MEDIALEAD':'LE MODÈLE FRAGMENTÉ'}</span><span className="connection-status">{joined ? <Check size={13} aria-hidden="true"/> : <X size={13} aria-hidden="true"/>}{joined?'Connecté':'Dispersé'}</span></div>
        <h3>{joined?'Quand tout avance ensemble.':'Quand tout travaille séparément.'}</h3>
        <div className="connection-diagram" aria-label={joined?'Produit, acquisition et data reliés à un résultat business mesurable':'Produit, acquisition et data isolés, sans résultat relié'}>
          <div className="connection-pillars">{pillars.map(({name,Icon})=><div className="connection-node" key={name}><Icon size={23} strokeWidth={1.4} aria-hidden="true"/><span>{name}</span></div>)}</div>
          <svg className="connection-wires" viewBox="0 0 420 82" preserveAspectRatio="none" aria-hidden="true">
            {joined?<><path className="wire-base" d="M70 0V25Q70 35 80 35H340Q350 35 350 25V0M210 0V82"/><path className="wire-pulse" pathLength={100} d="M70 0V25Q70 35 80 35H200Q210 35 210 45V82"/>
              <path className="wire-pulse" pathLength={100} d="M210 0V82"/>
              <path className="wire-pulse" pathLength={100} d="M350 0V25Q350 35 340 35H220Q210 35 210 45V82"/></>:<path className="wire-broken" d="M70 0V20M70 35V45H120M160 45H185M210 0V25M210 58V82M350 0V20M350 35V45H300M260 45H235"/>}
          </svg>
          <div className="connection-outcome">{joined?<><UserCheck size={19} aria-hidden="true"/><span>Résultat business mesurable</span><Check size={15} aria-hidden="true"/></>:<><span className="outcome-question" aria-hidden="true">?</span><span>Quel impact business ?</span></>}</div>
          {joined && <p className="connection-examples">Commande · Prestation réalisée · Inscription · Vente</p>}
        </div>
        <p>{joined?'Un parcours connecté, du premier clic au résultat business.':'Des actions dispersées. Un impact difficile à mesurer.'}</p>
      </article>)}
    </div>
    <ul className="connection-principles">{['Un produit pensé pour convertir','Une acquisition ciblée','Une mesure dès le départ'].map(text=><li key={text}><Check size={15} aria-hidden="true"/>{text}</li>)}</ul>
  </div>;
}
