/**
 * 🎨 PHOTOGLOW - PROMPTS FLUX OPTIMISÉS COMPLETS (PARTIE 3/3 - FINALE)
 * 
 * Dernières catégories manquantes : Events, Cosplay, Creative, Adult, Retro, Lifestyle
 */

import { FluxCategoryConfig } from './fluxOptimizedPrompts';

/**
 * ═══════════════════════════════════════════════════════════════
 * 🎉 EVENTS & PARTIES (PRESQUE TOUTES MANQUANTES)
 * ═══════════════════════════════════════════════════════════════
 */

export const eventsPartiesMissing: FluxCategoryConfig[] = [
  {
    id: 'met-gala',
    name: 'Met Gala',
    description: 'Fashion\'s biggest night red carpet',
    targetImages: 10,
    prompts: [
      {
        title: 'Met Gala Red Carpet',
        prompt: 'Red-carpet full-body [gender] in couture, paparazzi flash pit, 50mm, glamorous Met Gala aesthetic.',
        aspectRatio: '3:4',
        gender: 'both'
      },
      {
        title: 'Avant-Garde Gown',
        prompt: 'Full-body [gender] avant-garde outfit, dramatic carpet lighting, 50mm, fashion art couture.',
        aspectRatio: '3:4',
        gender: 'both'
      },
      {
        title: 'Theme Interpretation',
        prompt: '3/4 [gender] themed Met look, museum steps, flash photography, 50mm, conceptual fashion.',
        aspectRatio: '3:4',
        gender: 'both'
      },
      {
        title: 'Designer Moment',
        prompt: 'Full-body [gender] designer masterpiece, red carpet spotlight, 50mm, high fashion statement.',
        aspectRatio: '3:4',
        gender: 'both'
      },
      {
        title: 'Posed Excellence',
        prompt: '3/4 [gender] signature pose, step-and-repeat, camera flash, 50mm, iconic Met moment.',
        aspectRatio: '3:4',
        gender: 'both'
      },
      {
        title: 'Entrance Grand',
        prompt: 'Full-body [gender] grand staircase entrance, dramatic light, 50mm, Met Gala arrival.',
        aspectRatio: '3:4',
        gender: 'both'
      },
      {
        title: 'Headpiece Drama',
        prompt: '3/4 [gender] with elaborate headpiece, red carpet, flash lights, 50mm, statement accessory.',
        aspectRatio: '3:4',
        gender: 'both'
      },
      {
        title: 'Cape Moment',
        prompt: 'Full-body [gender] dramatic cape, museum entrance, spotlight, 50mm, flowing fashion drama.',
        aspectRatio: '3:4',
        gender: 'both'
      },
      {
        title: 'Gender Fluid Fashion',
        prompt: '3/4 [gender] gender-bending look, avant-garde lighting, 50mm, progressive Met fashion.',
        aspectRatio: '3:4',
        gender: 'both'
      },
      {
        title: 'After Party Glam',
        prompt: 'Full-body [gender] at Met after-party, luxury venue, ambient light, 50mm, celebration glamour.',
        aspectRatio: '3:4',
        gender: 'both'
      }
    ]
  },

  {
    id: 'college-party',
    name: 'College Party',
    description: 'Wild candid college party moments',
    targetImages: 10,
    prompts: [
      {
        title: 'College Party Flash',
        prompt: 'Flash-lit candid of a [gender] with red cup in messy kitchen, on-camera flash, 35mm, spontaneous retro party vibe.',
        aspectRatio: '3:4',
        gender: 'both'
      },
      {
        title: 'Beer Pong',
        prompt: 'Action [gender] playing beer pong, party lights, on-camera flash, 35mm, college game night.',
        aspectRatio: '3:4',
        gender: 'both'
      },
      {
        title: 'Dance Floor',
        prompt: 'Full-body [gender] dancing at house party, colorful lights, 35mm, wild party energy.',
        aspectRatio: '3:4',
        gender: 'both'
      },
      {
        title: 'Red Solo Cup',
        prompt: '3/4 [gender] cheersing with red cups, flash photo, 35mm, iconic college party moment.',
        aspectRatio: '3:4',
        gender: 'both'
      },
      {
        title: 'Frat Party',
        prompt: 'Candid [gender] at frat house party, messy background, flash, 35mm, fraternity party scene.',
        aspectRatio: '3:4',
        gender: 'both'
      },
      {
        title: 'Keg Stand',
        prompt: 'Action [gender] at keg, party crowd, on-camera flash, 35mm, college ritual moment.',
        aspectRatio: '3:4',
        gender: 'both'
      },
      {
        title: 'Group Shot',
        prompt: 'Group [gender] and friends partying, flash photo, 35mm, college friends celebration.',
        aspectRatio: '16:9',
        gender: 'both'
      },
      {
        title: 'Dorm Party',
        prompt: '3/4 [gender] in dorm room party, string lights, flash, 35mm, cramped party aesthetic.',
        aspectRatio: '3:4',
        gender: 'both'
      },
      {
        title: 'Late Night',
        prompt: 'Candid [gender] 2AM party, tired energy, flash, 35mm, all-nighter party vibe.',
        aspectRatio: '3:4',
        gender: 'both'
      },
      {
        title: 'Themed Party',
        prompt: 'Full-body [gender] in party costume, house party, flash light, 35mm, costume party fun.',
        aspectRatio: '3:4',
        gender: 'both'
      }
    ]
  },

  {
    id: 'music-festival',
    name: 'Music Festival',
    description: 'Vibrant music festival energy',
    targetImages: 10,
    prompts: [
      {
        title: 'Festival Crowd',
        prompt: 'Full-body [gender] in festival outfit, crowd lights, dusk, 35mm, music festival energy.',
        aspectRatio: '4:5',
        gender: 'both'
      },
      {
        title: 'Main Stage',
        prompt: '3/4 [gender] watching main stage, concert lights, 35mm, festival performance moment.',
        aspectRatio: '3:4',
        gender: 'both'
      },
      {
        title: 'Flower Crown',
        prompt: 'Full-body [gender] with flower crown, festival grounds, golden hour, 35mm, boho festival style.',
        aspectRatio: '4:5',
        gender: 'both'
      },
      {
        title: 'Dance Vibes',
        prompt: 'Action [gender] dancing at EDM stage, colorful lights, night, 35mm, electronic festival energy.',
        aspectRatio: '4:5',
        gender: 'both'
      },
      {
        title: 'Festival Fashion',
        prompt: '3/4 [gender] trendy festival outfit, vendor background, bright daylight, 50mm, festival style.',
        aspectRatio: '3:4',
        gender: 'both'
      },
      {
        title: 'Sunset Set',
        prompt: 'Full-body [gender] at sunset stage, warm backlight, 35mm, golden hour festival moment.',
        aspectRatio: '4:5',
        gender: 'both'
      },
      {
        title: 'Group Festival',
        prompt: 'Wide shot [gender] with festival friends, stage background, dusk, 35mm, friendship celebration.',
        aspectRatio: '16:9',
        gender: 'both'
      },
      {
        title: 'Glitter Makeup',
        prompt: 'Close-up [gender] with festival glitter, bright daylight, 85mm, creative festival makeup.',
        aspectRatio: '1:1',
        gender: 'both'
      },
      {
        title: 'Camping Area',
        prompt: '3/4 [gender] at festival campsite, casual vibe, natural light, 35mm, festival camping life.',
        aspectRatio: '3:4',
        gender: 'both'
      },
      {
        title: 'Silent Disco',
        prompt: 'Full-body [gender] with headphones dancing, colored lights, night, 35mm, silent disco fun.',
        aspectRatio: '4:5',
        gender: 'both'
      }
    ]
  },

  {
    id: 'pre-wedding-engagement',
    name: 'Pre-Wedding Engagement',
    description: 'Romantic engagement photoshoot',
    targetImages: 10,
    prompts: [
      {
        title: 'Engagement Portrait',
        prompt: 'Couple 3/4 at golden hour park, hand-in-hand, 50mm, romantic soft glow, engagement love.',
        aspectRatio: '3:4',
        gender: 'both'
      },
      {
        title: 'Proposal Moment',
        prompt: 'Full-body couple [gender] proposal scene, sunset backdrop, 50mm, emotional engagement moment.',
        aspectRatio: '4:5',
        gender: 'both'
      },
      {
        title: 'Ring Shot',
        prompt: 'Close-up [gender] showing engagement ring, soft natural light, 85mm, ring detail aesthetic.',
        aspectRatio: '1:1',
        gender: 'both'
      },
      {
        title: 'Beach Engagement',
        prompt: 'Full-body couple [gender] on beach, golden hour waves, 35mm, romantic coastal engagement.',
        aspectRatio: '4:5',
        gender: 'both'
      },
      {
        title: 'Urban Love',
        prompt: '3/4 couple [gender] city rooftop, sunset skyline, 50mm, urban romantic engagement.',
        aspectRatio: '3:4',
        gender: 'both'
      },
      {
        title: 'Garden Romance',
        prompt: 'Full-body couple [gender] in flower garden, soft daylight, 50mm, natural romantic setting.',
        aspectRatio: '4:5',
        gender: 'both'
      },
      {
        title: 'Intimate Moment',
        prompt: 'Close couple [gender] foreheads touching, soft backlight, 85mm, tender engagement intimacy.',
        aspectRatio: '3:4',
        gender: 'both'
      },
      {
        title: 'Celebration Joy',
        prompt: '3/4 couple [gender] celebrating, champagne toast, warm light, 50mm, joyful engagement.',
        aspectRatio: '3:4',
        gender: 'both'
      },
      {
        title: 'Walking Together',
        prompt: 'Full-body couple [gender] walking path, dappled sunlight, 35mm, journey together aesthetic.',
        aspectRatio: '4:5',
        gender: 'both'
      },
      {
        title: 'Kissing Silhouette',
        prompt: 'Silhouette couple [gender] kissing, sunset backlight, 50mm, romantic engagement silhouette.',
        aspectRatio: '3:4',
        gender: 'both'
      }
    ]
  },

  {
    id: 'wedding-day',
    name: 'Wedding Day',
    description: 'Dream wedding photography',
    targetImages: 10,
    prompts: [
      {
        title: 'Wedding Ceremony',
        prompt: 'Couple portrait at terrace sunset, veil movement, 50mm, romantic, soft highlights, wedding day magic.',
        aspectRatio: '3:4',
        gender: 'both'
      },
      {
        title: 'Bridal Portrait',
        prompt: 'Full-body [gender] bride in wedding dress, soft window light, 85mm, elegant bridal aesthetic.',
        aspectRatio: '3:4',
        gender: 'female'
      },
      {
        title: 'Groom Classic',
        prompt: '3/4 [gender] groom in tuxedo, formal venue, soft light, 50mm, classic groom portrait.',
        aspectRatio: '3:4',
        gender: 'male'
      },
      {
        title: 'First Look',
        prompt: 'Couple [gender] first look moment, emotional reaction, soft daylight, 50mm, touching wedding moment.',
        aspectRatio: '3:4',
        gender: 'both'
      },
      {
        title: 'Aisle Walk',
        prompt: 'Full-body [gender] bride walking aisle, church light, 50mm, processional moment, wedding ceremony.',
        aspectRatio: '4:5',
        gender: 'female'
      },
      {
        title: 'Vows Exchange',
        prompt: '3/4 couple [gender] exchanging vows, altar background, soft light, 50mm, intimate wedding vows.',
        aspectRatio: '16:9',
        gender: 'both'
      },
      {
        title: 'First Kiss',
        prompt: 'Couple [gender] first kiss as married, celebration moment, 50mm, joyful wedding kiss.',
        aspectRatio: '3:4',
        gender: 'both'
      },
      {
        title: 'Reception Dance',
        prompt: 'Full-body couple [gender] first dance, reception lights, 50mm, romantic dance moment.',
        aspectRatio: '3:4',
        gender: 'both'
      },
      {
        title: 'Bouquet Toss',
        prompt: 'Action [gender] bride throwing bouquet, reception crowd, 35mm, fun wedding tradition.',
        aspectRatio: '4:5',
        gender: 'female'
      },
      {
        title: 'Sunset Portraits',
        prompt: 'Couple [gender] at sunset, golden hour glow, 85mm, romantic wedding golden hour.',
        aspectRatio: '3:4',
        gender: 'both'
      }
    ]
  },

  {
    id: 'maternity',
    name: 'Maternity Photography',
    description: 'Beautiful pregnancy photoshoot',
    targetImages: 10,
    prompts: [
      {
        title: 'Maternity Classic',
        prompt: 'Soft 3/4 [gender] holding belly in airy studio whites, 85mm, gentle glow, pregnancy beauty.',
        aspectRatio: '3:4',
        gender: 'female'
      },
      {
        title: 'Outdoor Maternity',
        prompt: 'Full-body [gender] pregnant in flowing dress, golden hour field, 50mm, natural pregnancy glow.',
        aspectRatio: '4:5',
        gender: 'female'
      },
      {
        title: 'Belly Focus',
        prompt: 'Close-up [gender] hands on belly, soft window light, 85mm, intimate pregnancy detail.',
        aspectRatio: '1:1',
        gender: 'female'
      },
      {
        title: 'Couple Maternity',
        prompt: '3/4 couple with [gender] pregnant, tender moment, soft light, 50mm, expecting parents love.',
        aspectRatio: '3:4',
        gender: 'both'
      },
      {
        title: 'Silhouette Pregnancy',
        prompt: 'Silhouette [gender] pregnant profile, window backlight, 85mm, artistic maternity silhouette.',
        aspectRatio: '3:4',
        gender: 'female'
      },
      {
        title: 'Floral Maternity',
        prompt: 'Full-body [gender] pregnant with flowers, garden setting, soft daylight, 50mm, natural beauty.',
        aspectRatio: '4:5',
        gender: 'female'
      },
      {
        title: 'Home Maternity',
        prompt: '3/4 [gender] in nursery, warm home light, 50mm, preparing for baby, intimate home moment.',
        aspectRatio: '3:4',
        gender: 'female'
      },
      {
        title: 'Beach Maternity',
        prompt: 'Full-body [gender] pregnant on beach, flowing fabric, golden hour, 50mm, coastal pregnancy beauty.',
        aspectRatio: '4:5',
        gender: 'female'
      },
      {
        title: 'Studio Elegance',
        prompt: '3/4 [gender] elegant pregnancy pose, studio seamless, soft beauty light, 85mm, timeless maternity.',
        aspectRatio: '3:4',
        gender: 'female'
      },
      {
        title: 'Family Waiting',
        prompt: 'Full group with pregnant [gender], family excitement, home setting, 35mm, growing family joy.',
        aspectRatio: '16:9',
        gender: 'female'
      }
    ]
  },

  {
    id: 'graduation',
    name: 'Graduation Celebration',
    description: 'University graduation photos',
    targetImages: 10,
    prompts: [
      {
        title: 'Graduation Pride',
        prompt: 'Full-body [gender] in cap and gown on campus steps, golden hour, 50mm, celebratory graduation moment.',
        aspectRatio: '3:4',
        gender: 'both'
      },
      {
        title: 'Cap Toss',
        prompt: 'Action [gender] throwing graduation cap, blue sky, 35mm, iconic graduation celebration.',
        aspectRatio: '4:5',
        gender: 'both'
      },
      {
        title: 'Diploma Proud',
        prompt: '3/4 [gender] holding diploma, campus background, bright daylight, 50mm, achievement pride.',
        aspectRatio: '3:4',
        gender: 'both'
      },
      {
        title: 'With Family',
        prompt: 'Group [gender] graduate with family, campus setting, natural light, 35mm, family celebration.',
        aspectRatio: '16:9',
        gender: 'both'
      },
      {
        title: 'Library Scholar',
        prompt: '3/4 [gender] in regalia at library, academic setting, soft light, 50mm, scholarly achievement.',
        aspectRatio: '3:4',
        gender: 'both'
      },
      {
        title: 'Ceremony Walk',
        prompt: 'Full-body [gender] walking to ceremony, processional, outdoor daylight, 50mm, graduation day.',
        aspectRatio: '4:5',
        gender: 'both'
      },
      {
        title: 'Friends Graduate',
        prompt: 'Group [gender] graduates together, celebration energy, campus, 35mm, friendship graduation.',
        aspectRatio: '16:9',
        gender: 'both'
      },
      {
        title: 'Solo Achievement',
        prompt: 'Portrait [gender] graduate confident smile, neutral background, 85mm, personal achievement.',
        aspectRatio: '1:1',
        gender: 'both'
      },
      {
        title: 'Tassel Turn',
        prompt: 'Close-up [gender] turning tassel, graduation cap detail, 85mm, symbolic graduation moment.',
        aspectRatio: '1:1',
        gender: 'both'
      },
      {
        title: 'Campus Sunset',
        prompt: 'Full-body [gender] graduate at campus landmark, golden hour, 50mm, nostalgic graduation portrait.',
        aspectRatio: '3:4',
        gender: 'both'
      }
    ]
  },

  {
    id: 'pink-birthday-picnic',
    name: 'Pink Birthday Picnic',
    description: 'Dreamy pink outdoor birthday party',
    targetImages: 8,
    prompts: [
      {
        title: 'Pink Picnic',
        prompt: 'Outdoor picnic 3/4 [gender], pink cake/balloons, noon shade, 50mm, pastel birthday aesthetic.',
        aspectRatio: '3:4',
        gender: 'both'
      },
      {
        title: 'Birthday Cake',
        prompt: '3/4 [gender] with pink birthday cake, outdoor setting, soft daylight, 50mm, celebration sweetness.',
        aspectRatio: '3:4',
        gender: 'both'
      },
      {
        title: 'Balloon Bunch',
        prompt: 'Full-body [gender] holding pink balloons, park background, bright daylight, 35mm, playful birthday.',
        aspectRatio: '4:5',
        gender: 'both'
      },
      {
        title: 'Picnic Blanket',
        prompt: 'Overhead [gender] on pink picnic spread, food styling, natural light, creative birthday layout.',
        aspectRatio: '1:1',
        gender: 'both'
      },
      {
        title: 'Birthday Crown',
        prompt: '3/4 [gender] wearing birthday crown, pink décor, outdoor light, 50mm, princess birthday vibes.',
        aspectRatio: '3:4',
        gender: 'both'
      },
      {
        title: 'Friends Celebration',
        prompt: 'Group [gender] at pink picnic, birthday fun, natural daylight, 35mm, friendship party.',
        aspectRatio: '16:9',
        gender: 'both'
      },
      {
        title: 'Flower Decoration',
        prompt: 'Full-body [gender] with pink flower decorations, garden picnic, soft light, 50mm, floral birthday.',
        aspectRatio: '3:4',
        gender: 'both'
      },
      {
        title: 'Champagne Toast',
        prompt: '3/4 [gender] toasting at pink picnic, celebratory moment, natural light, 50mm, elegant birthday.',
        aspectRatio: '3:4',
        gender: 'both'
      }
    ]
  },

  {
    id: 'born-in-usa',
    name: 'Born In The U.S.A.',
    description: 'American patriotic photography',
    targetImages: 8,
    prompts: [
      {
        title: 'American Flag',
        prompt: '3/4 [gender] with American flag, patriotic setting, golden hour, 50mm, optimistic USA pride.',
        aspectRatio: '3:4',
        gender: 'both'
      },
      {
        title: 'Fourth of July',
        prompt: 'Full-body [gender] in red/white/blue, celebration setting, bright daylight, 35mm, Independence Day.',
        aspectRatio: '4:5',
        gender: 'both'
      },
      {
        title: 'Small Town America',
        prompt: '3/4 [gender] on Main Street USA, small-town backdrop, golden hour, 50mm, Americana nostalgia.',
        aspectRatio: '3:4',
        gender: 'both'
      },
      {
        title: 'Pickup Truck',
        prompt: 'Full-body [gender] with classic American truck, rural setting, sunset, 50mm, classic USA aesthetic.',
        aspectRatio: '3:4',
        gender: 'both'
      },
      {
        title: 'Baseball Field',
        prompt: '3/4 [gender] at baseball diamond, American sport, golden hour, 50mm, all-American pastime.',
        aspectRatio: '3:4',
        gender: 'both'
      },
      {
        title: 'Diner Classic',
        prompt: 'Full-body [gender] at American diner, retro Americana, warm interior light, 50mm, classic USA.',
        aspectRatio: '3:4',
        gender: 'both'
      },
      {
        title: 'Route 66',
        prompt: '3/4 [gender] on historic highway, open road, golden hour, 50mm, American road trip.',
        aspectRatio: '3:4',
        gender: 'both'
      },
      {
        title: 'Patriotic Portrait',
        prompt: 'Portrait [gender] with subtle patriotic elements, clean background, 85mm, proud American.',
        aspectRatio: '1:1',
        gender: 'both'
      }
    ]
  },

  {
    id: 'made-in-europe',
    name: 'Made In Europe',
    description: 'European pride photography',
    targetImages: 8,
    prompts: [
      {
        title: 'European Pride',
        prompt: '3/4 [gender] near European landmark, overcast soft light, 50mm, optimistic European identity.',
        aspectRatio: '3:4',
        gender: 'both'
      },
      {
        title: 'EU Flag',
        prompt: 'Full-body [gender] with EU flag, Brussels backdrop, natural light, 35mm, European unity.',
        aspectRatio: '3:4',
        gender: 'both'
      },
      {
        title: 'Historic Europe',
        prompt: '3/4 [gender] at historic monument, European architecture, soft overcast, 50mm, cultural heritage.',
        aspectRatio: '3:4',
        gender: 'both'
      },
      {
        title: 'Café Culture',
        prompt: 'Full-body [gender] at European café terrace, charming street, natural light, 50mm, European lifestyle.',
        aspectRatio: '3:4',
        gender: 'both'
      },
      {
        title: 'Cycling Europe',
        prompt: '3/4 [gender] with bicycle, European city street, overcast, 35mm, European mobility.',
        aspectRatio: '3:4',
        gender: 'both'
      },
      {
        title: 'Market Square',
        prompt: 'Full-body [gender] at European market, vibrant atmosphere, natural light, 35mm, local culture.',
        aspectRatio: '3:4',
        gender: 'both'
      },
      {
        title: 'Coastal Europe',
        prompt: '3/4 [gender] at Mediterranean coast, blue waters, bright sun, 50mm, European seaside.',
        aspectRatio: '3:4',
        gender: 'both'
      },
      {
        title: 'Urban European',
        prompt: 'Full-body [gender] on cobblestone street, historic buildings, soft light, 50mm, European charm.',
        aspectRatio: '3:4',
        gender: 'both'
      }
    ]
  }
];

