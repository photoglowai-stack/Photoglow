# 🚀 PhotoGlow - Quick Start Guide : Prompts Automation

## ⚡ Démarrage Rapide (5 minutes)

### 1️⃣ Importer et Utiliser

```typescript
import { 
  getAllCategories, 
  getCategoryById, 
  getPromptsByCategory 
} from './components/allCategoriesPromptsConfig';

// Récupérer toutes les catégories
const categories = getAllCategories();
console.log(`${categories.length} catégories disponibles`);

// Récupérer une catégorie spécifique
const headshots = getCategoryById('ai-headshots');
console.log(headshots?.name); // "AI Headshots"

// Récupérer tous les prompts d'une catégorie
const prompts = getPromptsByCategory('ai-dating-photos');
console.log(`${prompts.length} prompts disponibles`);
```

---

## 📋 Liste Rapide des Catégories

### 🎯 Catégories Principales (90 images)

| ID | Nom | Images | Use Case |
|---|---|---|---|
| `ai-headshots` | AI Headshots | 15 | LinkedIn, CV, professionnel |
| `ai-model-photo` | AI Model Photo | 15 | Mode, portfolio, lookbooks |
| `ai-dating-photos` | AI Dating Photos | 15 | Tinder, Bumble, Hinge |
| `ai-selfie-generator` | AI Selfie Generator | 15 | Instagram, TikTok, social |
| `ai-fitness-photos` | AI Fitness Photos | 15 | Gym, fitness, sport |
| `ai-lifestyle-travel` | AI Lifestyle & Travel | 15 | Voyage, aventure, lifestyle |

### 🌟 Catégories IDEAS (210 images)

| ID | Nom | Images | Use Case |
|---|---|---|---|
| `holidays-events` | Holidays & Events | 20 | Halloween, Noël, festivals |
| `professional-headshots-extended` | Professional Extended | 20 | Médecins, avocats, enseignants |
| `ai-creative-tools` | AI Creative Tools | 15 | Outils créatifs IA |
| `fashion-style-trends` | Fashion & Style | 20 | Mode, tendances, style |
| `lifestyle-moments` | Lifestyle Moments | 15 | Quotidien, hobbies |
| `retro-vintage` | Retro & Vintage | 20 | 50s-90s, rétro, vintage |
| `location-based-travel` | Location Travel | 20 | Paris, Tokyo, Dubai, etc. |
| `character-cosplay-fantasy` | Character & Cosplay | 15 | Anime, cosplay, fantasy |
| `special-events-celebrations` | Special Events | 20 | Mariages, graduations |
| `themed-aesthetic-styles` | Themed Aesthetic | 20 | Pink doll, RGB, aesthetic |
| `professional-creative-specialized` | Professional Creative | 15 | YouTubers, influenceurs |

---

## 🎨 Exemples de Code

### Exemple 1 : Afficher toutes les catégories

```typescript
import { getAllCategories } from './components/allCategoriesPromptsConfig';

function CategoriesList() {
  const categories = getAllCategories();
  
  return (
    <div>
      {categories.map(cat => (
        <div key={cat.id}>
          <h2>{cat.emoji} {cat.name}</h2>
          <p>{cat.description}</p>
          <span>{cat.targetImages} images</span>
        </div>
      ))}
    </div>
  );
}
```

### Exemple 2 : Récupérer les prompts d'une catégorie

```typescript
import { getPromptsByCategory } from './components/allCategoriesPromptsConfig';

function HeadshotsPrompts() {
  const prompts = getPromptsByCategory('ai-headshots');
  
  return (
    <div>
      {prompts.map((prompt, index) => (
        <div key={index}>
          <h3>{prompt.title}</h3>
          <p>{prompt.prompt}</p>
          <small>Ratio: {prompt.aspectRatio}</small>
        </div>
      ))}
    </div>
  );
}
```

### Exemple 3 : Utiliser le Hook React

```typescript
import { useAllCategoryPrompts } from './components/useAllCategoryPrompts';

function MyComponent() {
  const { allCategories, stats } = useAllCategoryPrompts();
  
  return (
    <div>
      <p>Total catégories: {stats.totalCategories}</p>
      <p>Total images: {stats.totalTargetImages}</p>
    </div>
  );
}
```

### Exemple 4 : Générer une URL Pollinations

```typescript
import { usePollinationsImageUrl } from './components/useAllCategoryPrompts';

function ImagePreview() {
  const prompt = "Professional corporate executive headshot portrait...";
  
  const imageUrl = usePollinationsImageUrl(prompt, {
    width: 1024,
    height: 1024,
    model: 'flux',
    nologo: true
  });
  
  return <img src={imageUrl} alt="Generated" />;
}
```

---

## 🧪 Tester la Configuration

```bash
# Exécuter le script de test
npx ts-node scripts/test-prompts-config.ts

# Affiche :
# ✅ Statistiques globales
# ✅ Liste des catégories
# ✅ Exemples de prompts
# ✅ Validation qualité
# ✅ Recommandations
```

---

## 📊 Accès Rapide aux Données

### Statistiques Globales

```typescript
import { getGlobalStats } from './components/allCategoriesPromptsConfig';

const stats = getGlobalStats();
// {
//   totalCategories: 18,
//   totalTargetImages: 300,
//   mainCategories: 6,
//   ideasCategories: 12,
//   avgImagesPerCategory: 16.6
// }
```

