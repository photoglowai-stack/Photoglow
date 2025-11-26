# 📦 PAYLOAD REFERENCE - Plugin Figma V2

**Endpoint:** `POST https://image-generator-api-chi.vercel.app/api/v1-preview.mjs`

---

## 🎯 PAYLOAD STANDARD (SPEED MODE)

### Headers
```http
Content-Type: application/json
Accept: image/*,application/json
idempotency-key: 550e8400-e29b-41d4-a716-446655440000
```

### Body (exemple Woman)
```json
{
  "proxy": true,
  "fast": true,
  "safe": false,
  "ratio": "1:1",
  "px": 384,
  "gender": "woman",
  "background": "studio",
  "outfit": "tee",
  "skin_tone": "medium",
  "hair_length": "short",
  "hair_color": "brown",
  "eye_color": "brown",
  "body_type": "average",
  "bust_size": "medium",
  "butt_size": "medium",
  "mood": "confident",
  "framing": "hs",
  "negative_prompt": "extreme close-up, face-only, tight crop, zoomed-in face, forehead cut, chin cut, cropped hairline, soft focus, blur, low-res, jpeg artifacts",
  "seed": 3141592653
}
```

---

## 🔄 VARIATIONS PAR MODE

### SPEED MODE (Seed déterministe)
```javascript
// Seed calculé via hash FNV-1a des attributs
const key = stableKey(attributes);
const seed = fnv1a32("PGv1|" + key);

// Exemple: 3141592653
```

**Comportement:**
- Même attributs → Même seed → Même visage
- Cache hit si généré précédemment

### SHUFFLE MODE (Seed aléatoire)
```javascript
// Seed généré via crypto.getRandomValues
const u = new Uint32Array(1);
crypto.getRandomValues(u);
const seed = u[0] >>> 0;

// Exemple: 2718281828
```

**Comportement:**
- Nouveau seed à chaque fois → Nouveau visage
- Pas de cache

### +NET MODE (Résolution ↑, seed constant)
```javascript
// Même seed que Speed, mais px augmenté
// 384 → 448 → 512
{
  ...speedPayload,
  px: 448,        // ou 512
  framing: "cu",  // ou "wu"
  seed: 3141592653 // MÊME SEED
}
```

**Comportement:**
- Seed identique → Même visage
- Résolution augmentée → Plus de détails
- Cadrage plus large (HS → CU → WU)

---

## 📋 ATTRIBUTS API COMPLETS

### Attributs Obligatoires
```json
{
  "proxy": true,              // TOUJOURS true
  "fast": true,               // TOUJOURS true
  "safe": false,              // ⚠️ TOUJOURS false (CRITIQUE)
  "ratio": "1:1" | "3:4",     // Auto from framing
  "px": 384 | 448 | 512,      // Auto from framing
  "gender": "woman" | "man",
  "background": "studio" | "office" | "city" | "nature",
  "outfit": "blazer" | "shirt" | "tee" | "athleisure",
  "skin_tone": "light" | "fair" | "medium" | "tan" | "deep",
  "hair_length": "bald" | "short" | "medium" | "long",
  "hair_color": "none" | "blonde" | "brown" | "black" | "red" | "gray",
  "eye_color": "brown" | "blue" | "green" | "hazel" | "gray",
  "body_type": "slim" | "average" | "athletic" | "curvy",
  "bust_size": "small" | "medium" | "large",
  "butt_size": "small" | "medium" | "large",
  "mood": "neutral" | "friendly" | "confident" | "cool" | "serious" | "approachable",
  "framing": "hs" | "cu" | "wu",
  "negative_prompt": "extreme close-up, face-only, tight crop, zoomed-in face, forehead cut, chin cut, cropped hairline, soft focus, blur, low-res, jpeg artifacts",
  "seed": 3141592653
}
```

### Attributs Optionnels
```json
{
  "neckline": "crew" | "v-neck" | "scoop" | "off-shoulder"  // Women only
}
```

---

## 🎨 EXEMPLES DE PAYLOADS

### Femme blonde, yeux bleus, peau claire (HS 384px)
```json
{
  "proxy": true,
  "fast": true,
  "safe": false,
  "ratio": "1:1",
  "px": 384,
  "gender": "woman",
  "background": "studio",
  "outfit": "blazer",
  "skin_tone": "fair",
  "hair_length": "long",
  "hair_color": "blonde",
  "eye_color": "blue",
  "body_type": "slim",
  "bust_size": "medium",
  "butt_size": "medium",
  "mood": "friendly",
  "framing": "hs",
  "neckline": "v-neck",
  "negative_prompt": "extreme close-up, face-only, tight crop, zoomed-in face, forehead cut, chin cut, cropped hairline, soft focus, blur, low-res, jpeg artifacts",
  "seed": 1234567890
}
```

### Homme brun, yeux marrons, peau tan (CU 448px)
```json
{
  "proxy": true,
  "fast": true,
  "safe": false,
  "ratio": "1:1",
  "px": 448,
  "gender": "man",
  "background": "city",
  "outfit": "shirt",
  "skin_tone": "tan",
  "hair_length": "short",
  "hair_color": "brown",
  "eye_color": "brown",
  "body_type": "athletic",
  "bust_size": "medium",
  "butt_size": "medium",
  "mood": "confident",
  "framing": "cu",
  "negative_prompt": "extreme close-up, face-only, tight crop, zoomed-in face, forehead cut, chin cut, cropped hairline, soft focus, blur, low-res, jpeg artifacts",
  "seed": 9876543210
}
```

