# 🔍 Audit Pré-Déploiement Vercel - PhotoGlow

## ✅ Points Validés

### 1. Structure du Projet
- ✅ Monorepo unifié (frontend + backend)
- ✅ `api/` présent (13 fichiers serverless)
- ✅ `lib/` présent (3 fichiers utilitaires backend)
- ✅ `src/` présent (frontend Vite/React)
- ✅ `middleware.js` présent (CORS Edge)

### 2. Configuration Vercel
- ✅ `vercel.json` créé avec syntaxe moderne (`rewrites` au lieu de `routes`)
- ✅ Framework détecté : Vite
- ✅ Build command : `vite build`
- ✅ Output directory : `build`
- ✅ Functions configurées (1024MB, 60s timeout)

### 3. Dépendances
- ✅ `replicate@^0.31.1` installé (backend AI)
- ✅ `@supabase/supabase-js@^2.47.10` installé
- ✅ React 18.3.1
- ✅ Vite 6.3.5

### 4. Fichiers Essentiels
- ✅ `.gitignore` configuré (node_modules ignoré)
- ✅ `.env.example` créé
- ✅ `package.json` valide

### 5. Imports Corrigés
- ✅ `src/App.tsx` mis à jour avec nouveaux chemins
- ✅ Pas d'imports cassés détectés vers Header/Footer

---

## ⚠️ Problèmes Potentiels Identifiés

### 1. **CRITIQUE** : Variables d'environnement manquantes

**Impact** : Le build peut réussir mais l'app ne fonctionnera pas en production.

**Variables requises sur Vercel Dashboard** :

```env
# Frontend (préfixe VITE_)
VITE_SUPABASE_URL=https://xxxxx.supabase.co
VITE_SUPABASE_ANON_KEY=eyJhbGc...

# Backend (pas de préfixe)
SUPABASE_SERVICE_KEY=eyJhbGc...
REPLICATE_API_KEY=r8_...
NODE_ENV=production
```

**Action** : Configurer dans Vercel → Settings → Environment Variables

---

### 2. **MOYEN** : Dépendances avec `*` (wildcard)

**Problème** : 
```json
"@radix-ui/react-accordion": "*",
"@radix-ui/react-alert-dialog": "*",
...
```

Les versions `*` peuvent causer des problèmes de compatibilité.

**Impact** : Build peut échouer si versions incompatibles.

**Solution** : Laisser tel quel pour l'instant (npm install a réussi), mais à surveiller.

---

### 3. **FAIBLE** : Vulnérabilités npm

```
5 vulnerabilities (3 moderate, 2 high)
```

**Impact** : Sécurité, mais ne bloque pas le déploiement.

**Action recommandée** :
```bash
npm audit fix
```

---

### 4. **FAIBLE** : Dépendances inutiles

**Problèmes détectés** :
- `next` : Présent mais projet utilise Vite (pas Next.js)
- `fs`, `path`, `url` : Modules Node.js natifs, pas besoin de les installer
- `@vercel/node` : Pas nécessaire pour Vite

**Impact** : Aucun (juste du poids inutile)

**Action** : Optionnel, peut nettoyer plus tard

---

### 5. **MOYEN** : Nom du projet

```json
"name": "Dating App Photo Creator (Copy)"
```

**Problème** : Nom avec espaces et "(Copy)"

**Impact** : Peut causer des problèmes dans certains outils

**Solution** : Renommer en `photoglow` ou `photoglow-app`

---

### 6. **CRITIQUE** : Vérifier les exports des composants déplacés

**Risque** : Certains composants peuvent exporter différemment après déplacement.

**Fichiers à vérifier** :
- `src/components/shared/Header/Header.tsx` → Export nommé ou default ?
- `src/components/landing/Hero.tsx` → Export nommé `HeroSection` ?
- `src/components/auth/Modal.tsx` → Export nommé `AuthModal` ?

**Action** : Vérifier les exports

---

### 7. **FAIBLE** : Build output directory

`vercel.json` spécifie `"outputDirectory": "build"` mais Vite par défaut utilise `dist`.

**Vérification** : Regarder `vite.config.ts`

---

## 🔧 Actions Immédiates Recommandées

### Priorité 1 (CRITIQUE - À faire MAINTENANT)

1. **Vérifier les exports des composants**
   ```bash
   # Vérifier que les exports correspondent aux imports
   grep -r "export.*Header" src/components/shared/Header/
   grep -r "export.*HeroSection" src/components/landing/
   ```

2. **Configurer les variables d'environnement sur Vercel**
   - Aller sur Vercel Dashboard
   - Settings → Environment Variables
   - Ajouter toutes les variables listées ci-dessus

### Priorité 2 (MOYEN - Avant déploiement)

3. **Corriger le nom du package**
   ```json
   "name": "photoglow"
   ```

4. **Vérifier vite.config.ts output**
   ```typescript
   build: {
     outDir: 'build' // Doit correspondre à vercel.json
   }
   ```

### Priorité 3 (FAIBLE - Après déploiement)

5. **Nettoyer les dépendances inutiles**
6. **Corriger les vulnérabilités npm**

---

## 📊 Checklist Pré-Déploiement

### Configuration
- [x] `vercel.json` créé
- [x] `.gitignore` configuré
- [x] `.env.example` créé
- [ ] Variables d'env configurées sur Vercel
- [ ] Nom du package corrigé

### Code
- [x] Imports corrigés dans App.tsx
- [ ] Exports vérifiés dans composants déplacés
- [ ] Build output directory vérifié

### Tests
- [ ] `npm run build` réussi localement
- [ ] Pas d'erreurs TypeScript bloquantes
- [ ] Tous les composants se chargent

### Déploiement
- [ ] Push vers GitHub réussi
- [ ] Build Vercel réussi
- [ ] Variables d'env configurées
- [ ] Site accessible
- [ ] API fonctionne

---

## 🚀 Plan de Déploiement

### Étape 1 : Vérifications Locales (5 min)

```bash
# Vérifier les exports
grep -r "export" src/components/shared/Header/Header.tsx
grep -r "export" src/components/landing/Hero.tsx
grep -r "export" src/components/auth/Modal.tsx

# Vérifier vite.config.ts
cat vite.config.ts | grep outDir
```

### Étape 2 : Corrections si nécessaire (5 min)

Si exports incorrects, corriger les fichiers.

### Étape 3 : Build local (2 min)

```bash
npm run build
```

Si succès → Étape 4
Si échec → Corriger erreurs

### Étape 4 : Push vers GitHub (1 min)

```bash
git add .
git commit -m "fix: pre-deployment corrections"
git push
```

### Étape 5 : Configurer Vercel (3 min)

1. Aller sur Vercel Dashboard
2. Configurer variables d'environnement
3. Redéployer si nécessaire

### Étape 6 : Validation (5 min)

1. Vérifier que le site charge
2. Tester navigation
3. Tester génération d'images
4. Vérifier API backend

---

## 🎯 Estimation

**Temps total avant déploiement réussi** : 15-20 minutes

**Probabilité de succès** :
- Avec corrections : 95%
- Sans corrections: 60%

**Risques principaux** :
1. Exports de composants incorrects (40%)
2. Variables d'env manquantes (30%)
3. Build output directory incorrect (20%)
4. Autres (10%)

---

## 📞 Prochaines Étapes

**Voulez-vous que je** :

**Option A** : Vérifier les exports des composants maintenant ?

**Option B** : Corriger le nom du package et vite.config ?

**Option C** : Lancer un build local pour tester ?

**Option D** : Tout vérifier automatiquement (A + B + C) ?
