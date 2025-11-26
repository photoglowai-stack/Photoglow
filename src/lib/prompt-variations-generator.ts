/**
 * FLUX Prompt Variations Generator
 * Génère 15 prompts VRAIMENT DIFFÉRENTS pour chaque idée
 * Suit les 10 commandements FLUX (30-80 mots, structure claire, positif)
 */

// ============================================================================
// BIBLIOTHÈQUES DE TOKENS
// ============================================================================

export const PROMPT_TOKENS = {
  // Camera/Lens
  camera: [
    '85mm portrait look, shallow depth of field, crisp focus on the eyes',
    '50mm natural look, moderate depth of field, sharp facial features',
    '85mm portrait lens, ultra shallow depth of field, creamy bokeh background',
    '50mm prime lens, natural perspective, balanced sharpness throughout',
    'portrait focal length, selective focus on face, soft background blur'
  ],

  // Lighting (1 style précis par prompt)
  lighting: [
    'soft diffused studio lighting, even illumination across face',
    'natural window daylight from side, gentle shadows defining features',
    'warm tungsten light creating cozy ambient glow',
    'cool tones with soft fill light, modern clean aesthetic',
    'backlit rim light highlighting hair and shoulders',
    'high-key lighting setup, bright airy feel with minimal shadows',
    'low-key dramatic lighting, moody with controlled highlights',
    'golden hour warm light, flattering skin tones',
    'overcast soft light, natural diffused illumination',
    'studio beauty lighting, perfectly balanced highlights and shadows',
    'three-point lighting setup, professional studio quality',
    'butterfly lighting pattern, classic portrait style',
    'Rembrandt lighting creating triangular cheek highlight',
    'split lighting for dramatic effect, half-lit face',
    'loop lighting with subtle nose shadow, natural look'
  ],

  // Background (court et net)
  background: [
    'neutral seamless backdrop with tasteful bokeh',
    'light gray studio background, clean uncluttered',
    'soft bokeh lights creating depth, warm ambiance',
    'minimal modern backdrop, subtle gradient',
    'office environment bokeh, professional setting blur',
    'warm beige seamless, earthy neutral tones',
    'cool gray backdrop, contemporary minimalist',
    'soft cream background, elegant simple',
    'tasteful out-of-focus elements, depth without distraction',
    'studio infinity wall, pure clean background',
    'subtle texture backdrop, refined simplicity',
    'defocused urban elements, modern sophisticated',
    'indoor environment softly blurred, contextual ambiance',
    'natural elements out of focus, organic feel',
    'architectural details bokeh, upscale atmosphere'
  ],

  // Mood
  mood: [
    'confident and approachable',
    'elegant and calm',
    'playful and energetic',
    'professional and polished',
    'warm and friendly',
    'mysterious and intriguing',
    'sophisticated and refined',
    'natural and relaxed',
    'bold and assertive',
    'gentle and serene',
    'charismatic and engaging',
    'thoughtful and contemplative',
    'vibrant and lively',
    'poised and graceful',
    'authentic and genuine'
  ],

  // Pose/Framing
  framing: [
    'close-up headshot',
    'half-body portrait',
    'three-quarter view',
    'full upper body',
    'tight crop on face',
    'medium distance framing',
    'environmental portrait context',
    'shoulders and head composition',
    'bust-length portrait',
    'waist-up framing',
    'profile angle',
    'slight angle turn',
    'direct face-on pose',
    'over-shoulder perspective',
    'candid natural positioning'
  ],

  // Angle/Perspective
  angle: [
    'eye-level perspective',
    'slightly elevated camera angle',
    'subtle low angle',
    'straight-on composition',
    'three-quarter turn',
    'profile view',
    'slight upward gaze',
    'natural head position',
    'gentle tilt variation',
    'direct eye contact',
    'looking slightly off-camera',
    'contemplative gaze direction',
    'engaging viewer connection',
    'relaxed head angle',
    'dynamic slight rotation'
  ],

  // Quality descriptors
  quality: [
    'ultra high resolution, natural skin texture with pores, correct anatomy, editorial-grade',
    'photorealistic quality, authentic skin detail, proper proportions, professional standard',
    'high-fidelity capture, realistic hair strands, natural features, publication ready',
    'sharp detailed rendering, lifelike textures, anatomically accurate, commercial quality',
    'pristine image quality, genuine skin appearance, realistic materials, premium output'
  ],

  // Style guardrails (positif)
  styleGuards: [
    'clean composition, realistic materials, balanced color rendition',
    'seamless uncluttered presentation, natural color accuracy, authentic textures',
    'professional framing, true-to-life rendering, harmonious tones',
    'polished aesthetic, photographic realism, well-calibrated colors',
    'refined composition, genuine material representation, color fidelity'
  ]
};

// ============================================================================
// GÉNÉRATEUR DE VARIATIONS
// ============================================================================

/**
 * Génère 15 prompts VRAIMENT DIFFÉRENTS pour une idée
 */
