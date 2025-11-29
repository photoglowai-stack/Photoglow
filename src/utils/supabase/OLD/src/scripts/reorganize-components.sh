#!/bin/bash

# =============================================================================
# Script: Reorganize Components
# Description: Organizes 70+ components into logical subdirectories
# Time: ~5 minutes
# =============================================================================

echo "🚀 Starting Component Reorganization"
echo ""

# Colors
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
RED='\033[0;31m'
BLUE='\033[0;34m'
NC='\033[0m'

# Step 1: Create new structure
echo "📁 Step 1/8: Creating new component directories..."

mkdir -p components/admin
mkdir -p components/category
mkdir -p components/generator
mkdir -p components/payment
mkdir -p components/gallery
mkdir -p components/landing
mkdir -p components/auth

echo -e "${GREEN}✅ Directories created${NC}"
echo ""

# Step 2: Move Admin components
echo "📦 Step 2/8: Moving Admin components..."

mv components/AdminConsole.tsx components/admin/ 2>/dev/null && echo -e "${GREEN}  ✓ AdminConsole.tsx${NC}"
mv components/AdminGenerateTab.tsx components/admin/ 2>/dev/null && echo -e "${GREEN}  ✓ AdminGenerateTab.tsx${NC}"
mv components/HealthCheckPanel.tsx components/admin/ 2>/dev/null && echo -e "${GREEN}  ✓ HealthCheckPanel.tsx${NC}"
mv components/SystemHealthPanel.tsx components/admin/ 2>/dev/null && echo -e "${GREEN}  ✓ SystemHealthPanel.tsx${NC}"
mv components/CreditsDashboard.tsx components/admin/ 2>/dev/null && echo -e "${GREEN}  ✓ CreditsDashboard.tsx${NC}"

# Rename V2Unified to AdminUnified
if [ -f "components/AdminV2Unified.tsx" ]; then
  mv components/AdminV2Unified.tsx components/admin/AdminUnified.tsx
  echo -e "${GREEN}  ✓ AdminV2Unified.tsx → AdminUnified.tsx${NC}"
fi

echo ""

# Step 3: Move Category components
echo "📦 Step 3/8: Moving Category components..."

mv components/CategoryPage.tsx components/category/ 2>/dev/null && echo -e "${GREEN}  ✓ CategoryPage.tsx${NC}"
mv components/CategoryFAQ.tsx components/category/FAQ.tsx 2>/dev/null && echo -e "${GREEN}  ✓ CategoryFAQ.tsx → FAQ.tsx${NC}"
mv components/CategoryHowItWorks.tsx components/category/HowItWorks.tsx 2>/dev/null && echo -e "${GREEN}  ✓ CategoryHowItWorks.tsx → HowItWorks.tsx${NC}"
mv components/CategoryTestimonials.tsx components/category/Testimonials.tsx 2>/dev/null && echo -e "${GREEN}  ✓ CategoryTestimonials.tsx → Testimonials.tsx${NC}"
mv components/CategoryShowcase.tsx components/category/Showcase.tsx 2>/dev/null && echo -e "${GREEN}  ✓ CategoryShowcase.tsx → Showcase.tsx${NC}"
mv components/CategoryExamplesPage.tsx components/category/Examples.tsx 2>/dev/null && echo -e "${GREEN}  ✓ CategoryExamplesPage.tsx → Examples.tsx${NC}"
mv components/CategoryPhotosCarousel.tsx components/category/PhotosCarousel.tsx 2>/dev/null && echo -e "${GREEN}  ✓ CategoryPhotosCarousel.tsx → PhotosCarousel.tsx${NC}"
mv components/CategoryUniversalPage.tsx components/category/Universal.tsx 2>/dev/null && echo -e "${GREEN}  ✓ CategoryUniversalPage.tsx → Universal.tsx${NC}"
mv components/UniversalCategoryPage.tsx components/category/UniversalAlt.tsx 2>/dev/null && echo -e "${GREEN}  ✓ UniversalCategoryPage.tsx → UniversalAlt.tsx${NC}"
mv components/SimpleCategoryHero.tsx components/category/SimpleHero.tsx 2>/dev/null && echo -e "${GREEN}  ✓ SimpleCategoryHero.tsx → SimpleHero.tsx${NC}"
mv components/SuggestedCategories.tsx components/category/Suggested.tsx 2>/dev/null && echo -e "${GREEN}  ✓ SuggestedCategories.tsx → Suggested.tsx${NC}"
mv components/CategoryPageHeader.tsx components/category/Header.tsx 2>/dev/null && echo -e "${GREEN}  ✓ CategoryPageHeader.tsx → Header.tsx${NC}"

