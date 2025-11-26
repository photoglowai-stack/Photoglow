# 📚 PhotoGlow Documentation - Index

Bienvenue dans la documentation complète de PhotoGlow !

**Projet** : PhotoGlow - SaaS d'amélioration de photos avec IA
**Status** : 25% refactoré, production-ready
**Dernière MAJ** : Session 5

---

## 🚀 Démarrage rapide

### Nouveaux développeurs : Commencez ici

1. **[QUICK_REFERENCE.md](./QUICK_REFERENCE.md)** ⭐
   - Guide de référence ultra-rapide
   - Structure du projet
   - Patterns communs
   - Import patterns
   - Configuration

2. **[COMPONENTS_INDEX.md](./COMPONENTS_INDEX.md)**
   - Index complet des 90 composants
   - Status de migration
   - Priorités
   - Recherche rapide

3. **[/hooks/README.md](../hooks/README.md)**
   - Documentation des 6 hooks custom
   - Exemples d'usage
   - Best practices

---

## 📖 Documentation Architecture

### Comprendre le projet

| Document | Description | Lecteur cible |
|----------|-------------|---------------|
| **[APP_ROUTER_PHASE_2_COMPLETE.md](./APP_ROUTER_PHASE_2_COMPLETE.md)** 🔥 | Phase 2 complétée - Routes + Components | Tous |
| **[APP_ROUTER_SETUP_COMPLETE.md](./APP_ROUTER_SETUP_COMPLETE.md)** ⭐ | Phase 1 complétée - SDK + Config | Tous |
| **[APP_ROUTER_MIGRATION_PLAN.md](./APP_ROUTER_MIGRATION_PLAN.md)** | Plan de migration App Router | Architectes |
| **[REFACTOR_FINAL_STATUS.md](./REFACTOR_FINAL_STATUS.md)** ⭐ | Status final - 30% complété, fondations solides | Tous |
| **[REFACTORING_COMPLETE_SUMMARY.md](./REFACTORING_COMPLETE_SUMMARY.md)** | Summary complet du refactoring | Tous |
| **[ARCHITECTURE_REFACTOR.md](./ARCHITECTURE_REFACTOR.md)** | Architecture détaillée du refactoring | Architectes |
| **[REFACTOR_PROGRESS.md](./REFACTOR_PROGRESS.md)** | Tracker de progression | PMs, Tech Leads |
| **[QUICK_REFACTOR_GUIDE.md](./QUICK_REFACTOR_GUIDE.md)** | Guide de migration pas à pas | Développeurs |

### Vue d'ensemble du code

| Document | Description |
|----------|-------------|
| **[COMPONENTS_INDEX.md](./COMPONENTS_INDEX.md)** | Index de tous les composants (90+) |
| **[QUICK_REFERENCE.md](./QUICK_REFERENCE.md)** | Référence rapide pour développeurs |

---

## 🔧 Documentation Technique

### Components

| Dossier | Documentation | Description |
|---------|---------------|-------------|
| `/components/pages/` | [README](../components/pages/README.md) | Pages complètes (IdeasPage, ProfilePage, etc.) |
| `/components/sections/` | [README](../components/sections/README.md) | Sections réutilisables (HeroSection, Features, FAQ) |
| `/components/features/` | [README](../components/features/README.md) | Features métier (AIPhotoGenerator, Galleries) |
| `/components/shared/` | [README](../components/shared/README.md) | Composants partagés (Header, Footer, etc.) |
| `/components/data/` | [README](../components/data/README.md) | Données et configurations |
| `/components/ui/` | shadcn | UI primitives (Button, Card, etc.) |

### Data & Config

| Dossier | Documentation | Description |
|---------|---------------|-------------|
| `/components/data/categories/` | [README](../components/data/categories/README.md) | Données catégories (definitions, examples, FAQ) |
| `/components/data/config/` | [README](../components/data/config/README.md) | Configurations (colors, forms, masonry) |
| `/components/data/prompts/` | [README](../components/data/prompts/README.md) ⭐ | 295 prompts FLUX optimisés |
| `/components/data/ideas/` | À créer | 148 idées de photos |

### Hooks

