import { Button } from '../ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Sparkles, ArrowLeft } from 'lucide-react';

interface AIPhotoGeneratorProps {
  onBack?: () => void;
  selectedPackage?: string;
}

// Lightweight fallback implementation to keep the build working
export function AIPhotoGenerator({ onBack, selectedPackage }: AIPhotoGeneratorProps) {
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

export default AIPhotoGenerator;
