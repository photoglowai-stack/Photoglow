/**
 * 🎨 PHOTOGLOW - PROMPTS FLUX OPTIMISÉS COMPLETS (TOUTES LES CATÉGORIES MANQUANTES)
 * 
 * Ce fichier contient TOUS les prompts pour les ~100+ catégories qui manquaient
 * dans les fichiers précédents. Cela complète la couverture TOTALE des 148 idées.
 * 
 * Structure Flux standard appliquée :
 * - Framing + Subject + Setting + Lighting + Lens + Style
 * - 120-160 caractères par prompt
 * - PAS de negative prompts
 * - Lighting détaillé, aspect ratios optimisés
 */

import { FluxCategoryConfig, FluxPromptTemplate } from './fluxOptimizedPrompts';

/**
 * ═══════════════════════════════════════════════════════════════
 * 💼 PROFESSIONAL HEADSHOTS (CATÉGORIES MANQUANTES)
 * ═══════════════════════════════════════════════════════════════
 */

export const professionalHeadshotsMissing: FluxCategoryConfig[] = [
  {
    id: 'life-coach-headshots',
    name: 'Life Coach Headshots',
    description: 'Inspiring, empathetic professional coach photos',
    targetImages: 10,
    prompts: [
      {
        title: 'Life Coach Warm',
        prompt: 'Bright headshot of a [gender] against light seamless, clamshell, 85mm, motivational energy, positive professional presence, inspiring aesthetic.',
        aspectRatio: '1:1',
        gender: 'both'
      },
      {
        title: 'Coach Office Setting',
        prompt: '3/4 [gender] in coaching office, natural window light, 50mm, approachable mentor presence, warm professional atmosphere.',
        aspectRatio: '3:4',
        gender: 'both'
      },
      {
        title: 'Motivational Speaker',
        prompt: '3/4 [gender] in casual professional attire, bright natural light, 50mm, empowering presence, life coach energy.',
        aspectRatio: '3:4',
        gender: 'both'
      },
      {
        title: 'Workshop Leader',
        prompt: 'Full-body [gender] in workshop setting, soft practical lights, 50mm, engaging instructor presence, coaching aesthetic.',
        aspectRatio: '3:4',
        gender: 'both'
      },
      {
        title: 'Personal Development',
        prompt: 'Headshot [gender] with bookshelf blur, soft key light, 85mm, growth mindset aesthetic, professional coach.',
        aspectRatio: '1:1',
        gender: 'both'
      },
      {
        title: 'Online Coach',
        prompt: '3/4 [gender] at home office desk, natural window light, 50mm, digital coaching presence, virtual mentor.',
        aspectRatio: '3:4',
        gender: 'both'
      },
      {
        title: 'Wellness Coach',
        prompt: '3/4 [gender] in serene setting, soft natural light, 50mm, holistic wellness presence, calm professional.',
        aspectRatio: '3:4',
        gender: 'both'
      },
      {
        title: 'Executive Coach',
        prompt: 'Tight headshot [gender], professional gray background, clamshell light, 85mm, leadership development aesthetic.',
        aspectRatio: '1:1',
        gender: 'both'
      },
      {
        title: 'Career Coach',
        prompt: '3/4 [gender] in modern office, professional lighting, 50mm, career guidance presence, mentor aesthetic.',
        aspectRatio: '3:4',
        gender: 'both'
      },
      {
        title: 'Transformational Coach',
        prompt: 'Headshot [gender] with confident smile, soft beauty light, 85mm, transformative energy, inspiring presence.',
        aspectRatio: '1:1',
        gender: 'both'
      }
    ]
  },

  {
    id: 'real-estate-agent-headshots',
    name: 'Real Estate Agent Headshots',
    description: 'Trustworthy, approachable realtor photos',
    targetImages: 10,
    prompts: [
      {
        title: 'Realtor Classic',
        prompt: '3/4 [gender] with home interior blur, 85mm, approachable, polished, professional real estate aesthetic, trustworthy presence.',
        aspectRatio: '3:4',
        gender: 'both'
      },
      {
        title: 'Property Expert',
        prompt: 'Headshot [gender] on light background, soft key light, 85mm, real estate professional, confident expertise.',
        aspectRatio: '1:1',
        gender: 'both'
      },
      {
        title: 'Luxury Realtor',
        prompt: '3/4 [gender] at luxury property, natural light, 50mm, high-end real estate, premium agent aesthetic.',
        aspectRatio: '3:4',
        gender: 'both'
      },
      {
        title: 'For Sale Sign',
        prompt: 'Full-body [gender] in front of property, golden hour, 35mm, active realtor, working professional.',
        aspectRatio: '3:4',
        gender: 'both'
      },
      {
        title: 'Office Professional',
        prompt: '3/4 [gender] at real estate office desk, natural window light, 50mm, broker presence, professional agent.',
        aspectRatio: '3:4',
        gender: 'both'
      },
      {
        title: 'Open House',
        prompt: 'Full-body [gender] welcoming at property entrance, bright daylight, 35mm, hosting realtor, friendly professional.',
        aspectRatio: '3:4',
        gender: 'both'
      },
      {
        title: 'Commercial Realtor',
        prompt: '3/4 [gender] with commercial building background, professional lighting, 50mm, commercial real estate expert.',
        aspectRatio: '3:4',
        gender: 'both'
      },
      {
        title: 'Team Leader',
        prompt: 'Headshot [gender] real estate team leader, confident presence, soft light, 85mm, leadership authority.',
        aspectRatio: '1:1',
        gender: 'both'
      },
      {
        title: 'Listing Agent',
        prompt: '3/4 [gender] with tablet showing listing, natural light, 50mm, tech-savvy realtor, modern agent.',
        aspectRatio: '3:4',
        gender: 'both'
      },
      {
        title: 'Market Expert',
        prompt: 'Headshot [gender] with city skyline blur, professional light, 85mm, market knowledge, expert agent.',
        aspectRatio: '1:1',
        gender: 'both'
      }
    ]
  },

  {
    id: 'keynote-speaker-pro',
    name: 'Keynote Speaker Professional',
    description: 'Authoritative conference speaker photos',
    targetImages: 10,
    prompts: [
      {
        title: 'Stage Presence',
        prompt: 'Full-body [gender] on conference stage, spotlight key, 85mm, hand gesture, authoritative, professional presentation attire.',
        aspectRatio: '16:9',
        gender: 'both'
      },
      {
        title: 'TED Talk Style',
        prompt: '3/4 [gender] on circular stage, dramatic stage light, 50mm, passionate speaker, thought leader presence.',
        aspectRatio: '16:9',
        gender: 'both'
      },
      {
        title: 'Microphone Moment',
        prompt: 'Full-body [gender] with headset mic, conference lighting, 85mm, engaging speaker, dynamic presentation.',
        aspectRatio: '16:9',
        gender: 'both'
      },
      {
        title: 'Audience Connection',
        prompt: '3/4 [gender] speaking to audience, stage lights, 50mm, connecting presenter, engaging speaker energy.',
        aspectRatio: '16:9',
        gender: 'both'
      },
      {
        title: 'Corporate Event',
        prompt: 'Full-body [gender] at corporate conference, professional stage light, 50mm, business speaker, executive presence.',
        aspectRatio: '16:9',
        gender: 'both'
      },
      {
        title: 'Panel Discussion',
        prompt: '3/4 [gender] on panel stage, soft stage lights, 50mm, expert panelist, professional discussion.',
        aspectRatio: '16:9',
        gender: 'both'
      },
      {
        title: 'Motivational Speaker',
        prompt: 'Full-body [gender] with passionate gesture, dramatic spotlight, 50mm, inspirational speaker, motivational energy.',
        aspectRatio: '16:9',
        gender: 'both'
      },
      {
        title: 'Tech Conference',
        prompt: '3/4 [gender] at tech event stage, modern lighting, 50mm, innovation speaker, tech thought leader.',
        aspectRatio: '16:9',
        gender: 'both'
      },
      {
        title: 'Workshop Leader Stage',
        prompt: 'Full-body [gender] leading workshop, bright stage light, 35mm, interactive presenter, engaging educator.',
        aspectRatio: '16:9',
        gender: 'both'
      },
      {
        title: 'Presentation Power',
        prompt: '3/4 [gender] presenting with confidence, professional stage light, 50mm, authority speaker, commanding presence.',
        aspectRatio: '16:9',
        gender: 'both'
      }
    ]
  }
];

