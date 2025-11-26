/**
 * 🧪 SCRIPT DE TEST - Configuration des Prompts
 * 
 * Teste et valide la configuration complète des prompts
 * Génère des statistiques et exemples d'utilisation
 */

import {
  getAllCategories,
  getCategoryById,
  getPromptsByCategory,
  getTotalImageCount,
  getGlobalStats,
  mainCategories,
  ideasCategories
} from '../components/allCategoriesPromptsConfig';

console.log('🎨 PhotoGlow - Test de la Configuration des Prompts\n');
console.log('═'.repeat(60));

// 1. STATISTIQUES GLOBALES
console.log('\n📊 STATISTIQUES GLOBALES\n');
const stats = getGlobalStats();
console.log(`Total de catégories : ${stats.totalCategories}`);
console.log(`Catégories principales : ${stats.mainCategories}`);
console.log(`Catégories IDEAS : ${stats.ideasCategories}`);
console.log(`Total d'images à générer : ${stats.totalTargetImages}`);
console.log(`Moyenne par catégorie : ${stats.avgImagesPerCategory}`);

// 2. LISTE DES CATÉGORIES PRINCIPALES
console.log('\n\n🎯 CATÉGORIES PRINCIPALES\n');
mainCategories.forEach((cat, index) => {
  console.log(`${index + 1}. ${cat.emoji} ${cat.name} (${cat.targetImages} images)`);
  console.log(`   ID: ${cat.id}`);
  console.log(`   Description: ${cat.description}`);
});

// 3. LISTE DES CATÉGORIES IDEAS
console.log('\n\n🌟 CATÉGORIES IDEAS\n');
ideasCategories.forEach((cat, index) => {
  console.log(`${index + 1}. ${cat.emoji} ${cat.name} (${cat.targetImages} images)`);
  console.log(`   ID: ${cat.id}`);
  console.log(`   Description: ${cat.description}`);
});

// 4. EXEMPLE D'UTILISATION PAR CATÉGORIE
console.log('\n\n📝 EXEMPLE DE PROMPTS PAR CATÉGORIE\n');

// Test AI Headshots
const headshotsPrompts = getPromptsByCategory('ai-headshots');
console.log(`\n🔹 AI Headshots (${headshotsPrompts.length} prompts)`);
console.log(`Exemple 1: ${headshotsPrompts[0].title}`);
console.log(`Prompt: ${headshotsPrompts[0].prompt}`);
console.log(`Longueur: ${headshotsPrompts[0].prompt.length} caractères`);

// Test Dating Photos
const datingPrompts = getPromptsByCategory('ai-dating-photos');
console.log(`\n🔹 AI Dating Photos (${datingPrompts.length} prompts)`);
console.log(`Exemple 1: ${datingPrompts[0].title}`);
console.log(`Prompt: ${datingPrompts[0].prompt}`);
console.log(`Longueur: ${datingPrompts[0].prompt.length} caractères`);

// Test Retro & Vintage
const retroPrompts = getPromptsByCategory('retro-vintage');
console.log(`\n🔹 Retro & Vintage (${retroPrompts.length} prompts)`);
console.log(`Exemple 1: ${retroPrompts[0].title}`);
console.log(`Prompt: ${retroPrompts[0].prompt}`);
console.log(`Longueur: ${retroPrompts[0].prompt.length} caractères`);

// 5. VALIDATION DES PROMPTS
console.log('\n\n✅ VALIDATION DES PROMPTS\n');

const allCategories = getAllCategories();
let totalPrompts = 0;
let validPrompts = 0;
let shortPrompts = 0;
let longPrompts = 0;

allCategories.forEach(category => {
  category.promptTemplates.forEach(prompt => {
    totalPrompts++;
    const length = prompt.prompt.length;
    
    if (length >= 120) {
      validPrompts++;
    } else {
      shortPrompts++;
    }
    
    if (length > 200) {
      longPrompts++;
    }
  });
});

console.log(`Total de prompts générés : ${totalPrompts}`);
console.log(`Prompts valides (≥120 car.) : ${validPrompts} (${Math.round(validPrompts / totalPrompts * 100)}%)`);
console.log(`Prompts courts (<120 car.) : ${shortPrompts}`);
console.log(`Prompts longs (>200 car.) : ${longPrompts}`);

