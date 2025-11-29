# 🤖 PhotoGlow - Claude Code / Anti-Gravity Guide

**Essential guide for AI assistants (Claude Code, Anti-Gravity) working on PhotoGlow.**

This document provides the critical context and architecture understanding needed to effectively assist with PhotoGlow development.

---

## 🎯 Project Overview

**PhotoGlow** is a production-ready Next.js SaaS application for AI-powered dating photo enhancement.

### Key Facts
- **Framework**: Next.js 14 (App Router, TypeScript strict mode)
- **Backend**: Supabase (PostgreSQL + Auth + Storage + Edge Functions)
- **AI**: External API (FLUX + Runway Gen-4)
- **Deployment**: Vercel
- **Status**: ✅ Production Ready (v3.0.0)

---

## 📁 Project Structure (Essential Files)

```
photoglow/
│
├── app/                              # Next.js App Router
│   ├── (public)/                    # Public pages (no auth required)
│   │   ├── layout.tsx               # Public layout
│   │   └── page.tsx                 # Homepage (/)
│   ├── create/page.tsx              # AI Photo Generator (/create)
│   ├── gallery/page.tsx             # Photo gallery (/gallery)
│   ├── admin/                       # Admin dashboard
│   │   ├── page.tsx                 # Main admin panel
│   │   └── generate/page.tsx        # Bulk generation tool
│   └── api/                         # Next.js API routes
│       └── admin/categories/route.ts
│
├── components/                       # React components
│   ├── AIPhotoGenerator.tsx         # ⭐ Main generator (3 modes)
│   ├── AdminV2Unified.tsx           # Admin panel with tabs
│   ├── CategoryUniversalPage.tsx    # Universal category pages
│   ├── ui/                          # Radix UI primitives
│   ├── shared/                      # Reusable components
│   └── pages/                       # Page-level components
│
├── hooks/                            # Custom React hooks
│   ├── useAuth.ts                   # Supabase auth
│   ├── useCredits.ts                # Credits management with caching
│   └── useAIModels.ts               # AI models CRUD
│
├── utils/                            # Helper utilities
│   ├── credits-client.ts            # ⭐ Credits API client (cached)
│   ├── api-client.ts                # External AI API client
│   ├── job-polling.ts               # Poll generation jobs
│   └── supabase/
│       ├── client.ts                # Supabase client singleton
│       └── info.tsx                 # Project ID & keys
│
├── lib/                              # Core libraries
│   ├── api/client.ts                # Centralized fetch wrapper
│   ├── constants/                   # App constants
│   ├── data/                        # Static data (categories, prompts)
│   └── utils/                       # Utility functions
│
├── supabase/functions/server/        # Supabase Edge Functions
│   ├── index.tsx                    # ⭐ Hono server (all routes)
│   └── kv_store.tsx                 # 🔒 PROTECTED - Key-value store
│
├── sql/                              # Database migrations
├── docs/                             # Documentation
│   ├── API.md                       # Complete API reference
│   ├── DEPLOYMENT.md                # Vercel deployment guide
│   └── CLAUDE_CODE_GUIDE.md         # This file
│
├── .env.example                      # Environment variables template
├── package.json                      # Dependencies
├── next.config.mjs                   # Next.js configuration
├── vercel.json                       # Vercel deployment config
└── tsconfig.json                     # TypeScript configuration
```

---

## 🏗 Architecture Overview

### Three-Tier Architecture

```
┌──────────────────────────────────────────────────────┐
│                   FRONTEND (Next.js)                  │
│  - React Server Components (RSC) by default          │
│  - Client Components only when needed ('use client') │
│  - TypeScript strict mode                            │
└────────────────┬──────────────────┬──────────────────┘
                 │                  │
                 │                  │
        ┌────────▼──────────┐  ┌────▼────────────────┐
        │  Supabase Edge    │  │  External AI API    │
        │    Functions      │  │  (Vercel hosted)    │
        │  (Hono Server)    │  │                     │
        └────────┬──────────┘  └─────────────────────┘
                 │
                 │
        ┌────────▼──────────┐
        │   Supabase DB     │
        │  (PostgreSQL)     │
        │  + Auth + Storage │
        └───────────────────┘
```

### Key Flows

#### 1. Credits System Flow

```
User Action → Frontend → Supabase Edge Function → PostgreSQL
                    ↓
              Cache Update (localStorage, 30s TTL)
                    ↓
              UI Update (<10ms from cache)
```

