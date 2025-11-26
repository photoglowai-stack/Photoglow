# 🚀 GUIDE TEST RAPIDE - Plugin Figma V2

**Durée estimée:** 5 minutes  
**Prérequis:** Figma Desktop installé

---

## 📥 ÉTAPE 1 : IMPORT (30 secondes)

### Dans Figma Desktop :
1. **Menu → Plugins → Development → Import plugin from manifest**
2. Naviguer vers le dossier `/figma-plugin/`
3. Sélectionner `manifest.json`
4. ✅ Plugin importé

---

## 🎮 ÉTAPE 2 : LANCER (10 secondes)

1. **Menu → Plugins → Development → PhotoGlow V2 - AI Preview**
2. ✅ Panneau s'ouvre (360x640)
3. ✅ 4 boutons visibles : Speed, Shuffle, +Net, Apply

---

## ⚡ ÉTAPE 3 : TEST SPEED (1 minute)

### Objectif : Seed stable = même visage

1. **Sélectionner attributs :**
   - Gender: Woman
   - Hair: Long, Brown
   - Eyes: Blue
   - Skin: Medium

2. **Cliquer ⚡ Speed**
   - ⏱️ Attendre 3-5 secondes
   - ✅ Photo apparaît

3. **Cliquer ⚡ Speed ENCORE**
   - ✅ **MÊME VISAGE** (seed identique)
   - ✅ Seed affiché : ex "Seed: 3141592653 | 384px | HS"

### ✅ RÉSULTAT ATTENDU
- Même attributs → Même seed → Même visage
- Pas de variation (sauf background peut changer légèrement)

---

## 🎲 ÉTAPE 4 : TEST SHUFFLE (1 minute)

### Objectif : Seed aléatoire = visage différent

1. **Cliquer 🎲 Shuffle**
   - ⏱️ Attendre 3-5 secondes
   - ✅ Photo différente

2. **Cliquer 🎲 Shuffle ENCORE**
   - ✅ **NOUVEAU VISAGE** (seed différent)
   - ✅ Seed change à chaque fois

### ✅ RÉSULTAT ATTENDU
- Chaque Shuffle → Nouveau seed → Nouveau visage
- Attributs physiques respectés (hair color, eyes, etc.)

---

## ✨ ÉTAPE 5 : TEST +NET (1 minute)

### Objectif : Augmenter résolution, garder le visage

1. **Générer avec Speed (384px)**
   - ✅ Preview HS (Head & Shoulders)
   - ✅ "384px | HS" affiché

2. **Cliquer ✨ +Net**
   - ⏱️ Attendre 3-5 secondes
   - ✅ Preview CU (Chest-Up) 448px
   - ✅ **MÊME VISAGE** (seed identique)

3. **Cliquer ✨ +Net ENCORE**
   - ⏱️ Attendre 3-5 secondes
   - ✅ Preview WU (Waist-Up) 512px
   - ✅ **MÊME VISAGE** (seed identique)

4. **Cliquer ✨ +Net une 3ème fois**
   - ℹ️ Message: "Already at max resolution"

### ✅ RÉSULTAT ATTENDU
- 384→448→512 pixels
- Seed CONSTANT
- Visage identique, juste plus net et cadrage plus large

---

## 🖼️ ÉTAPE 6 : TEST APPLY (1 minute)

### Objectif : Appliquer l'image à un layer Figma

1. **Dans Figma, créer un rectangle**
   - Taille : 400x400px

2. **Sélectionner le rectangle**

3. **Générer une preview avec Speed**

4. **Cliquer "Apply to Selection"**
   - ✅ Notification: "✅ Image applied (seed: ...)"
   - ✅ Rectangle rempli avec l'image

### ✅ RÉSULTAT ATTENDU
- Image visible dans le rectangle
- Remplissage type "FILL"
- Seed conservé dans metadata

---

## 🐛 ÉTAPE 7 : TEST ERROR HANDLING (30 secondes)

### Test 1: Pas de sélection
1. **Déselectionner tout dans Figma**
2. **Cliquer "Apply to Selection"**
3. ✅ Notification: "⚠️ Please select a layer first"

