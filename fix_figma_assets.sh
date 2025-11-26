#!/bin/bash

# Script pour remplacer TOUS les imports figma:asset par des chemins relatifs vers src/assets/

echo "🔧 Correction des imports Figma assets..."

# Corrections pour tous les fichiers
find src -name "*.tsx" -type f -exec sed -i '' \
  -e "s|from 'figma:asset/\(.*\)\.png'|from '../../assets/\1.png'|g" \
  -e "s|from 'figma:asset/\(.*\)\.gif'|from '../../assets/\1.gif'|g" \
  -e "s|src=\"figma:asset/\(.*\)\.png\"|src=\"/src/assets/\1.png\"|g" \
  {} \;

echo "✅ Imports Figma corrigés !"
