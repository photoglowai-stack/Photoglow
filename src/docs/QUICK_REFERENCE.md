# ⚡ PhotoGlow - Quick Reference

Guide de référence ultra-rapide pour Claude Code et développeurs.

---

## 🗂️ Structure du projet

```
/components
├── pages/       → Pages complètes (IdeasPage, ProfilePage, etc.)
├── sections/    → Sections réutilisables (HeroSection, Features, FAQ)
├── features/    → Features métier (AIPhotoGenerator, UnifiedGallery)
├── shared/      → Composants partagés (Header, Footer, LazyImage)
├── data/        → Données statiques (295 prompts, config, categories)
└── ui/          → UI primitives shadcn (button, card, etc.)

/hooks           → Custom hooks (6 hooks - 100% documentés)
/utils           → Utilities (api-client, error-handler, config)
/lib             → Core libraries (supabase, API clients)
/styles          → Global CSS (Tailwind v4)
/docs            → Documentation projet
```

---

## 🚀 Démarrage rapide

### Import patterns

```tsx
// Pages
import { IdeasPage, ProfilePage } from './components/pages';

// Sections
import { HeroSection, Features, FAQ } from './components/sections';

// Features
import { AIPhotoGenerator, UnifiedGallery } from './components/features';

// Shared
import { Header, Footer, SEOHead, LazyImage } from './components/shared';

// Hooks
import { useAuth, useCredits, useAIModels } from '../hooks';

// Data
import { ALL_CATEGORIES_PROMPTS_CONFIG } from './components/data';

// UI
import { Button, Card, Badge } from './components/ui';
```

### Hooks usage

```tsx
// Auth
const { user, session, loading } = useAuth();

// Credits
const { credits, refetch } = useCredits();

// AI Models
const { models, createModel, trainModel } = useAIModels();

// Category Images
const { images, loading } = useCategoryImages('ai-headshots');

// Debounce
const debouncedSearch = useDebouncedValue(search, 500);
```

---

## 📊 Données clés

### Catégories (18)
```
ai-headshots, ai-model-photo, ai-dating-photos,
ai-linkedin-photo, ai-realistic-photo, ai-selfie-generator,
ai-portrait-generator, ai-fitness-photos, ai-lifestyle-travel,
ai-cosplay-fantasy, ai-glamour-model, ai-instagram-photo,
ai-tinder-photos, ai-business-casual, ai-yearbook-photo,
ai-senior-portraits, ai-corporate-headshots, ai-actor-headshots
```

### Prompts AI
- **Total** : 295 prompts
- **Par catégorie** : 16 prompts
- **Provider** : Pollinations.ai (FLUX)
- **Aspect ratios** : portrait (9:16), square (1:1), landscape (16:9)

### ⚠️ FLUX Critique
**JAMAIS de negative prompts !**
- ❌ Negative: "ugly, cartoon, illustration"
- ✅ Long prompt positif (50-150 mots) avec détails spécifiques

---

## 🎨 Patterns

### Page Component
```tsx
export function MyPage({ onBack }: MyPageProps) {
  const [state, setState] = useState();
  
  return (
    <div className="min-h-screen">
      <Header />
      <main>
        <Section1 />
        <Section2 />
      </main>
      <Footer />
    </div>
  );
}
```

### Section Component
```tsx
export const MySection = memo(function MySection({ 
  showCTA = true 
}: MySectionProps) {
  return (
    <section className="py-20">
      {/* Content */}
    </section>
  );
});
```

### Feature Component
```tsx
export function MyFeature({ onAction }: MyFeatureProps) {
  const [state, setState] = useState();
  
  const handleAction = useCallback(() => {
    onAction(data);
  }, [onAction]);
  
  return <div>{/* UI */}</div>;
}
```

---

## 🔧 Configuration

### Supabase
```tsx
import { supabase } from '../utils/supabase/client';
import { projectId, publicAnonKey } from '../utils/supabase/info';
```

### API
```tsx
import { VERCEL_API_BASE, API_ENDPOINTS } from '../utils/config';

// Fetch with auth
fetch(`${VERCEL_API_BASE}/api/endpoint`, {
  headers: {
    'Authorization': `Bearer ${session.access_token}`
  }
});
```

### Error handling
```tsx
import { logError, shouldShowError, fetchWithTimeout } from '../utils/error-handler';

try {
  const res = await fetchWithTimeout(url, { timeout: 8000 });
  const data = await safeJsonParse(res, defaultValue);
} catch (err) {
  logError('context', err);
  if (shouldShowError(err)) {
    toast.error('Message');
  }
}
```

