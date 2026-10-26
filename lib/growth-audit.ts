/* Simulateur Growth Audit — questions, matrice de scoring et textes de résultat
   (spécification fonctionnelle, octobre 2026). Module pur : utilisé par le composant et par la route API,
   qui recalcule le résultat côté serveur au lieu de faire confiance au navigateur. */

export type Category = 'product_launch' | 'app_growth' | 'product_takeover' | 'digital_transformation' | 'audit_first';
export type Axis = 'product' | 'tracking' | 'acquisition' | 'conversion' | 'operations';
export type Scores = Record<Category, number>;
type Option = { id: string; label: string; points: Partial<Scores>; axis?: Axis };
type Question = { id: 'q1' | 'q2' | 'q3' | 'q4'; step: string; title: string; help?: string; options: Option[] };

export const categories: Category[] = ['product_launch', 'app_growth', 'product_takeover', 'digital_transformation', 'audit_first'];

export const categoryLabels: Record<Category, string> = {
  product_launch: 'Product Launch',
  app_growth: 'App Growth',
  product_takeover: 'Product Takeover',
  digital_transformation: 'Digital Transformation & Lead Generation',
  audit_first: 'Strategy / Audit First',
};

export const axisLabels: Record<Axis, string> = {
  product: 'Product',
  tracking: 'Tracking & Data',
  acquisition: 'Acquisition',
  conversion: 'Conversion',
  operations: 'Business / Operations',
};

export const questions: Question[] = [
  {
    id: 'q1', step: 'Point de départ', title: 'Quel est votre point de départ aujourd’hui ?',
    help: 'Choisissez la situation qui ressemble le plus à votre réalité actuelle.',
    options: [
      { id: 'q1_launch', label: 'Nous préparons le lancement d’un nouveau produit digital', points: { product_launch: 4, audit_first: 1 } },
      { id: 'q1_app', label: 'Nous avons déjà une app / plateforme, mais la croissance bloque', points: { app_growth: 4, audit_first: 1 } },
      { id: 'q1_takeover', label: 'Nous avons un produit existant qu’il faut reprendre, corriger ou faire évoluer', points: { product_takeover: 4, app_growth: 1 } },
      { id: 'q1_business', label: 'Nous avons un business existant et nous voulons mieux nous digitaliser / générer des leads', points: { digital_transformation: 4, audit_first: 1 } },
      { id: 'q1_unknown', label: 'Nous ne savons pas encore exactement où se situe le blocage', points: { audit_first: 4 } },
    ],
  },
  {
    id: 'q2', step: 'Blocage principal', title: 'Qu’est-ce qui bloque le plus aujourd’hui ?',
    options: [
      { id: 'q2_product', label: 'Le produit n’est pas encore prêt ou pas assez solide', points: { product_launch: 3, product_takeover: 2 }, axis: 'product' },
      { id: 'q2_tracking', label: 'Le tracking / la data ne permettent pas de piloter correctement', points: { app_growth: 3, product_takeover: 2, audit_first: 2 }, axis: 'tracking' },
      { id: 'q2_conversion', label: 'Nous avons du trafic / des utilisateurs, mais pas assez de conversions', points: { app_growth: 3, digital_transformation: 2 }, axis: 'conversion' },
      { id: 'q2_demand', label: 'Nous n’arrivons pas à générer une demande régulière', points: { digital_transformation: 4, product_launch: 1 }, axis: 'acquisition' },
      { id: 'q2_operations', label: 'Notre offre ou nos opérations ne sont pas encore structurées pour scaler', points: { digital_transformation: 3, audit_first: 2 }, axis: 'operations' },
    ],
  },
  {
    id: 'q3', step: 'Actifs existants', title: 'Que possédez-vous déjà aujourd’hui ?',
    options: [
      { id: 'q3_mvp', label: 'Une idée claire / un MVP, mais pas encore un vrai lancement', points: { product_launch: 4 }, axis: 'product' },
      { id: 'q3_launched', label: 'Un produit lancé avec des utilisateurs ou clients', points: { app_growth: 4 }, axis: 'conversion' },
      { id: 'q3_legacy', label: 'Un produit existant mais difficile à faire évoluer', points: { product_takeover: 4 }, axis: 'product' },
      { id: 'q3_selling', label: 'Un business qui vend déjà, mais avec une acquisition digitale peu structurée', points: { digital_transformation: 4 }, axis: 'acquisition' },
      { id: 'q3_weak', label: 'Une présence digitale faible ou un site qui ne joue pas vraiment son rôle', points: { digital_transformation: 3, audit_first: 1 }, axis: 'acquisition' },
    ],
  },
  {
    id: 'q4', step: 'Objectif 90 jours', title: 'Quel résultat voulez-vous prioritairement obtenir dans les 90 prochains jours ?',
    options: [
      { id: 'q4_launch', label: 'Lancer correctement un produit digital', points: { product_launch: 4 } },
      { id: 'q4_app', label: 'Améliorer l’activation, la conversion ou la rétention d’une app', points: { app_growth: 4 } },
      { id: 'q4_takeover', label: 'Reprendre un produit existant et le rendre scalable', points: { product_takeover: 4 } },
      { id: 'q4_leads', label: 'Générer plus de leads, ventes, inscriptions ou installations', points: { digital_transformation: 4 } },
      { id: 'q4_clarify', label: 'Clarifier la priorité avant d’investir davantage', points: { audit_first: 4 } },
    ],
  },
];

export type Answers = Partial<Record<Question['id'], string>>;
export type Confidence = 'high' | 'medium' | 'low';
export type Result = { primary: Category; secondary: Category | null; leads: Category[]; confidence: Confidence; axes: Axis[]; scores: Scores };

