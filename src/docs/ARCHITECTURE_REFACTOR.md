# 🏗️ Architecture Refactor - PhotoGlow Next.js

## 📁 Nouvelle Structure de Dossiers

```
photoglow/
├── app/                          # Next.js App Router
│   ├── layout.tsx               # Layout principal
│   ├── page.tsx                 # Page d'accueil
│   ├── api/                     # API Routes
│   └── (routes)/                # Pages organisées par domaine
│
├── components/                   # Composants React
│   ├── pages/                   # Composants de pages complètes
│   │   ├── HomePage/
│   │   ├── CategoryPage/
│   │   ├── AdminPage/
│   │   └── ProfilePage/
│   │
│   ├── sections/                # Sections réutilisables
│   │   ├── Hero/
│   │   ├── Features/
│   │   ├── Pricing/
│   │   └── FAQ/
│   │
│   ├── features/                # Fonctionnalités métier
│   │   ├── AIGenerator/
│   │   ├── CategorySystem/
│   │   ├── AdminConsole/
│   │   └── Auth/
│   │
│   ├── shared/                  # Composants partagés
│   │   ├── Header/
│   │   ├── Footer/
│   │   ├── Layout/
│   │   └── SEO/
│   │
│   └── ui/                      # Composants UI génériques (shadcn)
│
├── lib/                         # Bibliothèques et utilitaires
│   ├── api/                     # Clients API
│   │   ├── client.ts           # Client API principal
│   │   ├── credits.ts          # API crédits
│   │   └── images.ts           # API images
│   │
│   ├── data/                    # Données statiques
│   │   ├── categories.ts       # Données catégories
│   │   ├── prompts.ts          # Prompts optimisés
│   │   └── testimonials.ts     # Témoignages
│   │
│   ├── utils/                   # Fonctions utilitaires
│   │   ├── format.ts           # Formatage
│   │   ├── validation.ts       # Validation
│   │   └── helpers.ts          # Helpers généraux
│   │
│   ├── constants/               # Constantes
│   │   ├── index.ts            # Constantes principales
│   │   ├── routes.ts           # Routes
│   │   └── config.ts           # Configuration
│   │
│   └── supabase/                # Client Supabase
│       └── client.ts
│
├── hooks/                       # Custom React Hooks
│   ├── useAuth.ts
│   ├── useCredits.ts
│   ├── useAIModels.ts
│   └── useCategoryImages.ts
│
├── types/                       # Types TypeScript
│   ├── index.ts                # Types généraux
│   ├── database.ts             # Types Supabase
│   ├── api.ts                  # Types API
│   └── components.ts           # Types composants
│
├── styles/                      # Styles globaux
│   └── globals.css
│
├── docs/                        # Documentation
│   ├── setup/
│   ├── features/
│   └── architecture/
│
├── scripts/                     # Scripts utilitaires
├── supabase/                    # Backend Supabase
└── public/                      # Assets statiques
```

## 🎯 Principes de l'Architecture

### 1. **Séparation des Responsabilités**
- **app/** : Routing et pages Next.js uniquement
- **components/** : UI et logique de présentation
- **lib/** : Logique métier et utilitaires
- **hooks/** : Logique réactive réutilisable
- **types/** : Définitions TypeScript centralisées

### 2. **Nommage Explicite**
- Fichiers en `PascalCase` pour les composants
- Fichiers en `kebab-case` pour les utilitaires
- Dossiers en `PascalCase` pour les domaines métier
- Exports nommés explicites

### 3. **Documentation JSDoc**
Toutes les fonctions publiques doivent avoir :
```typescript
/**
 * Description de la fonction
 * @param {Type} param - Description du paramètre
 * @returns {Type} Description du retour
 * @example
 * // Exemple d'utilisation
 */
```

### 4. **TypeScript Strict**
```json
{
  "compilerOptions": {
    "strict": true,
    "noImplicitAny": true,
    "strictNullChecks": true,
    "noUnusedLocals": true,
    "noUnusedParameters": true
  }
}
```

### 5. **Imports Absolus**
```typescript
// ✅ Bon
import { Button } from '@/components/ui/button'
import { formatDate } from '@/lib/utils/format'

