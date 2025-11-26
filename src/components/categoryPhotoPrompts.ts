// AI Prompts for photos in each category's Masonry gallery

export interface PhotoPromptData {
  title: string;
  prompt: string;
  category: string;
}

// Each category has prompts that match the number of images in categoryMasonryData
export const categoryPhotoPrompts: Record<string, PhotoPromptData[]> = {
  'ai-headshots': [
    {
      title: 'Professional Corporate Headshot',
      prompt: 'Professional corporate headshot with clean background, confident expression, business attire, studio lighting, sharp focus on face, neutral backdrop, executive presence',
      category: 'Professional Headshot'
    },
    {
      title: 'Business Woman Portrait',
      prompt: 'Professional business woman portrait, elegant corporate attire, clean studio background, confident professional demeanor, modern lighting, polished appearance',
      category: 'Professional Headshot'
    },
    {
      title: 'Corporate Headshot Man',
      prompt: 'Corporate headshot for men, professional business suit, neutral background, confident expression, studio quality lighting, sharp professional look',
      category: 'Professional Headshot'
    },
    {
      title: 'Professional Woman Corporate',
      prompt: 'Professional woman in corporate setting, business casual attire, clean background, approachable yet professional expression, modern office aesthetic',
      category: 'Professional Headshot'
    },
    {
      title: 'Portrait Man Studio',
      prompt: 'Studio portrait of professional man, clean composition, controlled lighting, business attire, confident pose, minimalist background',
      category: 'Professional Headshot'
    },
    {
      title: 'Portrait Photography Woman',
      prompt: 'Portrait photography woman, professional styling, studio lighting, natural expression, clean background, high-quality professional finish',
      category: 'Professional Headshot'
    },
    {
      title: 'Natural Light Portrait',
      prompt: 'Natural light professional portrait, soft lighting, authentic expression, outdoor or window-lit setting, modern professional aesthetic',
      category: 'Professional Headshot'
    },
    {
      title: 'Realistic Portrait Photography',
      prompt: 'Realistic portrait photography, authentic professional look, natural lighting and expression, contemporary style, high-quality finish',
      category: 'Professional Headshot'
    },
    {
      title: 'Casual Portrait Outdoor',
      prompt: 'Casual outdoor portrait, professional yet approachable, natural setting, relaxed expression, contemporary photography style',
      category: 'Professional Headshot'
    },
    {
      title: 'Urban Portrait City',
      prompt: 'Urban professional portrait with city background, modern setting, confident pose, contemporary business casual style',
      category: 'Professional Headshot'
    },
  ],
  'ai-model-photo': [
    {
      title: 'Fashion Model Portrait',
      prompt: 'Fashion model portrait, high-fashion styling, professional pose, editorial quality lighting, contemporary fashion aesthetic, runway-inspired look',
      category: 'Fashion Model'
    },
    {
      title: 'Model Photoshoot Studio',
      prompt: 'Professional model photoshoot in studio, clean composition, perfect lighting, versatile pose, portfolio-quality photography',
      category: 'Fashion Model'
    },
    {
      title: 'Editorial Fashion Woman',
      prompt: 'Editorial fashion portrait woman, high-fashion styling, dramatic composition, magazine-quality lighting, contemporary fashion aesthetic',
      category: 'Fashion Model'
    },
    {
      title: 'Street Style Fashion',
      prompt: 'Street style fashion portrait, modern urban outfit, city background, contemporary fashion aesthetic, confident styling',
      category: 'Fashion Model'
    },
    {
      title: 'Male Model Fashion',
      prompt: 'Male model fashion portrait, stylish contemporary look, professional modeling pose, modern fashion aesthetic',
      category: 'Fashion Model'
    },
    {
      title: 'Portrait Photography Woman',
      prompt: 'Portrait photography woman, elegant styling, professional lighting, modern aesthetic, fashion-forward composition',
      category: 'Fashion Model'
    },
    {
      title: 'Urban Portrait City',
      prompt: 'Urban fashion portrait with city backdrop, street style clothing, modern urban aesthetic, confident pose',
      category: 'Fashion Model'
    },
    {
      title: 'Natural Light Portrait',
      prompt: 'Natural light fashion portrait, soft outdoor lighting, authentic expression, contemporary fashion styling',
      category: 'Fashion Model'
    },
    {
      title: 'Casual Portrait Outdoor',
      prompt: 'Casual outdoor fashion portrait, relaxed stylish look, natural setting, modern fashion photography',
      category: 'Fashion Model'
    },
    {
      title: 'Realistic Portrait Photography',
      prompt: 'Realistic fashion portrait, authentic styling, natural lighting, contemporary aesthetic, high-quality finish',
      category: 'Fashion Model'
    },
  ],
  'ai-realistic-photo': [
    {
      title: 'Realistic Portrait Photography',
      prompt: 'Ultra-realistic portrait photography, natural lighting, authentic expression, photorealistic quality, contemporary style, lifelike details',
      category: 'Realistic Photo'
    },
    {
      title: 'Natural Light Portrait',
      prompt: 'Natural light realistic portrait, soft authentic lighting, genuine expression, photorealistic quality, natural aesthetic',
      category: 'Realistic Photo'
    },
    {
      title: 'Casual Portrait Outdoor',
      prompt: 'Casual outdoor realistic portrait, natural environment, authentic moment, photorealistic rendering, lifelike quality',
      category: 'Realistic Photo'
    },
    {
      title: 'Lifestyle Portrait Beach',
      prompt: 'Lifestyle beach portrait, natural setting, relaxed authentic look, realistic photography style, natural lighting',
      category: 'Realistic Photo'
    },
    {
      title: 'Urban Portrait City',
      prompt: 'Urban city realistic portrait, authentic city setting, natural lighting, photorealistic quality, contemporary style',
      category: 'Realistic Photo'
    },
    {
      title: 'Portrait Photography Woman',
      prompt: 'Realistic portrait photography woman, authentic expression, natural styling, photorealistic quality, lifelike details',
      category: 'Realistic Photo'
    },
    {
      title: 'Portrait Man Studio',
      prompt: 'Realistic studio portrait man, authentic look, controlled natural lighting, photorealistic quality, genuine expression',
      category: 'Realistic Photo'
    },
    {
      title: 'Business Woman Portrait',
      prompt: 'Realistic business woman portrait, authentic professional look, natural lighting, photorealistic quality, genuine demeanor',
      category: 'Realistic Photo'
    },
    {
      title: 'Corporate Headshot Man',
      prompt: 'Realistic corporate headshot, authentic professional appearance, natural lighting, photorealistic finish, lifelike quality',
      category: 'Realistic Photo'
    },
    {
      title: 'Editorial Fashion Woman',
      prompt: 'Realistic editorial portrait, authentic fashion styling, natural lighting, photorealistic quality, contemporary aesthetic',
      category: 'Realistic Photo'
    },
  ],
  'ai-selfie-generator': [
    {
      title: 'Selfie Portrait Young',
      prompt: 'Perfect selfie portrait, flattering angle, natural expression, soft lighting, social media ready, authentic casual look',
      category: 'AI Selfie'
    },
    {
      title: 'Casual Portrait Outdoor',
      prompt: 'Casual outdoor selfie, natural lighting, relaxed authentic expression, perfect selfie angle, social media aesthetic',
      category: 'AI Selfie'
    },
    {
      title: 'Urban Portrait City',
      prompt: 'Urban city selfie, modern background, confident expression, stylish casual look, perfect selfie composition',
      category: 'AI Selfie'
    },
    {
      title: 'Natural Light Portrait',
      prompt: 'Natural light selfie, soft flattering lighting, genuine smile, perfect angle, Instagram-worthy aesthetic',
      category: 'AI Selfie'
    },
    {
      title: 'Portrait Photography Woman',
      prompt: 'Professional-quality selfie woman, perfect lighting, flattering composition, natural expression, social media ready',
      category: 'AI Selfie'
    },
    {
      title: 'Portrait Man Studio',
      prompt: 'Studio-quality selfie man, perfect lighting, confident expression, clean background, professional selfie aesthetic',
      category: 'AI Selfie'
    },
    {
      title: 'Lifestyle Portrait Beach',
      prompt: 'Beach lifestyle selfie, golden hour lighting, relaxed expression, vacation aesthetic, perfect selfie moment',
      category: 'AI Selfie'
    },
    {
      title: 'Dating Profile Photo',
      prompt: 'Perfect dating profile selfie, friendly approachable expression, flattering lighting, authentic look, swipe-right quality',
      category: 'AI Selfie'
    },
    {
      title: 'Realistic Portrait Photography',
      prompt: 'Ultra-realistic selfie, natural expression, perfect lighting, authentic look, photorealistic quality',
      category: 'AI Selfie'
    },
    {
      title: 'Street Style Fashion',
      prompt: 'Fashionable street-style selfie, trendy outfit, urban background, confident pose, Instagram-worthy aesthetic',
      category: 'AI Selfie'
    },
  ],
  'ai-portrait-generator': [
    {
      title: 'Portrait Photography Woman',
      prompt: 'Stunning portrait photography woman, professional composition, beautiful lighting, artistic expression, gallery-quality finish',
      category: 'AI Portrait'
    },
    {
      title: 'Portrait Man Studio',
      prompt: 'Professional studio portrait man, artistic lighting, strong composition, refined aesthetic, portrait photography excellence',
      category: 'AI Portrait'
    },
    {
      title: 'Natural Light Portrait',
      prompt: 'Natural light artistic portrait, soft beautiful lighting, genuine expression, contemporary portrait aesthetic',
      category: 'AI Portrait'
    },
    {
      title: 'Realistic Portrait Photography',
      prompt: 'Realistic artistic portrait, authentic expression, beautiful composition, professional photography quality',
      category: 'AI Portrait'
    },
    {
      title: 'Urban Portrait City',
      prompt: 'Urban artistic portrait, city background, contemporary composition, modern portrait photography style',
      category: 'AI Portrait'
    },
    {
      title: 'Casual Portrait Outdoor',
      prompt: 'Casual outdoor artistic portrait, natural setting, authentic moment, beautiful natural lighting',
      category: 'AI Portrait'
    },
    {
      title: 'Business Woman Portrait',
      prompt: 'Artistic business woman portrait, professional elegance, beautiful lighting, refined composition',
      category: 'AI Portrait'
    },
    {
      title: 'Corporate Headshot Man',
      prompt: 'Artistic corporate portrait man, professional sophistication, studio lighting, polished composition',
      category: 'AI Portrait'
    },
    {
      title: 'Editorial Fashion Woman',
      prompt: 'Editorial artistic portrait woman, high-fashion aesthetic, dramatic lighting, magazine-quality composition',
      category: 'AI Portrait'
    },
    {
      title: 'Model Photoshoot Studio',
      prompt: 'Artistic model portrait, professional studio setup, perfect lighting, portfolio-quality photography',
      category: 'AI Portrait'
    },
  ],
  'ai-dating-photos': [
    {
      title: 'Dating Profile Photo',
      prompt: 'Perfect dating app profile photo, friendly approachable expression, flattering natural lighting, authentic smile, swipe-right worthy',
      category: 'Dating Photo'
    },
    {
      title: 'Selfie Portrait Young',
      prompt: 'Dating app selfie, casual confident look, natural expression, perfect lighting for dating profiles, authentic vibe',
      category: 'Dating Photo'
    },
    {
      title: 'Casual Portrait Outdoor',
      prompt: 'Casual outdoor dating photo, natural setting, approachable expression, lifestyle aesthetic, perfect for dating apps',
      category: 'Dating Photo'
    },
    {
      title: 'Lifestyle Portrait Beach',
      prompt: 'Beach lifestyle dating photo, relaxed vacation vibe, natural smile, attractive outdoor setting, dating app optimized',
      category: 'Dating Photo'
    },
    {
      title: 'Urban Portrait City',
      prompt: 'Urban dating profile photo, city lifestyle, confident casual look, modern aesthetic, perfect for Tinder/Bumble',
      category: 'Dating Photo'
    },
    {
      title: 'Natural Light Portrait',
      prompt: 'Natural light dating photo, soft flattering lighting, genuine expression, authentic approachable look',
      category: 'Dating Photo'
    },
    {
      title: 'Portrait Photography Woman',
      prompt: 'Professional-quality dating photo woman, beautiful natural lighting, friendly expression, dating app ready',
      category: 'Dating Photo'
    },
    {
      title: 'Portrait Man Studio',
      prompt: 'Studio-quality dating photo man, confident expression, clean background, professional yet approachable',
      category: 'Dating Photo'
    },
    {
      title: 'Street Style Fashion',
      prompt: 'Stylish dating profile photo, fashionable outfit, urban setting, confident look, attractive for dating apps',
      category: 'Dating Photo'
    },
    {
      title: 'Fashion Model Portrait',
      prompt: 'Model-quality dating photo, stunning appearance, professional lighting, perfect for premium dating profiles',
      category: 'Dating Photo'
    },
  ],
  'ai-fitness-photos': [
    {
      title: 'Fitness Athletic Portrait',
      prompt: 'Athletic fitness portrait, toned physique, gym or outdoor setting, motivational pose, dynamic energy, fitness lifestyle aesthetic',
      category: 'Fitness Photo'
    },
    {
      title: 'Gym Workout Portrait',
      prompt: 'Gym workout portrait, active fitness pose, athletic wear, training environment, strong confident expression, motivational energy',
      category: 'Fitness Photo'
    },
    {
      title: 'Casual Portrait Outdoor',
      prompt: 'Outdoor fitness portrait, active lifestyle, natural setting, athletic casual wear, healthy energetic look',
      category: 'Fitness Photo'
    },
    {
      title: 'Urban Portrait City',
      prompt: 'Urban fitness portrait, city workout setting, athletic streetwear, confident active pose, modern fitness aesthetic',
      category: 'Fitness Photo'
    },
    {
      title: 'Lifestyle Portrait Beach',
      prompt: 'Beach fitness portrait, outdoor athletic activity, fit physique, natural lighting, healthy lifestyle aesthetic',
      category: 'Fitness Photo'
    },
    {
      title: 'Portrait Man Studio',
      prompt: 'Studio fitness portrait man, athletic physique, professional gym lighting, strong confident pose, bodybuilding aesthetic',
      category: 'Fitness Photo'
    },
    {
      title: 'Portrait Photography Woman',
      prompt: 'Fitness portrait photography woman, athletic figure, motivational pose, gym or outdoor setting, strong empowered look',
      category: 'Fitness Photo'
    },
    {
      title: 'Male Model Fashion',
      prompt: 'Athletic male model, fit physique, stylish activewear, confident pose, fitness fashion aesthetic',
      category: 'Fitness Photo'
    },
    {
      title: 'Dating Profile Photo',
      prompt: 'Fitness dating profile photo, athletic physique, active lifestyle, confident expression, attractive for dating apps',
      category: 'Fitness Photo'
    },
    {
      title: 'Model Photoshoot Studio',
      prompt: 'Fitness model photoshoot, toned athletic body, professional studio lighting, dynamic pose, fitness portfolio quality',
      category: 'Fitness Photo'
    },
  ],
  'ai-lifestyle-travel': [
    {
      title: 'Travel Adventure Portrait',
      prompt: 'Travel adventure portrait, exotic destination, authentic travel moment, natural lighting, wanderlust aesthetic, adventurous spirit',
      category: 'Travel & Lifestyle'
    },
    {
      title: 'City Travel Portrait',
      prompt: 'City travel portrait, urban exploration, iconic location backdrop, contemporary travel photography, cultural experience',
      category: 'Travel & Lifestyle'
    },
    {
      title: 'Nature Travel Portrait',
      prompt: 'Nature travel portrait, outdoor adventure, scenic natural background, authentic exploration moment, wanderlust photography',
      category: 'Travel & Lifestyle'
    },
    {
      title: 'Lifestyle Influencer Photo',
      prompt: 'Lifestyle influencer photo, travel content creation, aesthetic composition, social media ready, aspirational lifestyle',
      category: 'Travel & Lifestyle'
    },
    {
      title: 'Travel Destination Portrait',
      prompt: 'Travel destination portrait, iconic location, vacation photography, authentic travel experience, beautiful backdrop',
      category: 'Travel & Lifestyle'
    },
    {
      title: 'Lifestyle Outdoor Photo',
      prompt: 'Outdoor lifestyle photo, natural environment, authentic moment, contemporary lifestyle photography, relaxed aesthetic',
      category: 'Travel & Lifestyle'
    },
    {
      title: 'Lifestyle Portrait Beach',
      prompt: 'Beach lifestyle portrait, coastal vacation, relaxed beach aesthetic, natural lighting, tropical paradise vibe',
      category: 'Travel & Lifestyle'
    },
    {
      title: 'Casual Portrait Outdoor',
      prompt: 'Casual outdoor lifestyle portrait, natural setting, relaxed authentic expression, travel photography style',
      category: 'Travel & Lifestyle'
    },
    {
      title: 'Urban Portrait City',
      prompt: 'Urban lifestyle portrait, city exploration, modern metropolitan aesthetic, contemporary travel photography',
      category: 'Travel & Lifestyle'
    },
    {
      title: 'Portrait Photography Woman',
      prompt: 'Travel portrait photography woman, beautiful destination, lifestyle aesthetic, professional travel photography quality',
      category: 'Travel & Lifestyle'
    },
  ],
};
