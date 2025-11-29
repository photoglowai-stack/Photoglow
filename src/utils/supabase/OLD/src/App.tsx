import { useState, useEffect, lazy, Suspense } from "react";
import { Header } from "./components/Header";
import { HeroSection } from "./components/HeroSection";
import { FeaturedIn } from "./components/FeaturedIn";
import { Features } from "./components/Features";
import { StickyEmailBar } from "./components/StickyEmailBar";
import { Footer } from "./components/Footer";
import { SEOHead } from "./components/SEOHead";
import { ComparisonSection } from "./components/ComparisonSection";
import { SocialProof } from "./components/SocialProof";
import { FAQ } from "./components/FAQ";
import { CategoryShowcase } from "./components/CategoryShowcase";
import { BeforeAfterTransformation } from "./components/BeforeAfterTransformation";
import { AuthModal } from "./components/AuthModal";
import { supabase } from "./utils/supabase/client";
import { Toaster } from "./components/ui/sonner";

// Lazy load heavy components to prevent timeout
const CategoryHowItWorks = lazy(() => import("./components/CategoryHowItWorks").then(m => ({ default: m.CategoryHowItWorks })));

// Lazy load only page components (not landing page sections)
const TinderPaymentPage = lazy(() => import("./components/TinderPaymentPage").then(m => ({ default: m.TinderPaymentPage })));
const AIPhotoGenerator = lazy(() => import("./components/AIPhotoGeneratorV2").then(m => ({ default: m.AIPhotoGenerator })));
const ProfilePage = lazy(() => import("./components/ProfilePage").then(m => ({ default: m.ProfilePage })));
const AdminV2Unified = lazy(() => import("./components/AdminV2Unified").then(m => ({ default: m.AdminV2Unified })));
const SystemHealthPanel = lazy(() => import("./components/SystemHealthPanel").then(m => ({ default: m.default })));

// Keep these lazy-loaded for better initial page load
const PhotoGlowPage = lazy(() => import("./components/PhotoGlowPage").then(m => ({ default: m.PhotoGlowPage })));
const PhotoGlowPricing = lazy(() => import("./components/PhotoGlowPricing").then(m => ({ default: m.PhotoGlowPricing })));
const PhotoDetailPage = lazy(() => import("./components/PhotoDetailPage").then(m => ({ default: m.PhotoDetailPage })));
const CategoryPage = lazy(() => import("./components/CategoryPage").then(m => ({ default: m.CategoryPage })));
const UniversalCategoryPage = lazy(() => import("./components/UniversalCategoryPage").then(m => ({ default: m.UniversalCategoryPage })));
const CategoryUniversalPage = lazy(() => import("./components/CategoryUniversalPage").then(m => ({ default: m.CategoryUniversalPage })));
const IdeasPage = lazy(() => import("./components/IdeasPage").then(m => ({ default: m.IdeasPage })));
const ExploreAIModelsPage = lazy(() => import("./components/ExploreAIModelsPage").then(m => ({ default: m.ExploreAIModelsPage })));
const CreateVideoPage = lazy(() => import("./components/CreateVideoPage").then(m => ({ default: m.CreateVideoPage })));
const VideosGalleryPage = lazy(() => import("./components/VideosGalleryPage").then(m => ({ default: m.VideosGalleryPage })));
const AdminGenerateCategoriesPage = lazy(() => import("./components/AdminGenerateCategoriesClean").then(m => ({ default: m.AdminGenerateCategoriesClean })));

import { categoryDataMap } from "./components/categoryData";
import { categoryPagesConfig } from "./components/categoryPagesConfig";
import { categoryExamplesData } from "./components/categoryExamplesData";

// Loading fallback component - improved skeleton
import { LoadingSkeleton } from "./components/LoadingSkeleton";

type AppState =
  | "landing"
  | "photoglow"
  | "photoglow-pricing"
  | "category"
  | "category-universal"  // New: Universal category page
  | "explore-models"
  | "photo-detail"
  | "ideas"
  | "ai-headshots"
  | "ai-headshots-examples"
  | "ai-model-photo"
  | "ai-model-photo-examples"
  | "ai-cosplay-fantasy"
  | "ai-fitness-bikini"
  | "ai-fitness-photos"
  | "ai-fitness-photos-examples"
  | "ai-lifestyle-travel"
  | "ai-realistic-photo"
  | "ai-realistic-photo-examples"
  | "ai-selfie"
  | "ai-selfie-examples"
  | "ai-photo-generator"
  | "ai-portrait"
  | "ai-portrait-examples"
  | "ai-dating-photos"
  | "ai-dating-photos-examples"
  | "admin"
  | "pricing"
  | "profile"
  | "system-health"
  | "create-video"      // NEW: Create video page
  | "videos-gallery"   // NEW: Videos gallery page
  | "admin-generate-categories";  // NEW: Admin page for category images generation

