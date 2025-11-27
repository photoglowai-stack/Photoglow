export const config = { runtime: "nodejs" };

import { setCORS } from "../lib/http.mjs";
import {
  ensureSupabaseClient,
  getSupabaseAnon,
  getSupabaseEnv,
  getSupabaseServiceRole,
} from "../lib/supabase.mjs";

const supabaseAnon = getSupabaseAnon();
const supabaseAdmin = getSupabaseServiceRole();

const BUCKET_UPLOADS = process.env.BUCKET_UPLOADS || "photos";
const BUCKET_IMAGES = process.env.BUCKET_IMAGES || "generated_images";
const TABLE_META = process.env.TABLE_META || "photos_meta";
const ADMIN_EMAILS = (process.env.ADMIN_EMAILS || "")
  .split(",")
  .map(s => s.trim().toLowerCase())
  .filter(Boolean);

function withQuery(req, urlObj) {
  if (!req.query) {
    req.query = Object.fromEntries(urlObj.searchParams.entries());
  }
  return req;
}

// ---------- SYSTEM ----------
async function handleSystem(req, res) {
  res.setHeader("Content-Type", "application/json; charset=utf-8");

  const isPing = req.url.endsWith("/system") && (req.query?.ping !== undefined || req.method === "HEAD");
  if (isPing) return res.status(200).json({ ok: true, msg: "pong" });
  if (req.url.endsWith("/ping")) return res.status(200).json({ ok: true, msg: "pong" });

  try {
    const env = getSupabaseEnv();
    ensureSupabaseClient(supabaseAdmin, "service");
    ensureSupabaseClient(supabaseAnon, "anon");

    const checks = [];

    if (supabaseAnon) {
      try {
        const { error } = await supabaseAnon.from("photos_meta").select("id").limit(1);
        checks.push({ key: "db_photos_meta", ok: !error, error: error?.message || null });
      } catch (e) {
        checks.push({ key: "db_photos_meta", ok: false, error: String(e?.message || e) });
      }
    } else {
      checks.push({ key: "db_photos_meta", ok: false, error: "missing_supabase_anon_client" });
    }

    if (supabaseAdmin) {
      try {
        const { data: buckets, error } = await supabaseAdmin.storage.listBuckets();
        if (error) throw error;

        const names = (buckets || []).map(b => b.name);
        checks.push({ key: "bucket_uploads", expected: BUCKET_UPLOADS, ok: names.includes(BUCKET_UPLOADS), available: names });
        checks.push({ key: "bucket_generated", expected: BUCKET_IMAGES, ok: names.includes(BUCKET_IMAGES) });
      } catch (e) {
        checks.push({ key: "buckets_list", ok: false, error: String(e?.message || e) });
      }
    } else {
      checks.push({ key: "buckets_list", ok: false, error: "missing_supabase_service_client" });
    }

    const ok = checks.every(c => c.ok);
    const payload = { ok, env: { BUCKET_UPLOADS, BUCKET_IMAGES, supabase: env }, checks };

    if (!supabaseAdmin) {
      payload.note = "storage_verification_unavailable";
    }

    return res.status(200).json(payload);
  } catch (e) {
    return res.status(500).json({ ok: false, error: e?.message || "internal_error" });
  }
}

// ---------- PRESETS ----------
async function handlePresets(req, res) {
  try {
    if (req.method !== "GET") return res.status(405).json({ error: "Method not allowed" });

    if (!supabaseAnon) return res.status(500).json({ error: "missing_env_supabase" });
    ensureSupabaseClient(supabaseAnon, "anon");

    const { data: cats, error: e1 } = await supabaseAnon
      .from("categories")
      .select("slug,name,default_aspect_ratio,default_model,active")
      .eq("active", true)
      .order("name", { ascending: true });

    if (e1) return res.status(500).json({ error: e1.message });

    const { data: presets, error: e2 } = await supabaseAnon
      .from("prompt_presets")
      .select("id,category_slug,name,prompt,weight")
      .order("weight", { ascending: true });

    if (e2) return res.status(500).json({ error: e2.message });

    return res.status(200).json({ success: true, categories: cats || [], presets: presets || [] });
  } catch (e) {
    console.error("❌ /api/presets error:", e?.message || e);
    return res.status(500).json({ error: "internal_error" });
  }
}

// ---------- CREDITS ----------
async function resolveUserIdByEmail(email) {
  const { data: page1, error } = await supabaseAdmin.auth.admin.listUsers({ page: 1, perPage: 500 });
  if (error) throw error;
  const hit = (page1?.users || []).find(
    u => (u.email || "").toLowerCase() === String(email).toLowerCase()
  );
  return hit?.id || null;
}

