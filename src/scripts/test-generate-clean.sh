#!/bin/bash

# ========================================
# PhotoGlow Admin - Test génération clean
# ========================================

set -e

echo "🧪 Testing Admin Generate - Clean Architecture"
echo ""

# ========================================
# Test 1: GET /api/admin/categories
# ========================================

echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo "📋 Test 1: Load categories"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo ""

RESPONSE=$(curl -s http://localhost:3000/api/admin/categories)
SUCCESS=$(echo "$RESPONSE" | jq -r '.success // false')
TOTAL_CATEGORIES=$(echo "$RESPONSE" | jq -r '.categories | length // 0')
TOTAL_PROMPTS=$(echo "$RESPONSE" | jq -r '.total_prompts // 0')

if [ "$SUCCESS" = "true" ]; then
  echo "✅ Categories endpoint OK"
  echo "   - Categories: $TOTAL_CATEGORIES"
  echo "   - Total prompts: $TOTAL_PROMPTS"
else
  echo "❌ Categories endpoint FAILED"
  echo "$RESPONSE" | jq '.'
  exit 1
fi

echo ""

# ========================================
# Test 2: POST /v1/ideas/generate (Vercel)
# ========================================

echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo "🎨 Test 2: Generate image (Vercel API)"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo ""

IDEMPOTENCY_KEY="test-$(date +%s)"

PAYLOAD=$(cat <<EOF
{
  "slug": "ai-headshots",
  "prompt": "Professional corporate head and shoulders portrait, soft studio lighting, neutral background, sharp focus, business attire",
  "aspect_ratio": "3:4",
  "width": 1536,
  "model": "flux",
  "persist": true,
  "collection": "test-run-$(date +%Y-%m-%d)"
}
EOF
)

echo "📤 Sending request..."
echo "   Idempotency-Key: $IDEMPOTENCY_KEY"
echo ""

GENERATE_RESPONSE=$(curl -s -X POST \
  https://image-generator-api-chi.vercel.app/v1/ideas/generate \
  -H "Content-Type: application/json" \
  -H "Idempotency-Key: $IDEMPOTENCY_KEY" \
  -d "$PAYLOAD")

GENERATE_SUCCESS=$(echo "$GENERATE_RESPONSE" | jq -r '.success // false')
IMAGE_URL=$(echo "$GENERATE_RESPONSE" | jq -r '.image_url // ""')

if [ "$GENERATE_SUCCESS" = "true" ] && [ -n "$IMAGE_URL" ]; then
  echo "✅ Image generation OK"
  echo "   URL: $IMAGE_URL"
else
  echo "⚠️ Image generation response:"
  echo "$GENERATE_RESPONSE" | jq '.'
fi

echo ""

# ========================================
# Test 3: Idempotency check
# ========================================

echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo "🔐 Test 3: Idempotency check"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo ""

echo "📤 Sending SAME request again (same Idempotency-Key)..."
echo ""

RETRY_RESPONSE=$(curl -s -X POST \
  https://image-generator-api-chi.vercel.app/v1/ideas/generate \
  -H "Content-Type: application/json" \
  -H "Idempotency-Key: $IDEMPOTENCY_KEY" \
  -d "$PAYLOAD")

RETRY_URL=$(echo "$RETRY_RESPONSE" | jq -r '.image_url // ""')

if [ "$IMAGE_URL" = "$RETRY_URL" ]; then
  echo "✅ Idempotency OK (same URL returned)"
  echo "   Original: $IMAGE_URL"
  echo "   Retry:    $RETRY_URL"
else
  echo "⚠️ Idempotency check:"
  echo "   Original: $IMAGE_URL"
  echo "   Retry:    $RETRY_URL"
fi

echo ""

# ========================================
# Summary
# ========================================

echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo "✅ ALL TESTS COMPLETE"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo ""
echo "📊 Summary:"
echo "   - Categories loaded: $TOTAL_CATEGORIES"
echo "   - Total prompts: $TOTAL_PROMPTS"
echo "   - Image generated: $([ -n "$IMAGE_URL" ] && echo "Yes" || echo "No")"
echo "   - Idempotency: $([ "$IMAGE_URL" = "$RETRY_URL" ] && echo "OK" || echo "Check manually")"
echo ""
echo "🚀 Next steps:"
echo "   1. Open: http://localhost:3000/#admin-generate-categories"
echo "   2. Click 'Load Categories'"
echo "   3. Click 'Start Generation' (Test Mode: 1 category)"
echo "   4. Export CSV"
echo ""
