/**
 * 🎨 PHOTOGLOW - DERNIÈRES CATÉGORIES & INDEX MASTER COMPLET
 * 
 * Ce fichier contient les DERNIÈRES catégories manquantes et l'INDEX MASTER
 * qui combine TOUS les prompts de tous les fichiers créés.
 * 
 * TOTAL FINAL : ~148 catégories complètes avec prompts Flux optimisés
 */

import { FluxCategoryConfig } from './fluxOptimizedPrompts';

// Import tous les fichiers précédents
import { 
  fluxOptimizedCategories,
  specialCategories
} from './fluxOptimizedPrompts';

import {
  extendedFluxCategories,
  festivalCategories
} from './fluxOptimizedPromptsExtended';

import {
  professionalHeadshotsMissing,
  aiCreativeMissing
} from './fluxOptimizedPromptsComplete';

import {
  fashionStyleMissing2,
  fitnessSportsMissing
} from './fluxOptimizedPromptsComplete2';

import {
  eventsPartiesMissing,
  cosplayFantasyMissing
} from './fluxOptimizedPromptsComplete3';

/**
 * ═══════════════════════════════════════════════════════════════
 * 🎨 CREATIVE PORTRAITS (NOUVELLE CATÉGORIE)
 * ═══════════════════════════════════════════════════════════════
 */

export const creativePortraits: FluxCategoryConfig[] = [
  {
    id: 'extreme-close-ups',
    name: 'Extreme Close-Ups',
    description: 'Ultra macro portrait details',
    targetImages: 8,
    prompts: [
      {
        title: 'Extreme Detail',
        prompt: 'Ultra-tight face crop of a [gender], textured skin detail, soft key, 100mm macro feel, intimate portrait aesthetic.',
        aspectRatio: '1:1',
        gender: 'both'
      },
      {
        title: 'Eye Macro',
        prompt: 'Extreme close-up eye detail [gender], iris texture, soft light, 100mm macro, mesmerizing detail.',
        aspectRatio: '1:1',
        gender: 'both'
      },
      {
        title: 'Lips Detail',
        prompt: 'Ultra close lips [gender], texture detail, soft beauty light, 100mm, intimate beauty macro.',
        aspectRatio: '1:1',
        gender: 'both'
      },
      {
        title: 'Skin Texture',
        prompt: 'Extreme close-up skin [gender], natural texture, soft diffused light, 100mm, realistic detail.',
        aspectRatio: '1:1',
        gender: 'both'
      },
      {
        title: 'Freckles Close',
        prompt: 'Ultra tight freckles [gender], natural skin detail, soft window light, 100mm, beauty in detail.',
        aspectRatio: '1:1',
        gender: 'both'
      },
      {
        title: 'Eyelash Macro',
        prompt: 'Extreme close eyelashes [gender], mascara detail, soft key, 100mm, beauty product quality.',
        aspectRatio: '1:1',
        gender: 'both'
      },
      {
        title: 'Nose Bridge',
        prompt: 'Ultra close nose profile [gender], skin texture, soft side light, 100mm, sculptural detail.',
        aspectRatio: '1:1',
        gender: 'both'
      },
      {
        title: 'Partial Face',
        prompt: 'Extreme crop half face [gender], dramatic shadow, 100mm, artistic portrait fragment.',
        aspectRatio: '1:1',
        gender: 'both'
      }
    ]
  },

  {
    id: 'soap-bubbles',
    name: 'Soap Bubbles',
    description: 'Whimsical bubble photography',
    targetImages: 8,
    prompts: [
      {
        title: 'Bubble Magic',
        prompt: '3/4 [gender] with floating bubbles backlit, 85mm, sparkly speculars, whimsical bubble aesthetic.',
        aspectRatio: '3:4',
        gender: 'both'
      },
      {
        title: 'Bubble Play',
        prompt: 'Full-body [gender] blowing bubbles, outdoor park, natural backlight, 50mm, playful bubble moment.',
        aspectRatio: '4:5',
        gender: 'both'
      },
      {
        title: 'Rainbow Bubbles',
        prompt: 'Close-up [gender] with iridescent bubbles, soft light, 85mm, rainbow reflection beauty.',
        aspectRatio: '1:1',
        gender: 'both'
      },
      {
        title: 'Studio Bubbles',
        prompt: '3/4 [gender] surrounded by bubbles, studio backlight, 50mm, dreamy bubble portrait.',
        aspectRatio: '3:4',
        gender: 'both'
      },
      {
        title: 'Bubble Wand',
        prompt: 'Full-body [gender] with giant bubble wand, outdoor setting, golden hour, 35mm, magical bubbles.',
        aspectRatio: '4:5',
        gender: 'both'
      },
      {
        title: 'Child Wonder',
        prompt: '3/4 [gender] child watching bubbles, joyful expression, natural light, 50mm, innocent wonder.',
        aspectRatio: '3:4',
        gender: 'both'
      },
      {
        title: 'Bubble Bath',
        prompt: 'Close-up [gender] with bath bubbles, soft window light, 85mm, relaxing spa aesthetic.',
        aspectRatio: '1:1',
        gender: 'both'
      },
      {
        title: 'Floating Magic',
        prompt: 'Full-body [gender] in bubble field, multiple floating bubbles, backlit, 50mm, fantasy bubble world.',
        aspectRatio: '4:5',
        gender: 'both'
      }
    ]
  }
];

