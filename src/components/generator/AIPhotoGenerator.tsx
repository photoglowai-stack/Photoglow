import { useMemo } from 'react';
import { ArrowLeft, Sparkles } from 'lucide-react';
import { ExploreAIModelsPage } from './ExploreModels';
import { usePresets } from '../../hooks/usePresets';
import { Button } from '../ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';

interface AIPhotoGeneratorProps {
  onBack?: () => void;
  selectedPackage?: string;
  onSelectModel?: (modelId: string) => void;
}

const placeholderEnabled =
  typeof import.meta !== 'undefined' && import.meta.env?.VITE_PLACEHOLDER_MODE === 'true';

function PlaceholderView({ onBack, selectedPackage }: Pick<AIPhotoGeneratorProps, 'onBack' | 'selectedPackage'>) {
  return (
    <div className="min-h-screen bg-black text-white px-6 py-10">
      <div className="max-w-4xl mx-auto space-y-6">
        {onBack && (
          <Button variant="ghost" className="text-gray-300 hover:text-white" onClick={onBack}>
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to options
          </Button>
        )}

        <Card className="bg-gradient-to-br from-gray-900 to-gray-950 border border-white/5 shadow-2xl">
          <CardHeader className="space-y-2">
            <CardTitle className="flex items-center gap-3 text-2xl font-bold">
              <Sparkles className="h-5 w-5 text-pink-400" />
              AI Photo Generator
            </CardTitle>
            <p className="text-gray-400">
              The full generator experience isn&rsquo;t available in this build, but you can continue the flow from your selected package.
            </p>
          </CardHeader>
          <CardContent className="space-y-4 text-gray-200">
            <p>
              Selected package: {selectedPackage ? <span className="font-semibold">{selectedPackage}</span> : 'Not selected'}
            </p>
            <p>
              Use the navigation above to return to the main experience. This placeholder keeps the build healthy while the full generator is prepared.
            </p>
            {onBack && (
              <Button onClick={onBack} className="bg-pink-600 hover:bg-pink-700 text-white">
                Go back
              </Button>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

export function AIPhotoGenerator({ onBack, selectedPackage, onSelectModel }: AIPhotoGeneratorProps) {
  const backHandler = useMemo(() => onBack ?? (() => {}), [onBack]);
  const selectHandler = useMemo(() => onSelectModel ?? (() => {}), [onSelectModel]);
  const { categories, loading, error } = usePresets();

  if (placeholderEnabled) {
    return <PlaceholderView onBack={onBack} selectedPackage={selectedPackage} />;
  }

  return (
    <ExploreAIModelsPage
      onBack={backHandler}
      onModelSelect={selectHandler}
      categories={categories}
      loadingCategories={loading}
      categoriesError={error}
    />
  );
}

export default AIPhotoGenerator;
