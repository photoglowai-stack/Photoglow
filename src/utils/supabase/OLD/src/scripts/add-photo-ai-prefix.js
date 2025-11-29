/**
 * Script pour ajouter "Photo AI" devant tous les titres dans ideasData.ts
 * Usage: node scripts/add-photo-ai-prefix.js
 */

const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, '../components/ideasData.ts');

// Lire le fichier
let content = fs.readFileSync(filePath, 'utf-8');

// Compter combien de titres sans "Photo AI" existent
const titlePattern = /title: "(?!Photo AI)([^"]+)"/g;
const matches = content.match(titlePattern);

if (matches) {
  console.log(`Found ${matches.length} titles without "Photo AI" prefix`);
  
  // Remplacer tous les titres qui n'ont pas déjà "Photo AI"
  content = content.replace(
    /title: "(?!Photo AI)([^"]+)"/g,
    'title: "Photo AI $1"'
  );
  
  // Écrire le fichier modifié
  fs.writeFileSync(filePath, content, 'utf-8');
  console.log(`✅ Successfully added "Photo AI" prefix to all remaining titles!`);
  
  // Vérifier
  const remaining = content.match(/title: "(?!Photo AI)([^"]+)"/g);
  console.log(`Remaining titles without prefix: ${remaining ? remaining.length : 0}`);
} else {
  console.log('✅ All titles already have "Photo AI" prefix!');
}
