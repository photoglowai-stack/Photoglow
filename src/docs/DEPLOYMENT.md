# 🚀 PhotoGlow - Deployment Guide

Complete guide for deploying PhotoGlow to Vercel with Supabase backend.

---

## Table of Contents

1. [Prerequisites](#prerequisites)
2. [Vercel Deployment](#vercel-deployment)
3. [Supabase Setup](#supabase-setup)
4. [Environment Variables](#environment-variables)
5. [Post-Deployment](#post-deployment)
6. [CI/CD Pipeline](#cicd-pipeline)
7. [Troubleshooting](#troubleshooting)

---

## Prerequisites

Before deploying, ensure you have:

- ✅ **GitHub Account** (for repository hosting)
- ✅ **Vercel Account** (free tier available)
- ✅ **Supabase Account** (free tier available)
- ✅ **Node.js >= 18.0.0** installed locally
- ✅ **Git** configured

---

## Vercel Deployment

### Method 1: One-Click Deploy (Recommended)

1. **Click Deploy Button**

   [![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/your-repo/photoglow)

2. **Configure Project**
   - Project Name: `photoglow`
   - Framework Preset: `Next.js`
   - Root Directory: `./`

3. **Add Environment Variables** (see [Environment Variables](#environment-variables))

4. **Deploy!** 🎉

---

### Method 2: Manual Deployment

#### Step 1: Push to GitHub

```bash
# Initialize git (if not already done)
git init
git add .
git commit -m "Initial commit"

# Add remote and push
git remote add origin https://github.com/your-username/photoglow.git
git branch -M main
git push -u origin main
```

#### Step 2: Connect to Vercel

1. Go to [vercel.com/new](https://vercel.com/new)
2. Import your GitHub repository
3. Configure project settings:
   ```
   Framework Preset: Next.js
   Root Directory: ./
   Build Command: npm run build
   Output Directory: .next
   Install Command: npm install
   ```

#### Step 3: Add Environment Variables

In Vercel Dashboard → Settings → Environment Variables, add all variables from `.env.example`.

#### Step 4: Deploy

Click **Deploy** button.

---

### Method 3: CLI Deployment

```bash
# Install Vercel CLI
npm install -g vercel

# Login to Vercel
vercel login

# Deploy to production
vercel --prod

# Follow prompts and add environment variables when asked
```

---

## Supabase Setup

### Step 1: Create Supabase Project

1. Go to [app.supabase.com](https://app.supabase.com)
2. Click **New Project**
3. Fill in:
   - Project Name: `photoglow`
   - Database Password: (generate strong password)
   - Region: Choose closest to your users

### Step 2: Run Database Migrations

Execute SQL files in order:

```bash
# 1. Setup credits system
cat sql/setup_credits_system.sql | supabase db execute

# 2. Setup simple debit
cat sql/simple_debit_credits.sql | supabase db execute

# 3. Extend ideas examples
cat sql/extend_ideas_examples_for_categories.sql | supabase db execute

# 4. Setup videos meta (optional)
cat sql/setup_videos_meta.sql | supabase db execute
```

**Or manually via Supabase Dashboard:**
1. Go to SQL Editor
2. Copy contents of each `.sql` file
3. Execute in order

### Step 3: Configure Storage Buckets

Create required storage buckets:

```sql
-- In Supabase SQL Editor
INSERT INTO storage.buckets (id, name, public)
VALUES 
  ('make-ab844084-user-photos', 'make-ab844084-user-photos', false),
  ('make-ab844084-ai-models', 'make-ab844084-ai-models', false),
  ('make-ab844084-ai-gallery', 'make-ab844084-ai-gallery', true);
```

**Set bucket policies:**

```sql
-- Allow authenticated users to upload to user-photos
CREATE POLICY "Users can upload own photos"
ON storage.objects FOR INSERT
TO authenticated
WITH CHECK (
  bucket_id = 'make-ab844084-user-photos' AND
  auth.uid()::text = (storage.foldername(name))[1]
);

-- Allow public read access to ai-gallery
CREATE POLICY "Public read access to gallery"
ON storage.objects FOR SELECT
TO public
USING (bucket_id = 'make-ab844084-ai-gallery');
```

### Step 4: Deploy Edge Functions

```bash
# Navigate to project root
cd photoglow

# Install Supabase CLI
npm install -g supabase

# Login to Supabase
supabase login

# Link to your project
supabase link --project-ref your-project-ref

# Deploy edge function
supabase functions deploy make-server-ab844084 \
  --import-map supabase/functions/import_map.json
```

### Step 5: Get API Keys

1. Go to **Settings → API**
2. Copy:
   - Project URL
   - Project API keys (anon public & service_role)
   - Database URL

---

## Environment Variables

### Required Variables

Add these to Vercel → Settings → Environment Variables:

```bash
# Supabase Configuration
NEXT_PUBLIC_SUPABASE_URL=https://xxxxx.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
SUPABASE_SERVICE_ROLE_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
SUPABASE_DB_URL=postgresql://postgres:password@db.xxxxx.supabase.co:5432/postgres

# External API
NEXT_PUBLIC_API_URL=https://image-generator-api-chi.vercel.app

# Application
NEXT_PUBLIC_APP_NAME=PhotoGlow
NEXT_PUBLIC_APP_VERSION=3.0.0
NEXT_PUBLIC_BASE_URL=https://your-app.vercel.app
```

### Optional Variables

```bash
# Stripe (if using payments)
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_live_...
STRIPE_SECRET_KEY=sk_live_...
STRIPE_WEBHOOK_SECRET=whsec_...

# Analytics
NEXT_PUBLIC_GA_ID=G-XXXXXXXXXX

# Feature Flags
NEXT_PUBLIC_ENABLE_SOCIAL_LOGIN=true
```

### Environment-Specific Values

Vercel supports different values per environment:

- **Production**: Used for `vercel.app` domain
- **Preview**: Used for PR deployments
- **Development**: Used locally with `vercel dev`

---

## Post-Deployment

### Step 1: Verify Deployment

1. **Check Build Logs**
   - Go to Vercel Dashboard → Deployments
   - Click latest deployment
   - Review build logs for errors

2. **Test Live Site**
   ```
   https://your-app.vercel.app
   ```

3. **Test API Endpoints**
   ```bash
   # Test credits endpoint
   curl https://your-app.vercel.app/api/credits
   
   # Should return CORS headers
   curl -I https://your-app.vercel.app/api/credits
   ```

### Step 2: Configure Custom Domain (Optional)

1. Go to Vercel Dashboard → Settings → Domains
2. Add your custom domain: `photoglow.com`
3. Add DNS records as instructed
4. Wait for DNS propagation (5-30 minutes)

### Step 3: Set Up Monitoring

#### Vercel Analytics
1. Go to Vercel Dashboard → Analytics
2. Enable Web Analytics (free)

#### Supabase Monitoring
1. Go to Supabase Dashboard → Reports
2. Monitor:
   - Database performance
   - API requests
   - Storage usage
   - Auth events

### Step 4: Test Credits System

```bash
# Create test user
curl -X POST https://your-app.vercel.app/api/auth/signup \
  -H "Content-Type: application/json" \
  -d '{"email":"test@example.com","password":"test123"}'

# Get credits
curl https://your-app.vercel.app/api/credits?user_id=xxx

# Debit credits
curl -X POST https://your-app.vercel.app/api/credits/debit \
  -H "Content-Type: application/json" \
  -d '{"user_id":"xxx","amount":1}'
```

### Step 5: Test AI Generation

1. Login to your app
2. Go to `/create`
3. Upload photo
4. Generate with FLUX (1 credit)
5. Verify credits deducted

---

## CI/CD Pipeline

Vercel automatically sets up CI/CD when connected to GitHub.

### Automatic Deployments

- **Production**: Every push to `main` branch
- **Preview**: Every pull request
- **Rollback**: Click "Rollback" in Vercel Dashboard

### Custom Build Configuration

Create `vercel.json` (already included):

```json
{
  "functions": {
    "api/**/*.ts": {
      "runtime": "nodejs20.x",
      "maxDuration": 120
    }
  },
  "headers": [
    {
      "source": "/api/(.*)",
      "headers": [
        { "key": "Access-Control-Allow-Origin", "value": "*" }
      ]
    }
  ]
}
```

### GitHub Actions (Optional)

Create `.github/workflows/deploy.yml` for additional checks:

```yaml
name: Deploy to Vercel
on:
  push:
    branches: [main]
  pull_request:
    branches: [main]

jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - uses: actions/setup-node@v3
        with:
          node-version: 18
      
      - name: Install dependencies
        run: npm install
      
      - name: Run type check
        run: npm run type-check
      
      - name: Run linter
        run: npm run lint
      
      - name: Run tests
        run: npm test
      
      - name: Deploy to Vercel
        uses: amondnet/vercel-action@v20
        with:
          vercel-token: ${{ secrets.VERCEL_TOKEN }}
          vercel-org-id: ${{ secrets.VERCEL_ORG_ID }}
          vercel-project-id: ${{ secrets.VERCEL_PROJECT_ID }}
```

---

## Troubleshooting

### Build Errors

#### TypeScript Errors

```bash
# Check locally
npm run type-check

# Fix type errors before deploying
```

#### Missing Dependencies

```bash
# Ensure all dependencies are in package.json
npm install --save missing-package
```

#### Environment Variables

```
Error: NEXT_PUBLIC_SUPABASE_URL is not defined
```

**Solution**: Add variable in Vercel Dashboard → Settings → Environment Variables

### Runtime Errors

#### 500 Internal Server Error

1. Check Vercel function logs:
   - Dashboard → Functions → Select function → Logs

2. Check Supabase logs:
   - Dashboard → Logs → Edge Functions

#### CORS Errors

```
Access to fetch at '...' has been blocked by CORS policy
```

**Solution**: Verify `vercel.json` has CORS headers configured.

#### Database Connection Failed

```
Error: Could not connect to database
```

**Solutions**:
1. Verify `SUPABASE_DB_URL` is correct
2. Check Supabase service status
3. Verify database is not paused (free tier auto-pauses after 7 days)

### Performance Issues

#### Slow API Responses

1. **Enable caching**:
   ```typescript
   export const revalidate = 60; // Cache for 60 seconds
   ```

2. **Use CDN**:
   - Vercel Edge Network handles this automatically

3. **Optimize database queries**:
   ```sql
   -- Add indexes to frequently queried columns
   CREATE INDEX idx_users_email ON users(email);
   ```

#### Large Bundle Size

```bash
# Analyze bundle
npm run build
# Check .next/analyze output

# Solutions:
# 1. Dynamic imports
const Component = dynamic(() => import('./Component'));

# 2. Remove unused dependencies
npm uninstall unused-package
```

---

## Monitoring & Logging

### Vercel Logs

Access real-time logs:
```bash
vercel logs photoglow --follow
```

### Supabase Logs

1. Go to Supabase Dashboard → Logs
2. Select log type:
   - API Logs
   - Database Logs
   - Edge Function Logs

### Error Tracking (Optional)

Integrate Sentry:

```bash
npm install @sentry/nextjs
```

```typescript
// sentry.config.ts
import * as Sentry from '@sentry/nextjs';

Sentry.init({
  dsn: process.env.NEXT_PUBLIC_SENTRY_DSN,
  environment: process.env.VERCEL_ENV,
  tracesSampleRate: 1.0,
});
```

---

## Rollback Strategy

### Vercel Instant Rollback

1. Go to Vercel Dashboard → Deployments
2. Find previous working deployment
3. Click "⋮" → "Promote to Production"

### Database Rollback

```bash
# Create backup before migrations
supabase db dump -f backup.sql

# Restore if needed
supabase db restore backup.sql
```

---

## Security Checklist

Before going to production:

- [ ] All environment variables set correctly
- [ ] Service role key **not exposed** to frontend
- [ ] Row-level security (RLS) enabled on all tables
- [ ] Storage bucket policies configured
- [ ] CORS properly configured
- [ ] HTTPS enforced (Vercel does this automatically)
- [ ] Rate limiting enabled (use Vercel Pro if needed)
- [ ] Security headers configured in `next.config.mjs`

---

## Production Checklist

- [ ] Custom domain configured
- [ ] SSL certificate active
- [ ] Analytics enabled
- [ ] Error tracking configured
- [ ] Database indexes optimized
- [ ] Backup strategy in place
- [ ] Monitoring alerts configured
- [ ] Load testing completed
- [ ] SEO metadata configured
- [ ] Social share images added

---

## Support

- **Vercel Support**: [vercel.com/support](https://vercel.com/support)
- **Supabase Support**: [supabase.com/support](https://supabase.com/support)
- **Documentation**: [docs/](../docs/)

---

**Last Updated**: November 25, 2024  
**Status**: Production Ready ✅
