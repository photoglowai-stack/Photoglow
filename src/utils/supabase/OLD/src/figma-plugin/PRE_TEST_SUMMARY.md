# ✅ PLUGIN FIGMA V2 - RÉSUMÉ AVANT TEST

**Date:** 6 Novembre 2024  
**Status:** PRÊT POUR TEST FINAL

---

## 🎯 CE QUI A ÉTÉ FAIT

### 1. Architecture Complète ✅
- `config.js` - PRESETS avec ratio/px pour hs/cu/wu
- `utils.js` - Toutes fonctions (stableKey, deriveSeed, randomSeed, autoFromFraming, revokeBlobURL)
- `api.js` - Client API complet avec retry 502, headers, cleanup
- `ui.html` - Interface avec boutons Speed/Shuffle/+Net + formulaire complet
- `main.js` - Communication Figma + Apply to Selection
- `manifest.json` - Configuration réseau

### 2. Attributs API Standardisés ✅

**Plugin Figma (ui.html) :**
- hair_length: bald, short, medium, long ✅
- skin_tone: light, fair, medium, tan, deep ✅
- body_type: slim, average, athletic, curvy ✅
- bust_size: small, medium, large ✅
- butt_size: small, medium, large ✅
- mood: neutral, friendly, confident, cool, serious, approachable ✅

**Web App (AdminV2Unified.tsx) :**
- Mêmes attributs EXACTEMENT ✅
- Hair Length: bald, short, medium, long ✅
- Skin Tone: light, fair, medium, tan, deep ✅
- Body Type: athletic, slim, average, curvy ✅
- Bust/Butt Size: small, medium, large ✅
- Mood: neutral, friendly, confident, cool, serious, approachable ✅

### 3. Corrections Critiques V2 ✅

#### Endpoint API
- ✅ URL: `https://image-generator-api-chi.vercel.app/api/v1-preview.mjs`
- ✅ Méthode: POST avec JSON body
- ✅ Headers: Content-Type, Accept, idempotency-key

#### Payload
```javascript
{
  proxy: true,              // Binary JPEG mode
  fast: true,               // Fast generation
  safe: false,              // ⚠️ NSFW OFF (critique)
  ratio: "1:1",             // Auto from framing
  px: 384,                  // Auto from framing
  seed: 3141592653,         // Déterministe (Speed) ou Random (Shuffle)
  framing: "hs",            // hs/cu/wu
  negative_prompt: "extreme close-up, face-only, tight crop, zoomed-in face, forehead cut, chin cut, cropped hairline, soft focus, blur, low-res, jpeg artifacts",
  // + tous attributs physiques
}
```

#### Gestion Erreurs
- ✅ Retry 2x sur 502 avec délais progressifs (250ms, 600ms)
- ✅ AbortController pour annulation
- ✅ Cleanup blob URL pour éviter memory leaks
- ✅ Fallback provider_url si proxy échoue

#### Seed Management
- ✅ **Speed Mode:** seed = hash(attributs) → même visage à chaque fois
- ✅ **Shuffle Mode:** seed = random → nouveau visage
- ✅ **+Net Mode:** garde le même seed, augmente px (384→448→512)

### 4. Debounce & UX ✅
- ✅ Debounce 200ms sur boutons Speed/Shuffle
- ✅ Loading states pendant génération
- ✅ Seed display (ex: "Seed: 3141592653 | 384px | HS")
- ✅ Error messages clairs

---

## 🔬 SCÉNARIOS DE TEST

### Test 1: Speed Mode (Seed Stable)
1. Sélectionner attributs: Woman, Brown hair, Blue eyes, Medium skin
2. Cliquer **⚡ Speed**
3. ✅ Preview apparaît en 3-5s
4. Cliquer **⚡ Speed** à nouveau
5. ✅ **MÊME VISAGE** (seed identique)

### Test 2: Shuffle Mode (Seed Random)
1. Cliquer **🎲 Shuffle**
2. ✅ Preview différent
3. Cliquer **🎲 Shuffle** à nouveau
4. ✅ **VISAGE DIFFÉRENT** (nouveau seed)

### Test 3: +Net Mode (Résolution ↑)
1. Générer avec HS (384px)
2. Cliquer **✨ +Net**
3. ✅ Passe à CU (448px) **même visage**
4. Cliquer **✨ +Net** encore
5. ✅ Passe à WU (512px) **même visage**

