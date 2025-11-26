// Configuration des formulaires par catégorie

export interface FormQuestionConfig {
  id: string;
  type: 'photoCategory' | 'objective' | 'age' | 'eyeColor' | 'origin' | 'bodyType' | 'clothingStyle' | 'backgroundStyle' | 'photos';
  title: string;
  subtitle?: string;
  options?: any[];
}

// Photo Categories - First question in the form
export const photoCategories = [
  { id: 'ai-headshots', label: 'AI Headshots', icon: '💼', desc: 'Professional LinkedIn photos' },
  { id: 'ai-dating-photos', label: 'AI Dating Photos', icon: '📸', desc: 'Perfect profile pictures' },
  { id: 'ai-model-photo', label: 'AI Model Photo', icon: '💃', desc: 'Fashion & editorial style' },
  { id: 'ai-selfie', label: 'AI Selfie Generator', icon: '🤳', desc: 'Social media ready' },
  { id: 'ai-portrait', label: 'AI Portrait Generator', icon: '🎨', desc: 'Artistic portraits' },
  { id: 'ai-realistic-photo', label: 'AI Realistic Photo', icon: '🌈', desc: 'Ultra realistic photos' },
  { id: 'ai-fitness-bikini', label: 'AI Fitness & Bikini', icon: '🏋️', desc: 'Beach & fitness photos' },
  { id: 'ai-lifestyle-travel', label: 'AI Lifestyle & Travel', icon: '✈️', desc: 'Travel & adventure' },
  { id: 'ai-cosplay-fantasy', label: 'AI Cosplay & Fantasy', icon: '🎭', desc: 'Cosplay & characters' }
];

export interface CategoryFormConfig {
  categoryId: string;
  categoryName: string;
  maxSteps: number;
  questions: FormQuestionConfig[];
}

// AI HEADSHOTS - Professional LinkedIn photos
const headshotsObjectives = [
  { id: 'linkedin', label: 'LinkedIn Profile', icon: '💼', desc: 'Professional networking' },
  { id: 'resume', label: 'Resume/CV', icon: '📄', desc: 'Job applications' },
  { id: 'corporate', label: 'Corporate Photo', icon: '🏢', desc: 'Company directory' },
  { id: 'personal-brand', label: 'Personal Branding', icon: '✨', desc: 'Build your brand' }
];

const headshotsClothingStyles = [
  {
    id: 'business',
    label: 'Business Suit',
    desc: 'Professional and polished',
    image: 'https://images.unsplash.com/photo-1560253717-c9ece454f7d1?w=400'
  },
  {
    id: 'business-casual',
    label: 'Business Casual',
    desc: 'Professional yet relaxed',
    image: 'https://images.unsplash.com/photo-1619042823674-4f4ad8484b08?w=400'
  },
  {
    id: 'smart-casual',
    label: 'Smart Casual',
    desc: 'Polished and approachable',
    image: 'https://images.unsplash.com/photo-1610521411256-6664ca58a072?w=400'
  },
  {
    id: 'creative-professional',
    label: 'Creative Professional',
    desc: 'Modern and stylish',
    image: 'https://images.unsplash.com/photo-1692878968463-77823db7947b?w=400'
  },
  {
    id: 'executive',
    label: 'Executive',
    desc: 'C-suite elegance',
    image: 'https://images.unsplash.com/photo-1593032470861-4509830938cb?w=400'
  },
  {
    id: 'tech-casual',
    label: 'Tech Casual',
    desc: 'Silicon Valley style',
    image: 'https://images.unsplash.com/photo-1736555142217-916540c7f1b7?w=400'
  },
  {
    id: 'formal-blazer',
    label: 'Formal Blazer',
    desc: 'Tailored perfection',
    image: 'https://images.unsplash.com/photo-1742626181963-1244929d2fdb?w=400'
  },
  {
    id: 'corporate-casual',
    label: 'Corporate Casual',
    desc: 'Office ready',
    image: 'https://images.unsplash.com/photo-1756341782414-9531891fc0b9?w=400'
  },
  {
    id: 'startup-style',
    label: 'Startup Style',
    desc: 'Modern entrepreneur',
    image: 'https://images.unsplash.com/photo-1631725232387-271a7759e8b4?w=400'
  }
];

const headshotsBackgrounds = [
  {
    id: 'office',
    label: 'Modern Office',
    desc: 'Professional environment',
    image: 'https://images.unsplash.com/photo-1585435465945-bef5a93f8849?w=400'
  },
  {
    id: 'neutral',
    label: 'Neutral Background',
    desc: 'Clean and professional',
    image: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=400'
  },
  {
    id: 'urban-office',
    label: 'Urban Office',
    desc: 'Contemporary workspace',
    image: 'https://images.unsplash.com/photo-1626971945767-c57d2d57de02?w=400'
  },
  {
    id: 'outdoor-professional',
    label: 'Outdoor Professional',
    desc: 'Natural light setting',
    image: 'https://images.unsplash.com/photo-1709734096825-3520ee9a652f?w=400'
  },
  {
    id: 'conference-room',
    label: 'Conference Room',
    desc: 'Meeting room setting',
    image: 'https://images.unsplash.com/photo-1653652445848-ddc5a1c6472c?w=400'
  },
  {
    id: 'library',
    label: 'Library',
    desc: 'Sophisticated backdrop',
    image: 'https://images.unsplash.com/photo-1657211689441-db9da6fdfb10?w=400'
  },
  {
    id: 'studio-white',
    label: 'White Studio',
    desc: 'Minimalist clean',
    image: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=400'
  },
  {
    id: 'corporate-lobby',
    label: 'Corporate Lobby',
    desc: 'Business entrance',
    image: 'https://images.unsplash.com/photo-1585435465945-bef5a93f8849?w=400'
  },
  {
    id: 'modern-loft',
    label: 'Modern Loft',
    desc: 'Industrial chic',
    image: 'https://images.unsplash.com/photo-1690271964609-e07157a15548?w=400'
  }
];

// AI DATING PHOTOS
const datingObjectives = [
  { id: 'serious', label: 'Serious Relationship', icon: '💍', desc: 'Long-term commitment' },
  { id: 'dating', label: 'Casual Dating', icon: '💕', desc: 'Meet someone special' },
  { id: 'friends', label: 'New Friends', icon: '👥', desc: 'Expand social circle' },
  { id: 'networking', label: 'Social Networking', icon: '🌟', desc: 'Meet new people' }
];

