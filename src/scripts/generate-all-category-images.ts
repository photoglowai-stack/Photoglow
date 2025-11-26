#!/usr/bin/env ts-node
/**
 * Script de génération massive des images de catégories
 * 
 * Usage:
 *   npx ts-node scripts/generate-all-category-images.ts
 *   npx ts-node scripts/generate-all-category-images.ts --category=ai-headshots
 *   npx ts-node scripts/generate-all-category-images.ts --test
 *   npx ts-node scripts/generate-all-category-images.ts --dry-run
 * 
 * Ce script utilise l'endpoint EXISTANT /api/v1/ideas/generate
 * qui stocke dans ai_gallery + ideas_examples (buckets déjà configurés)
 */

import { getAllCategories, getCategoryById } from '../components/allCategoriesPromptsConfig';

/* ---------- CONFIG ---------- */
const API_ENDPOINT = process.env.NEXT_PUBLIC_API_URL 
  ? `${process.env.NEXT_PUBLIC_API_URL}/api/v1/ideas/generate`
  : "http://localhost:3000/api/v1/ideas/generate";

const BATCH_SIZE = 3; // Nombre d'images générées en parallèle (réduit pour éviter rate limits)
const TEST_MODE_LIMIT = 5; // Limite d'images en mode test
const DELAY_BETWEEN_BATCHES_MS = 2000; // 2s entre chaque batch

/* ---------- ARGS ---------- */
const args = process.argv.slice(2);
const isDryRun = args.includes("--dry-run");
const isTest = args.includes("--test");
const categoryArg = args.find(a => a.startsWith("--category="))?.split("=")[1];

/* ---------- HELPERS ---------- */
function convertAspectRatioToSize(aspectRatio: string = "1:1"): { width: number; height: number } {
  const ratios: Record<string, { width: number; height: number }> = {
    "1:1": { width: 1024, height: 1024 },
    "4:5": { width: 1024, height: 1280 },
    "9:16": { width: 768, height: 1344 },
    "16:9": { width: 1344, height: 768 }
  };
  return ratios[aspectRatio] || ratios["1:1"];
}

/**
 * Génère UNE image via l'endpoint /api/v1/ideas/generate
 */
async function generateSingleImage(params: {
  categoryId: string;
  title: string;
  prompt: string;
  width: number;
  height: number;
  index: number;
}) {
  const { categoryId, title, prompt, width, height, index } = params;
  
  const slug = `${categoryId}-${String(index).padStart(2, "0")}`;
  
  const payload = {
    slug,
    prompt,
    width,
    height,
    model: "flux",
    persist: true, // Stocke dans ai_gallery (pas previews)
    collection: categoryId // Organise dans outputs/{categoryId}/
  };

  try {
    const response = await fetch(API_ENDPOINT, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(payload)
    });

    if (!response.ok) {
      const error = await response.text();
      throw new Error(`HTTP ${response.status}: ${error}`);
    }

    const result = await response.json();
    
    if (!result.success) {
      throw new Error(result.error || "Unknown error");
    }

    return {
      success: true,
      index,
      title,
      url: result.image_url,
      slug: result.slug
    };
  } catch (error: any) {
    return {
      success: false,
      index,
      title,
      error: String(error).slice(0, 200)
    };
  }
}

/**
 * Génère toutes les images d'une catégorie en batches contrôlés
 */
