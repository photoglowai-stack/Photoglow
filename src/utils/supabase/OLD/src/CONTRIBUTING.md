# 🤝 Contributing to PhotoGlow

Thank you for your interest in contributing to PhotoGlow! This document provides guidelines and instructions for contributing to the project.

---

## 📋 Table of Contents

- [Code of Conduct](#code-of-conduct)
- [Getting Started](#getting-started)
- [Development Workflow](#development-workflow)
- [Code Standards](#code-standards)
- [Commit Guidelines](#commit-guidelines)
- [Pull Request Process](#pull-request-process)
- [Testing](#testing)
- [Documentation](#documentation)

---

## 🤝 Code of Conduct

This project adheres to a code of professional conduct. By participating, you agree to:

- Be respectful and inclusive
- Provide constructive feedback
- Focus on what's best for the community
- Show empathy towards others

---

## 🚀 Getting Started

### Prerequisites

- **Node.js** >= 18.0.0
- **npm** >= 9.0.0
- **Git**
- **Supabase Account** (for database access)

### Setup

1. **Fork the repository** on GitHub

2. **Clone your fork**
   ```bash
   git clone https://github.com/YOUR_USERNAME/photoglow.git
   cd photoglow
   ```

3. **Add upstream remote**
   ```bash
   git remote add upstream https://github.com/ORIGINAL_OWNER/photoglow.git
   ```

4. **Install dependencies**
   ```bash
   npm install
   ```

5. **Setup environment**
   ```bash
   cp .env.example .env
   # Edit .env with your Supabase credentials
   ```

6. **Start development server**
   ```bash
   npm run dev
   ```

---

## 💻 Development Workflow

### Branch Strategy

- `main` - Production-ready code
- `develop` - Development branch (if applicable)
- `feature/*` - New features
- `fix/*` - Bug fixes
- `docs/*` - Documentation updates
- `refactor/*` - Code refactoring

### Creating a Branch

```bash
# Update your fork
git checkout main
git pull upstream main

# Create feature branch
git checkout -b feature/your-feature-name
```

### Making Changes

1. **Make your changes** following code standards
2. **Test your changes** thoroughly
3. **Document your changes** with JSDoc comments
4. **Update relevant documentation** if needed

---

## 📏 Code Standards

### TypeScript

✅ **DO:**
```typescript
/**
 * Fetches user credits with intelligent caching
 * 
 * @param userId - Unique user identifier
 * @returns Promise resolving to credits data
 */
export async function getCredits(userId: string): Promise<CreditsResponse> {
  // Implementation
}
```

❌ **DON'T:**
```typescript
// No type annotation, no JSDoc
export async function getCredits(userId: any) {
  // Implementation
}
```

### Naming Conventions

- **Files**: `PascalCase.tsx` for components, `kebab-case.ts` for utilities
- **Components**: `PascalCase` (e.g., `AIPhotoGenerator`)
- **Functions**: `camelCase` (e.g., `getCredits`)
- **Constants**: `UPPER_SNAKE_CASE` (e.g., `API_BASE_URL`)
- **Types/Interfaces**: `PascalCase` (e.g., `CreditsResponse`)

### React Components

**Server Components (default):**
```tsx
// app/page.tsx
export default async function HomePage() {
  const data = await fetchData(); // Can use async/await
  return <div>{data}</div>;
}
```

**Client Components (when needed):**
```tsx
// components/Counter.tsx
'use client'; // Only when using hooks

import { useState } from 'react';

export function Counter() {
  const [count, setCount] = useState(0);
  return <button onClick={() => setCount(count + 1)}>{count}</button>;
}
```

### TypeScript Strict Mode

- ✅ **Always** provide explicit types
- ✅ **Always** handle null/undefined cases
- ❌ **Never** use `any` (use `unknown` instead)
- ✅ **Always** add JSDoc to exported functions

### Styling

- Use **Tailwind CSS v4** utility classes
- Avoid inline styles (except CSS variables)
- Use tokens from `styles/globals.css`
- Mobile-first responsive design

---

## 📝 Commit Guidelines

### Commit Message Format

```
<type>(<scope>): <subject>

<body>

<footer>
```

### Types

- `feat`: New feature
- `fix`: Bug fix
- `docs`: Documentation changes
- `style`: Code style changes (formatting, no code change)
- `refactor`: Code refactoring
- `perf`: Performance improvements
- `test`: Adding or updating tests
- `chore`: Maintenance tasks

### Examples

```bash
feat(credits): add intelligent caching with 30s TTL

- Implement localStorage caching
- Auto-invalidate on credit transactions
- 98% performance improvement

Closes #123
```

```bash
fix(generator): resolve image upload timeout issue

Fixed timeout by increasing upload limit to 120s
and adding exponential backoff retry logic.

Fixes #456
```

```bash
docs(api): update API documentation with new endpoints

Added documentation for:
- /api/credits endpoint
- /api/credits/debit endpoint
- Error handling examples
```

---

## 🔄 Pull Request Process

### Before Submitting

Run these checks locally:

```bash
# Type checking
npm run type-check

# Linting
npm run lint

# Tests
npm run test

# Build
npm run build
```

### Creating a Pull Request

1. **Push your changes**
   ```bash
   git push origin feature/your-feature-name
   ```

2. **Create PR on GitHub**
   - Go to your fork on GitHub
   - Click "Compare & pull request"
   - Fill in the PR template

3. **PR Title Format**
   ```
   [Type] Brief description of changes
   ```
   Example: `[Feature] Add intelligent credits caching system`

4. **PR Description Template**
   ```markdown
   ## 📝 Description
   Brief description of what this PR does.

   ## 🎯 Type of Change
   - [ ] Bug fix
   - [ ] New feature
   - [ ] Breaking change
   - [ ] Documentation update

   ## ✅ Checklist
   - [ ] Code follows style guidelines
   - [ ] Added JSDoc comments
   - [ ] Self-reviewed code
   - [ ] Updated documentation
   - [ ] Added tests (if applicable)
   - [ ] All tests passing
   - [ ] No TypeScript errors
   - [ ] No ESLint errors

   ## 🔗 Related Issues
   Closes #123

   ## 📸 Screenshots (if applicable)
   Add screenshots here

   ## 🧪 Testing
   How to test these changes
   ```

### Review Process

- At least one approval required
- All CI checks must pass
- No merge conflicts
- Code review feedback addressed

---

## 🧪 Testing

### Running Tests

```bash
# Run all tests
npm run test

# Watch mode
npm run test:watch

# Coverage report
npm run test:coverage
```

### Writing Tests

```typescript
import { describe, it, expect } from 'vitest';
import { getCredits } from '@/utils/credits-client';

describe('Credits Client', () => {
  it('should fetch user credits successfully', async () => {
    const result = await getCredits('test-user-id');
    
    expect(result.success).toBe(true);
    expect(result.credits).toBeGreaterThanOrEqual(0);
  });

  it('should handle errors gracefully', async () => {
    const result = await getCredits('invalid-id');
    
    expect(result.success).toBe(false);
    expect(result.error).toBeDefined();
  });
});
```

### Manual Testing

Before submitting PR, manually test:

1. ✅ Feature works as expected
2. ✅ No console errors (F12)
3. ✅ Responsive on mobile
4. ✅ Loading states work
5. ✅ Error handling works
6. ✅ Authentication works (if applicable)

---

## 📚 Documentation

### What to Document

- **New features** - Add to README.md
- **API changes** - Update docs/API.md
- **Breaking changes** - Document in CHANGELOG.md
- **Complex logic** - Add code comments

### JSDoc Comments

Required on all exported functions:

```typescript
/**
 * Brief description of what the function does.
 * 
 * More detailed explanation if needed.
 * 
 * @param paramName - Description of parameter
 * @param optionalParam - Optional parameter (optional)
 * @returns Description of return value
 * 
 * @throws {ErrorType} Description of when error is thrown
 * 
 * @example
 * const result = await myFunction('example');
 * console.log(result); // { success: true, data: ... }
 */
export async function myFunction(
  paramName: string,
  optionalParam?: number
): Promise<Result> {
  // Implementation
}
```

---

## 🚨 Important Rules

### Protected Files - NEVER MODIFY

These files are system-managed:
- `/supabase/functions/server/kv_store.tsx`
- `/utils/supabase/info.tsx`
- `/components/figma/ImageWithFallback.tsx`

### Security

- ❌ **NEVER** commit `.env` files
- ❌ **NEVER** expose `SUPABASE_SERVICE_ROLE_KEY` to frontend
- ✅ **ALWAYS** use environment variables for secrets
- ✅ **ALWAYS** validate user inputs

### Performance

- ✅ Use React Server Components when possible
- ✅ Lazy load heavy components
- ✅ Implement caching for repeated API calls
- ✅ Optimize images (Next.js Image component)
- ✅ Add loading states for async operations

---

## 🆘 Getting Help

### Documentation

- **README.md** - Project overview
- **docs/CLAUDE_CODE_GUIDE.md** - Development guide
- **docs/API.md** - API reference
- **docs/DEPLOYMENT.md** - Deployment guide

### Contact

- **Email**: support@photoglow.app
- **GitHub Issues**: For bug reports and feature requests

---

## 📄 License

By contributing to PhotoGlow, you agree that your contributions will be licensed under the project's license.

---

## 🙏 Thank You!

Your contributions make PhotoGlow better for everyone. We appreciate your time and effort!

**Happy Coding!** 🚀