const datingClothingStyles = [
  {
    id: 'casual-chic',
    label: 'Casual Chic',
    desc: 'Stylish and approachable',
    image: 'https://images.unsplash.com/photo-1610521411256-6664ca58a072?w=400'
  },
  {
    id: 'elegant',
    label: 'Elegant',
    desc: 'Sophisticated look',
    image: 'https://images.unsplash.com/photo-1742626181963-1244929d2fdb?w=400'
  },
  {
    id: 'street-style',
    label: 'Street Style',
    desc: 'Urban and trendy',
    image: 'https://images.unsplash.com/photo-1692878968463-77823db7947b?w=400'
  },
  {
    id: 'weekend-casual',
    label: 'Weekend Casual',
    desc: 'Relaxed and natural',
    image: 'https://images.unsplash.com/photo-1756341782414-9531891fc0b9?w=400'
  },
  {
    id: 'smart-date',
    label: 'Smart Date',
    desc: 'Perfect first impression',
    image: 'https://images.unsplash.com/photo-1619042823674-4f4ad8484b08?w=400'
  },
  {
    id: 'athletic-casual',
    label: 'Athletic Casual',
    desc: 'Sporty and active',
    image: 'https://images.unsplash.com/photo-1708577907839-1240466aee53?w=400'
  },
  {
    id: 'bohemian',
    label: 'Bohemian',
    desc: 'Free-spirited',
    image: 'https://images.unsplash.com/photo-1631725232387-271a7759e8b4?w=400'
  },
  {
    id: 'date-night',
    label: 'Date Night',
    desc: 'Evening elegance',
    image: 'https://images.unsplash.com/photo-1593032470861-4509830938cb?w=400'
  },
  {
    id: 'summer-vibes',
    label: 'Summer Vibes',
    desc: 'Light and breezy',
    image: 'https://images.unsplash.com/photo-1736555142217-916540c7f1b7?w=400'
  }
];

const datingBackgrounds = [
  {
    id: 'urban',
    label: 'Urban City',
    desc: 'City vibes',
    image: 'https://images.unsplash.com/photo-1626971945767-c57d2d57de02?w=400'
  },
  {
    id: 'cafe',
    label: 'Café',
    desc: 'Cozy atmosphere',
    image: 'https://images.unsplash.com/photo-1690271964609-e07157a15548?w=400'
  },
  {
    id: 'nature',
    label: 'Nature',
    desc: 'Outdoor settings',
    image: 'https://images.unsplash.com/photo-1709734096825-3520ee9a652f?w=400'
  },
  {
    id: 'rooftop',
    label: 'Rooftop',
    desc: 'City skyline',
    image: 'https://images.unsplash.com/photo-1635161886641-b366c861a05b?w=400'
  },
  {
    id: 'park',
    label: 'Park',
    desc: 'Green outdoor space',
    image: 'https://images.unsplash.com/photo-1709734096825-3520ee9a652f?w=400'
  },
  {
    id: 'beach-sunset',
    label: 'Beach Sunset',
    desc: 'Romantic ocean view',
    image: 'https://images.unsplash.com/photo-1654701358121-72693ab74274?w=400'
  },
  {
    id: 'art-gallery',
    label: 'Art Gallery',
    desc: 'Cultural setting',
    image: 'https://images.unsplash.com/photo-1621886292650-520f76c747d6?w=400'
  },
  {
    id: 'downtown',
    label: 'Downtown',
    desc: 'Vibrant city center',
    image: 'https://images.unsplash.com/photo-1626971945767-c57d2d57de02?w=400'
  },
  {
    id: 'bookstore',
    label: 'Bookstore',
    desc: 'Cozy literary vibes',
    image: 'https://images.unsplash.com/photo-1657211689441-db9da6fdfb10?w=400'
  }
];

// AI MODEL PHOTO - Fashion & Modeling
const modelObjectives = [
  { id: 'fashion', label: 'Fashion Portfolio', icon: '👗', desc: 'Build modeling portfolio' },
  { id: 'editorial', label: 'Editorial Shoot', icon: '📸', desc: 'Magazine-style photos' },
  { id: 'commercial', label: 'Commercial', icon: '🎬', desc: 'Brand campaigns' },
  { id: 'lifestyle', label: 'Lifestyle', icon: '✨', desc: 'Natural modeling' }
];

const modelClothingStyles = [
  {
    id: 'haute-couture',
    label: 'Haute Couture',
    desc: 'High fashion elegance',
    image: 'https://images.unsplash.com/photo-1742626181963-1244929d2fdb?w=400'
  },
  {
    id: 'street-fashion',
    label: 'Street Fashion',
    desc: 'Urban chic',
    image: 'https://images.unsplash.com/photo-1692878968463-77823db7947b?w=400'
  },
  {
    id: 'minimalist',
    label: 'Minimalist',
    desc: 'Clean and modern',
    image: 'https://images.unsplash.com/photo-1736555142217-916540c7f1b7?w=400'
  },
  {
    id: 'avant-garde',
    label: 'Avant-Garde',
    desc: 'Bold and artistic',
    image: 'https://images.unsplash.com/photo-1733767217381-99f6eba6a8bd?w=400'
  },
  {
    id: 'editorial',
    label: 'Editorial',
    desc: 'Magazine worthy',
    image: 'https://images.unsplash.com/photo-1593032470861-4509830938cb?w=400'
  },
  {
    id: 'commercial',
    label: 'Commercial',
    desc: 'Brand campaign ready',
    image: 'https://images.unsplash.com/photo-1560253717-c9ece454f7d1?w=400'
  },
  {
    id: 'runway',
    label: 'Runway',
    desc: 'Fashion show style',
    image: 'https://images.unsplash.com/photo-1631725232387-271a7759e8b4?w=400'
  },
  {
    id: 'glamour',
    label: 'Glamour',
    desc: 'Red carpet ready',
    image: 'https://images.unsplash.com/photo-1565632444383-283cfa0dbe62?w=400'
  },
  {
    id: 'casual-model',
    label: 'Casual Model',
    desc: 'Natural lifestyle',
    image: 'https://images.unsplash.com/photo-1756341782414-9531891fc0b9?w=400'
  }
];

const modelBackgrounds = [
  {
    id: 'studio',
    label: 'Studio',
    desc: 'Professional studio',
    image: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=400'
  },
  {
    id: 'urban-fashion',
    label: 'Urban Fashion',
    desc: 'City backdrop',
    image: 'https://images.unsplash.com/photo-1626971945767-c57d2d57de02?w=400'
  },
  {
    id: 'luxury-interior',
    label: 'Luxury Interior',
    desc: 'High-end setting',
    image: 'https://images.unsplash.com/photo-1653652445848-ddc5a1c6472c?w=400'
  },
  {
    id: 'outdoor-editorial',
    label: 'Outdoor Editorial',
    desc: 'Natural landscapes',
    image: 'https://images.unsplash.com/photo-1709734096825-3520ee9a652f?w=400'
  },
  {
    id: 'industrial',
    label: 'Industrial',
    desc: 'Raw urban aesthetic',
    image: 'https://images.unsplash.com/photo-1690271964609-e07157a15548?w=400'
  },
  {
    id: 'penthouse',
    label: 'Penthouse',
    desc: 'Luxury apartment',
    image: 'https://images.unsplash.com/photo-1653652445848-ddc5a1c6472c?w=400'
  },
  {
    id: 'rooftop-fashion',
    label: 'Rooftop',
    desc: 'Skyline backdrop',
    image: 'https://images.unsplash.com/photo-1635161886641-b366c861a05b?w=400'
  },
  {
    id: 'architecture',
    label: 'Architecture',
    desc: 'Modern structures',
    image: 'https://images.unsplash.com/photo-1626971945767-c57d2d57de02?w=400'
  },
  {
    id: 'white-cyclorama',
    label: 'White Cyclorama',
    desc: 'Infinite backdrop',
    image: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=400'
  }
];

