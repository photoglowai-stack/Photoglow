import { CategoryData } from './CategoryPage';

// Styles uniformes pour toutes les catégories
const uniformStyles = [
  {
    id: 'ai-headshots',
    title: 'AI Headshots',
    emoji: '📸',
    image: 'https://images.unsplash.com/photo-1576558656222-ba66febe3dec?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxoZWFkc2hvdCUyMHBvcnRyYWl0JTIwcHJvZmVzc2lvbmFsfGVufDF8fHx8MTc2MDAxMTA2OXww&ixlib=rb-4.1.0&q=80&w=1080',
    description: 'Professional headshot style'
  },
  {
    id: 'ai-model-photo',
    title: 'AI Model Photo',
    emoji: '💃',
    image: 'https://images.unsplash.com/photo-1736690031084-97498eb15c95?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb2RlbCUyMGZhc2hpb24lMjBwaG90b3xlbnwxfHx8fDE3NjAwMTEwNzB8MA&ixlib=rb-4.1.0&q=80&w=1080',
    description: 'Fashion model photography'
  },
  {
    id: 'ai-realistic-photo',
    title: 'AI Realistic Photo Creator',
    emoji: '🎯',
    image: 'https://images.unsplash.com/photo-1598382143506-2ac06c28d203?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxyZWFsaXN0aWMlMjBwb3J0cmFpdCUyMHBob3RvfGVufDF8fHx8MTc2MDAxMTA3MHww&ixlib=rb-4.1.0&q=80&w=1080',
    description: 'Ultra-realistic photo generation'
  },
  {
    id: 'ai-selfie-generator',
    title: 'AI Selfie Generator',
    emoji: '🤳',
    image: 'https://images.unsplash.com/photo-1648788040994-179f26016c08?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzZWxmaWUlMjBwb3J0cmFpdCUyMHlvdW5nfGVufDF8fHx8MTc2MDAxMTA3Mnww&ixlib=rb-4.1.0&q=80&w=1080',
    description: 'Perfect selfie shots'
  },
  {
    id: 'ai-portrait-generator',
    title: 'AI Portrait Generator',
    emoji: '🎨',
    image: 'https://images.unsplash.com/photo-1602531063839-46d2e7033c89?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwb3J0cmFpdCUyMGFydGlzdGljJTIwcGhvdG98ZW58MXx8fHwxNzYwMDExMDcxfDA&ixlib=rb-4.1.0&q=80&w=1080',
    description: 'Artistic portrait style'
  },
  {
    id: 'ai-dating-photos',
    title: 'AI Dating Photos',
    emoji: '❤️',
    image: 'https://images.unsplash.com/photo-1704650334674-97aa5276f464?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxkYXRpbmclMjBwcm9maWxlJTIwYXR0cmFjdGl2ZXxlbnwxfHx8fDE3NjAwMTEwNzF8MA&ixlib=rb-4.1.0&q=80&w=1080',
    description: 'Optimized for dating apps'
  }
];

