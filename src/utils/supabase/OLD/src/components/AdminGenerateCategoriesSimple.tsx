/**
 * 🎨 ADMIN - GENERATE CATEGORIES IMAGES (SIMPLE VERSION)
 * 
 * Simple sequential generation using existing endpoint POST /api/v1/ideas/generate
 * - Stocke dans ai_gallery/categories/{category-name}/
 * - 1 image à la fois avec idempotency-key
 * - Progress tracking avec localStorage
 * - Reprend à l'index en cas d'arrêt
 */

import { useState, useEffect } from 'react';
import { Button } from './ui/button';
import { Card } from './ui/card';
import { Progress } from './ui/progress';
import { Checkbox } from './ui/checkbox';
import { projectId, publicAnonKey } from '../utils/supabase/info';

interface PromptTemplate {
  title: string;
  prompt: string;
  aspectRatio?: string;
}

interface CategoryData {
  id: string;
  name: string;
  promptTemplates: PromptTemplate[];
}

interface GenerationProgress {
  categoryId: string;
  promptIndex: number;
  totalPrompts: number;
  imageUrl?: string;
}

const STORAGE_KEY = 'admin_generation_progress';

export function AdminGenerateCategoriesSimple() {
  const [categories, setCategories] = useState<CategoryData[]>([]);
  const [selectedCategories, setSelectedCategories] = useState<Set<string>>(new Set());
  const [isGenerating, setIsGenerating] = useState(false);
  const [progress, setProgress] = useState<GenerationProgress | null>(null);
  const [totalGenerated, setTotalGenerated] = useState(0);
  const [totalToGenerate, setTotalToGenerate] = useState(0);
  const [logs, setLogs] = useState<string[]>([]);
  const [testMode, setTestMode] = useState(true);

  // Load categories from API
  useEffect(() => {
    const loadCategories = async () => {
      try {
        addLog('📡 Fetching categories from API...');
        const response = await fetch('/api/admin/categories');
        
        if (!response.ok) {
          throw new Error(`HTTP ${response.status}: ${response.statusText}`);
        }
        
        const data = await response.json();
        
        if (!data.success) {
          throw new Error(data.error || 'Failed to load categories');
        }
        
        setCategories(data.categories || []);
        addLog(`✅ Loaded ${data.categories?.length || 0} categories (${data.meta?.totalPrompts || 0} total prompts)`);
      } catch (error: any) {
        addLog(`❌ Failed to load categories: ${error.message}`);
        console.error('Failed to load categories:', error);
      }
    };
    loadCategories();
  }, []);

  // Load saved progress
  useEffect(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) {
      try {
        const data = JSON.parse(saved);
        setProgress(data);
        addLog(`📂 Loaded saved progress: ${data.categoryId} - prompt ${data.promptIndex}/${data.totalPrompts}`);
      } catch (e) {
        addLog('⚠️ Failed to load saved progress');
      }
    }
  }, []);

  const addLog = (message: string) => {
    const timestamp = new Date().toLocaleTimeString();
    setLogs(prev => [...prev, `[${timestamp}] ${message}`]);
  };

  const toggleCategory = (catId: string) => {
    setSelectedCategories(prev => {
      const newSet = new Set(prev);
      if (newSet.has(catId)) {
        newSet.delete(catId);
      } else {
        newSet.add(catId);
      }
      return newSet;
    });
  };

  const selectAllCategories = () => {
    setSelectedCategories(new Set(categories.map(c => c.id)));
  };

  const clearSelection = () => {
    setSelectedCategories(new Set());
  };

  /**
   * Generate idempotency key
   */
  const generateIdempotencyKey = (categoryId: string, promptIndex: number, timestamp: number): string => {
    return `admin-gen-${categoryId}-${promptIndex}-${timestamp}`;
  };

  /**
   * Call Vercel endpoint: POST /api/v1/ideas/generate
   */
  const callGenerateEndpoint = async (
    categoryId: string,
    promptTitle: string,
    promptText: string,
    aspectRatio: string,
    idempotencyKey: string,
    promptIndex: number
  ): Promise<{ success: boolean; imageUrl?: string; error?: string }> => {
    try {
      // Use Vercel endpoint (production-ready with idempotency, retries, HQ defaults)
      const url = `/api/v1/ideas/generate`;
      
      // Generate unique slug
      const slug = `${categoryId}-${promptIndex}`;
      
      // Payload matching your Vercel endpoint format
      const payload = {
        slug: slug,
        prompt: promptText,
        width: aspectRatio === '1:1' ? 1024 : aspectRatio === '9:16' ? 768 : 1024,
        height: aspectRatio === '1:1' ? 1024 : aspectRatio === '9:16' ? 1366 : 1280,
        model: 'flux',
        persist: true, // outputs/ folder (not previews/)
        collection: 'admin-generated',
        // Category-specific fields
        category_id: categoryId,
        prompt_index: promptIndex,
        prompt_title: promptTitle,
        prompt_text: promptText,
        aspect_ratio: aspectRatio,
        style: 'default'
      };

      addLog(`📤 POST ${url}`);
      addLog(`📦 Payload: ${JSON.stringify(payload)}`);
      addLog(`🔑 Idempotency Key: ${idempotencyKey}`);
      
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${publicAnonKey}`,
          'idempotency-key': idempotencyKey
        },
        body: JSON.stringify(payload)
      });

      addLog(`📥 Response: ${response.status} ${response.statusText}`);

      if (!response.ok) {
        const errorText = await response.text();
        addLog(`❌ Error response: ${errorText}`);
        return { success: false, error: errorText };
      }

      const data = await response.json();
      addLog(`✅ Generated: ${data.image_url || data.url || 'unknown'}`);
      
      return {
        success: true,
        imageUrl: data.image_url || data.url || data.publicUrl
      };
    } catch (error: any) {
      addLog(`❌ Exception: ${error.message}`);
      return { success: false, error: error.message };
    }
  };

  /**
   * Start generation
   */
  const startGeneration = async () => {
    if (selectedCategories.size === 0) {
      addLog('⚠️ No categories selected');
      return;
    }

    setIsGenerating(true);
    addLog(`🚀 Starting generation for ${selectedCategories.size} categories`);
    addLog(`⚙️ Test mode: ${testMode ? 'ON (max 5 images per category)' : 'OFF'}`);

    let totalGenCount = 0;
    let totalToGenCount = 0;

    // Calculate total
    for (const catId of selectedCategories) {
      const cat = categories.find(c => c.id === catId);
      if (cat) {
        const maxPrompts = testMode ? Math.min(5, cat.promptTemplates.length) : cat.promptTemplates.length;
        totalToGenCount += maxPrompts;
      }
    }
    setTotalToGenerate(totalToGenCount);

    const timestamp = Date.now();

    // Loop through selected categories
    for (const catId of selectedCategories) {
      const cat = categories.find(c => c.id === catId);
      if (!cat) continue;

      const maxPrompts = testMode ? Math.min(5, cat.promptTemplates.length) : cat.promptTemplates.length;
      
      addLog(`📁 Category: ${cat.name} (${maxPrompts} prompts)`);

      // Loop through prompts
      for (let i = 0; i < maxPrompts; i++) {
        const prompt = cat.promptTemplates[i];
        
        // Update progress
        setProgress({
          categoryId: cat.id,
          promptIndex: i,
          totalPrompts: maxPrompts
        });

        // Save progress to localStorage
        localStorage.setItem(STORAGE_KEY, JSON.stringify({
          categoryId: cat.id,
          promptIndex: i,
          totalPrompts: maxPrompts
        }));

        const idempotencyKey = generateIdempotencyKey(cat.id, i, timestamp);
        const aspectRatio = prompt.aspectRatio || '4:5';

        addLog(`🎨 [${totalGenCount + 1}/${totalToGenCount}] ${cat.name} - ${prompt.title}`);

        // Call endpoint with retry (max 3 attempts)
        let success = false;
        let lastError = '';
        
        for (let attempt = 1; attempt <= 3; attempt++) {
          if (attempt > 1) {
            addLog(`🔄 Retry attempt ${attempt}/3`);
            await new Promise(resolve => setTimeout(resolve, 2000)); // 2s between retries
          }

          const result = await callGenerateEndpoint(
            cat.id,
            prompt.title,
            prompt.prompt,
            aspectRatio,
            idempotencyKey,
            i // Pass prompt index
          );

          if (result.success) {
            success = true;
            setProgress(prev => prev ? { ...prev, imageUrl: result.imageUrl } : null);
            break;
          } else {
            lastError = result.error || 'Unknown error';
          }
        }

        if (success) {
          totalGenCount++;
          setTotalGenerated(totalGenCount);
          addLog(`✅ Success (${totalGenCount}/${totalToGenCount})`);
        } else {
          addLog(`❌ Failed after 3 attempts: ${lastError}`);
        }

        // Throttle: 400ms between requests
        await new Promise(resolve => setTimeout(resolve, 400));
      }

      // 1s between categories
      addLog(`⏸️  Category complete, waiting 1s before next...`);
      await new Promise(resolve => setTimeout(resolve, 1000));
    }

    // Complete
    setIsGenerating(false);
    setProgress(null);
    localStorage.removeItem(STORAGE_KEY);
    addLog(`🎉 Generation complete! ${totalGenCount}/${totalToGenCount} images generated`);
  };

  const stopGeneration = () => {
    setIsGenerating(false);
    addLog('⏹️ Generation stopped by user');
  };

  const clearLogs = () => {
    setLogs([]);
  };

  const progressPercent = totalToGenerate > 0 ? (totalGenerated / totalToGenerate) * 100 : 0;

  return (
    <div className="min-h-screen bg-[#0f0f0f] text-white p-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl mb-2">🎨 Admin - Generate Categories</h1>
          <p className="text-gray-400">Simple sequential generation using existing endpoint</p>
        </div>

        {/* Controls */}
        <Card className="bg-[#1a1a1a] border-[#2a2a2a] p-6 mb-6">
          <div className="space-y-4">
            {/* Test Mode */}
            <div className="flex items-center gap-3">
              <Checkbox
                checked={testMode}
                onCheckedChange={(checked) => setTestMode(checked === true)}
                disabled={isGenerating}
              />
              <label className="text-sm">
                <span className="text-white">Test Mode</span>
                <span className="text-gray-400 ml-2">(Max 5 images per category)</span>
              </label>
            </div>

            {/* Buttons */}
            <div className="flex gap-3">
              <Button
                onClick={startGeneration}
                disabled={isGenerating || selectedCategories.size === 0}
                className="bg-gradient-to-r from-pink-500 to-purple-600"
              >
                {isGenerating ? '⏸️ Generating...' : '🚀 Start Generation'}
              </Button>
              
              {isGenerating && (
                <Button
                  onClick={stopGeneration}
                  variant="destructive"
                >
                  ⏹️ Stop
                </Button>
              )}

              <Button
                onClick={selectAllCategories}
                variant="outline"
                disabled={isGenerating}
                className="border-[#2a2a2a]"
              >
                Select All
              </Button>

              <Button
                onClick={clearSelection}
                variant="outline"
                disabled={isGenerating}
                className="border-[#2a2a2a]"
              >
                Clear
              </Button>

              <Button
                onClick={clearLogs}
                variant="outline"
                className="border-[#2a2a2a] ml-auto"
              >
                Clear Logs
              </Button>
            </div>

            {/* Progress */}
            {isGenerating && (
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-400">
                    {progress ? `${progress.categoryId} - Prompt ${progress.promptIndex + 1}/${progress.totalPrompts}` : 'Initializing...'}
                  </span>
                  <span className="text-white">{totalGenerated}/{totalToGenerate}</span>
                </div>
                <Progress value={progressPercent} className="h-2" />
                {progress?.imageUrl && (
                  <div className="mt-4">
                    <img src={progress.imageUrl} alt="Latest" className="w-32 h-40 object-cover rounded border border-[#2a2a2a]" />
                  </div>
                )}
              </div>
            )}
          </div>
        </Card>

        {/* Categories Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 mb-6">
          {categories.map(cat => (
            <Card
              key={cat.id}
              onClick={() => !isGenerating && toggleCategory(cat.id)}
              className={`
                bg-[#1a1a1a] border-[#2a2a2a] p-4 cursor-pointer transition-all
                ${selectedCategories.has(cat.id) ? 'border-pink-500 bg-pink-500/10' : 'hover:border-purple-500/50'}
                ${isGenerating ? 'opacity-50 cursor-not-allowed' : ''}
              `}
            >
              <div className="flex items-start justify-between gap-2">
                <div className="flex-1 min-w-0">
                  <h3 className="text-sm truncate">{cat.name}</h3>
                  <p className="text-xs text-gray-400">{cat.promptTemplates.length} prompts</p>
                </div>
                <Checkbox
                  checked={selectedCategories.has(cat.id)}
                  disabled={isGenerating}
                />
              </div>
            </Card>
          ))}
        </div>

        {/* Logs */}
        <Card className="bg-[#1a1a1a] border-[#2a2a2a] p-6">
          <h2 className="text-xl mb-4">📝 Generation Logs</h2>
          <div className="bg-black/50 p-4 rounded max-h-96 overflow-y-auto font-mono text-xs space-y-1">
            {logs.length === 0 ? (
              <p className="text-gray-500">No logs yet...</p>
            ) : (
              logs.map((log, i) => (
                <div key={i} className="text-gray-300">
                  {log}
                </div>
              ))
            )}
          </div>
        </Card>
      </div>
    </div>
  );
}
