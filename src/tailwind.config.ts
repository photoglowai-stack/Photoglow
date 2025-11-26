import type { Config } from 'tailwindcss';

const config: Config = {
  darkMode: ['class'],
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        border: 'hsl(var(--border))',
        input: 'hsl(var(--input))',
        ring: 'hsl(var(--ring))',
        background: 'hsl(var(--background))',
        foreground: 'hsl(var(--foreground))',
        primary: {
          DEFAULT: 'hsl(var(--primary))',
          foreground: 'hsl(var(--primary-foreground))',
        },
        secondary: {
          DEFAULT: 'hsl(var(--secondary))',
          foreground: 'hsl(var(--secondary-foreground))',
        },
        destructive: {
          DEFAULT: 'hsl(var(--destructive))',
          foreground: 'hsl(var(--destructive-foreground))',
        },
        muted: {
          DEFAULT: 'hsl(var(--muted))',
          foreground: 'hsl(var(--muted-foreground))',
        },
        accent: {
          DEFAULT: 'hsl(var(--accent))',
          foreground: 'hsl(var(--accent-foreground))',
        },
        popover: {
          DEFAULT: 'hsl(var(--popover))',
          foreground: 'hsl(var(--popover-foreground))',
        },
        card: {
          DEFAULT: 'hsl(var(--card))',
          foreground: 'hsl(var(--card-foreground))',
        },
      },
      borderRadius: {
        lg: 'var(--radius)',
        md: 'calc(var(--radius) - 2px)',
        sm: 'calc(var(--radius) - 4px)',
      },
      keyframes: {
        'accordion-down': {
          from: { height: '0' },
          to: { height: 'var(--radix-accordion-content-height)' },
        },
        'accordion-up': {
          from: { height: 'var(--radix-accordion-content-height)' },
          to: { height: '0' },
        },
        'fade-in': {
          from: { opacity: '0' },
          to: { opacity: '1' },
        },
        'slide-in-from-bottom': {
          from: { transform: 'translateY(20px)', opacity: '0' },
          to: { transform: 'translateY(0)', opacity: '1' },
        },
        'slide-in-from-top': {
          from: { transform: 'translateY(-20px)', opacity: '0' },
          to: { transform: 'translateY(0)', opacity: '1' },
        },
        'zoom-in': {
          from: { transform: 'scale(0.95)', opacity: '0' },
          to: { transform: 'scale(1)', opacity: '1' },
        },
        gradient: {
          '0%, 100%': { backgroundPosition: '0% 50%' },
          '50%': { backgroundPosition: '100% 50%' },
        },
        'orb-pulse': {
          '0%, 100%': { 
            transform: 'translate(0, 0) scale(1)',
            opacity: '0.25'
          },
          '50%': { 
            transform: 'translate(var(--tx, 0), var(--ty, 0)) scale(1.1)',
            opacity: '0.35'
          },
        },
        'orb-pulse-purple': {
          '0%, 100%': { 
            transform: 'translate(0, 0) scale(1)',
            opacity: '0.25'
          },
          '50%': { 
            transform: 'translate(var(--tx, 0), var(--ty, 0)) scale(1.15)',
            opacity: '0.3'
          },
        },
        'orb-pulse-pink': {
          '0%, 100%': { 
            transform: 'translate(0, 0) scale(1)',
            opacity: '0.2'
          },
          '50%': { 
            transform: 'translate(var(--tx, 0), var(--ty, 0)) scale(1.2)',
            opacity: '0.25'
          },
        },
        'float-particle': {
          '0%': {
            transform: 'translateY(0) translateX(0)',
            opacity: '0'
          },
          '10%': {
            opacity: '0.6'
          },
          '90%': {
            opacity: '0.4'
          },
          '100%': {
            transform: 'translateY(-100vh) translateX(var(--tx, 0))',
            opacity: '0'
          },
        },
      },
      animation: {
        'accordion-down': 'accordion-down 0.2s ease-out',
        'accordion-up': 'accordion-up 0.2s ease-out',
        'fade-in': 'fade-in 0.5s ease-out',
        'slide-in-from-bottom': 'slide-in-from-bottom 0.5s ease-out',
        'slide-in-from-top': 'slide-in-from-top 0.5s ease-out',
        'zoom-in': 'zoom-in 0.3s ease-out',
        gradient: 'gradient 8s linear infinite',
        'orb-pulse': 'orb-pulse 8s ease-in-out infinite',
        'orb-pulse-purple': 'orb-pulse-purple 10s ease-in-out infinite',
        'orb-pulse-pink': 'orb-pulse-pink 12s ease-in-out infinite',
        'float-particle': 'float-particle 7s ease-out infinite',
      },
    },
  },
  plugins: [require('tailwindcss-animate')],
};

export default config;
