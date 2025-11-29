/**
 * Sélecteur de modèle AI
 * Permet de choisir entre flux, sdxl, playground, custom
 * 
 * @module components/feature/ModelSelect
 */

'use client';

import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { Zap, Sparkles, Wand2, User } from 'lucide-react';
import type { AIModel } from '@/lib/constants/models';

/**
 * Configuration des modèles disponibles
 */
const MODEL_CONFIG: Record<
  AIModel,
  {
    label: string;
    description: string;
    icon: React.ReactNode;
    badge?: string;
    badgeVariant?: 'default' | 'secondary' | 'destructive' | 'outline';
  }
> = {
  flux: {
    label: 'FLUX',
    description: 'Best for realistic photos and portraits',
    icon: <Zap className="h-4 w-4" />,
    badge: 'Recommended',
    badgeVariant: 'default',
  },
  sdxl: {
    label: 'SDXL',
    description: 'High quality, versatile generation',
    icon: <Sparkles className="h-4 w-4" />,
  },
  playground: {
    label: 'Playground',
    description: 'Creative and artistic styles',
    icon: <Wand2 className="h-4 w-4" />,
  },
  custom: {
    label: 'Custom Model',
    description: 'Use your trained AI model',
    icon: <User className="h-4 w-4" />,
    badge: 'Premium',
    badgeVariant: 'secondary',
  },
};

/**
 * Props pour ModelSelect
 */
export interface ModelSelectProps {
  /** Modèle sélectionné */
  value: AIModel;
  /** Callback lors du changement */
  onChange: (model: AIModel) => void;
  /** Désactiver le select */
  disabled?: boolean;
  /** Masquer la description */
  hideDescription?: boolean;
}

/**
 * ModelSelect - Sélecteur de modèle AI
 * 
 * Permet de choisir le modèle AI pour la génération.
 * 
 * Fonctionnalités :
 * - 4 modèles disponibles (flux, sdxl, playground, custom)
 * - Icônes et descriptions
 * - Badges (Recommended, Premium)
 * - Accessibilité complète
 * 
 * @example
 * ```tsx
 * const [model, setModel] = useState<AIModel>('flux');
 * 
 * <ModelSelect
 *   value={model}
 *   onChange={setModel}
 * />
 * ```
 */
export function ModelSelect({
  value,
  onChange,
  disabled = false,
  hideDescription = false,
}: ModelSelectProps) {
  const selectedConfig = MODEL_CONFIG[value];

  return (
    <div className="w-full space-y-2">
      {/* Label */}
      <div className="flex items-center justify-between">
        <Label htmlFor="model-select" className="text-base font-medium text-white">
          AI Model
        </Label>
        {selectedConfig.badge && (
          <Badge variant={selectedConfig.badgeVariant} className="text-xs">
            {selectedConfig.badge}
          </Badge>
        )}
      </div>

      {/* Description */}
      {!hideDescription && (
        <p className="text-sm text-gray-400">
          Choose the AI model that best fits your needs
        </p>
      )}

      {/* Select */}
      <Select value={value} onValueChange={(v) => onChange(v as AIModel)} disabled={disabled}>
        <SelectTrigger
          id="model-select"
          className="w-full bg-gray-900/50 border-gray-800 text-white focus:border-pink-500 focus:ring-pink-500/20"
          aria-label="Select AI model"
        >
          <SelectValue>
            <div className="flex items-center gap-2">
              {selectedConfig.icon}
              <span>{selectedConfig.label}</span>
            </div>
          </SelectValue>
        </SelectTrigger>

        <SelectContent className="bg-gray-900 border-gray-800">
          {(Object.entries(MODEL_CONFIG) as [AIModel, typeof MODEL_CONFIG[AIModel]][]).map(
            ([modelKey, config]) => (
              <SelectItem
                key={modelKey}
                value={modelKey}
                className="text-white focus:bg-gray-800 focus:text-white cursor-pointer"
              >
                <div className="flex items-start gap-3 py-1">
                  <div className="mt-0.5">{config.icon}</div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2">
                      <span className="font-medium">{config.label}</span>
                      {config.badge && (
                        <Badge variant={config.badgeVariant} className="text-xs">
                          {config.badge}
                        </Badge>
                      )}
                    </div>
                    <p className="text-xs text-gray-400 mt-0.5">{config.description}</p>
                  </div>
                </div>
              </SelectItem>
            )
          )}
        </SelectContent>
      </Select>
    </div>
  );
}
