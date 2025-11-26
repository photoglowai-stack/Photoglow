# 🚀 Guide de Déploiement - Plugin Figma PhotoGlow V6.1

## Prérequis

- Figma Desktop App installée
- Accès au dossier `/figma-plugin` du projet
- URL de l'API Vercel : `https://image-generator-api-chi.vercel.app`

---

## Étape 1 : Vérifier les Fichiers

Assurez-vous que tous les fichiers sont présents :

```
figma-plugin/
├── manifest.json          ✅ Configuration du plugin
├── main.js                ✅ Thread principal
├── ui.html                ✅ Interface utilisateur
├── code.js                ✅ (legacy)
├── config.js              ✅ Configuration centralisée
├── previewEndpoint.js     ✅ URL de preview
├── previewApi.js          ✅ Client API preview
├── buildPreviewPayload.js ✅ Builder de payload
├── previewErrorMessages.js ✅ Messages d'erreur
├── logger.js              ✅ Système de logs
├── README.md              📖 Documentation
├── CHANGELOG.md           📋 Historique des versions
└── test-preview.md        🧪 Tests
```

---

## Étape 2 : Importer le Plugin dans Figma

### 2.1 Ouvrir Figma Desktop

```
Figma Desktop → Menu → Plugins → Development → 
Import plugin from manifest...
```

### 2.2 Sélectionner le Manifest

- Naviguer vers `/figma-plugin/`
- Sélectionner `manifest.json`
- Cliquer sur "Open"

### 2.3 Vérification

Le plugin devrait apparaître dans :
```
Plugins → Development → Photoglow V6.1 - AI Preview
```

---

## Étape 3 : Configuration Initiale

### 3.1 Lancer le Plugin

- Ouvrir un fichier Figma (ou créer un nouveau)
- Menu → Plugins → Development → Photoglow V6.1 - AI Preview

### 3.2 Configurer l'API

Dans l'interface du plugin :

1. **BASE_URL_API** (déjà pré-rempli)
   ```
   https://image-generator-api-chi.vercel.app
   ```

2. **JWT Utilisateur** (optionnel pour la preview)
   - Pour la preview V6, le JWT n'est PAS requis
   - Nécessaire uniquement pour les crédits et Gen-4

3. **Cliquer sur "Check"** pour vérifier l'API
   - Devrait afficher : `API Status: OK` en vert ✅

---

## Étape 4 : Tester la Preview V6

### Test Rapide

1. Dans la section **"AI Preview V6 (Vercel)"** :
   - **Gender** : Sélectionner "Woman"
   - **Background** : Taper "beach"
   - **Outfit** : Taper "summer dress"

2. Le bouton **"Prévisualiser"** devrait s'activer automatiquement

3. Attendre 500ms → La preview se génère automatiquement

4. Vérifier :
   - ✅ Image s'affiche
   - ✅ Badge affiche le provider (pollinations ou cache)
   - ✅ Temps de génération ≤ 2-4s

### Test du Cache

1. Relancer exactement la même preview (mêmes attributs)
2. Vérifier :
   - ✅ Réponse instantanée (< 1s)
   - ✅ Badge affiche `⚡ CACHE`

---

## Étape 5 : Mode Debug

Pour activer les logs détaillés :

### Dans la Console Figma

```
Plugins → Development → Open Console
```

### Activer le Debug

Dans la console, taper :
```javascript
localStorage.setItem('pg_debug', 'true')
```

Recharger le plugin. Les logs détaillés s'affichent maintenant :
```
[Preview V6] URL -> https://...
[Preview] Payload -> { ... }
[Preview] Status -> 200
[Preview] ✅ Success -> { ... }
```

### Désactiver le Debug

```javascript
localStorage.removeItem('pg_debug')
```

---

## Étape 6 : Tests Complets

Suivre les tests dans `test-preview.md` :

1. ✅ Health Check
2. ✅ Happy Path
3. ✅ Cache Test
4. ✅ Annulation
5. ✅ Attributs Minimaux
6. ✅ Gating UI
7. ✅ Debounce
8. ✅ Erreurs
9. ✅ Performance

---

## Troubleshooting

### Problème : Bouton "Prévisualiser" désactivé

**Cause :** Pas assez d'attributs  
**Solution :** Vérifier que :
- Gender est sélectionné ✅
- Au moins 2 autres attributs sont remplis ✅

### Problème : Erreur "Service indisponible"

**Cause :** API Vercel down ou URL incorrecte  
**Solution :**
1. Vérifier l'URL dans BASE_URL_API
2. Tester manuellement : `curl https://image-generator-api-chi.vercel.app/v1/preview?debug=1`
3. Vérifier les logs de la console Figma

### Problème : Image ne s'affiche pas

**Cause :** CORS ou domaine non autorisé  
**Solution :**
1. Vérifier `manifest.json` → `networkAccess` → `allowedDomains`
2. S'assurer que `https://image-generator-api-chi.vercel.app` et `https://pollinations.ai` sont présents

### Problème : Logs excessifs dans la console

**Cause :** Mode debug activé  
**Solution :**
```javascript
localStorage.removeItem('pg_debug')
```

---

## Mise à Jour du Plugin

Pour déployer une nouvelle version :

1. **Modifier les fichiers** dans `/figma-plugin/`
2. **Incrémenter la version** dans `manifest.json` (optionnel)
3. **Recharger le plugin** dans Figma :
   ```
   Plugins → Development → [Plugin] → Right-click → Reload
   ```

Pas besoin de réimporter le manifest !

---

## URLs de Référence

- **API Base** : https://image-generator-api-chi.vercel.app
- **Preview V6** : https://image-generator-api-chi.vercel.app/v1/preview
- **Health Check** : https://image-generator-api-chi.vercel.app/v1/preview?debug=1
- **Docs API** : Voir `DEV_GUIDE.md` dans le repo principal

---

## Support

En cas de problème :
1. Vérifier `CHANGELOG.md` pour les changements récents
2. Consulter `test-preview.md` pour les scénarios de test
3. Activer le mode debug et copier les logs
4. Ouvrir une issue avec les logs complets

---

**Version :** 6.1.0  
**Date :** 2025-10-31  
**Auteur :** PhotoGlow Team
