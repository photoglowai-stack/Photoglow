import { useState, useEffect } from 'react';
import { AlertCircle, X, ExternalLink, CreditCard } from 'lucide-react';
import { Alert, AlertDescription } from '../ui/alert';
import { Button } from '../ui/button';

interface ReplicateStatusBannerProps {
  show?: boolean;
  errorMessage?: string;
  onClose?: () => void;
}

/**
 * Banner to display Replicate API credit issues
 * Shows when 402 Payment Required errors occur
 */
export function ReplicateStatusBanner({ 
  show = false, 
  errorMessage = '',
  onClose 
}: ReplicateStatusBannerProps) {
  const [isVisible, setIsVisible] = useState(show);

  useEffect(() => {
    setIsVisible(show);
  }, [show]);

  const handleClose = () => {
    setIsVisible(false);
    onClose?.();
  };

  // Check if error is related to Replicate credits
  const isReplicateError = errorMessage.includes('402') || 
                          errorMessage.includes('Insufficient credit') ||
                          errorMessage.includes('Payment Required') ||
                          errorMessage.includes('Replicate');

  if (!isReplicateError) {
    return null;
  }

  return (
    <>
      {isVisible && (
        <div
          className="fixed top-4 left-1/2 -translate-x-1/2 z-50 w-full max-w-2xl px-4 animate-in fade-in slide-in-from-top-12 duration-300"
          style={{ 
            animation: isVisible ? 'slideInFromTop 0.3s ease-out' : 'slideOutToTop 0.3s ease-in'
          }}
        >
          <Alert className="bg-red-900/30 border-red-500/50 backdrop-blur-md shadow-2xl">
            <div className="flex items-start gap-3">
              <AlertCircle className="w-5 h-5 text-red-400 mt-0.5 flex-shrink-0" />
              
              <div className="flex-1 space-y-3">
                <AlertDescription className="text-white">
                  <div className="mb-2">⚠️ Replicate API Credits Exhausted</div>
                  <div className="text-sm text-gray-300 space-y-2">
                    <p>
                      The Replicate API (used for Gen-4 image generation) requires credits to run. 
                      Your account has insufficient credits.
                    </p>
                    <div className="flex flex-wrap gap-2 mt-3">
                      <Button
                        asChild
                        size="sm"
                        className="bg-gradient-to-r from-pink-500 to-purple-600 hover:from-pink-600 hover:to-purple-700"
                      >
                        <a 
                          href="https://replicate.com/account/billing#billing" 
                          target="_blank" 
                          rel="noopener noreferrer"
                          className="flex items-center gap-2"
                        >
                          <CreditCard className="w-4 h-4" />
                          Add Replicate Credits
                          <ExternalLink className="w-3 h-3" />
                        </a>
                      </Button>
                      
                      <Button
                        asChild
                        size="sm"
                        variant="outline"
                        className="border-gray-600 text-white hover:bg-gray-800"
                      >
                        <a 
                          href="https://replicate.com/account" 
                          target="_blank" 
                          rel="noopener noreferrer"
                          className="flex items-center gap-2"
                        >
                          Check Account
                          <ExternalLink className="w-3 h-3" />
                        </a>
                      </Button>
                    </div>
                  </div>
                </AlertDescription>
              </div>

              {onClose && (
                <button
                  onClick={handleClose}
                  className="text-gray-400 hover:text-white transition-colors flex-shrink-0"
                >
                  <X className="w-4 h-4" />
                </button>
              )}
            </div>
          </Alert>
        </div>
      )}
    </>
  );
}

/**
 * Hook to manage Replicate status notifications
 */
export function useReplicateStatus() {
  const [status, setStatus] = useState<{
    show: boolean;
    errorMessage: string;
  }>({
    show: false,
    errorMessage: ''
  });

  const showReplicateError = (errorMessage: string) => {
    setStatus({ show: true, errorMessage });
  };

  const hideReplicateError = () => {
    setStatus({ show: false, errorMessage: '' });
  };

  return { status, showReplicateError, hideReplicateError };
}
