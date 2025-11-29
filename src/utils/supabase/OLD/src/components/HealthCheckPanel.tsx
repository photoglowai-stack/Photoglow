import React, { useState, useRef, useEffect } from 'react';
import { supabase } from '../utils/supabase/client';
import { projectId, publicAnonKey } from '../utils/supabase/info';
import { Button } from './ui/button';
import { Card } from './ui/card';
import { 
  CheckCircle2, 
  XCircle, 
  AlertCircle, 
  Loader2, 
  Activity,
  Database,
  HardDrive,
  Zap,
  Image as ImageIcon,
  Layers,
  RefreshCw,
  Terminal,
  Copy,
  Trash2
} from 'lucide-react';
import { toast } from 'sonner@2.0.3';
import { VERCEL_API_BASE, API_ENDPOINTS } from '../utils/config';

interface TestResult {
  name: string;
  status: 'success' | 'error' | 'warning' | 'pending';
  message: string;
  details?: any;
  duration?: number;
}

interface LogEntry {
  timestamp: string;
  type: 'info' | 'success' | 'error' | 'warning';
  message: string;
  details?: any;
}

interface HealthCheckState {
  running: boolean;
  results: TestResult[];
  logs: LogEntry[];
  summary: {
    total: number;
    success: number;
    error: number;
    warning: number;
  };
}