// AI FITNESS & BIKINI
const fitnessObjectives = [
  { id: 'fitness-portfolio', label: 'Fitness Portfolio', icon: '💪', desc: 'Showcase fitness journey' },
  { id: 'competition', label: 'Competition Prep', icon: '🏆', desc: 'Contest ready photos' },
  { id: 'beach-vacation', label: 'Beach Vacation', icon: '🏖️', desc: 'Holiday photos' },
  { id: 'lifestyle-fitness', label: 'Lifestyle Fitness', icon: '✨', desc: 'Healthy living' }
];

// AI FITNESS PHOTOS - Professional fitness content
const fitnessPhotosObjectives = [
  { id: 'fitness-content', label: 'Fitness Content', icon: '💪', desc: 'Social media & coaching' },
  { id: 'transformation', label: 'Progress Photos', icon: '📸', desc: 'Track your journey' },
  { id: 'training-portfolio', label: 'Training Portfolio', icon: '🏋️', desc: 'Professional trainer photos' },
  { id: 'motivation', label: 'Motivation & Inspiration', icon: '⚡', desc: 'Inspire your audience' }
];

const fitnessPhotosClothingStyles = [
  {
    id: 'gym-pro',
    label: 'Gym Pro',
    desc: 'Serious workout gear',
    image: 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=400'
  },
  {
    id: 'athletic-wear',
    label: 'Athletic Wear',
    desc: 'Performance apparel',
    image: 'https://images.unsplash.com/photo-1708577907839-1240466aee53?w=400'
  },
  {
    id: 'crossfit-style',
    label: 'CrossFit Style',
    desc: 'Functional training',
    image: 'https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?w=400'
  },
  {
    id: 'yoga-fitness',
    label: 'Yoga/Pilates',
    desc: 'Flexibility training',
    image: 'https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=400'
  },
  {
    id: 'running-gear',
    label: 'Running Gear',
    desc: 'Cardio ready',
    image: 'https://images.unsplash.com/photo-1552674605-db6ffd4facb5?w=400'
  },
  {
    id: 'bodybuilding',
    label: 'Bodybuilding',
    desc: 'Muscle showcase',
    image: 'https://images.unsplash.com/photo-1605296867424-35fc25c9212a?w=400'
  },
  {
    id: 'sports-casual',
    label: 'Sports Casual',
    desc: 'Relaxed athletic',
    image: 'https://images.unsplash.com/photo-1610521411256-6664ca58a072?w=400'
  },
  {
    id: 'hiit-training',
    label: 'HIIT Training',
    desc: 'High intensity gear',
    image: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=400'
  },
  {
    id: 'lifestyle-athletic',
    label: 'Lifestyle Athletic',
    desc: 'Everyday fitness',
    image: 'https://images.unsplash.com/photo-1756341782414-9531891fc0b9?w=400'
  }
];

const fitnessPhotosBackgrounds = [
  {
    id: 'gym-environment',
    label: 'Gym Environment',
    desc: 'Professional fitness center',
    image: 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=400'
  },
  {
    id: 'outdoor-training',
    label: 'Outdoor Training',
    desc: 'Natural fitness setting',
    image: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=400'
  },
  {
    id: 'home-gym',
    label: 'Home Gym',
    desc: 'Personal training space',
    image: 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=400'
  },
  {
    id: 'crossfit-box',
    label: 'CrossFit Box',
    desc: 'Functional training facility',
    image: 'https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?w=400'
  },
  {
    id: 'yoga-studio',
    label: 'Yoga Studio',
    desc: 'Calm training space',
    image: 'https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=400'
  },
  {
    id: 'urban-outdoor',
    label: 'Urban Outdoor',
    desc: 'City fitness spots',
    image: 'https://images.unsplash.com/photo-1709734096825-3520ee9a652f?w=400'
  },
  {
    id: 'mountain-trail',
    label: 'Mountain Trail',
    desc: 'Outdoor adventure',
    image: 'https://images.unsplash.com/photo-1693342166817-9d0198c2b886?w=400'
  },
  {
    id: 'studio-fitness',
    label: 'Studio Fitness',
    desc: 'Professional photo studio',
    image: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=400'
  },
  {
    id: 'beach-workout',
    label: 'Beach Workout',
    desc: 'Coastal training',
    image: 'https://images.unsplash.com/photo-1654701358121-72693ab74274?w=400'
  }
];

const fitnessClothingStyles = [
  {
    id: 'bikini',
    label: 'Bikini',
    desc: 'Beach ready',
    image: 'https://images.unsplash.com/photo-1615327951452-7cda991728fe?w=400'
  },
  {
    id: 'athletic-wear',
    label: 'Athletic Wear',
    desc: 'Sporty and active',
    image: 'https://images.unsplash.com/photo-1708577907839-1240466aee53?w=400'
  },
  {
    id: 'gym-outfit',
    label: 'Gym Outfit',
    desc: 'Workout ready',
    image: 'https://images.unsplash.com/photo-1734458211458-4d508abf564e?w=400'
  },
  {
    id: 'casual-athletic',
    label: 'Casual Athletic',
    desc: 'Relaxed sporty',
    image: 'https://images.unsplash.com/photo-1610521411256-6664ca58a072?w=400'
  },
  {
    id: 'yoga-wear',
    label: 'Yoga Wear',
    desc: 'Flexible comfort',
    image: 'https://images.unsplash.com/photo-1708577907839-1240466aee53?w=400'
  },
  {
    id: 'sports-bra',
    label: 'Sports Bra & Leggings',
    desc: 'Training essentials',
    image: 'https://images.unsplash.com/photo-1734458211458-4d508abf564e?w=400'
  },
  {
    id: 'competition-bikini',
    label: 'Competition Bikini',
    desc: 'Contest ready',
    image: 'https://images.unsplash.com/photo-1615327951452-7cda991728fe?w=400'
  },
  {
    id: 'swimwear',
    label: 'Swimwear',
    desc: 'Poolside style',
    image: 'https://images.unsplash.com/photo-1615327951452-7cda991728fe?w=400'
  },
  {
    id: 'activewear',
    label: 'Activewear',
    desc: 'Performance style',
    image: 'https://images.unsplash.com/photo-1708577907839-1240466aee53?w=400'
  }
];

const fitnessBackgrounds = [
  {
    id: 'beach',
    label: 'Beach',
    desc: 'Ocean and sand',
    image: 'https://images.unsplash.com/photo-1654701358121-72693ab74274?w=400'
  },
  {
    id: 'gym',
    label: 'Gym',
    desc: 'Fitness center',
    image: 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=400'
  },
  {
    id: 'pool',
    label: 'Pool',
    desc: 'Poolside luxury',
    image: 'https://images.unsplash.com/photo-1576013551627-0cc20b96c2a7?w=400'
  },
  {
    id: 'outdoor-fitness',
    label: 'Outdoor Fitness',
    desc: 'Natural training',
    image: 'https://images.unsplash.com/photo-1709734096825-3520ee9a652f?w=400'
  },
  {
    id: 'tropical-beach',
    label: 'Tropical Beach',
    desc: 'Paradise setting',
    image: 'https://images.unsplash.com/photo-1654701358121-72693ab74274?w=400'
  },
  {
    id: 'yoga-studio',
    label: 'Yoga Studio',
    desc: 'Zen atmosphere',
    image: 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=400'
  },
  {
    id: 'mountain-trail',
    label: 'Mountain Trail',
    desc: 'Outdoor adventure',
    image: 'https://images.unsplash.com/photo-1693342166817-9d0198c2b886?w=400'
  },
  {
    id: 'resort-pool',
    label: 'Resort Pool',
    desc: 'Luxury resort',
    image: 'https://images.unsplash.com/photo-1576013551627-0cc20b96c2a7?w=400'
  },
  {
    id: 'fitness-park',
    label: 'Fitness Park',
    desc: 'Urban outdoor gym',
    image: 'https://images.unsplash.com/photo-1709734096825-3520ee9a652f?w=400'
  }
];

