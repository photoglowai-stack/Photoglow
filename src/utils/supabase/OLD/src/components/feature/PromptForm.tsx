/**
 * Formulaire de saisie de prompt pour génération d'images
 * Composant client avec validation en temps réel
 * 
 * @module components/feature/PromptForm
 */

'use client';

import { useState, useCallback } from 'react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Sparkles, Loader2 } from 'lucide-react';
import { useDebounce } from '@/hooks/useDebounce';
import type { PreviewParams } from '@/lib/validators';

/**
 * Props pour PromptForm
 */
export interface PromptFormProps {
  /** Callback lors de la soumission du formulaire */
  onSubmit: (params: PreviewParams) => void | Promise<void>;
  /** Callback pour preview (optionnel) */
  onPreview?: (prompt: string) => void | Promise<void>;
  /** État de chargement externe */
  isLoading?: boolean;
  /** Valeur initiale du prompt */
  initialPrompt?: string;
  /** Placeholder personnalisé */
  placeholder?: string;
  /** Longueur min du prompt */
  minLength?: number;
  /** Longueur max du prompt */
  maxLength?: number;
}

/**
 * PromptForm - Formulaire de saisie de prompt
 * 
 * Composant client interactif pour saisir un prompt de génération.
 * 
 * Fonctionnalités :
 * - Validation en temps réel (longueur min/max)
 * - Counter de caractères
 * - Preview optionnel (debounced)
 * - Boutons Preview et Generate
 * - Accessibilité complète
 * 
 * @example
 * ```tsx
 * <PromptForm
 *   onSubmit={async (params) => {
 *     const job = await api.createJob(params);
 *   }}
 *   onPreview={async (prompt) => {
 *     const url = await api.getPreview({ prompt, model: 'flux', aspectRatio: '1:1' });
 *   }}
 * />
 * ```
 */
export function PromptForm({
  onSubmit,
  onPreview,
  isLoading = false,
  initialPrompt = '',
  placeholder = 'Describe the image you want to create... (e.g., "Professional headshot of a woman in business attire, studio lighting, neutral background")',
  minLength = 10,
  maxLength = 1000,
}: PromptFormProps) {
  // ============================================
  // STATE
  // ============================================

  const [prompt, setPrompt] = useState(initialPrompt);
  const [isPreviewLoading, setIsPreviewLoading] = useState(false);

  // Debounce le prompt pour preview auto
  const debouncedPrompt = useDebounce(prompt, 1000);

  // ============================================
  // VALIDATION
  // ============================================

  const isValid = prompt.length >= minLength && prompt.length <= maxLength;
  const charCount = prompt.length;
  const isOverMax = charCount > maxLength;
  const isUnderMin = charCount > 0 && charCount < minLength;

  // ============================================
  // HANDLERS
  // ============================================

  /**
   * Handler pour le changement de texte
   */
  const handleChange = useCallback((e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setPrompt(e.target.value);
  }, []);

  /**
   * Handler pour preview
   */
  const handlePreview = useCallback(async () => {
    if (!isValid || !onPreview) return;

    setIsPreviewLoading(true);
    try {
      await onPreview(prompt);
    } catch (error) {
      console.error('Preview error:', error);
    } finally {
      setIsPreviewLoading(false);
    }
  }, [prompt, isValid, onPreview]);

  /**
   * Handler pour submit
   */
  const handleSubmit = useCallback(
    async (e: React.FormEvent) => {
      e.preventDefault();
      if (!isValid) return;

      await onSubmit({
        prompt,
        model: 'flux',
        aspectRatio: '1:1',
      });
    },
    [prompt, isValid, onSubmit]
  );

  // ============================================
  // RENDER
  // ============================================

  return (
    <form 
      onSubmit={handleSubmit} 
      className="w-full space-y-4"
      aria-label="AI image generation prompt form"
    >
      {/* Label */}
      <div className="space-y-2">
        <Label 
          htmlFor="prompt-input"
          className="text-base font-medium text-white"
        >
          Describe Your Image
        </Label>
        <p 
          id="prompt-description"
          className="text-sm text-gray-400"
        >
          Be specific and descriptive for best results. Include details about lighting, style, and composition.
        </p>
      </div>

      {/* Textarea */}
      <div className="relative">
        <Textarea
          id="prompt-input"
          value={prompt}
          onChange={handleChange}
          placeholder={placeholder}
          className={`min-h-[120px] resize-none bg-gray-900/50 border-gray-800 text-white placeholder:text-gray-500 focus:border-pink-500 focus:ring-pink-500/20 ${
            isOverMax ? 'border-red-500' : isUnderMin ? 'border-yellow-500' : ''
          }`}
          aria-describedby="prompt-description prompt-counter"
          aria-invalid={!isValid}
          disabled={isLoading}
        />

        {/* Character counter */}
        <div 
          id="prompt-counter"
          className={`absolute bottom-3 right-3 text-xs ${
            isOverMax ? 'text-red-400' : isUnderMin ? 'text-yellow-400' : 'text-gray-500'
          }`}
          aria-live="polite"
        >
          {charCount}/{maxLength}
        </div>
      </div>

      {/* Validation messages */}
      {isUnderMin && (
        <p className="text-sm text-yellow-400" role="alert">
          Please write at least {minLength} characters for better results.
        </p>
      )}
      {isOverMax && (
        <p className="text-sm text-red-400" role="alert">
          Prompt is too long. Maximum {maxLength} characters.
        </p>
      )}

      {/* Action buttons */}
      <div className="flex flex-col sm:flex-row gap-3">
        {/* Preview button */}
        {onPreview && (
          <Button
            type="button"
            onClick={handlePreview}
            disabled={!isValid || isLoading || isPreviewLoading}
            variant="outline"
            className="flex-1 bg-gray-900/50 border-gray-800 hover:bg-gray-800 hover:border-pink-500"
          >
            {isPreviewLoading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Generating Preview...
              </>
            ) : (
              <>
                <Sparkles className="mr-2 h-4 w-4" />
                Preview
              </>
            )}
          </Button>
        )}

        {/* Generate button */}
        <Button
          type="submit"
          disabled={!isValid || isLoading}
          className="flex-1 bg-gradient-to-r from-pink-500 to-purple-600 hover:from-pink-600 hover:to-purple-700"
        >
          {isLoading ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Generating...
            </>
          ) : (
            <>
              <Sparkles className="mr-2 h-4 w-4" />
              Generate
            </>
          )}
        </Button>
      </div>
    </form>
  );
}