| Fichier | Documentation | Description |
|---------|---------------|-------------|
| `/hooks/` | [README](../hooks/README.md) | Guide complet des 6 hooks custom |
| `useAuth.ts` | JSDoc in-file | Authentification Supabase |
| `useCredits.ts` | JSDoc in-file | Gestion crédits |
| `useAIModels.ts` | JSDoc in-file | CRUD modèles IA + training |
| `useCategoryImages.ts` | JSDoc in-file | 4 hooks pour images catégories |
| `useExamplePhotos.ts` | JSDoc in-file | Photos d'exemple avec fallback |
| `useDebounce.ts` | JSDoc in-file | Debounce valeur & fonction |

---

## 📝 Logs de sessions

Historique détaillé de chaque session de refactoring :

| Session | Durée | Réalisations | Document |
|---------|-------|--------------|----------|
| **Session 1** | 30min | Fondations (3 composants) | [REFACTOR_SESSION_1.md](./REFACTOR_SESSION_1.md) |
| **Session 2** | 30min | Pages & SEO (2 composants) | [REFACTOR_SESSION_2.md](./REFACTOR_SESSION_2.md) |
| **Session 3** | 45min | Shared + Structure (3 composants) | [REFACTOR_SESSION_3.md](./REFACTOR_SESSION_3.md) |
| **Session 4** | 60min | Hooks + Data (6 hooks, 4 README) | [REFACTOR_SESSION_4.md](./REFACTOR_SESSION_4.md) |
| **Session 5** | 45min | Documentation intensive | [REFACTOR_SESSION_5.md](./REFACTOR_SESSION_5.md) |

**Total temps** : ~3h10 de travail intensif

---

## 🎨 Documentation Prompts & IA

Documentation spécifique à la génération d'images IA :

| Document | Description |
|----------|-------------|
| **[/data/prompts/README.md](../components/data/prompts/README.md)** ⭐ | Guide complet FLUX (295 prompts) |
| **[/docs/prompts-automation/](./prompts-automation/)** | Système d'automatisation des prompts |
| **[COMPLETE_GUIDE.md](./prompts-automation/COMPLETE_GUIDE.md)** | Guide complet d'automatisation |
| **[STRUCTURE.md](./prompts-automation/STRUCTURE.md)** | Structure des prompts |
| **[WORKFLOW.md](./prompts-automation/WORKFLOW.md)** | Workflow de génération |
| **[QUICK_START.md](./prompts-automation/QUICK_START.md)** | Quick start prompts |

### ⚠️ CRITIQUE - Optimisation FLUX

**Règle #1** : JAMAIS de negative prompts avec FLUX !

Voir guide détaillé dans :
- `/components/data/prompts/README.md` (section "Optimisation FLUX")
- `/docs/REFACTORING_COMPLETE_SUMMARY.md` (section "Système de Prompts")

---

## 🔍 Par use case

### Je veux...

#### ...démarrer sur le projet
1. Lire [QUICK_REFERENCE.md](./QUICK_REFERENCE.md)
2. Explorer [COMPONENTS_INDEX.md](./COMPONENTS_INDEX.md)
3. Lire [/hooks/README.md](../hooks/README.md)

#### ...migrer un nouveau composant
1. Lire [QUICK_REFACTOR_GUIDE.md](./QUICK_REFACTOR_GUIDE.md)
2. Voir les exemples dans `/components/pages/IdeasPage/`
3. Suivre le pattern établi

#### ...comprendre les hooks
1. Lire [/hooks/README.md](../hooks/README.md)
2. Voir les JSDoc in-file pour chaque hook
3. Tester avec les exemples fournis

#### ...générer des images IA
1. Lire [/data/prompts/README.md](../components/data/prompts/README.md) ⭐
2. Utiliser `ALL_CATEGORIES_PROMPTS_CONFIG`
3. Respecter les règles FLUX (pas de negative prompts)

#### ...comprendre l'architecture
1. Lire [ARCHITECTURE_REFACTOR.md](./ARCHITECTURE_REFACTOR.md)
2. Voir [REFACTORING_COMPLETE_SUMMARY.md](./REFACTORING_COMPLETE_SUMMARY.md)
3. Explorer la structure `/components/`

#### ...contribuer au refactoring
1. Check [REFACTOR_PROGRESS.md](./REFACTOR_PROGRESS.md)
2. Suivre [QUICK_REFACTOR_GUIDE.md](./QUICK_REFACTOR_GUIDE.md)
3. Voir [COMPONENTS_INDEX.md](./COMPONENTS_INDEX.md) pour les priorités

---

## 📊 Statistiques du projet

### Composants

