import { 
  Briefcase, 
  Camera, 
  Sparkles, 
  User, 
  Palette,
  Zap
} from 'lucide-react';

export interface CategoryPageConfig {
  id: string;
  title: string;
  subtitle: string;
  colors: {
    primary: string;
    secondary: string;
    accent: string;
    gradient: string;
    buttonGradient: string;
    badgeGradient: string;
    glowColor: string;
  };
  keywords: string[];
  heroImage: string;
  beforeAfterExamples: {
    before: string;
    after: string;
    improvement: string;
  }[];
  additionalImages: string[];
  features: {
    title: string;
    description: string;
  }[];
  testimonials: {
    name: string;
    role: string;
    text: string;
    image: string;
  }[];
  faqItems: {
    question: string;
    answer: string;
  }[];
  icon: any;
  badge: string;
}

export const categoryPagesConfig: Record<string, CategoryPageConfig> = {
  'ai-headshots': {
    id: 'ai-headshots',
    title: 'AI Headshots for',
    subtitle: 'LinkedIn Profiles',
    colors: {
      primary: '#0A66C2',
      secondary: '#60A5FA',
      accent: '#F3F4F6',
      gradient: 'from-blue-500 to-indigo-500',
      buttonGradient: 'from-[#0A66C2] to-[#60A5FA]',
      badgeGradient: 'from-blue-500/20 to-indigo-500/20',
      glowColor: 'rgba(10, 102, 194, 0.3)'
    },
    keywords: [
      'ai portrait generator',
      'ai headshots',
      'ai headshot generator',
      'ai realistic headshot',
      'ai virtual headshot',
      'ai headshot creator',
      'ai portrait photo',
      'ai headshot app',
      'ai generated headshot',
      'ai portrait photo generator'
    ],
    heroImage: 'https://images.unsplash.com/photo-1655249481446-25d575f1c054?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwcm9mZXNzaW9uYWwlMjBoZWFkc2hvdCUyMGJ1c2luZXNzJTIwcG9ydHJhaXR8ZW58MXx8fHwxNzYwMDE0OTE3fDA&ixlib=rb-4.1.0&q=80&w=1080',
    beforeAfterExamples: [
      {
        before: 'https://images.unsplash.com/photo-1662695089339-a2c24231a3ac?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjYXN1YWwlMjBzZWxmaWUlMjBiZWZvcmUlMjBwaG90b3xlbnwxfHx8fDE3NjAwMTQ5MTB8MA&ixlib=rb-4.1.0&q=80&w=1080',
        after: 'https://images.unsplash.com/photo-1655249481446-25d575f1c054?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwcm9mZXNzaW9uYWwlMjBoZWFkc2hvdCUyMGJ1c2luZXNzJTIwcG9ydHJhaXR8ZW58MXx8fHwxNzYwMDE0OTE3fDA&ixlib=rb-4.1.0&q=80&w=1080',
        improvement: '+580%'
      },
      {
        before: 'https://images.unsplash.com/photo-1662695089339-a2c24231a3ac?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjYXN1YWwlMjBzZWxmaWUlMjBiZWZvcmUlMjBwaG90b3xlbnwxfHx8fDE3NjAwMTQ5MTB8MA&ixlib=rb-4.1.0&q=80&w=1080',
        after: 'https://images.unsplash.com/photo-1758599543120-4e462429a4d7?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjb3Jwb3JhdGUlMjBoZWFkc2hvdCUyMHdvbWFuJTIwcHJvZmVzc2lvbmFsfGVufDF8fHx8MTc2MDAxNDkwN3ww&ixlib=rb-4.1.0&q=80&w=1080',
        improvement: '+625%'
      },
      {
        before: 'https://images.unsplash.com/photo-1662695089339-a2c24231a3ac?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjYXN1YWwlMjBzZWxmaWUlMjBiZWZvcmUlMjBwaG90b3xlbnwxfHx8fDE3NjAwMTQ5MTB8MA&ixlib=rb-4.1.0&q=80&w=1080',
        after: 'https://images.unsplash.com/photo-1758518727984-17b37f2f0562?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxidXNpbmVzcyUyMHBvcnRyYWl0JTIwbWFuJTIwcHJvZmVzc2lvbmFsfGVufDF8fHx8MTc2MDAxNDkxMnww&ixlib=rb-4.1.0&q=80&w=1080',
        improvement: '+595%'
      }
    ],
    additionalImages: [
      'https://images.unsplash.com/photo-1706824261828-6127b3beb64d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzdHVkaW8lMjBwb3J0cmFpdCUyMHByb2Zlc3Npb25hbCUyMGxpZ2h0aW5nfGVufDF8fHx8MTc2MDAxNDkwOHww&ixlib=rb-4.1.0&q=80&w=1080',
      'https://images.unsplash.com/photo-1659100947220-48b5d5738148?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxsaW5rZWRpbiUyMHByb2ZpbGUlMjBwaG90byUyMHByb2Zlc3Npb25hbHxlbnwxfHx8fDE3NjAwMTQ5MDV8MA&ixlib=rb-4.1.0&q=80&w=1080',
      'https://images.unsplash.com/photo-1655249481446-25d575f1c054?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwcm9mZXNzaW9uYWwlMjBoZWFkc2hvdCUyMGJ1c2luZXNzJTIwcG9ydHJhaXR8ZW58MXx8fHwxNzYwMDE0OTE3fDA&ixlib=rb-4.1.0&q=80&w=1080',
      'https://images.unsplash.com/photo-1758599543120-4e462429a4d7?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjb3Jwb3JhdGUlMjBoZWFkc2hvdCUyMHdvbWFuJTIwcHJvZmVzc2lvbmFsfGVufDF8fHx8MTc2MDAxNDkwN3ww&ixlib=rb-4.1.0&q=80&w=1080'
    ],
    features: [
      {
        title: 'Professional Quality',
        description: 'Studio-grade AI portrait generator that creates realistic, professional AI headshot photos indistinguishable from real photoshoots.'
      },
      {
        title: 'Lightning Fast',
        description: 'Get your AI virtual headshot in under 5 minutes. No appointments, no waiting. Perfect AI headshot creator for busy professionals.'
      },
      {
        title: '100% Privacy',
        description: 'Your photos are processed securely with our AI realistic headshot generator. We never share or store your personal images.'
      }
    ],
    testimonials: [
      {
        name: 'Sarah Mitchell',
        role: 'Product Manager at Tech Startup',
        text: 'Perfect AI portrait photo for my LinkedIn profile. The AI headshot creator produced incredibly professional and natural results. Best AI realistic headshot app I\'ve tried!',
        image: 'https://images.unsplash.com/photo-1758599543120-4e462429a4d7?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjb3Jwb3JhdGUlMjBoZWFkc2hvdCUyMHdvbWFuJTIwcHJvZmVzc2lvbmFsfGVufDF8fHx8MTc2MDAxNDkwN3ww&ixlib=rb-4.1.0&q=80&w=1080'
      },
      {
        name: 'James Chen',
        role: 'Software Engineer at Fortune 500',
        text: 'Saved me hundreds of dollars and hours of time. The AI virtual headshot looks amazing on my CV. This AI portrait generator is a game-changer!',
        image: 'https://images.unsplash.com/photo-1758518727984-17b37f2f0562?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxidXNpbmVzcyUyMHBvcnRyYWl0JTIwbWFuJTIwcHJvZmVzc2lvbmFsfGVufDF8fHx8MTc2MDAxNDkxMnww&ixlib=rb-4.1.0&q=80&w=1080'
      },
      {
        name: 'Emily Rodriguez',
        role: 'Marketing Director at Digital Agency',
        text: 'The AI headshot app produced such realistic results. Got 3x more profile views after updating my AI generated headshot. Absolutely love it!',
        image: 'https://images.unsplash.com/photo-1659100947220-48b5d5738148?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxsaW5rZWRpbiUyMHByb2ZpbGUlMjBwaG90byUyMHByb2Zlc3Npb25hbHxlbnwxfHx8fDE3NjAwMTQ5MDV8MA&ixlib=rb-4.1.0&q=80&w=1080'
      }
    ],
    faqItems: [
      {
        question: 'How does the AI headshot generator work?',
        answer: 'Our AI portrait generator uses advanced AI technology to transform your casual photos into professional AI headshots. Simply upload a photo, select your style, and get studio-quality AI virtual headshots in minutes.'
      },
      {
        question: 'Will my AI generated headshot look realistic?',
        answer: 'Yes! Our AI realistic headshot app creates professional portraits that are indistinguishable from real photoshoots. The AI portrait photo generator ensures natural-looking results perfect for LinkedIn and professional use.'
      },
      {
        question: 'How long does it take to get my AI headshot?',
        answer: 'The AI headshot creator typically generates your professional portraits in under 5 minutes. You\'ll receive multiple AI headshot photos to choose from.'
      },
      {
        question: 'Can I use the AI portrait generator photos commercially?',
        answer: 'Yes, all AI headshots created with our AI headshot app come with full commercial usage rights. Use them on LinkedIn, CVs, websites, and any professional materials.'
      }
    ],
    icon: Briefcase,
    badge: '#1 AI Portrait Generator for LinkedIn'
  },

  'ai-model-photo': {
    id: 'ai-model-photo',
    title: 'AI Model Photos for',
    subtitle: 'Fashion & Lookbooks',
    colors: {
      primary: '#F9F5F1',
      secondary: '#FBCFE8',
      accent: '#111111',
      gradient: 'from-pink-300 to-rose-300',
      buttonGradient: 'from-pink-400 to-rose-400',
      badgeGradient: 'from-pink-500/20 to-rose-500/20',
      glowColor: 'rgba(251, 207, 232, 0.3)'
    },
    keywords: [
      'ai model photo',
      'ai fashion photo',
      'ai model generator',
      'ai model shoot',
      'ai fashion portrait',
      'ai virtual model',
      'ai fashion photography',
      'ai model creator',
      'ai lookbook generator',
      'ai fashion model'
    ],
    heroImage: 'https://images.unsplash.com/photo-1469334031218-e382a71b716b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmYXNoaW9uJTIwbW9kZWwlMjBwb3J0cmFpdHxlbnwxfHx8fDE3NjAwMTczNjd8MA&ixlib=rb-4.1.0&q=80&w=1080',
    beforeAfterExamples: [
      {
        before: 'https://images.unsplash.com/photo-1485968579580-b6d095142e6e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjYXN1YWwlMjBwaG90byUyMGZhc2hpb258ZW58MXx8fHwxNzYwMDE3Mzc1fDA&ixlib=rb-4.1.0&q=80&w=1080',
        after: 'https://images.unsplash.com/photo-1469334031218-e382a71b716b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmYXNoaW9uJTIwbW9kZWwlMjBwb3J0cmFpdHxlbnwxfHx8fDE3NjAwMTczNjd8MA&ixlib=rb-4.1.0&q=80&w=1080',
        improvement: '+750%'
      },
      {
        before: 'https://images.unsplash.com/photo-1485968579580-b6d095142e6e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjYXN1YWwlMjBwaG90byUyMGZhc2hpb258ZW58MXx8fHwxNzYwMDE3Mzc1fDA&ixlib=rb-4.1.0&q=80&w=1080',
        after: 'https://images.unsplash.com/photo-1529139574466-a303027c1d8b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmYXNoaW9uJTIwbW9kZWwlMjBzdHVkaW98ZW58MXx8fHwxNzYwMDE3Mzc4fDA&ixlib=rb-4.1.0&q=80&w=1080',
        improvement: '+690%'
      },
      {
        before: 'https://images.unsplash.com/photo-1485968579580-b6d095142e6e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjYXN1YWwlMjBwaG90byUyMGZhc2hpb258ZW58MXx8fHwxNzYwMDE3Mzc1fDA&ixlib=rb-4.1.0&q=80&w=1080',
        after: 'https://images.unsplash.com/photo-1581044777550-4cfa60707c03?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmYXNoaW9uJTIwcG9ydHJhaXQlMjBtb2RlbHxlbnwxfHx8fDE3NjAwMTczODB8MA&ixlib=rb-4.1.0&q=80&w=1080',
        improvement: '+710%'
      }
    ],
    additionalImages: [
      'https://images.unsplash.com/photo-1469334031218-e382a71b716b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmYXNoaW9uJTIwbW9kZWwlMjBwb3J0cmFpdHxlbnwxfHx8fDE3NjAwMTczNjd8MA&ixlib=rb-4.1.0&q=80&w=1080',
      'https://images.unsplash.com/photo-1529139574466-a303027c1d8b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmYXNoaW9uJTIwbW9kZWwlMjBzdHVkaW98ZW58MXx8fHwxNzYwMDE3Mzc4fDA&ixlib=rb-4.1.0&q=80&w=1080',
      'https://images.unsplash.com/photo-1581044777550-4cfa60707c03?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmYXNoaW9uJTIwcG9ydHJhaXQlMjBtb2RlbHxlbnwxfHx8fDE3NjAwMTczODB8MA&ixlib=rb-4.1.0&q=80&w=1080',
      'https://images.unsplash.com/photo-1617019114583-affb34d1b3cd?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmYXNoaW9uJTIwcGhvdG9ncmFwaHl8ZW58MXx8fHwxNzYwMDE3MzgzfDA&ixlib=rb-4.1.0&q=80&w=1080'
    ],
    features: [
      {
        title: 'Editorial Quality',
        description: 'Professional AI model photo generator that creates stunning fashion shoots and lookbook images perfect for brands and influencers.'
      },
      {
        title: 'Fashion-Perfect Lighting',
        description: 'Our AI fashion photo creator uses advanced lighting techniques to produce magazine-quality AI virtual model portraits instantly.'
      },
      {
        title: 'Multiple Styles',
        description: 'Choose from various fashion photography styles with our AI model generator. From editorial to commercial looks.'
      }
    ],
    testimonials: [
      {
        name: 'Isabella Laurent',
        role: 'Fashion Blogger & Influencer',
        text: 'The AI model photo quality is incredible! Perfect for my lookbook and Instagram. This AI fashion portrait generator saves me thousands on photoshoots.',
        image: 'https://images.unsplash.com/photo-1469334031218-e382a71b716b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmYXNoaW9uJTIwbW9kZWwlMjBwb3J0cmFpdHxlbnwxfHx8fDE3NjAwMTczNjd8MA&ixlib=rb-4.1.0&q=80&w=1080'
      },
      {
        name: 'Marcus Rivera',
        role: 'E-commerce Brand Owner',
        text: 'Game-changer for product photography! The AI model generator creates professional lookbook images. No more expensive model shoots.',
        image: 'https://images.unsplash.com/photo-1581044777550-4cfa60707c03?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmYXNoaW9uJTIwcG9ydHJhaXQlMjBtb2RlbHxlbnwxfHx8fDE3NjAwMTczODB8MA&ixlib=rb-4.1.0&q=80&w=1080'
      },
      {
        name: 'Sophie Chen',
        role: 'Fashion Designer',
        text: 'Perfect for showcasing my collections! The AI fashion photo creator produces editorial-quality images for my portfolio and website.',
        image: 'https://images.unsplash.com/photo-1529139574466-a303027c1d8b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmYXNoaW9uJTIwbW9kZWwlMjBzdHVkaW98ZW58MXx8fHwxNzYwMDE3Mzc4fDA&ixlib=rb-4.1.0&q=80&w=1080'
      }
    ],
    faqItems: [
      {
        question: 'How does the AI model photo generator work?',
        answer: 'Our AI fashion photo creator transforms your photos into professional model shoots. Upload your image, choose your fashion style, and get editorial-quality AI model photos in minutes.'
      },
      {
        question: 'Can I use this for my fashion brand?',
        answer: 'Absolutely! The AI model generator is perfect for e-commerce, lookbooks, and fashion campaigns. All images come with commercial usage rights.'
      },
      {
        question: 'What fashion styles are available?',
        answer: 'Our AI fashion portrait generator offers editorial, commercial, street fashion, and luxury lookbook styles. Perfect for any fashion photography need.'
      },
      {
        question: 'How realistic are the AI virtual model photos?',
        answer: 'The AI model photo generator creates incredibly realistic, professional-grade images that are indistinguishable from traditional fashion photography.'
      }
    ],
    icon: Palette,
    badge: '#1 AI Model Photo Generator'
  },

  'ai-realistic-photo': {
    id: 'ai-realistic-photo',
    title: 'AI Realistic Photo',
    subtitle: 'Creator',
    colors: {
      primary: '#E5E7EB',
      secondary: '#1F2937',
      accent: '#F9FAFB',
      gradient: 'from-gray-500 to-gray-700',
      buttonGradient: 'from-gray-600 to-gray-800',
      badgeGradient: 'from-gray-500/20 to-gray-700/20',
      glowColor: 'rgba(31, 41, 55, 0.3)'
    },
    keywords: [
      'ai realistic photo',
      'ai photorealistic generator',
      'ai realistic portraits',
      'ai photorealistic portrait',
      'ai realistic image generator',
      'ai photo realistic generator',
      'ai photorealism',
      'ai realistic photo creator',
      'ai hyper realistic photo',
      'ai ultra realistic photo'
    ],
    heroImage: 'https://images.unsplash.com/photo-1740989475605-355ada18c3fb?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxyZWFsaXN0aWMlMjBwb3J0cmFpdCUyMHBob3RvcmVhbGlzbXxlbnwxfHx8fDE3NjAwMTU3MzN8MA&ixlib=rb-4.1.0&q=80&w=1080',
    beforeAfterExamples: [
      {
        before: 'https://images.unsplash.com/photo-1662695089339-a2c24231a3ac?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjYXN1YWwlMjBzZWxmaWUlMjBiZWZvcmUlMjBwaG90b3xlbnwxfHx8fDE3NjAwMTQ5MTB8MA&ixlib=rb-4.1.0&q=80&w=1080',
        after: 'https://images.unsplash.com/photo-1740989475605-355ada18c3fb?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxyZWFsaXN0aWMlMjBwb3J0cmFpdCUyMHBob3RvcmVhbGlzbXxlbnwxfHx8fDE3NjAwMTU3MzN8MA&ixlib=rb-4.1.0&q=80&w=1080',
        improvement: '+820%'
      },
      {
        before: 'https://images.unsplash.com/photo-1662695089339-a2c24231a3ac?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjYXN1YWwlMjBzZWxmaWUlMjBiZWZvcmUlMjBwaG90b3xlbnwxfHx8fDE3NjAwMTQ5MTB8MA&ixlib=rb-4.1.0&q=80&w=1080',
        after: 'https://images.unsplash.com/photo-1758599543120-4e462429a4d7?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjb3Jwb3JhdGUlMjBoZWFkc2hvdCUyMHdvbWFuJTIwcHJvZmVzc2lvbmFsfGVufDF8fHx8MTc2MDAxNDkwN3ww&ixlib=rb-4.1.0&q=80&w=1080',
        improvement: '+765%'
      },
      {
        before: 'https://images.unsplash.com/photo-1662695089339-a2c24231a3ac?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjYXN1YWwlMjBzZWxmaWUlMjBiZWZvcmUlMjBwaG90b3xlbnwxfHx8fDE3NjAwMTQ5MTB8MA&ixlib=rb-4.1.0&q=80&w=1080',
        after: 'https://images.unsplash.com/photo-1758518727984-17b37f2f0562?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxidXNpbmVzcyUyMHBvcnRyYWl0JTIwbWFuJTIwcHJvZmVzc2lvbmFsfGVufDF8fHx8MTc2MDAxNDkxMnww&ixlib=rb-4.1.0&q=80&w=1080',
        improvement: '+795%'
      }
    ],
    additionalImages: [
      'https://images.unsplash.com/photo-1740989475605-355ada18c3fb?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxyZWFsaXN0aWMlMjBwb3J0cmFpdCUyMHBob3RvcmVhbGlzbXxlbnwxfHx8fDE3NjAwMTU3MzN8MA&ixlib=rb-4.1.0&q=80&w=1080',
      'https://images.unsplash.com/photo-1655249481446-25d575f1c054?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwcm9mZXNzaW9uYWwlMjBoZWFkc2hvdCUyMGJ1c2luZXNzJTIwcG9ydHJhaXR8ZW58MXx8fHwxNzYwMDE0OTE3fDA&ixlib=rb-4.1.0&q=80&w=1080',
      'https://images.unsplash.com/photo-1758599543120-4e462429a4d7?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjb3Jwb3JhdGUlMjBoZWFkc2hvdCUyMHdvbWFuJTIwcHJvZmVzc2lvbmFsfGVufDF8fHx8MTc2MDAxNDkwN3ww&ixlib=rb-4.1.0&q=80&w=1080',
      'https://images.unsplash.com/photo-1758518727984-17b37f2f0562?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxidXNpbmVzcyUyMHBvcnRyYWl0JTIwbWFuJTIwcHJvZmVzc2lvbmFsfGVufDF8fHx8MTc2MDAxNDkxMnww&ixlib=rb-4.1.0&q=80&w=1080'
    ],
    features: [
      {
        title: 'Hyper-Realistic Quality',
        description: 'AI photorealistic generator that creates ultra-realistic photos indistinguishable from real photographs. Perfect AI realistic image generator.'
      },
      {
        title: 'Natural Details',
        description: 'Our AI realistic photo creator preserves natural skin texture, lighting, and details for authentic AI photorealism results.'
      },
      {
        title: '100% Lifelike',
        description: 'Generate AI realistic portraits that look completely real. The best AI photo realistic generator for authentic results.'
      }
    ],
    testimonials: [
      {
        name: 'Alex Thompson',
        role: 'Digital Artist',
        text: 'The AI realistic photo quality is mind-blowing! This AI photorealistic generator creates images I can\'t tell from real photos. Best AI realistic image generator!',
        image: 'https://images.unsplash.com/photo-1740989475605-355ada18c3fb?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxyZWFsaXN0aWMlMjBwb3J0cmFpdCUyMHBob3RvcmVhbGlzbXxlbnwxfHx8fDE3NjAwMTU3MzN8MA&ixlib=rb-4.1.0&q=80&w=1080'
      },
      {
        name: 'Nina Patel',
        role: 'Content Creator',
        text: 'Incredible AI photorealistic portrait quality! The AI realistic photo creator produces images that look 100% real. Perfect for my portfolio.',
        image: 'https://images.unsplash.com/photo-1758599543120-4e462429a4d7?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjb3Jwb3JhdGUlMjBoZWFkc2hvdCUyMHdvbWFuJTIwcHJvZmVzc2lvbmFsfGVufDF8fHx8MTc2MDAxNDkwN3ww&ixlib=rb-4.1.0&q=80&w=1080'
      },
      {
        name: 'David Kim',
        role: 'Photographer',
        text: 'As a professional photographer, I\'m amazed by this AI photo realistic generator. The AI photorealism quality rivals real studio photography!',
        image: 'https://images.unsplash.com/photo-1758518727984-17b37f2f0562?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxidXNpbmVzcyUyMHBvcnRyYWl0JTIwbWFuJTIwcHJvZmVzc2lvbmFsfGVufDF8fHx8MTc2MDAxNDkxMnww&ixlib=rb-4.1.0&q=80&w=1080'
      }
    ],
    faqItems: [
      {
        question: 'How realistic are the AI generated photos?',
        answer: 'Our AI photorealistic generator creates hyper-realistic photos that are virtually indistinguishable from real photographs. The AI realistic photo creator uses advanced algorithms for authentic AI photorealism.'
      },
      {
        question: 'What makes this AI realistic image generator different?',
        answer: 'Our AI realistic photo creator focuses on natural details, authentic lighting, and lifelike textures. The AI photorealistic portrait quality is unmatched in the industry.'
      },
      {
        question: 'Can I use AI realistic photos commercially?',
        answer: 'Yes! All photos created with our AI photo realistic generator come with full commercial usage rights. Perfect for business and creative projects.'
      },
      {
        question: 'How long does AI photorealism generation take?',
        answer: 'The AI realistic photo creator generates ultra-realistic images in under 5 minutes. Fast, high-quality AI photorealistic generator results.'
      }
    ],
    icon: Sparkles,
    badge: '#1 AI Realistic Photo Creator'
  },

  'ai-selfie': {
    id: 'ai-selfie',
    title: 'AI Selfie',
    subtitle: 'Generator',
    colors: {
      primary: '#9333EA',
      secondary: '#EC4899',
      accent: '#FB923C',
      gradient: 'from-purple-500 via-pink-500 to-orange-400',
      buttonGradient: 'from-purple-600 via-pink-600 to-orange-500',
      badgeGradient: 'from-purple-500/20 via-pink-500/20 to-orange-400/20',
      glowColor: 'rgba(147, 51, 234, 0.3)'
    },
    keywords: [
      'ai selfie generator',
      'ai photo selfie',
      'ai profile picture generator',
      'ai selfie creator',
      'ai generated selfie',
      'ai selfie app',
      'ai selfie photo',
      'ai profile picture',
      'ai selfie maker',
      'ai social media photo'
    ],
    heroImage: 'https://images.unsplash.com/photo-1758522491297-b36260d59d1f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjYXN1YWwlMjBzZWxmaWUlMjBzb2NpYWwlMjBtZWRpYXxlbnwxfHx8fDE3NjAwMTU3MzR8MA&ixlib=rb-4.1.0&q=80&w=1080',
    beforeAfterExamples: [
      {
        before: 'https://images.unsplash.com/photo-1662695089339-a2c24231a3ac?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjYXN1YWwlMjBzZWxmaWUlMjBiZWZvcmUlMjBwaG90b3xlbnwxfHx8fDE3NjAwMTQ5MTB8MA&ixlib=rb-4.1.0&q=80&w=1080',
        after: 'https://images.unsplash.com/photo-1758522491297-b36260d59d1f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjYXN1YWwlMjBzZWxmaWUlMjBzb2NpYWwlMjBtZWRpYXxlbnwxfHx8fDE3NjAwMTU3MzR8MA&ixlib=rb-4.1.0&q=80&w=1080',
        improvement: '+650%'
      },
      {
        before: 'https://images.unsplash.com/photo-1662695089339-a2c24231a3ac?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjYXN1YWwlMjBzZWxmaWUlMjBiZWZvcmUlMjBwaG90b3xlbnwxfHx8fDE3NjAwMTQ5MTB8MA&ixlib=rb-4.1.0&q=80&w=1080',
        after: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwcm9maWxlJTIwcGljdHVyZSUyMHdvbWFufGVufDF8fHx8MTc1Nzg4NzkyNXww&ixlib=rb-4.1.0&q=80&w=1080',
        improvement: '+720%'
      },
      {
        before: 'https://images.unsplash.com/photo-1662695089339-a2c24231a3ac?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjYXN1YWwlMjBzZWxmaWUlMjBiZWZvcmUlMjBwaG90b3xlbnwxfHx8fDE3NjAwMTQ5MTB8MA&ixlib=rb-4.1.0&q=80&w=1080',
        after: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwcm9mZXNzaW9uYWwlMjBoZWFkc2hvdCUyMG1hbnxlbnwxfHx8fDE3NTg3MjMwNTF8MA&ixlib=rb-4.1.0&q=80&w=1080',
        improvement: '+680%'
      }
    ],
    additionalImages: [
      'https://images.unsplash.com/photo-1758522491297-b36260d59d1f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjYXN1YWwlMjBzZWxmaWUlMjBzb2NpYWwlMjBtZWRpYXxlbnwxfHx8fDE3NjAwMTU3MzR8MA&ixlib=rb-4.1.0&q=80&w=1080',
      'https://images.unsplash.com/photo-1544005313-94ddf0286df2?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwcm9maWxlJTIwcGljdHVyZSUyMHdvbWFufGVufDF8fHx8MTc1Nzg4NzkyNXww&ixlib=rb-4.1.0&q=80&w=1080',
      'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwcm9mZXNzaW9uYWwlMjBoZWFkc2hvdCUyMG1hbnxlbnwxfHx8fDE3NTg3MjMwNTF8MA&ixlib=rb-4.1.0&q=80&w=1080',
      'https://images.unsplash.com/photo-1758522491297-b36260d59d1f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjYXN1YWwlMjBzZWxmaWUlMjBzb2NpYWwlMjBtZWRpYXxlbnwxfHx8fDE3NjAwMTU3MzR8MA&ixlib=rb-4.1.0&q=80&w=1080'
    ],
    features: [
      {
        title: 'Perfect for Social Media',
        description: 'AI selfie generator creates stunning profile pictures and AI photo selfies perfect for Instagram, TikTok, and all social media platforms.'
      },
      {
        title: 'Multiple Styles',
        description: 'Choose from various AI selfie photo styles with our AI profile picture generator. From casual to glamorous AI generated selfie looks.'
      },
      {
        title: 'Instant Results',
        description: 'Get your AI selfie app results in minutes. Fast AI selfie creator that produces professional AI profile pictures instantly.'
      }
    ],
    testimonials: [
      {
        name: 'Mia Rodriguez',
        role: 'Social Media Influencer',
        text: 'This AI selfie generator is amazing! Perfect AI profile picture generator for my Instagram. The AI photo selfie quality is incredible!',
        image: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwcm9maWxlJTIwcGljdHVyZSUyMHdvbWFufGVufDF8fHx8MTc1Nzg4NzkyNXww&ixlib=rb-4.1.0&q=80&w=1080'
      },
      {
        name: 'Tyler Jackson',
        role: 'Content Creator',
        text: 'Best AI selfie app ever! The AI selfie creator produces professional AI generated selfies that get so many likes. Love this AI profile picture tool!',
        image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwcm9mZXNzaW9uYWwlMjBoZWFkc2hvdCUyMG1hbnxlbnwxfHx8fDE3NTg3MjMwNTF8MA&ixlib=rb-4.1.0&q=80&w=1080'
      },
      {
        name: 'Zara Williams',
        role: 'Lifestyle Blogger',
        text: 'My go-to AI selfie generator! Creates perfect AI profile pictures for all my social media. This AI photo selfie tool is a must-have!',
        image: 'https://images.unsplash.com/photo-1758522491297-b36260d59d1f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjYXN1YWwlMjBzZWxmaWUlMjBzb2NpYWwlMjBtZWRpYXxlbnwxfHx8fDE3NjAwMTU3MzR8MA&ixlib=rb-4.1.0&q=80&w=1080'
      }
    ],
    faqItems: [
      {
        question: 'How does the AI selfie generator work?',
        answer: 'Our AI selfie creator transforms your photos into stunning AI profile pictures. Upload a photo, choose your style, and get perfect AI generated selfies for social media in minutes.'
      },
      {
        question: 'Is the AI profile picture generator good for Instagram?',
        answer: 'Absolutely! The AI selfie app creates perfect AI photo selfies for Instagram, TikTok, and all social platforms. Professional AI selfie photo quality guaranteed.'
      },
      {
        question: 'How many AI selfie photos do I get?',
        answer: 'The AI selfie generator creates multiple AI profile pictures to choose from. Get various AI generated selfie styles with one upload using our AI selfie creator.'
      },
      {
        question: 'Can I customize my AI profile picture?',
        answer: 'Yes! Our AI selfie app offers multiple styles and settings. The AI photo selfie generator lets you create the perfect AI selfie photo for your needs.'
      }
    ],
    icon: Camera,
    badge: '#1 AI Selfie Generator'
  },

  'ai-photo-generator': {
    id: 'ai-photo-generator',
    title: 'AI Photo',
    subtitle: 'Generator',
    colors: {
      primary: '#2563EB',
      secondary: '#F9FAFB',
      accent: '#111827',
      gradient: 'from-blue-600 to-cyan-500',
      buttonGradient: 'from-blue-600 to-cyan-600',
      badgeGradient: 'from-blue-500/20 to-cyan-500/20',
      glowColor: 'rgba(37, 99, 235, 0.3)'
    },
    keywords: [
      'ai photo generator',
      'ai photo creator',
      'ai photography app',
      'ai photo realistic generator',
      'ai photo maker',
      'ai photo editor',
      'ai photo enhancement',
      'ai photo tool',
      'ai image generator',
      'ai photo app'
    ],
    heroImage: 'https://images.unsplash.com/photo-1757310998648-f8aaa5572e8e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhaSUyMHRlY2hub2xvZ3klMjBpbnRlcmZhY2V8ZW58MXx8fHwxNzU5ODk4MjA2fDA&ixlib=rb-4.1.0&q=80&w=1080',
    beforeAfterExamples: [
      {
        before: 'https://images.unsplash.com/photo-1662695089339-a2c24231a3ac?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjYXN1YWwlMjBzZWxmaWUlMjBiZWZvcmUlMjBwaG90b3xlbnwxfHx8fDE3NjAwMTQ5MTB8MA&ixlib=rb-4.1.0&q=80&w=1080',
        after: 'https://images.unsplash.com/photo-1655249481446-25d575f1c054?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwcm9mZXNzaW9uYWwlMjBoZWFkc2hvdCUyMGJ1c2luZXNzJTIwcG9ydHJhaXR8ZW58MXx8fHwxNzYwMDE0OTE3fDA&ixlib=rb-4.1.0&q=80&w=1080',
        improvement: '+600%'
      },
      {
        before: 'https://images.unsplash.com/photo-1662695089339-a2c24231a3ac?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjYXN1YWwlMjBzZWxmaWUlMjBiZWZvcmUlMjBwaG90b3xlbnwxfHx8fDE3NjAwMTQ5MTB8MA&ixlib=rb-4.1.0&q=80&w=1080',
        after: 'https://images.unsplash.com/photo-1758522491297-b36260d59d1f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjYXN1YWwlMjBzZWxmaWUlMjBzb2NpYWwlMjBtZWRpYXxlbnwxfHx8fDE3NjAwMTU3MzR8MA&ixlib=rb-4.1.0&q=80&w=1080',
        improvement: '+700%'
      },
      {
        before: 'https://images.unsplash.com/photo-1662695089339-a2c24231a3ac?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjYXN1YWwlMjBzZWxmaWUlMjBiZWZvcmUlMjBwaG90b3xlbnwxfHx8fDE3NjAwMTQ5MTB8MA&ixlib=rb-4.1.0&q=80&w=1080',
        after: 'https://images.unsplash.com/photo-1740989475605-355ada18c3fb?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxyZWFsaXN0aWMlMjBwb3J0cmFpdCUyMHBob3RvcmVhbGlzbXxlbnwxfHx8fDE3NjAwMTU3MzN8MA&ixlib=rb-4.1.0&q=80&w=1080',
        improvement: '+750%'
      }
    ],
    additionalImages: [
      'https://images.unsplash.com/photo-1655249481446-25d575f1c054?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwcm9mZXNzaW9uYWwlMjBoZWFkc2hvdCUyMGJ1c2luZXNzJTIwcG9ydHJhaXR8ZW58MXx8fHwxNzYwMDE0OTE3fDA&ixlib=rb-4.1.0&q=80&w=1080',
      'https://images.unsplash.com/photo-1758522491297-b36260d59d1f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjYXN1YWwlMjBzZWxmaWUlMjBzb2NpYWwlMjBtZWRpYXxlbnwxfHx8fDE3NjAwMTU3MzR8MA&ixlib=rb-4.1.0&q=80&w=1080',
      'https://images.unsplash.com/photo-1740989475605-355ada18c3fb?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxyZWFsaXN0aWMlMjBwb3J0cmFpdCUyMHBob3RvcmVhbGlzbXxlbnwxfHx8fDE3NjAwMTU3MzN8MA&ixlib=rb-4.1.0&q=80&w=1080',
      'https://images.unsplash.com/photo-1469334031218-e382a71b716b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmYXNoaW9uJTIwbW9kZWwlMjBwb3J0cmFpdHxlbnwxfHx8fDE3NjAwMTczNjd8MA&ixlib=rb-4.1.0&q=80&w=1080'
    ],
    features: [
      {
        title: 'All-in-One Tool',
        description: 'Complete AI photo generator and AI photo creator for all your photo needs. From AI photo realistic generator to AI photo enhancement.'
      },
      {
        title: 'Professional Results',
        description: 'Our AI photography app produces studio-quality results. The best AI photo maker and AI photo editor for creating amazing images.'
      },
      {
        title: 'Easy to Use',
        description: 'Simple AI photo tool that anyone can use. Just upload and let our AI image generator and AI photo app create perfect results.'
      }
    ],
    testimonials: [
      {
        name: 'Ryan Foster',
        role: 'Creative Director',
        text: 'Best AI photo generator I\'ve used! This AI photo creator and AI photography app handles everything. Perfect AI photo realistic generator!',
        image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwcm9mZXNzaW9uYWwlMjBoZWFkc2hvdCUyMG1hbnxlbnwxfHx8fDE3NTg3MjMwNTF8MA&ixlib=rb-4.1.0&q=80&w=1080'
      },
      {
        name: 'Lisa Anderson',
        role: 'Marketing Manager',
        text: 'This AI photo app is incredible! The AI photo maker and AI photo editor features are top-notch. Best AI image generator for business!',
        image: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwcm9maWxlJTIwcGljdHVyZSUyMHdvbWFufGVufDF8fHx8MTc1Nzg4NzkyNXww&ixlib=rb-4.1.0&q=80&w=1080'
      },
      {
        name: 'Kevin Wu',
        role: 'Entrepreneur',
        text: 'Essential AI photo tool! Combines AI photo generator, AI photo creator, and AI photo enhancement in one perfect AI photography app!',
        image: 'https://images.unsplash.com/photo-1655249481446-25d575f1c054?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwcm9mZXNzaW9uYWwlMjBoZWFkc2hvdCUyMGJ1c2luZXNzJTIwcG9ydHJhaXR8ZW58MXx8fHwxNzYwMDE0OTE3fDA&ixlib=rb-4.1.0&q=80&w=1080'
      }
    ],
    faqItems: [
      {
        question: 'What can this AI photo generator do?',
        answer: 'Our AI photo creator is an all-in-one AI photography app. It works as an AI photo realistic generator, AI photo maker, AI photo editor, and AI image generator in one tool.'
      },
      {
        question: 'Is this AI photo app easy to use?',
        answer: 'Yes! Our AI photo generator is designed for simplicity. Just upload your photo and let our AI photo creator and AI photo tool handle everything automatically.'
      },
      {
        question: 'What makes this the best AI photo maker?',
        answer: 'Our AI photography app combines professional AI photo enhancement with ease of use. The AI image generator produces AI photo realistic results every time.'
      },
      {
        question: 'Can I use this AI photo editor commercially?',
        answer: 'Absolutely! All photos from our AI photo generator and AI photo creator come with full commercial rights. Perfect for business use.'
      }
    ],
    icon: Zap,
    badge: '#1 AI Photo Generator Tool'
  },

  'ai-portrait': {
    id: 'ai-portrait',
    title: 'AI Portrait',
    subtitle: 'Generator',
    colors: {
      primary: '#FF5F6D',
      secondary: '#FFC371',
      accent: '#FFF7ED',
      gradient: 'from-red-400 via-orange-400 to-yellow-400',
      buttonGradient: 'from-red-500 via-orange-500 to-yellow-500',
      badgeGradient: 'from-red-500/20 via-orange-400/20 to-yellow-400/20',
      glowColor: 'rgba(255, 95, 109, 0.3)'
    },
    keywords: [
      'ai portrait generator',
      'ai headshot generator',
      'ai realistic portrait',
      'ai head generator',
      'ai portrait creator',
      'ai portrait photo',
      'ai portrait maker',
      'ai portrait photography',
      'ai artistic portrait',
      'ai portrait app'
    ],
    heroImage: 'https://images.unsplash.com/photo-1575193473927-47d451e90788?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhcnRpc3RpYyUyMHBvcnRyYWl0JTIwYm9rZWh8ZW58MXx8fHwxNzYwMDE1NzM0fDA&ixlib=rb-4.1.0&q=80&w=1080',
    beforeAfterExamples: [
      {
        before: 'https://images.unsplash.com/photo-1662695089339-a2c24231a3ac?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjYXN1YWwlMjBzZWxmaWUlMjBiZWZvcmUlMjBwaG90b3xlbnwxfHx8fDE3NjAwMTQ5MTB8MA&ixlib=rb-4.1.0&q=80&w=1080',
        after: 'https://images.unsplash.com/photo-1575193473927-47d451e90788?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhcnRpc3RpYyUyMHBvcnRyYWl0JTIwYm9rZWh8ZW58MXx8fHwxNzYwMDE1NzM0fDA&ixlib=rb-4.1.0&q=80&w=1080',
        improvement: '+850%'
      },
      {
        before: 'https://images.unsplash.com/photo-1662695089339-a2c24231a3ac?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjYXN1YWwlMjBzZWxmaWUlMjBiZWZvcmUlMjBwaG90b3xlbnwxfHx8fDE3NjAwMTQ5MTB8MA&ixlib=rb-4.1.0&q=80&w=1080',
        after: 'https://images.unsplash.com/photo-1740989475605-355ada18c3fb?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxyZWFsaXN0aWMlMjBwb3J0cmFpdCUyMHBob3RvcmVhbGlzbXxlbnwxfHx8fDE3NjAwMTU3MzN8MA&ixlib=rb-4.1.0&q=80&w=1080',
        improvement: '+790%'
      },
      {
        before: 'https://images.unsplash.com/photo-1662695089339-a2c24231a3ac?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjYXN1YWwlMjBzZWxmaWUlMjBiZWZvcmUlMjBwaG90b3xlbnwxfHx8fDE3NjAwMTQ5MTB8MA&ixlib=rb-4.1.0&q=80&w=1080',
        after: 'https://images.unsplash.com/photo-1655249481446-25d575f1c054?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwcm9mZXNzaW9uYWwlMjBoZWFkc2hvdCUyMGJ1c2luZXNzJTIwcG9ydHJhaXR8ZW58MXx8fHwxNzYwMDE0OTE3fDA&ixlib=rb-4.1.0&q=80&w=1080',
        improvement: '+810%'
      }
    ],
    additionalImages: [
      'https://images.unsplash.com/photo-1575193473927-47d451e90788?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhcnRpc3RpYyUyMHBvcnRyYWl0JTIwYm9rZWh8ZW58MXx8fHwxNzYwMDE1NzM0fDA&ixlib=rb-4.1.0&q=80&w=1080',
      'https://images.unsplash.com/photo-1740989475605-355ada18c3fb?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxyZWFsaXN0aWMlMjBwb3J0cmFpdCUyMHBob3RvcmVhbGlzbXxlbnwxfHx8fDE3NjAwMTU3MzN8MA&ixlib=rb-4.1.0&q=80&w=1080',
      'https://images.unsplash.com/photo-1655249481446-25d575f1c054?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwcm9mZXNzaW9uYWwlMjBoZWFkc2hvdCUyMGJ1c2luZXNzJTIwcG9ydHJhaXR8ZW58MXx8fHwxNzYwMDE0OTE3fDA&ixlib=rb-4.1.0&q=80&w=1080',
      'https://images.unsplash.com/photo-1758599543120-4e462429a4d7?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjb3Jwb3JhdGUlMjBoZWFkc2hvdCUyMHdvbWFuJTIwcHJvZmVzc2lvbmFsfGVufDF8fHx8MTc2MDAxNDkwN3ww&ixlib=rb-4.1.0&q=80&w=1080'
    ],
    features: [
      {
        title: 'Artistic & Professional',
        description: 'AI portrait generator creates both artistic and professional AI realistic portraits. Perfect AI portrait creator for any style.'
      },
      {
        title: 'Advanced AI Technology',
        description: 'Our AI headshot generator uses cutting-edge AI portrait photography technology. Best AI head generator for stunning AI portrait photos.'
      },
      {
        title: 'Multiple Styles',
        description: 'Choose from artistic or realistic styles with our AI portrait maker. Versatile AI portrait app for all your photography needs.'
      }
    ],
    testimonials: [
      {
        name: 'Oliver Bennett',
        role: 'Portrait Photographer',
        text: 'Incredible AI portrait generator! The AI realistic portrait quality rivals my professional work. Best AI headshot generator and AI portrait creator I\'ve seen!',
        image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwcm9mZXNzaW9uYWwlMjBoZWFkc2hvdCUyMG1hbnxlbnwxfHx8fDE3NTg3MjMwNTF8MA&ixlib=rb-4.1.0&q=80&w=1080'
      },
      {
        name: 'Sophia Martinez',
        role: 'Art Director',
        text: 'Perfect AI portrait photo tool! This AI portrait maker and AI portrait photography app creates stunning AI artistic portraits. Love it!',
        image: 'https://images.unsplash.com/photo-1758599543120-4e462429a4d7?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjb3Jwb3JhdGUlMjBoZWFkc2hvdCUyMHdvbWFuJTIwcHJvZmVzc2lvbmFsfGVufDF8fHx8MTc2MDAxNDkwN3ww&ixlib=rb-4.1.0&q=80&w=1080'
      },
      {
        name: 'Lucas Taylor',
        role: 'Digital Artist',
        text: 'Best AI portrait generator available! The AI head generator and AI portrait creator produce amazing AI realistic portraits for my portfolio!',
        image: 'https://images.unsplash.com/photo-1655249481446-25d575f1c054?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwcm9mZXNzaW9uYWwlMjBoZWFkc2hvdCUyMGJ1c2luZXNzJTIwcG9ydHJhaXR8ZW58MXx8fHwxNzYwMDE0OTE3fDA&ixlib=rb-4.1.0&q=80&w=1080'
      }
    ],
    faqItems: [
      {
        question: 'What is an AI portrait generator?',
        answer: 'Our AI portrait generator is an advanced AI portrait creator that transforms photos into professional or artistic AI realistic portraits. It works as both an AI headshot generator and AI portrait maker.'
      },
      {
        question: 'Can I create both artistic and realistic portraits?',
        answer: 'Yes! Our AI portrait photography app offers both artistic and realistic styles. The AI portrait creator and AI head generator can produce any AI portrait photo style you need.'
      },
      {
        question: 'How does the AI realistic portrait creation work?',
        answer: 'The AI portrait generator uses advanced algorithms to create stunning AI realistic portraits. Simply upload a photo and our AI portrait maker handles everything.'
      },
      {
        question: 'Is this AI headshot generator good for professional use?',
        answer: 'Absolutely! Our AI portrait app creates professional-grade AI portrait photos perfect for business. The AI portrait creator produces studio-quality AI realistic portraits.'
      }
    ],
    icon: User,
    badge: '#1 AI Portrait Generator'
  }
};
