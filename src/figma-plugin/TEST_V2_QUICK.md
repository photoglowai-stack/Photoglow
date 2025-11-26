# 🧪 PhotoGlow V2 - Quick Test Guide

**Version:** V2 (Complete Refactor)  
**Date:** November 5, 2024

---

## ✅ Fichiers créés (100% nouveaux)

### Core Files
- ✅ `config.js` - Configuration (API, résolutions)
- ✅ `utils.js` - Utilitaires (normalize, seeds, cache)
- ✅ `api.js` - Client API (previewFigma)
- ✅ `ui.html` - Interface utilisateur complète
- ✅ `main.js` - Thread principal Figma
- ✅ `manifest.json` - Manifest mis à jour

### Caractéristiques V2

**Résolutions:**
- 384px par défaut (Head & Shoulders)
- 448px avec +Net (Chest-Up)
- 512px avec +Net (Waist-Up)

**Modes:**
- ⚡ **Speed** : Seed déterministe → cache hits quasi-instantanés
- 🎲 **Shuffle** : Seed aléatoire → nouveau visage
- ✨ **+Net** : Augmente la résolution (même seed)

**Nouveaux attributs:**
- `framing` : hs | cu | wu
- `neckline` : crew | vneck | scoop | plunge | strapless | sleeveless
- `bust_size` : small | medium | large
- `butt_size` : small | medium | large

**Optimisations:**
- Abort automatique entre requêtes
- Cleanup des blob URLs
- Cache seeds en mémoire + clientStorage
- Résolution auto selon framing

---

## 🚀 Test dans Figma Desktop

### 1. Installation

```bash
cd figma-plugin

# Ouvrir Figma Desktop
# Plugins → Development → Import plugin from manifest
# Sélectionner : figma-plugin/manifest.json
```

### 2. Test Basique (Femme)

1. Créer un rectangle 512x512
2. Lancer le plugin
3. Sélectionner :
   - Gender: Woman
   - Framing: Head & Shoulders (hs)
   - Neckline: V-Neck
   - Bust Size: Medium
4. Cliquer **⚡ Speed**
5. Attendre 2-4s
6. Vérifier preview
7. Cliquer **Apply to Selection**

### 3. Test Shuffle (Exploration)

1. Avec la même config
2. Cliquer **🎲 Shuffle**
3. Observer : nouveau visage (seed différent)
4. Cliquer plusieurs fois Shuffle
5. Chaque fois = nouveau visage

### 4. Test +Net (Résolution)

1. Avec une preview existante
2. Noter le seed actuel
3. Cliquer **✨ +Net**
4. Vérifier : même visage, plus net (448px ou 512px)
5. Seed reste identique

### 5. Test Cache (Speed)

1. Générer une preview (Speed)
2. Noter le seed
3. Fermer le plugin
4. Rouvrir le plugin
5. Même config → Cliquer Speed
6. Vérifier : quasi-instantané (cache hit)

### 6. Test Homme

1. Sélectionner Gender: Man
2. Framing: Chest-Up (cu)
3. Body Type: Athletic
4. Butt Size: Medium
5. Cliquer Speed
6. Vérifier résolution auto = 448px

### 7. Test Waist-Up (Femme)

1. Gender: Woman
2. Framing: Waist-Up (wu)
3. Neckline: Plunge
4. Bust Size: Large
5. Vérifier résolution auto = 512px
6. Vérifier ratio = 3:4
7. Cliquer Speed

---

## 🧪 Test Backend (curl)

### Test A - Femme HS 384px V-Neck

```bash
curl -X POST https://image-generator-api-chi.vercel.app/api/v1-preview \
  -H "Content-Type: application/json" \
  -H "idempotency-key: test-woman-vneck-$(date +%s)" \
  -d '{
    "proxy": true,
    "fast": true,
    "ratio": "1:1",
    "px": 384,
    "safe": false,
    "gender": "woman",
    "background": "studio",
    "outfit": "blouse",
    "skin_tone": "medium",
    "hair_length": "long",
    "hair_color": "brown",
    "eye_color": "brown",
    "body_type": "average",
    "bust_size": "medium",
    "butt_size": "medium",
    "mood": "confident",
    "framing": "hs",
    "neckline": "vneck",
    "seed": 123456789
  }' \
  --output test-woman-hs-vneck.jpg

open test-woman-hs-vneck.jpg
```

**Attendu:**
- JPEG binaire
- 384x384px (1:1)
- Femme avec décolleté en V
- Bust visible et proportionné

### Test B - Homme CU 448px