- **Total composants** : ~90
- **Migrés** : 8 (9%)
- **Pages** : 20 (2 migrés)
- **Sections** : 15+ (0 migrés)
- **Features** : 25+ (0 migrés)
- **Shared** : 10 (6 migrés)

### Hooks

- **Total hooks** : 6
- **Documentés** : 6 (100%) ✅

### Data

- **Prompts** : 295
- **Catégories** : 18
- **Idées** : 148
- **Structure** : 100% créée

### Documentation

- **README** : 20+ fichiers
- **Lignes** : 2000+ lignes
- **Sessions** : 5 complétées

---

## 🎯 Prochaines étapes

Voir [REFACTOR_PROGRESS.md](./REFACTOR_PROGRESS.md) pour :
- Status actuel
- Prochaines phases
- Priorités
- Planning estimé

Top 10 composants à migrer :
1. HeroSection
2. AIPhotoGenerator
3. UnifiedGallery
4. Features
5. FAQ
6. PhotoGlowPage
7. CreateModelModal
8. AuthModal
9. PhotoExamples
10. CategoryUniversalPage

---

## 🔗 Liens externes

### Documentation projet
- [README.md](../README.md) - README principal
- [START_HERE.md](../START_HERE.md) - Point de départ
- [ARCHITECTURE.md](../ARCHITECTURE.md) - Architecture originale

### Documentation Supabase
- [SUPABASE_DOCUMENTATION.md](../SUPABASE_DOCUMENTATION.md)
- [ENDPOINTS_AND_BUCKETS.md](../ENDPOINTS_AND_BUCKETS.md)

### Documentation features
- [AI_MODELS_PREVIEW_ARCHITECTURE.md](../AI_MODELS_PREVIEW_ARCHITECTURE.md)
- [CATEGORY_IMAGES_SYSTEM_READY.md](../CATEGORY_IMAGES_SYSTEM_READY.md)

---

## 📖 Glossaire

| Terme | Description |
|-------|-------------|
| **Barrel export** | Fichier index.ts qui ré-exporte tous les composants d'un dossier |
| **FLUX** | Modèle IA de Pollinations.ai pour génération d'images |
| **Negative prompt** | Prompt négatif (NON supporté par FLUX !) |
| **JSDoc** | Commentaires de documentation JavaScript/TypeScript |
| **Hook** | Fonction React custom réutilisable |
| **Shadcn** | Librairie de composants UI utilisée |
| **Migration** | Déplacement et documentation d'un composant |

---

## 💡 Tips de navigation

### Recherche dans VS Code

```bash
# Trouver un composant
Cmd+P → "ComponentName"

# Chercher dans les docs
Cmd+Shift+F → "votre recherche" → filter: docs/

# Voir la structure
Cmd+Shift+E → Explorer
```

### Structure mentale

```
docs/              → Documentation projet
├── INDEX.md       → Ce fichier (départ)
├── QUICK_*        → Guides rapides
├── REFACTOR_*     → Logs de refactoring
└── COMPONENTS_*   → Index composants

components/        → Code source
├── pages/         → Pages complètes
├── sections/      → Sections réutilisables
├── features/      → Features métier
├── shared/        → Composants partagés
└── data/          → Données & config

hooks/             → Hooks custom (6)
utils/             → Utilitaires
lib/               → Libraries core
```

---

## 🆘 Besoin d'aide ?

1. **Check la documentation** (ce fichier)
2. **Voir les exemples** de code existants
3. **Lire les JSDoc** dans les fichiers
4. **Consulter les logs** de sessions

---

## ✅ Checklist nouveau dev

- [ ] Lire [QUICK_REFERENCE.md](./QUICK_REFERENCE.md)
- [ ] Explorer [COMPONENTS_INDEX.md](./COMPONENTS_INDEX.md)
- [ ] Comprendre les hooks ([/hooks/README.md](../hooks/README.md))
- [ ] Lire guide FLUX ([/data/prompts/README.md](../components/data/prompts/README.md))
- [ ] Voir un exemple migré (IdeasPage, ProfilePage)
- [ ] Comprendre la structure `/components/`
- [ ] Tester les imports avec barrel exports

---

**Bienvenue sur PhotoGlow !** 🎉

Ce projet est bien documenté et prêt pour le développement. N'hésitez pas à explorer et contribuer ! 🚀

---

**Version** : 1.0
**Dernière MAJ** : Session 5
**Maintenance** : Ce fichier doit rester à jour comme point d'entrée principal
