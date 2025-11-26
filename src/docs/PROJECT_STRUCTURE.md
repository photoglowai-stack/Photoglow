# 📁 PhotoGlow - Project Structure

Complete file tree with descriptions for quick navigation.

---

## Root Directory

```
photoglow/
├── .env.example                    # Environment variables template
├── .gitignore                      # Git ignore patterns
├── README.md                       # Main documentation (start here)
├── package.json                    # Dependencies and scripts
├── tsconfig.json                   # TypeScript configuration
├── next.config.mjs                 # Next.js configuration
├── tailwind.config.ts              # Tailwind CSS v4 config
├── vercel.json                     # Vercel deployment config
└── vitest.config.ts                # Testing configuration
```

---

## Application (`/app`)

Next.js App Router structure with file-based routing.

```
app/
├── layout.tsx                      # Root layout (global)
├── page.tsx                        # Homepage (/)
│
├── (public)/                       # Public route group (no auth)
│   ├── layout.tsx                  # Public layout wrapper
│   └── page.tsx                    # Public homepage
│
├── create/                         # AI Photo Generator
│   ├── page.tsx                    # Main generator page (/create)
│   └── loading.tsx                 # Loading state
│
├── gallery/                        # Photo Gallery
│   ├── page.tsx                    # Gallery page (/gallery)
│   └── loading.tsx                 # Loading state
│
├── admin/                          # Admin Dashboard
│   ├── page.tsx                    # Main admin panel (/admin)
│   ├── loading.tsx                 # Loading state
│   ├── generate/                   # Bulk generation tool
│   │   ├── page.tsx                # Generation page (/admin/generate)
│   │   └── loading.tsx             # Loading state
│   └── generate-ideas/
│       └── page.tsx                # Ideas generation (/admin/generate-ideas)
│
└── api/                            # API Routes (Next.js)
    └── admin/
        └── categories/
            └── route.ts            # Categories API endpoint
```

---

## Components (`/components`)

React components organized by type and purpose.

```
components/
│
├── ⭐ MAIN COMPONENTS
│   ├── AIPhotoGenerator.tsx              # Main AI generator (3 modes)
│   ├── AdminV2Unified.tsx                # Unified admin panel (4 tabs)
│   ├── CategoryUniversalPage.tsx         # Universal category page
│   ├── Header.tsx                        # Site header/navigation
│   ├── Footer.tsx                        # Site footer
│   └── AuthModal.tsx                     # Login/signup modal
│
├── 📄 PAGE COMPONENTS
│   ├── PhotoGlowPage.tsx                 # Main landing page
│   ├── ProfilePage.tsx                   # User profile
│   ├── CreditsDashboard.tsx              # Credits management
│   ├── IdeasPage.tsx                     # Ideas gallery
│   ├── UnifiedGallery.tsx                # Main photo gallery
│   └── VideosGalleryPage.tsx             # Video gallery
│
├── 🎨 FEATURE COMPONENTS
│   ├── AdminGenerateCategoriesClean.tsx  # Category generator
│   ├── AdminGenerateIdeasSimple.tsx      # Ideas generator
│   ├── CategoryShowcase.tsx              # Category display
│   ├── CreateAIModelTab.tsx              # AI model creation
│   ├── Gen4Panel.tsx                     # Gen-4 controls
│   └── HealthCheckPanel.tsx              # System health
│
├── 📦 UI COMPONENTS (Radix UI)
│   ├── ui/
│   │   ├── button.tsx                    # Button component
│   │   ├── card.tsx                      # Card component
│   │   ├── dialog.tsx                    # Modal dialog
│   │   ├── input.tsx                     # Input field
│   │   ├── select.tsx                    # Select dropdown
│   │   ├── tabs.tsx                      # Tabs component
│   │   ├── toast.tsx                     # Toast notifications
│   │   └── ... (50+ UI primitives)
│
├── 🔄 SHARED COMPONENTS
│   ├── shared/
│   │   ├── AnimatedDiv/                  # Animated container
│   │   ├── Footer/                       # Footer (organized)
│   │   ├── Header/                       # Header (organized)
│   │   ├── LazyImage/                    # Lazy-loaded image
│   │   ├── LoadingSkeleton/              # Loading placeholder
│   │   ├── ScrollingMosaic/              # Scrolling mosaic grid
│   │   └── SEOHead/                      # SEO metadata
│
├── 📑 PAGE-SPECIFIC COMPONENTS
│   ├── pages/
│   │   ├── IdeasPage/                    # Ideas page components
│   │   ├── ProfilePage/                  # Profile page components
│   │   └── README.md                     # Page components guide
│
├── 🎯 FEATURE MODULES
│   ├── feature/
│   │   ├── AspectRatioSelect.tsx         # Aspect ratio selector
│   │   ├── ImageGrid.tsx                 # Image grid display
│   │   ├── JobStatusBadge.tsx            # Job status indicator
│   │   ├── ModelSelect.tsx               # Model selector
│   │   └── PromptForm.tsx                # Prompt input form
│
└── 📊 DATA & CONFIG
    ├── categoryData.ts                   # Category definitions
    ├── categoryPromptsConfig.ts          # Category prompts
    ├── ideasData.ts                      # Ideas data
    └── data/                             # Organized data files
        ├── categories/                   # Category data
        ├── prompts/                      # Prompt templates
        └── config/                       # Configuration files
```

