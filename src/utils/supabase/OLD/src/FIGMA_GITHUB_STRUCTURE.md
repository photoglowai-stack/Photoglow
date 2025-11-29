# 🎨 PhotoGlow - Figma Structure for GitHub

**Purpose**: Complete map of all Figma-related files and folders for GitHub repository.

**Date**: November 25, 2024  
**Status**: ✅ **READY FOR GITHUB**

---

## 📋 Quick Summary

PhotoGlow uses Figma in 3 main ways:

1. **Figma Assets** (`figma:asset/`) - ~50 static images
2. **Figma Plugins** (2 plugins) - User & Admin
3. **Figma Components** (1 component) - ImageWithFallback

---

## 🗂️ Complete Folder Structure

```
photoglow/
│
├── 📁 figma-plugin/                      # USER PLUGIN
│   │
│   ├── 📄 manifest.json                  # Figma plugin config ⚙️
│   │
│   ├── 🎯 CORE FILES
│   ├── 📄 code.js                        # Main plugin code
│   ├── 📄 ui.html                        # User interface
│   ├── 📄 api.js                         # API calls
│   ├── 📄 config.js                      # Configuration
│   ├── 📄 utils.js                       # Utilities
│   ├── 📄 main.js                        # Entry point
│   ├── 📄 build.js                       # Build script
│   │
│   ├── 🧪 TESTING
│   ├── 📄 test-payload.html              # Payload testing UI
│   │
│   └── 📚 DOCUMENTATION (Keep ALL)
│       ├── 📄 README.md                  # ⭐ Main documentation
│       ├── 📄 CHANGELOG.md               # Version history
│       ├── 📄 DEPLOYMENT.md              # Deployment guide
│       ├── 📄 INDEX.md                   # Navigation index
│       │
│       ├── 🚀 QUICK START
│       ├── 📄 QUICK_REFERENCE.md
│       ├── 📄 QUICK_TEST_GUIDE.md
│       ├── 📄 TEST_V2_QUICK.md
│       │
│       ├── 🔧 TECHNICAL
│       ├── 📄 API_V9_QUICK_REF.md
│       ├── 📄 PAYLOAD_REFERENCE.md
│       ├── 📄 REFACTOR_V2_COMPLETE.md
│       │
│       ├── 🐛 DEBUGGING
│       ├── 📄 HOW_TO_DEBUG.md
│       ├── 📄 DEBUG_API_ISSUE.md
│       ├── 📄 QUICK_DEBUG_PAYLOAD.md
│       │
│       ├── ✅ TESTING & VERIFICATION
│       ├── 📄 TEST_READY.md
│       ├── 📄 AUDIT_PRE_TEST.md
│       ├── 📄 PRE_TEST_SUMMARY.md
│       ├── 📄 TEST_PAYLOAD_VERIFICATION.md
│       ├── 📄 REPONSE_VERIFICATION_PAYLOAD.md
│       ├── 📄 TEST_SAFE_FALSE.md
│       ├── 📄 SAFE_FALSE_VERIFICATION.md
│       │
│       ├── 🧹 MAINTENANCE
│       ├── 📄 CLEAN_LEGACY_FILES.md
│       └── 📄 V2_FINAL_FIXES.md
│
│
├── 📁 figma-plugin-admin/                # ADMIN PLUGIN
│   │
│   ├── 📄 manifest.json                  # Figma plugin config ⚙️
│   │
│   ├── 🎯 CORE FILES
│   ├── 📄 code.js                        # Main plugin code
│   ├── 📄 ui.html                        # User interface
│   ├── 📄 generator-snippet.js           # Generation snippet
│   │
│   └── 📚 DOCUMENTATION (Keep ALL)
│       ├── 📄 README.md                  # ⭐ Main documentation
│       ├── 📄 QUICK_START.md             # Quick setup guide
│       ├── 📄 CONFIG_GUIDE.md            # Configuration guide
│       └── 📄 README_CLEAN_GENERATOR.md  # Clean generator docs
│
│
├── 📁 components/
│   └── 📁 figma/                         # FIGMA COMPONENTS
│       ├── 📄 ImageWithFallback.tsx      # Main component ⭐
│       └── 📄 README.md                  # Component docs
│
│
├── 📁 api/
│   └── 📄 storage-signed-upload.ts       # Upload API for plugins
│
│
└── 📁 docs/ (root documentation)
    ├── 📄 FIGMA_INTEGRATION_COMPLETE.md  # ⭐ Complete guide
    └── 📄 FIGMA_GITHUB_STRUCTURE.md      # This file
```

