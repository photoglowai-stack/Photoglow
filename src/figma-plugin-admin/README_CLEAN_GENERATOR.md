# PhotoGlow Admin Plugin - Category Image Generator

Plugin Figma pour génération massive d'images de catégories.

**Architecture 100% propre** :
- ✅ File séquentielle (concurrence = 1)
- ✅ Délai 450ms entre jobs (anti-429)
- ✅ Idempotency-Key (SHA-256)
- ✅ Retry automatique sur 429/5xx
- ✅ Appel unique : `POST /v1/ideas/generate` (Vercel API)
- ❌ **ZÉRO** Supabase client-side
- ❌ **ZÉRO** upload local
- ❌ **ZÉRO** Replicate/Runway/Pollinations direct

---

## 📁 Fichiers

```
figma-plugin-admin/
├── manifest.json             # Config Figma
├── generator-snippet.js      # ✅ Snippet prêt à utiliser
├── README.md                 # Doc ancienne (Jobs API)
└── README_CLEAN_GENERATOR.md # Ce fichier
```

---

## 🚀 Quick Start

### Utiliser le snippet (recommandé)

Copie le code depuis **`generator-snippet.js`** et utilise-le :

```javascript
import { generateAll } from './generator-snippet.js';

const jobs = [
  {
    slug: 'ai-headshots',
    prompt: 'Professional corporate head and shoulders portrait, soft studio lighting, neutral background, sharp focus, business attire',
    aspect_ratio: '3:4',
    width: 1536,
    model: 'flux',
    persist: true,
    collection: 'admin-2025-11-10'
  },
  // ... more jobs
];

await generateAll(jobs, (p) => {
  figma.notify(`(${p.index}/${p.total}) ${p.state === 'ok' ? '✅' : '⚠️'} ${p.url || p.error}`);
});
```

---

## ⚙️ Configuration

```javascript
const BASE_URL = "https://image-generator-api-chi.vercel.app";
const ENDPOINT = `${BASE_URL}/v1/ideas/generate`;
const DELAY_MS = 450;
const MAX_RETRIES = 2;
```

**Pour modifier** : Ouvre `generator-snippet.js` et change les constantes.

---

## 📊 Format des jobs

```typescript
{
  // OBLIGATOIRES
  slug: string,              // 'ai-headshots'
  prompt: string,            // Long prompt descriptif
  aspect_ratio: string,      // '3:4', '1:1', '16:9'
  width: number,             // 1536
  model: string,             // 'flux'
  persist: boolean,          // true (stockage)
  collection: string,        // 'admin-2025-11-10'
  
  // OPTIONNELS
  category_id?: string,
  prompt_index?: number,
  prompt_title?: string,
  prompt_text?: string,
  style?: string
}
```

---

## 🎯 Fonctionnalités

### 1. Idempotence

Clé SHA-256 basée sur `slug|prompt|ratio|dims|model|persist|collection`

→ **Même job = même image (pas de doublon)**

### 2. Retry automatique

- ✅ 429 → Retry 2x (600ms/1200ms)
- ✅ 5xx → Retry 2x (600ms/1200ms)
- ❌ 4xx → Pas de retry

### 3. Pacing

450ms entre jobs → Anti-429

**Estimation** :
- 10 jobs → ~5s
- 100 jobs → ~45s
- 500 jobs → ~4min

### 4. Progress callback

```javascript
{
  index: number,
  total: number,
  state: 'ok' | 'error',
  url?: string,
  error?: string
}
```

---

## 🧪 Exemple complet

```javascript
const jobs = [
  {
    slug: 'ai-headshots',
    prompt: 'Professional corporate head and shoulders portrait, soft studio lighting, neutral background',
    aspect_ratio: '3:4',
    width: 1536,
    model: 'flux',
    persist: true,
    collection: 'test-run',
    category_id: 'ai-headshots',
    prompt_index: 0,
    prompt_title: 'Professional Portrait',
  },
];

const results = await generateAll(jobs, (p) => {
  console.log(`(${p.index}/${p.total}) ${p.state === 'ok' ? '✅' : '⚠️'}`);
  figma.notify(`(${p.index}/${p.total}) ${p.state === 'ok' ? '✅' : '⚠️'} ${p.url || p.error}`);
});

console.log(`✅ Done! ${results.filter(r => r.ok).length} success`);
```

---

## 📦 Résultats

```typescript
[
  {
    ok: true,
    item: { slug: 'ai-headshots', ... },
    out: { success: true, image_url: 'https://...' }
  },
  {
    ok: false,
    item: { slug: 'ai-model-photo', ... },
    error: 'HTTP 502'
  }
]
```

---

## 🎯 Architecture

```
FIGMA PLUGIN (client)
    ↓ HTTPS (sequential)
VERCEL API (external)
    ↓ Generate + Upload
SUPABASE STORAGE
    (ai_gallery bucket)
```

**Zero dépendances client-side.**

---

## ✅ Status

- ✅ Snippet prêt (`generator-snippet.js`)
- ✅ Architecture clean
- ✅ Idempotence (SHA-256)
- ✅ Retry (429/5xx)
- ✅ Pacing 450ms

---

**PRÊT À GÉNÉRER ! 🎨✨**