echo ""

# Step 4: Move Generator components
echo "📦 Step 4/8: Moving Generator components..."

# Rename V2 to main
if [ -f "components/AIPhotoGeneratorV2.tsx" ]; then
  mv components/AIPhotoGeneratorV2.tsx components/generator/AIPhotoGenerator.tsx
  echo -e "${GREEN}  ✓ AIPhotoGeneratorV2.tsx → AIPhotoGenerator.tsx${NC}"
fi

mv components/Gen4Panel.tsx components/generator/ 2>/dev/null && echo -e "${GREEN}  ✓ Gen4Panel.tsx${NC}"
mv components/CreateAIModelTab.tsx components/generator/CreateModel.tsx 2>/dev/null && echo -e "${GREEN}  ✓ CreateAIModelTab.tsx → CreateModel.tsx${NC}"
mv components/PreviewAIModelTab.tsx components/generator/PreviewModel.tsx 2>/dev/null && echo -e "${GREEN}  ✓ PreviewAIModelTab.tsx → PreviewModel.tsx${NC}"
mv components/GenerateJobsTab.tsx components/generator/JobsTab.tsx 2>/dev/null && echo -e "${GREEN}  ✓ GenerateJobsTab.tsx → JobsTab.tsx${NC}"
mv components/ExploreAIModelsPage.tsx components/generator/ExploreModels.tsx 2>/dev/null && echo -e "${GREEN}  ✓ ExploreAIModelsPage.tsx → ExploreModels.tsx${NC}"
mv components/ExploreAIStyles.tsx components/generator/ExploreStyles.tsx 2>/dev/null && echo -e "${GREEN}  ✓ ExploreAIStyles.tsx → ExploreStyles.tsx${NC}"
mv components/AIStylesSection.tsx components/generator/StylesSection.tsx 2>/dev/null && echo -e "${GREEN}  ✓ AIStylesSection.tsx → StylesSection.tsx${NC}"

echo ""

# Step 5: Move Payment components
echo "📦 Step 5/8: Moving Payment components..."

mv components/PhotoGlowPricing.tsx components/payment/Pricing.tsx 2>/dev/null && echo -e "${GREEN}  ✓ PhotoGlowPricing.tsx → Pricing.tsx${NC}"
mv components/FigmaStylePaymentPage.tsx components/payment/FigmaStyle.tsx 2>/dev/null && echo -e "${GREEN}  ✓ FigmaStylePaymentPage.tsx → FigmaStyle.tsx${NC}"
mv components/TinderPaymentPage.tsx components/payment/Tinder.tsx 2>/dev/null && echo -e "${GREEN}  ✓ TinderPaymentPage.tsx → Tinder.tsx${NC}"

echo ""

# Step 6: Move Gallery components
echo "📦 Step 6/8: Moving Gallery components..."

mv components/UnifiedGallery.tsx components/gallery/Unified.tsx 2>/dev/null && echo -e "${GREEN}  ✓ UnifiedGallery.tsx → Unified.tsx${NC}"
mv components/VirtualGallery.tsx components/gallery/Virtual.tsx 2>/dev/null && echo -e "${GREEN}  ✓ VirtualGallery.tsx → Virtual.tsx${NC}"
mv components/VideosGalleryPage.tsx components/gallery/Videos.tsx 2>/dev/null && echo -e "${GREEN}  ✓ VideosGalleryPage.tsx → Videos.tsx${NC}"
mv components/PhotoDetailPage.tsx components/gallery/PhotoDetail.tsx 2>/dev/null && echo -e "${GREEN}  ✓ PhotoDetailPage.tsx → PhotoDetail.tsx${NC}"

