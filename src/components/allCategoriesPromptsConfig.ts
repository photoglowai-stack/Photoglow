/**
 * 🎨 PHOTOGLOW - CONFIGURATION COMPLÈTE DES PROMPTS PAR CATÉGORIE
 * 
 * Ce fichier centralise TOUTES les catégories du site PhotoGlow avec leurs prompts IA :
 * - Page IDEAS (148 idées réparties en catégories)
 * - CategoryShowcase (6 catégories principales)
 * - CategoryPagesConfig (16+ catégories avec pages dédiées)
 * 
 * Objectif : Générer automatiquement 15 images par catégorie via Pollinations FLUX
 */

export interface PromptTemplate {
  title: string;
  prompt: string;
  category: string;
  keywords?: string[];
  aspectRatio?: '1:1' | '16:9' | '9:16' | '4:5';
}

export interface CategoryConfig {
  id: string;
  name: string;
  emoji: string;
  description: string;
  targetImages: number; // Nombre d'images à générer
  promptTemplates: PromptTemplate[];
  basePromptSuffix?: string; // Suffixe ajouté à tous les prompts de cette catégorie
}

/**
 * SUFFIXES COMMUNS pour améliorer la qualité FLUX
 * (Basé sur votre expérience : prompts longs 120-160 caractères, pas de negative prompts)
 */
const FLUX_QUALITY_SUFFIX = 'professional photography, natural realistic lighting, high quality photorealistic image, authentic genuine expression, contemporary modern aesthetic';
const PORTRAIT_SUFFIX = 'portrait photography, professional studio quality, sharp focus on face, natural skin texture, lifelike details';
const FASHION_SUFFIX = 'fashion photography, editorial quality, professional styling, modern contemporary aesthetic, magazine worthy';

/**
 * ═══════════════════════════════════════════════════════════════
 * 📂 CATÉGORIES PRINCIPALES (CategoryShowcase + CategoryData)
 * ═══════════════════════════════════════════════════════════════
 */

