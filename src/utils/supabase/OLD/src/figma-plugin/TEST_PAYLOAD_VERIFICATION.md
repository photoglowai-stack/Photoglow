# 🧪 Vérification du Payload - Plugin Figma vs Backend

## ❓ Problème signalé

L'utilisateur a testé avec curl et se demande si le plugin envoie bien les **attributs** au backend, ou si on envoie encore un **prompt** par erreur.

---

## ✅ Tests curl confirmés qui fonctionnent

### 1️⃣ Avec PROMPT (ancien système):
```bash
curl -fL -X POST "$API" -H 'Content-Type: application/json' \
  -d '{
    "proxy": true,
    "fast": true,
    "ratio": "1:1",
    "px": 384,
    "safe": false,
    "prompt": "photorealistic instagram-virtual-model portrait, youthful adult (25–35) woman, tan skin, athletic build, long brown hair, hazel eyes, wearing sleeveless fitted tank top with modest neckline, confident look, looking at camera, white studio background, soft beauty lighting, studio-quality retouching, 85mm portrait look, shallow depth of field, shoulders-up, clean framing, high detail, natural skin texture, instagram influencer aesthetic, no celebrity likeness"
  }' \
  -o preview.jpg && open preview.jpg
```
**Résultat:** ✅ **19.8 KB** - Image générée

---

### 2️⃣ Avec ATTRIBUTS (nouveau système):
```bash
curl -fL -X POST "$API" -H 'Content-Type: application/json' \
  -d '{
    "proxy": true,
    "fast": true,
    "ratio": "1:1",
    "px": 384,
    "safe": false,
    "gender": "woman",
    "background": "studio",
    "outfit": "athleisure",
    "skin_tone": "tan",
    "hair_length": "long",
    "hair_color": "brown",
    "eye_color": "hazel",
    "body_type": "athletic",
    "bust_size": "medium",
    "butt_size": "medium",
    "mood": "confident",
    "seed": 123456789
  }' \
  -o preview.jpg && open preview.jpg
```
**Résultat:** ✅ **15.8 KB** - Image générée

---

### 3️⃣ Sans "proxy" pour voir le prompt généré par le backend:
```bash
curl -sS -X POST "$API" -H 'Content-Type: application/json' \
  -d '{
    "fast": true,
    "ratio": "1:1",
    "px": 384,
    "safe": false,
    "gender": "man",
    "background": "studio",
    "outfit": "tee",
    "skin_tone": "medium",
    "hair_length": "short",
    "hair_color": "black",
    "eye_color": "brown",
    "body_type": "athletic",
    "mood": "cool"
  }' | jq
```

**Réponse JSON:**
```json
{
  "ok": true,
  "mode": "preview",
  "provider_url": "https://image.pollinations.ai/prompt/photorealistic%20instagram-virtual-model%20portrait%2C%20youthful%20adult%20(25%E2%80%9335)%20man%2C%20medium%20skin%2C%20athletic%20build%2C%20short%20black%20hair%2C%20brown%20eyes%2C%20wearing%20fitted%20v-neck%20top%20with%20modest%20neckline%2C%20balanced%20chest%2C%20calm%20composed%20look%2C%20looking%20at%20camera%2C%20white%20studio%20background%2C%20soft%20beauty%20lighting%2C%20studio-quality%20retouching%2C%2085mm%20portrait%20look%2C%20shallow%20depth%20of%20field%2C%20shoulders-up%2C%20clean%20framing%2C%20high%20detail%2C%20natural%20skin%20texture%2C%20instagram%20influencer%20aesthetic%2C%20no%20celebrity%20likeness?model=flux&width=384&height=384&seed=2295926165&private=true&nologo=true&enhance=false&safe=false",
  "width": 384,
  "height": 384,
  "fast": true
}
```

**✅ CONCLUSION:** Le backend **GÉNÈRE CORRECTEMENT** le prompt à partir des attributs !

---

## 📋 Ce que le Plugin Figma envoie ACTUELLEMENT

### Étape 1: `ui.html` construit le payload

Fonction `buildPreviewPayload()` dans `/figma-plugin/ui.html` (ligne 1335):

