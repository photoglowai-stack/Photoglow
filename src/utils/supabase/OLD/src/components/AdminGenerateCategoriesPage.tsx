import { useState, useEffect } from 'react';
import * as React from 'react';
import { Button } from './ui/button';
import { Card } from './ui/card';
import { Progress } from './ui/progress';
import { projectId, publicAnonKey } from '../utils/supabase/info';

interface GenerationStatus {
  isGenerating: boolean;
  currentCategory?: string;
  currentCategoryName?: string;
  totalCategories: number;
  completedCategories: number;
  currentBatch: number;
  totalBatches: number;
  succeeded: number;
  failed: number;
  totalImages: number;
  startTime?: number;
  logs: string[];
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

export function AdminGenerateCategoriesPage() {
  const [status, setStatus] = useState<GenerationStatus>({
    isGenerating: false,
    totalCategories: 0,
    completedCategories: 0,
    currentBatch: 0,
    totalBatches: 0,
    succeeded: 0,
    failed: 0,
    totalImages: 0,
    logs: []
  });

  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [testMode, setTestMode] = useState(true);
  const [categories, setCategories] = useState<CategoryConfig[]>([]);
  const [isLoadingCategories, setIsLoadingCategories] = useState(true);
  
  // Debug console logs
  const [consoleLogs, setConsoleLogs] = useState<Array<{ timestamp: number; type: string; message: string }>>([]);
  const [showDebugModal, setShowDebugModal] = useState(false);
  const debugLogsEndRef = React.useRef<HTMLDivElement>(null);
  
  // Ref for auto-scrolling logs
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
        const { getAllCategories } = await import('./getAllCategories');
        const cats = getAllCategories();
        setCategories(cats);
      } catch (error) {
        console.error('Failed to load categories:', error);
        // Fallback to hardcoded categories if import fails
        setCategories([
          {
            id: 'ai-headshots',
            name: 'AI Headshots',
            promptTemplates: Array(5).fill({ title: 'Example', prompt: 'Example prompt', aspectRatio: '4:5' })
          },
          {
            id: 'ai-dating-photos',
            name: 'AI Dating Photos',
            promptTemplates: Array(5).fill({ title: 'Example', prompt: 'Example prompt', aspectRatio: '4:5' })
          }
        ]);
      } finally {
        setIsLoadingCategories(false);
      }
    };
    
    loadCategories();
  }, []);

  // Auto-scroll logs to bottom when new logs arrive
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

  // Poll status when generating
  useEffect(() => {
    if (!status.isGenerating) {
      console.log('[AdminGen] Polling stopped - not generating');
      return;
    }

    console.log('[AdminGen] Starting polling...');

    // Poll immediately on start
    const pollStatus = async () => {
      try {
        console.log('[AdminGen] Fetching status...');
        const response = await fetch(
          `https://${projectId}.supabase.co/functions/v1/make-server-ab844084/categories/status`,
          {
            headers: {
              'Authorization': `Bearer ${publicAnonKey}`
            }
          }
        );

        if (response.ok) {
          const data = await response.json();
          console.log('[AdminGen] Status received:', {
            isGenerating: data.isGenerating,
            succeeded: data.succeeded,
            failed: data.failed,
            newLogsCount: data.newLogs?.length || 0,
            currentCategory: data.currentCategoryName
          });

          setStatus(prev => ({
            ...prev,
            ...data,
            logs: [...prev.logs, ...(data.newLogs || [])]
          }));

          // Si terminé, arrêter le polling
          if (!data.isGenerating) {
            console.log('[AdminGen] Generation complete!');
            setStatus(prev => ({ ...prev, isGenerating: false }));
          }
        } else {
          console.error('[AdminGen] Status fetch failed:', response.status);
        }
      } catch (error) {
        console.error('[AdminGen] Failed to fetch status:', error);
      }
    };

    // Poll immediately
    pollStatus();

    // Then poll every 2s
    const interval = setInterval(pollStatus, 2000);

    return () => {
      console.log('[AdminGen] Cleaning up polling interval');
      clearInterval(interval);
    };
  }, [status.isGenerating]);

  const handleStart = async () => {
    const categoriesToGenerate = selectedCategories.length > 0
      ? selectedCategories
      : categories.map(c => c.id);

    const totalImages = categoriesToGenerate.reduce((sum, catId) => {
      const cat = categories.find(c => c.id === catId);
      const count = cat?.promptTemplates.length || 0;
      return sum + (testMode ? Math.min(count, 5) : count);
    }, 0);

    const confirmed = confirm(
      `🚀 Start Generation?\n\n` +
      `Categories: ${categoriesToGenerate.length}\n` +
      `Total images: ${totalImages}\n` +
      `Mode: ${testMode ? 'TEST (5 images max per category)' : 'FULL PRODUCTION'}\n` +
      `Estimated time: ~${Math.ceil(totalImages * 3 / 60)} minutes\n\n` +
      `This will consume API credits. Continue?`
    );

    if (!confirmed) return;

    console.log('[AdminGen] Starting generation...', {
      categories: categoriesToGenerate,
      totalImages,
      testMode
    });

    setStatus({
      isGenerating: true,
      totalCategories: categoriesToGenerate.length,
      completedCategories: 0,
      currentBatch: 0,
      totalBatches: 0,
      succeeded: 0,
      failed: 0,
      totalImages,
      startTime: Date.now(),
      logs: ['🚀 Starting generation...', `📂 ${categoriesToGenerate.length} categories selected`, `🎯 ${totalImages} images to generate`]
    });

    try {
      console.log('[AdminGen] Calling /categories/generate endpoint...');
      const response = await fetch(
        `https://${projectId}.supabase.co/functions/v1/make-server-ab844084/categories/generate`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${publicAnonKey}`
          },
          body: JSON.stringify({
            categories: categoriesToGenerate,
            testMode
          })
        }
      );

      if (!response.ok) {
        const error = await response.text();
        console.error('[AdminGen] Generation start failed:', error);
        throw new Error(`HTTP ${response.status}: ${error}`);
      }

      const result = await response.json();
      console.log('[AdminGen] Generation started successfully:', result);
      
      setStatus(prev => ({
        ...prev,
        logs: [...prev.logs, '✅ Server generation started', `⏰ Polling for updates every 2s...`]
      }));

    } catch (error: any) {
      console.error('Failed to start generation:', error);
      alert(`❌ Failed to start: ${error.message}`);
      setStatus(prev => ({
        ...prev,
        isGenerating: false,
        logs: [...prev.logs, `❌ Error: ${error.message}`]
      }));
    }
  };

  const handleStop = async () => {
    if (!confirm('⚠️ Stop generation? Progress will be lost.')) return;

    try {
      await fetch(
        `https://${projectId}.supabase.co/functions/v1/make-server-ab844084/categories/stop`,
        {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${publicAnonKey}`
          }
        }
      );

      setStatus(prev => ({
        ...prev,
        isGenerating: false,
        logs: [...prev.logs, '⚠️ Stopped by user']
      }));
    } catch (error: any) {
      console.error('Failed to stop:', error);
    }
  };

  const toggleCategory = (categoryId: string) => {
    setSelectedCategories(prev =>
      prev.includes(categoryId)
        ? prev.filter(id => id !== categoryId)
        : [...prev, categoryId]
    );
  };

  const progressPercentage = status.totalImages > 0
    ? Math.round(((status.succeeded + status.failed) / status.totalImages) * 100)
    : 0;

  const elapsedTime = status.startTime
    ? Math.floor((Date.now() - status.startTime) / 1000)
    : 0;

  const estimatedTotalTime = status.succeeded > 0 && elapsedTime > 0
    ? Math.ceil((elapsedTime / status.succeeded) * status.totalImages)
    : 0;

  const remainingTime = estimatedTotalTime > elapsedTime
    ? estimatedTotalTime - elapsedTime
    : 0;

  // Calculate total images to generate
  const categoriesToGenerate = selectedCategories.length > 0 
    ? selectedCategories 
    : categories.map(c => c.id);
  
  const totalImagesToGenerate = categoriesToGenerate.reduce((sum, catId) => {
    const cat = categories.find(c => c.id === catId);
    const count = cat?.promptTemplates.length || 0;
    return sum + (testMode ? Math.min(count, 5) : count);
  }, 0);

  if (isLoadingCategories) {
    return (
      <div className="min-h-screen bg-black text-white p-8 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-pink-500 mx-auto mb-4"></div>
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
              Category Images Generator
            </span>
          </h1>
          <p className="text-gray-400">
            Generate all category example images using Pollinations AI
          </p>
          <p className="text-sm text-gray-500 mt-2">
            {categories.length} categories loaded
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
                    <span className="text-xs opacity-75 ml-1">
                      ({totalImagesToGenerate} images)
                    </span>
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

          {/* Quality Brief */}
          <div className="mb-6 p-4 bg-zinc-800/50 border border-purple-500/30 rounded-lg">
            <div className="flex items-center justify-between mb-3">
              <h3 className="text-sm font-semibold text-purple-400">📋 Quality Brief (Copy to Figma Admin)</h3>
              <Button
                onClick={() => {
                  const brief = document.getElementById('quality-brief-text')?.innerText || '';
                  navigator.clipboard.writeText(brief);
                  alert('Brief copied to clipboard!');
                }}
                variant="outline"
                size="sm"
                className="text-xs"
              >
                📋 Copy Brief
              </Button>
            </div>
            <div id="quality-brief-text" className="text-xs text-gray-300 space-y-3 font-mono">
              <div>
                <p className="text-purple-300 font-semibold mb-1">🎯 OBJECTIF GLOBAL:</p>
                <p className="pl-3">Haute résolution • Lumière studio propre • Rendu net • Couleurs fidèles • Peau naturelle</p>
              </div>
              
              <div>
                <p className="text-purple-300 font-semibold mb-1">📐 FRAMING & RATIO PAR CATÉGORIE:</p>
                <div className="pl-3 space-y-1">
                  <p>• <span className="text-pink-400">Avatar</span> → close-up, 1:1, 1536×1536</p>
                  <p>• <span className="text-pink-400">Portrait</span> → 3/4, 3:4, 1536×2048</p>
                  <p>• <span className="text-pink-400">Story</span> → full-body/3/4, 9:16, 1536×2736</p>
                  <p>• <span className="text-pink-400">Thumbnail</span> → waist-up/close-up, 16:9, 1792×1008</p>
                </div>
              </div>

              <div>
                <p className="text-purple-300 font-semibold mb-1">📷 OPTIQUES (Feel):</p>
                <p className="pl-3">50mm / 85mm portraits • 35mm urbain • 200mm sport</p>
              </div>

              <div>
                <p className="text-purple-300 font-semibold mb-1">💡 ÉCLAIRAGE:</p>
                <p className="pl-3">Soft window light • Golden hour rim • Clamshell • <span className="text-red-400">❌ Éviter flashs durs</span></p>
              </div>

              <div>
                <p className="text-purple-300 font-semibold mb-1">✍️ STYLE PROMPT:</p>
                <div className="pl-3 space-y-1">
                  <p>• Descriptif long et détaillé</p>
                  <p>• <span className="text-red-400">PAS de negative prompts</span></p>
                  <p>• Insister: peau naturelle, grain discret, micro-contraste propre</p>
                </div>
              </div>

              <div>
                <p className="text-purple-300 font-semibold mb-1">🎨 CATÉGORIES STANDARDS:</p>
                <div className="pl-3 space-y-1 text-gray-400">
                  <p>ai-headshots • ai-avatars • dating-photos • linkedin-headshots</p>
                  <p>business-professional • casual-lifestyle • outdoor-adventure</p>
                  <p>fashion-style • fitness-athletic • creative-artistic</p>
                  <p>beach-summer • urban-street • formal-event • cozy-indoor</p>
                </div>
              </div>
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
                <span className="text-gray-400">Live updates</span>
              </div>
            </div>
            
            <Progress value={progressPercentage} className="mb-4" />
            
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
              <div>
                <p className="text-gray-400">Overall</p>
                <p className="text-2xl">{progressPercentage}%</p>
              </div>
              <div>
                <p className="text-gray-400">Images</p>
                <p className="text-2xl text-green-400">{status.succeeded}</p>
                <p className="text-xs text-gray-500">/ {status.totalImages}</p>
              </div>
              <div>
                <p className="text-gray-400">Categories</p>
                <p className="text-2xl text-blue-400">{status.completedCategories}</p>
                <p className="text-xs text-gray-500">/ {status.totalCategories}</p>
              </div>
              <div>
                <p className="text-gray-400">Failed</p>
                <p className="text-2xl text-red-400">{status.failed}</p>
              </div>
            </div>

            {status.currentCategoryName && (
              <div className="mt-4 p-3 bg-zinc-800 rounded-lg">
                <p className="text-xs text-gray-400 mb-1">Current Category</p>
                <p className="text-lg text-pink-300">{status.currentCategoryName}</p>
                <p className="text-xs text-gray-500">
                  Batch {status.currentBatch} / {status.totalBatches}
                </p>
              </div>
            )}

            {/* Time Stats */}
            <div className="mt-4 grid grid-cols-3 gap-4 text-xs text-gray-400">
              <div>
                <p className="text-gray-500">Elapsed</p>
                <p className="text-white">
                  {Math.floor(elapsedTime / 60)}m {elapsedTime % 60}s
                </p>
              </div>
              <div>
                <p className="text-gray-500">Estimated Total</p>
                <p className="text-white">
                  {Math.floor(estimatedTotalTime / 60)}m {estimatedTotalTime % 60}s
                </p>
              </div>
              <div>
                <p className="text-gray-500">Remaining</p>
                <p className="text-white">
                  {Math.floor(remainingTime / 60)}m {remainingTime % 60}s
                </p>
              </div>
            </div>
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
                    ${log.includes('📂') ? 'text-cyan-400' : ''}
                    ${log.includes('🎯') ? 'text-orange-400' : ''}
                    ${!log.match(/[✅❌⚠️🎨📦📂🎯⏰]/) ? 'text-gray-400' : ''}
                  `}>
                    {log}
                  </div>
                ))}
                <div ref={logsEndRef} />
              </>
            )}
          </div>
        </Card>

        {/* Info Box */}
        <Card className="bg-zinc-900 border-zinc-800 p-6 mt-6">
          <h3 className="text-lg mb-3 text-pink-400">ℹ️ Information</h3>
          <ul className="text-sm text-gray-400 space-y-2">
            <li>✅ Uses existing <code className="text-pink-300">ai_gallery</code> bucket</li>
            <li>✅ Stores metadata in <code className="text-pink-300">ideas_examples</code> table</li>
            <li>✅ Images stored at: <code className="text-pink-300">categories/&#123;categoryId&#125;/00.jpg</code></li>
            <li>⚡ Generation via Pollinations (FLUX model)</li>
            <li>🔄 Progress tracked in real-time</li>
            <li>💾 All URLs saved to database automatically</li>
          </ul>
        </Card>

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
