/**
 * 🎨 PHOTOGLOW - PROMPTS OPTIMISÉS FLUX POUR TOUTES LES CATÉGORIES
 * 
 * Format professionnel basé sur le guide Flux officiel :
 * - Prompts longs et descriptifs (120-160 caractères)
 * - PAS de negative prompts (supprimer complètement)
 * - Framing précis : close-up | 3/4 | full-body
 * - Lens feel : 50mm/85mm (portrait), 35mm (urbain), 200mm (sport)
 * - Lighting détaillé : soft window light | golden hour rim | clamshell | on-camera flash | RGB gels
 * - Ratio : 1:1 (avatar), 3:4 (portrait), 9:16 (story), 16:9 (thumbnail)
 * - Style descriptif : peau naturelle, couleurs fidèles, texture réaliste
 */

export interface FluxPromptTemplate {
  title: string;
  prompt: string;
  aspectRatio: '1:1' | '3:4' | '9:16' | '16:9' | '4:5';
  gender: 'male' | 'female' | 'both';
}

export interface FluxCategoryConfig {
  id: string;
  name: string;
  description: string;
  targetImages: number;
  prompts: FluxPromptTemplate[];
}

/**
 * ═══════════════════════════════════════════════════════════════
 * 📂 TOUTES LES CATÉGORIES AVEC PROMPTS FLUX OPTIMISÉS
 * ═══════════════════════════════════════════════════════════════
 */

