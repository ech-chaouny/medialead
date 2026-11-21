/* Règle du site : aucun nom de client en dehors de la bande de logos. Chaque projet est présenté par son secteur,
   avec exactement ces libellés (cahier des modifications, tableau 2.4). Les clés restent internes. */
export const sectorLabels = {
  drok: 'Food Delivery & On-Demand',
  washroc: 'On-Demand Services & Car Care',
  privu: 'Digital Marketplace & Classifieds',
  omak: 'Automotive Services & Aftermarket',
  fnm: 'Education & Professional Training',
  telecom: 'Telecommunications & Connectivity',
} as const;

export type ClientKey = keyof typeof sectorLabels;

/* Le logo Maroc Telecom n'est affiché que si l'autorisation écrite existe. Passer à true une fois l'accord obtenu :
   le logo revient dans la bande clients, et les visuels qui le montrent (bannière, app, dashboard) réapparaissent. */
export const marocTelecomAuthorized = true;