---

## Hooks (`/hooks`)

Custom React hooks for state management and side effects.

```
hooks/
├── README.md                       # Hooks documentation
├── useAuth.ts                      # Authentication state
├── useCredits.ts                   # Credits management (cached)
├── useAIModels.ts                  # AI models CRUD operations
├── useUserCredits.ts               # User credits fetching
├── useCategoryImages.ts            # Category images loading
├── useExamplePhotos.ts             # Example photos fetching
└── useDebounce.ts                  # Debounce utility hook
```

---

## Utilities (`/utils`)

Helper functions and API clients.

```
utils/
├── ⭐ API CLIENTS
│   ├── credits-client.ts           # Credits API (with caching)
│   ├── api-client.ts               # External AI API client
│   ├── ai-models-client.ts         # AI models API client
│   └── job-polling.ts              # Job status polling
│
├── 🔧 UTILITIES
│   ├── error-handler.ts            # Error handling utilities
│   ├── category-mapping.ts         # Category mapping logic
│   └── config.ts                   # App configuration
│
└── 🗄️ SUPABASE
    ├── supabase/
    │   ├── client.ts               # Supabase client singleton
    │   └── info.tsx                # 🔒 PROTECTED - Project info
```

---

## Library (`/lib`)

Core application libraries and constants.

```
lib/
├── admin.ts                        # Admin utilities
├── api.ts                          # Legacy API client
├── validators.ts                   # Zod validation schemas
├── config.ts                       # App configuration
│
├── api/
│   └── client.ts                   # Centralized fetch wrapper
│
├── constants/
│   ├── index.ts                    # General constants
│   ├── models.ts                   # AI model constants
│   └── routes.ts                   # Route constants
│
├── data/
│   ├── allCategoriesData.ts        # All categories data
│   ├── allIdeasCategoriesComplete.ts  # Complete ideas data
│   ├── categories.ts               # Categories configuration
│   └── index.ts                    # Data exports
│
└── utils/
    ├── format.ts                   # Formatting utilities
    └── validation.ts               # Validation helpers
```

---

## Backend (`/supabase`)

Supabase Edge Functions (Hono server).

```
supabase/
└── functions/
    └── server/
        ├── index.tsx                       # ⭐ Main Hono server
        ├── kv_store.tsx                    # 🔒 PROTECTED - KV store
        ├── category-prompts-data.ts        # Category prompts
        ├── category-prompts-enriched.ts    # Enriched prompts
        ├── category-prompts-all-categories.ts  # All prompts
        ├── DEPLOY.md                       # Deployment guide
        └── DEPLOY_V2.md                    # Updated deployment
```

**Routes** in `index.tsx`:
- `GET  /make-server-ab844084/health` - Health check
- `GET  /make-server-ab844084/credits` - Get user credits
- `POST /make-server-ab844084/credits/debit` - Debit credits
- `POST /make-server-ab844084/credits/add` - Add credits
- `GET  /make-server-ab844084/category-prompts` - Category prompts

---

## Database (`/sql`)

SQL migration files for Supabase PostgreSQL.

```
sql/
├── setup_credits_system.sql        # Credits table & functions
├── simple_debit_credits.sql        # Simple debit function
├── decrement_credits.sql           # Decrement function
├── extend_ideas_examples_for_categories.sql  # Ideas extension
└── setup_videos_meta.sql           # Videos metadata table
```

**Run in order** when setting up a new database.

---

## Documentation (`/docs`)

Comprehensive project documentation.

```
docs/
├── API.md                          # ⭐ Complete API reference
├── DEPLOYMENT.md                   # ⭐ Vercel deployment guide
├── CLAUDE_CODE_GUIDE.md            # ⭐ AI assistant guide
├── PROJECT_STRUCTURE.md            # ⭐ This file
├── ARCHITECTURE.md                 # System architecture
│
├── archive/                        # Archived temporary docs
│   └── ... (100+ archived .md files)
│
└── prompts-automation/             # Prompts automation docs
    ├── COMPLETE_GUIDE.md
    ├── GENERATION_GUIDE.md
    ├── QUICK_START.md
    └── README.md
```

---

## Scripts (`/scripts`)

Utility scripts for development and testing.

