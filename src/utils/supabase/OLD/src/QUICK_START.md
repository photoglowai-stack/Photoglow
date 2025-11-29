# ⚡ PhotoGlow - Quick Start Guide

Get PhotoGlow running in **5 minutes** with automated setup.

---

## 🚀 Fastest Setup (Automated)

### Prerequisites
- Node.js >= 18.0.0
- npm >= 9.0.0
- Supabase account (free tier OK)

### One-Command Setup

```bash
# Clone and setup
git clone https://github.com/your-repo/photoglow.git
cd photoglow
chmod +x scripts/quick-setup.sh
./scripts/quick-setup.sh
```

The script will:
1. ✅ Check Node.js and npm versions
2. ✅ Create `.env` from template
3. ✅ Install dependencies
4. ✅ Run type checking
5. ✅ Run linting
6. ✅ Build the project
7. ✅ Start dev server (optional)

**That's it!** 🎉

---

## 🛠️ Manual Setup (5 steps)

### 1. Clone Repository
```bash
git clone https://github.com/your-repo/photoglow.git
cd photoglow
```

### 2. Install Dependencies
```bash
npm install
```

### 3. Environment Setup
```bash
# Copy template
cp .env.example .env

# Edit with your Supabase credentials
nano .env  # or use your editor
```

**Required Variables**:
```bash
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
SUPABASE_SERVICE_ROLE_KEY=your-service-role-key
SUPABASE_DB_URL=your-database-url
NEXT_PUBLIC_API_URL=https://image-generator-api-chi.vercel.app
```

Get these from [Supabase Dashboard](https://app.supabase.com) → Settings → API

### 4. Run Development Server
```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000)

### 5. Verify Setup
```bash
chmod +x scripts/health-check.sh
./scripts/health-check.sh
```

Should show all checks passing ✅

---

## 🔍 Health Check

Verify your installation anytime:

```bash
./scripts/health-check.sh
```

This checks:
- Node.js & npm versions
- Environment variables
- Dependencies installed
- TypeScript configuration
- Build configuration
- Project structure
- Security audit

---

## 🎨 Available Scripts

```bash
# Development
npm run dev              # Start dev server (port 3000)
npm run build            # Build for production
npm run start            # Start production server

# Quality Checks
npm run lint             # Run ESLint
npm run type-check       # TypeScript checking
npm run test             # Run tests
npm run test:coverage    # Coverage report

# Utilities
npm run format           # Format with Prettier
```

---

## 🔑 Getting Supabase Credentials

1. **Go to** [supabase.com](https://supabase.com)
2. **Create project** (or select existing)
3. **Navigate to** Settings → API
4. **Copy**:
   - Project URL → `NEXT_PUBLIC_SUPABASE_URL`
   - `anon` `public` key → `NEXT_PUBLIC_SUPABASE_ANON_KEY`
   - `service_role` key → `SUPABASE_SERVICE_ROLE_KEY`
5. **Navigate to** Settings → Database
6. **Copy** Connection string → `SUPABASE_DB_URL`

---

## 📖 Next Steps

After setup, explore:

1. **[README.md](README.md)** - Full documentation
2. **[docs/CLAUDE_CODE_GUIDE.md](docs/CLAUDE_CODE_GUIDE.md)** - Developer guide
3. **[docs/API.md](docs/API.md)** - API reference
4. **[CONTRIBUTING.md](CONTRIBUTING.md)** - Contribution guidelines

---

## 🐛 Common Issues

### "Module not found"
```bash
rm -rf node_modules package-lock.json
npm install
```

### "Failed to fetch credits"
- Check `NEXT_PUBLIC_SUPABASE_URL` in `.env`
- Verify `NEXT_PUBLIC_SUPABASE_ANON_KEY` is correct
- Ensure Supabase project is running

### "Build fails"
```bash
npm run type-check  # See TypeScript errors
npm run lint        # See ESLint errors
```

### "Port 3000 already in use"
```bash
# Use different port
PORT=3001 npm run dev
```

---

## 🚀 Deploy to Vercel

### One-Click Deploy

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/your-repo/photoglow)

### Manual Deploy

```bash
npm install -g vercel
vercel login
vercel --prod
```

**Important**: Add environment variables in Vercel Dashboard → Settings → Environment Variables

See [docs/DEPLOYMENT.md](docs/DEPLOYMENT.md) for complete guide.

---

## 📊 Features to Explore

### Admin Dashboard
- Press **A** key or go to `/#admin`
- Test AI generation
- Browse gallery
- Monitor system health

### User Features
- **Create** (`/create`) - AI Photo Generator
- **Gallery** (`/gallery`) - Photo gallery
- **Profile** - Credits & settings

### 7 AI Styles Available
1. Professional
2. Fashion
3. Dating
4. Outdoor
5. Casual
6. Business
7. Creative

---

## 🆘 Need Help?

| Issue | Resource |
|-------|----------|
| Setup problems | [docs/DEPLOYMENT.md](docs/DEPLOYMENT.md) |
| API errors | [docs/API.md](docs/API.md) |
| Development | [docs/CLAUDE_CODE_GUIDE.md](docs/CLAUDE_CODE_GUIDE.md) |
| Contributing | [CONTRIBUTING.md](CONTRIBUTING.md) |
| Security | [SECURITY.md](SECURITY.md) |

---

## ✅ Quick Checklist

Before considering setup complete:

- [ ] Node.js >= 18.0.0 installed
- [ ] Dependencies installed (`node_modules/` exists)
- [ ] `.env` file created with valid Supabase credentials
- [ ] Dev server starts without errors
- [ ] Health check passes all tests
- [ ] Can access http://localhost:3000
- [ ] Can see homepage without errors

---

**Setup Time**: ~5 minutes with automated script  
**Manual Setup Time**: ~10 minutes  

**Ready to build?** Start with [docs/CLAUDE_CODE_GUIDE.md](docs/CLAUDE_CODE_GUIDE.md)

---

**Status**: ✅ Production Ready  
**Version**: 3.0.0  
**Last Updated**: November 25, 2024
