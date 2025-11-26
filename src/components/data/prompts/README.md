# 🎨 Prompts Data Files

Ce dossier contient tous les prompts optimisés pour la génération d'images AI.

## 📊 Vue d'ensemble

Le système de prompts PhotoGlow comprend **295 prompts uniques** répartis sur **18 catégories**.

### Statistiques
- **Total prompts** : 295
- **Catégories** : 18
- **Images générées** : 300+
- **Provider** : Pollinations.ai (FLUX model)

---

## 📁 Fichiers

### `allCategoriesPromptsConfig.ts` ⭐
**Fichier principal** - Configuration complète de tous les prompts.

```typescript
export const ALL_CATEGORIES_PROMPTS_CONFIG = {
  'ai-headshots': {
    prompts: [
      {
        index: 0,
        title: 'Professional Executive',
        prompt: 'Ultra-realistic professional headshot...',
        aspectRatio: 'portrait'
      },
      // ... 15+ prompts
    ],
    metadata: {
      category_id: 'ai-headshots',
      total_prompts: 16,
      description: '...'
    }
  },
  // ... 17 autres catégories
}
```

**Utilisation** :
```tsx
import { ALL_CATEGORIES_PROMPTS_CONFIG } from './allCategoriesPromptsConfig';

const prompts = ALL_CATEGORIES_PROMPTS_CONFIG['ai-headshots'].prompts;
```

### `fluxOptimizedPrompts.ts`
Prompts optimisés pour le modèle FLUX.

**Caractéristiques FLUX** :
- Pas de negative prompts (critique !)
- Prompts longs et descriptifs
- Détails spécifiques (lighting, composition, etc.)
- Focus sur le réalisme photographique

**Structure** :
```typescript
interface FluxPrompt {
  title: string;
  prompt: string;         // Long prompt optimisé FLUX
  category: string;
  aspectRatio: string;
  tags?: string[];
}
```

### `categoryPhotoPrompts.ts`
Prompts spécifiques par catégorie pour génération rapide.

```typescript
export const CATEGORY_PROMPTS = {
  'ai-headshots': [
    'Professional headshot, studio lighting...',
    'Executive portrait, modern office...',
    // ...
  ]
}
```

### `getAllCategories.ts`
Utilitaire pour récupérer toutes les catégories disponibles.

```typescript
export function getAllCategories(): CategoryInfo[] {
  return Object.keys(ALL_CATEGORIES_PROMPTS_CONFIG).map(slug => ({
    slug,
    total_prompts: config[slug].metadata.total_prompts,
    category_id: config[slug].metadata.category_id
  }));
}
```

---

## 🎯 Catégories disponibles

| Catégorie | Prompts | Description |
|-----------|---------|-------------|
| ai-headshots | 16 | Headshots professionnels |
| ai-model-photo | 16 | Photos mannequin fashion |
| ai-dating-photos | 16 | Photos de rencontre naturelles |
| ai-linkedin-photo | 16 | Photos LinkedIn professionnelles |
| ai-realistic-photo | 16 | Photos ultra-réalistes |
| ai-selfie-generator | 16 | Selfies naturels et glamour |
| ai-portrait-generator | 16 | Portraits artistiques |
| ai-fitness-photos | 16 | Photos fitness et sport |
| ai-lifestyle-travel | 16 | Lifestyle et voyage |
| ai-cosplay-fantasy | 16 | Cosplay et fantasy |
| ai-glamour-model | 16 | Modèle glamour |
| ai-instagram-photo | 16 | Photos style Instagram |
| ai-tinder-photos | 16 | Photos optimisées Tinder |
| ai-business-casual | 16 | Business casual moderne |
| ai-yearbook-photo | 16 | Photos de classe/annuaire |
| ai-senior-portraits | 16 | Portraits seniors élégants |
| ai-corporate-headshots | 16 | Headshots corporate |
| ai-actor-headshots | 16 | Headshots acteur/casting |

---

## 🔧 Optimisation FLUX

### ⚠️ CRITIQUE : Pas de negative prompts !

Le modèle FLUX ne supporte PAS les negative prompts. 
**TOUJOURS utiliser des prompts positifs et descriptifs.**

❌ **Mauvais** :
```
"Portrait of a woman"
Negative: "ugly, cartoon, illustration"
```

✅ **Bon** :
```
"Ultra-realistic photographic portrait of a professional woman, 
natural skin texture with visible pores and fine details, 
professional studio lighting setup with key light and fill light,
authentic photograph captured with DSLR camera, genuine human features,
realistic depth of field and bokeh background, true-to-life colors..."
```

### 📝 Règles d'écriture FLUX

1. **Longueur** : 50-150 mots minimum
2. **Spécificité** : Détails précis (lighting, pose, background)
3. **Réalisme** : Mentionner "photographic", "realistic", "DSLR"
4. **Texture** : Décrire skin texture, materials, details
5. **Composition** : Décrire le cadrage et la profondeur de champ

### 🎨 Template de prompt FLUX

```
[Type de photo] portrait of [sujet], 
[détails physiques et expression],
[lighting setup détaillé],
[background et environnement],
[technical camera details],
[style et mood],
[texture et détails]
```

