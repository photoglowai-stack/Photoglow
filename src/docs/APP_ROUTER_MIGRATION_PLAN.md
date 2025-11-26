# 🚀 Migration vers App Router - Plan d'action

**Objectif** : Migrer PhotoGlow vers Next.js App Router avec architecture stricte  
**Exigences** : Guidelines dev (RSC, TypeScript strict, SDK centralisé, Zod)  
**Status** : 📋 Plan créé - Migration à démarrer  

---

## 📊 État actuel vs Cible

### Actuel (Pages Router)
```
app/
├── layout.tsx          → Root layout
└── page.tsx            → Root page qui render App.tsx

App.tsx                 → Composant principal (300+ lignes)
components/             → 90+ composants en vrac
lib/                    → Partiellement organisé
```

### Cible (App Router)
```
app/
├── (public)/
│   ├── layout.tsx      → Layout public
│   └── page.tsx        → Home (landing)
├── create/
│   └── page.tsx        → Page de création
├── gallery/
│   └── page.tsx        → Galerie photos
└── admin/
    └── page.tsx        → Admin console

components/
├── ui/*                → shadcn (déjà OK)
└── feature/            → Features spécifiques
    ├── PromptForm.tsx
    ├── ModelSelect.tsx
    ├── AspectRatioSelect.tsx
    ├── ImageGrid.tsx
    └── JobStatusBadge.tsx

lib/
├── api.ts              → SDK front centralisé
├── admin.ts            → Admin SDK
├── validators.ts       → Zod schemas
└── config.ts           → Config centralisée

types/
└── api.ts              → Types API
```

---

## 🎯 Règles à respecter (Dev Guidelines)

### 1. Nommage et Structure

✅ **Fichiers explicites**
- ❌ `utils.ts` → ✅ `format-date.ts`, `validate-email.ts`
- ❌ `helpers.ts` → ✅ `string-helpers.ts`, `array-helpers.ts`

✅ **Pas de code inline complexe dans JSX**
```tsx
// ❌ Mauvais
<div>{items.filter(x => x.active).map((x, i) => ...)}</div>

// ✅ Bon
const activeItems = items.filter(item => item.active);
<div>{activeItems.map(renderItem)}</div>
```

### 2. Documentation

✅ **JSDoc sur TOUTES les exports**
```tsx
/**
 * Récupère les photos récentes de la galerie
 * @param limit - Nombre de photos à récupérer (défaut: 20)
 * @returns Promise avec tableau de photos
 * @throws {APIError} Si l'API est inaccessible
 */
export async function getRecentPhotos(limit: number = 20): Promise<Photo[]> {
  // ...
}
```

### 3. TypeScript Strict

✅ **Pas de `any`**
```tsx
// ❌ Mauvais
const data: any = await fetch(...);

// ✅ Bon
const data: Photo[] = await fetch(...);
// Ou si vraiment inconnu
const data: unknown = await fetch(...);
if (isPhoto(data)) { /* ... */ }
```

✅ **Pas d'`as` abusif**
```tsx
// ❌ Mauvais
const photo = data as Photo;

// ✅ Bon
const photo = PhotoSchema.parse(data); // Zod validation
```

### 4. React Server Components (RSC)

✅ **RSC par défaut**
- Tous les composants sont RSC sauf si besoin d'interactivité
- `"use client"` uniquement sur : formulaires, hooks, événements

```tsx
// components/feature/ImageGrid.tsx (RSC)
export function ImageGrid({ photos }: ImageGridProps) {
  return <div>...</div>; // Pas de hooks, pas d'events
}

// components/feature/PromptForm.tsx (Client)
"use client";
export function PromptForm({ onSubmit }: PromptFormProps) {
  const [value, setValue] = useState(''); // Hooks = client
  return <form onSubmit={...}>...</form>; // Events = client
}
```

### 5. Fetch Wrappers Centralisés