### Test 4: Apply to Selection
1. Créer rectangle dans Figma
2. Générer preview
3. Sélectionner rectangle
4. Cliquer **Apply to Selection**
5. ✅ Image appliquée au rectangle

### Test 5: Retry 502
1. Si backend retourne 502
2. ✅ Retry automatique après 250ms
3. ✅ 2ème retry après 600ms
4. ✅ Message erreur si échec final

---

## 📋 CHECKLIST AVANT IMPORT FIGMA

### Fichiers présents
- ✅ `/figma-plugin/manifest.json`
- ✅ `/figma-plugin/main.js`
- ✅ `/figma-plugin/ui.html`
- ✅ `/figma-plugin/config.js`
- ✅ `/figma-plugin/utils.js`
- ✅ `/figma-plugin/api.js`

### Configuration
- ✅ manifest.json pointe vers main.js + ui.html
- ✅ networkAccess inclut image-generator-api-chi.vercel.app
- ✅ Pas de build nécessaire (ESM natif)

### Code critique
- ✅ safe=false FORCÉ (api.js ligne 25)
- ✅ negative_prompt long (>120 chars)
- ✅ Retry 502 implémenté
- ✅ stableKey inclut tous attributs
- ✅ autoFromFraming retourne {ratio, px}

---

## 🚀 COMMANDES D'IMPORT

### Dans Figma Desktop
1. **Menu → Plugins → Development → Import plugin from manifest**
2. Naviguer vers `/figma-plugin/manifest.json`
3. Sélectionner le fichier
4. ✅ Plugin importé

### Lancer le plugin
1. **Menu → Plugins → Development → PhotoGlow V2 - AI Preview**
2. ✅ Panneau 360x640 s'ouvre
3. ✅ Formulaire visible
4. ✅ Boutons Speed/Shuffle/+Net/Apply

---

## ⚠️ POINTS D'ATTENTION

### 1. Backend API
- Endpoint: `https://image-generator-api-chi.vercel.app/api/v1-preview.mjs`
- Doit retourner image/jpeg en mode proxy:true
- Headers x-provider-url, x-seed exposés via CORS

### 2. Seed Déterministe
- stableKey doit inclure TOUS les attributs
- Ordre des clés important (JSON.stringify)
- Hash FNV-1a avec prefix "PGv1|"

### 3. Memory Management
- revokeBlobURL avant créer nouveau
- cleanup au beforeunload
- AbortController.abort() si nouvelle requête

### 4. Error Handling
- 502 → retry 2x
- Autres erreurs → afficher message
- Pas de sélection → notification

---

## 📊 LOGS ATTENDUS

### Console normal (Speed)
```
[PG] x-provider-url: https://image.pollinations.ai/prompt/...
Seed: 3141592653 | 384px | HS
```

### Console normal (Shuffle)
```
[PG] x-provider-url: https://image.pollinations.ai/prompt/...
Seed: 2718281828 | 384px | HS
```

### Console erreur
```
Preview failed [502] 
(retry 1/2 après 250ms...)
```

---

## ✅ VERDICT

**STATUS:** ✅ **100% PRÊT POUR TEST**

Tous les fichiers ont été vérifiés, tous les attributs sont conformes, toutes les fonctions critiques sont implémentées.

**Le plugin est prêt à être testé dans Figma Desktop.**

---

## 📞 SUPPORT DEBUG

Si problème lors du test :

1. **Ouvrir DevTools Figma:** `Cmd+Option+I` (Mac) ou `Ctrl+Shift+I` (Win)
2. **Vérifier Console** pour logs `[PG]`
3. **Vérifier Network** pour requêtes vers API
4. **Vérifier Payload** JSON envoyé

### Payload attendu (exemple)
```json
{
  "proxy": true,
  "fast": true,
  "safe": false,
  "ratio": "1:1",
  "px": 384,
  "gender": "woman",
  "skin_tone": "medium",
  "hair_length": "short",
  "hair_color": "brown",
  "eye_color": "brown",
  "body_type": "average",
  "bust_size": "medium",
  "butt_size": "medium",
  "mood": "confident",
  "background": "studio",
  "outfit": "tee",
  "framing": "hs",
  "negative_prompt": "extreme close-up, face-only, tight crop, zoomed-in face, forehead cut, chin cut, cropped hairline, soft focus, blur, low-res, jpeg artifacts",
  "seed": 3141592653
}
```

---

**Créé le:** 6 Novembre 2024  
**Version:** V2 Preview System  
**Next Step:** Import dans Figma Desktop + Tests
