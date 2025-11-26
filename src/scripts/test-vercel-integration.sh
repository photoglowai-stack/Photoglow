#!/bin/bash

# PhotoGlow - Script de test pour l'intégration Vercel API avec gestion des crédits
# Usage: ./scripts/test-vercel-integration.sh

set -e

echo "🧪 PhotoGlow - Test de l'intégration Vercel API"
echo "================================================"
echo ""

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Supabase Configuration
SUPABASE_PROJECT_ID="wlvgbkcldllsixhhfqkq"
SUPABASE_URL="https://${SUPABASE_PROJECT_ID}.supabase.co"
API_BASE="${SUPABASE_URL}/functions/v1/make-server-ab844084"

# User credentials (à remplacer avec vos vraies credentials)
# Ces credentials doivent être d'un utilisateur qui existe dans votre base
USER_EMAIL="test@photoglow.com"
USER_PASSWORD="testpassword123"

echo -e "${BLUE}📋 Configuration:${NC}"
echo "  Supabase URL: ${SUPABASE_URL}"
echo "  API Base: ${API_BASE}"
echo "  User Email: ${USER_EMAIL}"
echo ""

# Function to print colored status
print_status() {
    local status=$1
    local message=$2
    
    if [ "$status" = "success" ]; then
        echo -e "${GREEN}✅ ${message}${NC}"
    elif [ "$status" = "error" ]; then
        echo -e "${RED}❌ ${message}${NC}"
    elif [ "$status" = "info" ]; then
        echo -e "${BLUE}ℹ️  ${message}${NC}"
    else
        echo -e "${YELLOW}⚠️  ${message}${NC}"
    fi
}

# Step 1: Get access token
echo -e "${YELLOW}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${NC}"
echo -e "${BLUE}Step 1: Authentification${NC}"
echo -e "${YELLOW}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${NC}"
echo ""

# Note: You need to have a valid user in your Supabase database
# This is just an example - replace with actual authentication method
echo "Pour ce test, veuillez fournir un access_token valide."
echo "Vous pouvez l'obtenir en vous connectant sur PhotoGlow et en inspectant le localStorage."
echo ""
read -p "Entrez votre access_token: " ACCESS_TOKEN
echo ""

if [ -z "$ACCESS_TOKEN" ]; then
    print_status "error" "Access token requis pour continuer"
    exit 1
fi

# Step 2: Check current credits
echo -e "${YELLOW}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${NC}"
echo -e "${BLUE}Step 2: Vérification des crédits${NC}"
echo -e "${YELLOW}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${NC}"
echo ""

CREDITS_RESPONSE=$(curl -s -X GET \
  "${API_BASE}/credits" \
  -H "Authorization: Bearer ${ACCESS_TOKEN}" \
  -H "Content-Type: application/json")

echo "Response: ${CREDITS_RESPONSE}"
echo ""

CURRENT_CREDITS=$(echo $CREDITS_RESPONSE | grep -o '"credits":[0-9]*' | grep -o '[0-9]*' || echo "0")
print_status "info" "Crédits disponibles: ${CURRENT_CREDITS}"
echo ""

if [ "$CURRENT_CREDITS" -lt 1 ]; then
    print_status "error" "Pas assez de crédits pour tester (besoin d'au moins 1 crédit)"
    exit 1
fi

# Step 3: Test Standard Generation (FLUX - 1 crédit)
echo -e "${YELLOW}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${NC}"
echo -e "${BLUE}Step 3: Test Standard Generation (FLUX - 1 crédit)${NC}"
echo -e "${YELLOW}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${NC}"
echo ""

IDEMPOTENCY_KEY="test_flux_$(date +%s)_$$"

FLUX_PAYLOAD=$(cat <<EOF
{
  "mode": "text2img",
  "model": "flux",
  "prompt_final": "Professional headshot photo of a confident person in a modern office, natural lighting, high quality, 4K resolution",
  "aspect_ratio": "4:5",
  "guidance": 3.5,
  "test_mode": true
}
EOF
)

echo "Payload:"
echo "$FLUX_PAYLOAD" | jq '.'
echo ""

FLUX_RESPONSE=$(curl -s -w "\nHTTP_STATUS:%{http_code}" -X POST \
  "${API_BASE}/user/v1/jobs" \
  -H "Authorization: Bearer ${ACCESS_TOKEN}" \
  -H "Content-Type: application/json" \
  -H "Idempotency-Key: ${IDEMPOTENCY_KEY}" \
  -d "$FLUX_PAYLOAD")

HTTP_STATUS=$(echo "$FLUX_RESPONSE" | grep -o "HTTP_STATUS:[0-9]*" | grep -o "[0-9]*")
FLUX_BODY=$(echo "$FLUX_RESPONSE" | sed 's/HTTP_STATUS:[0-9]*//')

echo "HTTP Status: ${HTTP_STATUS}"
echo "Response:"
echo "$FLUX_BODY" | jq '.' 2>/dev/null || echo "$FLUX_BODY"
echo ""

if [ "$HTTP_STATUS" -eq 200 ]; then
    print_status "success" "Génération FLUX réussie (1 crédit débité)"
