import { useState } from 'react';
import { Button } from '../ui/button';
import { Card } from '../ui/card';
import { Badge } from '../ui/badge';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { Textarea } from '../ui/textarea';
import { Progress } from '../ui/progress';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';
import { Wand2, Upload, Loader2, CheckCircle2, AlertCircle, ImageIcon, Sparkles } from 'lucide-react';
import { toast } from 'sonner@2.0.3';
import { supabase } from '../utils/supabase/client';
import { projectId } from '../utils/supabase/info';

interface JobStatus {
  ok: boolean;
  status: 'queued' | 'running' | 'succeeded' | 'failed' | 'canceled';
  image_url?: string;
  error?: string;
  progress?: number;
  created_at?: string;
  completed_at?: string;
}

export function GenerateJobsTab() {
  const [model, setModel] = useState<'flux' | 'gen4' | 'gen4-turbo'>('flux');
  const [mode, setMode] = useState<'text2img' | 'img2img'>('text2img');
  const [aspectRatio, setAspectRatio] = useState('1:1');
  const [prompt, setPrompt] = useState('');
  const [promptStrength, setPromptStrength] = useState(0.65);
  const [seed, setSeed] = useState('');
  const [referenceImage, setReferenceImage] = useState<File | null>(null);
  const [referencePreview, setReferencePreview] = useState<string>('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [currentJobId, setCurrentJobId] = useState<string | null>(null);
  const [jobProgress, setJobProgress] = useState(0);
  const [generatedImageUrl, setGeneratedImageUrl] = useState<string>('');

  const aspectRatios = ['1:1', '3:4', '4:5', '16:9', '9:16'];

  // Handle reference image upload
  const handleReferenceUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setReferenceImage(file);
    const reader = new FileReader();
    reader.onload = (event) => {
      if (event.target?.result) {
        setReferencePreview(event.target.result as string);
      }
    };
    reader.readAsDataURL(file);
  };

  // Upload image to Supabase via signed URL
  const uploadImageToSupabase = async (file: File): Promise<string> => {
    try {
      toast.info('📤 Uploading reference image...');

      // Get signed upload URL
      const signedRes = await fetch(
        `https://${projectId}.supabase.co/functions/v1/make-server-ab844084/storage-signed-upload`,
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            filename: file.name,
            contentType: file.type,
            bucket: 'uploads'
          })
        }
      );

      if (!signedRes.ok) {
        throw new Error(`Failed to get signed URL: ${signedRes.status}`);
      }

      const signedData = await signedRes.json();

      if (!signedData?.signedUrl || !signedData?.publicUrl) {
        throw new Error('Invalid signed upload response');
      }

      // Upload file to Supabase Storage
      const uploadRes = await fetch(signedData.signedUrl, {
        method: 'PUT',
        headers: { 'Content-Type': file.type },
        body: file
      });

      if (!uploadRes.ok) {
        throw new Error(`Upload failed: ${uploadRes.status}`);
      }

      toast.success('✅ Image uploaded');
      return signedData.publicUrl;

    } catch (error: any) {
      toast.error(`Upload failed: ${error.message}`);
      throw error;
    }
  };

  // Create generation job
  const createJob = async (): Promise<string> => {
    try {
      let imageUrl: string | undefined;

      if (mode === 'img2img') {
        if (!referenceImage) {
          throw new Error('Reference image required for img2img mode');
        }
        imageUrl = await uploadImageToSupabase(referenceImage);
      }

      const body: any = {
        mode,
        model,
        prompt_final: prompt,
        aspect_ratio: aspectRatio
      };

      if (seed) {
        body.seed = parseInt(seed);
      }

      if (mode === 'img2img') {
        body.image_url = imageUrl;
        body.prompt_strength = promptStrength;
      }

      console.log('🧾 Creating job with payload:', body);
      toast.info('🚀 Creating generation job...');

      const jobRes = await fetch(
        `https://${projectId}.supabase.co/functions/v1/make-server-ab844084/v1/jobs`,
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(body)
        }
      );

      if (!jobRes.ok) {
        const errorData = await jobRes.json();
        throw new Error(errorData.error || `Job creation failed: ${jobRes.status}`);
      }

      const jobData = await jobRes.json();

      if (!jobData?.ok || !jobData?.job_id) {
        throw new Error('Invalid job creation response');
      }

      console.log('✅ Job created:', jobData.job_id);
      return jobData.job_id;

    } catch (error: any) {
      toast.error(`Job creation failed: ${error.message}`);
      throw error;
    }
  };

  // Poll job status
  const pollJobStatus = async (jobId: string): Promise<string> => {
    const maxAttempts = 60; // 90 seconds max (60 * 1.5s)
    let attempts = 0;

    toast.info('⏳ Generating image...');

    while (attempts < maxAttempts) {
      await new Promise(r => setTimeout(r, 1500)); // Wait 1.5s
      attempts++;

      try {
        const statusRes = await fetch(
          `https://${projectId}.supabase.co/functions/v1/make-server-ab844084/v1/jobs/${jobId}`
        );

        if (!statusRes.ok) {
          console.warn(`Poll attempt ${attempts} failed: ${statusRes.status}`);
          continue;
        }

        const statusData: JobStatus = await statusRes.json();

        console.log(`📡 Job status: ${statusData.status} (${attempts}/${maxAttempts})`);

        // Update progress
        if (statusData.progress) {
          setJobProgress(statusData.progress);
        }

        if (statusData.status === 'succeeded' && statusData.image_url) {
          return statusData.image_url;
        }

        if (statusData.status === 'failed' || statusData.status === 'canceled') {
          throw new Error(statusData.error || `Job ${statusData.status}`);
        }

      } catch (pollError: any) {
        console.warn(`Poll error:`, pollError);
        // Continue polling unless it's a final status
        if (pollError.message.includes('failed') || pollError.message.includes('canceled')) {
          throw pollError;
        }
      }
    }

    throw new Error('Job timeout: Generation took too long');
  };

  // Main generate handler
  const handleGenerate = async () => {
    if (!prompt.trim()) {
      toast.error('Please enter a prompt');
      return;
    }

    if (mode === 'img2img' && !referenceImage) {
      toast.error('Please upload a reference image for img2img mode');
      return;
    }

    setIsGenerating(true);
    setGeneratedImageUrl('');
    setJobProgress(0);

    try {
      // Step 1: Create job
      const jobId = await createJob();
      setCurrentJobId(jobId);

      // Step 2: Poll for completion
      const imageUrl = await pollJobStatus(jobId);

      // Step 3: Success!
      setGeneratedImageUrl(imageUrl);
      toast.success('✨ Image generated successfully!');

    } catch (error: any) {
      console.error('Generation error:', error);
      toast.error(error.message || 'Generation failed');
    } finally {
      setIsGenerating(false);
      setCurrentJobId(null);
      setJobProgress(0);
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h2 className="text-2xl font-bold mb-2">Image Generator</h2>
        <p className="text-gray-600">Generate images with FLUX, Gen-4, or Gen-4 Turbo using the Jobs API</p>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-3 gap-4">
        <Card className="p-4">
          <div className="text-xs text-gray-500 uppercase tracking-wide mb-1">Mode</div>
          <div className="text-lg font-bold text-pink-500">{mode}</div>
        </Card>
        <Card className="p-4">
          <div className="text-xs text-gray-500 uppercase tracking-wide mb-1">Model</div>
          <div className="text-lg font-bold text-pink-500">
            {model === 'flux' ? 'FLUX' : model === 'gen4' ? 'Gen-4' : 'Gen-4 Turbo'}
          </div>
        </Card>
        <Card className="p-4">
          <div className="text-xs text-gray-500 uppercase tracking-wide mb-1">Ratio</div>
          <div className="text-lg font-bold text-pink-500">{aspectRatio}</div>
        </Card>
      </div>

      {/* Configuration */}
      <Card className="p-6 space-y-4">
        <div className="grid grid-cols-2 gap-4">
          <div>
            <Label>AI Model</Label>
            <Select value={model} onValueChange={(v: any) => setModel(v)}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="flux">FLUX 1.1 Pro (text2img)</SelectItem>
                <SelectItem value="gen4">Runway Gen‑4</SelectItem>
                <SelectItem value="gen4-turbo">Runway Gen‑4 Turbo</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div>
            <Label>Mode</Label>
            <Select value={mode} onValueChange={(v: any) => {
              setMode(v);
              if (v === 'img2img' && model === 'flux') {
                setModel('gen4'); // UX: FLUX is text2img priority
              }
            }}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="text2img">text2img</SelectItem>
                <SelectItem value="img2img">img2img</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <Label>Aspect Ratio</Label>
            <Select value={aspectRatio} onValueChange={setAspectRatio}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {aspectRatios.map(ratio => (
                  <SelectItem key={ratio} value={ratio}>{ratio}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div>
            <Label>Seed (optional)</Label>
            <Input
              type="number"
              value={seed}
              onChange={(e) => setSeed(e.target.value)}
              placeholder="e.g., 777"
            />
          </div>
        </div>

        <div>
          <Label>Prompt</Label>
          <Textarea
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            placeholder="professional headshot, studio lighting, 85mm look, crisp details..."
            rows={4}
            className="resize-none"
          />
          <div className="text-xs text-gray-500 mt-1 flex items-center gap-1">
            <Sparkles className="w-3 h-3" />
            Priority: <Badge variant="outline" className="text-xs">preserve exact facial features & likeness</Badge>
          </div>
        </div>

        {mode === 'img2img' && (
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label>Prompt Strength</Label>
              <Input
                type="number"
                step="0.05"
                min="0"
                max="1"
                value={promptStrength}
                onChange={(e) => setPromptStrength(parseFloat(e.target.value))}
              />
              <div className="text-xs text-gray-500 mt-1">0.6-0.7 recommended</div>
            </div>

            <div>
              <Label>Reference Image</Label>
              <Input
                type="file"
                accept="image/*"
                onChange={handleReferenceUpload}
              />
            </div>
          </div>
        )}

        {referencePreview && (
          <div>
            <Label>Preview</Label>
            <img
              src={referencePreview}
              alt="Reference"
              className="w-full max-w-xs rounded-lg border-2 border-pink-200 mt-2"
            />
          </div>
        )}

        <Button
          onClick={handleGenerate}
          disabled={isGenerating}
          className="w-full bg-gradient-to-r from-pink-500 to-orange-500 hover:from-pink-600 hover:to-orange-600"
          size="lg"
        >
          {isGenerating ? (
            <>
              <Loader2 className="w-4 h-4 mr-2 animate-spin" />
              Generating...
            </>
          ) : (
            <>
              <Wand2 className="w-4 h-4 mr-2" />
              Generate Image
            </>
          )}
        </Button>

        {isGenerating && currentJobId && (
          <div className="space-y-2">
            <div className="flex items-center justify-between text-sm">
              <span className="text-gray-600">Job ID: <code className="bg-gray-100 px-2 py-1 rounded">{currentJobId}</code></span>
              <span className="text-pink-500 font-semibold">{jobProgress}%</span>
            </div>
            <Progress value={jobProgress} className="h-2" />
          </div>
        )}
      </Card>

      {/* Generated Result */}
      {generatedImageUrl && (
        <Card className="p-6">
          <div className="flex items-center gap-2 mb-4">
            <CheckCircle2 className="w-5 h-5 text-green-500" />
            <h3 className="text-lg font-semibold">Generated Image</h3>
          </div>
          <img
            src={generatedImageUrl}
            alt="Generated"
            className="w-full rounded-lg border-2 border-green-200 mb-4"
          />
          <div className="flex gap-2">
            <Button
              variant="outline"
              onClick={() => window.open(generatedImageUrl, '_blank')}
              className="flex-1"
            >
              <ImageIcon className="w-4 h-4 mr-2" />
              Open Full Size
            </Button>
            <Button
              variant="outline"
              onClick={() => {
                navigator.clipboard.writeText(generatedImageUrl);
                toast.success('URL copied to clipboard');
              }}
              className="flex-1"
            >
              Copy URL
            </Button>
          </div>
        </Card>
      )}

      {/* Help */}
      <Card className="p-4 bg-pink-50 border-pink-200">
        <div className="flex gap-3">
          <AlertCircle className="w-5 h-5 text-pink-500 flex-shrink-0 mt-0.5" />
          <div className="text-sm text-pink-900">
            <p className="font-semibold mb-1">💡 Tips for best results:</p>
            <ul className="list-disc list-inside space-y-1 text-pink-800">
              <li><strong>FLUX:</strong> Best for text2img, fast generation</li>
              <li><strong>Gen-4:</strong> High quality, supports img2img</li>
              <li><strong>Gen-4 Turbo:</strong> Faster Gen-4, great for iterations</li>
              <li><strong>Prompt strength:</strong> 0.6-0.7 for img2img balance</li>
              <li><strong>Seed:</strong> Use same seed for reproducible results</li>
            </ul>
          </div>
        </div>
      </Card>
    </div>
  );
}
