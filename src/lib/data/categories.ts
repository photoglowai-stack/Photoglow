/**
 * Données centralisées des catégories
 * @module lib/data/categories
 */

import type { CategoryType, ColorScheme } from "@/types";

/**
 * Configuration de schémas de couleurs par catégorie
 * Utilisé pour personnaliser l'apparence des pages de catégories
 */
export const categoryColorSchemes: Record<CategoryType, ColorScheme> = {
  "Holidays & Events": {
    primary: "#FF6B6B",
    secondary: "#FFE66D",
    accent: "#4ECDC4",
    background: "#FFF5E6",
    text: "#2C3E50",
  },
  "Dating & Social": {
    primary: "#FF6B9D",
    secondary: "#C44569",
    accent: "#F8B500",
    background: "#FFF0F5",
    text: "#2D3436",
  },
  "Professional Headshots": {
    primary: "#2C3E50",
    secondary: "#3498DB",
    accent: "#E74C3C",
    background: "#ECF0F1",
    text: "#2C3E50",
  },
  "AI & Creative": {
    primary: "#9B59B6",
    secondary: "#E056FD",
    accent: "#00D9FF",
    background: "#F5E6FF",
    text: "#2C3E50",
  },
  "Lifestyle & Travel": {
    primary: "#3498DB",
    secondary: "#5DADE2",
    accent: "#F39C12",
    background: "#EBF5FB",
    text: "#2C3E50",
  },
  "Fashion & Style": {
    primary: "#E91E63",
    secondary: "#F06292",
    accent: "#FFD700",
    background: "#FCE4EC",
    text: "#2C3E50",
  },
  "Fitness & Sports": {
    primary: "#27AE60",
    secondary: "#58D68D",
    accent: "#F39C12",
    background: "#E8F8F5",
    text: "#2C3E50",
  },
  "Retro & Vintage": {
    primary: "#D35400",
    secondary: "#E67E22",
    accent: "#F4D03F",
    background: "#FEF5E7",
    text: "#2C3E50",
  },
  "Events & Parties": {
    primary: "#8E44AD",
    secondary: "#AF7AC5",
    accent: "#F7DC6F",
    background: "#F4ECF7",
    text: "#2C3E50",
  },
  "Cosplay & Fantasy": {
    primary: "#9C27B0",
    secondary: "#CE93D8",
    accent: "#00BCD4",
    background: "#F3E5F5",
    text: "#2C3E50",
  },
  "Creative Portraits": {
    primary: "#FF5722",
    secondary: "#FF7043",
    accent: "#FFC107",
    background: "#FBE9E7",
    text: "#2C3E50",
  },
  "Adult Content (18+)": {
    primary: "#C62828",
    secondary: "#E57373",
    accent: "#FFB74D",
    background: "#FFEBEE",
    text: "#2C3E50",
  },
};

/**
 * Mapping des catégories vers leurs slugs URL
 */
export const categorySlugMap: Record<string, string> = {
  "Holidays & Events": "holidays-events",
  "Dating & Social": "dating-social",
  "Professional Headshots": "professional-headshots",
  "AI & Creative": "ai-creative",
  "Lifestyle & Travel": "lifestyle-travel",
  "Fashion & Style": "fashion-style",
  "Fitness & Sports": "fitness-sports",
  "Retro & Vintage": "retro-vintage",
  "Events & Parties": "events-parties",
  "Cosplay & Fantasy": "cosplay-fantasy",
  "Creative Portraits": "creative-portraits",
  "Adult Content (18+)": "adult-content",
};

/**
 * Mapping inverse des slugs vers les noms de catégories
 */
export const slugToCategoryMap: Record<string, CategoryType> = Object.entries(
  categorySlugMap
).reduce(
  (acc, [category, slug]) => {
    acc[slug] = category as CategoryType;
    return acc;
  },
  {} as Record<string, CategoryType>
);

/**
 * Récupère le schéma de couleurs pour une catégorie
 * @param category - Nom de la catégorie
 * @returns Schéma de couleurs
 * @example
 * const colors = getCategoryColors("Dating & Social")
 */
export function getCategoryColors(category: CategoryType): ColorScheme {
  return (
    categoryColorSchemes[category] || {
      primary: "#6366f1",
      secondary: "#8b5cf6",
      accent: "#ec4899",
      background: "#f8fafc",
      text: "#1e293b",
    }
  );
}

/**
 * Récupère le slug URL pour une catégorie
 * @param category - Nom de la catégorie
 * @returns Slug URL
 * @example
 * getCategorySlug("Dating & Social") // "dating-social"
 */
export function getCategorySlug(category: string): string {
  return categorySlugMap[category] || category.toLowerCase().replace(/\s+/g, "-");
}

/**
 * Récupère le nom de catégorie depuis un slug
 * @param slug - Slug URL
 * @returns Nom de catégorie ou undefined
 * @example
 * getCategoryFromSlug("dating-social") // "Dating & Social"
 */
export function getCategoryFromSlug(slug: string): CategoryType | undefined {
  return slugToCategoryMap[slug];
}