else
    print_status "error" "Échec de la génération FLUX"
    echo "Détails: $FLUX_BODY"
fi
echo ""

# Wait a bit before next request
sleep 2

# Step 4: Check credits after FLUX generation
echo -e "${YELLOW}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${NC}"
echo -e "${BLUE}Step 4: Vérification des crédits après génération${NC}"
echo -e "${YELLOW}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${NC}"
echo ""

CREDITS_RESPONSE_2=$(curl -s -X GET \
  "${API_BASE}/credits" \
  -H "Authorization: Bearer ${ACCESS_TOKEN}" \
  -H "Content-Type: application/json")

NEW_CREDITS=$(echo $CREDITS_RESPONSE_2 | grep -o '"credits":[0-9]*' | grep -o '[0-9]*' || echo "0")
print_status "info" "Crédits restants: ${NEW_CREDITS}"

DEBITED=$((CURRENT_CREDITS - NEW_CREDITS))
print_status "info" "Crédits débités: ${DEBITED}"
echo ""

if [ "$DEBITED" -eq 1 ]; then
    print_status "success" "Débitage correct (1 crédit pour FLUX)"
else
    print_status "warning" "Débitage inattendu: ${DEBITED} crédit(s)"
fi
echo ""

# Step 5: Test Gen-4 generation (if enough credits)
if [ "$NEW_CREDITS" -ge 2 ]; then
    echo -e "${YELLOW}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${NC}"
    echo -e "${BLUE}Step 5: Test Gen-4 Generation (2 crédits)${NC}"
    echo -e "${YELLOW}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${NC}"
    echo ""
    
    IDEMPOTENCY_KEY_2="test_gen4_$(date +%s)_$$"
    
    # Note: Pour Gen-4, il faut une image_url valide
    # Utilisez une image de test publique ou uploadez d'abord une image
    GEN4_PAYLOAD=$(cat <<EOF
{
  "mode": "img2img",
  "model": "gen4",
  "prompt_final": "Add a beautiful vase with colorful flowers on the table",
  "image_url": "https://picsum.photos/800/1000",
  "aspect_ratio": "4:5",
  "prompt_strength": 0.8,
  "guidance": 3.5,
  "test_mode": true
}
EOF
)
    
    echo "Payload:"
    echo "$GEN4_PAYLOAD" | jq '.'
    echo ""
    
    GEN4_RESPONSE=$(curl -s -w "\nHTTP_STATUS:%{http_code}" -X POST \
      "${API_BASE}/user/v1/jobs" \
      -H "Authorization: Bearer ${ACCESS_TOKEN}" \
      -H "Content-Type: application/json" \
      -H "Idempotency-Key: ${IDEMPOTENCY_KEY_2}" \
      -d "$GEN4_PAYLOAD")
    
    HTTP_STATUS_2=$(echo "$GEN4_RESPONSE" | grep -o "HTTP_STATUS:[0-9]*" | grep -o "[0-9]*")
    GEN4_BODY=$(echo "$GEN4_RESPONSE" | sed 's/HTTP_STATUS:[0-9]*//')
    
    echo "HTTP Status: ${HTTP_STATUS_2}"
    echo "Response:"
    echo "$GEN4_BODY" | jq '.' 2>/dev/null || echo "$GEN4_BODY"
    echo ""
    
    if [ "$HTTP_STATUS_2" -eq 200 ]; then
        print_status "success" "Génération Gen-4 réussie (2 crédits débités)"
    else
        print_status "error" "Échec de la génération Gen-4"
    fi
    echo ""
    
    # Final credits check
    CREDITS_RESPONSE_3=$(curl -s -X GET \
      "${API_BASE}/credits" \
      -H "Authorization: Bearer ${ACCESS_TOKEN}" \
      -H "Content-Type: application/json")
    
    FINAL_CREDITS=$(echo $CREDITS_RESPONSE_3 | grep -o '"credits":[0-9]*' | grep -o '[0-9]*' || echo "0")
    print_status "info" "Crédits finaux: ${FINAL_CREDITS}"
    
    TOTAL_DEBITED=$((CURRENT_CREDITS - FINAL_CREDITS))
    print_status "info" "Total débité: ${TOTAL_DEBITED} crédit(s)"
    echo ""
    
    if [ "$TOTAL_DEBITED" -eq 3 ]; then
        print_status "success" "Système de crédits fonctionne parfaitement (1+2=3)"
    else
        print_status "warning" "Total inattendu: ${TOTAL_DEBITED} crédit(s)"
    fi
else
    print_status "warning" "Pas assez de crédits pour tester Gen-4 (besoin de 2 crédits)"
fi

echo ""
echo -e "${YELLOW}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${NC}"
echo -e "${GREEN}✅ Tests terminés${NC}"
echo -e "${YELLOW}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${NC}"
echo ""
echo "📊 Résumé:"
echo "  - Crédits initiaux: ${CURRENT_CREDITS}"
echo "  - Crédits finaux: ${FINAL_CREDITS:-$NEW_CREDITS}"
echo "  - Débités au total: ${TOTAL_DEBITED:-$DEBITED}"
echo ""
echo "📖 Consultez VERCEL_API_CREDITS_TESTING.md pour plus de détails"
echo ""
