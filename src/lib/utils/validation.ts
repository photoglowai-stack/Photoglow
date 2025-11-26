/**
 * Utilitaires de validation de données
 * @module lib/utils/validation
 */

import { IMAGE_CONFIG, LIMITS } from "@/lib/constants";

/**
 * Valide un email
 * @param email - Email à valider
 * @returns true si valide
 * @example
 * isValidEmail("user@example.com") // true
 */
export function isValidEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

/**
 * Valide un prompt de génération
 * @param prompt - Prompt à valider
 * @returns Objet avec isValid et message d'erreur optionnel
 * @example
 * validatePrompt("") // { isValid: false, error: "Le prompt est requis" }
 */
export function validatePrompt(prompt: string): {
  isValid: boolean;
  error?: string;
} {
  if (!prompt || prompt.trim().length === 0) {
    return { isValid: false, error: "Le prompt est requis" };
  }

  if (prompt.length < 10) {
    return {
      isValid: false,
      error: "Le prompt doit contenir au moins 10 caractères",
    };
  }

  if (prompt.length > 1000) {
    return {
      isValid: false,
      error: "Le prompt ne peut pas dépasser 1000 caractères",
    };
  }

  return { isValid: true };
}

/**
 * Valide un fichier image pour l'upload
 * @param file - Fichier à valider
 * @returns Objet avec isValid et message d'erreur optionnel
 * @example
 * validateImageFile(file) // { isValid: true }
 */
export function validateImageFile(file: File): {
  isValid: boolean;
  error?: string;
} {
  // Vérifier le type de fichier
  if (!IMAGE_CONFIG.ACCEPTED_FORMATS.includes(file.type)) {
    return {
      isValid: false,
      error: `Format non supporté. Formats acceptés : ${IMAGE_CONFIG.ACCEPTED_EXTENSIONS.join(", ")}`,
    };
  }

  // Vérifier la taille
  const maxSizeBytes = LIMITS.MAX_UPLOAD_SIZE_MB * 1024 * 1024;
  if (file.size > maxSizeBytes) {
    return {
      isValid: false,
      error: `Le fichier est trop volumineux. Taille maximale : ${LIMITS.MAX_UPLOAD_SIZE_MB}MB`,
    };
  }

  return { isValid: true };
}

/**
 * Valide le nombre de photos d'entraînement pour un modèle IA
 * @param count - Nombre de photos
 * @returns Objet avec isValid et message d'erreur optionnel
 * @example
 * validateTrainingPhotosCount(15) // { isValid: true }
 */
export function validateTrainingPhotosCount(count: number): {
  isValid: boolean;
  error?: string;
} {
  if (count < LIMITS.MIN_TRAINING_PHOTOS) {
    return {
      isValid: false,
      error: `Vous devez fournir au moins ${LIMITS.MIN_TRAINING_PHOTOS} photos`,
    };
  }

  if (count > LIMITS.MAX_TRAINING_PHOTOS) {
    return {
      isValid: false,
      error: `Vous ne pouvez pas dépasser ${LIMITS.MAX_TRAINING_PHOTOS} photos`,
    };
  }

  return { isValid: true };
}

/**
 * Valide un nom de modèle IA
 * @param name - Nom à valider
 * @returns Objet avec isValid et message d'erreur optionnel
 * @example
 * validateModelName("Mon Modèle") // { isValid: true }
 */
export function validateModelName(name: string): {
  isValid: boolean;
  error?: string;
} {
  if (!name || name.trim().length === 0) {
    return { isValid: false, error: "Le nom du modèle est requis" };
  }

  if (name.length < 3) {
    return {
      isValid: false,
      error: "Le nom doit contenir au moins 3 caractères",
    };
  }

  if (name.length > 50) {
    return {
      isValid: false,
      error: "Le nom ne peut pas dépasser 50 caractères",
    };
  }

  return { isValid: true };
}

/**
 * Vérifie si une URL est valide
 * @param url - URL à valider
 * @returns true si valide
 * @example
 * isValidUrl("https://example.com") // true
 */
export function isValidUrl(url: string): boolean {
  try {
    new URL(url);
    return true;
  } catch {
    return false;
  }
}

/**
 * Sanitise une chaîne pour éviter les injections
 * @param input - Chaîne à sanitiser
 * @returns Chaîne sanitisée
 * @example
 * sanitizeInput("<script>alert('xss')</script>") // "<script>alert('xss')</script>"
 */
export function sanitizeInput(input: string): string {
  return input
    .replace(/&/g, "&")
    .replace(/</g, "<")
    .replace(/>/g, ">")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#x27;")
    .replace(/\//g, "&#x2F;");
}