// AI COSPLAY & FANTASY
const cosplayObjectives = [
  { id: 'anime-character', label: 'Anime Character', icon: '🎭', desc: 'Anime cosplay' },
  { id: 'game-character', label: 'Game Character', icon: '🎮', desc: 'Video game cosplay' },
  { id: 'fantasy-character', label: 'Fantasy Character', icon: '🧙', desc: 'Fantasy worlds' },
  { id: 'superhero', label: 'Superhero', icon: '🦸', desc: 'Comic book hero' }
];

const cosplayClothingStyles = [
  {
    id: 'anime',
    label: 'Anime Style',
    desc: 'Japanese animation',
    image: 'https://images.unsplash.com/photo-1759736810847-24daf6bffcbf?w=400'
  },
  {
    id: 'medieval',
    label: 'Medieval Fantasy',
    desc: 'Knights and wizards',
    image: 'https://images.unsplash.com/photo-1739654235915-5523ab58d7a8?w=400'
  },
  {
    id: 'sci-fi',
    label: 'Sci-Fi',
    desc: 'Futuristic looks',
    image: 'https://images.unsplash.com/photo-1733767217381-99f6eba6a8bd?w=400'
  },
  {
    id: 'superhero-costume',
    label: 'Superhero',
    desc: 'Comic book hero',
    image: 'https://images.unsplash.com/photo-1619042823674-4f4ad8484b08?w=400'
  },
  {
    id: 'cyberpunk',
    label: 'Cyberpunk',
    desc: 'Tech noir style',
    image: 'https://images.unsplash.com/photo-1733767217381-99f6eba6a8bd?w=400'
  },
  {
    id: 'steampunk',
    label: 'Steampunk',
    desc: 'Victorian sci-fi',
    image: 'https://images.unsplash.com/photo-1739654235915-5523ab58d7a8?w=400'
  },
  {
    id: 'elf-warrior',
    label: 'Elf Warrior',
    desc: 'Fantasy ranger',
    image: 'https://images.unsplash.com/photo-1739654235915-5523ab58d7a8?w=400'
  },
  {
    id: 'mage',
    label: 'Mage/Wizard',
    desc: 'Magical powers',
    image: 'https://images.unsplash.com/photo-1739654235915-5523ab58d7a8?w=400'
  },
  {
    id: 'space-hero',
    label: 'Space Hero',
    desc: 'Galactic explorer',
    image: 'https://images.unsplash.com/photo-1733767217381-99f6eba6a8bd?w=400'
  }
];

const cosplayBackgrounds = [
  {
    id: 'fantasy-castle',
    label: 'Fantasy Castle',
    desc: 'Medieval setting',
    image: 'https://images.unsplash.com/photo-1682687220923-c58b9a4592ae?w=400'
  },
  {
    id: 'sci-fi-city',
    label: 'Sci-Fi City',
    desc: 'Futuristic urban',
    image: 'https://images.unsplash.com/photo-1626971945767-c57d2d57de02?w=400'
  },
  {
    id: 'mystical-forest',
    label: 'Mystical Forest',
    desc: 'Enchanted woods',
    image: 'https://images.unsplash.com/photo-1709734096825-3520ee9a652f?w=400'
  },
  {
    id: 'convention-hall',
    label: 'Convention Hall',
    desc: 'Con environment',
    image: 'https://images.unsplash.com/photo-1585435465945-bef5a93f8849?w=400'
  },
  {
    id: 'cyberpunk-alley',
    label: 'Cyberpunk Alley',
    desc: 'Neon-lit streets',
    image: 'https://images.unsplash.com/photo-1626971945767-c57d2d57de02?w=400'
  },
  {
    id: 'dungeon',
    label: 'Dungeon',
    desc: 'Dark medieval halls',
    image: 'https://images.unsplash.com/photo-1682687220923-c58b9a4592ae?w=400'
  },
  {
    id: 'space-station',
    label: 'Space Station',
    desc: 'Orbital platform',
    image: 'https://images.unsplash.com/photo-1626971945767-c57d2d57de02?w=400'
  },
  {
    id: 'anime-school',
    label: 'Anime School',
    desc: 'Japanese academy',
    image: 'https://images.unsplash.com/photo-1585435465945-bef5a93f8849?w=400'
  },
  {
    id: 'magical-realm',
    label: 'Magical Realm',
    desc: 'Mystical dimension',
    image: 'https://images.unsplash.com/photo-1709734096825-3520ee9a652f?w=400'
  }
];

// AI LIFESTYLE & TRAVEL
const lifestyleObjectives = [
  { id: 'travel-blogger', label: 'Travel Blogger', icon: '✈️', desc: 'Travel content' },
  { id: 'vacation-memories', label: 'Vacation Memories', icon: '📸', desc: 'Holiday photos' },
  { id: 'lifestyle-brand', label: 'Lifestyle Brand', icon: '🌟', desc: 'Personal brand' },
  { id: 'adventure', label: 'Adventure', icon: '🏔️', desc: 'Outdoor activities' }
];

const lifestyleClothingStyles = [
  {
    id: 'vacation-casual',
    label: 'Vacation Casual',
    desc: 'Relaxed holiday style',
    image: 'https://images.unsplash.com/photo-1756341782414-9531891fc0b9?w=400'
  },
  {
    id: 'bohemian',
    label: 'Bohemian',
    desc: 'Free-spirited',
    image: 'https://images.unsplash.com/photo-1631725232387-271a7759e8b4?w=400'
  },
  {
    id: 'adventure-wear',
    label: 'Adventure Wear',
    desc: 'Outdoor ready',
    image: 'https://images.unsplash.com/photo-1708577907839-1240466aee53?w=400'
  },
  {
    id: 'chic-traveler',
    label: 'Chic Traveler',
    desc: 'Stylish explorer',
    image: 'https://images.unsplash.com/photo-1610521411256-6664ca58a072?w=400'
  },
  {
    id: 'resort-wear',
    label: 'Resort Wear',
    desc: 'Luxury vacation',
    image: 'https://images.unsplash.com/photo-1742626181963-1244929d2fdb?w=400'
  },
  {
    id: 'beach-casual',
    label: 'Beach Casual',
    desc: 'Coastal vibes',
    image: 'https://images.unsplash.com/photo-1615327951452-7cda991728fe?w=400'
  },
  {
    id: 'safari-style',
    label: 'Safari Style',
    desc: 'Adventure chic',
    image: 'https://images.unsplash.com/photo-1708577907839-1240466aee53?w=400'
  },
  {
    id: 'summer-dress',
    label: 'Summer Dress',
    desc: 'Light and breezy',
    image: 'https://images.unsplash.com/photo-1631725232387-271a7759e8b4?w=400'
  },
  {
    id: 'wanderlust',
    label: 'Wanderlust',
    desc: 'Global nomad',
    image: 'https://images.unsplash.com/photo-1756341782414-9531891fc0b9?w=400'
  }
];

