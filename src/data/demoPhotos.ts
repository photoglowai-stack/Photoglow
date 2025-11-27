export interface DemoPhoto {
  id: string;
  image_url: string;
  prompt?: string;
  category?: string;
  created_at?: string;
}

export const demoPhotos: DemoPhoto[] = [
  {
    id: "demo-1",
    category: "professional",
    prompt: "Professional LinkedIn headshot, studio lighting",
    image_url:
      "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&w=900&q=80",
  },
  {
    id: "demo-2",
    category: "dating",
    prompt: "Warm dating app portrait, soft smile, outdoor",
    image_url:
      "https://images.unsplash.com/photo-1504274066651-8d31a536b11a?auto=format&fit=crop&w=900&q=80",
  },
  {
    id: "demo-3",
    category: "travel",
    prompt: "Travel influencer photo, cinematic sunset",
    image_url:
      "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&w=900&q=80",
  },
  {
    id: "demo-4",
    category: "fitness",
    prompt: "Fitness lifestyle portrait, natural light",
    image_url:
      "https://images.unsplash.com/photo-1542293787938-4d2226c4dc4a?auto=format&fit=crop&w=900&q=80",
  },
  {
    id: "demo-5",
    category: "selfie",
    prompt: "Bright authentic selfie, colorful background",
    image_url:
      "https://images.unsplash.com/photo-1469461084727-4bfb496cf55a?auto=format&fit=crop&w=900&q=80",
  },
  {
    id: "demo-6",
    category: "portrait",
    prompt: "Editorial portrait with neon lights",
    image_url:
      "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&w=900&q=80",
  },
];
