# 🪝 Custom Hooks

Ce dossier contient tous les hooks personnalisés de PhotoGlow.

## Hooks disponibles

### Authentication & User

#### `useAuth()`
Gère l'état d'authentification Supabase.

```tsx
const { user, session, loading } = useAuth();

if (loading) return <LoadingSkeleton />;
if (!user) return <LoginPrompt />;

return <Dashboard user={user} />;
```

**Retourne** :
- `user` : Utilisateur connecté (null si non connecté)
- `session` : Session active avec access_token
- `loading` : État de chargement

**Fonctionnalités** :
- Récupère la session au mount
- S'abonne aux changements d'état auth
- Cleanup automatique

---

### Credits Management

#### `useCredits()`
Gère le solde de crédits de l'utilisateur.

```tsx
const { credits, loading, error, refetch } = useCredits();

const handleGenerate = async () => {
  await generatePhoto();
  await refetch(); // Rafraîchir le solde
};
```

**Retourne** :
- `credits` : Solde actuel (null si non chargé)
- `loading` : État de chargement
- `error` : Message d'erreur (null si ok)
- `refetch` : Fonction pour recharger

**Fonctionnalités** :
- Charge automatiquement au mount
- Gestion d'erreurs
- Fonction refetch pour reload manuel

---

### AI Models Management

#### `useAIModels()`
Gère les modèles IA personnalisés (création, entraînement, génération).

```tsx
const { 
  models, 
  loading, 
  createModel, 
  uploadMultiplePhotos, 
  trainModel, 
  generateImage 
} = useAIModels();

// Workflow complet
const model = await createModel({ name: 'Mon Modèle', gender: 'male' });
await uploadMultiplePhotos(model.id, files);
await trainModel(model.id, (status, progress) => console.log(status));
const imageUrl = await generateImage(model.id, { prompt: 'headshot' });
```

**Retourne** :
- `models` : Liste des modèles
- `loading` : État de chargement
- `error` : Message d'erreur
- Actions CRUD : `createModel`, `deleteModel`, `uploadPhoto`, etc.
- `client` : Client direct pour usage avancé

**Fonctionnalités** :
- CRUD complet sur les modèles
- Upload single/multiple avec progress
- Entraînement avec polling automatique
- Génération d'images
- Rafraîchissement auto après actions

---

### Category Images

#### `useCategoryImages(categoryId)`
Récupère toutes les images d'une catégorie.

```tsx
const { images, loading, error, refresh, isEmpty, count } = useCategoryImages('ai-headshots');

if (isEmpty) return <EmptyState />;

return <Gallery images={images} />;
```

**Retourne** :
- `images` : Array de CategoryImage
- `loading` : État de chargement
- `error` : Message d'erreur
- `refresh` : Fonction pour recharger
- `isEmpty` : true si aucune image
- `count` : Nombre total d'images

#### `useCategoryImagesStats()`
Statistiques globales de toutes les catégories.

```tsx
const { stats, totalImages, totalCategories } = useCategoryImagesStats();
```

#### `useCategoryImage(categoryId, promptIndex)`
Récupère une image spécifique par index.

```tsx
const { image, loading, error } = useCategoryImage('ai-headshots', 0);
```

#### `useCategoryImagesSample(categoryId, limit)`
Sample limité pour previews.

```tsx
const { images } = useCategoryImagesSample('ai-headshots', 6);
```

---

### Example Photos

#### `useExamplePhotos(category)`
Charge les photos d'exemple avec fallback Unsplash.

```tsx
const { photos, isLoading, error } = useExamplePhotos('ai-headshots');

return (
  <div className="grid grid-cols-3">
    {photos.map(photo => (
      <img key={photo.id} src={photo.image_url} alt={photo.prompt} />
    ))}
  </div>
);
```

**Retourne** :
- `photos` : Array de photos (avec prompt, image_url, seed)
- `isLoading` : État de chargement
- `error` : Message d'erreur