echo ""

# Step 7: Move Landing components
echo "📦 Step 7/8: Moving Landing components..."

mv components/HeroSection.tsx components/landing/Hero.tsx 2>/dev/null && echo -e "${GREEN}  ✓ HeroSection.tsx → Hero.tsx${NC}"
mv components/BeforeAfterTransformation.tsx components/landing/BeforeAfter.tsx 2>/dev/null && echo -e "${GREEN}  ✓ BeforeAfterTransformation.tsx → BeforeAfter.tsx${NC}"
mv components/PhotoExamples.tsx components/landing/ 2>/dev/null && echo -e "${GREEN}  ✓ PhotoExamples.tsx${NC}"
mv components/ComparisonSection.tsx components/landing/Comparison.tsx 2>/dev/null && echo -e "${GREEN}  ✓ ComparisonSection.tsx → Comparison.tsx${NC}"
mv components/HowItWorks.tsx components/landing/ 2>/dev/null && echo -e "${GREEN}  ✓ HowItWorks.tsx${NC}"
mv components/Features.tsx components/landing/ 2>/dev/null && echo -e "${GREEN}  ✓ Features.tsx${NC}"
mv components/FAQ.tsx components/landing/ 2>/dev/null && echo -e "${GREEN}  ✓ FAQ.tsx${NC}"
mv components/CentralCTA.tsx components/landing/ 2>/dev/null && echo -e "${GREEN}  ✓ CentralCTA.tsx${NC}"
mv components/SocialProof.tsx components/landing/ 2>/dev/null && echo -e "${GREEN}  ✓ SocialProof.tsx${NC}"
mv components/AsSeenOn.tsx components/landing/ 2>/dev/null && echo -e "${GREEN}  ✓ AsSeenOn.tsx${NC}"
mv components/FeaturedIn.tsx components/landing/ 2>/dev/null && echo -e "${GREEN}  ✓ FeaturedIn.tsx${NC}"
mv components/StickyEmailBar.tsx components/landing/ 2>/dev/null && echo -e "${GREEN}  ✓ StickyEmailBar.tsx${NC}"
mv components/InstagramPreview.tsx components/landing/ 2>/dev/null && echo -e "${GREEN}  ✓ InstagramPreview.tsx${NC}"
mv components/HorizontalTransformCarousel.tsx components/landing/HorizontalCarousel.tsx 2>/dev/null && echo -e "${GREEN}  ✓ HorizontalTransformCarousel.tsx → HorizontalCarousel.tsx${NC}"
mv components/OptimizedAnimatedBackground.tsx components/landing/AnimatedBackground.tsx 2>/dev/null && echo -e "${GREEN}  ✓ OptimizedAnimatedBackground.tsx → AnimatedBackground.tsx${NC}"

echo ""

# Step 8: Move Auth components
echo "📦 Step 8/8: Moving Auth components..."

mv components/AuthModal.tsx components/auth/Modal.tsx 2>/dev/null && echo -e "${GREEN}  ✓ AuthModal.tsx → Modal.tsx${NC}"

echo ""

# Summary
echo "📊 Migration Summary"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo ""
echo -e "${GREEN}✅ Components reorganized successfully!${NC}"
echo ""
echo "📁 New structure:"
echo "   /components/admin/         (6 components)"
echo "   /components/category/      (12 components)"
echo "   /components/generator/     (8 components)"
echo "   /components/payment/       (3 components)"
echo "   /components/gallery/       (4 components)"
echo "   /components/landing/       (15 components)"
echo "   /components/auth/          (1 component)"
echo ""
echo -e "${YELLOW}⚠️  NEXT STEPS:${NC}"
echo ""
echo "1. Run the duplicate removal script:"
echo "   ./scripts/remove-duplicates.sh"
echo ""
echo "2. Create index.ts files in each folder"
echo "3. Update all imports in your code"
echo "4. Test the application"
echo ""
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo ""
echo -e "${GREEN}🎉 Reorganization complete!${NC}"