export const mainCategories: CategoryConfig[] = [
  {
    id: 'ai-headshots',
    name: 'AI Headshots',
    emoji: '📸',
    description: 'Professional corporate headshots for LinkedIn, resumes, and business profiles',
    targetImages: 15,
    basePromptSuffix: PORTRAIT_SUFFIX,
    promptTemplates: [
      {
        title: 'Corporate Professional Headshot',
        prompt: 'Professional corporate executive headshot portrait, clean neutral background, confident business demeanor, formal business attire, studio lighting setup, sharp professional focus, polished appearance',
        category: 'AI Headshots',
        aspectRatio: '1:1'
      },
      {
        title: 'LinkedIn Profile Photo',
        prompt: 'LinkedIn professional headshot for business profile, approachable confident expression, modern corporate attire, clean background, natural professional lighting, career-focused aesthetic',
        category: 'AI Headshots',
        aspectRatio: '1:1'
      },
      {
        title: 'Business Woman Executive',
        prompt: 'Professional business woman executive headshot, elegant corporate blazer, clean studio background, confident professional demeanor, modern lighting, polished sophisticated appearance',
        category: 'AI Headshots',
        aspectRatio: '1:1'
      },
      {
        title: 'Tech Startup Professional',
        prompt: 'Tech professional headshot modern startup aesthetic, smart casual business attire, innovative confident expression, contemporary office background, natural professional lighting',
        category: 'AI Headshots',
        aspectRatio: '1:1'
      },
      {
        title: 'Senior Executive Portrait',
        prompt: 'Senior executive professional headshot, premium business suit, authoritative confident presence, luxury office setting, dramatic professional lighting, leadership aesthetic',
        category: 'AI Headshots',
        aspectRatio: '1:1'
      },
      {
        title: 'Young Professional Modern',
        prompt: 'Young professional modern headshot, contemporary business casual style, approachable friendly expression, clean neutral background, soft natural lighting, millennial professional aesthetic',
        category: 'AI Headshots',
        aspectRatio: '1:1'
      },
      {
        title: 'Corporate Team Member',
        prompt: 'Corporate team member professional headshot, consistent brand aesthetic, business professional attire, neutral clean background, standard professional lighting, company directory quality',
        category: 'AI Headshots',
        aspectRatio: '1:1'
      },
      {
        title: 'Consultant Expert Portrait',
        prompt: 'Professional consultant expert headshot, authoritative knowledgeable demeanor, premium business attire, sophisticated background, professional studio lighting, expertise presence',
        category: 'AI Headshots',
        aspectRatio: '1:1'
      },
      {
        title: 'Finance Professional',
        prompt: 'Finance professional corporate headshot, traditional business suit, conservative professional appearance, neutral background, classic professional lighting, banking industry aesthetic',
        category: 'AI Headshots',
        aspectRatio: '1:1'
      },
      {
        title: 'Creative Professional',
        prompt: 'Creative professional headshot modern style, business casual creative attire, authentic confident expression, contemporary background, natural soft lighting, creative industry aesthetic',
        category: 'AI Headshots',
        aspectRatio: '1:1'
      },
      {
        title: 'Entrepreneur Founder',
        prompt: 'Entrepreneur startup founder headshot, innovative visionary demeanor, modern business casual style, contemporary office setting, natural confident lighting, entrepreneurial aesthetic',
        category: 'AI Headshots',
        aspectRatio: '1:1'
      },
      {
        title: 'Medical Professional',
        prompt: 'Medical professional physician headshot, trustworthy expert demeanor, professional medical attire, clean clinical background, professional lighting, healthcare industry aesthetic',
        category: 'AI Headshots',
        aspectRatio: '1:1'
      },
      {
        title: 'Legal Professional',
        prompt: 'Legal professional lawyer headshot, authoritative trustworthy presence, formal business suit, traditional office background, professional studio lighting, law firm aesthetic',
        category: 'AI Headshots',
        aspectRatio: '1:1'
      },
      {
        title: 'Marketing Professional',
        prompt: 'Marketing professional creative headshot, modern stylish business attire, confident approachable expression, contemporary background, natural professional lighting, marketing industry aesthetic',
        category: 'AI Headshots',
        aspectRatio: '1:1'
      },
      {
        title: 'Remote Worker Professional',
        prompt: 'Remote professional digital nomad headshot, casual professional attire, authentic confident expression, home office background, natural window lighting, modern remote work aesthetic',
        category: 'AI Headshots',
        aspectRatio: '1:1'
      }
    ]
  },

  {
    id: 'ai-model-photo',
    name: 'AI Model Photo',
    emoji: '💃',
    description: 'Fashion model photography for portfolios, lookbooks, and campaigns',
    targetImages: 15,
    basePromptSuffix: FASHION_SUFFIX,
    promptTemplates: [
      {
        title: 'High Fashion Editorial',
        prompt: 'High fashion editorial model portrait, avant-garde designer styling, dramatic fashion pose, luxury fashion aesthetic, professional fashion photography lighting, vogue magazine quality',
        category: 'AI Model Photo',
        aspectRatio: '4:5'
      },
      {
        title: 'Commercial Fashion Model',
        prompt: 'Commercial fashion model photoshoot, stylish contemporary outfit, versatile modeling pose, clean professional background, commercial photography lighting, catalog quality aesthetic',
        category: 'AI Model Photo',
        aspectRatio: '4:5'
      },
      {
        title: 'Runway Model Portrait',
        prompt: 'Runway fashion model portrait, haute couture designer clothing, confident catwalk presence, fashion week aesthetic, professional backstage lighting, high-end fashion quality',
        category: 'AI Model Photo',
        aspectRatio: '9:16'
      },
      {
        title: 'Street Style Fashion',
        prompt: 'Street style fashion model portrait, trendy urban outfit, city background, casual confident pose, natural outdoor lighting, contemporary fashion blogger aesthetic',
        category: 'AI Model Photo',
        aspectRatio: '4:5'
      },
      {
        title: 'Luxury Brand Campaign',
        prompt: 'Luxury brand fashion campaign model, premium designer clothing, sophisticated elegant pose, high-end brand aesthetic, professional studio lighting, luxury fashion quality',
        category: 'AI Model Photo',
        aspectRatio: '1:1'
      },
      {
        title: 'Casual Lifestyle Model',
        prompt: 'Casual lifestyle fashion model, relaxed stylish clothing, natural authentic pose, outdoor lifestyle setting, soft natural lighting, approachable fashion aesthetic',
        category: 'AI Model Photo',
        aspectRatio: '4:5'
      },
      {
        title: 'Glamour Fashion Portrait',
        prompt: 'Glamour fashion model portrait, elegant evening wear, dramatic glamorous styling, luxurious setting, professional glamour lighting, red carpet ready aesthetic',
        category: 'AI Model Photo',
        aspectRatio: '4:5'
      },
      {
        title: 'Minimalist Fashion',
        prompt: 'Minimalist fashion model portrait, clean simple styling, neutral tones outfit, minimal background, soft diffused lighting, contemporary minimalist aesthetic',
        category: 'AI Model Photo',
        aspectRatio: '1:1'
      },
      {
        title: 'Athletic Fashion Model',
        prompt: 'Athletic fashion model sportswear, stylish activewear outfit, dynamic fitness pose, modern gym setting, natural athletic lighting, athleisure fashion aesthetic',
        category: 'AI Model Photo',
        aspectRatio: '4:5'
      },
      {
        title: 'Bohemian Fashion Style',
        prompt: 'Bohemian fashion model portrait, boho chic clothing, free-spirited relaxed pose, natural outdoor setting, golden hour lighting, bohemian aesthetic vibe',
        category: 'AI Model Photo',
        aspectRatio: '4:5'
      },
      {
        title: 'Business Fashion Model',
        prompt: 'Business fashion model professional, elegant office wear, confident corporate pose, modern office background, professional lighting, executive fashion aesthetic',
        category: 'AI Model Photo',
        aspectRatio: '1:1'
      },
      {
        title: 'Evening Gown Elegance',
        prompt: 'Evening gown fashion model portrait, luxurious formal dress, elegant sophisticated pose, glamorous ballroom setting, dramatic evening lighting, black-tie event aesthetic',
        category: 'AI Model Photo',
        aspectRatio: '9:16'
      },
      {
        title: 'Denim Fashion Campaign',
        prompt: 'Denim fashion model portrait, stylish jeans outfit, casual confident pose, urban street background, natural daytime lighting, contemporary denim aesthetic',
        category: 'AI Model Photo',
        aspectRatio: '4:5'
      },
      {
        title: 'Vintage Fashion Style',
        prompt: 'Vintage fashion model portrait, retro inspired outfit, classic timeless pose, vintage aesthetic setting, soft nostalgic lighting, classic fashion photography',
        category: 'AI Model Photo',
        aspectRatio: '4:5'
      },
      {
        title: 'Swimwear Fashion Model',
        prompt: 'Swimwear fashion model beach, stylish bikini or swimsuit, beach lifestyle pose, tropical beach background, bright natural sunlight, summer fashion aesthetic',
        category: 'AI Model Photo',
        aspectRatio: '4:5'
      }
    ]
  },

  {
    id: 'ai-dating-photos',
    name: 'AI Dating Photos',
    emoji: '❤️',
    description: 'Optimized photos for Tinder, Bumble, Hinge, and dating apps',
    targetImages: 15,
    basePromptSuffix: FLUX_QUALITY_SUFFIX,
    promptTemplates: [
      {
        title: 'Tinder Profile Perfect',
        prompt: 'Perfect Tinder dating profile photo, friendly approachable smile, casual stylish outfit, flattering natural angle, soft attractive lighting, swipe-right worthy aesthetic authentic genuine vibe',
        category: 'Dating Photos',
        aspectRatio: '1:1'
      },
      {
        title: 'Bumble First Impression',
        prompt: 'Bumble dating app profile photo, confident friendly expression, modern casual clothing, outdoor natural setting, bright attractive lighting, approachable personality authentic social energy',
        category: 'Dating Photos',
        aspectRatio: '1:1'
      },
      {
        title: 'Hinge Conversation Starter',
        prompt: 'Hinge dating profile authentic photo, genuine relaxed smile, lifestyle casual outfit, interesting background activity, natural daylight lighting, conversation-worthy authentic personality showcase',
        category: 'Dating Photos',
        aspectRatio: '1:1'
      },
      {
        title: 'Adventure Dating Photo',
        prompt: 'Outdoor adventure dating profile photo, active lifestyle clothing, hiking or exploring pose, scenic nature background, golden hour natural lighting, adventurous personality authentic athletic vibe',
        category: 'Dating Photos',
        aspectRatio: '4:5'
      },
      {
        title: 'Coffee Shop Casual',
        prompt: 'Coffee shop dating profile casual photo, relaxed comfortable outfit, cozy cafe setting, warm friendly expression, soft indoor lighting, approachable lifestyle authentic urban aesthetic',
        category: 'Dating Photos',
        aspectRatio: '1:1'
      },
      {
        title: 'Beach Lifestyle Dating',
        prompt: 'Beach lifestyle dating profile photo, casual beach outfit, relaxed vacation vibe, beautiful coastal background, bright natural sunlight, carefree attractive authentic summer energy',
        category: 'Dating Photos',
        aspectRatio: '4:5'
      },
      {
        title: 'City Urban Style',
        prompt: 'Urban city dating profile photo, modern fashionable outfit, city street or rooftop background, confident stylish pose, natural urban lighting, metropolitan lifestyle authentic contemporary vibe',
        category: 'Dating Photos',
        aspectRatio: '1:1'
      },
      {
        title: 'Pet Lover Photo',
        prompt: 'Dating profile with pet photo, casual comfortable outfit, playing with dog or cat, outdoor park setting, warm affectionate lighting, animal lover personality authentic caring nature',
        category: 'Dating Photos',
        aspectRatio: '1:1'
      },
      {
        title: 'Smart Casual Date Ready',
        prompt: 'Smart casual dating profile photo, stylish date outfit, restaurant or bar background, confident attractive expression, flattering evening lighting, date-ready authentic sophisticated style',
        category: 'Dating Photos',
        aspectRatio: '1:1'
      },
      {
        title: 'Fitness Active Lifestyle',
        prompt: 'Fitness dating profile athletic photo, stylish workout clothes, gym or outdoor fitness setting, healthy active pose, natural energetic lighting, fitness lifestyle authentic athletic body',
        category: 'Dating Photos',
        aspectRatio: '4:5'
      },
      {
        title: 'Weekend Vibes Casual',
        prompt: 'Weekend casual dating profile photo, relaxed comfortable clothing, home or outdoor leisure setting, natural easygoing smile, soft weekend lighting, laid-back lifestyle authentic chill personality',
        category: 'Dating Photos',
        aspectRatio: '1:1'
      },
      {
        title: 'Traveler Explorer Photo',
        prompt: 'Travel dating profile wanderlust photo, vacation casual outfit, iconic travel destination background, adventurous confident pose, natural exotic lighting, explorer lifestyle authentic global citizen',
        category: 'Dating Photos',
        aspectRatio: '1:1'
      },
      {
        title: 'Music Festival Vibes',
        prompt: 'Music festival dating profile photo, festival fashion outfit, concert or outdoor event background, fun energetic expression, colorful dynamic lighting, music lover personality authentic festival energy',
        category: 'Dating Photos',
        aspectRatio: '4:5'
      },
      {
        title: 'Professional Yet Approachable',
        prompt: 'Professional approachable dating photo, business casual stylish outfit, modern office or urban background, confident friendly smile, balanced professional lighting, career-focused authentic ambitious personality',
        category: 'Dating Photos',
        aspectRatio: '1:1'
      },
      {
        title: 'Golden Hour Portrait',
        prompt: 'Golden hour dating profile portrait, casual romantic outfit, outdoor scenic background, warm flattering smile, beautiful sunset lighting, photogenic attractive authentic natural beauty',
        category: 'Dating Photos',
        aspectRatio: '1:1'
      }
    ]
  },

  {
    id: 'ai-selfie-generator',
    name: 'AI Selfie Generator',
    emoji: '🤳',
    description: 'Perfect selfies for social media, Instagram, and TikTok',
    targetImages: 15,
    basePromptSuffix: FLUX_QUALITY_SUFFIX,
    promptTemplates: [
      {
        title: 'Instagram Perfect Selfie',
        prompt: 'Instagram perfect selfie portrait, flattering phone angle, trendy stylish makeup, soft ring light effect, aesthetic background blur, social media ready authentic influencer vibe natural beauty',
        category: 'AI Selfie',
        aspectRatio: '9:16'
      },
      {
        title: 'Mirror Selfie Fashion',
        prompt: 'Full body mirror selfie fashion, stylish trendy outfit, clean mirror reflection, phone visible naturally, bedroom or bathroom setting, natural flattering lighting authentic outfit showcase',
        category: 'AI Selfie',
        aspectRatio: '9:16'
      },
      {
        title: 'Car Selfie Casual',
        prompt: 'Car selfie casual portrait, relaxed comfortable vibe, drivers seat perspective, natural daylight window lighting, candid authentic expression casual everyday lifestyle genuine moment',
        category: 'AI Selfie',
        aspectRatio: '1:1'
      },
      {
        title: 'Bathroom Selfie Aesthetic',
        prompt: 'Bathroom selfie aesthetic portrait, clean modern bathroom background, flattering phone angle, soft bathroom lighting, fresh natural makeup authentic clean girl aesthetic morning routine',
        category: 'AI Selfie',
        aspectRatio: '9:16'
      },
      {
        title: 'Bedroom Cozy Selfie',
        prompt: 'Cozy bedroom selfie portrait, comfortable relaxed clothing, bed or bedroom background, warm soft lighting, natural no-makeup look authentic chill vibes intimate personal space',
        category: 'AI Selfie',
        aspectRatio: '1:1'
      },
      {
        title: 'Golden Hour Outdoor',
        prompt: 'Golden hour outdoor selfie, casual summer outfit, sunset natural background, warm flattering lighting, genuine happy smile authentic vacation vibes perfect natural glow',
        category: 'AI Selfie',
        aspectRatio: '1:1'
      },
      {
        title: 'Gym Fitness Selfie',
        prompt: 'Gym fitness selfie mirror, athletic workout clothes, gym equipment background, post-workout fresh look, bright gym lighting authentic fitness journey progress photo motivation',
        category: 'AI Selfie',
        aspectRatio: '9:16'
      },
      {
        title: 'Coffee Shop Aesthetic',
        prompt: 'Coffee shop aesthetic selfie, cozy cafe background, latte or coffee visible, warm indoor lighting, casual comfortable outfit authentic lifestyle blogger urban millennial vibe',
        category: 'AI Selfie',
        aspectRatio: '1:1'
      },
      {
        title: 'Night Out Glam',
        prompt: 'Night out glam selfie, glamorous makeup look, stylish party outfit, club or bar background, dramatic nightlife lighting authentic going out ready elevated style energy',
        category: 'AI Selfie',
        aspectRatio: '9:16'
      },
      {
        title: 'Beach Vacation Selfie',
        prompt: 'Beach vacation selfie portrait, beachwear or bikini, ocean coastal background, bright sunny lighting, relaxed vacation smile authentic summer holiday tropical paradise vibes',
        category: 'AI Selfie',
        aspectRatio: '1:1'
      },
      {
        title: 'Cute Casual Selfie',
        prompt: 'Cute casual everyday selfie, comfortable loungewear, home or outdoor setting, natural soft lighting, playful friendly expression authentic girl next door relatable energy',
        category: 'AI Selfie',
        aspectRatio: '1:1'
      },
      {
        title: 'Travel Adventure Selfie',
        prompt: 'Travel adventure selfie portrait, vacation casual outfit, iconic travel landmark background, bright natural daylight, excited adventurous expression authentic wanderlust explorer vibe',
        category: 'AI Selfie',
        aspectRatio: '1:1'
      },
      {
        title: 'Work From Home Selfie',
        prompt: 'Work from home casual selfie, comfortable home outfit, home office background, natural window lighting, relaxed productive vibe authentic remote worker digital nomad lifestyle',
        category: 'AI Selfie',
        aspectRatio: '1:1'
      },
      {
        title: 'Festival Concert Selfie',
        prompt: 'Music festival concert selfie, festival fashion outfit, concert crowd background, colorful stage lighting, excited energetic expression authentic music lover party vibes',
        category: 'AI Selfie',
        aspectRatio: '9:16'
      },
      {
        title: 'Makeup Tutorial Selfie',
        prompt: 'Makeup tutorial beauty selfie, fresh makeup application, clean neutral background, bright beauty lighting, close-up face focus authentic beauty content creator flawless skin',
        category: 'AI Selfie',
        aspectRatio: '1:1'
      }
    ]
  },

  {
    id: 'ai-fitness-photos',
    name: 'AI Fitness Photos',
    emoji: '🏋️',
    description: 'Athletic and fitness photos for gym, health, and bodybuilding',
    targetImages: 15,
    basePromptSuffix: FLUX_QUALITY_SUFFIX,
    promptTemplates: [
      {
        title: 'Gym Workout Portrait',
        prompt: 'Gym workout fitness portrait, athletic activewear, weight training exercise pose, modern gym equipment background, bright gym lighting authentic fitness lifestyle motivated athletic physique',
        category: 'Fitness Photos',
        aspectRatio: '4:5'
      },
      {
        title: 'Outdoor Running Active',
        prompt: 'Outdoor running fitness photo, stylish running gear, jogging or sprinting pose, park or trail background, natural morning lighting authentic runner lifestyle healthy active energy',
        category: 'Fitness Photos',
        aspectRatio: '4:5'
      },
      {
        title: 'Yoga Flexibility Pose',
        prompt: 'Yoga fitness flexibility portrait, comfortable yoga outfit, advanced yoga pose, studio or outdoor mat, natural soft lighting authentic wellness lifestyle mindful healthy practice',
        category: 'Fitness Photos',
        aspectRatio: '4:5'
      },
      {
        title: 'Bodybuilding Physique',
        prompt: 'Bodybuilding physique showcase, fitted tank top or shirtless, muscular flex pose, gym mirror background, dramatic lighting authentic bodybuilder lifestyle competition ready athletic body',
        category: 'Fitness Photos',
        aspectRatio: '4:5'
      },
      {
        title: 'CrossFit Training Intensity',
        prompt: 'CrossFit training intensity photo, functional fitness gear, dynamic workout movement, CrossFit box background, high-energy lighting authentic athlete lifestyle extreme fitness dedication',
        category: 'Fitness Photos',
        aspectRatio: '4:5'
      },
      {
        title: 'Beach Body Fitness',
        prompt: 'Beach body fitness portrait, swimwear or athletic beachwear, confident physique pose, beach coastal background, bright natural sunlight authentic summer body healthy lifestyle',
        category: 'Fitness Photos',
        aspectRatio: '4:5'
      },
      {
        title: 'Personal Trainer Professional',
        prompt: 'Personal trainer professional photo, branded fitness clothing, instructing or coaching pose, gym studio background, professional lighting authentic fitness expert motivational leader',
        category: 'Fitness Photos',
        aspectRatio: '1:1'
      },
      {
        title: 'Marathon Runner Athletic',
        prompt: 'Marathon runner athletic portrait, technical running apparel, finishing line or training pose, race or road background, action motion lighting authentic endurance athlete competitive spirit',
        category: 'Fitness Photos',
        aspectRatio: '4:5'
      },
      {
        title: 'Cycling Athlete Dynamic',
        prompt: 'Cycling athlete dynamic portrait, professional cycling gear, bike riding action pose, outdoor cycling route, natural motion lighting authentic cyclist lifestyle outdoor fitness adventure',
        category: 'Fitness Photos',
        aspectRatio: '4:5'
      },
      {
        title: 'Pilates Core Strength',
        prompt: 'Pilates core strength portrait, comfortable fitted activewear, reformer or mat pose, clean studio background, soft controlled lighting authentic wellness lifestyle mindful fitness practice',
        category: 'Fitness Photos',
        aspectRatio: '4:5'
      },
      {
        title: 'Boxing Training Power',
        prompt: 'Boxing training power portrait, boxing gloves and shorts, punching or sparring pose, boxing gym background, dramatic athletic lighting authentic fighter lifestyle combat sport discipline',
        category: 'Fitness Photos',
        aspectRatio: '4:5'
      },
      {
        title: 'Athlete Progress Photo',
        prompt: 'Fitness progress transformation photo, form-fitting athletic wear, front-facing physique pose, neutral clean background, consistent documentation lighting authentic journey motivation progress tracking',
        category: 'Fitness Photos',
        aspectRatio: '1:1'
      },
      {
        title: 'Dance Fitness Energy',
        prompt: 'Dance fitness energy portrait, vibrant dancewear, dynamic movement pose, dance studio background, colorful energetic lighting authentic dancer lifestyle joyful expressive movement',
        category: 'Fitness Photos',
        aspectRatio: '4:5'
      },
      {
        title: 'Mountain Hiking Adventure',
        prompt: 'Mountain hiking fitness portrait, outdoor hiking gear, summit or trail pose, scenic mountain background, natural golden hour lighting authentic adventurer lifestyle outdoor exploration',
        category: 'Fitness Photos',
        aspectRatio: '4:5'
      },
      {
        title: 'Swimwear Fitness Model',
        prompt: 'Swimwear fitness model portrait, stylish athletic swimwear, confident beach pose, pool or ocean background, bright summer lighting authentic fit lifestyle healthy beach body aesthetic',
        category: 'Fitness Photos',
        aspectRatio: '4:5'
      }
    ]
  },

  {
    id: 'ai-lifestyle-travel',
    name: 'AI Lifestyle & Travel',
    emoji: '🌴',
    description: 'Travel, adventure, and lifestyle photos for Instagram and blogs',
    targetImages: 15,
    basePromptSuffix: FLUX_QUALITY_SUFFIX,
    promptTemplates: [
      {
        title: 'Tropical Paradise Vacation',
        prompt: 'Tropical paradise vacation portrait, casual beach outfit, palm trees island background, turquoise ocean view, bright sunny lighting authentic wanderlust lifestyle exotic travel adventure',
        category: 'Travel & Lifestyle',
        aspectRatio: '4:5'
      },
      {
        title: 'European City Explorer',
        prompt: 'European city travel portrait, stylish tourist outfit, historic architecture background, cobblestone street setting, natural urban lighting authentic culture explorer lifestyle European charm',
        category: 'Travel & Lifestyle',
        aspectRatio: '1:1'
      },
      {
        title: 'Mountain Summit Adventure',
        prompt: 'Mountain summit adventure portrait, outdoor hiking apparel, mountain peak background, scenic valley view, golden hour lighting authentic adventurer lifestyle nature exploration triumph',
        category: 'Travel & Lifestyle',
        aspectRatio: '4:5'
      },
      {
        title: 'Luxury Hotel Lifestyle',
        prompt: 'Luxury hotel lifestyle portrait, elegant vacation outfit, upscale hotel background, sophisticated interior, premium lighting authentic luxury traveler lifestyle high-end vacation experience',
        category: 'Travel & Lifestyle',
        aspectRatio: '1:1'
      },
      {
        title: 'Desert Wanderlust',
        prompt: 'Desert wanderlust travel portrait, bohemian travel outfit, sand dunes background, vast desert landscape, warm sunset lighting authentic desert explorer lifestyle nomadic adventure spirit',
        category: 'Travel & Lifestyle',
        aspectRatio: '4:5'
      },
      {
        title: 'Coastal Road Trip',
        prompt: 'Coastal road trip lifestyle portrait, casual summer travel clothes, convertible car or coastal highway, ocean cliff view, bright natural lighting authentic road tripper lifestyle freedom adventure',
        category: 'Travel & Lifestyle',
        aspectRatio: '4:5'
      },
      {
        title: 'Safari Wildlife Adventure',
        prompt: 'Safari wildlife adventure portrait, safari outfit khaki tones, African savanna background, wildlife viewing experience, natural dawn lighting authentic wildlife explorer lifestyle African safari',
        category: 'Travel & Lifestyle',
        aspectRatio: '1:1'
      },
      {
        title: 'Asian Temple Culture',
        prompt: 'Asian temple cultural portrait, respectful travel outfit, traditional temple background, cultural architecture setting, soft natural lighting authentic cultural explorer lifestyle spiritual journey',
        category: 'Travel & Lifestyle',
        aspectRatio: '1:1'
      },
      {
        title: 'Vineyard Wine Country',
        prompt: 'Vineyard wine country portrait, elegant country outfit, grapevines countryside background, rolling hills landscape, warm golden lighting authentic wine lover lifestyle luxury rural escape',
        category: 'Travel & Lifestyle',
        aspectRatio: '4:5'
      },
      {
        title: 'Urban Street Style Travel',
        prompt: 'Urban street style travel portrait, fashionable city outfit, vibrant street art background, metropolitan city vibe, natural street lighting authentic city explorer lifestyle urban culture',
        category: 'Travel & Lifestyle',
        aspectRatio: '1:1'
      },
      {
        title: 'Lakeside Cabin Retreat',
        prompt: 'Lakeside cabin retreat portrait, cozy casual outfit, wooden cabin background, peaceful lake view, warm afternoon lighting authentic nature lover lifestyle peaceful getaway relaxation',
        category: 'Travel & Lifestyle',
        aspectRatio: '4:5'
      },
      {
        title: 'Festival Cultural Experience',
        prompt: 'Cultural festival travel portrait, festival traditional outfit, vibrant celebration background, cultural event atmosphere, colorful dynamic lighting authentic culture enthusiast lifestyle immersive experience',
        category: 'Travel & Lifestyle',
        aspectRatio: '1:1'
      },
      {
        title: 'Snowy Mountain Winter',
        prompt: 'Snowy mountain winter portrait, warm winter travel outfit, snow-covered peaks background, winter wonderland scene, bright crisp lighting authentic winter adventurer lifestyle alpine escape',
        category: 'Travel & Lifestyle',
        aspectRatio: '4:5'
      },
      {
        title: 'Island Hopping Paradise',
        prompt: 'Island hopping paradise portrait, tropical casual outfit, multiple islands background, crystal clear water, vibrant tropical lighting authentic island explorer lifestyle carefree paradise living',
        category: 'Travel & Lifestyle',
        aspectRatio: '4:5'
      },
      {
        title: 'Digital Nomad Workspace',
        prompt: 'Digital nomad workspace portrait, casual work clothes, laptop coffee shop setting, exotic location background, natural workspace lighting authentic remote worker lifestyle location independent freedom',
        category: 'Travel & Lifestyle',
        aspectRatio: '1:1'
      }
    ]
  }
];

