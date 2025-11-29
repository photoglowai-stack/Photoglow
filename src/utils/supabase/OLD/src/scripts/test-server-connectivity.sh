#!/bin/bash

# Script de test de connectivité du serveur Supabase
# Usage: ./scripts/test-server-connectivity.sh

echo "🧪 Testing Supabase Server Connectivity"
echo "========================================"
echo ""

# À MODIFIER avec tes vraies valeurs
PROJECT_ID="xhqwfhdkoysnxowaqsbd"
ANON_KEY="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InhocXdmaGRrb3lzbnhvd2Fxc2JkIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzA1NTU0MTksImV4cCI6MjA0NjEzMTQxOX0.S1zPw5xCYD9rPFqFZM-Ny_-QJ9TtmDcR5F6SZw9v4hw"

BASE_URL="https://${PROJECT_ID}.supabase.co/functions/v1/make-server-ab844084"

echo "📍 Base URL: $BASE_URL"
echo ""

# Test 1: Health Check
echo "Test 1: Health Check"
echo "-------------------"
HEALTH_RESPONSE=$(curl -s -w "\nHTTP_CODE:%{http_code}" \
  "${BASE_URL}/health" \
  -H "Authorization: Bearer ${ANON_KEY}")

HTTP_CODE=$(echo "$HEALTH_RESPONSE" | grep HTTP_CODE | cut -d: -f2)
RESPONSE_BODY=$(echo "$HEALTH_RESPONSE" | grep -v HTTP_CODE)

if [ "$HTTP_CODE" = "200" ]; then
  echo "✅ Health check OK"
  echo "Response: $RESPONSE_BODY"
else
  echo "❌ Health check FAILED (HTTP $HTTP_CODE)"
  echo "Response: $RESPONSE_BODY"
fi
echo ""

# Test 2: Ideas Generate Endpoint
echo "Test 2: Ideas Generate Endpoint"
echo "-------------------------------"
IDEAS_RESPONSE=$(curl -s -w "\nHTTP_CODE:%{http_code}" \
  "${BASE_URL}/ideas/generate" \
  -X POST \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer ${ANON_KEY}" \
  -H "idempotency-key: test-script-$(date +%s)" \
  -d '{
    "slug": "test",
    "category_id": "test",
    "style": "realistic",
    "prompt_title": "Test Script",
    "prompt_text": "professional headshot, realistic photography, soft studio lighting, neutral background, accurate skin tones, minimal retouching, crisp micro-contrast, tack sharp focus, lens feel 85mm, fine detail, studio quality, photorealistic",
    "aspect_ratio": "1:1",
    "width": 512,
    "height": 512,
    "persist": false,
    "collection": "test",
    "prompt_index": 0
  }')

HTTP_CODE=$(echo "$IDEAS_RESPONSE" | grep HTTP_CODE | cut -d: -f2)
RESPONSE_BODY=$(echo "$IDEAS_RESPONSE" | grep -v HTTP_CODE)

if [ "$HTTP_CODE" = "200" ]; then
  echo "✅ Ideas endpoint OK"
  echo "Response: $RESPONSE_BODY"
else
  echo "❌ Ideas endpoint FAILED (HTTP $HTTP_CODE)"
  echo "Response: $RESPONSE_BODY"
  echo ""
  echo "⚠️  L'endpoint /ideas/generate n'existe probablement pas encore."
  echo "📝 Action requise: Déployer le serveur Supabase avec la commande:"
  echo "   cd supabase/functions && supabase functions deploy server"
fi
echo ""

# Test 3: Categories Status
echo "Test 3: Categories Status"
echo "------------------------"
STATUS_RESPONSE=$(curl -s -w "\nHTTP_CODE:%{http_code}" \
  "${BASE_URL}/categories/status" \
  -H "Authorization: Bearer ${ANON_KEY}")

HTTP_CODE=$(echo "$STATUS_RESPONSE" | grep HTTP_CODE | cut -d: -f2)
RESPONSE_BODY=$(echo "$STATUS_RESPONSE" | grep -v HTTP_CODE)

if [ "$HTTP_CODE" = "200" ]; then
  echo "✅ Categories status OK"
  echo "Response: $RESPONSE_BODY"
else
  echo "❌ Categories status FAILED (HTTP $HTTP_CODE)"
  echo "Response: $RESPONSE_BODY"
fi
echo ""

echo "========================================"
echo "🏁 Tests terminés"
echo ""