**Cache Strategy**: 
- First request: Fetch from API (500ms) → Cache result
- Subsequent requests: Return from cache (<10ms)
- Auto-invalidate: On credit transactions (debit/add)
- Auto-refresh: Every 30 seconds

#### 2. AI Generation Flow

```
1. User uploads photo → Supabase Storage
2. User submits generation → AIPhotoGenerator.tsx
3. Debit credits → Supabase Edge Function
4. Call External AI API → Job queued
5. Poll job status → Every 2-30s (exponential backoff)
6. Receive image → Display + Save to gallery
7. Refund credits if failed → Supabase Edge Function
```

---

## 🔑 Critical Files Deep Dive

### 1. `utils/credits-client.ts` ⭐

**Purpose**: Centralized credits API with intelligent caching

**Key Functions**:
```typescript
// Get user credits (cached)
getCredits(userId: string): Promise<CreditsResponse>

// Debit credits (invalidates cache)
debitCredits(userId: string, amount: number, reason: string): Promise<DebitCreditsResponse>

// Add credits (invalidates cache)
addCredits(userId: string, amount: number, reason: string): Promise<DebitCreditsResponse>

// Get current user ID from session
getCurrentUserId(): Promise<string | null>

// Get current user credits
getCurrentUserCredits(): Promise<CreditsResponse>
```

**Cache Implementation**:
```typescript
const CACHE_KEY = 'photoglow_credits_cache';
const CACHE_DURATION = 30_000; // 30 seconds

interface CreditCache {
  credits: number;
  timestamp: number;
  userId: string;
}
```

**Performance**: 98% faster, 66% fewer API calls

---

### 2. `components/AIPhotoGenerator.tsx` ⭐

**Purpose**: Main AI photo generation component with 3 modes

**Modes**:
1. **Standard Generation** (1 credit) - FLUX text2img/img2img
2. **Add Object/Decor** (2 credits) - Gen-4 img2img
3. **Virtual Try-On** (2 credits) - Gen-4 clothing swap

**Key Features**:
- Real-time cost display
- Job polling with exponential backoff
- Automatic credit refund on failure
- Image preview before generation
- Gallery save functionality

**Cost Logic**:
```typescript
const getCost = (mode: GenerationMode, model: AIModel) => {
  if (model === 'flux') return 1;
  if (model === 'gen4') return 2;
  return 1;
};
```

---

### 3. `supabase/functions/server/index.tsx` ⭐

**Purpose**: Hono-based Edge Function server (all backend routes)

**Routes**:
```typescript
// Health check
GET /make-server-ab844084/health

// Credits
GET  /make-server-ab844084/credits?user_id=xxx
POST /make-server-ab844084/credits/debit
POST /make-server-ab844084/credits/add

// Category prompts
GET  /make-server-ab844084/category-prompts?category=xxx

// Admin (future)
POST /make-server-ab844084/admin/generate-bulk
```

**Base URL**: `https://{projectId}.supabase.co/functions/v1/make-server-ab844084`

**Authentication**: Bearer token (Supabase anon key)

---

### 4. `hooks/useCredits.ts`

**Purpose**: React hook for credits with automatic refresh

**Usage**:
```typescript
const { credits, loading, error, refresh } = useCredits();

// Credits update automatically every 30s
// Manual refresh available with refresh()
```

**Implementation**:
```typescript
export function useCredits() {
  const [credits, setCredits] = useState<number>(0);
  const [loading, setLoading] = useState<boolean>(true);
  
  useEffect(() => {
    const fetchCredits = async () => {
      const { credits } = await getCurrentUserCredits();
      setCredits(credits);
      setLoading(false);
    };
    
    fetchCredits();
    const interval = setInterval(fetchCredits, 30_000); // Auto-refresh
    
    return () => clearInterval(interval);
  }, []);
  
  return { credits, loading, refresh: fetchCredits };
}
```

---

## 🎨 Code Conventions

### Naming Standards

**Files**:
- Components: `PascalCase.tsx` (e.g., `AIPhotoGenerator.tsx`)
- Hooks: `use*.ts` (e.g., `useCredits.ts`)
- Utils: `kebab-case.ts` (e.g., `credits-client.ts`)
- Pages: `page.tsx` (Next.js App Router convention)

**Variables**:
- React components: `PascalCase`
- Functions: `camelCase`
- Constants: `UPPER_SNAKE_CASE`
- Types/Interfaces: `PascalCase`

### TypeScript Standards

