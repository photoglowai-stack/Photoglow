# 📁 PhotoGlow - Project Structure (Visual Guide)

Clean, organized, production-ready structure for GitHub and Vercel.

---

## 🎯 Root Directory (Clean & Professional)

```
photoglow/
│
├── 📄 README.md                    ⭐ Main documentation (start here)
├── 📄 ARCHITECTURE.md              ⭐ Technical architecture guide
├── 📄 CONTRIBUTING.md              ⭐ How to contribute
├── 📄 CHANGELOG.md                 ⭐ Version history & roadmap
├── 📄 SECURITY.md                  ⭐ Security policy
├── 📄 LICENSE                      ⭐ Legal terms
├── 📄 QUICK_START.md               Fast setup guide (5 min)
├── 📄 Attributions.md              Third-party licenses
│
├── 🔧 .env.example                 Environment variables template
├── 🔧 .gitignore                   Git ignore rules
├── 🔧 package.json                 Dependencies & scripts
├── 🔧 package-lock.json            Locked dependency versions
├── 🔧 tsconfig.json                TypeScript configuration
├── 🔧 next.config.mjs              Next.js configuration
├── 🔧 vercel.json                  Vercel deployment config
├── 🔧 tailwind.config.ts           Tailwind CSS config
├── 🔧 postcss.config.js            PostCSS config
├── 🔧 vitest.config.ts             Test configuration
│
├── 📁 app/                         Next.js App Router (pages & API)
├── 📁 components/                  React components
├── 📁 hooks/                       Custom React hooks
├── 📁 lib/                         Core libraries
├── 📁 utils/                       Helper utilities
├── 📁 types/                       TypeScript type definitions
├── 📁 styles/                      Global styles
├── 📁 public/                      Static assets
│
├── 📁 supabase/                    Backend (Edge Functions)
├── 📁 sql/                         Database migrations
│
├── 📁 docs/                        📚 Complete documentation
├── 📁 scripts/                     🛠️ Automation scripts
├── 📁 tests/                       🧪 Test files
│
├── 📁 figma-plugin/                Figma plugin (separate module)
└── 📁 figma-plugin-admin/          Admin plugin (separate module)
```

**Total Root Files**: 15 essential files (6 MD + 9 config)
**Total Directories**: 14 organized folders

---

## 📂 Detailed Directory Structure

### 1. `/app` - Next.js App Router

```
app/
├── (public)/                       Public pages group
│   ├── layout.tsx                  Public layout wrapper
│   └── page.tsx                    Homepage
│
├── admin/                          Admin dashboard
│   ├── page.tsx                    Admin main page
│   ├── loading.tsx                 Loading state
│   ├── generate/                   Generation tools
│   │   ├── page.tsx                Generate page
│   │   └── loading.tsx             Loading state
│   └── generate-ideas/             Ideas generator
│       └── page.tsx                Ideas page
│
├── create/                         AI Photo Generator
│   ├── page.tsx                    Create page
│   └── loading.tsx                 Loading state
│
├── gallery/                        Photo gallery
│   ├── page.tsx                    Gallery page
│   └── loading.tsx                 Loading state
│
├── api/                            API routes
│   ├── admin/
│   │   └── categories/
│   │       └── route.ts            Admin categories API
│   └── v1/
│       └── ideas/
│           └── generate/
│               └── route.ts        Ideas generation API
│
├── layout.tsx                      Root layout
└── page.tsx                        Root page (redirect)
```

### 2. `/components` - React Components

```
components/
├── ui/                             🎨 UI Primitives (Radix)
│   ├── button.tsx
│   ├── card.tsx
│   ├── dialog.tsx
│   ├── input.tsx
│   ├── select.tsx
│   ├── tabs.tsx
│   └── ... (40+ components)
│
├── shared/                         🔄 Shared Components
│   ├── Header/
│   │   ├── Header.tsx
│   │   └── index.ts
│   ├── Footer/
│   │   ├── Footer.tsx
│   │   └── index.ts
│   ├── SEOHead/
│   ├── LazyImage/
│   └── ...
│
├── pages/                          📄 Page Components
│   ├── IdeasPage/
│   ├── ProfilePage/
│   └── ...
│
├── feature/                        ⚡ Feature Components
│   ├── AspectRatioSelect.tsx
│   ├── ImageGrid.tsx
│   ├── JobStatusBadge.tsx
│   ├── ModelSelect.tsx
│   ├── PromptForm.tsx
│   └── index.ts
│
├── data/                           📊 Data & Config
│   ├── categories/
│   ├── prompts/
│   ├── config/
│   └── index.ts
│
├── AIPhotoGenerator.tsx            🤖 Main AI generator
├── AdminConsole.tsx                🔧 Admin console
├── Header.tsx                      📍 Navigation header
├── Footer.tsx                      📍 Footer
├── AuthModal.tsx                   🔐 Authentication
├── CreditsDashboard.tsx            💳 Credits management
└── ... (100+ total components)
```

