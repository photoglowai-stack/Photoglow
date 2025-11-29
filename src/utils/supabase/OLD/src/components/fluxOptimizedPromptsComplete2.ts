/**
 * 🎨 PHOTOGLOW - PROMPTS FLUX OPTIMISÉS COMPLETS (PARTIE 2/2)
 * 
 * Suite et fin de toutes les catégories manquantes
 */

import { FluxCategoryConfig } from './fluxOptimizedPrompts';

/**
 * ═══════════════════════════════════════════════════════════════
 * 👗 FASHION & STYLE (SUITE)
 * ═══════════════════════════════════════════════════════════════
 */

export const fashionStyleMissing2: FluxCategoryConfig[] = [
  {
    id: 'virtual-suits-try-on',
    name: 'Virtual Suits Try On',
    description: 'Try on different suit styles',
    targetImages: 10,
    prompts: [
      {
        title: 'Classic Navy Suit',
        prompt: '3/4 [gender] wearing charcoal suit on cyclorama, soft key, 50mm, clean tailoring, professional suit aesthetic.',
        aspectRatio: '3:4',
        gender: 'both'
      },
      {
        title: 'Grey Business',
        prompt: 'Full-body [gender] in grey business suit, office background, natural light, 50mm, corporate attire.',
        aspectRatio: '3:4',
        gender: 'both'
      },
      {
        title: 'Tuxedo Formal',
        prompt: '3/4 [gender] black tuxedo, elegant background, 50mm, formal evening suit.',
        aspectRatio: '3:4',
        gender: 'both'
      },
      {
        title: 'Pinstripe Power',
        prompt: 'Full-body [gender] pinstripe suit, urban setting, 50mm, power suit aesthetic.',
        aspectRatio: '3:4',
        gender: 'both'
      },
      {
        title: 'Summer Linen',
        prompt: '3/4 [gender] light linen suit, outdoor setting, natural light, 50mm, summer suit style.',
        aspectRatio: '3:4',
        gender: 'both'
      },
      {
        title: 'Three-Piece',
        prompt: 'Full-body [gender] three-piece suit with vest, studio light, 50mm, classic tailoring.',
        aspectRatio: '3:4',
        gender: 'both'
      },
      {
        title: 'Modern Slim Fit',
        prompt: '3/4 [gender] slim-fit modern suit, contemporary setting, 50mm, fashion-forward suiting.',
        aspectRatio: '3:4',
        gender: 'both'
      },
      {
        title: 'Patterned Suit',
        prompt: 'Full-body [gender] patterned fabric suit, neutral background, 50mm, statement suiting.',
        aspectRatio: '3:4',
        gender: 'both'
      },
      {
        title: 'Casual Blazer',
        prompt: '3/4 [gender] blazer with jeans, casual setting, natural light, 50mm, smart casual style.',
        aspectRatio: '3:4',
        gender: 'both'
      },
      {
        title: 'Wedding Suit',
        prompt: 'Full-body [gender] wedding suit, elegant venue, soft light, 50mm, special occasion attire.',
        aspectRatio: '3:4',
        gender: 'both'
      }
    ]
  },

  {
    id: 'virtual-try-on-clothes',
    name: 'Virtual Try On Clothes',
    description: 'Try various outfit styles',
    targetImages: 10,
    prompts: [
      {
        title: 'Catalog Try-On',
        prompt: '3/4 [gender] facing camera wearing varied outfits, neutral cyclorama, soft key, catalog quality, fashion try-on.',
        aspectRatio: '3:4',
        gender: 'both'
      },
      {
        title: 'Casual Streetwear',
        prompt: 'Full-body [gender] in casual streetwear, white background, even light, 50mm, catalog style.',
        aspectRatio: '3:4',
        gender: 'both'
      },
      {
        title: 'Business Casual',
        prompt: '3/4 [gender] business casual outfit, clean background, professional light, 50mm, office attire.',
        aspectRatio: '3:4',
        gender: 'both'
      },
      {
        title: 'Evening Wear',
        prompt: 'Full-body [gender] evening outfit, elegant backdrop, 50mm, formal wear try-on.',
        aspectRatio: '3:4',
        gender: 'both'
      },
      {
        title: 'Summer Outfit',
        prompt: '3/4 [gender] summer casual clothes, bright background, natural light, 50mm, warm weather style.',
        aspectRatio: '3:4',
        gender: 'both'
      },
      {
        title: 'Winter Fashion',
        prompt: 'Full-body [gender] winter outfit with coat, neutral background, 50mm, cold weather attire.',
        aspectRatio: '3:4',
        gender: 'both'
      },
      {
        title: 'Activewear',
        prompt: '3/4 [gender] in athletic wear, clean background, bright light, 50mm, sportswear try-on.',
        aspectRatio: '3:4',
        gender: 'both'
      },
      {
        title: 'Denim Style',
        prompt: 'Full-body [gender] in denim outfit, white backdrop, 50mm, casual denim aesthetic.',
        aspectRatio: '3:4',
        gender: 'both'
      },
      {
        title: 'Layered Look',
        prompt: '3/4 [gender] layered outfit, neutral setting, natural light, 50mm, contemporary layering.',
        aspectRatio: '3:4',
        gender: 'both'
      },
      {
        title: 'Smart Formal',
        prompt: 'Full-body [gender] formal attire, studio background, professional light, 50mm, elegant dress.',
        aspectRatio: '3:4',
        gender: 'both'
      }
    ]
  },

  {
    id: 'traditional-clothes',
    name: 'Traditional Clothes',
    description: 'Cultural traditional attire worldwide',
    targetImages: 10,
    prompts: [
      {
        title: 'Traditional Heritage',
        prompt: '3/4 [gender] in traditional attire at cultural landmark, soft daylight, 50mm, respectful cultural aesthetic.',
        aspectRatio: '3:4',
        gender: 'both'
      },
      {
        title: 'Kimono Japan',
        prompt: 'Full-body [gender] in Japanese kimono, temple background, soft overcast, 50mm, traditional Japanese.',
        aspectRatio: '3:4',
        gender: 'both'
      },
      {
        title: 'Sari India',
        prompt: '3/4 [gender] in colorful sari, Indian palace, golden hour, 50mm, traditional Indian elegance.',
        aspectRatio: '3:4',
        gender: 'female'
      },
      {
        title: 'Hanbok Korea',
        prompt: 'Full-body [gender] Korean hanbok, palace setting, soft daylight, 50mm, traditional Korean attire.',
        aspectRatio: '3:4',
        gender: 'both'
      },
      {
        title: 'Dirndl Germany',
        prompt: '3/4 [gender] in dirndl, alpine background, natural light, 50mm, Bavarian traditional dress.',
        aspectRatio: '3:4',
        gender: 'female'
      },
      {
        title: 'Kilt Scotland',
        prompt: 'Full-body [gender] in Scottish kilt, highland landscape, overcast, 50mm, traditional Scottish.',
        aspectRatio: '3:4',
        gender: 'male'
      },
      {
        title: 'Cheongsam China',
        prompt: '3/4 [gender] in silk cheongsam, Chinese garden, soft light, 50mm, traditional Chinese elegance.',
        aspectRatio: '3:4',
        gender: 'female'
      },
      {
        title: 'Thobe Arabian',
        prompt: 'Full-body [gender] in white thobe, desert setting, golden hour, 50mm, traditional Arabian attire.',
        aspectRatio: '3:4',
        gender: 'male'
      },
      {
        title: 'Dashiki African',
        prompt: '3/4 [gender] in colorful dashiki, cultural setting, bright daylight, 50mm, West African traditional.',
        aspectRatio: '3:4',
        gender: 'both'
      },
      {
        title: 'Huipil Mexican',
        prompt: 'Full-body [gender] in embroidered huipil, Mexican backdrop, natural light, 50mm, traditional Mexican.',
        aspectRatio: '3:4',
        gender: 'female'
      }
    ]
  },

  {
    id: 'cyberpunk-fashion',
    name: 'Cyberpunk Fashion',
    description: 'Futuristic cyberpunk digital clothes',
    targetImages: 10,
    prompts: [
      {
        title: 'Cyberpunk Digital',
        prompt: '3/4 [gender] in neon cyber outfit, RGB gels, city holograms, 35mm, futuristic cyberpunk aesthetic.',
        aspectRatio: '3:4',
        gender: 'both'
      },
      {
        title: 'Neon Street',
        prompt: 'Full-body [gender] cyberpunk streetwear, neon city, RGB lights, 35mm, urban cyber fashion.',
        aspectRatio: '3:4',
        gender: 'both'
      },
      {
        title: 'Tech Wear',
        prompt: '3/4 [gender] in techwear outfit, futuristic setting, cool lights, 50mm, functional cyber style.',
        aspectRatio: '3:4',
        gender: 'both'
      },
      {
        title: 'Holographic Fashion',
        prompt: 'Full-body [gender] holographic clothing, digital background, RGB accents, 50mm, virtual fashion.',
        aspectRatio: '3:4',
        gender: 'both'
      },
      {
        title: 'Cyber Warrior',
        prompt: '3/4 [gender] cyber armor outfit, dystopian city, neon glow, 35mm, combat cyber aesthetic.',
        aspectRatio: '3:4',
        gender: 'both'
      },
      {
        title: 'Digital Punk',
        prompt: 'Full-body [gender] punk cyber style, graffiti neon, RGB lights, 35mm, rebellious cyber.',
        aspectRatio: '3:4',
        gender: 'both'
      },
      {
        title: 'Matrix Style',
        prompt: '3/4 [gender] black leather cyber, digital rain, green tint, 50mm, matrix-inspired fashion.',
        aspectRatio: '3:4',
        gender: 'both'
      },
      {
        title: 'LED Fashion',
        prompt: 'Full-body [gender] with LED clothing, dark background, glowing accents, 50mm, light-up fashion.',
        aspectRatio: '3:4',
        gender: 'both'
      },
      {
        title: 'Vaporwave Cyber',
        prompt: '3/4 [gender] vaporwave aesthetic, pastel neon, 50mm, retro-futuristic cyber style.',
        aspectRatio: '3:4',
        gender: 'both'
      },
      {
        title: 'Augmented Reality',
        prompt: 'Full-body [gender] AR fashion overlay, digital elements, futuristic light, 50mm, AR clothing.',
        aspectRatio: '3:4',
        gender: 'both'
      }
    ]
  },

  {
    id: 'gorpcore',
    name: 'Gorpcore Fashion',
    description: 'Outdoor technical streetwear',
    targetImages: 10,
    prompts: [
      {
        title: 'Gorpcore Classic',
        prompt: 'Streetwear-meets-outdoor 3/4 [gender] in puffer/technical shell, overcast, 35mm, utilitarian outdoor fashion.',
        aspectRatio: '3:4',
        gender: 'both'
      },
      {
        title: 'Urban Hiker',
        prompt: 'Full-body [gender] hiking gear on city street, natural overcast, 35mm, urban outdoor style.',
        aspectRatio: '3:4',
        gender: 'both'
      },
      {
        title: 'Technical Layers',
        prompt: '3/4 [gender] layered technical wear, outdoor setting, soft light, 50mm, functional fashion.',
        aspectRatio: '3:4',
        gender: 'both'
      },
      {
        title: 'Trail Mix Urban',
        prompt: 'Full-body [gender] trail outfit on city backdrop, overcast, 35mm, gorpcore aesthetic.',
        aspectRatio: '3:4',
        gender: 'both'
      },
      {
        title: 'Fleece Street',
        prompt: '3/4 [gender] Patagonia-style fleece, urban street, natural light, 50mm, outdoor brand style.',
        aspectRatio: '3:4',
        gender: 'both'
      },
      {
        title: 'Arc teryx Vibe',
        prompt: 'Full-body [gender] technical shell jacket, city background, overcast, 35mm, premium outdoor.',
        aspectRatio: '3:4',
        gender: 'both'
      },
      {
        title: 'Hiking Boots City',
        prompt: '3/4 [gender] hiking boots with casual outfit, urban setting, 50mm, functional footwear fashion.',
        aspectRatio: '3:4',
        gender: 'both'
      },
      {
        title: 'Cargo Utility',
        prompt: 'Full-body [gender] cargo pants outdoor style, street backdrop, 35mm, utility fashion.',
        aspectRatio: '3:4',
        gender: 'both'
      },
      {
        title: 'Rain Shell',
        prompt: '3/4 [gender] waterproof shell, rainy city, overcast light, 50mm, weather-proof fashion.',
        aspectRatio: '3:4',
        gender: 'both'
      },
      {
        title: 'Backpack Commute',
        prompt: 'Full-body [gender] with hiking backpack, commuting scene, natural light, 35mm, outdoor-urban blend.',
        aspectRatio: '3:4',
        gender: 'both'
      }
    ]
  },

  {
    id: 'mocha-mousse-outfits',
    name: 'Mocha Mousse Outfits',
    description: 'Pantone 2025 brown-tone fashion',
    targetImages: 10,
    prompts: [
      {
        title: 'Mocha Mousse Tonal',
        prompt: '3/4 [gender] in brown palette (chocolate→caramel), studio softbox, 50mm, tonal harmony, earth tone fashion.',
        aspectRatio: '3:4',
        gender: 'both'
      },
      {
        title: 'Chocolate Brown',
        prompt: 'Full-body [gender] rich chocolate outfit, neutral background, soft light, 50mm, deep brown elegance.',
        aspectRatio: '3:4',
        gender: 'both'
      },
      {
        title: 'Caramel Chic',
        prompt: '3/4 [gender] caramel tones, warm background, natural light, 50mm, soft brown sophistication.',
        aspectRatio: '3:4',
        gender: 'both'
      },
      {
        title: 'Espresso Style',
        prompt: 'Full-body [gender] espresso brown ensemble, coffee shop, warm ambient, 50mm, coffee-inspired fashion.',
        aspectRatio: '3:4',
        gender: 'both'
      },
      {
        title: 'Tan Layers',
        prompt: '3/4 [gender] layered tan outfit, studio setting, soft light, 50mm, neutral layering.',
        aspectRatio: '3:4',
        gender: 'both'
      },
      {
        title: 'Hazelnut Hues',
        prompt: 'Full-body [gender] hazelnut color palette, natural setting, golden hour, 50mm, warm brown tones.',
        aspectRatio: '3:4',
        gender: 'both'
      },
      {
        title: 'Cocoa Comfort',
        prompt: '3/4 [gender] cozy cocoa brown, home setting, soft lamp light, 50mm, comfortable brown aesthetic.',
        aspectRatio: '3:4',
        gender: 'both'
      },
      {
        title: 'Taupe Elegance',
        prompt: 'Full-body [gender] taupe monochrome, elegant backdrop, 50mm, refined neutral fashion.',
        aspectRatio: '3:4',
        gender: 'both'
      },
      {
        title: 'Cinnamon Spice',
        prompt: '3/4 [gender] cinnamon brown outfit, autumn setting, natural light, 50mm, spice-toned fashion.',
        aspectRatio: '3:4',
        gender: 'both'
      },
      {
        title: 'Toffee Tones',
        prompt: 'Full-body [gender] toffee color ensemble, neutral studio, soft light, 50mm, sweet brown palette.',
        aspectRatio: '3:4',
        gender: 'both'
      }
    ]
  },

  {
    id: 'hair-scarves',
    name: 'Hair Scarves Fashion',
    description: 'Elegant hair scarf styling',
    targetImages: 10,
    prompts: [
      {
        title: 'Silk Scarf Classic',
        prompt: 'Close portrait of a [gender] wearing silk headscarf, soft gradient backdrop, 85mm, elegant hair accessory.',
        aspectRatio: '1:1',
        gender: 'both'
      },
      {
        title: 'Vintage Headscarf',
        prompt: '3/4 [gender] with retro headscarf, 1950s style, soft light, 50mm, classic vintage look.',
        aspectRatio: '3:4',
        gender: 'both'
      },
      {
        title: 'Turban Style',
        prompt: 'Portrait [gender] turban headwrap, colorful pattern, studio light, 85mm, elegant turban fashion.',
        aspectRatio: '1:1',
        gender: 'both'
      },
      {
        title: 'Beach Scarf',
        prompt: '3/4 [gender] with beach headscarf, ocean background, natural sun, 50mm, coastal scarf style.',
        aspectRatio: '3:4',
        gender: 'both'
      },
      {
        title: 'Bohemian Wrap',
        prompt: 'Full-body [gender] boho headscarf, festival setting, natural light, 50mm, free-spirited scarf.',
        aspectRatio: '3:4',
        gender: 'both'
      },
      {
        title: 'Luxury Silk',
        prompt: 'Close-up [gender] designer silk scarf, luxury setting, soft light, 85mm, premium headscarf.',
        aspectRatio: '1:1',
        gender: 'both'
      },
      {
        title: 'Pattern Mix',
        prompt: '3/4 [gender] patterned headscarf, vibrant colors, studio light, 50mm, bold scarf fashion.',
        aspectRatio: '3:4',
        gender: 'both'
      },
      {
        title: 'Elegant Bow',
        prompt: 'Portrait [gender] scarf tied in bow, soft background, 85mm, feminine scarf styling.',
        aspectRatio: '1:1',
        gender: 'both'
      },
      {
        title: 'Summer Bandana',
        prompt: '3/4 [gender] casual bandana style, outdoor setting, natural light, 50mm, relaxed scarf look.',
        aspectRatio: '3:4',
        gender: 'both'
      },
      {
        title: 'Grace Kelly',
        prompt: 'Portrait [gender] classic Grace Kelly headscarf, elegant pose, soft light, 85mm, timeless glamour.',
        aspectRatio: '1:1',
        gender: 'female'
      }
    ]
  },

  {
    id: 'ai-fashion-week',
    name: 'AI Fashion Week',
    description: 'High fashion runway photography',
    targetImages: 10,
    prompts: [
      {
        title: 'Runway Walk',
        prompt: 'Full-body [gender] runway stride, crisp key light, 200mm feel, sleek catwalk, high-fashion runway aesthetic.',
        aspectRatio: '4:5',
        gender: 'both'
      },
      {
        title: 'Designer Showcase',
        prompt: 'Full-body [gender] in avant-garde outfit, runway lights, 50mm, fashion week premiere.',
        aspectRatio: '4:5',
        gender: 'both'
      },
      {
        title: 'Backstage Prep',
        prompt: '3/4 [gender] backstage fashion week, makeup lights, 35mm, behind-the-scenes runway.',
        aspectRatio: '3:4',
        gender: 'both'
      },
      {
        title: 'Haute Couture',
        prompt: 'Full-body [gender] haute couture gown, dramatic runway light, 85mm, luxury fashion week.',
        aspectRatio: '4:5',
        gender: 'female'
      },
      {
        title: 'Menswear Runway',
        prompt: 'Full-body [gender] designer menswear, catwalk spotlight, 50mm, men's fashion week.',
        aspectRatio: '4:5',
        gender: 'male'
      },
      {
        title: 'Front Row',
        prompt: '3/4 [gender] watching from front row, fashion week atmosphere, ambient light, 50mm.',
        aspectRatio: '3:4',
        gender: 'both'
      },
      {
        title: 'Finale Walk',
        prompt: 'Full-body [gender] finale runway moment, all lights, 50mm, closing show aesthetic.',
        aspectRatio: '4:5',
        gender: 'both'
      },
      {
        title: 'Statement Piece',
        prompt: 'Full-body [gender] bold statement outfit, dramatic runway light, 50mm, showstopper fashion.',
        aspectRatio: '4:5',
        gender: 'both'
      },
      {
        title: 'Model Lineup',
        prompt: 'Full-body [gender] in lineup, uniform lighting, 50mm, fashion week casting aesthetic.',
        aspectRatio: '3:4',
        gender: 'both'
      },
      {
        title: 'Paris Fashion',
        prompt: 'Full-body [gender] on Paris runway, luxury lighting, 50mm, Parisian fashion week.',
        aspectRatio: '4:5',
        gender: 'both'
      }
    ]
  },

  {
    id: 'korean-profile-photo',
    name: 'Korean Profile Photo',
    description: 'K-Pop Seoul fashion style',
    targetImages: 10,
    prompts: [
      {
        title: 'K-Pop Idol',
        prompt: 'Glossy studio portrait of a [gender] in Seoul-fashion layers, 85mm, clean beauty light, K-Pop aesthetic.',
        aspectRatio: '3:4',
        gender: 'both'
      },
      {
        title: 'Seoul Street',
        prompt: '3/4 [gender] Korean street fashion, Gangnam backdrop, natural light, 50mm, trendy Seoul style.',
        aspectRatio: '3:4',
        gender: 'both'
      },
      {
        title: 'K-Drama Look',
        prompt: 'Portrait [gender] K-drama aesthetic, soft romantic light, 85mm, Korean drama character.',
        aspectRatio: '1:1',
        gender: 'both'
      },
      {
        title: 'Cafe Aesthetic',
        prompt: '3/4 [gender] at Seoul café, modern interior, window light, 50mm, Korean café culture.',
        aspectRatio: '3:4',
        gender: 'both'
      },
      {
        title: 'Hanbok Modern',
        prompt: 'Full-body [gender] modern hanbok fusion, traditional meets contemporary, 50mm, new Korean style.',
        aspectRatio: '3:4',
        gender: 'both'
      },
      {
        title: 'K-Beauty Glow',
        prompt: 'Close portrait [gender] glass skin, dewy makeup, soft beauty light, 85mm, K-beauty aesthetic.',
        aspectRatio: '1:1',
        gender: 'both'
      },
      {
        title: 'Seoul Fashion',
        prompt: 'Full-body [gender] trendy Korean outfit, Myeongdong shopping, bright daylight, 35mm.',
        aspectRatio: '3:4',
        gender: 'both'
      },
      {
        title: 'Idol Concept',
        prompt: '3/4 [gender] K-pop concept photo, colorful set, studio light, 50mm, album cover aesthetic.',
        aspectRatio: '3:4',
        gender: 'both'
      },
      {
        title: 'Ulzzang Style',
        prompt: 'Portrait [gender] ulzzang makeup, bright studio, 85mm, Korean influencer aesthetic.',
        aspectRatio: '1:1',
        gender: 'both'
      },
      {
        title: 'Nightlife Seoul',
        prompt: '3/4 [gender] at Seoul night club, neon lights, 35mm, Korean nightlife fashion.',
        aspectRatio: '3:4',
        gender: 'both'
      }
    ]
  },

  {
    id: 'puffer-jacket-viral',
    name: 'Puffer Jacket Viral',
    description: 'Viral puffer jacket moment',
    targetImages: 10,
    prompts: [
      {
        title: 'Puffer Classic',
        prompt: '3/4 [gender] in glossy puffer, street background, cool overcast, 35mm, fashion-editorial puffer aesthetic.',
        aspectRatio: '3:4',
        gender: 'both'
      },
      {
        title: 'Pope Viral',
        prompt: 'Full-body [gender] white puffer jacket, dramatic light, 50mm, viral AI moment recreation.',
        aspectRatio: '3:4',
        gender: 'both'
      },
      {
        title: 'Street Puffer',
        prompt: '3/4 [gender] oversized puffer, urban street, natural overcast, 35mm, streetwear puffer.',
        aspectRatio: '3:4',
        gender: 'both'
      },
      {
        title: 'Luxury Puffer',
        prompt: 'Full-body [gender] designer puffer, city backdrop, soft light, 50mm, high-end puffer fashion.',
        aspectRatio: '3:4',
        gender: 'both'
      },
      {
        title: 'Neon Puffer',
        prompt: '3/4 [gender] bright colored puffer, urban night, neon lights, 35mm, bold puffer style.',
        aspectRatio: '3:4',
        gender: 'both'
      },
      {
        title: 'Cropped Puffer',
        prompt: 'Full-body [gender] cropped puffer jacket, fashion street, natural light, 50mm, trendy puffer.',
        aspectRatio: '3:4',
        gender: 'both'
      },
      {
        title: 'Vintage Puffer',
        prompt: '3/4 [gender] retro puffer style, 90s aesthetic, overcast, 35mm, nostalgic puffer look.',
        aspectRatio: '3:4',
        gender: 'both'
      },
      {
        title: 'Shiny Puffer',
        prompt: 'Full-body [gender] metallic puffer, reflective surface, studio light, 50mm, glossy puffer.',
        aspectRatio: '3:4',
        gender: 'both'
      },
      {
        title: 'Long Puffer',
        prompt: '3/4 [gender] long puffer coat, winter city, cold light, 50mm, winter puffer aesthetic.',
        aspectRatio: '3:4',
        gender: 'both'
      },
      {
        title: 'Color Block',
        prompt: 'Full-body [gender] color-block puffer, urban backdrop, bright day, 35mm, playful puffer.',
        aspectRatio: '3:4',
        gender: 'both'
      }
    ]
  },

  {
    id: 'ai-nude-outfits',
    name: 'AI Nude Outfits',
    description: 'Nude-toned elegant clothing',
    targetImages: 10,
    prompts: [
      {
        title: 'Nude Tone Elegant',
        prompt: '3/4 [gender] wearing nude-tone outfits that match skin, soft studio, 50mm, elegant, non-explicit sophisticated aesthetic.',
        aspectRatio: '3:4',
        gender: 'both'
      },
      {
        title: 'Monochrome Nude',
        prompt: 'Full-body [gender] nude-colored dress, neutral background, soft light, 50mm, timeless nude fashion.',
        aspectRatio: '3:4',
        gender: 'both'
      },
      {
        title: 'Beige Elegance',
        prompt: '3/4 [gender] beige tone ensemble, studio setting, natural light, 50mm, sophisticated neutrals.',
        aspectRatio: '3:4',
        gender: 'both'
      },
      {
        title: 'Skin Tone Match',
        prompt: 'Full-body [gender] outfit matching skin tone, clean backdrop, soft light, 50mm, cohesive aesthetic.',
        aspectRatio: '3:4',
        gender: 'both'
      },
      {
        title: 'Champagne Tones',
        prompt: '3/4 [gender] champagne-colored attire, elegant setting, 50mm, luxe nude palette.',
        aspectRatio: '3:4',
        gender: 'both'
      },
      {
        title: 'Taupe Fashion',
        prompt: 'Full-body [gender] taupe outfit, neutral studio, soft key, 50mm, earthy nude tones.',
        aspectRatio: '3:4',
        gender: 'both'
      },
      {
        title: 'Blush Nude',
        prompt: '3/4 [gender] blush pink nude, soft romantic light, 50mm, feminine nude aesthetic.',
        aspectRatio: '3:4',
        gender: 'both'
      },
      {
        title: 'Sand Tones',
        prompt: 'Full-body [gender] sand-colored ensemble, natural backdrop, 50mm, desert nude palette.',
        aspectRatio: '3:4',
        gender: 'both'
      },
      {
        title: 'Cream Sophistication',
        prompt: '3/4 [gender] cream outfit, elegant setting, soft light, 50mm, refined nude fashion.',
        aspectRatio: '3:4',
        gender: 'both'
      },
      {
        title: 'Nude Layers',
        prompt: 'Full-body [gender] layered nude tones, studio light, 50mm, tonal nude sophistication.',
        aspectRatio: '3:4',
        gender: 'both'
      }
    ]
  }
];

