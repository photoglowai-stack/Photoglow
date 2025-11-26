/**
 * PhotoGlow Figma Plugin - Utilities
 * Version: V2 (Preview System Refactor)
 * Date: November 5, 2024
 */

/**
 * Normalize UI state to backend-compatible attributes
 * Applies default values and consolidates similar options
 */
export function normalize(ui = {}) {
  const a = { ...ui };
  
  // Handle bald hair (no color needed)
  if (a.hair_length === "bald") a.hair_color = "none";
  
  // Apply defaults for all required attributes
  a.gender      = a.gender      || "woman";
  a.background  = a.background  || "studio";
  a.outfit      = a.outfit      || "tee";
  a.skin_tone   = a.skin_tone   || "medium";
  a.hair_length = a.hair_length || "short";
  a.hair_color  = a.hair_color  || "brown";
  a.eye_color   = a.eye_color   || "brown";
  a.body_type   = a.body_type   || "average";
  a.bust_size   = a.bust_size   || "medium";
  a.butt_size   = a.butt_size   || "medium";
  a.mood        = a.mood        || "confident";
  
  // Framing & ratio
  a.framing     = a.framing     || "hs";
  a.ratio       = a.ratio       || (a.framing === "wu" ? "3:4" : "1:1");
  
  // Neckline (women only, optional)
  a.neckline    = a.neckline    || undefined;
  
  // Resolution
  a.px          = a.px          || 384;
  
  // Mode flags
  a.fast        = true;
  // ⚠️ NO "safe" here - decided entirely by buildPayload in api.js (always false)
  
  return a;
}

/**
 * Generate a stable canonical key from attributes
 * Used for seed derivation and cache lookups
 * Order matters for consistency
 */
export function stableKey(a) {
  const k = {
    ratio: a.ratio,
    px: a.px,
    gender: a.gender,
    background: a.background,
    outfit: a.outfit,
    skin_tone: a.skin_tone,
    hair_length: a.hair_length,
    hair_color: a.hair_color,
    eye_color: a.eye_color,
    body_type: a.body_type,
    bust_size: a.bust_size,
    butt_size: a.butt_size,
    mood: a.mood,
    framing: a.framing,
    neckline: a.neckline || "-"
  };
  return JSON.stringify(k);
}

/**
 * FNV-1a 32-bit hash function
 * Fast, deterministic hash for seed generation
 */
export function fnv1a32(str) {
  let h = 0x811c9dc5 >>> 0;
  for (let i = 0; i < str.length; i++) {
    h ^= str.charCodeAt(i);
    h = (h + ((h << 1) + (h << 4) + (h << 7) + (h << 8) + (h << 24))) >>> 0;
  }
  return h >>> 0;
}

/**
 * Derive a deterministic seed from attribute key
 * Same attributes = same seed = same face (cache hit)
 */
export function deriveSeedFromKey(key) {
  return fnv1a32("PGv1|" + key);
}

/**
 * Generate a random seed for exploration (Shuffle mode)
 */
export function randomSeed() {
  if (globalThis.crypto?.getRandomValues) {
    const u = new Uint32Array(1);
    crypto.getRandomValues(u);
    return u[0] >>> 0;
  }
  // Fallback for environments without crypto API
  return (Math.random() * 0xffffffff) >>> 0;
}

// Storage disabled for now (Supabase will come later)

/**
 * Auto-calculate ratio & px from framing mode
 */
export function autoFromFraming(framing) {
  if (framing === "wu") return { ratio: "3:4", px: 512 };
  if (framing === "cu") return { ratio: "1:1", px: 448 };
  return { ratio: "1:1", px: 384 };
}

/**
 * Clean up blob URL to prevent memory leaks
 */
export function revokeBlobURL(url) {
  try {
    if (url) URL.revokeObjectURL(url);
  } catch (e) {
    // Ignore cleanup errors
  }
}