✅ **lib/api.ts - SDK Front**
```tsx
import { z } from 'zod';

const PhotoSchema = z.object({
  id: z.string(),
  url: z.string().url(),
  prompt: z.string(),
});

/**
 * SDK front centralisé
 */
export const api = {
  /**
   * Récupère un aperçu de l'image
   * @throws {APIError} En cas d'erreur réseau ou timeout
   */
  async getPreview(params: PreviewParams): Promise<Photo> {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), REQUEST_TIMEOUT_MS);
    
    try {
      const response = await fetch(`${API_BASE}/preview`, {
        method: 'POST',
        body: JSON.stringify(params),
        signal: controller.signal,
      });
      
      if (!response.ok) throw new APIError(response.statusText);
      
      const data = await response.json();
      return PhotoSchema.parse(data); // Zod validation
    } finally {
      clearTimeout(timeoutId);
    }
  },
  
  /**
   * Crée un job de génération
   */
  async createJob(body: CreateJobBody): Promise<Job> {
    // ...
  },
  
  /**
   * Liste les photos récentes
   */
  async listRecent(limit: number = 20): Promise<Photo[]> {
    // ...
  },
};
```

✅ **lib/admin.ts - SDK Admin**
```tsx
/**
 * Actions admin (Server Actions ou API routes)
 */
export const admin = {
  /**
   * Déclenche un redéploiement
   * @throws {AdminError} Si pas d'accès admin
   */
  async triggerDeploy(): Promise<DeployResult> {
    // ...
  },
  
  /**
   * Revalide un chemin Next.js
   */
  async revalidatePath(path: string): Promise<void> {
    // ...
  },
};
```

### 6. Validation Zod

✅ **lib/validators.ts**
```tsx
import { z } from 'zod';

/**
 * Schema pour création de job
 */
export const CreateJobSchema = z.object({
  prompt: z.string().min(10).max(500),
  model: z.enum(['flux', 'sdxl', 'playground']),
  aspectRatio: z.enum(['1:1', '16:9', '9:16']),
  numOutputs: z.number().int().min(1).max(4).default(1),
});

export type CreateJobInput = z.infer<typeof CreateJobSchema>;

/**
 * Schema pour réponse API photo
 */
export const PhotoResponseSchema = z.object({
  id: z.string().uuid(),
  url: z.string().url(),
  prompt: z.string(),
  model: z.string(),
  createdAt: z.string().datetime(),
});

export type PhotoResponse = z.infer<typeof PhotoResponseSchema>;
```

### 7. Accessibilité

✅ **Toujours labels, alt, aria**
```tsx
// ❌ Mauvais
<input type="text" placeholder="Prompt" />
<img src="photo.jpg" />
<button>Submit</button>

// ✅ Bon
<label htmlFor="prompt">Prompt</label>
<input 
  id="prompt"
  type="text" 
  placeholder="Enter your prompt"
  aria-describedby="prompt-help"
/>
<span id="prompt-help">Describe the image you want to create</span>

<img src="photo.jpg" alt="Generated portrait of a professional woman" />

<button type="button" aria-label="Generate image">
  Generate
</button>
```

✅ **Focus visible**
```css
/* globals.css */
button:focus-visible,
input:focus-visible {
  outline: 2px solid var(--focus-color);
  outline-offset: 2px;
}
```

---

## 📁 Nouvelle structure détaillée

```
app/
├── (public)/                    # Route group public
│   ├── layout.tsx              # Layout avec Header/Footer
│   ├── page.tsx                # Home (landing)
│   └── ideas/
│       └── page.tsx            # IdeasPage (optionnel)
│
├── create/
│   ├── page.tsx                # Page de création
│   └── loading.tsx             # Loading state
│
├── gallery/
│   ├── page.tsx                # Galerie photos
│   ├── loading.tsx
│   └── [id]/
│       └── page.tsx            # Photo detail
│
├── admin/
│   ├── page.tsx                # Admin dashboard
│   ├── layout.tsx              # Admin layout
│   └── loading.tsx
│
├── api/                        # API Routes
│   ├── preview/
│   │   └── route.ts
│   ├── jobs/
│   │   └── route.ts
│   └── admin/
│       └── deploy/
│           └── route.ts
│
├── layout.tsx                  # Root layout
├── loading.tsx                 # Global loading
└── error.tsx                   # Global error boundary

components/
├── ui/                         # shadcn (déjà OK ✅)
│   ├── button.tsx
│   ├── input.tsx
│   ├── select.tsx
│   ├── card.tsx
│   └── skeleton.tsx
│
└── feature/                    # Features métier
    ├── PromptForm.tsx          # "use client" - Formulaire prompt
    ├── ModelSelect.tsx         # "use client" - Select modèle
    ├── AspectRatioSelect.tsx   # "use client" - Select ratio
    ├── ImageGrid.tsx           # RSC - Grille d'images
    ├── JobStatusBadge.tsx      # RSC - Badge statut
    ├── ImagePreview.tsx        # RSC - Preview image
    └── GalleryPagination.tsx   # "use client" - Pagination

lib/
├── api.ts                      # SDK front centralisé ⭐
├── admin.ts                    # SDK admin ⭐
├── validators.ts               # Zod schemas ⭐
├── config.ts                   # Config centralisée ⭐
├── errors.ts                   # Custom errors
└── utils/
    ├── format-date.ts
    ├── format-bytes.ts
    └── cn.ts                   # className utility

types/
├── api.ts                      # Types API
├── database.ts                 # Types Supabase (existant)
└── index.ts                    # Barrel export
```