async function generateCategoryBatch(categoryId: string, prompts: any[]) {
  console.log(`\n📸 Generating ${prompts.length} images for category: ${categoryId}`);
  console.log(`🔗 Endpoint: ${API_ENDPOINT}`);
  console.log(`📦 Destination: ai_gallery/outputs/${categoryId}/`);

  if (isDryRun) {
    console.log("🧪 DRY RUN - No actual generation");
    return {
      success: true,
      categoryId,
      total: prompts.length,
      succeeded: prompts.length,
      failed: 0,
      successRate: "100%",
      results: prompts.map((p, i) => ({ success: true, index: i, title: p.title }))
    };
  }

  const results: any[] = [];
  let succeeded = 0;
  let failed = 0;

  // Générer par batches pour éviter surcharge
  for (let i = 0; i < prompts.length; i += BATCH_SIZE) {
    const batch = prompts.slice(i, i + BATCH_SIZE);
    const batchNum = Math.floor(i / BATCH_SIZE) + 1;
    const totalBatches = Math.ceil(prompts.length / BATCH_SIZE);
    
    console.log(`\n📦 Batch ${batchNum}/${totalBatches} (images ${i}-${Math.min(i + BATCH_SIZE - 1, prompts.length - 1)})`);

    const batchPromises = batch.map((promptData, batchIdx) => {
      const globalIdx = i + batchIdx;
      const { width, height } = convertAspectRatioToSize(promptData.aspectRatio);
      
      return generateSingleImage({
        categoryId,
        title: promptData.title,
        prompt: promptData.prompt,
        width,
        height,
        index: globalIdx
      });
    });

    // Attendre que tout le batch soit terminé
    const batchResults = await Promise.all(batchPromises);

    // Traiter les résultats
    for (const result of batchResults) {
      results.push(result);
      
      if (result.success) {
        succeeded++;
        console.log(`   ✅ [${result.index}] ${result.title}`);
      } else {
        failed++;
        console.error(`   ❌ [${result.index}] ${result.title}: ${result.error}`);
      }
    }

    // Délai entre batches (sauf pour le dernier)
    if (i + BATCH_SIZE < prompts.length) {
      console.log(`   ⏳ Waiting ${DELAY_BETWEEN_BATCHES_MS}ms before next batch...`);
      await new Promise(resolve => setTimeout(resolve, DELAY_BETWEEN_BATCHES_MS));
    }
  }

  return {
    success: true,
    categoryId,
    total: prompts.length,
    succeeded,
    failed,
    successRate: `${Math.round((succeeded / prompts.length) * 100)}%`,
    results
  };
}

