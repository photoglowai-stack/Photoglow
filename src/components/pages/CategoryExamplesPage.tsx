/**
 * @file CategoryExamplesPage - Page d'exemples pour une catégorie
 * @description Affiche une galerie d'exemples de photos AI pour une catégorie spécifique
 */

import { ArrowLeft } from 'lucide-react';
import { Button } from '../ui/button';
import { LazyImage } from '../shared/LazyImage';
import { categoryExamplesData } from '../categoryExamplesData';

interface CategoryExamplesPageProps {
    /** ID de la catégorie (ex: 'ai-headshots', 'ai-model-photo') */
    categoryId: string;
    /** Callback pour retourner à la page précédente */
    onBack?: () => void;
    /** Callback pour lancer la génération */
    onGenerateNow?: () => void;
}

// Mapping des IDs de catégorie vers leurs titres
const categoryTitles: Record<string, string> = {
    'ai-headshots': 'AI Headshots',
    'ai-model-photo': 'AI Model Photos',
    'ai-dating-photos': 'AI Dating Photos',
    'ai-fitness-photos': 'AI Fitness Photos',
    'ai-selfie': 'AI Selfie Generator',
    'ai-portrait': 'AI Portrait Generator',
    'ai-realistic-photo': 'AI Realistic Photos',
};

/**
 * Page d'exemples pour une catégorie
 * 
 * Affiche une grille de 8 photos d'exemples pour la catégorie sélectionnée
 * Utilise les données de categoryExamplesData.ts
 */
export function CategoryExamplesPage({
    categoryId,
    onBack,
    onGenerateNow
}: CategoryExamplesPageProps) {
    // Récupérer les photos pour cette catégorie
    const examples = categoryExamplesData[categoryId as keyof typeof categoryExamplesData];
    const title = categoryTitles[categoryId] || 'AI Photos';

    if (!examples || !examples.photos || examples.photos.length === 0) {
        return (
            <div className="min-h-screen bg-black text-white flex items-center justify-center">
                <div className="text-center">
                    <h2 className="text-2xl font-bold mb-4">No examples available</h2>
                    <p className="text-gray-400 mb-6">Examples for this category are coming soon.</p>
                    {onBack && (
                        <Button onClick={onBack} variant="outline">
                            <ArrowLeft className="w-4 h-4 mr-2" />
                            Go Back
                        </Button>
                    )}
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-black text-white">
            {/* Header */}
            <div className="sticky top-0 z-40 bg-black/80 backdrop-blur-md border-b border-white/10">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
                    <div className="flex items-center justify-between">
                        {onBack && (
                            <Button
                                onClick={onBack}
                                variant="ghost"
                                className="text-gray-300 hover:text-white"
                            >
                                <ArrowLeft className="w-4 h-4 mr-2" />
                                Back
                            </Button>
                        )}
                        {onGenerateNow && (
                            <Button
                                onClick={onGenerateNow}
                                className="bg-gradient-to-r from-pink-500 to-purple-600 text-white hover:shadow-lg hover:shadow-pink-500/50"
                            >
                                Generate Now
                            </Button>
                        )}
                    </div>
                </div>
            </div>

            {/* Main Content */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                {/* Title */}
                <div className="text-center mb-12">
                    <h1 className="text-4xl md:text-5xl font-bold mb-4">
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-pink-400 via-purple-400 to-cyan-400">
                            {title}
                        </span>
                        {' '}Examples
                    </h1>
                    <p className="text-gray-400 text-lg">
                        See what you can create with our AI photo generator
                    </p>
                </div>

                {/* Examples Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                    {examples.photos.map((photoUrl, index) => (
                        <div
                            key={index}
                            className="group relative aspect-[3/4] rounded-xl overflow-hidden cursor-pointer"
                        >
                            <LazyImage
                                src={photoUrl}
                                alt={`${title} example ${index + 1}`}
                                className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-500"
                            />

                            {/* Hover Overlay */}
                            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                                <div className="absolute bottom-4 left-4 right-4">
                                    <p className="text-white font-semibold text-sm">
                                        Example {index + 1}
                                    </p>
                                </div>
                            </div>

                            {/* Border Glow */}
                            <div className="absolute inset-0 border-2 border-purple-500/0 group-hover:border-purple-500/50 rounded-xl transition-all duration-300" />
                        </div>
                    ))}
                </div>

                {/* CTA Section */}
                {onGenerateNow && (
                    <div className="text-center mt-16">
                        <Button
                            onClick={onGenerateNow}
                            className="px-12 py-6 text-lg bg-gradient-to-r from-pink-500 via-purple-500 to-cyan-500 hover:from-pink-600 hover:via-purple-600 hover:to-cyan-600 text-white font-bold rounded-2xl shadow-2xl shadow-purple-500/40 hover:shadow-purple-500/60 transition-all duration-300 hover:scale-105"
                        >
                            Create Your Own {title}
                        </Button>
                        <p className="mt-4 text-gray-400 text-sm">
                            Upload your photos and get professional AI-generated results in minutes
                        </p>
                    </div>
                )}
            </div>
        </div>
    );
}
