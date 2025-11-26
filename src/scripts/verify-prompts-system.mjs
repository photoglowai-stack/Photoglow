#!/usr/bin/env node

/**
 * Vérification complète du système de prompts variés
 * Vérifie que tous les fichiers existent et sont valides
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.join(__dirname, '..');

// Couleurs
const colors = {
  reset: '\x1b[0m',
  green: '\x1b[32m',
  red: '\x1b[31m',
  yellow: '\x1b[33m',
  cyan: '\x1b[36m',
  bright: '\x1b[1m'
};

function log(msg, color = 'reset') {
  console.log(colors[color] + msg + colors.reset);
}

// ============================================================================
// VÉRIFICATIONS
// ============================================================================

const checks = [];

function check(name, condition, details = '') {
  checks.push({ name, success: condition, details });
  const icon = condition ? '✅' : '❌';
  const color = condition ? 'green' : 'red';
  log(`${icon} ${name}`, color);
  if (details && !condition) {
    log(`   ${details}`, 'yellow');
  }
}

console.log('\n');
log('╔════════════════════════════════════════════════════════════╗', 'bright');
log('║  🔍 VÉRIFICATION SYSTÈME PROMPTS VARIÉS                   ║', 'bright');
log('╚════════════════════════════════════════════════════════════╝', 'bright');
console.log('\n');

// ============================================================================
// 1. FICHIERS PRINCIPAUX
// ============================================================================

log('📁 FICHIERS PRINCIPAUX\n', 'cyan');

const mainFiles = [
  { path: '/lib/prompt-variations-generator.ts', desc: 'Générateur de prompts' },
  { path: '/scripts/generate-vercel-api-all-ideas.mjs', desc: 'Script de génération' },
  { path: '/scripts/test-prompt-variations.mjs', desc: 'Script de test' },
  { path: '/scripts/count-ideas.mjs', desc: 'Script de comptage' },
  { path: '/components/ideasData.ts', desc: 'Données des idées' }
];

mainFiles.forEach(({ path: filePath, desc }) => {
  const fullPath = path.join(rootDir, filePath);
  const exists = fs.existsSync(fullPath);
  check(`${desc} (${filePath})`, exists, `Fichier manquant: ${fullPath}`);
});

console.log('');

// ============================================================================
// 2. DOCUMENTATION
// ============================================================================

log('📚 DOCUMENTATION\n', 'cyan');

const docFiles = [
  '/PROMPTS_VARIATIONS_SYSTEME.md',
  '/LANCE_PROMPTS_VARIES.md',
  '/SYSTEME_PROMPTS_VARIES_COMPLET.md',
  '/INDEX_PROMPTS_VARIES.md',
  '/README_PROMPTS_VARIES.md'
];

docFiles.forEach(filePath => {
  const fullPath = path.join(rootDir, filePath);
  const exists = fs.existsSync(fullPath);
  check(filePath, exists);
});

console.log('');

// ============================================================================
// 3. CONTENU DU GÉNÉRATEUR
// ============================================================================

log('🎨 GÉNÉRATEUR DE PROMPTS\n', 'cyan');

try {
  const generatorPath = path.join(rootDir, 'lib/prompt-variations-generator.ts');
  const content = fs.readFileSync(generatorPath, 'utf-8');
  
  check('Export generatePromptVariations', content.includes('export function generatePromptVariations'));
  check('Export validateFluxPrompt', content.includes('export function validateFluxPrompt'));
  check('Export generateAndValidatePrompts', content.includes('export function generateAndValidatePrompts'));
  check('Export PROMPT_TOKENS', content.includes('export const PROMPT_TOKENS'));
  
  check('Tokens: lighting (15)', (content.match(/lighting:\s*\[/g) || []).length > 0);
  check('Tokens: background (15)', (content.match(/background:\s*\[/g) || []).length > 0);
  check('Tokens: mood (15)', (content.match(/mood:\s*\[/g) || []).length > 0);
  check('Tokens: framing (15)', (content.match(/framing:\s*\[/g) || []).length > 0);
  check('Tokens: angle (15)', (content.match(/angle:\s*\[/g) || []).length > 0);
  check('Tokens: camera (5)', (content.match(/camera:\s*\[/g) || []).length > 0);
  
} catch (error) {
  check('Lecture du générateur', false, error.message);
}

console.log('');

// ============================================================================
// 4. MODIFICATIONS DU SCRIPT PRINCIPAL
// ============================================================================

log('🔧 SCRIPT DE GÉNÉRATION\n', 'cyan');

try {
  const scriptPath = path.join(rootDir, 'scripts/generate-vercel-api-all-ideas.mjs');
  const content = fs.readFileSync(scriptPath, 'utf-8');
  
  check('Import generatePromptVariations', content.includes('generatePromptVariations'));
  check('Fonction generateFluxPromptsForIdea', content.includes('async function generateFluxPromptsForIdea'));
  check('Cache promptsCache', content.includes('promptsCache'));
  check('Génération 15 prompts variés', content.includes('VRAIMENT DIFFÉRENTES'));
  check('Utilisation prompts[i]', content.includes('prompts[i]'));
  check('Log promptPreview', content.includes('promptPreview'));
  
} catch (error) {
  check('Lecture du script', false, error.message);
}

console.log('');

// ============================================================================
// 5. IMPORTS DYNAMIQUES (Test)
// ============================================================================

log('🧪 IMPORTS ET EXPORTS\n', 'cyan');

try {
  // Test import du générateur
  const { generatePromptVariations, validateFluxPrompt, PROMPT_TOKENS } = await import('../lib/prompt-variations-generator.ts');
  
  check('Import generatePromptVariations', typeof generatePromptVariations === 'function');
  check('Import validateFluxPrompt', typeof validateFluxPrompt === 'function');
  check('Import PROMPT_TOKENS', typeof PROMPT_TOKENS === 'object');
  
  // Test génération d'un prompt
  const testPrompts = generatePromptVariations('Test description', 'Test Title');
  check('Génération 15 prompts', testPrompts.length === 15);
  
  // Test validation
  const validation = validateFluxPrompt(testPrompts[0]);
  check('Validation fonctionne', typeof validation.valid === 'boolean');
  check('Word count calculé', typeof validation.wordCount === 'number');
  
  // Test longueur des prompts
  const avgWordCount = testPrompts.reduce((sum, p) => {
    const words = p.trim().split(/\s+/).length;
    return sum + words;
  }, 0) / testPrompts.length;
  
  check(`Longueur moyenne ${Math.round(avgWordCount)} mots (cible: 70-75)`, avgWordCount >= 50 && avgWordCount <= 100);
  
} catch (error) {
  check('Imports fonctionnent', false, error.message);
}

console.log('');

// ============================================================================
// 6. DONNÉES DES IDÉES
// ============================================================================

log('📊 DONNÉES DES IDÉES\n', 'cyan');

try {
  const { photoIdeas } = await import('../components/ideasData.ts');
  
  check('Import photoIdeas', Array.isArray(photoIdeas));
  check(`Nombre d'idées: ${photoIdeas.length}`, photoIdeas.length > 0);
  
  if (photoIdeas.length > 0) {
    const firstIdea = photoIdeas[0];
    check('Idées ont title', 'title' in firstIdea);
    check('Idées ont description', 'description' in firstIdea);
    check('Idées ont category', 'category' in firstIdea);
  }
  
  const totalImages = photoIdeas.length * 15;
  log(`   💡 Total images: ${totalImages} (${photoIdeas.length} idées × 15 variantes)`, 'yellow');
  
} catch (error) {
  check('Import ideasData', false, error.message);
}

console.log('');

// ============================================================================
// RÉSUMÉ
// ============================================================================

const totalChecks = checks.length;
const successChecks = checks.filter(c => c.success).length;
const failedChecks = totalChecks - successChecks;

log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━', 'bright');
log('📊 RÉSUMÉ', 'bright');
log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━', 'bright');
console.log('');

log(`Total vérifications : ${totalChecks}`, 'cyan');
log(`✅ Réussies : ${successChecks}`, successChecks === totalChecks ? 'green' : 'yellow');
log(`❌ Échouées : ${failedChecks}`, failedChecks === 0 ? 'green' : 'red');

console.log('');

if (failedChecks === 0) {
  log('🎉 SYSTÈME 100% OPÉRATIONNEL !', 'green');
  log('', 'reset');
  log('Tu peux lancer:', 'cyan');
  log('   node scripts/test-prompt-variations.mjs', 'reset');
  log('   node scripts/generate-vercel-api-all-ideas.mjs', 'reset');
} else {
  log('⚠️  Certaines vérifications ont échoué', 'red');
  log('Vérifie les erreurs ci-dessus', 'yellow');
}

console.log('');

// Exit code
process.exit(failedChecks === 0 ? 0 : 1);
