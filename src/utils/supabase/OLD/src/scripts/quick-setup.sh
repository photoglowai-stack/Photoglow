#!/bin/bash

# 🚀 PhotoGlow - Quick Setup Script
# This script automates the initial setup process

set -e  # Exit on error

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Emoji support
CHECK="✅"
CROSS="❌"
ARROW="→"
ROCKET="🚀"

echo ""
echo "${BLUE}================================${NC}"
echo "${BLUE}   PhotoGlow Quick Setup${NC}"
echo "${BLUE}================================${NC}"
echo ""

# Function to print colored messages
print_success() {
    echo -e "${GREEN}${CHECK} $1${NC}"
}

print_error() {
    echo -e "${RED}${CROSS} $1${NC}"
}

print_info() {
    echo -e "${BLUE}${ARROW} $1${NC}"
}

print_warning() {
    echo -e "${YELLOW}⚠️  $1${NC}"
}

# Check if Node.js is installed
print_info "Checking Node.js installation..."
if ! command -v node &> /dev/null; then
    print_error "Node.js is not installed!"
    echo "Please install Node.js >= 18.0.0 from https://nodejs.org/"
    exit 1
fi

NODE_VERSION=$(node -v | cut -d'v' -f2 | cut -d'.' -f1)
if [ "$NODE_VERSION" -lt 18 ]; then
    print_error "Node.js version must be >= 18.0.0 (current: $(node -v))"
    exit 1
fi
print_success "Node.js $(node -v) detected"

# Check if npm is installed
print_info "Checking npm installation..."
if ! command -v npm &> /dev/null; then
    print_error "npm is not installed!"
    exit 1
fi
print_success "npm $(npm -v) detected"

# Check if .env exists
print_info "Checking environment variables..."
if [ ! -f .env ]; then
    print_warning ".env file not found"
    
    # Ask user if they want to create .env from .env.example
    read -p "Would you like to create .env from .env.example? (y/n) " -n 1 -r
    echo
    if [[ $REPLY =~ ^[Yy]$ ]]; then
        if [ -f .env.example ]; then
            cp .env.example .env
            print_success ".env file created from .env.example"
            print_warning "Please edit .env file with your Supabase credentials before continuing"
            
            # Ask if they want to edit now
            read -p "Would you like to edit .env now? (y/n) " -n 1 -r
            echo
            if [[ $REPLY =~ ^[Yy]$ ]]; then
                # Try to open with default editor
                ${EDITOR:-nano} .env
            else
                print_info "You can edit .env later with: nano .env"
            fi
        else
            print_error ".env.example not found!"
            exit 1
        fi
    else
        print_warning "Skipping .env creation"
        print_info "You'll need to create .env manually before running the app"
    fi
else
    print_success ".env file exists"
fi

# Install dependencies
print_info "Installing dependencies..."
npm install

if [ $? -eq 0 ]; then
    print_success "Dependencies installed successfully"
else
    print_error "Failed to install dependencies"
    exit 1
fi

# Run type checking
print_info "Running TypeScript type check..."
npm run type-check

if [ $? -eq 0 ]; then
    print_success "Type check passed"
else
    print_error "Type check failed"
    echo "Please fix TypeScript errors before continuing"
    exit 1
fi

# Run linting
print_info "Running ESLint..."
npm run lint

if [ $? -eq 0 ]; then
    print_success "Linting passed"
else
    print_warning "Linting issues found (not critical)"
fi

# Build the project
print_info "Building project..."
npm run build

if [ $? -eq 0 ]; then
    print_success "Build successful"
else
    print_error "Build failed"
    exit 1
fi

# Success message
echo ""
echo "${GREEN}================================${NC}"
echo "${GREEN}   Setup Complete! ${ROCKET}${NC}"
echo "${GREEN}================================${NC}"
echo ""
echo "${BLUE}Next steps:${NC}"
echo ""
echo "1. ${YELLOW}Configure environment variables:${NC}"
echo "   nano .env"
echo ""
echo "2. ${YELLOW}Start development server:${NC}"
echo "   npm run dev"
echo ""
echo "3. ${YELLOW}Open in browser:${NC}"
echo "   http://localhost:3000"
echo ""
echo "4. ${YELLOW}For admin panel:${NC}"
echo "   Press 'A' key or visit http://localhost:3000#admin"
echo ""
echo "${BLUE}Documentation:${NC}"
echo "  - README.md           - Project overview"
echo "  - docs/API.md         - API reference"
echo "  - docs/DEPLOYMENT.md  - Deployment guide"
echo ""
echo "${GREEN}Happy coding! 🎉${NC}"
echo ""

# Ask if they want to start dev server now
read -p "Would you like to start the development server now? (y/n) " -n 1 -r
echo
if [[ $REPLY =~ ^[Yy]$ ]]; then
    print_info "Starting development server..."
    npm run dev
fi
