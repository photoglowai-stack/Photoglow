# ✅ PLUGIN FIGMA V2 - PRÊT POUR TEST

**Date:** 6 Novembre 2024  
**Status:** 🟢 READY TO TEST

---

## 🎯 CE QUI FONCTIONNE

✅ Endpoint v1-preview.mjs  
✅ Seed déterministe (Speed)  
✅ Seed aléatoire (Shuffle)  
✅ +Net (384→448→512)  
✅ Retry 502  
✅ safe=false forcé  
✅ negative_prompt long  
✅ Attributs standardisés  
✅ Apply to Selection  
✅ Cleanup mémoire  

---

## 🚀 IMPORT RAPIDE

1. Figma Desktop → **Plugins → Development → Import plugin from manifest**
2. Sélectionner `/figma-plugin/manifest.json`
3. Lancer **PhotoGlow V2 - AI Preview**

---

## 🧪 TESTS ESSENTIELS

### Test 1: Speed (30s)
1. Choisir attributs (Woman, Brown hair, Blue eyes)
2. Cliquer **⚡ Speed** → Photo apparaît
3. Cliquer **⚡ Speed** encore → **MÊME VISAGE** ✅

### Test 2: Shuffle (30s)
1. Cliquer **🎲 Shuffle** → Photo différente
2. Cliquer **🎲 Shuffle** encore → **NOUVEAU VISAGE** ✅

### Test 3: +Net (30s)
1. Speed → 384px
2. **✨ +Net** → 448px **MÊME VISAGE** ✅
3. **✨ +Net** → 512px **MÊME VISAGE** ✅

### Test 4: Apply (30s)
1. Créer rectangle
2. Speed
3. **Apply to Selection** → ✅ Image dans rectangle

---

## 📋 PAYLOAD EXEMPLE

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

## 🔍 DEBUG

**DevTools:** `Cmd+Option+I` (Mac) | `Ctrl+Shift+I` (Win)

**Logs attendus:**
```
[PG] x-provider-url: https://image.pollinations.ai/...
Seed: 3141592653 | 384px | HS
```

---

## ⚠️ POINTS CRITIQUES

🔴 **safe=false** (ligne 25 api.js) - JAMAIS true  
🔴 **negative_prompt** >120 chars - Anti close-up  
🔴 **stableKey** inclut TOUS attributs - Seed stable  
🔴 **Retry 502** 2x avec délais - Tolérance erreurs  

---

## 📊 CHECKLIST VALIDATION

- [ ] Speed → Même visage
- [ ] Shuffle → Visages différents
- [ ] +Net → Résolution ↑, visage identique
- [ ] Apply → Image dans layer
- [ ] Attributs respectés (hair, eyes, skin)
- [ ] Pas de cartoon/illustration
- [ ] Cadrage correct (HS/CU/WU)

---

## ✅ SI TOUT PASSE

**PLUGIN VALIDÉ → PRÊT POUR PROD**

---

**Durée totale:** ~5 minutes  
**Fichiers modifiés:** config.js, utils.js, api.js, ui.html  
**Version:** V2 Preview System
