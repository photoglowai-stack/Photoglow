/**
 * 🎨 PHOTOGLOW - PROMPTS FLUX OPTIMISÉS (SUITE) - TOUTES LES CATÉGORIES ADDITIONNELLES
 * 
 * Ce fichier contient TOUTES les catégories supplémentaires mentionnées dans le guide utilisateur
 * avec des prompts professionnels optimisés selon les standards Flux.
 * 
 * Chaque prompt suit la structure :
 * - Framing (close-up | 3/4 | full-body)
 * - Lens (50mm/85mm portrait, 35mm urbain, 200mm sport)  
 * - Lighting (soft window | golden hour rim | clamshell | flash | RGB gels)
 * - Ratio (1:1 avatar, 3:4 portrait, 9:16 story, 16:9 thumbnail)
 * - Style descriptif (peau naturelle, couleurs fidèles, pas de negative prompts)
 */

import { FluxCategoryConfig, FluxPromptTemplate } from './fluxOptimizedPrompts';

export const extendedFluxCategories: FluxCategoryConfig[] = [
  {
    id: 'luxury-lifestyle',
    name: 'Luxury Lifestyle',
    description: 'High-end, premium, luxury living',
    targetImages: 15,
    prompts: [
      {
        title: 'Luxury Lifestyle Elite',
        prompt: 'Full-body [gender] in tailored outfit in marble lobby, soft practical lights, 50mm, refined, premium finish, opulent aesthetic.',
        aspectRatio: '3:4',
        gender: 'both'
      },
      {
        title: 'Private Jet',
        prompt: '3/4 [gender] in private jet interior, soft cabin light, 50mm, luxury travel, first-class lifestyle.',
        aspectRatio: '3:4',
        gender: 'both'
      },
      {
        title: 'Penthouse View',
        prompt: 'Full-body [gender] at penthouse window, city lights background, 50mm, luxury real estate, high-rise living.',
        aspectRatio: '3:4',
        gender: 'both'
      },
      {
        title: 'Designer Shopping',
        prompt: '3/4 [gender] in designer boutique, luxury store lighting, 50mm, high-end shopping, fashion luxury.',
        aspectRatio: '3:4',
        gender: 'both'
      },
      {
        title: 'Luxury Car',
        prompt: '3/4 [gender] with luxury sports car, showroom light, 50mm, automotive luxury, premium lifestyle.',
        aspectRatio: '3:4',
        gender: 'both'
      },
      {
        title: 'Fine Dining',
        prompt: '3/4 [gender] at Michelin restaurant, warm ambient light, 50mm, haute cuisine, fine dining elegance.',
        aspectRatio: '3:4',
        gender: 'both'
      },
      {
        title: 'Five Star Hotel',
        prompt: 'Full-body [gender] in luxury hotel suite, soft hotel lighting, 50mm, premium hospitality, five-star lifestyle.',
        aspectRatio: '3:4',
        gender: 'both'
      },
      {
        title: 'Champagne Celebration',
        prompt: '3/4 [gender] with champagne, luxury bar background, 50mm, celebratory luxury, premium lifestyle.',
        aspectRatio: '3:4',
        gender: 'both'
      },
      {
        title: 'Yacht Deck Luxury',
        prompt: 'Full-body [gender] on luxury yacht deck, maritime golden hour, 50mm, nautical luxury, sea lifestyle.',
        aspectRatio: '3:4',
        gender: 'both'
      },
      {
        title: 'VIP Lounge',
        prompt: '3/4 [gender] in VIP airport lounge, sophisticated lighting, 50mm, first-class travel, premium comfort.',
        aspectRatio: '3:4',
        gender: 'both'
      },
      {
        title: 'Designer Wardrobe',
        prompt: 'Full-body [gender] in walk-in luxury closet, soft practical lights, 50mm, fashion collection, designer lifestyle.',
        aspectRatio: '3:4',
        gender: 'both'
      },
      {
        title: 'Pool Villa',
        prompt: '3/4 [gender] at luxury infinity pool, tropical daylight, 50mm, resort elegance, villa lifestyle.',
        aspectRatio: '3:4',
        gender: 'both'
      },
      {
        title: 'Rolex Moment',
        prompt: 'Close-up [gender] showing luxury watch, soft key light, 85mm, timepiece focus, premium accessories.',
        aspectRatio: '1:1',
        gender: 'both'
      },
      {
        title: 'Art Gallery',
        prompt: '3/4 [gender] at contemporary art gallery, gallery lighting, 50mm, cultural luxury, art collector aesthetic.',
        aspectRatio: '3:4',
        gender: 'both'
      },
      {
        title: 'Spa Wellness',
        prompt: '3/4 [gender] at luxury spa, soft wellness lighting, 50mm, self-care luxury, premium relaxation.',
        aspectRatio: '3:4',
        gender: 'both'
      }
    ]
  },

  {
    id: 'ai-influencer',
    name: 'AI Influencer Generator',
    description: 'Social media influencer content',
    targetImages: 15,
    prompts: [
      {
        title: 'Instagram Influencer',
        prompt: 'Full-body of a [gender] influencer look on city rooftop, soft sunset, 35mm, confident pose, editorial yet natural, social media aesthetic.',
        aspectRatio: '4:5',
        gender: 'both'
      },
      {
        title: 'Influencer Signature',
        prompt: '3/4 of a [gender] signature influencer pose, stylized wardrobe, urban skyline, golden hour rim, 50mm, photoreal social look.',
        aspectRatio: '4:5',
        gender: 'both'
      },
      {
        title: 'Content Creator',
        prompt: '3/4 [gender] filming content, ring light setup, 35mm, behind-the-scenes, creator lifestyle.',
        aspectRatio: '9:16',
        gender: 'both'
      },
      {
        title: 'Lifestyle Blogger',
        prompt: 'Full-body [gender] at aesthetic café, natural window light, 35mm, lifestyle blogging, authentic influencer moment.',
        aspectRatio: '4:5',
        gender: 'both'
      },
      {
        title: 'Fashion Influencer',
        prompt: '3/4 [gender] in trendy outfit, urban street background, 50mm, fashion influence, style inspiration.',
        aspectRatio: '4:5',
        gender: 'both'
      },
      {
        title: 'Beauty Creator',
        prompt: 'Close-up [gender] showcasing makeup, ring light beauty, 85mm, beauty influencer, product focus.',
        aspectRatio: '1:1',
        gender: 'both'
      },
      {
        title: 'Travel Influencer',
        prompt: 'Full-body [gender] at travel destination, golden hour, 35mm, wanderlust content, travel inspiration.',
        aspectRatio: '4:5',
        gender: 'both'
      },
      {
        title: 'Fitness Influencer Pro',
        prompt: '3/4 [gender] at gym in activewear, natural gym light, 35mm, fitness motivation, workout influence.',
        aspectRatio: '9:16',
        gender: 'both'
      },
      {
        title: 'Unboxing Creator',
        prompt: '3/4 [gender] with product package, soft overhead light, 35mm, unboxing moment, creator authenticity.',
        aspectRatio: '16:9',
        gender: 'both'
      },
      {
        title: 'GRWM Content',
        prompt: 'Mirror selfie [gender] getting ready, bathroom ring light, smartphone angle, get-ready-with-me vibe.',
        aspectRatio: '9:16',
        gender: 'both'
      },
      {
        title: 'Dubai Influencer Luxe',
        prompt: 'Full-body [gender] at luxury bar, cigar/whiskey prop, warm tungsten, 50mm, bold persona, Dubai influencer aesthetic.',
        aspectRatio: '3:4',
        gender: 'both'
      },
      {
        title: 'Vlog Thumbnail',
        prompt: 'Tight face of a [gender] with exaggerated expression, flat bright background, 50mm, high clarity, vlog thumbnail.',
        aspectRatio: '16:9',
        gender: 'both'
      },
      {
        title: 'Brand Deal',
        prompt: '3/4 [gender] with sponsored product, professional lighting, 50mm, brand partnership, influencer marketing.',
        aspectRatio: '4:5',
        gender: 'both'
      },
      {
        title: 'Story Content',
        prompt: 'Candid 3/4 [gender] daily life moment, natural light, smartphone feel, Instagram story aesthetic.',
        aspectRatio: '9:16',
        gender: 'both'
      },
      {
        title: 'Reel Creator',
        prompt: 'Action 3/4 [gender] dynamic pose, bright colorful background, 35mm, viral reel energy, trending content.',
        aspectRatio: '9:16',
        gender: 'both'
      }
    ]
  },

  {
    id: 'instant-camera',
    name: 'Instant Camera',
    description: 'Polaroid, instant photo aesthetic',
    targetImages: 10,
    prompts: [
      {
        title: 'Polaroid Classic',
        prompt: 'Flash candid of a [gender] against plain wall, on-camera flash, hard shadow, white instant border, nostalgic Polaroid aesthetic.',
        aspectRatio: '1:1',
        gender: 'both'
      },
      {
        title: 'Party Instant',
        prompt: 'Flash photo [gender] at party, on-camera flash, 28mm, instant camera party vibe, spontaneous moment.',
        aspectRatio: '1:1',
        gender: 'both'
      },
      {
        title: 'Road Trip Polaroid',
        prompt: 'Candid [gender] on road trip, bright daylight, instant camera border, travel memory aesthetic.',
        aspectRatio: '1:1',
        gender: 'both'
      },
      {
        title: 'Beach Instant',
        prompt: 'Flash [gender] on beach, bright sun + flash, instant photo border, summer memory capture.',
        aspectRatio: '1:1',
        gender: 'both'
      },
      {
        title: 'Concert Memory',
        prompt: 'Flash photo [gender] at concert, stage lights + flash, instant camera, music event memory.',
        aspectRatio: '1:1',
        gender: 'both'
      },
      {
        title: 'Friends Instant',
        prompt: 'Group flash photo with [gender] and friends, on-camera flash, instant border, friendship moment.',
        aspectRatio: '1:1',
        gender: 'both'
      },
      {
        title: 'Bedroom Instant',
        prompt: 'Flash selfie [gender] in bedroom, instant camera aesthetic, white border, personal moment.',
        aspectRatio: '1:1',
        gender: 'both'
      },
      {
        title: 'Festival Polaroid',
        prompt: 'Candid [gender] at festival, bright daylight, instant photo, festival memory aesthetic.',
        aspectRatio: '1:1',
        gender: 'both'
      },
      {
        title: 'Vintage Instant',
        prompt: 'Flash portrait [gender], retro instant camera look, white border, vintage photography aesthetic.',
        aspectRatio: '1:1',
        gender: 'both'
      },
      {
        title: 'Birthday Instant',
        prompt: 'Flash photo [gender] with birthday cake, on-camera flash, instant border, celebration memory.',
        aspectRatio: '1:1',
        gender: 'both'
      }
    ]
  },

  {
    id: 'mob-wife',
    name: 'Mob Wife Aesthetic',
    description: 'Mob wife, bold luxury style',
    targetImages: 10,
    prompts: [
      {
        title: 'Mob Wife Classic',
        prompt: '3/4 [gender] in faux-fur + leopard print, luxe indoor light, 50mm, bold attitude, high-gloss, mob wife aesthetic.',
        aspectRatio: '3:4',
        gender: 'female'
      },
      {
        title: 'Fur Coat Power',
        prompt: 'Full-body [gender] in oversized fur coat, luxury car background, 50mm, power style, mob wife glamour.',
        aspectRatio: '3:4',
        gender: 'female'
      },
      {
        title: 'Gold Jewelry',
        prompt: 'Close-up [gender] showcasing gold jewelry, dramatic light, 85mm, luxe accessories, mob wife opulence.',
        aspectRatio: '1:1',
        gender: 'female'
      },
      {
        title: 'Italian Restaurant',
        prompt: '3/4 [gender] at upscale Italian restaurant, warm ambient light, 50mm, mob wife dining, power lunch.',
        aspectRatio: '3:4',
        gender: 'female'
      },
      {
        title: 'Sunglasses Boss',
        prompt: '3/4 [gender] in oversized sunglasses + fur, luxury setting, 50mm, boss energy, mob wife authority.',
        aspectRatio: '3:4',
        gender: 'female'
      },
      {
        title: 'Casino Night',
        prompt: 'Full-body [gender] at casino, dramatic indoor light, 50mm, mob wife night out, gambling glamour.',
        aspectRatio: '3:4',
        gender: 'female'
      },
      {
        title: 'Penthouse Mob',
        prompt: '3/4 [gender] in penthouse, city view, luxury interior light, 50mm, mob wife lifestyle, power residence.',
        aspectRatio: '3:4',
        gender: 'female'
      },
      {
        title: 'Red Lips Power',
        prompt: 'Close portrait [gender] with red lipstick, dramatic beauty light, 85mm, mob wife makeup, bold beauty.',
        aspectRatio: '1:1',
        gender: 'female'
      },
      {
        title: 'Champagne Mob',
        prompt: '3/4 [gender] with champagne glass, luxury bar, 50mm, mob wife celebration, high-end lifestyle.',
        aspectRatio: '3:4',
        gender: 'female'
      },
      {
        title: 'Animal Print Power',
        prompt: 'Full-body [gender] in leopard print dress, luxury setting, 50mm, mob wife fashion, bold pattern.',
        aspectRatio: '3:4',
        gender: 'female'
      }
    ]
  },

  {
    id: 'e-girl',
    name: 'E-Girl Aesthetic',
    description: 'E-girl, alt, internet culture',
    targetImages: 10,
    prompts: [
      {
        title: 'E-Girl Classic',
        prompt: '3/4 [gender] with alt makeup, neon accents, bedroom set, 50mm, edgy cute, e-girl aesthetic.',
        aspectRatio: '9:16',
        gender: 'both'
      },
      {
        title: 'Gamer E-Girl',
        prompt: '3/4 [gender] at gaming setup, RGB keyboard glow, 35mm, gamer girl aesthetic, streaming vibe.',
        aspectRatio: '16:9',
        gender: 'both'
      },
      {
        title: 'TikTok E-Girl',
        prompt: 'Close-up [gender] with heart stamps, ring light, smartphone angle, TikTok e-girl, trending makeup.',
        aspectRatio: '9:16',
        gender: 'both'
      },
      {
        title: 'Alt Fashion',
        prompt: 'Full-body [gender] in alt fashion outfit, urban background, 35mm, e-girl style, alternative aesthetic.',
        aspectRatio: '4:5',
        gender: 'both'
      },
      {
        title: 'Neon E-Girl',
        prompt: '3/4 [gender] with neon hair strands, RGB lighting, 50mm, colorful e-girl, vibrant aesthetic.',
        aspectRatio: '9:16',
        gender: 'both'
      },
      {
        title: 'Bedroom Streamer',
        prompt: '3/4 [gender] in bedroom streaming setup, LED strip lights, 35mm, content creator e-girl.',
        aspectRatio: '16:9',
        gender: 'both'
      },
      {
        title: 'Chain Jewelry',
        prompt: 'Close-up [gender] with chain necklaces, dramatic light, 85mm, e-girl accessories, alt jewelry.',
        aspectRatio: '1:1',
        gender: 'both'
      },
      {
        title: 'Anime Inspired',
        prompt: '3/4 [gender] with anime-inspired makeup, pastel background, 50mm, kawaii e-girl, Japanese aesthetic.',
        aspectRatio: '9:16',
        gender: 'both'
      },
      {
        title: 'Grunge E-Girl',
        prompt: 'Full-body [gender] in grunge e-girl outfit, urban alley, 35mm, dark alt aesthetic, edgy style.',
        aspectRatio: '4:5',
        gender: 'both'
      },
      {
        title: 'Twitch Streamer',
        prompt: '3/4 [gender] at streaming desk, webcam angle, RGB background, Twitch streamer e-girl aesthetic.',
        aspectRatio: '16:9',
        gender: 'both'
      }
    ]
  },

  {
    id: 'podcast-host',
    name: 'Podcast Host Studio',
    description: 'Podcast, audio content creator',
    targetImages: 10,
    prompts: [
      {
        title: 'Podcast Studio',
        prompt: 'Desk-mic 3/4 [gender], soft key + practical lamp, 50mm, podcast cover feel, professional audio setup.',
        aspectRatio: '1:1',
        gender: 'both'
      },
      {
        title: 'Recording Session',
        prompt: '3/4 [gender] speaking into mic, studio lighting, 50mm, recording moment, podcast authenticity.',
        aspectRatio: '16:9',
        gender: 'both'
      },
      {
        title: 'Host Portrait',
        prompt: 'Headshot [gender] with podcast mic, professional light, 85mm, host introduction, show branding.',
        aspectRatio: '1:1',
        gender: 'both'
      },
      {
        title: 'Interview Setup',
        prompt: 'Wide shot [gender] and guest at podcast table, studio light, 35mm, interview scene, conversation setup.',
        aspectRatio: '16:9',
        gender: 'both'
      },
      {
        title: 'Audio Engineer',
        prompt: '3/4 [gender] at mixing board, studio practical lights, 50mm, technical podcast production.',
        aspectRatio: '3:4',
        gender: 'both'
      },
      {
        title: 'Headphones On',
        prompt: 'Close-up [gender] wearing headphones at mic, dramatic key light, 85mm, listening moment, podcast focus.',
        aspectRatio: '1:1',
        gender: 'both'
      },
      {
        title: 'Video Podcast',
        prompt: '3/4 [gender] at video podcast setup, professional lighting, 50mm, YouTube podcast, visual content.',
        aspectRatio: '16:9',
        gender: 'both'
      },
      {
        title: 'Podcast Cover Art',
        prompt: 'Centered [gender] with podcast mic, dramatic background, 50mm, cover artwork, show branding.',
        aspectRatio: '1:1',
        gender: 'both'
      },
      {
        title: 'Remote Recording',
        prompt: '3/4 [gender] at home podcast setup, natural window light, 50mm, remote podcasting, home studio.',
        aspectRatio: '3:4',
        gender: 'both'
      },
      {
        title: 'Behind The Scenes',
        prompt: 'Candid [gender] preparing for podcast, practical studio lights, 35mm, BTS moment, production reality.',
        aspectRatio: '16:9',
        gender: 'both'
      }
    ]
  },

  {
    id: '1950s-film-noir',
    name: '1950s Film Noir',
    description: 'Black & white, noir, vintage mystery',
    targetImages: 10,
    prompts: [
      {
        title: 'Film Noir Classic',
        prompt: 'B&W 3/4 of a [gender] in trench/fedora, venetian-blind shadows, 50mm, high contrast, noir mood, mystery aesthetic.',
        aspectRatio: '3:4',
        gender: 'both'
      },
      {
        title: 'Detective Portrait',
        prompt: 'B&W [gender] detective in office, venetian blind light, 50mm, film noir detective, shadowy atmosphere.',
        aspectRatio: '3:4',
        gender: 'both'
      },
      {
        title: 'Femme Fatale',
        prompt: 'B&W 3/4 [gender] in elegant dress, dramatic side light, 50mm, femme fatale aesthetic, noir glamour.',
        aspectRatio: '3:4',
        gender: 'female'
      },
      {
        title: 'Rain Street Noir',
        prompt: 'B&W full-body [gender] on wet street, street lamp, 35mm, rain noir aesthetic, urban mystery.',
        aspectRatio: '3:4',
        gender: 'both'
      },
      {
        title: 'Smoking Scene',
        prompt: 'B&W 3/4 [gender] with cigarette smoke, dramatic light, 50mm, classic noir smoking, atmospheric mood.',
        aspectRatio: '3:4',
        gender: 'both'
      },
      {
        title: 'Bar Noir',
        prompt: 'B&W [gender] at noir bar, moody bar light, 50mm, prohibition aesthetic, dark bar atmosphere.',
        aspectRatio: '3:4',
        gender: 'both'
      },
      {
        title: 'Alley Shadows',
        prompt: 'B&W full-body [gender] in dark alley, hard shadow light, 35mm, noir alley scene, danger aesthetic.',
        aspectRatio: '3:4',
        gender: 'both'
      },
      {
        title: 'Noir Portrait',
        prompt: 'B&W tight portrait [gender], dramatic Rembrandt light, 85mm, classic noir headshot, mystery face.',
        aspectRatio: '1:1',
        gender: 'both'
      },
      {
        title: 'Car Scene',
        prompt: 'B&W [gender] in vintage car, street light through window, 50mm, noir car scene, urban night.',
        aspectRatio: '3:4',
        gender: 'both'
      },
      {
        title: 'Window Silhouette',
        prompt: 'B&W silhouette [gender] at window, venetian blind patterns, 50mm, noir silhouette, window mystery.',
        aspectRatio: '3:4',
        gender: 'both'
      }
    ]
  },

  {
    id: 'rgb-portrait',
    name: 'RGB Portrait',
    description: 'Neon, colorful, RGB lighting',
    targetImages: 10,
    prompts: [
      {
        title: 'RGB Split Light',
        prompt: 'Tight portrait of a [gender] with split RGB gels, 85mm, glossy skin, bold contrast, neon aesthetic.',
        aspectRatio: '1:1',
        gender: 'both'
      },
      {
        title: 'Cyan Magenta',
        prompt: '3/4 [gender] with cyan and magenta split, dramatic RGB, 50mm, cyberpunk color, neon portrait.',
        aspectRatio: '3:4',
        gender: 'both'
      },
      {
        title: 'Full RGB Spectrum',
        prompt: 'Full-body [gender] in RGB gradient light, colorful gels, 50mm, rainbow spectrum, vibrant portrait.',
        aspectRatio: '3:4',
        gender: 'both'
      },
      {
        title: 'Red Blue Portrait',
        prompt: 'Close-up [gender] with red and blue split, hard RGB light, 85mm, dramatic color split, bold RGB.',
        aspectRatio: '1:1',
        gender: 'both'
      },
      {
        title: 'Green Purple',
        prompt: '3/4 [gender] with green and purple gels, RGB aesthetic, 50mm, vibrant contrast, neon duo-tone.',
        aspectRatio: '3:4',
        gender: 'both'
      },
      {
        title: 'RGB Cyberpunk',
        prompt: 'Full-body [gender] in cyberpunk outfit, RGB city gels, 35mm, futuristic RGB, cyber aesthetic.',
        aspectRatio: '3:4',
        gender: 'both'
      },
      {
        title: 'Yellow Blue Split',
        prompt: '3/4 [gender] with yellow and blue RGB, dramatic split, 50mm, complementary RGB, bold color.',
        aspectRatio: '3:4',
        gender: 'both'
      },
      {
        title: 'RGB Beauty',
        prompt: 'Beauty portrait [gender] with soft RGB glow, 85mm, glossy beauty RGB, colorful beauty light.',
        aspectRatio: '1:1',
        gender: 'both'
      },
      {
        title: 'Orange Teal',
        prompt: '3/4 [gender] with orange and teal RGB, cinematic color grading, 50mm, film RGB aesthetic.',
        aspectRatio: '3:4',
        gender: 'both'
      },
      {
        title: 'Full Spectrum Beauty',
        prompt: 'Tight portrait [gender] surrounded by RGB lights, 85mm, multi-color glow, vibrant RGB halo.',
        aspectRatio: '1:1',
        gender: 'both'
      }
    ]
  },

  {
    id: 'youtube-thumbnail',
    name: 'YouTube Thumbnail Reaction Face Generator',
    description: 'YouTube thumbnails, reaction faces',
    targetImages: 10,
    prompts: [
      {
        title: 'Shocked Reaction',
        prompt: 'Tight face of a [gender] with exaggerated shocked expression, flat bright background, 50mm, high clarity, YouTube thumbnail.',
        aspectRatio: '16:9',
        gender: 'both'
      },
      {
        title: 'Excited Face',
        prompt: 'Close-up [gender] extremely excited expression, bright colorful background, 50mm, thumbnail energy, viral reaction.',
        aspectRatio: '16:9',
        gender: 'both'
      },
      {
        title: 'Surprised Open Mouth',
        prompt: 'Tight [gender] mouth open surprise, vibrant backdrop, 50mm, clickbait thumbnail, surprise reaction.',
        aspectRatio: '16:9',
        gender: 'both'
      },
      {
        title: 'Pointing Gesture',
        prompt: '3/4 [gender] pointing at camera, bright background, 35mm, thumbnail gesture, engaging pose.',
        aspectRatio: '16:9',
        gender: 'both'
      },
      {
        title: 'Mind Blown',
        prompt: 'Close-up [gender] mind blown expression, explosion graphic space, 50mm, thumbnail drama, wow reaction.',
        aspectRatio: '16:9',
        gender: 'both'
      },
      {
        title: 'Confused Face',
        prompt: 'Tight [gender] confused expression, question mark space, 50mm, thumbnail mystery, puzzled reaction.',
        aspectRatio: '16:9',
        gender: 'both'
      },
      {
        title: 'Happy Celebration',
        prompt: '3/4 [gender] celebrating gesture, bright cheerful background, 35mm, success thumbnail, victory pose.',
        aspectRatio: '16:9',
        gender: 'both'
      },
      {
        title: 'Dramatic Gasp',
        prompt: 'Close-up [gender] dramatic gasp, high contrast background, 50mm, thumbnail drama, shocked gasp.',
        aspectRatio: '16:9',
        gender: 'both'
      },
      {
        title: 'Thinking Pose',
        prompt: '3/4 [gender] hand on chin thinking, clean background, 50mm, tutorial thumbnail, thoughtful expression.',
        aspectRatio: '16:9',
        gender: 'both'
      },
      {
        title: 'Angry Reaction',
        prompt: 'Tight [gender] angry frustrated face, red warning background, 50mm, rant thumbnail, intense emotion.',
        aspectRatio: '16:9',
        gender: 'both'
      }
    ]
  }
];

