#!/bin/bash

###############################################################################
# PhotoGlow - Push to GitHub Script
# 
# This script automatically adds, commits, and pushes all changes to GitHub
#
# Usage: ./scripts/push-to-github.sh
###############################################################################

set -e  # Exit on error

echo "🚀 PhotoGlow - Push to GitHub"
echo "====================================="
echo ""

# Colors for output
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
RED='\033[0;31m'
NC='\033[0m' # No Color

# Step 1: Check git status
echo -e "${YELLOW}📊 Step 1: Checking git status...${NC}"
echo ""
git status
echo ""

# Ask for confirmation
echo -e "${YELLOW}❓ Do you want to continue? (y/n)${NC}"
read -r response
if [[ ! "$response" =~ ^[Yy]$ ]]; then
    echo -e "${RED}❌ Aborted by user${NC}"
    exit 1
fi
echo ""

# Step 2: Add all files
echo -e "${YELLOW}📦 Step 2: Adding all files...${NC}"
git add .
echo -e "${GREEN}✅ Files added${NC}"
echo ""

# Step 3: Show what will be committed
echo -e "${YELLOW}📋 Files to be committed:${NC}"
git status --short
echo ""

# Step 4: Commit
echo -e "${YELLOW}💾 Step 3: Creating commit...${NC}"
git commit -m "feat: Complete project cleanup and Figma integration

- Removed 150+ temporary documentation files
- Kept 16 essential MD files in root
- Created LICENSE file
- Created .env.example and .gitignore
- Added complete Figma integration documentation
- Documented user plugin (figma-plugin/)
- Documented admin plugin (figma-plugin-admin/)
- Documented ImageWithFallback component
- Created 3 comprehensive Figma guides
- Project is now 91% cleaner and GitHub-ready"

echo -e "${GREEN}✅ Commit created${NC}"
echo ""

# Step 5: Detect branch name
BRANCH=$(git rev-parse --abbrev-ref HEAD)
echo -e "${YELLOW}🌿 Current branch: ${BRANCH}${NC}"
echo ""

# Step 6: Push
echo -e "${YELLOW}🚀 Step 4: Pushing to GitHub...${NC}"
git push origin "$BRANCH"
echo ""

# Success!
echo ""
echo "====================================="
echo -e "${GREEN}🎉 SUCCESS! Pushed to GitHub!${NC}"
echo "====================================="
echo ""
echo -e "${GREEN}✅ Project is now on GitHub${NC}"
echo -e "${GREEN}✅ Branch: ${BRANCH}${NC}"
echo -e "${GREEN}✅ All changes committed and pushed${NC}"
echo ""
echo "🔗 Check your repository on GitHub!"
echo ""
echo "Next steps:"
echo "  1. Verify README.md displays correctly"
echo "  2. Check figma-plugin/ documentation"
echo "  3. Check figma-plugin-admin/ documentation"
echo "  4. Review FIGMA_INTEGRATION_COMPLETE.md"
echo ""
echo "🎊 Congratulations! Your project is GitHub-ready!"
