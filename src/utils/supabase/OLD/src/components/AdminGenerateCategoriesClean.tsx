/**
 * PhotoGlow Admin - Clean Category Image Generator
 * 
 * Génération massive d'images pour toutes les catégories.
 * 
 * Architecture:
 * - File séquentielle (concurrence = 1)
 * - Délai 300-600ms entre jobs
 * - Appel unique: POST /v1/ideas/generate (Vercel API)
 * - Idempotency-Key pour éviter doublons
 * - Export CSV des résultats
 * 
 * @module AdminGenerateCategoriesClean
 */

'use client';

import { useState, useRef } from 'react';
import { Button } from './ui/button';
import { Card } from './ui/card';
import { Progress } from './ui/progress';
import { toast } from 'sonner';
import { Download, Play, Pause, X, RefreshCw } from 'lucide-react';

// ========================================
// CONFIG
// ========================================

const BASE_URL = 'https://image-generator-api-chi.vercel.app';
const ENDPOINT = `${BASE_URL}/v1/ideas/generate`;
const DELAY_MS = 450; // pacing anti-429
const MAX_RETRIES = 2; // retries 429/5xx

// ========================================
// TYPES
// ========================================

interface CategoryData {
  id: string;
  name: string;
  slug: string;
  prompts: Array<{
    title: string;
    text: string;
    style?: string;
  }>;
}

interface Job {
  slug: string;
  prompt: string;
  aspect_ratio: string;
  width?: number;
  height?: number;
  model: string;
  persist: boolean;
  collection: string;
  category_id: string;
  prompt_index: number;
  prompt_title: string;
  prompt_text: string;
  style?: string;
}

interface JobResult {
  ok: boolean;
  item: Job;
  out?: {
    success: boolean;
    image_url?: string;
    error?: string;
  };
  error?: string;
}

interface ProgressUpdate {
  index: number;
  total: number;
  state: 'ok' | 'error';
  url?: string;
  error?: string;
}

// ========================================
// IDEMPOTENCY KEY GENERATOR
// ========================================

/**
 * Génère une clé d'idempotence déterministe pour un job
 * Hash SHA-256 des attributs essentiels (slug, prompt, ratio, dims, model, persist, collection)
 */
async function makeIdemKey(item: Job): Promise<string> {
  const s = [
    item.slug,
    item.prompt,
    item.aspect_ratio || '',
    item.width || '',
    item.height || '',
    item.model || 'flux',
    item.persist ? '1' : '0',
    item.collection || '',
  ].join('|');

  const data = new TextEncoder().encode(s);
  const hash = await crypto.subtle.digest('SHA-256', data);
  return Array.from(new Uint8Array(hash))
    .slice(0, 8)
    .map((b) => b.toString(16).padStart(2, '0'))
    .join('');
}

// ========================================
// API CALL WITH RETRY
// ========================================

/**
 * Appelle l'endpoint de génération avec retry automatique
 */
async function callGenerate(item: Job, attempt = 0): Promise<any> {
  const idem = await makeIdemKey(item);

  const res = await fetch(ENDPOINT, {
    method: 'POST',
    headers: {
      'content-type': 'application/json',
      'idempotency-key': idem,
    },
    body: JSON.stringify({
      slug: item.slug,
      prompt: item.prompt,
      aspect_ratio: item.aspect_ratio,
      width: item.width,
      height: item.height,
      model: item.model || 'flux',
      persist: true, // IMPORTANT
      collection: item.collection,
      // Méta (facultatif)
      category_id: item.category_id,
      prompt_index: item.prompt_index,
      prompt_title: item.prompt_title,
      prompt_text: item.prompt_text,
      style: item.style,
    }),
  });

  if (!res.ok) {
    // Retry sur 429 ou 5xx
    if ((res.status === 429 || res.status >= 500) && attempt < MAX_RETRIES) {
      await new Promise((r) => setTimeout(r, (attempt + 1) * 600));
      return callGenerate(item, attempt + 1);
    }

    const t = await res.text().catch(() => '');
    throw new Error(
      `HTTP ${res.status} ${res.statusText} — ${t.slice(0, 180)}`
    );
  }

  return res.json();
}

