# 🔄 Workflow - Génération Automatique des Images

## 📊 Vue d'ensemble du Processus

```
┌─────────────────────────────────────────────────────────────┐
│                    CONFIGURATION                             │
│  /components/allCategoriesPromptsConfig.ts                  │
│  ✅ 18 catégories | 295 prompts | 300 images                │
└─────────────────────┬───────────────────────────────────────┘
                      │
                      ↓
┌─────────────────────────────────────────────────────────────┐
│                    VALIDATION                                │
│  /scripts/test-prompts-config.ts                            │
│  ✅ Longueur prompts | ✅ Negative prompts | ✅ Aspect ratios│
└─────────────────────┬───────────────────────────────────────┘
                      │
                      ↓
┌─────────────────────────────────────────────────────────────┐
│                    GÉNÉRATION                                │
│  Pollinations API + FLUX Model                              │
│  📸 Génération de 300 images haute qualité                   │
└─────────────────────┬───────────────────────────────────────┘
                      │
                      ↓
┌─────────────────────────────────────────────────────────────┐
│                    STOCKAGE                                  │
│  Supabase Storage: bucket category-images                   │
│  💾 Stockage sécurisé avec URLs signées                     │
└─────────────────────┬───────────────────────────────────────┘
                      │
                      ↓
┌─────────────────────────────────────────────────────────────┐
│                    INTÉGRATION                               │
│  Frontend: CategoryShowcase + ideasData                     │
│  🎨 Remplacement images hardcodées                          │
└─────────────────────────────────────────────────────────────┘
```

---

## 🔄 Détail du Processus

### Phase 1 : Configuration ✅ TERMINÉ

```typescript
// Fichier: /components/allCategoriesPromptsConfig.ts

export const mainCategories: CategoryConfig[] = [
  {
    id: 'ai-headshots',
    name: 'AI Headshots',
    targetImages: 15,
    promptTemplates: [
      { title: '...', prompt: '...' },
      // ... 14 autres
    ]
  },
  // ... 17 autres catégories
];
```

**Résultat** :
- ✅ 18 catégories définies
- ✅ 295 prompts créés
- ✅ Tous optimisés pour FLUX

---

### Phase 2 : Validation ⏳ EN COURS

```bash
npx ts-node scripts/test-prompts-config.ts
```

**Ce qui est vérifié** :
- ✅ Longueur des prompts (≥120 caractères)
- ✅ Absence de negative prompts
- ✅ Distribution des aspect ratios
- ✅ Structure TypeScript valide
- ✅ Export des statistiques

**Résultat attendu** :
```
✅ 295 prompts valides
✅ 0 negative prompts
✅ 100% des prompts ≥120 caractères
✅ Prêt pour génération
```

---

### Phase 3 : Génération ⏳ À FAIRE

#### Étape 3.1 : Préparation Backend

```sql
-- Créer la table
CREATE TABLE category_images (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  category_id TEXT NOT NULL,
  prompt_title TEXT NOT NULL,
  prompt_text TEXT NOT NULL,
  image_url TEXT NOT NULL,
  created_at TIMESTAMP DEFAULT NOW()
);

-- Créer le bucket
INSERT INTO storage.buckets (id, name, public)
VALUES ('category-images', 'category-images', false);
```

#### Étape 3.2 : Script de Génération

```typescript
// /scripts/generate-category-images.ts

import { getAllCategories } from '../components/allCategoriesPromptsConfig';

for (const category of getAllCategories()) {
  for (const prompt of category.promptTemplates) {
    // 1. Générer l'image via Pollinations
    const imageUrl = await generateImage(prompt.prompt);
    
    // 2. Upload vers Supabase Storage
    const storedUrl = await uploadToSupabase(imageUrl, category.id);
    
    // 3. Sauvegarder les métadonnées
    await saveMetadata(category.id, prompt, storedUrl);
  }
}
```

#### Étape 3.3 : Génération Pollinations

```typescript
function generatePollinationsUrl(prompt: string, options: {
  width: number;
  height: number;
  seed?: number;
}) {
  const encoded = encodeURIComponent(prompt);
  return `https://image.pollinations.ai/prompt/${encoded}?width=${options.width}&height=${options.height}&model=flux&nologo=true&seed=${options.seed || Math.random()}`;
}
```

**Temps estimé** :
- Test (10 images) : ~2 minutes
- Complet (300 images) : ~30-45 minutes

---

### Phase 4 : Stockage ⏳ À FAIRE

#### Architecture Supabase

```
Supabase Storage
└── bucket: category-images/
    ├── ai-headshots/
    │   ├── corporate-professional-1.jpg
    │   ├── linkedin-profile-2.jpg
    │   └── ... (15 images)
    ├── ai-dating-photos/
    │   ├── tinder-profile-1.jpg
    │   └── ... (15 images)
    └── ... (18 catégories)

Database Table: category_images
- id: UUID
- category_id: TEXT
- prompt_title: TEXT
- prompt_text: TEXT
- image_url: TEXT (signed URL)
- created_at: TIMESTAMP
```

**Avantages** :
- ✅ URLs signées sécurisées
- ✅ Métadonnées riches
- ✅ Facile à regénérer
- ✅ Traçabilité complète

---

### Phase 5 : Intégration Frontend ⏳ À FAIRE

#### Créer le Hook

```typescript
// /hooks/useCategoryImages.ts

