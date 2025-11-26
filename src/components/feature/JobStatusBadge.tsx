/**
 * Badge de statut de job
 * Affiche le statut d'un job de génération avec couleurs et icônes
 * 
 * @module components/feature/JobStatusBadge
 */

import { Badge } from '@/components/ui/badge';
import { Loader2, CheckCircle2, XCircle, Clock, Ban } from 'lucide-react';
import type { JobStatus } from '@/lib/validators';

/**
 * Configuration des statuts avec couleurs et icônes
 */
const STATUS_CONFIG: Record<
  JobStatus,
  {
    label: string;
    icon: React.ReactNode;
    variant: 'default' | 'secondary' | 'destructive' | 'outline';
    className: string;
  }
> = {
  pending: {
    label: 'Pending',
    icon: <Clock className="h-3 w-3" />,
    variant: 'secondary',
    className: 'bg-gray-500/20 text-gray-400 border-gray-500/50',
  },
  processing: {
    label: 'Processing',
    icon: <Loader2 className="h-3 w-3 animate-spin" />,
    variant: 'default',
    className: 'bg-blue-500/20 text-blue-400 border-blue-500/50',
  },
  completed: {
    label: 'Completed',
    icon: <CheckCircle2 className="h-3 w-3" />,
    variant: 'default',
    className: 'bg-green-500/20 text-green-400 border-green-500/50',
  },
  failed: {
    label: 'Failed',
    icon: <XCircle className="h-3 w-3" />,
    variant: 'destructive',
    className: 'bg-red-500/20 text-red-400 border-red-500/50',
  },
  cancelled: {
    label: 'Cancelled',
    icon: <Ban className="h-3 w-3" />,
    variant: 'outline',
    className: 'bg-gray-500/20 text-gray-500 border-gray-500/50',
  },
};

/**
 * Props pour JobStatusBadge
 */
export interface JobStatusBadgeProps {
  /** Statut du job */
  status: JobStatus;
  /** Afficher l'icône */
  showIcon?: boolean;
  /** Taille du badge */
  size?: 'sm' | 'md' | 'lg';
  /** Classe CSS personnalisée */
  className?: string;
}

/**
 * JobStatusBadge - Badge de statut de job
 * 
 * Affiche le statut d'un job avec couleur et icône appropriées.
 * Pas d'interactivité → RSC
 * 
 * Fonctionnalités :
 * - 5 statuts supportés (pending, processing, completed, failed, cancelled)
 * - Icônes animées (spinner pour processing)
 * - Couleurs sémantiques
 * - 3 tailles (sm, md, lg)
 * 
 * @example
 * ```tsx
 * // RSC - Pas de "use client"
 * <JobStatusBadge status="processing" showIcon />
 * <JobStatusBadge status="completed" size="lg" />
 * <JobStatusBadge status="failed" />
 * ```
 */
export function JobStatusBadge({
  status,
  showIcon = true,
  size = 'md',
  className = '',
}: JobStatusBadgeProps) {
  const config = STATUS_CONFIG[status];

  // Classes de taille
  const sizeClasses = {
    sm: 'text-xs px-2 py-0.5',
    md: 'text-sm px-2.5 py-1',
    lg: 'text-base px-3 py-1.5',
  };

  return (
    <Badge
      variant={config.variant}
      className={`inline-flex items-center gap-1.5 ${config.className} ${sizeClasses[size]} ${className}`}
      aria-label={`Job status: ${config.label}`}
    >
      {showIcon && config.icon}
      <span>{config.label}</span>
    </Badge>
  );
}

/**
 * JobStatusBadgeWithProgress - Badge avec barre de progression
 * 
 * Variante du badge avec barre de progression pour les jobs en cours.
 * 
 * @example
 * ```tsx
 * <JobStatusBadgeWithProgress status="processing" progress={45} />
 * ```
 */
export function JobStatusBadgeWithProgress({
  status,
  progress = 0,
  showIcon = true,
  className = '',
}: JobStatusBadgeProps & { progress?: number }) {
  const config = STATUS_CONFIG[status];

  return (
    <div className={`space-y-1 ${className}`}>
      {/* Badge */}
      <JobStatusBadge status={status} showIcon={showIcon} />

      {/* Progress bar (seulement pour processing) */}
      {status === 'processing' && (
        <div className="w-full bg-gray-800 rounded-full h-1.5 overflow-hidden">
          <div
            className="bg-gradient-to-r from-pink-500 to-purple-600 h-full transition-all duration-300"
            style={{ width: `${Math.min(100, Math.max(0, progress))}%` }}
            role="progressbar"
            aria-valuenow={progress}
            aria-valuemin={0}
            aria-valuemax={100}
            aria-label={`Generation progress: ${progress}%`}
          />
        </div>
      )}
    </div>
  );
}
