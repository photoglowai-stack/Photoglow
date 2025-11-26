# 🧪 Test : Vérification safe=false

**Durée:** 2 minutes  
**Criticité:** 🔴 **CRITIQUE**

---

## Test Rapide (30 secondes)

### 1. Ouvrir le plugin dans Figma Desktop

```
Figma → Plugins → Development → PhotoGlow V2 - AI Preview
```

### 2. Ouvrir DevTools

```
Right-click → Inspect → Console
```

### 3. Générer une preview

```
1. Sélectionner : Gender: Woman, Framing: HS
2. Cliquer "⚡ Speed"
3. Observer la console
```

### 4. Vérifier le log

**Attendu dans la console :**
```
[previewFigma] Generating with: {
  mode: "speed",
  seed: 123456789,
  px: 384,
  framing: "hs",
  safe: false  // ✅ DOIT ÊTRE false
}
```

**✅ SI safe: false** → Test OK  
**❌ SI safe: true** → ERREUR CRITIQUE

---

## Test Network (1 minute)

### 1. Ouvrir Network tab

```
DevTools → Network → Filter: Fetch/XHR
```

### 2. Clear & Générer

```
1. Clear all (🚫)
2. Cliquer "⚡ Speed"
3. Attendre la génération
```

### 3. Inspecter Request

```
1. Cliquer sur la requête vers image-generator-api-chi.vercel.app
2. Onglet "Payload" ou "Request"
3. Vérifier le JSON
```

**Payload attendu :**
```json
{
  "proxy": true,
  "fast": true,
  "ratio": "1:1",
  "px": 384,
  "safe": false,  // ✅ DOIT ÊTRE false
  "gender": "woman",
  "background": "studio",
  // ...
}
```

**✅ SI "safe": false** → Test OK  
**❌ SI "safe": true** → ERREUR CRITIQUE

---

## Test Shuffle Mode (30 secondes)

### 1. Cliquer "🎲 Shuffle"

### 2. Vérifier console

**Attendu :**
```
[previewFigma] Generating with: {
  mode: "shuffle",
  seed: 987654321,  // différent
  px: 384,
  framing: "hs",
  safe: false  // ✅ TOUJOURS false
}
```

---

## Test +Net Mode (30 secondes)

### 1. Cliquer "✨ +Net"

### 2. Vérifier console

**Attendu :**
```
[previewFigma] Generating with: {
  mode: "speed",
  seed: 123456789,  // même seed
  px: 448,          // résolution augmentée
  framing: "hs",
  safe: false  // ✅ TOUJOURS false
}
```

---

## Test avec Attributs Différents

### 1. Changer attributs

```
- Gender: Man
- Framing: Waist-Up (WU)
- Body Type: Athletic
```

### 2. Générer

```
Cliquer "⚡ Speed"
```

### 3. Vérifier console

**Attendu :**
```
[previewFigma] Generating with: {
  mode: "speed",
  seed: 555555555,
  px: 512,          // auto pour WU
  framing: "wu",
  safe: false  // ✅ TOUJOURS false
}
```

---

## Résultat

**SI tous les tests montrent safe: false :**
✅ **Plugin OK - Prêt pour production**

**SI un seul test montre safe: true :**
❌ **ERREUR CRITIQUE - Ne pas utiliser**

---

## Actions en cas d'erreur

1. Vérifier `api.js` ligne 48
2. Vérifier `utils.js` ligne 53-54
3. Vérifier `ui.html` (pas de champ safe)
4. Re-importer le plugin

---

Date: 5 Novembre 2024  
Durée totale: ~2 minutes  
Status: ⏳ **À TESTER**
