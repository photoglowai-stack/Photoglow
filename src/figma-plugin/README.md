# 🎨 PhotoGlow Figma Plugin V2

> **AI Preview System** - Generate photorealistic portraits with attributes

## ⚡ Version V2 (November 5, 2024)

**Complete refactor** - New architecture, improved performance, enhanced features

### 📚 Quick Links

| Doc | Description |
|-----|-------------|
| **[REFACTOR_V2_COMPLETE.md](REFACTOR_V2_COMPLETE.md)** | ⭐ Complete V2 overview |
| **[TEST_V2_QUICK.md](TEST_V2_QUICK.md)** | 🧪 Quick test guide |
| **[HOW_TO_DEBUG.md](HOW_TO_DEBUG.md)** | 🐛 Debug guide |
| **[API_V9_QUICK_REF.md](API_V9_QUICK_REF.md)** | 📖 API reference |

### ✨ What's New in V2

- ⚡ **Speed Mode** - Deterministic seed for instant cache hits
- 🎲 **Shuffle Mode** - Random seed for creative exploration
- ✨ **+Net Mode** - Increase resolution while keeping same face
- 🎯 **Smart Framing** - Auto-resolution based on framing (HS/CU/WU)
- 👗 **Neckline Control** - Women-specific neckline options
- 📐 **Body Attributes** - Bust size & butt size control
- 🧹 **Clean Architecture** - Modular code (config/utils/api)
- 🚀 **Performance** - 2-4s first hit, <500ms replays

## 🆘 Need Help?

**→ See [HOW_TO_DEBUG.md](HOW_TO_DEBUG.md)** (30 seconds)  
**→ Full guide: [TEST_V2_QUICK.md](TEST_V2_QUICK.md)** (5 minutes)

---

## 🚀 Installation Rapide

### 1. Validation Frontend (recommandé)

Avant d'importer, validez que tous les fichiers sont corrects :

```bash
cd figma-plugin
node validate-v6.js
```

Si tout est ✅, continuez. Sinon, corrigez les erreurs.

### 2. Test Backend (requis)

Testez que l'endpoint Supabase `/v1/preview` est opérationnel :

```bash
node test-backend.js https://YOUR_PROJECT.supabase.co
```

**Remplacez `YOUR_PROJECT` par votre ID de projet Supabase.**

Attendez les 5 tests : Health Check, Génération, Cache, Validation, Payload complet.

### 3. Préparer les fichiers

Le plugin V6.1 utilise :
- `manifest.json` - Configuration du plugin
- `main.js` - Thread principal
- `ui.html` - Interface utilisateur complète
- `config.js` - Configuration centralisée
- `previewEndpoint.js` - URL de l'API preview
- `previewApi.js` - Client API avec AbortController
- `buildPreviewPayload.js` - Builder de payload minimal
- `previewErrorMessages.js` - Messages d'erreur UX

### 4. Importer dans Figma

```
Figma Desktop → Plugins → Development → 
Import plugin from manifest → Sélectionner manifest.json
```

**Voir DEPLOYMENT.md pour le guide complet.**

---

## 🧪 Utilisation

1. **Lancer le plugin** dans Figma
2. **Entrer un prompt** (ex: "professional headshot, studio lighting")
3. **Mode Test** : Activé par défaut (pas de crédits Replicate consommés)
4. **Cliquer "Generate"**
5. L'image apparaît sur le canvas Figma

---

## ⚙️ Configuration

### Backend API
```
Base URL: https://image-generator-api-chi.vercel.app
Endpoint: POST /v1/jobs
```

### Authentification
Le plugin nécessite un token Supabase valide. Configurer dans le code :
```javascript
// code.js
const SUPABASE_URL = "https://xxx.supabase.co";
const SUPABASE_ANON_KEY = "eyJ...";
```

---

## 🔧 Fonctionnalités

✅ **Génération Text2Img** (Flux-Kontext-Pro)  
✅ **AI Preview V6** (Vercel endpoint avec attributs)  
✅ **Mode Test** (sans consommer de crédits)  
✅ **Idempotency** (évite les duplications)  
✅ **Import automatique** sur canvas Figma  
✅ **Auto-debounce** (500ms pour preview)  
✅ **Cache intelligent** (détection automatique)  

---

## 🎨 Preview V6 - Nouveauté

Le plugin inclut maintenant un système de **prévisualisation rapide** utilisant l'endpoint Vercel optimisé :

### Fonctionnement
1. Sélectionner **Gender** (obligatoire)
2. Ajouter au moins **2 attributs** (background, outfit, hairColor, etc.)
3. La preview se génère **automatiquement** après 500ms
4. Le **cache** détecte les requêtes identiques (badge ⚡ CACHE)

### Endpoint
```
POST https://image-generator-api-chi.vercel.app/v1/preview
```

### Payload Minimal
```json
{
  "fast": true,
  "aspect_ratio": "1:1",
  "gender": "woman",
  "background": "beach",
  "outfit": "summer dress"
}
```

**Important :** Pas de `prompt` côté client. Le serveur construit le prompt automatiquement.

### Tests
Voir `test-preview.md` pour les scénarios de test complets.

---

## 📖 Documentation Technique

Pour plus de détails techniques sur l'API backend et l'architecture :

→ **[Guide Développeur Principal](../DEV_GUIDE.md)**  
→ **[API Reference](../DEV_GUIDE.md#api-reference)**

---

## 🐛 Troubleshooting

**Erreur "missing_bearer_token"**  
→ Vérifier que le token Supabase est configuré dans `code.js`

**Erreur "insufficient_credits"**  
→ Activer le mode Test ou ajouter des crédits

**Image n'apparaît pas**  
→ Vérifier les logs de la console Figma (Plugins → Development → Open Console)

**❌ "Generation failed"** ⭐ NOUVEAU  
→ Ouvrir Dev Tools (Cmd+Option+I) et voir **[HOW_TO_DEBUG.md](HOW_TO_DEBUG.md)** (30s)  
→ Guide complet : **[DEBUG_ERRORS.md](DEBUG_ERRORS.md)** (5min)

---

**Documentation principale :** [DEV_GUIDE.md](../DEV_GUIDE.md)  
**Backend API :** https://image-generator-api-chi.vercel.app  
**Debug Guides (V6.1)** : [HOW_TO_DEBUG.md](HOW_TO_DEBUG.md) | [DEBUG_ERRORS.md](DEBUG_ERRORS.md)
