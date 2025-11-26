#!/bin/bash

# 🏥 PhotoGlow - Project Health Check
# Validates project configuration and dependencies

set -e

# Colors
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m'

# Counters
PASS=0
FAIL=0
WARN=0

echo ""
echo "${BLUE}================================${NC}"
echo "${BLUE}   PhotoGlow Health Check${NC}"
echo "${BLUE}================================${NC}"
echo ""

# Function to check and report
check_pass() {
    echo -e "${GREEN}✅ $1${NC}"
    ((PASS++))
}

check_fail() {
    echo -e "${RED}❌ $1${NC}"
    ((FAIL++))
}

check_warn() {
    echo -e "${YELLOW}⚠️  $1${NC}"
    ((WARN++))
}

# 1. Node.js version
echo "${BLUE}[1/15] Checking Node.js version...${NC}"
NODE_VERSION=$(node -v | cut -d'v' -f2 | cut -d'.' -f1)
if [ "$NODE_VERSION" -ge 18 ]; then
    check_pass "Node.js $(node -v) ✓"
else
    check_fail "Node.js version must be >= 18.0.0 (current: $(node -v))"
fi

# 2. npm version
echo "${BLUE}[2/15] Checking npm version...${NC}"
NPM_VERSION=$(npm -v | cut -d'.' -f1)
if [ "$NPM_VERSION" -ge 9 ]; then
    check_pass "npm $(npm -v) ✓"
else
    check_warn "npm version should be >= 9.0.0 (current: $(npm -v))"
fi

# 3. Environment file
echo "${BLUE}[3/15] Checking .env file...${NC}"
if [ -f .env ]; then
    check_pass ".env file exists"
    
    # Check required variables
    REQUIRED_VARS=(
        "NEXT_PUBLIC_SUPABASE_URL"
        "NEXT_PUBLIC_SUPABASE_ANON_KEY"
        "SUPABASE_SERVICE_ROLE_KEY"
        "SUPABASE_DB_URL"
        "NEXT_PUBLIC_API_URL"
    )
    
    for VAR in "${REQUIRED_VARS[@]}"; do
        if grep -q "^${VAR}=" .env && ! grep -q "^${VAR}=your-" .env && ! grep -q "^${VAR}=$" .env; then
            check_pass "$VAR is set"
        else
            check_fail "$VAR is missing or not configured"
        fi
    done
else
    check_fail ".env file not found"
    echo "  Run: cp .env.example .env"
fi

# 4. Dependencies installed
echo "${BLUE}[4/15] Checking node_modules...${NC}"
if [ -d "node_modules" ]; then
    check_pass "Dependencies installed"
else
    check_fail "Dependencies not installed"
    echo "  Run: npm install"
fi

# 5. TypeScript configuration
echo "${BLUE}[5/15] Checking TypeScript config...${NC}"
if [ -f "tsconfig.json" ]; then
    check_pass "tsconfig.json exists"
else
    check_fail "tsconfig.json not found"
fi

# 6. Next.js configuration
echo "${BLUE}[6/15] Checking Next.js config...${NC}"
if [ -f "next.config.mjs" ]; then
    check_pass "next.config.mjs exists"
else
    check_fail "next.config.mjs not found"
fi

# 7. Vercel configuration
echo "${BLUE}[7/15] Checking Vercel config...${NC}"
if [ -f "vercel.json" ]; then
    check_pass "vercel.json exists"
else
    check_warn "vercel.json not found (optional)"
fi

# 8. Package.json
echo "${BLUE}[8/15] Checking package.json...${NC}"
if [ -f "package.json" ]; then
    check_pass "package.json exists"
    
    # Check version
    VERSION=$(node -p "require('./package.json').version")
    echo "  Version: $VERSION"
else
    check_fail "package.json not found"
fi

# 9. Tailwind configuration
echo "${BLUE}[9/15] Checking Tailwind config...${NC}"
if [ -f "tailwind.config.ts" ]; then
    check_pass "tailwind.config.ts exists"
