#!/usr/bin/env node

/**
 * Script de génération massive via l'API Vercel externe
 * 
 * API: https://image-generator-api-chi.vercel.app/v1/ideas/generate
 * Stockage: ai_gallery/categories/<slug>/00.jpg → 14.jpg
 * 
 * Usage:
 *   node scripts/generate-vercel-api.mjs
 * 
 * Options:
 *   --category="Holidays & Events"    # Une catégorie spécifique
 *   --limit=5                          # Limiter le nombre d'images
 *   --dry-run                          # Simulation
 * 
 * Features:
 *   - Génère 15 images par catégorie (00-14)
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
const IMAGES_PER_CATEGORY = 15;
const DELAY_BETWEEN_REQUESTS = 700; // ms (anti-rate-limit)
const REQUEST_TIMEOUT = 120000; // 2 minutes
const MAX_RETRIES = 3;

// Arguments CLI
const args = process.argv.slice(2);
const isDryRun = args.includes('--dry-run');
const targetCategory = args.find(arg => arg.startsWith('--category='))?.split('=')[1];
const limitOverride = args.find(arg => arg.startsWith('--limit='))?.split('=')[1];
const LIMIT = limitOverride ? parseInt(limitOverride, 10) : IMAGES_PER_CATEGORY;

// ============================================================================
// MAPPING CATÉGORIES → SLUGS
// ============================================================================

/**
 * Mapping des catégories PhotoGlow vers les slugs API
 */
const CATEGORY_SLUG_MAP = {
  "Holidays & Events": "holidays-events",
  "Dating & Social": "dating-social",
  "Professional Headshots": "professional-headshots",
  "AI & Creative": "ai-creative",
  "Lifestyle & Travel": "lifestyle-travel",
  "Fashion & Style": "fashion-style",
  "Fitness & Sports": "fitness-sports",
  "Retro & Vintage": "retro-vintage",
  "Events & Parties": "events-parties",
  "Cosplay & Fantasy": "cosplay-fantasy",
  "Creative Portraits": "creative-portraits",
  "Adult Content (18+)": "adult-content-18"
};

/**
 * Convertit une catégorie en slug API
 */
function getCategorySlug(category) {
  return CATEGORY_SLUG_MAP[category] || category.toLowerCase().replace(/[^a-z0-9]+/g, '-');
}

// ============================================================================
// DONNÉES
// ============================================================================

console.log(`\n📊 Chargé ${photoIdeas.length} idées depuis ideasData.ts\n`);

// Groupe par catégorie
const ideasByCategory = {};
for (const idea of photoIdeas) {
  const cat = idea.category;
  if (!ideasByCategory[cat]) {
    ideasByCategory[cat] = [];
  }
  ideasByCategory[cat].push(idea);
}

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
 * Crée un prompt FLUX optimisé (photorealiste, pas de cartoon)
 */
function createFluxPrompt(description, variant) {
  // Prompt optimisé pour FLUX : long, descriptif, photorealiste
  return `${description}. Professional photorealistic portrait photography, natural skin texture with visible pores and realistic detail, authentic facial features with lifelike eyes and expressions, captured with professional 50mm portrait lens, soft natural studio lighting with proper shadows and highlights, high resolution photography quality, anatomically correct proportions and realistic human features, avoiding any cartoon, illustrated, or anime style appearance, professional social media ready content, variant style number ${variant}`;
}

// ============================================================================
// GÉNÉRATION
// ============================================================================

/**
 * Génère une image via l'API Vercel
 */