### Femme rousse, yeux verts, peau medium (WU 512px)
```json
{
  "proxy": true,
  "fast": true,
  "safe": false,
  "ratio": "3:4",
  "px": 512,
  "gender": "woman",
  "background": "nature",
  "outfit": "athleisure",
  "skin_tone": "medium",
  "hair_length": "medium",
  "hair_color": "red",
  "eye_color": "green",
  "body_type": "curvy",
  "bust_size": "large",
  "butt_size": "large",
  "mood": "approachable",
  "framing": "wu",
  "negative_prompt": "extreme close-up, face-only, tight crop, zoomed-in face, forehead cut, chin cut, cropped hairline, soft focus, blur, low-res, jpeg artifacts",
  "seed": 5555555555
}
```

---

## 📤 RESPONSES ATTENDUES

### Success (Binary JPEG)
```http
HTTP/1.1 200 OK
Content-Type: image/jpeg
Content-Length: 234567
x-provider-url: https://image.pollinations.ai/prompt/...
x-seed: 3141592653
x-px: 384
x-framing: hs
x-ratio: 1:1

[BINARY JPEG DATA]
```

**Traitement:**
```javascript
const blob = await res.blob();
const url = URL.createObjectURL(blob);
// Afficher dans <img src={url}>
```

### Fallback (JSON provider_url)
```http
HTTP/1.1 200 OK
Content-Type: application/json

{
  "ok": true,
  "provider_url": "https://image.pollinations.ai/prompt/...",
  "seed": 3141592653
}
```

**Traitement:**
```javascript
const json = await res.json();
// Afficher dans <img src={json.provider_url}>
```

### Error 502 (Retry)
```http
HTTP/1.1 502 Bad Gateway
Content-Type: text/html

[HTML ERROR PAGE]
```

**Traitement:**
```javascript
// Retry #1 après 250ms
await new Promise(r => setTimeout(r, 250));
// Retry #2 après 600ms
await new Promise(r => setTimeout(r, 600));
// Si échec → throw Error
```

---

## 🔑 GÉNÉRATION DU SEED

### stableKey() - Tous attributs structurés
```javascript
const k = {
  ratio: a.ratio,
  px: a.px,
  gender: a.gender,
  background: a.background,
  outfit: a.outfit,
  skin_tone: a.skin_tone,
  hair_length: a.hair_length,
  hair_color: a.hair_color,
  eye_color: a.eye_color,
  body_type: a.body_type,
  bust_size: a.bust_size,
  butt_size: a.butt_size,
  mood: a.mood,
  framing: a.framing,
  neckline: a.neckline || "-"
};
const key = JSON.stringify(k);
```

### FNV-1a Hash
```javascript
function fnv1a32(str) {
  let h = 0x811c9dc5 >>> 0;
  for (let i = 0; i < str.length; i++) {
    h ^= str.charCodeAt(i);
    h = (h + ((h << 1) + (h << 4) + (h << 7) + (h << 8) + (h << 24))) >>> 0;
  }
  return h >>> 0;
}
```

### Seed Final
```javascript
const seed = fnv1a32("PGv1|" + key);
// Exemple: 3141592653
```

---

## ⚠️ POINTS CRITIQUES

### 1. safe TOUJOURS false
```javascript
// ❌ JAMAIS ça :
{ safe: true }

// ✅ TOUJOURS ça :
{ safe: false }
```

**Raison:** Le filtre NSFW cause des photos cartoon/illustration.

### 2. negative_prompt long et descriptif
```javascript
// ❌ TROP COURT :
{ negative_prompt: "close-up" }

// ✅ BON (>120 chars) :
{ negative_prompt: "extreme close-up, face-only, tight crop, zoomed-in face, forehead cut, chin cut, cropped hairline, soft focus, blur, low-res, jpeg artifacts" }
```

**Raison:** Évite les cadrages serrés qui coupent le visage.

### 3. Seed stable = tous attributs
```javascript
// ❌ INCOMPLET :
const k = { gender, hair_color };

// ✅ COMPLET :
const k = { ratio, px, gender, background, outfit, skin_tone, hair_length, hair_color, eye_color, body_type, bust_size, butt_size, mood, framing, neckline };
```

**Raison:** Si un attribut manque, le seed change alors que l'utilisateur n'a rien modifié.

### 4. Retry 502 avec délais
```javascript
// ❌ SANS DÉLAI :
if (res.status === 502) return doFetch(attempt + 1);

// ✅ AVEC DÉLAI :
if (res.status === 502 && attempt < 2) {
  await new Promise(r => setTimeout(r, attempt === 0 ? 250 : 600));
  return doFetch(attempt + 1);
}
```

**Raison:** Le backend peut être temporairement surchargé.

---

## 📊 VALIDATION PAYLOAD

### Checklist avant envoi
- [ ] proxy = true
- [ ] fast = true
- [ ] safe = false ⚠️
- [ ] ratio = "1:1" ou "3:4"
- [ ] px = 384 | 448 | 512
- [ ] gender présent
- [ ] Tous attributs physiques présents
- [ ] negative_prompt >120 chars
- [ ] seed est un nombre (pas string)
- [ ] Headers Content-Type + Accept
- [ ] idempotency-key unique

### Validation après réponse
- [ ] Status 200
- [ ] Content-Type image/jpeg OU application/json
- [ ] Si image → blob valide
- [ ] Si JSON → provider_url présent
- [ ] Headers x-provider-url, x-seed exposés

---

**Créé le:** 6 Novembre 2024  
**Version:** V2 Preview System  
**Endpoint:** v1-preview.mjs