/**
 * ═══════════════════════════════════════════════════════════════
 * 📂 CATÉGORIES DE LA PAGE IDEAS (ideasData.ts)
 * ═══════════════════════════════════════════════════════════════
 */

export const ideasCategories: CategoryConfig[] = [
  {
    id: 'holidays-events',
    name: 'Holidays & Events',
    emoji: '🎉',
    description: 'Seasonal holidays, cultural celebrations, and special events',
    targetImages: 20,
    basePromptSuffix: FLUX_QUALITY_SUFFIX,
    promptTemplates: [
      {
        title: 'Halloween Spooky Costume',
        prompt: 'Halloween spooky costume portrait, creative halloween outfit, dark mysterious atmosphere, pumpkin decorations background, dramatic orange lighting authentic halloween spirit festive celebration',
        category: 'Holidays & Events'
      },
      {
        title: 'Christmas Festive Spirit',
        prompt: 'Christmas festive portrait, cozy holiday sweater, christmas tree decorations background, warm fairy lights, soft holiday lighting authentic christmas joy family celebration warmth',
        category: 'Holidays & Events'
      },
      {
        title: 'New Years Eve Glamour',
        prompt: 'New Years Eve glamour portrait, sparkling party dress, champagne celebration background, glitter confetti atmosphere, festive party lighting authentic midnight celebration countdown excitement',
        category: 'Holidays & Events'
      },
      {
        title: 'Valentines Day Romance',
        prompt: 'Valentines Day romantic portrait, elegant date outfit, roses heart decorations background, soft romantic pink lighting authentic love celebration intimate romantic atmosphere',
        category: 'Holidays & Events'
      },
      {
        title: 'Easter Spring Celebration',
        prompt: 'Easter spring celebration portrait, pastel spring outfit, colorful easter eggs background, bright cheerful atmosphere, natural spring lighting authentic easter joy family friendly celebration',
        category: 'Holidays & Events'
      },
      {
        title: 'Diwali Festival Lights',
        prompt: 'Diwali festival of lights portrait, traditional indian outfit, diya lamps rangoli background, warm golden lighting authentic diwali celebration cultural spiritual joy',
        category: 'Holidays & Events'
      },
      {
        title: 'Chinese New Year Traditional',
        prompt: 'Chinese New Year traditional portrait, red festive clothing, lanterns lucky decorations background, vibrant red gold lighting authentic lunar new year cultural celebration prosperity',
        category: 'Holidays & Events'
      },
      {
        title: 'Thanksgiving Gratitude',
        prompt: 'Thanksgiving gratitude portrait, cozy autumn outfit, fall harvest decorations background, warm orange lighting authentic thanksgiving celebration family gathering autumn warmth',
        category: 'Holidays & Events'
      },
      {
        title: 'Hanukkah Festival Lights',
        prompt: 'Hanukkah festival of lights portrait, festive blue gold outfit, menorah dreidel background, warm candle lighting authentic hanukkah celebration jewish tradition sacred observance',
        category: 'Holidays & Events'
      },
      {
        title: 'Eid Mubarak Celebration',
        prompt: 'Eid Mubarak celebration portrait, traditional festive attire, crescent moon decorations background, warm celebratory lighting authentic eid joy islamic tradition family gathering',
        category: 'Holidays & Events'
      }
    ]
  },

  {
    id: 'professional-headshots-extended',
    name: 'Professional Headshots (Extended)',
    emoji: '👔',
    description: 'Specialized professional headshots for various industries',
    targetImages: 20,
    basePromptSuffix: PORTRAIT_SUFFIX,
    promptTemplates: [
      {
        title: 'Doctor Medical Professional',
        prompt: 'Doctor medical professional headshot, white coat or scrubs, clinical background, trustworthy expert demeanor, professional medical lighting authentic healthcare provider compassionate care',
        category: 'Professional Headshots'
      },
      {
        title: 'Lawyer Legal Expert',
        prompt: 'Lawyer legal expert headshot, formal business suit, law office background, authoritative confident presence, professional studio lighting authentic legal professional trustworthy counsel',
        category: 'Professional Headshots'
      },
      {
        title: 'Real Estate Agent',
        prompt: 'Real Estate agent professional headshot, business casual attire, modern clean background, friendly approachable demeanor, natural lighting authentic property expert trustworthy advisor',
        category: 'Professional Headshots'
      },
      {
        title: 'Teacher Educator Portrait',
        prompt: 'Teacher educator professional headshot, smart casual teaching attire, classroom or library background, warm approachable expression, soft natural lighting authentic educator caring mentor',
        category: 'Professional Headshots'
      },
      {
        title: 'Actor Casting Headshot',
        prompt: 'Actor professional casting headshot, neutral simple clothing, clean solid background, authentic natural expression, standard casting lighting authentic performer versatile character range',
        category: 'Professional Headshots'
      },
      {
        title: 'Therapist Counselor Portrait',
        prompt: 'Therapist counselor professional headshot, comfortable professional attire, calm soothing background, empathetic warm expression, soft gentle lighting authentic mental health professional compassionate care',
        category: 'Professional Headshots'
      },
      {
        title: 'Life Coach Motivational',
        prompt: 'Life coach motivational headshot, inspiring confident attire, modern clean background, empowering positive demeanor, bright uplifting lighting authentic personal development coach transformative guidance',
        category: 'Professional Headshots'
      },
      {
        title: 'Podcast Host Studio',
        prompt: 'Podcast host studio headshot, casual creative outfit, microphone studio background, engaging charismatic expression, warm podcast lighting authentic content creator broadcasting personality',
        category: 'Professional Headshots'
      },
      {
        title: 'Author Writer Portrait',
        prompt: 'Author writer professional headshot, creative intellectual attire, library or study background, thoughtful creative expression, soft literary lighting authentic storyteller published creative mind',
        category: 'Professional Headshots'
      },
      {
        title: 'Keynote Speaker Professional',
        prompt: 'Keynote speaker professional headshot, confident business attire, stage or conference background, authoritative engaging presence, dynamic lighting authentic thought leader public speaking expert',
        category: 'Professional Headshots'
      }
    ]
  },

  {
    id: 'ai-creative-tools',
    name: 'AI & Creative Tools',
    emoji: '🎨',
    description: 'AI-powered creative tools and generators',
    targetImages: 15,
    basePromptSuffix: FLUX_QUALITY_SUFFIX,
    promptTemplates: [
      {
        title: 'AI Influencer Virtual',
        prompt: 'AI virtual influencer portrait, perfect flawless features, trendy fashionable outfit, modern studio background, professional influencer lighting authentic digital persona social media ready',
        category: 'AI & Creative'
      },
      {
        title: 'AI Makeup Try On',
        prompt: 'AI makeup try-on portrait, various makeup styles, beauty transformation, clean neutral background, bright beauty lighting authentic digital cosmetics virtual makeover realistic application',
        category: 'AI & Creative'
      },
      {
        title: 'YouTube Thumbnail Reaction',
        prompt: 'YouTube thumbnail reaction face, exaggerated shocked expression, bright colorful background, high contrast dramatic lighting authentic clickbait energy viral content thumbnail perfect',
        category: 'AI & Creative'
      },
      {
        title: 'AI Tarot Card Character',
        prompt: 'AI tarot card character portrait, mystical symbolic outfit, tarot card border frame, dramatic mystical lighting authentic arcana aesthetic spiritual symbolism ancient wisdom',
        category: 'AI & Creative'
      },
      {
        title: 'Photo To Anime Conversion',
        prompt: 'Photo to anime conversion portrait, anime art style rendering, vibrant anime colors, dynamic anime background, stylized anime lighting authentic manga aesthetic japanese animation style',
        category: 'AI & Creative'
      },
      {
        title: 'AI Avatar Character Creator',
        prompt: 'AI avatar character portrait, customizable avatar features, digital game-ready style, virtual world background, clean digital lighting authentic gaming persona metaverse ready character',
        category: 'AI & Creative'
      },
      {
        title: 'AI Yearbook Retro',
        prompt: 'AI yearbook retro portrait, vintage yearbook style, retro fashion outfit, classic school background, nostalgic soft lighting authentic 80s 90s throwback high school memory',
        category: 'AI & Creative'
      },
      {
        title: 'AI Action Figure Toy',
        prompt: 'AI action figure toy portrait, plastic toy aesthetic, collectible packaging background, toy lighting effect authentic toy photography collectible figure merchandise packaging',
        category: 'AI & Creative'
      },
      {
        title: 'AI Tattoo Design Visualization',
        prompt: 'AI tattoo design visualization, tattoo artwork on skin, body placement preview, realistic skin texture, natural lighting authentic tattoo mockup design preview realistic placement',
        category: 'AI & Creative'
      },
      {
        title: 'AI Art Generator Portrait',
        prompt: 'AI art generator artistic portrait, creative art style, abstract colorful background, artistic dramatic lighting authentic digital art contemporary artistic expression creative masterpiece',
        category: 'AI & Creative'
      }
    ]
  },

  {
    id: 'fashion-style-trends',
    name: 'Fashion & Style Trends',
    emoji: '👗',
    description: 'Fashion styles, trends, and outfit inspirations',
    targetImages: 20,
    basePromptSuffix: FASHION_SUFFIX,
    promptTemplates: [
      {
        title: 'Street Style Urban',
        prompt: 'Street style urban fashion portrait, trendy streetwear outfit, city street background, confident stylish pose, natural urban lighting authentic street fashion contemporary metropolitan style',
        category: 'Fashion & Style'
      },
      {
        title: 'Old Money Aesthetic',
        prompt: 'Old money aesthetic portrait, timeless elegant clothing, luxury country club background, sophisticated refined demeanor, soft natural lighting authentic generational wealth quiet luxury classic style',
        category: 'Fashion & Style'
      },
      {
        title: 'Y2K Aesthetic Retro',
        prompt: 'Y2K aesthetic retro portrait, early 2000s fashion, nostalgic background, playful trendy pose, bright colorful lighting authentic millennium style butterfly clips low-rise denim',
        category: 'Fashion & Style'
      },
      {
        title: 'Gorpcore Outdoor Style',
        prompt: 'Gorpcore outdoor fashion portrait, technical hiking apparel worn as streetwear, urban or nature background, practical stylish pose, natural lighting authentic outdoor fashion functional style',
        category: 'Fashion & Style'
      },
      {
        title: 'Mob Wife Aesthetic',
        prompt: 'Mob wife aesthetic portrait, luxurious fur coat jewelry, opulent glamorous background, confident powerful demeanor, dramatic lighting authentic mafia spouse luxury bold statement style',
        category: 'Fashion & Style'
      },
      {
        title: 'Cottagecore Aesthetic',
        prompt: 'Cottagecore aesthetic portrait, vintage floral dress, countryside cottage background, soft romantic pose, natural golden lighting authentic rural nostalgia pastoral fantasy romantic countryside',
        category: 'Fashion & Style'
      },
      {
        title: 'Dark Academia Style',
        prompt: 'Dark academia aesthetic portrait, tweed blazer vintage clothing, library or university background, intellectual thoughtful demeanor, moody lighting authentic scholarly aesthetic classic literature vibes',
        category: 'Fashion & Style'
      },
      {
        title: 'Clean Girl Aesthetic',
        prompt: 'Clean girl aesthetic portrait, minimal makeup natural beauty, simple elegant outfit, bright clean background, soft natural lighting authentic effortless beauty slicked back hair gold hoops',
        category: 'Fashion & Style'
      },
      {
        title: 'Cyberpunk Future Fashion',
        prompt: 'Cyberpunk future fashion portrait, neon tech-wear outfit, futuristic cityscape background, edgy confident pose, neon dramatic lighting authentic dystopian style high-tech street fashion',
        category: 'Fashion & Style'
      },
      {
        title: 'Vintage Retro 70s',
        prompt: 'Vintage retro 70s portrait, bell bottoms bohemian style, retro disco background, groovy nostalgic pose, warm vintage lighting authentic disco era flower power hippie aesthetic',
        category: 'Fashion & Style'
      }
    ]
  },

  {
    id: 'lifestyle-moments',
    name: 'Lifestyle Moments',
    emoji: '☕',
    description: 'Everyday lifestyle, hobbies, and personal moments',
    targetImages: 15,
    basePromptSuffix: FLUX_QUALITY_SUFFIX,
    promptTemplates: [
      {
        title: 'Coffee Shop Aesthetic',
        prompt: 'Coffee shop aesthetic lifestyle portrait, casual comfortable outfit, cozy cafe interior, latte art coffee cup, warm indoor lighting authentic coffee culture urban lifestyle millennial moment',
        category: 'Lifestyle Moments'
      },
      {
        title: 'Reading Book Cozy',
        prompt: 'Reading book cozy portrait, comfortable loungewear, home library or bookshelf background, peaceful relaxed expression, soft natural lighting authentic bookworm lifestyle intellectual leisure',
        category: 'Lifestyle Moments'
      },
      {
        title: 'Cooking Kitchen Lifestyle',
        prompt: 'Cooking kitchen lifestyle portrait, casual cooking outfit, modern kitchen background, engaged cooking activity, warm kitchen lighting authentic home chef lifestyle culinary passion',
        category: 'Lifestyle Moments'
      },
      {
        title: 'Plant Parent Green Thumb',
        prompt: 'Plant parent green thumb portrait, comfortable home clothes, houseplants indoor garden background, caring plant activity, natural window lighting authentic plant lover lifestyle botanical enthusiasm',
        category: 'Lifestyle Moments'
      },
      {
        title: 'Meditation Wellness',
        prompt: 'Meditation wellness portrait, comfortable yoga attire, peaceful meditation space, serene mindful expression, soft natural lighting authentic wellness lifestyle spiritual practice inner peace',
        category: 'Lifestyle Moments'
      },
      {
        title: 'Photography Hobby',
        prompt: 'Photography hobby portrait, casual creative outfit, camera equipment visible, interesting location background, natural lighting authentic photographer lifestyle creative passion artistic eye',
        category: 'Lifestyle Moments'
      },
      {
        title: 'Music Listening Vibe',
        prompt: 'Music listening vibe portrait, comfortable casual clothes, headphones or speakers visible, cozy space background, warm ambient lighting authentic music lover lifestyle sound enthusiast',
        category: 'Lifestyle Moments'
      },
      {
        title: 'Art Creating Studio',
        prompt: 'Art creating studio portrait, paint-splattered casual wear, art studio easel background, creative focused expression, natural studio lighting authentic artist lifestyle creative process',
        category: 'Lifestyle Moments'
      },
      {
        title: 'Journaling Reflection',
        prompt: 'Journaling reflection portrait, cozy comfortable outfit, desk or window seat background, thoughtful writing moment, soft natural lighting authentic self-care lifestyle mindful practice',
        category: 'Lifestyle Moments'
      },
      {
        title: 'Pet Bonding Moment',
        prompt: 'Pet bonding moment portrait, casual comfortable clothes, home or outdoor with pet, affectionate interaction, warm natural lighting authentic pet parent lifestyle animal companionship',
        category: 'Lifestyle Moments'
      }
    ]
  },

  {
    id: 'retro-vintage',
    name: 'Retro & Vintage',
    emoji: '📻',
    description: 'Retro and vintage era photography - 50s, 60s, 70s, 80s, 90s, Y2K',
    targetImages: 20,
    basePromptSuffix: FLUX_QUALITY_SUFFIX,
    promptTemplates: [
      {
        title: 'Retro 80s Neon',
        prompt: 'Retro 1980s portrait, vibrant neon colors outfit, geometric patterns, arcade or mall background, bright colorful lighting authentic 80s aesthetic synthwave vibes decade nostalgia',
        category: 'Retro & Vintage'
      },
      {
        title: 'Retro 70s Disco',
        prompt: 'Retro 1970s disco portrait, bell bottoms groovy outfit, disco ball dance floor, vintage warm lighting authentic 70s aesthetic disco fever bohemian style decade culture',
        category: 'Retro & Vintage'
      },
      {
        title: 'Retro 60s Mod',
        prompt: 'Retro 1960s mod portrait, geometric shift dress or suit, vintage mod background, bright pop art lighting authentic 60s aesthetic swinging sixties fashion revolution',
        category: 'Retro & Vintage'
      },
      {
        title: 'Retro 90s Grunge',
        prompt: 'Retro 1990s grunge portrait, flannel plaid outfit baggy jeans, urban street or garage background, moody natural lighting authentic 90s aesthetic alternative rock culture',
        category: 'Retro & Vintage'
      },
      {
        title: 'Y2K Millennium Style',
        prompt: 'Y2K millennium portrait, low-rise jeans butterfly clips, futuristic silver metallics, early 2000s background, bright digital lighting authentic Y2K aesthetic pop culture nostalgia',
        category: 'Retro & Vintage'
      },
      {
        title: '1950s Film Noir',
        prompt: '1950s film noir portrait, elegant classic outfit fedora or pearls, vintage noir setting, dramatic shadow lighting authentic noir aesthetic black white classic hollywood',
        category: 'Retro & Vintage'
      },
      {
        title: '1950s Pin-Up Girl',
        prompt: '1950s pin-up style portrait, retro swimsuit or polka dots, vintage americana background, bright nostalgic lighting authentic pin-up aesthetic classic bombshell glamour',
        category: 'Retro & Vintage'
      },
      {
        title: 'Silent Film Era',
        prompt: 'Silent film era portrait, vintage 1920s costume, art deco background, dramatic theatrical lighting authentic silent cinema aesthetic black white grainy vintage film',
        category: 'Retro & Vintage'
      },
      {
        title: 'Retro 1950s Diner',
        prompt: 'Retro 1950s diner portrait, poodle skirt or leather jacket, classic american diner background, warm nostalgic lighting authentic 50s americana jukebox soda fountain',
        category: 'Retro & Vintage'
      },
      {
        title: 'Vintage Polaroid Aesthetic',
        prompt: 'Vintage polaroid aesthetic portrait, casual retro outfit, nostalgic background, soft faded lighting authentic instant camera aesthetic vintage photo border warm tones',
        category: 'Retro & Vintage'
      },
      {
        title: '1920s Gatsby Glamour',
        prompt: '1920s gatsby glamour portrait, art deco flapper dress, roaring twenties background, dramatic golden lighting authentic jazz age aesthetic prohibition era luxury',
        category: 'Retro & Vintage'
      },
      {
        title: 'Retro 80s Aerobics',
        prompt: 'Retro 1980s aerobics portrait, bright leotard leg warmers, gym studio background, energetic colorful lighting authentic 80s fitness aesthetic jane fonda workout culture',
        category: 'Retro & Vintage'
      },
      {
        title: 'Vintage Motorcycle Rebel',
        prompt: 'Vintage motorcycle rebel portrait, leather jacket denim jeans, classic motorcycle background, dramatic moody lighting authentic rebel aesthetic james dean biker culture',
        category: 'Retro & Vintage'
      },
      {
        title: '1960s Hippie Flower Power',
        prompt: '1960s hippie flower power portrait, tie-dye bohemian outfit, peace love background, warm golden lighting authentic hippie aesthetic woodstock generation counterculture',
        category: 'Retro & Vintage'
      },
      {
        title: 'Retro 90s Hip Hop',
        prompt: 'Retro 1990s hip hop portrait, baggy clothes gold chains, urban street background, natural street lighting authentic 90s hip hop aesthetic rap culture street style',
        category: 'Retro & Vintage'
      },
      {
        title: 'Vintage Western Cowboy',
        prompt: 'Vintage western cowboy portrait, cowboy hat boots denim, desert ranch background, warm dusty lighting authentic wild west aesthetic frontier americana rustic charm',
        category: 'Retro & Vintage'
      },
      {
        title: '1970s Punk Rock',
        prompt: '1970s punk rock portrait, leather studs safety pins, gritty urban background, dramatic edgy lighting authentic punk aesthetic rebellion DIY attitude counterculture',
        category: 'Retro & Vintage'
      },
      {
        title: 'Retro VHS Camcorder',
        prompt: 'Retro VHS camcorder aesthetic portrait, casual 90s outfit, home video background, grainy VHS lighting authentic home movie aesthetic nostalgic family video quality',
        category: 'Retro & Vintage'
      },
      {
        title: 'Vintage Film Photography',
        prompt: 'Vintage film photography portrait, timeless classic outfit, nostalgic film background, soft grain lighting authentic analog aesthetic 35mm film texture warm tones',
        category: 'Retro & Vintage'
      },
      {
        title: '1980s Miami Vice',
        prompt: '1980s Miami Vice portrait, pastel suit or dress, tropical art deco background, neon sunset lighting authentic miami vice aesthetic coastal glamour vice city',
        category: 'Retro & Vintage'
      }
    ]
  },

  {
    id: 'location-based-travel',
    name: 'Location-Based Travel',
    emoji: '🗺️',
    description: 'Iconic travel destinations and location-specific photography',
    targetImages: 20,
    basePromptSuffix: FLUX_QUALITY_SUFFIX,
    promptTemplates: [
      {
        title: 'Summer in Paris',
        prompt: 'Summer in Paris portrait, chic parisian outfit, Eiffel Tower cafe background, warm golden lighting authentic french aesthetic romantic european charm city of light',
        category: 'Location Travel'
      },
      {
        title: 'Summer in Tokyo',
        prompt: 'Summer in Tokyo portrait, modern japanese fashion, neon shibuya crossing background, vibrant urban lighting authentic tokyo aesthetic japanese culture modern metropolis',
        category: 'Location Travel'
      },
      {
        title: 'Santorini Summer',
        prompt: 'Santorini summer portrait, white flowing dress, blue dome whitewashed buildings, bright mediterranean lighting authentic greek island aesthetic aegean sea paradise',
        category: 'Location Travel'
      },
      {
        title: 'Mykonos Nights',
        prompt: 'Mykonos nights portrait, glamorous party outfit, white architecture nightlife background, warm evening lighting authentic mykonos aesthetic greek island luxury nightlife',
        category: 'Location Travel'
      },
      {
        title: 'Dubai Luxury',
        prompt: 'Dubai luxury portrait, high-fashion elegant outfit, burj khalifa skyline background, golden hour lighting authentic dubai aesthetic middle eastern luxury modern opulence',
        category: 'Location Travel'
      },
      {
        title: 'Bali Tropical Paradise',
        prompt: 'Bali tropical paradise portrait, bohemian beach outfit, rice terraces temple background, warm golden lighting authentic bali aesthetic indonesian culture island spirituality',
        category: 'Location Travel'
      },
      {
        title: 'Neon Tokyo Night',
        prompt: 'Neon Tokyo night portrait, cyberpunk street fashion, neon signs rain background, dramatic neon lighting authentic tokyo night aesthetic blade runner vibes futuristic city',
        category: 'Location Travel'
      },
      {
        title: 'Berlin Nightlife',
        prompt: 'Berlin nightlife portrait, edgy alternative fashion, techno club urban background, dramatic club lighting authentic berlin aesthetic underground culture electronic music scene',
        category: 'Location Travel'
      },
      {
        title: 'Chernobyl Exploration',
        prompt: 'Chernobyl exploration portrait, urban explorer outfit, abandoned pripyat background, moody atmospheric lighting authentic urban exploration aesthetic soviet decay post-apocalyptic atmosphere',
        category: 'Location Travel'
      },
      {
        title: 'Las Vegas Night',
        prompt: 'Las Vegas night portrait, glamorous casino outfit, strip casinos background, bright neon lighting authentic vegas aesthetic entertainment capital gambling luxury spectacle',
        category: 'Location Travel'
      },
      {
        title: 'New York City Urban',
        prompt: 'New York City urban portrait, stylish metropolitan outfit, manhattan skyline street background, natural city lighting authentic NYC aesthetic big apple energy concrete jungle',
        category: 'Location Travel'
      },
      {
        title: 'Maldives Beach Paradise',
        prompt: 'Maldives beach paradise portrait, luxury swimwear resort wear, overwater bungalow background, bright tropical lighting authentic maldives aesthetic indian ocean luxury island escape',
        category: 'Location Travel'
      },
      {
        title: 'Iceland Adventure',
        prompt: 'Iceland adventure portrait, outdoor explorer outfit, northern lights waterfall background, dramatic natural lighting authentic iceland aesthetic nordic wilderness volcanic landscape',
        category: 'Location Travel'
      },
      {
        title: 'Morocco Exotic Culture',
        prompt: 'Morocco exotic culture portrait, colorful traditional outfit, marrakech souk riad background, warm exotic lighting authentic moroccan aesthetic north african culture spice markets',
        category: 'Location Travel'
      },
      {
        title: 'Switzerland Alpine',
        prompt: 'Switzerland alpine portrait, elegant mountain outfit, swiss alps village background, crisp mountain lighting authentic swiss aesthetic alpine beauty chocolate luxury',
        category: 'Location Travel'
      },
      {
        title: 'Australian Beach Lifestyle',
        prompt: 'Australian beach lifestyle portrait, casual surf outfit, bondi beach sydney background, bright sunny lighting authentic aussie aesthetic coastal culture surf lifestyle',
        category: 'Location Travel'
      },
      {
        title: 'London Rainy Day',
        prompt: 'London rainy day portrait, classic british fashion, big ben phone booth background, soft rainy lighting authentic london aesthetic british culture royal charm',
        category: 'Location Travel'
      },
      {
        title: 'Life On Mars Sci-Fi',
        prompt: 'Life on Mars sci-fi portrait, futuristic space suit, red martian landscape background, dramatic alien lighting authentic mars aesthetic space exploration colonization fantasy',
        category: 'Location Travel'
      },
      {
        title: 'Barcelona Gothic Quarter',
        prompt: 'Barcelona gothic quarter portrait, bohemian mediterranean outfit, gaudi architecture background, warm spanish lighting authentic barcelona aesthetic catalan culture artistic heritage',
        category: 'Location Travel'
      },
      {
        title: 'Amsterdam Canal Culture',
        prompt: 'Amsterdam canal culture portrait, casual european outfit, canal houses bikes background, soft dutch lighting authentic amsterdam aesthetic dutch culture canal city charm',
        category: 'Location Travel'
      }
    ]
  },

  {
    id: 'character-cosplay-fantasy',
    name: 'Character & Cosplay',
    emoji: '🎭',
    description: 'Anime characters, cosplay, and fantasy personas',
    targetImages: 15,
    basePromptSuffix: FLUX_QUALITY_SUFFIX,
    promptTemplates: [
      {
        title: 'Anime Character Portrait',
        prompt: 'Anime character portrait transformation, anime art style features, vibrant anime outfit, dynamic anime background, stylized anime lighting authentic manga aesthetic japanese animation style',
        category: 'Character & Cosplay'
      },
      {
        title: 'Cosplay Convention',
        prompt: 'Cosplay convention portrait, detailed costume character, convention hall background, bright convention lighting authentic cosplay culture fan community character dedication',
        category: 'Character & Cosplay'
      },
      {
        title: 'Chibi Character Cute',
        prompt: 'Chibi character cute portrait, chibi art style proportions, kawaii pastel outfit, cute cartoon background, soft bright lighting authentic chibi aesthetic super deformed style',
        category: 'Character & Cosplay'
      },
      {
        title: 'Catgirl Neko Character',
        prompt: 'Catgirl neko character portrait, cat ears tail outfit, anime aesthetic background, soft kawaii lighting authentic neko aesthetic japanese cat girl culture cute feline',
        category: 'Character & Cosplay'
      },
      {
        title: 'E-Girl Gamer Aesthetic',
        prompt: 'E-girl gamer aesthetic portrait, colorful hair gaming setup, LED gaming room background, vibrant RGB lighting authentic egirl culture twitch streamer aesthetic internet culture',
        category: 'Character & Cosplay'
      },
      {
        title: 'Fantasy Fairy Tale',
        prompt: 'Fantasy fairy tale portrait, magical princess warrior outfit, enchanted forest castle background, ethereal mystical lighting authentic fantasy aesthetic storybook magic medieval',
        category: 'Character & Cosplay'
      },
      {
        title: 'Superhero Comic Character',
        prompt: 'Superhero comic character portrait, hero costume cape, city rooftop background, dramatic heroic lighting authentic superhero aesthetic comic book style action hero',
        category: 'Character & Cosplay'
      },
      {
        title: 'Vampire Gothic Character',
        prompt: 'Vampire gothic character portrait, dark victorian outfit, gothic castle background, dramatic shadow lighting authentic vampire aesthetic gothic romance dark fantasy',
        category: 'Character & Cosplay'
      },
      {
        title: 'Elf Fantasy Character',
        prompt: 'Elf fantasy character portrait, elegant elven outfit pointed ears, magical forest background, soft ethereal lighting authentic elf aesthetic fantasy realm mythical beauty',
        category: 'Character & Cosplay'
      },
      {
        title: 'Pirate Adventure Character',
        prompt: 'Pirate adventure character portrait, pirate costume hat sword, ship deck ocean background, dramatic nautical lighting authentic pirate aesthetic high seas adventure',
        category: 'Character & Cosplay'
      },
      {
        title: 'Mermaid Underwater Fantasy',
        prompt: 'Mermaid underwater fantasy portrait, mermaid tail scales, ocean coral reef background, underwater ethereal lighting authentic mermaid aesthetic aquatic mythology ocean fantasy',
        category: 'Character & Cosplay'
      },
      {
        title: 'Steampunk Victorian Sci-Fi',
        prompt: 'Steampunk victorian sci-fi portrait, brass goggles gears outfit, industrial victorian background, warm bronze lighting authentic steampunk aesthetic retro-futurism mechanical fantasy',
        category: 'Character & Cosplay'
      },
      {
        title: 'Witch Magic Sorceress',
        prompt: 'Witch magic sorceress portrait, mystical witch outfit hat, magical potion background, dramatic mystical lighting authentic witch aesthetic occult magic spell casting',
        category: 'Character & Cosplay'
      },
      {
        title: 'Warrior Princess Fighter',
        prompt: 'Warrior princess fighter portrait, armor battle outfit, epic battlefield background, dramatic heroic lighting authentic warrior aesthetic female empowerment battle ready',
        category: 'Character & Cosplay'
      },
      {
        title: 'Cyberpunk Hacker Character',
        prompt: 'Cyberpunk hacker character portrait, neon tech outfit implants, futuristic dystopian background, neon digital lighting authentic cyberpunk aesthetic high-tech dystopia digital rebel',
        category: 'Character & Cosplay'
      }
    ]
  },

  {
    id: 'special-events-celebrations',
    name: 'Special Events & Celebrations',
    emoji: '🎊',
    description: 'Weddings, graduations, festivals, and special life events',
    targetImages: 20,
    basePromptSuffix: FLUX_QUALITY_SUFFIX,
    promptTemplates: [
      {
        title: 'Wedding Ceremony Bride',
        prompt: 'Wedding ceremony bride portrait, elegant wedding dress veil, beautiful ceremony venue background, soft romantic lighting authentic wedding aesthetic bridal beauty marriage celebration',
        category: 'Special Events'
      },
      {
        title: 'Pre-Wedding Engagement',
        prompt: 'Pre-wedding engagement portrait, romantic couple outfit, scenic engagement location, warm golden lighting authentic engagement aesthetic love story couple photography',
        category: 'Special Events'
      },
      {
        title: 'Maternity Pregnancy Glow',
        prompt: 'Maternity pregnancy glow portrait, flowing maternity dress, soft natural background, warm gentle lighting authentic pregnancy aesthetic expecting mother maternal beauty',
        category: 'Special Events'
      },
      {
        title: 'Graduation Achievement',
        prompt: 'Graduation achievement portrait, cap gown diploma, campus graduation background, bright celebratory lighting authentic graduation aesthetic academic success milestone celebration',
        category: 'Special Events'
      },
      {
        title: 'Music Festival Vibes',
        prompt: 'Music festival vibes portrait, bohemian festival outfit flower crown, outdoor festival background, vibrant festival lighting authentic festival aesthetic live music summer celebration',
        category: 'Special Events'
      },
      {
        title: 'Coachella Desert Festival',
        prompt: 'Coachella desert festival portrait, trendy boho festival fashion, desert polo grounds background, bright sunny lighting authentic coachella aesthetic california music festival',
        category: 'Special Events'
      },
      {
        title: 'Met Gala Red Carpet',
        prompt: 'Met gala red carpet portrait, haute couture designer gown, museum steps background, dramatic glamorous lighting authentic met gala aesthetic fashion fundraiser luxury event',
        category: 'Special Events'
      },
      {
        title: 'Pink Birthday Party',
        prompt: 'Pink birthday party portrait, pink party outfit decorations, birthday celebration background, bright festive lighting authentic birthday aesthetic pink aesthetic party celebration',
        category: 'Special Events'
      },
      {
        title: 'Prom Night Formal',
        prompt: 'Prom night formal portrait, elegant prom dress suit, ballroom venue background, romantic evening lighting authentic prom aesthetic high school formal dance celebration',
        category: 'Special Events'
      },
      {
        title: 'Anniversary Romantic',
        prompt: 'Anniversary romantic portrait, elegant anniversary outfit, romantic dinner setting, warm candlelight lighting authentic anniversary aesthetic love celebration milestone moment',
        category: 'Special Events'
      },
      {
        title: 'Baby Shower Celebration',
        prompt: 'Baby shower celebration portrait, pastel party outfit, baby shower decorations background, soft gentle lighting authentic baby shower aesthetic expecting celebration family joy',
        category: 'Special Events'
      },
      {
        title: 'Quinceañera Traditional',
        prompt: 'Quinceañera traditional portrait, elaborate quinceañera dress tiara, ballroom celebration background, dramatic glamorous lighting authentic quinceañera aesthetic latin tradition coming of age',
        category: 'Special Events'
      },
      {
        title: 'Award Ceremony Gala',
        prompt: 'Award ceremony gala portrait, formal gala attire, red carpet venue background, elegant sophisticated lighting authentic gala aesthetic awards celebration formal event',
        category: 'Special Events'
      },
      {
        title: 'Retirement Party Celebration',
        prompt: 'Retirement party celebration portrait, elegant celebratory outfit, party venue background, warm festive lighting authentic retirement aesthetic career milestone new beginning',
        category: 'Special Events'
      },
      {
        title: 'Bachelorette Party Fun',
        prompt: 'Bachelorette party fun portrait, playful party outfit accessories, celebration venue background, bright energetic lighting authentic bachelorette aesthetic girls night pre-wedding celebration',
        category: 'Special Events'
      },
      {
        title: 'Corporate Gala Event',
        prompt: 'Corporate gala event portrait, sophisticated business formal attire, upscale venue background, elegant professional lighting authentic corporate event aesthetic business celebration',
        category: 'Special Events'
      },
      {
        title: 'Charity Fundraiser Gala',
        prompt: 'Charity fundraiser gala portrait, elegant formal evening wear, luxury ballroom background, refined sophisticated lighting authentic charity gala aesthetic philanthropic celebration',
        category: 'Special Events'
      },
      {
        title: 'Concert Backstage VIP',
        prompt: 'Concert backstage VIP portrait, trendy concert outfit, backstage venue background, dynamic concert lighting authentic VIP aesthetic music industry exclusive access',
        category: 'Special Events'
      },
      {
        title: 'Fashion Show Runway',
        prompt: 'Fashion show runway portrait, high fashion runway outfit, catwalk audience background, dramatic runway lighting authentic fashion show aesthetic designer showcase model moment',
        category: 'Special Events'
      },
      {
        title: 'Art Gallery Opening',
        prompt: 'Art gallery opening portrait, sophisticated gallery attire, contemporary art background, elegant gallery lighting authentic art event aesthetic cultural celebration creative community',
        category: 'Special Events'
      }
    ]
  },

  {
    id: 'themed-aesthetic-styles',
    name: 'Themed & Aesthetic Styles',
    emoji: '✨',
    description: 'Unique aesthetic styles and themed photography',
    targetImages: 20,
    basePromptSuffix: FLUX_QUALITY_SUFFIX,
    promptTemplates: [
      {
        title: 'Pink Doll Barbie Aesthetic',
        prompt: 'Pink doll barbie aesthetic portrait, all pink outfit styling, pink dreamhouse background, bright pink lighting authentic barbie aesthetic doll-like perfection pink paradise',
        category: 'Themed Aesthetic'
      },
      {
        title: 'Soap Bubbles Dreamy',
        prompt: 'Soap bubbles dreamy portrait, ethereal light outfit, floating bubbles background, soft iridescent lighting authentic bubble aesthetic whimsical dreamy childhood nostalgia',
        category: 'Themed Aesthetic'
      },
      {
        title: 'RGB Neon Portrait',
        prompt: 'RGB neon portrait, dark outfit neon accents, split color lighting background, dramatic RGB lighting authentic neon aesthetic cyberpunk color separation chromatic style',
        category: 'Themed Aesthetic'
      },
      {
        title: 'Aesthetic Weekend Vibes',
        prompt: 'Aesthetic weekend vibes portrait, cozy comfortable outfit, relaxed home setting, soft natural lighting authentic weekend aesthetic lazy day self-care chill mood',
        category: 'Themed Aesthetic'
      },
      {
        title: 'Mocha Mousse Pantone',
        prompt: 'Mocha mousse pantone portrait, brown earth tones outfit, elegant mocha background, warm chocolate lighting authentic 2025 color aesthetic pantone trend rich earth',
        category: 'Themed Aesthetic'
      },
      {
        title: 'Clean Girl Aesthetic',
        prompt: 'Clean girl aesthetic portrait, minimal natural makeup, slicked hair gold hoops, clean bright background, soft natural lighting authentic clean aesthetic effortless beauty minimalist',
        category: 'Themed Aesthetic'
      },
      {
        title: 'Dark Academia Scholar',
        prompt: 'Dark academia scholar portrait, tweed vintage clothing, library university background, moody atmospheric lighting authentic dark academia aesthetic intellectual literary classic',
        category: 'Themed Aesthetic'
      },
      {
        title: 'Cottagecore Rural Dream',
        prompt: 'Cottagecore rural dream portrait, vintage floral dress, countryside cottage background, soft golden lighting authentic cottagecore aesthetic pastoral fantasy romantic countryside',
        category: 'Themed Aesthetic'
      },
      {
        title: 'Tradwife Homemaker',
        prompt: 'Tradwife homemaker aesthetic portrait, vintage housewife outfit, retro kitchen background, warm nostalgic lighting authentic tradwife aesthetic traditional values domestic goddess',
        category: 'Themed Aesthetic'
      },
      {
        title: 'Instant Camera Polaroid',
        prompt: 'Instant camera polaroid portrait, casual vintage outfit, nostalgic background, soft faded lighting authentic instant photo aesthetic polaroid border retro snapshot',
        category: 'Themed Aesthetic'
      },
      {
        title: 'Spiritual Mystical Aura',
        prompt: 'Spiritual mystical aura portrait, flowing ethereal clothing, sacred spiritual background, soft mystical lighting authentic spiritual aesthetic divine energy enlightenment meditation',
        category: 'Themed Aesthetic'
      },
      {
        title: 'Nature Earth Connection',
        prompt: 'Nature earth connection portrait, natural organic outfit, forest nature background, warm natural lighting authentic nature aesthetic eco-conscious earth child botanical',
        category: 'Themed Aesthetic'
      },
      {
        title: 'Extreme Close-Ups Detail',
        prompt: 'Extreme close-ups detail portrait, minimal styling focus, macro detail background, sharp focused lighting authentic detail aesthetic macro photography intimate close-up',
        category: 'Themed Aesthetic'
      },
      {
        title: 'Passport Photo Official',
        prompt: 'Passport photo official portrait, neutral formal attire, plain white background, standard even lighting authentic passport aesthetic official documentation formal identification',
        category: 'Themed Aesthetic'
      },
      {
        title: 'Celebrity Paparazzi Style',
        prompt: 'Celebrity paparazzi style portrait, celebrity fashion outfit, red carpet street background, camera flash lighting authentic celebrity aesthetic fame lifestyle star power',
        category: 'Themed Aesthetic'
      },
      {
        title: 'AI Protests Activism',
        prompt: 'AI protests activism portrait, activist outfit sign, protest demonstration background, dramatic passionate lighting authentic protest aesthetic social justice activism movement',
        category: 'Themed Aesthetic'
      },
      {
        title: 'Rap Album Cover Urban',
        prompt: 'Rap album cover urban portrait, hip hop fashion chains, urban street background, dramatic moody lighting authentic hip hop aesthetic album art rap culture',
        category: 'Themed Aesthetic'
      },
      {
        title: 'Mobster Gangster Aesthetic',
        prompt: 'Mobster gangster aesthetic portrait, vintage suit fedora, 1920s speakeasy background, dramatic noir lighting authentic gangster aesthetic prohibition era organized crime',
        category: 'Themed Aesthetic'
      },
      {
        title: 'Strapped Tactical Gear',
        prompt: 'Strapped tactical gear portrait, tactical military outfit, urban tactical background, dramatic action lighting authentic tactical aesthetic military operator spec ops',
        category: 'Themed Aesthetic'
      },
      {
        title: 'Flight Attendant Professional',
        prompt: 'Flight attendant professional portrait, airline uniform attire, airplane cabin background, bright professional lighting authentic airline aesthetic aviation hospitality travel industry',
        category: 'Themed Aesthetic'
      }
    ]
  },

  {
    id: 'professional-creative-specialized',
    name: 'Professional Creative & Specialized',
    emoji: '🎬',
    description: 'Specialized professional and creative industry headshots',
    targetImages: 15,
    basePromptSuffix: PORTRAIT_SUFFIX,
    promptTemplates: [
      {
        title: 'YouTube Content Creator',
        prompt: 'YouTube content creator portrait, trendy casual outfit, filming studio background, bright engaging lighting authentic creator aesthetic video personality influencer energy',
        category: 'Professional Creative'
      },
      {
        title: 'TikTok Influencer',
        prompt: 'TikTok influencer portrait, viral trendy outfit, aesthetic filming setup, dynamic creative lighting authentic tiktok aesthetic gen-z creator viral content',
        category: 'Professional Creative'
      },
      {
        title: 'Instagram Influencer Brand',
        prompt: 'Instagram influencer brand portrait, curated aesthetic outfit, instagram-worthy background, perfect influencer lighting authentic instagram aesthetic social media brand professional creator',
        category: 'Professional Creative'
      },
      {
        title: 'Twitch Streamer Gaming',
        prompt: 'Twitch streamer gaming portrait, gamer outfit RGB setup, streaming room background, vibrant LED lighting authentic twitch aesthetic gaming culture live streaming',
        category: 'Professional Creative'
      },
      {
        title: 'Music Producer Studio',
        prompt: 'Music producer studio portrait, creative casual outfit, recording studio background, warm studio lighting authentic producer aesthetic music creation audio engineering',
        category: 'Professional Creative'
      },
      {
        title: 'DJ Electronic Artist',
        prompt: 'DJ electronic artist portrait, trendy DJ outfit headphones, club booth background, dynamic club lighting authentic DJ aesthetic electronic music nightlife culture',
        category: 'Professional Creative'
      },
      {
        title: 'Fashion Designer Creative',
        prompt: 'Fashion designer creative portrait, stylish designer outfit, fashion studio background, artistic design lighting authentic designer aesthetic fashion industry creative vision',
        category: 'Professional Creative'
      },
      {
        title: 'Photographer Artist',
        prompt: 'Photographer artist portrait, creative outfit camera gear, photography studio background, natural artistic lighting authentic photographer aesthetic creative professional visual artist',
        category: 'Professional Creative'
      },
      {
        title: 'Graphic Designer Creative',
        prompt: 'Graphic designer creative portrait, modern creative outfit, design studio workspace, bright creative lighting authentic designer aesthetic digital creative visual communication',
        category: 'Professional Creative'
      },
      {
        title: 'Architect Professional',
        prompt: 'Architect professional portrait, sophisticated business attire, architecture office background, professional clean lighting authentic architect aesthetic design professional spatial vision',
        category: 'Professional Creative'
      },
      {
        title: 'Chef Culinary Expert',
        prompt: 'Chef culinary expert portrait, professional chef whites, kitchen restaurant background, warm kitchen lighting authentic chef aesthetic culinary arts food passion',
        category: 'Professional Creative'
      },
      {
        title: 'Makeup Artist Beauty',
        prompt: 'Makeup artist beauty portrait, stylish creative outfit, beauty studio background, bright beauty lighting authentic makeup artist aesthetic cosmetic professional beauty expert',
        category: 'Professional Creative'
      },
      {
        title: 'Hair Stylist Creative',
        prompt: 'Hair stylist creative portrait, fashionable outfit styling tools, salon studio background, bright salon lighting authentic stylist aesthetic hair fashion beauty professional',
        category: 'Professional Creative'
      },
      {
        title: 'Tattoo Artist Ink Master',
        prompt: 'Tattoo artist ink master portrait, creative tattoo outfit, tattoo studio background, dramatic artistic lighting authentic tattoo aesthetic body art ink culture',
        category: 'Professional Creative'
      },
      {
        title: 'Fitness Coach Personal Trainer',
        prompt: 'Fitness coach personal trainer portrait, athletic coaching outfit, gym training background, energetic motivational lighting authentic fitness coach aesthetic health wellness transformation',
        category: 'Professional Creative'
      }
    ]
  }
];

