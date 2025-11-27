import { ensureSupabaseClient, getSupabaseServiceRole } from "../lib/supabase.mjs";

const TABLE_META = process.env.TABLE_META || "photos_meta";

async function getUserFromToken(token) {
  const supabase = ensureSupabaseClient(getSupabaseServiceRole(), "service");
  const { data, error } = await supabase.auth.getUser(token);
  if (error) throw error;
  return data?.user || null;
}

export default async function handler(req, res) {
  res.setHeader("Content-Type", "application/json; charset=utf-8");

  if (req.method !== "GET") {
    return res.status(405).json({ success: false, error: "method_not_allowed" });
  }

  try {
    const authHeader = req.headers?.authorization || "";
    const token = authHeader.replace("Bearer ", "").trim();

    if (!token) {
      return res.status(401).json({ success: false, error: "missing_token" });
    }

    const user = await getUserFromToken(token);
    if (!user?.id) {
      return res.status(401).json({ success: false, error: "invalid_token" });
    }

    const supabase = ensureSupabaseClient(getSupabaseServiceRole(), "service");
    const { data, error } = await supabase
      .from(TABLE_META)
      .select("id,image_url,prompt,created_at,category")
      .eq("user_id", user.id)
      .order("created_at", { ascending: false })
      .limit(100);

    if (error) throw error;

    return res.status(200).json({ success: true, photos: data || [] });
  } catch (error) {
    console.error("[user-photos]", error?.message || error);
    const status = String(error?.message || "").includes("JWT") ? 401 : 500;
    return res.status(status).json({ success: false, error: error?.message || "internal_error" });
  }
}
