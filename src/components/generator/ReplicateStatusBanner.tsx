import { useState } from 'react';
import { Alert, AlertDescription, AlertTitle } from '../ui/alert';
import { XCircle } from 'lucide-react';
import { Button } from '../ui/button';

interface ReplicateStatusBannerProps {
    show: boolean;
    errorMessage: string;
    onClose: () => void;
}

export function ReplicateStatusBanner({ show, errorMessage, onClose }: ReplicateStatusBannerProps) {
    if (!show) return null;

    return (
        <Alert variant="destructive" className="mb-4">
            <XCircle className="h-4 w-4" />
            <AlertTitle>Replicate API Error</AlertTitle>
            <AlertDescription className="flex items-center justify-between">
                <span>{errorMessage}</span>
                <Button variant="outline" size="sm" onClick={onClose}>
                    Dismiss
                </Button>
            </AlertDescription>
        </Alert>
    );
}

export function useReplicateStatus() {
    const [status, setStatus] = useState({
        show: false,
        errorMessage: ''
    });

    const showReplicateError = (errorMessage: string) => {
        setStatus({ show: true, errorMessage });
    };

    const hideReplicateError = () => {
        setStatus({ show: false, errorMessage: '' });
    };

    return {
        status,
        showReplicateError,
        hideReplicateError
    };
}
