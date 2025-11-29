/** @type {import('next').NextConfig} */
const nextConfig = {
  /* Basic Config */
  reactStrictMode: true,
  swcMinify: true,
  
  /* Image Optimization */
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**.supabase.co',
        pathname: '/storage/v1/object/public/**',
      },
      {
        protocol: 'https',
        hostname: 'image.pollinations.ai',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'replicate.delivery',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'pbxt.replicate.delivery',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
        pathname: '/**',
      },
    ],
    formats: ['image/avif', 'image/webp'],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    minimumCacheTTL: 60,
  },
  
  /* Build Config */
  output: 'standalone',
  
  /* Experimental Features */
  experimental: {
    serverActions: {
      bodySizeLimit: '10mb',
    },
    optimizePackageImports: [
      'lucide-react',
      '@radix-ui/react-icons',
      'recharts',
    ],
  },
  
  /* Headers for Security */
  async headers() {
    return [
      {
        source: '/:path*',
        headers: [
          {
            key: 'X-DNS-Prefetch-Control',
            value: 'on'
          },
          {
            key: 'Strict-Transport-Security',
            value: 'max-age=63072000; includeSubDomains; preload'
          },
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff'
          },
          {
            key: 'X-Frame-Options',
            value: 'SAMEORIGIN'
          },
          {
            key: 'Referrer-Policy',
            value: 'origin-when-cross-origin'
          },
        ],
      },
    ];
  },
  
  /* Redirects */
  async redirects() {
    return [
      // Add redirects here if needed
    ];
  },
  
  /* Rewrites */
  async rewrites() {
    return [
      // Add rewrites here if needed
    ];
  },
  
  /* Webpack Config */
  webpack: (config, { isServer }) => {
    // Custom webpack config if needed
    
    // Handle canvas (for potential image processing)
    config.externals = config.externals || [];
    if (isServer) {
      config.externals.push('canvas');
    }
    
    return config;
  },
  
  /* Environment Variables */
  env: {
    NEXT_PUBLIC_APP_NAME: 'PhotoGlow',
    NEXT_PUBLIC_APP_VERSION: '3.0.0',
  },
  
  /* TypeScript Config */
  typescript: {
    // !! WARN !!
    // Dangerously allow production builds to successfully complete even if
    // your project has type errors.
    // Set to false in production
    ignoreBuildErrors: false,
  },
  
  /* ESLint Config */
  eslint: {
    // Warning: This allows production builds to successfully complete even if
    // your project has ESLint errors.
    ignoreDuringBuilds: false,
  },
};

export default nextConfig;