/**
 * ═══════════════════════════════════════════════════════════════
 * 💪 FITNESS & SPORTS (CATÉGORIES MANQUANTES)
 * ═══════════════════════════════════════════════════════════════
 */

export const fitnessSportsMissing: FluxCategoryConfig[] = [
  {
    id: 'fitness-influencer-pro',
    name: 'Fitness Influencer',
    description: 'Professional fitness influencer content',
    targetImages: 10,
    prompts: [
      {
        title: 'Gym Influencer',
        prompt: 'Gym mirror 3/4 [gender], neon accent, 35mm, defined, confident stance, fitness influencer aesthetic.',
        aspectRatio: '9:16',
        gender: 'both'
      },
      {
        title: 'Progress Photo',
        prompt: 'Mirror selfie [gender] showing physique, gym light, smartphone angle, fitness transformation.',
        aspectRatio: '9:16',
        gender: 'both'
      },
      {
        title: 'Workout Action',
        prompt: 'Action 3/4 [gender] mid-exercise, dramatic gym light, 35mm, fitness content creation.',
        aspectRatio: '9:16',
        gender: 'both'
      },
      {
        title: 'Protein Shake',
        prompt: '3/4 [gender] with protein shake, gym background, natural light, 50mm, nutrition influencer.',
        aspectRatio: '9:16',
        gender: 'both'
      },
      {
        title: 'Outdoor Fitness',
        prompt: 'Full-body [gender] outdoor workout, park setting, natural sun, 35mm, fitness lifestyle.',
        aspectRatio: '4:5',
        gender: 'both'
      },
      {
        title: 'Gym Equipment',
        prompt: '3/4 [gender] with weights, gym environment, hard light, 35mm, strength training content.',
        aspectRatio: '9:16',
        gender: 'both'
      },
      {
        title: 'Athleisure Style',
        prompt: 'Full-body [gender] in athleisure, urban backdrop, natural light, 35mm, fitness fashion influencer.',
        aspectRatio: '4:5',
        gender: 'both'
      },
      {
        title: 'Pre-Workout',
        prompt: '3/4 [gender] energetic pre-workout, gym setting, bright light, 35mm, motivated fitness content.',
        aspectRatio: '9:16',
        gender: 'both'
      },
      {
        title: 'Fitness Journey',
        prompt: 'Full-body [gender] transformation pose, neutral background, even light, 50mm, progress documentation.',
        aspectRatio: '3:4',
        gender: 'both'
      },
      {
        title: 'Gym Lifestyle',
        prompt: '3/4 [gender] gym bag and gear, locker room, practical light, 35mm, fitness lifestyle brand.',
        aspectRatio: '9:16',
        gender: 'both'
      }
    ]
  },

  {
    id: 'cheerleader-sports',
    name: 'Cheerleader Sports',
    description: 'Energetic cheerleader photography',
    targetImages: 10,
    prompts: [
      {
        title: 'Cheerleader Action',
        prompt: 'Action mid-kick [gender] with pom-poms, stadium dusk, 200mm feel, high energy, cheerleading aesthetic.',
        aspectRatio: '4:5',
        gender: 'both'
      },
      {
        title: 'Cheer Squad',
        prompt: 'Full-body [gender] cheerleader uniform, field background, bright daylight, 50mm, team spirit.',
        aspectRatio: '4:5',
        gender: 'both'
      },
      {
        title: 'Pom-Pom Jump',
        prompt: 'Action [gender] jumping with pom-poms, outdoor stadium, 35mm, dynamic cheer moment.',
        aspectRatio: '4:5',
        gender: 'both'
      },
      {
        title: 'Sideline Cheer',
        prompt: '3/4 [gender] cheering from sideline, game atmosphere, natural light, 50mm, supportive energy.',
        aspectRatio: '3:4',
        gender: 'both'
      },
      {
        title: 'Cheer Routine',
        prompt: 'Full-body [gender] choreographed move, practice gym, bright light, 35mm, synchronized cheer.',
        aspectRatio: '4:5',
        gender: 'both'
      },
      {
        title: 'Spirit Fingers',
        prompt: 'Close-up [gender] spirit hands, stadium background, bright light, 50mm, enthusiastic cheer.',
        aspectRatio: '1:1',
        gender: 'both'
      },
      {
        title: 'Competition Cheer',
        prompt: 'Action [gender] competition routine, indoor arena, spotlight, 35mm, competitive cheerleading.',
        aspectRatio: '4:5',
        gender: 'both'
      },
      {
        title: 'School Spirit',
        prompt: 'Full-body [gender] school colors, football field, golden hour, 50mm, school pride aesthetic.',
        aspectRatio: '4:5',
        gender: 'both'
      },
      {
        title: 'Megaphone Moment',
        prompt: '3/4 [gender] with megaphone, crowd background, bright daylight, 50mm, rallying spirit.',
        aspectRatio: '3:4',
        gender: 'both'
      },
      {
        title: 'Cheer Portrait',
        prompt: 'Portrait [gender] cheerleader smile, clean background, soft light, 85mm, team photo aesthetic.',
        aspectRatio: '1:1',
        gender: 'both'
      }
    ]
  }
];

/**
 * EXPORT TOUS LES PROMPTS MANQUANTS
 */

export const allMissingPrompts: FluxCategoryConfig[] = [
  // Les catégories seront combinées dans un fichier final index
];

// Le fichier continue dans le prochain fichier car il est encore trop long...
// Il reste : Events & Parties, Cosplay & Fantasy, Creative Portraits, Adult Content, Retro manquants, Lifestyle manquants