/**
 * ═══════════════════════════════════════════════════════════════
 * 🎭 COSPLAY & FANTASY (CATÉGORIES MANQUANTES)
 * ═══════════════════════════════════════════════════════════════
 */

export const cosplayFantasyMissing: FluxCategoryConfig[] = [
  {
    id: 'e-girl-cosplay',
    name: 'E-Girl Cosplay',
    description: 'Alternative E-girl aesthetic',
    targetImages: 10,
    prompts: [
      {
        title: 'E-Girl Classic',
        prompt: '3/4 [gender] with alt makeup, neon accents, bedroom set, 50mm, edgy cute e-girl aesthetic.',
        aspectRatio: '9:16',
        gender: 'both'
      },
      {
        title: 'Gamer E-Girl',
        prompt: '3/4 [gender] at gaming RGB setup, LED lights, 35mm, gaming e-girl, streaming aesthetic.',
        aspectRatio: '16:9',
        gender: 'both'
      },
      {
        title: 'TikTok E-Girl',
        prompt: 'Close-up [gender] with heart stamps, ring light, smartphone feel, TikTok e-girl trending.',
        aspectRatio: '9:16',
        gender: 'both'
      },
      {
        title: 'Alt Fashion',
        prompt: 'Full-body [gender] alt fashion outfit, urban grunge, 35mm, alternative e-girl style.',
        aspectRatio: '4:5',
        gender: 'both'
      },
      {
        title: 'Neon Hair',
        prompt: '3/4 [gender] with colorful hair, RGB lighting, 50mm, vibrant e-girl aesthetic.',
        aspectRatio: '9:16',
        gender: 'both'
      },
      {
        title: 'Bedroom Streamer',
        prompt: '3/4 [gender] streaming setup, LED strips, 35mm, content creator e-girl vibe.',
        aspectRatio: '16:9',
        gender: 'both'
      },
      {
        title: 'Chain Accessories',
        prompt: 'Close-up [gender] with chain jewelry, dramatic light, 85mm, edgy e-girl accessories.',
        aspectRatio: '1:1',
        gender: 'both'
      },
      {
        title: 'Anime Inspired',
        prompt: '3/4 [gender] anime-style makeup, pastel background, 50mm, kawaii e-girl blend.',
        aspectRatio: '9:16',
        gender: 'both'
      },
      {
        title: 'Dark E-Girl',
        prompt: 'Full-body [gender] dark grunge outfit, urban alley, 35mm, gothic e-girl aesthetic.',
        aspectRatio: '4:5',
        gender: 'both'
      },
      {
        title: 'Twitch Aesthetic',
        prompt: '3/4 [gender] at streaming desk, RGB background, webcam angle, Twitch e-girl style.',
        aspectRatio: '16:9',
        gender: 'both'
      }
    ]
  },

  {
    id: 'celebrity-fantasy',
    name: 'Celebrity For A Day',
    description: 'Celebrity lifestyle moments',
    targetImages: 10,
    prompts: [
      {
        title: 'Red Carpet Star',
        prompt: 'Press-line 3/4 [gender], step-and-repeat, strobe highlights, 50mm, celebrity star presence.',
        aspectRatio: '3:4',
        gender: 'both'
      },
      {
        title: 'Paparazzi Moment',
        prompt: 'Full-body [gender] arrival scene, camera flashes, 35mm, celebrity paparazzi attention.',
        aspectRatio: '3:4',
        gender: 'both'
      },
      {
        title: 'Talk Show Guest',
        prompt: '3/4 [gender] on talk show set, studio lights, 50mm, celebrity interview moment.',
        aspectRatio: '16:9',
        gender: 'both'
      },
      {
        title: 'Award Show',
        prompt: 'Full-body [gender] at award ceremony, elegant attire, spotlight, 50mm, celebrity awards night.',
        aspectRatio: '3:4',
        gender: 'both'
      },
      {
        title: 'Magazine Cover',
        prompt: 'Portrait [gender] celebrity cover shot, professional lighting, 85mm, magazine star aesthetic.',
        aspectRatio: '3:4',
        gender: 'both'
      },
      {
        title: 'VIP Event',
        prompt: '3/4 [gender] at exclusive event, luxury venue, ambient light, 50mm, VIP celebrity status.',
        aspectRatio: '3:4',
        gender: 'both'
      },
      {
        title: 'Movie Premiere',
        prompt: 'Full-body [gender] at film premiere, theater marquee, flash photography, 50mm, Hollywood star.',
        aspectRatio: '3:4',
        gender: 'both'
      },
      {
        title: 'Fashion Event',
        prompt: '3/4 [gender] front row fashion show, chic outfit, event lighting, 50mm, celebrity fashion presence.',
        aspectRatio: '3:4',
        gender: 'both'
      },
      {
        title: 'Charity Gala',
        prompt: 'Full-body [gender] at charity event, formal evening wear, elegant venue, 50mm, philanthropic celebrity.',
        aspectRatio: '3:4',
        gender: 'both'
      },
      {
        title: 'Street Spotted',
        prompt: '3/4 [gender] celebrity street style, paparazzi candid, natural light, 35mm, off-duty star.',
        aspectRatio: '3:4',
        gender: 'both'
      }
    ]
  },

  {
    id: 'fairy-tale-fantasy',
    name: 'Fairy Tale Fantasy',
    description: 'Magical fairy tale characters',
    targetImages: 10,
    prompts: [
      {
        title: 'Fairy Tale Magic',
        prompt: 'Forest fantasy 3/4 [gender] with ethereal glow, particles, 50mm, dreamy fairy tale aesthetic.',
        aspectRatio: '3:4',
        gender: 'both'
      },
      {
        title: 'Elf Princess',
        prompt: 'Full-body [gender] as elf, forest setting, magical light, 50mm, fantasy elf character.',
        aspectRatio: '3:4',
        gender: 'both'
      },
      {
        title: 'Fairy Queen',
        prompt: '3/4 [gender] with fairy wings, enchanted garden, soft glow, 50mm, fairy queen magic.',
        aspectRatio: '3:4',
        gender: 'female'
      },
      {
        title: 'Dragon Rider',
        prompt: 'Full-body [gender] fantasy warrior, dragon backdrop, epic light, 50mm, dragon rider hero.',
        aspectRatio: '3:4',
        gender: 'both'
      },
      {
        title: 'Wizard Mage',
        prompt: '3/4 [gender] as wizard, magical effects, mystical setting, 50mm, fantasy mage character.',
        aspectRatio: '3:4',
        gender: 'both'
      },
      {
        title: 'Forest Nymph',
        prompt: 'Full-body [gender] woodland nymph, forest glade, dappled light, 50mm, nature spirit aesthetic.',
        aspectRatio: '3:4',
        gender: 'both'
      },
      {
        title: 'Knight Hero',
        prompt: '3/4 [gender] knight armor, castle background, dramatic light, 50mm, heroic knight character.',
        aspectRatio: '3:4',
        gender: 'both'
      },
      {
        title: 'Enchanted Princess',
        prompt: 'Full-body [gender] princess gown, castle interior, soft magical light, 50mm, storybook princess.',
        aspectRatio: '3:4',
        gender: 'female'
      },
      {
        title: 'Mystical Creature',
        prompt: '3/4 [gender] as mythical being, fantasy landscape, ethereal glow, 50mm, creature character.',
        aspectRatio: '3:4',
        gender: 'both'
      },
      {
        title: 'Magic Spell',
        prompt: 'Full-body [gender] casting spell, magical energy effects, 50mm, spellcaster fantasy moment.',
        aspectRatio: '3:4',
        gender: 'both'
      }
    ]
  },

  {
    id: 'rap-album-cover',
    name: 'Rap Album Cover',
    description: 'Hip-hop album cover aesthetic',
    targetImages: 10,
    prompts: [
      {
        title: 'Rap Album Classic',
        prompt: 'Dramatic 3/4 [gender] on urban stoop, gritty night light, 35mm, moody hip-hop, typographic space.',
        aspectRatio: '1:1',
        gender: 'both'
      },
      {
        title: 'Street Credibility',
        prompt: 'Full-body [gender] in urban alley, dramatic shadows, 35mm, street rap aesthetic, album cover vibe.',
        aspectRatio: '1:1',
        gender: 'both'
      },
      {
        title: 'Studio Session',
        prompt: '3/4 [gender] at recording studio, moody lights, 50mm, hip-hop production, creative process.',
        aspectRatio: '1:1',
        gender: 'both'
      },
      {
        title: 'Luxury Rap',
        prompt: 'Full-body [gender] with luxury car, night city, 35mm, successful rapper, wealth aesthetic.',
        aspectRatio: '1:1',
        gender: 'both'
      },
      {
        title: 'Hood Portrait',
        prompt: '3/4 [gender] in neighborhood, authentic street, natural overcast, 35mm, hometown rap roots.',
        aspectRatio: '1:1',
        gender: 'both'
      },
      {
        title: 'Gritty Underground',
        prompt: 'Full-body [gender] in basement, harsh practical lights, 35mm, underground hip-hop, raw aesthetic.',
        aspectRatio: '1:1',
        gender: 'both'
      },
      {
        title: 'Chain Flex',
        prompt: 'Close-up [gender] showcasing jewelry chains, dramatic light, 85mm, hip-hop jewelry flex.',
        aspectRatio: '1:1',
        gender: 'both'
      },
      {
        title: 'Rooftop King',
        prompt: 'Full-body [gender] on rooftop, city skyline, golden hour, 35mm, king of the city rap.',
        aspectRatio: '1:1',
        gender: 'both'
      },
      {
        title: 'Trap House',
        prompt: '3/4 [gender] at trap house setting, moody interior, 35mm, trap music aesthetic, gritty vibe.',
        aspectRatio: '1:1',
        gender: 'both'
      },
      {
        title: 'Smoke Effects',
        prompt: 'Full-body [gender] with smoke atmosphere, dramatic backlighting, 35mm, cinematic rap cover.',
        aspectRatio: '1:1',
        gender: 'both'
      }
    ]
  },

  {
    id: 'pink-doll',
    name: 'Pink Doll Aesthetic',
    description: 'Hot pink doll transformation',
    targetImages: 8,
    prompts: [
      {
        title: 'Pink Doll Classic',
        prompt: '3/4 [gender] in hot-pink doll look, glossy high-key studio, 50mm, playful plastic sheen, Barbie aesthetic.',
        aspectRatio: '3:4',
        gender: 'both'
      },
      {
        title: 'Barbie World',
        prompt: 'Full-body [gender] all pink outfit, pastel pink background, bright light, 50mm, Barbie world vibe.',
        aspectRatio: '3:4',
        gender: 'both'
      },
      {
        title: 'Doll Box',
        prompt: '3/4 [gender] in doll packaging style, pink box aesthetic, studio light, 50mm, collectible doll look.',
        aspectRatio: '3:4',
        gender: 'both'
      },
      {
        title: 'Blonde Pink',
        prompt: 'Portrait [gender] platinum blonde hair, pink ensemble, soft beauty light, 85mm, iconic doll aesthetic.',
        aspectRatio: '1:1',
        gender: 'both'
      },
      {
        title: 'Dreamhouse',
        prompt: 'Full-body [gender] in pink dreamhouse set, pastel décor, bright light, 50mm, fantasy doll life.',
        aspectRatio: '3:4',
        gender: 'both'
      },
      {
        title: 'Fashionista Doll',
        prompt: '3/4 [gender] in pink designer outfit, fashion doll pose, studio light, 50mm, high fashion doll.',
        aspectRatio: '3:4',
        gender: 'both'
      },
      {
        title: 'Convertible Pink',
        prompt: 'Full-body [gender] with pink car, glossy aesthetic, bright daylight, 35mm, doll lifestyle.',
        aspectRatio: '16:9',
        gender: 'both'
      },
      {
        title: 'Plastic Fantastic',
        prompt: 'Close-up [gender] perfect doll features, high-gloss finish, beauty light, 85mm, plastic perfection.',
        aspectRatio: '1:1',
        gender: 'both'
      }
    ]
  }
];

/**
 * EXPORT FINAL
 */
export const allCompletePart3: FluxCategoryConfig[] = [
  ...eventsPartiesMissing,
  ...cosplayFantasyMissing
];

// Il reste encore quelques catégories (Creative Portraits, Adult 18+, quelques Retro, quelques Lifestyle)
// Je vais créer un dernier fichier ultra-compact pour finir