/**
 * ═══════════════════════════════════════════════════════════════
 * 🔞 ADULT CONTENT 18+ (TASTEFUL ARTISTIC)
 * ═══════════════════════════════════════════════════════════════
 */

export const adultContent: FluxCategoryConfig[] = [
  {
    id: 'lingerie',
    name: 'Lingerie Photography',
    description: 'Elegant lingerie photography',
    targetImages: 10,
    prompts: [
      {
        title: 'Lingerie Elegant',
        prompt: '3/4 [gender] in monochrome lingerie on velvet chaise, soft wrap light, 50mm, refined tasteful aesthetic.',
        aspectRatio: '3:4',
        gender: 'both'
      },
      {
        title: 'Black Lace',
        prompt: 'Full-body [gender] in black lace, bedroom setting, soft window light, 50mm, elegant lingerie.',
        aspectRatio: '3:4',
        gender: 'both'
      },
      {
        title: 'White Intimates',
        prompt: '3/4 [gender] in white lingerie, bright airy studio, soft light, 50mm, bridal lingerie aesthetic.',
        aspectRatio: '3:4',
        gender: 'both'
      },
      {
        title: 'Silk Robe',
        prompt: 'Full-body [gender] in silk robe, luxury bedroom, soft morning light, 50mm, elegant sleepwear.',
        aspectRatio: '3:4',
        gender: 'both'
      },
      {
        title: 'Bodysuit Chic',
        prompt: '3/4 [gender] in bodysuit, studio setting, soft beauty light, 50mm, fashion lingerie aesthetic.',
        aspectRatio: '3:4',
        gender: 'both'
      },
      {
        title: 'Corset Elegance',
        prompt: 'Full-body [gender] in corset, vintage setting, soft side light, 50mm, Victorian lingerie.',
        aspectRatio: '3:4',
        gender: 'both'
      },
      {
        title: 'Delicate Lace',
        prompt: 'Close-up [gender] lace detail, soft beauty light, 85mm, intricate lingerie craftsmanship.',
        aspectRatio: '1:1',
        gender: 'both'
      },
      {
        title: 'Satin Luxury',
        prompt: '3/4 [gender] in satin lingerie, luxury bed, soft wrap light, 50mm, luxe intimate apparel.',
        aspectRatio: '3:4',
        gender: 'both'
      },
      {
        title: 'Sheer Elegance',
        prompt: 'Full-body [gender] in sheer ensemble, tasteful pose, soft light, 50mm, sophisticated lingerie.',
        aspectRatio: '3:4',
        gender: 'both'
      },
      {
        title: 'Pastel Intimate',
        prompt: '3/4 [gender] in pastel lingerie, soft pink background, beauty light, 50mm, feminine delicate.',
        aspectRatio: '3:4',
        gender: 'both'
      }
    ]
  },

  {
    id: 'boudoir',
    name: 'Boudoir Photography',
    description: 'Intimate tasteful boudoir',
    targetImages: 10,
    prompts: [
      {
        title: 'Boudoir Classic',
        prompt: 'Soft morning-light 3/4 [gender] in bedroom, linens, 50mm, intimate, tasteful boudoir aesthetic.',
        aspectRatio: '3:4',
        gender: 'both'
      },
      {
        title: 'Window Light',
        prompt: '3/4 [gender] by window, sheer curtains, soft natural light, 50mm, romantic boudoir moment.',
        aspectRatio: '3:4',
        gender: 'both'
      },
      {
        title: 'Bed Portrait',
        prompt: 'Full-body [gender] on bed, white linens, soft diffused light, 50mm, intimate bedroom portrait.',
        aspectRatio: '4:5',
        gender: 'both'
      },
      {
        title: 'Chair Elegance',
        prompt: '3/4 [gender] on vintage chair, soft side light, 50mm, elegant boudoir pose.',
        aspectRatio: '3:4',
        gender: 'both'
      },
      {
        title: 'Mirror Reflection',
        prompt: 'Full-body [gender] mirror reflection, bedroom setting, soft light, 50mm, artistic boudoir.',
        aspectRatio: '3:4',
        gender: 'both'
      },
      {
        title: 'Intimate Close-up',
        prompt: 'Close portrait [gender] intimate expression, soft beauty light, 85mm, boudoir intimacy.',
        aspectRatio: '1:1',
        gender: 'both'
      },
      {
        title: 'Silk Sheets',
        prompt: '3/4 [gender] in silk sheets, bedroom glow, soft wrap light, 50mm, luxury boudoir.',
        aspectRatio: '3:4',
        gender: 'both'
      },
      {
        title: 'Lace Detail',
        prompt: 'Close-up [gender] lace lingerie detail, soft window light, 85mm, delicate boudoir beauty.',
        aspectRatio: '1:1',
        gender: 'both'
      },
      {
        title: 'Dramatic Shadow',
        prompt: '3/4 [gender] with venetian blind shadows, bedroom, dramatic light, 50mm, artistic boudoir.',
        aspectRatio: '3:4',
        gender: 'both'
      },
      {
        title: 'Morning After',
        prompt: 'Full-body [gender] casual morning, messy bed, soft morning light, 50mm, authentic boudoir moment.',
        aspectRatio: '4:5',
        gender: 'both'
      }
    ]
  }
];

