import { supabase } from "../utils/supabase/client";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || window.location.origin;

type ApiOptions = RequestInit & { auth?: boolean };

async function getAuthHeaders(enableAuth: boolean): Promise<Record<string, string>> {
  if (!enableAuth) return {};

  const { data, error } = await supabase.auth.getSession();
  if (error) {
    console.error("[apiClient] Unable to read session", error.message);
    return {};
  }

  const token = data.session?.access_token;
  if (!token) return {};

  return { Authorization: `Bearer ${token}` };
}

async function request<T>(method: string, path: string, options: ApiOptions = {}): Promise<T> {
  const { auth = false, headers, body, ...rest } = options;
  const authHeaders = await getAuthHeaders(auth);
  const mergedHeaders = new Headers(headers);

  if (body && !(body instanceof FormData)) {
    mergedHeaders.set("Content-Type", "application/json");
  }

  Object.entries(authHeaders).forEach(([key, value]) => mergedHeaders.set(key, value));

  const response = await fetch(`${API_BASE_URL}${path}`, {
    ...rest,
    method,
    body,
    headers: mergedHeaders,
  });

  const text = await response.text();
  let data: any = null;

  if (text) {
    try {
      data = JSON.parse(text);
    } catch (error) {
      console.error("[apiClient] Failed to parse response", error);
    }
  }

  if (!response.ok) {
    const message = data?.error || data?.message || `Request failed with status ${response.status}`;
    throw new Error(message);
  }

  return data as T;
}

export async function apiGet<T>(path: string, options?: ApiOptions) {
  return request<T>("GET", path, options);
}

export async function apiPost<T>(path: string, body?: any, options?: ApiOptions) {
  return request<T>("POST", path, { ...options, body: body ? JSON.stringify(body) : undefined });
}
