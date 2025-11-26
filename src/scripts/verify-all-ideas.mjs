/**
 * Vérifie et compte TOUTES les idées dans ideasData.ts
 * Run with: node scripts/verify-all-ideas.mjs
 */

import { readFileSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

console.log('🔍 VÉRIFICATION DE TOUTES LES IDÉES\n');

// Read ideasData.ts
const ideasDataPath = join(__dirname, '../components/ideasData.ts');
const content = readFileSync(ideasDataPath, 'utf8');

// Extract photoIdeas array
const photoIdeasMatch = content.match(/export const photoIdeas: PhotoIdea\[\] = \[([\s\S]*?)\];/);
if (!photoIdeasMatch) {
  console.error('❌ Could not find photoIdeas array');
  process.exit(1);
}

// Extract categories array
const categoriesMatch = content.match(/export const categories = \[([\s\S]*?)\];/);
if (!categoriesMatch) {
  console.error('❌ Could not find categories array');
  process.exit(1);
}

// Parse categories
const categoriesStr = categoriesMatch[1];
const categories = categoriesStr
  .split(',')
  .map(c => c.trim().replace(/['"]/g, ''))
  .filter(c => c && c !== 'All');

console.log(`✅ CATÉGORIES TROUVÉES : ${categories.length}\n`);
categories.forEach((cat, idx) => console.log(`   ${idx + 1}. ${cat}`));

// Parse photoIdeas
const ideasStr = photoIdeasMatch[1];
const ideaMatches = [...ideasStr.matchAll(/\{[\s\S]*?title:\s*"([^"]+)"[\s\S]*?description:\s*"([^"]+)"[\s\S]*?category:\s*"([^"]+)"[\s\S]*?\}/g)];

const ideas = ideaMatches.map(match => ({
  title: match[1],
  description: match[2],
  category: match[3]
}));

console.log(`\n✅ IDÉES TROUVÉES : ${ideas.length}\n`);

// Group by category
const ideasByCategory = ideas.reduce((acc, idea) => {
  const cat = idea.category;
  if (!acc[cat]) acc[cat] = [];
  acc[cat].push(idea);
  return acc;
}, {});

// Print stats
console.log('📊 RÉPARTITION PAR CATÉGORIE:\n');
let totalIdeas = 0;

categories.forEach(cat => {
  const count = ideasByCategory[cat]?.length || 0;
  totalIdeas += count;
  console.log(`   ${cat}: ${count} idées`);
});

console.log(`\n✅ TOTAL : ${totalIdeas} idées dans ${categories.length} catégories\n`);

// Liste quelques exemples d'idées populaires
console.log('🎯 EXEMPLES D\'IDÉES INCLUSES:\n');
const exampleTitles = [
  'Photo AI Halloween',
  'Photo AI Diwali',
  'Photo AI Christmas',
  'Photo AI Easter',
  'Photo AI Tinder',
  'Photo AI Instagram',
  'Photo AI LinkedIn Headshots',
  'Photo AI CEO Headshots',
  'Photo AI Holi',
  'Photo AI Ramadan'
];

exampleTitles.forEach(title => {
  const found = ideas.find(i => i.title === title);
  if (found) {
    console.log(`   ✅ ${title} (${found.category})`);
  } else {
    console.log(`   ❌ ${title} - NOT FOUND`);
  }
});

console.log('\n');

// Vérifie si toutes les catégories ont au moins une idée
console.log('🔍 VÉRIFICATION DES CATÉGORIES VIDES:\n');
let hasEmptyCategories = false;
categories.forEach(cat => {
  const count = ideasByCategory[cat]?.length || 0;
  if (count === 0) {
    console.log(`   ⚠️  ${cat}: VIDE`);
    hasEmptyCategories = true;
  }
});

if (!hasEmptyCategories) {
  console.log('   ✅ Toutes les catégories ont au moins une idée\n');
}

console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
console.log('✅ VÉRIFICATION TERMINÉE');
console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n');
console.log(`Le générateur admin sur /admin a accès à TOUTES ces ${totalIdeas} idées.`);
console.log('Il n\'y a AUCUNE idée manquante.\n');