**Exemple complet** :
```
Ultra-realistic professional headshot portrait of a confident businesswoman,
natural smile with authentic expression, well-groomed appearance,
professional studio lighting with softbox key light at 45 degrees and subtle fill light,
clean minimalist white background with gentle gradient,
captured with Canon 5D Mark IV with 85mm f/1.8 lens,
contemporary professional corporate style,
natural skin texture with visible pores and fine details, sharp focus on eyes
```

---

## 📐 Aspect Ratios

Les prompts sont optimisés pour 3 formats :

- **portrait** : 9:16 (vertical) - Idéal pour headshots, selfies
- **square** : 1:1 - Instagram, profils
- **landscape** : 16:9 (horizontal) - Bannières, covers

```typescript
const aspectRatios = {
  portrait: '9:16',
  square: '1:1', 
  landscape: '16:9'
};
```

---

## 🚀 Usage dans l'application

### Génération d'image

```tsx
import { ALL_CATEGORIES_PROMPTS_CONFIG } from './allCategoriesPromptsConfig';

async function generateImage(categoryId: string, promptIndex: number) {
  const config = ALL_CATEGORIES_PROMPTS_CONFIG[categoryId];
  const promptData = config.prompts[promptIndex];
  
  const response = await fetch('https://pollinations.ai/p/' + encodeURIComponent(promptData.prompt), {
    method: 'GET',
    headers: {
      'User-Agent': 'PhotoGlow/1.0'
    }
  });
  
  return response.url; // URL de l'image générée
}
```

### Affichage dans galerie

```tsx
import { useCategoryImages } from '../../../hooks/useCategoryImages';

function CategoryGallery({ categoryId }: { categoryId: string }) {
  const { images, loading } = useCategoryImages(categoryId);
  
  return (
    <div className="grid grid-cols-3 gap-4">
      {images.map(img => (
        <div key={img.id}>
          <img src={img.image_url} alt={img.prompt_title} />
          <p>{img.prompt_title}</p>
        </div>
      ))}
    </div>
  );
}
```

---

## 🔄 Workflow de génération

1. **Sélection** : Utilisateur choisit une catégorie
2. **Prompts** : Récupération des prompts via `ALL_CATEGORIES_PROMPTS_CONFIG`
3. **Génération** : Appel à Pollinations.ai avec prompt FLUX optimisé
4. **Stockage** : Upload dans Supabase bucket `ai_gallery`
5. **Database** : Enregistrement dans table `ideas_examples`

### Script de génération automatique

```bash
# Générer toutes les images pour toutes les catégories
npx tsx scripts/generate-all-category-images.ts

# Générer pour une catégorie spécifique
npx tsx scripts/generate-all-category-images.ts --category ai-headshots
```

---

## 📚 Documentation complète

Pour plus de détails sur le système de prompts :

- **Guide complet** : `/docs/prompts-automation/COMPLETE_GUIDE.md`
- **Structure** : `/docs/prompts-automation/STRUCTURE.md`
- **Workflow** : `/docs/prompts-automation/WORKFLOW.md`
- **Quick Start** : `/docs/prompts-automation/QUICK_START.md`

---

## 🔍 Recherche et filtrage

```tsx
// Rechercher par mot-clé
function searchPrompts(keyword: string) {
  const results = [];
  Object.entries(ALL_CATEGORIES_PROMPTS_CONFIG).forEach(([categoryId, config]) => {
    config.prompts.forEach(prompt => {
      if (prompt.prompt.toLowerCase().includes(keyword.toLowerCase())) {
        results.push({ categoryId, prompt });
      }
    });
  });
  return results;
}

// Filtrer par aspect ratio
function filterByAspectRatio(ratio: string) {
  return Object.entries(ALL_CATEGORIES_PROMPTS_CONFIG).flatMap(([categoryId, config]) =>
    config.prompts.filter(p => p.aspectRatio === ratio)
  );
}
```

---

## ⚡ Performance

- Prompts chargés en mémoire (pas d'API calls)
- Indexés par category_id pour O(1) lookup
- Pas de computation lourde
- Bundle size : ~50KB pour tous les prompts

---

## 🧪 Testing

```typescript
// Vérifier qu'une catégorie a tous ses prompts
test('ai-headshots has 16 prompts', () => {
  const config = ALL_CATEGORIES_PROMPTS_CONFIG['ai-headshots'];
  expect(config.prompts).toHaveLength(16);
  expect(config.metadata.total_prompts).toBe(16);
});

// Vérifier qu'aucun prompt n'a de negative prompt
test('no prompts contain negative keywords', () => {
  Object.values(ALL_CATEGORIES_PROMPTS_CONFIG).forEach(config => {
    config.prompts.forEach(p => {
      expect(p.prompt.toLowerCase()).not.toContain('negative:');
      expect(p.prompt.toLowerCase()).not.toContain('ugly');
      expect(p.prompt.toLowerCase()).not.toContain('cartoon');
    });
  });
});
```

---

## Migration en cours

- [x] Structure créée
- [x] allCategoriesPromptsConfig.ts finalisé (295 prompts)
- [ ] Fichiers legacy à migrer
- [ ] fluxOptimizedPrompts*.ts à consolider
- [ ] Documentation à jour
