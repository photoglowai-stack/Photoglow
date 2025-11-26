/**
 * Extract ALL ideas from ideasData.ts and generate complete categories file
 * Run with: node scripts/extract-all-ideas.mjs
 */

import { readFileSync, writeFileSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

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

console.log(`\n📊 Found ${categories.length} categories:\n`);
categories.forEach(cat => console.log(`   - ${cat}`));

// Parse photoIdeas (simple regex approach)
const ideasStr = photoIdeasMatch[1];
const ideaMatches = [...ideasStr.matchAll(/\{[\s\S]*?title:\s*"([^"]+)"[\s\S]*?description:\s*"([^"]+)"[\s\S]*?category:\s*"([^"]+)"[\s\S]*?\}/g)];

const ideas = ideaMatches.map(match => ({
  title: match[1],
  description: match[2],
  category: match[3]
}));

console.log(`\n📸 Found ${ideas.length} photo ideas\n`);

// Group by category
const ideasByCategory = ideas.reduce((acc, idea) => {
  const cat = idea.category;
  if (!acc[cat]) acc[cat] = [];
  acc[cat].push(idea);
  return acc;
}, {});

// Print stats
categories.forEach(cat => {
  const count = ideasByCategory[cat]?.length || 0;
  console.log(`   ${cat}: ${count} ideas`);
});

// Generate optimized FLUX prompt
function generateFluxPrompt(description) {
  const opts = [
    'Photorealistic portrait',
    'professional photography',
    'natural skin texture with pores and detail',
    'realistic facial features with detailed eyes',
    'shot with 50mm lens',
    'natural lighting',
    'high quality photography',
    'proper human anatomy and proportions',
    'avoiding cartoon or illustrated appearance',
    'authentic setting and atmosphere',
    'professional portrait photography standard',
    'natural depth of field with sharp focus'
  ];
  
  return `${description}. ${opts.slice(0, 8).join(', ')}, suitable for professional social media and creative content`;
}

// Create slug
function createSlug(text) {
  return text
    .toLowerCase()
    .replace(/photo ai /gi, '')
    .replace(/ai /gi, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');
}

// Generate TypeScript file
let output = `/**
 * ALL IDEAS CATEGORIES - Complete data from IDEAS page
 * Auto-generated from ideasData.ts
 * 
 * Total categories: ${categories.length}
 * Total ideas: ${ideas.length}
 * Generated: ${new Date().toISOString()}
 */

export interface PromptTemplate {
  title: string;
  text: string;
  style?: string;
}

export interface CategoryData {
  id: string;
  name: string;
  slug: string;
  prompts: PromptTemplate[];
}

export const allIdeasCategories: CategoryData[] = [\n`;

// Generate categories
let totalPrompts = 0;

categories.forEach((categoryName, catIdx) => {
  const categoryIdeas = ideasByCategory[categoryName] || [];
  if (categoryIdeas.length === 0) return;
  
  const slug = createSlug(categoryName);
  
  output += `  // ${categoryName.toUpperCase()} (${categoryIdeas.length} ideas)\n`;
  output += `  {\n`;
  output += `    id: "${slug}",\n`;
  output += `    name: "${categoryName}",\n`;
  output += `    slug: "${slug}",\n`;
  output += `    prompts: [\n`;
  
  categoryIdeas.forEach((idea, ideaIdx) => {
    const title = idea.title.replace(/Photo AI /gi, '').replace(/AI /gi, '');
    const prompt = generateFluxPrompt(idea.description);
    
    output += `      {\n`;
    output += `        title: "${title}",\n`;
    output += `        text: "${prompt.replace(/"/g, '\\"')}",\n`;
    output += `        style: "professional"\n`;
    output += `      }${ideaIdx < categoryIdeas.length - 1 ? ',' : ''}\n`;
    
    totalPrompts++;
  });
  
  output += `    ]\n`;
  output += `  }${catIdx < categories.length - 1 ? ',' : ''}\n`;
});

output += `];\n\n`;
output += `export const TOTAL_CATEGORIES = ${categories.length};\n`;
output += `export const TOTAL_PROMPTS = ${totalPrompts};\n\n`;
output += `export function getCategoryData(slug: string): CategoryData | undefined {\n`;
output += `  return allIdeasCategories.find(cat => cat.slug === slug || cat.id === slug);\n`;
output += `}\n\n`;
output += `export function getAllCategoryIds(): string[] {\n`;
output += `  return allIdeasCategories.map(cat => cat.id);\n`;
output += `}\n`;

// Write output
const outputPath = join(__dirname, '../lib/data/allIdeasCategories.ts');
writeFileSync(outputPath, output, 'utf8');

console.log(`\n✅ Generated: lib/data/allIdeasCategories.ts`);
console.log(`   Categories: ${categories.length}`);
console.log(`   Total prompts: ${totalPrompts}\n`);
console.log(`🎯 Next steps:`);
console.log(`   1. Update /app/api/admin/categories/route.ts to import allIdeasCategories`);
console.log(`   2. Restart server`);
console.log(`   3. Test admin UI\n`);
