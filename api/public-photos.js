import { ensureSupabaseClient, getSupabaseAnon } from "../lib/supabase.mjs";

const TABLE_META = process.env.TABLE_META || "photos_meta";
const DEFAULT_LIMIT = Number(process.env.PUBLIC_PHOTOS_LIMIT || 16);

export default async function handler(req, res) {
  res.setHeader("Content-Type", "application/json; charset=utf-8");

  if (req.method !== "GET") {
    return res.status(405).json({ success: false, error: "method_not_allowed" });
  }

  try {
    const supabase = ensureSupabaseClient(getSupabaseAnon(), "anon");
    const limit = Number(req.query?.limit || DEFAULT_LIMIT);

    const { data, error } = await supabase
      .from(TABLE_META)
      .select("id,image_url,prompt,category,created_at")
      .eq("is_public", true)
      .order("created_at", { ascending: false })
      .limit(limit);

    if (error) {
      throw error;
    }

    return res.status(200).json({ success: true, photos: data || [] });
  } catch (error) {
    console.error("[public-photos]", error?.message || error);
    return res.status(500).json({ success: false, error: error?.message || "internal_error" });
  }
}