### Test 2: Layer incompatible
1. **Créer un text layer**
2. **Sélectionner le text**
3. **Générer preview**
4. **Cliquer "Apply to Selection"**
5. ✅ Notification: "⚠️ Selected layer doesn't support images"

---

## 📊 VÉRIFICATIONS CONSOLE

### Ouvrir DevTools Figma
- **Mac:** `Cmd + Option + I`
- **Windows:** `Ctrl + Shift + I`

### Logs attendus (Speed)
```
[PG] x-provider-url: https://image.pollinations.ai/prompt/...
Seed: 3141592653 | 384px | HS
```

### Logs attendus (Shuffle)
```
[PG] x-provider-url: https://image.pollinations.ai/prompt/...
Seed: 2718281828 | 384px | HS
```

### Logs si erreur
```
Preview failed [502] 
(retry automatique...)
```

---

## ✅ CHECKLIST VALIDATION

### Fonctionnalités Core
- [ ] Speed mode génère preview
- [ ] Même attributs = même visage (seed stable)
- [ ] Shuffle génère visages différents
- [ ] +Net augmente résolution (384→448→512)
- [ ] +Net garde le même visage
- [ ] Apply to Selection fonctionne
- [ ] Error handling (pas de sélection, layer incompatible)

### Attributs Physiques Respectés
- [ ] Gender (Woman/Man)
- [ ] Hair length (Bald/Short/Medium/Long)
- [ ] Hair color (Brown/Blonde/Black/Red/Gray)
- [ ] Eye color (Blue/Brown/Green/Hazel/Gray)
- [ ] Skin tone (Light/Fair/Medium/Tan/Deep)
- [ ] Body type (Slim/Average/Athletic/Curvy)

### UX
- [ ] Loading states pendant génération
- [ ] Seed affiché après génération
- [ ] Boutons disabled pendant loading
- [ ] Messages d'erreur clairs
- [ ] Debounce fonctionne (pas de double-click)

### Performance
- [ ] Preview en <5 secondes
- [ ] Pas de memory leaks (check Task Manager)
- [ ] Retry 502 fonctionne
- [ ] Cleanup blob URL OK

---

## 🚨 PROBLÈMES POTENTIELS

### Si preview ne charge pas :
1. ✅ Vérifier console pour erreurs
2. ✅ Vérifier Network tab (requête vers API)
3. ✅ Vérifier payload JSON envoyé
4. ✅ Tester avec attributs par défaut

### Si même seed donne visages différents :
1. ❌ Bug dans stableKey()
2. ✅ Vérifier que TOUS les attributs sont inclus
3. ✅ Vérifier ordre des clés JSON

### Si +Net change le visage :
1. ❌ Bug dans seed management
2. ✅ Vérifier que mode = 'speed' (pas 'shuffle')
3. ✅ Vérifier que seed est passé dans payload

### Si erreur 502 sans retry :
1. ❌ Bug dans doFetch()
2. ✅ Vérifier logique retry (attempt < 2)
3. ✅ Vérifier délais (250ms, 600ms)

---

## 📈 MÉTRIQUES DE SUCCÈS

### Performance
- ⏱️ Génération Speed : <5s
- ⏱️ Génération Shuffle : <5s
- ⏱️ +Net : <5s
- 💾 Memory : Pas de croissance continue

### Fiabilité
- ✅ Seed stable : 100% reproductible
- ✅ Retry 502 : Fonctionne 95%+ du temps
- ✅ Apply : Fonctionne 100% sur layers compatibles

### Qualité
- 📸 Photos : Pas de cartoon/illustration
- 👤 Visages : Respectent attributs (hair, eyes, skin)
- 🎨 Backgrounds : Variés et réalistes
- 🖼️ Cadrage : HS/CU/WU correct

---

## 🎯 VALIDATION FINALE

### Si TOUS les tests passent :
✅ **PLUGIN V2 VALIDÉ**
- Déploiement possible
- Documentation complète
- Prêt pour utilisateurs beta

### Si bugs trouvés :
1. Noter le scénario exact
2. Copier logs console
3. Copier payload JSON
4. Reporter dans issue

---

**Créé le:** 6 Novembre 2024  
**Version:** V2 Preview System  
**Durée totale test:** ~5 minutes
