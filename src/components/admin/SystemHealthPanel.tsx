import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Alert, AlertDescription } from './ui/alert';
import { CheckCircle2, XCircle, AlertCircle, Loader2, PlayCircle } from 'lucide-react';
import { supabase } from '../utils/supabase/client';
import { VERCEL_API_BASE, API_ENDPOINTS } from '../utils/config';

interface BucketCheckResult {
  ok: boolean;
  bucket: string;
  exists: boolean;
}

interface CreateBucketResult {
  ok: boolean;
  name: string;
  created?: boolean;
  already?: boolean;
  error?: string;
}

interface SystemHealthCheck {
  name: string;
  ok: boolean;
  expected?: string;
}

interface SystemHealthResult {
  ok: boolean;
  env: {
    BUCKET_UPLOADS: string;
    BUCKET_IMAGES: string;
  };
  checks: SystemHealthCheck[];
}

interface GenerationTestResult {
  ok: boolean;
  job_id?: string;
  user_id?: string;
  image_url?: string;
  storage_path?: string;
  test_mode?: boolean;
  error?: string;
}

export default function SystemHealthPanel() {
  const [loading, setLoading] = useState(false);
  const [bucketStatus, setBucketStatus] = useState<Record<string, BucketCheckResult>>({});
  const [systemHealth, setSystemHealth] = useState<SystemHealthResult | null>(null);
  const [testResult, setTestResult] = useState<GenerationTestResult | null>(null);
  const [error, setError] = useState('');

  const getAuthToken = async () => {
    const { data: { session }, error } = await supabase.auth.getSession();
    
    if (error || !session) {
      throw new Error('Non authentifié. Veuillez vous connecter.');
    }
    
    return session.access_token;
  };

  const checkBucket = async (bucketName: string) => {
    try {
      setError('');
      
      // Check directly with Supabase instead of via API
      const { data: buckets, error: listError } = await supabase.storage.listBuckets();
      
      if (listError) {
        console.error(`[SystemHealthPanel] Error listing buckets:`, listError);
        throw listError;
      }
      
      const exists = buckets?.some(bucket => bucket.name === bucketName) || false;
      
      console.log(`[SystemHealthPanel] Bucket "${bucketName}": ${exists ? 'FOUND ✅' : 'NOT FOUND ❌'}`, {
        available: buckets?.map(b => b.name) || []
      });
      
      const result: BucketCheckResult = {
        ok: exists,
        bucket: bucketName,
        exists: exists
      };
      
      setBucketStatus(prev => ({ ...prev, [bucketName]: result }));
      return result;
    } catch (err) {
      const errorMsg = `Erreur lors de la vérification du bucket ${bucketName}: ${err}`;
      setError(errorMsg);
      console.error('[SystemHealthPanel] Bucket check error:', err);
      
      const result: BucketCheckResult = {
        ok: false,
        bucket: bucketName,
        exists: false
      };
      setBucketStatus(prev => ({ ...prev, [bucketName]: result }));
      return result;
    }
  };

  const createBucket = async (bucketName: string, isPublic: boolean = true) => {
    try {
      setLoading(true);
      setError('');
      
      console.log(`[SystemHealthPanel] Creating bucket "${bucketName}" (public: ${isPublic})`);
      
      // First check if bucket already exists
      const { data: buckets } = await supabase.storage.listBuckets();
      const exists = buckets?.some(bucket => bucket.name === bucketName);
      
      if (exists) {
        console.log(`[SystemHealthPanel] Bucket "${bucketName}" already exists`);
        await checkBucket(bucketName);
        return { ok: true, name: bucketName, already: true };
      }
      
      // Create bucket directly with Supabase
      const { data, error: createError } = await supabase.storage.createBucket(bucketName, {
        public: isPublic,
        fileSizeLimit: 52428800 // 50MB
      });
      
      if (createError) {
        console.error(`[SystemHealthPanel] Error creating bucket:`, createError);
        throw createError;
      }
      
      console.log(`[SystemHealthPanel] Bucket "${bucketName}" created successfully ✅`);
      
      // Recheck bucket status
      await checkBucket(bucketName);
      
      return { ok: true, name: bucketName, created: true };
    } catch (err) {
      const errorMsg = `Erreur lors de la création du bucket ${bucketName}: ${err}`;
      setError(errorMsg);
      console.error('[SystemHealthPanel] Bucket creation error:', err);
      return { ok: false, name: bucketName, error: errorMsg };
    } finally {
      setLoading(false);
    }
  };

  const checkSystemHealth = async () => {
    try {
      setLoading(true);
      setError('');
      
      console.log('[SystemHealthPanel] Checking system health...');
      
      // Check API health
      const apiResponse = await fetch(`${API_BASE}/api/system`);
      const apiData: SystemHealthResult = await apiResponse.json();
      
      console.log('[SystemHealthPanel] API health check:', apiData);
      
      setSystemHealth(apiData);
      
      // Always check standard PhotoGlow buckets directly
      console.log('[SystemHealthPanel] Checking standard PhotoGlow buckets...');
      await checkBucket('photos');
      await checkBucket('generated_images');
      await checkBucket('training_photos');
      
      // Also check buckets from API if different
      if (apiData.env?.BUCKET_UPLOADS && apiData.env.BUCKET_UPLOADS !== 'photos') {
        await checkBucket(apiData.env.BUCKET_UPLOADS);
      }
      if (apiData.env?.BUCKET_IMAGES && apiData.env.BUCKET_IMAGES !== 'generated_images') {
        await checkBucket(apiData.env.BUCKET_IMAGES);
      }
      
      return apiData;
    } catch (err) {
      const errorMsg = `Erreur lors de la vérification système: ${err}`;
      setError(errorMsg);
      console.error('[SystemHealthPanel] System health error:', err);
      
      // Even if API fails, still check buckets directly
      console.log('[SystemHealthPanel] API check failed, checking buckets directly...');
      await checkBucket('photos');
      await checkBucket('generated_images');
      await checkBucket('training_photos');
      
      return null;
    } finally {
      setLoading(false);
    }
  };

  const runGenerationTest = async () => {
    try {
      setLoading(true);
      setError('');
      setTestResult(null);
      
      const token = await getAuthToken();
      
      // Use the unified /v1/jobs API like HealthCheckPanel
      const response = await fetch(`${API_BASE}/v1/jobs`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
          'Idempotency-Key': `system-health-test-${Date.now()}`
        },
        body: JSON.stringify({
          mode: 'text2img',
          model: 'gen4',
          prompt: 'portrait 85mm, soft light, professional headshot',
          aspect_ratio: '1:1',
          test_mode: true,
        }),
      });
      
      const data = await response.json();
      
      console.log('Generation test result:', data);
      
      // Map response to our interface
      const result: GenerationTestResult = {
        ok: response.ok && !!data.image_url,
        job_id: data.job_id,
        user_id: data.user_id,
        image_url: data.image_url,
        storage_path: data.storage_path,
        test_mode: data.test_mode || true,
        error: !response.ok ? data.error : (!data.image_url ? 'No image URL in response' : undefined)
      };
      
      setTestResult(result);
      
      if (!result.ok) {
        throw new Error(result.error || 'Erreur lors du test de génération');
      }
      
      return result;
    } catch (err) {
      const errorMsg = String(err);
      setError(`Erreur lors du test de génération: ${errorMsg}`);
      console.error('Generation test error:', err);
      setTestResult({ ok: false, error: errorMsg });
      return null;
    } finally {
      setLoading(false);
    }
  };

  const renderStatusIcon = (ok: boolean) => {
    if (ok) {
      return <CheckCircle2 className="w-5 h-5 text-green-500" />;
    }
    return <XCircle className="w-5 h-5 text-red-500" />;
  };

  const renderBucketStatus = (bucketName: string) => {
    const status = bucketStatus[bucketName];
    
    if (!status) {
      return (
        <div className="flex items-center gap-2">
          <AlertCircle className="w-5 h-5 text-gray-400" />
          <span className="text-sm text-gray-400">Non vérifié</span>
        </div>
      );
    }
    
    if (status.exists) {
      return (
        <div className="flex items-center gap-2">
          <CheckCircle2 className="w-5 h-5 text-green-500" />
          <span className="text-sm text-green-500">✅ Bucket présent</span>
        </div>
      );
    }
    
    return (
      <div className="flex items-center gap-2">
        <XCircle className="w-5 h-5 text-orange-500" />
        <span className="text-sm text-orange-500">⚠️ Bucket manquant</span>
        <Button
          size="sm"
          onClick={() => createBucket(bucketName)}
          disabled={loading}
        >
          Créer
        </Button>
      </div>
    );
  };

  return (
    <div className="max-w-4xl mx-auto p-6 space-y-6">
      <Card className="bg-gray-900 border-gray-800">
        <CardHeader>
          <CardTitle className="text-white">Diagnostic Système - Buckets & API</CardTitle>
          <CardDescription className="text-gray-400">
            Vérifiez la santé de votre backend Vercel et de vos buckets Supabase
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Global Health Check */}
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <h3 className="font-medium text-white">Santé Globale du Système</h3>
              <Button
                onClick={checkSystemHealth}
                disabled={loading}
                variant="outline"
              >
                {loading ? (
                  <Loader2 className="w-4 h-4 animate-spin mr-2" />
                ) : null}
                Vérifier
              </Button>
            </div>
            
            {systemHealth && (
              <div className="space-y-2 p-4 bg-gray-800 rounded-lg">
                <div className="flex items-center gap-2 mb-3">
                  {renderStatusIcon(systemHealth.ok)}
                  <span className="text-white">
                    Statut: {systemHealth.ok ? 'Opérationnel' : 'Problème détecté'}
                  </span>
                </div>
                
                {systemHealth.env && (
                  <div className="text-sm space-y-1 text-gray-400 mb-3">
                    <p>BUCKET_UPLOADS: <code className="text-purple-400">{systemHealth.env.BUCKET_UPLOADS}</code></p>
                    <p>BUCKET_IMAGES: <code className="text-purple-400">{systemHealth.env.BUCKET_IMAGES}</code></p>
                  </div>
                )}
                
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-gray-700">
                      <th className="text-left py-2 text-gray-400">Check</th>
                      <th className="text-left py-2 text-gray-400">Statut</th>
                      <th className="text-left py-2 text-gray-400">Attendu</th>
                    </tr>
                  </thead>
                  <tbody>
                    {systemHealth.checks?.map((check, idx) => (
                      <tr key={idx} className="border-b border-gray-800">
                        <td className="py-2 text-white">{check.name}</td>
                        <td className="py-2">{renderStatusIcon(check.ok)}</td>
                        <td className="py-2 text-gray-400">{check.expected || '-'}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>

          {/* Bucket Checks */}
          <div className="space-y-3">
            <h3 className="font-medium text-white">Vérification des Buckets</h3>
            
            <div className="space-y-2">
              <div className="p-4 bg-gray-800 rounded-lg">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-white font-medium">photos (uploads utilisateurs)</p>
                    <p className="text-sm text-gray-400">Bucket pour les photos uploadées par les utilisateurs</p>
                  </div>
                  <div className="flex items-center gap-2">
                    {renderBucketStatus('photos')}
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => checkBucket('photos')}
                      disabled={loading}
                    >
                      Vérifier
                    </Button>
                  </div>
                </div>
              </div>
              
              <div className="p-4 bg-gray-800 rounded-lg">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-white font-medium">generated_images (sorties IA)</p>
                    <p className="text-sm text-gray-400">Bucket pour les images générées par l'IA</p>
                  </div>
                  <div className="flex items-center gap-2">
                    {renderBucketStatus('generated_images')}
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => checkBucket('generated_images')}
                      disabled={loading}
                    >
                      Vérifier
                    </Button>
                  </div>
                </div>
              </div>
              
              <div className="p-4 bg-gray-800 rounded-lg">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-white font-medium">training_photos (modèles IA)</p>
                    <p className="text-sm text-gray-400">Bucket pour les photos d'entraînement des modèles</p>
                  </div>
                  <div className="flex items-center gap-2">
                    {renderBucketStatus('training_photos')}
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => checkBucket('training_photos')}
                      disabled={loading}
                    >
                      Vérifier
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Generation Test */}
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-medium text-white">Test de Génération (Mode Test)</h3>
                <p className="text-sm text-gray-400">Ne consomme aucun crédit Replicate</p>
              </div>
              <Button
                onClick={runGenerationTest}
                disabled={loading}
                className="bg-purple-600 hover:bg-purple-700"
              >
                {loading ? (
                  <Loader2 className="w-4 h-4 animate-spin mr-2" />
                ) : (
                  <PlayCircle className="w-4 h-4 mr-2" />
                )}
                Lancer Test
              </Button>
            </div>
            
            {testResult && (
              <div className={`p-4 rounded-lg ${testResult.ok ? 'bg-green-900/20 border border-green-800' : 'bg-red-900/20 border border-red-800'}`}>
                <div className="flex items-start gap-2 mb-3">
                  {renderStatusIcon(testResult.ok)}
                  <div className="flex-1">
                    <p className="text-white font-medium">
                      {testResult.ok ? '✅ Test réussi' : '❌ Test échoué'}
                    </p>
                    {testResult.test_mode && (
                      <p className="text-sm text-gray-400">Mode test activé (aucun crédit consommé)</p>
                    )}
                  </div>
                </div>
                
                {testResult.ok && (
                  <div className="space-y-2 text-sm">
                    <div className="grid grid-cols-2 gap-2">
                      <div className="text-gray-400">Job ID:</div>
                      <div className="text-white font-mono text-xs">{testResult.job_id}</div>
                      
                      <div className="text-gray-400">User ID:</div>
                      <div className="text-white font-mono text-xs">{testResult.user_id}</div>
                      
                      <div className="text-gray-400">Storage Path:</div>
                      <div className="text-white font-mono text-xs">{testResult.storage_path}</div>
                    </div>
                    
                    {testResult.image_url && (
                      <div className="mt-4">
                        <p className="text-gray-400 mb-2">Image URL (Notre domaine):</p>
                        <div className="p-2 bg-gray-800 rounded border border-gray-700">
                          <code className="text-xs text-green-400 break-all">
                            {testResult.image_url}
                          </code>
                        </div>
                        <div className="mt-3">
                          <img 
                            src={testResult.image_url} 
                            alt="Test generation" 
                            className="max-w-xs rounded-lg border border-gray-700"
                          />
                        </div>
                      </div>
                    )}
                  </div>
                )}
                
                {!testResult.ok && testResult.error && (
                  <div className="mt-2 text-sm text-red-400">
                    Erreur: {testResult.error}
                  </div>
                )}
              </div>
            )}
          </div>

          {/* Error Display */}
          {error && (
            <Alert variant="destructive">
              <AlertCircle className="h-4 w-4" />
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}

          {/* Quick Actions */}
          <div className="pt-4 border-t border-gray-800">
            <p className="text-sm text-gray-400 mb-3">Actions rapides:</p>
            <div className="flex flex-wrap gap-2">
              <Button
                size="sm"
                variant="outline"
                onClick={async () => {
                  await checkSystemHealth();
                }}
                disabled={loading}
              >
                Vérifier tout
              </Button>
              <Button
                size="sm"
                variant="outline"
                onClick={async () => {
                  await checkBucket('photos');
                  await checkBucket('generated_images');
                  await checkBucket('training_photos');
                }}
                disabled={loading}
              >
                Vérifier tous les buckets
              </Button>
              <Button
                size="sm"
                variant="outline"
                onClick={async () => {
                  await createBucket('photos', true);
                  await createBucket('generated_images', true);
                  await createBucket('training_photos', false);
                }}
                disabled={loading}
              >
                Créer tous les buckets
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
