# 📐 Sections Components

Ce dossier contient les sections réutilisables des pages PhotoGlow.

## Structure

Chaque section a son propre dossier avec :
- `SectionName.tsx` - Composant principal
- `SectionName.types.ts` - Types spécifiques (optionnel)
- `index.ts` - Export barrel

## Sections Actuelles

### Landing Page Sections
- **HeroSection** - Hero principal avec CTA et animations
- **Features** - Grille des fonctionnalités clés
- **HowItWorks** - Processus en 3 étapes
- **FAQ** - Questions fréquentes
- **PhotoExamples** - Galerie d'exemples
- **SocialProof** - Témoignages et logos
- **AsSeenOn** - Logos de presse
- **Pricing** - Plans et tarifs (PhotoGlowPricing)

### Category Page Sections
- **CategoryHowItWorks** - Process pour catégorie
- **CategoryFAQ** - FAQ pour catégorie
- **CategoryTestimonials** - Témoignages catégorie
- **CategoryShowcase** - Showcase de catégorie
- **SimpleCategoryHero** - Hero simplifié catégorie

### Other Sections
- **BeforeAfterTransformation** - Comparaison avant/après
- **ComparisonSection** - Section de comparaison
- **AIStylesSection** - Styles AI disponibles
- **CentralCTA** - CTA centralisé
- **SuggestedCategories** - Suggestions de catégories

## Caractéristiques communes

Toutes les sections suivent ces principes :
- **Responsive** : Mobile-first design
- **Accessibilité** : ARIA labels et semantic HTML
- **Performance** : Memoizées avec React.memo
- **Animations** : CSS natives (pas de Framer Motion)
- **Modulaires** : Props pour personnalisation

## Exemple d'utilisation

```tsx
// Import depuis barrel
import { HeroSection, Features, FAQ } from '../sections';

// Utilisation dans une page
<>
  <HeroSection 
    onStartForm={(gender) => navigate('/generate')}
    onExploreModels={() => navigate('/models')}
  />
  <Features />
  <FAQ />
</>
```

## Conventions

### Nommage
- Sections de landing : `SectionName` (ex: `HeroSection`, `Features`)
- Sections de catégorie : `Category{Feature}` (ex: `CategoryFAQ`)

### Props
- Toujours typer les props avec une interface
- Utiliser des callbacks pour les actions
- Props optionnelles avec `?`

### Animations
- Utiliser les animations CSS dans `globals.css`
- Pas de Framer Motion (migration terminée)
- Utiliser `animate-in` de Tailwind v4

### Performance
- Memoizer avec `React.memo`
- Utiliser `LazyImage` pour les images
- Optimiser les re-renders
