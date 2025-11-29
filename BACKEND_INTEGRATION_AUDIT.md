# 🔍 AUDIT COMPLET - SECTIONS MANQUANTES & INTÉGRATION BACKEND

**Date**: 2025-11-28 20:10  
**Focus**: Backend Pollination/Replicate, Sections manquantes, Connexions Supabase

---

## 🎯 DÉCOUVERTES PRINCIPALES

### 1. GÉNÉRATION D'IMAGES ⚠️

**Ce qui existe** :
- ✅ Backend API (`/api/generate-gen4-image.mjs`) - Fonctionnel
- ✅ Modèles supportés :
  - Flux 1.1 Pro (Text-to-Image)
  - Flux Kontext Pro (Image-to-Image)
  - Runway Gen-4 & Gen-4 Turbo
- ✅ Upload vers Supabase
- ✅ Système de crédits
- ✅ Auth Bearer Token

**Ce qui manque côté FRONTEND** :
- ❌ Pas d'interface de génération complète
- ❌ `ExploreModels.tsx` montre juste une liste, sans génération
- ❌ `AIPhotoGenerator.tsx` redirige vers `ExploreModels` (sélection uniquement)
- ❌ Pas de formulaire pour saisir un prompt
- ❌ Pas d'upload d'image de référence (I2I)
- ❌ Pas d'affichage du résultat généré

---

## 📂 COMPOSANTS GÉNÉRATEUR - ÉTAT ACTUEL

### Composants Existants (mais non connectés)

| Fichier | Taille | Rôle Prévu | Connecté? |
|---------|--------|------------|-----------|
| `AIPhotoGenerator.tsx` | 2.8KB | Point d'entrée | ⚠️ Placeholder |
| `ExploreModels.tsx` | 10KB | Liste des modèles | ✅ UI uniquement |
| `CreateModel.tsx` | 33KB | Création de modèles custom | ❓ À vérifier |
| `PreviewModel.tsx` | 30KB | Preview de modèle | ❓ À vérifier |
| `Gen4Panel.tsx` | 12KB | Panel Gen-4 spécifique | ❓ À vérifier |
| `JobsTab.tsx` | 15KB | Historique jobs | ❓ À vérifier |
| `StylesSection.tsx` | 11KB | Sélection de styles | ❓ À vérifier |

---

## 🔌 CONNEXIONS SUPABASE

### Buckets Configurés

```javascript
// Dans /api/generate-gen4-image.mjs
BUCKET_IMAGES  = "generated_images"  // Sortie des générations
BUCKET_UPLOADS = "photos"            // Photos uploadées par l'user
TABLE_META     = "photos_meta"       // Métadonnées des générations
```

### Tables Utilisées

1. **`photos_meta`** - Métadonnées de génération
   ```typescript
   {
     user_id: string,
     mode: "text2img" | "img2img",
     model: string,
     prompt: string,
     aspect_ratio: string,
     seed?: number,
     image_url: string,
     source: string,
     created_at: timestamp
   }
   ```

2. **Credits System** (RPC Functions)
   - `debit_credits(p_user_id, p_amount)`
   - `credit_credits(p_user_id, p_amount)`

---

## ❌ SECTIONS FRONTEND MANQUANTES

### 1. Interface de Génération Complète

**Manque** :
```tsx
// Devrait exister mais n'existe pas :
<GeneratePhotoForm>
  <PromptInput />
  <ModelSelector />
  <AspectRatioSelector />
  <ReferenceImageUpload />  // Pour I2I
  <AdvancedSettings>
    <SeedInput />
    <GuidanceSlider />
    <NegativePromptInput />
  </AdvancedSettings>
  <GenerateButton />
  <ResultDisplay />
</GeneratePhotoForm>
```

**Actuellement** :
- Utilisateur clique "Generator" → Voit juste une liste de modèles
- Clic sur un modèle →... RIEN (pas de page suivante)

---

