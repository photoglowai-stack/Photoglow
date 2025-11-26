# 🐛 Debug API Issue - Plugin Figma

**Date:** 5 Novembre 2024  
**Problème:** Le curl fonctionne, mais le plugin ne fonctionne pas

---

## ✅ Corrections Appliquées

### 1. buildPayload() maintenant async

**AVANT (❌) :**
```javascript
function buildPayload(ui, { mode = "speed" } = {}) {
  // ...
  const seen = mem.get(key);  // ❌ Pas de fallback à loadSeed
  seed = seen?.seed ?? deriveSeedFromKey(key);
}
```

**APRÈS (✅) :**
```javascript
async function buildPayload(ui, { mode = "speed" } = {}) {
  // ...
  const seen = mem.get(key) || await loadSeed(key);  // ✅ Avec fallback
  seed = seen?.seed ?? deriveSeedFromKey(key);
}
```

**Raison:** Si le seed n'est pas dans le cache mémoire, on doit le charger depuis le storage.

---

### 2. await sur buildPayload()

**AVANT (❌) :**
```javascript
const { body, seed, key } = buildPayload(uiState, { mode });
```

**APRÈS (✅) :**
```javascript
const { body, seed, key } = await buildPayload(uiState, { mode });
```

---

### 3. Logging amélioré

**Ajouté :**
```javascript
console.log("[previewFigma] Full payload:", JSON.stringify(body, null, 2));

// En cas d'erreur
console.error("[previewFigma] FAILED:", {
  status: r.status,
  contentType: r.ct,
  error: String(r.err).slice(0, 300)
});
```

---

## 🧪 Test de Debug

### 1. Ouvrir le Plugin

```
Figma → Plugins → Development → PhotoGlow V2
```

### 2. Ouvrir DevTools

```
Right-click → Inspect → Console
```

### 3. Configurer & Générer

```
- Gender: Woman
- Framing: HS
- Background: Studio
- Outfit: Athleisure
- Skin Tone: Tan
- Hair Length: Long
- Hair Color: Brown
- Eye Color: Hazel
- Body Type: Athletic
- Bust Size: Medium
- Butt Size: Medium
- Mood: Confident
- Neckline: V-Neck

Cliquer "⚡ Speed"
```

### 4. Vérifier Console

**Attendu :**
```javascript
[previewFigma] Generating with: {
  mode: "speed",
  seed: 123456789,
  px: 384,
  framing: "hs",
  safe: false
}

[previewFigma] Full payload: {
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
  "framing": "hs",
  "neckline": "vneck",
  "seed": 123456789
}
```

**Si erreur :**
```javascript
[previewFigma] FAILED: {
  status: 400,
  contentType: "application/json",
  error: "{ error: '...' }"
}
```

---

## 🔍 Comparaison Curl vs Plugin

### Curl (✅ Fonctionne)

```bash
curl -fL -X POST "https://image-generator-api-chi.vercel.app/api/v1-preview" \
  -H 'Content-Type: application/json' \
  -d '{
    "proxy": true,
    "fast": true,
    "ratio":"1:1",
    "px":384,
    "safe": false,
    "gender":"woman",
    "background":"studio",
    "outfit":"athleisure",
    "skin_tone":"tan",
    "hair_length":"long",
    "hair_color":"brown",
    "eye_color":"hazel",
    "body_type":"athletic",
    "bust_size":"medium",
    "butt_size":"medium",
    "mood":"confident",
    "framing":"hs",
    "neckline":"vneck",
    "seed": 123456789
  }'
```

### Plugin (À vérifier)

Le payload devrait être **IDENTIQUE** à celui du curl.

**Vérifier dans console :**
1. Tous les champs sont présents ?
2. Le seed est un NUMBER (pas une STRING) ?
3. safe est bien false ?
4. proxy est bien true ?

---

## 🚨 Points de Vérification

### 1. Seed Format

**Curl:** seed est un NUMBER  
**Plugin:** seed doit être un NUMBER (pas `"123456789"` mais `123456789`)

**Vérification:**
```javascript
console.log(typeof body.seed);  // doit être "number"
```

---

### 2. Headers

**Curl:**
```
Content-Type: application/json
```

**Plugin:**
```javascript
headers: {
  "Content-Type": "application/json",
  "idempotency-key": crypto.randomUUID?.() || String(Date.now())
}
```

**Le header idempotency-key pourrait-il poser problème ?**

À tester en le supprimant si nécessaire.

---

### 3. Body Serialization

**Vérifier que JSON.stringify() ne casse rien :**

```javascript
const testBody = {
  proxy: true,
  safe: false,
  seed: 123456789
};

console.log(JSON.stringify(testBody));
// Attendu: {"proxy":true,"safe":false,"seed":123456789}
```

---

### 4. Cleanup des Champs

**Le code fait :**
```javascript
Object.keys(body).forEach(k => (body[k] == null || body[k] === "") && delete body[k]);
```

**Vérifier qu'on ne supprime pas de champs importants :**

- `neckline: ""` → supprimé ✅ (OK, optionnel)
- `gender: undefined` → supprimé ✅ (OK, sera rempli par normalize)
- `safe: false` → **PAS supprimé** ✅ (false !== null et false !== "")

---

## 🔧 Solutions Possibles

### Solution 1: Supprimer idempotency-key

**Test:**
```javascript
const res = await fetch(API, {
  method: "POST",
  headers: {
    "Content-Type": "application/json"
    // Pas de idempotency-key
  },
  body: JSON.stringify(body),
  signal: currentAbort.signal
});
```

---

### Solution 2: Vérifier CORS

**Dans DevTools → Network :**
- Vérifier que la requête est bien envoyée
- Vérifier qu'il n'y a pas de CORS preflight error
- Vérifier la r��ponse (status, headers, body)

---

### Solution 3: Tester avec Payload Minimal

**Test avec le strict minimum :**
```javascript
const minimalBody = {
  proxy: true,
  safe: false,
  gender: "woman",
  seed: 123456789
};
```

Si ça marche → problème dans un des autres champs.

---

### Solution 4: Comparer Byte par Byte

**Copier le payload du plugin:**
```javascript
const pluginPayload = JSON.stringify(body);
```

**Comparer avec le curl:**
```bash
echo '{"proxy":true,"fast":true,...}' | jq .
```

**Trouver la différence exacte.**

---

## 📝 Checklist Debug

- [ ] Build le plugin (`node build.js`)
- [ ] Import dans Figma
- [ ] Ouvrir DevTools → Console
- [ ] Cliquer "Speed"
- [ ] Vérifier console log du payload complet
- [ ] Copier le payload JSON
- [ ] Comparer avec le curl
- [ ] Si différent → trouver le champ qui diffère
- [ ] Si identique → vérifier Network tab
- [ ] Vérifier status code de la réponse
- [ ] Vérifier Content-Type de la réponse
- [ ] Vérifier body de la réponse

---

## 🎯 Next Steps

1. **Build & Test**
   ```bash
   cd figma-plugin
   node build.js
   ```

2. **Import dans Figma**

3. **Cliquer Speed**

4. **Copier le payload de la console**

5. **Me le partager** pour que je compare avec le curl

---

Date: 5 Novembre 2024  
Status: ⏳ **EN DEBUG**

**Envoie-moi le payload complet du console.log et l'erreur exacte !**
