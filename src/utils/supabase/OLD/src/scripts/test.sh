#!/bin/bash

# PhotoGlow - Test Runner Script
# Run tests with different options

set -e

COLOR_GREEN='\033[0;32m'
COLOR_BLUE='\033[0;34m'
COLOR_YELLOW='\033[1;33m'
COLOR_RED='\033[0;31m'
COLOR_RESET='\033[0m'

echo -e "${COLOR_BLUE}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${COLOR_RESET}"
echo -e "${COLOR_BLUE}  🧪 PhotoGlow Test Runner${COLOR_RESET}"
echo -e "${COLOR_BLUE}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${COLOR_RESET}"
echo ""

# Check if vitest is installed
if ! command -v npx &> /dev/null; then
    echo -e "${COLOR_RED}❌ npx not found. Please install Node.js${COLOR_RESET}"
    exit 1
fi

# Parse command
COMMAND=${1:-"all"}

case $COMMAND in
  "all")
    echo -e "${COLOR_GREEN}📦 Running all tests...${COLOR_RESET}"
    npx vitest run
    ;;
  
  "watch")
    echo -e "${COLOR_GREEN}👀 Running tests in watch mode...${COLOR_RESET}"
    npx vitest
    ;;
  
  "coverage")
    echo -e "${COLOR_GREEN}📊 Generating coverage report...${COLOR_RESET}"
    npx vitest run --coverage
    ;;
  
  "ui")
    echo -e "${COLOR_GREEN}🎨 Opening Vitest UI...${COLOR_RESET}"
    npx vitest --ui
    ;;
  
  "fetch")
    echo -e "${COLOR_GREEN}🔁 Testing fetchWithRetry...${COLOR_RESET}"
    npx vitest run tests/helpers/fetchWithRetry.test.ts
    ;;
  
  "poll")
    echo -e "${COLOR_GREEN}⏱️  Testing pollJobStatus...${COLOR_RESET}"
    npx vitest run tests/helpers/pollJobStatus.test.ts
    ;;
  
  "validator")
    echo -e "${COLOR_GREEN}✅ Testing Validator...${COLOR_RESET}"
    npx vitest run tests/helpers/Validator.test.ts
    ;;
  
  "quick")
    echo -e "${COLOR_YELLOW}⚡ Running quick tests (no coverage)...${COLOR_RESET}"
    npx vitest run --reporter=dot
    ;;
  
  "ci")
    echo -e "${COLOR_YELLOW}🤖 Running CI tests...${COLOR_RESET}"
    npx vitest run --reporter=verbose --coverage
    ;;
  
  "help")
    echo "Usage: ./scripts/test.sh [command]"
    echo ""
    echo "Commands:"
    echo "  all        - Run all tests (default)"
    echo "  watch      - Run tests in watch mode"
    echo "  coverage   - Generate coverage report"
    echo "  ui         - Open Vitest UI"
    echo "  fetch      - Test fetchWithRetry only"
    echo "  poll       - Test pollJobStatus only"
    echo "  validator  - Test Validator only"
    echo "  quick      - Run quick tests (no coverage)"
    echo "  ci         - Run CI tests with verbose output"
    echo "  help       - Show this help message"
    ;;
  
  *)
    echo -e "${COLOR_RED}❌ Unknown command: $COMMAND${COLOR_RESET}"
    echo "Run './scripts/test.sh help' for usage"
    exit 1
    ;;
esac

echo ""
echo -e "${COLOR_GREEN}✅ Done!${COLOR_RESET}"