/**
 * ═══════════════════════════════════════════════════════════════
 * 🔧 FONCTIONS UTILITAIRES
 * ═══════════════════════════════════════════════════════════════
 */

/**
 * Récupère TOUTES les catégories (principales + ideas)
 */
export function getAllCategories(): CategoryConfig[] {
  return [...mainCategories, ...ideasCategories];
}

/**
 * Récupère une catégorie par ID
 */
export function getCategoryById(id: string): CategoryConfig | undefined {
  return getAllCategories().find(cat => cat.id === id);
}

/**
 * Récupère tous les prompts d'une catégorie
 */
export function getPromptsByCategory(categoryId: string): PromptTemplate[] {
  const category = getCategoryById(categoryId);
  return category?.promptTemplates || [];
}

/**
 * Compte le nombre total d'images à générer
 */
export function getTotalImageCount(): number {
  return getAllCategories().reduce((sum, cat) => sum + cat.targetImages, 0);
}

/**
 * Statistiques globales
 */
export function getGlobalStats() {
  const allCategories = getAllCategories();
  return {
    totalCategories: allCategories.length,
    totalTargetImages: getTotalImageCount(),
    mainCategories: mainCategories.length,
    ideasCategories: ideasCategories.length,
    avgImagesPerCategory: Math.round(getTotalImageCount() / allCategories.length)
  };
}

/**
 * Export par défaut avec toutes les catégories
 */
export default {
  mainCategories,
  ideasCategories,
  getAllCategories,
  getCategoryById,
  getPromptsByCategory,
  getTotalImageCount,
  getGlobalStats
};
