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
    cta: 'Auditer la croissance de mon app', secondaryCta: 'Voir les applications livrées',
  },
  product_takeover: {
    title: 'Votre priorité : Product Takeover',
    diagnostic: 'Le frein principal semble être la base produit. Avant d’investir davantage dans la croissance, il faut sécuriser ce qui existe, reprendre ce qui bloque et remettre le produit en capacité d’évoluer.',
    priorities: ['Audit technique et produit.', 'Cartographie des risques, dette technique et blocages.', 'Roadmap de reprise, stabilisation et évolution.'],
    service: 'Product Audit + Technical Review + Takeover Roadmap',
    cta: 'Faire auditer mon produit', secondaryCta: 'Voir une reprise de produit',
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

/* --- Version anglaise du simulateur : mêmes identifiants, seuls les textes changent. Le calcul et l'API restent identiques. --- */
const questionsEn: Record<Question['id'], { step: string; title: string; help?: string }> = {
  q1: { step: 'Starting point', title: 'What is your starting point today?', help: 'Choose the situation closest to your current reality.' },
  q2: { step: 'Main blocker', title: 'What is holding you back the most today?' },
  q3: { step: 'Existing assets', title: 'What do you already have today?' },
  q4: { step: '90-day goal', title: 'What result do you most want to achieve in the next 90 days?' },
};
const optionsEn: Record<string, string> = {
  q1_launch: 'We are preparing to launch a new digital product', q1_app: 'We already have an app / platform, but growth is stuck', q1_takeover: 'We have an existing product that needs to be taken over, fixed or evolved', q1_business: 'We have an existing business and want to go digital / generate leads', q1_unknown: 'We don’t know exactly where the blocker is yet',
  q2_product: 'The product isn’t ready or solid enough yet', q2_tracking: 'Tracking / data don’t let us steer properly', q2_conversion: 'We have traffic / users, but not enough conversions', q2_demand: 'We can’t generate steady demand', q2_operations: 'Our offer or operations aren’t structured to scale yet',
  q3_mvp: 'A clear idea / an MVP, but no real launch yet', q3_launched: 'A launched product with users or customers', q3_legacy: 'An existing product that is hard to evolve', q3_selling: 'A business that already sells, with loosely structured digital acquisition', q3_weak: 'A weak digital presence or a website that isn’t doing its job',
  q4_launch: 'Launch a digital product properly', q4_app: 'Improve an app’s activation, conversion or retention', q4_takeover: 'Take over an existing product and make it scalable', q4_leads: 'Generate more leads, sales, enrolments or installations', q4_clarify: 'Clarify the priority before investing more',
};
const resultCopyEn: typeof resultCopy = {
  product_launch: { title: 'Your priority: Product Launch', diagnostic: 'Your main challenge isn’t scaling yet. The priority is to prepare a product, tracking and a launch able to support the growth that follows.', priorities: ['Scope the version to launch and avoid over-building.', 'Set up tracking of key actions before acquisition.', 'Build the launch strategy and the first activation funnel.'], service: 'Product Strategy + Development + Launch + Measurement', cta: 'Talk about my launch', secondaryCta: 'See a Product / Launch case' },
  app_growth: { title: 'Your priority: App Growth', diagnostic: 'Your product already exists. The main challenge now is to connect acquisition, activation, conversion and retention to measurable business results.', priorities: ['Check tracking and the events that really matter.', 'Find where the funnel loses users.', 'Optimise acquisition for the first business action, not just the install.'], service: 'App Growth Audit + Tracking + Funnel Optimization + Acquisition', cta: 'Audit my app growth', secondaryCta: 'See the apps we delivered' },
  product_takeover: { title: 'Your priority: Product Takeover', diagnostic: 'The main brake seems to be the product foundation. Before investing more in growth, secure what exists, fix what blocks and make the product able to evolve again.', priorities: ['Technical and product audit.', 'Map risks, technical debt and blockers.', 'Takeover, stabilisation and evolution roadmap.'], service: 'Product Audit + Technical Review + Takeover Roadmap', cta: 'Get my product audited', secondaryCta: 'See a product takeover' },
  digital_transformation: { title: 'Your priority: Digital Transformation & Lead Generation', diagnostic: 'Your main challenge is to better structure the offer, the digital journey and acquisition, to turn demand into qualified leads, sales, enrolments or installations.', priorities: ['Clarify the offer and the conversion journey.', 'Structure acquisition, qualification and sales follow-up.', 'Gradually connect leads to business results.'], service: 'Digital Transformation + Lead Generation + Funnel + CRM / WhatsApp', cta: 'Audit my acquisition', secondaryCta: 'See cases by sector' },
  audit_first: { title: 'Your priority: Clarify before executing', diagnostic: 'Your situation shows several frictions at once. Before adding development or marketing budget, it is better to pinpoint the first blocker to address.', priorities: ['Clarify the business priority.', 'Identify the main bottleneck.', 'Build a roadmap ordered by impact.'], service: 'Strategic Growth Audit / Diagnostic Workshop', cta: 'Book a diagnostic', secondaryCta: 'Talk about my situation' },
};

/* Questions et textes de résultat dans la langue de la page. */
export const questionsFor = (lang: 'fr' | 'en'): Question[] => lang === 'fr' ? questions
  : questions.map(q => ({ ...q, ...questionsEn[q.id], options: q.options.map(o => ({ ...o, label: optionsEn[o.id] ?? o.label })) }));
export const resultCopyFor = (lang: 'fr' | 'en') => lang === 'en' ? resultCopyEn : resultCopy;
