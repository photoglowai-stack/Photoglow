/**
 * Client API centralisé avec gestion d'erreurs
 * @module lib/api/client
 */

import type { ApiResponse } from "@/types";
import { ERROR_MESSAGES } from "@/lib/constants";

/**
 * Options pour les requêtes API
 */
interface FetchOptions extends RequestInit {
  /** Token d'authentification optionnel */
  token?: string;
}

/**
 * Classe d'erreur API personnalisée
 */
export class ApiError extends Error {
  constructor(
    message: string,
    public statusCode?: number,
    public response?: unknown
  ) {
    super(message);
    this.name = "ApiError";
  }
}

/**
 * Client API avec gestion centralisée des erreurs et authentification
 */
class ApiClient {
  private baseUrl: string;

  constructor(baseUrl: string = "") {
    this.baseUrl = baseUrl;
  }

  /**
   * Effectue une requête HTTP avec gestion d'erreurs
   * @param endpoint - Endpoint de l'API (ex: "/api/credits")
   * @param options - Options de requête
   * @returns Promesse avec la réponse typée
   * @throws {ApiError} Si la requête échoue
   * @private
   */
  private async request<T>(
    endpoint: string,
    options: FetchOptions = {}
  ): Promise<T> {
    const { token, ...fetchOptions } = options;

    const headers: HeadersInit = {
      "Content-Type": "application/json",
      ...fetchOptions.headers,
    };

    if (token) {
      headers["Authorization"] = `Bearer ${token}`;
    }

    try {
      const response = await fetch(`${this.baseUrl}${endpoint}`, {
        ...fetchOptions,
        headers,
      });

      // Gérer les réponses non-JSON (ex: 204 No Content)
      const contentType = response.headers.get("content-type");
      const isJson = contentType?.includes("application/json");

      let data: unknown;
      if (isJson) {
        data = await response.json();
      }

      if (!response.ok) {
        const errorMessage =
          (data as ApiResponse)?.error ||
          (data as { message?: string })?.message ||
          ERROR_MESSAGES.SERVER_ERROR;

        throw new ApiError(errorMessage, response.status, data);
      }

      return (data || {}) as T;
    } catch (error) {
      if (error instanceof ApiError) {
        throw error;
      }

      // Erreur réseau ou autre
      if (error instanceof TypeError) {
        throw new ApiError(ERROR_MESSAGES.NETWORK_ERROR);
      }

      throw new ApiError(
        ERROR_MESSAGES.SERVER_ERROR,
        undefined,
        error instanceof Error ? error.message : String(error)
      );
    }
  }

  /**
   * Requête GET
   * @param endpoint - Endpoint de l'API
   * @param options - Options de requête
   * @returns Promesse avec la réponse typée
   * @example
   * await apiClient.get<Credits>("/api/credits", { token: "..." })
   */
  async get<T>(endpoint: string, options?: FetchOptions): Promise<T> {
    return this.request<T>(endpoint, { ...options, method: "GET" });
  }

  /**
   * Requête POST
   * @param endpoint - Endpoint de l'API
   * @param body - Corps de la requête
   * @param options - Options de requête
   * @returns Promesse avec la réponse typée
   * @example
   * await apiClient.post<ApiResponse>("/api/generate", { prompt: "..." }, { token: "..." })
   */
  async post<T>(
    endpoint: string,
    body?: unknown,
    options?: FetchOptions
  ): Promise<T> {
    return this.request<T>(endpoint, {
      ...options,
      method: "POST",
      body: body ? JSON.stringify(body) : undefined,
    });
  }

  /**
   * Requête PUT
   * @param endpoint - Endpoint de l'API
   * @param body - Corps de la requête
   * @param options - Options de requête
   * @returns Promesse avec la réponse typée
   */
  async put<T>(
    endpoint: string,
    body?: unknown,
    options?: FetchOptions
  ): Promise<T> {
    return this.request<T>(endpoint, {
      ...options,
      method: "PUT",
      body: body ? JSON.stringify(body) : undefined,
    });
  }

  /**
   * Requête DELETE
   * @param endpoint - Endpoint de l'API
   * @param options - Options de requête
   * @returns Promesse avec la réponse typée
   */
  async delete<T>(endpoint: string, options?: FetchOptions): Promise<T> {
    return this.request<T>(endpoint, { ...options, method: "DELETE" });
  }
}

/**
 * Instance singleton du client API
 */
export const apiClient = new ApiClient();