**Strict Mode** - Zero tolerance for `any`:
```typescript
// ❌ Bad
function fetchData(id: any) { ... }

// ✅ Good
function fetchData(id: string): Promise<ApiResponse> { ... }
```

**Type Imports**:
```typescript
import type { CreditsResponse } from '@/types/api';
```

**JSDoc Required** on all exported functions:
```typescript
/**
 * Fetches user credits from the server with intelligent caching.
 * 
 * @param userId - The unique user identifier
 * @returns Promise resolving to credits data
 * 
 * @example
 * const { credits } = await getCredits('user-123');
 */
export async function getCredits(userId: string): Promise<CreditsResponse> {
  // ...
}
```

### React Standards

**React Server Components (RSC) by default**:
```typescript
// app/page.tsx - Server Component (default)
export default async function HomePage() {
  const data = await fetchData(); // Can use async/await
  return <div>{data}</div>;
}
```

**Client Components** only when needed:
```typescript
// components/Counter.tsx - Client Component
'use client'; // Required for useState, useEffect, etc.

export function Counter() {
  const [count, setCount] = useState(0);
  return <button onClick={() => setCount(count + 1)}>{count}</button>;
}
```

---

## 🚨 Critical Rules

### 🔒 Protected Files - NEVER MODIFY

These files are system-managed and auto-generated:
- `/supabase/functions/server/kv_store.tsx`
- `/utils/supabase/info.tsx`
- `/components/figma/ImageWithFallback.tsx`

### ⚠️ Environment Variables

**NEVER commit** actual values:
- Use `.env.example` as template
- Real values go in `.env` (gitignored)
- On Vercel: Add via Dashboard → Settings → Environment Variables

**Critical**: `SUPABASE_SERVICE_ROLE_KEY` must **NEVER** be exposed to frontend.

### 📦 External API Integration

**Endpoint**: `https://image-generator-api-chi.vercel.app`

**Authentication**: Bearer token (handled in `utils/api-client.ts`)

**Models**:
- **FLUX**: Text2img, img2img (1 credit)
- **Gen-4**: Add object, virtual try-on (2 credits)

**Job Polling**:
```typescript
// utils/job-polling.ts
export async function pollJobStatus(jobId: string): Promise<JobResult> {
  const maxAttempts = 60;
  const baseDelay = 2000;
  
  for (let i = 0; i < maxAttempts; i++) {
    const status = await checkJobStatus(jobId);
    
    if (status === 'completed') return result;
    if (status === 'failed') throw new Error(error);
    
    // Exponential backoff: 2s, 4s, 8s, ..., max 30s
    const delay = Math.min(baseDelay * Math.pow(2, i), 30000);
    await sleep(delay);
  }
  
  throw new Error('Job timeout');
}
```

---

## 🛠 Common Development Tasks

### Adding a New Component

1. **Create file** in appropriate folder:
   ```
   components/
     MyComponent.tsx        # Main component
     shared/                # If reusable
     feature/               # If feature-specific
     pages/                 # If page-level
   ```

2. **Structure** with JSDoc:
   ```typescript
   'use client'; // Only if needed (useState, useEffect, etc.)
   
   import type { ReactNode } from 'react';
   
   interface MyComponentProps {
     title: string;
     children: ReactNode;
   }
   
   /**
    * MyComponent description
    * 
    * @param props - Component props
    */
   export function MyComponent({ title, children }: MyComponentProps) {
     return (
       <div>
         <h1>{title}</h1>
         {children}
       </div>
     );
   }
   ```

3. **Export** from index:
   ```typescript
   // components/index.ts
   export { MyComponent } from './MyComponent';
   ```

---

### Adding a New API Route

1. **Create route** in `app/api/`:
   ```typescript
   // app/api/my-route/route.ts
   import { NextRequest, NextResponse } from 'next/server';
   
   /**
    * Handles GET requests for my-route
    */
   export async function GET(request: NextRequest) {
     try {
       const data = await fetchData();
       return NextResponse.json(data);
     } catch (error) {
       return NextResponse.json(
         { error: 'Internal server error' },
         { status: 500 }
       );
     }
   }
   ```

2. **Update** `vercel.json` if needed:
   ```json
   {
     "functions": {
       "app/api/my-route/route.ts": {
         "runtime": "nodejs20.x",
         "maxDuration": 120
       }
     }
   }
   ```

---

### Adding Credits Transaction

**Always invalidate cache** after credit changes:

