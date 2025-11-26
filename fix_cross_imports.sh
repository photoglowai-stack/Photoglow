#!/bin/bash

# Script pour corriger TOUS les imports relatifs

echo "🔧 Correction globale des imports..."

# Corriger figma/ImageWithFallback
find src/components -name "*.tsx" -exec sed -i '' 's|from "./figma/ImageWithFallback"|from "../figma/ImageWithFallback"|g' {} \;

# Corriger les imports entre dossiers
find src/components/category -name "*.tsx" -exec sed -i '' \
  -e 's|from "./SocialProof"|from "../landing/SocialProof"|g' \
  -e 's|from "./FAQ"|from "./FAQ"|g' \
  {} \;

echo "✅ Corrections appliquées!"
