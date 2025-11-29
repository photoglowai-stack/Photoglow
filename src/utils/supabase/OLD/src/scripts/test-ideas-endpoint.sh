#!/bin/bash

# Test script for /ideas/generate endpoint
# Usage: ./test-ideas-endpoint.sh

echo "🧪 Testing /ideas/generate endpoint..."
echo ""

# Read project ID and key from utils/supabase/info.tsx
# You should replace these with your actual values
PROJECT_ID="YOUR_PROJECT_ID"
ANON_KEY="YOUR_ANON_KEY"

if [ "$PROJECT_ID" = "YOUR_PROJECT_ID" ]; then
  echo "❌ Please edit this script and set your PROJECT_ID and ANON_KEY"
  exit 1
fi

URL="https://${PROJECT_ID}.supabase.co/functions/v1/make-server-ab844084/ideas/generate"

echo "📍 Testing endpoint: $URL"
echo ""

# Test payload
PAYLOAD='{
  "slug": "test-halloween-123",
  "category_id": "halloween",
  "prompt_title": "Test Halloween Portrait",
  "prompt_text": "Professional halloween portrait featuring person in creative spooky costume, cinematic film aesthetic with rich shadows and dramatic lighting",
  "aspect_ratio": "4:5",
  "prompt_index": 99,
  "style": "test",
  "collection": "test",
  "persist": false
}'

echo "📦 Payload:"
echo "$PAYLOAD" | jq .
echo ""

echo "📤 Sending request..."
echo ""

# Make request
RESPONSE=$(curl -s -w "\n%{http_code}" -X POST "$URL" \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer $ANON_KEY" \
  -H "idempotency-key: test-$(date +%s)" \
  -d "$PAYLOAD")

# Extract status code and body
HTTP_CODE=$(echo "$RESPONSE" | tail -n 1)
BODY=$(echo "$RESPONSE" | sed '$d')

echo "📥 Response (HTTP $HTTP_CODE):"
echo "$BODY" | jq .
echo ""

# Check status
if [ "$HTTP_CODE" = "200" ]; then
  echo "✅ SUCCESS! Endpoint is working."
  IMAGE_URL=$(echo "$BODY" | jq -r '.image_url')
  if [ "$IMAGE_URL" != "null" ]; then
    echo "🖼️  Image URL: $IMAGE_URL"
  fi
elif [ "$HTTP_CODE" = "404" ]; then
  echo "❌ FAILED: Endpoint not found (404)"
  echo "   → Deploy the server: cd supabase/functions && supabase functions deploy server"
elif [ "$HTTP_CODE" = "401" ]; then
  echo "❌ FAILED: Unauthorized (401)"
  echo "   → Check your ANON_KEY in this script"
elif [ "$HTTP_CODE" = "400" ]; then
  echo "❌ FAILED: Bad Request (400)"
  echo "   → Check the error message above"
else
  echo "❌ FAILED: HTTP $HTTP_CODE"
  echo "   → Check the error message above"
fi
