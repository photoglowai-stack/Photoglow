/**
 * Generate ALL IDEAS prompts from ideasData.ts
 * Creates complete allCategoriesData with ALL 100+ ideas from the IDEAS page
 * 
 * Run with: npx tsx scripts/generate-all-ideas-prompts.ts
 */

import { photoIdeas, categories } from '../components/ideasData';
import * as fs from 'fs';
import * as path from 'path';

// Generate optimized FLUX prompt from idea description
function generateFluxPrompt(idea: { title: string; description: string; category: string }): string {
  const basePrompt = idea.description;
  
  // Add FLUX optimization keywords
  const fluxOptimizations = [
    'photorealistic portrait',
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
    'natural depth of field',
    'crisp detail and sharp focus'
  ];
  
  return `${basePrompt}. ${fluxOptimizations.slice(0, 8).join(', ')}, suitable for professional social media and creative content`;
}

// Create slug from title
function createSlug(title: string): string {
  return title
    .toLowerCase()
    .replace(/photo ai /gi, '')
    .replace(/ai /gi, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');
}

// Group ideas by category
const ideasByCategory = photoIdeas.reduce((acc, idea) => {
  if (!acc[idea.category]) {
    acc[idea.category] = [];
  }
  acc[idea.category].push(idea);
  return acc;
}, {} as Record<string, typeof photoIdeas>);

console.log(`\n📊 Found ${photoIdeas.length} ideas across ${categories.length - 1} categories\n`);

categories.forEach(cat => {
  if (cat !== 'All') {
    const count = ideasByCategory[cat]?.length || 0;
    console.log(`   ${cat}: ${count} ideas`);
  }
});

// Generate TypeScript file content
let output = `/**
 * ALL IDEAS - Complete categories data from IDEAS page
 * Auto-generated from ideasData.ts
 * Total: ${photoIdeas.length} ideas across ${categories.length - 1} categories
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

categories.forEach((categoryName, idx) => {
  if (categoryName === 'All') return;
  
  const ideas = ideasByCategory[categoryName] || [];
  if (ideas.length === 0) return;
  
  const categorySlug = createSlug(categoryName);
  const categoryId = categorySlug;
  
  output += `  {\n`;
  output += `    id: "${categoryId}",\n`;
  output += `    name: "${categoryName}",\n`;
  output += `    slug: "${categorySlug}",\n`;
  output += `    prompts: [\n`;
  
  ideas.forEach((idea, ideaIdx) => {
    const slug = createSlug(idea.title);
    const prompt = generateFluxPrompt(idea);
    
    output += `      {\n`;
    output += `        title: "${idea.title.replace(/Photo AI /gi, '')}",\n`;
    output += `        text: "${prompt.replace(/"/g, '\\"')}",\n`;
    output += `        style: "professional"\n`;
    output += `      }${ideaIdx < ideas.length - 1 ? ',' : ''}\n`;
    
    totalPrompts++;
  });
  
  output += `    ]\n`;
  output += `  }${idx < categories.length - 2 ? ',' : ''}\n`;
});

output += `];\n\n`;
output += `export const TOTAL_CATEGORIES = ${categories.length - 1};\n`;
output += `export const TOTAL_PROMPTS = ${totalPrompts};\n\n`;
output += `export function getCategoryData(slug: string): CategoryData | undefined {\n`;
output += `  return allIdeasCategories.find(cat => cat.slug === slug || cat.id === slug);\n`;
output += `}\n\n`;
output += `export function getAllCategoryIds(): string[] {\n`;
output += `  return allIdeasCategories.map(cat => cat.id);\n`;
output += `}\n`;

// Write to file
const outputPath = path.join(__dirname, '../lib/data/allIdeasCategories.ts');
fs.writeFileSync(outputPath, output, 'utf8');

console.log(`\n✅ Generated: ${outputPath}`);
console.log(`   Categories: ${categories.length - 1}`);
console.log(`   Total prompts: ${totalPrompts}`);
console.log(`\n🎯 Next steps:`);
console.log(`   1. Update /app/api/admin/categories/route.ts to use allIdeasCategories`);
console.log(`   2. Restart server: npm run dev`);
console.log(`   3. Test: http://localhost:3000/#admin-generate-categories\n`);
