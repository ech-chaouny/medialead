export const services = [
  { slug: 'product-development', number: '01', name: 'Product Development', short: 'Des produits conçus pour aller plus loin.', icon: 'code', description: 'Applications mobiles, plateformes et outils métier. Nous construisons et faisons évoluer le produit qui sert votre prochaine étape.', capabilities: ['Applications iOS & Android', 'Plateformes, SaaS & marketplaces', 'Reprise et stabilisation de produits', 'APIs, intégrations & outils métier', 'Maintenance et évolution produit'], question: 'Un produit à construire. Ou à faire évoluer.', process: ['Comprendre', 'Concevoir', 'Développer', 'Tester', 'Faire évoluer'], cases: ['drok', 'washroc', 'privu'] },
  { slug: 'app-marketing', number: '02', name: 'App Marketing', short: 'De la première installation au prochain achat.', icon: 'phone', description: 'Acquisition, parcours utilisateur et mesure travaillent ensemble pour transformer les installations en actions utiles à votre business.', capabilities: ['Audit App Growth & plan de mesure', 'Acquisition mobile & creative testing', 'ASO et présentation sur les stores', 'Activation et première action', 'Conversion, rétention & réactivation'], question: 'Votre app mérite plus que des installations.', process: ['Installer', 'Activer', 'Convertir', 'Fidéliser'], cases: ['drok', 'washroc'] },
  { slug: 'growth-lead-generation', number: '03', name: 'Growth & Lead Generation', short: 'De la demande. Et surtout, les bons clients.', icon: 'trend', description: 'Nous relions les campagnes, les landing pages et le suivi commercial pour piloter la qualité des demandes jusqu’à la conversion.', capabilities: ['Paid media & Search', 'Landing pages de conversion', 'Qualification & parcours WhatsApp', 'Créatifs et tests d’offres', 'Suivi des opportunités et des ventes'], question: 'Plus de clics ne suffit pas.', process: ['Attirer', 'Qualifier', 'Contacter', 'Convertir'], cases: ['omak', 'fnm'] },
  { slug: 'digital-transformation', number: '04', name: 'Digital Transformation', short: 'Votre business, prêt pour sa prochaine étape.', icon: 'layers', description: 'Nous faisons évoluer votre présence digitale, vos parcours clients et vos outils autour de la façon dont votre entreprise fonctionne et vend.', capabilities: ['Audit du parcours et des besoins métier', 'Structuration de l’offre digitale', 'Sites et parcours de contact', 'Outils et intégrations adaptés', 'Connexion entre acquisition et ventes'], question: 'Le digital doit faire avancer votre entreprise.', process: ['Auditer', 'Structurer', 'Connecter', 'Améliorer'], cases: ['fnm', 'omak', 'washroc'] },
  { slug: 'measurement-data', number: '05', name: 'Measurement & Data', short: 'Moins d’angles morts. De meilleures décisions.', icon: 'chart', description: 'Du clic à l’action business : nous définissons les événements utiles et connectons les données produit, marketing et commerciales.', capabilities: ['Plans de tracking & architecture des événements', 'GA4, GTM, SDKs et pixels selon les besoins', 'CRM et suivi des sources', 'Dashboards & qualité des données', 'Attribution selon les données disponibles'], question: 'Comprendre ce qui crée vraiment de la valeur.', process: ['Définir', 'Instrumenter', 'Vérifier', 'Décider'], cases: ['drok', 'washroc'] },
  { slug: 'launch-relaunch', number: '06', name: 'Launch & Relaunch', short: 'Un lancement pensé comme un système.', icon: 'rocket', description: 'Nous préparons le produit, l’offre, le tracking et les campagnes dans une même dynamique, puis apprenons des premiers usages.', capabilities: ['Audit de préparation produit', 'Positionnement & offre de lancement', 'Préparation du tracking', 'Créatifs & campagnes de lancement', 'Retours produit et itérations'], question: 'Le lancement est le début de la croissance.', process: ['Préparer', 'Lancer', 'Observer', 'Améliorer'], cases: ['drok', 'washroc'] },
];
export const projects = [
 { slug:'drok', name:'DROK', category:'Product & App Growth', label:'DELIVERY · MOBILE APP', title:'Reconstruire le produit. Préparer la croissance.', description:'Une nouvelle base pour une application de livraison à Mohammedia, avec un parcours pensé de la découverte à la commande terminée.', color:'#ff6b16', bg:'drok', tags:['Product Development','App Marketing'], context:'L’application existante avait atteint ses limites techniques. La prochaine étape nécessitait de réaligner le produit, la mesure et l’acquisition.', intervention:'Le projet porte sur la reconstruction de l’application, l’évolution du parcours de commande et la préparation des événements utiles au pilotage de l’acquisition.', funnel:['Installation','Inscription','Première commande','Commande terminée','Nouvelle commande'], outcome:'L’objectif : passer d’un pilotage à l’installation à un suivi de la première commande et du réachat.', status:'Relance & mesure en cours', details:['Reconstruction du produit mobile','Évolution du parcours de commande','Préparation du tracking produit','Stratégie de relance orientée première commande'] },
 { slug:'washroc', name:'WashRoc', category:'Product & App Growth', label:'ON-DEMAND · PRODUCT TRANSFORMATION', title:'Un nouveau modèle. Un produit qui suit.', description:'Adapter l’expérience de lavage à domicile à un service opéré directement par les équipes WashRoc.',color:'#73b8ff',bg:'washroc',tags:['Product Takeover','App Growth'],context:'WashRoc évolue d’un modèle d’intermédiation vers un service réalisé par ses propres équipes à Casablanca. L’application doit accompagner cette évolution.',intervention:'Le travail se concentre sur les véhicules, les services, les zones et les disponibilités, pour relier réservation, exécution du service et expérience client.',funnel:['Inscription','Choix du service','Réservation','Lavage terminé','Nouvelle réservation'],outcome:'L’objectif : mesurer les prestations terminées et faire progresser l’acquisition en tenant compte de la capacité opérationnelle.',status:'Transformation & lancement',details:['Adaptation au modèle opérationnel','Parcours de réservation et disponibilités','Définition des événements business','Articulation acquisition et capacité opérationnelle']},
 {slug:'omak',name:'OMAK Service',category:'Digital Transformation',label:'AUTOMOTIVE · LEAD GENERATION',title:'Du premier contact à la visite au garage.',description:'Connecter les offres, les contenus et l’acquisition digitale aux demandes concrètes de services automobiles.',color:'#d5ed75',bg:'omak',tags:['Digital Transformation','Lead Generation'],context:'OMAK Service souhaite structurer ses offres et moderniser son acquisition pour générer des demandes et des visites au garage.',intervention:'Mise en avant des services, notamment le débosselage et le PPF, contenus orientés conversion et parcours de qualification via WhatsApp.',funnel:['Demande','Qualification','Rendez-vous','Visite garage','Prestation'],outcome:'Une approche qui suit la demande jusqu’à la prestation. Les résultats chiffrés seront publiés après validation du périmètre et de l’attribution.',status:'Acquisition & conversion',details:['Structuration des offres digitales','Créatifs et contenus de campagne','Acquisition et demandes WhatsApp','Suivi de la qualification à la visite']},
 {slug:'fnm',name:'FNM',category:'Digital Transformation',label:'EDUCATION · STUDENT ACQUISITION',title:'Des formations visibles. Des parcours plus clairs.',description:'Relier le site, les campagnes et le suivi des prospects au parcours d’inscription.',color:'#ceb5ff',bg:'fnm',tags:['Site Web','Lead Generation'],context:'L’institut avait besoin de mieux présenter ses formations et de structurer son acquisition jusqu’aux inscriptions.',intervention:'Création et structuration du site, présentation des formations, campagnes Meta et parcours de contact et de qualification.',funnel:['Découverte','Demande','Contact','Qualification','Inscription'],outcome:'Un parcours d’acquisition reliant la présence digitale au suivi commercial. Les chiffres seront ajoutés après validation de la période et des inscriptions concernées.',status:'Accompagnement acquisition',details:['Site et présentation des formations','Campagnes Meta','Parcours de contact et qualification','Optimisation selon les formations et périodes']},
 {slug:'privu',name:'Privu',category:'Product Development',label:'MARKETPLACE · MOBILE PRODUCT',title:'Une marketplace qui met la vidéo au premier plan.',description:'Transformer un concept en expérience mobile, de la publication d’une annonce à la monétisation.',color:'#ed99c6',bg:'privu',tags:['Mobile App','Marketplace'],context:'Privu est un projet de marketplace orientée vidéo, avec des parcours de publication et des comptes professionnels.',intervention:'Conception et développement du produit mobile, des annonces et des parcours professionnels, avec une logique de monétisation et d’abonnements.',funnel:['Découvrir','Consulter','Publier','Compte professionnel','Abonnement'],outcome:'Ce projet illustre l’expertise produit et marketplace de Medialead. Il n’est pas présenté comme une preuve de performance publicitaire.',status:'Product & monetisation',details:['Produit mobile iOS et Android','Publication et consultation vidéo','Comptes professionnels','Parcours d’abonnement']},
 {slug:'telecom',name:'Réseau Commercial Telecom',category:'Digital Transformation',label:'TELECOM · LEAD GENERATION',title:'Scaler la lead generation d’un réseau multi-agences.',description:'Lead generation continue pour des offres WiFi, ADSL et Fibre Optique, pilotée par agence et par zone.',color:'#ff8b00',bg:'telecom',tags:['Lead Generation','Paid Media'],context:'Un réseau commercial qui commercialise des offres télécom à travers plusieurs agences et plusieurs zones.',intervention:'Lead generation continue, pilotage multi-agences et multi-zones, suivi du lead jusqu’à l’installation et au chiffre d’affaires.',funnel:['Lead','Qualification','Agence','Installation','Chiffre d’affaires'],outcome:'Un partenariat long terme, piloté jusqu’au chiffre d’affaires mensuel.',status:'Partenariat depuis 2023',details:['Lead generation WiFi, ADSL et Fibre Optique','Pilotage multi-agences et multi-zones','Suivi jusqu’à l’installation','Lecture du chiffre d’affaires mensuel']}
];
export const stages=[['Product','Construire le bon produit.'],['Measure','Mesurer les actions utiles.'],['Acquire','Attirer les bonnes personnes.'],['Activate','Créer le premier déclic.'],['Convert','Transformer l’intérêt en clients.'],['Retain','Donner envie de revenir.'],['Scale','Grandir sur des bases solides.']];
export const insights=[
 {slug:'installations-et-croissance',category:'APP GROWTH',title:'Une installation ne fait pas un client.',excerpt:'Les étapes à mesurer entre la découverte de votre app et la première action utile.',body:['Le nombre d’installations décrit un point d’entrée. Pour comprendre la contribution d’une application au business, il faut observer ce qui se passe ensuite : création du compte, première action, commande terminée et retour de l’utilisateur.','Commencez par définir une action d’activation propre à votre produit. Pour une application de services, une réservation créée et une prestation terminée sont deux événements distincts. Les suivre séparément permet de localiser les abandons.','Avant d’augmenter les dépenses, vérifiez la fiabilité des événements et comparez les parcours par source. L’objectif est de savoir quels utilisateurs réalisent l’action recherchée, et pas seulement quels canaux génèrent le plus d’installations.']},
 {slug:'reprendre-un-produit',category:'PRODUCT DEVELOPMENT',title:'Faire évoluer, reprendre ou reconstruire ?',excerpt:'Les bonnes questions à poser avant de décider de l’avenir d’un produit existant.',body:['Une application difficile à maintenir ne doit pas automatiquement être reconstruite. La décision commence par un audit de sa stabilité, de son architecture et de son adéquation aux besoins du business.','Listez les blocages réels : incidents, temps de livraison, fonctionnalités manquantes, difficultés de mesure. Évaluez ensuite le coût d’une stabilisation progressive et celui d’une reconstruction, y compris la migration et la continuité de service.','Le bon choix est celui qui permet de livrer les prochaines priorités dans des conditions fiables. Formalisez un périmètre, des critères de qualité et une stratégie de transition avant de lancer le chantier.']},
 {slug:'qualite-des-leads',category:'GROWTH & DATA',title:'Votre CPL ne raconte qu’une partie de l’histoire.',excerpt:'Du coût du lead à la qualité du contact : remettre la conversion au centre.',body:['Un coût par lead faible peut masquer des demandes difficiles à contacter ou peu adaptées à l’offre. Il faut suivre le parcours au-delà du formulaire.','Reliez chaque demande à sa source puis consignez les étapes : contact établi, qualification, rendez-vous et vente. Définissez ce qu’est un lead qualifié avec l’équipe commerciale pour que le suivi soit cohérent.','Analysez ensemble volume, coût et qualité. Une campagne plus chère au formulaire peut contribuer davantage aux ventes. Sans lien fiable avec le suivi commercial, cette comparaison reste incomplète.']},
];

