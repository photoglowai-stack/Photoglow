import { useState, useEffect } from 'react';
import * as React from 'react';
import { Button } from './ui/button';
import { Card } from './ui/card';
import { Progress } from './ui/progress';
import { projectId, publicAnonKey } from '../utils/supabase/info';

interface GenerationItem {
  slug: string;
  category_id: string;
  style: string;
  prompt_title: string;
  prompt_text: string;
  aspect_ratio: string;
  width: number;
  height: number;
  prompt_index: number;
  collection: string;
}

interface CategoryConfig {
  id: string;
  name: string;
  promptTemplates: Array<{
    title: string;
    prompt: string;
    aspectRatio?: string;
  }>;
}

interface GenerationStatus {
  isGenerating: boolean;
  currentIndex: number;
  totalItems: number;
  succeeded: number;
  failed: number;
  lastImageUrl?: string;
  logs: string[];
  errors: Array<{ index: number; message: string }>;
}

const sleep = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

export function AdminGenerateCategoriesPageV2() {
  const [status, setStatus] = useState<GenerationStatus>({
    isGenerating: false,
    currentIndex: 0,
    totalItems: 0,
    succeeded: 0,
    failed: 0,
    logs: [],
    errors: []
  });

  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [testMode, setTestMode] = useState(true);
  const [categories, setCategories] = useState<CategoryConfig[]>([]);
  const [isLoadingCategories, setIsLoadingCategories] = useState(true);
  const [generationQueue, setGenerationQueue] = useState<GenerationItem[]>([]);
  
  // Debug console logs
  const [consoleLogs, setConsoleLogs] = useState<Array<{ timestamp: number; type: string; message: string }>>([]);
  const [showDebugModal, setShowDebugModal] = useState(false);
  const debugLogsEndRef = React.useRef<HTMLDivElement>(null);
  const logsEndRef = React.useRef<HTMLDivElement>(null);

  // Intercept console logs for debugging
  useEffect(() => {
    const originalLog = console.log;
    const originalError = console.error;
    const originalWarn = console.warn;

    console.log = (...args: any[]) => {
      originalLog(...args);
      const message = args.map(arg => 
        typeof arg === 'object' ? JSON.stringify(arg, null, 2) : String(arg)
      ).join(' ');
      setConsoleLogs(prev => [...prev, { timestamp: Date.now(), type: 'log', message }]);
    };

    console.error = (...args: any[]) => {
      originalError(...args);
      const message = args.map(arg => 
        typeof arg === 'object' ? JSON.stringify(arg, null, 2) : String(arg)
      ).join(' ');
      setConsoleLogs(prev => [...prev, { timestamp: Date.now(), type: 'error', message }]);
    };

    console.warn = (...args: any[]) => {
      originalWarn(...args);
      const message = args.map(arg => 
        typeof arg === 'object' ? JSON.stringify(arg, null, 2) : String(arg)
      ).join(' ');
      setConsoleLogs(prev => [...prev, { timestamp: Date.now(), type: 'warn', message }]);
    };

    return () => {
      console.log = originalLog;
      console.error = originalError;
      console.warn = originalWarn;
    };
  }, []);

  // Load categories dynamically
  useEffect(() => {
    const loadCategories = async () => {
      try {
        // Log credentials (masked)
        console.log('[AdminGen] 🔑 Project ID:', projectId);
        console.log('[AdminGen] 🔑 Anon Key:', publicAnonKey ? `${publicAnonKey.substring(0, 20)}...` : 'MISSING');
        
        const { getAllCategories } = await import('./getAllCategories');
        const cats = getAllCategories();
        setCategories(cats);
        
        // Test server connectivity
        console.log('[AdminGen] 🏥 Testing server health...');
        const healthUrl = `https://${projectId}.supabase.co/functions/v1/make-server-ab844084/health`;
        console.log('[AdminGen] 📍 Health URL:', healthUrl);
        
        try {
          const healthResponse = await fetch(healthUrl, {
            headers: {
              'Authorization': `Bearer ${publicAnonKey}`
            }
          });
          console.log('[AdminGen] 📥 Health response:', healthResponse.status, healthResponse.statusText);
          
          if (healthResponse.ok) {
            const healthData = await healthResponse.json();
            console.log('[AdminGen] ✅ Server is healthy:', healthData);
          } else {
            console.warn('[AdminGen] ⚠️  Server health check failed:', healthResponse.status, healthResponse.statusText);
            const errorText = await healthResponse.text();
            console.warn('[AdminGen] Error body:', errorText);
          }
        } catch (healthError: any) {
          console.error('[AdminGen] ❌ Server is not reachable:', healthError.message);
          console.error('[AdminGen] ⚠️  This usually means:');
          console.error('[AdminGen]   1. Server not deployed yet');
          console.error('[AdminGen]   2. Network issue');
          console.error('[AdminGen]   3. Incorrect projectId or publicAnonKey');
        }
        
      } catch (error) {
        console.error('Failed to load categories:', error);
        setCategories([]);
      } finally {
        setIsLoadingCategories(false);
      }
    };
    
    loadCategories();
  }, []);

  // Auto-scroll logs
  useEffect(() => {
    if (logsEndRef.current) {
      logsEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [status.logs]);

  // Auto-scroll debug logs
  useEffect(() => {
    if (debugLogsEndRef.current && showDebugModal) {
      debugLogsEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [consoleLogs, showDebugModal]);

  const toggleCategory = (catId: string) => {
    setSelectedCategories(prev => 
      prev.includes(catId) ? prev.filter(id => id !== catId) : [...prev, catId]
    );
  };

  // Generate idempotency key
  const generateIdempotencyKey = (item: GenerationItem): string => {
    return `${item.slug}-${item.category_id}-${item.style}-${item.prompt_index}-${item.width}x${item.height}`;
  };

  // Generate single image with retry
  const generateSingleImage = async (item: GenerationItem, attempt = 1): Promise<{ success: boolean; image_url?: string; error?: string }> => {
    const idempotencyKey = generateIdempotencyKey(item);
    
    console.log(`[AdminGen] 🎨 Generating: ${item.slug} (attempt ${attempt}/3)`);
    console.log(`[AdminGen] 📍 URL: https://${projectId}.supabase.co/functions/v1/make-server-ab844084/ideas/generate`);
    console.log(`[AdminGen] 🔑 Idempotency Key: ${idempotencyKey}`);
    
    try {
      const url = `https://${projectId}.supabase.co/functions/v1/make-server-ab844084/ideas/generate`;
      
      console.log(`[AdminGen] 📤 Sending request...`);
      
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${publicAnonKey}`,
          'idempotency-key': idempotencyKey
        },
        body: JSON.stringify({
          ...item,
          prompt: item.prompt_text,
          persist: true
        })
      }).catch((fetchError) => {
        console.error(`[AdminGen] 🌐 Network Error:`, fetchError);
        throw new Error(`Network error: ${fetchError.message}`);
      });

      console.log(`[AdminGen] 📥 Response received: ${response.status} ${response.statusText}`);

      let data;
      try {
        data = await response.json();
        console.log(`[AdminGen] 📊 Response data:`, data);
      } catch (jsonError) {
        console.error(`[AdminGen] ⚠️  Failed to parse JSON:`, jsonError);
        throw new Error(`Invalid JSON response: ${response.statusText}`);
      }
      
      if (response.ok && data.success) {
        console.log(`[AdminGen] ✅ Success: ${item.slug}${data.cached ? ' (cached)' : ''}`);
        return { success: true, image_url: data.image_url };
      }

      // Retry logic
      if (attempt < 3) {
        const delay = attempt === 1 ? 600 : 1200;
        console.warn(`[AdminGen] ⚠️  Retry ${attempt + 1}/3 in ${delay}ms...`);
        await sleep(delay);
        return generateSingleImage(item, attempt + 1);
      }

      throw new Error(data.error || `HTTP ${response.status}: ${response.statusText}`);
      
    } catch (error: any) {
      console.error(`[AdminGen] ❌ Error at attempt ${attempt}:`, error.message);
      
      // Retry on network errors
      if (attempt < 3 && (error.message.includes('Network') || error.message.includes('Failed to fetch'))) {
        const delay = attempt === 1 ? 600 : 1200;
        console.warn(`[AdminGen] 🔄 Network error, retrying in ${delay}ms...`);
        await sleep(delay);
        return generateSingleImage(item, attempt + 1);
      }
      
      return { success: false, error: error.message };
    }
  };

  // Build generation queue from selected categories
  const buildGenerationQueue = (): GenerationItem[] => {
    const queue: GenerationItem[] = [];
    const categoriesToProcess = selectedCategories.length > 0 ? selectedCategories : categories.map(c => c.id);

    console.log(`[AdminGen] 📋 Building queue for ${categoriesToProcess.length} categories`);

    for (const categoryId of categoriesToProcess) {
      const category = categories.find(c => c.id === categoryId);
      if (!category) continue;

      const prompts = testMode ? category.promptTemplates.slice(0, 5) : category.promptTemplates;
      
      prompts.forEach((template, index) => {
        // Determine dimensions from aspect ratio
        const { width, height } = convertAspectRatio(template.aspectRatio || '4:5');
        
        // Alternate between cinematic and realistic styles
        const style = index % 2 === 0 ? 'cinematic' : 'realistic';
        
        queue.push({
          slug: categoryId,
          category_id: categoryId,
          style,
          prompt_title: template.title,
          prompt_text: template.prompt,
          aspect_ratio: template.aspectRatio || '4:5',
          width,
          height,
          prompt_index: index,
          collection: 'front-catalog'
        });
      });
    }

    console.log(`[AdminGen] ✅ Queue built: ${queue.length} items`);
    return queue;
  };

  // Convert aspect ratio to dimensions
  const convertAspectRatio = (aspectRatio: string): { width: number; height: number } => {
    const ratios: Record<string, { width: number; height: number }> = {
      '1:1': { width: 1536, height: 1536 },
      '4:5': { width: 1536, height: 1920 },
      '3:4': { width: 1536, height: 2048 },
      '9:16': { width: 1536, height: 2736 },
      '16:9': { width: 1792, height: 1008 }
    };
    return ratios[aspectRatio] || ratios['1:1'];
  };

  // Start generation
  const handleStart = async () => {
    // Build queue
    const queue = buildGenerationQueue();
    if (queue.length === 0) {
      alert('No items to generate');
      return;
    }

    setGenerationQueue(queue);

    // Check for saved progress
    const savedIndex = parseInt(localStorage.getItem('ideas_queue_index') || '0');
    const startIndex = savedIndex < queue.length ? savedIndex : 0;

    console.log(`[AdminGen] 🚀 Starting generation from index ${startIndex}/${queue.length}`);

    setStatus({
      isGenerating: true,
      currentIndex: startIndex,
      totalItems: queue.length,
      succeeded: 0,
      failed: 0,
      logs: [`🚀 Starting generation from item ${startIndex + 1}/${queue.length}...`],
      errors: []
    });

    // Process queue sequentially
    for (let i = startIndex; i < queue.length; i++) {
      const item = queue[i];
      
      setStatus(prev => ({
        ...prev,
        currentIndex: i,
        logs: [...prev.logs, `\n📦 [${i + 1}/${queue.length}] ${item.category_id} - ${item.prompt_title} (${item.style})`]
      }));

      try {
        const result = await generateSingleImage(item);
        
        if (result.success) {
          setStatus(prev => ({
            ...prev,
            succeeded: prev.succeeded + 1,
            lastImageUrl: result.image_url,
            logs: [...prev.logs, `   ✅ Generated: ${result.image_url?.substring(0, 80)}...`]
          }));
        } else {
          setStatus(prev => ({
            ...prev,
            failed: prev.failed + 1,
            logs: [...prev.logs, `   ❌ Failed: ${result.error}`],
            errors: [...prev.errors, { index: i, message: result.error || 'Unknown error' }]
          }));
        }

        // Save progress to localStorage
        localStorage.setItem('ideas_queue_index', String(i + 1));

        // Throttle: 350-500ms between items
        if (i < queue.length - 1) {
          const throttle = 350 + Math.random() * 150; // 350-500ms
          await sleep(throttle);
        }

      } catch (error: any) {
        console.error(`[AdminGen] Exception at index ${i}:`, error);
        setStatus(prev => ({
          ...prev,
          failed: prev.failed + 1,
          logs: [...prev.logs, `   ❌ Exception: ${error.message}`],
          errors: [...prev.errors, { index: i, message: error.message }]
        }));
      }
    }

    // Finished
    setStatus(prev => ({
      ...prev,
      isGenerating: false,
      logs: [
        ...prev.logs,
        '\n🎉 GENERATION COMPLETE',
        `   Total: ${queue.length}`,
        `   Succeeded: ${prev.succeeded}`,
        `   Failed: ${prev.failed}`
      ]
    }));

    // Clear saved progress
    localStorage.removeItem('ideas_queue_index');
    console.log('[AdminGen] 🎉 All done!');
  };

  // Stop generation
  const handleStop = () => {
    console.log('[AdminGen] ⏹️ Stopping generation...');
    setStatus(prev => ({
      ...prev,
      isGenerating: false,
      logs: [...prev.logs, '\n⏹️  Generation stopped by user']
    }));
  };

  // Resume generation
  const handleResume = () => {
    console.log('[AdminGen] ▶️  Resuming generation...');
    handleStart();
  };

  // Clear saved progress
  const handleClearProgress = () => {
    localStorage.removeItem('ideas_queue_index');
    alert('Progress cleared! Next generation will start from the beginning.');
  };

  const progressPercentage = status.totalItems > 0 
    ? Math.round((status.succeeded + status.failed) / status.totalItems * 100)
    : 0;

  const savedIndex = parseInt(localStorage.getItem('ideas_queue_index') || '0');
  const hasProgress = savedIndex > 0;

  if (isLoadingCategories) {
    return (
      <div className="min-h-screen bg-black text-white p-8 flex items-center justify-center">
        <div className="text-center">
          <div className="inline-block w-8 h-8 border-4 border-pink-500 border-t-transparent rounded-full animate-spin mb-4" />
          <p className="text-gray-400">Loading categories...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black text-white p-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl mb-2">
            <span className="bg-gradient-to-r from-pink-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
              Sequential Image Generator V2
            </span>
          </h1>
          <p className="text-gray-400">
            Sequential generation with idempotency, throttling, and auto-retry
          </p>
          <p className="text-sm text-gray-500 mt-2">
            {categories.length} categories • 350-500ms throttle • 3 retries max
          </p>
        </div>

        {/* Controls */}
        <Card className="bg-zinc-900 border-zinc-800 p-6 mb-6">
          <div className="flex items-center gap-4 mb-6">
            <Button
              onClick={handleStart}
              disabled={status.isGenerating}
              className="bg-gradient-to-r from-pink-500 to-purple-500 hover:from-pink-600 hover:to-purple-600"
            >
              <span className="flex items-center gap-2">
                {status.isGenerating ? (
                  <>
                    <span className="inline-block w-3 h-3 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    Generating...
                  </>
                ) : (
                  <>
                    🚀 Start Generation
                  </>
                )}
              </span>
            </Button>

            {status.isGenerating && (
              <Button
                onClick={handleStop}
                variant="destructive"
              >
                ⏹️ Stop
              </Button>
            )}

            {!status.isGenerating && hasProgress && (
              <>
                <Button
                  onClick={handleResume}
                  className="bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-600 hover:to-cyan-600"
                >
                  ▶️  Resume from {savedIndex}
                </Button>
                <Button
                  onClick={handleClearProgress}
                  variant="outline"
                  size="sm"
                >
                  🗑️ Clear Progress
                </Button>
              </>
            )}

            {!status.isGenerating && (
              <Button
                onClick={async () => {
                  console.log('[AdminGen] 🧪 Testing /ideas/generate endpoint...');
                  try {
                    const testItem: GenerationItem = {
                      slug: 'test',
                      category_id: 'test',
                      style: 'test',
                      prompt_title: 'Test',
                      prompt_text: 'test prompt',
                      aspect_ratio: '1:1',
                      width: 512,
                      height: 512,
                      prompt_index: 0,
                      collection: 'test'
                    };
                    const result = await generateSingleImage(testItem);
                    if (result.success) {
                      alert(`✅ Endpoint works! Image: ${result.image_url}`);
                    } else {
                      alert(`❌ Endpoint failed: ${result.error}`);
                    }
                  } catch (error: any) {
                    alert(`❌ Test failed: ${error.message}`);
                  }
                }}
                variant="outline"
                size="sm"
                className="text-xs"
              >
                🧪 Test Endpoint
              </Button>
            )}

            <div className="flex items-center gap-2 ml-auto">
              <input
                type="checkbox"
                id="testMode"
                checked={testMode}
                onChange={(e) => setTestMode(e.target.checked)}
                disabled={status.isGenerating}
                className="w-4 h-4"
              />
              <label htmlFor="testMode" className="text-sm text-gray-300">
                Test Mode (5 images max per category)
              </label>
            </div>
          </div>

          {/* Category Selection */}
          {!status.isGenerating && (
            <div>
              <div className="flex items-center justify-between mb-3">
                <p className="text-sm text-gray-400">
                  Select categories ({selectedCategories.length} selected, {selectedCategories.length === 0 ? 'ALL will be generated' : ''})
                </p>
                <Button
                  onClick={() => setSelectedCategories(selectedCategories.length === categories.length ? [] : categories.map(c => c.id))}
                  variant="outline"
                  size="sm"
                  className="text-xs"
                >
                  {selectedCategories.length === categories.length ? 'Deselect All' : 'Select All'}
                </Button>
              </div>
              
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2">
                {categories.map(cat => (
                  <button
                    key={cat.id}
                    onClick={() => toggleCategory(cat.id)}
                    className={`
                      p-2 rounded-lg border text-xs transition-all
                      ${selectedCategories.includes(cat.id)
                        ? 'bg-pink-500/20 border-pink-500 text-pink-300'
                        : 'bg-zinc-800 border-zinc-700 text-gray-400 hover:border-gray-500'
                      }
                    `}
                  >
                    {cat.name} ({cat.promptTemplates.length})
                  </button>
                ))}
              </div>
            </div>
          )}
        </Card>

        {/* Progress */}
        {status.isGenerating && (
          <Card className="bg-zinc-900 border-zinc-800 p-6 mb-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-xl text-pink-400">📊 Progress</h3>
              <div className="flex items-center gap-2 text-xs">
                <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
                <span className="text-gray-400">Sequential mode</span>
              </div>
            </div>
            
            <Progress value={progressPercentage} className="mb-4" />
            
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
              <div>
                <p className="text-gray-400">Progress</p>
                <p className="text-2xl">{progressPercentage}%</p>
              </div>
              <div>
                <p className="text-gray-400">Current</p>
                <p className="text-2xl text-blue-400">{status.currentIndex + 1}</p>
                <p className="text-xs text-gray-500">/ {status.totalItems}</p>
              </div>
              <div>
                <p className="text-gray-400">Succeeded</p>
                <p className="text-2xl text-green-400">{status.succeeded}</p>
              </div>
              <div>
                <p className="text-gray-400">Failed</p>
                <p className="text-2xl text-red-400">{status.failed}</p>
              </div>
            </div>

            {status.lastImageUrl && (
              <div className="mt-4 p-3 bg-zinc-800 rounded-lg">
                <p className="text-xs text-gray-400 mb-2">Last Generated Image</p>
                <img 
                  src={status.lastImageUrl} 
                  alt="Last generated" 
                  className="w-full h-48 object-cover rounded"
                />
                <p className="text-xs text-gray-500 mt-2 truncate">{status.lastImageUrl}</p>
              </div>
            )}
          </Card>
        )}

        {/* Logs */}
        <Card className="bg-zinc-900 border-zinc-800 p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-xl text-pink-400">📝 Logs</h3>
            {status.logs.length > 0 && (
              <span className="text-xs text-gray-500">
                {status.logs.length} entries
              </span>
            )}
          </div>
          <div className="bg-black rounded-lg p-4 h-96 overflow-y-auto font-mono text-xs">
            {status.logs.length === 0 ? (
              <p className="text-gray-500">No logs yet. Click "Start Generation" to begin.</p>
            ) : (
              <>
                {status.logs.map((log, i) => (
                  <div key={i} className={`
                    mb-1
                    ${log.includes('✅') ? 'text-green-400' : ''}
                    ${log.includes('❌') ? 'text-red-400' : ''}
                    ${log.includes('⚠️') ? 'text-yellow-400' : ''}
                    ${log.includes('🎨') ? 'text-blue-400' : ''}
                    ${log.includes('📦') ? 'text-purple-400' : ''}
                    ${log.includes('🎉') ? 'text-pink-400' : ''}
                    ${!log.match(/[✅❌⚠️🎨📦🎉]/) ? 'text-gray-400' : ''}
                  `}>
                    {log}
                  </div>
                ))}
                <div ref={logsEndRef} />
              </>
            )}
          </div>
        </Card>

        {/* Errors Summary */}
        {status.errors.length > 0 && (
          <Card className="bg-zinc-900 border-red-800 p-6 mt-6">
            <h3 className="text-lg mb-3 text-red-400">❌ Errors ({status.errors.length})</h3>
            <div className="space-y-2 max-h-48 overflow-y-auto">
              {status.errors.map((err, i) => (
                <div key={i} className="text-xs text-red-300 bg-red-900/20 p-2 rounded">
                  <span className="text-red-500">#{err.index}</span> {err.message}
                </div>
              ))}
            </div>
          </Card>
        )}

        {/* Floating Debug Button */}
        <button
          onClick={() => setShowDebugModal(true)}
          className="fixed bottom-6 right-6 z-50 bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 text-white p-4 rounded-full shadow-2xl transition-all hover:scale-110 flex items-center gap-2"
          title="Open Debug Console"
        >
          <span className="text-2xl">🔍</span>
          {consoleLogs.length > 0 && (
            <span className="absolute -top-2 -right-2 bg-red-600 text-white text-xs rounded-full w-6 h-6 flex items-center justify-center animate-pulse">
              {consoleLogs.length}
            </span>
          )}
        </button>

        {/* Debug Modal */}
        {showDebugModal && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/80 backdrop-blur-sm p-4">
            <div className="bg-zinc-900 border-2 border-orange-500 rounded-xl w-full max-w-5xl h-[80vh] flex flex-col shadow-2xl">
              {/* Header */}
              <div className="flex items-center justify-between p-4 border-b border-zinc-800 bg-gradient-to-r from-orange-500/10 to-red-500/10">
                <div className="flex items-center gap-3">
                  <span className="text-2xl">🔍</span>
                  <div>
                    <h2 className="text-xl text-white">Debug Console</h2>
                    <p className="text-xs text-gray-400">Real-time console logs • {consoleLogs.length} entries</p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Button
                    onClick={() => setConsoleLogs([])}
                    variant="outline"
                    size="sm"
                    className="text-xs"
                  >
                    🗑️ Clear
                  </Button>
                  <Button
                    onClick={() => {
                      const logsText = consoleLogs.map(log => 
                        `[${new Date(log.timestamp).toLocaleTimeString()}] [${log.type.toUpperCase()}] ${log.message}`
                      ).join('\n');
                      navigator.clipboard.writeText(logsText);
                      alert('Logs copied to clipboard!');
                    }}
                    variant="outline"
                    size="sm"
                    className="text-xs"
                  >
                    📋 Copy All
                  </Button>
                  <button
                    onClick={() => setShowDebugModal(false)}
                    className="text-gray-400 hover:text-white text-2xl leading-none"
                  >
                    ×
                  </button>
                </div>
              </div>

              {/* Logs Container */}
              <div className="flex-1 overflow-y-auto bg-black p-4 font-mono text-xs">
                {consoleLogs.length === 0 ? (
                  <div className="text-center text-gray-500 py-8">
                    <p className="text-4xl mb-2">📭</p>
                    <p>No logs yet. Start generation to see debug info.</p>
                  </div>
                ) : (
                  <>
                    {consoleLogs.map((log, i) => (
                      <div
                        key={i}
                        className={`mb-2 p-2 rounded border-l-4 ${
                          log.type === 'error'
                            ? 'bg-red-900/20 border-red-500 text-red-300'
                            : log.type === 'warn'
                            ? 'bg-yellow-900/20 border-yellow-500 text-yellow-300'
                            : 'bg-blue-900/20 border-blue-500 text-blue-300'
                        }`}
                      >
                        <div className="flex items-start gap-2">
                          <span className="text-gray-500 text-[10px] shrink-0">
                            {new Date(log.timestamp).toLocaleTimeString()}.{String(log.timestamp % 1000).padStart(3, '0')}
                          </span>
                          <span className={`text-[10px] uppercase shrink-0 ${
                            log.type === 'error' ? 'text-red-400' :
                            log.type === 'warn' ? 'text-yellow-400' :
                            'text-blue-400'
                          }`}>
                            [{log.type}]
                          </span>
                          <pre className="flex-1 whitespace-pre-wrap break-words">{log.message}</pre>
                        </div>
                      </div>
                    ))}
                    <div ref={debugLogsEndRef} />
                  </>
                )}
              </div>

              {/* Footer Stats */}
              <div className="p-3 border-t border-zinc-800 bg-zinc-900/50 flex items-center justify-between text-xs text-gray-400">
                <div className="flex gap-4">
                  <span>Total: {consoleLogs.length}</span>
                  <span className="text-red-400">Errors: {consoleLogs.filter(l => l.type === 'error').length}</span>
                  <span className="text-yellow-400">Warnings: {consoleLogs.filter(l => l.type === 'warn').length}</span>
                  <span className="text-blue-400">Logs: {consoleLogs.filter(l => l.type === 'log').length}</span>
                </div>
                <span className="text-gray-500">Auto-scroll enabled</span>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
