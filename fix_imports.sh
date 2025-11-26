#!/bin/bash

# Script pour corriger TOUS les imports relatifs cassés après la réorganisation

echo "🔧 Correction des imports relatifs..."

# Pour tous les fichiers dans landing/, category/, auth/, etc.
# Remplacer les imports de composants partagés

find src/components/landing -name "*.tsx" -exec sed -i '' \
  -e "s|from './ScrollingMosaic'|from '../shared/ScrollingMosaic'|g" \
  -e "s|from './LazyImage'|from '../shared/LazyImage'|g" \
  -e "s|from './SEOHead'|from '../shared/SEOHead'|g" \
  -e "s|from './AnimatedDiv'|from '../shared/AnimatedDiv'|g" \
  -e "s|from './LoadingSkeleton'|from '../shared/LoadingSkeleton'|g" \
  {} \;

find src/components/category -name "*.tsx" -exec sed -i '' \
  -e "s|from './ScrollingMosaic'|from '../shared/ScrollingMosaic'|g" \
  -e "s|from './LazyImage'|from '../shared/LazyImage'|g" \
  -e "s|from './SEOHead'|from '../shared/SEOHead'|g" \
  -e "s|from './AnimatedDiv'|from '../shared/AnimatedDiv'|g" \
  -e "s|from './LoadingSkeleton'|from '../shared/LoadingSkeleton'|g" \
  -e "s|from './Header'|from '../shared/Header'|g" \
  -e "s|from './Footer'|from '../shared/Footer'|g" \
  {} \;

find src/components/auth -name "*.tsx" -exec sed -i '' \
  -e "s|from './ScrollingMosaic'|from '../shared/ScrollingMosaic'|g" \
  -e "s|from './LazyImage'|from '../shared/LazyImage'|g" \
  {} \;

find src/components/admin -name "*.tsx" -exec sed -i '' \
  -e "s|from './ScrollingMosaic'|from '../shared/ScrollingMosaic'|g" \
  -e "s|from './LazyImage'|from '../shared/LazyImage'|g" \
  {} \;

find src/components/generator -name "*.tsx" -exec sed -i '' \
  -e "s|from './ScrollingMosaic'|from '../shared/ScrollingMosaic'|g" \
  -e "s|from './LazyImage'|from '../shared/LazyImage'|g" \
  {} \;

find src/components/payment -name "*.tsx" -exec sed -i '' \
  -e "s|from './ScrollingMosaic'|from '../shared/ScrollingMosaic'|g" \
  -e "s|from './LazyImage'|from '../shared/LazyImage'|g" \
  {} \;

find src/components/pages -name "*.tsx" -exec sed -i '' \
  -e "s|from './ScrollingMosaic'|from '../shared/ScrollingMosaic'|g" \
  -e "s|from './LazyImage'|from '../shared/LazyImage'|g" \
  {} \;

find src/components/gallery -name "*.tsx" -exec sed -i '' \
  -e "s|from './ScrollingMosaic'|from '../shared/ScrollingMosaic'|g" \
  -e "s|from './LazyImage'|from '../shared/LazyImage'|g" \
  {} \;

echo "✅ Imports corrigés !"