### 3. `/hooks` - Custom React Hooks

```
hooks/
├── useAuth.ts                      🔐 Authentication hook
├── useCredits.ts                   💳 Credits management
├── useAIModels.ts                  🤖 AI models hook
├── useCategoryImages.ts            🖼️ Category images
├── useDebounce.ts                  ⏱️ Debounce utility
├── useExamplePhotos.ts             📸 Example photos
└── useUserCredits.ts               💰 User credits
```

### 4. `/lib` - Core Libraries

```
lib/
├── api/
│   └── client.ts                   📡 API client wrapper
│
├── constants/
│   ├── index.ts                    📋 App constants
│   ├── models.ts                   🤖 Model definitions
│   └── routes.ts                   🛣️ Route constants
│
├── data/
│   ├── allCategoriesData.ts        📊 Categories data
│   ├── allIdeasCategoriesComplete.ts
│   └── categories.ts               📁 Category configs
│
├── utils/
│   ├── format.ts                   ✨ Formatting utilities
│   └── validation.ts               ✅ Validation helpers
│
├── supabase/
│   └── client.ts                   🗄️ Supabase client
│
├── admin.ts                        🔧 Admin utilities
├── api.ts                          📡 API functions
├── config.ts                       ⚙️ App configuration
├── validators.ts                   ✅ Zod validators
└── prompt-variations-generator.ts  🎨 Prompt generator
```

### 5. `/utils` - Helper Utilities

```
utils/
├── supabase/
│   ├── client.ts                   🗄️ Supabase singleton
│   └── info.tsx                    ℹ️ Project info
│
├── credits-client.ts               💳 Credits API client
├── api-client.ts                   📡 External API client
├── ai-models-client.ts             🤖 AI models client
├── category-mapping.ts             🗺️ Category utilities
├── config.ts                       ⚙️ Config utilities
├── error-handler.ts                ❌ Error handling
└── job-polling.ts                  🔄 Job polling logic
```

### 6. `/supabase` - Backend (Edge Functions)

```
supabase/
└── functions/
    └── server/
        ├── index.tsx               🚀 Main server (Hono)
        ├── kv_store.tsx            🔑 KV store utilities
        ├── category-prompts-*.ts   📝 Category prompts
        └── DEPLOY.md               📖 Deployment guide
```

### 7. `/docs` - Documentation

```
docs/
├── API.md                          📡 Complete API reference
├── DEPLOYMENT.md                   🚀 Deployment guide
├── CLAUDE_CODE_GUIDE.md            🤖 AI assistant guide
├── PROJECT_STRUCTURE.md            📁 Structure docs
├── VERCEL_OPTIMIZATION.md          ⚡ Performance guide
├── MIGRATION_GUIDE.md              🔄 Migration guide
│
├── prompts-automation/             🎨 Prompts docs (7 files)
│   ├── README.md
│   ├── COMPLETE_GUIDE.md
│   ├── GENERATION_GUIDE.md
│   └── ...
│
└── archive/                        📦 Archived docs (100+ files)
    ├── ADMIN_*.md
    ├── ALL_*.md
    ├── FIX_*.md
    └── ... (temporary docs)
```

### 8. `/scripts` - Automation Scripts

```
scripts/
├── quick-setup.sh                  ⚡ Automated setup
├── health-check.sh                 🏥 Health validation
├── cleanup-temp-docs.sh            🧹 Cleanup script
│
├── generate-vercel-api.mjs         🤖 API generation
├── generate-all-ideas-prompts.ts   💡 Ideas generation
├── test-credits-cache.sh           🧪 Credits test
├── test-server-connectivity.sh     🔌 Server test
│
└── ... (20+ utility scripts)
```

### 9. `/sql` - Database Migrations

```
sql/
├── setup_credits_system.sql        💳 Credits setup
├── setup_videos_meta.sql           🎥 Videos setup
├── decrement_credits.sql           💰 Credits function
├── simple_debit_credits.sql        💸 Debit function
└── extend_ideas_examples_for_categories.sql
```

### 10. `/tests` - Test Files

```
tests/
├── README.md                       📖 Testing guide
└── setup.ts                        ⚙️ Test configuration
```

### 11. `/figma-plugin` - Figma Plugin

```
figma-plugin/
├── README.md                       📖 Plugin docs
├── CHANGELOG.md                    📋 Version history
├── code.js                         🎨 Main plugin code
├── ui.html                         🖼️ Plugin UI
├── manifest.json                   📋 Plugin manifest
└── ... (plugin files)
```

