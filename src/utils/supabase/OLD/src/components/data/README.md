# 📊 Data Files

Ce dossier contient toutes les données statiques et configurations de PhotoGlow.

## 📁 Structure

```
data/
├── categories/       # Données des catégories
│   ├── categoryData.ts
│   ├── categoryExamplesData.ts
│   ├── categoryFAQData.ts
│   └── categoryTestimonialsData.ts
│
├── config/          # Configurations des catégories
│   ├── categoryColorSchemes.ts
│   ├── categoryFormConfig.ts
│   ├── categoryMasonryData.ts
│   └── categoryPagesConfig.ts
│
├── prompts/         # Prompts AI optimisés FLUX
│   ├── allCategoriesPromptsConfig.ts  ⭐ Principal
│   ├── fluxOptimizedPrompts.ts
│   ├── categoryPhotoPrompts.ts
│   └── getAllCategories.ts
│
└── ideas/           # Données page IdeasPage
    ├── ideasData.ts
    └── categories.ts
```

---

## 📊 Statistiques

### Prompts AI
- **Total prompts** : 295
- **Catégories** : 18
- **Provider** : Pollinations.ai (FLUX)
- **Aspect ratios** : 3 (portrait, square, landscape)

### Catégories
- **Total catégories** : 18+
- **Examples par catégorie** : 10-20
- **FAQ par catégorie** : 5-10
- **Testimonials** : 50+

---

## 🎯 Catégories disponibles

1. **ai-headshots** - Headshots professionnels
2. **ai-model-photo** - Photos mannequin fashion
3. **ai-dating-photos** - Photos de rencontre
4. **ai-linkedin-photo** - Photos LinkedIn
5. **ai-realistic-photo** - Photos ultra-réalistes
6. **ai-selfie-generator** - Générateur de selfies
7. **ai-portrait-generator** - Portraits artistiques
8. **ai-fitness-photos** - Photos fitness
9. **ai-lifestyle-travel** - Lifestyle et voyage
10. **ai-cosplay-fantasy** - Cosplay et fantasy
11. **ai-glamour-model** - Modèle glamour
12. **ai-instagram-photo** - Photos Instagram
13. **ai-tinder-photos** - Photos Tinder
14. **ai-business-casual** - Business casual
15. **ai-yearbook-photo** - Photos annuaire
16. **ai-senior-portraits** - Portraits seniors
17. **ai-corporate-headshots** - Headshots corporate
18. **ai-actor-headshots** - Headshots acteur

---

## 🚀 Usage

### Import centralisé

```tsx
// Via barrel export (futur)
import { 
  categories, 
  categoryExamples,
  categoryFAQs,
  ALL_CATEGORIES_PROMPTS_CONFIG 
} from '../data';

// Import direct (actuel)
import { ALL_CATEGORIES_PROMPTS_CONFIG } from '../data/prompts/allCategoriesPromptsConfig';
```

### Exemples d'usage

#### Récupérer une catégorie
```tsx
const category = categories.find(c => c.slug === 'ai-headshots');
```

#### Récupérer les prompts d'une catégorie
```tsx
const prompts = ALL_CATEGORIES_PROMPTS_CONFIG['ai-headshots'].prompts;
```

#### Récupérer les exemples
```tsx
const examples = categoryExamples['ai-headshots'];
```

#### Récupérer les FAQs
```tsx
const faqs = categoryFAQs['ai-headshots'];
```

---

## 📚 Documentation détaillée

Voir les README dans chaque sous-dossier :
- `/data/categories/README.md` - Données des catégories
- `/data/config/README.md` - Configurations
- `/data/prompts/README.md` - Prompts AI (295 prompts)
- `/data/ideas/README.md` - Données IdeasPage (à créer)

---

## Conventions

### Nommage
- **Fichiers** : camelCase.ts
- **Variables** : UPPER_SNAKE_CASE pour constantes
- **Types** : PascalCase

### Structure
```typescript
/**
 * Description du fichier
 */

// Types
export interface MyType {
  // ...
}

// Constants
export const MY_DATA: MyType[] = [
  // ...
];

// Default export (optionnel)
export default MY_DATA;
```

### Documentation
- JSDoc pour toutes les exports
- Commentaires pour logique complexe
- Exemples d'usage dans comments

---

## 🔄 Migration Status

### ✅ Complété
- [x] Structure créée
- [x] README créés pour chaque dossier
- [x] Barrel export configuré
- [x] Documentation prompts complète

### 🚧 En cours
- [ ] Migration categoryData.ts
- [ ] Migration categoryExamplesData.ts
- [ ] Migration categoryFAQData.ts
- [ ] Migration categoryTestimonialsData.ts
- [ ] Migration colorSchemes, formConfig, etc.
- [ ] Migration ideasData.ts
- [ ] Consolidation des fichiers fluxOptimized*

---

## Best Practices

1. **Immutabilité** : Toutes les données sont `readonly`
2. **Type-safety** : Types stricts partout
3. **Validation** : Schémas Zod pour runtime validation (futur)
4. **Performance** : Pas de computation lourde au chargement
5. **SEO** : Données structurées pour rich snippets
