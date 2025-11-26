# 🚀 API V9 - Référence Rapide

## 🎯 Endpoint

```
POST https://image-generator-api-chi.vercel.app/api/v1-preview
```

## 📦 Modes d'Utilisation

### Mode 1 : Preview Proxy (Binaire)

**Payload :**
```json
{
  "gender": "woman",
  "background": "studio",
  "hair_color": "blonde",
  "hair_length": "long",
  "skin_tone": "fair",
  "eye_color": "blue",
  "ratio": "1:1",
  "fast": true,
  "proxy": true
}
```

**Response :** `image/jpeg` (binaire)

**Usage :**
```javascript
const res = await fetch(url, { method: 'POST', body: JSON.stringify(payload) });
const arrayBuffer = await res.arrayBuffer();
const img = await figma.createImageAsync(arrayBuffer);
```

---

### Mode 2 : Save HQ (Supabase)

**Payload :**
```json
{
  "gender": "woman",
  "background": "studio",
  "hair_color": "blonde",
  "hair_length": "long",
  "skin_tone": "fair",
  "eye_color": "blue",
  "ratio": "3:4",
  "fast": false,
  "save": true,
  "safe": false
}
```

**Response :**
```json
{
  "ok": true,
  "mode": "save",
  "image_url": "https://project.supabase.co/storage/..."
}
```

**Usage :**
```javascript
const res = await fetch(url, { method: 'POST', body: JSON.stringify(payload) });
const { image_url } = await res.json();
// Télécharger puis créer dans Figma
```

---

## 🔑 Champs Disponibles

| Champ Frontend (UI) | Champ API (snake_case) | Type | Exemple |
|---------------------|------------------------|------|---------|
| gender | `gender` | string | "woman", "man" |
| background | `background` | string | "studio", "beach", "city" |
| outfit | `outfit` | string | "business", "casual", "elegant" |
| hairColor | `hair_color` | string | "blonde", "brunette", "black" |
| hairLength | `hair_length` | string | "short", "medium", "long" |
| skinTone | `skin_tone` | string | "fair", "medium", "tan" |
| eyeColor | `eye_color` | string | "blue", "brown", "green" |
| bodyType | `body_type` | string | "slim", "athletic", "curvy" |
| bustSize | `bust_size` | string | "small", "medium", "large" |
| buttSize | `butt_size` | string | "small", "medium", "large" |
| mood | `mood` | string | "happy", "serious", "playful" |
| aspectRatio | `ratio` | string | "1:1", "3:4" |
| seed | `seed` | number | 12345 |

---

## ⚙️ Flags de Mode

| Flag | Valeur | Description |
|------|--------|-------------|
| `fast` | `true` | Preview 576px rapide |
| `fast` | `false` | HQ 896×1152 |
| `proxy` | `true` | Retourne binaire (image/*) |
| `proxy` | `false` ou absent | Retourne JSON avec URL |
| `save` | `true` | Upload vers Supabase + retourne URL |
| `save` | `false` ou absent | Pas de stockage |
| `safe` | `true` | Active filtre NSFW (défaut) |
| `safe` | `false` | Désactive filtre NSFW (pour Save HQ) |

---

## 🎨 Combinaisons Recommandées

### Preview Temps Réel (debounce 500ms)
```json
{
  "gender": "woman",
  "hair_color": "blonde",
  "ratio": "1:1",
  "fast": true,
  "proxy": true
}
```
→ Binaire ~576px, ~2-4s

---

### Save Final HQ
```json
{
  "gender": "woman",
  "hair_color": "blonde",
  "skin_tone": "fair",
  "ratio": "3:4",
  "fast": false,
  "save": true,
  "safe": false
}
```
→ JSON avec `image_url`, 896×1152, ~5-8s

---

## 🐛 Debug cURL

### Test Preview Proxy
```bash
curl -X POST "https://image-generator-api-chi.vercel.app/api/v1-preview" \
  -H "Content-Type: application/json" \
  -d '{"gender":"woman","background":"studio","ratio":"1:1","fast":true,"proxy":true}' \
  --output test.jpg
```

### Test Save HQ
```bash
curl -sS -X POST "https://image-generator-api-chi.vercel.app/api/v1-preview" \
  -H "Content-Type: application/json" \
  -d '{"gender":"woman","background":"studio","ratio":"3:4","fast":false,"save":true,"safe":false}' \
  | jq
```

---

## ⚠️ Erreurs Communes

| Erreur | Cause | Solution |
|--------|-------|----------|
| `HTTP 500 NSFW` | Filtre safe mode | Utiliser `safe: false` en save |
| `invalid_json_response` | Proxy retourne binaire | Utiliser `res.arrayBuffer()` pas `res.json()` |
| Pas de changement | Seed constant | Ne pas envoyer de seed fixe |
| Carré au lieu 3:4 | fast:true | Utiliser `fast:false` + `ratio:"3:4"` |

---

## 📁 Fichiers Modifiés

1. `/figma-plugin/config.js` - PREVIEW_V9_URL
2. `/figma-plugin/previewEndpoint.js` - /api/v1-preview
3. `/figma-plugin/previewApi.js` - callPreviewProxy + callPreviewSave
4. `/figma-plugin/buildPreviewPayload.js` - snake_case fields

---

**Date :** 4 novembre 2024  
**Version :** V9
