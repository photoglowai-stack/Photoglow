import { handleCredits, handleModels, handlePresets, handleSystem } from "../lib/core-handlers.mjs";

const ROUTES = new Map([
  ["/api/credits", handleCredits],
  ["/api/credits/debit", handleCredits],
  ["/api/presets", handlePresets],
  ["/api/system", handleSystem],
  ["/api/ping", handleSystem],
  ["/api/models", handleModels],
]);

export default async function handler(req, res) {
  const pathname = normalizePath(req);
  const target = ROUTES.get(pathname);
  if (!target) {
    res.status(404).json({ error: "not_found", path: pathname });
    return;
  }
  return target(req, res);
}

function normalizePath(req) {
  try {
    const url = new URL(req.url, `http://${req.headers.host || "localhost"}`);
    return url.pathname;
  } catch {
    const raw = String(req.url || "");
    return raw.split("?")[0];
  }
}
