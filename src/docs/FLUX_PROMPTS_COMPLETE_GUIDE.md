# 🎨 PHOTOGLOW - GUIDE COMPLET DES PROMPTS FLUX OPTIMISÉS

## 📋 Vue d'ensemble

Ce guide documente **TOUS les prompts optimisés Flux** pour PhotoGlow, créés selon les meilleures pratiques du guide officiel Flux et basés sur notre expérience réussie (élimination des negative prompts, prompts longs 120-160 caractères).

---

## 📁 Structure des fichiers

### 1. `/components/fluxOptimizedPrompts.ts`
**Catégories principales + spéciales (17 catégories, ~235 images)**

#### 🎯 Catégories principales (9)
- `ai-headshots` - Professional Headshots (20 prompts)
- `ai-dating-photos` - AI Dating Photos (20 prompts)
- `ai-selfie` - AI Selfies (20 prompts)
- `ai-model-photo` - AI Model Photography (20 prompts)
- `ai-realistic-photo` - AI Realistic Photography (15 prompts)
- `ai-portrait` - AI Portrait Photography (15 prompts)
- `ai-fitness-photos` - Fitness Photos (15 prompts)
- `ai-fitness-bikini` - Beach & Bikini (15 prompts)
- `ai-lifestyle-travel` - Lifestyle & Travel (20 prompts)
- `ai-cosplay-fantasy` - Cosplay & Fantasy (15 prompts)

#### ⭐ Catégories spéciales (8)
- `old-money` - Old Money Aesthetic (10 prompts)
- `halloween` - Halloween Spooky (10 prompts)
- `christmas` - Christmas Festive (10 prompts)
- `nightlife` - Nightlife Party (10 prompts)
- `retro-90s` - Retro 90s (10 prompts)
- `retro-80s` - Retro 80s (10 prompts)
- `y2k-aesthetic` - Y2K 2000s (10 prompts)

### 2. `/components/fluxOptimizedPromptsExtended.ts`
**Catégories additionnelles + festivals (22 catégories, ~190 images)**

#### 🌟 Extended categories (15)
- `luxury-lifestyle` - Luxury Lifestyle (15 prompts)
- `ai-influencer` - AI Influencer Generator (15 prompts)
- `instant-camera` - Instant Camera/Polaroid (10 prompts)
- `mob-wife` - Mob Wife Aesthetic (10 prompts)
- `e-girl` - E-Girl Aesthetic (10 prompts)
- `podcast-host` - Podcast Host Studio (10 prompts)
- `1950s-film-noir` - 1950s Film Noir (10 prompts)
- `rgb-portrait` - RGB Portrait (10 prompts)
- `youtube-thumbnail` - YouTube Thumbnail Generator (10 prompts)

#### 🎊 Festival & Cultural categories (7)
- `day-of-the-dead` - Day Of The Dead (10 prompts)
- `diwali` - Diwali Festival (10 prompts)
- `holi` - Holi Festival (10 prompts)
- `ramadan` - Ramadan (10 prompts)
- `eid-mubarak` - Eid Mubarak (10 prompts)
- `hanukkah` - Hanukkah (10 prompts)
- `chinese-new-year` - Chinese New Year (10 prompts)

---

## 🎯 Standards Flux appliqués à TOUS les prompts

### 1. **Structure du prompt (ordre important)**
```
[Framing] + [Subject] + [Setting] + [Lighting] + [Lens] + [Style descriptors]
```

**Exemple :**
```
"3/4 portrait of a [gender] in tweed + silk scarf at ivy-covered townhouse, 
soft overcast, 50mm, poised, timeless editorial, natural skin texture."
```

### 2. **Framing (cadrage)**
- `Tight headshot` - Très serré sur le visage
- `Close-up` - Rapproché (visage/épaules)
- `3/4` - Trois-quarts (taille/cuisses)
- `Full-body` - Corps entier
- `Wide shot` - Plan large

### 3. **Lens feel (objectif)**
- `85mm` - Portraits professionnels, headshots
- `50mm` - Portraits standards, polyvalent
- `35mm` - Urbain, lifestyle, groupe
- `28mm` - Selfies, wide angle
- `200mm` - Sport, compression, isolement
- `100mm macro` - Détails extrêmes