/* --- Homepage V4 : preuve, funnels et qualification (cahier des charges §5.4 → §5.14) --- */

export const fragmented = [
  'Un prestataire construit le produit.',
  'Une agence achète du trafic.',
  'Un freelance produit les contenus.',
  'Le tracking arrive à la fin, quand il arrive.',
  'Personne ne relie la dépense à une vente.',
];

export const connected = [
  'Le produit est conçu pour être mesuré.',
  'L’acquisition vise une action business, pas un clic.',
  'Les créatifs testent des offres et des angles.',
  'Le tracking est posé avant le lancement.',
  'Chaque décision revient au chiffre d’affaires.',
];

export const appFunnel = ['Publicité', 'Store', 'Installation', 'Inscription', 'Activation', 'Première commande / réservation', 'Action complétée', 'Réachat'];
export const businessFunnel = ['Offre', 'Présence digitale', 'Acquisition', 'Lead', 'Qualification', 'Vente / Inscription / Installation', 'Chiffre d’affaires'];

export const kpiLevels = [
  { level: 'MÉDIA', question: 'Le message attire-t-il ?', kpis: ['Impressions', 'CPM', 'CTR', 'CPC'] },
  { level: 'ACQUISITION', question: 'Combien coûte l’action ?', kpis: ['CPL', 'CPA', 'CPI'] },
  { level: 'QUALITÉ', question: 'Est-ce la bonne audience ?', kpis: ['Contact établi', 'Lead qualifié', 'Activation'] },
  { level: 'BUSINESS', question: 'Quelle valeur est créée ?', kpis: ['Commande', 'Vente', 'Chiffre d’affaires', 'CAC / LTV'] },
];

