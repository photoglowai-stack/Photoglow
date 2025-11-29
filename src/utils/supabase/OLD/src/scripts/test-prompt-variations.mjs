#!/usr/bin/env node

/**
 * Script de test pour visualiser les prompts variés générés
 * Montre des exemples concrets pour quelques idées
 */

import { photoIdeas } from '../components/ideasData.ts';
import { generateAndValidatePrompts, countWords } from '../lib/prompt-variations-generator.ts';

// Couleurs console
const colors = {
  reset: '\x1b[0m',
  bright: '\x1b[1m',
  green: '\x1b[32m',
  yellow: '\x1b[33m',
  blue: '\x1b[34m',
  cyan: '\x1b[36m',
  red: '\x1b[31m'
};

function log(msg, color = 'reset') {
  console.log(colors[color] + msg + colors.reset);
}

// ============================================================================
// TEST
// ============================================================================

async function main() {
  console.log('\n');
  log('╔════════════════════════════════════════════════════════════╗', 'bright');
  log('║                                                            ║', 'bright');
  log('║  🎨 TEST - GÉNÉRATEUR DE PROMPTS VARIÉS FLUX              ║', 'bright');
  log('║                                                            ║', 'bright');
  log('╚════════════════════════════════════════════════════════════╝', 'bright');
  console.log('\n');
  
  // Teste sur 5 idées différentes
  const testIdeas = photoIdeas.slice(0, 5);
  
  log(`📊 Test sur ${testIdeas.length} idées:\n`, 'cyan');
  
  for (let i = 0; i < testIdeas.length; i++) {
    const idea = testIdeas[i];
    
    log(`\n━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━`, 'blue');
    log(`📌 IDÉE ${i + 1}: ${idea.title}`, 'bright');
    log(`📂 Catégorie: ${idea.category}`, 'cyan');
    log(`📝 Description: ${idea.description.slice(0, 100)}...`, 'cyan');
    log(`━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━`, 'blue');
    
    const result = generateAndValidatePrompts(idea.description, idea.title);
    
    // Affiche le résumé
    log(`\n📊 RÉSUMÉ:`, 'yellow');
    log(`   ✅ Tous valides: ${result.summary.allValid ? 'OUI' : 'NON'}`, result.summary.allValid ? 'green' : 'red');
    log(`   📏 Moyenne mots: ${result.summary.averageWordCount} mots`, 'yellow');
    log(`   ⚠️  Warnings: ${result.summary.totalWarnings}`, result.summary.totalWarnings === 0 ? 'green' : 'yellow');
    
    // Affiche 3 exemples de prompts
    log(`\n📝 EXEMPLES DE PROMPTS (3 premiers sur 15):`, 'bright');
    
    for (let j = 0; j < 3 && j < result.prompts.length; j++) {
      const prompt = result.prompts[j];
      const validation = result.validations[j];
      
      log(`\n   [${String(j).padStart(2, '0')}] ${validation.wordCount} mots:`, 'cyan');
      
      // Découpe le prompt en sections pour meilleure lisibilité
      const sections = prompt.split('. ');
      sections.forEach((section, idx) => {
        if (section.trim()) {
          log(`       ${section}${idx < sections.length - 1 ? '.' : ''}`, 'reset');
        }
      });
      
      if (validation.warnings.length > 0) {
        log(`       ⚠️  Warnings: ${validation.warnings.join(', ')}`, 'yellow');
      }
    }
    
    log(`\n   ... et 12 autres prompts variés (total: 15)`, 'cyan');
  }
  
  // Statistiques globales
  log(`\n\n━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━`, 'green');
  log(`📊 STATISTIQUES GLOBALES`, 'bright');
  log(`━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━`, 'green');
  
  const allResults = testIdeas.map(idea => 
    generateAndValidatePrompts(idea.description, idea.title)
  );
  
  const totalPrompts = allResults.reduce((sum, r) => sum + r.prompts.length, 0);
  const totalValid = allResults.filter(r => r.summary.allValid).length;
  const avgWordCount = Math.round(
    allResults.reduce((sum, r) => sum + r.summary.averageWordCount, 0) / allResults.length
  );
  
  log(`\n   Idées testées: ${testIdeas.length}`, 'cyan');
  log(`   Prompts générés: ${totalPrompts}`, 'cyan');
  log(`   Idées 100% valides: ${totalValid}/${testIdeas.length}`, totalValid === testIdeas.length ? 'green' : 'yellow');
  log(`   Moyenne générale: ${avgWordCount} mots/prompt`, 'cyan');
  
  log(`\n✅ Test terminé !\n`, 'green');
  
  log(`💡 Pour voir tous les prompts d'une idée:`, 'yellow');
  log(`   const result = generateAndValidatePrompts(description, title);`, 'reset');
  log(`   console.log(result.prompts);`, 'reset');
  
  console.log('\n');
}

main().catch(error => {
  console.error('\n❌ ERREUR:', error);
  process.exit(1);
});
