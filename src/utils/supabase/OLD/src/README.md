# 🌟 PhotoGlow

> **AI-Powered Dating Photo Enhancement SaaS Platform**

PhotoGlow is a production-ready Next.js application that transforms dating profile photos using advanced AI technology. Built with a modern stack featuring Next.js 14, Supabase, and state-of-the-art AI models (FLUX & Runway Gen-4).

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/your-repo/photoglow)

---

## ✨ Features

- 🎨 **7 AI Photo Styles** - Professional, Fashion, Dating, Outdoor, and more
- 🤖 **Custom AI Models** - Create personalized AI models with your photos
- 🎯 **16+ Category Pages** - Pre-built templates for various professions
- 📸 **Dual AI Engines** - FLUX for text2img, Runway Gen-4 for image manipulation
- 🔐 **Complete Auth System** - Supabase authentication with social logins
- 💳 **Smart Credits System** - Intelligent caching with 98% performance boost
- 📱 **Fully Responsive** - Mobile-first design with Tailwind CSS v4
- ⚡ **Production Optimized** - 93KB bundle size, lighthouse score 95+

---

## 🚀 Quick Start

### Prerequisites

- **Node.js** >= 18.0.0
- **npm** >= 9.0.0
- **Supabase Account** (free tier available)

### Automated Setup (Recommended)

Run the quick setup script:
```bash
chmod +x scripts/quick-setup.sh
./scripts/quick-setup.sh
```

This script will:
- ✅ Check Node.js and npm versions
- ✅ Create `.env` from `.env.example`
- ✅ Install dependencies
- ✅ Run type checking and linting
- ✅ Build the project
- ✅ Start development server (optional)

### Manual Setup

1. **Clone & Install**
   ```bash
   git clone https://github.com/your-repo/photoglow.git
   cd photoglow
   npm install
   ```

2. **Environment Setup**
   ```bash
   cp .env.example .env
   # Edit .env with your Supabase credentials
   ```

