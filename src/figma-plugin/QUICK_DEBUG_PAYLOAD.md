# 🐛 Debug Rapide - Vérifier le Payload

## 🎯 Objectif
Vérifier que le plugin Figma envoie bien les **attributs** (pas un prompt) au backend.

---

## 🔍 Étapes rapides

### 1️⃣ Ouvrir Figma Desktop
```
Figma Desktop → Plugins → Development → Photoglow V6.1 - AI Preview
```

---

### 2️⃣ Ouvrir DevTools Console
```
Help → Toggle Developer Tools → Console
```

Ou raccourci clavier:
- **Mac:** `Cmd + Option + I`
- **Windows:** `Ctrl + Shift + I`

---

### 3️⃣ Laisser les valeurs par défaut
```
Gender: woman
Background: studio
Outfit: athleisure
Skin Tone: tan
Hair Length: long
Hair Color: brown
Eye Color: hazel
Mood: confident
Body Type: athletic
Bust Size: medium
Butt Size: medium
Aspect Ratio: 1:1
Quality: 768px (High ⭐)
```

---

### 4️⃣ Cliquer "Prévisualiser"

---

### 5️⃣ Chercher dans Console : `[Preview] 📊 Payload:`

**Résultat attendu:**
```json
[Preview] 📊 Payload: {
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

---

## ✅ Checklist de vérification

### Champs obligatoires présents:
- [ ] ✅ `proxy: true`
- [ ] ✅ `fast: true`
- [ ] ✅ `ratio: "1:1"` ou `"3:4"`
- [ ] ✅ `px: 768` (ou 512/1024)
- [ ] ✅ `safe: false` (pour athleisure)
- [ ] ✅ `gender: "woman"` ou `"man"`

### Champs attributs présents:
- [ ] ✅ `background: "studio"`
- [ ] ✅ `outfit: "athleisure"`
- [ ] ✅ `skin_tone: "tan"`
- [ ] ✅ `hair_length: "long"`
- [ ] ✅ `hair_color: "brown"`
- [ ] ✅ `eye_color: "hazel"`
- [ ] ✅ `mood: "confident"`
- [ ] ✅ `body_type: "athletic"`
- [ ] ✅ `bust_size: "medium"`
- [ ] ✅ `butt_size: "medium"`
- [ ] ✅ `seed: <nombre>`

### Champs INTERDITS:
- [ ] ❌ **AUCUN champ `prompt`**
- [ ] ❌ **AUCUN champ `idempotency-key`**

---

## 🚨 Si vous voyez un champ "prompt"

**⚠️ PROBLÈME** - Le plugin envoie encore un prompt au lieu des attributs !

### Actions:
1. Vérifier que vous utilisez bien la dernière version de `/figma-plugin/main.js`
2. Vérifier que `/figma-plugin/buildPreviewPayload.js` est **supprimé** (ancien fichier)
3. Vérifier dans Console:
   ```
   [Preview] 📊 Payload:
   ```
   Doit contenir `gender`, `background`, etc. **PAS** `prompt`

---

## 📊 Comparaison avec curl qui fonctionne

### curl (test réussi):
```json
{
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
}
```

### Plugin Figma (doit être identique):
```json
{
  "proxy": true,        ✅
  "fast": true,         ✅
  "ratio": "1:1",       ✅
  "px": 768,            ✅ (meilleur que 384)
  "safe": false,        ✅
  "gender": "woman",    ✅
  "background": "studio", ✅
  "outfit": "athleisure", ✅
  "skin_tone": "tan",   ✅
  "hair_length": "long", ✅
  "hair_color": "brown", ✅
  "eye_color": "hazel", ✅
  "body_type": "athletic", ✅
  "bust_size": "medium", ✅
  "butt_size": "medium", ✅
  "mood": "confident",  ✅
  "seed": 1234567890    ✅
}
```

**✅ Identique sauf:**
- `px: 768` au lieu de `384` → MEILLEUR (image plus nette)
- `seed` différent → NORMAL (généré aléatoirement)

---

## 🐛 Debug avancé

### Si le payload est correct mais l'image ne se génère pas:

#### 1. Vérifier la réponse API:
```
[Preview] 📋 Response status: 200
[Preview] 📋 Content-Type: image/jpeg
[Preview] ✅ Image received: 123456 bytes (120.6 KB)
```

Si status ≠ 200:
- ❌ Problème backend
- Vérifier que l'API est accessible: https://image-generator-api-chi.vercel.app/api/v1-preview

#### 2. Vérifier le temps de génération:
```
[Preview] ⏱️ Generation time: 3245ms
```

Si > 10 secondes:
- ⚠️ Génération lente (normal avec px=1024)
- Essayer avec `px: 512` pour plus de rapidité

#### 3. Vérifier les erreurs:
```
[Preview] ❌ Error: fetch failed
```

Si erreur réseau:
- Vérifier la connexion Internet
- Vérifier que l'API est en ligne

---

## ✅ Résultat final attendu

### Dans Figma:
1. ✅ Image apparaît sur le canvas
2. ✅ Dimensions: 768x768 pixels (en 1:1)
3. ✅ Image nette et détaillée
4. ✅ Pas de flou

### Dans Console:
1. ✅ Payload contient tous les attributs
2. ✅ Aucun champ `prompt`
3. ✅ Status 200
4. ✅ Image reçue (80-120 KB pour 768px)

---

Date: 5 novembre 2025  
Debug: Vérification payload attributs  
Status: **PRÊT POUR DEBUG** ✅