---

## 📁 Fichiers clés

### Configuration principale
- `/utils/config.ts` - Config globale (API base, endpoints)
- `/lib/config.ts` - Config lib
- `/components/data/prompts/allCategoriesPromptsConfig.ts` - 295 prompts

### Clients
- `/utils/supabase/client.ts` - Client Supabase
- `/utils/api-client.ts` - API client
- `/utils/ai-models-client.ts` - Client modèles IA
- `/utils/credits-client.ts` - Client crédits

### Data
- `/components/ideasData.ts` - 148 idées (à migrer vers /data/)
- `/components/categoryData.ts` - Définitions catégories (à migrer)
- `/components/allCategoriesPromptsConfig.ts` - Prompts (déjà dans data/)

---

## 🎯 Composants top priorité

### À utiliser souvent
1. **Header** & **Footer** - Navigation
2. **SEOHead** - Meta tags SEO
3. **LazyImage** - Images optimisées
4. **LoadingSkeleton** - Loading states
5. **UnifiedGallery** - Galeries photos

### Hooks essentiels
1. **useAuth** - Auth partout
2. **useCredits** - Affichage crédits
3. **useCategoryImages** - Images catégories
4. **useDebouncedValue** - Recherche

---

## 🔍 Recherche rapide

### Trouver un composant
```bash
# Pages
ls components/pages/

# Sections
ls components/sections/

# Features
ls components/features/

# Shared
ls components/shared/

# Data
ls components/data/
```

### Grep dans le code
```bash
# Trouver utilisation d'un hook
grep -r "useAuth" components/

# Trouver imports d'un composant
grep -r "from.*Header" components/

# Trouver une catégorie
grep -r "ai-headshots" components/
```

---

## 📖 Documentation détaillée

- **Architecture** : `/docs/ARCHITECTURE_REFACTOR.md`
- **Index composants** : `/docs/COMPONENTS_INDEX.md`
- **Progression** : `/docs/REFACTOR_PROGRESS.md`
- **Guide rapide** : `/docs/QUICK_REFACTOR_GUIDE.md`
- **Hooks** : `/hooks/README.md`
- **Prompts** : `/components/data/prompts/README.md`
- **Sessions** : `/docs/REFACTOR_SESSION_*.md`

---

## ⚠️ Choses à NE PAS FAIRE

1. **Negative prompts FLUX** : JAMAIS !
2. **Modifier `/components/figma/`** : Protégé
3. **Toucher `/components/ui/`** : shadcn géré automatiquement
4. **Importer Framer Motion** : Migré vers CSS natif
5. **Gros bundles** : Toujours lazy load si > 100KB

---

## 💡 Tips

### Performance
- Utiliser `memo` pour composants lourds
- Lazy load pages avec `React.lazy()`
- Virtualiser les longues listes (VirtualGallery)
- Debouncer les inputs utilisateur

### SEO
- Toujours utiliser `<SEOHead>` dans les pages
- Prefixer titres avec "Photo AI" (fait dans ideasData)
- Meta descriptions uniques par catégorie
- Canonical URLs pour éviter duplicates

### TypeScript
- Toujours typer les props
- Exporter les interfaces
- Utiliser `as const` pour données statiques
- Jamais `any`, toujours `unknown` puis narrow

### Styling
- Tailwind v4 (pas de config file)
- Éviter styles inline sauf CSS vars
- Utiliser tokens dans `globals.css`
- Responsive mobile-first

---

## 🚨 En cas de problème

### Build errors
1. Vérifier imports relatifs
2. Vérifier barrel exports à jour
3. Clear cache : `rm -rf .next`
4. Rebuild : `npm run build`

### Type errors
1. Vérifier interfaces exportées
2. Vérifier imports de types
3. Regénérer types Supabase si besoin

### Runtime errors
1. Checker console browser
2. Checker logs Supabase
3. Vérifier error-handler logs
4. Tester avec console.log stratégiques

---

## 📞 Support

- **Documentation** : Voir `/docs/`
- **Code examples** : Voir composants existants
- **Hooks examples** : Voir `/hooks/README.md`
- **Prompts guide** : Voir `/components/data/prompts/README.md`

---

**Version** : Session 5
**Dernière MAJ** : Aujourd'hui
**Maintenance** : Ce fichier doit être mis à jour régulièrement
