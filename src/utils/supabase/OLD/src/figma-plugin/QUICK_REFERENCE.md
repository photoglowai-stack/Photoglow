# ⚡ Quick Reference - Plugin V6.1

## 🎯 Preview V6 en 30 secondes

### Payload Minimal
```json
POST https://image-generator-api-chi.vercel.app/v1/preview

{
  "fast": true,
  "aspect_ratio": "1:1",
  "gender": "woman",
  "background": "beach",
  "outfit": "summer dress"
}
```

### Règles d'Or
1. ✅ **Gender** = obligatoire
2. ✅ **+2 attributs** minimum pour activer le bouton
3. ❌ **JAMAIS** de `prompt` dans le payload
4. ⚡ Debounce **500ms** automatique
5. 🔄 Annulation auto des requêtes précédentes

---

## 📁 Architecture Fichiers

```
previewEndpoint.js      → URL de l'API
    ↓
previewApi.js          → fetch + AbortController
    ↓
buildPreviewPayload.js → Validation + construction payload
    ↓
ui.html                → UI + logique complète
```

---

## 🔧 Commandes Utiles

### Validation du plugin
```bash
node validate-v6.js
```

### Tests unitaires
```bash
node test-helpers.js
```

### Activer debug mode (dans la console Figma)
```javascript
localStorage.setItem('pg_debug', 'true')
```

### Désactiver debug mode
```javascript
localStorage.removeItem('pg_debug')
```

---

## 🎨 Attributs Disponibles

| Attribut       | Exemple            | Obligatoire |
|----------------|--------------------|-------------|
| `gender`       | woman, man         | ✅ OUI      |
| `background`   | beach, studio      | ❌ Non      |
| `outfit`       | dress, suit        | ❌ Non      |
| `hairColor`    | blonde, brown      | ❌ Non      |
| `hairLength`   | long, short        | ❌ Non      |
| `skinTone`     | fair, tan          | ❌ Non      |
| `eyeColor`     | blue, brown        | ❌ Non      |
| `mood`         | smiling, serious   | ❌ Non      |
| `aspect_ratio` | 1:1, 3:4           | ❌ (défaut: 1:1) |
| `seed`         | 42                 | ❌ Non      |

---

## 🐛 Troubleshooting Express

| Problème | Solution |
|----------|----------|
| Bouton désactivé | Vérifier gender + 2 attributs minimum |
| Erreur "Service indisponible" | Vérifier URL dans BASE_URL_API |
| Image ne s'affiche pas | Vérifier manifest.json → allowedDomains |
| Logs excessifs | `localStorage.removeItem('pg_debug')` |
| Cache ne fonctionne pas | Relancer EXACTEMENT le même payload |

---

## 📊 Performance

| Métrique | Cible | Mesure |
|----------|-------|--------|
| P50 Preview | ≤ 2-4s | Mode `fast:true` |
| Cache hit | < 1s | Badge ⚡ CACHE |
| Debounce | 500ms | Après dernière frappe |

---

## 🔗 URLs de Référence

- **API Base:** `https://image-generator-api-chi.vercel.app`
- **Preview V6:** `/v1/preview`
- **Health Check:** `/v1/preview?debug=1`
- **Credits:** `/api/credits`

---

## ✅ Checklist Déploiement

- [ ] `node validate-v6.js` → tout vert
- [ ] `node test-helpers.js` → tous les tests passent
- [ ] Importer dans Figma Desktop
- [ ] Tester Health Check (bouton "Check")
- [ ] Tester Preview avec gender + 2 attributs
- [ ] Vérifier cache (2e appel identique)
- [ ] Vérifier debounce (saisie rapide)

---

## 💡 Exemples Rapides

### Happy Path
```
Gender: woman
Background: studio
Outfit: professional suit
→ Preview s'affiche en ~2-3s
```

### Test Cache
```
1. Générer avec attributs A
2. Générer à nouveau avec attributs A (identiques)
→ Badge affiche ⚡ CACHE (< 1s)
```

### Test Annulation
```
1. Changer Gender: woman
2. Immédiatement changer: man
3. Immédiatement changer: woman
→ Seule la dernière requête aboutit (aucune erreur)
```

---

**Version:** 6.1.0  
**Date:** 2025-10-31  
**Docs complètes:** DEPLOYMENT.md
