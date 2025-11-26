# ⚡ Guide Rapide de Refactoring

## 🎯 Objectif
Rendre le code PhotoGlow parfaitement lisible et modifiable pour Claude Code et déploiement Vercel.

---

## 📂 Nouvelle Structure

```
├── app/                    # Next.js App Router ✅ DONE
│   ├── layout.tsx
│   └── page.tsx
│
├── components/
│   ├── pages/             # Pages complètes (EN COURS)
│   │   ├── IdeasPage/     # ✅ MIGRÉ
│   │   └── ...
│   │
│   ├── sections/          # Sections de page (À FAIRE)
│   │   ├── HeroSection/
│   │   └── ...
│   │
│   ├── features/          # Features métier (À FAIRE)
│   │   ├── AIPhotoGenerator/
│   │   └── ...
│   │
│   ├── shared/            # Composants globaux (EN COURS)
│   │   ├── Header/        # ✅ MIGRÉ
│   │   └── ...
│   │
│   ├── ui/                # Primitives UI ✅ DONE
│   └── data/              # Data & config (À FAIRE)
│
├── hooks/                 # Custom hooks ✅ DONE (structure)
├── lib/                   # Utilities ✅ DONE
├── types/                 # TypeScript types ✅ DONE
└── docs/                  # Documentation
```

---

## 🔧 Comment migrer un composant

### 1️⃣ Identifier le type de composant

**PAGE** (ex: IdeasPage) → `/components/pages/`
- Composant de page complète
- Contient layout + logique
- Utilisé dans App Router

**SECTION** (ex: HeroSection) → `/components/sections/`
- Section réutilisable d'une page
- Header, Hero, Features, FAQ, etc.
- Pas de routing

**FEATURE** (ex: AIPhotoGenerator) → `/components/features/`
- Feature métier spécifique
- Logique complexe
- Modals, générateurs, dashboards

**SHARED** (ex: Header, Footer) → `/components/shared/`
- Composants globaux réutilisés partout
- Navigation, SEO, Loading, etc.

### 2️⃣ Créer la structure

```bash
components/
  └── pages/
      └── ComponentName/
          ├── ComponentName.tsx      # Composant principal
          ├── ComponentName.types.ts # Types (optionnel si simple)
          ├── index.ts               # Barrel export
          └── hooks/                 # Hooks locaux (optionnel)
```

### 3️⃣ Template de composant

```typescript
/**
 * @file ComponentName - Description courte
 * @description Description détaillée multilignes
 */

import { useState } from 'react';
// Imports relatifs depuis nouveau chemin

/**
 * Props pour ComponentName
 */
export interface ComponentNameProps {
  /** Description de la prop */
  propName: string;
  /** Callback description */
  onClick?: () => void;
}

/**
 * Description détaillée du composant
 * 
 * Fonctionnalités :
 * - Feature 1
 * - Feature 2
 * 
 * @example
 * ```tsx
 * <ComponentName propName="value" />
 * ```
 */
export function ComponentName({ propName, onClick }: ComponentNameProps) {
  // État local
  const [state, setState] = useState(false);
  
  // Logique
  
  return (
    <div className="...">
      {/* JSX */}
    </div>
  );
}
```

### 4️⃣ Créer le barrel export

```typescript
// components/pages/ComponentName/index.ts
/**
 * @file ComponentName - Export barrel
 */

export { ComponentName } from './ComponentName';
export type { ComponentNameProps } from './ComponentName';
```

### 5️⃣ Mettre à jour les imports

**Avant** :
```typescript
import { ComponentName } from './ComponentName';
```

**Après** :
```typescript
import { ComponentName } from '../pages/ComponentName';
// ou depuis le barrel principal :
import { ComponentName } from '../pages';
```

### 6️⃣ Tester et commiter

```bash
# Vérifier que ça compile
npm run build

# Commit progressif
git add components/pages/ComponentName
git commit -m "refactor: migrate ComponentName to pages/"
```

---

## 📋 Checklist par composant

Pour chaque migration, vérifier :

- [ ] Fichier créé dans le bon dossier
- [ ] JSDoc complet (file, props, component)
- [ ] Types exportés
- [ ] Barrel export créé (`index.ts`)
- [ ] Imports mis à jour dans les composants qui l'utilisent
- [ ] Build passe sans erreur
- [ ] Testé visuellement dans le navigateur

---

## ⚠️ Pièges à éviter

### ❌ Ne PAS faire

```typescript
// ❌ Imports absolus cassés
import { Component } from 'components/Component';

// ❌ Types any
function Component(props: any) { }

// ❌ Pas de documentation
export function Component() { }

// ❌ Code inline complexe
<div>{data.map(x => x.items.filter(i => i.active).map(...)}</div>
```

### ✅ À FAIRE

```typescript
// ✅ Imports relatifs propres
import { Component } from '../shared/Component';

// ✅ Types stricts
interface ComponentProps {
  items: Item[];
}

// ✅ Documentation JSDoc
/**
 * Description du composant
 */
export function Component(props: ComponentProps) { }

// ✅ Logique extraite
const activeItems = useMemo(
  () => data.filter(item => item.active),
  [data]
);
```

---

## 🚀 Workflow progressif

### Session 1 (30min) : Pages critiques
1. IdeasPage ✅
2. ProfilePage
3. PhotoGlowPage

### Session 2 (30min) : Shared essentiels
1. Header ✅
2. Footer
3. SEOHead

### Session 3 (45min) : Sections principales
1. HeroSection
2. Features
3. HowItWorks

### Session 4 (45min) : Features AI
1. AIPhotoGenerator
2. CreateModelModal
3. UnifiedGallery

### Session 5 (30min) : Data organization
1. Déplacer ideasData
2. Déplacer categoryData
3. Déplacer prompts

### Session 6 (30min) : Hooks documentation
1. Documenter tous les hooks
2. Ajouter exemples d'usage

### Session 7 (30min) : Cleanup & tests
1. Supprimer anciens fichiers
2. Vérifier build
3. Tester en dev

---

## 📞 Commandes utiles

```bash
# Build check
npm run build

# Type check
npm run type-check

# Find unused exports
npx ts-prune

# Check imports
grep -r "from './" components/

# Count migrated files
find components/pages -name "*.tsx" | wc -l
```

---

## 🎯 Objectif final

**Code lisible en 3 secondes** :
- 📁 Structure claire par type
- 📝 Documentation JSDoc partout
- 🎯 Types stricts TypeScript
- 🔧 Imports propres et cohérents
- ✨ Aucun code "magique"

**Résultat** : Claude Code comprend instantanément et peut modifier facilement. Déploiement Vercel sans surprise.