export const categoryDataMap: Record<string, CategoryData> = {
  dating: {
    id: 'dating',
    name: 'Dating & Tinder',
    emoji: '🔥',
    title: 'Get More Matches with',
    subtitle: 'AI Dating Photos',
    seoKeyword: 'ai dating photos',
    description: 'Transform your dating profile with AI-enhanced photos that get 5x more matches on Tinder, Bumble, and Hinge.',
    heroImage: 'https://images.unsplash.com/photo-1755519024827-fd05075a7200?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxkYXRpbmclMjBwcm9maWxlJTIwcGhvdG98ZW58MXx8fHwxNzYwMDA5NTgzfDA&ixlib=rb-4.1.0&q=80&w=1080',
    gradient: 'from-pink-500 via-rose-500 to-red-500',
    stats: {
      users: '50K+',
      improvement: '500%'
    },
    styles: uniformStyles,
    beforeAfterExamples: [
      {
        id: 1,
        beforeImage: 'https://images.unsplash.com/photo-1576558656222-ba66febe3dec?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwcm9mZXNzaW9uYWwlMjBoZWFkc2hvdCUyMHBvcnRyYWl0fGVufDF8fHx8MTc1ODc2MjYyOHww&ixlib=rb-4.1.0&q=80&w=1080',
        afterImage: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwcm9mZXNzaW9uYWwlMjBoZWFkc2hvdCUyMG1hbnxlbnwxfHx8fDE3NTg3MjMwNTF8MA&ixlib=rb-4.1.0&q=80&w=1080',
        improvement: '+450%'
      },
      {
        id: 2,
        beforeImage: 'https://images.unsplash.com/photo-1758274252417-dd8173e5ab8f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxkYXRpbmclMjBhcHAlMjBzZWxmaWUlMjB5b3VuZ3xlbnwxfHx8fDE3NTg4MDU3NDZ8MA&ixlib=rb-4.1.0&q=80&w=1080',
        afterImage: 'https://images.unsplash.com/photo-1669268576117-d58d73b6d110?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxkYXRpbmclMjBwcm9maWxlJTIwYXR0cmFjdGl2ZSUyMG1hbnxlbnwxfHx8fDE3NTc4ODc5MjZ8MA&ixlib=rb-4.1.0&q=80&w=1080',
        improvement: '+520%'
      },
      {
        id: 3,
        beforeImage: 'https://images.unsplash.com/photo-1632024346940-1354e1a59a21?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhaSUyMHNlbGZpZSUyMHNvY2lhbCUyMG1lZGlhfGVufDF8fHx8MTc1ODgwNTc1MHww&ixlib=rb-4.1.0&q=80&w=1080',
        afterImage: 'https://images.unsplash.com/photo-1544601386-904f9418a792?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxkYXRpbmclMjBwcm9maWxlJTIwYXR0cmFjdGl2ZSUyMHdvbWFufGVufDF8fHx8MTc1Nzg4NzkyOHww&ixlib=rb-4.1.0&q=80&w=1080',
        improvement: '+480%'
      }
    ],
    testimonials: [
      {
        id: 1,
        name: 'Alex M.',
        role: 'Tinder User',
        image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwcm9mZXNzaW9uYWwlMjBoZWFkc2hvdCUyMG1hbnxlbnwxfHx8fDE3NTg3MjMwNTF8MA&ixlib=rb-4.1.0&q=80&w=1080',
        rating: 5,
        text: 'My matches increased by 10x after using these AI dating photos! Absolutely game-changing for my dating profile.'
      },
      {
        id: 2,
        name: 'Sarah K.',
        role: 'Bumble User',
        image: 'https://images.unsplash.com/photo-1544601386-904f9418a792?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxkYXRpbmclMjBwcm9maWxlJTIwYXR0cmFjdGl2ZSUyMHdvbWFufGVufDF8fHx8MTc1Nzg4NzkyOHww&ixlib=rb-4.1.0&q=80&w=1080',
        rating: 5,
        text: "Best investment I've made for online dating. The quality is incredible and looks completely natural!"
      },
      {
        id: 3,
        name: 'Mike R.',
        role: 'Hinge User',
        image: 'https://images.unsplash.com/photo-1669268576117-d58d73b6d110?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxkYXRpbmclMjBwcm9maWxlJTIwYXR0cmFjdGl2ZSUyMG1hbnxlbnwxfHx8fDE3NTc4ODc5MjZ8MA&ixlib=rb-4.1.0&q=80&w=1080',
        rating: 5,
        text: 'Finally getting quality matches! These AI dating photos made such a difference in how people perceive my profile.'
      }
    ]
  },

  professional: {
    id: 'professional',
    name: 'LinkedIn Professional',
    emoji: '👔',
    title: 'Elevate Your Career with',
    subtitle: 'AI Headshots',
    seoKeyword: 'ai headshots',
    description: 'Create stunning professional headshots for LinkedIn, resumes, and business profiles in minutes.',
    heroImage: 'https://images.unsplash.com/photo-1576558656222-ba66febe3dec?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwcm9mZXNzaW9uYWwlMjBoZWFkc2hvdCUyMGJ1c2luZXNzfGVufDF8fHx8MTc1OTk3NTEwMnww&ixlib=rb-4.1.0&q=80&w=1080',
    gradient: 'from-blue-500 via-indigo-500 to-purple-500',
    stats: {
      users: '75K+',
      improvement: '600%'
    },
    styles: uniformStyles,
    beforeAfterExamples: [
      {
        id: 1,
        beforeImage: 'https://images.unsplash.com/photo-1758274252417-dd8173e5ab8f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxkYXRpbmclMjBhcHAlMjBzZWxmaWUlMjB5b3VuZ3xlbnwxfHx8fDE3NTg4MDU3NDZ8MA&ixlib=rb-4.1.0&q=80&w=1080',
        afterImage: 'https://images.unsplash.com/photo-1576558656222-ba66febe3dec?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwcm9mZXNzaW9uYWwlMjBoZWFkc2hvdCUyMGJ1c2luZXNzfGVufDF8fHx8MTc1OTk3NTEwMnww&ixlib=rb-4.1.0&q=80&w=1080',
        improvement: '+580%'
      },
      {
        id: 2,
        beforeImage: 'https://images.unsplash.com/photo-1632024346940-1354e1a59a21?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhaSUyMHNlbGZpZSUyMHNvY2lhbCUyMG1lZGlhfGVufDF8fHx8MTc1ODgwNTc1MHww&ixlib=rb-4.1.0&q=80&w=1080',
        afterImage: 'https://images.unsplash.com/photo-1544601386-904f9418a792?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxkYXRpbmclMjBwcm9maWxlJTIwYXR0cmFjdGl2ZSUyMHdvbWFufGVufDF8fHx8MTc1Nzg4NzkyOHww&ixlib=rb-4.1.0&q=80&w=1080',
        improvement: '+625%'
      },
      {
        id: 3,
        beforeImage: 'https://images.unsplash.com/photo-1669268576117-d58d73b6d110?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxkYXRpbmclMjBwcm9maWxlJTIwYXR0cmFjdGl2ZSUyMG1hbnxlbnwxfHx8fDE3NTc4ODc5MjZ8MA&ixlib=rb-4.1.0&q=80&w=1080',
        afterImage: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwcm9mZXNzaW9uYWwlMjBoZWFkc2hvdCUyMG1hbnxlbnwxfHx8fDE3NTg3MjMwNTF8MA&ixlib=rb-4.1.0&q=80&w=1080',
        improvement: '+595%'
      }
    ],
    testimonials: [
      {
        id: 1,
        name: 'Jennifer L.',
        role: 'Marketing Director',
        image: 'https://images.unsplash.com/photo-1544601386-904f9418a792?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxkYXRpbmclMjBwcm9maWxlJTIwYXR0cmFjdGl2ZSUyMHdvbWFufGVufDF8fHx8MTc1Nzg4NzkyOHww&ixlib=rb-4.1.0&q=80&w=1080',
        rating: 5,
        text: 'Got 3x more profile views on LinkedIn after updating my AI headshots. Worth every penny!'
      },
      {
        id: 2,
        name: 'David T.',
        role: 'Software Engineer',
        image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwcm9mZXNzaW9uYWwlMjBoZWFkc2hvdCUyMG1hbnxlbnwxfHx8fDE3NTg3MjMwNTF8MA&ixlib=rb-4.1.0&q=80&w=1080',
        rating: 5,
        text: 'Perfect AI headshots for my LinkedIn profile. So much better than my old selfie!'
      },
      {
        id: 3,
        name: 'Rachel W.',
        role: 'CEO',
        image: 'https://images.unsplash.com/photo-1544601386-904f9418a792?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxkYXRpbmclMjBwcm9maWxlJTIwYXR0cmFjdGl2ZSUyMHdvbWFufGVufDF8fHx8MTc1Nzg4NzkyOHww&ixlib=rb-4.1.0&q=80&w=1080',
        rating: 5,
        text: 'Professional quality AI headshots at a fraction of the cost of a photo studio. Highly recommend!'
      }
    ]
  },

  cosplay: {
    id: 'cosplay',
    name: 'Cosplay & Fantasy',
    emoji: '🎨',
    title: 'Become Your Favorite Character with',
    subtitle: 'AI Portrait Generator',
    seoKeyword: 'ai portrait generator',
    description: 'Transform into anime characters, superheroes, and fantasy personas with stunning AI-generated cosplay photos.',
    heroImage: 'https://images.unsplash.com/photo-1735720518631-60257e2fde92?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjb3NwbGF5JTIwY29zdHVtZSUyMGZhbnRhc3l8ZW58MXx8fHwxNzYwMDA4NTI1fDA&ixlib=rb-4.1.0&q=80&w=1080',
    gradient: 'from-purple-500 via-pink-500 to-fuchsia-500',
    stats: {
      users: '35K+',
      improvement: '700%'
    },
    styles: uniformStyles,
    beforeAfterExamples: [
      {
        id: 1,
        beforeImage: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwcm9mZXNzaW9uYWwlMjBoZWFkc2hvdCUyMG1hbnxlbnwxfHx8fDE3NTg3MjMwNTF8MA&ixlib=rb-4.1.0&q=80&w=1080',
        afterImage: 'https://images.unsplash.com/photo-1735720518631-60257e2fde92?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjb3NwbGF5JTIwY29zdHVtZSUyMGZhbnRhc3l8ZW58MXx8fHwxNzYwMDA4NTI1fDA&ixlib=rb-4.1.0&q=80&w=1080',
        improvement: '+750%'
      },
      {
        id: 2,
        beforeImage: 'https://images.unsplash.com/photo-1544601386-904f9418a792?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxkYXRpbmclMjBwcm9maWxlJTIwYXR0cmFjdGl2ZSUyMHdvbWFufGVufDF8fHx8MTc1Nzg4NzkyOHww&ixlib=rb-4.1.0&q=80&w=1080',
        afterImage: 'https://images.unsplash.com/photo-1614577903872-22b8b259b60c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjb3NwbGF5JTIwZmFudGFzeSUyMGNvc3R1bWUlMjBjaGFyYWN0ZXJ8ZW58MXx8fHwxNzU4ODI5NDc2fDA&ixlib=rb-4.1.0&q=80&w=1080',
        improvement: '+680%'
      },
      {
        id: 3,
        beforeImage: 'https://images.unsplash.com/photo-1669268576117-d58d73b6d110?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxkYXRpbmclMjBwcm9maWxlJTIwYXR0cmFjdGl2ZSUyMG1hbnxlbnwxfHx8fDE3NTc4ODc5MjZ8MA&ixlib=rb-4.1.0&q=80&w=1080',
        afterImage: 'https://images.unsplash.com/photo-1735720518631-60257e2fde92?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjb3NwbGF5JTIwY29zdHVtZSUyMGZhbnRhc3l8ZW58MXx8fHwxNzYwMDA4NTI1fDA&ixlib=rb-4.1.0&q=80&w=1080',
        improvement: '+710%'
      }
    ],
    testimonials: [
      {
        id: 1,
        name: 'Luna S.',
        role: 'Cosplay Artist',
        image: 'https://images.unsplash.com/photo-1544601386-904f9418a792?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxkYXRpbmclMjBwcm9maWxlJTIwYXR0cmFjdGl2ZSUyMHdvbWFufGVufDF8fHx8MTc1Nzg4NzkyOHww&ixlib=rb-4.1.0&q=80&w=1080',
        rating: 5,
        text: 'Amazing AI portrait generator! I can finally be all my favorite characters without spending thousands on costumes!'
      },
      {
        id: 2,
        name: 'Kevin M.',
        role: 'Anime Fan',
        image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwcm9mZXNzaW9uYWwlMjBoZWFkc2hvdCUyMG1hbnxlbnwxfHx8fDE3NTg3MjMwNTF8MA&ixlib=rb-4.1.0&q=80&w=1080',
        rating: 5,
        text: 'The quality of the AI portrait generator is mind-blowing. My Instagram followers went crazy over these!'
      },
      {
        id: 3,
        name: 'Mia T.',
        role: 'Content Creator',
        image: 'https://images.unsplash.com/photo-1544601386-904f9418a792?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxkYXRpbmclMjBwcm9maWxlJTIwYXR0cmFjdGl2ZSUyMHdvbWFufGVufDF8fHx8MTc1Nzg4NzkyOHww&ixlib=rb-4.1.0&q=80&w=1080',
        rating: 5,
        text: 'Perfect AI portrait generator for my gaming channel! My subscribers love the variety of characters I can create.'
      }
    ]
  },

  lifestyle: {
    id: 'lifestyle',
    name: 'Lifestyle & Travel',
    emoji: '🌴',
    title: 'Live Your Best Life with',
    subtitle: 'AI Realistic Photo Creator',
    seoKeyword: 'ai realistic photo creator',
    description: 'Create stunning lifestyle and travel photos for Instagram, social media, and your personal brand.',
    heroImage: 'https://images.unsplash.com/photo-1698790545292-7cab493f8fd5?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxsaWZlc3R5bGUlMjB0cmF2ZWwlMjBhZHZlbnR1cmV8ZW58MXx8fHwxNzYwMDA5NTg2fDA&ixlib=rb-4.1.0&q=80&w=1080',
    gradient: 'from-green-500 via-teal-500 to-cyan-500',
    stats: {
      users: '60K+',
      improvement: '550%'
    },
    styles: uniformStyles,
    beforeAfterExamples: [
      {
        id: 1,
        beforeImage: 'https://images.unsplash.com/photo-1758274252417-dd8173e5ab8f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxkYXRpbmclMjBhcHAlMjBzZWxmaWUlMjB5b3VuZ3xlbnwxfHx8fDE3NTg4MDU3NDZ8MA&ixlib=rb-4.1.0&q=80&w=1080',
        afterImage: 'https://images.unsplash.com/photo-1698790545292-7cab493f8fd5?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxsaWZlc3R5bGUlMjB0cmF2ZWwlMjBhZHZlbnR1cmV8ZW58MXx8fHwxNzYwMDA5NTg2fDA&ixlib=rb-4.1.0&q=80&w=1080',
        improvement: '+540%'
      },
      {
        id: 2,
        beforeImage: 'https://images.unsplash.com/photo-1632024346940-1354e1a59a21?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhaSUyMHNlbGZpZSUyMHNvY2lhbCUyMG1lZGlhfGVufDF8fHx8MTc1ODgwNTc1MHww&ixlib=rb-4.1.0&q=80&w=1080',
        afterImage: 'https://images.unsplash.com/photo-1626740069663-81ca965e5f14?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmaXRuZXNzJTIwYXRobGV0aWMlMjBiZWFjaHxlbnwxfHx8fDE3NjAwMDk1ODJ8MA&ixlib=rb-4.1.0&q=80&w=1080',
        improvement: '+580%'
      },
      {
        id: 3,
        beforeImage: 'https://images.unsplash.com/photo-1669268576117-d58d73b6d110?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxkYXRpbmclMjBwcm9maWxlJTIwYXR0cmFjdGl2ZSUyMG1hbnxlbnwxfHx8fDE3NTc4ODc5MjZ8MA&ixlib=rb-4.1.0&q=80&w=1080',
        afterImage: 'https://images.unsplash.com/photo-1692171295305-e84a1d62a842?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxsaWZlc3R5bGUlMjB0cmF2ZWwlMjB2YWNhdGlvbiUyMHBvcnRyYWl0fGVufDF8fHx8MTc1ODgyOTQ5M3ww&ixlib=rb-4.1.0&q=80&w=1080',
        improvement: '+560%'
      }
    ],
    testimonials: [
      {
        id: 1,
        name: 'Emma R.',
        role: 'Travel Blogger',
        image: 'https://images.unsplash.com/photo-1544601386-904f9418a792?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxkYXRpbmclMjBwcm9maWxlJTIwYXR0cmFjdGl2ZSUyMHdvbWFufGVufDF8fHx8MTc1Nzg4NzkyOHww&ixlib=rb-4.1.0&q=80&w=1080',
        rating: 5,
        text: "As a travel blogger, I love this AI realistic photo creator! The photos look like I've actually been to these amazing places!"
      },
      {
        id: 2,
        name: 'Chris P.',
        role: 'Instagram Influencer',
        image: 'https://images.unsplash.com/photo-1669268576117-d58d73b6d110?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxkYXRpbmclMjBwcm9maWxlJTIwYXR0cmFjdGl2ZSUyMG1hbnxlbnwxfHx8fDE3NTc4ODc5MjZ8MA&ixlib=rb-4.1.0&q=80&w=1080',
        rating: 5,
        text: 'My engagement rate doubled with the AI realistic photo creator! These lifestyle photos are exactly what my feed needed.'
      },
      {
        id: 3,
        name: 'Sophie L.',
        role: 'Lifestyle Content Creator',
        image: 'https://images.unsplash.com/photo-1544601386-904f9418a792?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxkYXRpbmclMjBwcm9maWxlJTIwYXR0cmFjdGl2ZSUyMHdvbWFufGVufDF8fHx8MTc1Nzg4NzkyOHww&ixlib=rb-4.1.0&q=80&w=1080',
        rating: 5,
        text: 'Incredible value! The AI realistic photo creator lets me create content without constantly traveling. Game changer!'
      }
    ]
  },

  fitness: {
    id: 'fitness',
    name: 'Fitness & Bikini',
    emoji: '🏋️',
    title: 'Show Off Your Best Physique with',
    subtitle: 'AI Model Photo',
    seoKeyword: 'ai model photo',
    description: 'Get professional fitness and beach photos that showcase your hard work and dedication.',
    heroImage: 'https://images.unsplash.com/photo-1626740069663-81ca965e5f14?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmaXRuZXNzJTIwYXRobGV0aWMlMjBiZWFjaHxlbnwxfHx8fDE3NjAwMDk1ODJ8MA&ixlib=rb-4.1.0&q=80&w=1080',
    gradient: 'from-orange-500 via-amber-500 to-yellow-500',
    stats: {
      users: '45K+',
      improvement: '650%'
    },
    styles: uniformStyles,
    beforeAfterExamples: [
      {
        id: 1,
        beforeImage: 'https://images.unsplash.com/photo-1758274252417-dd8173e5ab8f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxkYXRpbmclMjBhcHAlMjBzZWxmaWUlMjB5b3VuZ3xlbnwxfHx8fDE3NTg4MDU3NDZ8MA&ixlib=rb-4.1.0&q=80&w=1080',
        afterImage: 'https://images.unsplash.com/photo-1626740069663-81ca965e5f14?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmaXRuZXNzJTIwYXRobGV0aWMlMjBiZWFjaHxlbnwxfHx8fDE3NjAwMDk1ODJ8MA&ixlib=rb-4.1.0&q=80&w=1080',
        improvement: '+620%'
      },
      {
        id: 2,
        beforeImage: 'https://images.unsplash.com/photo-1632024346940-1354e1a59a21?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhaSUyMHNlbGZpZSUyMHNvY2lhbCUyMG1lZGlhfGVufDF8fHx8MTc1ODgwNTc1MHww&ixlib=rb-4.1.0&q=80&w=1080',
        afterImage: 'https://images.unsplash.com/flagged/photo-1570540051903-5c5ff97a14a3?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmaXRuZXNzJTIwYmlraW5pJTIwYmVhY2glMjBhdGhsZXRpY3xlbnwxfHx8fDE3NTg4Mjk0OTZ8MA&ixlib=rb-4.1.0&q=80&w=1080',
        improvement: '+680%'
      },
      {
        id: 3,
        beforeImage: 'https://images.unsplash.com/photo-1669268576117-d58d73b6d110?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxkYXRpbmclMjBwcm9maWxlJTIwYXR0cmFjdGl2ZSUyMG1hbnxlbnwxfHx8fDE3NTc4ODc5MjZ8MA&ixlib=rb-4.1.0&q=80&w=1080',
        afterImage: 'https://images.unsplash.com/photo-1626740069663-81ca965e5f14?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmaXRuZXNzJTIwYXRobGV0aWMlMjBiZWFjaHxlbnwxfHx8fDE3NjAwMDk1ODJ8MA&ixlib=rb-4.1.0&q=80&w=1080',
        improvement: '+640%'
      }
    ],
    testimonials: [
      {
        id: 1,
        name: 'Jake T.',
        role: 'Fitness Influencer',
        image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwcm9mZXNzaW9uYWwlMjBoZWFkc2hvdCUyMG1hbnxlbnwxfHx8fDE3NTg3MjMwNTF8MA&ixlib=rb-4.1.0&q=80&w=1080',
        rating: 5,
        text: 'These AI model photos are perfect for my fitness page! My followers love the professional quality shots.'
      },
      {
        id: 2,
        name: 'Maria S.',
        role: 'Personal Trainer',
        image: 'https://images.unsplash.com/photo-1544601386-904f9418a792?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxkYXRpbmclMjBwcm9maWxlJTIwYXR0cmFjdGl2ZSUyMHdvbWFufGVufDF8fHx8MTc1Nzg4NzkyOHww&ixlib=rb-4.1.0&q=80&w=1080',
        rating: 5,
        text: 'Got so many new clients after posting my AI model photos! The transformation results look incredible.'
      },
      {
        id: 3,
        name: 'Ryan M.',
        role: 'Bodybuilder',
        image: 'https://images.unsplash.com/photo-1669268576117-d58d73b6d110?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxkYXRpbmclMjBwcm9maWxlJTIwYXR0cmFjdGl2ZSUyMG1hbnxlbnwxfHx8fDE3NTc4ODc5MjZ8MA&ixlib=rb-4.1.0&q=80&w=1080',
        rating: 5,
        text: 'These AI model photos are competition-ready! Way cheaper than hiring a professional photographer.'
      }
    ]
  },

  fun: {
    id: 'fun',
    name: 'Fun & Memes',
    emoji: '😂',
    title: 'Create Viral Content with',
    subtitle: 'AI Selfie Generator',
    seoKeyword: 'ai selfie generator',
    description: 'Generate fun, creative, and meme-worthy selfies that will get you likes and shares on social media.',
    heroImage: 'https://images.unsplash.com/photo-1601233749202-95d04d5b3c00?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmdW5ueSUyMHBvcnRyYWl0JTIwaGFwcHl8ZW58MXx8fHwxNzYwMDA5NTgzfDA&ixlib=rb-4.1.0&q=80&w=1080',
    gradient: 'from-cyan-500 via-blue-500 to-indigo-500',
    stats: {
      users: '100K+',
      improvement: '800%'
    },
    styles: uniformStyles,
    beforeAfterExamples: [
      {
        id: 1,
        beforeImage: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwcm9mZXNzaW9uYWwlMjBoZWFkc2hvdCUyMG1hbnxlbnwxfHx8fDE3NTg3MjMwNTF8MA&ixlib=rb-4.1.0&q=80&w=1080',
        afterImage: 'https://images.unsplash.com/photo-1601233749202-95d04d5b3c00?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmdW5ueSUyMHBvcnRyYWl0JTIwaGFwcHl8ZW58MXx8fHwxNzYwMDA5NTgzfDA&ixlib=rb-4.1.0&q=80&w=1080',
        improvement: '+850%'
      },
      {
        id: 2,
        beforeImage: 'https://images.unsplash.com/photo-1544601386-904f9418a792?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxkYXRpbmclMjBwcm9maWxlJTIwYXR0cmFjdGl2ZSUyMHdvbWFufGVufDF8fHx8MTc1Nzg4NzkyOHww&ixlib=rb-4.1.0&q=80&w=1080',
        afterImage: 'https://images.unsplash.com/photo-1601233749202-95d04d5b3c00?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmdW5ueSUyMHBvcnRyYWl0JTIwaGFwcHl8ZW58MXx8fHwxNzYwMDA5NTgzfDA&ixlib=rb-4.1.0&q=80&w=1080',
        improvement: '+780%'
      },
      {
        id: 3,
        beforeImage: 'https://images.unsplash.com/photo-1669268576117-d58d73b6d110?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxkYXRpbmclMjBwcm9maWxlJTIwYXR0cmFjdGl2ZSUyMG1hbnxlbnwxfHx8fDE3NTc4ODc5MjZ8MA&ixlib=rb-4.1.0&q=80&w=1080',
        afterImage: 'https://images.unsplash.com/photo-1601233749202-95d04d5b3c00?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmdW5ueSUyMHBvcnRyYWl0JTIwaGFwcHl8ZW58MXx8fHwxNzYwMDA5NTgzfDA&ixlib=rb-4.1.0&q=80&w=1080',
        improvement: '+820%'
      }
    ],
    testimonials: [
      {
        id: 1,
        name: 'Tyler B.',
        role: 'TikTok Creator',
        image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwcm9mZXNzaW9uYWwlMjBoZWFkc2hvdCUyMG1hbnxlbnwxfHx8fDE3NTg3MjMwNTF8MA&ixlib=rb-4.1.0&q=80&w=1080',
        rating: 5,
        text: 'This AI selfie generator is INSANE! My TikTok views went through the roof with these creative selfies!'
      },
      {
        id: 2,
        name: 'Zoe K.',
        role: 'Meme Creator',
        image: 'https://images.unsplash.com/photo-1544601386-904f9418a792?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxkYXRpbmclMjBwcm9maWxlJTIwYXR0cmFjdGl2ZSUyMHdvbWFufGVufDF8fHx8MTc1Nzg4NzkyOHww&ixlib=rb-4.1.0&q=80&w=1080',
        rating: 5,
        text: 'Best AI selfie generator ever! I can create unlimited funny content for my Instagram meme page!'
      },
      {
        id: 3,
        name: 'Max P.',
        role: 'Content Creator',
        image: 'https://images.unsplash.com/photo-1669268576117-d58d73b6d110?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxkYXRpbmclMjBwcm9maWxlJTIwYXR0cmFjdGl2ZSUyMG1hbnxlbnwxfHx8fDE3NTc4ODc5MjZ8MA&ixlib=rb-4.1.0&q=80&w=1080',
        rating: 5,
        text: 'The AI selfie generator saves me hours! I can pump out hilarious content daily now. Pure gold!'
      }
    ]
  }
};