export default function App() {
  const [currentState, setCurrentState] =
    useState<AppState>("landing");
  const [selectedGender, setSelectedGender] = useState<
    "male" | "female"
  >("male");
  const [selectedPurpose, setSelectedPurpose] =
    useState<string>("");
  const [selectedCategory, setSelectedCategory] =
    useState<string>("");
  const [userEmail, setUserEmail] = useState<string>("");
  const [selectedPackage, setSelectedPackage] =
    useState<string>("");
  const [selectedPhotoIndex, setSelectedPhotoIndex] =
    useState<number>(0);
  const [selectedPhotoUrl, setSelectedPhotoUrl] =
    useState<string>("");
  const [selectedPhotoCategoryId, setSelectedPhotoCategoryId] =
    useState<string | undefined>(undefined);
  
  // Universal category page state
  const [universalCategoryId, setUniversalCategoryId] = useState<string>('');
  
  // NEW: Video page state
  const [selectedImageForVideo, setSelectedImageForVideo] = useState<string>('');
  
  // Authentication state
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [showAuthModal, setShowAuthModal] = useState<boolean>(false);

  // Check for hash-based navigation (e.g., #admin-v2, #category-ai-headshots)
  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash.slice(1); // Remove the '#'
      if (hash && hash !== currentState) {
        // Check if it's a category page hash (format: category-{categoryId})
        if (hash.startsWith('category-')) {
          const categoryId = hash.replace('category-', '');
          console.log(`🔗 Category hash navigation detected: #${hash} → ${categoryId}`);
          setUniversalCategoryId(categoryId);
          setCurrentState('category-universal');
          return;
        }
        
        // Map common hashes to states
        const hashToState: Record<string, AppState> = {
          'admin': 'admin',
          'admin-v2-unified': 'admin', // Alias
          'admin-unified': 'admin', // Alias
          'admin-generate-categories': 'admin-generate-categories',
          'pricing': 'pricing',
          'photoglow': 'photoglow',
          'profile': 'profile',
          'system-health': 'system-health',
        };
        
        const targetState = hashToState[hash];
        if (targetState) {
          console.log(`🔗 Hash navigation detected: #${hash} → ${targetState}`);
          setCurrentState(targetState as AppState);
        }
      }
    };

    // Run on mount
    handleHashChange();

    // Listen for hash changes (when clicking links or programmatically changing hash)
    window.addEventListener('hashchange', handleHashChange);
    
    return () => {
      window.removeEventListener('hashchange', handleHashChange);
    };
  }, [currentState]);

  // Check for existing Supabase session on mount
  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setIsAuthenticated(!!session);
    });

    // Listen for auth state changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setIsAuthenticated(!!session);
    });

    return () => subscription.unsubscribe();
  }, []);

  // Scroll to top when changing pages - instant for better performance
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' });
  }, [currentState]);

  // Check authentication before accessing pricing
  const checkAuthAndNavigate = (targetState: AppState) => {
    if (isAuthenticated) {
      setCurrentState(targetState);
    } else {
      setShowAuthModal(true);
    }
  };

  // Handle successful authentication
  const handleAuthenticated = () => {
    setIsAuthenticated(true);
    setShowAuthModal(false);
    // Navigate to pricing after authentication
    setCurrentState("pricing");
  };

  // All "Generate" and "Create" buttons now redirect to pricing (with auth check)
  const handleGetStarted = () => {
    checkAuthAndNavigate("pricing");
  };

  const handlePurchase = (packageId: string) => {
    setSelectedPackage(packageId);
    // Redirect to AI Photo Generator after purchase
    setCurrentState("ai-photo-generator");
  };

  const handleBackToLanding = () => {
    setCurrentState("landing");
  };

  const handleShowPricing = () => {
    checkAuthAndNavigate("pricing");
  };

  const handleShowPhotoGlow = () => {
    // Redirect to pricing instead of form
    checkAuthAndNavigate("pricing");
  };

  const handleShowIdeas = () => {
    setCurrentState("ideas");
  };

  const handleShowAdmin = () => {
    setCurrentState("admin");
  };

  const handleShowCategoryGenerator = () => {
    setCurrentState("admin-generate-categories");
  };

  const handlePhotoGlowPurposeSelect = (purpose: string) => {
    setSelectedPurpose(purpose);
    setSelectedCategory(purpose);
    
    // Map PhotoGlow purposes to category pages
    const purposeToPageMap: Record<string, AppState> = {
      'professional': 'ai-headshots',
      'dating': 'ai-dating-photos',
      'selfie': 'ai-selfie',
      'beach': 'ai-fitness-bikini',
      'fashion': 'ai-model-photo',
      'realistic': 'ai-realistic-photo',
      'portrait': 'ai-portrait',
      'generator': 'ai-photo-generator',
      'model': 'ai-model-photo',
      'cosplay': 'ai-cosplay-fantasy',
      'fitness': 'ai-fitness-bikini',
      'lifestyle': 'ai-lifestyle-travel'
    };

    const targetPage = purposeToPageMap[purpose] || 'ai-headshots';
    setCurrentState(targetPage);
  };

  const handleBackToPhotoGlow = () => {
    setCurrentState("photoglow");
  };

  const handleCategoryPurchase = () => {
    setCurrentState("photoglow-pricing");
  };

  const handleStyleClick = (styleId: string) => {
    // Map style IDs to their corresponding category pages
    const styleToPageMap: Record<string, AppState> = {
      'professional': 'ai-headshots',
      'dating': 'ai-dating-photos',
      'model': 'ai-model-photo',
      'realistic': 'ai-realistic-photo',
      'selfie': 'ai-selfie',
      'portrait': 'ai-portrait',
      'cosplay': 'ai-cosplay-fantasy',
      'beach': 'ai-fitness-bikini',
      'lifestyle': 'ai-lifestyle-travel',
      'fitness': 'ai-fitness-photos'
    };

    const targetPage = styleToPageMap[styleId] || 'landing';
    setCurrentState(targetPage);
  };

  const handleExploreModels = () => {
    setCurrentState('explore-models');
  };

  const handleModelSelect = (modelId: string) => {
    handleStyleClick(modelId);
  };

  const handleBackToLandingFromHeadshots = () => {
    setCurrentState("landing");
  };

  const handleHeadshotsGenerateNow = () => {
    // Redirect directly to pricing instead of form
    checkAuthAndNavigate("pricing");
  };

  const handleSimpleGenerateNow = () => {
    // Redirect directly to pricing instead of form
    checkAuthAndNavigate("pricing");
  };

  const handleCategoryNavigation = (categoryId: string) => {
    const categoryToPageMap: Record<string, AppState> = {
      'professional': 'ai-headshots',
      'dating': 'ai-dating-photos',
      'model': 'ai-model-photo',
      'realistic': 'ai-realistic-photo',
      'selfie': 'ai-selfie',
      'portrait': 'ai-portrait',
      'cosplay': 'ai-cosplay-fantasy',
      'fitness': 'ai-fitness-photos',
      'beach': 'ai-fitness-bikini',
      'lifestyle': 'ai-lifestyle-travel',
      'travel': 'ai-lifestyle-travel',
      'fashion': 'ai-model-photo'
    };

    const targetPage = categoryToPageMap[categoryId] || 'landing';
    setCurrentState(targetPage);
  };

  const handlePhotoClick = (photoIndex: number, photoUrl: string, categoryId?: string) => {
    setSelectedPhotoIndex(photoIndex);
    setSelectedPhotoUrl(photoUrl);
    setSelectedPhotoCategoryId(categoryId);
    setCurrentState('photo-detail');
  };

  const handleBackFromPhotoDetail = () => {
    setCurrentState('landing');
  };

  const handleGenerateFromPhoto = () => {
    checkAuthAndNavigate('pricing');
  };

  const handlePhotoSuggestionClick = (photoIndex: number) => {
    // Get the photo URL from the ScrollingMosaic photos array
    const allPhotos = [
      'https://images.unsplash.com/photo-1560250097-0b93528c311a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwcm9mZXNzaW9uYWwlMjBwb3J0cmFpdCUyMHBob3RvfGVufDF8fHx8MTc2MDUyMjE5M3ww&ixlib=rb-4.1.0&q=80&w=400',
      'https://images.unsplash.com/photo-1581093458791-9d42e7d44e1f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx1cmJhbiUyMGZhc2hpb24lMjBwb3J0cmFpdHxlbnwxfHx8fDE3NjA1MjIxOTN8MA&ixlib=rb-4.1.0&q=80&w=400',
      'https://images.unsplash.com/photo-1719257751404-1dea075324bd?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxidXNpbmVzcyUyMGhlYWRzaG90fGVufDF8fHx8MTc2MDUyMjE5M3ww&ixlib=rb-4.1.0&q=80&w=400',
      'https://images.unsplash.com/photo-1653419403196-ab64c4c740c3?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxsaWZlc3R5bGUlMjBwb3J0cmFpdHxlbnwxfHx8fDE3NjA1MTkxMDZ8MA&ixlib=rb-4.1.0&q=80&w=400',
      'https://images.unsplash.com/photo-1609846685336-9cb06880bb48?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmaXRuZXNzJTIwcG9ydHJhaXR8ZW58MXx8fHwxNzYwNDg1ODcwfDA&ixlib=rb-4.1.0&q=80&w=400',
      'https://images.unsplash.com/photo-1597202992582-9ee5c6672095?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjcmVhdGl2ZSUyMHBvcnRyYWl0JTIwcGhvdG98ZW58MXx8fHwxNzYwNTIxMjE0fDA&ixlib=rb-4.1.0&q=80&w=400',
      'https://images.unsplash.com/photo-1640876305588-dbdab5869200?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxlbGVnYW50JTIwcG9ydHJhaXR8ZW58MXx8fHwxNzYwNTA5NjQ1fDA&ixlib=rb-4.1.0&q=80&w=400',
      'https://images.unsplash.com/photo-1607664919395-9ee609a88ba7?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjYXN1YWwlMjBwb3J0cmFpdCUyMHBob3RvfGVufDF8fHx8MTc2MDUyMTIxM3ww&ixlib=rb-4.1.0&q=80&w=400',
      'https://images.unsplash.com/photo-1680557345345-6f9ef109d252?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxvdXRkb29yJTIwcG9ydHJhaXR8ZW58MXx8fHwxNzYwNTIxMjE3fDA&ixlib=rb-4.1.0&q=80&w=400',
      'https://images.unsplash.com/photo-1636379688556-f9cc75dca5bc?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzdHVkaW8lMjBwb3J0cmFpdHxlbnwxfHx8fDE3NjA0MzEwMzh8MA&ixlib=rb-4.1.0&q=80&w=400',
      'https://images.unsplash.com/photo-1627161683077-e34782c24d81?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwb3J0cmFpdCUyMGhlYWRzaG90JTIwcHJvZmVzc2lvbmFsfGVufDF8fHx8MTc2MDUyMjU3Mnww&ixlib=rb-4.1.0&q=80&w=400',
      'https://images.unsplash.com/photo-1589351189946-b8eb5e170ba6?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmYXNoaW9uJTIwbW9kZWwlMjBwaG90b3xlbnwxfHx8fDE3NjA1MjI1NzJ8MA&ixlib=rb-4.1.0&q=80&w=400',
      'https://images.unsplash.com/photo-1655249481446-25d575f1c054?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx3b21hbiUyMHByb2Zlc3Npb25hbCUyMGhlYWRzaG90fGVufDF8fHx8MTc2MDUyMjU3M3ww&ixlib=rb-4.1.0&q=80&w=400',
      'https://images.unsplash.com/photo-1607880609114-742ed2638069?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxsaWZlc3R5bGUlMjBwb3J0cmFpdCUyMG91dGRvb3J8ZW58MXx8fHwxNzYwNTIyNTczfDA&ixlib=rb-4.1.0&q=80&w=400',
    ];
    setSelectedPhotoIndex(photoIndex);
    setSelectedPhotoUrl(allPhotos[photoIndex]);
    // Stay on photo-detail page, just update the photo
  };

  const handlePhotoPackClick = (categoryId: string) => {
    // Navigate directly using the category page state name
    setCurrentState(categoryId as AppState);
  };

  // NEW: Handler for CategoryShowcase clicks -> Universal Category Page
  const handleCategoryShowcaseClick = (categoryId: string) => {
    console.log('📱 Category clicked from showcase:', categoryId);
    
    // Map CategoryShowcase IDs to categoryPagesConfig IDs
    const categoryIdMap: Record<string, string> = {
      'professional': 'ai-headshots',
      'linkedin-headshots': 'ai-headshots',
      'tinder': 'ai-dating',
      'instagram': 'ai-selfie',
      'model': 'ai-model-photo',
      'glamour': 'ai-model-photo',
      'realistic': 'ai-realistic-photo',
      'ai-influencer': 'ai-selfie',
      'luxury-lifestyle': 'ai-model-photo',
      'selfie': 'ai-selfie',
      'beach-bikini': 'ai-fitness-bikini',
      'fitness': 'ai-fitness-photos',
      'travel': 'ai-lifestyle-travel',
      'corporate-team': 'ai-headshots',
      'portrait': 'ai-portrait',
      'dating': 'ai-dating',
    };

    const mappedId = categoryIdMap[categoryId] || categoryId;
    setUniversalCategoryId(mappedId);
    setCurrentState('category-universal');
  };

  // Functions to handle navigation to examples pages
  const handleViewExamples = (currentPage: AppState) => {
    const examplesPageMap: Record<string, AppState> = {
      'ai-headshots': 'ai-headshots-examples',
      'ai-model-photo': 'ai-model-photo-examples',
      'ai-dating-photos': 'ai-dating-photos-examples',
      'ai-fitness-photos': 'ai-fitness-photos-examples',
      'ai-selfie': 'ai-selfie-examples',
      'ai-portrait': 'ai-portrait-examples',
      'ai-realistic-photo': 'ai-realistic-photo-examples',
    };
    
    const examplesPage = examplesPageMap[currentPage];
    if (examplesPage) {
      setCurrentState(examplesPage);
    }
  };

  const handleBackFromExamples = () => {
    setCurrentState('landing');
  };

  const handleShowProfile = () => {
    setCurrentState('profile');
  };

  // Remove all form-related routes as they no longer exist

  // NEW: Create Video Page
  if (currentState === "create-video") {
    return (
      <>
        <Suspense fallback={<LoadingSkeleton />}>
          <CreateVideoPage
            onBack={handleBackToLanding}
            initialImageUrl={selectedImageForVideo}
          />
        </Suspense>
        <AuthModal
          isOpen={showAuthModal}
          onClose={() => setShowAuthModal(false)}
          onAuthenticated={handleAuthenticated}
        />
      </>
    );
  }

  // NEW: Videos Gallery Page
  if (currentState === "videos-gallery") {
    return (
      <>
        <Suspense fallback={<LoadingSkeleton />}>
          <VideosGalleryPage
            onBack={handleBackToLanding}
            onCreateVideo={() => {
              setSelectedImageForVideo('');
              setCurrentState('create-video');
            }}
          />
        </Suspense>
        <AuthModal
          isOpen={showAuthModal}
          onClose={() => setShowAuthModal(false)}
          onAuthenticated={handleAuthenticated}
        />
      </>
    );
  }



  if (currentState === "photoglow") {
    return (
      <>
        <Suspense fallback={<LoadingSkeleton />}>
          <PhotoGlowPage
            onBack={handleBackToLanding}
            onSelectPurpose={handlePhotoGlowPurposeSelect}
          />
        </Suspense>
        {/* Authentication Modal - Always rendered */}
        <AuthModal
          isOpen={showAuthModal}
          onClose={() => setShowAuthModal(false)}
          onAuthenticated={handleAuthenticated}
        />
      </>
    );
  }

  if (currentState === "category") {
    const categoryData = categoryDataMap[selectedCategory];
    if (!categoryData) {
      setCurrentState("photoglow");
      return null;
    }
    return (
      <>
        <Suspense fallback={<LoadingSkeleton />}>
          <CategoryPage
            category={categoryData}
            onBack={handleBackToPhotoGlow}
            onPurchase={handleCategoryPurchase}
          />
        </Suspense>
        {/* Authentication Modal - Always rendered */}
        <AuthModal
          isOpen={showAuthModal}
          onClose={() => setShowAuthModal(false)}
          onAuthenticated={handleAuthenticated}
        />
      </>
    );
  }

  if (currentState === "photoglow-pricing") {
    return (
      <>
        <Suspense fallback={<LoadingSkeleton />}>
          <PhotoGlowPricing
            selectedPurpose={selectedPurpose}
            onPurchase={handlePurchase}
            onBack={handleBackToPhotoGlow}
          />
        </Suspense>
        {/* Authentication Modal - Always rendered */}
        <AuthModal
          isOpen={showAuthModal}
          onClose={() => setShowAuthModal(false)}
          onAuthenticated={handleAuthenticated}
        />
      </>
    );
  }

  if (currentState === "pricing") {
    return (
      <>
        <Suspense fallback={<LoadingSkeleton />}>
          <TinderPaymentPage
            onPurchase={handlePurchase}
            onBack={handleBackToLanding}
            onShowLanding={handleBackToLanding}
          />
        </Suspense>
        {/* Authentication Modal - Always rendered */}
        <AuthModal
          isOpen={showAuthModal}
          onClose={() => setShowAuthModal(false)}
          onAuthenticated={handleAuthenticated}
        />
      </>
    );
  }

  if (currentState === "ai-headshots") {
    return (
      <>
        <Suspense fallback={<LoadingSkeleton />}>
          <UniversalCategoryPage
            categoryId="professional"
            onBack={handleBackToLandingFromHeadshots}
            onGenerateNow={handleHeadshotsGenerateNow}
            onCategorySelect={handleCategoryNavigation}
            onPhotoDetailClick={(photoUrl, photoIndex) => handlePhotoClick(photoIndex, photoUrl, 'ai-headshots')}
          />
        </Suspense>
        {/* Authentication Modal - Always rendered */}
        <AuthModal
          isOpen={showAuthModal}
          onClose={() => setShowAuthModal(false)}
          onAuthenticated={handleAuthenticated}
        />
      </>
    );
  }

  if (currentState === "ai-model-photo") {
    return (
      <>
        <Suspense fallback={<LoadingSkeleton />}>
          <UniversalCategoryPage
            categoryId="model"
            onBack={handleBackToLandingFromHeadshots}
            onGenerateNow={handleHeadshotsGenerateNow}
            onCategorySelect={handleCategoryNavigation}
            onPhotoDetailClick={(photoUrl, photoIndex) => handlePhotoClick(photoIndex, photoUrl, 'ai-model-photo')}
          />
        </Suspense>
        {/* Authentication Modal - Always rendered */}
        <AuthModal
          isOpen={showAuthModal}
          onClose={() => setShowAuthModal(false)}
          onAuthenticated={handleAuthenticated}
        />
      </>
    );
  }

  if (currentState === "ai-realistic-photo") {
    return (
      <>
        <Suspense fallback={<LoadingSkeleton />}>
          <UniversalCategoryPage
            categoryId="realistic"
            onBack={handleBackToLandingFromHeadshots}
            onGenerateNow={handleHeadshotsGenerateNow}
            onCategorySelect={handleCategoryNavigation}
            onPhotoDetailClick={(photoUrl, photoIndex) => handlePhotoClick(photoIndex, photoUrl, 'ai-realistic-photo')}
          />
        </Suspense>
        {/* Authentication Modal - Always rendered */}
        <AuthModal
          isOpen={showAuthModal}
          onClose={() => setShowAuthModal(false)}
          onAuthenticated={handleAuthenticated}
        />
      </>
    );
  }

  if (currentState === "ai-selfie") {
    return (
      <>
        <Suspense fallback={<LoadingSkeleton />}>
          <UniversalCategoryPage
            categoryId="selfie"
            onBack={handleBackToLandingFromHeadshots}
            onGenerateNow={handleHeadshotsGenerateNow}
            onCategorySelect={handleCategoryNavigation}
            onPhotoDetailClick={(photoUrl, photoIndex) => handlePhotoClick(photoIndex, photoUrl, 'ai-selfie-generator')}
          />
        </Suspense>
        {/* Authentication Modal - Always rendered */}
        <AuthModal
          isOpen={showAuthModal}
          onClose={() => setShowAuthModal(false)}
          onAuthenticated={handleAuthenticated}
        />
      </>
    );
  }

  if (currentState === "ai-photo-generator") {
    return (
      <>
        <Suspense fallback={<LoadingSkeleton />}>
          <AIPhotoGenerator
            onBack={handleBackToLandingFromHeadshots}
            selectedPackage={selectedPackage}
          />
        </Suspense>
        {/* Authentication Modal - Always rendered */}
        <AuthModal
          isOpen={showAuthModal}
          onClose={() => setShowAuthModal(false)}
          onAuthenticated={handleAuthenticated}
        />
      </>
    );
  }

  if (currentState === "ai-portrait") {
    return (
      <>
        <Suspense fallback={<LoadingSkeleton />}>
          <UniversalCategoryPage
            categoryId="portrait"
            onBack={handleBackToLandingFromHeadshots}
            onGenerateNow={handleHeadshotsGenerateNow}
            onCategorySelect={handleCategoryNavigation}
            onPhotoDetailClick={(photoUrl, photoIndex) => handlePhotoClick(photoIndex, photoUrl, 'ai-portrait-generator')}
          />
        </Suspense>
        {/* Authentication Modal - Always rendered */}
        <AuthModal
          isOpen={showAuthModal}
          onClose={() => setShowAuthModal(false)}
          onAuthenticated={handleAuthenticated}
        />
      </>
    );
  }

  if (currentState === "ai-dating-photos") {
    return (
      <>
        <Suspense fallback={<LoadingSkeleton />}>
          <UniversalCategoryPage
            categoryId="dating"
            onBack={handleBackToLandingFromHeadshots}
            onGenerateNow={handleHeadshotsGenerateNow}
            onCategorySelect={handleCategoryNavigation}
            onPhotoDetailClick={(photoUrl, photoIndex) => handlePhotoClick(photoIndex, photoUrl, 'ai-dating-photos')}
          />
        </Suspense>
        {/* Authentication Modal - Always rendered */}
        <AuthModal
          isOpen={showAuthModal}
          onClose={() => setShowAuthModal(false)}
          onAuthenticated={handleAuthenticated}
        />
      </>
    );
  }

  if (currentState === "ai-cosplay-fantasy") {
    return (
      <>
        <Suspense fallback={<LoadingSkeleton />}>
          <UniversalCategoryPage
            categoryId="cosplay"
            onBack={handleBackToLandingFromHeadshots}
            onGenerateNow={handleSimpleGenerateNow}
            onPhotoDetailClick={(photoUrl, photoIndex) => handlePhotoClick(photoIndex, photoUrl)}
          />
        </Suspense>
        {/* Authentication Modal - Always rendered */}
        <AuthModal
          isOpen={showAuthModal}
          onClose={() => setShowAuthModal(false)}
          onAuthenticated={handleAuthenticated}
        />
      </>
    );
  }

  if (currentState === "ai-fitness-bikini") {
    return (
      <>
        <Suspense fallback={<LoadingSkeleton />}>
          <UniversalCategoryPage
            categoryId="beach"
            onBack={handleBackToLandingFromHeadshots}
            onGenerateNow={handleSimpleGenerateNow}
            onPhotoDetailClick={(photoUrl, photoIndex) => handlePhotoClick(photoIndex, photoUrl)}
          />
        </Suspense>
        {/* Authentication Modal - Always rendered */}
        <AuthModal
          isOpen={showAuthModal}
          onClose={() => setShowAuthModal(false)}
          onAuthenticated={handleAuthenticated}
        />
      </>
    );
  }

  if (currentState === "ai-fitness-photos") {
    return (
      <>
        <Suspense fallback={<LoadingSkeleton />}>
          <UniversalCategoryPage
            categoryId="fitness"
            onBack={handleBackToLandingFromHeadshots}
            onGenerateNow={handleHeadshotsGenerateNow}
            onPhotoDetailClick={(photoUrl, photoIndex) => handlePhotoClick(photoIndex, photoUrl, 'ai-fitness-photos')}
          />
        </Suspense>
        {/* Authentication Modal - Always rendered */}
        <AuthModal
          isOpen={showAuthModal}
          onClose={() => setShowAuthModal(false)}
          onAuthenticated={handleAuthenticated}
        />
      </>
    );
  }

  if (currentState === "ai-lifestyle-travel") {
    return (
      <>
        <Suspense fallback={<LoadingSkeleton />}>
          <UniversalCategoryPage
            categoryId="lifestyle"
            onBack={handleBackToLandingFromHeadshots}
            onGenerateNow={handleSimpleGenerateNow}
            onPhotoDetailClick={(photoUrl, photoIndex) => handlePhotoClick(photoIndex, photoUrl, 'ai-lifestyle-travel')}
          />
        </Suspense>
        {/* Authentication Modal - Always rendered */}
        <AuthModal
          isOpen={showAuthModal}
          onClose={() => setShowAuthModal(false)}
          onAuthenticated={handleAuthenticated}
        />
      </>
    );
  }

  if (currentState === "explore-models") {
    return (
      <>
        <Suspense fallback={<LoadingSkeleton />}>
          <ExploreAIModelsPage
            onBack={handleBackToLanding}
            onModelSelect={handleModelSelect}
          />
        </Suspense>
        {/* Authentication Modal - Always rendered */}
        <AuthModal
          isOpen={showAuthModal}
          onClose={() => setShowAuthModal(false)}
          onAuthenticated={handleAuthenticated}
        />
      </>
    );
  }

  // NEW: Universal Category Page (follows landing page structure exactly)
  if (currentState === "category-universal") {
    return (
      <>
        <Suspense fallback={<LoadingSkeleton />}>
          <CategoryUniversalPage
            categoryId={universalCategoryId}
            onBack={handleBackToLanding}
            onGetStarted={handleGetStarted}
          />
        </Suspense>
        {/* Authentication Modal - Always rendered */}
        <AuthModal
          isOpen={showAuthModal}
          onClose={() => setShowAuthModal(false)}
          onAuthenticated={handleAuthenticated}
        />
      </>
    );
  }

  if (currentState === "photo-detail") {
    return (
      <>
        <Suspense fallback={<LoadingSkeleton />}>
          <PhotoDetailPage
            photoUrl={selectedPhotoUrl}
            photoIndex={selectedPhotoIndex}
            categoryId={selectedPhotoCategoryId}
            onBack={handleBackFromPhotoDetail}
            onGenerateNow={handleGenerateFromPhoto}
            onSuggestionClick={handlePhotoSuggestionClick}
            onPhotoPackClick={handlePhotoPackClick}
          />
        </Suspense>
        {/* Authentication Modal - Always rendered */}
        <AuthModal
          isOpen={showAuthModal}
          onClose={() => setShowAuthModal(false)}
          onAuthenticated={handleAuthenticated}
        />
      </>
    );
  }

  if (currentState === "ideas") {
    return (
      <>
        <Suspense fallback={<LoadingSkeleton />}>
          <IdeasPage
            onBack={handleBackToLanding}
            onShowPricing={handleShowPricing}
          />
        </Suspense>
        {/* Authentication Modal - Always rendered */}
        <AuthModal
          isOpen={showAuthModal}
          onClose={() => setShowAuthModal(false)}
          onAuthenticated={handleAuthenticated}
        />
      </>
    );
  }

  // Admin Page (Unified interface for AI generation testing)
  if (currentState === "admin") {
    return (
      <>
        <Suspense fallback={<LoadingSkeleton />}>
          <AdminV2Unified onBack={handleBackToLanding} />
        </Suspense>
        {/* Authentication Modal - Always rendered */}
        <AuthModal
          isOpen={showAuthModal}
          onClose={() => setShowAuthModal(false)}
          onAuthenticated={handleAuthenticated}
        />
      </>
    );
  }

  // Admin Generate Categories Page
  if (currentState === "admin-generate-categories") {
    return (
      <Suspense fallback={<LoadingSkeleton />}>
        <AdminGenerateCategoriesPage />
      </Suspense>
    );
  }

  // Profile Page
  if (currentState === "profile") {
    return (
      <>
        <Suspense fallback={<LoadingSkeleton />}>
          <ProfilePage
            onBack={handleBackToLanding}
          />
        </Suspense>
        {/* Authentication Modal - Always rendered */}
        <AuthModal
          isOpen={showAuthModal}
          onClose={() => setShowAuthModal(false)}
          onAuthenticated={handleAuthenticated}
        />
      </>
    );
  }

  // System Health Panel - Diagnostic pour les buckets et API backend
  if (currentState === "system-health") {
    return (
      <>
        <Suspense fallback={<LoadingSkeleton />}>
          <SystemHealthPanel />
        </Suspense>
        {/* Authentication Modal - Always rendered */}
        <AuthModal
          isOpen={showAuthModal}
          onClose={() => setShowAuthModal(false)}
          onAuthenticated={handleAuthenticated}
        />
      </>
    );
  }

  return (
    <>
      <SEOHead 
        title="The Most Popular AI Photo Generator | PhotoGlow"
        description="Transform your photos with PhotoGlow - the leading AI photo generator. Create professional headshots, dating photos, fashion photography, and more with advanced AI technology."
        keywords="ai photo generator, ai photos, photoglow, ai headshots, ai dating photos, ai fashion photography, photo generator"
      />
      <div className="min-h-screen bg-black text-white page-container">
        <Header
          onShowPricing={handleShowPricing} 
          onShowPhotoGlow={handleShowPhotoGlow}
          onShowIdeas={handleShowIdeas}
          onShowAuth={() => setShowAuthModal(true)}
          onShowAdmin={handleShowAdmin}
          onShowProfile={handleShowProfile}
          onShowLanding={handleBackToLanding}
          currentPage={currentState}
          isLandingPage={true}
        />
        
        {/* Main content flow - zero gaps between sections */}
        <main className="relative">
          <HeroSection 
            onStartForm={handleGetStarted} 
            onExploreModels={handleExploreModels}
            onPhotoClick={handlePhotoClick}
          />
          <FeaturedIn />
          <Suspense fallback={<div className="section-spacing bg-black" />}>
            <CategoryHowItWorks />
          </Suspense>
          <ComparisonSection />
          <BeforeAfterTransformation onStartTransformation={handleShowPricing} />
          <Features />
          <SocialProof />
          <FAQ />
          <CategoryShowcase onCategoryClick={handleCategoryShowcaseClick} />
        </main>
        
        <Footer />
        <StickyEmailBar 
          onEmailSubmit={(email) => {
            setUserEmail(email);
            handleShowPricing();
          }}
          onStartNow={handleShowPricing}
        />
      </div>
      
      {/* Authentication Modal - Always rendered */}
      <AuthModal
        isOpen={showAuthModal}
        onClose={() => setShowAuthModal(false)}
        onAuthenticated={handleAuthenticated}
      />
      <Toaster />
    </>
  );
}