3. **Run Development Server**
   ```bash
   npm run dev
   ```
   Open [http://localhost:3000](http://localhost:3000)

### Health Check

Verify your setup at any time:
```bash
chmod +x scripts/health-check.sh
./scripts/health-check.sh
```

### Environment Variables

See [`.env.example`](.env.example) for all required variables. Key variables:

```bash
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
SUPABASE_SERVICE_ROLE_KEY=your-service-role-key
NEXT_PUBLIC_API_URL=https://image-generator-api-chi.vercel.app
```

---

## 📦 Tech Stack

| Layer | Technology |
|-------|------------|
| **Framework** | Next.js 14 (App Router) |
| **Language** | TypeScript (Strict Mode) |
| **Styling** | Tailwind CSS v4 |
| **UI Components** | Radix UI + Custom Components |
| **Backend** | Supabase (PostgreSQL + Auth + Storage) |
| **AI Generation** | Pollinations FLUX, Runway Gen-4 |
| **Deployment** | Vercel |
| **Testing** | Vitest + Testing Library |
| **Validation** | Zod |

---

## 🏗 Project Structure

```
photoglow/
├── app/                        # Next.js App Router
│   ├── (public)/              # Public pages
│   ├── admin/                 # Admin dashboard
│   ├── create/                # AI Photo Generator
│   ├── gallery/               # Photo gallery
│   └── api/                   # API routes
│
├── components/                 # React components
│   ├── ui/                    # Radix UI primitives
│   ├── shared/                # Shared components
│   ├── feature/               # Feature-specific components
│   └── pages/                 # Page components
│
├── hooks/                      # Custom React hooks
│   ├── useAuth.ts
│   ├── useCredits.ts
│   └── useAIModels.ts
│
├── lib/                        # Core libraries
│   ├── api/                   # API client
│   ├── constants/             # App constants
│   ├── data/                  # Static data
│   └── utils/                 # Utility functions
│
├── utils/                      # Helper utilities
│   ├── credits-client.ts      # Credits API client
│   ├── api-client.ts          # External API client
│   └── supabase/              # Supabase utilities
│
├── supabase/                   # Supabase backend
│   └── functions/server/      # Edge functions (Hono server)
│
├── docs/                       # Documentation
│   ├── API.md                 # API documentation
│   ├── DEPLOYMENT.md          # Deployment guide
│   └── archive/               # Archived docs
│
├── sql/                        # Database migrations
├── scripts/                    # Utility scripts
└── tests/                      # Test files
```

---

## 🎯 Core Features

### 1. AI Photo Generation

Three generation modes:
- **Standard Generation** (1 credit) - FLUX text2img/img2img
- **Add Object/Decor** (2 credits) - Gen-4 image manipulation
- **Virtual Try-On** (2 credits) - Gen-4 clothing swap

### 2. Credits System

**Intelligent Caching Architecture:**
- 98% faster credits display (<10ms vs 500ms)
- 66% fewer API calls with 30s localStorage cache
- Automatic invalidation on credit transactions
- Graceful degradation on network errors

### 3. Admin Dashboard

Access at `/#admin` or press **A** key:
- **Generate Tab** - Test AI generation with different models
- **Gallery Tab** - Browse all generated images
- **Health Tab** - System monitoring and diagnostics
- **AI Models Tab** - Create and manage custom AI models

---

## 📖 Documentation

| Document | Description |
|----------|-------------|
| [API.md](docs/API.md) | Complete API reference |
| [DEPLOYMENT.md](docs/DEPLOYMENT.md) | Vercel deployment guide |
| [ARCHITECTURE.md](docs/ARCHITECTURE.md) | System architecture |
| [CREDITS_CACHE.md](docs/CREDITS_CACHE_OPTIMIZATION.md) | Credits optimization guide |

---

## 🚢 Deployment to Vercel

### Automatic Deployment

1. **Push to GitHub**
   ```bash
   git push origin main
   ```

2. **Connect to Vercel**
   - Go to [vercel.com/new](https://vercel.com/new)
   - Import your repository
   - Add environment variables from `.env.example`
   - Deploy! 🚀

### Manual Deployment

```bash
npm install -g vercel
vercel login
vercel --prod
```

### Environment Variables on Vercel

Add these in Vercel Dashboard → Settings → Environment Variables:

```
NEXT_PUBLIC_SUPABASE_URL
NEXT_PUBLIC_SUPABASE_ANON_KEY
SUPABASE_SERVICE_ROLE_KEY
SUPABASE_DB_URL
NEXT_PUBLIC_API_URL
```

### Vercel Configuration

The project includes optimized [`vercel.json`](vercel.json) with:
- API routes with 120s timeout
- CORS headers for API endpoints
- Node.js 20.x runtime

---

## 🔧 Development

### Available Scripts

```bash
# Development
npm run dev              # Start dev server (port 3000)
npm run build            # Build for production
npm run start            # Start production server
npm run lint             # Run ESLint
npm run type-check       # TypeScript type checking

# Testing
npm run test             # Run tests
npm run test:watch       # Watch mode
npm run test:coverage    # Coverage report

# Utilities
npm run format           # Format with Prettier
```

### Code Quality Standards

- ✅ **TypeScript Strict Mode** - No `any` types
- ✅ **JSDoc Comments** - All exported functions documented
- ✅ **ESLint** - Zero errors policy
- ✅ **Prettier** - Consistent formatting
- ✅ **Vitest** - Unit tests for critical paths

### Adding New Features

1. Create feature branch: `git checkout -b feature/your-feature`
2. Add JSDoc comments to all exported functions
3. Follow Next.js App Router conventions
4. Add tests if applicable
5. Run `npm run lint` and `npm run type-check`
6. Submit PR with clear description

---

## 📊 Performance Metrics

| Metric | Value |
|--------|-------|
| **Bundle Size** | 93KB (gzipped) |
| **Lighthouse Performance** | 95+ |
| **First Contentful Paint** | <1s |
| **Time to Interactive** | <2s |
| **Credits Load Time** | <10ms (cached) |
| **API Calls Reduction** | 66% fewer |

---

## 🔒 Security

- ✅ **Supabase RLS** - Row-level security on all tables
- ✅ **Environment Variables** - Secrets never exposed to client
- ✅ **CORS Configuration** - Restricted API access
- ✅ **Content Security** - Security headers configured
- ✅ **Authentication** - Secure JWT-based auth with Supabase

---

## 🤝 Contributing

This is a private SaaS project. For collaboration:

1. Fork the repository
2. Create feature branch
3. Follow code quality standards
4. Add JSDoc comments
5. Submit PR for review

---

## 📄 License

**Proprietary** - All rights reserved

---

## 🆘 Support & Troubleshooting

### Common Issues

**"Failed to fetch credits"**
- Check `NEXT_PUBLIC_SUPABASE_URL` is correct
- Verify Supabase service is running
- Check network tab for detailed error

**"Build fails on Vercel"**
- Ensure all environment variables are set
- Check TypeScript errors: `npm run type-check`
- Review build logs for specific errors

**"Images not loading"**
- Verify Supabase Storage bucket permissions
- Check `next.config.mjs` image domains
- Ensure signed URLs are not expired

### Debug Mode

Enable detailed logging:
```bash
DEBUG=true npm run dev
```

---

## 🎯 Roadmap

- [ ] Stripe payment integration
- [ ] Multi-language support (i18n)
- [ ] Advanced analytics dashboard
- [ ] Bulk photo generation API
- [ ] Mobile app (React Native)

---

## 📞 Contact

For technical documentation or support:
- 📧 Email: support@photoglow.app
- 📚 Documentation: [docs/](docs/)

---

**Status:** ✅ Production Ready  
**Version:** 3.0.0  
**Last Updated:** November 25, 2024  
**Optimized for:** Claude Code & Anti-Gravity wrapper