# 🖼️ Figma Components

**Purpose**: React components specifically designed to handle Figma integration.

---

## 📄 Components

### ImageWithFallback.tsx

**Purpose**: Image component with automatic fallback handling for Figma assets.

#### Why This Component Exists

Figma Make uses special `figma:asset/` imports that may not work outside the Figma Make environment. This component provides graceful fallback handling.

#### Features

- ✅ **Automatic Fallback** - Shows placeholder if image fails to load
- ✅ **Error Logging** - Logs errors for debugging
- ✅ **Type-Safe** - Full TypeScript support
- ✅ **Drop-in Replacement** - Same props as `<img>` tag
- ✅ **Performance** - No overhead when image loads successfully

#### Usage

```typescript
import { ImageWithFallback } from './components/figma/ImageWithFallback';
import heroImage from 'figma:asset/abc123.png';

// Basic usage
<ImageWithFallback 
  src={heroImage} 
  alt="Hero image"
/>

// With styling
<ImageWithFallback 
  src={heroImage} 
  alt="Hero image"
  className="w-full h-auto rounded-lg"
/>

// With external URL
<ImageWithFallback 
  src="https://example.com/image.jpg"
  alt="External image"
/>
```

#### Props

Same as HTML `<img>` element:

| Prop | Type | Required | Description |
|------|------|----------|-------------|
| `src` | `string` | Yes | Image source (figma:asset or URL) |
| `alt` | `string` | Yes | Alternative text |
| `className` | `string` | No | CSS classes |
| `loading` | `'lazy' \| 'eager'` | No | Loading strategy |
| ...rest | `ImgHTMLAttributes` | No | All other img props |

#### How It Works

```typescript
1. Try to load the image from src
2. If successful → Display image
3. If error → Display placeholder + log error
4. Fallback is invisible to user experience
```

#### Examples in Codebase

This component is used in **10+ components**:

- `AIPhotoGenerator.tsx`
- `BeforeAfterTransformation.tsx`
- `CategoryHowItWorks.tsx`
- `CategoryShowcase.tsx`
- `CategoryTestimonials.tsx`
- `ComparisonSection.tsx`
- `PhotoGlowPage.tsx`
- `HowItWorks.tsx`
- And more...

#### Best Practices

##### ✅ DO

```typescript
// Always use ImageWithFallback for figma:asset imports
import { ImageWithFallback } from './components/figma/ImageWithFallback';
import image from 'figma:asset/abc123.png';

<ImageWithFallback src={image} alt="Description" />
```

##### ❌ DON'T

```typescript
// Don't use <img> directly with figma:asset
import image from 'figma:asset/abc123.png';

<img src={image} alt="Description" /> // ❌ May break outside Figma Make
```

---

## 📁 File Structure

```
components/figma/
├── ImageWithFallback.tsx    # Main component
└── README.md               # This file
```

---

## 🔗 Related

- **Figma Integration Guide**: `/FIGMA_INTEGRATION_COMPLETE.md`
- **Architecture**: `/ARCHITECTURE.md`
- **Component Guidelines**: `/CONTRIBUTING.md`

---

## 📊 Stats

- **Components**: 1
- **Usage**: 10+ components
- **Status**: ✅ Production Ready
- **TypeScript**: ✅ Fully Typed

---

**Last Updated**: November 25, 2024  
**Status**: ✅ Ready for GitHub