export function generatePromptVariations(description: string, ideaTitle: string): string[] {
  const prompts: string[] = [];
  
  // Stratégie de variation : combiner différents éléments
  // On crée 15 combinaisons uniques
  
  const variations = [
    // Variation 1-5 : Focus sur lighting variations
    { lighting: 0, background: 0, mood: 0, framing: 0, angle: 0, camera: 0 },
    { lighting: 1, background: 1, mood: 1, framing: 1, angle: 1, camera: 1 },
    { lighting: 2, background: 2, mood: 2, framing: 2, angle: 2, camera: 2 },
    { lighting: 3, background: 3, mood: 3, framing: 3, angle: 3, camera: 3 },
    { lighting: 4, background: 4, mood: 4, framing: 4, angle: 4, camera: 4 },
    
    // Variation 6-10 : Mix lighting + background + mood
    { lighting: 5, background: 0, mood: 5, framing: 5, angle: 5, camera: 0 },
    { lighting: 6, background: 1, mood: 6, framing: 6, angle: 6, camera: 1 },
    { lighting: 7, background: 2, mood: 7, framing: 7, angle: 7, camera: 2 },
    { lighting: 8, background: 3, mood: 8, framing: 8, angle: 8, camera: 3 },
    { lighting: 9, background: 4, mood: 9, framing: 9, angle: 9, camera: 4 },
    
    // Variation 11-15 : Advanced mix
    { lighting: 10, background: 5, mood: 10, framing: 10, angle: 10, camera: 0 },
    { lighting: 11, background: 6, mood: 11, framing: 11, angle: 11, camera: 1 },
    { lighting: 12, background: 7, mood: 12, framing: 12, angle: 12, camera: 2 },
    { lighting: 13, background: 8, mood: 13, framing: 13, angle: 13, camera: 3 },
    { lighting: 14, background: 9, mood: 14, framing: 14, angle: 14, camera: 4 }
  ];
  
  for (let i = 0; i < 15; i++) {
    const v = variations[i];
    
    // Récupère les tokens avec modulo pour éviter out of bounds
    const lighting = PROMPT_TOKENS.lighting[v.lighting % PROMPT_TOKENS.lighting.length];
    const background = PROMPT_TOKENS.background[v.background % PROMPT_TOKENS.background.length];
    const mood = PROMPT_TOKENS.mood[v.mood % PROMPT_TOKENS.mood.length];
    const framing = PROMPT_TOKENS.framing[v.framing % PROMPT_TOKENS.framing.length];
    const angle = PROMPT_TOKENS.angle[v.angle % PROMPT_TOKENS.angle.length];
    const camera = PROMPT_TOKENS.camera[v.camera % PROMPT_TOKENS.camera.length];
    const quality = PROMPT_TOKENS.quality[i % PROMPT_TOKENS.quality.length];
    const styleGuards = PROMPT_TOKENS.styleGuards[i % PROMPT_TOKENS.styleGuards.length];
    
    // Construction du prompt selon le blueprint FLUX
    const prompt = `${description}. Professional photorealistic portrait; ${framing}, ${angle}, natural relaxed pose, ${mood}. Camera/Lens: ${camera}. Lighting: ${lighting}. Background: ${background}, clean seamless, uncluttered. Quality: ${quality}. Style guardrails: ${styleGuards}. Variation ${i}: subtle change only, keeping subject and style consistent.`;
    
    prompts.push(prompt);
  }
  
  return prompts;
}

/**
 * Compte les mots d'un prompt
 */
export function countWords(text: string): number {
  return text.trim().split(/\s+/).length;
}

/**
 * Valide qu'un prompt suit les règles FLUX
 */
export function validateFluxPrompt(prompt: string): {
  valid: boolean;
  wordCount: number;
  warnings: string[];
} {
  const warnings: string[] = [];
  const wordCount = countWords(prompt);
  
  // Règle : 30-80 mots (on accepte 25-100 pour flexibilité)
  if (wordCount < 25) {
    warnings.push(`Prompt trop court (${wordCount} mots, min recommandé: 30)`);
  }
  if (wordCount > 100) {
    warnings.push(`Prompt trop long (${wordCount} mots, max recommandé: 80)`);
  }
  
  // Vérifier présence de mots négatifs (devrait être positif)
  const negativeWords = ['no ', 'not ', 'without ', 'avoid ', "don't ", 'never '];
  const hasNegative = negativeWords.some(word => prompt.toLowerCase().includes(word));
  if (hasNegative) {
    warnings.push('Contient des formulations négatives (devrait être positif)');
  }
  
  // Vérifier structure minimale
  const hasCamera = prompt.toLowerCase().includes('camera') || prompt.toLowerCase().includes('lens') || prompt.toLowerCase().includes('mm');
  const hasLighting = prompt.toLowerCase().includes('light');
  const hasBackground = prompt.toLowerCase().includes('background') || prompt.toLowerCase().includes('backdrop');
  const hasQuality = prompt.toLowerCase().includes('resolution') || prompt.toLowerCase().includes('quality');
  
  if (!hasCamera) warnings.push('Manque la section Camera/Lens');
  if (!hasLighting) warnings.push('Manque la section Lighting');
  if (!hasBackground) warnings.push('Manque la section Background');
  if (!hasQuality) warnings.push('Manque la section Quality');
  
  return {
    valid: warnings.length === 0,
    wordCount,
    warnings
  };
}

/**
 * Génère et valide 15 prompts pour une idée
 */
export function generateAndValidatePrompts(description: string, ideaTitle: string): {
  prompts: string[];
  validations: Array<{ valid: boolean; wordCount: number; warnings: string[] }>;
  summary: {
    allValid: boolean;
    averageWordCount: number;
    totalWarnings: number;
  };
} {
  const prompts = generatePromptVariations(description, ideaTitle);
  const validations = prompts.map(p => validateFluxPrompt(p));
  
  const allValid = validations.every(v => v.valid);
  const averageWordCount = Math.round(
    validations.reduce((sum, v) => sum + v.wordCount, 0) / validations.length
  );
  const totalWarnings = validations.reduce((sum, v) => sum + v.warnings.length, 0);
  
  return {
    prompts,
    validations,
    summary: {
      allValid,
      averageWordCount,
      totalWarnings
    }
  };
}

// ============================================================================
// EXPORT
// ============================================================================

export default {
  generatePromptVariations,
  validateFluxPrompt,
  generateAndValidatePrompts,
  PROMPT_TOKENS
};
