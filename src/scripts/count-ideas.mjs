#!/usr/bin/env node

/**
 * Compte le nombre d'idées dans ideasData.ts
 */

import { photoIdeas } from '../components/ideasData.ts';

console.log(`\n🎯 Nombre total d'idées: ${photoIdeas.length}\n`);

// Groupe par catégorie
const byCategory = {};
photoIdeas.forEach(idea => {
  if (!byCategory[idea.category]) {
    byCategory[idea.category] = 0;
  }
  byCategory[idea.category]++;
});

console.log('📊 Par catégorie:');
Object.entries(byCategory)
  .sort((a, b) => b[1] - a[1])
  .forEach(([category, count]) => {
    console.log(`   ${category}: ${count} idées`);
  });

console.log(`\n🎨 Total prompts avec 15 variantes: ${photoIdeas.length * 15}\n`);
