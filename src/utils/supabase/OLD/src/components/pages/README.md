# 📄 Pages Components

Ce dossier contient les composants de pages complètes de l'application.

## Structure

Chaque page a son propre dossier avec :
- `index.tsx` - Export principal
- `PageName.tsx` - Composant principal
- `PageName.types.ts` - Types spécifiques (optionnel)
- `hooks/` - Hooks locaux (optionnel)

## Pages Actuelles

- **HomePage** - Page d'accueil avec hero et features
- **CategoryPage** - Page de catégorie universelle
- **AdminPage** - Console d'administration
- **ProfilePage** - Profil utilisateur
- **IdeasPage** - Galerie d'idées (148 concepts)
- **StudioPage** - Studio de création AI

## Exemple

```typescript
// components/pages/CategoryPage/index.tsx
export { CategoryPage } from './CategoryPage'
export type { CategoryPageProps } from './CategoryPage.types'
```