// ❌ Éviter
import { Button } from '../../../components/ui/button'
```

## 📦 Organisation par Domaine

### Components
```
components/
├── pages/              # Une page = un dossier
│   └── CategoryPage/
│       ├── index.tsx              # Export principal
│       ├── CategoryPage.tsx       # Composant principal
│       ├── CategoryPage.types.ts  # Types locaux
│       └── hooks/                 # Hooks locaux si nécessaire
│
├── features/           # Une feature = un domaine métier
│   └── AIGenerator/
│       ├── index.tsx
│       ├── AIGenerator.tsx
│       ├── AIGeneratorForm.tsx
│       ├── AIGeneratorPreview.tsx
│       └── hooks/
│           └── useAIGeneration.ts
│
└── shared/             # Composants transverses
    └── Header/
        ├── index.tsx
        ├── Header.tsx
        ├── HeaderNav.tsx
        └── HeaderUser.tsx
```

### Lib
```
lib/
├── api/
│   └── credits/
│       ├── index.ts          # Export public
│       ├── client.ts         # Client API
│       ├── types.ts          # Types
│       └── __tests__/        # Tests
│
└── utils/
    ├── format/
    │   ├── index.ts
    │   ├── date.ts
    │   ├── currency.ts
    │   └── text.ts
    └── validation/
        ├── index.ts
        ├── email.ts
        └── form.ts
```

## 🔧 Configuration Centrale

### `/lib/constants/index.ts`
```typescript
/**
 * Constantes de l'application
 */
export const APP_CONFIG = {
  name: 'PhotoGlow',
  version: '1.0.0',
  apiUrl: process.env.NEXT_PUBLIC_API_URL,
} as const

export const ROUTES = {
  home: '/',
  categories: '/categories',
  admin: '/admin',
} as const

export const CREDITS_CONFIG = {
  defaultAmount: 100,
  minimumPurchase: 10,
} as const
```

## 📝 Standards de Code

### 1. Composants React
```typescript
import { FC } from 'react'

/**
 * Props du composant CategoryCard
 */
interface CategoryCardProps {
  /** Titre de la catégorie */
  title: string
  /** Description optionnelle */
  description?: string
  /** Callback au clic */
  onClick?: () => void
}

/**
 * Carte affichant une catégorie de photos
 * 
 * @example
 * <CategoryCard 
 *   title="Tinder" 
 *   description="Photos de dating"
 *   onClick={() => navigate('/category/tinder')}
 * />
 */
export const CategoryCard: FC<CategoryCardProps> = ({
  title,
  description,
  onClick
}) => {
  return (
    <div onClick={onClick}>
      <h3>{title}</h3>
      {description && <p>{description}</p>}
    </div>
  )
}
```

### 2. Utilitaires
```typescript
/**
 * Formate une date en français
 * 
 * @param date - Date à formater
 * @param format - Format de sortie ('short' | 'long')
 * @returns Date formatée
 * 
 * @example
 * formatDate(new Date(), 'short') // "08/11/2025"
 */
export function formatDate(
  date: Date,
  format: 'short' | 'long' = 'short'
): string {
  // Implementation
}
```

### 3. Hooks
```typescript
/**
 * Hook pour gérer les crédits utilisateur
 * 
 * @returns État et actions des crédits
 * 
 * @example
 * const { credits, debit, isLoading } = useCredits()
 */
export function useCredits() {
  const [credits, setCredits] = useState(0)
  const [isLoading, setIsLoading] = useState(false)
  
  // Implementation
  
  return {
    credits,
    debit,
    isLoading
  }
}
```

## 🚀 Migration Progressive

### Phase 1 : Structure de base
1. ✅ Créer la nouvelle arborescence
2. ✅ Déplacer les fichiers de documentation
3. ✅ Organiser `/lib` et `/types`

### Phase 2 : Composants
1. Créer les dossiers par domaine
2. Déplacer et renommer les composants
3. Mettre à jour les imports

### Phase 3 : Documentation
1. Ajouter JSDoc à toutes les fonctions publiques
2. Créer des README dans chaque domaine
3. Documenter les APIs

### Phase 4 : Tests et Validation
1. Vérifier que tout compile
2. Tester les routes principales
3. Déployer sur Vercel

## 📚 Ressources

- [Next.js App Router](https://nextjs.org/docs/app)
- [TypeScript Handbook](https://www.typescriptlang.org/docs/)
- [JSDoc Reference](https://jsdoc.app/)