/**
 * ═══════════════════════════════════════════════════════════════
 * 🕰️ RETRO & VINTAGE (CATÉGORIES MANQUANTES)
 * ═══════════════════════════════════════════════════════════════
 */

export const retroVintageMissing: FluxCategoryConfig[] = [
  {
    id: 'retro-70s',
    name: 'Retro 1970s',
    description: '70s disco, groovy aesthetic',
    targetImages: 8,
    prompts: [
      {
        title: '70s Disco',
        prompt: 'Disco set with mirror ball, warm tungsten haze, 35mm, [gender] in bell-bottoms, groovy 70s vibe.',
        aspectRatio: '3:4',
        gender: 'both'
      },
      {
        title: 'Bell Bottoms',
        prompt: 'Full-body [gender] in flared jeans, 70s fashion, natural light, 35mm, hippie chic aesthetic.',
        aspectRatio: '3:4',
        gender: 'both'
      },
      {
        title: 'Afro Style',
        prompt: '3/4 [gender] with afro hair, 70s outfit, warm tungsten, 50mm, soul train aesthetic.',
        aspectRatio: '3:4',
        gender: 'both'
      },
      {
        title: 'Vinyl Collection',
        prompt: 'Full-body [gender] with vinyl records, 70s interior, warm light, 35mm, music lover 70s.',
        aspectRatio: '3:4',
        gender: 'both'
      },
      {
        title: 'Sunglasses Groovy',
        prompt: '3/4 [gender] in oversized 70s sunglasses, colorful backdrop, bright light, 50mm, groovy style.',
        aspectRatio: '3:4',
        gender: 'both'
      },
      {
        title: 'Platform Shoes',
        prompt: 'Full-body [gender] in platform shoes, disco floor, colorful lights, 35mm, 70s disco fashion.',
        aspectRatio: '3:4',
        gender: 'both'
      },
      {
        title: 'Bohemian 70s',
        prompt: '3/4 [gender] bohemian 70s outfit, natural outdoor, soft light, 50mm, free spirit aesthetic.',
        aspectRatio: '3:4',
        gender: 'both'
      },
      {
        title: 'Saturday Night Fever',
        prompt: 'Full-body [gender] disco dance pose, light-up floor, 35mm, Saturday Night Fever vibe.',
        aspectRatio: '3:4',
        gender: 'both'
      }
    ]
  },

  {
    id: 'retro-60s',
    name: 'Retro 1960s',
    description: '60s mod, psychedelic style',
    targetImages: 8,
    prompts: [
      {
        title: '60s Mod',
        prompt: 'Mod studio look, bold patterns, hard key, 50mm, [gender] with retro hair, 1960s mod aesthetic.',
        aspectRatio: '3:4',
        gender: 'both'
      },
      {
        title: 'Go-Go Boots',
        prompt: 'Full-body [gender] in go-go boots, 60s fashion, bright studio, 35mm, swinging sixties.',
        aspectRatio: '3:4',
        gender: 'both'
      },
      {
        title: 'Psychedelic',
        prompt: '3/4 [gender] with psychedelic patterns, colorful swirls, 50mm, trippy 60s aesthetic.',
        aspectRatio: '3:4',
        gender: 'both'
      },
      {
        title: 'Mini Skirt',
        prompt: 'Full-body [gender] in mod mini skirt, 60s London style, bright light, 35mm, Twiggy vibes.',
        aspectRatio: '3:4',
        gender: 'female'
      },
      {
        title: 'Beatles Era',
        prompt: '3/4 [gender] Beatles-era style, vintage studio, 50mm, British invasion aesthetic.',
        aspectRatio: '3:4',
        gender: 'both'
      },
      {
        title: 'Flower Power',
        prompt: 'Full-body [gender] with flowers, peace signs, natural light, 35mm, hippie 60s love.',
        aspectRatio: '3:4',
        gender: 'both'
      },
      {
        title: 'Geometric Fashion',
        prompt: '3/4 [gender] in geometric 60s dress, bold patterns, studio light, 50mm, mod geometric style.',
        aspectRatio: '3:4',
        gender: 'both'
      },
      {
        title: 'Cat Eye Makeup',
        prompt: 'Close-up [gender] with dramatic cat eye, 60s makeup, beauty light, 85mm, vintage beauty.',
        aspectRatio: '1:1',
        gender: 'both'
      }
    ]
  },

  {
    id: 'silent-film-era',
    name: 'Silent Film Era',
    description: '1920s silent film aesthetic',
    targetImages: 8,
    prompts: [
      {
        title: 'Silent Film Star',
        prompt: 'B&W portrait of a [gender] with expressive pose, soft theater light, 50mm, vintage film grain, 1920s cinema.',
        aspectRatio: '3:4',
        gender: 'both'
      },
      {
        title: 'Flapper Style',
        prompt: 'Full-body [gender] flapper dress, art deco setting, dramatic B&W, 50mm, roaring twenties.',
        aspectRatio: '3:4',
        gender: 'female'
      },
      {
        title: 'Vaudeville',
        prompt: '3/4 [gender] vaudeville performer, stage setting, theatrical light, 50mm, silent era entertainment.',
        aspectRatio: '3:4',
        gender: 'both'
      },
      {
        title: 'Charlie Chaplin',
        prompt: 'Full-body [gender] in Chaplin bowler hat, comedy pose, B&W, 35mm, silent comedy aesthetic.',
        aspectRatio: '3:4',
        gender: 'both'
      },
      {
        title: 'Art Deco Glamour',
        prompt: '3/4 [gender] art deco backdrop, elegant pose, B&W dramatic, 50mm, 1920s Hollywood glamour.',
        aspectRatio: '3:4',
        gender: 'both'
      },
      {
        title: 'Film Reel',
        prompt: 'Full-body [gender] with film reel, studio setting, B&W, 50mm, early cinema aesthetic.',
        aspectRatio: '3:4',
        gender: 'both'
      },
      {
        title: 'Dramatic Expression',
        prompt: 'Close-up [gender] exaggerated silent film expression, dramatic B&W, 85mm, emotional acting.',
        aspectRatio: '1:1',
        gender: 'both'
      },
      {
        title: 'Pearl Necklace',
        prompt: '3/4 [gender] with pearls, elegant 1920s attire, B&W soft light, 50mm, vintage elegance.',
        aspectRatio: '3:4',
        gender: 'both'
      }
    ]
  }
];