export const fluxOptimizedCategories: FluxCategoryConfig[] = [
  {
    id: 'ai-headshots',
    name: 'Professional Headshots',
    description: 'LinkedIn, corporate, business headshots',
    targetImages: 20,
    prompts: [
      {
        title: 'LinkedIn Professional',
        prompt: 'Tight headshot of a [gender] on medium-gray seamless, clamshell light, 85mm, sharp eyes, approachable, LinkedIn-ready, natural skin texture, professional business attire.',
        aspectRatio: '1:1',
        gender: 'both'
      },
      {
        title: 'Corporate Executive',
        prompt: 'Head-and-shoulders of a [gender] on light gray, soft key + hair light, 85mm, crisp, corporate, premium suit, confident professional demeanor.',
        aspectRatio: '1:1',
        gender: 'both'
      },
      {
        title: 'Startup Founder',
        prompt: '3/4 headshot of a [gender] at modern office desk, soft key + hair light, 85mm, focused, visionary tone, smart casual attire, innovative aesthetic.',
        aspectRatio: '3:4',
        gender: 'both'
      },
      {
        title: 'CEO Authority',
        prompt: 'Tight executive headshot of a [gender] in dark suit, neutral seamless, clamshell light, authoritative yet friendly, leadership presence.',
        aspectRatio: '1:1',
        gender: 'both'
      },
      {
        title: 'Tech Professional',
        prompt: '3/4 portrait of a [gender] at tech startup office, window light, 50mm, smart casual blazer, contemporary professional aesthetic, approachable confidence.',
        aspectRatio: '3:4',
        gender: 'both'
      },
      {
        title: 'Young Professional',
        prompt: 'Headshot of a [gender] with clean background, soft diffused studio light, 85mm, millennial professional style, friendly approachable expression.',
        aspectRatio: '1:1',
        gender: 'both'
      },
      {
        title: 'Corporate Team Member',
        prompt: 'Uniform headshot of a [gender], neutral seamless, soft clamshell, 85mm, consistent brand look, business professional attire.',
        aspectRatio: '1:1',
        gender: 'both'
      },
      {
        title: 'Consultant Expert',
        prompt: '3/4 portrait of a [gender] with bookcase blur background, 85mm, professional lighting, authoritative presence, premium business attire.',
        aspectRatio: '3:4',
        gender: 'both'
      },
      {
        title: 'Business Woman Power',
        prompt: 'Tight headshot of a [gender] in elegant blazer, studio gray background, soft beauty light, 85mm, confident powerful presence, polished professional.',
        aspectRatio: '1:1',
        gender: 'female'
      },
      {
        title: 'Business Man Classic',
        prompt: 'Professional headshot of a [gender] in classic navy suit, neutral background, clamshell lighting, 85mm, timeless corporate aesthetic.',
        aspectRatio: '1:1',
        gender: 'male'
      },
      {
        title: 'Modern Professional Casual',
        prompt: '3/4 of a [gender] in modern workspace, natural window light, 50mm, business casual attire, relaxed professional vibe, contemporary setting.',
        aspectRatio: '3:4',
        gender: 'both'
      },
      {
        title: 'Senior Executive Premium',
        prompt: 'Dramatic headshot of a [gender] executive, dark background, Rembrandt lighting, 85mm, luxury suit, commanding presence, refined sophistication.',
        aspectRatio: '1:1',
        gender: 'both'
      },
      {
        title: 'Keynote Speaker',
        prompt: 'Full-body [gender] on conference stage, spotlight key, 85mm, hand gesture, authoritative, professional presentation attire, confident stance.',
        aspectRatio: '16:9',
        gender: 'both'
      },
      {
        title: 'Author Professional',
        prompt: 'Thoughtful headshot of a [gender], bookcase blur, soft key, 85mm, intelligent, approachable, creative professional aesthetic.',
        aspectRatio: '1:1',
        gender: 'both'
      },
      {
        title: 'Therapist Warm',
        prompt: 'Warm headshot of a [gender] in cozy office, soft lamps, 85mm, empathetic expression, approachable professional demeanor.',
        aspectRatio: '1:1',
        gender: 'both'
      },
      {
        title: 'Life Coach Bright',
        prompt: 'Bright headshot of a [gender] against light seamless, clamshell, 85mm, motivational energy, positive professional presence.',
        aspectRatio: '1:1',
        gender: 'both'
      },
      {
        title: 'Lawyer Classic',
        prompt: 'Authoritative headshot of a [gender] with law library blur, 85mm, classic professional attire, trustworthy confident presence.',
        aspectRatio: '1:1',
        gender: 'both'
      },
      {
        title: 'Doctor Clinical',
        prompt: 'Clinical headshot of a [gender] in white coat, bright clean key, 85mm, trustworthy, medical professional aesthetic.',
        aspectRatio: '1:1',
        gender: 'both'
      },
      {
        title: 'Real Estate Agent',
        prompt: '3/4 [gender] with home interior blur, 85mm, approachable, polished, professional real estate aesthetic.',
        aspectRatio: '3:4',
        gender: 'both'
      },
      {
        title: 'Teacher Friendly',
        prompt: 'Friendly headshot of a [gender] with school hallway blur, 85mm, soft light, approachable educator presence.',
        aspectRatio: '1:1',
        gender: 'both'
      }
    ]
  },

  {
    id: 'ai-dating-photos',
    name: 'AI Dating Photos',
    description: 'Tinder, Bumble, Hinge dating profile photos',
    targetImages: 20,
    prompts: [
      {
        title: 'Tinder Main Profile',
        prompt: '3/4 flattering portrait of a [gender] in casual chic streetwear, soft sunset, 50mm, confident, engaging, natural dating photo aesthetic.',
        aspectRatio: '3:4',
        gender: 'both'
      },
      {
        title: 'Hinge Candid',
        prompt: 'Candid 3/4 of a [gender] laughing with friends outdoors, golden hour backlight, 35mm, approachable, lifestyle realism, genuine smile.',
        aspectRatio: '3:4',
        gender: 'both'
      },
      {
        title: 'Bumble Café Explorer',
        prompt: '3/4 candid of a [gender] exploring a bright café, window light, 50mm, playful, authentic, approachable dating vibe.',
        aspectRatio: '3:4',
        gender: 'both'
      },
      {
        title: 'Dating Headshot Warm',
        prompt: 'Tight smile headshot of a [gender] with park bokeh, golden hour, 85mm, warm, inviting, friendly dating profile photo.',
        aspectRatio: '1:1',
        gender: 'both'
      },
      {
        title: 'AI Dating Portrait',
        prompt: '3/4 dating portrait of a [gender] in park bokeh, soft window-like light, 85mm, relaxed smile, flattering, natural look.',
        aspectRatio: '3:4',
        gender: 'both'
      },
      {
        title: 'Beach Casual',
        prompt: 'Full-body [gender] at beach casual setting, golden hour side-light, 35mm, relaxed confident pose, summer dating aesthetic.',
        aspectRatio: '4:5',
        gender: 'both'
      },
      {
        title: 'Urban Explorer',
        prompt: '3/4 of a [gender] walking city street, natural overcast light, 35mm, stylish casual outfit, urban lifestyle dating photo.',
        aspectRatio: '3:4',
        gender: 'both'
      },
      {
        title: 'Coffee Shop Vibe',
        prompt: 'Candid 3/4 [gender] at coffee shop table, soft window light, 50mm, reading book, authentic lifestyle moment, approachable.',
        aspectRatio: '3:4',
        gender: 'both'
      },
      {
        title: 'Outdoor Adventure',
        prompt: 'Full-body [gender] hiking ridge at sunrise, wide vista, 35mm, epic rim light, active lifestyle, adventurous dating profile.',
        aspectRatio: '4:5',
        gender: 'both'
      },
      {
        title: 'Rooftop Sunset',
        prompt: '3/4 portrait [gender] on rooftop at golden hour, warm backlight, 50mm, stylish casual outfit, romantic city backdrop.',
        aspectRatio: '3:4',
        gender: 'both'
      },
      {
        title: 'Park Stroll Natural',
        prompt: 'Full-body [gender] walking through park path, dappled sunlight, 50mm, casual weekend outfit, authentic lifestyle dating shot.',
        aspectRatio: '4:5',
        gender: 'both'
      },
      {
        title: 'Restaurant Portrait',
        prompt: '3/4 of a [gender] at restaurant table, warm ambient light, 50mm, date-ready outfit, confident friendly expression.',
        aspectRatio: '3:4',
        gender: 'both'
      },
      {
        title: 'Travel Explorer',
        prompt: '3/4 [gender] at landmark vista, golden hour, 35mm, wanderlust, natural tone, travel lifestyle dating aesthetic.',
        aspectRatio: '3:4',
        gender: 'both'
      },
      {
        title: 'Dog Lover Park',
        prompt: 'Candid 3/4 [gender] playing with dog at park, natural daylight, 50mm, genuine joy, pet lover dating profile.',
        aspectRatio: '3:4',
        gender: 'both'
      },
      {
        title: 'Badoo Street Style',
        prompt: '3/4 [gender] exploring city street, soft sunset, 50mm, authentic dating vibe, casual stylish outfit.',
        aspectRatio: '3:4',
        gender: 'both'
      },
      {
        title: 'Festival Lifestyle',
        prompt: '3/4 [gender] in festival outfit among crowd lights, dusk, 35mm, energetic fun personality, music lover aesthetic.',
        aspectRatio: '3:4',
        gender: 'both'
      },
      {
        title: 'Brunch Date Ready',
        prompt: '3/4 portrait [gender] at outdoor brunch setting, morning soft light, 50mm, date-appropriate outfit, friendly welcoming.',
        aspectRatio: '3:4',
        gender: 'both'
      },
      {
        title: 'Nature Lover',
        prompt: 'Full-body [gender] in meadow/forest path, backlit sunflare, 35mm, peaceful nature aesthetic, authentic outdoor moment.',
        aspectRatio: '4:5',
        gender: 'both'
      },
      {
        title: 'Fitness Active',
        prompt: '3/4 [gender] in activewear at park, natural daylight, 50mm, healthy active lifestyle, confident athletic build.',
        aspectRatio: '3:4',
        gender: 'both'
      },
      {
        title: 'Night Out Stylish',
        prompt: '3/4 [gender] dressed for night out, urban night lights, 35mm, stylish evening outfit, confident fun personality.',
        aspectRatio: '3:4',
        gender: 'both'
      }
    ]
  },

  {
    id: 'ai-selfie',
    name: 'AI Selfies',
    description: 'Instagram, social media selfie photos',
    targetImages: 20,
    prompts: [
      {
        title: 'Mirror Selfie Classic',
        prompt: 'Mirror selfie of a [gender] in minimal bathroom, diffused daylight, smartphone reflection, authentic, clean skin, casual everyday outfit.',
        aspectRatio: '9:16',
        gender: 'both'
      },
      {
        title: 'Instagram Story Vibe',
        prompt: 'Casual selfie of a [gender] with trendy outfit, soft window light, smartphone angle, 28mm feel, Instagram aesthetic, natural makeup.',
        aspectRatio: '9:16',
        gender: 'both'
      },
      {
        title: 'Golden Hour Selfie',
        prompt: 'Outdoor selfie of a [gender] at sunset, golden hour glow, arm extended, 28mm, warm filter aesthetic, natural radiant skin.',
        aspectRatio: '9:16',
        gender: 'both'
      },
      {
        title: 'Car Selfie Mood',
        prompt: 'Car mirror selfie of a [gender], soft overcast light through windshield, casual confident look, authentic moment.',
        aspectRatio: '9:16',
        gender: 'both'
      },
      {
        title: 'Bedroom Mirror Full',
        prompt: 'Full-body mirror selfie of a [gender] in bedroom, natural window light, outfit check aesthetic, clean modern room.',
        aspectRatio: '9:16',
        gender: 'both'
      },
      {
        title: 'Gym Selfie Fit',
        prompt: 'Gym mirror selfie of a [gender] post-workout, fluorescent light, smartphone reflection, fitness aesthetic, athletic wear.',
        aspectRatio: '9:16',
        gender: 'both'
      },
      {
        title: 'Café Selfie Lifestyle',
        prompt: 'Table selfie of a [gender] at café with latte art, soft window light, 28mm, cozy lifestyle aesthetic, relaxed expression.',
        aspectRatio: '1:1',
        gender: 'both'
      },
      {
        title: 'Beach Selfie Sun',
        prompt: 'Beach selfie of a [gender] with ocean background, bright sun, 28mm, summer vacation aesthetic, natural beach glow.',
        aspectRatio: '9:16',
        gender: 'both'
      },
      {
        title: 'Elevator Mirror Chic',
        prompt: 'Elevator mirror selfie of a [gender], overhead elevator light, stylish outfit check, modern urban aesthetic.',
        aspectRatio: '9:16',
        gender: 'both'
      },
      {
        title: 'Night Out Glam',
        prompt: 'Pre-party selfie of a [gender] with glam makeup, bathroom ring light, going out outfit, confident ready look.',
        aspectRatio: '9:16',
        gender: 'both'
      },
      {
        title: 'Travel Landmark',
        prompt: 'Tourist selfie of a [gender] at famous landmark, bright daylight, arm extended, 28mm, travel memory aesthetic.',
        aspectRatio: '9:16',
        gender: 'both'
      },
      {
        title: 'Morning Routine',
        prompt: 'Morning selfie of a [gender] in bed, soft morning light, no makeup natural look, cozy authentic moment.',
        aspectRatio: '9:16',
        gender: 'both'
      },
      {
        title: 'Fashion Store Mirror',
        prompt: 'Store fitting room selfie of a [gender] trying outfit, overhead store light, fashion check aesthetic.',
        aspectRatio: '9:16',
        gender: 'both'
      },
      {
        title: 'Rooftop Aesthetic',
        prompt: 'Rooftop selfie of a [gender] with city skyline, golden hour, arm extended, urban aesthetic, stylish outfit.',
        aspectRatio: '9:16',
        gender: 'both'
      },
      {
        title: 'Concert Vibe',
        prompt: 'Concert selfie of a [gender] with stage lights behind, colorful gels, excited expression, music festival aesthetic.',
        aspectRatio: '9:16',
        gender: 'both'
      },
      {
        title: 'Hotel Mirror Luxe',
        prompt: 'Hotel mirror selfie of a [gender], soft hotel lighting, travel lifestyle, elegant casual outfit.',
        aspectRatio: '9:16',
        gender: 'both'
      },
      {
        title: 'Park Nature Selfie',
        prompt: 'Nature selfie of a [gender] with greenery background, dappled sunlight, 28mm, outdoor lifestyle aesthetic.',
        aspectRatio: '9:16',
        gender: 'both'
      },
      {
        title: 'Study Session Cozy',
        prompt: 'Study desk selfie of a [gender] with laptop, warm desk lamp, cozy productive aesthetic, casual homewear.',
        aspectRatio: '1:1',
        gender: 'both'
      },
      {
        title: 'Airplane Window',
        prompt: 'Airplane selfie of a [gender] by window seat, soft cabin light, travel adventure aesthetic, excited expression.',
        aspectRatio: '9:16',
        gender: 'both'
      },
      {
        title: 'Home Office Remote',
        prompt: 'Home office selfie of a [gender] at desk setup, natural window light, work-from-home aesthetic, professional casual.',
        aspectRatio: '1:1',
        gender: 'both'
      }
    ]
  },

  {
    id: 'ai-model-photo',
    name: 'AI Model Photography',
    description: 'Fashion, glamour, editorial model photos',
    targetImages: 20,
    prompts: [
      {
        title: 'Fashion Editorial',
        prompt: 'Full-body [gender] in high fashion outfit on urban street, natural overcast, 50mm, editorial pose, magazine quality, contemporary styling.',
        aspectRatio: '3:4',
        gender: 'both'
      },
      {
        title: 'Runway Model',
        prompt: 'Runway full-body [gender], crisp key light, 200mm feel, sleek stride, high-fashion, professional catwalk aesthetic.',
        aspectRatio: '4:5',
        gender: 'both'
      },
      {
        title: 'Glamour Portrait',
        prompt: 'Full-body [gender] in eveningwear, moody tungsten + rim, 50mm, elegant, cinematic highlights, luxury glamour aesthetic.',
        aspectRatio: '3:4',
        gender: 'both'
      },
      {
        title: 'Model Headshot Agency',
        prompt: 'Agency clean headshot of a [gender], pure studio, 85mm, minimal makeup, pristine focus, model portfolio quality.',
        aspectRatio: '1:1',
        gender: 'both'
      },
      {
        title: 'Street Style Fashion',
        prompt: 'Crosswalk stride 3/4 [gender], textured wall backdrop, 35mm, fashion-editorial candid, contemporary street style.',
        aspectRatio: '3:4',
        gender: 'both'
      },
      {
        title: 'Luxury Campaign',
        prompt: 'Full-body [gender] in tailored outfit in marble lobby, soft practical lights, 50mm, refined, premium finish, luxury brand aesthetic.',
        aspectRatio: '3:4',
        gender: 'both'
      },
      {
        title: 'Vogue Editorial',
        prompt: '3/4 portrait [gender] in designer outfit, dramatic studio lighting, 85mm, high-fashion pose, editorial sophistication.',
        aspectRatio: '3:4',
        gender: 'both'
      },
      {
        title: 'Model Portfolio Beauty',
        prompt: 'Close-up beauty shot of a [gender], soft beauty dish light, 85mm, flawless skin, model portfolio standard.',
        aspectRatio: '1:1',
        gender: 'both'
      },
      {
        title: 'Fashion Week Backstage',
        prompt: '3/4 [gender] backstage at fashion show, practical lights, 50mm, high-fashion styling, behind-the-scenes editorial.',
        aspectRatio: '3:4',
        gender: 'both'
      },
      {
        title: 'Catalog Commercial',
        prompt: 'Full-body [gender] on white cyclorama, soft even light, 50mm, commercial catalog pose, clean professional.',
        aspectRatio: '3:4',
        gender: 'both'
      },
      {
        title: 'Luxury Lifestyle Model',
        prompt: '3/4 [gender] at luxury tower balcony, night city bokeh, 50mm, opulent fashion styling, premium lifestyle.',
        aspectRatio: '3:4',
        gender: 'both'
      },
      {
        title: 'Magazine Cover',
        prompt: 'Tight 3/4 [gender] cover shot, dramatic beauty lighting, 85mm, confident gaze, magazine cover aesthetic.',
        aspectRatio: '3:4',
        gender: 'both'
      },
      {
        title: 'Athletic Model',
        prompt: 'Full-body [gender] in activewear, hard rim light, 50mm, athletic pose, fitness model aesthetic.',
        aspectRatio: '3:4',
        gender: 'both'
      },
      {
        title: 'Swimsuit Editorial',
        prompt: 'Full-body [gender] in swimsuit by pool edge, golden hour, 50mm, tasteful, clean water highlights, summer editorial.',
        aspectRatio: '3:4',
        gender: 'both'
      },
      {
        title: 'Menswear Editorial',
        prompt: 'Full-body [gender] in premium suit, urban rooftop, 50mm, masculine editorial styling, contemporary menswear.',
        aspectRatio: '3:4',
        gender: 'male'
      },
      {
        title: 'Haute Couture',
        prompt: 'Full-body [gender] in couture gown, studio dramatic light, 85mm, high-fashion pose, luxury couture aesthetic.',
        aspectRatio: '3:4',
        gender: 'female'
      },
      {
        title: 'Model Duo Editorial',
        prompt: 'Full-body two models [gender], studio split lighting, 50mm, editorial interaction, fashion campaign aesthetic.',
        aspectRatio: '16:9',
        gender: 'both'
      },
      {
        title: 'Black and White Classic',
        prompt: 'B&W 3/4 [gender] model in timeless outfit, high contrast studio light, 85mm, classic editorial aesthetic.',
        aspectRatio: '3:4',
        gender: 'both'
      },
      {
        title: 'Puffer Jacket Fashion',
        prompt: '3/4 [gender] in glossy puffer, street background, cool overcast, 35mm, fashion-editorial, contemporary streetwear.',
        aspectRatio: '3:4',
        gender: 'both'
      },
      {
        title: 'Met Gala Red Carpet',
        prompt: 'Red-carpet full-body [gender] in couture, paparazzi flash pit, 50mm, glamorous, high-fashion event aesthetic.',
        aspectRatio: '3:4',
        gender: 'both'
      }
    ]
  },

  {
    id: 'ai-realistic-photo',
    name: 'AI Realistic Photography',
    description: 'Photorealistic portraits and scenes',
    targetImages: 15,
    prompts: [
      {
        title: 'Realistic Portrait Studio',
        prompt: 'Full-body artistic portrait of a [gender] in studio, creative lighting patterns, 50mm, fine-art feel, crisp detail, photorealistic skin texture.',
        aspectRatio: '3:4',
        gender: 'both'
      },
      {
        title: 'Natural Light Portrait',
        prompt: '3/4 portrait [gender] by large window, soft natural light, 85mm, realistic skin detail, natural color grading, authentic expression.',
        aspectRatio: '3:4',
        gender: 'both'
      },
      {
        title: 'Environmental Portrait',
        prompt: '3/4 [gender] in natural environment, golden hour soft light, 50mm, photorealistic, contextual storytelling, genuine moment.',
        aspectRatio: '3:4',
        gender: 'both'
      },
      {
        title: 'Candid Street Real',
        prompt: 'Candid 3/4 [gender] on city street, natural overcast light, 35mm, documentary realism, authentic urban moment.',
        aspectRatio: '3:4',
        gender: 'both'
      },
      {
        title: 'Indoor Natural',
        prompt: '3/4 portrait [gender] at home, soft window light, 50mm, realistic domestic setting, natural casual style.',
        aspectRatio: '3:4',
        gender: 'both'
      },
      {
        title: 'Outdoor Adventure Real',
        prompt: 'Full-body [gender] hiking mountain trail, natural daylight, 35mm, photorealistic outdoor scene, genuine adventure.',
        aspectRatio: '4:5',
        gender: 'both'
      },
      {
        title: 'Workplace Authentic',
        prompt: '3/4 [gender] at work desk, natural office light, 50mm, realistic professional environment, authentic work moment.',
        aspectRatio: '3:4',
        gender: 'both'
      },
      {
        title: 'Family Gathering',
        prompt: 'Candid 3/4 [gender] at family dinner table, warm ambient light, 35mm, photorealistic domestic scene, genuine emotion.',
        aspectRatio: '3:4',
        gender: 'both'
      },
      {
        title: 'Coffee Shop Real',
        prompt: '3/4 [gender] at café table with coffee, soft window light, 50mm, realistic everyday moment, natural casual style.',
        aspectRatio: '3:4',
        gender: 'both'
      },
      {
        title: 'Park Lifestyle Real',
        prompt: 'Full-body [gender] walking in park, dappled sunlight, 50mm, photorealistic outdoor portrait, natural environment.',
        aspectRatio: '4:5',
        gender: 'both'
      },
      {
        title: 'Evening Portrait Warm',
        prompt: '3/4 portrait [gender] at dusk, warm practical lights, 50mm, realistic evening atmosphere, natural skin tones.',
        aspectRatio: '3:4',
        gender: 'both'
      },
      {
        title: 'Urban Real Life',
        prompt: 'Candid 3/4 [gender] in urban setting, natural city light, 35mm, photorealistic street scene, authentic moment.',
        aspectRatio: '3:4',
        gender: 'both'
      },
      {
        title: 'Studio Fine Art',
        prompt: 'Full-body [gender] fine art portrait, controlled studio light, 85mm, photorealistic detail, artistic composition.',
        aspectRatio: '3:4',
        gender: 'both'
      },
      {
        title: 'Sunset Portrait Real',
        prompt: '3/4 [gender] at sunset hour, warm backlight, 85mm, photorealistic golden hour, natural warm tones.',
        aspectRatio: '3:4',
        gender: 'both'
      },
      {
        title: 'Indoor Cozy Real',
        prompt: '3/4 portrait [gender] at home cozy setting, warm lamp light, 50mm, photorealistic domestic comfort, authentic relaxation.',
        aspectRatio: '3:4',
        gender: 'both'
      }
    ]
  },

  {
    id: 'ai-portrait',
    name: 'AI Portrait Photography',
    description: 'Classic portrait photography',
    targetImages: 15,
    prompts: [
      {
        title: 'Classic Portrait',
        prompt: '3/4 portrait of a [gender] on neutral background, soft Rembrandt light, 85mm, timeless classic aesthetic, natural expression.',
        aspectRatio: '3:4',
        gender: 'both'
      },
      {
        title: 'Studio Portrait Pro',
        prompt: 'Headshot of a [gender], studio gray seamless, soft beauty light, 85mm, professional portrait quality, clean aesthetic.',
        aspectRatio: '1:1',
        gender: 'both'
      },
      {
        title: 'Natural Light Portrait',
        prompt: '3/4 [gender] by window, soft diffused daylight, 85mm, portrait photography, gentle natural tones, authentic expression.',
        aspectRatio: '3:4',
        gender: 'both'
      },
      {
        title: 'Dramatic Portrait',
        prompt: 'Tight portrait of a [gender], dramatic side light, dark background, 85mm, moody portrait aesthetic, high contrast.',
        aspectRatio: '3:4',
        gender: 'both'
      },
      {
        title: 'Outdoor Portrait Golden',
        prompt: '3/4 portrait [gender] outdoors, golden hour rim light, 85mm, warm portrait photography, natural bokeh background.',
        aspectRatio: '3:4',
        gender: 'both'
      },
      {
        title: 'Environmental Portrait',
        prompt: 'Full-body [gender] in meaningful environment, contextual lighting, 50mm, environmental portrait, storytelling aesthetic.',
        aspectRatio: '3:4',
        gender: 'both'
      },
      {
        title: 'Black White Portrait',
        prompt: 'B&W portrait of a [gender], high contrast studio light, 85mm, classic monochrome aesthetic, timeless portrait.',
        aspectRatio: '3:4',
        gender: 'both'
      },
      {
        title: 'Soft Portrait Beauty',
        prompt: 'Close-up portrait [gender], soft wrap-around light, 85mm, beauty portrait aesthetic, flawless skin texture.',
        aspectRatio: '1:1',
        gender: 'both'
      },
      {
        title: 'Urban Portrait Street',
        prompt: '3/4 [gender] portrait on city street, natural urban light, 50mm, street portrait photography, contemporary urban style.',
        aspectRatio: '3:4',
        gender: 'both'
      },
      {
        title: 'Fine Art Portrait',
        prompt: 'Full-body [gender] fine art portrait, artistic lighting, 85mm, gallery-worthy aesthetic, creative composition.',
        aspectRatio: '3:4',
        gender: 'both'
      },
      {
        title: 'Intimate Portrait Close',
        prompt: 'Extreme close-up portrait [gender], macro detail, soft light, 100mm macro feel, intimate portrait aesthetic.',
        aspectRatio: '1:1',
        gender: 'both'
      },
      {
        title: 'Lifestyle Portrait',
        prompt: '3/4 [gender] in lifestyle setting, natural ambient light, 50mm, lifestyle portrait photography, casual authentic.',
        aspectRatio: '3:4',
        gender: 'both'
      },
      {
        title: 'Corporate Portrait',
        prompt: '3/4 portrait [gender] in business setting, professional lighting, 85mm, corporate portrait aesthetic, confident presence.',
        aspectRatio: '3:4',
        gender: 'both'
      },
      {
        title: 'Sunset Portrait Warm',
        prompt: '3/4 [gender] at sunset, warm golden backlight, 85mm, romantic portrait aesthetic, natural warm glow.',
        aspectRatio: '3:4',
        gender: 'both'
      },
      {
        title: 'Studio Classic Timeless',
        prompt: 'Full-body [gender] classic studio portrait, traditional lighting, 85mm, timeless portrait photography, elegant pose.',
        aspectRatio: '3:4',
        gender: 'both'
      }
    ]
  },

  {
    id: 'ai-fitness-photos',
    name: 'Fitness Photos',
    description: 'Gym, workout, athletic fitness photos',
    targetImages: 15,
    prompts: [
      {
        title: 'Gym Power Shot',
        prompt: 'Gym 3/4 [gender] mid-rep, hard top-light, 35mm, powerful, defined muscles, intense workout aesthetic.',
        aspectRatio: '4:5',
        gender: 'both'
      },
      {
        title: 'Fitness Mirror Selfie',
        prompt: 'Gym mirror 3/4 [gender], neon accent, 35mm, defined, confident stance, fitness progress aesthetic.',
        aspectRatio: '9:16',
        gender: 'both'
      },
      {
        title: 'Outdoor Running',
        prompt: 'Full-body [gender] running outdoor trail, natural daylight, 35mm, athletic motion, outdoor fitness aesthetic.',
        aspectRatio: '4:5',
        gender: 'both'
      },
      {
        title: 'Weightlifting Focus',
        prompt: '3/4 [gender] lifting weights, dramatic gym light, 50mm, focused intensity, strength training aesthetic.',
        aspectRatio: '4:5',
        gender: 'both'
      },
      {
        title: 'Yoga Studio Peace',
        prompt: 'Full-body [gender] in yoga pose, soft studio light, 50mm, peaceful flexibility, wellness aesthetic.',
        aspectRatio: '3:4',
        gender: 'both'
      },
      {
        title: 'Athletic Portrait',
        prompt: '3/4 portrait [gender] in athletic wear, studio light, 85mm, fit physique, athletic confidence.',
        aspectRatio: '3:4',
        gender: 'both'
      },
      {
        title: 'CrossFit Intensity',
        prompt: 'Action shot [gender] doing CrossFit, dynamic gym light, 35mm, explosive power, intense workout moment.',
        aspectRatio: '4:5',
        gender: 'both'
      },
      {
        title: 'Boxing Training',
        prompt: '3/4 [gender] at boxing bag, dramatic side light, 50mm, fighter intensity, boxing gym aesthetic.',
        aspectRatio: '4:5',
        gender: 'both'
      },
      {
        title: 'Beach Workout',
        prompt: 'Full-body [gender] beach workout, golden hour, 35mm, outdoor fitness, natural athletic aesthetic.',
        aspectRatio: '4:5',
        gender: 'both'
      },
      {
        title: 'Fitness Influencer',
        prompt: 'Gym mirror 3/4 [gender], neon accent, 35mm, defined, confident stance, influencer fitness aesthetic.',
        aspectRatio: '9:16',
        gender: 'both'
      },
      {
        title: 'Cycling Outdoor',
        prompt: 'Full-body [gender] on bicycle, natural outdoor light, 35mm, cycling fitness, active lifestyle.',
        aspectRatio: '4:5',
        gender: 'both'
      },
      {
        title: 'Swimming Athletic',
        prompt: '3/4 [gender] by pool in swimwear, bright daylight, 50mm, swimmer physique, aquatic fitness.',
        aspectRatio: '3:4',
        gender: 'both'
      },
      {
        title: 'Stretching Flexibility',
        prompt: 'Full-body [gender] stretching, soft studio light, 50mm, flexibility demonstration, wellness aesthetic.',
        aspectRatio: '3:4',
        gender: 'both'
      },
      {
        title: 'Rock Climbing',
        prompt: 'Full-body [gender] rock climbing, natural outdoor light, 35mm, climbing strength, adventure fitness.',
        aspectRatio: '4:5',
        gender: 'both'
      },
      {
        title: 'Personal Trainer',
        prompt: '3/4 [gender] trainer demonstrating exercise, gym light, 50mm, professional trainer aesthetic, motivational presence.',
        aspectRatio: '3:4',
        gender: 'both'
      }
    ]
  },

  {
    id: 'ai-fitness-bikini',
    name: 'Beach & Bikini',
    description: 'Beach, swimsuit, summer photos',
    targetImages: 15,
    prompts: [
      {
        title: 'Beach Golden Hour',
        prompt: 'Full-body [gender] beach look on shoreline, golden hour rim, 50mm, tasteful, vibrant sea backdrop, summer beach aesthetic.',
        aspectRatio: '4:5',
        gender: 'both'
      },
      {
        title: 'Bikini Beach Walk',
        prompt: 'Full-body [gender] walking on beach, bright sun, 35mm, confident beach stride, ocean waves background.',
        aspectRatio: '4:5',
        gender: 'both'
      },
      {
        title: 'Swimsuit Pool',
        prompt: 'Full-body [gender] in swimsuit by pool edge, golden hour, 50mm, tasteful, clean water highlights, luxury pool setting.',
        aspectRatio: '4:5',
        gender: 'both'
      },
      {
        title: 'Beach Volleyball',
        prompt: 'Action 3/4 [gender] playing beach volleyball, bright daylight, 35mm, athletic beach sport, summer fun.',
        aspectRatio: '4:5',
        gender: 'both'
      },
      {
        title: 'Tropical Paradise',
        prompt: 'Full-body [gender] on tropical beach, palm trees, bright sun, 50mm, paradise vacation aesthetic, crystal water.',
        aspectRatio: '4:5',
        gender: 'both'
      },
      {
        title: 'Beach Sunset',
        prompt: '3/4 [gender] on beach at sunset, warm backlight, 85mm, romantic beach aesthetic, golden hour glow.',
        aspectRatio: '3:4',
        gender: 'both'
      },
      {
        title: 'Surfing Beach',
        prompt: 'Full-body [gender] with surfboard on beach, natural daylight, 35mm, surfer lifestyle, beach sport aesthetic.',
        aspectRatio: '4:5',
        gender: 'both'
      },
      {
        title: 'Beach Lounge',
        prompt: '3/4 [gender] on beach lounger, overhead sun, 50mm, relaxed beach vacation, resort lifestyle.',
        aspectRatio: '3:4',
        gender: 'both'
      },
      {
        title: 'Ocean Swim',
        prompt: 'Full-body [gender] in ocean water, bright daylight, 50mm, swimming aesthetic, refreshing water scene.',
        aspectRatio: '4:5',
        gender: 'both'
      },
      {
        title: 'Beach Photoshoot',
        prompt: 'Full-body [gender] beach editorial pose, golden hour, 85mm, professional beach photography, model aesthetic.',
        aspectRatio: '4:5',
        gender: 'both'
      },
      {
        title: 'Yacht Deck',
        prompt: '3/4 [gender] on yacht deck in swimwear, bright maritime sun, 50mm, luxury yacht lifestyle.',
        aspectRatio: '3:4',
        gender: 'both'
      },
      {
        title: 'Beach Fitness',
        prompt: 'Full-body [gender] beach workout, natural sun, 35mm, fitness beach aesthetic, active beach life.',
        aspectRatio: '4:5',
        gender: 'both'
      },
      {
        title: 'Snorkeling Adventure',
        prompt: '3/4 [gender] with snorkel gear at beach, bright daylight, 50mm, adventure beach aesthetic.',
        aspectRatio: '3:4',
        gender: 'both'
      },
      {
        title: 'Beach Bonfire',
        prompt: '3/4 [gender] at beach bonfire, warm fire glow, 50mm, evening beach atmosphere, summer night.',
        aspectRatio: '3:4',
        gender: 'both'
      },
      {
        title: 'Bikini in Snow',
        prompt: 'Full-body [gender] in bikini on snowy path, cold blue ambience, 50mm, bold contrast, adventurous aesthetic.',
        aspectRatio: '4:5',
        gender: 'both'
      }
    ]
  },

  {
    id: 'ai-lifestyle-travel',
    name: 'Lifestyle & Travel',
    description: 'Travel, adventure, lifestyle photos',
    targetImages: 20,
    prompts: [
      {
        title: 'Paris Summer',
        prompt: '3/4 [gender] on Paris bridge at dusk, warm street lamps, 50mm, romantic editorial, iconic city backdrop.',
        aspectRatio: '3:4',
        gender: 'both'
      },
      {
        title: 'Santorini Vibes',
        prompt: 'Full-body [gender] on white/blue steps, bright noon, polarizer, 35mm, airy Mediterranean feel, Greek island aesthetic.',
        aspectRatio: '4:5',
        gender: 'both'
      },
      {
        title: 'Bali Influencer',
        prompt: 'Full-body [gender] at infinity pool over rice terraces, golden hour, 35mm, tropical editorial, luxury Bali aesthetic.',
        aspectRatio: '4:5',
        gender: 'both'
      },
      {
        title: 'Tokyo Street',
        prompt: 'Street 3/4 [gender] at neon crossing, light rain sheen, 35mm, cyber-city mood, Tokyo night aesthetic.',
        aspectRatio: '3:4',
        gender: 'both'
      },
      {
        title: 'Mykonos Nights',
        prompt: 'Evening 3/4 [gender] in chic outfit, warm island lights, 35mm, glossy nightlife vibe, Greek party town.',
        aspectRatio: '3:4',
        gender: 'both'
      },
      {
        title: 'Dubai Luxury',
        prompt: '3/4 [gender] at luxury tower balcony, night city bokeh, 50mm, opulent Dubai lifestyle.',
        aspectRatio: '3:4',
        gender: 'both'
      },
      {
        title: 'Las Vegas Night',
        prompt: 'Neon street 3/4 [gender], billboard glow, 35mm, lively night vibe, Vegas strip energy.',
        aspectRatio: '3:4',
        gender: 'both'
      },
      {
        title: 'Mountain Adventure',
        prompt: 'Full-body [gender] hiking mountain peak, sunrise rim light, 35mm, epic adventure, mountaineer aesthetic.',
        aspectRatio: '4:5',
        gender: 'both'
      },
      {
        title: 'Safari Expedition',
        prompt: '3/4 [gender] on safari vehicle, African savanna background, golden hour, 50mm, adventure travel.',
        aspectRatio: '3:4',
        gender: 'both'
      },
      {
        title: 'Iceland Explorer',
        prompt: 'Full-body [gender] at waterfall, overcast Nordic light, 35mm, dramatic Iceland landscape, adventure aesthetic.',
        aspectRatio: '4:5',
        gender: 'both'
      },
      {
        title: 'NYC Urban',
        prompt: '3/4 [gender] on New York street, urban overcast, 35mm, city lifestyle, metropolitan aesthetic.',
        aspectRatio: '3:4',
        gender: 'both'
      },
      {
        title: 'Rome History',
        prompt: '3/4 [gender] at Colosseum, warm afternoon light, 50mm, historical travel, Rome tourism aesthetic.',
        aspectRatio: '3:4',
        gender: 'both'
      },
      {
        title: 'London Rainy',
        prompt: '3/4 [gender] with umbrella on London street, overcast rain, 50mm, moody British aesthetic.',
        aspectRatio: '3:4',
        gender: 'both'
      },
      {
        title: 'Desert Nomad',
        prompt: 'Full-body [gender] in desert dunes, golden hour, 50mm, nomadic adventure, desert landscape.',
        aspectRatio: '4:5',
        gender: 'both'
      },
      {
        title: 'Coachella Festival',
        prompt: 'Festival full-body [gender] at desert ferris wheel, sunset dust, 35mm, boho styling, festival aesthetic.',
        aspectRatio: '4:5',
        gender: 'both'
      },
      {
        title: 'Venice Canal',
        prompt: '3/4 [gender] by Venice canal, soft overcast, 50mm, romantic Italian travel, gondola background.',
        aspectRatio: '3:4',
        gender: 'both'
      },
      {
        title: 'Barcelona Architecture',
        prompt: '3/4 [gender] at Gaudí building, bright Mediterranean sun, 50mm, architectural travel, Barcelona aesthetic.',
        aspectRatio: '3:4',
        gender: 'both'
      },
      {
        title: 'Swiss Alps',
        prompt: 'Full-body [gender] at Alpine vista, crisp mountain light, 35mm, Swiss adventure, dramatic mountain backdrop.',
        aspectRatio: '4:5',
        gender: 'both'
      },
      {
        title: 'Thailand Beach',
        prompt: 'Full-body [gender] on Thai beach, tropical bright sun, 50mm, Southeast Asia travel, paradise aesthetic.',
        aspectRatio: '4:5',
        gender: 'both'
      },
      {
        title: 'Amsterdam Canal',
        prompt: '3/4 [gender] by Amsterdam canal, soft daylight, 50mm, Dutch travel aesthetic, bicycle culture.',
        aspectRatio: '3:4',
        gender: 'both'
      }
    ]
  },

  {
    id: 'ai-cosplay-fantasy',
    name: 'Cosplay & Fantasy',
    description: 'Cosplay, character, fantasy photos',
    targetImages: 15,
    prompts: [
      {
        title: 'Anime Cosplay',
        prompt: 'Dynamic 3/4 [gender] in character armor, smoke rim-light, 35mm, action pose, cinematic cosplay aesthetic.',
        aspectRatio: '3:4',
        gender: 'both'
      },
      {
        title: 'Fantasy Warrior',
        prompt: 'Full-body [gender] in fantasy armor, dramatic studio light, 50mm, epic warrior pose, fantasy RPG aesthetic.',
        aspectRatio: '3:4',
        gender: 'both'
      },
      {
        title: 'Magical Girl',
        prompt: '3/4 [gender] in magical girl outfit, pastel studio light, 50mm, kawaii aesthetic, anime transformation.',
        aspectRatio: '3:4',
        gender: 'female'
      },
      {
        title: 'Cyberpunk Character',
        prompt: '3/4 [gender] in neon cyber outfit, RGB gels, city holograms, 35mm, futuristic cyberpunk aesthetic.',
        aspectRatio: '3:4',
        gender: 'both'
      },
      {
        title: 'Steampunk Victorian',
        prompt: 'Full-body [gender] in steampunk Victorian outfit, moody brass light, 50mm, retro-futuristic aesthetic.',
        aspectRatio: '3:4',
        gender: 'both'
      },
      {
        title: 'Elf Fantasy',
        prompt: '3/4 [gender] as elf character, forest background, soft natural light, 50mm, fantasy realm aesthetic.',
        aspectRatio: '3:4',
        gender: 'both'
      },
      {
        title: 'Superhero Comic',
        prompt: 'Full-body [gender] in superhero costume, dramatic cape movement, 35mm, comic book aesthetic, heroic pose.',
        aspectRatio: '3:4',
        gender: 'both'
      },
      {
        title: 'Fairy Tale',
        prompt: 'Forest fantasy 3/4 [gender] with ethereal glow, particles, 50mm, dreamy fairy tale aesthetic.',
        aspectRatio: '3:4',
        gender: 'both'
      },
      {
        title: 'Video Game Character',
        prompt: '3/4 [gender] as game character, dynamic pose, dramatic light, 50mm, video game cosplay aesthetic.',
        aspectRatio: '3:4',
        gender: 'both'
      },
      {
        title: 'Gothic Vampire',
        prompt: '3/4 [gender] in gothic vampire outfit, moody low light, 50mm, dark fantasy aesthetic.',
        aspectRatio: '3:4',
        gender: 'both'
      },
      {
        title: 'Sci-Fi Soldier',
        prompt: 'Full-body [gender] in sci-fi armor, futuristic set, 35mm, military sci-fi aesthetic.',
        aspectRatio: '3:4',
        gender: 'both'
      },
      {
        title: 'Witch Sorceress',
        prompt: '3/4 [gender] as witch, mystical props, purple lighting, 50mm, magical sorceress aesthetic.',
        aspectRatio: '3:4',
        gender: 'female'
      },
      {
        title: 'Pirate Adventure',
        prompt: 'Full-body [gender] in pirate outfit, ship deck background, 50mm, swashbuckler adventure aesthetic.',
        aspectRatio: '3:4',
        gender: 'both'
      },
      {
        title: 'Catgirl Kawaii',
        prompt: '3/4 [gender] with subtle cat-ear headband, pastel studio, 50mm, kawaii fashion pose, cute cosplay.',
        aspectRatio: '3:4',
        gender: 'female'
      },
      {
        title: 'Dragon Rider',
        prompt: 'Full-body [gender] in dragon rider outfit, fantasy background, 50mm, epic fantasy cosplay.',
        aspectRatio: '3:4',
        gender: 'both'
      }
    ]
  }
];

