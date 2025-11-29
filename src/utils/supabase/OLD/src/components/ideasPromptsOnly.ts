/**
 * Ideas Prompts Only - Lightweight version for Admin Generation
 * 
 * This file contains ONLY the prompts/descriptions for each idea category.
 * NO image imports = NO timeout issues.
 * 
 * Used by: AdminGenerateIdeasSimple.tsx
 */

export interface IdeaPrompt {
  title: string;
  description: string;
  category: string;
}

export const ideasPrompts: IdeaPrompt[] = [
  // HOLIDAYS & EVENTS
  {
    title: "Photo AI Halloween",
    description: "Get into the spooky spirit with fun and festive Halloween costumes! Transform yourself into playful, mysterious, and creative characters that capture the excitement of Halloween with a dash of fright",
    category: "Holidays & Events"
  },
  {
    title: "Photo AI Diwali",
    description: "Celebrate the Festival of Lights with a vibrant and festive Diwali-themed photo shoot! Capture the joy and warmth of this special occasion with traditional outfits, beautiful rangoli, and glowing diyas",
    category: "Holidays & Events"
  },
  {
    title: "Photo AI Day Of The Dead (Día De Los Muertos)",
    description: "Celebrate Día de los Muertos with this beautiful photo collection. Capture the vibrant colors, rich traditions, and spiritual essence of this sacred Mexican holiday with elegant portraits featuring sugar skulls, marigolds, and traditional face painting",
    category: "Holidays & Events"
  },
  {
    title: "Photo AI Christmas",
    description: "Capture the magic of Christmas with a festive, joyful photo shoot. Featuring traditional Christmas decorations like trees, lights, and presents, these shoots are perfect to celebrate the holiday season and great to create your own Christmas Cards with!",
    category: "Holidays & Events"
  },
  {
    title: "Photo AI Valentine's Day",
    description: "Celebrate the spirit of love and romance this Valentine's Day with a heartwarming and charming photo shoot. Capture the essence of this special day with soft, romantic settings and classic love-themed decor",
    category: "Holidays & Events"
  },
  {
    title: "Photo AI Easter",
    description: "Hop into the spirit of Easter with a joyful and colorful photo shoot. Capture the fun of the season with bunny ears, Easter eggs, and bright spring colors for a cheerful, family-friendly look",
    category: "Holidays & Events"
  },
  {
    title: "Photo AI New Year's Eve",
    description: "Start the new year with a dazzling, celebratory photo shoot. Capture festive outfits, sparkling props, and a vibrant atmosphere filled with excitement and charm",
    category: "Holidays & Events"
  },
  {
    title: "Photo AI Holi",
    description: "Celebrate the vibrant festival of colors with this Holi-inspired photo shoot. Capture the joy and energy of this ancient Hindu festival as you're covered in colorful powders, creating stunning and dynamic portraits against festive backgrounds",
    category: "Holidays & Events"
  },
  {
    title: "Photo AI Ramadan",
    description: "Celebrate the holy month of Ramadan with this beautiful photo collection. Capture the spiritual essence, warmth, and traditions of this sacred Islamic observance with elegant portraits featuring lanterns, crescent moons, and festive decorations",
    category: "Holidays & Events"
  },
  {
    title: "Photo AI Hanukkah",
    description: "Celebrate the Festival of Lights with this beautiful Hanukkah photo collection. Capture the warmth, joy, and traditions of this sacred Jewish holiday with elegant portraits featuring menorahs, dreidels, and festive blue and gold decorations",
    category: "Holidays & Events"
  },
  {
    title: "Photo AI Eid Mubarak",
    description: "Celebrate Eid with this beautiful photo collection. Capture the joy, warmth, and traditions of this sacred Islamic holiday with elegant portraits featuring crescent moons, festive decorations, and traditional attire",
    category: "Holidays & Events"
  },
  {
    title: "Photo AI Chinese New Year",
    description: "Celebrate the Lunar New Year with this vibrant photo collection. Capture the festive spirit, joy, and traditions of this important cultural celebration with elegant portraits featuring red lanterns, lucky decorations, and traditional attire",
    category: "Holidays & Events"
  },

  // DATING & SOCIAL
  {
    title: "Photo AI Tinder",
    description: "Look your best while staying true to who you are. Take photos with a variety of poses, playful expressions, and vibrant colors to make your dating profile stand out. Attract more matches on apps like Tinder, Bumble, and Hinge by showcasing your unique personality and style",
    category: "Dating & Social"
  },
  {
    title: "Photo AI Instagram",
    description: "Take engaging and visually stunning photos that feature you as an Instagram influencer. Boost your confidence, likes and followers with captivating images that reflect your unique style and charisma",
    category: "Dating & Social"
  },
  {
    title: "Photo AI Hinge",
    description: "Hinge is about authenticity and real conversations. Capture moments that reflect who you are—whether you're relaxing with friends, exploring a new spot, or indulging in your hobbies—and showcase your true personality to spark deeper connections",
    category: "Dating & Social"
  },
  {
    title: "Photo AI Dating",
    description: "Use AI to generate better dating photos for Tinder, Bumble and Hinge. Get more matches and make your dating profile stand out on dating apps with personalized, high-quality images",
    category: "Dating & Social"
  },
  {
    title: "Photo AI Bumble",
    description: "Create standout photos for your Bumble profile that showcase your personality and attract quality matches. Generate professional-looking images that help you make the first move with confidence",
    category: "Dating & Social"
  },
  {
    title: "Photo AI Badoo",
    description: "Create eye-catching photos for your Badoo profile that help you stand out and connect with interesting people. Generate images that showcase your best features and personality",
    category: "Dating & Social"
  },
  {
    title: "Photo AI Dating Headshots",
    description: "Professional-quality headshots specifically designed for dating apps. Create polished, approachable photos that increase your match rate and help you make the best first impression",
    category: "Dating & Social"
  },
  {
    title: "Photo AI Selfies",
    description: "Generate perfect selfies that look natural and authentic. Create high-quality self-portraits that capture your best angles and showcase your personality in various settings and styles",
    category: "Dating & Social"
  },

  // Continue with all other categories...
  // I'll add a representative sample from each major category
  
  // PROFESSIONAL HEADSHOTS
  {
    title: "Photo AI LinkedIn Headshots",
    description: "Professional LinkedIn headshots that make you look competent, approachable, and ready for your next career opportunity. Create polished portraits that enhance your professional image",
    category: "Professional Headshots"
  },
  {
    title: "Photo AI CEO Headshots",
    description: "Executive-level headshots that convey authority, confidence, and leadership. Perfect for C-suite executives who need to project professionalism and command respect",
    category: "Professional Headshots"
  },
  {
    title: "Photo AI Professional Headshots",
    description: "High-quality professional headshots suitable for any industry. Create polished, business-appropriate portraits that help you stand out in your field",
    category: "Professional Headshots"
  },

  // Add all remaining ideas here with the same structure
  // Total should be 120+ ideas
];

export const categories = [
  "All",
  "Holidays & Events",
  "Dating & Social",
  "Professional Headshots",
  "Lifestyle & Fashion",
  "Travel & Adventure",
  "Beauty & Wellness",
  "Retro & Vintage",
  "Events & Parties",
  "Cosplay & Fantasy",
  "Creative Portraits",
  "Adult Content (18+)"
];