---

## 🔄 Plan de migration (phases)

### Phase 1 : Setup de base (2h)

1. **Créer lib/config.ts**
   ```tsx
   export const API_BASE = process.env.NEXT_PUBLIC_API_BASE!;
   export const REQUEST_TIMEOUT_MS = 20000;
   export const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL!;
   export const SUPABASE_ANON_KEY = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;
   ```

2. **Créer lib/validators.ts** avec Zod schemas

3. **Créer lib/api.ts** - SDK centralisé

4. **Créer lib/admin.ts** - SDK admin

5. **Créer types/api.ts** - Types API

### Phase 2 : App Router structure (3h)

1. **Créer app/(public)/layout.tsx**
   - RSC avec Header/Footer
   
2. **Créer app/(public)/page.tsx**
   - Landing page (HeroSection, Features, FAQ)
   
3. **Créer app/create/page.tsx**
   - Page de création avec PromptForm
   
4. **Créer app/gallery/page.tsx**
   - Galerie avec ImageGrid + pagination
   
5. **Créer app/admin/page.tsx**
   - Dashboard admin

### Phase 3 : Components feature (2h)

1. **PromptForm.tsx** - "use client"
2. **ModelSelect.tsx** - "use client"
3. **AspectRatioSelect.tsx** - "use client"
4. **ImageGrid.tsx** - RSC
5. **JobStatusBadge.tsx** - RSC

### Phase 4 : Migration composants existants (4h)

1. Migrer IdeasPage → app/ideas/page.tsx
2. Migrer ProfilePage → app/profile/page.tsx
3. Migrer shared components → utiliser dans layouts
4. Nettoyer anciens fichiers

### Phase 5 : Tests et polish (2h)

1. Tests TypeScript strict
2. Tests ESLint
3. Tests accessibilité
4. Performance check
5. Documentation finale

**Total estimé** : 13 heures

---

## ⚡ Quick Start - Commençons maintenant

### Étape 1 : Créer lib/config.ts

Je vais créer la base maintenant :

```tsx
/**
 * Configuration centralisée de l'application
 * @module lib/config
 */

/**
 * Base URL de l'API backend
 * @throws {Error} Si NEXT_PUBLIC_API_BASE n'est pas défini
 */
export const API_BASE = process.env.NEXT_PUBLIC_API_BASE!;

/**
 * Timeout pour les requêtes API en millisecondes
 */
export const REQUEST_TIMEOUT_MS = 20_000;

/**
 * URL Supabase
 */
export const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL!;

/**
 * Clé anonyme Supabase
 */
export const SUPABASE_ANON_KEY = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

/**
 * Limite par défaut pour pagination
 */
export const DEFAULT_PAGE_LIMIT = 20;

/**
 * Modèles AI disponibles
 */
export const AI_MODELS = ['flux', 'sdxl', 'playground'] as const;
export type AIModel = typeof AI_MODELS[number];

/**
 * Ratios d'aspect disponibles
 */
export const ASPECT_RATIOS = ['1:1', '16:9', '9:16'] as const;
export type AspectRatio = typeof ASPECT_RATIOS[number];
```

---

## 🎯 Prochaines actions immédiates

1. ✅ Créer `/docs/APP_ROUTER_MIGRATION_PLAN.md` (ce fichier)
2. ⏳ Créer `lib/config.ts`
3. ⏳ Créer `lib/validators.ts`
4. ⏳ Créer `lib/api.ts`
5. ⏳ Créer structure App Router

**Veux-tu que je commence la migration maintenant ?** 🚀
