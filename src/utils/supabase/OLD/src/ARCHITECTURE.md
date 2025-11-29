# 📐 ARCHITECTURE PHOTOGLOW - DOSSIER COMPLET

**Version:** 1.0  
**Date:** 3 novembre 2024  
**Projet:** PhotoGlow - SaaS de génération d'images IA

---

## TABLE DES MATIÈRES

1. [Vue d'ensemble & flux de données](#1-vue-densemble--flux-de-données)
2. [Endpoints & contrats API](#2-endpoints--contrats-api)
3. [Base de données & Storage Supabase](#3-base-de-données--storage-supabase)
4. [CORS & préflights](#4-cors--préflights)
5. [Sécurité & gouvernance](#5-sécurité--gouvernance)
6. [Observabilité & coûts](#6-observabilité--coûts)
7. [Sync vs Async](#7-sync-vs-async)
8. [Checklists de tests](#8-checklists-de-tests)
9. [Annexes](#9-annexes)
10. [Missing & Questions](#10-missing--questions)

---

## 1. VUE D'ENSEMBLE & FLUX DE DONNÉES

### 1.1 Architecture globale

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                          PHOTOGLOW ARCHITECTURE                             │
└─────────────────────────────────────────────────────────────────────────────┘

┌──────────────┐         ┌──────────────────┐         ┌─────────────────┐
│              │         │                  │         │                 │
│   CLIENTS    │ ─────▶  │  VERCEL FUNCS    │ ─────▶  │   PROVIDERS IA  │
│              │  HTTPS  │   (Node 20+)     │  HTTPS  │                 │
│ • Web/React  │  ◀───── │                  │  ◀───── │ • Replicate     │
│ • Figma      │         │  /v1/* & /api/*  │         │ • Runway Gen-4  │
│              │         │                  │         │                 │
└──────────────┘         └──────────────────┘         └─────────────────┘
      │                          │                            │
      │                          │                            │
      │                          ▼                            │
      │                  ┌──────────────┐                     │
      │                  │   SUPABASE   │                     │
      └─────────────────▶│              │◀────────────────────┘
               Auth      │ • Postgres   │    Storage
                         │ • Storage    │    (re-hosting)
                         │ • Auth       │
                         │ • RLS        │
                         └──────────────┘
```

### 1.2 Flux de données détaillé

#### Flux TYPE 1 : Génération depuis zéro (Text-to-Image Flux 1.1 Pro)

```
┌──────┐                                                          ┌──────────┐
│Client│                                                          │ Supabase │
└──┬───┘                                                          └────┬─────┘
   │                                                                   │
   │ POST /api/generate-from-scratch                                  │
   │ {prompt, aspect_ratio, seed, user_id}                            │
   ├──────────────────────────────────────────────────────────────────▶
   │                                                                   │
   │                        ┌──────────┐                               │
   │                        │ Vercel   │                               │
   │                        │ Function │                               │
   │                        └────┬─────┘                               │
   │                             │                                     │
   │                             │ 1. Validate input                   │
   │                             │ 2. Check credits                    │
   │                             │◀────────────────────────────────────┤
   │                             │                                     │
   │                             │ POST /v1/models/.../predictions     │
   │                             │ (Replicate Flux 1.1 Pro)            │
   │                             ├──────────────────────────────────▶  │
   │                             │                    ┌──────────────┐ │
   │                             │                    │  Replicate   │ │
   │                             │                    └──────┬───────┘ │
   │                             │◀──────────────────────────┘         │
   │                             │ {id, status, output}                │
   │                             │                                     │
   │                             │ 3. Download image from Replicate    │
   │                             │    (output URL)                     │
   │                             │                                     │
   │                             │ 4. Upload to Supabase Storage       │
   │                             │    outputs/YYYY-MM-DD/{uuid}.jpg    │
   │                             ├─────────────────────────────────────▶
   │                             │                                     │
   │                             │ 5. Insert metadata in photos_meta   │
   │                             ├─────────────────────────────────────▶
   │                             │                                     │
   │                             │ 6. Debit credits                    │
   │                             ├─────────────────────────────────────▶
   │                             │                                     │
   │◀────────────────────────────┤                                     │
   │ {success: true,                                                   │
   │  image_url: "https://xyz.supabase.co/storage/v1/object/..."}     │
   │  job_id, metadata}                                                │
   │                                                                   │
```

#### Flux TYPE 2 : Génération Gen-4 (Image-to-Image Runway)

```
┌──────┐                                                          ┌──────────┐
│Client│                                                          │ Supabase │
└──┬───┘                                                          └────┬─────┘
   │                                                                   │
   │ 1. Upload reference image (if not already uploaded)              │
   │ POST /storage/v1/object/uploads/...                              │
   ├───────────────────────────────────────────────────────────────────▶
   │◀──────────────────────────────────────────────────────────────────┤
   │ {path: "uploads/abc123.jpg"}                                      │
   │                                                                   │
   │ 2. POST /api/generate-gen4-image                                 │
   │ {prompt, reference_images, prompt_strength, guidance}            │
   ├──────────────────────────────────────────────────────────────────▶
   │                                                                   │
   │                        ┌──────────┐                               │
   │                        │ Vercel   │                               │
   │                        │ Function │                               │
   │                        └────┬─────┘                               │
   │                             │                                     │
   │                             │ 1. Validate & check credits         │
   │                             │◀────────────────────────────────────┤
   │                             │                                     │
   │                             │ 2. POST Runway Gen-4 API            │
   │                             │    (img2img task)                   │
   │                             ├──────────────────────────────────▶  │
   │                             │                   ┌──────────────┐  │
   │                             │                   │ Runway Gen-4 │  │
   │                             │                   └──────┬───────┘  │
   │                             │                          │          │
   │                             │◀─────────────────────────┘          │
   │                             │ {task_id, status, output_url}       │
   │                             │                                     │
   │                             │ 3. Poll/Webhook until complete      │
   │                             │                                     │
   │                             │ 4. Download from Runway             │
   │                             │                                     │
   │                             │ 5. Re-upload to Supabase Storage    │
   │                             │    outputs/YYYY-MM-DD/{uuid}.jpg    │
   │                             ├─────────────────────────────────────▶
   │                             │                                     │
   │                             │ 6. Save metadata + debit credits    │
   │                             ├─────────────────────────────────────▶
   │                             │                                     │
   │◀────────────────────────────┤                                     │
   │ {success: true,                                                   │
   │  image_url: "https://xyz.supabase.co/storage/v1/..."}            │
   │                                                                   │
```

### 1.3 Principe INVARIANT

**RÈGLE CRITIQUE** : Jamais exposer les URLs des providers IA au client.

```
❌ INTERDIT :
{
  "image_url": "https://replicate.delivery/pbxt/xyz123..." 
}

✅ CORRECT :
{
  "image_url": "https://yourproject.supabase.co/storage/v1/object/public/outputs/2024-11-03/abc-def.jpg"
}
```

**Workflow obligatoire :**
1. Provider génère → URL temporaire provider
2. Backend télécharge le fichier depuis URL provider
3. Backend upload vers Supabase Storage (bucket `outputs/` ou `generated_images/`)
4. Backend retourne URL Supabase permanente
5. Backend peut optionnellement supprimer/ignorer URL provider

---

## 2. ENDPOINTS & CONTRATS API

### 2.1 Endpoints `/v1/*` (API Canonique)

#### 2.1.1 `POST /v1/jobs` - Créer un job de génération

**Description:** Créer un nouveau job de génération d'image (asynchrone).

**Headers:**
```
Content-Type: application/json
Authorization: Bearer {supabase_access_token}
Idempotency-Key: {unique_key}  // Optional, recommandé
```

**Body minimal:**
```json
{
  "type": "text-to-image" | "image-to-image",
  "provider": "replicate-flux" | "runway-gen4",
  "parameters": {
    "prompt": "A professional headshot of a woman in studio lighting",
    "aspect_ratio": "1:1",  // Optional: "1:1", "3:4", "4:3", "16:9"
    "seed": 42,              // Optional
    "guidance": 3.5,         // Optional (Gen-4)
    "prompt_strength": 0.85, // Optional (Gen-4)
    "reference_images": ["https://...supabase.../uploads/ref1.jpg"] // For i2i
  }
}
```

**Validations:**
- `type`: required, enum
- `provider`: required, enum
- `parameters.prompt`: required, string, min 3 chars, max 1000 chars
- `parameters.aspect_ratio`: optional, enum ["1:1", "3:4", "4:3", "16:9"]
- `parameters.seed`: optional, integer 0-999999
- `parameters.guidance`: optional, float 1-10
- `parameters.prompt_strength`: optional, float 0-1

**Réponse 201 Created:**
```json
{
  "success": true,
  "job_id": "job_abc123def456",
  "status": "queued",
  "created_at": "2024-11-03T14:30:00Z"
}
```

**Réponse 400 Bad Request:**
```json
{
  "success": false,
  "error": {
    "code": "VALIDATION_ERROR",
    "message": "Invalid aspect_ratio",
    "details": {
      "field": "parameters.aspect_ratio",
      "allowed_values": ["1:1", "3:4", "4:3", "16:9"]
    }
  }
}
```

**Réponse 402 Payment Required:**
```json
{
  "success": false,
  "error": {
    "code": "INSUFFICIENT_CREDITS",
    "message": "Not enough credits. Required: 10, Available: 5",
    "details": {
      "required": 10,
      "available": 5
    }
  }
}
```

**Réponse 409 Conflict (idempotency):**
```json
{
  "success": true,
  "job_id": "job_existing123",
  "status": "running",
  "message": "Job already exists for this idempotency key"
}
```

**Exemple cURL:**
```bash
curl -X POST https://photoglow.vercel.app/v1/jobs \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer eyJhbGc..." \
  -H "Idempotency-Key: client-gen-20241103-001" \
  -d '{
    "type": "text-to-image",
    "provider": "replicate-flux",
    "parameters": {
      "prompt": "Professional headshot, studio lighting",
      "aspect_ratio": "3:4",
      "seed": 12345
    }
  }'
```

---

#### 2.1.2 `GET /v1/jobs/{job_id}` - Récupérer le statut d'un job

**Description:** Polling du statut d'un job asynchrone.

**Headers:**
```
Authorization: Bearer {supabase_access_token}
```

**Réponse 200 OK (queued):**
```json
{
  "success": true,
  "job_id": "job_abc123",
  "status": "queued",
  "created_at": "2024-11-03T14:30:00Z",
  "updated_at": "2024-11-03T14:30:05Z"
}
```

**Réponse 200 OK (running):**
```json
{
  "success": true,
  "job_id": "job_abc123",
  "status": "running",
  "progress": 45,  // Optional percentage
  "created_at": "2024-11-03T14:30:00Z",
  "updated_at": "2024-11-03T14:30:15Z"
}
```

**Réponse 200 OK (succeeded):**
```json
{
  "success": true,
  "job_id": "job_abc123",
  "status": "succeeded",
  "image_url": "https://yourproject.supabase.co/storage/v1/object/public/outputs/2024-11-03/abc-def.jpg",
  "metadata": {
    "prompt": "Professional headshot...",
    "aspect_ratio": "3:4",
    "seed": 12345,
    "duration_ms": 8500,
    "model": "flux-1.1-pro"
  },
  "created_at": "2024-11-03T14:30:00Z",
  "completed_at": "2024-11-03T14:30:18Z"
}
```

**Réponse 200 OK (failed):**
```json
{
  "success": false,
  "job_id": "job_abc123",
  "status": "failed",
  "error": {
    "code": "PROVIDER_ERROR",
    "message": "Replicate API returned 500",
    "details": {
      "provider": "replicate",
      "provider_error": "Internal server error"
    }
  },
  "created_at": "2024-11-03T14:30:00Z",
  "failed_at": "2024-11-03T14:30:12Z"
}
```

**Réponse 404 Not Found:**
```json
{
  "success": false,
  "error": {
    "code": "JOB_NOT_FOUND",
    "message": "Job with id 'job_abc123' not found"
  }
}
```

**Exemple cURL:**
```bash
curl -X GET https://photoglow.vercel.app/v1/jobs/job_abc123 \
  -H "Authorization: Bearer eyJhbGc..."
```

---

#### 2.1.3 `GET /v1/preview` - Prévisualisation légère (optionnel)

**Description:** Génération de preview rapide avec qualité réduite (si implémenté).

**Headers:**
```
Authorization: Bearer {supabase_access_token}
```

**Query Parameters:**
```
?prompt=A+woman+smiling&aspect_ratio=1:1&quality=low
```

**Validations:**
- `prompt`: required, min 3 chars
- `aspect_ratio`: optional, default "1:1"
- `quality`: optional, enum ["low", "medium"], default "low"

**Réponse 200 OK:**
```json
{
  "success": true,
  "preview_url": "https://yourproject.supabase.co/storage/v1/.../preview-xyz.jpg",
  "expires_at": "2024-11-03T15:00:00Z"
}
```

**Exemple cURL:**
```bash
curl -X GET "https://photoglow.vercel.app/v1/preview?prompt=woman+smiling&quality=low" \
  -H "Authorization: Bearer eyJhbGc..."
```

---

### 2.2 Endpoints `/api/*` (Legacy/Specific)

#### 2.2.1 `POST /api/generate-from-scratch` - Génération Flux T2I

**Description:** Génération text-to-image avec Replicate Flux 1.1 Pro.

**Headers:**
```
Content-Type: application/json
Authorization: Bearer {supabase_access_token}
```

**Body:**
```json
{
  "prompt": "Professional business portrait of a woman, studio lighting, white background, 8K resolution",
  "aspect_ratio": "3:4",
  "seed": 42,
  "num_outputs": 1,
  "user_id": "user_abc123"
}
```

**Paramètres supportés:**
- `prompt`: required, string (min 10, max 1000 chars)
- `aspect_ratio`: optional, "1:1" | "3:4" | "4:3" | "16:9", default "1:1"
- `seed`: optional, integer 0-999999
- `num_outputs`: optional, integer 1-4, default 1
- `user_id`: optional (auto-détecté depuis JWT si absent)

**Réponse 200 OK (synchrone si rapide):**
```json
{
  "success": true,
  "image_url": "https://yourproject.supabase.co/storage/v1/object/public/outputs/2024-11-03/xyz.jpg",
  "metadata": {
    "prompt": "Professional business portrait...",
    "seed": 42,
    "aspect_ratio": "3:4",
    "model": "flux-1.1-pro",
    "duration_ms": 7200
  }
}
```

**Réponse 202 Accepted (asynchrone si lent):**
```json
{
  "success": true,
  "job_id": "job_def456",
  "status": "queued",
  "poll_url": "/v1/jobs/job_def456"
}
```

**Erreurs possibles:**
- 400: INVALID_PROMPT, INVALID_ASPECT_RATIO, INVALID_SEED
- 401: UNAUTHORIZED
- 402: INSUFFICIENT_CREDITS
- 500: PROVIDER_ERROR, STORAGE_ERROR

**Exemple cURL:**
```bash
curl -X POST https://photoglow.vercel.app/api/generate-from-scratch \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer eyJhbGc..." \
  -d '{
    "prompt": "Professional headshot of a woman in business attire, studio lighting, white background",
    "aspect_ratio": "3:4",
    "seed": 12345
  }'
```

---

#### 2.2.2 `POST /api/generate-gen4-image` - Génération Runway Gen-4

**Description:** Génération avec Runway Gen-4 (image-to-image ou text-to-image amélioré).

**Headers:**
```
Content-Type: application/json
Authorization: Bearer {supabase_access_token}
```

**Body:**
```json
{
  "prompt": "Transform this photo into a professional headshot with studio lighting",
  "reference_images": [
    "https://yourproject.supabase.co/storage/v1/object/uploads/ref1.jpg"
  ],
  "prompt_strength": 0.85,
  "guidance": 3.5,
  "seed": 42,
  "user_id": "user_abc123"
}
```

**Paramètres supportés:**
- `prompt`: required, string (min 10, max 1000 chars)
- `reference_images`: required pour i2i, array of Supabase URLs
- `prompt_strength`: optional, float 0-1, default 0.85 (force du prompt vs image)
- `guidance`: optional, float 1-10, default 3.5
- `seed`: optional, integer 0-999999
- `user_id`: optional (auto-détecté depuis JWT)

**Réponse 202 Accepted:**
```json
{
  "success": true,
  "job_id": "job_gen4_abc",
  "status": "queued",
  "poll_url": "/v1/jobs/job_gen4_abc",
  "webhook_url": "https://photoglow.vercel.app/api/webhook"
}
```

**Erreurs possibles:**
- 400: INVALID_REFERENCE_URL, INVALID_PROMPT_STRENGTH, INVALID_GUIDANCE
- 401: UNAUTHORIZED
- 402: INSUFFICIENT_CREDITS
- 500: PROVIDER_ERROR, DOWNLOAD_ERROR

**Exemple cURL:**
```bash
curl -X POST https://photoglow.vercel.app/api/generate-gen4-image \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer eyJhbGc..." \
  -d '{
    "prompt": "Professional headshot with dramatic lighting",
    "reference_images": ["https://yourproject.supabase.co/storage/v1/object/uploads/abc.jpg"],
    "prompt_strength": 0.9,
    "guidance": 4.0
  }'
```

---

### 2.3 Table récapitulative des endpoints

| Endpoint | Method | Type | Sync/Async | Auth | Idempotent |
|----------|--------|------|------------|------|------------|
| `/v1/jobs` | POST | Create job | Async | ✅ | ✅ |
| `/v1/jobs/{id}` | GET | Get status | - | ✅ | ✅ |
| `/v1/preview` | GET | Preview | Sync | ✅ | ✅ |
| `/api/generate-from-scratch` | POST | Flux T2I | Mixed | ✅ | ❌ |
| `/api/generate-gen4-image` | POST | Gen-4 I2I | Async | ✅ | ❌ |
| `/api/webhook` | POST | Provider callback | - | HMAC | ✅ |
| `/api/credits` | GET | Get credits | Sync | ✅ | ✅ |
| `/api/credits/debit` | POST | Debit credits | Sync | ✅ | ❌ |

---

## 3. BASE DE DONNÉES & STORAGE SUPABASE

### 3.1 Buckets Storage

#### Structure des buckets

```
📦 Supabase Storage
├── 📁 uploads/                    (Input images from users)
│   ├── {user_id}/
│   │   └── {uuid}.jpg
│   └── temp/
│       └── {uuid}.jpg             (TTL 24h)
│
├── 📁 outputs/                    (Generated images - PUBLIC)
│   └── YYYY-MM-DD/
│       └── {uuid}.jpg
│       └── {uuid}.webp            (Optimized version)
│
└── 📁 generated_images/           (Alternative name for outputs)
    └── YYYY-MM-DD/
        └── {uuid}.jpg
```

#### Configuration des buckets

**Bucket `uploads/`:**
```sql
-- Private bucket, accessible only by owner
CREATE BUCKET uploads
  PUBLIC = false
  FILE_SIZE_LIMIT = 10485760  -- 10MB
  ALLOWED_MIME_TYPES = ['image/jpeg', 'image/png', 'image/webp'];

-- RLS Policy
CREATE POLICY "Users can upload to their own folder"
ON storage.objects FOR INSERT
TO authenticated
WITH CHECK (
  bucket_id = 'uploads' 
  AND (storage.foldername(name))[1] = auth.uid()::text
);

CREATE POLICY "Users can read their own uploads"
ON storage.objects FOR SELECT
TO authenticated
USING (
  bucket_id = 'uploads' 
  AND (storage.foldername(name))[1] = auth.uid()::text
);
```

**Bucket `outputs/` ou `generated_images/`:**
```sql
-- Public bucket with cache-control
CREATE BUCKET outputs
  PUBLIC = true
  FILE_SIZE_LIMIT = 20971520  -- 20MB
  ALLOWED_MIME_TYPES = ['image/jpeg', 'image/png', 'image/webp'];

-- Cache-Control header
-- Set in upload code:
{
  cacheControl: '31536000',  // 1 year = 365*24*3600
  contentType: 'image/jpeg'
}
```

#### Signed URLs

**Upload (côté client):**
```javascript
// 1. Client requests signed upload URL from backend
const response = await fetch('/api/uploads/signed-url', {
  method: 'POST',
  headers: { Authorization: `Bearer ${token}` },
  body: JSON.stringify({ filename: 'photo.jpg', contentType: 'image/jpeg' })
});

const { signedUrl, path } = await response.json();

// 2. Client uploads directly to Supabase with signed URL
await fetch(signedUrl, {
  method: 'PUT',
  headers: { 'Content-Type': 'image/jpeg' },
  body: fileBlob
});
```

**Download (private buckets):**
```javascript
// Backend generates signed download URL
const { data, error } = await supabase.storage
  .from('uploads')
  .createSignedUrl('user_123/abc.jpg', 3600); // 1 hour expiry

// Returns: 
// { signedUrl: 'https://...?token=xyz' }
```

---

### 3.2 Tables Postgres

#### Table `photos_meta`

**Schéma:**
```sql
CREATE TABLE photos_meta (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  
  -- Image location
  image_url TEXT NOT NULL,  -- Full Supabase Storage URL
  storage_path TEXT NOT NULL,  -- Relative path in bucket
  
  -- Generation parameters
  prompt TEXT NOT NULL,
  mode TEXT NOT NULL,  -- 'text-to-image', 'image-to-image', etc.
  provider TEXT NOT NULL,  -- 'replicate-flux', 'runway-gen4'
  model TEXT,  -- 'flux-1.1-pro', 'gen-4-turbo'
  
  -- Settings
  aspect_ratio TEXT,
  seed INTEGER,
  guidance DECIMAL(4,2),
  prompt_strength DECIMAL(3,2),
  reference_images JSONB,  -- Array of reference image URLs
  
  -- Metadata
  duration_ms INTEGER,  -- Time to generate in milliseconds
  credits_used INTEGER DEFAULT 0,
  file_size_bytes BIGINT,
  image_width INTEGER,
  image_height INTEGER,
  
  -- Status & timestamps
  status TEXT DEFAULT 'completed',  -- 'pending', 'processing', 'completed', 'failed'
  error_message TEXT,
  
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW(),
  
  -- Indexes
  CONSTRAINT valid_mode CHECK (mode IN ('text-to-image', 'image-to-image', 'video')),
  CONSTRAINT valid_provider CHECK (provider IN ('replicate-flux', 'runway-gen4', 'pollinations'))
);

CREATE INDEX idx_photos_user_id ON photos_meta(user_id);
CREATE INDEX idx_photos_created_at ON photos_meta(created_at DESC);
CREATE INDEX idx_photos_status ON photos_meta(status);
CREATE INDEX idx_photos_provider ON photos_meta(provider);
```

**RLS Policies:**
```sql
-- Users can only read their own photos
CREATE POLICY "Users can view own photos"
ON photos_meta FOR SELECT
TO authenticated
USING (auth.uid() = user_id);

-- Service role can insert (from Vercel Functions)
CREATE POLICY "Service can insert photos"
ON photos_meta FOR INSERT
TO service_role
WITH CHECK (true);

-- Users can update their own photos (e.g., delete flag)
CREATE POLICY "Users can update own photos"
ON photos_meta FOR UPDATE
TO authenticated
USING (auth.uid() = user_id)
WITH CHECK (auth.uid() = user_id);
```

---

#### Table `user_profiles`

**Schéma:**
```sql
CREATE TABLE user_profiles (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  email TEXT,
  full_name TEXT,
  
  -- Credits system
  credits INTEGER DEFAULT 0,
  credits_used INTEGER DEFAULT 0,
  subscription_tier TEXT DEFAULT 'free',  -- 'free', 'standard', 'premium', 'pro'
  
  -- Limits
  max_credits_per_month INTEGER DEFAULT 10,
  
  -- Metadata
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW(),
  last_generation_at TIMESTAMPTZ,
  
  CONSTRAINT valid_tier CHECK (subscription_tier IN ('free', 'standard', 'premium', 'pro'))
);

CREATE INDEX idx_user_profiles_email ON user_profiles(email);
```

**RLS Policies:**
```sql
CREATE POLICY "Users can view own profile"
ON user_profiles FOR SELECT
TO authenticated
USING (auth.uid() = id);

CREATE POLICY "Users can update own profile"
ON user_profiles FOR UPDATE
TO authenticated
USING (auth.uid() = id)
WITH CHECK (auth.uid() = id);
```

---

#### Table `models` (AI Person Models)

**Schéma:**
```sql
CREATE TABLE models (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  
  name TEXT NOT NULL,
  description TEXT,
  
  -- Model status
  status TEXT DEFAULT 'pending',  -- 'pending', 'training', 'ready', 'failed'
  
  -- Training data
  training_images JSONB,  -- Array of image URLs
  thumbnail_photo TEXT,
  
  -- Replicate integration
  replicate_model_id TEXT,
  replicate_version_id TEXT,
  
  -- Physical attributes (stored as JSON for flexibility)
  attributes JSONB,  -- {gender, eyeColor, hairColor, skinTone, etc.}
  
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW(),
  
  CONSTRAINT valid_status CHECK (status IN ('pending', 'training', 'ready', 'failed'))
);

CREATE INDEX idx_models_user_id ON models(user_id);
CREATE INDEX idx_models_status ON models(status);
```

---

#### Table `generations` (Job Queue)

**Schéma:**
```sql
CREATE TABLE generations (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  job_id TEXT UNIQUE NOT NULL,  -- External job ID for polling
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  
  -- Job details
  type TEXT NOT NULL,  -- 'text-to-image', 'image-to-image'
  provider TEXT NOT NULL,  -- 'replicate-flux', 'runway-gen4'
  parameters JSONB NOT NULL,  -- All generation parameters
  
  -- Status tracking
  status TEXT DEFAULT 'queued',  -- 'queued', 'running', 'succeeded', 'failed'
  progress INTEGER,  -- 0-100
  
  -- Results
  result_url TEXT,  -- Final Supabase Storage URL
  provider_output JSONB,  -- Raw provider response
  error_message TEXT,
  
  -- Idempotency
  idempotency_key TEXT UNIQUE,
  
  -- Timestamps
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW(),
  started_at TIMESTAMPTZ,
  completed_at TIMESTAMPTZ,
  failed_at TIMESTAMPTZ,
  
  CONSTRAINT valid_type CHECK (type IN ('text-to-image', 'image-to-image', 'video')),
  CONSTRAINT valid_status CHECK (status IN ('queued', 'running', 'succeeded', 'failed'))
);

CREATE INDEX idx_generations_job_id ON generations(job_id);
CREATE INDEX idx_generations_user_id ON generations(user_id);
CREATE INDEX idx_generations_status ON generations(status);
CREATE INDEX idx_generations_idempotency ON generations(idempotency_key);
CREATE INDEX idx_generations_created_at ON generations(created_at DESC);
```

---

### 3.3 Conventions de nommage & chemins

#### Chemins Storage

```
Format outputs/: 
  outputs/YYYY-MM-DD/{uuid}.{ext}
  
Exemple:
  outputs/2024-11-03/a1b2c3d4-e5f6-7890-abcd-ef1234567890.jpg

Format uploads/:
  uploads/{user_id}/{timestamp}_{original_filename}
  
Exemple:
  uploads/550e8400-e29b-41d4-a716-446655440000/1699027200_selfie.jpg
```

#### Nomenclature UUID

```javascript
// Générer UUID v4
import { v4 as uuidv4 } from 'uuid';

const imageId = uuidv4();
const date = new Date().toISOString().split('T')[0];  // YYYY-MM-DD
const path = `outputs/${date}/${imageId}.jpg`;

// Upload
await supabase.storage
  .from('outputs')
  .upload(path, fileBuffer, {
    contentType: 'image/jpeg',
    cacheControl: '31536000',
    upsert: false
  });

// Get public URL
const { data } = supabase.storage
  .from('outputs')
  .getPublicUrl(path);

console.log(data.publicUrl);
// https://xyz.supabase.co/storage/v1/object/public/outputs/2024-11-03/abc.jpg
```

---

## 4. CORS & PRÉFLIGHTS

### 4.1 Configuration CORS pour multi-clients

**Problème:** Les requêtes viennent de plusieurs origines :
- Web app : `https://photoglow.com`
- Figma plugin : `Origin: null` (sandboxed iframe)
- Mobile app : `https://mobile.photoglow.com`

**Solution:** Configuration CORS permissive mais sécurisée.

#### 4.1.1 vercel.json

```json
{
  "headers": [
    {
      "source": "/api/(.*)",
      "headers": [
        {
          "key": "Access-Control-Allow-Origin",
          "value": "*"
        },
        {
          "key": "Access-Control-Allow-Methods",
          "value": "GET, POST, PUT, DELETE, OPTIONS"
        },
        {
          "key": "Access-Control-Allow-Headers",
          "value": "Content-Type, Authorization, Idempotency-Key, X-Request-ID"
        },
        {
          "key": "Access-Control-Max-Age",
          "value": "86400"
        },
        {
          "key": "Access-Control-Allow-Credentials",
          "value": "true"
        }
      ]
    },
    {
      "source": "/v1/(.*)",
      "headers": [
        {
          "key": "Access-Control-Allow-Origin",
          "value": "*"
        },
        {
          "key": "Access-Control-Allow-Methods",
          "value": "GET, POST, OPTIONS"
        },
        {
          "key": "Access-Control-Allow-Headers",
          "value": "Content-Type, Authorization, Idempotency-Key"
        },
        {
          "key": "Access-Control-Max-Age",
          "value": "86400"
        }
      ]
    }
  ]
}
```

#### 4.1.2 Middleware CORS dans Functions

```typescript
// /api/_middleware.ts
import { NextRequest, NextResponse } from 'next/server';

export function middleware(req: NextRequest) {
  // Handle preflight
  if (req.method === 'OPTIONS') {
    return new NextResponse(null, {
      status: 204,
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
        'Access-Control-Allow-Headers': 'Content-Type, Authorization, Idempotency-Key',
        'Access-Control-Max-Age': '86400',
      },
    });
  }

  // Add CORS headers to actual response
  const response = NextResponse.next();
  response.headers.set('Access-Control-Allow-Origin', '*');
  response.headers.set('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  response.headers.set('Access-Control-Allow-Headers', 'Content-Type, Authorization, Idempotency-Key');
  
  return response;
}

export const config = {
  matcher: ['/api/:path*', '/v1/:path*'],
};
```

#### 4.1.3 Gestion Origin:null (Figma)

```typescript
// Dans chaque endpoint API
export default async function handler(req: NextRequest) {
  const origin = req.headers.get('origin');
  
  // Figma sends Origin: null
  const allowedOrigin = origin === 'null' || !origin ? '*' : origin;
  
  const headers = {
    'Access-Control-Allow-Origin': allowedOrigin,
    'Access-Control-Allow-Credentials': 'true',
  };
  
  if (req.method === 'OPTIONS') {
    return new NextResponse(null, { 
      status: 204, 
      headers: {
        ...headers,
        'Access-Control-Allow-Methods': 'POST, GET, OPTIONS',
        'Access-Control-Allow-Headers': 'Content-Type, Authorization',
      }
    });
  }
  
  // ... reste du handler
  
  return new NextResponse(JSON.stringify(data), {
    status: 200,
    headers: {
      ...headers,
      'Content-Type': 'application/json',
    },
  });
}
```

### 4.2 Headers autorisés

| Header | Requis | Usage |
|--------|--------|-------|
| `Content-Type` | ✅ | application/json |
| `Authorization` | ✅ | Bearer {token} |
| `Idempotency-Key` | ⚠️ | Prévention doublons POST |
| `X-Request-ID` | ❌ | Traçabilité logs |
| `Accept` | ❌ | application/json |

### 4.3 Test CORS avec cURL

```bash
# Preflight request
curl -X OPTIONS https://photoglow.vercel.app/v1/jobs \
  -H "Origin: null" \
  -H "Access-Control-Request-Method: POST" \
  -H "Access-Control-Request-Headers: Content-Type, Authorization" \
  -v

# Expected response:
# HTTP/1.1 204 No Content
# Access-Control-Allow-Origin: *
# Access-Control-Allow-Methods: GET, POST, OPTIONS
# Access-Control-Allow-Headers: Content-Type, Authorization, Idempotency-Key
# Access-Control-Max-Age: 86400

# Actual POST from Figma
curl -X POST https://photoglow.vercel.app/v1/jobs \
  -H "Origin: null" \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer eyJhbGc..." \
  -d '{"type":"text-to-image","provider":"replicate-flux","parameters":{"prompt":"test"}}' \
  -v
```

---

## 5. SÉCURITÉ & GOUVERNANCE

### 5.1 Secrets & Environment Variables

**Principe:** Les secrets ne doivent JAMAIS être exposés côté client.

#### 5.1.1 Variables d'environnement

```bash
# .env.example (JAMAIS commité avec vraies valeurs)

# Supabase
SUPABASE_URL=https://yourproject.supabase.co
SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...  # Public OK
SUPABASE_SERVICE_ROLE_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...  # SECRET - server only

# Replicate
REPLICATE_API_TOKEN=r8_abc123def456...  # SECRET - server only

# Runway
RUNWAY_API_KEY=sk_live_xyz789...  # SECRET - server only

# Webhook signing
WEBHOOK_SECRET=whsec_abc123def456...  # SECRET - server only

# App config (safe to expose)
NEXT_PUBLIC_APP_URL=https://photoglow.com
NEXT_PUBLIC_SUPABASE_URL=https://yourproject.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

**Règle:** 
- Variables préfixées `NEXT_PUBLIC_*` → exposées au client (safe)
- Autres variables → server-only (secrets)

#### 5.1.2 Vérification côté serveur

```typescript
// /api/generate-from-scratch.ts
export default async function handler(req: NextRequest) {
  // ✅ CORRECT : utiliser secret côté serveur
  const replicateToken = process.env.REPLICATE_API_TOKEN;
  
  if (!replicateToken) {
    console.error('Missing REPLICATE_API_TOKEN');
    return new NextResponse(
      JSON.stringify({ 
        success: false, 
        error: { code: 'SERVER_MISCONFIGURED', message: 'Missing API credentials' }
      }),
      { status: 500 }
    );
  }
  
  // Call Replicate with server-side token
  const response = await fetch('https://api.replicate.com/v1/predictions', {
    headers: {
      Authorization: `Token ${replicateToken}`,  // Never expose to client
    },
  });
  
  // ...
}
```

---

### 5.2 Webhooks signés (HMAC)

**Problème:** Les webhooks viennent de providers externes. Comment vérifier l'authenticité ?

**Solution:** HMAC SHA-256 signature.

#### 5.2.1 Configuration côté provider

```
Replicate webhook URL:
https://photoglow.vercel.app/api/webhook

Runway webhook URL:
https://photoglow.vercel.app/api/webhook

Header signature:
X-Signature: sha256=abc123def456...
```

#### 5.2.2 Vérification HMAC

```typescript
// /api/webhook.ts
import crypto from 'crypto';

export default async function handler(req: NextRequest) {
  const signature = req.headers.get('X-Signature') || req.headers.get('X-Webhook-Signature');
  const body = await req.text();  // Raw body
  
  // Verify signature
  const secret = process.env.WEBHOOK_SECRET!;
  const hmac = crypto.createHmac('sha256', secret);
  hmac.update(body);
  const expectedSignature = `sha256=${hmac.digest('hex')}`;
  
  if (signature !== expectedSignature) {
    console.error('Invalid webhook signature');
    return new NextResponse(
      JSON.stringify({ error: 'Invalid signature' }),
      { status: 401 }
    );
  }
  
  // Signature valid, process webhook
  const payload = JSON.parse(body);
  
  // Update job status in database
  await supabase
    .from('generations')
    .update({ 
      status: payload.status, 
      result_url: payload.output,
      updated_at: new Date().toISOString()
    })
    .eq('job_id', payload.id);
  
  return new NextResponse(JSON.stringify({ received: true }), { status: 200 });
}
```

---

### 5.3 Rate limiting & quotas

#### 5.3.1 Rate limiting par IP

```typescript
// /middleware/rate-limit.ts
import { Ratelimit } from '@upstash/ratelimit';
import { Redis } from '@upstash/redis';

const redis = new Redis({
  url: process.env.UPSTASH_REDIS_URL!,
  token: process.env.UPSTASH_REDIS_TOKEN!,
});

const ratelimit = new Ratelimit({
  redis,
  limiter: Ratelimit.slidingWindow(10, '1 m'),  // 10 requests per minute
  analytics: true,
});

export async function rateLimitMiddleware(req: NextRequest) {
  const ip = req.headers.get('x-forwarded-for') || req.headers.get('x-real-ip') || 'unknown';
  
  const { success, limit, remaining, reset } = await ratelimit.limit(ip);
  
  if (!success) {
    return new NextResponse(
      JSON.stringify({
        success: false,
        error: {
          code: 'RATE_LIMIT_EXCEEDED',
          message: 'Too many requests',
          details: {
            limit,
            remaining: 0,
            reset: new Date(reset).toISOString(),
          },
        },
      }),
      { 
        status: 429,
        headers: {
          'X-RateLimit-Limit': limit.toString(),
          'X-RateLimit-Remaining': remaining.toString(),
          'X-RateLimit-Reset': reset.toString(),
        },
      }
    );
  }
  
  return null;  // Continue
}
```

#### 5.3.2 Quotas utilisateur (crédits)

```typescript
// Check credits before generation
const { data: profile } = await supabase
  .from('user_profiles')
  .select('credits, credits_used, subscription_tier')
  .eq('id', userId)
  .single();

const creditCost = 10;  // Cost per image

if (profile.credits < creditCost) {
  return new NextResponse(
    JSON.stringify({
      success: false,
      error: {
        code: 'INSUFFICIENT_CREDITS',
        message: `Not enough credits. Required: ${creditCost}, Available: ${profile.credits}`,
        details: {
          required: creditCost,
          available: profile.credits,
        },
      },
    }),
    { status: 402 }  // Payment Required
  );
}

// Debit credits
await supabase.rpc('debit_credits', { 
  user_id: userId, 
  amount: creditCost 
});
```

---

### 5.4 Principe du moindre privilège

**RLS (Row Level Security):**
- Utilisateurs ne peuvent lire QUE leurs propres données
- Service role (backend) peut tout faire
- Pas d'accès direct DB depuis client

**Storage policies:**
- `uploads/` : privé, accessible uniquement par propriétaire
- `outputs/` : public en lecture, écriture service-only

**API tokens:**
- Client utilise : `SUPABASE_ANON_KEY` (permissions limitées)
- Backend utilise : `SUPABASE_SERVICE_ROLE_KEY` (full access)

---

### 5.5 Logs structurés JSON

```typescript
// /utils/logger.ts
export function logRequest(req: NextRequest, metadata: Record<string, any>) {
  const log = {
    timestamp: new Date().toISOString(),
    level: 'info',
    request_id: req.headers.get('x-request-id') || crypto.randomUUID(),
    method: req.method,
    path: req.url,
    user_id: metadata.user_id,
    duration_ms: metadata.duration_ms,
    status: metadata.status,
    ...metadata,
  };
  
  console.log(JSON.stringify(log));
}

// Usage
const startTime = Date.now();

// ... handle request ...

logRequest(req, {
  user_id: userId,
  duration_ms: Date.now() - startTime,
  status: 200,
  provider: 'replicate',
  model: 'flux-1.1-pro',
});
```

---

## 6. OBSERVABILITÉ & COÛTS

### 6.1 Métriques clés

#### 6.1.1 Latence (P50/P95/P99)

```typescript
// Track latency per endpoint
const metrics = {
  '/v1/jobs': {
    p50: 250,   // ms
    p95: 1200,
    p99: 3500,
  },
  '/api/generate-from-scratch': {
    p50: 8000,   // Flux generation
    p95: 15000,
    p99: 25000,
  },
  '/api/generate-gen4-image': {
    p50: 12000,  // Runway Gen-4
    p95: 30000,
    p99: 60000,
  },
};
```

#### 6.1.2 Timeouts recommandés

```typescript
const TIMEOUTS = {
  'replicate-flux': 30000,      // 30s
  'runway-gen4': 60000,         // 60s
  'storage-upload': 15000,      // 15s
  'storage-download': 10000,    // 10s
  'webhook-delivery': 5000,     // 5s
};

// Example with timeout
const controller = new AbortController();
const timeout = setTimeout(() => controller.abort(), TIMEOUTS['replicate-flux']);

try {
  const response = await fetch(replicateUrl, {
    signal: controller.signal,
  });
} catch (error) {
  if (error.name === 'AbortError') {
    console.error('Request timeout');
    // Handle timeout
  }
} finally {
  clearTimeout(timeout);
}
```

---

### 6.2 Tailles d'objets

| Asset type | Typical size | Max size | Notes |
|------------|--------------|----------|-------|
| Input image (upload) | 2-5 MB | 10 MB | JPEG 80% quality |
| Output image (Flux) | 3-8 MB | 20 MB | High quality JPEG |
| Output image (Gen-4) | 5-12 MB | 20 MB | Higher fidelity |
| Preview image | 200-500 KB | 1 MB | Low quality |
| Metadata JSON | 1-5 KB | - | generations table |

---

### 6.3 Métriques par provider

```typescript
interface ProviderMetrics {
  provider: 'replicate' | 'runway';
  model: string;
  success_rate: number;  // %
  avg_duration_ms: number;
  cost_per_generation: number;  // USD
  total_generations: number;
  total_cost: number;  // USD
}

// Example tracking
const metrics: ProviderMetrics[] = [
  {
    provider: 'replicate',
    model: 'flux-1.1-pro',
    success_rate: 98.5,
    avg_duration_ms: 8500,
    cost_per_generation: 0.04,
    total_generations: 12450,
    total_cost: 498.00,
  },
  {
    provider: 'runway',
    model: 'gen-4-turbo',
    success_rate: 96.2,
    avg_duration_ms: 15000,
    cost_per_generation: 0.12,
    total_generations: 3200,
    total_cost: 384.00,
  },
];
```

---

### 6.4 Circuit breaker

**Problème:** Si un provider a des erreurs répétées (500, 503), arrêter temporairement les appels.

**Solution:** Circuit breaker pattern.

```typescript
// /utils/circuit-breaker.ts
class CircuitBreaker {
  private failureCount = 0;
  private lastFailureTime: number | null = null;
  private state: 'CLOSED' | 'OPEN' | 'HALF_OPEN' = 'CLOSED';
  
  private readonly failureThreshold = 5;  // Open after 5 failures
  private readonly timeout = 60000;       // Try again after 60s
  
  async call<T>(fn: () => Promise<T>): Promise<T> {
    if (this.state === 'OPEN') {
      if (Date.now() - this.lastFailureTime! > this.timeout) {
        this.state = 'HALF_OPEN';
      } else {
        throw new Error('Circuit breaker is OPEN');
      }
    }
    
    try {
      const result = await fn();
      this.onSuccess();
      return result;
    } catch (error) {
      this.onFailure();
      throw error;
    }
  }
  
  private onSuccess() {
    this.failureCount = 0;
    this.state = 'CLOSED';
  }
  
  private onFailure() {
    this.failureCount++;
    this.lastFailureTime = Date.now();
    
    if (this.failureCount >= this.failureThreshold) {
      this.state = 'OPEN';
      console.error(`Circuit breaker OPEN after ${this.failureCount} failures`);
    }
  }
}

// Usage
const replicateBreaker = new CircuitBreaker();

try {
  const result = await replicateBreaker.call(() => 
    fetch('https://api.replicate.com/...')
  );
} catch (error) {
  // Fallback to another provider or return error
}
```

---

## 7. SYNC VS ASYNC

### 7.1 Décision Sync vs Async

```
┌─────────────────────────────────────────────────────────────────┐
│                    SYNC vs ASYNC DECISION                       │
└─────────────────────────────────────────────────────────────────┘

Sync (réponse immédiate) :
  ✅ Temps estimé < 10s
  ✅ Vercel maxDuration permet (10s default, 60s max)
  ✅ Simple preview/low-quality
  
Async (job + polling) :
  ✅ Temps estimé > 10s
  ✅ Génération haute qualité (Flux, Gen-4)
  ✅ Évite timeouts Vercel
  ✅ Webhook pour notification
```

### 7.2 Workflow Sync

```
Client                  Vercel Function              Provider
  │                           │                          │
  │ POST /api/generate        │                          │
  ├──────────────────────────▶│                          │
  │                           │ POST prediction          │
  │                           ├─────────────────────────▶│
  │                           │                          │
  │                           │◀─────────────────────────┤
  │                           │ {status: succeeded,      │
  │                           │  output: url}            │
  │                           │                          │
  │                           │ Download + Re-upload     │
  │                           │                          │
  │◀──────────────────────────┤                          │
  │ {image_url: supabase}     │                          │
  │                           │                          │

Timeline: 5-10 seconds total
```

### 7.3 Workflow Async

```
Client                  Vercel Function              Provider              Webhook
  │                           │                          │                    │
  │ POST /v1/jobs             │                          │                    │
  ├──────────────────────────▶│                          │                    │
  │                           │ POST prediction          │                    │
  │                           ├─────────────────────────▶│                    │
  │                           │                          │                    │
  │◀──────────────────────────┤                          │                    │
  │ {job_id, status: queued}  │                          │                    │
  │                           │                          │                    │
  │                           │                          │                    │
  │ (Client polls every 3s)   │                          │                    │
  │                           │                          │                    │
  │ GET /v1/jobs/{id}         │                          │                    │
  ├──────────────────────────▶│                          │                    │
  │◀──────────────────────────┤                          │                    │
  │ {status: running}         │                          │                    │
  │                           │                          │                    │
  │ ...polling...             │                          │                    │
  │                           │                          │ POST webhook       │
  │                           │                          ├───────────────────▶│
  │                           │                          │                    │
  │                           │◀────────────────────────────────────────────────┤
  │                           │ {status: succeeded,                          │
  │                           │  output: url}                                │
  │                           │                                              │
  │                           │ 1. Download from provider                    │
  │                           │ 2. Upload to Supabase                        │
  │                           │ 3. Update generations table                  │
  │                           │                                              │
  │ GET /v1/jobs/{id}         │                                              │
  ├──────────────────────────▶│                                              │
  │◀──────────────────────────┤                                              │
  │ {status: succeeded,       │                                              │
  │  image_url: supabase}     │                                              │
  │                           │                                              │

Timeline: 10-60 seconds total
```

### 7.4 Configuration maxDuration (Vercel)

```json
// vercel.json
{
  "functions": {
    "api/generate-from-scratch.ts": {
      "maxDuration": 30
    },
    "api/generate-gen4-image.ts": {
      "maxDuration": 60
    },
    "api/webhook.ts": {
      "maxDuration": 10
    },
    "v1/jobs.ts": {
      "maxDuration": 5
    }
  }
}
```

**Note:** Free plan = 10s max, Pro plan = 60s max, Enterprise = 900s max.

---

## 8. CHECKLISTS DE TESTS

### 8.1 Tests CORS (Figma Origin:null)

```
✅ Test 1: Preflight OPTIONS request
   curl -X OPTIONS https://photoglow.vercel.app/v1/jobs \
     -H "Origin: null" \
     -H "Access-Control-Request-Method: POST" \
     -v
   
   Expected:
   - Status: 204
   - Header: Access-Control-Allow-Origin: *
   - Header: Access-Control-Allow-Methods: GET, POST, OPTIONS

✅ Test 2: Actual POST from Figma
   curl -X POST https://photoglow.vercel.app/v1/jobs \
     -H "Origin: null" \
     -H "Content-Type: application/json" \
     -H "Authorization: Bearer {token}" \
     -d '{"type":"text-to-image","provider":"replicate-flux","parameters":{"prompt":"test"}}'
   
   Expected:
   - Status: 201
   - Body: {success: true, job_id: "..."}

✅ Test 3: GET polling from Figma
   curl -X GET https://photoglow.vercel.app/v1/jobs/{id} \
     -H "Origin: null" \
     -H "Authorization: Bearer {token}"
   
   Expected:
   - Status: 200
   - Body: {success: true, status: "succeeded", image_url: "https://...supabase..."}
```

---

### 8.2 Tests API endpoints

```
✅ Test POST /v1/jobs (success)
   Request:
   {
     "type": "text-to-image",
     "provider": "replicate-flux",
     "parameters": {
       "prompt": "Professional headshot of a woman",
       "aspect_ratio": "3:4"
     }
   }
   
   Expected:
   - Status: 201
   - Response: {success: true, job_id: "job_...", status: "queued"}

✅ Test POST /v1/jobs (validation error)
   Request:
   {
     "type": "invalid-type",
     "parameters": {}
   }
   
   Expected:
   - Status: 400
   - Response: {success: false, error: {code: "VALIDATION_ERROR", ...}}

✅ Test POST /v1/jobs (insufficient credits)
   Request: (valid but user has 0 credits)
   
   Expected:
   - Status: 402
   - Response: {success: false, error: {code: "INSUFFICIENT_CREDITS", ...}}

✅ Test GET /v1/jobs/{id} (queued)
   Expected:
   - Status: 200
   - Response: {success: true, status: "queued"}

✅ Test GET /v1/jobs/{id} (succeeded)
   Expected:
   - Status: 200
   - Response: {
       success: true, 
       status: "succeeded",
       image_url: "https://xyz.supabase.co/storage/v1/object/public/outputs/..."
     }

✅ Test GET /v1/jobs/{id} (not found)
   Expected:
   - Status: 404
   - Response: {success: false, error: {code: "JOB_NOT_FOUND"}}
```

---

### 8.3 Tests Storage

```
✅ Test upload to uploads/ bucket
   - User uploads reference image
   - Expected: 200 OK, signed URL returned
   - Verify: File exists in uploads/{user_id}/
   - Verify: RLS prevents other users from accessing

✅ Test download from outputs/ bucket
   - Generate image
   - Expected: Public URL accessible without auth
   - Verify: Cache-Control: max-age=31536000

✅ Test signed URL expiry
   - Generate signed URL with 1 hour expiry
   - Wait 1 hour + 1 minute
   - Expected: URL returns 403 Forbidden
```

---

### 8.4 Tests Webhook

```
✅ Test webhook signature validation
   POST https://photoglow.vercel.app/api/webhook
   Headers:
     X-Signature: sha256=invalid_signature
   Body: {"id":"123","status":"succeeded"}
   
   Expected:
   - Status: 401
   - Response: {error: "Invalid signature"}

✅ Test webhook updates job
   POST https://photoglow.vercel.app/api/webhook
   Headers:
     X-Signature: sha256={valid_hmac}
   Body: {"id":"job_abc","status":"succeeded","output":"https://provider.com/img.jpg"}
   
   Expected:
   - Status: 200
   - Verify: generations table updated
   - Verify: image downloaded and re-uploaded to Supabase
   - Verify: result_url is Supabase URL, not provider URL
```

---

### 8.5 Tests invariant (re-hosting)

```
✅ Test: Never expose provider URLs
   Scenario: Generate image with Replicate
   
   Steps:
   1. POST /v1/jobs
   2. Wait for completion
   3. GET /v1/jobs/{id}
   
   Assertions:
   - ❌ image_url must NOT contain "replicate.delivery"
   - ❌ image_url must NOT contain "runwayml.com"
   - ✅ image_url MUST contain ".supabase.co/storage"
   - ✅ image_url MUST be publicly accessible

✅ Test: File exists in Supabase Storage
   After generation completes:
   - Extract path from image_url
   - Verify file exists: supabase.storage.from('outputs').download(path)
   - Expected: file buffer returned successfully
```

---

### 8.6 Tests de charge

```
✅ Test concurrent requests
   - Send 10 simultaneous POST /v1/jobs
   - Expected: All return 201 with unique job_ids
   - Expected: No race conditions in credit debit

✅ Test rate limiting
   - Send 15 requests in 1 minute (limit is 10/min)
   - Expected: First 10 succeed, next 5 return 429
   - Expected: X-RateLimit-* headers present

✅ Test credit debit atomicity
   - User has 10 credits
   - Send 2 concurrent requests (5 credits each)
   - Expected: 1 succeeds, 1 returns 402 (insufficient credits)
   - Final credits: 5
```

---

## 9. ANNEXES

### 9.1 Exemples cURL complets

#### Génération text-to-image Flux

```bash
# 1. Create job
curl -X POST https://photoglow.vercel.app/v1/jobs \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..." \
  -H "Idempotency-Key: client-20241103-001" \
  -d '{
    "type": "text-to-image",
    "provider": "replicate-flux",
    "parameters": {
      "prompt": "Professional business headshot of a confident woman in her 30s, wearing a navy blue blazer, white background, studio lighting, 8K resolution, sharp focus",
      "aspect_ratio": "3:4",
      "seed": 42
    }
  }'

# Response:
# {
#   "success": true,
#   "job_id": "job_abc123def456",
#   "status": "queued",
#   "created_at": "2024-11-03T14:30:00Z"
# }

# 2. Poll status (repeat every 3 seconds)
curl -X GET https://photoglow.vercel.app/v1/jobs/job_abc123def456 \
  -H "Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."

# Response (queued):
# {
#   "success": true,
#   "job_id": "job_abc123def456",
#   "status": "queued",
#   "created_at": "2024-11-03T14:30:00Z",
#   "updated_at": "2024-11-03T14:30:05Z"
# }

# Response (succeeded):
# {
#   "success": true,
#   "job_id": "job_abc123def456",
#   "status": "succeeded",
#   "image_url": "https://yourproject.supabase.co/storage/v1/object/public/outputs/2024-11-03/a1b2c3d4.jpg",
#   "metadata": {
#     "prompt": "Professional business headshot...",
#     "aspect_ratio": "3:4",
#     "seed": 42,
#     "duration_ms": 8500,
#     "model": "flux-1.1-pro"
#   },
#   "created_at": "2024-11-03T14:30:00Z",
#   "completed_at": "2024-11-03T14:30:18Z"
# }
```

---

#### Génération image-to-image Gen-4

```bash
# 1. Upload reference image to Supabase Storage (client-side)
# (Use Supabase client library or signed URL)

# 2. Generate with Gen-4
curl -X POST https://photoglow.vercel.app/api/generate-gen4-image \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..." \
  -d '{
    "prompt": "Transform this casual selfie into a professional business headshot with studio lighting and formal attire",
    "reference_images": [
      "https://yourproject.supabase.co/storage/v1/object/uploads/user_123/selfie.jpg"
    ],
    "prompt_strength": 0.85,
    "guidance": 3.5,
    "seed": 999
  }'

# Response:
# {
#   "success": true,
#   "job_id": "job_gen4_xyz789",
#   "status": "queued",
#   "poll_url": "/v1/jobs/job_gen4_xyz789"
# }

# 3. Poll until complete (same as above)
```

---

### 9.2 Exemples HTTPie

```bash
# HTTPie syntax (more readable)

# POST job
http POST https://photoglow.vercel.app/v1/jobs \
  Authorization:"Bearer $TOKEN" \
  Idempotency-Key:client-001 \
  type=text-to-image \
  provider=replicate-flux \
  parameters:='{
    "prompt": "Professional headshot",
    "aspect_ratio": "3:4"
  }'

# GET job status
http GET https://photoglow.vercel.app/v1/jobs/job_abc123 \
  Authorization:"Bearer $TOKEN"

# Check credits
http GET https://photoglow.vercel.app/api/credits \
  Authorization:"Bearer $TOKEN"
```

---

### 9.3 Postman Collection

```json
{
  "info": {
    "name": "PhotoGlow API",
    "schema": "https://schema.getpostman.com/json/collection/v2.1.0/collection.json"
  },
  "variable": [
    {
      "key": "baseUrl",
      "value": "https://photoglow.vercel.app"
    },
    {
      "key": "token",
      "value": "{{SUPABASE_ACCESS_TOKEN}}"
    }
  ],
  "item": [
    {
      "name": "Create Job",
      "request": {
        "method": "POST",
        "header": [
          {
            "key": "Authorization",
            "value": "Bearer {{token}}"
          },
          {
            "key": "Content-Type",
            "value": "application/json"
          },
          {
            "key": "Idempotency-Key",
            "value": "{{$guid}}"
          }
        ],
        "body": {
          "mode": "raw",
          "raw": "{\n  \"type\": \"text-to-image\",\n  \"provider\": \"replicate-flux\",\n  \"parameters\": {\n    \"prompt\": \"Professional headshot\",\n    \"aspect_ratio\": \"3:4\"\n  }\n}"
        },
        "url": {
          "raw": "{{baseUrl}}/v1/jobs",
          "host": ["{{baseUrl}}"],
          "path": ["v1", "jobs"]
        }
      }
    },
    {
      "name": "Get Job Status",
      "request": {
        "method": "GET",
        "header": [
          {
            "key": "Authorization",
            "value": "Bearer {{token}}"
          }
        ],
        "url": {
          "raw": "{{baseUrl}}/v1/jobs/:job_id",
          "host": ["{{baseUrl}}"],
          "path": ["v1", "jobs", ":job_id"],
          "variable": [
            {
              "key": "job_id",
              "value": "job_abc123"
            }
          ]
        }
      }
    }
  ]
}
```

---

### 9.4 Politique d'erreurs JSON

Toutes les erreurs suivent ce format :

```typescript
interface ErrorResponse {
  success: false;
  error: {
    code: string;           // Machine-readable error code
    message: string;        // Human-readable message
    details?: Record<string, any>;  // Additional context
  };
}
```

**Codes d'erreur standards :**

| Code | HTTP Status | Description |
|------|-------------|-------------|
| `VALIDATION_ERROR` | 400 | Invalid input parameters |
| `UNAUTHORIZED` | 401 | Missing or invalid auth token |
| `FORBIDDEN` | 403 | Authenticated but not allowed |
| `NOT_FOUND` | 404 | Resource doesn't exist |
| `CONFLICT` | 409 | Duplicate request (idempotency) |
| `INSUFFICIENT_CREDITS` | 402 | Not enough credits |
| `RATE_LIMIT_EXCEEDED` | 429 | Too many requests |
| `PROVIDER_ERROR` | 500 | External API failed |
| `STORAGE_ERROR` | 500 | Supabase Storage error |
| `SERVER_ERROR` | 500 | Generic server error |

---

### 9.5 Pagination GET /v1/jobs

Pour lister tous les jobs d'un utilisateur :

```
GET /v1/jobs?limit=20&offset=0&status=succeeded

Response:
{
  "success": true,
  "jobs": [
    {
      "job_id": "job_123",
      "status": "succeeded",
      "image_url": "...",
      "created_at": "2024-11-03T14:00:00Z"
    },
    // ...
  ],
  "pagination": {
    "limit": 20,
    "offset": 0,
    "total": 145,
    "has_more": true
  }
}
```

**Query parameters:**
- `limit`: integer, 1-100, default 20
- `offset`: integer, default 0
- `status`: optional filter, enum ["queued", "running", "succeeded", "failed"]
- `provider`: optional filter, enum ["replicate-flux", "runway-gen4"]

---

### 9.6 `.env.example` complet

```bash
###########################################
# PHOTOGLOW - Environment Variables
###########################################

#################
# Supabase
#################
SUPABASE_URL=https://yourproject.supabase.co
SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
SUPABASE_SERVICE_ROLE_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...  # SECRET

# Public (safe to expose to client)
NEXT_PUBLIC_SUPABASE_URL=https://yourproject.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...

#################
# AI Providers
#################
# Replicate
REPLICATE_API_TOKEN=r8_...  # SECRET

# Runway
RUNWAY_API_KEY=sk_live_...  # SECRET

#################
# Webhooks
#################
WEBHOOK_SECRET=whsec_...  # SECRET - for HMAC signature verification

#################
# App Config
#################
NEXT_PUBLIC_APP_URL=https://photoglow.com
NODE_ENV=production

#################
# Rate Limiting (optional)
#################
UPSTASH_REDIS_URL=https://...  # Optional
UPSTASH_REDIS_TOKEN=...  # Optional

#################
# Vercel (auto-set by Vercel)
#################
VERCEL_URL=photoglow.vercel.app
VERCEL_ENV=production
```

---

## 10. MISSING & QUESTIONS

### 10.1 Informations manquantes

Les points suivants nécessitent clarification ou implémentation :

#### 🔴 CRITIQUE

1. **Webhook URLs spécifiques**
   - Missing: URLs exactes de configuration webhook chez Replicate et Runway
   - Question: Faut-il un endpoint unique `/api/webhook` ou séparer `/api/webhook/replicate` et `/api/webhook/runway` ?

2. **Replicate Model IDs**
   - Missing: ID exact du modèle Flux 1.1 Pro sur Replicate
   - Format attendu: `owner/model:version`
   - Question: Utiliser le modèle officiel `black-forest-labs/flux-1.1-pro` ?

3. **Runway Gen-4 API endpoint**
   - Missing: URL complète de l'API Runway Gen-4
   - Missing: Format exact du payload pour image-to-image
   - Question: Runway utilise-t-il un système de polling ou webhook-only ?

4. **Credits pricing**
   - Missing: Coût en crédits par type de génération
   - Question suggérée:
     - Flux T2I : 10 crédits
     - Gen-4 I2I : 15 crédits
     - Preview : 2 crédits

5. **Bucket naming final**
   - Question: Utiliser `outputs/` ou `generated_images/` ?
   - Recommandation: `outputs/` (plus court, cohérent avec "input/output")

#### 🟡 IMPORTANT

6. **Authentification Figma plugin**
   - Missing: Méthode d'authentification depuis Figma
   - Question: Le plugin stocke-t-il le token Supabase ? OAuth flow ?

7. **Retry policy**
   - Missing: Stratégie de retry pour appels provider échoués
   - Suggestion: Exponentiel backoff, max 3 retries

8. **Image optimization**
   - Missing: Faut-il générer des versions WebP optimisées automatiquement ?
   - Missing: Faut-il générer des thumbnails ?

9. **Monitoring/Observability**
   - Missing: Outil de monitoring choisi (Sentry, LogRocket, Datadog ?)
   - Missing: Alerting sur erreurs critiques

10. **Logs retention**
    - Missing: Durée de conservation des logs
    - Missing: Solution de log aggregation (CloudWatch, Logtail, Axiom ?)

#### 🟢 NICE-TO-HAVE

11. **Preview endpoint implementation**
    - Missing: Le endpoint `/v1/preview` est-il réellement implémenté ?
    - Si oui, quel provider utiliser (moins cher/plus rapide) ?

12. **Pagination default values**
    - Question: Limite par défaut pour GET /v1/jobs ?
    - Suggestion: 20 items, max 100

13. **Job expiration**
    - Missing: Durée de vie des jobs dans la table `generations`
    - Question: Supprimer les jobs > 30 jours automatiquement ?

14. **CORS wildcard vs liste**
    - Question: `Access-Control-Allow-Origin: *` acceptable en production ?
    - Alternative: Liste blanche d'origines

15. **Content-Security-Policy**
    - Missing: Headers CSP pour sécurité supplémentaire

---

### 10.2 Recommandations d'implémentation

#### Phase 1 : MVP (Semaine 1-2)

```
✅ Endpoints /v1/jobs (POST + GET)
✅ Flux T2I avec /api/generate-from-scratch
✅ Storage outputs/ avec re-hosting
✅ CORS pour Figma (Origin:null)
✅ RLS Supabase basique
✅ Credits system (simple debit)
```

#### Phase 2 : Production-ready (Semaine 3-4)

```
✅ Webhook HMAC validation
✅ Gen-4 I2I avec /api/generate-gen4-image
✅ Rate limiting
✅ Circuit breaker
✅ Logs structurés JSON
✅ Idempotency sur POST /v1/jobs
```

#### Phase 3 : Optimisations (Semaine 5+)

```
✅ Image optimization (WebP)
✅ Thumbnails auto
✅ Preview endpoint
✅ Retry policy intelligent
✅ Monitoring & alerting
✅ Job pagination & filters
```

---

### 10.3 Schéma de migration DB

Si déploiement depuis zéro :

```sql
-- Run in order:

-- 1. Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- 2. Create tables (see section 3.2)
-- ... (execute all CREATE TABLE statements)

-- 3. Enable RLS
ALTER TABLE photos_meta ENABLE ROW LEVEL SECURITY;
ALTER TABLE user_profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE models ENABLE ROW LEVEL SECURITY;
ALTER TABLE generations ENABLE ROW LEVEL SECURITY;

-- 4. Create policies (see section 3.2)
-- ... (execute all CREATE POLICY statements)

-- 5. Create storage buckets
-- (via Supabase Dashboard or SQL)

-- 6. Create RPC functions
CREATE OR REPLACE FUNCTION debit_credits(user_id UUID, amount INTEGER)
RETURNS void AS $$
BEGIN
  UPDATE user_profiles
  SET credits = credits - amount,
      credits_used = credits_used + amount,
      updated_at = NOW()
  WHERE id = user_id;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;
```

---

### 10.4 Checklist de déploiement

```
AVANT LE DÉPLOIEMENT :

□ Toutes les variables d'environnement configurées dans Vercel
□ Secrets Supabase (SERVICE_ROLE_KEY) non exposés
□ Buckets Storage créés (uploads, outputs)
□ RLS policies activées
□ Tables DB créées et indexées
□ Webhook URLs configurés chez Replicate/Runway
□ CORS headers testés avec Origin:null
□ Rate limiting activé
□ Monitoring/logging configuré
□ Circuit breaker en place
□ Tests E2E passés (section 8)

APRÈS LE DÉPLOIEMENT :

□ Vérifier santé API (/health endpoint)
□ Tester génération complète (T2I Flux)
□ Tester depuis Figma plugin
□ Vérifier re-hosting (URLs Supabase uniquement)
□ Vérifier webhooks reçus
□ Monitorer erreurs 5xx
□ Vérifier latences P95 < 15s
```

---

### 10.5 Contact & support

Pour questions additionnelles sur cette architecture :

- **Clarifications manquantes** : Créer un issue GitHub avec tag `[ARCHITECTURE]`
- **Modifications proposées** : Pull request avec justification
- **Bugs découverts** : Suivre le format de log structuré (section 5.5)

---

**FIN DU DOCUMENT**

---

## Métadonnées

- **Auteur:** Architecture Team
- **Révision:** 1.0
- **Date:** 3 novembre 2024
- **Pages:** 50+
- **Fichiers liés:** 
  - `/vercel.json` (config CORS)
  - `/api/**/*.ts` (endpoints)
  - `/supabase/functions/**` (backend)
  - `/sql/**/*.sql` (migrations DB)

---

## Changelog

| Version | Date | Changes |
|---------|------|---------|
| 1.0 | 2024-11-03 | Document initial complet |

---

**🎯 Ce document est la source de vérité pour l'architecture PhotoGlow.**