const lifestyleBackgrounds = [
  {
    id: 'beach-paradise',
    label: 'Beach Paradise',
    desc: 'Tropical beaches',
    image: 'https://images.unsplash.com/photo-1654701358121-72693ab74274?w=400'
  },
  {
    id: 'mountain-view',
    label: 'Mountain View',
    desc: 'Scenic mountains',
    image: 'https://images.unsplash.com/photo-1693342166817-9d0198c2b886?w=400'
  },
  {
    id: 'european-city',
    label: 'European City',
    desc: 'Historic streets',
    image: 'https://images.unsplash.com/photo-1626971945767-c57d2d57de02?w=400'
  },
  {
    id: 'exotic-location',
    label: 'Exotic Location',
    desc: 'Unique destinations',
    image: 'https://images.unsplash.com/photo-1709734096825-3520ee9a652f?w=400'
  },
  {
    id: 'desert-dunes',
    label: 'Desert Dunes',
    desc: 'Sandy landscapes',
    image: 'https://images.unsplash.com/photo-1693342166817-9d0198c2b886?w=400'
  },
  {
    id: 'island-resort',
    label: 'Island Resort',
    desc: 'Paradise setting',
    image: 'https://images.unsplash.com/photo-1654701358121-72693ab74274?w=400'
  },
  {
    id: 'vineyard',
    label: 'Vineyard',
    desc: 'Wine country',
    image: 'https://images.unsplash.com/photo-1709734096825-3520ee9a652f?w=400'
  },
  {
    id: 'asian-temple',
    label: 'Asian Temple',
    desc: 'Cultural heritage',
    image: 'https://images.unsplash.com/photo-1682687220923-c58b9a4592ae?w=400'
  },
  {
    id: 'coastal-cliffs',
    label: 'Coastal Cliffs',
    desc: 'Dramatic ocean views',
    image: 'https://images.unsplash.com/photo-1654701358121-72693ab74274?w=400'
  }
];

// AI SELFIE GENERATOR
const selfieObjectives = [
  { id: 'social-media', label: 'Social Media', icon: '📱', desc: 'Instagram & TikTok' },
  { id: 'profile-pic', label: 'Profile Picture', icon: '🎭', desc: 'Avatar & profiles' },
  { id: 'casual-fun', label: 'Just for Fun', icon: '😊', desc: 'Casual photos' },
  { id: 'friends', label: 'Share with Friends', icon: '👥', desc: 'Personal sharing' }
];

const selfieClothingStyles = [
  {
    id: 'everyday-casual',
    label: 'Everyday Casual',
    desc: 'Natural daily style',
    image: 'https://images.unsplash.com/photo-1610521411256-6664ca58a072?w=400'
  },
  {
    id: 'trendy',
    label: 'Trendy',
    desc: 'Current fashion',
    image: 'https://images.unsplash.com/photo-1692878968463-77823db7947b?w=400'
  },
  {
    id: 'cute',
    label: 'Cute & Fun',
    desc: 'Playful style',
    image: 'https://images.unsplash.com/photo-1756341782414-9531891fc0b9?w=400'
  },
  {
    id: 'edgy-casual',
    label: 'Edgy Casual',
    desc: 'Alternative look',
    image: 'https://images.unsplash.com/photo-1733767217381-99f6eba6a8bd?w=400'
  },
  {
    id: 'cozy-home',
    label: 'Cozy Home',
    desc: 'Comfortable loungewear',
    image: 'https://images.unsplash.com/photo-1610521411256-6664ca58a072?w=400'
  },
  {
    id: 'glam-selfie',
    label: 'Glam Selfie',
    desc: 'Glamorous look',
    image: 'https://images.unsplash.com/photo-1742626181963-1244929d2fdb?w=400'
  },
  {
    id: 'streetwear',
    label: 'Streetwear',
    desc: 'Urban fashion',
    image: 'https://images.unsplash.com/photo-1692878968463-77823db7947b?w=400'
  },
  {
    id: 'aesthetic',
    label: 'Aesthetic',
    desc: 'Instagram worthy',
    image: 'https://images.unsplash.com/photo-1631725232387-271a7759e8b4?w=400'
  },
  {
    id: 'natural-beauty',
    label: 'Natural Beauty',
    desc: 'Minimal makeup',
    image: 'https://images.unsplash.com/photo-1756341782414-9531891fc0b9?w=400'
  }
];

const selfieBackgrounds = [
  {
    id: 'home-interior',
    label: 'Home Interior',
    desc: 'Cozy home setting',
    image: 'https://images.unsplash.com/photo-1653652445848-ddc5a1c6472c?w=400'
  },
  {
    id: 'urban-street',
    label: 'Urban Street',
    desc: 'City backdrop',
    image: 'https://images.unsplash.com/photo-1626971945767-c57d2d57de02?w=400'
  },
  {
    id: 'cafe-shop',
    label: 'Café',
    desc: 'Coffee shop vibes',
    image: 'https://images.unsplash.com/photo-1690271964609-e07157a15548?w=400'
  },
  {
    id: 'outdoor-nature',
    label: 'Outdoor Nature',
    desc: 'Natural light',
    image: 'https://images.unsplash.com/photo-1709734096825-3520ee9a652f?w=400'
  },
  {
    id: 'bedroom',
    label: 'Bedroom',
    desc: 'Personal space',
    image: 'https://images.unsplash.com/photo-1653652445848-ddc5a1c6472c?w=400'
  },
  {
    id: 'bathroom-mirror',
    label: 'Bathroom Mirror',
    desc: 'Classic selfie spot',
    image: 'https://images.unsplash.com/photo-1653652445848-ddc5a1c6472c?w=400'
  },
  {
    id: 'car-interior',
    label: 'Car Interior',
    desc: 'On the go',
    image: 'https://images.unsplash.com/photo-1626971945767-c57d2d57de02?w=400'
  },
  {
    id: 'neon-lights',
    label: 'Neon Lights',
    desc: 'Vibrant nightlife',
    image: 'https://images.unsplash.com/photo-1626971945767-c57d2d57de02?w=400'
  },
  {
    id: 'sunset-golden-hour',
    label: 'Sunset Golden Hour',
    desc: 'Perfect lighting',
    image: 'https://images.unsplash.com/photo-1709734096825-3520ee9a652f?w=400'
  }
];

// AI PORTRAIT GENERATOR
const portraitObjectives = [
  { id: 'artistic', label: 'Artistic Portrait', icon: '🎨', desc: 'Creative expression' },
  { id: 'family', label: 'Family Portrait', icon: '👨‍👩‍👧', desc: 'Family memories' },
  { id: 'professional-art', label: 'Professional Art', icon: '🖼️', desc: 'Gallery worthy' },
  { id: 'gift', label: 'Gift Portrait', icon: '🎁', desc: 'Special present' }
];