**Stratégie** :
1. Tente de charger depuis Supabase API
2. Timeout de 8 secondes
3. Fallback vers photos Unsplash pré-sélectionnées

---

### Performance Utilities

#### `useDebouncedValue(value, delay)`
Debounce une valeur pour optimiser les re-renders.

```tsx
const [search, setSearch] = useState('');
const debouncedSearch = useDebouncedValue(search, 500);

useEffect(() => {
  if (debouncedSearch) {
    searchAPI(debouncedSearch);
  }
}, [debouncedSearch]);
```

**Cas d'usage** :
- Recherche en temps réel
- Filtrage de listes
- Validation de formulaire

#### `useDebounce(callback, delay)`
Debounce une fonction.

```tsx
const saveToServer = (data) => fetch('/api/save', { body: data });
const debouncedSave = useDebounce(saveToServer, 1000);

// Sauvegarde uniquement 1s après la dernière modification
const handleChange = (e) => debouncedSave(formData);
```

**Cas d'usage** :
- Sauvegarde automatique
- Resize handlers
- Scroll handlers
- Analytics events

---

## Conventions

### Nommage
- Préfixe `use` obligatoire
- CamelCase : `useMyHook`
- Descriptif : `useCategoryImages` > `useImages`

### Structure
```tsx
export function useMyHook(params) {
  // 1. State
  const [data, setData] = useState();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  // 2. Effects
  useEffect(() => {
    loadData();
  }, [deps]);
  
  // 3. Callbacks
  const refetch = useCallback(async () => {
    // ...
  }, [deps]);
  
  // 4. Return
  return { data, loading, error, refetch };
}
```

### Return values
Toujours retourner un objet avec :
- `loading` : État de chargement
- `error` : Gestion d'erreurs
- `refetch` ou `refresh` : Reload manuel

### Documentation
- JSDoc complet avec `@param` et `@returns`
- Exemples d'usage dans `@example`
- Interface TypeScript pour le retour

---

## Best Practices

### 1. Stabilité des dépendances
```tsx
// ❌ Mauvais : objet re-créé à chaque render
const config = { url: '/api' };
const { data } = useMyHook(config);

// ✅ Bon : useMemo pour stabilité
const config = useMemo(() => ({ url: '/api' }), []);
const { data } = useMyHook(config);
```

### 2. Cleanup
```tsx
useEffect(() => {
  const subscription = subscribe();
  return () => subscription.unsubscribe(); // Cleanup
}, []);
```

### 3. Error handling
```tsx
try {
  const data = await fetchData();
  setData(data);
  setError(null);
} catch (err) {
  console.error('Error:', err);
  setError(err.message);
  setData(null); // Reset state
}
```

### 4. Loading states
```tsx
// Toujours gérer loading AVANT l'action
setLoading(true);
try {
  await action();
} finally {
  setLoading(false); // Dans finally pour garantir reset
}
```

---

## Testing

Tous les hooks devraient être testés avec `@testing-library/react-hooks` :

```tsx
import { renderHook, waitFor } from '@testing-library/react';
import { useCredits } from './useCredits';

test('useCredits loads credits on mount', async () => {
  const { result } = renderHook(() => useCredits());
  
  expect(result.current.loading).toBe(true);
  
  await waitFor(() => {
    expect(result.current.loading).toBe(false);
  });
  
  expect(result.current.credits).toBeGreaterThanOrEqual(0);
});
```

---

## Migration depuis composants

Si vous trouvez de la logique réutilisable dans un composant, extrayez-la en hook :

**Avant** :
```tsx
function MyComponent() {
  const [data, setData] = useState();
  useEffect(() => { /* fetch data */ }, []);
  // ... même logique dans plusieurs composants
}
```

**Après** :
```tsx
// hooks/useMyData.ts
export function useMyData() {
  const [data, setData] = useState();
  useEffect(() => { /* fetch data */ }, []);
  return { data };
}

// Composants
function MyComponent() {
  const { data } = useMyData(); // Réutilisable !
}
```
