import { useMemo } from 'react';
import { ExploreAIModelsPage } from './ExploreModels';

interface AIPhotoGeneratorProps {
  onBack?: () => void;
  selectedPackage?: string;
  onSelectModel?: (modelId: string) => void;
}

export function AIPhotoGenerator({ onBack, selectedPackage, onSelectModel }: AIPhotoGeneratorProps) {
  const backHandler = useMemo(() => onBack ?? (() => {}), [onBack]);
  const selectHandler = useMemo(() => onSelectModel ?? (() => {}), [onSelectModel]);
  void selectedPackage; // prop kept for compatibility with parent state

  return (
    <ExploreAIModelsPage
      onBack={backHandler}
      onModelSelect={selectHandler}
    />
  );
}

export default AIPhotoGenerator;
