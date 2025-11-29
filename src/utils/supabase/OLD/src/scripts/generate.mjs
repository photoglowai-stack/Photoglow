#!/usr/bin/env node

/**
 * Script de génération massive d'images pour toutes les catégories
 * 
 * Usage:
 *   node scripts/generate.mjs
 * 
 * Options:
 *   node scripts/generate.mjs --dry-run          # Simule sans générer
 *   node scripts/generate.mjs --category=X       # Génère une catégorie spécifique
 *   node scripts/generate.mjs --limit=10         # Limite le nombre d'images par catégorie
 * 
 * Features:
 *   - Génère 15 images par catégorie (ou toutes si moins)
 *   - Appelle l'endpoint /api/v1/ideas/generate
 *   - Gère les retries automatiques (3 tentatives)
 *   - Affiche la progression en temps réel
 *   - Délai de 500ms entre chaque génération (anti-rate-limit)
 *   - Idempotency (pas de doublons)
 *   - Logs détaillés avec timestamps
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import crypto from 'crypto';

// ============================================================================
// CONFIGURATION
// ============================================================================

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// URL de l'API (change si besoin)
const API_BASE_URL = process.env.API_URL || 'http://localhost:3000';
const ENDPOINT = `${API_BASE_URL}/api/v1/ideas/generate`;

// Paramètres
const IMAGES_PER_CATEGORY = parseInt(process.env.IMAGES_PER_CATEGORY || '15', 10);
const DELAY_BETWEEN_REQUESTS = 500; // ms
const MAX_RETRIES = 3;
const REQUEST_TIMEOUT = 90000; // 90 seconds

// Arguments CLI
const args = process.argv.slice(2);
const isDryRun = args.includes('--dry-run');
const targetCategory = args.find(arg => arg.startsWith('--category='))?.split('=')[1];
const limitOverride = args.find(arg => arg.startsWith('--limit='))?.split('=')[1];
const LIMIT = limitOverride ? parseInt(limitOverride, 10) : IMAGES_PER_CATEGORY;

// ============================================================================
// DONNÉES DES IDÉES
// ============================================================================

// Import des idées depuis le fichier d'export
import { photoIdeas as allIdeas } from './ideas-data-export.mjs';

console.log(`\n📊 Chargé ${allIdeas.length} idées depuis ideas-data-export.mjs\n`);

// Groupe par catégorie
const ideasByCategory = allIdeas.reduce((acc, idea) => {
  if (!acc[idea.category]) {
    acc[idea.category] = [];
  }
  acc[idea.category].push(idea);
  return acc;
}, {});

// ============================================================================
// HELPERS
// ============================================================================

function log(message) {
  const timestamp = new Date().toISOString().split('T')[1].slice(0, 8);
  console.log(`[${timestamp}] ${message}`);
}

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

function generateIdempotencyKey(slug, prompt) {
  return crypto.createHash('sha256').update(`${slug}-${prompt}`).digest('hex');
}

function createPrompt(description) {
  // Prompt FLUX optimisé
  return `${description}. Photorealistic portrait, professional photography, natural skin texture with pores and detail, realistic facial features with detailed eyes, shot with 50mm lens, natural lighting, high quality photography, proper human anatomy and proportions, avoiding cartoon or illustrated appearance, suitable for professional social media and creative content`;
}

function slugify(text) {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '');
}

// ============================================================================
// GÉNÉRATION
// ============================================================================

async function generateImage(idea, retries = MAX_RETRIES) {
  const categorySlug = slugify(idea.category);
  const prompt = createPrompt(idea.description);
  const idempotencyKey = generateIdempotencyKey(idea.slug, prompt);
  
  const payload = {
    slug: categorySlug,
    prompt: prompt,
    width: 1024,
    height: 1280,
    model: 'flux',
    persist: true,
    collection: 'admin-generated',
    category_id: categorySlug,
    prompt_title: idea.title,
    prompt_text: idea.description,
    aspect_ratio: '4:5'
  };
  
  if (isDryRun) {
    log(`[DRY-RUN] ${idea.category} → ${idea.title}`);
    return { success: true, dry_run: true };
  }
  
  for (let attempt = 1; attempt <= retries; attempt++) {
    try {
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), REQUEST_TIMEOUT);
      
      const response = await fetch(ENDPOINT, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Idempotency-Key': idempotencyKey
        },
        body: JSON.stringify(payload),
        signal: controller.signal
      });
      
      clearTimeout(timeoutId);
      
      if (response.ok) {
        const data = await response.json();
        return { success: true, data, attempt };
      } else {
        const errorText = await response.text();
        log(`⚠️  Tentative ${attempt}/${retries} échouée (${response.status}): ${errorText}`);
        
        if (attempt < retries) {
          await sleep(1000 * attempt); // Backoff exponentiel
        }
      }
    } catch (error) {
      log(`⚠️  Tentative ${attempt}/${retries} échouée: ${error.message}`);
      
      if (attempt < retries) {
        await sleep(1000 * attempt);
      }
    }
  }
  
  return { success: false, error: 'Max retries exceeded' };
}

async function generateCategory(categoryName, ideas) {
  log(`\n━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━`);
  log(`📁 Catégorie: ${categoryName}`);
  log(`━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n`);
  
  const selectedIdeas = ideas.slice(0, LIMIT);
  const total = selectedIdeas.length;
  
  log(`🎯 Génération de ${total} images pour "${categoryName}"\n`);
  
  const results = {
    success: 0,
    failed: 0,
    idempotent: 0,
    images: []
  };
  
  for (let i = 0; i < selectedIdeas.length; i++) {
    const idea = selectedIdeas[i];
    const progress = `[${i + 1}/${total}]`;
    
    log(`${progress} 🎨 ${idea.title}...`);
    
    const result = await generateImage(idea);
    
    if (result.success) {
      if (result.dry_run) {
        log(`${progress} ✅ DRY-RUN OK`);
        results.success++;
      } else if (result.data?.idempotent) {
        log(`${progress} ♻️  Image déjà existante (idempotent)`);
        results.idempotent++;
        results.images.push({
          title: idea.title,
          url: result.data.image_url,
          idempotent: true
        });
      } else {
        log(`${progress} ✅ Image générée (tentative ${result.attempt})`);
        log(`    → ${result.data?.image_url || 'URL non disponible'}`);
        results.success++;
        results.images.push({
          title: idea.title,
          url: result.data?.image_url,
          idempotent: false
        });
      }
    } else {
      log(`${progress} ❌ Échec: ${result.error}`);
      results.failed++;
    }
    
    // Délai entre chaque requête (sauf dernière)
    if (i < selectedIdeas.length - 1) {
      await sleep(DELAY_BETWEEN_REQUESTS);
    }
  }
  
  return results;
}

// ============================================================================
// MAIN
// ============================================================================

async function main() {
  console.log('\n╔════════════════════════════════════════════════════════════╗');
  console.log('║                                                            ║');
  console.log('║  🎨 GÉNÉRATEUR MASSIF D\'IMAGES PAR CATÉGORIE              ║');
  console.log('║                                                            ║');
  console.log('╚════════════════════════════════════════════════════════════╝\n');
  
  log(`⚙️  Configuration:`);
  log(`   - API: ${ENDPOINT}`);
  log(`   - Images par catégorie: ${LIMIT}`);
  log(`   - Délai entre requêtes: ${DELAY_BETWEEN_REQUESTS}ms`);
  log(`   - Retries max: ${MAX_RETRIES}`);
  log(`   - Timeout: ${REQUEST_TIMEOUT}ms`);
  if (isDryRun) log(`   - Mode: DRY-RUN (simulation)`);
  if (targetCategory) log(`   - Catégorie ciblée: ${targetCategory}`);
  log('');
  
  const categories = Object.keys(ideasByCategory);
  const categoriesToProcess = targetCategory
    ? categories.filter(cat => cat === targetCategory)
    : categories;
  
  if (categoriesToProcess.length === 0) {
    console.error(`❌ Catégorie "${targetCategory}" non trouvée`);
    console.log(`\nCatégories disponibles:`);
    categories.forEach(cat => console.log(`  - ${cat} (${ideasByCategory[cat].length} idées)`));
    process.exit(1);
  }
  
  log(`📋 ${categoriesToProcess.length} catégories à traiter:\n`);
  categoriesToProcess.forEach((cat, i) => {
    const ideas = ideasByCategory[cat];
    const count = Math.min(ideas.length, LIMIT);
    log(`   ${i + 1}. ${cat} (${count}/${ideas.length} idées)`);
  });
  log('');
  
  const globalResults = {
    success: 0,
    failed: 0,
    idempotent: 0,
    categories: {}
  };
  
  const startTime = Date.now();
  
  for (let i = 0; i < categoriesToProcess.length; i++) {
    const category = categoriesToProcess[i];
    const ideas = ideasByCategory[category];
    
    const results = await generateCategory(category, ideas);
    
    globalResults.success += results.success;
    globalResults.failed += results.failed;
    globalResults.idempotent += results.idempotent;
    globalResults.categories[category] = results;
    
    log(`\n📊 Résultats pour "${category}":`);
    log(`   ✅ Succès: ${results.success}`);
    log(`   ♻️  Idempotent: ${results.idempotent}`);
    log(`   ❌ Échecs: ${results.failed}`);
    log(`   📁 Total: ${results.success + results.idempotent + results.failed}`);
    
    // Délai entre catégories
    if (i < categoriesToProcess.length - 1) {
      log(`\n⏸️  Pause de 2s avant la prochaine catégorie...\n`);
      await sleep(2000);
    }
  }
  
  const endTime = Date.now();
  const duration = Math.round((endTime - startTime) / 1000);
  
  console.log('\n\n╔════════════════════════════════════════════════════════════╗');
  console.log('║                                                            ║');
  console.log('║  🎉 GÉNÉRATION TERMINÉE                                    ║');
  console.log('║                                                            ║');
  console.log('╚════════════════════════════════════════════════════════════╝\n');
  
  log(`📊 RÉSULTATS GLOBAUX:\n`);
  log(`   Catégories traitées: ${categoriesToProcess.length}`);
  log(`   ✅ Images générées: ${globalResults.success}`);
  log(`   ♻️  Images existantes: ${globalResults.idempotent}`);
  log(`   ❌ Échecs: ${globalResults.failed}`);
  log(`   📁 Total: ${globalResults.success + globalResults.idempotent + globalResults.failed}`);
  log(`   ⏱️  Durée: ${duration}s (${Math.round(duration / 60)}min)\n`);
  
  // Sauvegarde les résultats
  if (!isDryRun) {
    const resultsPath = path.join(__dirname, `generation-results-${Date.now()}.json`);
    fs.writeFileSync(resultsPath, JSON.stringify(globalResults, null, 2));
    log(`💾 Résultats sauvegardés dans: ${resultsPath}\n`);
  }
  
  // Résumé par catégorie
  log(`📋 DÉTAILS PAR CATÉGORIE:\n`);
  Object.entries(globalResults.categories).forEach(([category, results]) => {
    const total = results.success + results.idempotent + results.failed;
    const successRate = Math.round(((results.success + results.idempotent) / total) * 100);
    log(`   ${category}:`);
    log(`      ${successRate}% succès (${results.success + results.idempotent}/${total})`);
  });
  
  log('\n✨ Terminé !\n');
}

// ============================================================================
// RUN
// ============================================================================

main().catch(error => {
  console.error('\n❌ ERREUR FATALE:', error);
  process.exit(1);
});
