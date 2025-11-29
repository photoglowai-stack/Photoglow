/**
 * PhotoGlow Figma Plugin - API Client
 * Version: V2 (Preview System Refactor)
 */

import { API } from "./config.js";
import { stableKey, deriveSeedFromKey, randomSeed, revokeBlobURL, autoFromFraming } from "./utils.js";

let currentCtrl = null;
let currentBlobURL = null;

export function getCurrentBlobURL() {
  return currentBlobURL;
}

export async function previewFigma(ui, { mode = "speed" } = {}) {
  if (currentCtrl) currentCtrl.abort();
  currentCtrl = new AbortController();

  // 1) normaliser inputs
  const { ratio, px } = ui.ratio && ui.px ? ui : autoFromFraming(ui.framing || "hs");
  const base = {
    proxy: true,
    fast: true,
    safe: false,            // IMPORTANT : nsfw off
    ratio: ratio,
    px: px,
    gender: ui.gender || "woman",
    background: ui.background || "studio",
    outfit: ui.outfit || "tee",
    skin_tone: ui.skin_tone || "medium",
    hair_length: ui.hair_length || "short",
    hair_color: ui.hair_color || "brown",
    eye_color: ui.eye_color || "brown",
    body_type: ui.body_type || "average",
    bust_size: ui.bust_size || "medium",
    butt_size: ui.butt_size || "medium",
    mood: ui.mood || "confident",
    framing: ui.framing || "hs",
    neckline: ui.neckline, // optionnel
    negative_prompt: ui.negative_prompt || "extreme close-up, face-only, tight crop, zoomed-in face, forehead cut, chin cut, cropped hairline, soft focus, blur, low-res, jpeg artifacts",
  };

  // 2) seed selon mode
  if (mode === "shuffle") {
    base.seed = randomSeed();
  } else {
    const key = stableKey({ ...base });
    base.seed = ui.seed ?? deriveSeedFromKey(key);
  }

  // 3) fetch durable (retry 2x sur 502)
  const headers = {
    "Content-Type": "application/json",
    "Accept": "image/*,application/json",
    "idempotency-key": crypto.randomUUID?.() || String(Date.now())
  };

  const doFetch = async (attempt = 0) => {
    const res = await fetch(API, { method: "POST", headers, body: JSON.stringify(base), signal: currentCtrl.signal });

    // Debug headers
    const prov = res.headers.get("x-provider-url");
    if (prov) console.log("[PG] x-provider-url:", prov);

    const ct = (res.headers.get("content-type") || "").toLowerCase();

    if (res.ok && ct.startsWith("image/")) {
      const blob = await res.blob();
      revokeBlobURL(currentBlobURL);
      currentBlobURL = URL.createObjectURL(blob);
      return { url: currentBlobURL, seed: Number(res.headers.get("x-seed")) || base.seed, mode: "blob" };
    }

    // JSON fallback
    let j = null; 
    try { j = await res.json(); } catch {}
    if (j?.ok && j.provider_url) {
      revokeBlobURL(currentBlobURL);
      currentBlobURL = null; // on affiche via <img src>
      return { url: j.provider_url, seed: base.seed, mode: "url" };
    }

    // 502 → retry court
    if (res.status === 502 && attempt < 2) {
      await new Promise(r => setTimeout(r, attempt === 0 ? 250 : 600));
      return doFetch(attempt + 1);
    }

    throw new Error(`Preview failed [${res.status}] ${(j && j.error) ? j.error : ""}`);
  };

  return doFetch();
}

export function cleanup() {
  if (currentCtrl) currentCtrl.abort();
  revokeBlobURL(currentBlobURL);
  currentBlobURL = null;
}