### 4. **Lighting (éclairage détaillé)**
- `Soft window light` - Lumière fenêtre douce
- `Golden hour rim` - Contre-jour doré
- `Clamshell light` - Éclairage beauté
- `On-camera flash` - Flash direct
- `RGB gels` - Gels colorés néon
- `Rembrandt lighting` - Éclairage triangulaire classique
- `Soft key + hair light` - Clé douce + lumière cheveux
- `Natural overcast` - Nuageux naturel
- `Warm practical lights` - Lumières d'ambiance chaudes

### 5. **Aspect Ratios (formats)**
- `1:1` - Avatar, headshot, Instagram post
- `3:4` - Portrait standard
- `4:5` - Instagram portrait optimal
- `9:16` - Story, Reels, TikTok
- `16:9` - YouTube thumbnail, paysage

### 6. **Style descriptors (NO negative prompts!)**
✅ **À UTILISER :**
- `natural skin texture`
- `realistic skin detail`
- `authentic expression`
- `photorealistic`
- `genuine moment`
- `professional photography`
- `contemporary aesthetic`
- `magazine quality`

❌ **À ÉVITER (pas de negative prompts) :**
- ~~`no cartoon`~~
- ~~`not illustration`~~
- ~~`avoid artificial`~~

---

## 📊 Statistiques complètes

### Par fichier
| Fichier | Catégories | Images cibles | Moyenne/cat |
|---------|-----------|---------------|-------------|
| fluxOptimizedPrompts.ts | 17 | ~235 | 13.8 |
| fluxOptimizedPromptsExtended.ts | 22 | ~190 | 8.6 |
| **TOTAL** | **39** | **~425** | **10.9** |

### Par type de contenu
| Type | Catégories | % |
|------|-----------|---|
| Professional/Business | 8 | 20% |
| Dating/Social | 6 | 15% |
| Fashion/Lifestyle | 7 | 18% |
| Retro/Vintage | 5 | 13% |
| Festival/Cultural | 7 | 18% |
| Creative/Artistic | 6 | 15% |

### Par aspect ratio
| Ratio | Usage | Cas d'usage |
|-------|-------|-------------|
| 1:1 | 15% | Headshots, avatars, beauty close-ups |
| 3:4 | 50% | Portraits standards, most versatile |
| 4:5 | 20% | Instagram portrait, dating apps |
| 9:16 | 10% | Stories, Reels, selfies |
| 16:9 | 5% | YouTube thumbnails, wide scenes |

---

## 🔧 Utilisation dans le code

### Import et utilisation
```typescript
// Import des catégories principales
import { getAllFluxCategories, getCategoryById } from './components/fluxOptimizedPrompts';

// Import des catégories extended
import { getAllExtendedCategories } from './components/fluxOptimizedPromptsExtended';

// Obtenir TOUTES les catégories
const allCategories = [
  ...getAllFluxCategories(),
  ...getAllExtendedCategories()
];

// Obtenir une catégorie spécifique
const headshotsCategory = getCategoryById('ai-headshots');

// Générer pour une catégorie
headshotsCategory?.prompts.forEach(prompt => {
  const finalPrompt = prompt.prompt.replace('[gender]', 'woman');
  // Generate image with Pollinations FLUX
});
```

### Génération automatique
```typescript
// Générer toutes les images d'une catégorie
async function generateCategoryImages(categoryId: string) {
  const category = getCategoryById(categoryId);
  if (!category) return;

  for (const template of category.prompts) {
    // Generate for both genders if applicable
    const genders = template.gender === 'both' 
      ? ['male', 'female'] 
      : [template.gender];

    for (const gender of genders) {
      const prompt = template.prompt.replace('[gender]', gender);
      const aspectRatio = template.aspectRatio;
      
      // Call Pollinations API
      const imageUrl = await generateWithPollinations({
        prompt,
        aspectRatio,
        model: 'flux'
      });
    }
  }
}
```

---

## 💡 Meilleures pratiques FLUX

### ✅ DO (À FAIRE)

1. **Prompts longs et descriptifs**
   - Cible : 120-160 caractères
   - Exemple : `"3/4 portrait of a woman in tweed + silk scarf at ivy-covered townhouse, soft overcast, 50mm, poised, timeless editorial, natural skin texture."`

2. **Ordre logique des éléments**
   - Commencer par le cadrage et le sujet
   - Puis le contexte/décor
   - Puis l'éclairage technique
   - Finir par le style et mood

3. **Lighting précis**
   - Toujours spécifier le type d'éclairage
   - Utiliser des termes photographiques réels
   - Exemples : `soft window light`, `golden hour rim`, `clamshell light`

4. **Natural descriptors**
   - `natural skin texture`
   - `realistic details`
   - `authentic expression`
   - `photorealistic quality`