async function handleCredits(req, res) {
  setCORS(req, res, {
    allowMethods: "GET,POST,OPTIONS",
    allowHeaders: "content-type, authorization, idempotency-key",
  });
  if (req.method === "OPTIONS") return res.status(204).end();
  res.setHeader("Content-Type", "application/json; charset=utf-8");

  if (req.method === "GET" && (req.query?.health === "1" || req.query?.health === 1)) {
    return res.status(200).json({
      ok: true,
      has_env: {
        SUPABASE_URL: !!process.env.SUPABASE_URL,
        SUPABASE_SERVICE_ROLE_KEY: !!process.env.SUPABASE_SERVICE_ROLE_KEY || !!process.env.SERVICE_ROLE,
        SUPABASE_ANON_KEY: !!process.env.SUPABASE_ANON_KEY
      }
    });
  }

  if (!supabaseAnon || !supabaseAdmin) {
    return res.status(500).json({ success: false, error: "missing_env" });
  }

  ensureSupabaseClient(supabaseAnon, "anon");
  ensureSupabaseClient(supabaseAdmin, "service");

  const auth = req.headers.authorization || "";
  const token = auth.startsWith("Bearer ") ? auth.slice(7) : null;
  if (!token) return res.status(401).json({ success: false, error: "missing_bearer_token" });

  const { data: userData, error: authErr } = await supabaseAnon.auth.getUser(token);
  if (authErr || !userData?.user) {
    return res.status(401).json({ success: false, error: "invalid_token" });
  }
  const requester_id = userData.user.id;
  const requester_email = (userData.user.email || "").toLowerCase();
  const isAdmin = ADMIN_EMAILS.includes(requester_email);

  if (req.method === "GET") {
    const { data: row, error: selErr } = await supabaseAdmin
      .from("user_credits")
      .select("credits")
      .eq("user_id", requester_id)
      .maybeSingle();

    if (selErr) {
      return res.status(500).json({ success: false, error: selErr.message });
    }

    if (!row) {
      const { error: insErr } = await supabaseAdmin
        .from("user_credits")
        .insert({ user_id: requester_id, credits: 0 });
      if (insErr) return res.status(500).json({ success: false, error: insErr.message });
      return res.status(200).json({ success: true, user_id: requester_id, credits: 0 });
    }

    return res.status(200).json({ success: true, user_id: requester_id, credits: row.credits });
  }

  if (req.method === "POST") {
    const { op = "debit", amount = 1, target_user_id, target_email } = req.body || {};
    if (!["debit", "credit", "reset", "set"].includes(op)) {
      return res.status(400).json({ success: false, error: "invalid_op" });
    }

    let targetId = requester_id;
    if (isAdmin && (target_user_id || target_email)) {
      targetId = target_user_id || await resolveUserIdByEmail(target_email);
      if (!targetId) return res.status(404).json({ success: false, error: "user_not_found" });
    } else if (!isAdmin && (target_user_id || target_email)) {
      return res.status(403).json({ success: false, error: "forbidden_target" });
    }

    try {
      if (op === "debit") {
        const { error } = await supabaseAdmin.rpc("debit_credits", {
          p_user_id: targetId, p_amount: amount
        });
        if (error) {
          const msg = String(error.message || "");
          if (msg.includes("insufficient_credits")) {
            return res.status(402).json({ success: false, error: "insufficient_credits" });
          }
          if (msg.includes("no_credits_row")) {
            return res.status(402).json({ success: false, error: "no_credits_row" });
          }
          return res.status(500).json({ success: false, error: msg });
        }
      } else if (op === "credit") {
        if (!isAdmin && targetId !== requester_id) {
          return res.status(403).json({ success: false, error: "forbidden" });
        }
        const { error } = await supabaseAdmin.rpc("credit_credits", {
          p_user_id: targetId, p_amount: amount
        });
        if (error) return res.status(500).json({ success: false, error: error.message });
      } else if (op === "reset") {
        const { error } = await supabaseAdmin
          .from("user_credits")
          .upsert({ user_id: targetId, credits: 0 }, { onConflict: "user_id" });
        if (error) return res.status(500).json({ success: false, error: error.message });
      } else if (op === "set") {
        if (!isAdmin) return res.status(403).json({ success: false, error: "forbidden" });
        const { error } = await supabaseAdmin
          .from("user_credits")
          .upsert({ user_id: targetId, credits: Number(amount || 0) }, { onConflict: "user_id" });
        if (error) return res.status(500).json({ success: false, error: error.message });
      }

      const { data: row2, error: sel2 } = await supabaseAdmin
        .from("user_credits")
        .select("credits")
        .eq("user_id", targetId)
        .maybeSingle();
      if (sel2) return res.status(500).json({ success: false, error: sel2.message });

      return res.status(200).json({ success: true, user_id: targetId, credits: row2?.credits ?? 0, op });
    } catch (e) {
      return res.status(500).json({ success: false, error: String(e?.message || e) });
    }
  }

  return res.status(405).json({ success: false, error: "method_not_allowed" });
}

// ---------- ROUTER ----------
export default async function handler(req, res) {
  const urlObj = new URL(req.url, `http://${req.headers.host || "localhost"}`);
  const pathname = urlObj.pathname;
  withQuery(req, urlObj);

  const isSystem = pathname === "/api/system" || pathname.endsWith("/system") || pathname.endsWith("/system/");
  const isPresets = pathname === "/api/presets" || pathname.endsWith("/presets") || pathname.endsWith("/presets/");
  const isCredits = pathname === "/api/credits" || pathname.startsWith("/api/credits/");

  if (isSystem) return handleSystem(req, res);
  if (isPresets) return handlePresets(req, res);
  if (isCredits) return handleCredits(req, res);

  res.setHeader("Content-Type", "application/json; charset=utf-8");
  return res.status(404).json({ error: "not_found" });
}
