# Medialead — homepage preview

Next.js App Router + TypeScript, React, Lucide. White/orange visual direction with centered typography, generous whitespace and warm contrasting bands, inspired by the supplied SITELI reference. Medialead logo and V4 content retained.

## Local development

```sh
npm install
npm run dev -- --port 3100
```

Open http://localhost:3100. `npm run build` validates the production build.

## Structure de la homepage (cahier des charges V4, §5)

Hero · Références · Le problème (modèle fragmenté vs modèle Medialead, §5.4) · Expertises (§5.7) · Growth System (§5.5) ·
App Marketing + funnel install → réachat (§5.8) · Digital Transformation + funnel offre → chiffre d'affaires (§5.9) ·
Réalisations avec transformation et métrique (§5.6) · Measurement & Data, 4 niveaux de lecture (§5.10) ·
Product Takeover (§5.11) · Pour qui (§5.12) · Pourquoi Medialead (§5.13) · Équipe · Growth Audit (§5.14) ·
Insights (§5.15) · CTA final (§5.16).

Seuls deux résultats chiffrés sont publiés, car fournis par le cahier des charges : FNM (10+ étudiants par mois depuis 2022)
et OMAK Service (≈200K MAD en moins de 3 mois). Le cahier des charges précise que le chiffre d'affaires OMAK doit être
validé par Medialead et OMAK avant publication. DROK, WashRoc et Privu affichent un statut, pas de métrique.

## Current scope

Only the homepage is active, per the user's latest instruction. Navigation uses section anchors. The growth system tabs and mobile navigation work. Contact actions use the public phone number and Instagram supplied in the reference screenshot.

Other initial page drafts were moved out of `app/` into `drafts/`; they are excluded from TypeScript and are not served. No CRM, audit form, analytics, publishing or third-party tracking is enabled.

Copy and project summaries: `lib/content.ts`. Main page: `app/page.tsx`. Styles: `app/globals.css`.

Project, editorial and team images have intentional placeholders per the user request. The home uses a minimal connected Product / Growth / Data diagram instead of a hero photo. No client results, certifications or metrics are invented. The hero image was generated with Higgsfield (Recraft V4.1), job `38ff7ed6-9706-4ab8-8061-f1866b4c7d8b`. It is retained as an unused asset after the light redesign. User logo is in `public/images/medialead-logo.png`.
