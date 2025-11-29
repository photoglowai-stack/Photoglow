/**
 * Utilitaires de formatage de données
 * @module lib/utils/format
 */

/**
 * Formate un nombre de crédits avec séparateurs de milliers
 * @param credits - Nombre de crédits
 * @returns Chaîne formatée (ex: "1,234")
 * @example
 * formatCredits(1234) // "1,234"
 */
export function formatCredits(credits: number): string {
  return new Intl.NumberFormat("fr-FR").format(credits);
}

/**
 * Formate une date relative (ex: "il y a 2 heures")
 * @param date - Date à formater
 * @returns Chaîne de date relative
 * @example
 * formatRelativeDate(new Date(Date.now() - 3600000)) // "il y a 1 heure"
 */
export function formatRelativeDate(date: Date | string): string {
  const dateObj = typeof date === "string" ? new Date(date) : date;
  const now = new Date();
  const diffMs = now.getTime() - dateObj.getTime();
  const diffSec = Math.floor(diffMs / 1000);
  const diffMin = Math.floor(diffSec / 60);
  const diffHour = Math.floor(diffMin / 60);
  const diffDay = Math.floor(diffHour / 24);

  if (diffDay > 7) {
    return dateObj.toLocaleDateString("fr-FR");
  }
  if (diffDay > 0) {
    return `il y a ${diffDay} jour${diffDay > 1 ? "s" : ""}`;
  }
  if (diffHour > 0) {
    return `il y a ${diffHour} heure${diffHour > 1 ? "s" : ""}`;
  }
  if (diffMin > 0) {
    return `il y a ${diffMin} minute${diffMin > 1 ? "s" : ""}`;
  }
  return "à l'instant";
}

/**
 * Convertit une chaîne en slug URL-friendly
 * @param text - Texte à convertir
 * @returns Slug formaté
 * @example
 * slugify("Photo AI Halloween") // "photo-ai-halloween"
 */
export function slugify(text: string): string {
  return text
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

/**
 * Tronque un texte avec ellipse
 * @param text - Texte à tronquer
 * @param maxLength - Longueur maximale
 * @returns Texte tronqué
 * @example
 * truncate("Long text here", 10) // "Long text..."
 */
export function truncate(text: string, maxLength: number): string {
  if (text.length <= maxLength) return text;
  return text.slice(0, maxLength - 3) + "...";
}

/**
 * Formate une taille de fichier en unités lisibles
 * @param bytes - Taille en octets
 * @returns Chaîne formatée (ex: "2.5 MB")
 * @example
 * formatFileSize(2621440) // "2.5 MB"
 */
export function formatFileSize(bytes: number): string {
  if (bytes === 0) return "0 B";
  const k = 1024;
  const sizes = ["B", "KB", "MB", "GB"];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return `${parseFloat((bytes / Math.pow(k, i)).toFixed(2))} ${sizes[i]}`;
}

/**
 * Capitalise la première lettre d'une chaîne
 * @param text - Texte à capitaliser
 * @returns Texte capitalisé
 * @example
 * capitalize("hello world") // "Hello world"
 */
export function capitalize(text: string): string {
  if (!text) return text;
  return text.charAt(0).toUpperCase() + text.slice(1);
}

/**
 * Formate un prix en euros
 * @param amount - Montant en centimes
 * @returns Prix formaté (ex: "9,99 €")
 * @example
 * formatPrice(999) // "9,99 €"
 */
export function formatPrice(amount: number): string {
  return new Intl.NumberFormat("fr-FR", {
    style: "currency",
    currency: "EUR",
  }).format(amount / 100);
}