// 6. DÉTECTION DES NEGATIVE PROMPTS
console.log('\n\n🚫 DÉTECTION DES NEGATIVE PROMPTS\n');

const negativeKeywords = ['no ', 'not ', 'without ', 'avoid ', "don't ", 'never '];
let negativeFound = 0;

allCategories.forEach(category => {
  category.promptTemplates.forEach(prompt => {
    const lowerPrompt = prompt.prompt.toLowerCase();
    const hasNegative = negativeKeywords.some(keyword => lowerPrompt.includes(keyword));
    
    if (hasNegative) {
      negativeFound++;
      console.log(`⚠️  Negative trouvé dans: ${category.name} - ${prompt.title}`);
    }
  });
});

if (negativeFound === 0) {
  console.log('✅ Aucun negative prompt détecté ! Excellent pour FLUX.');
} else {
  console.log(`⚠️  ${negativeFound} prompts avec des mots négatifs trouvés.`);
}

// 7. DISTRIBUTION DES ASPECT RATIOS
console.log('\n\n📐 DISTRIBUTION DES ASPECT RATIOS\n');

const aspectRatios: Record<string, number> = {};

allCategories.forEach(category => {
  category.promptTemplates.forEach(prompt => {
    const ratio = prompt.aspectRatio || '1:1';
    aspectRatios[ratio] = (aspectRatios[ratio] || 0) + 1;
  });
});

Object.entries(aspectRatios).forEach(([ratio, count]) => {
  console.log(`${ratio}: ${count} prompts (${Math.round(count / totalPrompts * 100)}%)`);
});

// 8. CATEGORIES PAR NOMBRE D'IMAGES
console.log('\n\n📊 CATÉGORIES PAR NOMBRE D\'IMAGES\n');

const sortedByImages = [...allCategories].sort((a, b) => b.targetImages - a.targetImages);

sortedByImages.forEach((cat, index) => {
  console.log(`${index + 1}. ${cat.emoji} ${cat.name}: ${cat.targetImages} images`);
});

// 9. EXPORT JSON POUR UTILISATION EXTERNE
console.log('\n\n💾 EXPORT JSON\n');

const exportData = {
  metadata: {
    generatedAt: new Date().toISOString(),
    totalCategories: allCategories.length,
    totalPrompts: totalPrompts,
    totalImages: stats.totalTargetImages
  },
  categories: allCategories.map(cat => ({
    id: cat.id,
    name: cat.name,
    emoji: cat.emoji,
    description: cat.description,
    targetImages: cat.targetImages,
    promptCount: cat.promptTemplates.length,
    prompts: cat.promptTemplates.map(p => ({
      title: p.title,
      prompt: p.prompt,
      category: p.category,
      aspectRatio: p.aspectRatio || '1:1',
      promptLength: p.prompt.length
    }))
  }))
};

console.log('Structure JSON créée avec succès.');
console.log(`Taille estimée : ${JSON.stringify(exportData).length} caractères`);

// 10. RECOMMANDATIONS
console.log('\n\n💡 RECOMMANDATIONS\n');

if (shortPrompts > 0) {
  console.log(`⚠️  ${shortPrompts} prompts sont trop courts (<120 caractères).`);
  console.log('   Recommandation: Allonger ces prompts pour FLUX.');
}

if (negativeFound > 0) {
  console.log(`⚠️  ${negativeFound} prompts contiennent des mots négatifs.`);
  console.log('   Recommandation: Supprimer les negative prompts pour FLUX.');
}

if (validPrompts === totalPrompts && negativeFound === 0) {
  console.log('✅ Tous les prompts sont optimisés pour FLUX !');
  console.log('✅ Prêt pour la génération massive des images.');
}

console.log('\n═'.repeat(60));
console.log('\n🎉 Test terminé avec succès!\n');

// Export optionnel en fichier JSON
// import { writeFileSync } from 'fs';
// writeFileSync('prompts-export.json', JSON.stringify(exportData, null, 2));
// console.log('📁 Fichier JSON exporté: prompts-export.json');

export { exportData };