const portraitClothingStyles = [
  {
    id: 'classic-elegant',
    label: 'Classic Elegant',
    desc: 'Timeless sophistication',
    image: 'https://images.unsplash.com/photo-1742626181963-1244929d2fdb?w=400'
  },
  {
    id: 'casual-natural',
    label: 'Casual Natural',
    desc: 'Relaxed and authentic',
    image: 'https://images.unsplash.com/photo-1756341782414-9531891fc0b9?w=400'
  },
  {
    id: 'artistic-bohemian',
    label: 'Artistic Bohemian',
    desc: 'Free-spirited style',
    image: 'https://images.unsplash.com/photo-1631725232387-271a7759e8b4?w=400'
  },
  {
    id: 'formal-traditional',
    label: 'Formal Traditional',
    desc: 'Classic portrait attire',
    image: 'https://images.unsplash.com/photo-1593032470861-4509830938cb?w=400'
  },
  {
    id: 'modern-chic',
    label: 'Modern Chic',
    desc: 'Contemporary elegance',
    image: 'https://images.unsplash.com/photo-1610521411256-6664ca58a072?w=400'
  },
  {
    id: 'vintage-inspired',
    label: 'Vintage Inspired',
    desc: 'Nostalgic charm',
    image: 'https://images.unsplash.com/photo-1742626181963-1244929d2fdb?w=400'
  },
  {
    id: 'monochrome',
    label: 'Monochrome',
    desc: 'Black & white elegance',
    image: 'https://images.unsplash.com/photo-1560253717-c9ece454f7d1?w=400'
  },
  {
    id: 'seasonal',
    label: 'Seasonal',
    desc: 'Season-themed attire',
    image: 'https://images.unsplash.com/photo-1736555142217-916540c7f1b7?w=400'
  },
  {
    id: 'cultural-traditional',
    label: 'Cultural Traditional',
    desc: 'Cultural heritage',
    image: 'https://images.unsplash.com/photo-1692878968463-77823db7947b?w=400'
  }
];

const portraitBackgrounds = [
  {
    id: 'studio-portrait',
    label: 'Studio Portrait',
    desc: 'Professional studio',
    image: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=400'
  },
  {
    id: 'natural-outdoor',
    label: 'Natural Outdoor',
    desc: 'Nature backdrop',
    image: 'https://images.unsplash.com/photo-1709734096825-3520ee9a652f?w=400'
  },
  {
    id: 'vintage-interior',
    label: 'Vintage Interior',
    desc: 'Classic setting',
    image: 'https://images.unsplash.com/photo-1653652445848-ddc5a1c6472c?w=400'
  },
  {
    id: 'garden-botanical',
    label: 'Garden/Botanical',
    desc: 'Floral environment',
    image: 'https://images.unsplash.com/photo-1709734096825-3520ee9a652f?w=400'
  },
  {
    id: 'urban-artistic',
    label: 'Urban Artistic',
    desc: 'City art setting',
    image: 'https://images.unsplash.com/photo-1626971945767-c57d2d57de02?w=400'
  },
  {
    id: 'library-study',
    label: 'Library/Study',
    desc: 'Intellectual backdrop',
    image: 'https://images.unsplash.com/photo-1657211689441-db9da6fdfb10?w=400'
  },
  {
    id: 'dramatic-lighting',
    label: 'Dramatic Lighting',
    desc: 'Shadow & light',
    image: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=400'
  },
  {
    id: 'home-lifestyle',
    label: 'Home Lifestyle',
    desc: 'Comfortable home',
    image: 'https://images.unsplash.com/photo-1653652445848-ddc5a1c6472c?w=400'
  },
  {
    id: 'seasonal-themed',
    label: 'Seasonal Themed',
    desc: 'Season-specific',
    image: 'https://images.unsplash.com/photo-1709734096825-3520ee9a652f?w=400'
  }
];

// AI REALISTIC PHOTO CREATOR
const realisticObjectives = [
  { id: 'everyday-life', label: 'Everyday Life', icon: '🌈', desc: 'Natural daily moments' },
  { id: 'special-occasion', label: 'Special Occasion', icon: '🎉', desc: 'Memorable events' },
  { id: 'lifestyle', label: 'Lifestyle Content', icon: '✨', desc: 'Content creation' },
  { id: 'memories', label: 'Create Memories', icon: '📸', desc: 'Life documentation' }
];

const realisticClothingStyles = [
  {
    id: 'everyday-wear',
    label: 'Everyday Wear',
    desc: 'Daily comfort',
    image: 'https://images.unsplash.com/photo-1610521411256-6664ca58a072?w=400'
  },
  {
    id: 'casual-comfortable',
    label: 'Casual Comfortable',
    desc: 'Relaxed style',
    image: 'https://images.unsplash.com/photo-1756341782414-9531891fc0b9?w=400'
  },
  {
    id: 'smart-casual-realistic',
    label: 'Smart Casual',
    desc: 'Polished casual',
    image: 'https://images.unsplash.com/photo-1619042823674-4f4ad8484b08?w=400'
  },
  {
    id: 'weekend-style',
    label: 'Weekend Style',
    desc: 'Leisure wear',
    image: 'https://images.unsplash.com/photo-1692878968463-77823db7947b?w=400'
  },
  {
    id: 'seasonal-casual',
    label: 'Seasonal Casual',
    desc: 'Weather-appropriate',
    image: 'https://images.unsplash.com/photo-1736555142217-916540c7f1b7?w=400'
  },
  {
    id: 'outdoor-active',
    label: 'Outdoor Active',
    desc: 'Adventure ready',
    image: 'https://images.unsplash.com/photo-1708577907839-1240466aee53?w=400'
  },
  {
    id: 'home-comfort',
    label: 'Home Comfort',
    desc: 'Cozy loungewear',
    image: 'https://images.unsplash.com/photo-1610521411256-6664ca58a072?w=400'
  },
  {
    id: 'casual-social',
    label: 'Casual Social',
    desc: 'Social gathering',
    image: 'https://images.unsplash.com/photo-1631725232387-271a7759e8b4?w=400'
  },
  {
    id: 'practical-chic',
    label: 'Practical Chic',
    desc: 'Functional style',
    image: 'https://images.unsplash.com/photo-1756341782414-9531891fc0b9?w=400'
  }
];

const realisticBackgrounds = [
  {
    id: 'home-environment',
    label: 'Home Environment',
    desc: 'Familiar spaces',
    image: 'https://images.unsplash.com/photo-1653652445848-ddc5a1c6472c?w=400'
  },
  {
    id: 'neighborhood',
    label: 'Neighborhood',
    desc: 'Local community',
    image: 'https://images.unsplash.com/photo-1626971945767-c57d2d57de02?w=400'
  },
  {
    id: 'park-outdoor',
    label: 'Park/Outdoor',
    desc: 'Natural setting',
    image: 'https://images.unsplash.com/photo-1709734096825-3520ee9a652f?w=400'
  },
  {
    id: 'cafe-restaurant',
    label: 'Café/Restaurant',
    desc: 'Social dining',
    image: 'https://images.unsplash.com/photo-1690271964609-e07157a15548?w=400'
  },
  {
    id: 'shopping-area',
    label: 'Shopping Area',
    desc: 'Retail setting',
    image: 'https://images.unsplash.com/photo-1626971945767-c57d2d57de02?w=400'
  },
  {
    id: 'backyard-garden',
    label: 'Backyard/Garden',
    desc: 'Private outdoor',
    image: 'https://images.unsplash.com/photo-1709734096825-3520ee9a652f?w=400'
  },
  {
    id: 'beach-nature',
    label: 'Beach/Nature',
    desc: 'Scenic natural',
    image: 'https://images.unsplash.com/photo-1654701358121-72693ab74274?w=400'
  },
  {
    id: 'city-street',
    label: 'City Street',
    desc: 'Urban everyday',
    image: 'https://images.unsplash.com/photo-1626971945767-c57d2d57de02?w=400'
  },
  {
    id: 'workspace-casual',
    label: 'Workspace Casual',
    desc: 'Work environment',
    image: 'https://images.unsplash.com/photo-1585435465945-bef5a93f8849?w=400'
  }
];