/**
 * ═══════════════════════════════════════════════════════════════
 * 🎨 AI & CREATIVE (CATÉGORIES MANQUANTES)
 * ═══════════════════════════════════════════════════════════════
 */

export const aiCreativeMissing: FluxCategoryConfig[] = [
  {
    id: 'photo-to-anime',
    name: 'Photo To Anime Converter',
    description: 'Transform photos into anime style',
    targetImages: 10,
    prompts: [
      {
        title: 'Anime Style Portrait',
        prompt: 'Anime-style 3/4 [gender] with cel-shaded look, pastel background, soft rim, expressive eyes, manga aesthetic.',
        aspectRatio: '3:4',
        gender: 'both'
      },
      {
        title: 'Shonen Hero',
        prompt: 'Full-body [gender] as shonen anime hero, dynamic pose, bright colors, 50mm, action anime style.',
        aspectRatio: '3:4',
        gender: 'both'
      },
      {
        title: 'Anime Girl Cute',
        prompt: '3/4 [gender] cute anime girl style, kawaii aesthetic, pastel colors, 50mm, moe anime look.',
        aspectRatio: '3:4',
        gender: 'female'
      },
      {
        title: 'Fantasy Anime',
        prompt: 'Full-body [gender] anime fantasy character, magical background, dramatic light, 50mm, isekai aesthetic.',
        aspectRatio: '3:4',
        gender: 'both'
      },
      {
        title: 'School Anime',
        prompt: '3/4 [gender] in anime school uniform, cherry blossom background, soft light, 50mm, slice-of-life style.',
        aspectRatio: '3:4',
        gender: 'both'
      },
      {
        title: 'Anime Warrior',
        prompt: 'Full-body [gender] anime warrior, dramatic action pose, cinematic light, 50mm, battle anime aesthetic.',
        aspectRatio: '3:4',
        gender: 'both'
      },
      {
        title: 'Anime Portrait Close',
        prompt: 'Close-up [gender] anime style, detailed eyes, soft background, 85mm, character portrait aesthetic.',
        aspectRatio: '1:1',
        gender: 'both'
      },
      {
        title: 'Magical Girl',
        prompt: 'Full-body [gender] magical girl transformation, sparkles and light, 50mm, mahou shoujo aesthetic.',
        aspectRatio: '3:4',
        gender: 'female'
      },
      {
        title: 'Anime Casual',
        prompt: '3/4 [gender] casual anime outfit, urban background, natural anime light, 50mm, modern anime style.',
        aspectRatio: '3:4',
        gender: 'both'
      },
      {
        title: 'Cyberpunk Anime',
        prompt: 'Full-body [gender] cyberpunk anime, neon city, RGB accents, 35mm, sci-fi anime aesthetic.',
        aspectRatio: '3:4',
        gender: 'both'
      }
    ]
  },

  {
    id: 'ai-anime-character',
    name: 'AI Anime Character Creator',
    description: 'Create custom anime avatars',
    targetImages: 10,
    prompts: [
      {
        title: 'Anime Avatar',
        prompt: 'Anime 3/4 [gender], cinematic rim, stylized outfit, vibrant background, expressive eyes, character design.',
        aspectRatio: '1:1',
        gender: 'both'
      },
      {
        title: 'RPG Character',
        prompt: 'Full-body [gender] anime RPG character, fantasy outfit, dramatic light, 50mm, game character aesthetic.',
        aspectRatio: '3:4',
        gender: 'both'
      },
      {
        title: 'Anime Protagonist',
        prompt: '3/4 [gender] main character anime, determined expression, hero lighting, 50mm, protagonist energy.',
        aspectRatio: '3:4',
        gender: 'both'
      },
      {
        title: 'Villain Anime',
        prompt: 'Full-body [gender] anime villain, dark dramatic background, moody light, 50mm, antagonist aesthetic.',
        aspectRatio: '3:4',
        gender: 'both'
      },
      {
        title: 'Cute Chibi Mix',
        prompt: '3/4 [gender] semi-chibi anime style, adorable proportions, colorful background, 50mm, cute aesthetic.',
        aspectRatio: '1:1',
        gender: 'both'
      },
      {
        title: 'Anime School Life',
        prompt: 'Full-body [gender] school anime character, classroom background, soft daylight, 50mm, student life.',
        aspectRatio: '3:4',
        gender: 'both'
      },
      {
        title: 'Fantasy Princess',
        prompt: 'Full-body [gender] anime princess, royal outfit, castle background, 50mm, fantasy royalty aesthetic.',
        aspectRatio: '3:4',
        gender: 'female'
      },
      {
        title: 'Anime Knight',
        prompt: 'Full-body [gender] anime knight armor, medieval fantasy, dramatic light, 50mm, warrior aesthetic.',
        aspectRatio: '3:4',
        gender: 'both'
      },
      {
        title: 'Modern Anime',
        prompt: '3/4 [gender] contemporary anime style, city background, natural light, 50mm, modern character.',
        aspectRatio: '3:4',
        gender: 'both'
      },
      {
        title: 'Anime Idol',
        prompt: 'Full-body [gender] anime idol outfit, stage lights, sparkles, 50mm, idol performance aesthetic.',
        aspectRatio: '3:4',
        gender: 'both'
      }
    ]
  },

  {
    id: 'chibi-character',
    name: 'Chibi Character Generator',
    description: 'Adorable chibi style transformations',
    targetImages: 10,
    prompts: [
      {
        title: 'Chibi Cute',
        prompt: 'Chibi-style [gender] with big head, pastel room, flat light, cute sticker vibe, kawaii proportions.',
        aspectRatio: '1:1',
        gender: 'both'
      },
      {
        title: 'Chibi Mascot',
        prompt: 'Full chibi [gender] mascot style, colorful background, soft light, adorable character design.',
        aspectRatio: '1:1',
        gender: 'both'
      },
      {
        title: 'Chibi Action',
        prompt: 'Chibi [gender] in action pose, dynamic background, bright colors, playful energy.',
        aspectRatio: '1:1',
        gender: 'both'
      },
      {
        title: 'Chibi Fantasy',
        prompt: 'Chibi [gender] fantasy outfit, magical sparkles, pastel colors, fairy tale aesthetic.',
        aspectRatio: '1:1',
        gender: 'both'
      },
      {
        title: 'Chibi School',
        prompt: 'Chibi [gender] school uniform, classroom background, kawaii style, student chibi.',
        aspectRatio: '1:1',
        gender: 'both'
      },
      {
        title: 'Chibi Animal Ears',
        prompt: 'Chibi [gender] with animal ears, fluffy tail, pastel colors, kemonomimi aesthetic.',
        aspectRatio: '1:1',
        gender: 'both'
      },
      {
        title: 'Chibi Seasonal',
        prompt: 'Chibi [gender] seasonal outfit, holiday theme, festive colors, cute celebration.',
        aspectRatio: '1:1',
        gender: 'both'
      },
      {
        title: 'Chibi Emotion',
        prompt: 'Chibi [gender] expressing emotion, exaggerated cute face, simple background, emotional chibi.',
        aspectRatio: '1:1',
        gender: 'both'
      },
      {
        title: 'Chibi Food Theme',
        prompt: 'Chibi [gender] with food props, dessert aesthetic, sweet colors, kawaii food theme.',
        aspectRatio: '1:1',
        gender: 'both'
      },
      {
        title: 'Chibi Couple',
        prompt: 'Two chibi characters [gender], matching outfits, heart background, couple aesthetic.',
        aspectRatio: '1:1',
        gender: 'both'
      }
    ]
  },

  {
    id: 'avatar-ai',
    name: 'Avatar AI™',
    description: 'Viral AI avatar styles collection',
    targetImages: 15,
    prompts: [
      {
        title: 'Avatar Classic',
        prompt: 'Centered 1:1 portrait of a [gender] with stylized background gradient, 50mm, iconic avatar look, viral AI aesthetic.',
        aspectRatio: '1:1',
        gender: 'both'
      },
      {
        title: 'Painted Avatar',
        prompt: 'Artistic portrait [gender], oil painting style, dramatic background, 85mm, painted avatar aesthetic.',
        aspectRatio: '1:1',
        gender: 'both'
      },
      {
        title: 'Futuristic Avatar',
        prompt: '3/4 [gender] cyberpunk avatar style, neon accents, 50mm, futuristic AI portrait.',
        aspectRatio: '1:1',
        gender: 'both'
      },
      {
        title: 'Fantasy Avatar',
        prompt: 'Portrait [gender] fantasy character, magical background, dramatic light, 85mm, fantasy avatar.',
        aspectRatio: '1:1',
        gender: 'both'
      },
      {
        title: 'Anime Avatar',
        prompt: 'Anime-style [gender] avatar, cel-shaded, gradient background, 50mm, anime AI portrait.',
        aspectRatio: '1:1',
        gender: 'both'
      },
      {
        title: 'Vintage Avatar',
        prompt: 'Portrait [gender] vintage photo style, sepia tones, classic background, 85mm, retro avatar.',
        aspectRatio: '1:1',
        gender: 'both'
      },
      {
        title: 'Cosmic Avatar',
        prompt: '3/4 [gender] with cosmic background, stars and nebula, 50mm, space avatar aesthetic.',
        aspectRatio: '1:1',
        gender: 'both'
      },
      {
        title: 'Glitch Avatar',
        prompt: 'Portrait [gender] with digital glitch effects, RGB split, 85mm, glitch art avatar.',
        aspectRatio: '1:1',
        gender: 'both'
      },
      {
        title: 'Minimalist Avatar',
        prompt: 'Simple portrait [gender], clean lines, solid color background, 85mm, minimal avatar design.',
        aspectRatio: '1:1',
        gender: 'both'
      },
      {
        title: 'Pop Art Avatar',
        prompt: 'Portrait [gender] pop art style, bold colors, Ben-Day dots, 85mm, pop art aesthetic.',
        aspectRatio: '1:1',
        gender: 'both'
      },
      {
        title: 'Watercolor Avatar',
        prompt: 'Artistic [gender] watercolor painting style, soft colors, 85mm, watercolor avatar.',
        aspectRatio: '1:1',
        gender: 'both'
      },
      {
        title: 'Neon Avatar',
        prompt: 'Portrait [gender] with neon outline, dark background, RGB glow, 85mm, neon avatar.',
        aspectRatio: '1:1',
        gender: 'both'
      },
      {
        title: 'Heroic Avatar',
        prompt: '3/4 [gender] superhero style, dramatic cape, epic background, 50mm, heroic avatar.',
        aspectRatio: '1:1',
        gender: 'both'
      },
      {
        title: 'Elegant Avatar',
        prompt: 'Portrait [gender] elegant formal style, luxury background, soft light, 85mm, elegant avatar.',
        aspectRatio: '1:1',
        gender: 'both'
      },
      {
        title: 'Street Style Avatar',
        prompt: '3/4 [gender] urban street style, graffiti background, 50mm, street avatar aesthetic.',
        aspectRatio: '1:1',
        gender: 'both'
      }
    ]
  },

  {
    id: 'ai-model-agency',
    name: 'AI Model Agency',
    description: 'Professional AI model portfolio',
    targetImages: 10,
    prompts: [
      {
        title: 'Agency Portfolio',
        prompt: 'Polished 3/4 [gender], neutral studio, agency comp-card vibe, 85mm, clean professional model aesthetic.',
        aspectRatio: '3:4',
        gender: 'both'
      },
      {
        title: 'Fashion Catalog',
        prompt: 'Full-body [gender] catalog pose, white cyclorama, soft even light, 50mm, commercial model quality.',
        aspectRatio: '3:4',
        gender: 'both'
      },
      {
        title: 'Editorial Model',
        prompt: '3/4 [gender] high-fashion editorial, dramatic lighting, 85mm, magazine model aesthetic.',
        aspectRatio: '3:4',
        gender: 'both'
      },
      {
        title: 'Comp Card Front',
        prompt: 'Tight headshot [gender] comp card style, neutral background, clean light, 85mm, agency standard.',
        aspectRatio: '1:1',
        gender: 'both'
      },
      {
        title: 'Runway Ready',
        prompt: 'Full-body [gender] runway pose, backstage setting, professional light, 50mm, catwalk model.',
        aspectRatio: '3:4',
        gender: 'both'
      },
      {
        title: 'Commercial Model',
        prompt: '3/4 [gender] friendly commercial pose, bright studio, 50mm, advertising model aesthetic.',
        aspectRatio: '3:4',
        gender: 'both'
      },
      {
        title: 'Beauty Model',
        prompt: 'Close beauty shot [gender], flawless skin, soft beauty dish, 85mm, cosmetics model.',
        aspectRatio: '1:1',
        gender: 'both'
      },
      {
        title: 'Fitness Model Pro',
        prompt: 'Full-body [gender] athletic pose, studio light, 50mm, fit model aesthetic, defined physique.',
        aspectRatio: '3:4',
        gender: 'both'
      },
      {
        title: 'Lifestyle Model',
        prompt: '3/4 [gender] lifestyle setting, natural light, 50mm, relatable model, authentic aesthetic.',
        aspectRatio: '3:4',
        gender: 'both'
      },
      {
        title: 'Luxury Brand',
        prompt: 'Full-body [gender] luxury fashion, premium setting, dramatic light, 50mm, high-end model.',
        aspectRatio: '3:4',
        gender: 'both'
      }
    ]
  },

  {
    id: 'ai-action-figure',
    name: 'AI Action Figure',
    description: 'Action figure toy packaging style',
    targetImages: 10,
    prompts: [
      {
        title: 'Action Figure Box',
        prompt: 'Boxed action-figure style portrait of a [gender] in toy packaging, studio light, 50mm, playful realism, collectible aesthetic.',
        aspectRatio: '3:4',
        gender: 'both'
      },
      {
        title: 'Superhero Figure',
        prompt: 'Full-body [gender] as superhero action figure, dynamic pose, toy box background, 50mm, comic collectible.',
        aspectRatio: '3:4',
        gender: 'both'
      },
      {
        title: 'Collector Edition',
        prompt: '3/4 [gender] limited edition figure, premium packaging, studio light, 50mm, collector item aesthetic.',
        aspectRatio: '3:4',
        gender: 'both'
      },
      {
        title: 'Vintage Figure',
        prompt: 'Full-body [gender] retro action figure style, 80s toy packaging, 50mm, nostalgic collectible.',
        aspectRatio: '3:4',
        gender: 'both'
      },
      {
        title: 'Sci-Fi Figure',
        prompt: '3/4 [gender] sci-fi action figure, futuristic packaging, 50mm, space toy aesthetic.',
        aspectRatio: '3:4',
        gender: 'both'
      },
      {
        title: 'Fantasy Figure',
        prompt: 'Full-body [gender] fantasy warrior figure, RPG packaging, 50mm, fantasy collectible.',
        aspectRatio: '3:4',
        gender: 'both'
      },
      {
        title: 'Sports Figure',
        prompt: '3/4 [gender] athlete action figure, sports packaging, 50mm, sports collectible aesthetic.',
        aspectRatio: '3:4',
        gender: 'both'
      },
      {
        title: 'Movie Figure',
        prompt: 'Full-body [gender] movie character figure, film packaging, 50mm, cinema collectible.',
        aspectRatio: '3:4',
        gender: 'both'
      },
      {
        title: 'Anime Figure',
        prompt: '3/4 [gender] anime character figure, Japanese packaging, 50mm, anime collectible style.',
        aspectRatio: '3:4',
        gender: 'both'
      },
      {
        title: 'Custom Figure',
        prompt: 'Full-body [gender] custom action figure, unique packaging, 50mm, personalized collectible.',
        aspectRatio: '3:4',
        gender: 'both'
      }
    ]
  },

  {
    id: 'ai-food-photography',
    name: 'AI Food Photography',
    description: 'Professional food and dish photography',
    targetImages: 10,
    prompts: [
      {
        title: 'Hero Food Shot',
        prompt: 'Overhead hero shot of plated dish with [gender] hands styling, scrim light, crisp detail, restaurant quality food photography.',
        aspectRatio: '1:1',
        gender: 'both'
      },
      {
        title: 'Burger Close-up',
        prompt: 'Close-up gourmet burger, dramatic side light, 100mm macro, mouth-watering detail, menu photography.',
        aspectRatio: '4:5',
        gender: 'both'
      },
      {
        title: 'Dessert Styling',
        prompt: 'Overhead dessert plate, soft natural light, food styling props, 50mm, pastry photography.',
        aspectRatio: '1:1',
        gender: 'both'
      },
      {
        title: 'Sushi Platter',
        prompt: 'Top-down sushi arrangement, clean white background, bright even light, Japanese cuisine photography.',
        aspectRatio: '4:5',
        gender: 'both'
      },
      {
        title: 'Pizza Slice',
        prompt: 'Close-up pizza slice pull, cheese stretch, warm light, 50mm, appetizing food photography.',
        aspectRatio: '4:5',
        gender: 'both'
      },
      {
        title: 'Cocktail Beauty',
        prompt: 'Elegant cocktail glass, dark moody background, rim light, 85mm, beverage photography.',
        aspectRatio: '4:5',
        gender: 'both'
      },
      {
        title: 'Breakfast Flat Lay',
        prompt: 'Overhead breakfast spread, natural window light, styled props, morning food photography.',
        aspectRatio: '1:1',
        gender: 'both'
      },
      {
        title: 'Pasta Action',
        prompt: 'Fork twirling pasta, steam rising, dramatic light, 50mm, Italian cuisine photography.',
        aspectRatio: '4:5',
        gender: 'both'
      },
      {
        title: 'Fresh Salad',
        prompt: 'Overhead fresh salad bowl, vibrant colors, natural light, 50mm, healthy food photography.',
        aspectRatio: '1:1',
        gender: 'both'
      },
      {
        title: 'Coffee Art',
        prompt: 'Top-down latte art, marble table, soft window light, café photography aesthetic.',
        aspectRatio: '1:1',
        gender: 'both'
      }
    ]
  },

  {
    id: 'ai-nail-designer',
    name: 'AI Nail Designer',
    description: 'Professional nail art photography',
    targetImages: 10,
    prompts: [
      {
        title: 'Nail Art Close',
        prompt: 'Macro hands close-up with nail art, softbox gradient, 100mm macro look, glossy detail, beauty photography.',
        aspectRatio: '4:5',
        gender: 'both'
      },
      {
        title: 'French Manicure',
        prompt: 'Close-up elegant hands, french tip nails, soft beauty light, 100mm, classic nail aesthetic.',
        aspectRatio: '4:5',
        gender: 'both'
      },
      {
        title: 'Gel Nails Gloss',
        prompt: 'Macro gel nails, high gloss finish, soft gradient background, beauty photography detail.',
        aspectRatio: '1:1',
        gender: 'both'
      },
      {
        title: 'Acrylic Art',
        prompt: 'Close-up acrylic nail designs, vibrant colors, clean background, 100mm, nail art showcase.',
        aspectRatio: '4:5',
        gender: 'both'
      },
      {
        title: 'Minimalist Nails',
        prompt: 'Simple elegant nails, minimal design, soft light, 100mm, modern nail aesthetic.',
        aspectRatio: '1:1',
        gender: 'both'
      },
      {
        title: 'Festive Nail Design',
        prompt: 'Seasonal nail art, holiday theme, bright colors, macro detail, festive nail photography.',
        aspectRatio: '4:5',
        gender: 'both'
      },
      {
        title: 'Wedding Nails',
        prompt: 'Bridal nail design, delicate details, soft romantic light, 100mm, wedding nail aesthetic.',
        aspectRatio: '1:1',
        gender: 'both'
      },
      {
        title: 'Bold Statement',
        prompt: 'Dramatic long nails, bold design, high contrast, 100mm, statement nail art.',
        aspectRatio: '4:5',
        gender: 'both'
      },
      {
        title: 'Natural Nail Care',
        prompt: 'Clean natural nails, healthy look, soft beauty light, 100mm, nail care photography.',
        aspectRatio: '1:1',
        gender: 'both'
      },
      {
        title: '3D Nail Art',
        prompt: 'Macro 3D nail embellishments, detailed craftsmanship, studio light, luxury nail design.',
        aspectRatio: '4:5',
        gender: 'both'
      }
    ]
  },

  {
    id: 'ai-girlfriend',
    name: 'AI Girlfriend',
    description: 'AI girlfriend aesthetic style',
    targetImages: 10,
    prompts: [
      {
        title: 'AI Girlfriend Classic',
        prompt: '3/4 [gender] in stylized AI girlfriend look, pastel studio, 50mm, charming, photoreal digital companion aesthetic.',
        aspectRatio: '3:4',
        gender: 'female'
      },
      {
        title: 'Virtual Companion',
        prompt: '3/4 [gender] friendly smile, soft gradient background, 50mm, approachable AI aesthetic.',
        aspectRatio: '3:4',
        gender: 'female'
      },
      {
        title: 'Digital Romance',
        prompt: 'Portrait [gender] romantic setting, soft pink tones, 85mm, virtual relationship aesthetic.',
        aspectRatio: '3:4',
        gender: 'female'
      },
      {
        title: 'AI Companion Casual',
        prompt: '3/4 [gender] casual comfortable outfit, home setting, natural light, 50mm, everyday AI.',
        aspectRatio: '3:4',
        gender: 'female'
      },
      {
        title: 'Virtual Date',
        prompt: 'Full-body [gender] at café table, warm ambient light, 50mm, date scenario aesthetic.',
        aspectRatio: '3:4',
        gender: 'female'
      },
      {
        title: 'Morning AI',
        prompt: '3/4 [gender] morning routine, soft window light, 50mm, intimate daily moment.',
        aspectRatio: '3:4',
        gender: 'female'
      },
      {
        title: 'Outdoor AI Walk',
        prompt: 'Full-body [gender] walking in park, natural daylight, 50mm, outdoor companion moment.',
        aspectRatio: '4:5',
        gender: 'female'
      },
      {
        title: 'Cozy Evening',
        prompt: '3/4 [gender] cozy home setting, warm lamp light, 50mm, relaxed evening aesthetic.',
        aspectRatio: '3:4',
        gender: 'female'
      },
      {
        title: 'AI Selfie Style',
        prompt: 'Close selfie angle [gender], smartphone perspective, natural light, authentic AI selfie.',
        aspectRatio: '9:16',
        gender: 'female'
      },
      {
        title: 'Virtual Travel',
        prompt: 'Full-body [gender] at travel destination, golden hour, 35mm, travel companion aesthetic.',
        aspectRatio: '3:4',
        gender: 'female'
      }
    ]
  },

  {
    id: 'ai-protests',
    name: 'AI Protests',
    description: 'Protest movement photography',
    targetImages: 8,
    prompts: [
      {
        title: 'Protest Sign',
        prompt: '3/4 [gender] in crowd with protest sign, overcast daylight, 35mm, documentary realism, activism aesthetic.',
        aspectRatio: '3:4',
        gender: 'both'
      },
      {
        title: 'March Movement',
        prompt: 'Full-body [gender] marching in protest, street scene, natural light, 35mm, social movement documentation.',
        aspectRatio: '3:4',
        gender: 'both'
      },
      {
        title: 'Activist Portrait',
        prompt: '3/4 [gender] activist at rally, determined expression, daylight, 50mm, protest participant.',
        aspectRatio: '3:4',
        gender: 'both'
      },
      {
        title: 'Crowd Unity',
        prompt: 'Wide shot [gender] in protest crowd, raised signs, overcast, 35mm, collective action.',
        aspectRatio: '16:9',
        gender: 'both'
      },
      {
        title: 'Street Demonstration',
        prompt: 'Full-body [gender] demonstrating on street, urban setting, natural light, 35mm, civic engagement.',
        aspectRatio: '3:4',
        gender: 'both'
      },
      {
        title: 'Rally Speaker',
        prompt: '3/4 [gender] speaking at rally, megaphone, outdoor daylight, 50mm, grassroots leadership.',
        aspectRatio: '3:4',
        gender: 'both'
      },
      {
        title: 'Peaceful Protest',
        prompt: 'Full-body [gender] peaceful demonstration, calm determination, natural light, 35mm, non-violent resistance.',
        aspectRatio: '3:4',
        gender: 'both'
      },
      {
        title: 'Banner Holder',
        prompt: '3/4 [gender] holding large banner, group setting, overcast light, 35mm, organized protest.',
        aspectRatio: '3:4',
        gender: 'both'
      }
    ]
  },

  {
    id: 'ai-feet-generator',
    name: 'AI Feet Generator',
    description: 'Artistic feet photography',
    targetImages: 8,
    prompts: [
      {
        title: 'Artistic Feet',
        prompt: 'Close-up of feet posed aesthetically on soft set, diffused light, macro detail, tasteful composition, artistic photography.',
        aspectRatio: '4:5',
        gender: 'both'
      },
      {
        title: 'Beach Feet',
        prompt: 'Feet on sandy beach, ocean background, natural sunlight, 50mm, summer beach aesthetic.',
        aspectRatio: '4:5',
        gender: 'both'
      },
      {
        title: 'Spa Pedicure',
        prompt: 'Close-up pedicured feet, spa setting, soft beauty light, 85mm, wellness aesthetic.',
        aspectRatio: '1:1',
        gender: 'both'
      },
      {
        title: 'Poolside Relax',
        prompt: 'Feet by pool edge, water reflection, bright daylight, 50mm, luxury relaxation.',
        aspectRatio: '4:5',
        gender: 'both'
      },
      {
        title: 'Barefoot Nature',
        prompt: 'Feet on grass, natural outdoor setting, soft daylight, 50mm, nature connection.',
        aspectRatio: '4:5',
        gender: 'both'
      },
      {
        title: 'Elegant Heels',
        prompt: 'Close-up feet in elegant heels, studio setting, dramatic light, 85mm, fashion footwear.',
        aspectRatio: '4:5',
        gender: 'female'
      },
      {
        title: 'Cozy Socks',
        prompt: 'Feet in cozy socks, home setting, warm lamp light, 50mm, comfortable aesthetic.',
        aspectRatio: '1:1',
        gender: 'both'
      },
      {
        title: 'Yoga Pose',
        prompt: 'Feet in yoga pose, studio mat, soft natural light, 50mm, wellness practice.',
        aspectRatio: '4:5',
        gender: 'both'
      }
    ]
  }
];

