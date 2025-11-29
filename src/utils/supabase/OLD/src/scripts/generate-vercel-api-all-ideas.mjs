#!/usr/bin/env node

/**
 * Script de génération massive via l'API Vercel externe
 * TOUTES LES IDÉES INDIVIDUELLES (139 idées)
 * 
 * API: https://image-generator-api-chi.vercel.app/v1/ideas/generate
 * Stockage: ai_gallery/categories/<slug>/00.jpg → 14.jpg
 * 
 * Usage:
 *   node scripts/generate-vercel-api-all-ideas.mjs
 * 
 * Options:
 *   --idea="Photo AI Halloween"   # Une idée spécifique
 *   --limit=5                      # Limiter le nombre d'images par idée
 *   --dry-run                      # Simulation
 * 
 * Features:
 *   - Génère 15 images par IDÉE (139 idées)
 *   - Total: 139 × 15 = 2085 images
 *   - Utilise l'API Vercel externe
 *   - Prompts FLUX optimisés (pas de cartoon/illustration)
 *   - Idempotency via nom de fichier
 *   - Délai anti-rate-limit
 *   - Logs détaillés
 */

import { photoIdeas } from '../components/ideasData.ts';

// ============================================================================
// CONFIGURATION
// ============================================================================

const API_URL = 'https://image-generator-api-chi.vercel.app/v1/ideas/generate';
const IMAGES_PER_IDEA = 15;
const DELAY_BETWEEN_REQUESTS = 700; // ms (anti-rate-limit)
const DELAY_BETWEEN_IDEAS = 2000; // ms (2s entre chaque idée)
const REQUEST_TIMEOUT = 120000; // 2 minutes
const MAX_RETRIES = 3;

// Arguments CLI
const args = process.argv.slice(2);
const isDryRun = args.includes('--dry-run');
const targetIdea = args.find(arg => arg.startsWith('--idea='))?.split('=')[1];
const limitOverride = args.find(arg => arg.startsWith('--limit='))?.split('=')[1];
const LIMIT = limitOverride ? parseInt(limitOverride, 10) : IMAGES_PER_IDEA;

// ============================================================================
// MAPPING IDÉES → SLUGS
// ============================================================================

/**
 * Convertit un titre d'idée en slug API
 * Exemple: "Photo AI Halloween" → "ai-halloween"
 */
function getIdeaSlug(title) {
  // Retire "Photo AI " du début
  let slug = title.replace(/^Photo AI\s+/i, '');
  
  // Convertit en slug
  slug = slug
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');
  
  // Ajoute le préfixe "ai-"
  return `ai-${slug}`;
}

// ============================================================================
// DONNÉES
// ============================================================================

console.log(`\n📊 Chargé ${photoIdeas.length} idées depuis ideasData.ts\n`);

// Filtre les idées si nécessaire
const ideasToProcess = targetIdea
  ? photoIdeas.filter(idea => idea.title === targetIdea)
  : photoIdeas;

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

/**
 * Crée 15 prompts FLUX vraiment variés pour une idée
 * Utilise le générateur de variations avec les 10 commandements FLUX
 */
async function generateFluxPromptsForIdea(description, ideaTitle) {
  // Import dynamique du générateur
  const { generatePromptVariations } = await import('../lib/prompt-variations-generator.ts');
  return generatePromptVariations(description, ideaTitle);
}

// Cache des prompts générés pour éviter de régénérer
const promptsCache = new Map();

// ============================================================================
// GÉNÉRATION
// ============================================================================

/**
 * Génère une image via l'API Vercel
 */
async function generateImage(ideaSlug, prompt, idempotencyKey, retries = MAX_RETRIES) {
  const payload = {
    slug: ideaSlug,
    prompt: prompt,
    aspect_ratio: '3:4',
    width: 1536,
    model: 'flux',
    persist: true
  };
  
  if (isDryRun) {
    log(`[DRY-RUN] ${ideaSlug}/${idempotencyKey}.jpg`);
    return { success: true, dry_run: true };
  }
  
  for (let attempt = 1; attempt <= retries; attempt++) {
    try {
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), REQUEST_TIMEOUT);
      
      const response = await fetch(API_URL, {
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
        log(`⚠️  Tentative ${attempt}/${retries} échouée (${response.status}): ${errorText.slice(0, 100)}`);
        
        if (attempt < retries) {
          await sleep(2000 * attempt); // Backoff exponentiel
        }
      }
    } catch (error) {
      log(`⚠️  Tentative ${attempt}/${retries} échouée: ${error.message}`);
      
      if (attempt < retries) {
        await sleep(2000 * attempt);
      }
    }
  }
  
  return { success: false, error: 'Max retries exceeded' };
}