async function generateImage(categorySlug, prompt, idempotencyKey, retries = MAX_RETRIES) {
  const payload = {
    slug: categorySlug,
    prompt: prompt,
    aspect_ratio: '3:4',
    width: 1536,
    model: 'flux',
    persist: true
  };
  
  if (isDryRun) {
    log(`[DRY-RUN] ${categorySlug}/${idempotencyKey}.jpg`);
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
 * Génère toutes les images d'une catégorie
 */
async function generateCategory(category, ideas) {
  const categorySlug = getCategorySlug(category);
  
  log(`\n━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━`);
  log(`📁 Catégorie: ${category}`);
  log(`🔗 Slug API: ${categorySlug}`);
  log(`━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n`);
  
  const total = Math.min(LIMIT, ideas.length);
  
  log(`🎯 Génération de ${total} variantes pour "${category}"\n`);
  
  const results = {
    success: 0,
    failed: 0,
    idempotent: 0,
    images: []
  };
  
  // On génère 15 variantes en utilisant les descriptions des idées
  for (let i = 0; i < total; i++) {
    const idempotencyKey = String(i).padStart(2, '0'); // "00", "01", ..., "14"
    const idea = ideas[i % ideas.length]; // Cycle sur les idées disponibles
    const prompt = createFluxPrompt(idea.description, i);
    const progress = `[${i + 1}/${total}]`;
    
    log(`${progress} 🎨 Variante ${idempotencyKey} (${idea.title.replace('Photo AI ', '')})...`);
    
    const result = await generateImage(categorySlug, prompt, idempotencyKey);
    
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
          idempotent: true
        });
      } else {
        log(`${progress} ✅ Image générée (tentative ${result.attempt})`);
        log(`    → ${result.data?.image_url || 'URL non disponible'}`);
        results.success++;
        results.images.push({
          filename: `${idempotencyKey}.jpg`,
          url: result.data?.image_url,
          idempotent: false
        });
      }
    } else {
      log(`${progress} ❌ Échec: ${result.error}`);
      results.failed++;
    }
    
    // Délai entre chaque requête (sauf dernière)
    if (i < total - 1) {
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
  console.log('║  🎨 GÉNÉRATION MASSIVE VIA API VERCEL                      ║');
  console.log('║                                                            ║');
  console.log('╚════════════════════════════════════════════════════════════╝\n');
  
  log(`⚙️  Configuration:`);
  log(`   - API: ${API_URL}`);
  log(`   - Images par catégorie: ${LIMIT}`);
  log(`   - Délai entre requêtes: ${DELAY_BETWEEN_REQUESTS}ms`);
  log(`   - Retries max: ${MAX_RETRIES}`);
  log(`   - Timeout: ${REQUEST_TIMEOUT}ms`);
  log(`   - Stockage: ai_gallery/categories/<slug>/00.jpg → 14.jpg`);
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
    categories.forEach(cat => {
      const slug = getCategorySlug(cat);
      console.log(`  - ${cat} → ${slug} (${ideasByCategory[cat].length} idées)`);
    });
    process.exit(1);
  }
  
  log(`📋 ${categoriesToProcess.length} catégories à traiter:\n`);
  categoriesToProcess.forEach((cat, i) => {
    const slug = getCategorySlug(cat);
    const ideas = ideasByCategory[cat];
    log(`   ${i + 1}. ${cat}`);
    log(`      → Slug: ${slug}`);
    log(`      → ${ideas.length} idées disponibles`);
    log(`      → ${Math.min(LIMIT, ideas.length)} variantes à générer`);
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
    globalResults.categories[category] = {
      slug: getCategorySlug(category),
      ...results
    };
    
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
    const fs = await import('fs');
    const path = await import('path');
    const __dirname = path.dirname(new URL(import.meta.url).pathname);
    const resultsPath = path.join(__dirname, `vercel-generation-results-${Date.now()}.json`);
    fs.writeFileSync(resultsPath, JSON.stringify(globalResults, null, 2));
    log(`💾 Résultats sauvegardés dans: ${resultsPath}\n`);
  }
  
  // Résumé par catégorie
  log(`📋 DÉTAILS PAR CATÉGORIE:\n`);
  Object.entries(globalResults.categories).forEach(([category, results]) => {
    const total = results.success + results.idempotent + results.failed;
    const successRate = Math.round(((results.success + results.idempotent) / total) * 100);
    log(`   ${category} (${results.slug}):`);
    log(`      ${successRate}% succès (${results.success + results.idempotent}/${total})`);
    log(`      Stockage: ai_gallery/categories/${results.slug}/00.jpg → 14.jpg`);
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
