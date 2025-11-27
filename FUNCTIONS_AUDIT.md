# Functions Audit

## Situation avant nettoyage
| Fichier | URL exposée | Rôle | Utilisé par le front/admin | Catégorie |
| --- | --- | --- | --- | --- |
| `api/v1-preview.mjs` | `/v1/preview` (rewrite) | Génération preview (Figma, front) | Oui (`PreviewModel`, scripts Figma) | ESSENTIELLE |
| `api/v1-jobs.mjs` | `/v1/jobs` (rewrite) | Suivi/dispatch des jobs d'image | Oui (`utils/api-client`, supabase server) | ESSENTIELLE |
| `api/v1/ideas/generate.mjs` | `/v1/ideas/generate` | Génération d'idées/images | Oui (scripts, figma, docs) | ESSENTIELLE |
| `api/generate-gen4-image.mjs` | `/api/generate-gen4-image` | Génération Flux/Gen-4 | Oui (`utils/api-client`, supabase server) | ESSENTIELLE |
| `api/generate-sora2.mjs` | `/api/generate-sora2` | Génération vidéo Kie Sora2 | Oui (supabase server proxy) | ESSENTIELLE |
| `api/webhooks/kie-sora2.mjs` | `/api/webhooks/kie-sora2` | Webhook de rendu vidéo | Oui (pipeline Sora2) | ESSENTIELLE |
| `api/storage-signed-upload.js` | `/api/storage-signed-upload` | Signed URL Supabase | Oui (`utils/config`, upload flow) | ESSENTIELLE |
| `api/public-photos.js` | `/api/public-photos` | Galerie/landing publique | Oui (`useLandingPhotos`) | ESSENTIELLE |
| `api/user-photos.js` | `/api/user-photos` | Galerie utilisateur authentifiée | Oui (`useUserPhotos`) | ESSENTIELLE |
| `api/system.js` | `/api/system` | Healthcheck/diagnostic | Oui (`SystemHealthPanel`) | ESSENTIELLE |
| `api/credits.mjs` | `/api/credits` | Gestion des crédits | Oui (docs & flow crédits) | ESSENTIELLE |
| `api/presets.js` | `/api/presets` | Lecture catégories/presets | Oui (figma snippet) | ESSENTIELLE |
| `api/models.js` | `/api/models` | Liste des modèles Gen4/Flux | Non référencé | REDONDANTE |

Nombre de functions avant : **13**.

## Décisions / actions
- `api/credits.mjs`, `api/presets.js` fusionnés dans `api/system.js` (dispatch interne).
- `api/models.js` supprimée (aucune référence active).
- `vercel.json` route désormais `/api/system`, `/api/presets`, `/api/credits` vers un **seul handler** (`api/system.js`).

## Situation après nettoyage
| Fichier (Serverless Function) | URL(s) servies | Rôle principal |
| --- | --- | --- |
| `api/system.js` | `/api/system`, `/api/presets`, `/api/credits` | Healthcheck + presets + crédits (dispatch interne) |
| `api/v1-preview.mjs` | `/v1/preview` | Génération preview |
| `api/v1-jobs.mjs` | `/v1/jobs` | Jobs image |
| `api/v1/ideas/generate.mjs` | `/v1/ideas/generate` | Génération d'idées |
| `api/generate-gen4-image.mjs` | `/api/generate-gen4-image` | Génération Flux/Gen-4 |
| `api/generate-sora2.mjs` | `/api/generate-sora2` | Génération vidéo Kie |
| `api/webhooks/kie-sora2.mjs` | `/api/webhooks/kie-sora2` | Webhook vidéo |
| `api/storage-signed-upload.js` | `/api/storage-signed-upload` | Signed upload Supabase |
| `api/public-photos.js` | `/api/public-photos` | Galerie publique |
| `api/user-photos.js` | `/api/user-photos` | Galerie utilisateur |

Nombre de functions après : **10** (≤ limite Hobby).
