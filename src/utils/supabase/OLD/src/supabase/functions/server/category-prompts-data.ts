/**
 * Category prompts data for backend generation
 * UPDATED: Now imports from all-categories file with 150-word enriched prompts
 */

export interface PromptTemplate {
  title: string;
  prompt: string;
  aspectRatio?: string;
}

export interface CategoryData {
  id: string;
  name: string;
  promptTemplates: PromptTemplate[];
}

// Import enriched prompts from all-categories file
import { allCategoriesData, TOTAL_CATEGORIES, TOTAL_PROMPTS } from './category-prompts-all-categories.ts';

// Re-export for compatibility
export const categoriesData: CategoryData[] = allCategoriesData;

// Legacy categories (kept for backward compatibility)
export const legacyCategoriesData: CategoryData[] = [
  {
    id: "ai-headshots",
    name: "AI Headshots",
    promptTemplates: [
      {
        title: "Professional Business Executive",
        prompt: "Professional headshot of a confident business executive in a modern office, wearing a sharp navy blue suit with a crisp white shirt, natural smile, soft professional lighting, blurred office background with plants and windows, corporate portrait style, high-resolution professional photography, LinkedIn profile quality",
        aspectRatio: "4:5"
      },
      {
        title: "Tech Professional Portrait",
        prompt: "Candid corporate portrait of a friendly tech professional smiling naturally, wearing smart casual attire with a blazer, modern minimalist office background, warm natural lighting from large windows, approachable and professional demeanor, high-quality headshot photography",
        aspectRatio: "4:5"
      },
      {
        title: "Young Entrepreneur Headshot",
        prompt: "LinkedIn profile photo of a young entrepreneur in smart casual attire, confident and approachable expression, modern startup office setting with exposed brick walls, natural window lighting, professional yet relaxed atmosphere, contemporary business portrait",
        aspectRatio: "4:5"
      },
      {
        title: "Corporate Team Leader",
        prompt: "Executive headshot of a corporate team leader with years of experience, wearing an elegant charcoal gray suit, genuine warm smile, sophisticated office boardroom background, premium professional lighting, high-end corporate photography style",
        aspectRatio: "4:5"
      },
      {
        title: "Creative Professional",
        prompt: "Modern professional headshot of a creative industry professional, stylish business casual outfit, contemporary office or studio setting, natural confident smile, clean professional photography with artistic flair, suitable for creative portfolio",
        aspectRatio: "4:5"
      }
    ]
  },
  {
    id: "ai-dating-photos",
    name: "AI Dating Photos",
    promptTemplates: [
      {
        title: "Coffee Shop Casual",
        prompt: "Candid photo of an attractive person smiling naturally while enjoying coffee at a trendy café, wearing casual stylish clothes, warm ambient lighting, cozy café atmosphere with blurred background, genuine friendly expression, dating app profile quality, natural and approachable",
        aspectRatio: "4:5"
      },
      {
        title: "Outdoor Adventure",
        prompt: "Lifestyle photo of an adventurous person hiking in nature, wearing athletic outdoor gear, beautiful mountain landscape background, golden hour lighting, energetic and fun expression, active lifestyle portrait, perfect for dating profile showing personality and interests",
        aspectRatio: "4:5"
      },
      {
        title: "Urban Style Portrait",
        prompt: "Street style portrait of a fashionable person in trendy urban clothing, walking confidently in a modern city setting, natural daylight, stylish and approachable demeanor, contemporary casual fashion, ideal dating app photo showing personal style",
        aspectRatio: "4:5"
      },
      {
        title: "Beach Casual",
        prompt: "Relaxed beach photo of an attractive person in casual summer clothing, ocean and sand background, natural sunlight, genuine carefree smile, vacation vibes, approachable and fun personality, high-quality lifestyle photography for dating profile",
        aspectRatio: "4:5"
      },
      {
        title: "Restaurant Date Night",
        prompt: "Elegant portrait of a well-dressed person at a nice restaurant, wearing smart casual evening attire, warm intimate restaurant lighting, confident and charming smile, sophisticated yet approachable, perfect for dating profile main photo",
        aspectRatio: "4:5"
      }
    ]
  },
  {
    id: "ai-fitness-photos",
    name: "AI Fitness Photos",
    promptTemplates: [
      {
        title: "Gym Workout Session",
        prompt: "Athletic person doing a plank exercise in a bright modern gym, wearing stylish activewear, focused determined expression, well-lit fitness studio with equipment in background, motivational fitness photography, professional sports portrait quality",
        aspectRatio: "4:5"
      },
      {
        title: "Strength Training",
        prompt: "Fitness enthusiast performing deadlifts with perfect form in a professional gym, wearing performance athletic wear, intense focused expression, gym environment with weights and mirrors, high-quality fitness photography capturing strength and dedication",
        aspectRatio: "4:5"
      },
      {
        title: "Yoga Practice",
        prompt: "Flexible person in a challenging yoga pose on a mat, wearing comfortable yoga attire, peaceful concentrated expression, bright airy studio with natural light, serene fitness atmosphere, wellness lifestyle photography",
        aspectRatio: "4:5"
      },
      {
        title: "Outdoor Running",
        prompt: "Runner in motion on a scenic outdoor trail, wearing modern running gear, determined athletic expression, beautiful natural landscape background, golden hour lighting, dynamic fitness action shot, inspiring sports photography",
        aspectRatio: "4:5"
      },
      {
        title: "CrossFit Training",
        prompt: "Athlete performing a box jump in a CrossFit gym, wearing functional fitness clothing, powerful dynamic movement, industrial gym setting with equipment, high-energy fitness photography, professional sports action shot",
        aspectRatio: "4:5"
      }
    ]
  },
  {
    id: "ai-model-photo",
    name: "AI Model Photo",
    promptTemplates: [
      {
        title: "Fashion Editorial",
        prompt: "High fashion model posing elegantly for an editorial photoshoot, wearing designer couture clothing, sophisticated pose with perfect posture, minimalist studio background, professional fashion photography lighting, vogue magazine quality, striking and confident expression",
        aspectRatio: "4:5"
      },
      {
        title: "Commercial Portrait",
        prompt: "Professional model in a commercial photography shoot, wearing trendy casual fashion, approachable friendly smile, clean white studio background, perfect commercial lighting, catalog-ready professional portrait, natural beauty emphasis",
        aspectRatio: "4:5"
      },
      {
        title: "Beauty Close-up",
        prompt: "Beauty model close-up portrait with flawless skin and makeup, elegant neutral expression, soft diffused lighting highlighting facial features, clean minimalist background, high-end cosmetics advertisement style, magazine cover quality",
        aspectRatio: "4:5"
      },
      {
        title: "Lifestyle Brand Model",
        prompt: "Model for lifestyle brand campaign, wearing casual chic clothing, natural candid pose in modern urban setting, authentic genuine expression, contemporary fashion photography, relatable yet aspirational, brand advertisement quality",
        aspectRatio: "4:5"
      },
      {
        title: "Runway Model",
        prompt: "Professional runway model in a powerful confident pose, wearing haute couture fashion, dramatic lighting, minimalist background, fierce editorial expression, high fashion photography, catwalk-ready professional modeling portrait",
        aspectRatio: "4:5"
      }
    ]
  },
  {
    id: "ai-portrait",
    name: "AI Portrait",
    promptTemplates: [
      {
        title: "Classic Studio Portrait",
        prompt: "Timeless studio portrait of a person with elegant natural expression, wearing classic clothing, neutral gray background, professional portrait lighting with soft shadows, high-quality photography, dignified and refined aesthetic, traditional portrait style",
        aspectRatio: "4:5"
      },
      {
        title: "Environmental Portrait",
        prompt: "Environmental portrait showing person in their natural element, meaningful background context telling their story, natural lighting, authentic candid moment, photojournalistic portrait style, depth and character in expression",
        aspectRatio: "4:5"
      },
      {
        title: "Fine Art Portrait",
        prompt: "Artistic fine art portrait with dramatic lighting and composition, creative use of shadows and highlights, thoughtful contemplative expression, museum-quality photography, sophisticated artistic interpretation, black and white or muted tones",
        aspectRatio: "4:5"
      },
      {
        title: "Natural Light Portrait",
        prompt: "Beautiful natural light portrait taken near a window, soft diffused daylight illuminating the subject, gentle authentic expression, simple clean background, organic photography style, warm and inviting atmosphere",
        aspectRatio: "4:5"
      },
      {
        title: "Contemporary Portrait",
        prompt: "Modern contemporary portrait with bold confident pose, fashionable current styling, creative artistic background, professional editorial lighting, striking memorable composition, fresh innovative portrait photography",
        aspectRatio: "4:5"
      }
    ]
  }
];

export function getCategoryData(categoryId: string): CategoryData | undefined {
  return categoriesData.find(cat => cat.id === categoryId);
}

export function getAllCategoryIds(): string[] {
  return categoriesData.map(cat => cat.id);
}
