#!/bin/bash

# =============================================================================
# Script: Migrate API to App Router
# Description: Migrates Pages Router API routes to App Router format
# Time: ~2 minutes
# =============================================================================

echo "🚀 Starting API Migration: Pages Router → App Router"
echo ""

# Colors for output
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
RED='\033[0;31m'
NC='\033[0m' # No Color

# Step 1: Create new App Router structure
echo "📁 Step 1/5: Creating new /app/api structure..."

mkdir -p app/api/credits/debit
mkdir -p app/api/generate-video
mkdir -p app/api/storage-signed-upload
mkdir -p app/api/webhook

echo -e "${GREEN}✅ Directories created${NC}"
echo ""

# Step 2: Check if old /api directory exists
echo "🔍 Step 2/5: Checking old /api directory..."

if [ ! -d "api" ]; then
  echo -e "${RED}❌ /api directory not found!${NC}"
  echo "Nothing to migrate."
  exit 1
fi

echo -e "${GREEN}✅ Old /api directory found${NC}"
echo ""

# Step 3: Move files (we'll rename them to route.ts manually after)
echo "📦 Step 3/5: Moving API files..."

# Credits
if [ -f "api/credits.ts" ]; then
  cp api/credits.ts app/api/credits/route.ts
  echo -e "${GREEN}  ✓ credits.ts → app/api/credits/route.ts${NC}"
fi

# Credits debit
if [ -f "api/credits/debit.ts" ]; then
  cp api/credits/debit.ts app/api/credits/debit/route.ts
  echo -e "${GREEN}  ✓ credits/debit.ts → app/api/credits/debit/route.ts${NC}"
fi

# Generate video
if [ -f "api/generate-video.ts" ]; then
  cp api/generate-video.ts app/api/generate-video/route.ts
  echo -e "${GREEN}  ✓ generate-video.ts → app/api/generate-video/route.ts${NC}"
fi

# Storage signed upload
if [ -f "api/storage-signed-upload.ts" ]; then
  cp api/storage-signed-upload.ts app/api/storage-signed-upload/route.ts
  echo -e "${GREEN}  ✓ storage-signed-upload.ts → app/api/storage-signed-upload/route.ts${NC}"
fi

# Webhook
if [ -f "api/webhook.ts" ]; then
  cp api/webhook.ts app/api/webhook/route.ts
  echo -e "${GREEN}  ✓ webhook.ts → app/api/webhook/route.ts${NC}"
fi

echo ""

# Step 4: Backup old /api directory
echo "💾 Step 4/5: Backing up old /api directory..."

if [ -d "api" ]; then
  mv api api.backup
  echo -e "${GREEN}✅ Old /api backed up to /api.backup${NC}"
  echo -e "${YELLOW}⚠️  You can delete /api.backup after verifying everything works${NC}"
fi

echo ""

# Step 5: Summary
echo "📊 Step 5/5: Migration Summary"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo ""
echo -e "${GREEN}✅ API files migrated successfully!${NC}"
echo ""
echo "📁 New structure:"
echo "   /app/api/credits/route.ts"
echo "   /app/api/credits/debit/route.ts"
echo "   /app/api/generate-video/route.ts"
echo "   /app/api/storage-signed-upload/route.ts"
echo "   /app/api/webhook/route.ts"
echo ""
echo "⚠️  MANUAL STEPS REQUIRED:"
echo ""
echo "1. Update each route.ts file:"
echo "   ❌ export default async function handler(req: Request)"
echo "   ✅ export async function GET(request: Request)"
echo "   ✅ export async function POST(request: Request)"
echo ""
echo "2. Test all API routes:"
echo "   npm run dev"
echo "   curl http://localhost:3000/api/credits"
echo ""
echo "3. Delete backup after verification:"
echo "   rm -rf api.backup"
echo ""
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo ""
echo -e "${GREEN}🎉 Migration complete!${NC}"
