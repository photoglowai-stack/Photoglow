/**
 * Sélecteur de ratio d'aspect
 * Permet de choisir le format de l'image (1:1, 16:9, etc.)
 * 
 * @module components/feature/AspectRatioSelect
 */

'use client';

import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Square, RectangleHorizontal, RectangleVertical, Monitor, Smartphone } from 'lucide-react';
import type { AspectRatio } from '@/lib/constants/models';
import { ASPECT_RATIO_LABELS } from '@/lib/constants/models';

/**
 * Configuration des ratios avec icônes
 */
const RATIO_CONFIG: Record<
  AspectRatio,
  {
    icon: React.ReactNode;
    label: string;
    description: string;
  }
> = {
  '1:1': {
    icon: <Square className="h-5 w-5" />,
    label: 'Square',
    description: 'Instagram, Profile',
  },
  '16:9': {
    icon: <RectangleHorizontal className="h-5 w-5" />,
    label: 'Landscape',
    description: 'Desktop, YouTube',
  },
  '9:16': {
    icon: <RectangleVertical className="h-5 w-5" />,
    label: 'Portrait',
    description: 'Mobile, Stories',
  },
  '4:3': {
    icon: <Monitor className="h-5 w-5" />,
    label: 'Standard',
    description: 'Classic photos',
  },
  '3:4': {
    icon: <Smartphone className="h-5 w-5" />,
    label: 'Vertical',
    description: 'Phone screen',
  },
};

/**
 * Props pour AspectRatioSelect
 */
export interface AspectRatioSelectProps {
  /** Ratio sélectionné */
  value: AspectRatio;
  /** Callback lors du changement */
  onChange: (ratio: AspectRatio) => void;
  /** Désactiver le select */
  disabled?: boolean;
  /** Affichage compact (sans descriptions) */
  compact?: boolean;
}

/**
 * AspectRatioSelect - Sélecteur de ratio d'aspect
 * 
 * Grid de boutons pour choisir le format de l'image.
 * Interface visuelle plus intuitive qu'un select classique.
 * 
 * Fonctionnalités :
 * - 5 ratios disponibles
 * - Icônes visuelles
 * - Labels et descriptions
 * - Mode compact (sans descriptions)
 * - Accessibilité complète (radio group)
 * 
 * @example
 * ```tsx
 * const [ratio, setRatio] = useState<AspectRatio>('1:1');
 * 
 * <AspectRatioSelect
 *   value={ratio}
 *   onChange={setRatio}
 * />
 * ```
 */
export function AspectRatioSelect({
  value,
  onChange,
  disabled = false,
  compact = false,
}: AspectRatioSelectProps) {
  return (
    <div className="w-full space-y-2">
      {/* Label */}
      <Label className="text-base font-medium text-white">Aspect Ratio</Label>

      {!compact && (
        <p className="text-sm text-gray-400">Choose the format for your image</p>
      )}

      {/* Radio group avec boutons */}
      <div
        className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3"
        role="radiogroup"
        aria-label="Select aspect ratio"
      >
        {(Object.entries(RATIO_CONFIG) as [AspectRatio, typeof RATIO_CONFIG[AspectRatio]][]).map(
          ([ratioKey, config]) => {
            const isSelected = value === ratioKey;

            return (
              <Button
                key={ratioKey}
                type="button"
                onClick={() => onChange(ratioKey)}
                disabled={disabled}
                variant={isSelected ? 'default' : 'outline'}
                className={`h-auto flex-col items-center justify-center gap-2 p-4 ${
                  isSelected
                    ? 'bg-gradient-to-r from-pink-500 to-purple-600 border-pink-500 hover:from-pink-600 hover:to-purple-700'
                    : 'bg-gray-900/50 border-gray-800 hover:bg-gray-800 hover:border-pink-500'
                }`}
                role="radio"
                aria-checked={isSelected}
                aria-label={`${config.label} aspect ratio - ${ratioKey}`}
              >
                {/* Icon */}
                <div className={isSelected ? 'text-white' : 'text-gray-400'}>
                  {config.icon}
                </div>

                {/* Label */}
                <div className="text-center space-y-0.5">
                  <div className="text-sm font-medium">{config.label}</div>
                  <div className="text-xs text-gray-400">{ratioKey}</div>
                  {!compact && (
                    <div className="text-xs text-gray-500">{config.description}</div>
                  )}
                </div>
              </Button>
            );
          }
        )}
      </div>
    </div>
  );
}