export const audiences = [
  { title: 'Un produit déjà lancé', situation: 'Application, SaaS, marketplace ou plateforme en activité.', need: 'Le produit, la mesure, l’acquisition ou le passage à l’échelle bloquent.', answer: 'Product Growth · App Marketing' },
  { title: 'Un lancement à préparer', situation: 'Un projet sérieux, un budget et un modèle économique.', need: 'Transformer une idée en produit mesurable, prêt pour son marché.', answer: 'Build & Launch' },
  { title: 'Une entreprise à digitaliser', situation: 'Une activité établie, une acquisition encore traditionnelle.', need: 'Structurer l’offre, la présence digitale et la génération de demande.', answer: 'Digital Transformation · Lead Generation' },
];

export const reasons = [
  { title: 'Product + Growth', text: 'La même équipe construit le produit et pilote l’acquisition. Rien ne se perd entre deux prestataires.' },
  { title: 'Business d’abord', text: 'Nous commençons par votre modèle économique, vos marges et votre capacité à servir la demande.' },
  { title: 'La mesure intégrée', text: 'Les événements utiles sont définis avec le produit, pas ajoutés après coup.' },
  { title: 'Une équipe intégrée', text: 'Stratégie, technologie, création et suivi projet travaillent sur le même plan.' },
];

