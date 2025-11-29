# 📁 Category Data Files

Ce dossier contient toutes les données relatives aux catégories de PhotoGlow.

## Fichiers

### `categoryData.ts`
Définitions des catégories principales avec metadata.

```typescript
{
  slug: 'ai-headshots',
  name: 'AI Headshots',
  description: '...',
  icon: '👔',
  color: '#3b82f6',
  examples: [...],
  prompts: [...]
}
```

### `categoryExamplesData.ts`
Exemples d'images pour chaque catégorie.

Utilisé pour :
- Galeries de preview
- Inspiration utilisateur
- Tests de qualité

### `categoryFAQData.ts`
Questions fréquentes par catégorie.

```typescript
{
  'ai-headshots': [
    { q: 'Question?', a: 'Réponse' }
  ]
}
```

### `categoryTestimonialsData.ts`
Témoignages d'utilisateurs par catégorie.

```typescript
{
  'ai-headshots': [
    {
      name: 'John Doe',
      role: 'CEO',
      text: 'Amazing!',
      image: '...',
      rating: 5
    }
  ]
}
```

---

## Structure des données

### Category Object
```typescript
interface Category {
  slug: string;              // URL-safe identifier
  name: string;              // Display name
  description: string;       // SEO description
  icon?: string;             // Emoji icon
  color: string;             // Hex color
  examples: Example[];       // Preview images
  prompts: Prompt[];         // Generation prompts
  tags?: string[];           // Search tags
  featured?: boolean;        // Show on homepage
}
```

### Example Object
```typescript
interface Example {
  id: string;
  prompt: string;
  image_url: string;
  aspect_ratio?: string;
  category: string;
}
```

### FAQ Object
```typescript
interface FAQ {
  question: string;
  answer: string;
  category?: string;
}
```

### Testimonial Object
```typescript
interface Testimonial {
  name: string;
  role: string;
  company?: string;
  text: string;
  image?: string;
  rating: number;
  category: string;
}
```

---

## Usage

```tsx
import { categories } from './categoryData';
import { categoryExamples } from './categoryExamplesData';
import { categoryFAQs } from './categoryFAQData';
import { categoryTestimonials } from './categoryTestimonialsData';

// Get category by slug
const category = categories.find(c => c.slug === 'ai-headshots');

// Get examples
const examples = categoryExamples['ai-headshots'];

// Get FAQs
const faqs = categoryFAQs['ai-headshots'];

// Get testimonials
const testimonials = categoryTestimonials['ai-headshots'];
```

---

## Migration en cours

Ces fichiers seront progressivement migrés depuis `/components/` :
- [x] Structure créée
- [ ] categoryData.ts migré
- [ ] categoryExamplesData.ts migré
- [ ] categoryFAQData.ts migré
- [ ] categoryTestimonialsData.ts migré
