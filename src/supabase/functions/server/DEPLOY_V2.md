# 🚀 Déploiement du Serveur Supabase V2

## ⚠️ IMPORTANT : Le nouvel endpoint `/ideas/generate` doit être déployé !

Le système de génération séquentielle V2 utilise un **nouvel endpoint** qui n'existe pas encore sur le serveur déployé.

---

## 📋 Fichiers modifiés

1. `/supabase/functions/server/index.tsx` 
   - Ajout endpoint `POST /make-server-ab844084/ideas/generate`
   - Ajout cache d'idempotency
   - Nouvelles fonctions de retry et validation

2. `/supabase/functions/server/category-prompts-enriched.ts` (nouveau)
   - Prompts enrichis 300+ mots avec détails anatomiques

---

## 🔧 Comment déployer

### Option 1 : Via Supabase CLI (Recommandé)

```bash
# 1. Installer Supabase CLI si pas déjà fait
npm install -g supabase

# 2. Se connecter à Supabase
supabase login

# 3. Lier le projet
supabase link --project-ref <your-project-id>

# 4. Déployer la fonction
cd supabase/functions
supabase functions deploy server
```

### Option 2 : Via Dashboard Supabase

1. Aller sur https://supabase.com/dashboard
2. Sélectionner ton projet **photoglowai-stack's Org**
3. Aller dans **Edge Functions**
4. Sélectionner la fonction `server`
5. Cliquer sur **"Deploy"** ou **"Update"**
6. Uploader le contenu du dossier `/supabase/functions/server/`

### Option 3 : Via Git Push (si configuré)

```bash
git add supabase/functions/server/
git commit -m "feat: add sequential generation v2 endpoint"
git push origin main
```

---

## ✅ Vérifier le déploiement

### 1. Test Health Check

```bash
curl https://<project-id>.supabase.co/functions/v1/make-server-ab844084/health \
  -H "Authorization: Bearer <anon-key>"
```

**Résultat attendu** :
```json
{
  "status": "ok",
  "database": "postgres",
  "storage": "photos (public bucket)",
  "timestamp": "2025-11-09T..."
}
```

### 2. Test nouvel endpoint `/ideas/generate`

```bash
curl https://<project-id>.supabase.co/functions/v1/make-server-ab844084/ideas/generate \
  -X POST \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer <anon-key>" \
  -H "idempotency-key: test-key-123" \
  -d '{
    "slug": "test",
    "category_id": "test",
    "style": "realistic",
    "prompt_title": "Test",
    "prompt_text": "professional headshot, realistic photography, soft studio lighting, neutral background, accurate skin tones, minimal retouching, crisp micro-contrast, tack sharp focus, lens feel 85mm, fine detail, studio quality, photorealistic",
    "aspect_ratio": "1:1",
    "width": 512,
    "height": 512,
    "persist": false,
    "collection": "test",
    "prompt_index": 0
  }'
```

**Résultat attendu** :
```json
{
  "success": true,
  "image_url": "https://...supabase.co/storage/v1/object/public/ai_gallery/categories/test/00-realistic.jpg"
}
```

---

## 🐛 Troubleshooting

### Erreur : `Failed to fetch`
**Cause** : Le serveur n'est pas déployé ou n'est pas accessible
**Solution** : 
1. Vérifier que le serveur est déployé (voir ci-dessus)
2. Vérifier les logs du serveur dans Supabase Dashboard → Edge Functions → Logs
3. Tester le health check endpoint

### Erreur : `Missing idempotency-key header`
**Cause** : Le header `idempotency-key` n'est pas envoyé
**Solution** : C'est normal, le frontend l'envoie automatiquement

### Erreur : `404 Not Found` sur `/ideas/generate`
**Cause** : L'endpoint n'existe pas (serveur pas déployé avec la nouvelle version)
**Solution** : Déployer le serveur avec la commande ci-dessus

### Erreur : `Image too small (X bytes)`
**Cause** : Pollinations a retourné une image cassée/corrompue
**Solution** : Le système retry automatiquement 3 fois, c'est normal

---

## 📊 Logs à surveiller

Une fois déployé, surveille les logs dans Supabase Dashboard :

### Logs normaux (succès) :
```
[Ideas] 🎨 Generating new image for: ai-headshots (ai-headshots-cinematic-0-1536x1920)
[Ideas] 🔄 Pollinations URL: https://image.pollinations.ai/prompt/...
[Pollinations] 🔄 Attempt 1/2...
[Pollinations] ✅ Success on attempt 1
[Ideas] ✅ Image received: 245678 bytes, type: image/jpeg
[Ideas] 📤 Uploading to: categories/ai-headshots/00-cinematic.jpg
[Ideas] ✅ Public URL: https://...
[Ideas] 💾 Saved to ideas_examples
[Ideas] 🎉 Generation complete for: ai-headshots-cinematic-0-1536x1920
```

### Logs d'erreur :
```
[Ideas] ⚠️  Attempt 1/3 failed: HTTP 500
[Ideas] ⚠️  Image too small (12345 bytes), likely broken
[Ideas] ❌ Generation error: Pollinations failed after 3 attempts
```

---

## 🔑 Variables d'environnement requises

Le serveur a besoin de ces variables (déjà configurées normalement) :

- `SUPABASE_URL` ✅
- `SUPABASE_SERVICE_ROLE_KEY` ✅
- `SUPABASE_ANON_KEY` ✅

---

## 🎯 Après le déploiement

1. **Tester dans l'UI** :
   - Ouvrir l'admin
   - Cliquer sur **"🧪 Test Endpoint"**
   - Vérifier que ça fonctionne

2. **Lancer une génération test** :
   - Activer Test Mode (5 images max)
   - Sélectionner 1 catégorie
   - Cliquer "🚀 Start Generation"
   - Ouvrir Debug Console 🔍

3. **Monitorer** :
   - Regarder les logs dans Debug Console
   - Vérifier que les images sont générées
   - Vérifier le bucket `ai_gallery` dans Supabase Storage
   - Vérifier la table `ideas_examples`

---

## 📞 Support

Si problèmes :
1. Checker les logs Supabase Edge Functions
2. Ouvrir Debug Console dans l'UI
3. Vérifier que `projectId` et `publicAnonKey` sont corrects dans `/utils/supabase/info.tsx`

---

**Status** : ⚠️  **DÉPLOIEMENT REQUIS AVANT UTILISATION**