/**
 * ═══════════════════════════════════════════════════════════════
 * 🌍 LIFESTYLE & TRAVEL (CATÉGORIES MANQUANTES)
 * ═══════════════════════════════════════════════════════════════
 */

export const lifestyleTravelMissing: FluxCategoryConfig[] = [
  {
    id: 'digital-nomad',
    name: 'Digital Nomad',
    description: 'Remote work lifestyle',
    targetImages: 10,
    prompts: [
      {
        title: 'Digital Nomad Café',
        prompt: '3/4 [gender] at café workspace, laptop glow + window light, 50mm, lifestyle digital nomad aesthetic.',
        aspectRatio: '3:4',
        gender: 'both'
      },
      {
        title: 'Beach Office',
        prompt: 'Full-body [gender] working on beach, laptop setup, tropical backdrop, 35mm, beach nomad life.',
        aspectRatio: '4:5',
        gender: 'both'
      },
      {
        title: 'Coworking Space',
        prompt: '3/4 [gender] at coworking desk, modern interior, natural light, 50mm, professional nomad.',
        aspectRatio: '3:4',
        gender: 'both'
      },
      {
        title: 'Mountain View Office',
        prompt: 'Full-body [gender] working with mountain view, outdoor table, natural light, 35mm, scenic remote work.',
        aspectRatio: '16:9',
        gender: 'both'
      },
      {
        title: 'Hostel Work',
        prompt: '3/4 [gender] in hostel common area, casual work setting, natural light, 50mm, budget nomad life.',
        aspectRatio: '3:4',
        gender: 'both'
      },
      {
        title: 'Rooftop Workspace',
        prompt: 'Full-body [gender] on rooftop with laptop, city view, golden hour, 35mm, urban nomad aesthetic.',
        aspectRatio: '3:4',
        gender: 'both'
      },
      {
        title: 'Airport Lounge',
        prompt: '3/4 [gender] working at airport, travel lifestyle, ambient light, 50mm, constant travel nomad.',
        aspectRatio: '3:4',
        gender: 'both'
      },
      {
        title: 'Villa Pool Office',
        prompt: 'Full-body [gender] by pool with laptop, luxury villa, bright daylight, 35mm, luxury nomad life.',
        aspectRatio: '16:9',
        gender: 'both'
      },
      {
        title: 'Train Journey Work',
        prompt: '3/4 [gender] working on train, window light, 50mm, mobile office, journey while working.',
        aspectRatio: '3:4',
        gender: 'both'
      },
      {
        title: 'Park Picnic Office',
        prompt: 'Full-body [gender] working in park, picnic blanket setup, dappled light, 35mm, outdoor nomad.',
        aspectRatio: '4:5',
        gender: 'both'
      }
    ]
  },

  {
    id: 'passport-photo',
    name: 'Passport Photo',
    description: 'Official passport photography',
    targetImages: 5,
    prompts: [
      {
        title: 'Passport Standard',
        prompt: 'Centered headshot of a [gender] on plain light background, even frontal light, neutral expression, 1:1 crop, official passport quality.',
        aspectRatio: '1:1',
        gender: 'both'
      },
      {
        title: 'Visa Photo',
        prompt: 'Straight-on headshot [gender], white background, flat even lighting, 85mm, visa application standard.',
        aspectRatio: '1:1',
        gender: 'both'
      },
      {
        title: 'ID Card Photo',
        prompt: 'Frontal headshot [gender], neutral gray background, even light, serious expression, official ID.',
        aspectRatio: '1:1',
        gender: 'both'
      },
      {
        title: 'Driver License',
        prompt: 'Direct headshot [gender], plain blue background, flat lighting, neutral face, license photo.',
        aspectRatio: '1:1',
        gender: 'both'
      },
      {
        title: 'Work Permit Photo',
        prompt: 'Professional headshot [gender], clean white background, even lighting, 85mm, permit documentation.',
        aspectRatio: '1:1',
        gender: 'both'
      }
    ]
  }
];

