# 🔧 Configuration Guide — Photoglow Admin Plugin

Ce guide vous aide à configurer le plugin Figma en 2 minutes.

---

## 📝 Étape Unique : Configurer PROJECT_ID

### 1. Trouver votre Project ID Supabase

**Option A: Via Dashboard**

1. Ouvrir https://supabase.com/dashboard
2. Sélectionner votre projet PhotoGlow
3. Settings → Project Settings → General
4. Copier "Reference ID"

**Exemple:** `abcdefghijklmnopqrst`

**Option B: Via SUPABASE_URL**

Si vous avez déjà `SUPABASE_URL` dans vos variables d'environnement :

```
SUPABASE_URL=https://abcdefghijklmnopqrst.supabase.co
                      ^^^^^^^^^^^^^^^^^^^^
                      C'est votre PROJECT_ID
```

---

### 2. Mettre à jour code.js

Ouvrir `/figma-plugin-admin/code.js` et remplacer **LIGNE 4** :

```javascript
// ❌ AVANT
const PROJECT_ID = 'YOUR_PROJECT_ID';

// ✅ APRÈS
const PROJECT_ID = 'abcdefghijklmnopqrst'; // Votre vrai ID
```

**IMPORTANT:** Ne pas oublier de sauvegarder le fichier !

---

### 3. Vérifier la Configuration

Le fichier doit ressembler à ça :

```javascript
// Photoglow Admin — Generator Plugin
// Jobs API avec polling pour FLUX, Gen-4, Gen-4 Turbo

// ⚠️ ADAPTER SELON VOTRE PROJET SUPABASE
const PROJECT_ID = 'abcdefghijklmnopqrst'; // ✅ Votre ID ici
const BASE_URL_API = `https://${PROJECT_ID}.supabase.co/functions/v1/make-server-ab844084`;
const V1_JOBS = `${BASE_URL_API}/v1/jobs`;
// ... reste du code
```

---

## ✅ C'est Tout !

Vous pouvez maintenant :

1. Importer le plugin dans Figma
2. Lancer le plugin
3. Générer des images

---

## 🧪 Test de Configuration

Pour vérifier que tout fonctionne, testez l'endpoint dans votre navigateur :

```
https://abcdefghijklmnopqrst.supabase.co/functions/v1/make-server-ab844084/v1/jobs
```

**Remplacer** `abcdefghijklmnopqrst` par votre vrai PROJECT_ID.

**Attendu:**
- Status: 200 OK
- OU 405 Method Not Allowed (normal, GET pas supporté)

**Si erreur 404:**
- ❌ Backend pas déployé
- ❌ PROJECT_ID incorrect

---

## 🔐 Sécurité

### ⚠️ Ne PAS mettre de secrets dans code.js

Le fichier `code.js` est côté client (Figma). **Ne jamais** y mettre :

- ❌ SUPABASE_SERVICE_ROLE_KEY
- ❌ REPLICATE_API_TOKEN
- ❌ Autres API keys

**Seul PROJECT_ID est safe** car il est déjà public dans vos URLs frontend.

---

## 📚 Prochaines Étapes

1. ✅ PROJECT_ID configuré dans code.js
2. 📖 Lire [QUICK_START.md](./QUICK_START.md)
3. 🧪 Tester le plugin
4. 🚀 Utiliser en production

---

**Besoin d'aide ?**

- [README complet](./README.md)
- [Quick Start Guide](./QUICK_START.md)
- [Architecture Complète](../PHOTOGLOW_ADMIN_COMPLETE.md)