### 2. Upload & Gestion d'Images de Référence

**API supporte** :
```javascript
// Backend accepte multiple formats
reference_images: [],
image_url: "...",
image_urls: [],
images: [],
image: "...",

// Supporte 3 types d'URLs :
- http(s)://...
- supabase://bucket/path
- storage://bucket/path
```

**Frontend manque** :
- Zone de drag & drop pour upload
- Preview des images uploadées
- Gestion multi-images (jusqu'à 3 pour Gen-4)

---

### 3. Historique des Générations

**Backend enregistre** :
- Toutes les générations dans `photos_meta`
- URLs Supabase durables

**Frontend manque** :
- Page pour voir l'historique
- Gallery des images générées
- Possibilité de re-générer avec mêmes params

---

### 4. Système de Crédits

**Backend implémente** :
- Débit automatique (1 crédit/génération)
- Remboursement si échec

**Frontend manque** :
- Affichage du solde de crédits
- Alerte si crédits insuffisants
- Page d'achat de crédits

---

## 🔧 CE QUI DOIT ÊTRE FAIT

### PRIORITÉ 1 : Interface de Génération Basic

Créer un composant `GeneratorPanel.tsx` :

```tsx
interface GeneratorPanelProps {
  selectedModel: string;
  onBack: () => void;
}

export function GeneratorPanel({ selectedModel, onBack }: GeneratorPanelProps) {
  const [prompt, setPrompt] = useState("");
  const [aspectRatio, setAspectRatio] = useState("1:1");
  const [generatedImage, setGeneratedImage] = useState<string | null>(null);
  const [isGenerating, setIsGenerating] = useState(false);

  const handleGenerate = async () => {
    setIsGenerating(true);
    try {
      const token = await getCurrentUserToken();
      const response = await fetch('/api/generate-gen4-image', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({
          mode: 'text2img',
          model: selectedModel,
          prompt,
          aspect_ratio: aspectRatio
        })
      });
      const data = await response.json();
      if (data.ok) {
        setGeneratedImage(data.image_url);
      }
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <div>
      <textarea 
        value={prompt} 
        onChange={(e) => setPrompt(e.target.value)}
        placeholder="Describe your photo..."
      />
      <select value={aspectRatio} onChange={(e) => setAspectRatio(e.target.value)}>
        <option value="1:1">Square (1:1)</option>
        <option value="16:9">Landscape (16:9)</option>
        <option value="9:16">Portrait (9:16)</option>
      </select>
      <button onClick={handleGenerate} disabled={isGenerating}>
        {isGenerating ? 'Generating...' : 'Generate Photo'}
      </button>
      {generatedImage && (
        <img src={generatedImage} alt="Generated" />
      )}
    </div>
  );
}
```

---

### PRIORITÉ 2 : Connexion ExploreModels → Generator

Actuellement :
```tsx
// ExploreModels.tsx ligne 145
onClick={() => onModelSelect(model.id)}
// → Appelle juste le callback, rien ne se passe
```

Doit devenir :
```tsx
onClick={() => {
  onModelSelect(model.id);
  // Naviguer vers GeneratorPanel
  setCurrentState(`generate-${model.id}`);
}}
```

---

### PRIORITÉ 3 : Upload d'Images de Référence

Créer `ReferenceImageUpload.tsx` :

```tsx
export function ReferenceImageUpload({ onImagesSelected }: Props) {
  const [uploadedImages, setUploadedImages] = useState<string[]>([]);

  const handleUpload = async (files: FileList) => {
    const token = await getCurrentUserToken();
    const userId = await getCurrentUserId();
    
    for (const file of files) {
      // 1. Upload vers Supabase Storage
      const { data, error } = await supabase.storage
        .from('photos')
        .upload(`uploads/${userId}/${Date.now()}_${file.name}`, file);
      
      if (data) {
        // 2. Obtenir l'URL signée
        const { data: signedUrl } = await supabase.storage
          .from('photos')
          .createSignedUrl(data.path, 60 * 15); // 15 min
        
        // 3. Ajouter au state
        setUploadedImages(prev => [...prev, `supabase://${data.path}`]);
      }
    }
    
    onImagesSelected(uploadedImages);
  };

  return (
    <div>
      <input type="file" multiple accept="image/*" onChange={(e) => handleUpload(e.target.files)} />
      {uploadedImages.map(img => <img key={img} src={img} />)}
    </div>
  );
}
```

---

### PRIORITÉ 4 : Affichage du Solde de Crédits

Créer une fonction Supabase RPC :

```sql
CREATE OR REPLACE FUNCTION get_user_credits(p_user_id UUID)
RETURNS INTEGER AS $$
DECLARE
  v_balance INTEGER;