### Total d'Images à Générer

```typescript
import { getTotalImageCount } from './components/allCategoriesPromptsConfig';

const total = getTotalImageCount();
console.log(`${total} images à générer`); // "300 images à générer"
```

---

## 🎯 Prompts Exemples par Catégorie

### AI Headshots
```
"Professional corporate executive headshot portrait, clean neutral background, 
confident business demeanor, formal business attire, studio lighting setup, 
sharp professional focus, polished appearance"
```

### AI Dating Photos
```
"Perfect Tinder dating profile photo, friendly approachable smile, casual stylish 
outfit, flattering natural angle, soft attractive lighting, swipe-right worthy 
aesthetic authentic genuine vibe"
```

### Retro & Vintage
```
"Retro 1980s portrait, vibrant neon colors outfit, geometric patterns, arcade or 
mall background, bright colorful lighting authentic 80s aesthetic synthwave vibes 
decade nostalgia"
```

### Location-Based Travel
```
"Summer in Paris portrait, chic parisian outfit, Eiffel Tower cafe background, 
warm golden lighting authentic french aesthetic romantic european charm city of light"
```

---

## 🔧 Fonctions Utilitaires

### `getAllCategories()`
Retourne toutes les catégories (principales + ideas)

```typescript
const categories = getAllCategories();
// Array de 18 CategoryConfig
```

### `getCategoryById(id: string)`
Récupère une catégorie par son ID

```typescript
const category = getCategoryById('ai-headshots');
// CategoryConfig | undefined
```

### `getPromptsByCategory(categoryId: string)`
Récupère tous les prompts d'une catégorie

```typescript
const prompts = getPromptsByCategory('ai-dating-photos');
// Array de PromptTemplate
```

### `getTotalImageCount()`
Calcule le nombre total d'images à générer

```typescript
const total = getTotalImageCount();
// 300
```

### `getGlobalStats()`
Retourne les statistiques globales

```typescript
const stats = getGlobalStats();
// { totalCategories, totalTargetImages, ... }
```

---

## 📐 Aspect Ratios Disponibles

| Ratio | Usage | Exemples |
|---|---|---|
| `1:1` | Carré | Headshots, profils, Instagram posts |
| `4:5` | Portrait vertical | Mode, fitness, lifestyle |
| `9:16` | Vertical stories | Stories Instagram, TikTok, selfies |
| `16:9` | Paysage horizontal | Bannières, headers, YouTube |

---

## 🎨 Structure d'un Prompt

```typescript
interface PromptTemplate {
  title: string;           // "Corporate Professional Headshot"
  prompt: string;          // Le prompt complet (120-160 caractères)
  category: string;        // "AI Headshots"
  aspectRatio?: string;    // "1:1" | "4:5" | "9:16" | "16:9"
}
```

### Structure d'une Catégorie

```typescript
interface CategoryConfig {
  id: string;                    // "ai-headshots"
  name: string;                  // "AI Headshots"
  emoji: string;                 // "📸"
  description: string;           // Description courte
  targetImages: number;          // 15
  promptTemplates: PromptTemplate[];
  basePromptSuffix?: string;     // Suffixe ajouté automatiquement
}
```

---

## 💡 Astuces & Best Practices

### ✅ Bonnes Pratiques
- Prompts de **120-160 caractères** minimum
- **Descriptions naturelles** et détaillées
- **Pas de negative prompts** pour FLUX
- **Mots-clés riches** en contexte visuel
- **Aspect ratio cohérent** par type de photo

### ❌ À Éviter
- Prompts courts (<50 caractères)
- Negative prompts ("no", "without", "avoid")
- Instructions techniques ("8K", "ultra HD")
- Termes génériques sans détails
- Syntax non-naturelle

---

## 🚀 Génération d'Images Pollinations

### Format URL de Base
```
https://image.pollinations.ai/prompt/{PROMPT}
?width={WIDTH}
&height={HEIGHT}
&seed={SEED}
&model=flux
&nologo=true
```

### Exemple Complet
```typescript
const prompt = "Professional corporate executive headshot portrait...";
const encodedPrompt = encodeURIComponent(prompt);

const url = `https://image.pollinations.ai/prompt/${encodedPrompt}?width=1024&height=1024&seed=12345&model=flux&nologo=true`;

// Utiliser dans une balise img
<img src={url} alt="Generated headshot" />
```

---

## 📚 Documentation Complète

Pour plus de détails, consulter :
- `COMPLETE_GUIDE.md` - Guide complet
- `SUMMARY.md` - Résumé détaillé
- `/components/allCategoriesPromptsConfig.ts` - Code source
- `/components/useAllCategoryPrompts.ts` - Hooks React
- `/scripts/test-prompts-config.ts` - Script de test

---

## ✅ Checklist de Démarrage

- [ ] Lire ce Quick Start Guide
- [ ] Importer les fonctions nécessaires
- [ ] Tester avec `getAllCategories()`
- [ ] Récupérer les prompts d'une catégorie
- [ ] Tester la génération d'une image Pollinations
- [ ] Exécuter le script de test
- [ ] Valider la qualité des prompts
- [ ] Prêt pour la génération massive ! 🎉

---

**Temps estimé pour démarrer : 5 minutes** ⏱️  
**Complexité : Facile** ✨  
**Prêt pour production : Oui** ✅
