/**
 * PhotoGlow Figma Plugin - Configuration
 * Version: V2 (Preview System Refactor)
 */

// Backend API endpoint (proxy mode for binary JPEG)
export const API = "https://image-generator-api-chi.vercel.app/api/v1-preview.mjs";

// Framing → ratio/px par défaut (rapide)
export const PRESETS = {
  hs: { ratio: "1:1", px: 384 }, // Head & Shoulders
  cu: { ratio: "1:1", px: 448 }, // Chest-Up
  wu: { ratio: "3:4", px: 512 }, // Waist-Up
};