---

## 🎯 Key File Categories

### 📄 Documentation (9 files in root)
```
✅ README.md              Main entry point
✅ ARCHITECTURE.md        Technical deep dive
✅ CONTRIBUTING.md        Contribution guide
✅ CHANGELOG.md           Version history
✅ SECURITY.md            Security policy
✅ LICENSE                Legal terms
✅ QUICK_START.md         Fast setup
✅ Attributions.md        Third-party licenses
✅ PROJECT_STRUCTURE_VISUAL.md  This file
```

### 🔧 Configuration (9 files in root)
```
✅ .env.example           Environment template
✅ .gitignore             Git ignore rules
✅ package.json           Dependencies
✅ package-lock.json      Locked versions
✅ tsconfig.json          TypeScript config
✅ next.config.mjs        Next.js config
✅ vercel.json            Vercel config
✅ tailwind.config.ts     Tailwind config
✅ vitest.config.ts       Test config
```

### 🚀 Core Application Files
```
⭐ /app/layout.tsx                Root layout
⭐ /app/page.tsx                  Homepage
⭐ /components/AIPhotoGenerator.tsx  Main feature
⭐ /hooks/useCredits.ts           Credits hook
⭐ /utils/credits-client.ts       Credits API
⭐ /supabase/functions/server/index.tsx  Backend
```

### 🛡️ Protected Files (Never Modify)
```
🔒 /supabase/functions/server/kv_store.tsx
🔒 /utils/supabase/info.tsx
🔒 /components/figma/ImageWithFallback.tsx
```

---

## 📊 Statistics

| Category | Count |
|----------|-------|
| **Total Files** | 500+ |
| **Root Files** | 18 (9 docs + 9 config) |
| **Components** | 100+ |
| **Hooks** | 7 |
| **API Routes** | 10+ |
| **Scripts** | 20+ |
| **Documentation** | 30+ files |
| **Tests** | Configured (Vitest) |

---

## 🎨 File Naming Conventions

### React Components
```typescript
// PascalCase for components
AIPhotoGenerator.tsx
CreditsDashboard.tsx
UserProfile.tsx
```

### Utilities & Hooks
```typescript
// camelCase for utilities
credits-client.ts
api-client.ts
useAuth.ts
useCredits.ts
```

### Configuration
```typescript
// kebab-case for config
next.config.mjs
tailwind.config.ts
vercel.json
```

### Documentation
```markdown
# SCREAMING_SNAKE_CASE for docs
README.md
CONTRIBUTING.md
SECURITY.md
```

---

## 🔍 Finding Files Quickly

### Need to find...

**Authentication code?**
- `/hooks/useAuth.ts` - Auth hook
- `/components/AuthModal.tsx` - Auth UI
- `/app/api/auth/` - Auth API routes

**Credits system?**
- `/utils/credits-client.ts` - API client
- `/hooks/useCredits.ts` - React hook
- `/components/CreditsDashboard.tsx` - UI
- `/sql/setup_credits_system.sql` - Database

**AI Generation?**
- `/components/AIPhotoGenerator.tsx` - Main UI
- `/utils/api-client.ts` - External API
- `/app/api/v1/ideas/generate/route.ts` - Ideas API

**Configuration?**
- `/next.config.mjs` - Next.js
- `/vercel.json` - Vercel
- `/.env.example` - Environment
- `/lib/config.ts` - App config

**Documentation?**
- `/README.md` - Start here
- `/docs/` - All guides
- `/QUICK_START.md` - Fast setup

---

## 🎯 Organization Principles

1. **Separation of Concerns**
   - `/app` - Routing & pages
   - `/components` - UI components
   - `/hooks` - Reusable logic
   - `/lib` - Business logic
   - `/utils` - Pure utilities

2. **Clear Hierarchy**
   - Shared components in `/components/shared/`
   - Feature-specific in `/components/feature/`
   - UI primitives in `/components/ui/`

3. **Colocation**
   - Related files grouped together
   - Index files for clean imports
   - Types defined near usage

4. **Scalability**
   - Easy to add new features
   - Clear patterns to follow
   - No circular dependencies

---

## 🚀 Next Steps

**For new developers**:
1. Read `/README.md` (5 min)
2. Read `/QUICK_START.md` (5 min)
3. Explore `/docs/CLAUDE_CODE_GUIDE.md` (15 min)
4. Review this file for navigation

**For contributors**:
1. Read `/CONTRIBUTING.md`
2. Understand the structure above
3. Follow naming conventions
4. Add tests for new features

---

**Status**: ✅ Clean, Organized, Production-Ready  
**Last Updated**: November 25, 2024  
**Version**: 3.0.0