/**
 * Génère toutes les images d'une idée avec prompts vraiment variés
 */
async function generateIdea(idea, index, total) {
  const ideaSlug = getIdeaSlug(idea.title);
  
  log(`\n━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━`);
  log(`📁 Idée [${index + 1}/${total}]: ${idea.title}`);
  log(`🔗 Slug API: ${ideaSlug}`);
  log(`📂 Catégorie: ${idea.category}`);
  log(`━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n`);
  
  log(`🎯 Génération de ${LIMIT} variantes VRAIMENT DIFFÉRENTES pour "${idea.title}"\n`);
  
  // Génère tous les prompts variés une fois
  let prompts;
  const cacheKey = idea.title;
  
  if (promptsCache.has(cacheKey)) {
    prompts = promptsCache.get(cacheKey);
    log(`📋 Utilisation des prompts en cache\n`);
  } else {
    log(`📝 Génération de 15 prompts variés avec règles FLUX...\n`);
    prompts = await generateFluxPromptsForIdea(idea.description, idea.title);
    promptsCache.set(cacheKey, prompts);
  }
  
  const results = {
    success: 0,
    failed: 0,
    idempotent: 0,
    images: []
  };
  
  // On génère 15 variantes de cette idée avec des prompts VRAIMENT différents
  for (let i = 0; i < LIMIT; i++) {
    const idempotencyKey = String(i).padStart(2, '0'); // "00", "01", ..., "14"
    const prompt = prompts[i] || prompts[0]; // Fallback sur le premier si pas assez
    const progress = `[${i + 1}/${LIMIT}]`;
    
    // Affiche un aperçu du prompt (premiers 80 caractères)
    const promptPreview = prompt.length > 80 ? prompt.slice(0, 77) + '...' : prompt;
    log(`${progress} 🎨 Variante ${idempotencyKey}: ${promptPreview}`);
    
    const result = await generateImage(ideaSlug, prompt, idempotencyKey);
    
    if (result.success) {
      if (result.dry_run) {
        log(`${progress} ✅ DRY-RUN OK`);
        results.success++;
      } else if (result.data?.idempotent) {
        log(`${progress} ♻️  Image déjà existante (idempotent)`);
        results.idempotent++;
        results.images.push({
          filename: `${idempotencyKey}.jpg`,
          url: result.data.image_url,
          prompt: promptPreview,
          idempotent: true
        });
      } else {
        log(`${progress} ✅ Image générée (tentative ${result.attempt})`);
        log(`    → ${result.data?.image_url || 'URL non disponible'}`);
        results.success++;
        results.images.push({
          filename: `${idempotencyKey}.jpg`,
          url: result.data?.image_url,
          prompt: promptPreview,
          idempotent: false
        });
      }
    } else {
      log(`${progress} ❌ Échec: ${result.error}`);
      results.failed++;
    }
    
    // Délai entre chaque requête (sauf dernière)
    if (i < LIMIT - 1) {
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
  console.log('║  🎨 GÉNÉRATION MASSIVE - TOUTES LES IDÉES                  ║');
  console.log('║                                                            ║');
  console.log('╚════════════════════════════════════════════════════════════╝\n');
  
  log(`⚙️  Configuration:`);
  log(`   - API: ${API_URL}`);
  log(`   - Images par idée: ${LIMIT}`);
  log(`   - Délai entre requêtes: ${DELAY_BETWEEN_REQUESTS}ms`);
  log(`   - Délai entre idées: ${DELAY_BETWEEN_IDEAS}ms`);
  log(`   - Retries max: ${MAX_RETRIES}`);
  log(`   - Timeout: ${REQUEST_TIMEOUT}ms`);
  log(`   - Stockage: ai_gallery/categories/<slug>/00.jpg → 14.jpg`);
  if (isDryRun) log(`   - Mode: DRY-RUN (simulation)`);
  if (targetIdea) log(`   - Idée ciblée: ${targetIdea}`);
  log('');
  
  if (ideasToProcess.length === 0) {
    console.error(`❌ Idée "${targetIdea}" non trouvée`);
    console.log(`\nIdées disponibles (${photoIdeas.length}):`);
    photoIdeas.slice(0, 10).forEach((idea, i) => {
      console.log(`  ${i + 1}. ${idea.title} (${idea.category})`);
    });
    console.log(`  ... et ${photoIdeas.length - 10} autres`);
    process.exit(1);
  }
  
  log(`📋 ${ideasToProcess.length} idées à traiter:\n`);
  
  // Affiche un échantillon
  const sampleSize = Math.min(10, ideasToProcess.length);
  ideasToProcess.slice(0, sampleSize).forEach((idea, i) => {
    const slug = getIdeaSlug(idea.title);
    log(`   ${i + 1}. ${idea.title}`);
    log(`      → Slug: ${slug}`);
    log(`      → Catégorie: ${idea.category}`);
    log(`      → ${LIMIT} variantes à générer`);
  });
  
  if (ideasToProcess.length > sampleSize) {
    log(`   ... et ${ideasToProcess.length - sampleSize} autres idées`);
  }
  log('');
  
  const totalImages = ideasToProcess.length * LIMIT;
  log(`📊 TOTAL À GÉNÉRER: ${totalImages} images (${ideasToProcess.length} idées × ${LIMIT} variantes)\n`);
  
  const estimatedMinutes = Math.round((totalImages * (DELAY_BETWEEN_REQUESTS + 3000)) / 60000);
  log(`⏱️  DURÉE ESTIMÉE: ~${estimatedMinutes} minutes (${Math.round(estimatedMinutes / 60)}h${estimatedMinutes % 60}min)\n`);
  
  const globalResults = {
    success: 0,
    failed: 0,
    idempotent: 0,
    ideas: {}
  };
  
  const startTime = Date.now();
  
  for (let i = 0; i < ideasToProcess.length; i++) {
    const idea = ideasToProcess[i];
    
    const results = await generateIdea(idea, i, ideasToProcess.length);
    
    globalResults.success += results.success;
    globalResults.failed += results.failed;
    globalResults.idempotent += results.idempotent;
    globalResults.ideas[idea.title] = {
      slug: getIdeaSlug(idea.title),
      category: idea.category,
      ...results
    };
    
    log(`\n📊 Résultats pour "${idea.title}":`);
    log(`   ✅ Succès: ${results.success}`);
    log(`   ♻️  Idempotent: ${results.idempotent}`);
    log(`   ❌ Échecs: ${results.failed}`);
    log(`   📁 Total: ${results.success + results.idempotent + results.failed}`);
    
    // Délai entre idées
    if (i < ideasToProcess.length - 1) {
      log(`\n⏸️  Pause de ${DELAY_BETWEEN_IDEAS}ms avant la prochaine idée...\n`);
      await sleep(DELAY_BETWEEN_IDEAS);
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
  log(`   Idées traitées: ${ideasToProcess.length}`);
  log(`   ✅ Images générées: ${globalResults.success}`);
  log(`   ♻️  Images existantes: ${globalResults.idempotent}`);
  log(`   ❌ Échecs: ${globalResults.failed}`);
  log(`   📁 Total: ${globalResults.success + globalResults.idempotent + globalResults.failed}`);
  log(`   ⏱️  Durée: ${duration}s (${Math.round(duration / 60)}min)\n`);
  
  // Sauvegarde les résultats
  if (!isDryRun) {
    const fs = await import('fs');
    const path = await import('path');
    const __dirname = path.dirname(new URL(import.meta.url).pathname);
    const resultsPath = path.join(__dirname, `all-ideas-results-${Date.now()}.json`);
    fs.writeFileSync(resultsPath, JSON.stringify(globalResults, null, 2));
    log(`💾 Résultats sauvegardés dans: ${resultsPath}\n`);
  }
  
  // Résumé par catégorie
  const byCategory = {};
  Object.entries(globalResults.ideas).forEach(([title, results]) => {
    const cat = results.category;
    if (!byCategory[cat]) {
      byCategory[cat] = { ideas: 0, success: 0, failed: 0, idempotent: 0 };
    }
    byCategory[cat].ideas++;
    byCategory[cat].success += results.success;
    byCategory[cat].failed += results.failed;
    byCategory[cat].idempotent += results.idempotent;
  });
  
  log(`📋 RÉSUMÉ PAR CATÉGORIE:\n`);
  Object.entries(byCategory).forEach(([category, stats]) => {
    const total = stats.success + stats.idempotent + stats.failed;
    const successRate = Math.round(((stats.success + stats.idempotent) / total) * 100);
    log(`   ${category}:`);
    log(`      ${stats.ideas} idées traitées`);
    log(`      ${successRate}% succès (${stats.success + stats.idempotent}/${total} images)`);
  });
  
  log('\n✨ Terminé !\n');
  
  if (!isDryRun) {
    log(`🔍 Vérifie tes images dans Supabase Storage:`);
    log(`   Bucket: ai_gallery`);
    log(`   Path: categories/<slug>/00.jpg → 14.jpg\n`);
  }
}

// ============================================================================
// RUN
// ============================================================================

main().catch(error => {
  console.error('\n❌ ERREUR FATALE:', error);
  process.exit(1);
});
