# Changelog - PhotoGlow Figma Plugin

## [2.0.0] - 2024-11-05

### 🎉 Complete Refactor - V2 Preview System

**Complete rewrite from scratch** with clean architecture, enhanced performance, and new features.

#### 🗑️ CLEANUP: Legacy Files Removed (15 files)

**Plugin Legacy (10 files removed):**
- ❌ `helpers.js` - Built prompts client-side
- ❌ `ImageCache.js` - Stored images locally
- ❌ `GenerationQueue.js` - Job queue (not proxy)
- ❌ `Validator.js` - Legacy validation
- ❌ `fetchWithRetry.js` - Legacy retry logic
- ❌ `pollJobStatus.js` - Job polling (not proxy)
- ❌ `previewApi.js` - Legacy API (not proxy)
- ❌ `previewEndpoint.js` - Legacy endpoint
- ❌ `previewErrorMessages.js` - Legacy errors
- ❌ `logger.js` - Legacy logging

**Tests Removed (5 files):**
- ❌ All corresponding test files in `/tests/helpers/`

**Why removed:**
- V2 uses **proxy:true** only (binary JPEG response)
- Backend builds prompts (not client)
- No image storage (blob URLs only)
- No job polling (immediate response)
- Simpler architecture (6 files vs 16 files)

**See:** `CLEAN_LEGACY_FILES.md` for complete details

#### 🔒 CRITICAL: safe=false LOCKED

**⚠️ MOST IMPORTANT CHANGE:**
- `safe` is **ALWAYS false** in all payloads
- **NEVER** sends `safe: true` (prevents cartoon/illustration output)
- Hardcoded in `buildPayload()` in `api.js`
- Removed from `normalize()` in `utils.js`
- No `safe` field in UI form

**Files:**
- ✅ `api.js` - Line 48: `safe: false` locked
- ✅ `utils.js` - Line 53-54: safe removed from normalize
- ✅ `ui.html` - No safe field in form
- 📄 `SAFE_FALSE_VERIFICATION.md` - Complete verification guide
- 🧪 `TEST_SAFE_FALSE.md` - 2-minute test guide

#### ✨ New Features

**3 Generation Modes:**
- ⚡ **Speed Mode** - Deterministic seed for instant cache hits (<500ms replays)
- 🎲 **Shuffle Mode** - Random seed for creative exploration (new faces)
- ✨ **+Net Mode** - Increase resolution while keeping same face

**Smart Framing System:**
- 🎯 **Head & Shoulders (HS)** - 384px, ratio 1:1 (default, fastest)
- 🎯 **Chest-Up (CU)** - 448px, ratio 1:1 (enhanced)
- 🎯 **Waist-Up (WU)** - 512px, ratio 3:4 (portrait)
- Auto-resolution based on framing mode

**New Attributes:**
- 👗 **Neckline Control** (women) - crew, vneck, scoop, plunge, strapless, sleeveless
- 📐 **Bust Size** (women) - small, medium, large
- 📐 **Butt Size** (all) - small, medium, large
- 🎭 **Framing** - hs, cu, wu

**Performance & Architecture:**
- 🧹 **Modular Code** - Separated config.js, utils.js, api.js
- 🚀 **Smart Caching** - Seeds saved in memory + clientStorage
- 🛑 **Auto-Abort** - Automatic request cancellation between calls
- 🧹 **Cleanup** - Automatic blob URL cleanup (no memory leaks)
- ⚡ **Performance** - 2-4s first hit, <500ms cache replays

#### 📁 New Files (V2)
- `api.js` ⭐ - Complete API client with abort/cleanup
- `TEST_V2_QUICK.md` ⭐ - Quick test guide
- `REFACTOR_V2_COMPLETE.md` ⭐ - Complete V2 documentation

#### 🔄 Rewritten Files (100% new)
- `config.js` ✅ - Clean configuration
- `utils.js` ✅ - Utilities (normalize, seeds, cache)
- `ui.html` ✅ - Complete new UI with dark theme
- `main.js` ✅ - Simplified main thread

#### 🔧 Updated Files
- `manifest.json` - V2 branding, cleaned domains
- `README.md` - V2 documentation
- `CHANGELOG.md` - This file

#### 🎯 Key Improvements

**Speed:**
- Same attributes = same seed = same face (cache hit)
- Provider cache = instant replays
- Abort controller = no duplicate requests