else
    check_warn "tailwind.config.ts not found"
fi

# 10. ESLint configuration
echo "${BLUE}[10/15] Checking ESLint config...${NC}"
if [ -f ".eslintrc.json" ] || [ -f "eslint.config.js" ]; then
    check_pass "ESLint configured"
else
    check_warn "ESLint config not found"
fi

# 11. Git configuration
echo "${BLUE}[11/15] Checking Git setup...${NC}"
if [ -d ".git" ]; then
    check_pass "Git repository initialized"
    
    # Check .gitignore
    if [ -f ".gitignore" ]; then
        check_pass ".gitignore exists"
        
        # Check if .env is ignored
        if grep -q "^\.env$" .gitignore || grep -q "^\.env" .gitignore; then
            check_pass ".env is in .gitignore"
        else
            check_fail ".env is NOT in .gitignore (SECURITY RISK!)"
        fi
    else
        check_fail ".gitignore not found"
    fi
else
    check_warn "Not a Git repository"
fi

# 12. Documentation
echo "${BLUE}[12/15] Checking documentation...${NC}"
DOCS=(
    "README.md"
    "CHANGELOG.md"
    "CONTRIBUTING.md"
    "LICENSE"
    "SECURITY.md"
)

for DOC in "${DOCS[@]}"; do
    if [ -f "$DOC" ]; then
        check_pass "$DOC exists"
    else
        check_warn "$DOC not found"
    fi
done

# 13. Critical directories
echo "${BLUE}[13/15] Checking project structure...${NC}"
DIRS=(
    "app"
    "components"
    "hooks"
    "lib"
    "utils"
    "styles"
    "public"
    "docs"
)

for DIR in "${DIRS[@]}"; do
    if [ -d "$DIR" ]; then
        check_pass "$DIR/ directory exists"
    else
        check_fail "$DIR/ directory not found"
    fi
done

# 14. TypeScript check (if dependencies installed)
echo "${BLUE}[14/15] Running TypeScript check...${NC}"
if [ -d "node_modules" ]; then
    if npm run type-check > /dev/null 2>&1; then
        check_pass "TypeScript check passed"
    else
        check_fail "TypeScript errors found"
        echo "  Run: npm run type-check"
    fi
else
    check_warn "Skipping TypeScript check (dependencies not installed)"
fi

# 15. Security audit
echo "${BLUE}[15/15] Running security audit...${NC}"
if [ -d "node_modules" ]; then
    AUDIT_OUTPUT=$(npm audit --audit-level=high 2>&1 || true)
    
    if echo "$AUDIT_OUTPUT" | grep -q "found 0 vulnerabilities"; then
        check_pass "No high/critical vulnerabilities"
    elif echo "$AUDIT_OUTPUT" | grep -q "found.*vulnerabilities"; then
        check_warn "Vulnerabilities found - run: npm audit"
    else
        check_warn "Security audit inconclusive"
    fi
else
    check_warn "Skipping security audit (dependencies not installed)"
fi

# Summary
echo ""
echo "${BLUE}================================${NC}"
echo "${BLUE}   Health Check Summary${NC}"
echo "${BLUE}================================${NC}"
echo ""
echo "${GREEN}✅ Passed: $PASS${NC}"
echo "${YELLOW}⚠️  Warnings: $WARN${NC}"
echo "${RED}❌ Failed: $FAIL${NC}"
echo ""

# Overall status
if [ $FAIL -eq 0 ]; then
    if [ $WARN -eq 0 ]; then
        echo "${GREEN}🎉 Perfect! Project is in excellent health!${NC}"
        exit 0
    else
        echo "${YELLOW}✓ Good! Project is healthy with minor warnings.${NC}"
        exit 0
    fi
else
    echo "${RED}✗ Issues found! Please address the failures above.${NC}"
    exit 1
fi