---

## 📊 File Count by Category

### Figma Plugin (User)

| Category | Count | Description |
|----------|-------|-------------|
| **Core Files** | 8 | code.js, ui.html, api.js, config.js, utils.js, main.js, build.js, manifest.json |
| **Testing** | 1 | test-payload.html |
| **Documentation** | 21 | All MD files |
| **TOTAL** | **30 files** | Complete user plugin |

### Figma Plugin Admin

| Category | Count | Description |
|----------|-------|-------------|
| **Core Files** | 4 | code.js, ui.html, generator-snippet.js, manifest.json |
| **Documentation** | 4 | README.md, QUICK_START.md, CONFIG_GUIDE.md, README_CLEAN_GENERATOR.md |
| **TOTAL** | **8 files** | Complete admin plugin |

### Figma Components

| Category | Count | Description |
|----------|-------|-------------|
| **Components** | 1 | ImageWithFallback.tsx |
| **Documentation** | 1 | README.md |
| **TOTAL** | **2 files** | Figma React components |

### Root Documentation

| Category | Count | Description |
|----------|-------|-------------|
| **Main Docs** | 2 | FIGMA_INTEGRATION_COMPLETE.md, FIGMA_GITHUB_STRUCTURE.md |
| **TOTAL** | **2 files** | Root-level Figma documentation |

---

## 🎯 Essential Files for GitHub

### Must Keep (Critical) ⚠️

These files are **essential** for functionality:

```
✅ figma-plugin/manifest.json
✅ figma-plugin/code.js
✅ figma-plugin/ui.html
✅ figma-plugin/api.js
✅ figma-plugin/config.js
✅ figma-plugin/utils.js

✅ figma-plugin-admin/manifest.json
✅ figma-plugin-admin/code.js
✅ figma-plugin-admin/ui.html
✅ figma-plugin-admin/generator-snippet.js

✅ components/figma/ImageWithFallback.tsx

✅ api/storage-signed-upload.ts
```

### Must Keep (Documentation) 📚

These files provide **critical documentation**:

```
✅ figma-plugin/README.md
✅ figma-plugin/CHANGELOG.md
✅ figma-plugin/DEPLOYMENT.md
✅ figma-plugin/API_V9_QUICK_REF.md
✅ figma-plugin/HOW_TO_DEBUG.md

✅ figma-plugin-admin/README.md
✅ figma-plugin-admin/QUICK_START.md
✅ figma-plugin-admin/CONFIG_GUIDE.md

✅ components/figma/README.md

✅ FIGMA_INTEGRATION_COMPLETE.md
✅ FIGMA_GITHUB_STRUCTURE.md
```

### Optional (But Recommended) 💡

These files add value for developers:

```
💡 figma-plugin/INDEX.md
💡 figma-plugin/QUICK_REFERENCE.md
💡 figma-plugin/QUICK_TEST_GUIDE.md
💡 figma-plugin/PAYLOAD_REFERENCE.md
💡 figma-plugin/REFACTOR_V2_COMPLETE.md
💡 All other plugin documentation
```

---

## 📝 Naming Conventions for GitHub

### Current Names (All Good! ✅)

