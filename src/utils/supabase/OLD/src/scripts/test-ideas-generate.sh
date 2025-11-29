#!/bin/bash

# Test du endpoint /api/v1/ideas/generate

echo "🧪 TEST ENDPOINT /api/v1/ideas/generate"
echo "========================================"
echo ""

# URL de base (change si besoin)
BASE_URL="http://localhost:3000"

echo "📍 URL: ${BASE_URL}/api/v1/ideas/generate"
echo ""

# Test 1: Sans body (devrait retourner 400)
echo "Test 1: Sans body (400 attendu)"
echo "--------------------------------"
curl -X POST "${BASE_URL}/api/v1/ideas/generate" \
  -H "Content-Type: application/json" \
  -w "\nHTTP Status: %{http_code}\n" \
  2>/dev/null
echo ""
echo ""

# Test 2: Avec payload minimal
echo "Test 2: Avec payload minimal"
echo "-----------------------------"
curl -X POST "${BASE_URL}/api/v1/ideas/generate" \
  -H "Content-Type: application/json" \
  -H "Idempotency-Key: test-$(date +%s)" \
  -d '{
    "slug": "test-category",
    "prompt": "A beautiful sunset over mountains, photorealistic, professional photography",
    "width": 1024,
    "height": 1280,
    "persist": false
  }' \
  -w "\nHTTP Status: %{http_code}\n" \
  2>/dev/null
echo ""
echo ""

echo "✅ Tests terminés"
echo ""
echo "Si tu vois '404', le endpoint n'est pas accessible."
echo "Solutions:"
echo "  1. Redémarre le serveur: npm run dev"
echo "  2. Vérifie que le fichier existe: /app/api/v1/ideas/generate/route.ts"
echo "  3. Vérifie les logs du serveur Next.js"