/**
 * ═══════════════════════════════════════════════════════════════
 * 🎭 CATÉGORIES FESTIVES & CULTURELLES
 * ═══════════════════════════════════════════════════════════════
 */

export const festivalCategories: FluxCategoryConfig[] = [
  {
    id: 'day-of-the-dead',
    name: 'Day Of The Dead',
    description: 'Día de los Muertos, Mexican tradition',
    targetImages: 10,
    prompts: [
      {
        title: 'Sugar Skull Classic',
        prompt: '3/4 [gender] with sugar-skull makeup, marigold altar, candle glow, 50mm, rich color, Día de los Muertos traditional.',
        aspectRatio: '3:4',
        gender: 'both'
      },
      {
        title: 'Catrina Elegance',
        prompt: 'Full-body [gender] as La Catrina, elegant dress, 50mm, Day of Dead elegance, Mexican tradition.',
        aspectRatio: '3:4',
        gender: 'both'
      },
      {
        title: 'Marigold Portrait',
        prompt: '3/4 [gender] with marigold flowers, warm candlelight, 50mm, floral tradition, Día celebration.',
        aspectRatio: '3:4',
        gender: 'both'
      },
      {
        title: 'Altar Offering',
        prompt: 'Full-body [gender] at traditional altar, ofrenda candles, 50mm, spiritual tradition, Day of Dead ritual.',
        aspectRatio: '3:4',
        gender: 'both'
      },
      {
        title: 'Face Paint Detail',
        prompt: 'Extreme close-up [gender] sugar skull face paint, soft light, 100mm macro, intricate detail, traditional art.',
        aspectRatio: '1:1',
        gender: 'both'
      },
      {
        title: 'Cemetery Tradition',
        prompt: '3/4 [gender] at decorated grave, candles and flowers, evening light, 50mm, remembrance tradition.',
        aspectRatio: '3:4',
        gender: 'both'
      },
      {
        title: 'Colorful Celebration',
        prompt: 'Full-body [gender] in colorful traditional dress, vibrant makeup, 50mm, festive celebration, Mexican heritage.',
        aspectRatio: '3:4',
        gender: 'both'
      },
      {
        title: 'Skeleton Bride',
        prompt: '3/4 [gender] as skeleton bride, wedding veil, dramatic light, 50mm, Catrina bride, death bride tradition.',
        aspectRatio: '3:4',
        gender: 'female'
      },
      {
        title: 'Mariachi Spirit',
        prompt: 'Full-body [gender] in mariachi outfit with skull makeup, 50mm, musical tradition, Day of Dead celebration.',
        aspectRatio: '3:4',
        gender: 'both'
      },
      {
        title: 'Papel Picado',
        prompt: '3/4 [gender] under papel picado banners, festive light, 50mm, decorative tradition, colorful celebration.',
        aspectRatio: '3:4',
        gender: 'both'
      }
    ]
  },

  {
    id: 'diwali',
    name: 'Diwali Festival',
    description: 'Festival of Lights, Indian celebration',
    targetImages: 10,
    prompts: [
      {
        title: 'Diwali Traditional',
        prompt: '3/4 [gender] with diyas/rangoli, warm lamps, 50mm, festive glow, Festival of Lights celebration.',
        aspectRatio: '3:4',
        gender: 'both'
      },
      {
        title: 'Saree Elegance',
        prompt: 'Full-body [gender] in silk saree, diya lights, 50mm, traditional Indian attire, Diwali elegance.',
        aspectRatio: '3:4',
        gender: 'female'
      },
      {
        title: 'Rangoli Art',
        prompt: '3/4 [gender] creating rangoli, colorful powders, natural light, 50mm, traditional art, Diwali preparation.',
        aspectRatio: '3:4',
        gender: 'both'
      },
      {
        title: 'Diya Lighting',
        prompt: 'Close-up [gender] lighting diya lamp, warm flame glow, 85mm, ritual moment, spiritual light.',
        aspectRatio: '1:1',
        gender: 'both'
      },
      {
        title: 'Fireworks Joy',
        prompt: 'Full-body [gender] with sparklers, night fireworks, 35mm, celebration joy, Diwali lights.',
        aspectRatio: '4:5',
        gender: 'both'
      },
      {
        title: 'Traditional Kurta',
        prompt: '3/4 [gender] in festive kurta, decorative lights, 50mm, traditional menswear, Diwali celebration.',
        aspectRatio: '3:4',
        gender: 'male'
      },
      {
        title: 'Lakshmi Puja',
        prompt: '3/4 [gender] at prayer altar, soft warm light, 50mm, spiritual worship, Diwali puja.',
        aspectRatio: '3:4',
        gender: 'both'
      },
      {
        title: 'Gold Jewelry',
        prompt: 'Close-up [gender] in gold jewelry, warm diya light, 85mm, festive adornment, Diwali gold.',
        aspectRatio: '1:1',
        gender: 'both'
      },
      {
        title: 'Sweet Distribution',
        prompt: '3/4 [gender] offering sweets tray, festive home light, 50mm, mithai tradition, Diwali generosity.',
        aspectRatio: '3:4',
        gender: 'both'
      },
      {
        title: 'Family Gathering',
        prompt: 'Wide shot [gender] with family, decorative lights, 35mm, family celebration, Diwali togetherness.',
        aspectRatio: '16:9',
        gender: 'both'
      }
    ]
  },

  {
    id: 'holi',
    name: 'Holi Festival',
    description: 'Festival of Colors, Indian spring',
    targetImages: 10,
    prompts: [
      {
        title: 'Color Burst',
        prompt: '3/4 [gender] smiling under color powder burst, bright sun, 50mm, vivid colors, Holi celebration.',
        aspectRatio: '3:4',
        gender: 'both'
      },
      {
        title: 'Rainbow Colors',
        prompt: 'Full-body [gender] covered in multiple colors, outdoor daylight, 35mm, color festival, Holi joy.',
        aspectRatio: '4:5',
        gender: 'both'
      },
      {
        title: 'Gulal Throw',
        prompt: 'Action shot [gender] throwing gulal powder, bright sun, 50mm, color explosion, Holi action.',
        aspectRatio: '4:5',
        gender: 'both'
      },
      {
        title: 'White to Color',
        prompt: '3/4 [gender] in white clothes with color stains, bright daylight, 50mm, Holi transformation.',
        aspectRatio: '3:4',
        gender: 'both'
      },
      {
        title: 'Friends Celebration',
        prompt: 'Group [gender] with friends throwing colors, outdoor sun, 35mm, friendship Holi, group joy.',
        aspectRatio: '16:9',
        gender: 'both'
      },
      {
        title: 'Color Portrait',
        prompt: 'Close-up [gender] face covered in colors, bright light, 85mm, colorful beauty, Holi portrait.',
        aspectRatio: '1:1',
        gender: 'both'
      },
      {
        title: 'Water Fight',
        prompt: 'Action [gender] with water gun colors, bright day, 35mm, water Holi, playful celebration.',
        aspectRatio: '4:5',
        gender: 'both'
      },
      {
        title: 'Traditional Thandai',
        prompt: '3/4 [gender] drinking thandai, colorful background, 50mm, traditional drink, Holi refreshment.',
        aspectRatio: '3:4',
        gender: 'both'
      },
      {
        title: 'Dance Celebration',
        prompt: 'Full-body [gender] dancing with colors, outdoor party, 35mm, Holi dance, festive movement.',
        aspectRatio: '4:5',
        gender: 'both'
      },
      {
        title: 'Sunset Holi',
        prompt: '3/4 [gender] covered in colors at sunset, golden hour, 50mm, evening Holi, warm celebration.',
        aspectRatio: '3:4',
        gender: 'both'
      }
    ]
  },

  {
    id: 'ramadan',
    name: 'Ramadan',
    description: 'Islamic holy month',
    targetImages: 10,
    prompts: [
      {
        title: 'Ramadan Lantern',
        prompt: '3/4 [gender] with lantern + crescent decor, warm evening light, 50mm, respectful tradition, Ramadan spirit.',
        aspectRatio: '3:4',
        gender: 'both'
      },
      {
        title: 'Iftar Preparation',
        prompt: '3/4 [gender] preparing iftar table, warm kitchen light, 50mm, meal preparation, breaking fast tradition.',
        aspectRatio: '3:4',
        gender: 'both'
      },
      {
        title: 'Prayer Moment',
        prompt: '3/4 [gender] in prayer, soft mosque light, 50mm, spiritual devotion, Ramadan worship.',
        aspectRatio: '3:4',
        gender: 'both'
      },
      {
        title: 'Traditional Attire',
        prompt: 'Full-body [gender] in traditional modest attire, soft evening light, 50mm, cultural respect, Ramadan dress.',
        aspectRatio: '3:4',
        gender: 'both'
      },
      {
        title: 'Quran Reading',
        prompt: '3/4 [gender] reading Quran, warm lamp light, 50mm, spiritual study, holy month devotion.',
        aspectRatio: '3:4',
        gender: 'both'
      },
      {
        title: 'Family Iftar',
        prompt: 'Wide shot [gender] with family at iftar, warm dining light, 35mm, family gathering, breaking fast together.',
        aspectRatio: '16:9',
        gender: 'both'
      },
      {
        title: 'Mosque Visit',
        prompt: '3/4 [gender] at mosque entrance, evening light, 50mm, spiritual place, Ramadan worship.',
        aspectRatio: '3:4',
        gender: 'both'
      },
      {
        title: 'Dates and Water',
        prompt: 'Close-up [gender] with dates and water, soft light, 85mm, breaking fast tradition, iftar essentials.',
        aspectRatio: '1:1',
        gender: 'both'
      },
      {
        title: 'Crescent Moon',
        prompt: '3/4 [gender] looking at crescent moon, twilight, 50mm, moon sighting, Ramadan beginning.',
        aspectRatio: '3:4',
        gender: 'both'
      },
      {
        title: 'Charity Giving',
        prompt: '3/4 [gender] giving zakat, respectful lighting, 50mm, charitable act, Ramadan generosity.',
        aspectRatio: '3:4',
        gender: 'both'
      }
    ]
  },

  {
    id: 'eid-mubarak',
    name: 'Eid Mubarak',
    description: 'Islamic celebration, end of Ramadan',
    targetImages: 10,
    prompts: [
      {
        title: 'Eid Celebration',
        prompt: '3/4 [gender] in elegant attire, festive backdrop, soft evening light, 50mm, joyful Eid celebration.',
        aspectRatio: '3:4',
        gender: 'both'
      },
      {
        title: 'New Clothes',
        prompt: 'Full-body [gender] in new festive outfit, bright daylight, 50mm, Eid tradition, celebration attire.',
        aspectRatio: '3:4',
        gender: 'both'
      },
      {
        title: 'Eid Prayer',
        prompt: '3/4 [gender] after Eid prayer, outdoor mosque, morning light, 50mm, spiritual celebration.',
        aspectRatio: '3:4',
        gender: 'both'
      },
      {
        title: 'Sweet Exchange',
        prompt: '3/4 [gender] offering sweets, festive home, warm light, 50mm, sharing tradition, Eid generosity.',
        aspectRatio: '3:4',
        gender: 'both'
      },
      {
        title: 'Family Portrait',
        prompt: 'Wide shot [gender] with family, festive decor, soft light, 35mm, family Eid, celebration together.',
        aspectRatio: '16:9',
        gender: 'both'
      },
      {
        title: 'Henna Hands',
        prompt: 'Close-up [gender] showing henna hands, soft light, 85mm, traditional decoration, Eid beauty.',
        aspectRatio: '1:1',
        gender: 'female'
      },
      {
        title: 'Gifts Exchange',
        prompt: '3/4 [gender] with Eidi gifts, festive setting, warm light, 50mm, gift giving, Eid tradition.',
        aspectRatio: '3:4',
        gender: 'both'
      },
      {
        title: 'Feast Table',
        prompt: 'Wide shot [gender] at feast table, abundant food, warm dining light, 35mm, Eid feast, celebration meal.',
        aspectRatio: '16:9',
        gender: 'both'
      },
      {
        title: 'Mosque Gathering',
        prompt: '3/4 [gender] at mosque community, outdoor light, 50mm, community celebration, Eid gathering.',
        aspectRatio: '3:4',
        gender: 'both'
      },
      {
        title: 'Children Joy',
        prompt: '3/4 [gender] with children celebrating, playful energy, bright light, 50mm, family joy, Eid happiness.',
        aspectRatio: '3:4',
        gender: 'both'
      }
    ]
  },

  {
    id: 'hanukkah',
    name: 'Hanukkah',
    description: 'Jewish Festival of Lights',
    targetImages: 10,
    prompts: [
      {
        title: 'Menorah Lighting',
        prompt: '3/4 [gender] with menorah glow, blue-gold palette, 50mm, warm family tone, Hanukkah tradition.',
        aspectRatio: '3:4',
        gender: 'both'
      },
      {
        title: 'Candle Ceremony',
        prompt: 'Close-up [gender] lighting Hanukkah candles, warm flame light, 85mm, ritual moment, Festival of Lights.',
        aspectRatio: '1:1',
        gender: 'both'
      },
      {
        title: 'Dreidel Game',
        prompt: '3/4 [gender] playing dreidel, festive home light, 50mm, traditional game, Hanukkah fun.',
        aspectRatio: '3:4',
        gender: 'both'
      },
      {
        title: 'Latkes Preparation',
        prompt: '3/4 [gender] making latkes, warm kitchen light, 50mm, food tradition, Hanukkah cooking.',
        aspectRatio: '3:4',
        gender: 'both'
      },
      {
        title: 'Gift Giving',
        prompt: 'Full-body [gender] with Hanukkah gifts, festive blue decor, 50mm, gift tradition, celebration joy.',
        aspectRatio: '3:4',
        gender: 'both'
      },
      {
        title: 'Family Gathering',
        prompt: 'Wide shot [gender] with family around menorah, warm home light, 35mm, family celebration, togetherness.',
        aspectRatio: '16:9',
        gender: 'both'
      },
      {
        title: 'Blue White Decor',
        prompt: '3/4 [gender] with blue and white decorations, festive light, 50mm, Hanukkah colors, celebration aesthetic.',
        aspectRatio: '3:4',
        gender: 'both'
      },
      {
        title: 'Children Celebration',
        prompt: '3/4 [gender] with children, chocolate gelt, warm light, 50mm, family tradition, Hanukkah joy.',
        aspectRatio: '3:4',
        gender: 'both'
      },
      {
        title: 'Prayer Blessing',
        prompt: '3/4 [gender] reciting blessings, menorah background, soft light, 50mm, spiritual tradition, Hanukkah prayer.',
        aspectRatio: '3:4',
        gender: 'both'
      },
      {
        title: 'Eight Nights',
        prompt: 'Close-up fully lit menorah with [gender], all candles glowing, 85mm, eighth night, complete celebration.',
        aspectRatio: '1:1',
        gender: 'both'
      }
    ]
  },

  {
    id: 'chinese-new-year',
    name: 'Chinese New Year',
    description: 'Lunar New Year, Spring Festival',
    targetImages: 10,
    prompts: [
      {
        title: 'Red Lanterns',
        prompt: '3/4 [gender] with red lantern street, bright festive light, 35mm, celebratory atmosphere, Chinese New Year.',
        aspectRatio: '3:4',
        gender: 'both'
      },
      {
        title: 'Traditional Qipao',
        prompt: 'Full-body [gender] in red qipao, festive decor, 50mm, traditional dress, Lunar New Year elegance.',
        aspectRatio: '3:4',
        gender: 'female'
      },
      {
        title: 'Lion Dance',
        prompt: 'Action shot [gender] with lion dance, festive street, 35mm, cultural performance, New Year celebration.',
        aspectRatio: '4:5',
        gender: 'both'
      },
      {
        title: 'Red Envelope',
        prompt: '3/4 [gender] giving red envelope, warm family light, 50mm, hongbao tradition, prosperity wish.',
        aspectRatio: '3:4',
        gender: 'both'
      },
      {
        title: 'Fireworks Show',
        prompt: 'Full-body [gender] watching fireworks, night celebration, 35mm, spectacular display, New Year night.',
        aspectRatio: '4:5',
        gender: 'both'
      },
      {
        title: 'Family Reunion',
        prompt: 'Wide shot [gender] at reunion dinner, abundant feast, warm dining light, 35mm, family gathering.',
        aspectRatio: '16:9',
        gender: 'both'
      },
      {
        title: 'Temple Prayer',
        prompt: '3/4 [gender] at temple with incense, soft temple light, 50mm, spiritual tradition, New Year blessing.',
        aspectRatio: '3:4',
        gender: 'both'
      },
      {
        title: 'Zodiac Animal',
        prompt: '3/4 [gender] with year zodiac decoration, red gold decor, 50mm, zodiac tradition, festive spirit.',
        aspectRatio: '3:4',
        gender: 'both'
      },
      {
        title: 'Calligraphy Art',
        prompt: '3/4 [gender] writing spring couplets, traditional setting, soft light, 50mm, calligraphy tradition.',
        aspectRatio: '3:4',
        gender: 'both'
      },
      {
        title: 'Lucky Gold',
        prompt: 'Close-up [gender] in gold jewelry, red background, 85mm, prosperity symbols, New Year fortune.',
        aspectRatio: '1:1',
        gender: 'both'
      }
    ]
  }
];

/**
 * ═══════════════════════════════════════════════════════════════
 * 🎯 EXPORT FINAL - TOUTES LES CATÉGORIES EXTENDED
 * ═══════════════════════════════════════════════════════════════
 */

export function getAllExtendedCategories(): FluxCategoryConfig[] {
  return [...extendedFluxCategories, ...festivalCategories];
}

export function getCombinedTotalImages(): number {
  return getAllExtendedCategories().reduce((sum, cat) => sum + cat.targetImages, 0);
}

/**
 * 📊 STATISTIQUES EXTENDED
 * 
 * Extended Categories: 15
 * Festival Categories: 7
 * Total: 22 categories
 * Total Target Images: ~190
 */
