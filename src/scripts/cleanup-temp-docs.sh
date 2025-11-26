#!/bin/bash

###############################################################################
# PhotoGlow - Cleanup Temporary Documentation Files
# 
# This script moves all temporary .md files from the root directory
# to the docs/archive folder to keep the project clean.
#
# Usage: ./scripts/cleanup-temp-docs.sh
###############################################################################

set -e  # Exit on error

echo "🧹 PhotoGlow Documentation Cleanup"
echo "===================================="
echo ""

# Create archive directory if it doesn't exist
ARCHIVE_DIR="docs/archive"
mkdir -p "$ARCHIVE_DIR"

echo "📁 Archive directory: $ARCHIVE_DIR"
echo ""

# Counter for moved files
MOVED_COUNT=0

# List of essential files to keep in root (case-insensitive patterns)
KEEP_FILES=(
  "README.md"
  "ARCHITECTURE.md"
  "CONTRIBUTING.md"
  "CHANGELOG.md"
  "SECURITY.md"
  "LICENSE"
  "QUICK_START.md"
  "START_HERE_GITHUB.md"
  "PROJECT_STRUCTURE_VISUAL.md"
  "CLEANUP_FINAL.md"
  "BEFORE_GITHUB_PUSH.md"
  "OPTIMIZATION_COMPLETE_SUMMARY.md"
  "FINAL_SUMMARY.md"
  "NEXT_STEPS.md"
  "SUPER_CLEANUP_SUMMARY.md"
  "NETTOYAGE_COMPLET.md"
  "Attributions.md"
  ".env.example"
  "package.json"
  "package-lock.json"
  "tsconfig.json"
  "next.config.mjs"
  "tailwind.config.ts"
  "postcss.config.js"
  "vercel.json"
  "vitest.config.ts"
)

# Function to check if file should be kept
should_keep_file() {
  local filename="$1"
  for keep in "${KEEP_FILES[@]}"; do
    if [[ "${filename,,}" == "${keep,,}" ]]; then
      return 0  # Keep this file
    fi
  done
  return 1  # Move this file
}

echo "🔍 Scanning for temporary documentation files..."
echo ""

# Find all .md files in root directory
for file in *.md; do
  # Skip if no .md files found (glob doesn't expand)
  if [[ ! -f "$file" ]]; then
    continue
  fi
  
  # Check if file should be kept
  if should_keep_file "$file"; then
    echo "✅ Keeping: $file"
  else
    # Move to archive
    echo "📦 Moving: $file → $ARCHIVE_DIR/"
    mv "$file" "$ARCHIVE_DIR/"
    ((MOVED_COUNT++))
  fi
done

echo ""
echo "===================================="
echo "✨ Cleanup Complete!"
echo ""
echo "📊 Summary:"
echo "  - Files moved: $MOVED_COUNT"
echo "  - Archive location: $ARCHIVE_DIR"
echo ""

if [ $MOVED_COUNT -gt 0 ]; then
  echo "🎉 Project root is now clean!"
else
  echo "✅ No temporary files to clean up."
fi

echo ""
echo "💡 Essential files kept in root:"
for file in "${KEEP_FILES[@]}"; do
  if [[ -f "$file" ]]; then
    echo "  - $file"
  fi
done

echo ""
echo "Done! 🚀"