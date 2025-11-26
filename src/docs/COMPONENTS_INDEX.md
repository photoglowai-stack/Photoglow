# 📦 PhotoGlow Components Index

Index complet de tous les composants, leur but et leur statut de migration.

**Dernière mise à jour** : Session 5
**Total composants** : ~90
**Migrés** : 8 (9%)
**Documentés** : 14 (composants + hooks)

---

## 🗂️ Organisation

```
components/
├── pages/          # Pages complètes (20)
├── sections/       # Sections de pages (15)
├── features/       # Features métier (25)
├── shared/         # Composants partagés (10)
├── data/           # Données et config (20)
└── ui/             # UI primitives shadcn (60+)
```

---

## 📄 Pages (20 composants)

| Composant | Description | Taille | Priorité | Status |
|-----------|-------------|--------|----------|--------|
| **IdeasPage** | Galerie de 148 idées de photos | Medium | 🔴 | ✅ Migré |
| **ProfilePage** | Profil utilisateur + crédits | Large | 🔴 | ✅ Migré |
| **PhotoGlowPage** | Page principale génération | XLarge | 🔴 | ⏳ TODO |
| **AdminConsole** | Console admin complète | XLarge | 🔴 | ⏳ TODO |
| **AIStudioPage** | Studio de création AI | Large | 🔴 | ⏳ TODO |
| **ExploreAIModelsPage** | Explorer modèles IA | Medium | 🟡 | ⏳ TODO |
| **CategoryUniversalPage** | Template catégories universel | Large | 🔴 | ⏳ TODO |
| AdminV2Unified | Admin version 2 | XLarge | 🟡 | ⏳ TODO |
| AdminGenerateCategoriesPage | Génération admin catégories | Large | 🟡 | ⏳ TODO |
| CategoryPage | Page de catégorie | Medium | 🟡 | ⏳ TODO |
| CategoryExamplesPage | Exemples de catégorie | Medium | 🟡 | ⏳ TODO |
| CreateVideoPage | Création de vidéo | Medium | 🟢 | ⏳ TODO |
| PhotoDetailPage | Détail d'une photo | Small | 🟡 | ⏳ TODO |
| VideosGalleryPage | Galerie de vidéos | Medium | 🟢 | ⏳ TODO |
| FigmaStylePaymentPage | Page paiement style Figma | Medium | 🟢 | ⏳ TODO |
| TinderPaymentPage | Page paiement style Tinder | Medium | 🟢 | ⏳ TODO |

**Légende** :
- 🔴 Haute priorité
- 🟡 Moyenne priorité
- 🟢 Basse priorité
- Small : <200 lignes
- Medium : 200-400 lignes
- Large : 400-600 lignes
- XLarge : 600+ lignes

---

## 📐 Sections (15+ composants)

### Landing Page Sections

| Composant | Description | Utilisé dans | Status |
|-----------|-------------|--------------|--------|
| **HeroSection** | Hero principal avec CTA | Landing | ⏳ TODO |
| **Features** | Grille des features | Landing | ⏳ TODO |
| **HowItWorks** | Process en 3 étapes | Landing | ⏳ TODO |
| **FAQ** | Questions fréquentes | Landing, Categories | ⏳ TODO |
| **PhotoExamples** | Galerie d'exemples | Landing | ⏳ TODO |
| **SocialProof** | Témoignages | Landing | ⏳ TODO |
| **AsSeenOn** | Logos de presse | Landing | ⏳ TODO |
| **FeaturedIn** | Logos de presse v2 | Landing | ⏳ TODO |
| **PhotoGlowPricing** | Plans et tarifs | Landing, Pricing | ⏳ TODO |

### Category Sections

| Composant | Description | Utilisé dans | Status |
|-----------|-------------|--------------|--------|
| CategoryHowItWorks | Process pour catégorie | Category pages | ⏳ TODO |
| CategoryFAQ | FAQ pour catégorie | Category pages | ⏳ TODO |
| CategoryTestimonials | Témoignages catégorie | Category pages | ⏳ TODO |
| CategoryShowcase | Showcase catégorie | Category pages | ⏳ TODO |
| SimpleCategoryHero | Hero simplifié | Category pages | ⏳ TODO |
| CategoryPageHeader | Header de catégorie | Category pages | ⏳ TODO |

### Other Sections

| Composant | Description | Utilisé dans | Status |
|-----------|-------------|--------------|--------|
| BeforeAfterTransformation | Avant/Après | Multiple pages | ⏳ TODO |
| ComparisonSection | Comparaison | Multiple pages | ⏳ TODO |
| AIStylesSection | Styles AI dispos | Studio, Landing | ⏳ TODO |
| CentralCTA | CTA centralisé | Multiple pages | ⏳ TODO |
| SuggestedCategories | Suggestions | Category pages | ⏳ TODO |