| Current Name | Status | GitHub Friendly? |
|--------------|--------|------------------|
| `figma-plugin/` | ✅ Perfect | Yes - Clear & explicit |
| `figma-plugin-admin/` | ✅ Perfect | Yes - Distinguishes admin |
| `components/figma/` | ✅ Perfect | Yes - Organized & clear |
| `ImageWithFallback.tsx` | ✅ Perfect | Yes - PascalCase standard |
| `manifest.json` | ✅ Perfect | Yes - Figma standard |
| `code.js` | ✅ Perfect | Yes - Figma standard |
| `ui.html` | ✅ Perfect | Yes - Figma standard |

**Verdict**: ✅ **NO CHANGES NEEDED**

All naming follows best practices:
- Descriptive and clear
- Uses standard conventions
- Easy to understand
- GitHub-friendly

---

## 🔍 Understanding Each Component

### 1. User Plugin (`/figma-plugin/`)

**Purpose**: Plugin for end-users to generate AI photos

**Key Files**:
- `manifest.json` - Figma configuration
- `code.js` - Main plugin logic (runs in Figma sandbox)
- `ui.html` - User interface (HTML + inline CSS/JS)
- `api.js` - API calls to Vercel endpoint
- `config.js` - Configuration constants

**How It Works**:
```
User opens plugin in Figma
   ↓
UI loads (ui.html)
   ↓
User selects options
   ↓
code.js sends request to API (api.js)
   ↓
API calls Vercel endpoint
   ↓
Image generated and displayed
```

**Documentation**:
- `README.md` - Start here
- `DEPLOYMENT.md` - How to deploy
- `HOW_TO_DEBUG.md` - Troubleshooting

---

### 2. Admin Plugin (`/figma-plugin-admin/`)

**Purpose**: Plugin for admins to generate images for all categories

**Key Files**:
- `manifest.json` - Figma configuration
- `code.js` - Main plugin logic
- `ui.html` - Admin interface
- `generator-snippet.js` - Batch generation logic

**How It Works**:
```
Admin opens plugin in Figma
   ↓
Selects categories to generate
   ↓
Plugin loops through all categories
   ↓
For each category:
  - Generate images with prompts
  - Upload to Supabase Storage
  - Organize in buckets
   ↓
Complete! All categories populated
```

**Documentation**:
- `README.md` - Overview
- `QUICK_START.md` - Quick setup
- `CONFIG_GUIDE.md` - Configuration details

---

### 3. Figma Component (`/components/figma/`)

**Purpose**: React component to handle Figma assets with fallback

**Key File**:
- `ImageWithFallback.tsx` - Component implementation

**How It Works**:
```typescript
// Usage
<ImageWithFallback src={figmaAsset} alt="..." />
   ↓
Try to load image
   ↓
Success? → Display image
   ↓
Failure? → Display placeholder + log error
```

**Why Needed**:
`figma:asset/` imports only work in Figma Make environment. This component provides graceful fallback for production.

---

## 🎨 Figma Assets Usage

### Assets in Components (~50 images)

```typescript
// Example imports found in codebase
import heroImage from 'figma:asset/7b72549a8a77efb9402ca42ba29b2b153272e742.png';
import logo from 'figma:asset/a3d62fe320695b906cb3bc1f68f9228f8d43ed2c.png';
import selfie1 from 'figma:asset/0add018c10f3889f2c712223ec4a093b5ddf753a.png';
// ... ~47 more
```

### Components Using figma:asset/

1. `AIPhotoGenerator.tsx` - 1 asset
2. `BeforeAfterTransformation.tsx` - 5 assets
3. `CategoryHowItWorks.tsx` - 11 assets
4. `CategoryShowcase.tsx` - 1 asset
5. `ComparisonSection.tsx` - 4 assets
6. `ExploreAIModelsPage.tsx` - 7 assets
7. `HowItWorks.tsx` - 11 assets
8. `PhotoExamples.tsx` - 1 asset
9. And more...

