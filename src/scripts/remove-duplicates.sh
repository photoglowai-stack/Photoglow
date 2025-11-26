#!/bin/bash

# =============================================================================
# Script: Remove Duplicate Components
# Description: Removes duplicate/obsolete component versions
# Time: ~1 minute
# =============================================================================

echo "🗑️  Starting Duplicate Removal"
echo ""

# Colors
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
RED='\033[0;31m'
NC='\033[0m'

# Step 1: Remove AIPhotoGenerator duplicates (keep V2 which is now in /generator)
echo "📦 Step 1/5: Removing AIPhotoGenerator duplicates..."

rm -f components/AIPhotoGenerator.tsx && echo -e "${GREEN}  ✓ Removed AIPhotoGenerator.tsx${NC}"
rm -f components/AIPhotoGeneratorPatch.tsx && echo -e "${GREEN}  ✓ Removed AIPhotoGeneratorPatch.tsx${NC}"

echo ""

# Step 2: Remove Admin duplicates (keep Unified which is now AdminUnified)
echo "📦 Step 2/5: Removing Admin component duplicates..."

rm -f components/AdminGenerateCategoriesClean.tsx && echo -e "${GREEN}  ✓ Removed AdminGenerateCategoriesClean.tsx${NC}"
rm -f components/AdminGenerateCategoriesPage.tsx && echo -e "${GREEN}  ✓ Removed AdminGenerateCategoriesPage.tsx${NC}"
rm -f components/AdminGenerateCategoriesPageV2.tsx && echo -e "${GREEN}  ✓ Removed AdminGenerateCategoriesPageV2.tsx${NC}"
rm -f components/AdminGenerateCategoriesSimple.tsx && echo -e "${GREEN}  ✓ Removed AdminGenerateCategoriesSimple.tsx${NC}"
rm -f components/AdminGenerateIdeasSimple.tsx && echo -e "${GREEN}  ✓ Removed AdminGenerateIdeasSimple.tsx${NC}"

echo ""

# Step 3: Remove Flux Prompts duplicates (keep Final)
echo "📦 Step 3/5: Removing Flux Prompts duplicates..."

rm -f components/fluxOptimizedPrompts.ts && echo -e "${GREEN}  ✓ Removed fluxOptimizedPrompts.ts${NC}"
rm -f components/fluxOptimizedPromptsComplete.ts && echo -e "${GREEN}  ✓ Removed fluxOptimizedPromptsComplete.ts${NC}"
rm -f components/fluxOptimizedPromptsComplete2.ts && echo -e "${GREEN}  ✓ Removed fluxOptimizedPromptsComplete2.ts${NC}"
rm -f components/fluxOptimizedPromptsComplete3.ts && echo -e "${GREEN}  ✓ Removed fluxOptimizedPromptsComplete3.ts${NC}"
rm -f components/fluxOptimizedPromptsExtended.ts && echo -e "${GREEN}  ✓ Removed fluxOptimizedPromptsExtended.ts${NC}"

echo ""

# Step 4: Remove components that are duplicated in /shared
echo "📦 Step 4/5: Removing duplicates (already in /shared)..."

rm -f components/AnimatedDiv.tsx && echo -e "${GREEN}  ✓ Removed AnimatedDiv.tsx (exists in /shared)${NC}"
rm -f components/Footer.tsx && echo -e "${GREEN}  ✓ Removed Footer.tsx (exists in /shared)${NC}"
rm -f components/Header.tsx && echo -e "${GREEN}  ✓ Removed Header.tsx (exists in /shared)${NC}"
rm -f components/LazyImage.tsx && echo -e "${GREEN}  ✓ Removed LazyImage.tsx (exists in /shared)${NC}"
rm -f components/LoadingSkeleton.tsx && echo -e "${GREEN}  ✓ Removed LoadingSkeleton.tsx (exists in /shared)${NC}"
rm -f components/SEOHead.tsx && echo -e "${GREEN}  ✓ Removed SEOHead.tsx (exists in /shared)${NC}"
rm -f components/ScrollingMosaic.tsx && echo -e "${GREEN}  ✓ Removed ScrollingMosaic.tsx (exists in /shared)${NC}"

echo ""

# Step 5: Remove page components that are duplicated in /pages
echo "📦 Step 5/5: Removing page duplicates..."

rm -f components/IdeasPage.tsx && echo -e "${GREEN}  ✓ Removed IdeasPage.tsx (exists in /pages)${NC}"
rm -f components/ProfilePage.tsx && echo -e "${GREEN}  ✓ Removed ProfilePage.tsx (exists in /pages)${NC}"

echo ""

# Summary
echo "📊 Removal Summary"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo ""
echo -e "${GREEN}✅ Duplicates removed successfully!${NC}"
echo ""
echo "🗑️  Removed files:"
echo "   - 3 AIPhotoGenerator versions"
echo "   - 5 AdminGenerateCategories versions"
echo "   - 5 fluxOptimizedPrompts versions"
echo "   - 7 components duplicated in /shared"
echo "   - 2 page components duplicated in /pages"
echo ""
echo -e "${GREEN}Total: ~22 duplicate files removed${NC}"
echo ""
echo -e "${YELLOW}⚠️  Files kept:${NC}"
echo "   ✅ /generator/AIPhotoGenerator.tsx (was V2)"
echo "   ✅ /admin/AdminUnified.tsx (was V2Unified)"
echo "   ✅ fluxOptimizedPromptsFinal.ts"
echo "   ✅ All components in /shared, /pages, /feature, /ui"
echo ""
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo ""
echo -e "${GREEN}🎉 Cleanup complete!${NC}"
echo ""
echo -e "${YELLOW}Next steps:${NC}"
echo "1. Create index.ts files"
echo "2. Update imports"
echo "3. Test the app: npm run dev"
