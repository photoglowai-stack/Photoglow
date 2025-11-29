/**
 * @file IdeasPage - Page de galerie des 148 idées PhotoGlow
 * @description Affiche toutes les catégories d'idées photos avec filtrage
 */

import { useState } from 'react';
import { photoIdeas, categories } from '../../data/ideasData';
import { Badge } from '../../ui/badge';
import { Card } from '../../ui/card';
import { ArrowLeft } from 'lucide-react';
import { Button } from '../../ui/button';
import { Header } from '../../shared/Header';

/**
 * Props pour le composant IdeasPage
 */
export interface IdeasPageProps {
  /** Callback pour retourner à la page précédente */
  onBack: () => void;
  /** Callback optionnel pour afficher la page de pricing */
  onShowPricing?: () => void;
}

/**
 * Page de galerie des idées photos PhotoGlow
 * 
 * Affiche les 148 idées organisées par catégories avec :
 * - Filtrage par catégorie
 * - Cards interactives avec images
 * - SEO optimisé avec "Photo AI" devant chaque titre
 * 
 * @example
 * ```tsx
 * <IdeasPage 
 *   onBack={() => navigate('/')}
 *   onShowPricing={() => navigate('/pricing')}
 * />
 * ```
 */
export function IdeasPage({ onBack, onShowPricing }: IdeasPageProps) {
  const [selectedCategory, setSelectedCategory] = useState("All");

  const filteredIdeas = selectedCategory === "All" 
    ? photoIdeas 
    : photoIdeas.filter(idea => idea.category === selectedCategory);

  return (
    <div className="min-h-screen bg-[#111111] text-white">
      {/* Header avec CTA */}
      <Header 
        onShowPricing={onShowPricing}
        onShowLanding={onBack}
        isLandingPage={false}
      />
      
      {/* En-tête de page - Responsive */}
      <div className="px-4 sm:px-6 lg:px-8 pt-24 pb-8">
        <div className="max-w-7xl mx-auto">
          {/* Bouton retour */}
          <button
            onClick={onBack}
            className="inline-flex items-center gap-2 mb-6 px-4 py-2 rounded-lg 
                     bg-white/5 hover:bg-white/10 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Retour</span>
          </button>

          <div className="text-center mb-8">
            <h1 className="text-4xl sm:text-5xl lg:text-6xl mb-4">
              Photo Shoot Ideas 💡
            </h1>
            <p className="text-lg sm:text-xl text-white/70 max-w-3xl mx-auto">
              Explore {photoIdeas.length} photo shoot ideas to inspire your next AI-generated photos
            </p>
          </div>

          {/* Filtres de catégories - Responsive avec scroll horizontal mobile */}
          <div className="flex gap-2 overflow-x-auto pb-4 scrollbar-hide">
            {categories.map((category) => (
              <Badge
                key={category}
                variant={selectedCategory === category ? "default" : "outline"}
                className={`cursor-pointer whitespace-nowrap transition-all ${
                  selectedCategory === category
                    ? 'bg-gradient-to-r from-pink-500 to-purple-600 text-white border-0'
                    : 'bg-white/5 text-white/70 hover:bg-white/10 border-white/10'
                }`}
                onClick={() => setSelectedCategory(category)}
              >
                {category}
              </Badge>
            ))}
          </div>
        </div>
      </div>

      {/* Grille d'idées - Responsive */}
      <div className="px-4 sm:px-6 lg:px-8 pb-20">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6">
            {filteredIdeas.map((idea, index) => (
              <Card
                key={index}
                className="group relative overflow-hidden bg-white/5 border-white/10 
                         hover:bg-white/10 transition-all duration-300 cursor-pointer"
              >
                {/* Image */}
                <div className="aspect-[3/4] relative overflow-hidden">
                  <img
                    src={idea.image}
                    alt={idea.title}
                    className="w-full h-full object-cover transition-transform duration-300 
                             group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                </div>

                {/* Contenu */}
                <div className="absolute bottom-0 left-0 right-0 p-4">
                  <Badge className="mb-2 bg-gradient-to-r from-pink-500 to-purple-600 text-white border-0">
                    {idea.category}
                  </Badge>
                  <h3 className="text-lg mb-2 line-clamp-1">
                    {idea.title}
                  </h3>
                  <p className="text-sm text-white/70 line-clamp-2">
                    {idea.description}
                  </p>
                </div>
              </Card>
            ))}
          </div>

          {/* Message si aucun résultat */}
          {filteredIdeas.length === 0 && (
            <div className="text-center py-20">
              <p className="text-xl text-white/50">
                Aucune idée trouvée dans cette catégorie
              </p>
            </div>
          )}
        </div>
      </div>

      {/* CTA flottant - Mobile uniquement */}
      {onShowPricing && (
        <div className="fixed bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-[#111111] to-transparent sm:hidden">
          <Button
            onClick={onShowPricing}
            className="w-full bg-gradient-to-r from-pink-500 to-purple-600 text-white 
                     hover:shadow-lg hover:shadow-pink-500/50 transition-all"
          >
            Créer mes photos AI
          </Button>
        </div>
      )}
    </div>
  );
}