export default function HealthCheckPanel() {
  const [state, setState] = useState<HealthCheckState>({
    running: false,
    results: [],
    logs: [],
    summary: { total: 0, success: 0, error: 0, warning: 0 }
  });

  const consoleEndRef = useRef<HTMLDivElement>(null);

  // Auto-scroll to bottom when new logs
  useEffect(() => {
    if (consoleEndRef.current) {
      consoleEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [state.logs]);

  // Create bucket function
  const createBucket = async () => {
    try {
      addLog('info', 'Creating bucket "photos"...');
      
      const response = await fetch(
        `https://${projectId}.supabase.co/functions/v1/make-server-ab844084/create-bucket`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${publicAnonKey}`
          }
        }
      );

      const data = await response.json();
      
      if (data.success) {
        addLog('success', 'Bucket "photos" created successfully!', data);
        toast.success('Bucket "photos" created successfully!');
        // Re-run health check
        setTimeout(() => runHealthCheck(), 1000);
      } else {
        addLog('error', `Failed to create bucket: ${data.error}`, data);
        toast.error(`Failed to create bucket: ${data.error}`);
      }
    } catch (error: any) {
      addLog('error', `Exception creating bucket: ${error.message}`, error);
      toast.error(`Failed to create bucket: ${error.message}`);
    }
  };

  // Fallback copy function for browsers blocking Clipboard API
  const fallbackCopyToClipboard = (text: string) => {
    const textArea = document.createElement('textarea');
    textArea.value = text;
    textArea.style.position = 'fixed';
    textArea.style.left = '-999999px';
    textArea.style.top = '-999999px';
    document.body.appendChild(textArea);
    textArea.focus();
    textArea.select();
    
    try {
      const successful = document.execCommand('copy');
      if (successful) {
        toast.success('Logs copied to clipboard');
      } else {
        toast.error('Failed to copy logs');
      }
    } catch (err) {
      toast.error('Failed to copy logs');
      console.error('Copy error:', err);
    }
    
    document.body.removeChild(textArea);
  };

  // Add log helper
  const addLog = (type: LogEntry['type'], message: string, details?: any) => {
    const timestamp = new Date().toLocaleTimeString('fr-FR', { 
      hour: '2-digit', 
      minute: '2-digit', 
      second: '2-digit',
      fractionalSecondDigits: 3
    });
    
    setState(prev => ({
      ...prev,
      logs: [...prev.logs, { timestamp, type, message, details }]
    }));

    // Also log to actual console
    const consoleMsg = `[${timestamp}] ${message}`;
    switch(type) {
      case 'error': console.error(consoleMsg, details); break;
      case 'warning': console.warn(consoleMsg, details); break;
      case 'success': console.log('✅', consoleMsg, details); break;
      default: console.log(consoleMsg, details);
    }
  };

  // Add result helper
  const addResult = (result: TestResult) => {
    setState(prev => ({
      ...prev,
      results: [...prev.results, result]
    }));
  };

  // Update summary
  const updateSummary = (results: TestResult[]) => {
    const summary = {
      total: results.length,
      success: results.filter(r => r.status === 'success').length,
      error: results.filter(r => r.status === 'error').length,
      warning: results.filter(r => r.status === 'warning').length
    };
    setState(prev => ({ ...prev, summary }));
  };

  // ============================================
  // SUPABASE HEALTH CHECKS
  // ============================================

  const checkSupabaseConnection = async (): Promise<TestResult> => {
    const start = Date.now();
    try {
      // Test avec photos_meta au lieu de credits (qui peut ne pas exister)
      const { data, error } = await supabase.from('photos_meta').select('count').limit(1);
      
      if (error) {
        return {
          name: '🔌 Supabase Connection',
          status: 'error',
          message: `Failed to connect: ${error.message}`,
          details: error,
          duration: Date.now() - start
        };
      }

      return {
        name: '🔌 Supabase Connection',
        status: 'success',
        message: 'Connected successfully to Supabase',
        duration: Date.now() - start
      };
    } catch (error: any) {
      return {
        name: '🔌 Supabase Connection',
        status: 'error',
        message: `Exception: ${error.message}`,
        details: error,
        duration: Date.now() - start
      };
    }
  };

  const checkCreditsTable = async (): Promise<TestResult> => {
    const start = Date.now();
    try {
      // Try user_credits first (actual table name)
      const { data, error } = await supabase
        .from('user_credits')
        .select('user_id, credits')
        .limit(5);

      if (error) {
        // Check for specific error types
        const isTableMissing = error.message.includes('does not exist') || 
                               error.message.includes('not found') ||
                               error.message.includes('Could not find');
        
        const isStackDepth = error.message.includes('stack depth') || 
                            error.code === '54001';
        
        return {
          name: '📊 Credits Table',
          status: (isTableMissing || isStackDepth) ? 'warning' : 'error',
          message: isStackDepth
            ? '⚠️ RLS policy recursion - run fix_stack_depth_user_credits.sql'
            : isTableMissing 
              ? '⚠️ Table not found - needs setup' 
              : `Query failed: ${error.message}`,
          details: { 
            error,
            solution: isStackDepth 
              ? 'Run /sql/fix_stack_depth_user_credits.sql in Supabase SQL Editor'
              : isTableMissing 
                ? 'Run SQL in HEALTH_CHECK_FIX.md to create table' 
                : null
          },
          duration: Date.now() - start
        };
      }

      return {
        name: '📊 Credits Table',
        status: 'success',
        message: `Found ${data?.length || 0} users with credits`,
        details: { count: data?.length },
        duration: Date.now() - start
      };
    } catch (error: any) {
      return {
        name: '📊 Credits Table',
        status: 'warning',
        message: `Table not available: ${error.message}`,
        details: error,
        duration: Date.now() - start
      };
    }
  };

  const checkPhotosMetaTable = async (): Promise<TestResult> => {
    const start = Date.now();
    try {
      const { data, error } = await supabase
        .from('photos_meta')
        .select('id, category, created_at')
        .limit(5);

      if (error) {
        return {
          name: '🖼️ Photos Meta Table',
          status: 'error',
          message: `Query failed: ${error.message}`,
          details: error,
          duration: Date.now() - start
        };
      }

      return {
        name: '🖼️ Photos Meta Table',
        status: 'success',
        message: `Found ${data?.length || 0} photos`,
        details: { count: data?.length },
        duration: Date.now() - start
      };
    } catch (error: any) {
      return {
        name: '🖼️ Photos Meta Table',
        status: 'error',
        message: `Exception: ${error.message}`,
        details: error,
        duration: Date.now() - start
      };
    }
  };

  // Models Table check removed - feature disabled
  // const checkModelsTable = async (): Promise<TestResult> => {
  //   // This feature was removed from AdminV2Unified
  //   // Table 'models' and 'model_photos' do not exist in the database
  // };

  const checkStorageBucket = async (): Promise<TestResult> => {
    const start = Date.now();
    try {
      // Test actual bucket access by listing files (direct Supabase client test)
      console.log('[HealthCheck] Testing storage bucket "photos" access...');
      
      const { data: files, error } = await supabase.storage.from('photos').list('', { limit: 1 });


      if (error) {
        // Check if error is about bucket not existing
        const bucketNotFound = error.message.includes('not found') || 
                               error.message.includes('does not exist');
        
        if (bucketNotFound) {
          return {
            name: '🗄️ Storage Bucket (photos)',
            status: 'error',
            message: '❌ Bucket "photos" does not exist',
            details: { 
              error: error.message,
              solution: 'Create bucket "photos" in Supabase Dashboard (Storage section)'
            },
            duration: Date.now() - start
          };
        }

        // Other errors (permissions, etc.) are warnings
        return {
          name: '🗄️ Storage Bucket (photos)',
          status: 'warning',
          message: `⚠️ Cannot access bucket: ${error.message}`,
          details: { 
            error,
            note: 'Bucket may exist but permissions issue. Try uploading from the app to verify.'
          },
          duration: Date.now() - start
        };
      }

      // Success! Bucket is accessible
      return {
        name: '🗄️ Storage Bucket (photos)',
        status: 'success',
        message: `✅ Bucket "photos" is accessible (${files?.length || 0} items found)`,
        details: { 
          bucket: 'photos',
          itemCount: files?.length || 0,
          verified: true
        },
        duration: Date.now() - start
      };
    } catch (error: any) {
      console.error('[HealthCheck] Storage check error:', error);
      
      return {
        name: '🗄️ Storage Bucket (photos)',
        status: 'warning',
        message: `⚠️ Exception during storage check: ${error.message}`,
        details: { 
          error: error.message,
          note: 'This may be a network issue. Storage should still work for actual operations.'
        },
        duration: Date.now() - start
      };
    }
  };

  // NOTE: checkStorageBucket above is the ACTIVE version that tests bucket access directly

  const OLD_checkStorageBucket_BACKUP_NOT_USED = async (): Promise<TestResult> => {
    const start = Date.now();
    try {
      // This is old backup code - not used
      const data: any = {};
      if (false && data.exists === false) {
        return {
          name: '🗄️ Storage Bucket (photos)',
          status: 'warning',
          message: '⚠️ Bucket "photos" not found - needs setup',
          details: { 
            available: data.available || [],
            solution: 'Create bucket via API or Supabase Dashboard'
          },
          duration: Date.now() - start
        };
      }

      if (data.exists === true || data.ok === true) {
        return {
          name: '🗄️ Storage Bucket (photos)',
          status: 'success',
          message: `✅ Bucket "photos" exists and is accessible`,
          details: { bucket: 'photos', verified: true },
          duration: Date.now() - start
        };
      }

      // Fallback: try to parse response
      return {
        name: '🗄️ Storage Bucket (photos)',
        status: 'warning',
        message: 'Unable to verify bucket status',
        details: data,
        duration: Date.now() - start
      };
    } catch (error: any) {
      console.error('[HealthCheck] Storage check error:', error);
      
      // Treat fetch errors as warnings, not critical errors
      const isFetchError = error.message?.includes('fetch') || 
                          error.message?.includes('Failed to fetch') ||
                          error.name === 'TypeError';
      
      return {
        name: '🗄️ Storage Bucket (photos)',
        status: isFetchError ? 'warning' : 'error',
        message: isFetchError 
          ? '⚠️ Cannot check storage (API not available)' 
          : `Exception: ${error.message}`,
        details: { 
          error: error.message,
          note: isFetchError 
            ? 'Storage verification API is not available. Storage may still work for uploads.' 
            : null
        },
        duration: Date.now() - start
      };
    }
  };

  const OLD_checkStorageBucket = async (): Promise<TestResult> => {
    const start = Date.now();
    try {
      const { data: buckets, error } = await supabase.storage.listBuckets();

      if (error) {
        return {
          name: '🗄️ Storage Bucket (photos)',
          status: 'error',
          message: `Failed to list buckets: ${error.message}`,
          details: error,
          duration: Date.now() - start
        };
      }

      const photosBucket = buckets?.find(b => b.name === 'photos');
      
      if (!photosBucket) {
        return {
          name: '🗄️ Storage Bucket (photos)',
          status: 'warning',
          message: '⚠️ Bucket "photos" not found - needs setup',
          details: { 
            available: buckets?.map(b => b.name),
            solution: 'Create bucket in Supabase Dashboard (see HEALTH_CHECK_FIX.md)'
          },
          duration: Date.now() - start
        };
      }

      // Try to list files
      const { data: files, error: listError } = await supabase.storage
        .from('photos')
        .list('', { limit: 5 });

      if (listError) {
        return {
          name: '🗄️ Storage Bucket (photos)',
          status: 'warning',
          message: `Bucket exists but can't list files: ${listError.message}`,
          details: listError,
          duration: Date.now() - start
        };
      }

      return {
        name: '🗄️ Storage Bucket (photos)',
        status: 'success',
        message: `Bucket active with ${files?.length || 0} items`,
        details: { fileCount: files?.length },
        duration: Date.now() - start
      };
    } catch (error: any) {
      return {
        name: '🗄️ Storage Bucket (photos)',
        status: 'warning',
        message: `Storage not available: ${error.message}`,
        details: error,
        duration: Date.now() - start
      };
    }
  };

  // ============================================
  // V1-PREVIEW BACKEND TEST
  // ============================================

  const testV1PreviewBackend = async (): Promise<TestResult> => {
    const start = Date.now();
    
    try {
      addLog('info', '🔌 Testing V1-Preview backend health...');
      
      const response = await fetch(API_ENDPOINTS.V1_PREVIEW, { 
        method: 'GET',
        signal: AbortSignal.timeout(5000) // 5s timeout
      });
      
      // Accept 200 OK or 405 Method Not Allowed (some backends don't accept GET)
      if (response.ok || response.status === 405) {
        const data = await response.json().catch(() => null);
        
        return {
          name: '🎨 V1-Preview Backend',
          status: 'success',
          message: response.status === 405 
            ? '✅ Backend reachable (405 Method Not Allowed is OK - backend exists)'
            : '✅ Backend is ready',
          details: { 
            status: response.status,
            data,
            endpoint: API_ENDPOINTS.V1_PREVIEW
          },
          duration: Date.now() - start
        };
      }
      
      // Backend responded but not ready
      return {
        name: '🎨 V1-Preview Backend',
        status: 'warning',
        message: `⚠️ Backend responded with HTTP ${response.status}`,
        details: { 
          status: response.status,
          endpoint: API_ENDPOINTS.V1_PREVIEW,
          note: 'Backend may not be fully deployed yet'
        },
        duration: Date.now() - start
      };
      
    } catch (error: any) {
      // Network error - backend not accessible
      const isFetchError = error.message?.includes('fetch') || 
                          error.message?.includes('Failed to fetch') ||
                          error.name === 'TypeError' ||
                          error.name === 'AbortError';
      
      return {
        name: '🎨 V1-Preview Backend',
        status: 'warning',
        message: isFetchError
          ? '⚠️ Backend not accessible (may not be deployed yet)'
          : `⚠️ ${error.message}`,
        details: { 
          error: error.message,
          endpoint: API_ENDPOINTS.V1_PREVIEW,
          note: 'This is a warning, not an error. Preview feature will not work until backend is deployed.'
        },
        duration: Date.now() - start
      };
    }
  };

  // ============================================
  // API GENERATION TESTS
  // ============================================

  const testGenerateFromScratch = async (testMode: boolean): Promise<TestResult> => {
    const start = Date.now();
    const modeName = testMode ? 'TEST' : 'PROD';
    
    try {
      // Get user session token
      const { data: { session } } = await supabase.auth.getSession();
      const userToken = session?.access_token;
      
      if (!userToken) {
        return {
          name: `🎨 Text2Img API (${modeName})`,
          status: 'warning',
          message: '⚠️ User not authenticated',
          details: { solution: 'Login required for API tests' },
          duration: Date.now() - start
        };
      }

      // Call Vercel API directly
      const response = await fetch(API_ENDPOINTS.generateGen4, {
        method: 'POST',
        headers: { 
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${userToken}`
        },
        body: JSON.stringify({
          mode: 'text2img',
          model: 'flux',
          prompt: 'professional headshot, studio lighting, white background',
          aspect_ratio: '1:1',
          test_mode: testMode
        })
      });

      // Check if response is JSON
      const contentType = response.headers.get('content-type');
      if (!contentType || !contentType.includes('application/json')) {
        const text = await response.text();
        throw new Error(`API returned non-JSON response: ${text.substring(0, 100)}`);
      }

      const data = await response.json();

      if (!response.ok) {
        const isAuth = response.status === 401;
        const isCredits = response.status === 402;
        
        return {
          name: `🎨 Text2Img API (${modeName})`,
          status: (isAuth || isCredits) ? 'warning' : 'error',
          message: isAuth 
            ? `⚠️ Auth issue (${response.status}): ${data.error}` 
            : isCredits
              ? `⚠️ Credits exhausted (${response.status})`
              : `HTTP ${response.status}: ${data.error || 'Unknown error'}`,
          details: { 
            ...data,
            solution: isAuth 
              ? 'Token may be expired or invalid' 
              : isCredits 
                ? 'Replicate credits exhausted - test_mode should work'
                : null
          },
          duration: Date.now() - start
        };
      }

      // In test mode, success response doesn't have image_url
      if (testMode && data.success) {
        return {
          name: `🎨 Text2Img API (${modeName})`,
          status: 'success',
          message: `✅ ${data.message || 'Test mode simulation successful'}`,
          details: { 
            credits_used: data.credits_used,
            test_mode: true,
            full_response: data
          },
          duration: Date.now() - start
        };
      }

      if (!data.image_url) {
        return {
          name: `🎨 Text2Img API (${modeName})`,
          status: 'warning',
          message: 'No image_url in response',
          details: data,
          duration: Date.now() - start
        };
      }

      return {
        name: `🎨 Text2Img API (${modeName})`,
        status: 'success',
        message: `Generated successfully in ${((Date.now() - start) / 1000).toFixed(1)}s`,
        details: { 
          image_url: data.image_url.substring(0, 50) + '...',
          job_id: data.job_id
        },
        duration: Date.now() - start
      };
    } catch (error: any) {
      const isFetchError = error.message.includes('fetch');
      const isJSONError = error.message.includes('JSON') || error.message.includes('Unexpected token');
      
      return {
        name: `🎨 Text2Img API (${modeName})`,
        status: 'error',
        message: isJSONError
          ? `API returned HTML/text instead of JSON` 
          : isFetchError 
            ? '⚠️ API not reachable (CORS or network)' 
            : `Exception: ${error.message}`,
        details: { 
          error: error.message,
          solution: isJSONError 
            ? 'API Vercel may be down or returning error page. Check Vercel logs.'
            : isFetchError 
              ? 'Check CORS and allowed domains' 
              : null
        },
        duration: Date.now() - start
      };
    }
  };

  const testGenerateGen4 = async (testMode: boolean): Promise<TestResult> => {
    const start = Date.now();
    const modeName = testMode ? 'TEST' : 'PROD';
    
    try {
      // Get user session token
      const { data: { session } } = await supabase.auth.getSession();
      const userToken = session?.access_token;
      
      if (!userToken) {
        return {
          name: `⚡ Gen4 API (${modeName})`,
          status: 'warning',
          message: '⚠️ User not authenticated',
          details: { solution: 'Login required for API tests' },
          duration: Date.now() - start
        };
      }

      // Call Vercel API directly
      const response = await fetch(API_ENDPOINTS.generateGen4, {
        method: 'POST',
        headers: { 
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${userToken}`
        },
        body: JSON.stringify({
          mode: 'text2img',
          model: 'gen4',
          prompt: 'beautiful portrait, soft cinematic lighting',
          aspect_ratio: '16:9',
          test_mode: testMode
        })
      });

      // Check if response is JSON
      const contentType = response.headers.get('content-type');
      if (!contentType || !contentType.includes('application/json')) {
        const text = await response.text();
        throw new Error(`API returned non-JSON response: ${text.substring(0, 100)}`);
      }

      const data = await response.json();

      if (!response.ok) {
        const isAuth = response.status === 401;
        const isCredits = response.status === 402;
        
        return {
          name: `⚡ Gen4 API (${modeName})`,
          status: (isAuth || isCredits) ? 'warning' : 'error',
          message: isAuth 
            ? `⚠️ Auth issue (${response.status}): ${data.error}` 
            : isCredits
              ? `⚠️ Credits exhausted (${response.status})`
              : `HTTP ${response.status}: ${data.error || 'Unknown error'}`,
          details: { 
            ...data,
            solution: isAuth 
              ? 'Token may be expired or invalid' 
              : isCredits 
                ? 'Replicate credits exhausted - test_mode should work'
                : null
          },
          duration: Date.now() - start
        };
      }

      // In test mode, success response doesn't have image_url
      if (testMode && data.success) {
        return {
          name: `⚡ Gen4 API (${modeName})`,
          status: 'success',
          message: `✅ ${data.message || 'Test mode simulation successful'}`,
          details: { 
            credits_used: data.credits_used,
            test_mode: true,
            full_response: data
          },
          duration: Date.now() - start
        };
      }

      if (!data.image_url) {
        return {
          name: `⚡ Gen4 API (${modeName})`,
          status: 'warning',
          message: 'No image_url in response',
          details: data,
          duration: Date.now() - start
        };
      }

      return {
        name: `⚡ Gen4 API (${modeName})`,
        status: 'success',
        message: `Generated successfully in ${((Date.now() - start) / 1000).toFixed(1)}s`,
        details: { 
          image_url: data.image_url.substring(0, 50) + '...',
          job_id: data.job_id
        },
        duration: Date.now() - start
      };
    } catch (error: any) {
      const isFetchError = error.message.includes('fetch');
      const isJSONError = error.message.includes('JSON') || error.message.includes('Unexpected token');
      
      return {
        name: `⚡ Gen4 API (${modeName})`,
        status: 'error',
        message: isJSONError
          ? `API returned HTML/text instead of JSON` 
          : isFetchError 
            ? '⚠️ API not reachable (CORS or network)' 
            : `Exception: ${error.message}`,
        details: { 
          error: error.message,
          solution: isJSONError 
            ? 'API Vercel may be down or returning error page. Check Vercel logs.'
            : isFetchError 
              ? 'Check CORS' 
              : null
        },
        duration: Date.now() - start
      };
    }
  };

  const testImageToImage = async (testMode: boolean): Promise<TestResult> => {
    const start = Date.now();
    const modeName = testMode ? 'TEST' : 'PROD';
    
    try {
      // Get user session token
      const { data: { session } } = await supabase.auth.getSession();
      const userToken = session?.access_token;
      
      if (!userToken) {
        return {
          name: `🖼️ Img2Img API (${modeName})`,
          status: 'warning',
          message: '⚠️ User not authenticated',
          details: { solution: 'Login required for API tests' },
          duration: Date.now() - start
        };
      }

      // Use a public test image URL
      const testImageUrl = 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400';
      
      // Call Vercel API directly
      const response = await fetch(API_ENDPOINTS.generateGen4, {
        method: 'POST',
        headers: { 
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${userToken}`
        },
        body: JSON.stringify({
          mode: 'img2img',
          model: 'gen4',
          image_url: testImageUrl,
          prompt: 'professional portrait, studio lighting',
          prompt_strength: 0.65,
          test_mode: testMode
        })
      });

      // Check if response is JSON
      const contentType = response.headers.get('content-type');
      if (!contentType || !contentType.includes('application/json')) {
        const text = await response.text();
        throw new Error(`API returned non-JSON response: ${text.substring(0, 100)}`);
      }

      const data = await response.json();

      if (!response.ok) {
        const isAuth = response.status === 401;
        const isCredits = response.status === 402;
        
        return {
          name: `🖼️ Img2Img API (${modeName})`,
          status: (isAuth || isCredits) ? 'warning' : 'error',
          message: isAuth 
            ? `⚠️ Auth issue (${response.status}): ${data.error}` 
            : isCredits
              ? `⚠️ Credits exhausted (${response.status})`
              : `HTTP ${response.status}: ${data.error || 'Unknown error'}`,
          details: { 
            ...data,
            solution: isAuth 
              ? 'Token may be expired or invalid' 
              : isCredits 
                ? 'Replicate credits exhausted - test_mode should work'
                : null
          },
          duration: Date.now() - start
        };
      }

      // In test mode, success response doesn't have image_url
      if (testMode && data.success) {
        return {
          name: `🖼️ Img2Img API (${modeName})`,
          status: 'success',
          message: `✅ ${data.message || 'Test mode simulation successful'}`,
          details: { 
            credits_used: data.credits_used,
            test_mode: true,
            full_response: data
          },
          duration: Date.now() - start
        };
      }

      if (!data.image_url) {
        return {
          name: `🖼️ Img2Img API (${modeName})`,
          status: 'warning',
          message: 'No image_url in response',
          details: data,
          duration: Date.now() - start
        };
      }

      return {
        name: `🖼️ Img2Img API (${modeName})`,
        status: 'success',
        message: `Generated successfully in ${((Date.now() - start) / 1000).toFixed(1)}s`,
        details: { 
          image_url: data.image_url.substring(0, 50) + '...',
          job_id: data.job_id
        },
        duration: Date.now() - start
      };
    } catch (error: any) {
      const isFetchError = error.message.includes('fetch');
      const isJSONError = error.message.includes('JSON') || error.message.includes('Unexpected token');
      
      return {
        name: `🖼️ Img2Img API (${modeName})`,
        status: 'error',
        message: isJSONError
          ? `API returned HTML/text instead of JSON` 
          : isFetchError 
            ? '⚠️ API not reachable (CORS or network)' 
            : `Exception: ${error.message}`,
        details: { 
          error: error.message,
          solution: isJSONError 
            ? 'API Vercel may be down or returning error page. Check Vercel logs.'
            : isFetchError 
              ? 'Check CORS' 
              : null
        },
        duration: Date.now() - start
      };
    }
  };

  // ============================================
  // MAIN HEALTH CHECK
  // ============================================

  const runHealthCheck = async () => {
    setState({
      running: true,
      results: [],
      logs: [],
      summary: { total: 0, success: 0, error: 0, warning: 0 }
    });

    const allResults: TestResult[] = [];

    addLog('info', '🏥 Starting health check...');
    toast.info('🏥 Starting health check...');

    // 1. Supabase Infrastructure
    addLog('info', '🔍 Checking Supabase infrastructure...');
    
    const result1 = await checkSupabaseConnection();
    allResults.push(result1);
    addLog(result1.status === 'success' ? 'success' : result1.status === 'error' ? 'error' : 'warning', 
           `Supabase Connection: ${result1.message}`, result1.details);
    setState(prev => ({ ...prev, results: [...allResults] }));
    
    const result2 = await checkCreditsTable();
    allResults.push(result2);
    addLog(result2.status === 'success' ? 'success' : result2.status === 'error' ? 'error' : 'warning',
           `Credits Table: ${result2.message}`, result2.details);
    setState(prev => ({ ...prev, results: [...allResults] }));
    
    const result3 = await checkPhotosMetaTable();
    allResults.push(result3);
    addLog(result3.status === 'success' ? 'success' : result3.status === 'error' ? 'error' : 'warning',
           `Photos Meta Table: ${result3.message}`, result3.details);
    setState(prev => ({ ...prev, results: [...allResults] }));
    
    // Models Table check removed - feature disabled
    
    const result5 = await checkStorageBucket();
    allResults.push(result5);
    addLog(result5.status === 'success' ? 'success' : result5.status === 'error' ? 'error' : 'warning',
           `Storage Bucket: ${result5.message}`, result5.details);
    setState(prev => ({ ...prev, results: [...allResults] }));

    // 2. V1-Preview Backend Health
    addLog('info', '🔌 Checking V1-Preview backend...');
    
    const resultV1 = await testV1PreviewBackend();
    allResults.push(resultV1);
    addLog(resultV1.status === 'success' ? 'success' : resultV1.status === 'error' ? 'error' : 'warning',
           `V1-Preview Backend: ${resultV1.message}`, resultV1.details);
    setState(prev => ({ ...prev, results: [...allResults] }));

    // 3. API Tests - TEST MODE (no credits used)
    addLog('info', '🧪 Testing APIs in TEST mode...');
    
    const result6 = await testGenerateFromScratch(true);
    allResults.push(result6);
    addLog(result6.status === 'success' ? 'success' : result6.status === 'error' ? 'error' : 'warning',
           `Text2Img API: ${result6.message}`, result6.details);
    setState(prev => ({ ...prev, results: [...allResults] }));
    
    const result7 = await testGenerateGen4(true);
    allResults.push(result7);
    addLog(result7.status === 'success' ? 'success' : result7.status === 'error' ? 'error' : 'warning',
           `Gen4 API: ${result7.message}`, result7.details);
    setState(prev => ({ ...prev, results: [...allResults] }));
    
    const result8 = await testImageToImage(true);
    allResults.push(result8);
    addLog(result8.status === 'success' ? 'success' : result8.status === 'error' ? 'error' : 'warning',
           `Img2Img API: ${result8.message}`, result8.details);
    setState(prev => ({ ...prev, results: [...allResults] }));

    // 3. API Tests - PROD MODE (simulated, no actual calls to avoid credit usage)
    addLog('info', '🏭 Simulating PROD mode checks...');
    
    // Just verify endpoints are reachable without test_mode
    const prodNote = { 
      name: '⚠️ Production Mode', 
      status: 'warning' as const,
      message: 'Skipped to avoid using Replicate credits',
      details: { note: 'Enable manually if you want to test with real credits' }
    };
    allResults.push(prodNote);
    setState(prev => ({ ...prev, results: [...allResults] }));

    // Update final summary
    updateSummary(allResults);

    setState(prev => ({ ...prev, running: false }));

    // Final toast
    const summary = {
      success: allResults.filter(r => r.status === 'success').length,
      error: allResults.filter(r => r.status === 'error').length,
      warning: allResults.filter(r => r.status === 'warning').length
    };

    if (summary.error === 0 && summary.warning === 0) {
      addLog('success', `✅ Health check complete! ${summary.success} tests passed`);
      toast.success(`✅ Health check complete! ${summary.success} tests passed`);
    } else if (summary.error === 0 && summary.warning > 0) {
      addLog('warning', `⚠️ Health check complete with ${summary.warning} warnings (${summary.success} passed)`);
      toast.success(`✅ Health check complete with ${summary.warning} warnings (non-critical)`);
    } else {
      addLog('error', `❌ Health check found ${summary.error} errors, ${summary.warning} warnings`);
      toast.error(`❌ Health check found ${summary.error} errors`);
    }
  };

  // Status icon helper
  const getStatusIcon = (status: TestResult['status']) => {
    switch (status) {
      case 'success': return <CheckCircle2 className="w-5 h-5 text-green-400" />;
      case 'error': return <XCircle className="w-5 h-5 text-red-400" />;
      case 'warning': return <AlertCircle className="w-5 h-5 text-yellow-400" />;
      case 'pending': return <Loader2 className="w-5 h-5 text-blue-400 animate-spin" />;
    }
  };

  const getStatusColor = (status: TestResult['status']) => {
    switch (status) {
      case 'success': return 'bg-green-500/10 border-green-500/20';
      case 'error': return 'bg-red-500/10 border-red-500/20';
      case 'warning': return 'bg-yellow-500/10 border-yellow-500/20';
      case 'pending': return 'bg-blue-500/10 border-blue-500/20';
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <Card className="bg-gradient-to-br from-purple-900/20 to-pink-900/20 border-purple-500/20 p-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Activity className="w-8 h-8 text-purple-400" />
            <div>
              <h2 className="text-2xl font-bold text-white">System Health Check</h2>
              <p className="text-gray-400 text-sm">
                Vérifier Supabase, Storage, et les 3 APIs de génération
              </p>
            </div>
          </div>
          <Button
            onClick={runHealthCheck}
            disabled={state.running}
            className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700"
          >
            {state.running ? (
              <>
                <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                Running...
              </>
            ) : (
              <>
                <RefreshCw className="w-4 h-4 mr-2" />
                Run Health Check
              </>
            )}
          </Button>
        </div>

        {/* Summary */}
        {state.results.length > 0 && (
          <div className="mt-6 grid grid-cols-4 gap-4">
            <div className="bg-gray-800/30 rounded-lg p-4 text-center">
              <div className="text-3xl font-bold text-white">{state.summary.total}</div>
              <div className="text-sm text-gray-400">Total Tests</div>
            </div>
            <div className="bg-green-500/10 border border-green-500/20 rounded-lg p-4 text-center">
              <div className="text-3xl font-bold text-green-400">{state.summary.success}</div>
              <div className="text-sm text-gray-400">Passed</div>
            </div>
            <div className="bg-red-500/10 border border-red-500/20 rounded-lg p-4 text-center">
              <div className="text-3xl font-bold text-red-400">{state.summary.error}</div>
              <div className="text-sm text-gray-400">Failed</div>
            </div>
            <div className="bg-yellow-500/10 border border-yellow-500/20 rounded-lg p-4 text-center">
              <div className="text-3xl font-bold text-yellow-400">{state.summary.warning}</div>
              <div className="text-sm text-gray-400">Warnings</div>
            </div>
          </div>
        )}
      </Card>

      {/* Results */}
      {state.results.length > 0 && (
        <div className="space-y-3">
          <h3 className="text-lg font-semibold text-white flex items-center gap-2">
            <Layers className="w-5 h-5 text-purple-400" />
            Test Results
          </h3>
          
          {state.results.map((result, index) => (
            <Card
              key={index}
              className={`border p-4 ${getStatusColor(result.status)}`}
            >
              <div className="flex items-start gap-4">
                {/* Icon */}
                <div className="mt-0.5">
                  {getStatusIcon(result.status)}
                </div>

                {/* Content */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between">
                    <h4 className="font-semibold text-white">{result.name}</h4>
                    {result.duration && (
                      <span className="text-xs text-gray-500">
                        {result.duration}ms
                      </span>
                    )}
                  </div>
                  <p className="text-sm text-gray-300 mt-1">{result.message}</p>
                  
                  {/* Quick Fix Button for Storage Bucket */}
                  {result.name.includes('Storage Bucket') && result.status === 'warning' && (
                    <div className="mt-3">
                      <Button
                        onClick={createBucket}
                        size="sm"
                        className="bg-yellow-600 hover:bg-yellow-700 text-white"
                      >
                        <HardDrive className="w-4 h-4 mr-2" />
                        Create Bucket Now
                      </Button>
                    </div>
                  )}
                  
                  {/* Details */}
                  {result.details && (
                    <details className="mt-2">
                      <summary className="text-xs text-gray-500 cursor-pointer hover:text-gray-400">
                        View details
                      </summary>
                      <pre className="mt-2 p-2 bg-black/30 rounded text-xs text-gray-400 overflow-x-auto">
                        {JSON.stringify(result.details, null, 2)}
                      </pre>
                    </details>
                  )}
                </div>
              </div>
            </Card>
          ))}
        </div>
      )}

      {/* Empty state */}
      {state.results.length === 0 && !state.running && (
        <Card className="bg-gray-800/30 border-gray-700/30 p-12 text-center">
          <Activity className="w-16 h-16 text-gray-600 mx-auto mb-4" />
          <h3 className="text-xl font-semibold text-gray-400 mb-2">
            No health check run yet
          </h3>
          <p className="text-gray-500 mb-6">
            Click "Run Health Check" to test all systems
          </p>
          <div className="grid grid-cols-3 gap-4 max-w-2xl mx-auto text-left">
            <div className="bg-gray-800/50 rounded-lg p-4">
              <Database className="w-6 h-6 text-blue-400 mb-2" />
              <div className="text-sm font-semibold text-white">Supabase</div>
              <div className="text-xs text-gray-500">Tables & Storage</div>
            </div>
            <div className="bg-gray-800/50 rounded-lg p-4">
              <Zap className="w-6 h-6 text-yellow-400 mb-2" />
              <div className="text-sm font-semibold text-white">APIs</div>
              <div className="text-xs text-gray-500">3 Generation Models</div>
            </div>
            <div className="bg-gray-800/50 rounded-lg p-4">
              <ImageIcon className="w-6 h-6 text-purple-400 mb-2" />
              <div className="text-sm font-semibold text-white">Test Mode</div>
              <div className="text-xs text-gray-500">No credits used</div>
            </div>
          </div>
        </Card>
      )}

      {/* Info Note */}
      <Card className="bg-blue-500/10 border-blue-500/20 p-4">
        <div className="flex gap-3">
          <AlertCircle className="w-5 h-5 text-blue-400 flex-shrink-0 mt-0.5" />
          <div className="text-sm text-blue-200">
            <p className="font-semibold mb-1">ℹ️ Test Mode Information</p>
            <ul className="space-y-1 text-blue-300/80">
              <li>• Tests run with <code className="px-1 bg-black/20 rounded">test_mode: true</code> - no Replicate credits consumed</li>
              <li>• Production mode tests are skipped to avoid credit usage</li>
              <li>• All tests use predefined prompts for consistency</li>
              <li>• Storage tests only list files, no uploads performed</li>
            </ul>
          </div>
        </div>
      </Card>

      {/* Console Logs */}
      {state.logs.length > 0 && (
        <Card className="bg-gray-900/50 border-gray-700/30 overflow-hidden">
          {/* Console Header */}
          <div className="bg-gray-800/50 border-b border-gray-700/30 px-4 py-3 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Terminal className="w-5 h-5 text-green-400" />
              <h3 className="font-semibold text-white">Console Logs</h3>
              <span className="text-xs text-gray-500">({state.logs.length} entries)</span>
            </div>
            <div className="flex items-center gap-2">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => {
                  const logsText = state.logs
                    .map(log => `[${log.timestamp}] [${log.type.toUpperCase()}] ${log.message}${log.details ? '\n' + JSON.stringify(log.details, null, 2) : ''}`)
                    .join('\n\n');
                  
                  // Fallback method for Clipboard API
                  try {
                    if (navigator.clipboard && window.isSecureContext) {
                      navigator.clipboard.writeText(logsText).then(() => {
                        toast.success('Logs copied to clipboard');
                      }).catch(() => {
                        // Fallback to textarea method
                        fallbackCopyToClipboard(logsText);
                      });
                    } else {
                      // Use fallback method directly
                      fallbackCopyToClipboard(logsText);
                    }
                  } catch (err) {
                    fallbackCopyToClipboard(logsText);
                  }
                }}
                className="text-gray-400 hover:text-white"
              >
                <Copy className="w-4 h-4 mr-1" />
                Copy
              </Button>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => {
                  setState(prev => ({ ...prev, logs: [] }));
                  toast.info('Console cleared');
                }}
                className="text-gray-400 hover:text-red-400"
              >
                <Trash2 className="w-4 h-4 mr-1" />
                Clear
              </Button>
            </div>
          </div>

          {/* Console Body */}
          <div className="p-4 max-h-[500px] overflow-y-auto bg-black/30 font-mono text-xs">
            {state.logs.map((log, index) => {
              const getLogColor = () => {
                switch(log.type) {
                  case 'success': return 'text-green-400';
                  case 'error': return 'text-red-400';
                  case 'warning': return 'text-yellow-400';
                  default: return 'text-gray-300';
                }
              };

              const getLogIcon = () => {
                switch(log.type) {
                  case 'success': return '✅';
                  case 'error': return '❌';
                  case 'warning': return '⚠️';
                  default: return 'ℹ️';
                }
              };

              return (
                <div key={index} className="mb-3 pb-3 border-b border-gray-800/50 last:border-0">
                  {/* Log Header */}
                  <div className="flex items-start gap-2">
                    <span className="text-gray-500 select-none">{getLogIcon()}</span>
                    <span className="text-gray-500 min-w-[90px]">[{log.timestamp}]</span>
                    <span className={`${getLogColor()} flex-1`}>
                      {log.message}
                    </span>
                  </div>

                  {/* Log Details */}
                  {log.details && (
                    <div className="mt-2 ml-8 pl-4 border-l-2 border-gray-700">
                      <pre className="text-gray-400 whitespace-pre-wrap break-all">
                        {typeof log.details === 'string' 
                          ? log.details 
                          : JSON.stringify(log.details, null, 2)}
                      </pre>
                    </div>
                  )}
                </div>
              );
            })}
            <div ref={consoleEndRef} />
          </div>
        </Card>
      )}
    </div>
  );
}
