/**
 * Script pour compter et lister toutes les catégories
 * 
 * Usage: npx tsx scripts/count-categories.ts
 */

import { allCategoriesData } from '../supabase/functions/server/category-prompts-all-categories.js';

console.log('📊 CATEGORY COUNT REPORT\n');
console.log(`Total categories: ${allCategoriesData.length}\n`);

let totalPrompts = 0;

console.log('📋 CATEGORIES LIST:\n');
allCategoriesData.forEach((cat, index) => {
  const promptCount = cat.promptTemplates.length;
  totalPrompts += promptCount;
  console.log(`${index + 1}. ${cat.name} (${cat.id}) - ${promptCount} prompt${promptCount > 1 ? 's' : ''}`);
});

console.log(`\n📈 TOTALS:`);
console.log(`- Categories: ${allCategoriesData.length}`);
console.log(`- Total prompts: ${totalPrompts}`);
console.log(`- Average prompts per category: ${(totalPrompts / allCategoriesData.length).toFixed(1)}`);

// Vérifier si certaines catégories n'ont pas de prompts
const categoriesWithoutPrompts = allCategoriesData.filter(cat => cat.promptTemplates.length === 0);
if (categoriesWithoutPrompts.length > 0) {
  console.log(`\n⚠️  WARNING: ${categoriesWithoutPrompts.length} categories without prompts:`);
  categoriesWithoutPrompts.forEach(cat => {
    console.log(`   - ${cat.name} (${cat.id})`);
  });
} else {
  console.log(`\n✅ All categories have prompts!`);
}