/**
 * ═══════════════════════════════════════════════════════════════
 * 🎭 CATÉGORIES SPÉCIALES & NICHES (ADDITIONAL IDEAS)
 * ═══════════════════════════════════════════════════════════════
 */

export const specialCategories: FluxCategoryConfig[] = [
  {
    id: 'old-money',
    name: 'Old Money Aesthetic',
    description: 'Timeless wealth, heritage luxury',
    targetImages: 10,
    prompts: [
      {
        title: 'Old Money Classic',
        prompt: '3/4 portrait of a [gender] in tweed + silk scarf at ivy-covered townhouse, soft overcast, 50mm, poised, timeless editorial, natural skin texture.',
        aspectRatio: '3:4',
        gender: 'both'
      },
      {
        title: 'Country Estate',
        prompt: 'Full-body [gender] at country manor, English garden background, soft daylight, 50mm, aristocratic elegance, heritage wealth.',
        aspectRatio: '3:4',
        gender: 'both'
      },
      {
        title: 'Yacht Club',
        prompt: '3/4 [gender] at yacht club, nautical attire, golden hour, 50mm, preppy coastal lifestyle, old money summer.',
        aspectRatio: '3:4',
        gender: 'both'
      },
      {
        title: 'Library Portrait',
        prompt: '3/4 [gender] in wood-paneled library, warm lamp light, 50mm, intellectual wealth, classical education aesthetic.',
        aspectRatio: '3:4',
        gender: 'both'
      },
      {
        title: 'Tennis Club',
        prompt: 'Full-body [gender] at tennis court, vintage sports attire, soft daylight, 50mm, athletic privilege, country club life.',
        aspectRatio: '3:4',
        gender: 'both'
      },
      {
        title: 'Equestrian Heritage',
        prompt: '3/4 [gender] at stable, equestrian outfit, natural light, 50mm, riding heritage, aristocratic tradition.',
        aspectRatio: '3:4',
        gender: 'both'
      },
      {
        title: 'University Ivy',
        prompt: '3/4 [gender] at Ivy League campus, collegiate attire, overcast, 50mm, academic legacy, intellectual privilege.',
        aspectRatio: '3:4',
        gender: 'both'
      },
      {
        title: 'Opera Evening',
        prompt: 'Full-body [gender] in evening wear at opera house, warm interior light, 50mm, cultural refinement, high society.',
        aspectRatio: '3:4',
        gender: 'both'
      },
      {
        title: 'Vintage Car',
        prompt: '3/4 [gender] with classic car, heritage vehicle, golden hour, 50mm, timeless automotive wealth.',
        aspectRatio: '3:4',
        gender: 'both'
      },
      {
        title: 'Garden Party',
        prompt: 'Full-body [gender] at garden party, vintage summer attire, soft afternoon light, 50mm, social elegance.',
        aspectRatio: '3:4',
        gender: 'both'
      }
    ]
  },

  {
    id: 'halloween',
    name: 'Halloween Spooky',
    description: 'Spooky, costume, Halloween vibes',
    targetImages: 10,
    prompts: [
      {
        title: 'Halloween Costume',
        prompt: '3/4 [gender] in playful spooky costume, foggy backlight, 50mm, vibrant accents, festive mood, Halloween night.',
        aspectRatio: '3:4',
        gender: 'both'
      },
      {
        title: 'Witch Costume',
        prompt: 'Full-body [gender] witch costume, Halloween decorations, orange lighting, 50mm, classic witch aesthetic.',
        aspectRatio: '3:4',
        gender: 'both'
      },
      {
        title: 'Vampire Gothic',
        prompt: '3/4 [gender] vampire costume, dramatic lighting, dark background, 50mm, gothic Halloween aesthetic.',
        aspectRatio: '3:4',
        gender: 'both'
      },
      {
        title: 'Zombie Apocalypse',
        prompt: '3/4 [gender] zombie makeup, eerie fog, practical lights, 50mm, horror Halloween aesthetic.',
        aspectRatio: '3:4',
        gender: 'both'
      },
      {
        title: 'Skeleton Glam',
        prompt: 'Full-body [gender] skeleton costume, neon UV lights, 35mm, party Halloween aesthetic.',
        aspectRatio: '3:4',
        gender: 'both'
      },
      {
        title: 'Haunted House',
        prompt: '3/4 [gender] at haunted house, spooky practical lights, 35mm, horror atmosphere, Halloween setting.',
        aspectRatio: '3:4',
        gender: 'both'
      },
      {
        title: 'Pumpkin Patch',
        prompt: 'Full-body [gender] at pumpkin patch, autumn daylight, 50mm, seasonal Halloween aesthetic.',
        aspectRatio: '4:5',
        gender: 'both'
      },
      {
        title: 'Gothic Glam',
        prompt: '3/4 [gender] in glamorous dark costume, moody lighting, 50mm, sexy Halloween aesthetic.',
        aspectRatio: '3:4',
        gender: 'both'
      },
      {
        title: 'Ghostly Apparition',
        prompt: 'Full-body [gender] ghost costume, fog machine, soft eerie light, 35mm, supernatural Halloween.',
        aspectRatio: '3:4',
        gender: 'both'
      },
      {
        title: 'Party Halloween',
        prompt: '3/4 [gender] at Halloween party, colorful lights, 35mm, festive party atmosphere, costume celebration.',
        aspectRatio: '3:4',
        gender: 'both'
      }
    ]
  },

  {
    id: 'christmas',
    name: 'Christmas Festive',
    description: 'Christmas, holiday, winter festive',
    targetImages: 10,
    prompts: [
      {
        title: 'Christmas Tree Lights',
        prompt: '3/4 of a [gender] by Christmas tree lights, warm practicals, 50mm, cozy, festive bokeh, holiday spirit.',
        aspectRatio: '3:4',
        gender: 'both'
      },
      {
        title: 'Cozy Fireplace',
        prompt: '3/4 [gender] by fireplace, warm fire glow, 50mm, Christmas comfort, holiday warmth.',
        aspectRatio: '3:4',
        gender: 'both'
      },
      {
        title: 'Snow Portrait',
        prompt: 'Full-body [gender] in snow, falling snowflakes, soft overcast, 50mm, winter wonderland, Christmas outdoor.',
        aspectRatio: '4:5',
        gender: 'both'
      },
      {
        title: 'Christmas Sweater',
        prompt: '3/4 [gender] in festive sweater, holiday decorations, warm indoor light, 50mm, cozy Christmas aesthetic.',
        aspectRatio: '3:4',
        gender: 'both'
      },
      {
        title: 'Gift Wrapping',
        prompt: '3/4 [gender] wrapping presents, warm home light, 50mm, Christmas preparation, holiday tradition.',
        aspectRatio: '3:4',
        gender: 'both'
      },
      {
        title: 'Winter Market',
        prompt: 'Full-body [gender] at Christmas market, festive lights, 35mm, holiday shopping, market atmosphere.',
        aspectRatio: '3:4',
        gender: 'both'
      },
      {
        title: 'Santa Costume',
        prompt: '3/4 [gender] in Santa outfit, Christmas lights, 50mm, festive character, playful holiday spirit.',
        aspectRatio: '3:4',
        gender: 'both'
      },
      {
        title: 'Elegant Holiday',
        prompt: 'Full-body [gender] in elegant evening wear, Christmas décor, 50mm, formal holiday party, sophisticated.',
        aspectRatio: '3:4',
        gender: 'both'
      },
      {
        title: 'Hot Cocoa Cozy',
        prompt: '3/4 [gender] with hot cocoa, warm blanket, indoor lights, 50mm, cozy Christmas comfort.',
        aspectRatio: '3:4',
        gender: 'both'
      },
      {
        title: 'Ice Skating',
        prompt: 'Full-body [gender] ice skating, outdoor rink lights, 35mm, winter activity, Christmas fun.',
        aspectRatio: '4:5',
        gender: 'both'
      }
    ]
  },

  {
    id: 'nightlife',
    name: 'Nightlife Party',
    description: 'Club, party, night out photos',
    targetImages: 10,
    prompts: [
      {
        title: 'Neon Street Night',
        prompt: 'Street-level full-body of a [gender] under neon signs, wet pavement reflections, 35mm, energetic, cinematic nightlife.',
        aspectRatio: '3:4',
        gender: 'both'
      },
      {
        title: 'Club Interior',
        prompt: '3/4 [gender] at nightclub, colorful DJ lights, 35mm, party energy, club atmosphere.',
        aspectRatio: '3:4',
        gender: 'both'
      },
      {
        title: 'VIP Lounge',
        prompt: '3/4 [gender] at VIP table, dim lounge lights, 50mm, exclusive nightlife, luxury club.',
        aspectRatio: '3:4',
        gender: 'both'
      },
      {
        title: 'Rooftop Bar',
        prompt: 'Full-body [gender] at rooftop bar, city lights, 35mm, sophisticated nightlife, urban evening.',
        aspectRatio: '3:4',
        gender: 'both'
      },
      {
        title: 'Dance Floor',
        prompt: 'Action 3/4 [gender] dancing, club lights, motion blur, 35mm, party movement, club energy.',
        aspectRatio: '3:4',
        gender: 'both'
      },
      {
        title: 'Cocktail Bar',
        prompt: '3/4 [gender] at bar with cocktail, moody bar light, 50mm, sophisticated night out, bar atmosphere.',
        aspectRatio: '3:4',
        gender: 'both'
      },
      {
        title: 'Berlin Techno',
        prompt: 'Basement techno 3/4 [gender], dim neon, motion blur, 35mm, gritty underground club aesthetic.',
        aspectRatio: '3:4',
        gender: 'both'
      },
      {
        title: 'Champagne Toast',
        prompt: '3/4 [gender] with champagne, celebration lights, 50mm, party celebration, luxury nightlife.',
        aspectRatio: '3:4',
        gender: 'both'
      },
      {
        title: 'Vegas Strip',
        prompt: 'Full-body [gender] on Vegas strip, casino lights, 35mm, Las Vegas nightlife, neon energy.',
        aspectRatio: '3:4',
        gender: 'both'
      },
      {
        title: 'College Party Flash',
        prompt: 'Flash-lit candid of a [gender] with red cup in messy kitchen, on-camera flash, 35mm, spontaneous, retro party vibe.',
        aspectRatio: '3:4',
        gender: 'both'
      }
    ]
  },

  {
    id: 'retro-90s',
    name: 'Retro 90s',
    description: '90s nostalgia, vintage aesthetic',
    targetImages: 10,
    prompts: [
      {
        title: '90s Bedroom',
        prompt: 'Bedroom 90s set with posters/CRT, on-camera flash, 35mm, casual [gender], nostalgic color, retro vibe.',
        aspectRatio: '3:4',
        gender: 'both'
      },
      {
        title: 'Grunge 90s',
        prompt: '3/4 [gender] in grunge outfit, urban alley, overcast, 35mm, 90s alternative aesthetic.',
        aspectRatio: '3:4',
        gender: 'both'
      },
      {
        title: 'Mall 90s',
        prompt: 'Full-body [gender] at 90s mall, fluorescent lights, 35mm, shopping nostalgia, retro mall culture.',
        aspectRatio: '3:4',
        gender: 'both'
      },
      {
        title: 'Arcade 90s',
        prompt: '3/4 [gender] at arcade, neon game lights, 35mm, 90s gaming culture, retro entertainment.',
        aspectRatio: '3:4',
        gender: 'both'
      },
      {
        title: 'Disposable Camera',
        prompt: 'Candid 3/4 [gender], disposable camera aesthetic, flash, 35mm, 90s photo quality, vintage grain.',
        aspectRatio: '3:4',
        gender: 'both'
      },
      {
        title: 'House Party 90s',
        prompt: '3/4 [gender] at house party, dim party lights, on-camera flash, 35mm, 90s party nostalgia.',
        aspectRatio: '3:4',
        gender: 'both'
      },
      {
        title: 'Skate Park',
        prompt: 'Full-body [gender] at skate park, natural daylight, 35mm, 90s skater culture, street aesthetic.',
        aspectRatio: '4:5',
        gender: 'both'
      },
      {
        title: 'TV Room Chill',
        prompt: '3/4 [gender] on couch with CRT TV glow, 50mm, 90s chill vibes, nostalgic home setting.',
        aspectRatio: '3:4',
        gender: 'both'
      },
      {
        title: 'Yearbook Photo',
        prompt: '90s studio headshot of a [gender], mottled backdrop, 85mm, formal yearbook pose, vintage school photo.',
        aspectRatio: '1:1',
        gender: 'both'
      },
      {
        title: 'Music Video 90s',
        prompt: '3/4 [gender] in 90s music video style, colorful gels, 35mm, MTV aesthetic, pop culture nostalgia.',
        aspectRatio: '3:4',
        gender: 'both'
      }
    ]
  },

  {
    id: 'retro-80s',
    name: 'Retro 80s',
    description: '80s neon, synthwave aesthetic',
    targetImages: 10,
    prompts: [
      {
        title: '80s Arcade Neon',
        prompt: 'Arcade neon set, magenta-cyan split, 35mm, [gender] in 80s outfit, VHS glow, retro gaming aesthetic.',
        aspectRatio: '3:4',
        gender: 'both'
      },
      {
        title: 'Synthwave Portrait',
        prompt: '3/4 [gender] with neon grid background, RGB lighting, 50mm, synthwave aesthetic, 80s futurism.',
        aspectRatio: '3:4',
        gender: 'both'
      },
      {
        title: 'Aerobics 80s',
        prompt: 'Full-body [gender] in aerobics outfit, bright studio, 35mm, 80s fitness culture, vibrant spandex.',
        aspectRatio: '4:5',
        gender: 'both'
      },
      {
        title: 'Miami Vice',
        prompt: '3/4 [gender] in pastel suit, convertible car, sunset, 50mm, Miami Vice aesthetic, 80s cool.',
        aspectRatio: '3:4',
        gender: 'both'
      },
      {
        title: 'MTV Studio',
        prompt: '3/4 [gender] on MTV-style set, colorful geometric shapes, 35mm, 80s music television aesthetic.',
        aspectRatio: '3:4',
        gender: 'both'
      },
      {
        title: 'Roller Disco',
        prompt: 'Full-body [gender] on roller skates, disco ball light, 35mm, 80s roller rink, disco vibes.',
        aspectRatio: '3:4',
        gender: 'both'
      },
      {
        title: 'Boombox Street',
        prompt: '3/4 [gender] with boombox, urban wall, 35mm, 80s street culture, hip-hop origins.',
        aspectRatio: '3:4',
        gender: 'both'
      },
      {
        title: 'Power Suit',
        prompt: 'Full-body [gender] in 80s power suit, corporate backdrop, 50mm, business 80s, bold shoulders.',
        aspectRatio: '3:4',
        gender: 'both'
      },
      {
        title: 'Neon Portrait',
        prompt: 'Tight portrait [gender] with split RGB gels, 85mm, glossy skin, bold contrast, 80s neon aesthetic.',
        aspectRatio: '1:1',
        gender: 'both'
      },
      {
        title: 'Prom 80s',
        prompt: 'Full-body [gender] in 80s prom outfit, gym decorations, on-camera flash, 35mm, nostalgic prom night.',
        aspectRatio: '3:4',
        gender: 'both'
      }
    ]
  },

  {
    id: 'y2k-aesthetic',
    name: 'Y2K 2000s',
    description: 'Y2K, early 2000s aesthetic',
    targetImages: 10,
    prompts: [
      {
        title: 'Y2K Mall Style',
        prompt: 'Mall-style 2000s set, metallics + flip phone, 35mm, neon tint, playful [gender] pose, Y2K nostalgia.',
        aspectRatio: '3:4',
        gender: 'both'
      },
      {
        title: 'Low Rise Jeans',
        prompt: '3/4 [gender] in low-rise jeans + crop top, 2000s fashion, 35mm, Y2K street style.',
        aspectRatio: '3:4',
        gender: 'both'
      },
      {
        title: 'Flip Phone Selfie',
        prompt: 'Mirror selfie [gender] with flip phone, 2000s bathroom, on-camera flash, Y2K tech nostalgia.',
        aspectRatio: '9:16',
        gender: 'both'
      },
      {
        title: 'Juicy Couture',
        prompt: 'Full-body [gender] in velour tracksuit, mall background, 35mm, 2000s luxury casual, Y2K fashion.',
        aspectRatio: '3:4',
        gender: 'both'
      },
      {
        title: 'Chrome Everything',
        prompt: '3/4 [gender] with chrome accessories, metallic backdrop, 50mm, Y2K futurism, shiny aesthetic.',
        aspectRatio: '3:4',
        gender: 'both'
      },
      {
        title: 'Butterfly Clips',
        prompt: '3/4 [gender] with butterfly hair clips, colorful backdrop, 50mm, Y2K accessories, 2000s teen style.',
        aspectRatio: '3:4',
        gender: 'both'
      },
      {
        title: 'Limewire Era',
        prompt: '3/4 [gender] at computer setup, CRT monitor glow, 35mm, early internet nostalgia, Y2K tech.',
        aspectRatio: '3:4',
        gender: 'both'
      },
      {
        title: 'Paris Hilton Vibes',
        prompt: 'Full-body [gender] with tiny dog, pink everything, 35mm, socialite Y2K, early 2000s glamour.',
        aspectRatio: '3:4',
        gender: 'female'
      },
      {
        title: 'Frosted Tips',
        prompt: '3/4 [gender] with frosted hair tips, 2000s styling, 50mm, boy band aesthetic, Y2K grooming.',
        aspectRatio: '3:4',
        gender: 'male'
      },
      {
        title: 'Nokia Phone',
        prompt: '3/4 [gender] with Nokia 3310, 2000s aesthetic, 35mm, tech nostalgia, Y2K communication.',
        aspectRatio: '3:4',
        gender: 'both'
      }
    ]
  }
];

/**
 * ═══════════════════════════════════════════════════════════════
 * 🎯 FONCTION HELPER - GET ALL CATEGORIES
 * ═══════════════════════════════════════════════════════════════
 */

export function getAllFluxCategories(): FluxCategoryConfig[] {
  return [...fluxOptimizedCategories, ...specialCategories];
}

export function getCategoryById(id: string): FluxCategoryConfig | undefined {
  return getAllFluxCategories().find(cat => cat.id === id);
}

export function getTotalTargetImages(): number {
  return getAllFluxCategories().reduce((sum, cat) => sum + cat.targetImages, 0);
}

/**
 * ═══════════════════════════════════════════════════════════════
 * 📊 STATISTIQUES
 * ═══════════════════════════════════════════════════════════════
 * 
 * Total Categories: 17
 * Total Target Images: 235
 * Average per Category: ~14 images
 * 
 * Main Categories: 9 (175 images)
 * Special Categories: 8 (60 images)
 * 
 * Format ratios:
 * - 1:1 (avatar/headshot): ~20%
 * - 3:4 (portrait): ~50%
 * - 4:5 (Instagram): ~20%
 * - 9:16 (story/selfie): ~10%
 */