### ❌ DON'T (À ÉVITER)

1. **Negative prompts** - JAMAIS !
   - ❌ `no cartoon, not illustration`
   - ✅ `photorealistic, natural skin texture`

2. **Prompts trop courts**
   - ❌ `"portrait of a woman"`
   - ✅ `"3/4 portrait of a woman in elegant blazer, studio gray background, soft beauty light, 85mm, confident professional presence"`

3. **"White background" avec FLUX [dev]**
   - Cause des outputs flous avec [dev]
   - ✅ Utiliser : `"neutral seamless"`, `"light gray background"`, `"clean studio backdrop"`

4. **Spam de keywords désordonné**
   - ❌ `"woman, beautiful, professional, office, modern, smile, business, confident"`
   - ✅ `"3/4 portrait of confident businesswoman in modern office, natural window light, 50mm, professional demeanor"`

---

## 🎨 Exemples de prompts par catégorie

### Professional Headshots
```
"Tight headshot of a woman on medium-gray seamless, clamshell light, 85mm, 
sharp eyes, approachable, LinkedIn-ready, natural skin texture, 
professional business attire."
```

### Dating Photos
```
"3/4 flattering portrait of a man in casual chic streetwear, soft sunset, 
50mm, confident, engaging, natural dating photo aesthetic."
```

### Instagram Selfies
```
"Mirror selfie of a woman in minimal bathroom, diffused daylight, 
smartphone reflection, authentic, clean skin, casual everyday outfit."
```

### Fashion Model
```
"Full-body woman in high fashion outfit on urban street, natural overcast, 
50mm, editorial pose, magazine quality, contemporary styling."
```

### Retro 90s
```
"Bedroom 90s set with posters/CRT, on-camera flash, 35mm, 
casual woman, nostalgic color, retro vibe."
```

### Festival (Diwali)
```
"3/4 woman with diyas/rangoli, warm lamps, 50mm, festive glow, 
Festival of Lights celebration."
```

---

## 🚀 Génération en production

### Configuration Pollinations
```typescript
const pollinationsConfig = {
  model: 'flux',           // FLUX model
  proxy: true,             // Binary JPEG mode
  fast: true,              // Quick generation
  safe: false,             // No content filter
  // NO negative_prompt!   // IMPORTANT: supprimé
  seed: randomSeed(),
  width: ratioToWidth(aspectRatio),
  height: ratioToHeight(aspectRatio)
};
```

### Batch generation
```typescript
// Mode TEST : 5 images max par catégorie
const testMode = true;
const maxPerCategory = testMode ? 5 : category.prompts.length;

// Génération par batch de 3 pour éviter rate limit
const BATCH_SIZE = 3;
for (let i = 0; i < prompts.length; i += BATCH_SIZE) {
  const batch = prompts.slice(i, i + BATCH_SIZE);
  await Promise.all(batch.map(p => generateImage(p)));
  await sleep(2000); // 2s entre chaque batch
}
```

---

## 📝 Checklist avant génération

- [ ] Vérifier que TOUS les prompts sont 120-160 caractères
- [ ] Confirmer AUCUN negative prompt présent
- [ ] Tester avec mode TEST (5 images) avant FULL
- [ ] Vérifier les aspect ratios correspondent aux use cases
- [ ] S'assurer que [gender] est bien remplacé
- [ ] Configurer `safe: false` dans Pollinations
- [ ] Préparer le stockage Supabase (bucket `ai_gallery`)
- [ ] Estimer le temps : ~3 secondes/image × nombre total

---

## 🎯 Objectif final

**Générer automatiquement ~425 images de haute qualité** pour peupler toutes les catégories de PhotoGlow avec :
- ✅ Photos photoréalistes (pas de cartoon/illustration)
- ✅ Diversité de genres (male/female selon catégorie)
- ✅ Qualité professionnelle constante
- ✅ Variété de poses, éclairages, contextes
- ✅ Formats adaptés aux use cases (LinkedIn 1:1, Instagram 4:5, Stories 9:16)

---

## 📞 Support

Pour toute question sur les prompts Flux ou la génération :
1. Consulter le guide officiel Flux
2. Tester en mode TEST (5 images) avant production
3. Ajuster les prompts si besoin selon les résultats
4. Documenter les changements dans ce fichier

---

**Dernière mise à jour :** Novembre 2025  
**Version :** 1.0 - Collection complète  
**Total catégories :** 39  
**Total images cibles :** ~425
