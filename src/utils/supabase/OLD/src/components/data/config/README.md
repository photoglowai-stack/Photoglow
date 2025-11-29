# ⚙️ Configuration Files

Ce dossier contient les fichiers de configuration pour les catégories.

## Fichiers

### `categoryColorSchemes.ts`
Schémas de couleurs pour chaque catégorie.

```typescript
{
  'ai-headshots': {
    primary: '#3b82f6',
    secondary: '#8b5cf6',
    accent: '#ec4899',
    gradient: 'from-blue-500 to-purple-500'
  }
}
```

Utilisé pour :
- Badges de catégorie
- Backgrounds de sections
- Boutons CTA
- Accents visuels

### `categoryFormConfig.ts`
Configuration des formulaires de génération par catégorie.

```typescript
{
  'ai-headshots': {
    showGenderSelect: true,
    showAgeRange: true,
    showStyleOptions: ['professional', 'casual'],
    defaultPrompt: 'Professional headshot...'
  }
}
```

### `categoryMasonryData.ts`
Configuration de la disposition masonry pour les galeries.

```typescript
{
  'ai-headshots': {
    columns: 3,
    gap: 16,
    aspectRatios: ['portrait', 'square', 'landscape']
  }
}
```

### `categoryPagesConfig.ts`
Configuration des pages de catégories (meta, SEO, layout).

```typescript
{
  'ai-headshots': {
    title: 'Photo AI Headshots | PhotoGlow',
    description: '...',
    keywords: 'ai headshots, professional...',
    showHowItWorks: true,
    showFAQ: true,
    showTestimonials: true,
    ctaText: 'Generate Headshots'
  }
}
```

---

## Structure

### ColorScheme
```typescript
interface ColorScheme {
  primary: string;          // Hex color
  secondary?: string;
  accent?: string;
  gradient?: string;        // Tailwind gradient classes
  textColor?: string;
  bgColor?: string;
}
```

### FormConfig
```typescript
interface FormConfig {
  showGenderSelect?: boolean;
  showAgeRange?: boolean;
  showStyleOptions?: string[];
  defaultPrompt?: string;
  requiredFields?: string[];
  maxImages?: number;
}
```

### MasonryConfig
```typescript
interface MasonryConfig {
  columns: number;
  gap: number;
  aspectRatios?: string[];
  breakpoints?: {
    sm: number;
    md: number;
    lg: number;
  };
}
```

### PageConfig
```typescript
interface PageConfig {
  title: string;
  description: string;
  keywords?: string;
  showHowItWorks?: boolean;
  showFAQ?: boolean;
  showTestimonials?: boolean;
  showExamples?: boolean;
  ctaText?: string;
  heroImage?: string;
}
```

---

## Usage

```tsx
import { colorSchemes } from './categoryColorSchemes';
import { formConfigs } from './categoryFormConfig';
import { masonryConfigs } from './categoryMasonryData';
import { pageConfigs } from './categoryPagesConfig';

// Get color scheme
const colors = colorSchemes['ai-headshots'];

// Apply to component
<div className={`bg-gradient-to-r ${colors.gradient}`}>
  <Badge style={{ backgroundColor: colors.primary }}>
    {category.name}
  </Badge>
</div>

// Get form config
const formConfig = formConfigs['ai-headshots'];
{formConfig.showGenderSelect && <GenderSelect />}

// Get masonry config
const masonryConfig = masonryConfigs['ai-headshots'];
<Masonry columns={masonryConfig.columns} gap={masonryConfig.gap} />

// Get page config
const pageConfig = pageConfigs['ai-headshots'];
<SEOHead 
  title={pageConfig.title}
  description={pageConfig.description}
/>
```

---

## Migration en cours

Ces fichiers seront progressivement migrés depuis `/components/` :
- [x] Structure créée
- [ ] categoryColorSchemes.ts migré
- [ ] categoryFormConfig.ts migré
- [ ] categoryMasonryData.ts migré
- [ ] categoryPagesConfig.ts migré