BEGIN
  SELECT balance INTO v_balance
  FROM user_credits
  WHERE user_id = p_user_id;
  
  RETURN COALESCE(v_balance, 0);
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;
```

Puis côté frontend :

```tsx
export function CreditsDisplay() {
  const [credits, setCredits] = useState(0);

  useEffect(() => {
    async function loadCredits() {
      const { data } = await supabase.rpc('get_user_credits', {
        p_user_id: (await supabase.auth.getUser()).data.user?.id
      });
      setCredits(data || 0);
    }
    loadCredits();
  }, []);

  return (
    <div>
      <Sparkles /> {credits} Credits
    </div>
  );
}
```

---

## 📊 CHECKLIST COMPLÈTE

### Backend (Déjà OK ✅)
- [x] API `/api/generate-gen4-image.mjs`
- [x] Support Flux T2I
- [x] Support Flux I2I (Kontext)
- [x] Support Runway Gen-4
- [x] Upload vers Supabase
- [x] Système de crédits
- [x] Métadonnées `photos_meta`

### Frontend (À FAIRE ❌)
- [ ] Interface de génération avec prompt
- [ ] Sélecteur d'aspect ratio
- [ ] Upload d'images de référence
- [ ] Affichage du résultat généré
- [ ] Historique des générations
- [ ] Affichage du solde de crédits
- [ ] Settings avancés (seed, guidance, negative prompt)
- [ ] Connexion `ExploreModels` → `GeneratorPanel`
- [ ] Page de gestion des crédits

### Composants Existants à Vérifier
- [ ] `CreateModel.tsx` - Création modèles custom
- [ ] `PreviewModel.tsx` - Preview modèles
- [ ] `Gen4Panel.tsx` - Panel spécifique Gen-4
- [ ] `JobsTab.tsx` - Historique jobs
- [ ] `StylesSection.tsx` - Sélection styles

---

## 🚀 PLAN D'ACTION RECOMMANDÉ

### Phase 1 : MVP Génération (2-3h)
1. Créer `GeneratorPanel.tsx` avec form basique
2. Connecter à l'API `/api/generate-gen4-image`
3. Afficher le résultat
4. Ajouter routing `ExploreModels` → `GeneratorPanel`

### Phase 2 : Upload & I2I (1-2h)
1. Créer `ReferenceImageUpload.tsx`
2. Implémenter upload vers Supabase Storage
3. Passer les URLs à l'API en mode I2I

### Phase 3 : Crédits & Historique (1-2h)
1. Créer `CreditsDisplay.tsx`
2. Créer `GenerationsHistory.tsx`
3. Fetcher `photos_meta` pour l'historique

### Phase 4 : Polish (1h)
1. Settings avancés
2. Error handling
3. Loading states
4. Responsive design

**Temps Total Estimé** : 5-8 heures

---

## 🔍 CONCLUSION

**Problème Principal** :
Le backend est complet et fonctionnel, mais le frontend s'arrête à la sélection de modèle sans aller plus loin dans le flow de génération.

**Solution** :
Créer les composants manquants pour connecter l'UI au backend déjà existant.

---

*Audit terminé - 2025-11-28 20:10*
