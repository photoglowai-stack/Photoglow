# 🎨 PhotoGlow - Figma Integration Complete Guide

**Date**: November 25, 2024  
**Version**: 2.0  
**Status**: ✅ **PRODUCTION READY**

---

## 📋 Table of Contents

1. [Overview](#overview)
2. [Figma Assets in PhotoGlow](#figma-assets-in-photoglow)
3. [Figma Plugins](#figma-plugins)
4. [Figma Component](#figma-component)
5. [Asset Management](#asset-management)
6. [GitHub Structure](#github-structure)
7. [Usage Examples](#usage-examples)
8. [Best Practices](#best-practices)

---

## 🎯 Overview

PhotoGlow utilise Figma de plusieurs façons :

### 1. **Figma Assets** (`figma:asset/`)
Images importées depuis Figma et utilisées dans l'application

### 2. **Figma Plugins**
Deux plugins pour générer des images AI :
- **User Plugin**: Pour les utilisateurs finaux
- **Admin Plugin**: Pour la génération massive d'images

### 3. **Figma Component**
Composant React spécial pour gérer les images avec fallback

---

## 🖼️ Figma Assets in PhotoGlow

### Qu'est-ce que `figma:asset/` ?

Les imports `figma:asset/` sont des **images statiques** importées depuis Figma Make.

```typescript
// Exemple d'import
import heroImage from 'figma:asset/7b72549a8a77efb9402ca42ba29b2b153272e742.png';
import logo from 'figma:asset/a3d62fe320695b906cb3bc1f68f9228f8d43ed2c.png';
```

### 📊 Statistiques des Figma Assets

**Total d'assets utilisés** : ~50+ images

**Fichiers utilisant figma:asset/** :
1. `AIPhotoGenerator.tsx` - 1 asset
2. `BeforeAfterTransformation.tsx` - 5 assets
3. `CategoryHowItWorks.tsx` - 11 assets
4. `CategoryShowcase.tsx` - 1 asset
5. `ComparisonSection.tsx` - 4 assets
6. `ExploreAIModelsPage.tsx` - 7 assets
7. `HowItWorks.tsx` - 11 assets
8. `PhotoExamples.tsx` - 1 asset

### 📁 Types d'Assets

#### Before/After Images
```typescript
// BeforeAfterTransformation.tsx
import selfie1 from 'figma:asset/0add018c10f3889f2c712223ec4a093b5ddf753a.png';
import selfie2 from 'figma:asset/2c508c4e08485a8f3e97314d1e81a5ddf454e5a1.png';
import aiResult from 'figma:asset/122dcd2ebe2b9d58e158d5aa006fd43d2ea55ea8.png';
```

#### Social Media Logos
```typescript
// HowItWorks.tsx
import instagramLogo from 'figma:asset/a3d62fe320695b906cb3bc1f68f9228f8d43ed2c.png';
import linkedinLogo from 'figma:asset/b45cb94262e9dc3e4f49d97475ceb9570d781443.png';
import pinterestLogo from 'figma:asset/5d083b8c046522abf88456dc17431671c7a94f0d.png';
```

#### UI Elements
```typescript
// CategoryHowItWorks.tsx
import phoneImage from 'figma:asset/16b71f196debb8a02e63c336078a93f05b9711fe.png';
```

#### Hero Images
```typescript
// ComparisonSection.tsx
import heroImage from 'figma:asset/7b72549a8a77efb9402ca42ba29b2b153272e742.png';
import transformationGif from 'figma:asset/52f7e7d0adee03854e33fae60c4b2d16b8b1e46e.gif';
```

### 🔗 Unsplash Integration

PhotoGlow utilise aussi des images Unsplash avec attribution Figma :

```typescript
image: 'https://images.unsplash.com/photo-1622169804256-0eb6873ff441?...&utm_source=figma&utm_medium=referral'
```

**Attribution requise** : Voir `Attributions.md`

---

## 🔌 Figma Plugins

PhotoGlow a **2 plugins Figma** distincts :

### 1. User Plugin (`/figma-plugin/`)

**Purpose** : Plugin pour utilisateurs finaux générant des photos AI

#### 📁 Structure
```
figma-plugin/
├── 📄 README.md                    # Documentation principale
├── 📄 CHANGELOG.md                 # Historique des versions
├── 📄 DEPLOYMENT.md                # Guide de déploiement
├── 📄 INDEX.md                     # Index de navigation
│
├── 📄 manifest.json                # Config Figma
├── 📄 code.js                      # Code principal du plugin
├── 📄 ui.html                      # Interface utilisateur
│
├── 📄 api.js                       # Appels API
├── 📄 config.js                    # Configuration
├── 📄 utils.js                     # Utilitaires
├── 📄 main.js                      # Point d'entrée
├── 📄 build.js                     # Script de build
│
├── 📄 test-payload.html            # Tests de payload
│
└── 📁 docs/                        # Documentation additionnelle
    ├── API_V9_QUICK_REF.md
    ├── QUICK_REFERENCE.md
    ├── HOW_TO_DEBUG.md
    ├── PAYLOAD_REFERENCE.md
    ├── QUICK_TEST_GUIDE.md
    └── ...
```

#### ⚙️ Features
- ✅ Génération d'images AI via API Vercel
- ✅ 3 modes de création
  - Standard Generation (FLUX)
  - Add Object/Decor (Gen-4)
  - Virtual Try-On (Gen-4)
- ✅ Gestion des crédits utilisateur
- ✅ Upload d'images vers Supabase
- ✅ Authentification Bearer token

#### 🚀 Version Actuelle
**Version** : 2.0.0  
**Date** : November 5, 2024  
**Status** : Production Ready

#### 📚 Documentation
- **Installation** : `figma-plugin/README.md`
- **Déploiement** : `figma-plugin/DEPLOYMENT.md`
- **API Reference** : `figma-plugin/API_V9_QUICK_REF.md`
- **Changelog** : `figma-plugin/CHANGELOG.md`

---

### 2. Admin Plugin (`/figma-plugin-admin/`)

**Purpose** : Plugin admin pour génération massive d'images de catégories

#### 📁 Structure
```
figma-plugin-admin/
├── 📄 README.md                    # Documentation principale
├── 📄 QUICK_START.md               # Guide rapide
├── 📄 CONFIG_GUIDE.md              # Configuration
├── 📄 README_CLEAN_GENERATOR.md    # Clean generator
│
├── 📄 manifest.json                # Config Figma
├── 📄 code.js                      # Code principal
├── 📄 ui.html                      # Interface
│
└── 📄 generator-snippet.js         # Snippet de génération
```

#### ⚙️ Features
- ✅ Génération massive pour toutes les catégories
- ✅ Upload automatique vers Supabase Storage
- ✅ Organisation par buckets (`ai_gallery/categories/{category}/`)
- ✅ Support des catégories événementielles
  - Halloween, Diwali, Noël, etc.
- ✅ Gestion des prompts optimisés FLUX
- ✅ Batch processing

#### 🎯 Use Cases
1. Générer des images pour toutes les catégories
2. Créer des galeries d'exemples
3. Peupler les buckets Supabase
4. Tester les prompts AI

#### 📚 Documentation
- **Quick Start** : `figma-plugin-admin/QUICK_START.md`
- **Configuration** : `figma-plugin-admin/CONFIG_GUIDE.md`
- **Clean Generator** : `figma-plugin-admin/README_CLEAN_GENERATOR.md`

---

## 🧩 Figma Component

### ImageWithFallback Component

**Location** : `/components/figma/ImageWithFallback.tsx`

#### Purpose
Composant React spécial pour gérer les images avec fallback automatique.

#### Features
- ✅ Fallback automatique si image non trouvée
- ✅ Support des images Figma assets
- ✅ Support des images externes (Unsplash, etc.)
- ✅ Props identiques à `<img>`
- ✅ TypeScript strict

#### Usage

```typescript
import { ImageWithFallback } from './figma/ImageWithFallback';

// Avec figma asset
<ImageWithFallback 
  src={figmaAsset} 
  alt="Description"
  className="w-full h-auto"
/>

// Avec URL externe
<ImageWithFallback 
  src="https://example.com/image.jpg"
  alt="Description"
/>
```

#### Why This Component?

**Problème** : Les imports `figma:asset/` peuvent ne pas exister en dehors de Figma Make.

**Solution** : `ImageWithFallback` gère automatiquement :
1. Si l'image existe → affiche l'image
2. Si l'image n'existe pas → affiche un placeholder
3. Logs l'erreur pour debugging

#### Code Source

```typescript
/**
 * ImageWithFallback - Composant d'image avec fallback automatique
 * 
 * Utilisé pour gérer les imports figma:asset/ qui peuvent ne pas exister
 * en dehors de l'environnement Figma Make
 */
export function ImageWithFallback({ src, alt, ...props }) {
  // Implementation
}
```

---

## 📦 Asset Management

### Comment les Assets Figma Fonctionnent

#### Dans Figma Make
```typescript
// Import direct depuis Figma
import image from 'figma:asset/abc123.png';

// L'image est automatiquement disponible
<img src={image} alt="..." />
```

#### En Production
```typescript
// Les assets figma:asset/ sont compilés en URLs statiques
// par le build process de Figma Make

// Résultat final :
<img src="/static/figma/abc123.png" alt="..." />
```

### Structure des Assets dans le Build

```
build/
└── static/
    └── figma/
        ├── 0add018c10f3889f2c712223ec4a093b5ddf753a.png
        ├── 2c508c4e08485a8f3e97314d1e81a5ddf454e5a1.png
        ├── 7b72549a8a77efb9402ca42ba29b2b153272e742.png
        └── ...
```

### Best Practices pour Assets

#### ✅ DO
```typescript
// Utiliser ImageWithFallback pour tous les assets
import { ImageWithFallback } from './figma/ImageWithFallback';
import heroImage from 'figma:asset/abc123.png';

<ImageWithFallback src={heroImage} alt="Hero" />
```

#### ❌ DON'T
```typescript
// Ne pas utiliser <img> directement avec figma:asset
import heroImage from 'figma:asset/abc123.png';

<img src={heroImage} alt="Hero" /> // ❌ Peut casser hors Figma Make
```

---

## 📁 GitHub Structure

Voici comment organiser les dossiers Figma pour GitHub :

### Structure Actuelle ✅

```
photoglow/
├── 📁 figma-plugin/                # Plugin utilisateur
│   ├── README.md                   # Documentation
│   ├── CHANGELOG.md
│   ├── DEPLOYMENT.md
│   ├── manifest.json
│   ├── code.js
│   ├── ui.html
│   └── ...
│
├── 📁 figma-plugin-admin/          # Plugin admin
│   ├── README.md
│   ├── QUICK_START.md
│   ├── CONFIG_GUIDE.md
│   ├── manifest.json
│   ├── code.js
│   └── ui.html
│
├── 📁 components/
│   └── 📁 figma/                   # Composants Figma
│       └── ImageWithFallback.tsx   # Composant principal
│
└── 📁 api/
    └── storage-signed-upload.ts    # API pour plugins
```

### Structure Recommandée pour GitHub 🌟

Aucun changement nécessaire ! La structure actuelle est **parfaite** et suit les best practices :

✅ **Séparation claire** : User plugin vs Admin plugin  
✅ **Nommage explicite** : `-admin` pour distinguer  
✅ **Documentation complète** : README dans chaque dossier  
✅ **Composants isolés** : `/components/figma/`  
✅ **API dédiée** : `/api/storage-signed-upload.ts`  

---

## 💡 Usage Examples

### Example 1: Using Figma Assets in Components

```typescript
// components/MyComponent.tsx
import { ImageWithFallback } from './figma/ImageWithFallback';
import heroImage from 'figma:asset/abc123.png';
import logo from 'figma:asset/def456.png';

export function MyComponent() {
  return (
    <div>
      <ImageWithFallback 
        src={logo} 
        alt="PhotoGlow Logo"
        className="w-32 h-32"
      />
      
      <ImageWithFallback 
        src={heroImage} 
        alt="Hero Image"
        className="w-full h-auto"
      />
    </div>
  );
}
```

### Example 2: Installing User Plugin

```bash
# 1. Navigate to plugin directory
cd figma-plugin

# 2. Review README
cat README.md

# 3. In Figma:
# - Plugins > Development > Import plugin from manifest
# - Select manifest.json
# - Plugin is ready!
```

### Example 3: Using Admin Plugin

```bash
# 1. Navigate to admin plugin directory
cd figma-plugin-admin

# 2. Review Quick Start
cat QUICK_START.md

# 3. Configure categories
# Edit config.js with your categories

# 4. Import in Figma and run
# Generate images for all categories
```

### Example 4: API Integration

```typescript
// api/storage-signed-upload.ts
// Génère une signed URL pour upload depuis Figma

export default async function handler(req, res) {
  // CORS pour Figma (Origin: null)
  if (req.method === 'OPTIONS') {
    return res.status(200).json({ success: true });
  }
  
  // Generate signed URL
  const { data, error } = await supabase.storage
    .from('user-uploads')
    .createSignedUploadUrl(`uploads/${filename}`);
    
  return res.json({ uploadUrl: data.signedUrl });
}
```

---

## ✨ Best Practices

### 1. Asset Management

#### Always Use ImageWithFallback
```typescript
// ✅ GOOD
import { ImageWithFallback } from './figma/ImageWithFallback';
<ImageWithFallback src={figmaAsset} alt="..." />

// ❌ BAD
<img src={figmaAsset} alt="..." />
```

#### Descriptive Alt Text
```typescript
// ✅ GOOD
<ImageWithFallback 
  src={heroImage} 
  alt="Professional headshot transformation example showing before and after AI enhancement"
/>

// ❌ BAD
<ImageWithFallback src={heroImage} alt="image" />
```

### 2. Plugin Development

#### Clear Documentation
- ✅ README avec installation steps
- ✅ CHANGELOG pour tracking des versions
- ✅ DEPLOYMENT guide pour production

#### Versioning
```json
// manifest.json
{
  "name": "PhotoGlow Plugin",
  "version": "2.0.0",
  "api": "1.0.0"
}
```

### 3. GitHub Organization

#### Clear Folder Names
- ✅ `figma-plugin` (user-facing)
- ✅ `figma-plugin-admin` (admin-only)
- ✅ `components/figma` (Figma-specific React components)

#### Complete Documentation
- ✅ README.md dans chaque dossier principal
- ✅ CHANGELOG.md pour historique
- ✅ Guides spécifiques (QUICK_START, CONFIG_GUIDE, etc.)

### 4. Asset Optimization

#### Image Sizes
```typescript
// Utiliser des tailles appropriées
const AVATAR_SIZE = 'w=128&h=128';
const THUMBNAIL_SIZE = 'w=400&h=300';
const HERO_SIZE = 'w=1920&h=1080';
```

#### Lazy Loading
```typescript
// Avec ImageWithFallback
<ImageWithFallback 
  src={largeImage} 
  alt="..."
  loading="lazy"
/>
```

### 5. Testing

#### Test Figma Assets
```typescript
// Tester avec et sans Figma Make
// Component devrait fonctionner dans les deux cas
```

#### Test Plugins
```bash
# Tester dans Figma
# 1. Development mode
# 2. Production mode
# 3. Error scenarios
```

---

## 📊 Summary

### Figma Integration dans PhotoGlow

| Aspect | Description | Location |
|--------|-------------|----------|
| **Assets** | ~50+ images statiques depuis Figma | `figma:asset/` imports |
| **User Plugin** | Plugin pour utilisateurs finaux | `/figma-plugin/` |
| **Admin Plugin** | Plugin génération massive | `/figma-plugin-admin/` |
| **Component** | ImageWithFallback | `/components/figma/` |
| **API** | Upload endpoint | `/api/storage-signed-upload.ts` |

### Files Count

- **Figma Assets Used** : ~50 images
- **Plugin Files (User)** : 30+ files
- **Plugin Files (Admin)** : 8 files
- **Figma Components** : 1 composant
- **Total Documentation** : 20+ MD files

### Status

✅ **Production Ready**  
✅ **Well Documented**  
✅ **GitHub Ready**  
✅ **Properly Organized**  

---

## 🔗 Related Documentation

- **User Plugin** : [`/figma-plugin/README.md`](/figma-plugin/README.md)
- **Admin Plugin** : [`/figma-plugin-admin/README.md`](/figma-plugin-admin/README.md)
- **API Documentation** : [`/docs/API.md`](/docs/API.md)
- **Architecture** : [`/ARCHITECTURE.md`](/ARCHITECTURE.md)

---

## 📝 Notes

### Asset Source Attribution

Tous les assets utilisent :
- Figma assets (statiques)
- Unsplash images (avec attribution)

Voir [`Attributions.md`](/Attributions.md) pour détails complets.

### Plugin Versions

- **User Plugin** : v2.0.0 (Production)
- **Admin Plugin** : v1.0.0 (Production)

### Component Status

- **ImageWithFallback** : ✅ Stable
- **Usage** : Utilisé dans 10+ composants

---

**Last Updated** : November 25, 2024  
**Maintained By** : PhotoGlow Team  
**Status** : ✅ Complete & Ready for GitHub