const findOption = (qi: number, id?: string) => questions[qi].options.find(o => o.id === id);
/* Catégorie principale d'une réponse : celle qui reçoit le plus de points. */
const mainCategory = (o?: Option) => o && (Object.entries(o.points).sort((a, b) => b[1] - a[1])[0][0] as Category);

export function isComplete(answers: Answers): answers is Required<Answers> {
  return questions.every((q, i) => !!findOption(i, answers[q.id]));
}

export function computeResult(answers: Required<Answers>): Result {
  const scores = Object.fromEntries(categories.map(c => [c, 0])) as Scores;
  questions.forEach((q, i) => {
    const o = findOption(i, answers[q.id]);
    if (o) for (const [c, p] of Object.entries(o.points)) scores[c as Category] += p ?? 0;
  });
  const ranked = [...categories].sort((a, b) => scores[b] - scores[a]);
  const gap = scores[ranked[0]] - scores[ranked[1]];
  const confidence: Confidence = gap >= 5 ? 'high' : gap >= 3 ? 'medium' : 'low';

  // Axes : le blocage (Q2) d'abord, puis les actifs (Q3) s'ils pointent ailleurs.
  const axes = [...new Set([findOption(1, answers.q2)?.axis, findOption(2, answers.q3)?.axis].filter((a): a is Axis => !!a))];

  // Trois catégories dans une fenêtre de 2 points : prudence, on clarifie d'abord.
  if (scores[ranked[0]] - scores[ranked[2]] <= 2) {
    return { primary: 'audit_first', secondary: null, leads: ranked.filter(c => c !== 'audit_first').slice(0, 2), confidence, axes, scores };
  }
  let primary = ranked[0];
  if (gap === 0) {
    // Égalité parfaite : objectif à 90 jours, puis point de départ, sinon Audit First.
    const tied = ranked.filter(c => scores[c] === scores[ranked[0]]);
    const q4 = mainCategory(findOption(3, answers.q4));
    const q1 = mainCategory(findOption(0, answers.q1));
    primary = q4 && tied.includes(q4) ? q4 : q1 && tied.includes(q1) ? q1 : 'audit_first';
  }
  const secondary = gap <= 2 ? ranked.find(c => c !== primary && c !== 'audit_first') ?? null : null;
  return { primary, secondary, leads: [], confidence, axes, scores };
}

/* Écrans de résultat — copywriting exact de la spécification. */
export const resultCopy: Record<Category, { title: string; diagnostic: string; priorities: string[]; service: string; cta: string; secondaryCta: string }> = {
  product_launch: {
    title: 'Votre priorité : Product Launch',
    diagnostic: 'Votre principal enjeu n’est pas encore de scaler. La priorité est de préparer un produit, un tracking et un lancement capables de soutenir la croissance qui suivra.',
    priorities: ['Cadrer la version à lancer et éviter de sur-construire.', 'Préparer le tracking des actions clés avant l’acquisition.', 'Construire la stratégie de lancement et le premier funnel d’activation.'],
    service: 'Product Strategy + Development + Launch + Measurement',
    cta: 'Parler de mon lancement', secondaryCta: 'Voir un cas Product / Launch',
  },
  app_growth: {
    title: 'Votre priorité : App Growth',
    diagnostic: 'Votre produit existe déjà. Le principal enjeu est maintenant de relier acquisition, activation, conversion et rétention à des résultats business mesurables.',
    priorities: ['Vérifier le tracking et les events réellement utiles.', 'Identifier où le funnel perd les utilisateurs.', 'Optimiser l’acquisition sur la première action business et non sur l’install uniquement.'],
    service: 'App Growth Audit + Tracking + Funnel Optimization + Acquisition',
    cta: 'Auditer la croissance de mon app', secondaryCta: 'Voir le cas DROK / WashRoc',
  },
  product_takeover: {
    title: 'Votre priorité : Product Takeover',
    diagnostic: 'Le frein principal semble être la base produit. Avant d’investir davantage dans la croissance, il faut sécuriser ce qui existe, reprendre ce qui bloque et remettre le produit en capacité d’évoluer.',
    priorities: ['Audit technique et produit.', 'Cartographie des risques, dette technique et blocages.', 'Roadmap de reprise, stabilisation et évolution.'],
    service: 'Product Audit + Technical Review + Takeover Roadmap',
    cta: 'Faire auditer mon produit', secondaryCta: 'Voir le cas WashRoc',
  },
  digital_transformation: {
    title: 'Votre priorité : Digital Transformation & Lead Generation',
    diagnostic: 'Votre enjeu principal est de mieux structurer l’offre, le parcours digital et l’acquisition afin de transformer la demande en leads qualifiés, ventes, inscriptions ou installations.',
    priorities: ['Clarifier l’offre et le parcours de conversion.', 'Structurer acquisition, qualification et suivi commercial.', 'Connecter progressivement les leads aux résultats business.'],
    service: 'Digital Transformation + Lead Generation + Funnel + CRM / WhatsApp',
    cta: 'Auditer mon acquisition', secondaryCta: 'Voir les cas par secteur',
  },
  audit_first: {
    title: 'Votre priorité : Clarifier avant d’exécuter',
    diagnostic: 'Votre situation présente plusieurs frictions en même temps. Avant d’ajouter du développement ou du budget marketing, il est préférable d’identifier précisément le premier blocage à traiter.',
    priorities: ['Clarifier la priorité business.', 'Identifier le goulot d’étranglement principal.', 'Construire une roadmap par ordre d’impact.'],
    service: 'Strategic Growth Audit / Diagnostic Workshop',
    cta: 'Réserver un diagnostic', secondaryCta: 'Parler de ma situation',
  },
};
