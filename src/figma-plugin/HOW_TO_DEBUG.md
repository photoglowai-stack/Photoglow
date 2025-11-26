# 🔍 Comment Débugger "Generation failed"

## ⚡ Quick Start (30 secondes)

1. **Ouvrir Figma Dev Tools**
   - Mac : `Cmd + Option + I`
   - Windows : `Ctrl + Shift + I`

2. **Aller dans l'onglet Console**

3. **Chercher les logs** `[Preview]` ou `[Save]`

4. **Lire l'erreur** marquée avec ❌

---

## 📋 Checklist Rapide

```
[ ] Dev Tools ouvert ?
[ ] Onglet Console visible ?
[ ] Logs [Preview] visibles ?
[ ] Une ligne avec ❌ ?
[ ] Lire le message d'erreur
```

---

## 🎯 Logs à Chercher

### Success (Normal)
```
[Preview] Starting with form: ...
[Preview] Response status: 200
[Preview] Content-Type: image/jpeg
[Preview] Success
```

### Error (Problème)
```
[Preview] Starting with form: ...
[Preview] Response status: 500
[Preview] ❌ HTTP Error: 500
[Preview] ❌ Error body: Internal Server Error
```

---

## 🆘 Erreurs Courantes

### 1. HTTP 500 (Backend Error)
```
[Preview] ❌ HTTP Error: 500
```
→ **Problème backend** - Vérifier Vercel logs

---

### 2. API Retourne JSON au lieu d'Image
```
[Preview] Content-Type: application/json
[Preview] ❌ API returned JSON error: { error: "Missing gender" }
```
→ **Payload invalide** - Vérifier que gender est sélectionné

---

### 3. Pas une Image (HTML/Text)
```
[Preview] Blob type: text/html
[Preview] ❌ Not an image. Content: <!DOCTYPE html>...
```
→ **404 ou routing Vercel** - Vérifier l'URL endpoint

---

### 4. Download Failed (Save)
```
[Save] ❌ Download failed: 403 Forbidden
```
→ **URL Supabase invalide** - Vérifier bucket/signed URL

---

## 🧪 Test Manuel de l'API

```bash
# Preview (doit retourner JPEG)
curl -X POST https://image-generator-api-chi.vercel.app/api/v1-preview \
  -H "Content-Type: application/json" \
  -d '{"gender":"woman","hair_color":"blonde","eye_color":"blue","fast":true,"proxy":true}' \
  --output test.jpg

# Vérifier
file test.jpg
# Doit afficher: test.jpg: JPEG image data
```

---

## 📞 Besoin d'Aide ?

**Copier tous les logs** depuis `[Preview] Starting` jusqu'à `[Preview] ❌ Error` et partager.

**Guide complet** : Voir `/figma-plugin/DEBUG_ERRORS.md`

---

**Temps de debug** : ~1 minute avec les logs détaillés ! 🚀