---

## ⚙️ Features (25+ composants)

### AI Generation

| Composant | Description | Complexité | Status |
|-----------|-------------|------------|--------|
| **AIPhotoGenerator** | Générateur principal (v1) | ⭐⭐⭐ | ⏳ TODO |
| **AIPhotoGeneratorV2** | Générateur v2 | ⭐⭐⭐ | ⏳ TODO |
| **AIPhotoGeneratorPatch** | Générateur Patch | ⭐⭐⭐ | ⏳ TODO |
| **CreateModelModal** | Modal création modèle | ⭐⭐⭐ | ⏳ TODO |
| **CreateAIModelTab** | Onglet création modèle | ⭐⭐ | ⏳ TODO |
| **PreviewAIModelTab** | Onglet preview modèle | ⭐⭐ | ⏳ TODO |

### Galleries

| Composant | Description | Complexité | Status |
|-----------|-------------|------------|--------|
| **UnifiedGallery** | Galerie unifiée optimisée | ⭐⭐⭐ | ⏳ TODO |
| **VirtualGallery** | Galerie avec virtualisation | ⭐⭐⭐ | ⏳ TODO |
| **ScrollingMosaic** | Mosaïque avec scroll | ⭐⭐ | ⏳ TODO |
| **HorizontalTransformCarousel** | Carrousel transformations | ⭐⭐ | ⏳ TODO |
| **CategoryPhotosCarousel** | Carrousel photos catégorie | ⭐⭐ | ⏳ TODO |

### Admin

| Composant | Description | Complexité | Status |
|-----------|-------------|------------|--------|
| AdminGenerateTab | Onglet génération admin | ⭐⭐ | ⏳ TODO |
| GenerateJobsTab | Onglet jobs | ⭐⭐ | ⏳ TODO |
| Gen4Panel | Panel FLUX Gen4 | ⭐⭐ | ⏳ TODO |
| HealthCheckPanel | Panel santé système | ⭐ | ⏳ TODO |
| SystemHealthPanel | Panel santé avancé | ⭐⭐ | ⏳ TODO |
| ReplicateStatusBanner | Banner statut Replicate | ⭐ | ⏳ TODO |

### Other Features

| Composant | Description | Complexité | Status |
|-----------|-------------|------------|--------|
| **AuthModal** | Modal authentification | ⭐⭐ | ⏳ TODO |
| InstagramPreview | Preview Instagram | ⭐ | ⏳ TODO |
| ExploreAIStyles | Explorer styles AI | ⭐⭐ | ⏳ TODO |
| CreditsDashboard | Dashboard crédits | ⭐⭐ | ⏳ TODO |
| StickyEmailBar | Barre email sticky | ⭐ | ⏳ TODO |
| OptimizedAnimatedBackground | Background animé | ⭐ | ⏳ TODO |

**Complexité** :
- ⭐ Simple : <200 lignes, peu de state
- ⭐⭐ Moyenne : 200-400 lignes, state complexe
- ⭐⭐⭐ Élevée : 400+ lignes, logique complexe, API calls

---

## 🧩 Shared (10 composants)

| Composant | Description | Status |
|-----------|-------------|--------|
| **Header** | Header navigation | ✅ Migré |
| **Footer** | Footer avec liens | ✅ Migré |
| **SEOHead** | Meta tags SEO | ✅ Migré |
| **LoadingSkeleton** | Skeleton screens | ✅ Migré |
| **LazyImage** | Image lazy-loaded | ✅ Migré |
| **AnimatedDiv** | Animations CSS | ✅ Migré |
| OptimizedAnimatedBackground | Background optimisé | ⏳ TODO |
| ScrollingMosaic | Mosaïque (pourrait être feature) | ⏳ TODO |

---

## 📊 Data Files (20+ fichiers)

### Categories

| Fichier | Description | Status |
|---------|-------------|--------|
| categoryData.ts | Définitions catégories | ⏳ À migrer |
| categoryExamplesData.ts | Exemples par catégorie | ⏳ À migrer |
| categoryFAQData.ts | FAQs par catégorie | ⏳ À migrer |
| categoryTestimonialsData.ts | Témoignages | ⏳ À migrer |

### Config

| Fichier | Description | Status |
|---------|-------------|--------|
| categoryColorSchemes.ts | Schémas couleurs | ⏳ À migrer |
| categoryFormConfig.ts | Config formulaires | ⏳ À migrer |
| categoryMasonryData.ts | Config masonry | ⏳ À migrer |
| categoryPagesConfig.ts | Config pages | ⏳ À migrer |

### Prompts

| Fichier | Description | Status |
|---------|-------------|--------|
| **allCategoriesPromptsConfig.ts** | 295 prompts ⭐ | ✅ Finalisé |
| getAllCategories.ts | Utilitaire catégories | ⏳ À migrer |
| categoryPhotoPrompts.ts | Prompts rapides | ⏳ À migrer |
| fluxOptimizedPrompts*.ts | Legacy à consolider | ⏳ À consolider |