**UX:**
- Clear 3-mode system (Speed/Shuffle/+Net)
- Visual feedback (loading, status, seed info)
- Auto-resolution based on framing
- Dark theme consistent with PhotoGlow

**Maintainability:**
- Modular architecture
- Comprehensive comments
- Simple, clear flow
- Easy to debug

#### 🧪 Testing

**Backend Tests (curl):**
- ✅ Woman HS 384px V-Neck
- ✅ Man CU 448px
- ✅ Woman WU 512px Plunge

**Figma Tests Required:**
- Speed mode (cache performance)
- Shuffle mode (exploration)
- +Net mode (enhancement)
- Apply to Selection
- Framing auto-resolution
- Neckline control (women)
- Bust/butt size

**See:** `TEST_V2_QUICK.md` for complete test guide

#### 📊 Performance Targets

| Action | First Hit | Replay (cache) |
|--------|-----------|----------------|
| Speed HS 384px | 2-4s | <500ms ⚡ |
| Shuffle HS 384px | 2-4s | N/A |
| +Net → 448px | 2-4s | <500ms |
| +Net → 512px | 3-5s | <500ms |
| Apply | <200ms | N/A |

#### 🚀 Status

✅ **All files created**  
✅ **Architecture complete**  
✅ **Backend tests ready**  
⏳ **Awaiting Figma Desktop tests**

---

## [6.1.0] - 2024-10-31

### 🎨 Preview V6 - Nouveauté Majeure

#### ✨ Ajouté
- **Système de prévisualisation rapide** avec endpoint Vercel optimisé
- **Interface de sélection d'attributs** (gender, background, outfit, hairColor, etc.)
- **Auto-debounce 500ms** pour éviter les appels excessifs
- **AbortController** pour annulation automatique des requêtes précédentes
- **Détection de cache** avec badge visuel (⚡ CACHE)
- **Validation UI** : bouton activé uniquement si gender + 2 attributs minimum
- **Messages d'erreur UX-friendly** avec emojis et textes clairs
- **Payload minimal** : envoi uniquement des attributs sélectionnés (pas de valeurs par défaut)

#### 📁 Nouveaux Fichiers
- `previewEndpoint.js` - Configuration centralisée de l'URL preview
- `previewApi.js` - Client API avec AbortController et gestion d'erreurs
- `buildPreviewPayload.js` - Construction de payload minimal + validation
- `previewErrorMessages.js` - Mapping des erreurs serveur → messages utilisateur
- `config.js` - Configuration centralisée du plugin
- `test-preview.md` - Scénarios de test complets
- `CHANGELOG.md` - Ce fichier

#### 🔧 Modifié
- `ui.html` : Ajout de la section AI Preview V6 avec tous les champs d'attributs
- `ui.html` : Ajout de la logique JavaScript complète pour la preview
- `main.js` : Hauteur du plugin augmentée à 720px
- `manifest.json` : Nom mis à jour + domaines Pollinations ajoutés
- `README.md` : Documentation complète de Preview V6

#### 🎯 Objectifs Atteints
- ✅ Endpoint Vercel configuré (pas de Supabase Functions)
- ✅ Payload minimal sans `prompt` côté client
- ✅ Gating UI fonctionnel (gender + 2 attributs)
- ✅ Debounce 500ms sur les changements
- ✅ Annulation automatique des requêtes
- ✅ Cache détecté et affiché
- ✅ Performance P50 ≤ 2-4s en mode `fast:true`

#### 🚫 Règles Respectées
- ❌ Jamais de champ `prompt` envoyé depuis le plugin
- ❌ Pas d'appel à `supabase.co/functions` pour la preview
- ❌ Pas de retry côté client (géré par le serveur)
- ❌ Pas de valeurs par défaut inventées dans le payload

---

## [6.0.0] - 2025-10-30

### Features
- Système de crédits avec API Vercel
- Génération Gen-4 (Replicate)
- Mode Test (gratuit)
- Auto-idempotency
- Logs JSON détaillés
- Health check API

---

## [5.0.0] - 2025-10-28

### Optimisations Phase 2
- Queue FIFO pour les générations
- Cache LRU pour les images
- Download parallèle
- Retry logic avec backoff exponentiel
- Validation robuste des payloads

---

**Format :** [Version Majeure.Mineure.Patch]  
**Convention :** Semantic Versioning (semver.org)