```bash
curl -X POST https://image-generator-api-chi.vercel.app/api/v1-preview \
  -H "Content-Type: application/json" \
  -H "idempotency-key: test-man-cu-$(date +%s)" \
  -d '{
    "proxy": true,
    "fast": true,
    "ratio": "1:1",
    "px": 448,
    "safe": false,
    "gender": "man",
    "background": "office",
    "outfit": "shirt",
    "skin_tone": "medium",
    "hair_length": "short",
    "hair_color": "black",
    "eye_color": "brown",
    "body_type": "athletic",
    "bust_size": "medium",
    "butt_size": "medium",
    "mood": "professional",
    "framing": "cu",
    "neckline": null,
    "seed": 987654321
  }' \
  --output test-man-cu.jpg

open test-man-cu.jpg
```

**Attendu:**
- JPEG binaire
- 448x448px (1:1)
- Homme professionnel
- Chest-Up framing
- Plus de détails que 384px

### Test C - Femme WU 512px Plunge

```bash
curl -X POST https://image-generator-api-chi.vercel.app/api/v1-preview \
  -H "Content-Type: application/json" \
  -H "idempotency-key: test-woman-wu-plunge-$(date +%s)" \
  -d '{
    "proxy": true,
    "fast": true,
    "ratio": "3:4",
    "px": 512,
    "safe": false,
    "gender": "woman",
    "background": "studio",
    "outfit": "dress",
    "skin_tone": "medium",
    "hair_length": "long",
    "hair_color": "blonde",
    "eye_color": "blue",
    "body_type": "curvy",
    "bust_size": "large",
    "butt_size": "large",
    "mood": "confident",
    "framing": "wu",
    "neckline": "plunge",
    "seed": 555555555
  }' \
  --output test-woman-wu-plunge.jpg

open test-woman-wu-plunge.jpg
```

**Attendu:**
- JPEG binaire
- 512x683px (3:4 portrait)
- Waist-Up framing
- Plunge neckline
- Bust & butt proportionnés (large)

---

## ✅ Checklist de Succès

### Speed Mode (Déterministe)
- [ ] Mêmes attributs = même seed = même visage
- [ ] Preview < 4s au 1er hit
- [ ] Replay quasi-instantané (cache)
- [ ] Seed affiché dans l'UI

### Shuffle Mode (Exploration)
- [ ] Seed aléatoire à chaque fois
- [ ] Nouveau visage à chaque Shuffle
- [ ] Attributs restent identiques
- [ ] Seed différent affiché

### +Net Mode (Enhancement)
- [ ] Garde le même seed
- [ ] Augmente la résolution (448 ou 512)
- [ ] Même visage, plus de détails
- [ ] Résolution affichée correctement

### Framing & Neckline
- [ ] HS → 384px, ratio 1:1
- [ ] CU → 448px, ratio 1:1
- [ ] WU → 512px, ratio 3:4
- [ ] Neckline affecte le décolleté (femmes)
- [ ] Bust/butt size visibles et proportionnés

### Apply to Selection
- [ ] Applique l'image au node sélectionné
- [ ] Remplace le fill existant
- [ ] Notification de succès avec seed
- [ ] Erreur si pas de sélection

### Cache & Performance
- [ ] Seeds sauvegardés en clientStorage
- [ ] Mémoire cache fonctionne
- [ ] Abort entre requêtes
- [ ] Cleanup des blob URLs
- [ ] Pas de fuite mémoire

### UI/UX
- [ ] Preview affichée correctement
- [ ] Loading state visible
- [ ] Messages de status clairs
- [ ] Boutons disabled pendant génération
- [ ] Résolution auto selon framing

---

## 🐛 Debug

### Console logs attendus

```
[PhotoGlow] Plugin started
[previewFigma] Generating with: { mode: 'speed', seed: 123456, px: 384, ... }
[previewFigma] Success! Seed: 123456
[handleApplyToSelection] Success: { nodeName: 'Rectangle', seed: 123456, px: 384 }
```

### Erreurs possibles

**"not_image_response"**
- Backend a renvoyé du JSON au lieu de JPEG
- Vérifier proxy:true dans payload

**"preview_failed 500"**
- Erreur backend
- Vérifier logs backend
- Payload invalide ?

**"Request aborted"**
- Normal si on clique trop vite
- Nouvelle requête annule la précédente

**"No preview to apply"**
- Pas de preview générée
- Générer d'abord avec Speed/Shuffle

---

## 📊 Performance Attendue

| Action | 1er hit | Replay (cache) |
|--------|---------|----------------|
| Speed HS 384px | 2-4s | <500ms |
| Shuffle HS 384px | 2-4s | N/A (random) |
| +Net → 448px | 2-4s | <500ms |
| +Net → 512px | 3-5s | <500ms |
| Apply | <200ms | N/A |

---

## 🎯 Next Steps

Si tous les tests passent :

1. ✅ Plugin V2 est prêt pour production
2. ✅ Peut être publié commercialement
3. ✅ Peut intégrer d'autres features (batching, variantes, etc.)

Si des problèmes :

1. Vérifier console logs
2. Tester avec curl (backend isolé)
3. Vérifier payload dans Network tab
4. Reporter les erreurs avec logs complets

---

Date: November 5, 2024  
Status: **READY FOR TESTING** 🚀
