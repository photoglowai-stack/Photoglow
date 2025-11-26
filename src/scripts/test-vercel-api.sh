#!/bin/bash

# Script de test de l'API Vercel

API_URL="https://image-generator-api-chi.vercel.app/v1/ideas/generate"

echo "🧪 TEST DE L'API VERCEL"
echo "========================================"
echo ""

# Test 1: Debug endpoint
echo "Test 1: Vérification de la configuration"
echo "-------------------------------------------"
curl -s "${API_URL}?debug=1" | jq '.'
echo ""
echo ""

# Test 2: Génération d'une image de test
echo "Test 2: Génération d'une image de test"
echo "----------------------------------------"
curl -s -X POST "${API_URL}" \
  -H 'Content-Type: application/json' \
  -H 'Idempotency-Key: 00' \
  -d '{
    "slug":"holidays-events",
    "prompt":"Professional Halloween portrait with spooky costume, atmospheric lighting, and mysterious vibe. Professional photorealistic portrait photography, natural skin texture with visible pores and realistic detail, variant style 00",
    "aspect_ratio":"3:4",
    "width":1536,
    "model":"flux",
    "persist":true
  }' | jq '.'
echo ""
echo ""

echo "✅ Tests terminés"
echo ""
echo "Si tu vois une URL d'image, l'API fonctionne ! 🎉"
echo "Si tu vois une erreur, vérifie que l'API est déployée."
