/**
 * Centralized error handler for API requests
 * Handles network errors, timeouts, and fallbacks gracefully
 */

export interface FetchOptions extends RequestInit {
  timeout?: number;
}

export class NetworkError extends Error {
  constructor(message: string, public statusCode?: number) {
    super(message);
    this.name = 'NetworkError';
  }
}

/**
 * Enhanced fetch with timeout and better error handling
 */
export async function fetchWithTimeout(
  url: string,
  options: FetchOptions = {}
): Promise<Response> {
  const { timeout = 10000, ...fetchOptions } = options;

  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), timeout);

  try {
    const response = await fetch(url, {
      ...fetchOptions,
      signal: controller.signal,
    });

    clearTimeout(timeoutId);
    return response;
  } catch (error: any) {
    clearTimeout(timeoutId);

    if (error.name === 'AbortError') {
      throw new NetworkError('Request timeout - server is taking too long to respond');
    }

    if (error.message.includes('Failed to fetch')) {
      throw new NetworkError('Network error - unable to connect to server');
    }

    throw error;
  }
}

/**
 * Safe JSON parse that returns default value on error
 */
export async function safeJsonParse<T>(
  response: Response,
  defaultValue: T
): Promise<T> {
  try {
    return await response.json();
  } catch (error) {
    console.warn('Failed to parse JSON response, using default value');
    return defaultValue;
  }
}

/**
 * Determines if an error should be shown to the user
 */
export function shouldShowError(error: any): boolean {
  // Don't show errors for timeouts or network issues - these are handled gracefully
  if (error instanceof NetworkError) {
    return false;
  }

  if (error.name === 'AbortError') {
    return false;
  }

  if (error.message?.includes('Failed to fetch')) {
    return false;
  }

  // Show all other errors
  return true;
}

/**
 * Get user-friendly error message
 */
export function getUserFriendlyErrorMessage(error: any): string {
  if (error instanceof NetworkError) {
    return 'Service temporairement indisponible';
  }

  if (error.name === 'AbortError') {
    return 'La requête a pris trop de temps';
  }

  if (error.message?.includes('Failed to fetch')) {
    return 'Impossible de se connecter au serveur';
  }

  return error.message || 'Une erreur inattendue s\'est produite';
}

/**
 * Log error for debugging without showing to user
 */
export function logError(context: string, error: any): void {
  if (shouldShowError(error)) {
    console.error(`[${context}] Error:`, error);
  } else {
    console.log(`[${context}] Network/timeout error (using fallback):`, error.message);
  }
}