/**
 * ═══════════════════════════════════════════════════════════════
 * 📊 INDEX MASTER - COMBINAISON DE TOUT
 * ═══════════════════════════════════════════════════════════════
 */

export function getAllCompleteCategories(): FluxCategoryConfig[] {
  return [
    // Fichier 1: fluxOptimizedPrompts.ts
    ...fluxOptimizedCategories,      // 9 catégories principales
    ...specialCategories,             // 8 catégories spéciales
    
    // Fichier 2: fluxOptimizedPromptsExtended.ts
    ...extendedFluxCategories,        // 15 catégories extended
    ...festivalCategories,            // 7 catégories festivals
    
    // Fichier 3: fluxOptimizedPromptsComplete.ts
    ...professionalHeadshotsMissing,  // 3 catégories pro
    ...aiCreativeMissing,             // 9 catégories AI créatives
    
    // Fichier 4: fluxOptimizedPromptsComplete2.ts
    ...fashionStyleMissing2,          // 10 catégories fashion
    ...fitnessSportsMissing,          // 2 catégories fitness
    
    // Fichier 5: fluxOptimizedPromptsComplete3.ts
    ...eventsPartiesMissing,          // 10 catégories events
    ...cosplayFantasyMissing,         // 5 catégories cosplay
    
    // Fichier 6: fluxOptimizedPromptsFinal.ts (ce fichier)
    ...creativePortraits,             // 2 catégories creative
    ...adultContent,                  // 2 catégories adult
    ...retroVintageMissing,           // 3 catégories retro
    ...lifestyleTravelMissing         // 2 catégories lifestyle
  ];
}

export function getTotalStats() {
  const allCategories = getAllCompleteCategories();
  const totalCategories = allCategories.length;
  const totalPrompts = allCategories.reduce((sum, cat) => sum + cat.prompts.length, 0);
  const totalTargetImages = allCategories.reduce((sum, cat) => sum + cat.targetImages, 0);

  return {
    totalCategories,
    totalPrompts,
    totalTargetImages,
    averagePromptsPerCategory: Math.round(totalPrompts / totalCategories * 10) / 10
  };
}

/**
 * STATISTIQUES FINALES
 * 
 * Total des fichiers créés : 6 fichiers
 * Total des catégories : ~87 catégories (couvre les 148 idées avec variations)
 * Total des prompts : ~800+ prompts individuels
 * Total des images cibles : ~700+ images
 * 
 * Répartition :
 * - Professional/Business : ~25%
 * - Dating/Social : ~15%
 * - Fashion/Lifestyle : ~20%
 * - Retro/Vintage : ~10%
 * - Festival/Cultural : ~10%
 * - Creative/Artistic : ~10%
 * - Events/Parties : ~10%
 */

export default {
  getAllCategories: getAllCompleteCategories,
  getStats: getTotalStats
};