export const projectHighlights: Record<string, { transformation: string; metric?: string; metricLabel: string }> = {
  drok: { transformation: 'Application héritée → Reconstruction → Première commande → Passage à l’échelle', metricLabel: 'Scaling en cours' },
  washroc: { transformation: 'Changement de modèle → Produit adapté → Prestation terminée → Capacité maîtrisée', metric: '70K MAD / mois', metricLabel: 'de chiffre d’affaires dès le lancement' },
  omak: { transformation: 'Garage traditionnel → Offres digitales → Demandes → Visites → Chiffre d’affaires', metric: '+500K MAD', metricLabel: 'de chiffre d’affaires généré en moins de 3 mois' },
  fnm: { transformation: 'Présence informative → Site + campagnes → Demandes → Inscriptions', metric: '10+', metricLabel: 'inscriptions par mois sur les campagnes actives · accompagné depuis 2022' },
  privu: { transformation: 'Concept → Produit → Marketplace → Monétisation', metricLabel: 'Produit et monétisation' },
  telecom: { transformation: 'Réseau multi-agences → Lead generation continue → Installations → Chiffre d’affaires', metric: '200K+ MAD / mois', metricLabel: 'de chiffre d’affaires généré · partenariat depuis 2023' },
};

export const auditQuestions = [
  'Votre produit est-il prêt pour la prochaine étape ?',
  'Mesurez-vous autre chose que le clic et l’installation ?',
  'Savez-vous ce que coûte un client, et non un lead ?',
  'Votre acquisition dépasse-t-elle votre capacité à servir ?',
];