// Configuration commune pour toutes les catégories
const commonAgeRanges = [
  { id: '18-25', label: '18-25', icon: '🎓' },
  { id: '26-35', label: '26-35', icon: '💼' },
  { id: '36-45', label: '36-45', icon: '🎯' },
  { id: '46+', label: '46+', icon: '⭐' }
];

const commonEyeColors = [
  { id: 'brown', label: 'Brown', icon: '🟤' },
  { id: 'blue', label: 'Blue', icon: '🔵' },
  { id: 'green', label: 'Green', icon: '🟢' },
  { id: 'hazel', label: 'Hazel', icon: '🟡' },
  { id: 'gray', label: 'Gray', icon: '⚪' },
  { id: 'amber', label: 'Amber', icon: '🟠' }
];

const commonOrigins = [
  { id: 'caucasian', label: 'Caucasian', icon: '🌍' },
  { id: 'african', label: 'African', icon: '🌍' },
  { id: 'asian', label: 'Asian', icon: '🌏' },
  { id: 'hispanic', label: 'Hispanic', icon: '🌎' },
  { id: 'middle-eastern', label: 'Middle Eastern', icon: '🌍' },
  { id: 'mixed', label: 'Mixed', icon: '🌐' }
];

const commonBodyTypes = [
  { id: 'slim', label: 'Slim', icon: '👤' },
  { id: 'athletic', label: 'Athletic', icon: '💪' },
  { id: 'average', label: 'Average', icon: '🧍' },
  { id: 'curvy', label: 'Curvy', icon: '👥' },
  { id: 'muscular', label: 'Muscular', icon: '🏋️' }
];