### Ideas

| Fichier | Description | Status |
|---------|-------------|--------|
| ideasData.ts | 148 idées de photos | ⏳ À migrer |

---

## 🪝 Hooks (6 hooks - 100% ✅)

| Hook | Description | Status |
|------|-------------|--------|
| **useAuth** | Authentification Supabase | ✅ Documenté |
| **useCredits** | Gestion crédits | ✅ Documenté |
| **useAIModels** | CRUD modèles IA | ✅ Documenté |
| **useCategoryImages** | Images par catégorie | ✅ Documenté |
| **useExamplePhotos** | Photos d'exemple | ✅ Documenté |
| **useDebounce** | Debounce (x2 functions) | ✅ Documenté |

---

## 🎨 UI Components (60+ shadcn)

Tous les composants UI sont dans `/components/ui/` et sont gérés par shadcn.
Ils ne nécessitent pas de migration car déjà bien organisés.

**Liste complète** :
- accordion, alert, alert-dialog, avatar, badge, button, calendar
- card, carousel, chart, checkbox, collapsible, command
- context-menu, dialog, drawer, dropdown-menu, form
- hover-card, input, input-otp, label, menubar
- navigation-menu, pagination, popover, progress
- radio-group, resizable, scroll-area, select, separator
- sheet, sidebar, skeleton, slider, sonner, switch
- table, tabs, textarea, toggle, toggle-group, tooltip
- Et plus...

---

## 📈 Progression par catégorie

```
Pages:        ██░░░░░░░░░░░░░░░░  10% (2/20)
Sections:     ░░░░░░░░░░░░░░░░░░   0% (0/15)
Features:     ░░░░░░░░░░░░░░░░░░   0% (0/25)
Shared:       ████████████░░░░░░  60% (6/10)
Data:         ████████████████░░  80% structure
Hooks:        ████████████████████ 100% (6/6)
```

**Total général** : ~20%

---

## 🎯 Top 10 Priorités

Composants à migrer en priorité pour maximum d'impact :

1. **HeroSection** - First impression utilisateur
2. **AIPhotoGenerator** - Core functionality
3. **UnifiedGallery** - Utilisé dans 10+ pages
4. **Features** - Landing page essentielle
5. **FAQ** - Réutilisé partout
6. **PhotoGlowPage** - Page principale
7. **CreateModelModal** - Feature différenciante
8. **AuthModal** - Critical auth flow
9. **PhotoExamples** - Social proof landing
10. **CategoryUniversalPage** - Template 18+ pages

---

## 🔍 Recherche rapide

### Par fonctionnalité

**Génération AI** :
- AIPhotoGenerator, AIPhotoGeneratorV2, AIPhotoGeneratorPatch
- CreateModelModal, CreateAIModelTab, PreviewAIModelTab

**Galeries** :
- UnifiedGallery, VirtualGallery, ScrollingMosaic
- HorizontalTransformCarousel, CategoryPhotosCarousel

**Admin** :
- AdminConsole, AdminV2Unified, AdminGenerateTab
- Gen4Panel, HealthCheckPanel, SystemHealthPanel

**Landing Page** :
- HeroSection, Features, HowItWorks, FAQ
- PhotoExamples, SocialProof, PhotoGlowPricing

**Auth & User** :
- AuthModal, ProfilePage, CreditsDashboard

---

## 📝 Notes

### Composants à renommer ?

Certains composants ont des noms peu clairs :
- `FeaturedIn` vs `AsSeenOn` : Même but ?
- `CategoryPage` vs `CategoryUniversalPage` : Quelle différence ?
- `AdminConsole` vs `AdminV2Unified` : Legacy vs nouveau ?

### Composants à merger ?

Plusieurs versions du même composant :
- AIPhotoGenerator (v1, v2, Patch) → À unifier ?
- fluxOptimizedPrompts (5+ fichiers) → À consolider

### Composants obsolètes ?

À vérifier si toujours utilisés :
- CreateVideoPage
- TinderPaymentPage, FigmaStylePaymentPage

---

## 🚀 Guide de migration

Pour migrer un nouveau composant :

1. Créer le dossier `/components/{category}/{ComponentName}/`
2. Créer `ComponentName.tsx` avec JSDoc complet
3. Créer `ComponentName.types.ts` si nécessaire
4. Créer `index.ts` (barrel export)
5. Mettre à jour `/{category}/index.ts`
6. Mettre à jour ce fichier (COMPONENTS_INDEX.md)
7. Commit avec message descriptif

---

**Dernière mise à jour** : Session 5
**Maintenance** : Mettre à jour après chaque migration