/* ---------- MAIN ---------- */
async function main() {
  console.log("🚀 PhotoGlow - Category Images Generator");
  console.log("========================================\n");
  console.log("📦 Using EXISTING infrastructure:");
  console.log("   Endpoint: /api/v1/ideas/generate");
  console.log("   Bucket: ai_gallery");
  console.log("   Table: ideas_examples");
  console.log("   Mode: persist=true (gallery, not previews)\n");

  if (isDryRun) {
    console.log("⚠️  DRY RUN MODE - No images will be generated\n");
  }

  if (isTest) {
    console.log(`⚠️  TEST MODE - Limited to ${TEST_MODE_LIMIT} images per category\n`);
  }

  // 1) Récupérer les catégories
  let categories = getAllCategories();

  // Filtre par catégorie si spécifié
  if (categoryArg) {
    const category = getCategoryById(categoryArg);
    if (!category) {
      console.error(`❌ Category not found: ${categoryArg}`);
      process.exit(1);
    }
    categories = [category];
    console.log(`🎯 Single category mode: ${category.name}\n`);
  }

  // 2) Calculer les stats
  const totalCategories = categories.length;
  let totalImages = 0;
  let totalGenerated = 0;
  let totalFailed = 0;

  for (const cat of categories) {
    totalImages += isTest 
      ? Math.min(cat.promptTemplates.length, TEST_MODE_LIMIT)
      : cat.promptTemplates.length;
  }

  console.log(`📊 Summary:`);
  console.log(`   Categories: ${totalCategories}`);
  console.log(`   Total images: ${totalImages}`);
  console.log(`   Batch size: ${BATCH_SIZE}`);
  console.log(`   Estimated time: ~${Math.ceil(totalImages / BATCH_SIZE * (DELAY_BETWEEN_BATCHES_MS / 1000) / 60)} minutes\n`);

  // 3) Confirmation (sauf en test/dry-run)
  if (!isTest && !isDryRun && !categoryArg) {
    console.log("⚠️  WARNING: This will generate all images and consume API credits!");
    console.log("   Press Ctrl+C to cancel, or wait 5 seconds to continue...\n");
    await new Promise(resolve => setTimeout(resolve, 5000));
  }

  // 4) Générer pour chaque catégorie
  const startTime = Date.now();
  const results: any[] = [];

  for (let i = 0; i < categories.length; i++) {
    const category = categories[i];
    const categoryStartTime = Date.now();

    console.log(`\n${"=".repeat(60)}`);
    console.log(`📂 [${i + 1}/${totalCategories}] ${category.name} (${category.id})`);
    console.log(`${"=".repeat(60)}`);

    // Limiter en mode test
    const prompts = isTest
      ? category.promptTemplates.slice(0, TEST_MODE_LIMIT)
      : category.promptTemplates;

    try {
      const result = await generateCategoryBatch(category.id, prompts);

      totalGenerated += result.succeeded || 0;
      totalFailed += result.failed || 0;

      const categoryDuration = Math.round((Date.now() - categoryStartTime) / 1000);

      console.log(`\n✅ Category completed in ${categoryDuration}s`);
      console.log(`   Succeeded: ${result.succeeded}/${result.total}`);
      console.log(`   Failed: ${result.failed}`);
      console.log(`   Success rate: ${result.successRate}`);

      results.push({
        categoryId: category.id,
        categoryName: category.name,
        result
      });

      // Petit délai entre catégories
      if (i < categories.length - 1) {
        console.log("\n⏳ Waiting 3s before next category...");
        await new Promise(resolve => setTimeout(resolve, 3000));
      }
    } catch (error) {
      console.error(`❌ Category failed:`, error);
      totalFailed += prompts.length;

      results.push({
        categoryId: category.id,
        categoryName: category.name,
        error: String(error)
      });
    }
  }

  // 5) Résumé final
  const totalDuration = Math.round((Date.now() - startTime) / 1000);

  console.log(`\n${"=".repeat(60)}`);
  console.log("🎉 GENERATION COMPLETE");
  console.log(`${"=".repeat(60)}`);
  console.log(`\n📊 Final Statistics:`);
  console.log(`   Total categories: ${totalCategories}`);
  console.log(`   Total images: ${totalImages}`);
  console.log(`   Succeeded: ${totalGenerated}`);
  console.log(`   Failed: ${totalFailed}`);
  console.log(`   Success rate: ${Math.round((totalGenerated / totalImages) * 100)}%`);
  console.log(`   Total duration: ${Math.floor(totalDuration / 60)}m ${totalDuration % 60}s`);

  // 6) Détails par catégorie
  console.log(`\n📋 Results by Category:`);
  for (const r of results) {
    const status = r.error ? "❌ FAILED" : "✅ SUCCESS";
    console.log(`   ${status} ${r.categoryName} (${r.categoryId})`);
    if (r.result) {
      console.log(`      → ${r.result.succeeded}/${r.result.total} images`);
    }
  }

  // 7) Export JSON pour analyse
  const exportPath = `./category-generation-${Date.now()}.json`;
  const fs = await import("fs");
  fs.writeFileSync(exportPath, JSON.stringify({
    timestamp: new Date().toISOString(),
    mode: isTest ? "test" : isDryRun ? "dry-run" : "production",
    totalCategories,
    totalImages,
    totalGenerated,
    totalFailed,
    successRate: `${Math.round((totalGenerated / totalImages) * 100)}%`,
    duration: totalDuration,
    results
  }, null, 2));

  console.log(`\n💾 Results exported to: ${exportPath}`);
  console.log(`\n💡 Images are stored in Supabase:`);
  console.log(`   Bucket: ai_gallery`);
  console.log(`   Paths: outputs/{categoryId}/ideas/{slug}/YYYY-MM-DD/{timestamp}.jpg`);
  console.log(`   Database: ideas_examples table`);

  // 8) Exit code
  process.exit(totalFailed > 0 ? 1 : 0);
}

// Run
main().catch(error => {
  console.error("\n💥 FATAL ERROR:", error);
  process.exit(1);
});
