import { useState } from 'react';
import { photoIdeas, categories } from './ideasData';
import { Badge } from './ui/badge';
import { Card } from './ui/card';
import { ArrowLeft } from 'lucide-react';
import { Button } from './ui/button';
import { Header } from './Header';

interface IdeasPageProps {
  onBack: () => void;
  onShowPricing?: () => void;
}

export function IdeasPage({ onBack, onShowPricing }: IdeasPageProps) {
  const [selectedCategory, setSelectedCategory] = useState("All");

  const filteredIdeas = selectedCategory === "All" 
    ? photoIdeas 
    : photoIdeas.filter(idea => idea.category === selectedCategory);

  return (
    <div className="min-h-screen bg-[#111111] text-white">
      {/* Header with CTA button */}
      <Header 
        onShowPricing={onShowPricing}
        onShowLanding={onBack}
        isLandingPage={false}
      />
      
      {/* Page Header - Responsive */}
      <div className="bg-[#111111] pt-24 md:pt-32 pb-8 md:pb-12 px-4">
        <div className="max-w-7xl mx-auto">
          {/* Back Button - Hidden on mobile */}
          <Button
            onClick={onBack}
            variant="ghost"
            className="hidden md:flex mb-6 text-gray-400 hover:text-white"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back
          </Button>
          
          <div className="text-center">
            <h1 className="text-3xl md:text-4xl lg:text-5xl mb-4">
              Photo Shoot Ideas
            </h1>
            <p className="text-gray-400 text-base md:text-lg max-w-4xl mx-auto mb-2">
              Discover a wide variety of photo shoot ideas and categories. Get inspired for your next photoshoot with these example
            </p>
            <p className="text-gray-400 text-base md:text-lg max-w-4xl mx-auto">
              photos, outfits, settings and poses. Browse through categories or{' '}
              <span className="text-white underline cursor-pointer">start creating your own unique photos</span>{' '}
              with Photo AI!
            </p>
          </div>
        </div>
      </div>

      {/* Category Filter */}
      <div className="bg-[#111111] border-b border-[#343434] py-4 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-wrap gap-2 justify-center">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`px-4 py-2 rounded-full text-sm transition-all ${
                  selectedCategory === category
                    ? 'bg-gradient-to-r from-pink-500 to-purple-600 text-white'
                    : 'bg-[#1f1f1f] text-gray-400 hover:text-white hover:bg-[#2a2a2a]'
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Ideas Grid - Responsive */}
      <div className="max-w-7xl mx-auto px-4 py-8 md:py-12">
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-3 md:gap-6">
          {filteredIdeas.map((idea, index) => (
            <Card 
              key={index}
              className="bg-[#1f1f1f] border-[#343434] overflow-hidden hover:border-purple-500/50 transition-all cursor-pointer group"
            >
              {/* Image */}
              <div className="aspect-[3/4] overflow-hidden">
                <img 
                  src={idea.image} 
                  alt={idea.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
              </div>

              {/* Content */}
              <div className="p-4">
                <div className="flex items-start justify-between mb-2">
                  <h3 className="text-white text-lg">
                    {idea.title}
                  </h3>
                  <Badge 
                    variant="outline" 
                    className="text-xs bg-purple-500/10 text-purple-400 border-purple-500/30 ml-2 shrink-0"
                  >
                    {idea.category}
                  </Badge>
                </div>
                <p className="text-gray-400 text-sm line-clamp-4">
                  {idea.description}
                </p>
              </div>
            </Card>
          ))}
        </div>

        {/* No Results */}
        {filteredIdeas.length === 0 && (
          <div className="text-center py-20">
            <p className="text-gray-400 text-lg">
              No ideas found in this category
            </p>
          </div>
        )}
      </div>
    </div>
  );
}