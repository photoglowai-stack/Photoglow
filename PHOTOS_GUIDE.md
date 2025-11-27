# 📸 GUIDE COMPLET - Photos PhotoGlow

> **UN SEUL DOCUMENT avec TOUT ce qu'il faut savoir sur les photos**  
> Pour Claude, ChatGPT, Cursor ou tout assistant IA

---

## 🎯 TABLE DES MATIÈRES

1. [Architecture Globale](#architecture)
2. [TOUTES les URLs - Ligne par Ligne](#urls-completes)
3. [Structure Supabase](#supabase)
4. [Flux de Récupération](#flux)
5. [Guide Modification](#modification)
6. [Debugging](#debugging)

---

<a name="architecture"></a>
## 🗺️ ARCHITECTURE GLOBALE

### 3 Sources de Photos

1. **Supabase Storage** (`ai_gallery/categories/`) - Photos générées par IA
2. **Unsplash** - URLs hardcodées (fallback/placeholders)
3. **Figma Import** - Assets importés (`figma:asset/hash.png`)

### 6 Composants Qui Affichent des Photos

| Composant | Fichier | Source | Nombre |
|-----------|---------|--------|--------|
| **ScrollingMosaic** | `/components/ScrollingMosaic.tsx` | Supabase + Fallback | 15 fallback URLs |
| **CategoryShowcase** | `/components/CategoryShowcase.tsx` | Unsplash + Figma | 16 catégories |
| **CategoryExamplesData** | `/components/categoryExamplesData.ts` | Unsplash | 7×8 = 56 URLs |
| **BeforeAfterTransformation** | `/components/BeforeAfterTransformation.tsx` | Figma | 5 assets |
| **CategoryGalleryFull** | `/components/CategoryGalleryFull.tsx` | Supabase | Dynamique |
| **AllCategoriesGallery** | `/components/AllCategoriesGallery.tsx` | Supabase | Dynamique |

**TOTAL URLs hardcodées** : **112 photos** (104 Unsplash + 8 Figma)

---

<a name="urls-completes"></a>
## 📋 TOUTES LES URLs - LIGNE PAR LIGNE

### 1. SCROLLINGMOSAIC (15 URLs)

**Fichier** : `/components/ScrollingMosaic.tsx`  
**Lignes** : 14-30

```tsx
const fallbackPhotos = [
  // 1. Professional portrait photo
  'https://images.unsplash.com/photo-1560250097-0b93528c311a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwcm9mZXNzaW9uYWwlMjBwb3J0cmFpdCUyMHBob3RvfGVufDF8fHx8MTc2MDUyMjE5M3ww&ixlib=rb-4.1.0&q=80&w=400',

  // 2. Urban fashion portrait
  'https://images.unsplash.com/photo-1581093458791-9d42e7d44e1f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx1cmJhbiUyMGZhc2hpb24lMjBwb3J0cmFpdHxlbnwxfHx8fDE3NjA1MjIxOTN8MA&ixlib=rb-4.1.0&q=80&w=400',

  // 3. Business headshot
  'https://images.unsplash.com/photo-1719257751404-1dea075324bd?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxidXNpbmVzcyUyMGhlYWRzaG90fGVufDF8fHx8MTc2MDUyMjE5M3ww&ixlib=rb-4.1.0&q=80&w=400',

  // 4. Lifestyle portrait
  'https://images.unsplash.com/photo-1653419403196-ab64c4c740c3?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxsaWZlc3R5bGUlMjBwb3J0cmFpdHxlbnwxfHx8fDE3NjA1MTkxMDZ8MA&ixlib=rb-4.1.0&q=80&w=400',

  // 5. Fitness portrait
  'https://images.unsplash.com/photo-1609846685336-9cb06880bb48?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmaXRuZXNzJTIwcG9ydHJhaXR8ZW58MXx8fHwxNzYwNDg1ODcwfDA&ixlib=rb-4.1.0&q=80&w=400',

  // 6. Creative portrait photo
  'https://images.unsplash.com/photo-1597202992582-9ee5c6672095?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjcmVhdGl2ZSUyMHBvcnRyYWl0JTIwcGhvdG98ZW58MXx8fHwxNzYwNTIxMjE0fDA&ixlib=rb-4.1.0&q=80&w=400',

  // 7. Elegant portrait
  'https://images.unsplash.com/photo-1640876305588-dbdab5869200?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxlbGVnYW50JTIwcG9ydHJhaXR8ZW58MXx8fHwxNzYwNTA5NjQ1fDA&ixlib=rb-4.1.0&q=80&w=400',

  // 8. Casual portrait photo
  'https://images.unsplash.com/photo-1607664919395-9ee609a88ba7?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjYXN1YWwlMjBwb3J0cmFpdCUyMHBob3RvfGVufDF8fHx8MTc2MDUyMTIxM3ww&ixlib=rb-4.1.0&q=80&w=400',

  // 9. Outdoor portrait
  'https://images.unsplash.com/photo-1680557345345-6f9ef109d252?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxvdXRkb29yJTIwcG9ydHJhaXR8ZW58MXx8fHwxNzYwNTIxMjE3fDA&ixlib=rb-4.1.0&q=80&w=400',

  // 10. Studio portrait
  'https://images.unsplash.com/photo-1636379688556-f9cc75dca5bc?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzdHVkaW8lMjBwb3J0cmFpdHxlbnwxfHx8fDE3NjA0MzEwMzh8MA&ixlib=rb-4.1.0&q=80&w=400',

  // 11. Portrait headshot professional
  'https://images.unsplash.com/photo-1627161683077-e34782c24d81?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwb3J0cmFpdCUyMGhlYWRzaG90JTIwcHJvZmVzc2lvbmFsfGVufDF8fHx8MTc2MDUyMjU3Mnww&ixlib=rb-4.1.0&q=80&w=400',

  // 12. Fashion model photo
  'https://images.unsplash.com/photo-1589351189946-b8eb5e170ba6?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmYXNoaW9uJTIwbW9kZWwlMjBwaG90b3xlbnwxfHx8fDE3NjA1MjI1NzJ8MA&ixlib=rb-4.1.0&q=80&w=400',

  // 13. Business portrait man
  'https://images.unsplash.com/photo-1560250097-0b93528c311a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxidXNpbmVzcyUyMHBvcnRyYWl0JTIwbWFufGVufDF8fHx8MTc2MDUyMjU3M3ww&ixlib=rb-4.1.0&q=80&w=400',

  // 14. Woman professional headshot
  'https://images.unsplash.com/photo-1655249481446-25d575f1c054?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx3b21hbiUyMHByb2Zlc3Npb25hbCUyMGhlYWRzaG90fGVufDF8fHx8MTc2MDUyMjU3M3ww&ixlib=rb-4.1.0&q=80&w=400',

  // 15. Lifestyle portrait outdoor
  'https://images.unsplash.com/photo-1607880609114-742ed2638069?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxsaWZlc3R5bGUlMjBwb3J0cmFpdCUyMG91dGRvb3J8ZW58MXx8fHwxNzYwNTIyNTczfDA&ixlib=rb-4.1.0&q=80&w=400',
];
```

---

### 2. CATEGORYSHOWCASE (16 catégories)

**Fichier** : `/components/CategoryShowcase.tsx`  
**Lignes** : 13-238

#### Catégorie 1 : Professional (AI Headshots)
```tsx
images: [
  'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=400&h=500&fit=crop',
  'https://images.unsplash.com/photo-1560250097-0b93528c311a?w=400&h=500&fit=crop'
]
```

#### Catégorie 2 : LinkedIn Headshots
```tsx
images: [
  'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=500&fit=crop',
  'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=400&h=500&fit=crop'
]
```

#### Catégorie 3 : Tinder Photos
```tsx
images: [
  image_ffe26301c2af5df48a3eace6ad54f9fb2585a75c, // Figma Asset
  'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?w=400&h=500&fit=crop'
]
```

#### Catégorie 4 : Instagram Influencer
```tsx
images: [
  'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400&h=500&fit=crop',
  'https://images.unsplash.com/photo-1488426862026-3ee34a7d66df?w=400&h=500&fit=crop'
]
```

#### Catégorie 5 : Model (AI Model Photo)
```tsx
images: [
  image_ffe26301c2af5df48a3eace6ad54f9fb2585a75c, // Figma Asset
  'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=400&h=500&fit=crop'
]
```

#### Catégorie 6 : Glamour Photography
```tsx
images: [
  'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=400&h=500&fit=crop',
  'https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?w=400&h=500&fit=crop'
]
```

#### Catégorie 7 : Realistic (AI Realistic Photo Creator)
```tsx
images: [
  'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400&h=500&fit=crop',
  'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?w=400&h=500&fit=crop'
]
```

#### Catégorie 8 : AI Influencer Generator
```tsx
images: [
  'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=400&h=500&fit=crop',
  'https://images.unsplash.com/photo-1509967419530-da38b4704bc6?w=400&h=500&fit=crop'
]
```

#### Catégorie 9 : Luxury Lifestyle
```tsx
images: [
  'https://images.unsplash.com/photo-1469334031218-e382a71b716b?w=400&h=500&fit=crop',
  'https://images.unsplash.com/photo-1501594907352-04cda38ebc29?w=400&h=500&fit=crop'
]
```

#### Catégorie 10 : Selfie (AI Selfie Generator)
```tsx
images: [
  'https://images.unsplash.com/photo-1488426862026-3ee34a7d66df?w=400&h=500&fit=crop',
  'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=400&h=500&fit=crop'
]
```

#### Catégorie 11 : Beach & Bikini
```tsx
images: [
  'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=400&h=500&fit=crop',
  'https://images.unsplash.com/photo-1519046904884-53103b34b206?w=400&h=500&fit=crop'
]
```

#### Catégorie 12 : Fitness Influencer
```tsx
images: [
  'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=400&h=500&fit=crop',
  'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=400&h=500&fit=crop'
]
```

#### Catégorie 13 : Travel Photography
```tsx
images: [
  'https://images.unsplash.com/photo-1488646953014-85cb44e25828?w=400&h=500&fit=crop',
  'https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?w=400&h=500&fit=crop'
]
```

#### Catégorie 14 : Corporate Team Headshots
```tsx
images: [
  'https://images.unsplash.com/photo-1560250097-0b93528c311a?w=400&h=500&fit=crop',
  'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=400&h=500&fit=crop'
]
```

#### Catégorie 15 : Portrait (AI Portrait Generator)
```tsx
images: [
  'https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?w=400&h=500&fit=crop',
  'https://images.unsplash.com/photo-1509967419530-da38b4704bc6?w=400&h=500&fit=crop'
]
```

#### Catégorie 16 : Dating (AI Dating Photos)
```tsx
images: [
  image_ffe26301c2af5df48a3eace6ad54f9fb2585a75c, // Figma Asset
  'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=500&fit=crop'
]
```

---

### 3. CATEGORYEXAMPLESDATA (7 catégories × 8 photos)

**Fichier** : `/components/categoryExamplesData.ts`

#### ai-headshots (8 photos)
```tsx
photos: [
  'https://images.unsplash.com/photo-1576558656222-ba66febe3dec?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwcm9mZXNzaW9uYWwlMjBoZWFkc2hvdCUyMHBvcnRyYWl0fGVufDF8fHx8MTc2MDU4Mjc4Nnww&ixlib=rb-4.1.0&q=80&w=1080',
  'https://images.unsplash.com/photo-1543132220-a79e3529067a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxidXNpbmVzcyUyMHBvcnRyYWl0JTIwc3R1ZGlvfGVufDF8fHx8MTc2MDY5Mzg0OHww&ixlib=rb-4.1.0&q=80&w=1080',
  'https://images.unsplash.com/photo-1758599543120-4e462429a4d7?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjb3Jwb3JhdGUlMjBoZWFkc2hvdCUyMHdvbWFufGVufDF8fHx8MTc2MDY5Mzg0OXww&ixlib=rb-4.1.0&q=80&w=1080',
  'https://images.unsplash.com/photo-1560250097-0b93528c311a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwcm9mZXNzaW9uYWwlMjBwb3J0cmFpdCUyMHBob3RvfGVufDF8fHx8MTc2MDUyMjE5M3ww&ixlib=rb-4.1.0&q=80&w=400',
  'https://images.unsplash.com/photo-1719257751404-1dea075324bd?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxidXNpbmVzcyUyMGhlYWRzaG90fGVufDF8fHx8MTc2MDUyMjE5M3ww&ixlib=rb-4.1.0&q=80&w=400',
  'https://images.unsplash.com/photo-1655249481446-25d575f1c054?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx3b21hbiUyMHByb2Zlc3Npb25hbCUyMGhlYWRzaG90fGVufDF8fHx8MTc2MDUyMjU3M3ww&ixlib=rb-4.1.0&q=80&w=400',
  'https://images.unsplash.com/photo-1627161683077-e34782c24d81?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwb3J0cmFpdCUyMGhlYWRzaG90JTIwcHJvZmVzc2lvbmFsfGVufDF8fHx8MTc2MDUyMjU3Mnww&ixlib=rb-4.1.0&q=80&w=400',
  'https://images.unsplash.com/photo-1560250097-0b93528c311a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxidXNpbmVzcyUyMHBvcnRyYWl0JTIwbWFufGVufDF8fHx8MTc2MDUyMjU3M3ww&ixlib=rb-4.1.0&q=80&w=400',
]
```

#### ai-model-photo (8 photos)
```tsx
photos: [
  'https://images.unsplash.com/photo-1620818563803-e24c9325c7ae?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmYXNoaW9uJTIwbW9kZWwlMjBwb3J0cmFpdHxlbnwxfHx8fDE3NjA2MDM4NzZ8MA&ixlib=rb-4.1.0&q=80&w=1080',
  'https://images.unsplash.com/photo-1646805925007-510be75f20f7?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxlZGl0b3JpYWwlMjBmYXNoaW9uJTIwcGhvdG98ZW58MXx8fHwxNzYwNjkzODUwfDA&ixlib=rb-4.1.0&q=80&w=1080',
  'https://images.unsplash.com/photo-1725892604300-1b9277b91f43?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxydW53YXklMjBtb2RlbCUyMGVsZWdhbnR8ZW58MXx8fHwxNzYwNjkzODUwfDA&ixlib=rb-4.1.0&q=80&w=1080',
  'https://images.unsplash.com/photo-1717765697681-5a160db970d5?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmYXNoaW9uJTIwbW9kZWwlMjBwb3J0cmFpdCUyMHN0dWRpb3xlbnwxfHx8fDE3NTk5NzUxMDF8MA&ixlib=rb-4.1.0&q=80&w=1080',
  'https://images.unsplash.com/photo-1726232409367-04682eb856a3?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxydW53YXklMjBtb2RlbCUyMGVsZWdhbnR8ZW58MXx8fHwxNzYwMDE5NDQwfDA&ixlib=rb-4.1.0&q=80&w=1080',
  'https://images.unsplash.com/photo-1643387848945-da63360662f4?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzdHJlZXR3ZWFyJTIwZmFzaGlvbiUyMG1vZGVsfGVufDF8fHx8MTc1OTkwMzY3NHww&ixlib=rb-4.1.0&q=80&w=1080',
  'https://images.unsplash.com/photo-1634796435815-4e05719574ed?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb2RlbCUyMHBob3RvZ3JhcGh5JTIwbWluaW1hbHxlbnwxfHx8fDE3NjAwMTk0MzZ8MA&ixlib=rb-4.1.0&q=80&w=1080',
  'https://images.unsplash.com/photo-1589351189946-b8eb5e170ba6?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmYXNoaW9uJTIwbW9kZWwlMjBwaG90b3xlbnwxfHx8fDE3NjA1MjI1NzJ8MA&ixlib=rb-4.1.0&q=80&w=400',
]
```

#### ai-dating-photos (8 photos)
```tsx
photos: [
  'https://images.unsplash.com/photo-1624793442524-394cb45008d2?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxkYXRpbmclMjBwcm9maWxlJTIwcGhvdG98ZW58MXx8fHwxNzYwNjkzODUxfDA&ixlib=rb-4.1.0&q=80&w=1080',
  'https://images.unsplash.com/photo-1628423499545-bd0b06cbffbf?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhdHRyYWN0aXZlJTIwcG9ydHJhaXQlMjBjYXN1YWx8ZW58MXx8fHwxNzYwNjkzODUxfDA&ixlib=rb-4.1.0&q=80&w=1080',
  'https://images.unsplash.com/photo-1673216447991-4fe7f55afdb5?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxvdXRkb29yJTIwcG9ydHJhaXQlMjBsaWZlc3R5bGV8ZW58MXx8fHwxNzYwNjkzODUxfDA&ixlib=rb-4.1.0&q=80&w=1080',
  'https://images.unsplash.com/photo-1653419403196-ab64c4c740c3?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxsaWZlc3R5bGUlMjBwb3J0cmFpdHxlbnwxfHx8fDE3NjA1MTkxMDZ8MA&ixlib=rb-4.1.0&q=80&w=400',
  'https://images.unsplash.com/photo-1607664919395-9ee609a88ba7?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjYXN1YWwlMjBwb3J0cmFpdCUyMHBob3RvfGVufDF8fHx8MTc2MDUyMTIxM3ww&ixlib=rb-4.1.0&q=80&w=400',
  'https://images.unsplash.com/photo-1680557345345-6f9ef109d252?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxvdXRkb29yJTIwcG9ydHJhaXR8ZW58MXx8fHwxNzYwNTIxMjE3fDA&ixlib=rb-4.1.0&q=80&w=400',
  'https://images.unsplash.com/photo-1607880609114-742ed2638069?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxsaWZlc3R5bGUlMjBwb3J0cmFpdCUyMG91dGRvb3J8ZW58MXx8fHwxNzYwNTIyNTczfDA&ixlib=rb-4.1.0&q=80&w=400',
  'https://images.unsplash.com/photo-1581093458791-9d42e7d44e1f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx1cmJhbiUyMGZhc2hpb24lMjBwb3J0cmFpdHxlbnwxfHx8fDE3NjA1MjIxOTN8MA&ixlib=rb-4.1.0&q=80&w=400',
]
```

#### ai-fitness-photos (8 photos)
```tsx
photos: [
  'https://images.unsplash.com/photo-1618355281686-2b622387ada4?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmaXRuZXNzJTIwYXRobGV0ZSUyMHBob3RvfGVufDF8fHx8MTc2MDY5Mzg1MXww&ixlib=rb-4.1.0&q=80&w=1080',
  'https://images.unsplash.com/photo-1612576686359-431e062768ac?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxneW0lMjB3b3Jrb3V0JTIwcG9ydHJhaXR8ZW58MXx8fHwxNzYwNjMzOTA3fDA&ixlib=rb-4.1.0&q=80&w=1080',
  'https://images.unsplash.com/photo-1609202294447-002f37886769?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhdGhsZXRpYyUyMGJvZHklMjBmaXRuZXNzfGVufDF8fHx8MTc2MDY5Mzg1Mnww&ixlib=rb-4.1.0&q=80&w=1080',
  'https://images.unsplash.com/photo-1609846685336-9cb06880bb48?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmaXRuZXNzJTIwcG9ydHJhaXR8ZW58MXx8fHwxNzYwNDg1ODcwfDA&ixlib=rb-4.1.0&q=80&w=400',
  'https://images.unsplash.com/photo-1597202992582-9ee5c6672095?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjcmVhdGl2ZSUyMHBvcnRyYWl0JTIwcGhvdG98ZW58MXx8fHwxNzYwNTIxMjE0fDA&ixlib=rb-4.1.0&q=80&w=400',
  'https://images.unsplash.com/photo-1640876305588-dbdab5869200?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxlbGVnYW50JTIwcG9ydHJhaXR8ZW58MXx8fHwxNzYwNTA5NjQ1fDA&ixlib=rb-4.1.0&q=80&w=400',
  'https://images.unsplash.com/photo-1636379688556-f9cc75dca5bc?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzdHVkaW8lMjBwb3J0cmFpdHxlbnwxfHx8fDE3NjA0MzEwMzh8MA&ixlib=rb-4.1.0&q=80&w=400',
  'https://images.unsplash.com/photo-1618355281686-2b622387ada4?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmaXRuZXNzJTIwYXRobGV0ZSUyMHBob3RvfGVufDF8fHx8MTc2MDY5Mzg1MXww&ixlib=rb-4.1.0&q=80&w=400',
]
```

#### ai-selfie-generator (8 photos)
```tsx
photos: [
  'https://images.unsplash.com/photo-1460439357824-36791fba1659?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzZWxmaWUlMjBwb3J0cmFpdCUyMG5hdHVyYWx8ZW58MXx8fHwxNzYwNjkzODUzfDA&ixlib=rb-4.1.0&q=80&w=1080',
  'https://images.unsplash.com/photo-1756463113142-5017fc33f8ae?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjYXN1YWwlMjBzZWxmaWUlMjBzdHlsZXxlbnwxfHx8fDE3NjA2OTM4NTN8MA&ixlib=rb-4.1.0&q=80&w=1080',
  'https://images.unsplash.com/photo-1662695089339-a2c24231a3ac?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjYXN1YWwlMjBzZWxmaWUlMjBiZWZvcmV8ZW58MXx8fHwxNzYwMDE5NDM4fDA&ixlib=rb-4.1.0&q=80&w=1080',
  'https://images.unsplash.com/photo-1597202992582-9ee5c6672095?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjcmVhdGl2ZSUyMHBvcnRyYWl0JTIwcGhvdG98ZW58MXx8fHwxNzYwNTIxMjE0fDA&ixlib=rb-4.1.0&q=80&w=400',
  'https://images.unsplash.com/photo-1607664919395-9ee609a88ba7?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjYXN1YWwlMjBwb3J0cmFpdCUyMHBob3RvfGVufDF8fHx8MTc2MDUyMTIxM3ww&ixlib=rb-4.1.0&q=80&w=400',
  'https://images.unsplash.com/photo-1680557345345-6f9ef109d252?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxvdXRkb29yJTIwcG9ydHJhaXR8ZW58MXx8fHwxNzYwNTIxMjE3fDA&ixlib=rb-4.1.0&q=80&w=400',
  'https://images.unsplash.com/photo-1636379688556-f9cc75dca5bc?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzdHVkaW8lMjBwb3J0cmFpdHxlbnwxfHx8fDE3NjA0MzEwMzh8MA&ixlib=rb-4.1.0&q=80&w=400',
  'https://images.unsplash.com/photo-1460439357824-36791fba1659?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzZWxmaWUlMjBwb3J0cmFpdCUyMG5hdHVyYWx8ZW58MXx8fHwxNzYwNjkzODUzfDA&ixlib=rb-4.1.0&q=80&w=400',
]
```

#### ai-portrait-generator (8 photos)
```tsx
photos: [
  'https://images.unsplash.com/photo-1648654677295-1d32fb376d03?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwb3J0cmFpdCUyMHBob3RvZ3JhcGh5JTIwYXJ0aXN0aWN8ZW58MXx8fHwxNzYwNjkzODU0fDA&ixlib=rb-4.1.0&q=80&w=1080',
  'https://images.unsplash.com/photo-1651021467703-22fa2a9ce012?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzdHVkaW8lMjBwb3J0cmFpdCUyMGNyZWF0aXZlfGVufDF8fHx8MTc2MDY5Mzg1NHww&ixlib=rb-4.1.0&q=80&w=1080',
  'https://images.unsplash.com/photo-1598382143506-2ac06c28d203?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxyZWFsaXN0aWMlMjBwaG90byUyMHBvcnRyYWl0fGVufDF8fHx8MTc2MDY5Mzg1NHww&ixlib=rb-4.1.0&q=80&w=1080',
  'https://images.unsplash.com/photo-1636379688556-f9cc75dca5bc?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzdHVkaW8lMjBwb3J0cmFpdHxlbnwxfHx8fDE3NjA0MzEwMzh8MA&ixlib=rb-4.1.0&q=80&w=400',
  'https://images.unsplash.com/photo-1597202992582-9ee5c6672095?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjcmVhdGl2ZSUyMHBvcnRyYWl0JTIwcGhvdG98ZW58MXx8fHwxNzYwNTIxMjE0fDA&ixlib=rb-4.1.0&q=80&w=400',
  'https://images.unsplash.com/photo-1640876305588-dbdab5869200?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxlbGVnYW50JTIwcG9ydHJhaXR8ZW58MXx8fHwxNzYwNTA5NjQ1fDA&ixlib=rb-4.1.0&q=80&w=400',
  'https://images.unsplash.com/photo-1627161683077-e34782c24d81?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwb3J0cmFpdCUyMGhlYWRzaG90JTIwcHJvZmVzc2lvbmFsfGVufDF8fHx8MTc2MDUyMjU3Mnww&ixlib=rb-4.1.0&q=80&w=400',
  'https://images.unsplash.com/photo-1648654677295-1d32fb376d03?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwb3J0cmFpdCUyMHBob3RvZ3JhcGh5JTIwYXJ0aXN0aWN8ZW58MXx8fHwxNzYwNjkzODU0fDA&ixlib=rb-4.1.0&q=80&w=400',
]
```

#### ai-realistic-photo (8 photos)
```tsx
photos: [
  'https://images.unsplash.com/photo-1598382143506-2ac06c28d203?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxyZWFsaXN0aWMlMjBwaG90byUyMHBvcnRyYWl0fGVufDF8fHx8MTc2MDY5Mzg1NHww&ixlib=rb-4.1.0&q=80&w=1080',
  'https://images.unsplash.com/photo-1576558656222-ba66febe3dec?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwcm9mZXNzaW9uYWwlMjBoZWFkc2hvdCUyMHBvcnRyYWl0fGVufDF8fHx8MTc2MDU4Mjc4Nnww&ixlib=rb-4.1.0&q=80&w=1080',
  'https://images.unsplash.com/photo-1673216447991-4fe7f55afdb5?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxvdXRkb29yJTIwcG9ydHJhaXQlMjBsaWZlc3R5bGV8ZW58MXx8fHwxNzYwNjkzODUxfDA&ixlib=rb-4.1.0&q=80&w=1080',
  'https://images.unsplash.com/photo-1651021467703-22fa2a9ce012?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzdHVkaW8lMjBwb3J0cmFpdCUyMGNyZWF0aXZlfGVufDF8fHx8MTc2MDY5Mzg1NHww&ixlib=rb-4.1.0&q=80&w=1080',
  'https://images.unsplash.com/photo-1560250097-0b93528c311a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwcm9mZXNzaW9uYWwlMjBwb3J0cmFpdCUyMHBob3RvfGVufDF8fHx8MTc2MDUyMjE5M3ww&ixlib=rb-4.1.0&q=80&w=400',
  'https://images.unsplash.com/photo-1640876305588-dbdab5869200?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxlbGVnYW50JTIwcG9ydHJhaXR8ZW58MXx8fHwxNzYwNTA5NjQ1fDA&ixlib=rb-4.1.0&q=80&w=400',
  'https://images.unsplash.com/photo-1597202992582-9ee5c6672095?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjcmVhdGl2ZSUyMHBvcnRyYWl0JTIwcGhvdG98ZW58MXx8fHwxNzYwNTIxMjE0fDA&ixlib=rb-4.1.0&q=80&w=400',
  'https://images.unsplash.com/photo-1636379688556-f9cc75dca5bc?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzdHVkaW8lMjBwb3J0cmFpdHxlbnwxfHx8fDE3NjA0MzEwMzh8MA&ixlib=rb-4.1.0&q=80&w=400',
]
```

---

### 4. BEFOREAFTERTRANSFORMATION (5 Assets Figma)

**Fichier** : `/components/BeforeAfterTransformation.tsx`  
**Lignes** : 6-10

```tsx
// Before photos (4 selfies)
import selfie1 from 'figma:asset/0add018c10f3889f2c712223ec4a093b5ddf753a.png';
import selfie2 from 'figma:asset/2c508c4e08485a8f3e97314d1e81a5ddf454e5a1.png';
import selfie3 from 'figma:asset/0690a5805cd67144f4f9f4968e8da6dc518fa63d.png';
import selfie4 from 'figma:asset/e5d9a2a1cdcb17f07c69550c0cd20071344f5cec.png';

// After photo (AI result)
import aiResult from 'figma:asset/122dcd2ebe2b9d58e158d5aa006fd43d2ea55ea8.png';
```

---

### RÉCAPITULATIF

| Composant | URLs Unsplash | Assets Figma | Total |
|-----------|---------------|--------------|-------|
| ScrollingMosaic | 15 | 0 | 15 |
| CategoryShowcase | 29 | 3 | 32 |
| CategoryExamplesData | 56 | 0 | 56 |
| BeforeAfterTransformation | 0 | 5 | 5 |
| App.tsx | 4 | 0 | 4 |
| **TOTAL** | **104** | **8** | **112** |

---

<a name="supabase"></a>
## 📁 STRUCTURE SUPABASE

### Bucket : ai_gallery (PUBLIC)

```
ai_gallery/
└── categories/
    ├── beach/
    │   ├── 00.jpg
    │   ├── 01.jpg
    │   └── ... (max 1000)
    ├── business/
    ├── halloween/
    ├── christmas/
    ├── diwali/
    ├── casual/
    ├── dating/
    ├── fitness/
    ├── professional/
    ├── linkedin/
    ├── tinder/
    ├── instagram/
    ├── model/
    ├── glamour/
    ├── realistic/
    ├── portrait/
    ├── selfie/
    └── headshot/
```

### Format URL

```
https://[PROJECT_ID].supabase.co/storage/v1/object/public/ai_gallery/categories/[SLUG]/[FILENAME]
```

**Exemple** :
```
https://abcdefg.supabase.co/storage/v1/object/public/ai_gallery/categories/beach/00.jpg
```

### ⚠️ IMPORTANT : Bucket DOIT être PUBLIC

**Vérifier** :
```sql
SELECT name, public FROM storage.buckets WHERE name = 'ai_gallery';
```

**Si privé, le rendre public** :
```sql
UPDATE storage.buckets SET public = true WHERE name = 'ai_gallery';
```

---

<a name="flux"></a>
## 🔄 FLUX DE RÉCUPÉRATION

### ScrollingMosaic

```
1. useEffect() au mount
2. fetchGalleryPhotos()
   ├─ Liste bucket root: supabase.storage.from('ai_gallery').list('')
   ├─ Trouve folders avec images
   ├─ Pour chaque folder:
   │  └─ Liste fichiers (limit: 1000)
   ├─ Mélange photos
   ├─ Si >= 1 photo: Mix Supabase + fallback
   └─ Si 0 photo: 100% fallback
3. setMosaicPhotos(finalPhotos)
```

**Logique Fallback** :
- Si >= 1 photo Supabase → Utilise Supabase + complète avec fallback si < 15
- Si 0 photo → Utilise 100% fallback (15 URLs Unsplash)

---

<a name="modification"></a>
## 🛠️ GUIDE MODIFICATION

### Remplacer une Photo Unsplash

**1. Trouve l'URL dans ce document** :
```bash
Ctrl+F → "photo-1560250097-0b93528c311a"
```

**2. Remplace** :
```tsx
// Avant
'https://images.unsplash.com/photo-1560250097-0b93528c311a?...'

// Après
'https://images.unsplash.com/photo-NOUVELLE_ID?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=400'
```

### Ajouter une Photo

**Dans ScrollingMosaic** (ligne 30) :
```tsx
const fallbackPhotos = [
  // ... 15 URLs existantes
  'https://images.unsplash.com/photo-NOUVELLE?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=400',
];
```

**Dans CategoryShowcase** :
```tsx
{
  id: 'new-category',
  emoji: '🎨',
  title: 'New Category',
  images: [
    'https://images.unsplash.com/photo-XXX?w=400&h=500&fit=crop',
    'https://images.unsplash.com/photo-YYY?w=400&h=500&fit=crop'
  ]
}
```

### Ajouter une Catégorie Complète

**1. CategoryShowcase** (ajouter à l'array categories) :
```tsx
{
  id: 'christmas',
  emoji: '🎄',
  title: 'Christmas Photos',
  description: '...',
  images: ['URL1', 'URL2'],
  photoCount: '30 PHOTOS',
  weeklyCount: '20K RAN THIS WEEK',
  gradient: 'from-red-500/20 to-green-500/20',
  badge: 'bg-red-500'
}
```

**2. CategoryExamplesData** :
```tsx
'christmas': {
  photos: [
    'URL1', 'URL2', 'URL3', 'URL4',
    'URL5', 'URL6', 'URL7', 'URL8'
  ]
}
```

**3. Supabase** :
```
Créer dossier: ai_gallery/categories/christmas/
Uploader: 00.jpg, 01.jpg, 02.jpg, etc.
```

---

<a name="debugging"></a>
## 🔍 DEBUGGING

### Photos ne s'affichent pas ?

**1. Check console logs** :
```
✅ [ScrollingMosaic] Loaded 45 photos from gallery
❌ [ScrollingMosaic] No photos found in bucket!
```

**2. Vérifie bucket Supabase** :
- Dashboard > Storage > `ai_gallery`
- Bucket doit être **PUBLIC** ✅
- Doit contenir `categories/{slug}/`

**3. Test URL directe** :
```
https://[PROJECT_ID].supabase.co/storage/v1/object/public/ai_gallery/categories/beach/00.jpg
```

**Si 404** :
- Bucket n'existe pas
- Bucket est privé
- Fichier n'existe pas
- Chemin incorrect

### Logs de Diagnostic

**Supabase photos trouvées** :
```
🔍 [ScrollingMosaic] Starting gallery fetch...
📁 [ScrollingMosaic] Found X category folders
✅ [ScrollingMosaic] Added photo: https://...
📸 [ScrollingMosaic] Total photos collected: 45
✅ [ScrollingMosaic] Loaded 45 photos (15 with fallbacks)
```

**Aucune photo Supabase** :
```
⚠️ [ScrollingMosaic] No photos found in bucket!
   Check: 1) Bucket exists, 2) Bucket public, 3) Photos uploaded
```

### Vérifier Bucket SQL

```sql
-- Check si bucket existe et est public
SELECT name, public FROM storage.buckets WHERE name = 'ai_gallery';

-- Rendre public si nécessaire
UPDATE storage.buckets SET public = true WHERE name = 'ai_gallery';
```

---

## ✅ CHECKLIST COMPLÈTE

- [x] 112 photos hardcodées documentées
- [x] 15 URLs ScrollingMosaic
- [x] 32 URLs CategoryShowcase (16 catégories)
- [x] 56 URLs CategoryExamplesData (7 catégories)
- [x] 5 Assets Figma BeforeAfter
- [x] Structure Supabase documentée
- [x] Flux de récupération expliqué
- [x] Guide modification complet
- [x] Guide debugging complet

---

**FIN DU GUIDE COMPLET** 📚

Ce document contient TOUT ce qu'il faut savoir sur les photos de PhotoGlow. Un seul fichier, toutes les infos.
