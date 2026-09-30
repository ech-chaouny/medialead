import { MapPin, Bike, Droplets, Sparkles, CarFront, Leaf, GraduationCap, House, ShoppingBag, Wifi, Radio } from 'lucide-react';

export default function ClientMotif({sector}:{sector:string}) {
  return <div className={`client-motif motif-${sector}`} aria-hidden="true">
    {sector==='drok' && <><svg className="delivery-route" viewBox="0 0 340 200"><path d="M-10 150H65Q90 150 90 125V65Q90 40 115 40H240Q265 40 265 65V115Q265 140 290 140H350"/></svg><MapPin className="motif-one"/><Bike className="motif-two"/></>}
    {sector==='washroc' && <><i className="bubble bubble-one"/><i className="bubble bubble-two"/><i className="bubble bubble-three"/><Droplets className="motif-one"/><Sparkles className="motif-two"/></>}
    {sector==='omak' && <><div className="road-lines"/><CarFront className="motif-one"/><Sparkles className="motif-two"/></>}
    {sector==='fnm' && <><Leaf className="leaf-one"/><Leaf className="leaf-two"/><GraduationCap className="motif-two"/></>}
    {sector==='privu' && <><House className="market-tile motif-one"/><ShoppingBag className="market-tile motif-two"/><div className="market-grid"/></>}
    {sector==='iam' && <><div className="signal-rings"><i/><i/><i/></div><Wifi className="motif-one"/><Radio className="motif-two"/></>}
  </div>;
}
