# ⚡ Quick Start — Photoglow Admin Plugin

Lancer le plugin Figma en 5 minutes chrono.

## ✅ Checklist Pre-Flight

Avant de commencer, vérifier que :

- [ ] Supabase project créé
- [ ] Backend déployé (`/supabase/functions/server/index.tsx`)
- [ ] Buckets créés : `uploads` (public) + `photos` (public)
- [ ] Variables d'environnement configurées :
  - `SUPABASE_URL`
  - `SUPABASE_SERVICE_ROLE_KEY`
  - `REPLICATE_API_TOKEN`

## 🚀 Installation (2 minutes)

### Étape 1: Configurer le Plugin

Ouvrir `/figma-plugin-admin/code.js` et remplacer :

```javascript
const PROJECT_ID = 'YOUR_PROJECT_ID'; // ⚠️ LIGNE 4
```

Par votre vrai Project ID. Le trouver dans :
- Supabase Dashboard → Settings → Project Settings → General
- Ou extraire de `SUPABASE_URL` : `https://YOUR_PROJECT_ID.supabase.co`

**Exemple:**
```javascript
const PROJECT_ID = 'abcdefghijklmnopqrst'; // ✅ Correct
```

### Étape 2: Lier le Plugin dans Figma

1. Ouvrir Figma Desktop
2. Aller dans **Plugins** → **Development** → **Import plugin from manifest**
3. Sélectionner le fichier `/figma-plugin-admin/manifest.json`
4. Le plugin apparaît dans la liste

### Étape 3: Lancer le Plugin

1. Figma → **Plugins** → **Development** → **Photoglow Admin — Generator**
2. Le panneau s'ouvre à droite
3. Vous êtes prêt ! 🎉

## 🧪 Premier Test (1 minute)

### Test FLUX text2img

**Configuration:**
```
AI Model: FLUX 1.1 Pro
Mode: text2img
Aspect Ratio: 1:1
Prompt: professional headshot, studio lighting, 85mm look
Seed: 777
```

**Actions:**
1. Entrer le prompt ci-dessus
2. Cliquer **🚀 Generate**
3. Attendre ~10-15s
4. L'image apparaît dans Figma ✨

**Attendu:**
```
Logs:
[10:30:15] ⏩ Building job request...
[10:30:16] 🪪 Job created: job_1730123456_abc123
[10:30:16] ⏳ Polling for completion...
[10:30:18] 📡 Status: running (attempt 1/60)
...
[10:30:28] 🎉 Image ready: https://...
[10:30:29] ✨ Image inserted into Figma!
```

### Test Gen-4 img2img

**Configuration:**
```
AI Model: Runway Gen-4
Mode: img2img
Aspect Ratio: 3:4
Input Image: [Upload un portrait]
Prompt: linkedin headshot, clean background, professional smile
Prompt Strength: 0.65
```

**Actions:**
1. Cliquer sur le champ fichier et upload une photo
2. Entrer le prompt
3. Cliquer **🚀 Generate**
4. Attendre ~30-45s
5. L'image apparaît dans Figma ✨

## 🎯 Cas d'Usage Courants

### 1. Headshot Professionnel (FLUX)

```
Model: FLUX 1.1 Pro
Mode: text2img
Prompt: professional corporate headshot, studio lighting, neutral background, 
        confident expression, business attire, sharp focus, 85mm portrait
Ratio: 3:4
```

### 2. Dating Profile (Gen-4 img2img)

```
Model: Runway Gen-4
Mode: img2img
Input: [Upload selfie casual]
Prompt: attractive dating photo, outdoor natural lighting, genuine smile, 
        modern casual outfit, bokeh background, cinematic look
Prompt Strength: 0.65
Ratio: 4:5
```

### 3. LinkedIn Photo (Gen-4 Turbo)

```
Model: Runway Gen-4 Turbo
Mode: img2img
Input: [Upload portrait]
Prompt: professional linkedin headshot, clean minimal background, 
        confident subtle smile, business casual, sharp details
Prompt Strength: 0.7
Ratio: 1:1
```

### 4. Fitness/Athletic (Gen-4)

```
Model: Runway Gen-4
Mode: text2img
Prompt: athletic fitness photo, gym environment, dynamic pose, 
        motivational energy, professional sports photography
Ratio: 9:16
```