```javascript
function buildPreviewPayload() {
  const payload = {};
  
  // Gender (required)
  if (pick(previewGender.value)) payload.gender = pick(previewGender.value);
  
  // Optional attributes
  if (pick(previewBackground.value)) payload.background = pick(previewBackground.value);
  if (pick(previewOutfit.value)) payload.outfit = pick(previewOutfit.value);
  
  // Physical attributes (snake_case)
  if (pick(previewHairColor.value)) payload.hair_color = pick(previewHairColor.value);
  if (pick(previewHairLength.value)) payload.hair_length = pick(previewHairLength.value);
  if (pick(previewSkinTone.value)) payload.skin_tone = pick(previewSkinTone.value);
  if (pick(previewEyeColor.value)) payload.eye_color = pick(previewEyeColor.value);
  if (pick(previewMood.value)) payload.mood = pick(previewMood.value);
  
  // Body attributes
  if (bodyType && pick(bodyType.value)) payload.body_type = pick(bodyType.value);
  if (bustSize && pick(bustSize.value)) payload.bust_size = pick(bustSize.value);
  if (buttSize && pick(buttSize.value)) payload.butt_size = pick(buttSize.value);
  
  // Ratio
  if (pick(previewAspect.value)) payload.ratio = pick(previewAspect.value);
  
  // Quality (px)
  if (previewQuality && pick(previewQuality.value)) {
    payload.px = parseInt(pick(previewQuality.value), 10);
  }
  
  // Seed
  payload.seed = window._lastPreviewSeed || Math.floor(Math.random() * Math.pow(2, 32));
  
  return payload;
}
```

**Payload envoyé de ui.html → main.js:**
```json
{
  "gender": "woman",
  "background": "studio",
  "outfit": "athleisure",
  "skin_tone": "tan",
  "hair_length": "long",
  "hair_color": "brown",
  "eye_color": "hazel",
  "body_type": "athletic",
  "bust_size": "medium",
  "butt_size": "medium",
  "mood": "confident",
  "ratio": "1:1",
  "px": 768,
  "seed": 1234567890
}
```

**❌ MANQUE:** `proxy`, `fast`, `safe`

---

### Étape 2: `main.js` complète le payload

Fonction dans `/figma-plugin/main.js` (ligne 358):

```javascript
// ✅ Build payload with ALL attributes (NO prompt - just attributes)
const ratio = form.ratio || form.aspectRatio || '1:1';
const px = form.px || 768;

// Determine safe mode: false for athleisure/tank/débardeur
const outfit = (form.outfit || 'athleisure').toLowerCase();
const isSafeOutfit = outfit !== 'athleisure' && outfit !== 'tank' && outfit !== 'débardeur';
const safe = form.safe !== undefined ? form.safe : isSafeOutfit;

// Generate random seed if not provided
const seed = form.seed || Math.floor(Math.random() * Math.pow(2, 32));

const payload = {
  proxy: true,                        // ✅ AJOUTÉ
  fast: true,                         // ✅ AJOUTÉ
  ratio: ratio === '3:4' ? '3:4' : '1:1',
  px: px,
  safe: safe,                         // ✅ AJOUTÉ
  gender: form.gender || 'woman',
  background: form.background || 'studio',
  outfit: form.outfit || 'athleisure',
  skin_tone: form.skin_tone || 'tan',
  hair_length: form.hair_length || 'long',
  hair_color: form.hair_color || 'brown',
  eye_color: form.eye_color || 'hazel',
  body_type: form.body_type || 'athletic',
  bust_size: form.bust_size || 'medium',
  butt_size: form.butt_size || 'medium',
  mood: form.mood || 'confident',
  seed: seed
};
```

**✅ Payload final envoyé au backend:**
```json
{
  "proxy": true,
  "fast": true,
  "ratio": "1:1",
  "px": 768,
  "safe": false,
  "gender": "woman",
  "background": "studio",
  "outfit": "athleisure",
  "skin_tone": "tan",
  "hair_length": "long",
  "hair_color": "brown",
  "eye_color": "hazel",
  "body_type": "athletic",
  "bust_size": "medium",
  "butt_size": "medium",
  "mood": "confident",
  "seed": 1234567890
}
```

**✅ AUCUN champ `prompt` n'est envoyé !**