export function useCategoryImages(categoryId: string) {
  const [images, setImages] = useState<Image[]>([]);
  
  useEffect(() => {
    const fetchImages = async () => {
      const { data } = await supabase
        .from('category_images')
        .select('*')
        .eq('category_id', categoryId);
      setImages(data);
    };
    fetchImages();
  }, [categoryId]);
  
  return images;
}
```

#### Intégrer dans les Composants

```typescript
// /components/CategoryShowcase.tsx

function CategoryShowcase() {
  const images = useCategoryImages('ai-headshots');
  
  return (
    <div>
      {images.map(img => (
        <img src={img.image_url} alt={img.prompt_title} />
      ))}
    </div>
  );
}
```

---

## 📈 Timeline Estimée

```
Semaine 1 : Configuration & Validation
├─ Jour 1-2 : Configuration prompts ✅ FAIT
├─ Jour 3   : Documentation ✅ FAIT
└─ Jour 4-5 : Tests & validation ⏳

Semaine 2 : Génération & Stockage
├─ Jour 1   : Setup Backend Supabase
├─ Jour 2   : Script de génération
├─ Jour 3-4 : Génération test (50 images)
└─ Jour 5   : Génération complète (300 images)

Semaine 3 : Intégration Frontend
├─ Jour 1-2 : Hook useCategoryImages
├─ Jour 3-4 : Migration composants
└─ Jour 5   : Tests & optimisation
```

---

## 🎯 Critères de Succès

### Configuration ✅
- [x] 18 catégories définies
- [x] 295 prompts créés
- [x] Optimisé pour FLUX
- [x] Documentation complète

### Validation ⏳
- [ ] Script de test exécuté
- [ ] 100% des prompts validés
- [ ] Aucune erreur détectée
- [ ] Statistiques exportées

### Génération ⏳
- [ ] Bucket Supabase créé
- [ ] Table créée avec RLS
- [ ] 10 images de test générées
- [ ] Qualité visuelle validée
- [ ] 300 images générées au total

### Intégration ⏳
- [ ] Hook créé et testé
- [ ] CategoryShowcase migré
- [ ] ideasData migré
- [ ] Lazy loading implémenté
- [ ] Performance optimisée

---

## 🔧 Commandes Utiles

### Test & Validation
```bash
# Tester la configuration
npx ts-node scripts/test-prompts-config.ts

# Valider un prompt spécifique
npx ts-node scripts/validate-single-prompt.ts ai-headshots 0
```

### Génération
```bash
# Mode test (10 images)
npx ts-node scripts/generate-test-images.ts

# Une seule catégorie
npx ts-node scripts/generate-single-category.ts ai-headshots

# Toutes les catégories
npx ts-node scripts/generate-all-categories.ts

# Avec monitoring
npx ts-node scripts/generate-all-categories.ts --verbose
```

### Backend
```bash
# Setup Supabase
npm run setup:supabase

# Créer le bucket
npm run create:bucket category-images

# Migrer la table
npm run migrate:category-images
```

---

## 📊 Monitoring & Logs

### Structure des Logs

```
[2025-11-07 10:30:00] START: Generation for category 'ai-headshots'
[2025-11-07 10:30:01] PROMPT 1/15: Corporate Professional Headshot
[2025-11-07 10:30:03] ✅ Generated: https://pollinations.ai/...
[2025-11-07 10:30:05] ✅ Uploaded to Supabase
[2025-11-07 10:30:06] ✅ Metadata saved
...
[2025-11-07 10:35:00] COMPLETE: Category 'ai-headshots' (15 images)
```

### Métriques Importantes

- **Temps par image** : ~2-3 secondes
- **Taux de succès** : >95%
- **Taille moyenne** : ~500KB par image
- **Total estimé** : ~150MB pour 300 images

---

## 🚨 Gestion des Erreurs

### Erreurs Courantes

1. **Rate Limit Pollinations**
   - Retry avec exponential backoff
   - Batch de 10 images à la fois

2. **Upload Supabase échoue**
   - Retry 3 fois
   - Log l'erreur et continuer

3. **Prompt trop court**
   - Validation avant génération
   - Skip et logger

### Strategy de Retry

```typescript
async function generateWithRetry(prompt: string, maxRetries = 3) {
  for (let i = 0; i < maxRetries; i++) {
    try {
      return await generate(prompt);
    } catch (error) {
      if (i === maxRetries - 1) throw error;
      await sleep(1000 * Math.pow(2, i)); // Exponential backoff
    }
  }
}
```

---

## ✅ Checklist de Lancement

### Pré-Génération
- [ ] Configuration testée
- [ ] Backend Supabase prêt
- [ ] Scripts créés et testés
- [ ] Monitoring en place

### Génération
- [ ] Test avec 5-10 images
- [ ] Validation qualité visuelle
- [ ] Lancement génération complète
- [ ] Monitoring actif

### Post-Génération
- [ ] Vérification des 300 images
- [ ] Métadonnées complètes
- [ ] Performance testée
- [ ] Documentation mise à jour

---

## 🎉 Résultat Final

```
✅ 300 images haute qualité
✅ Stockées dans Supabase
✅ Métadonnées complètes
✅ Intégrées dans le frontend
✅ Lazy loading optimisé
✅ Performance < 3s par page
```

**Impact Business** :
- Économie : ~30,000€ de shooting photo
- Temps gagné : ~150 heures
- Conversion : +40% estimé
- SEO : Contenu enrichi pour 18 catégories

---

**🚀 Prêt à lancer la génération ! [Voir le Guide Complet](./COMPLETE_GUIDE.md)**