## 🔍 Vérification Backend

### Test 1: Endpoint Jobs API

```bash
# Test création de job
curl -X POST \
  https://YOUR_PROJECT_ID.supabase.co/functions/v1/make-server-ab844084/v1/jobs \
  -H "Content-Type: application/json" \
  -d '{
    "mode": "text2img",
    "model": "flux",
    "prompt_final": "test prompt",
    "aspect_ratio": "1:1"
  }'

# Attendu: {"ok":true,"job_id":"job_...","status":"queued"}
```

### Test 2: Storage Signed Upload

```bash
# Test signed URL
curl -X POST \
  https://YOUR_PROJECT_ID.supabase.co/functions/v1/make-server-ab844084/storage-signed-upload \
  -H "Content-Type: application/json" \
  -d '{
    "filename": "test.jpg",
    "contentType": "image/jpeg",
    "bucket": "uploads"
  }'

# Attendu: {"ok":true,"signedUrl":"...","publicUrl":"..."}
```

### Test 3: Buckets Exist

```bash
# Vérifier buckets via Supabase Dashboard
1. Storage → Buckets
2. Vérifier "uploads" existe et est PUBLIC
3. Vérifier "photos" existe et est PUBLIC
```

## ⚠️ Troubleshooting Express

### Plugin ne démarre pas

**Symptôme:** Rien ne se passe quand je lance le plugin

**Fix:**
```bash
# Vérifier manifest.json
1. Ouvrir /figma-plugin-admin/manifest.json
2. Vérifier "main": "code.js" (pas code.ts)
3. Vérifier "ui": "ui.html"
4. Relancer Figma
```

### CORS Error

**Symptôme:** `Access to fetch blocked by CORS`

**Fix:**
```typescript
// Dans /supabase/functions/server/index.tsx
// Vérifier ces lignes existent :
app.use("/*", cors({
  origin: "*", // Autorise Origin: null de Figma
  allowHeaders: ["Content-Type", "Authorization"],
  allowMethods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
}));
```

### Job Stuck "queued"

**Symptôme:** Le job reste en statut "queued" indéfiniment

**Fix:**
```bash
# 1. Vérifier logs Supabase Edge
Supabase Dashboard → Edge Functions → Logs

# 2. Vérifier variables d'environnement
- REPLICATE_API_TOKEN configuré ?
- SUPABASE_URL correct ?
- SUPABASE_SERVICE_ROLE_KEY correct ?

# 3. Tester manuellement
curl https://YOUR_PROJECT_ID.supabase.co/functions/v1/make-server-ab844084/v1/jobs/JOB_ID
```

### Image URL 404

**Symptôme:** Job succeeded mais image_url retourne 404

**Fix:**
```bash
# 1. Vérifier bucket "photos" est PUBLIC
Supabase Dashboard → Storage → photos → Settings → Public bucket: ON

# 2. Vérifier le path
# Doit être: https://PROJECT_ID.supabase.co/storage/v1/object/public/photos/outputs/...
# PAS: https://PROJECT_ID.supabase.co/storage/v1/object/uploads/...
```

## 📊 Performance Attendues

| Modèle | Mode | Temps Moyen | P95 |
|--------|------|-------------|-----|
| FLUX | text2img | 8-12s | 20s |
| Gen-4 | text2img | 25-35s | 60s |
| Gen-4 | img2img | 30-45s | 90s |
| Gen-4 Turbo | text2img | 15-25s | 45s |
| Gen-4 Turbo | img2img | 20-35s | 60s |

## 🎓 Prochaines Étapes

1. ✅ Plugin installé et testé
2. 📝 Lire le [README complet](./README.md)
3. 📚 Consulter [Endpoints Documentation](../ENDPOINTS_AND_BUCKETS.md)
4. 🎨 Tester les prompts suggérés
5. 🚀 Utiliser en production !

---

**Bloqué ?** Consulter les logs dans le plugin Figma (fenêtre noire en bas).

**Besoin d'aide ?** Vérifier la section Dépannage dans le [README](./README.md).

**Tout fonctionne ?** 🎉 Bienvenue dans Photoglow !
