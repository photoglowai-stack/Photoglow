# 🚀 Guide de Génération des Images de Catégories

## 📋 Pré-requis

Avant de générer les images, assurez-vous que :

- ✅ Supabase est configuré (URL + SERVICE_ROLE_KEY)
- ✅ Pollinations API fonctionne (optionnel: TOKEN)
- ✅ Les 18 catégories sont définies dans `allCategoriesPromptsConfig.ts`
- ✅ Les 295 prompts sont validés

---

## 🏗️ Étape 1 : Setup Backend (One-time)

### 1.1 Exécuter le SQL Setup

**Bonne nouvelle** : Tu utilises tes buckets existants (`ai_gallery` et `ideas_examples`) !

Connectez-vous à votre dashboard Supabase et exécutez le fichier SQL :

```bash
# Copier le contenu de :
/sql/extend_ideas_examples_for_categories.sql

# Puis l'exécuter dans :
Supabase Dashboard > SQL Editor > New Query
```

Ce script va :
- ✅ Étendre la table `ideas_examples` avec 5 nouvelles colonnes
- ✅ Créer les indexes pour performance
- ✅ Créer les fonctions helper SQL
- ✅ Vérifier automatiquement la configuration

### 1.2 Vérifier la Configuration

```bash
# Test de l'endpoint
curl http://localhost:3000/api/v1/categories/generate-batch?debug=1

# Réponse attendue :
{
  "ok": true,
  "endpoint": "/api/v1/categories/generate-batch",
  "has_supabase_url": true,
  "has_service_role": true,
  "bucket_categories": "ai_gallery",
  "note": "Using existing bucket ai_gallery and table ideas_examples"
}
```

---

## 🧪 Étape 2 : Test avec 1 Catégorie

Avant de générer les 300 images, testez avec une seule catégorie :

```bash
# Générer seulement 5 images de test (mode test)
npx ts-node scripts/generate-all-category-images.ts --test --category=ai-headshots

# Résultat attendu :
# 📸 Generating 5 images for category: ai-headshots
# ✅ [0] Success in 2435ms | https://...
# ✅ [1] Success in 2512ms | https://...
# ✅ Category completed in 13s
# Succeeded: 5/5
```

### Vérifier les Résultats

1. **Dans Supabase Dashboard** :
   ```sql
   SELECT * FROM ideas_examples WHERE category_id = 'ai-headshots';
   ```

2. **Dans Storage** :
   - Allez dans Storage > ai_gallery > categories
   - Vérifiez que les images sont là : `categories/ai-headshots/00.jpg`, etc.

3. **Tester les URLs** :
   - Ouvrez une URL d'image dans le navigateur
   - Vérifiez que l'image s'affiche correctement

---

## 🎨 Étape 3 : Validation Qualité

Avant de générer toutes les images, validez la qualité :

### 3.1 Vérifier Visuellement

Ouvrez 5-10 images générées et vérifiez :
- ✅ La qualité est professionnelle
- ✅ Les visages sont réalistes (pas cartoon)
- ✅ L'aspect ratio est correct
- ✅ Le style correspond au prompt

### 3.2 Ajuster les Prompts si Nécessaire

Si la qualité n'est pas satisfaisante :

```typescript
// Dans /components/allCategoriesPromptsConfig.ts
// Modifier les prompts pour améliorer la qualité

// AVANT (trop court)
prompt: "Professional headshot"

// APRÈS (détaillé, 120-160 caractères)
prompt: "Professional corporate executive headshot portrait, clean neutral background, confident business demeanor, formal business attire, studio lighting setup, sharp professional focus"
```

---

## 🚀 Étape 4 : Génération Complète

Une fois les tests validés, lancez la génération complète :

### Option A : Toutes les Catégories (300 images)

```bash
# Génération complète de TOUTES les catégories
npx ts-node scripts/generate-all-category-images.ts

# Durée estimée : ~10-15 minutes
# Résultat : 300 images générées
```

### Option B : Par Catégorie

```bash
# Générer une seule catégorie
npx ts-node scripts/generate-all-category-images.ts --category=ai-dating-photos

# Puis la suivante
npx ts-node scripts/generate-all-category-images.ts --category=ai-model-photo
```

### Option C : Mode Dry-Run (Simulation)

```bash
# Tester sans générer réellement
npx ts-node scripts/generate-all-category-images.ts --dry-run

# Affiche ce qui serait généré sans consommer d'API
```

---

## 📊 Étape 5 : Monitoring

Pendant la génération, suivez les logs :

```bash
# Console output
🎯 categories.generate-batch | categoryId=ai-headshots | total=15
📦 Processing batch 1/3
🎨 [0] Generating: Corporate Professional Headshot
✅ [0] Success in 2435ms | https://...
🎨 [1] Generating: LinkedIn Profile Photo
✅ [1] Success in 2512ms | https://...
...
✅ categories.generate-batch completed | 15/15 succeeded
```

### Vérifier en Temps Réel

```sql
-- Dans Supabase SQL Editor
-- Compter les images générées
SELECT category_id, COUNT(*) as count 
FROM category_images 
GROUP BY category_id 
ORDER BY category_id;

-- Total
SELECT COUNT(*) FROM category_images;
```

---

## ✅ Étape 6 : Validation Finale

### 6.1 Vérifier les Statistiques