```
scripts/
├── 🧪 TESTING SCRIPTS
│   ├── test-credits-cache.sh           # Test credits caching
│   ├── test-vercel-integration.sh      # Test Vercel API
│   ├── test-server-connectivity.sh     # Test server connection
│   ├── test-ideas-generate.sh          # Test ideas generation
│   └── test.sh                         # General test script
│
├── 🔧 GENERATION SCRIPTS
│   ├── generate-all-category-images.ts # Generate category images
│   ├── generate-vercel-api.mjs         # Generate via Vercel API
│   ├── generate-vercel-api-all-ideas.mjs  # Generate all ideas
│   └── generate.mjs                    # General generation
│
├── 📊 DATA SCRIPTS
│   ├── count-categories.ts             # Count categories
│   ├── count-ideas.mjs                 # Count ideas
│   ├── extract-all-ideas.mjs           # Extract ideas data
│   ├── verify-all-ideas.mjs            # Verify ideas
│   └── ideas-data-export.mjs           # Export ideas data
│
└── 🧹 CLEANUP SCRIPTS
    ├── cleanup-temp-docs.sh            # ⭐ Clean temporary docs
    └── add-photo-ai-prefix.js          # Add AI prefix to photos
```

---

## Types (`/types`)

TypeScript type definitions.

```
types/
├── api.ts                          # API types (responses, requests)
├── database.ts                     # Database schema types
└── index.ts                        # Exported types
```

**Key Types**:
```typescript
// types/api.ts
export interface CreditsResponse { ... }
export interface DebitCreditsResponse { ... }
export interface GenerationJob { ... }

// types/database.ts
export interface Database { ... }
```

---

## Styles (`/styles`)

Global CSS and Tailwind configuration.

```
styles/
└── globals.css                     # Global styles + Tailwind directives
```

---

## Tests (`/tests`)

Test files and configuration.

```
tests/
├── README.md                       # Testing guide
└── setup.ts                        # Test setup configuration
```

---

## Configuration Files

### Root Configuration

| File | Purpose |
|------|---------|
| `.env.example` | Environment variables template |
| `package.json` | Dependencies and npm scripts |
| `tsconfig.json` | TypeScript compiler options |
| `next.config.mjs` | Next.js framework configuration |
| `tailwind.config.ts` | Tailwind CSS v4 configuration |
| `postcss.config.js` | PostCSS plugins configuration |
| `vercel.json` | Vercel deployment settings |
| `vitest.config.ts` | Testing framework configuration |

---

## Key Directories Summary

| Directory | Files | Purpose |
|-----------|-------|---------|
| `/app` | ~20 | Next.js pages and API routes |
| `/components` | ~150 | React components (UI, features, pages) |
| `/hooks` | ~8 | Custom React hooks |
| `/utils` | ~10 | Helper utilities and API clients |
| `/lib` | ~20 | Core libraries and constants |
| `/supabase` | ~7 | Backend Edge Functions |
| `/sql` | ~5 | Database migrations |
| `/docs` | ~10 | Documentation files |
| `/scripts` | ~20 | Utility scripts |
| `/types` | ~3 | TypeScript type definitions |

**Total**: ~250 active files (excluding node_modules, .next, etc.)

---

## Navigation Guide

### For Frontend Development
→ Start with: `/components`, `/hooks`, `/app`

### For Backend Development
→ Start with: `/supabase/functions/server`, `/sql`, `/utils`

### For API Integration
→ Start with: `/utils/credits-client.ts`, `/utils/api-client.ts`, `/docs/API.md`

### For Deployment
→ Start with: `/docs/DEPLOYMENT.md`, `vercel.json`, `.env.example`

### For AI Assistant Work
→ Start with: `/docs/CLAUDE_CODE_GUIDE.md`, `/docs/API.md`

---

## File Size Overview

```
📊 Approximate Size Distribution:
├── node_modules/          ~500 MB (gitignored)
├── .next/                 ~100 MB (gitignored, build output)
├── components/            ~2 MB   (React components)
├── docs/archive/          ~5 MB   (archived documentation)
├── app/                   ~500 KB (Next.js pages)
├── utils/                 ~100 KB (utilities)
├── lib/                   ~200 KB (libraries)
├── sql/                   ~50 KB  (SQL scripts)
└── Other                  ~500 KB (config, scripts, etc.)

Total repo size (excluding gitignored): ~8 MB
```

---

## Quick Find

**Need to find**:
- Credits logic? → `/utils/credits-client.ts`, `/supabase/functions/server/index.tsx`
- AI generation? → `/components/AIPhotoGenerator.tsx`, `/utils/api-client.ts`
- Database schema? → `/sql/*.sql`, `/types/database.ts`
- API docs? → `/docs/API.md`
- Deployment guide? → `/docs/DEPLOYMENT.md`
- Component? → `/components/**/*.tsx`
- Hook? → `/hooks/*.ts`
- Type definition? → `/types/*.ts`

---

**Last Updated**: November 25, 2024  
**Total Files**: ~250 (active codebase)  
**Lines of Code**: ~30,000+ (estimated)