// ========================================
// SEQUENTIAL GENERATOR
// ========================================

/**
 * Exécute les jobs en séquence avec pacing
 */
async function generateAll(
  jobs: Job[],
  onProgress?: (p: ProgressUpdate) => void,
  abortSignal?: AbortSignal
): Promise<JobResult[]> {
  const results: JobResult[] = [];

  for (let i = 0; i < jobs.length; i++) {
    // Check abort
    if (abortSignal?.aborted) {
      console.log('[generateAll] Aborted by user');
      break;
    }

    try {
      const out = await callGenerate(jobs[i]);
      results.push({ ok: true, item: jobs[i], out });
      onProgress?.({
        index: i + 1,
        total: jobs.length,
        state: 'ok',
        url: out.image_url,
      });
    } catch (e: any) {
      results.push({ ok: false, item: jobs[i], error: String(e) });
      onProgress?.({
        index: i + 1,
        total: jobs.length,
        state: 'error',
        error: String(e),
      });
    }

    // Pacing (sauf dernier job)
    if (i < jobs.length - 1) {
      await new Promise((r) => setTimeout(r, DELAY_MS));
    }
  }

  return results;
}

// ========================================
// COMPONENT
// ========================================

export function AdminGenerateCategoriesClean() {
  // State
  const [categories, setCategories] = useState<CategoryData[]>([]);
  const [loading, setLoading] = useState(false);
  const [loadingCategories, setLoadingCategories] = useState(false);
  const [running, setRunning] = useState(false);
  const [progress, setProgress] = useState(0);
  const [current, setCurrent] = useState('');
  const [results, setResults] = useState<JobResult[]>([]);
  const [stats, setStats] = useState({ ok: 0, errors: 0 });

  // Refs
  const abortControllerRef = useRef<AbortController | null>(null);

  // ========================================
  // LOAD CATEGORIES
  // ========================================

  const loadCategories = async () => {
    setLoadingCategories(true);
    try {
      const res = await fetch('/api/admin/categories');
      if (!res.ok) {
        throw new Error(`HTTP ${res.status}`);
      }
      const data = await res.json();
      setCategories(data.categories || []);
      toast.success(
        `Loaded ${data.categories.length} categories (${data.total_prompts} prompts)`
      );
    } catch (error: any) {
      toast.error('Failed to load categories', {
        description: error.message,
      });
    } finally {
      setLoadingCategories(false);
    }
  };

  // ========================================
  // BUILD JOBS
  // ========================================

  const buildJobs = (): Job[] => {
    const jobs: Job[] = [];
    const collection = `admin-${new Date().toISOString().split('T')[0]}`;

    categories.forEach((cat) => {
      cat.prompts.forEach((prompt, idx) => {
        jobs.push({
          slug: cat.slug,
          prompt: prompt.text,
          aspect_ratio: '3:4',
          width: 1536,
          model: 'flux',
          persist: true,
          collection,
          category_id: cat.id,
          prompt_index: idx,
          prompt_title: prompt.title,
          prompt_text: prompt.text,
          style: prompt.style,
        });
      });
    });

    return jobs;
  };

  // ========================================
  // START GENERATION
  // ========================================

  const startGeneration = async () => {
    const jobs = buildJobs();

    if (jobs.length === 0) {
      toast.error('No jobs to generate', {
        description: 'Load categories first',
      });
      return;
    }

    // Confirm
    const confirmed = window.confirm(
      `Generate ${jobs.length} images?\n\nThis will take ~${Math.round(
        (jobs.length * DELAY_MS) / 1000 / 60
      )} minutes.`
    );

    if (!confirmed) return;

    // Reset
    setResults([]);
    setStats({ ok: 0, errors: 0 });
    setProgress(0);
    setCurrent('');
    setRunning(true);

    // Abort controller
    abortControllerRef.current = new AbortController();

    try {
      const finalResults = await generateAll(
        jobs,
        (p) => {
          // Update progress
          setProgress((p.index / p.total) * 100);
          setCurrent(
            p.state === 'ok'
              ? `✅ ${p.index}/${p.total} - ${p.url?.split('/').pop()?.slice(0, 30)}`
              : `⚠️ ${p.index}/${p.total} - ${p.error?.slice(0, 50)}`
          );

          // Update stats
          setStats((prev) => ({
            ok: prev.ok + (p.state === 'ok' ? 1 : 0),
            errors: prev.errors + (p.state === 'error' ? 1 : 0),
          }));

          // Update results
          setResults((prev) => [
            ...prev,
            {
              ok: p.state === 'ok',
              item: jobs[p.index - 1],
              out: p.state === 'ok' ? { success: true, image_url: p.url } : undefined,
              error: p.error,
            },
          ]);
        },
        abortControllerRef.current.signal
      );

      toast.success('Generation complete!', {
        description: `${finalResults.filter((r) => r.ok).length} images generated`,
      });
    } catch (error: any) {
      toast.error('Generation failed', {
        description: error.message,
      });
    } finally {
      setRunning(false);
    }
  };

  // ========================================
  // STOP GENERATION
  // ========================================

  const stopGeneration = () => {
    if (abortControllerRef.current) {
      abortControllerRef.current.abort();
      setRunning(false);
      toast.info('Generation stopped');
    }
  };

  // ========================================
  // EXPORT CSV
  // ========================================

  const exportCSV = () => {
    if (results.length === 0) {
      toast.error('No results to export');
      return;
    }

    const headers = [
      'Category',
      'Prompt Title',
      'Status',
      'Image URL',
      'Error',
    ];

    const rows = results.map((r) => [
      r.item.slug,
      r.item.prompt_title,
      r.ok ? 'OK' : 'ERROR',
      r.out?.image_url || '',
      r.error || '',
    ]);

    const csv = [
      headers.join(','),
      ...rows.map((row) =>
        row.map((cell) => `"${String(cell).replace(/"/g, '""')}"`).join(',')
      ),
    ].join('\n');

    const blob = new Blob([csv], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `photoglow-categories-${new Date().toISOString().split('T')[0]}.csv`;
    a.click();
    URL.revokeObjectURL(url);

    toast.success('CSV exported');
  };

  // ========================================
  // RENDER
  // ========================================

  return (
    <div className="min-h-screen bg-black text-white p-8">
      <div className="max-w-6xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl mb-2">Category Image Generator</h1>
            <p className="text-gray-400">
              Sequential generation with idempotency - Clean Architecture
            </p>
          </div>
          <Button
            onClick={loadCategories}
            disabled={loadingCategories || running}
            variant="outline"
          >
            <RefreshCw className={loadingCategories ? 'animate-spin' : ''} />
            Load Categories
          </Button>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-4 gap-4">
          <Card className="bg-zinc-900 border-zinc-800 p-4">
            <div className="text-sm text-gray-400">Categories</div>
            <div className="text-2xl">{categories.length}</div>
          </Card>
          <Card className="bg-zinc-900 border-zinc-800 p-4">
            <div className="text-sm text-gray-400">Total Jobs</div>
            <div className="text-2xl">
              {categories.reduce((sum, cat) => sum + cat.prompts.length, 0)}
            </div>
          </Card>
          <Card className="bg-zinc-900 border-zinc-800 p-4">
            <div className="text-sm text-green-400">Success</div>
            <div className="text-2xl text-green-400">{stats.ok}</div>
          </Card>
          <Card className="bg-zinc-900 border-zinc-800 p-4">
            <div className="text-sm text-red-400">Errors</div>
            <div className="text-2xl text-red-400">{stats.errors}</div>
          </Card>
        </div>

        {/* Controls */}
        <Card className="bg-zinc-900 border-zinc-800 p-6 space-y-4">
          <div className="flex gap-4">
            <Button
              onClick={startGeneration}
              disabled={
                running || categories.length === 0 || loadingCategories
              }
              className="flex-1"
            >
              <Play className="mr-2" size={16} />
              Start Generation
            </Button>
            <Button
              onClick={stopGeneration}
              disabled={!running}
              variant="destructive"
            >
              <Pause className="mr-2" size={16} />
              Stop
            </Button>
            <Button
              onClick={exportCSV}
              disabled={results.length === 0}
              variant="outline"
            >
              <Download className="mr-2" size={16} />
              Export CSV
            </Button>
          </div>

          {/* Progress */}
          {running && (
            <div className="space-y-2">
              <Progress value={progress} className="h-2" />
              <div className="text-sm text-gray-400">{current}</div>
            </div>
          )}
        </Card>

        {/* Categories Table */}
        <Card className="bg-zinc-900 border-zinc-800 p-6">
          <h2 className="text-xl mb-4">Categories ({categories.length})</h2>
          <div className="overflow-auto max-h-96">
            <table className="w-full">
              <thead className="sticky top-0 bg-zinc-900">
                <tr className="border-b border-zinc-800">
                  <th className="text-left p-2 text-sm text-gray-400">Name</th>
                  <th className="text-left p-2 text-sm text-gray-400">Slug</th>
                  <th className="text-right p-2 text-sm text-gray-400">
                    Prompts
                  </th>
                </tr>
              </thead>
              <tbody>
                {categories.map((cat) => (
                  <tr key={cat.id} className="border-b border-zinc-800/50">
                    <td className="p-2 text-sm">{cat.name}</td>
                    <td className="p-2 text-sm text-gray-400">{cat.slug}</td>
                    <td className="p-2 text-sm text-right text-gray-400">
                      {cat.prompts.length}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Card>

        {/* Results */}
        {results.length > 0 && (
          <Card className="bg-zinc-900 border-zinc-800 p-6">
            <h2 className="text-xl mb-4">Results ({results.length})</h2>
            <div className="overflow-auto max-h-96 space-y-2">
              {results.slice(-20).reverse().map((r, idx) => (
                <div
                  key={idx}
                  className={`p-3 rounded border ${
                    r.ok
                      ? 'bg-green-950/20 border-green-900/50'
                      : 'bg-red-950/20 border-red-900/50'
                  }`}
                >
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex-1 min-w-0">
                      <div className="text-sm">
                        {r.ok ? '✅' : '❌'}{' '}
                        <span className="text-gray-400">
                          {r.item.slug}
                        </span>{' '}
                        - {r.item.prompt_title}
                      </div>
                      {r.ok && r.out?.image_url && (
                        <a
                          href={r.out.image_url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-xs text-blue-400 hover:underline truncate block"
                        >
                          {r.out.image_url}
                        </a>
                      )}
                      {r.error && (
                        <div className="text-xs text-red-400 mt-1">
                          {r.error}
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </Card>
        )}

        {/* Config Info */}
        <Card className="bg-zinc-900 border-zinc-800 p-4">
          <h3 className="text-sm text-gray-400 mb-2">Configuration</h3>
          <div className="grid grid-cols-3 gap-4 text-xs text-gray-500">
            <div>
              <span className="text-gray-400">Endpoint:</span>{' '}
              {ENDPOINT.split('/').slice(-2).join('/')}
            </div>
            <div>
              <span className="text-gray-400">Delay:</span> {DELAY_MS}ms
            </div>
            <div>
              <span className="text-gray-400">Max Retries:</span> {MAX_RETRIES}
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
}