**Total**: ~50 figma:asset imports across 10+ components

---

## 🚀 Deployment Checklist

### Before Pushing to GitHub

#### 1. Verify Files

```bash
# Check all Figma files are present
ls -la figma-plugin/
ls -la figma-plugin-admin/
ls -la components/figma/

# Verify manifests are valid JSON
cat figma-plugin/manifest.json | jq .
cat figma-plugin-admin/manifest.json | jq .
```

#### 2. Update Documentation

```bash
# Ensure these docs are up to date
cat FIGMA_INTEGRATION_COMPLETE.md
cat FIGMA_GITHUB_STRUCTURE.md
cat figma-plugin/README.md
cat figma-plugin-admin/README.md
cat components/figma/README.md
```

#### 3. Test Locally

```bash
# User plugin
cd figma-plugin
# Import in Figma and test

# Admin plugin
cd figma-plugin-admin
# Import in Figma and test

# Component
# Verify ImageWithFallback works in app
npm run dev
```

#### 4. Version Check

```bash
# Verify versions in manifests
grep "version" figma-plugin/manifest.json
grep "version" figma-plugin-admin/manifest.json
```

#### 5. Git Add

```bash
# Add all Figma-related files
git add figma-plugin/
git add figma-plugin-admin/
git add components/figma/
git add api/storage-signed-upload.ts
git add FIGMA_INTEGRATION_COMPLETE.md
git add FIGMA_GITHUB_STRUCTURE.md
```

---

## ✅ Final Verification

### Structure Checklist

- [x] User plugin folder exists (`/figma-plugin/`)
- [x] Admin plugin folder exists (`/figma-plugin-admin/`)
- [x] Component folder exists (`/components/figma/`)
- [x] All core files present
- [x] All documentation present
- [x] Naming is clear and explicit
- [x] READMEs in each folder
- [x] Root documentation complete

### Documentation Checklist

- [x] FIGMA_INTEGRATION_COMPLETE.md created
- [x] FIGMA_GITHUB_STRUCTURE.md created
- [x] figma-plugin/README.md exists
- [x] figma-plugin-admin/README.md exists
- [x] components/figma/README.md created
- [x] All guides are clear and complete

### Code Checklist

- [x] ImageWithFallback.tsx is production-ready
- [x] Plugins have all necessary files
- [x] API endpoint exists and works
- [x] No broken imports
- [x] TypeScript compiles successfully

---

## 🎯 Summary

### What We Have

✅ **2 Figma Plugins** - User & Admin  
✅ **1 Figma Component** - ImageWithFallback  
✅ **~50 Figma Assets** - Used across 10+ components  
✅ **1 API Endpoint** - For plugin uploads  
✅ **Complete Documentation** - 5 README files + 2 guides  

### File Counts

- **Total Figma Files** : 42 files
  - User Plugin: 30 files
  - Admin Plugin: 8 files
  - Component: 2 files
  - Root Docs: 2 files

### Status

✅ **Structure is perfect for GitHub**  
✅ **No renaming needed**  
✅ **Documentation is complete**  
✅ **Everything is production-ready**  

---

## 🔗 Quick Links

- **[Complete Integration Guide](/FIGMA_INTEGRATION_COMPLETE.md)** - Full technical details
- **[User Plugin README](/figma-plugin/README.md)** - User plugin documentation
- **[Admin Plugin README](/figma-plugin-admin/README.md)** - Admin plugin documentation
- **[Component README](/components/figma/README.md)** - ImageWithFallback docs

---

**Conclusion**: La structure Figma de PhotoGlow est **parfaitement organisée** et **prête pour GitHub**. Aucune modification de noms ou de structure n'est nécessaire. Tout est clair, bien documenté, et suit les best practices ! 🎉

**Last Updated**: November 25, 2024  
**Status**: ✅ **READY FOR GITHUB PUSH**