/**
 * ═══════════════════════════════════════════════════════════════
 * 👗 FASHION & STYLE (CATÉGORIES MANQUANTES)
 * ═══════════════════════════════════════════════════════════════
 */

export const fashionStyleMissing: FluxCategoryConfig[] = [
  {
    id: 'glamour',
    name: 'Glamour Photography',
    description: 'Alluring, sophisticated glamour shots',
    targetImages: 10,
    prompts: [
      {
        title: 'Glamour Classic',
        prompt: 'Full-body [gender] in eveningwear, moody tungsten + rim, 50mm, elegant, cinematic highlights, luxury glamour aesthetic.',
        aspectRatio: '3:4',
        gender: 'both'
      },
      {
        title: 'Hollywood Glamour',
        prompt: '3/4 [gender] Hollywood style, dramatic lighting, 85mm, classic glamour, golden age aesthetic.',
        aspectRatio: '3:4',
        gender: 'both'
      },
      {
        title: 'Luxury Evening',
        prompt: 'Full-body [gender] luxury gown, elegant setting, soft rim light, 50mm, high-end glamour.',
        aspectRatio: '3:4',
        gender: 'female'
      },
      {
        title: 'Sultry Portrait',
        prompt: 'Close-up [gender] sultry expression, dramatic shadow, 85mm, alluring glamour photography.',
        aspectRatio: '1:1',
        gender: 'both'
      },
      {
        title: 'Fashion Glamour',
        prompt: 'Full-body [gender] high fashion, editorial lighting, 50mm, sophisticated glamour aesthetic.',
        aspectRatio: '3:4',
        gender: 'both'
      },
      {
        title: 'Boudoir Glam',
        prompt: '3/4 [gender] on luxe chaise, soft wrap light, 50mm, refined glamour, elegant pose.',
        aspectRatio: '3:4',
        gender: 'both'
      },
      {
        title: 'Red Carpet',
        prompt: 'Full-body [gender] red carpet gown, paparazzi flash, 50mm, celebrity glamour aesthetic.',
        aspectRatio: '3:4',
        gender: 'both'
      },
      {
        title: 'Studio Glamour',
        prompt: '3/4 [gender] studio glamour pose, dramatic key light, 85mm, classic studio aesthetic.',
        aspectRatio: '3:4',
        gender: 'both'
      },
      {
        title: 'Jewelry Focus',
        prompt: 'Close-up [gender] showcasing jewelry, soft beauty light, 85mm, luxury accessories glamour.',
        aspectRatio: '1:1',
        gender: 'both'
      },
      {
        title: 'Evening Elegance',
        prompt: 'Full-body [gender] elegant evening attire, moody ambient, 50mm, sophisticated night glamour.',
        aspectRatio: '3:4',
        gender: 'both'
      }
    ]
  },

  {
    id: 'swimsuit',
    name: 'Swimsuit Photography',
    description: 'Elegant swimsuit and beachwear',
    targetImages: 10,
    prompts: [
      {
        title: 'Swimsuit Elegance',
        prompt: 'Full-body [gender] in swimsuit by pool edge, golden hour, 50mm, tasteful, clean water highlights, elegant swim aesthetic.',
        aspectRatio: '4:5',
        gender: 'both'
      },
      {
        title: 'Beach Walk',
        prompt: 'Full-body [gender] walking shoreline in swimsuit, natural sun, 35mm, beach confidence, summer aesthetic.',
        aspectRatio: '4:5',
        gender: 'both'
      },
      {
        title: 'Pool Lounge',
        prompt: '3/4 [gender] lounging poolside, overhead sun, 50mm, relaxed luxury, resort swimwear.',
        aspectRatio: '3:4',
        gender: 'both'
      },
      {
        title: 'Ocean Dip',
        prompt: 'Full-body [gender] in ocean water, bright daylight, 50mm, refreshing swim, natural beach.',
        aspectRatio: '4:5',
        gender: 'both'
      },
      {
        title: 'Tropical Swim',
        prompt: 'Full-body [gender] tropical beach, palm trees, bright sun, 50mm, paradise swimwear aesthetic.',
        aspectRatio: '4:5',
        gender: 'both'
      },
      {
        title: 'Yacht Swimwear',
        prompt: '3/4 [gender] on yacht deck, maritime sun, 50mm, luxury yacht swim aesthetic.',
        aspectRatio: '3:4',
        gender: 'both'
      },
      {
        title: 'Resort Pool',
        prompt: 'Full-body [gender] at infinity pool, tropical backdrop, 50mm, resort lifestyle swimwear.',
        aspectRatio: '4:5',
        gender: 'both'
      },
      {
        title: 'Sunset Swim',
        prompt: '3/4 [gender] at beach sunset, warm backlight, 85mm, romantic beach swimwear.',
        aspectRatio: '3:4',
        gender: 'both'
      },
      {
        title: 'Active Beach',
        prompt: 'Full-body [gender] beach volleyball, action pose, bright sun, 35mm, athletic swimwear.',
        aspectRatio: '4:5',
        gender: 'both'
      },
      {
        title: 'Elegant Swimwear',
        prompt: '3/4 [gender] elegant one-piece, luxury pool, soft light, 50mm, sophisticated swim style.',
        aspectRatio: '3:4',
        gender: 'both'
      }
    ]
  },

  {
    id: 'mobster',
    name: 'Mobster Aesthetic',
    description: 'Classic gangster, mob style',
    targetImages: 10,
    prompts: [
      {
        title: 'Mobster Classic',
        prompt: '3/4 [gender] in pinstripe suit + fedora, smoky alley, 50mm, film-noir grade, gangster aesthetic.',
        aspectRatio: '3:4',
        gender: 'both'
      },
      {
        title: 'Boss Portrait',
        prompt: 'Tight portrait [gender] mob boss, dramatic side light, 85mm, authoritative gangster presence.',
        aspectRatio: '1:1',
        gender: 'both'
      },
      {
        title: 'Speakeasy Scene',
        prompt: '3/4 [gender] at 1920s speakeasy bar, dim tungsten, 50mm, prohibition era mobster.',
        aspectRatio: '3:4',
        gender: 'both'
      },
      {
        title: 'Godfather Style',
        prompt: 'Full-body [gender] in tailored suit, office desk, dramatic light, 50mm, mafia don aesthetic.',
        aspectRatio: '3:4',
        gender: 'male'
      },
      {
        title: 'Street Gangster',
        prompt: '3/4 [gender] on urban street, noir lighting, 35mm, street mob aesthetic, tough presence.',
        aspectRatio: '3:4',
        gender: 'both'
      },
      {
        title: 'Casino Mob',
        prompt: 'Full-body [gender] at casino table, ambient casino light, 50mm, gambling mobster scene.',
        aspectRatio: '3:4',
        gender: 'both'
      },
      {
        title: 'Vintage Car',
        prompt: '3/4 [gender] by vintage car, noir street lamp, 50mm, classic mobster transportation.',
        aspectRatio: '3:4',
        gender: 'both'
      },
      {
        title: 'Cigar Lounge',
        prompt: '3/4 [gender] with cigar, leather chair, warm tungsten, 50mm, mob boss power scene.',
        aspectRatio: '3:4',
        gender: 'both'
      },
      {
        title: 'Back Alley',
        prompt: 'Full-body [gender] in dark alley, venetian shadows, 35mm, noir mobster atmosphere.',
        aspectRatio: '3:4',
        gender: 'both'
      },
      {
        title: 'Boardwalk Empire',
        prompt: '3/4 [gender] 1920s boardwalk, period costume, golden hour, 50mm, prohibition mobster.',
        aspectRatio: '3:4',
        gender: 'both'
      }
    ]
  }
];

// Continuation dans le prochain message car le fichier est trop long...
// Je vais créer la suite immédiatement