```typescript
import { debitCredits } from '@/utils/credits-client';

async function handleGeneration() {
  const userId = await getCurrentUserId();
  
  // 1. Debit credits
  const result = await debitCredits(userId, 2, 'gen4_generation');
  
  if (!result.success) {
    toast.error('Insufficient credits');
    return;
  }
  
  // 2. Cache automatically invalidated
  // 3. UI will refresh via useCredits hook
  
  try {
    // 4. Perform generation
    await generateImage(...);
  } catch (error) {
    // 5. Refund on error
    await addCredits(userId, 2, 'refund_generation_failed');
  }
}
```

---

## 🐛 Debugging Tips

### Console Logs

Look for these prefixes:
- `[Credits Cache]` - Cache hit/miss/invalidation
- `[getCredits]` - API calls (only on cache miss)
- `[debitCredits]` - Credit deductions
- `[Job Polling]` - Generation job status

### Common Issues

**"Credits not updating"**
- Check: Is cache invalidated? (Look for `[Credits Cache] ❌ Invalidated`)
- Solution: Call `refresh()` from `useCredits()` hook

**"Generation failed but credits deducted"**
- Check: Is refund logic called in catch block?
- Solution: Always wrap generation in try/catch with refund

**"Type errors on build"**
- Check: `npm run type-check`
- Solution: Fix all TypeScript errors before deployment

---

## 📊 Performance Optimization

### Already Optimized

✅ **Credits Caching** - 98% faster (30s cache)
✅ **Bundle Size** - 93KB (Tailwind v4, minimal JS)
✅ **Image Optimization** - Next.js Image component
✅ **Code Splitting** - App Router automatic splitting
✅ **Database Queries** - Indexed columns

### If Adding New Features

**Checklist**:
- [ ] Use React Server Components when possible
- [ ] Dynamic import heavy components
- [ ] Implement caching for repeated API calls
- [ ] Optimize images (Next.js Image, lazy loading)
- [ ] Add loading states for async operations

---

## 🧪 Testing

### Unit Tests

```bash
npm run test
```

**Test location**: `tests/` or co-located `*.test.ts`

**Example**:
```typescript
import { describe, it, expect } from 'vitest';
import { getCredits } from '@/utils/credits-client';

describe('Credits Client', () => {
  it('should fetch user credits', async () => {
    const result = await getCredits('test-user-id');
    expect(result.success).toBe(true);
    expect(result.credits).toBeGreaterThanOrEqual(0);
  });
});
```

### Integration Tests

```bash
# Test credits endpoint
./scripts/test-credits-cache.sh

# Test Vercel API
./scripts/test-vercel-integration.sh
```

---

## 📚 Additional Resources

### Documentation

- [API Reference](API.md) - Complete API documentation
- [Deployment Guide](DEPLOYMENT.md) - Vercel deployment
- [Architecture](../ARCHITECTURE.md) - System architecture

### External Docs

- [Next.js App Router](https://nextjs.org/docs/app)
- [Supabase Docs](https://supabase.com/docs)
- [Hono Framework](https://hono.dev/)
- [Tailwind CSS v4](https://tailwindcss.com/docs)

---

## ✅ Pre-Deployment Checklist

Before deploying changes:

- [ ] `npm run type-check` - No TypeScript errors
- [ ] `npm run lint` - No ESLint errors
- [ ] `npm run build` - Successful build
- [ ] `npm run test` - All tests passing
- [ ] JSDoc comments on new exported functions
- [ ] Environment variables added to Vercel
- [ ] No console errors in browser (F12)
- [ ] Credits system working (check cache logs)
- [ ] AI generation working (both FLUX and Gen-4)

---

## 🎯 Quick Reference

### Most Used Commands

```bash
npm run dev              # Start development server
npm run build            # Build for production
npm run type-check       # Check TypeScript
npm run lint             # Run linter
npm run test             # Run tests
```

### Environment Variables (Most Important)

```bash
NEXT_PUBLIC_SUPABASE_URL
NEXT_PUBLIC_SUPABASE_ANON_KEY
SUPABASE_SERVICE_ROLE_KEY
NEXT_PUBLIC_API_URL
```

### Key Components

- `AIPhotoGenerator.tsx` - Main generation UI
- `AdminV2Unified.tsx` - Admin panel
- `useCredits.ts` - Credits hook
- `credits-client.ts` - Credits API client

---

**Last Updated**: November 25, 2024  
**For**: Claude Code, Anti-Gravity, and AI Assistant development  
**Status**: ✅ Production Ready