```bash
# Le script génère un fichier JSON avec les stats
cat category-generation-*.json

# Exemple de contenu :
{
  "timestamp": "2025-11-07T10:30:00Z",
  "mode": "production",
  "totalCategories": 18,
  "totalImages": 300,
  "totalGenerated": 298,
  "totalFailed": 2,
  "successRate": "99%",
  "duration": 874,
  "results": [...]
}
```

### 6.2 Vérifier dans Supabase

```sql
-- Statistiques globales
SELECT 
  COUNT(DISTINCT category_id) as categories,
  COUNT(*) as total_images,
  MIN(created_at) as first_image,
  MAX(created_at) as last_image
FROM category_images;

-- Répartition par catégorie
SELECT * FROM count_category_images();
```

### 6.3 Tester les URLs

```bash
# Test rapide
curl -I "https://[PROJECT].supabase.co/storage/v1/object/public/category-images/ai-headshots/00.jpg"

# Réponse attendue : HTTP 200 OK
```

---

## 🔧 Étape 7 : Intégration Frontend

Créer le hook pour utiliser les images :

```typescript
// /hooks/useCategoryImages.ts

import { useEffect, useState } from 'react';
import { createClient } from '@supabase/supabase-js';

export function useCategoryImages(categoryId: string) {
  const [images, setImages] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    const fetchImages = async () => {
      const supabase = createClient(
        process.env.NEXT_PUBLIC_SUPABASE_URL!,
        process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
      );
      
      const { data, error } = await supabase
        .from('category_images')
        .select('*')
        .eq('category_id', categoryId)
        .order('prompt_index', { ascending: true });
      
      if (!error && data) {
        setImages(data);
      }
      setLoading(false);
    };
    
    fetchImages();
  }, [categoryId]);
  
  return { images, loading };
}
```

### Utiliser dans les Composants

```typescript
// Dans CategoryShowcase.tsx ou CategoryPage.tsx

import { useCategoryImages } from '../hooks/useCategoryImages';

function CategoryShowcase() {
  const { images, loading } = useCategoryImages('ai-headshots');
  
  if (loading) return <div>Loading...</div>;
  
  return (
    <div className="grid grid-cols-3 gap-4">
      {images.map((img) => (
        <img 
          key={img.id}
          src={img.image_url} 
          alt={img.prompt_title}
          className="w-full h-auto rounded-lg"
        />
      ))}
    </div>
  );
}
```

---

## 🐛 Troubleshooting

### Erreur : "bucket_not_found"

```bash
# Solution : Créer le bucket manuellement
# Supabase Dashboard > Storage > Create Bucket
# Name: category-images
# Public: Yes
```

### Erreur : "pollinations_failed 429"

Rate limit atteint. Solutions :
- Augmenter le délai entre batches dans le script
- Réduire `BATCH_SIZE` de 5 à 3
- Attendre quelques minutes et relancer

### Erreur : "upload_failed"

Vérifier :
- Les permissions du bucket
- La taille des images (<10MB)
- Le content-type (JPEG/PNG/WebP)

### Images de mauvaise qualité

Améliorer les prompts :
- Ajouter plus de détails (120-160 caractères)
- Éviter les negative prompts
- Utiliser des mots-clés naturels

---

## 📊 Statistiques Estimées

| Métrique | Valeur |
|---|---|
| **Total catégories** | 18 |
| **Total images** | 300 |
| **Temps de génération** | ~10-15 minutes |
| **Taille par image** | ~500KB |
| **Taille totale** | ~150MB |
| **Coût Pollinations** | Gratuit (avec limites) |
| **Success rate attendu** | >95% |

---

## 🎯 Checklist Complète

### Setup
- [ ] SQL setup exécuté dans Supabase
- [ ] Bucket `category-images` créé
- [ ] Table `category_images` créée
- [ ] Endpoint API testé (debug=1)

### Test
- [ ] 1 catégorie testée (5 images)
- [ ] Images visibles dans Storage
- [ ] Métadonnées dans la table
- [ ] Qualité validée visuellement

### Génération
- [ ] Script de génération lancé
- [ ] Monitoring actif
- [ ] Logs sans erreurs majeures
- [ ] 300 images générées

### Validation
- [ ] Statistiques vérifiées
- [ ] Toutes les catégories complètes
- [ ] URLs fonctionnelles
- [ ] Qualité satisfaisante

### Intégration
- [ ] Hook `useCategoryImages` créé
- [ ] Composants migrés
- [ ] Tests frontend OK
- [ ] Performance optimisée

---

## 🎉 Félicitations !

Si vous avez complété toutes les étapes, vous avez maintenant :

✅ **300 images professionnelles** générées automatiquement  
✅ **18 catégories** enrichies avec du contenu réel  
✅ **Système scalable** pour ajouter de nouvelles catégories  
✅ **Architecture robuste** avec métadonnées riches  

**Prochaines étapes** :
- Intégrer les images dans CategoryShowcase
- Remplacer les images hardcodées dans ideasData
- Optimiser le lazy loading
- Ajouter un système de cache

---

**Besoin d'aide ?** Consultez :
- [WORKFLOW.md](./WORKFLOW.md) - Vue d'ensemble du processus
- [COMPLETE_GUIDE.md](./COMPLETE_GUIDE.md) - Guide complet
- [QUICK_START.md](./QUICK_START.md) - Référence rapide
