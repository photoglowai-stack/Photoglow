#!/usr/bin/env node

/**
 * build.js - Build script for Photoglow Phase 2
 * 
 * Combines all modular files into single ui-phase2-built.html
 * Usage: node build.js
 */

const fs = require('fs');
const path = require('path');

console.log('🔨 Building Photoglow Phase 2...\n');

// Read all modules
const modules = {
  GenerationQueue: fs.readFileSync(path.join(__dirname, 'GenerationQueue.js'), 'utf8'),
  ImageCache: fs.readFileSync(path.join(__dirname, 'ImageCache.js'), 'utf8'),
  fetchWithRetry: fs.readFileSync(path.join(__dirname, 'fetchWithRetry.js'), 'utf8'),
  pollJobStatus: fs.readFileSync(path.join(__dirname, 'pollJobStatus.js'), 'utf8'),
  Validator: fs.readFileSync(path.join(__dirname, 'Validator.js'), 'utf8'),
  utils: fs.readFileSync(path.join(__dirname, 'utils.js'), 'utf8')
};

console.log('✅ Read all modules');

// Read template
const template = fs.readFileSync(path.join(__dirname, 'ui-phase2-modular.html'), 'utf8');

// Extract script section
const scriptMatch = template.match(/<script type="module">([\s\S]*?)<\/script>/);
if (!scriptMatch) {
  console.error('❌ Could not find script section in template');
  process.exit(1);
}

const originalScript = scriptMatch[1];

// Remove imports from original script
const scriptWithoutImports = originalScript
  .split('\n')
  .filter(line => !line.trim().startsWith('import '))
  .join('\n');

// Build inline modules (remove exports)
const inlineModules = Object.entries(modules)
  .map(([name, code]) => {
    // Remove export statements
    const cleaned = code
      .replace(/export \{[^}]+\};?/g, '')
      .replace(/export (class|const|function|async function)/g, '$1')
      .replace(/if \(typeof module.*[\s\S]*?}/g, ''); // Remove Node.js exports
    
    return `// ============================================\n// ${name.toUpperCase()}\n// ============================================\n${cleaned}`;
  })
  .join('\n\n');

// Combine everything
const newScript = `${inlineModules}\n\n// ============================================\n// MAIN APPLICATION\n// ============================================\n${scriptWithoutImports}`;

// Replace in template
const output = template.replace(
  /<script type="module">[\s\S]*?<\/script>/,
  `<script type="module">\n${newScript}\n  </script>`
);

// Update version tag
const finalOutput = output.replace('v2.1-modular', 'v2.1-built');

// Write output
const outputPath = path.join(__dirname, 'ui-phase2-built.html');
fs.writeFileSync(outputPath, finalOutput, 'utf8');

console.log('✅ Built ui-phase2-built.html');
console.log(`📊 Size: ${(finalOutput.length / 1024).toFixed(2)} KB`);
console.log(`📁 Location: ${outputPath}`);
console.log('\n✨ Build complete!');
