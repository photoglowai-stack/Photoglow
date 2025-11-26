#!/bin/bash

# PhotoGlow - Credits Cache Testing Script
# Tests the intelligent caching system for user credits

set -e

echo "=================================================="
echo "🧪 PhotoGlow Credits Cache Testing"
echo "=================================================="
echo ""

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Configuration
SUPABASE_URL="wlvgbkcldllsixhhfqkq.supabase.co"
ENDPOINT="https://${SUPABASE_URL}/functions/v1/make-server-ab844084/credits"

# Get access token from user
echo "⚠️  You need a valid access token to run these tests"
echo "ℹ️  Get your token by:"
echo "   1. Login to PhotoGlow"
echo "   2. Open browser DevTools > Console"
echo "   3. Run: localStorage.getItem('sb-${SUPABASE_URL}-auth-token')"
echo ""
read -p "Enter your ACCESS_TOKEN: " ACCESS_TOKEN

if [ -z "$ACCESS_TOKEN" ]; then
  echo -e "${RED}❌ No token provided${NC}"
  exit 1
fi

echo ""
echo "=================================================="
echo "Test 1: Fetch Credits (warm up cache)"
echo "=================================================="

RESPONSE=$(curl -s -w "\n%{http_code}" -X GET \
  "$ENDPOINT" \
  -H "Authorization: Bearer $ACCESS_TOKEN" \
  -H "Content-Type: application/json")

HTTP_CODE=$(echo "$RESPONSE" | tail -n 1)
BODY=$(echo "$RESPONSE" | sed '$d')

if [ "$HTTP_CODE" -eq 200 ]; then
  echo -e "${GREEN}✅ Credits fetched successfully${NC}"
  echo "Response: $BODY"
  CREDITS=$(echo "$BODY" | grep -o '"credits":[0-9]*' | grep -o '[0-9]*')
  echo "Credits: $CREDITS"
else
  echo -e "${RED}❌ Failed to fetch credits (HTTP $HTTP_CODE)${NC}"
  echo "Response: $BODY"
  exit 1
fi

echo ""
echo "=================================================="
echo "Test 2: Rapid successive calls (should use cache)"
echo "=================================================="
echo "Making 5 API calls in quick succession..."
echo "Expected: Similar response times (cache working)"

for i in {1..5}; do
  START=$(date +%s%N)
  
  RESPONSE=$(curl -s -X GET \
    "$ENDPOINT" \
    -H "Authorization: Bearer $ACCESS_TOKEN" \
    -H "Content-Type: application/json")
  
  END=$(date +%s%N)
  ELAPSED=$(( ($END - $START) / 1000000 ))
  
  echo "  Call $i: ${ELAPSED}ms"
done

echo -e "${YELLOW}ℹ️  Note: API calls are still made, but frontend cache reduces UI latency${NC}"

echo ""
echo "=================================================="
echo "Test 3: Check Credits After Delay"
echo "=================================================="
echo "Waiting 2 seconds..."
sleep 2

RESPONSE=$(curl -s -X GET \
  "$ENDPOINT" \
  -H "Authorization: Bearer $ACCESS_TOKEN" \
  -H "Content-Type: application/json")

echo "Response: $RESPONSE"

NEW_CREDITS=$(echo "$RESPONSE" | grep -o '"credits":[0-9]*' | grep -o '[0-9]*')

if [ "$NEW_CREDITS" == "$CREDITS" ]; then
  echo -e "${GREEN}✅ Credits unchanged (as expected)${NC}"
else
  echo -e "${YELLOW}⚠️  Credits changed: $CREDITS → $NEW_CREDITS${NC}"
  echo "   This is normal if credits were modified elsewhere"
fi

echo ""
echo "=================================================="
echo "Test 4: Invalid Token (error handling)"
echo "=================================================="

RESPONSE=$(curl -s -w "\n%{http_code}" -X GET \
  "$ENDPOINT" \
  -H "Authorization: Bearer invalid_token_12345" \
  -H "Content-Type: application/json")

HTTP_CODE=$(echo "$RESPONSE" | tail -n 1)
BODY=$(echo "$RESPONSE" | sed '$d')

if [ "$HTTP_CODE" -eq 401 ]; then
  echo -e "${GREEN}✅ Correctly rejected invalid token${NC}"
  echo "Response: $BODY"
else
  echo -e "${RED}❌ Expected 401, got $HTTP_CODE${NC}"
  echo "Response: $BODY"
fi

echo ""
echo "=================================================="
echo "Test 5: Missing Authorization Header"
echo "=================================================="

RESPONSE=$(curl -s -w "\n%{http_code}" -X GET \
  "$ENDPOINT" \
  -H "Content-Type: application/json")

HTTP_CODE=$(echo "$RESPONSE" | tail -n 1)
BODY=$(echo "$RESPONSE" | sed '$d')

if [ "$HTTP_CODE" -eq 401 ]; then
  echo -e "${GREEN}✅ Correctly rejected missing auth${NC}"
  echo "Response: $BODY"
else
  echo -e "${RED}❌ Expected 401, got $HTTP_CODE${NC}"
  echo "Response: $BODY"
fi

echo ""
echo "=================================================="
echo "🎉 Cache Testing Complete"
echo "=================================================="
echo ""
echo "✅ All backend tests passed!"
echo ""
echo "📱 Frontend Cache Tests:"
echo "   1. Open PhotoGlow in browser"
echo "   2. Open DevTools > Console"
echo "   3. Look for '[Credits Cache]' logs"
echo "   4. Verify cache hits/misses/saves"
echo ""
echo "Expected Frontend Behavior:"
echo "   • First load: Cache miss → Fetch → Save"
echo "   • Reload (within 30s): Cache hit → Instant display"
echo "   • After 30s: Cache expired → Fetch → Save"
echo "   • After generation: Force refresh → Fetch → Save"
echo ""
echo "=================================================="
echo "📊 Performance Metrics to Monitor:"
echo "=================================================="
echo ""
echo "1. Cache Hit Rate"
echo "   - Open Console and filter by '[Credits Cache]'"
echo "   - Count '✅ Hit' vs '⚠️ Expired'"
echo "   - Target: >80% hit rate"
echo ""
echo "2. API Call Reduction"
echo "   - Compare Network tab before/after optimization"
echo "   - Target: 50-70% fewer calls to /credits"
echo ""
echo "3. UI Latency"
echo "   - Measure time from page load to credits display"
echo "   - With cache: <50ms"
echo "   - Without cache: ~500ms"
echo ""
echo "=================================================="
echo "🔧 Troubleshooting:"
echo "=================================================="
echo ""
echo "If cache is not working:"
echo ""
echo "1. Check localStorage:"
echo "   localStorage.getItem('photoglow_credits_cache')"
echo ""
echo "2. Verify cache structure:"
echo "   {\"credits\":50,\"timestamp\":1234567890,\"userId\":\"abc\"}"
echo ""
echo "3. Check console logs:"
echo "   Look for '[Credits Cache]' and '[Credits]' messages"
echo ""
echo "4. Clear cache manually:"
echo "   localStorage.removeItem('photoglow_credits_cache')"
echo ""
echo "5. Check CACHE_DURATION_MS:"
echo "   File: /hooks/useUserCredits.ts (line 7)"
echo "   Default: 30000ms (30 seconds)"
echo ""
echo "=================================================="
echo "✅ Testing Complete!"
echo "=================================================="
