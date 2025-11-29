export interface ColorScheme {
  primary: string;
  secondary: string;
  bgGradient: string;
  borderColor: string;
  glowColor: string;
}

export const categoryColorSchemes: Record<string, ColorScheme> = {
  'ai-headshots': {
    primary: 'blue-500',
    secondary: 'cyan-500',
    bgGradient: 'from-blue-900/10 via-cyan-900/5 to-blue-900/10',
    borderColor: 'border-blue-500/40',
    glowColor: 'blue-500'
  },
  'ai-dating-photos': {
    primary: 'pink-500',
    secondary: 'rose-600',
    bgGradient: 'from-pink-900/10 via-rose-900/5 to-pink-900/10',
    borderColor: 'border-pink-500/40',
    glowColor: 'pink-500'
  },
  'ai-model-photo': {
    primary: 'amber-500',
    secondary: 'orange-600',
    bgGradient: 'from-amber-900/10 via-orange-900/5 to-amber-900/10',
    borderColor: 'border-amber-500/40',
    glowColor: 'amber-500'
  },
  'ai-realistic-photo': {
    primary: 'purple-500',
    secondary: 'violet-600',
    bgGradient: 'from-purple-900/10 via-violet-900/5 to-purple-900/10',
    borderColor: 'border-purple-500/40',
    glowColor: 'purple-500'
  },
  'ai-selfie': {
    primary: 'pink-500',
    secondary: 'purple-600',
    bgGradient: 'from-pink-900/10 via-purple-900/5 to-violet-900/10',
    borderColor: 'border-pink-500/40',
    glowColor: 'pink-500'
  },
  'ai-portrait': {
    primary: 'indigo-500',
    secondary: 'purple-600',
    bgGradient: 'from-indigo-900/10 via-purple-900/5 to-indigo-900/10',
    borderColor: 'border-indigo-500/40',
    glowColor: 'indigo-500'
  },
  'ai-cosplay-fantasy': {
    primary: 'fuchsia-500',
    secondary: 'purple-600',
    bgGradient: 'from-fuchsia-900/10 via-purple-900/5 to-fuchsia-900/10',
    borderColor: 'border-fuchsia-500/40',
    glowColor: 'fuchsia-500'
  },
  'ai-fitness-photos': {
    primary: 'green-500',
    secondary: 'emerald-600',
    bgGradient: 'from-green-900/10 via-emerald-900/5 to-green-900/10',
    borderColor: 'border-green-500/40',
    glowColor: 'green-500'
  },
  'ai-fitness-bikini': {
    primary: 'cyan-500',
    secondary: 'teal-600',
    bgGradient: 'from-cyan-900/10 via-teal-900/5 to-cyan-900/10',
    borderColor: 'border-cyan-500/40',
    glowColor: 'cyan-500'
  },
  'ai-lifestyle-travel': {
    primary: 'orange-500',
    secondary: 'amber-600',
    bgGradient: 'from-orange-900/10 via-amber-900/5 to-orange-900/10',
    borderColor: 'border-orange-500/40',
    glowColor: 'orange-500'
  }
};