// Export all category form configurations
export const categoryFormConfigs: Record<string, CategoryFormConfig> = {
  'ai-headshots': {
    categoryId: 'ai-headshots',
    categoryName: 'AI Headshots',
    maxSteps: 6,
    questions: [
      {
        id: 'objective',
        type: 'objective',
        title: 'What is your headshot goal?',
        subtitle: 'Professional photos for your career',
        options: headshotsObjectives
      },
      {
        id: 'age',
        type: 'age',
        title: 'What is your age range?',
        options: commonAgeRanges
      },
      {
        id: 'bodyType',
        type: 'bodyType',
        title: 'Select your body type',
        options: commonBodyTypes
      },
      {
        id: 'clothingStyle',
        type: 'clothingStyle',
        title: 'Choose your professional style',
        subtitle: 'Select clothing styles (up to 3)',
        options: headshotsClothingStyles
      },
      {
        id: 'backgroundStyle',
        type: 'backgroundStyle',
        title: 'Select your background',
        subtitle: 'Choose professional settings (up to 3)',
        options: headshotsBackgrounds
      },
      {
        id: 'photos',
        type: 'photos',
        title: 'Upload your photos',
        subtitle: 'Upload 6-8 photos for best results'
      }
    ]
  },

  'ai-dating-photos': {
    categoryId: 'ai-dating-photos',
    categoryName: 'AI Dating Photos',
    maxSteps: 6,
    questions: [
      {
        id: 'objective',
        type: 'objective',
        title: 'What is your dating goal?',
        subtitle: 'Perfect photos for your dating profile',
        options: datingObjectives
      },
      {
        id: 'age',
        type: 'age',
        title: 'What is your age range?',
        options: commonAgeRanges
      },
      {
        id: 'bodyType',
        type: 'bodyType',
        title: 'Select your body type',
        options: commonBodyTypes
      },
      {
        id: 'clothingStyle',
        type: 'clothingStyle',
        title: 'Choose your dating style',
        subtitle: 'Select clothing styles (up to 3)',
        options: datingClothingStyles
      },
      {
        id: 'backgroundStyle',
        type: 'backgroundStyle',
        title: 'Select your setting',
        subtitle: 'Choose dating backgrounds (up to 3)',
        options: datingBackgrounds
      },
      {
        id: 'photos',
        type: 'photos',
        title: 'Upload your photos',
        subtitle: 'Upload 6-8 photos for best results'
      }
    ]
  },

  'ai-model-photo': {
    categoryId: 'ai-model-photo',
    categoryName: 'AI Model Photo',
    maxSteps: 6,
    questions: [
      {
        id: 'objective',
        type: 'objective',
        title: 'What is your modeling goal?',
        subtitle: 'Fashion and editorial photography',
        options: modelObjectives
      },
      {
        id: 'age',
        type: 'age',
        title: 'What is your age range?',
        options: commonAgeRanges
      },
      {
        id: 'bodyType',
        type: 'bodyType',
        title: 'Select your body type',
        options: commonBodyTypes
      },
      {
        id: 'clothingStyle',
        type: 'clothingStyle',
        title: 'Choose your fashion style',
        subtitle: 'Select modeling styles (up to 3)',
        options: modelClothingStyles
      },
      {
        id: 'backgroundStyle',
        type: 'backgroundStyle',
        title: 'Select your shoot location',
        subtitle: 'Choose fashion settings (up to 3)',
        options: modelBackgrounds
      },
      {
        id: 'photos',
        type: 'photos',
        title: 'Upload your photos',
        subtitle: 'Upload 6-8 photos for best results'
      }
    ]
  },

  'ai-fitness-bikini': {
    categoryId: 'ai-fitness-bikini',
    categoryName: 'AI Fitness & Bikini',
    maxSteps: 6,
    questions: [
      {
        id: 'objective',
        type: 'objective',
        title: 'What is your fitness photo goal?',
        subtitle: 'Beach and fitness photography',
        options: fitnessObjectives
      },
      {
        id: 'age',
        type: 'age',
        title: 'What is your age range?',
        options: commonAgeRanges
      },
      {
        id: 'bodyType',
        type: 'bodyType',
        title: 'Select your body type',
        subtitle: 'Showcase your fitness level',
        options: commonBodyTypes
      },
      {
        id: 'clothingStyle',
        type: 'clothingStyle',
        title: 'Choose your fitness style',
        subtitle: 'Select athletic wear (up to 3)',
        options: fitnessClothingStyles
      },
      {
        id: 'backgroundStyle',
        type: 'backgroundStyle',
        title: 'Select your location',
        subtitle: 'Choose fitness settings (up to 3)',
        options: fitnessBackgrounds
      },
      {
        id: 'photos',
        type: 'photos',
        title: 'Upload your photos',
        subtitle: 'Upload 6-8 photos for best results'
      }
    ]
  },

  'ai-cosplay-fantasy': {
    categoryId: 'ai-cosplay-fantasy',
    categoryName: 'AI Cosplay & Fantasy',
    maxSteps: 6,
    questions: [
      {
        id: 'objective',
        type: 'objective',
        title: 'What is your cosplay goal?',
        subtitle: 'Fantasy and character photography',
        options: cosplayObjectives
      },
      {
        id: 'age',
        type: 'age',
        title: 'What is your age range?',
        options: commonAgeRanges
      },
      {
        id: 'bodyType',
        type: 'bodyType',
        title: 'Select your body type',
        options: commonBodyTypes
      },
      {
        id: 'clothingStyle',
        type: 'clothingStyle',
        title: 'Choose your character style',
        subtitle: 'Select cosplay outfits (up to 3)',
        options: cosplayClothingStyles
      },
      {
        id: 'backgroundStyle',
        type: 'backgroundStyle',
        title: 'Select your realm',
        subtitle: 'Choose fantasy settings (up to 3)',
        options: cosplayBackgrounds
      },
      {
        id: 'photos',
        type: 'photos',
        title: 'Upload your photos',
        subtitle: 'Upload 6-8 photos for best results'
      }
    ]
  },

  'ai-lifestyle-travel': {
    categoryId: 'ai-lifestyle-travel',
    categoryName: 'AI Lifestyle & Travel',
    maxSteps: 6,
    questions: [
      {
        id: 'objective',
        type: 'objective',
        title: 'What is your travel photo goal?',
        subtitle: 'Adventure and lifestyle photography',
        options: lifestyleObjectives
      },
      {
        id: 'age',
        type: 'age',
        title: 'What is your age range?',
        options: commonAgeRanges
      },
      {
        id: 'bodyType',
        type: 'bodyType',
        title: 'Select your body type',
        options: commonBodyTypes
      },
      {
        id: 'clothingStyle',
        type: 'clothingStyle',
        title: 'Choose your travel style',
        subtitle: 'Select vacation outfits (up to 3)',
        options: lifestyleClothingStyles
      },
      {
        id: 'backgroundStyle',
        type: 'backgroundStyle',
        title: 'Select your destination',
        subtitle: 'Choose travel settings (up to 3)',
        options: lifestyleBackgrounds
      },
      {
        id: 'photos',
        type: 'photos',
        title: 'Upload your photos',
        subtitle: 'Upload 6-8 photos for best results'
      }
    ]
  },

  'ai-selfie': {
    categoryId: 'ai-selfie',
    categoryName: 'AI Selfie Generator',
    maxSteps: 6,
    questions: [
      {
        id: 'objective',
        type: 'objective',
        title: 'What is your selfie goal?',
        subtitle: 'Social media ready photos',
        options: selfieObjectives
      },
      {
        id: 'age',
        type: 'age',
        title: 'What is your age range?',
        options: commonAgeRanges
      },
      {
        id: 'bodyType',
        type: 'bodyType',
        title: 'Select your body type',
        options: commonBodyTypes
      },
      {
        id: 'clothingStyle',
        type: 'clothingStyle',
        title: 'Choose your selfie style',
        subtitle: 'Select casual outfits (up to 3)',
        options: selfieClothingStyles
      },
      {
        id: 'backgroundStyle',
        type: 'backgroundStyle',
        title: 'Select your location',
        subtitle: 'Choose selfie backgrounds (up to 3)',
        options: selfieBackgrounds
      },
      {
        id: 'photos',
        type: 'photos',
        title: 'Upload your photos',
        subtitle: 'Upload 6-8 photos for best results'
      }
    ]
  },

  'ai-portrait': {
    categoryId: 'ai-portrait',
    categoryName: 'AI Portrait Generator',
    maxSteps: 6,
    questions: [
      {
        id: 'objective',
        type: 'objective',
        title: 'What is your portrait goal?',
        subtitle: 'Artistic portrait photography',
        options: portraitObjectives
      },
      {
        id: 'age',
        type: 'age',
        title: 'What is your age range?',
        options: commonAgeRanges
      },
      {
        id: 'bodyType',
        type: 'bodyType',
        title: 'Select your body type',
        options: commonBodyTypes
      },
      {
        id: 'clothingStyle',
        type: 'clothingStyle',
        title: 'Choose your portrait style',
        subtitle: 'Select portrait attire (up to 3)',
        options: portraitClothingStyles
      },
      {
        id: 'backgroundStyle',
        type: 'backgroundStyle',
        title: 'Select your setting',
        subtitle: 'Choose portrait backgrounds (up to 3)',
        options: portraitBackgrounds
      },
      {
        id: 'photos',
        type: 'photos',
        title: 'Upload your photos',
        subtitle: 'Upload 6-8 photos for best results'
      }
    ]
  },

  'ai-realistic-photo': {
    categoryId: 'ai-realistic-photo',
    categoryName: 'AI Realistic Photo Creator',
    maxSteps: 6,
    questions: [
      {
        id: 'objective',
        type: 'objective',
        title: 'What is your realistic photo goal?',
        subtitle: 'Everyday life photography',
        options: realisticObjectives
      },
      {
        id: 'age',
        type: 'age',
        title: 'What is your age range?',
        options: commonAgeRanges
      },
      {
        id: 'bodyType',
        type: 'bodyType',
        title: 'Select your body type',
        options: commonBodyTypes
      },
      {
        id: 'clothingStyle',
        type: 'clothingStyle',
        title: 'Choose your natural style',
        subtitle: 'Select realistic clothing',
        options: realisticClothingStyles
      },
      {
        id: 'backgroundStyle',
        type: 'backgroundStyle',
        title: 'Select your environment',
        subtitle: 'Choose a natural, realistic setting',
        options: realisticBackgrounds
      },
      {
        id: 'photos',
        type: 'photos',
        title: 'Upload your photos',
        subtitle: 'Upload 6-8 photos for best results'
      }
    ]
  },

  'ai-fitness-photos': {
    categoryId: 'ai-fitness-photos',
    categoryName: 'AI Fitness Photos',
    maxSteps: 6,
    questions: [
      {
        id: 'objective',
        type: 'objective',
        title: 'What is your fitness photo goal?',
        subtitle: 'Professional fitness content creation',
        options: fitnessPhotosObjectives
      },
      {
        id: 'age',
        type: 'age',
        title: 'What is your age range?',
        options: commonAgeRanges
      },
      {
        id: 'bodyType',
        type: 'bodyType',
        title: 'Select your fitness level',
        subtitle: 'Showcase your training progress',
        options: commonBodyTypes
      },
      {
        id: 'clothingStyle',
        type: 'clothingStyle',
        title: 'Choose your fitness style',
        subtitle: 'Select workout attire (up to 3)',
        options: fitnessPhotosClothingStyles
      },
      {
        id: 'backgroundStyle',
        type: 'backgroundStyle',
        title: 'Select your training location',
        subtitle: 'Choose fitness environments (up to 3)',
        options: fitnessPhotosBackgrounds
      },
      {
        id: 'photos',
        type: 'photos',
        title: 'Upload your photos',
        subtitle: 'Upload 6-8 photos for best results'
      }
    ]
  }
};
