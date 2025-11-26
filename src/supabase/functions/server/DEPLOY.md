# 🚀 Déploiement du Serveur - Preview V6 Endpoint

Ce guide explique comment déployer l'endpoint `/v1/preview` sur Supabase Functions.

---

## 📋 Prérequis

- Supabase CLI installé : `npm install -g supabase`
- Projet Supabase créé
- Connexion au projet : `supabase link --project-ref YOUR_PROJECT_ID`

---

## 🔧 Étape 1 : Vérifier le Code

L'endpoint `/v1/preview` a été ajouté dans `/supabase/functions/server/index.tsx` :

- ✅ POST `/make-server-ab844084/v1/preview` (génération)
- ✅ GET `/make-server-ab844084/v1/preview?debug=1` (diagnostics)
- ✅ Cache LRU (100 entrées, TTL 24h)
- ✅ Prompt builder depuis attributs
- ✅ Retry Pollinations (3 tentatives)
- ✅ Upload Supabase Storage

---

## 🚀 Étape 2 : Déployer

### Déployer la Function

```bash
supabase functions deploy server
```

**Sortie attendue :**
```
Deploying function server...
✓ Deployed function server (version: vX.X.X)
Function URL: https://YOUR_PROJECT.supabase.co/functions/v1/server
```

---

## 📦 Étape 3 : Créer le Bucket Storage

### Méthode 1 : Dashboard Supabase (Recommandé)

1. Aller sur https://supabase.com/dashboard/project/YOUR_PROJECT
2. Storage → Create Bucket
3. Remplir :
   - **Name** : `generated_images`
   - **Public** : ✅ YES (important !)
   - **File size limit** : 52428800 (50MB)
4. Cliquer "Create Bucket"

### Méthode 2 : Via l'API (Automatique)

Le serveur crée automatiquement le bucket au démarrage si il n'existe pas. Vérifier les logs :

```bash
supabase functions logs server
```

Chercher : `✅ Bucket "generated_images" created successfully!`

---

## 🧪 Étape 4 : Tester l'Endpoint

### Test 1 : Health Check

```bash
curl "https://YOUR_PROJECT.supabase.co/functions/v1/make-server-ab844084/v1/preview?debug=1"
```

**Réponse attendue :**
```json
{
  "ok": true,
  "service": "Preview V6",
  "status": "ready",
  "cache_size": 0,
  "max_cache_size": 100,
  ...
}
```

### Test 2 : Génération Simple

```bash
curl -X POST "https://YOUR_PROJECT.supabase.co/functions/v1/make-server-ab844084/v1/preview" \
  -H "Content-Type: application/json" \
  -d '{
    "fast": true,
    "aspect_ratio": "1:1",
    "gender": "woman",
    "background": "beach",
    "outfit": "summer dress"
  }'
```

**Réponse attendue :**
```json
{
  "success": true,
  "image_url": "https://YOUR_PROJECT.supabase.co/storage/v1/object/public/generated_images/preview_v6/woman/...",
  "provider": "pollinations",
  "seed": 123456,
  "key": "gender:woman|background:beach|outfit:summer dress",
  "generation_time_ms": 2341,
  "cached": false,
  "prompt_length": 147
}
```

### Test 3 : Test Automatisé Complet

```bash
cd figma-plugin
node test-backend.js https://YOUR_PROJECT.supabase.co
```

**Attendu :** 5/5 tests ✅

---

## 📊 Étape 5 : Vérifier les Logs

### Logs en Temps Réel

```bash
supabase functions logs server --follow
```

### Filtrer les Logs Preview V6

Les logs de l'endpoint preview sont préfixés par `[Preview V6]` :

```
[Preview V6] 📥 Incoming request: { ... }
[Preview V6] 🔑 Cache key: gender:woman|...
[Preview V6] ❌ CACHE MISS - Generating new preview...
[Preview V6] 🎨 Calling Pollinations...
[Preview V6] ✅ Pollinations success
[Preview V6] 💾 Uploading to Supabase Storage: preview_v6/woman/...
[Preview V6] ✅ Public URL: https://...
[Preview V6] ✅ COMPLETE (2341ms)
```

---

## 🐛 Troubleshooting

### Erreur : `Bucket 'generated_images' not found`

**Solution :**
Créer manuellement le bucket via le Dashboard Supabase (voir Étape 3).

### Erreur : `pollinations_failed`

**Cause :** API Pollinations temporairement down ou timeout

**Solution :**
1. Vérifier Pollinations manuellement :
   ```bash
   curl "https://image.pollinations.ai/prompt/test?width=512&height=512"
   ```
2. Réessayer après 30 secondes
3. Si le problème persiste, vérifier le retry logic dans `index.tsx`

### Erreur : `Upload failed`

**Cause :** Permissions insuffisantes sur le bucket

**Solution :**
1. Vérifier que le bucket est public (Dashboard → Storage → generated_images → Settings)
2. Vérifier que SERVICE_ROLE_KEY est correctement configuré

### Cache ne fonctionne pas

**Symptôme :** `provider: "pollinations"` à chaque fois (jamais `"cache"`)

**Cause :** Le cache est en mémoire et redémarre à chaque redéploiement

**Solution :**
- Normal après un redéploiement
- Faire 2 requêtes identiques pour vérifier le cache
- Si toujours pas de cache, vérifier les logs pour le `Cache key`

---

## 🔧 Variables d'Environnement

Le serveur utilise automatiquement ces variables (déjà configurées par Supabase) :

- `SUPABASE_URL` - URL du projet Supabase
- `SUPABASE_SERVICE_ROLE_KEY` - Clé service role
- `SUPABASE_ANON_KEY` - Clé publique anonyme

**Pas besoin de configuration manuelle !**

---

## 📈 Performance

### Métriques Attendues

| Métrique | Valeur | Comment mesurer |
|----------|--------|-----------------|
| P50 Preview | 2-4s | `generation_time_ms` dans la réponse |
| P90 Preview | 5-6s | Logs Supabase |
| Cache Hit | < 1s | `generation_time_ms` avec `provider: "cache"` |
| Cache Size | 0-100 | GET `/v1/preview?debug=1` → `cache_size` |

### Monitoring

1. **Dashboard Supabase** → Edge Functions → `server` → Metrics
2. Vérifier :
   - Invocations (nombre de requêtes)
   - Errors (doit être proche de 0)
   - Duration (médiane ~2-4s)

---

## ✅ Checklist Post-Déploiement

- [ ] Function `server` déployée avec succès
- [ ] Bucket `generated_images` créé et public
- [ ] Health check retourne `ok: true`
- [ ] Génération simple fonctionne (provider: pollinations)
- [ ] Cache fonctionne (2e requête identique → provider: cache)
- [ ] Logs affichent `[Preview V6]` correctement
- [ ] Tests automatisés passent (5/5)
- [ ] Plugin Figma configuré avec la bonne URL

---

## 🔗 URLs de Référence

Après déploiement, vos endpoints seront :

- **Health Check** : `https://YOUR_PROJECT.supabase.co/functions/v1/make-server-ab844084/v1/preview?debug=1`
- **Preview** : `https://YOUR_PROJECT.supabase.co/functions/v1/make-server-ab844084/v1/preview`
- **Dashboard** : `https://supabase.com/dashboard/project/YOUR_PROJECT/functions`

---

**Version :** 6.1.0  
**Date :** 2025-10-31  
**Endpoint :** `/make-server-ab844084/v1/preview`
