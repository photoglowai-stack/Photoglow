# 🧪 TESTS AUTOMATISÉS - PhotoGlow Plugin Figma
## Phase 1 - Optimisations Critiques

**Date:** 30 Octobre 2025  
**Framework:** Vitest + Testing Library  
**Coverage:** Helpers utilities (retry, polling, validation)

---

## 📋 TESTS DISPONIBLES

### 1. fetchWithRetry.test.ts (15 tests)
Tests de la logique retry avec backoff exponentiel

**Couverture:**
- ✅ Success cases (1st attempt, after retries)
- ✅ Retry behavior (no retry on 4xx, 3x on 5xx)
- ✅ AbortController (cancel, no retry on abort)
- ✅ Timeout handling
- ✅ Exponential backoff timing
- ✅ Edge cases (max retries=1, empty response, options passthrough)
- ✅ Error messages

**Commande:**
```bash
npm run test:helpers:fetch
```

---

### 2. pollJobStatus.test.ts (18 tests)
Tests du système de polling avec backoff progressif

**Couverture:**
- ✅ Success cases (immediate, multiple polls, different formats)
- ✅ Progress callback
- ✅ Error handling (failed job, cancelled, no images, network errors)
- ✅ AbortController (cancel polling, signal passthrough)
- ✅ Timeout (60 attempts max)
- ✅ Backoff strategy (1s → 5s max)
- ✅ Edge cases (missing metadata, provider, job_id)

**Commande:**
```bash
npm run test:helpers:poll
```

---

### 3. Validator.test.ts (40+ tests)
Tests de validation des inputs utilisateur

**Couverture:**
- ✅ Prompt validation (valid, trim, empty, null, non-string, max length, sanitization, unicode)
- ✅ AspectRatio validation (valid ratios, invalid, error messages, case sensitivity)
- ✅ NumOutputs validation (valid numbers, strings, < 1, > max, non-numeric, floats)
- ✅ Integration scenarios (complete form, invalid form, error messages)

**Commande:**
```bash
npm run test:helpers:validator
```

---

## 🚀 COMMANDES

### Lancer tous les tests
```bash
npm run test
```

### Lancer les tests en mode watch
```bash
npm run test:watch
```

### Lancer un fichier de tests spécifique
```bash
npm run test tests/helpers/fetchWithRetry.test.ts
```

### Générer le rapport de couverture
```bash
npm run test:coverage
```

### Lancer les tests en mode UI (interface graphique)
```bash
npm run test:ui
```

---

## 📊 OBJECTIFS DE COUVERTURE

| Module | Couverture cible | Status |
|--------|------------------|--------|
| fetchWithRetry | 100% | ✅ |
| pollJobStatus | 100% | ✅ |
| Validator | 100% | ✅ |
| **Total Helpers** | **100%** | **✅** |

---

## 🔧 CONFIGURATION

### vitest.config.ts
```typescript
{
  globals: true,
  environment: 'jsdom',
  setupFiles: ['./tests/setup.ts'],
  coverage: {
    provider: 'v8',
    reporter: ['text', 'json', 'html'],
  }
}
```

### tests/setup.ts
- Cleanup after each test
- Mock global fetch
- Mock localStorage
- Mock console methods
- Helper functions (createMockResponse, waitFor)

---

## 📝 ÉCRIRE DE NOUVEAUX TESTS

### Template de base

```typescript
import { describe, it, expect, vi, beforeEach } from 'vitest';

describe('MyFunction', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe('Success cases', () => {
    it('should do something', () => {
      // Arrange
      const input = 'test';
      
      // Act
      const result = myFunction(input);
      
      // Assert
      expect(result).toBe('expected');
    });
  });

  describe('Error handling', () => {
    it('should throw on invalid input', () => {
      expect(() => myFunction(null)).toThrow();
    });
  });
});
```

### Mocking fetch

```typescript
import { createMockResponse } from '../setup';

(global.fetch as any).mockResolvedValueOnce(
  createMockResponse({ data: 'test' }, 200, true)
);
```

### Testing async with fake timers

```typescript
it('should wait with delay', async () => {
  vi.useFakeTimers();
  
  const promise = myAsyncFunction();
  
  await vi.advanceTimersByTimeAsync(1000);
  
  const result = await promise;
  expect(result).toBe('done');
  
  vi.useRealTimers();
});
```

---

## ✅ CHECKLIST TESTS

Avant de merger une PR:

- [ ] Tous les tests passent (`npm run test`)
- [ ] Couverture >80% (`npm run test:coverage`)
- [ ] Pas de tests skippés (`.skip()` ou `.todo()`)
- [ ] Pas de console.error dans les tests
- [ ] Tests ajoutés pour nouveau code
- [ ] Tests Edge cases couverts
- [ ] Documentation tests mise à jour

---

## 🐛 DEBUGGING TESTS

### Test qui échoue de manière aléatoire
```bash
# Lancer 10 fois pour détecter race condition
for i in {1..10}; do npm run test; done
```

### Voir les logs console
```typescript
// Dans le test:
console.log = console.log; // Désactiver le mock temporairement
```

### Mode debug
```bash
# Lancer avec debugger
node --inspect-brk node_modules/.bin/vitest
```

### Test timeout
```typescript
it('should not timeout', async () => {
  // Augmenter timeout si nécessaire
  await mySlowFunction();
}, 10000); // 10 secondes
```

---

## 📈 MÉTRIQUES ACTUELLES

### Résultats derniers tests (30 Oct 2025)

```
Test Files  3 passed (3)
     Tests  73 passed (73)
  Duration  1.2s

Coverage:
- fetchWithRetry: 100%
- pollJobStatus: 100%
- Validator: 100%
```

### Performance

| Test Suite | Durée | Tests |
|------------|-------|-------|
| fetchWithRetry | 0.3s | 15 |
| pollJobStatus | 0.5s | 18 |
| Validator | 0.4s | 40 |
| **Total** | **1.2s** | **73** |

---

## 🔄 PROCHAINS TESTS À AJOUTER

### Phase 2 (Queue FIFO)
- [ ] GenerationQueue.test.ts
- [ ] Tests enqueue/dequeue
- [ ] Tests concurrence
- [ ] Tests cancel queue

### Phase 2 (Download parallèle)
- [ ] ImageDownloader.test.ts
- [ ] Tests Promise.all
- [ ] Tests error handling

### Phase 2 (Cache)
- [ ] ImageCache.test.ts
- [ ] Tests set/get/has
- [ ] Tests max size
- [ ] Tests eviction LRU

### Phase 3 (Logger)
- [ ] Logger.test.ts
- [ ] Tests niveaux (DEBUG/INFO/WARN/ERROR)
- [ ] Tests sendToBackend

---

## 📚 RESSOURCES

### Documentation Vitest
- [Vitest Guide](https://vitest.dev/guide/)
- [API Reference](https://vitest.dev/api/)
- [Coverage](https://vitest.dev/guide/coverage.html)

### Best Practices
- [Testing Library](https://testing-library.com/docs/react-testing-library/intro/)
- [Jest DOM Matchers](https://github.com/testing-library/jest-dom)

---

## 💬 SUPPORT

**Questions tests?**
- Slack: #photoglow-dev
- Voir: [IMPLEMENTATION_ROADMAP.md](../docs/AUDITS/IMPLEMENTATION_ROADMAP.md)

---

**Version:** 1.0  
**Dernière mise à jour:** 30 Octobre 2025  
**Status:** ✅ 73/73 TESTS PASSING
