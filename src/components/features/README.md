# ⚙️ Features Components

Ce dossier contient les features métier complexes de PhotoGlow.

## Structure

Chaque feature a son propre dossier avec :
- `FeatureName.tsx` - Composant principal
- `FeatureName.types.ts` - Types spécifiques
- `FeatureName.hooks.ts` - Hooks locaux (optionnel)
- `index.ts` - Export barrel

## Features Actuelles

### AI Generation
- **AIPhotoGenerator** - Générateur de photos AI (v1, v2, Patch)
- **CreateModelModal** - Modal de création de modèle personnalisé
- **CreateAIModelTab** - Onglet création de modèle
- **PreviewAIModelTab** - Onglet preview de modèle

### Galleries
- **UnifiedGallery** - Galerie unifiée optimisée
- **VirtualGallery** - Galerie avec virtualisation
- **ScrollingMosaic** - Mosaïque avec scroll infini
- **HorizontalTransformCarousel** - Carrousel de transformations
- **CategoryPhotosCarousel** - Carrousel photos de catégorie

### Admin
- **AdminGenerateTab** - Onglet génération admin
- **GenerateJobsTab** - Onglet jobs de génération
- **Gen4Panel** - Panel FLUX Gen4
- **HealthCheckPanel** - Panel de santé système
- **SystemHealthPanel** - Panel santé système avancé
- **ReplicateStatusBanner** - Banner statut Replicate

### Other Features
- **AuthModal** - Modal d'authentification
- **InstagramPreview** - Preview Instagram
- **ExploreAIStyles** - Exploration des styles AI
- **CreditsDashboard** - Dashboard de crédits
- **StickyEmailBar** - Barre email sticky

## Caractéristiques communes

Toutes les features suivent ces principes :
- **État local** : Gestion d'état complexe (useState, useReducer)
- **Side effects** : useEffect pour API calls, subscriptions
- **Formulaires** : Validation et gestion d'erreurs
- **Optimisation** : Memoization et debouncing
- **Modularité** : Décomposition en sous-composants

## Différence avec Sections

| Feature | Section |
|---------|---------|
| Logique métier complexe | Présentation simple |
| État local important | Peu ou pas d'état |
| API calls | Données en props |
| Formulaires | Contenu statique |
| Modals, dashboards | Headers, footers |

## Exemple d'utilisation

```tsx
// Import
import { AIPhotoGenerator, CreateModelModal } from '../features';

// Utilisation avec état
function PhotoStudio() {
  const [showModal, setShowModal] = useState(false);
  
  return (
    <>
      <AIPhotoGenerator 
        onGenerate={(params) => generatePhoto(params)}
        credits={credits}
      />
      <CreateModelModal 
        isOpen={showModal}
        onClose={() => setShowModal(false)}
      />
    </>
  );
}
```

## Conventions

### Nommage
- Features AI : `AI{Feature}` (ex: `AIPhotoGenerator`)
- Modals : `{Name}Modal` (ex: `AuthModal`)
- Dashboards : `{Name}Dashboard` (ex: `CreditsDashboard`)

### État
- Utiliser `useState` pour état simple
- Utiliser `useReducer` pour état complexe
- Extraire hooks custom si logique réutilisable

### API Calls
- Gérer loading states
- Gérer error states
- Utiliser `try/catch` avec error-handler
- Toast notifications pour feedback

### Performance
- Memoizer les callbacks avec `useCallback`
- Memoizer les valeurs avec `useMemo`
- Debouncer les inputs avec `useDebounce`
- Virtualiser les longues listes