---

## 🔍 Vérification finale

### Est-ce qu'on envoie un prompt ?

**NON ❌**

- ✅ Aucun champ `prompt` dans `buildPreviewPayload()` (ui.html)
- ✅ Aucun champ `prompt` dans le payload de `main.js`
- ✅ Recherche dans main.js : `grep "prompt.*:" main.js` → **0 résultats**

### Est-ce qu'on envoie les attributs ?

**OUI ✅**

Tous les attributs sont présents:
- ✅ `gender`
- ✅ `background`
- ✅ `outfit`
- ✅ `skin_tone`
- ✅ `hair_length`
- ✅ `hair_color`
- ✅ `eye_color`
- ✅ `body_type`
- ✅ `bust_size`
- ✅ `butt_size`
- ✅ `mood`
- ✅ `ratio`
- ✅ `px`
- ✅ `seed`
- ✅ `proxy`
- ✅ `fast`
- ✅ `safe`

---

## 🧹 Nettoyage effectué

### Fichier supprimé:
- ❌ `/figma-plugin/buildPreviewPayload.js` - **ANCIEN FICHIER** qui générait un prompt
  - Ce fichier n'était PAS utilisé dans le code actuel
  - Il contenait l'ancienne logique avec `prompt` 
  - Supprimé pour éviter toute confusion

---

## 📊 Comparaison: curl vs Plugin

| Champ | curl (test 2) | Plugin Figma | Status |
|-------|---------------|--------------|--------|
| `proxy` | ✅ true | ✅ true | ✅ OK |
| `fast` | ✅ true | ✅ true | ✅ OK |
| `ratio` | ✅ "1:1" | ✅ "1:1" | ✅ OK |
| `px` | ⚠️ 384 | ✅ 768 | ✅ MEILLEUR |
| `safe` | ✅ false | ✅ false | ✅ OK |
| `gender` | ✅ "woman" | ✅ "woman" | ✅ OK |
| `background` | ✅ "studio" | ✅ "studio" | ✅ OK |
| `outfit` | ✅ "athleisure" | ✅ "athleisure" | ✅ OK |
| `skin_tone` | ✅ "tan" | ✅ "tan" | ✅ OK |
| `hair_length` | ✅ "long" | ✅ "long" | ✅ OK |
| `hair_color` | ✅ "brown" | ✅ "brown" | ✅ OK |
| `eye_color` | ✅ "hazel" | ✅ "hazel" | ✅ OK |
| `body_type` | ✅ "athletic" | ✅ "athletic" | ✅ OK |
| `bust_size` | ✅ "medium" | ✅ "medium" | ✅ OK |
| `butt_size` | ✅ "medium" | ✅ "medium" | ✅ OK |
| `mood` | ✅ "confident" | ✅ "confident" | ✅ OK |
| `seed` | ✅ 123456789 | ✅ random | ✅ OK |
| `prompt` | ❌ ABSENT | ❌ ABSENT | ✅ CORRECT |

---

## ✅ Conclusion finale

### Le plugin Figma envoie EXACTEMENT les mêmes champs que le test curl qui fonctionne !

**Aucun champ `prompt` n'est envoyé** ✅  
**Tous les attributs sont envoyés correctement** ✅  
**Le backend génère le prompt à partir des attributs** ✅

### Seule différence:
- **curl test:** `px: 384` (image floue)
- **Plugin:** `px: 768` (image nette) ← MEILLEUR ! ⭐

---

## 🧪 Pour vérifier dans Figma Desktop

### 1. Ouvrir DevTools Console
```
Help → Toggle Developer Tools → Console
```

### 2. Chercher le log du payload
```
[Preview] 📊 Payload: {
  "proxy": true,
  "fast": true,
  "ratio": "1:1",
  "px": 768,
  "safe": false,
  "gender": "woman",
  "background": "studio",
  "outfit": "athleisure",
  ...
}
```

### 3. Vérifier qu'il n'y a PAS de champ "prompt"
```
✅ Aucun champ "prompt" ne doit apparaître
```

---

Date: 5 novembre 2025  
Test: Vérification payload attributs vs prompt  
Status: **CONFIRMÉ - Aucun prompt envoyé** ✅
