#!/bin/bash

echo "🔧 Ultimate import fix - correcting ALL imports globally..."

# Fix category/
find src/components/category -name "*.tsx" -exec sed -i '' \
  -e "s|from './categoryPagesConfig'|from '../categoryPagesConfig'|g" \
  -e 's|from "./categoryPagesConfig"|from "../categoryPagesConfig"|g' \
  -e "s|from './categoryExamplesData'|from '../categoryExamplesData'|g" \
  -e 's|from "./categoryExamplesData"|from "../categoryExamplesData"|g' \
  -e "s|from './CategoryFAQ'|from './FAQ'|g" \
  -e "s|from './CategoryTestimonials'|from './Testimonials'|g" \
  -e "s|from './CategoryShowcase'|from './Showcase'|g" \
  -e "s|from './CategoryHowItWorks'|from './HowItWorks'|g" \
  -e "s|from './BeforeAfterTransformation'|from '../landing/BeforeAfter'|g" \
  {} \;

echo "✅ All imports fixed!"
