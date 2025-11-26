/**
 * PhotoGlow - Job Polling Utility
 * Handles polling for queued image/video generation jobs from Vercel API
 */

import { projectId } from './supabase/info';

export interface JobStatus {
  ok: boolean;
  status: 'queued' | 'processing' | 'succeeded' | 'failed';
  job_id: string;
  image_url?: string;
  video_url?: string;
  error?: string;
  progress?: number;
  message?: string;
}

export interface PollingOptions {
  jobId: string;
  accessToken: string;
  maxAttempts?: number;
  intervalMs?: number;
  onProgress?: (status: JobStatus) => void;
  onSuccess?: (status: JobStatus) => void;
  onError?: (error: string) => void;
}

/**
 * Poll a job until it succeeds, fails, or times out
 * @param options - Polling configuration
 * @returns Promise with final job status
 */
export async function pollJobStatus(options: PollingOptions): Promise<JobStatus> {
  const {
    jobId,
    accessToken,
    maxAttempts = 60,      // 60 attempts
    intervalMs = 2000,      // Every 2 seconds
    onProgress,
    onSuccess,
    onError
  } = options;

  let attempts = 0;

  return new Promise((resolve, reject) => {
    const pollInterval = setInterval(async () => {
      attempts++;

      try {
        // Call backend to check job status
        const response = await fetch(
          `https://${projectId}.supabase.co/functions/v1/make-server-ab844084/user/v1/jobs/${jobId}`,
          {
            headers: {
              'Authorization': `Bearer ${accessToken}`,
              'Content-Type': 'application/json'
            }
          }
        );

        if (!response.ok) {
          const errorData = await response.json();
          const errorMsg = errorData.error || 'Failed to check job status';
          
          if (onError) {
            onError(errorMsg);
          }
          
          clearInterval(pollInterval);
          reject(new Error(errorMsg));
          return;
        }

        const jobStatus: JobStatus = await response.json();

        // Notify progress callback
        if (onProgress) {
          onProgress(jobStatus);
        }

        // Check if job is completed
        if (jobStatus.status === 'succeeded') {
          clearInterval(pollInterval);
          
          if (onSuccess) {
            onSuccess(jobStatus);
          }
          
          resolve(jobStatus);
          return;
        }

        // Check if job failed
        if (jobStatus.status === 'failed') {
          clearInterval(pollInterval);
          const errorMsg = jobStatus.error || 'Job failed';
          
          if (onError) {
            onError(errorMsg);
          }
          
          reject(new Error(errorMsg));
          return;
        }

        // Check if max attempts reached
        if (attempts >= maxAttempts) {
          clearInterval(pollInterval);
          const timeoutMsg = 'Job polling timeout - please check back later';
          
          if (onError) {
            onError(timeoutMsg);
          }
          
          reject(new Error(timeoutMsg));
          return;
        }

        // Continue polling (job is still queued or processing)
        console.log(`[Polling] Attempt ${attempts}/${maxAttempts} - Status: ${jobStatus.status}`);

      } catch (error: any) {
        console.error('[Polling] Error:', error);
        
        // Don't fail immediately on network errors, retry
        if (attempts >= maxAttempts) {
          clearInterval(pollInterval);
          
          if (onError) {
            onError(error.message || 'Polling failed');
          }
          
          reject(error);
        }
      }
    }, intervalMs);
  });
}

/**
 * Poll multiple jobs in parallel
 * @param jobs - Array of job configurations
 * @returns Promise with all job statuses
 */
export async function pollMultipleJobs(
  jobs: PollingOptions[]
): Promise<JobStatus[]> {
  const promises = jobs.map(job => pollJobStatus(job));
  return Promise.all(promises);
}

/**
 * Cancel polling (utility for cleanup)
 * Note: This is handled automatically by the interval clearing in pollJobStatus
 */
export function cancelPolling(intervalId: NodeJS.Timeout): void {
  clearInterval(intervalId);
}

/**
 * Get estimated wait time based on queue position
 * @param queuePosition - Position in queue
 * @returns Estimated seconds to wait
 */
export function getEstimatedWaitTime(queuePosition?: number): number {
  if (!queuePosition) return 30; // Default 30s
  
  // Assume ~10s per job in queue
  return queuePosition * 10;
}

/**
 * Format wait time for display
 * @param seconds - Number of seconds
 * @returns Human-readable time string
 */
export function formatWaitTime(seconds: number): string {
  if (seconds < 60) {
    return `~${seconds}s`;
  }
  
  const minutes = Math.floor(seconds / 60);
  const remainingSeconds = seconds % 60;
  
  if (remainingSeconds === 0) {
    return `~${minutes}min`;
  }
  
  return `~${minutes}min ${remainingSeconds}s`;
}