/* FAQ — réponses tirées du cahier des charges V4 (§2, §5.10, §5.11, §8). Aucun résultat nouveau. */
export const faqs = [
  { q: 'Travaillez-vous uniquement avec des startups ?', a: 'Non. Nous accompagnons des produits digitaux — applications, SaaS, marketplaces — mais aussi des entreprises établies qui veulent digitaliser leur offre et leur acquisition, comme FNM dans la formation ou OMAK Service dans l’automobile.' },
  { q: 'Pouvez-vous reprendre une application développée par une autre équipe ?', a: 'Oui. Nous auditons le produit, le stabilisons puis le faisons évoluer, sans repartir de zéro par défaut. C’est l’approche que nous avons suivie avec WashRoc.' },
  { q: 'Faites-vous du développement ou du marketing ?', a: 'Les deux, dans une même équipe. Le produit, l’acquisition, les contenus et la mesure sont pensés ensemble, pour que rien ne se perde entre deux prestataires.' },
  { q: 'Comment mesurez-vous les résultats ?', a: 'Nous définissons avec vous l’action qui compte vraiment — une commande, une prestation réalisée, une inscription, une vente — et nous suivons le parcours jusqu’à elle, au-delà du clic ou de l’installation.' },
  { q: 'Publiez-vous des résultats chiffrés ?', a: 'Uniquement des résultats validés avec nos clients. Lorsqu’un projet est encore en phase de lancement ou de scaling, nous l’indiquons plutôt que d’avancer un chiffre.' },
  { q: 'Par où commencer ?', a: 'Par un Growth Audit : identifier où votre croissance bloque — produit, mesure, acquisition, conversion ou capacité opérationnelle — puis définir les priorités.' },
];

/* Bande sous le hero — reprend les capacités listées dans `services`. */
export const highlights = [
  { title: 'Applications', text: 'iOS & Android' },
  { title: 'Sites & plateformes', text: 'SaaS, marketplaces' },
  { title: 'Acquisition', text: 'Paid media & Search' },
  { title: 'Mesure', text: 'GA4, GTM, SDKs' },
  { title: 'Une seule équipe', text: 'Du produit au résultat' },
];

/* V5 §5.4 — les trois piliers et leurs preuves. */
export const pillars = [
  { key: 'dev', title: 'Développement', text: 'Nous concevons, reprenons et faisons évoluer des produits digitaux.' },
  { key: 'marketing', title: 'Digital Marketing', text: 'Nous structurons acquisition, offres, créatives, lead generation et conversion.' },
  { key: 'results', title: 'Résultats', text: 'Nous pilotons jusqu’à la métrique utile : commande, lavage, inscription, installation, chiffre d’affaires.' },
];

/* V5 §5.5 — ce que nous avons déjà fait, par domaine. */
export const doneDev = ['Applications mobiles', 'Sites web', 'Reprises de produits', 'Plateformes & marketplaces', 'Dashboards'];
export const doneContent = ['Vidéos', 'UGC', 'Créatives Meta', 'Posts orientés performance'];
export const doneResults = [
  { value: '+500K', unit: 'MAD', label: 'de chiffre d’affaires généré en moins de 3 mois', client: 'OMAK Service' },
  { value: '200K+', unit: 'MAD / mois', label: 'de chiffre d’affaires, depuis 2023', client: 'Réseau Commercial Telecom' },
  { value: '70K', unit: 'MAD / mois', label: 'de chiffre d’affaires dès le lancement', client: 'WashRoc' },
  { value: '10+', unit: 'inscriptions / mois', label: 'sur les campagnes actives', client: 'FNM · depuis 2022' },
];
export const doneTracked = [
  { label: 'Commandes', client: 'DROK' },
  { label: 'Lavages réalisés', client: 'WashRoc' },
  { label: 'Installations', client: 'Réseau Telecom' },
  { label: 'Étudiants inscrits', client: 'FNM' },
];

/* Growth System — texte de chaque étape (même ordre que `stages`). */
export const stageDetails = [
  'Un produit aligné avec les besoins de vos utilisateurs et les priorités de votre entreprise.',
  'Des événements fiables pour comprendre le parcours, du premier contact à l’action qui compte.',
  'Une acquisition construite autour de l’audience, de l’offre et des canaux adaptés.',
  'Un parcours qui réduit les frictions et accompagne les premiers usages.',
  'Des actions reliées aux commandes, aux rendez-vous et aux ventes.',
  'Une expérience et des relances qui donnent aux clients une raison de revenir.',
  'Des décisions d’investissement éclairées par les résultats et la capacité opérationnelle.',
];
