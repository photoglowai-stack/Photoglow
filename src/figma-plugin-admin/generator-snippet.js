/**
 * PhotoGlow - Admin Category Image Generator
 * 
 * Code snippet prêt à utiliser dans le plugin Figma.
 * Système de génération massive avec file séquentielle.
 * 
 * Usage:
 * 
 * const jobs = [
 *   {
 *     slug: 'ai-headshots',
 *     prompt: 'Professional portrait...',
 *     aspect_ratio: '3:4',
 *     width: 1536,
 *     model: 'flux',
 *     persist: true,
 *     collection: 'admin-2025-11-10'
 *   },
 *   // ... more jobs
 * ];
 * 
 * await generateAll(jobs, (p) => {
 *   figma.notify(`(${p.index}/${p.total}) ${p.state === 'ok' ? '✅' : '⚠️'} ${p.url || p.error}`);
 * });
 */

// ========================================
// CONFIG (adapter le domaine si besoin)
// ========================================

const BASE_URL = "https://image-generator-api-chi.vercel.app";
const ENDPOINT = `${BASE_URL}/v1/ideas/generate`;
const DELAY_MS = 450; // pacing anti-429
const MAX_RETRIES = 2; // retries 429/5xx

// ========================================
// IDEMPOTENCY KEY GENERATOR
// ========================================

/**
 * Génère une clé d'idempotence déterministe
 * Hash SHA-256 des attributs essentiels
 * 
 * @param {Object} item - Job à générer
 * @returns {Promise<string>} - Clé d'idempotence (8 octets hex)
 */
async function makeIdemKey(item) {
  const s = [
    item.slug,
    item.prompt,
    item.aspect_ratio || "",
    item.width || "",
    item.height || "",
    item.model || "flux",
    item.persist ? "1" : "0",
    item.collection || "",
  ].join("|");

  const data = new TextEncoder().encode(s);
  const hash = await crypto.subtle.digest("SHA-256", data);
  return Array.from(new Uint8Array(hash))
    .slice(0, 8)
    .map((b) => b.toString(16).padStart(2, "0"))
    .join("");
}

// ========================================
// API CALL WITH RETRY
// ========================================

/**
 * Appelle l'endpoint de génération avec retry automatique
 * 
 * @param {Object} item - Job à générer
 * @param {number} attempt - Numéro de tentative (0-based)
 * @returns {Promise<Object>} - Réponse API
 * @throws {Error} - Si échec après MAX_RETRIES
 */
async function callGenerate(item, attempt = 0) {
  const idem = await makeIdemKey(item);

  const res = await fetch(ENDPOINT, {
    method: "POST",
    headers: {
      "content-type": "application/json",
      "idempotency-key": idem,
    },
    body: JSON.stringify({
      slug: item.slug,
      prompt: item.prompt,
      aspect_ratio: item.aspect_ratio,
      width: item.width,
      height: item.height,
      model: item.model || "flux",
      persist: true, // IMPORTANT
      collection: item.collection,
      // Méta (facultatif)
      category_id: item.category_id,
      prompt_index: item.prompt_index,
      prompt_title: item.prompt_title,
      prompt_text: item.prompt_text,
      style: item.style,
    }),
  });

  if (!res.ok) {
    // Retry sur 429 ou 5xx
    if ((res.status === 429 || res.status >= 500) && attempt < MAX_RETRIES) {
      await new Promise((r) => setTimeout(r, (attempt + 1) * 600));
      return callGenerate(item, attempt + 1);
    }

    const t = await res.text().catch(() => "");
    throw new Error(
      `HTTP ${res.status} ${res.statusText} — ${t.slice(0, 180)}`
    );
  }

  return res.json();
}

// ========================================
// SEQUENTIAL GENERATOR
// ========================================

/**
 * Exécute les jobs en séquence avec pacing
 * 
 * @param {Array<Object>} jobs - Liste des jobs à générer
 * @param {Function} onProgress - Callback de progression (optionnel)
 * @returns {Promise<Array<Object>>} - Résultats
 * 
 * @example
 * await generateAll(jobs, (p) => {
 *   console.log(`${p.index}/${p.total} - ${p.state}`);
 * });
 */
export async function generateAll(jobs, onProgress) {
  const results = [];

  for (let i = 0; i < jobs.length; i++) {
    try {
      const out = await callGenerate(jobs[i]);
      results.push({ ok: true, item: jobs[i], out });
      onProgress?.({
        index: i + 1,
        total: jobs.length,
        state: "ok",
        url: out.image_url,
      });
    } catch (e) {
      results.push({ ok: false, item: jobs[i], error: String(e) });
      onProgress?.({
        index: i + 1,
        total: jobs.length,
        state: "error",
        error: String(e),
      });
    }

    // Pacing (sauf dernier job)
    if (i < jobs.length - 1) {
      await new Promise((r) => setTimeout(r, DELAY_MS));
    }
  }

  return results;
}

// ========================================
// EXEMPLE D'USAGE
// ========================================

/**
 * Exemple : Générer des images pour toutes les catégories
 */
async function exampleUsage() {
  // 1. Charger les catégories depuis /api/presets (ou JSON local)
  const response = await fetch(
    "https://image-generator-api-chi.vercel.app/api/presets"
  );
  const presets = await response.json();

  // 2. Construire les jobs
  const jobs = [];
  const collection = `admin-${new Date().toISOString().split("T")[0]}`;

  presets.categories.forEach((cat) => {
    cat.prompts.forEach((prompt, idx) => {
      jobs.push({
        slug: cat.slug,
        prompt: prompt.text,
        aspect_ratio: "3:4",
        width: 1536,
        model: "flux",
        persist: true,
        collection,
        category_id: cat.id,
        prompt_index: idx,
        prompt_title: prompt.title,
        prompt_text: prompt.text,
        style: prompt.style,
      });
    });
  });

  // 3. Lancer la génération
  console.log(`Starting generation: ${jobs.length} jobs`);

  const results = await generateAll(jobs, (p) => {
    // Progress callback
    const icon = p.state === "ok" ? "✅" : "⚠️";
    const msg = p.url?.split("/").pop()?.slice(0, 30) || p.error?.slice(0, 50);
    console.log(`(${p.index}/${p.total}) ${icon} ${msg}`);

    // Figma notification (si disponible)
    if (typeof figma !== "undefined") {
      figma.notify(`(${p.index}/${p.total}) ${icon} ${msg}`);
    }
  });

  // 4. Résumé
  const success = results.filter((r) => r.ok).length;
  const errors = results.filter((r) => !r.ok).length;

  console.log(`\n✅ Generation complete!`);
  console.log(`   - Success: ${success}`);
  console.log(`   - Errors: ${errors}`);

  return results;
}

// ========================================
// EXPORT POUR FIGMA
// ========================================

// Dans le plugin Figma, utiliser :
// await generateAll(jobs, p => figma.notify(`(${p.index}/${p.total}) ${p.state==="ok"?"✅":"⚠️"} ${p.url || p.error}`));
