import React, { useState } from "react";
import { supabase } from "../utils/supabase/client";
import { Button } from "./ui/button";
import { Textarea } from "./ui/textarea";
import { Label } from "./ui/label";
import { Card } from "./ui/card";
import { Loader2, Upload, Sparkles, Image as ImageIcon } from "lucide-react";
import { toast } from "sonner";
import { ReplicateStatusBanner, useReplicateStatus } from "./ReplicateStatusBanner";
import { API_ENDPOINTS } from "../utils/config";

type GenItem = { 
  id: string; 
  image_url: string; 
  created_at: string;
  prompt: string;
};

export default function Gen4Panel() {
  const [prompt, setPrompt] = useState("");
  const [selfie, setSelfie] = useState<File | null>(null);
  const [extra1, setExtra1] = useState<File | null>(null);
  const [extra2, setExtra2] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string>("");
  const [items, setItems] = useState<GenItem[]>([]);
  const [loading, setLoading] = useState(false);
  
  // Replicate status management
  const { status: replicateStatus, showReplicateError, hideReplicateError } = useReplicateStatus();

  // Upload file to Supabase Storage
  async function uploadToSupabase(file: File | null): Promise<string | null> {
    if (!file) return null;
    
    try {
      const path = `uploads/${Date.now()}-${file.name.replace(/\s+/g, "_")}`;
      
      const { data, error } = await supabase.storage
        .from("photos")
        .upload(path, file, {
          cacheControl: "3600",
          upsert: false
        });
      
      if (error) {
        console.error("Upload error:", error);
        toast.error(`Upload failed: ${error.message}`);
        return null;
      }
      
      const { data: pub } = supabase.storage
        .from("photos")
        .getPublicUrl(path);
      
      return pub?.publicUrl ?? null;
    } catch (error: any) {
      console.error("Upload exception:", error);
      toast.error(`Upload exception: ${error.message}`);
      return null;
    }
  }

  // Main generation handler
  async function onGenerate() {
    if (!prompt.trim()) {
      toast.error("Please enter a prompt");
      return;
    }

    try {
      setLoading(true);
      
      // 1) Upload reference images (if provided)
      toast.info("Uploading reference images...");
      const [selfieUrl, extra1Url, extra2Url] = await Promise.all([
        uploadToSupabase(selfie),
        uploadToSupabase(extra1),
        uploadToSupabase(extra2),
      ]);

      const refs = [selfieUrl, extra1Url, extra2Url].filter(Boolean);
      
      console.log("📸 Reference images uploaded:", refs);

      // 2) Call Gen-4 API
      toast.info("Calling Gen-4 API...");
      console.log("🎬 Calling Gen-4 with prompt:", prompt);
      
      // Determine mode
      const mode = refs.length > 0 ? "img2img" : "text2img";
      
      const res = await fetch(API_ENDPOINTS.generateGen4, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          mode,
          model: "gen4",
          prompt_final: prompt || "studio portrait 85mm, soft cinematic lighting",
          reference_images: refs.length > 0 ? refs : undefined,
          aspect_ratio: "16:9"
        })
      });

      const data = await res.json();
      
      if (!res.ok) {
        console.error("❌ Gen4 error:", data);
        
        // Handle specific error types
        const errorMsg = data.error || "Unknown error";
        
        if (errorMsg.includes('402') || errorMsg.includes('Payment Required')) {
          showReplicateError(errorMsg);
          toast.error('⚠️ Replicate API credits exhausted', { duration: 5000 });
        } else if (errorMsg.includes('Insufficient credit')) {
          showReplicateError(errorMsg);
          toast.error('⚠️ Insufficient Replicate credits', { duration: 5000 });
        } else if (errorMsg.includes('Aucune image retournée')) {
          toast.error('❌ No image generated. This may be due to API credits or rate limits.', {
            duration: 6000
          });
        } else {
          toast.error(`Generation failed: ${errorMsg}`);
        }
        return;
      }

      console.log("✅ Gen-4 response:", data);

      // Check if image_url exists
      if (!data.image_url) {
        console.error("❌ No image URL in response");
        toast.error('❌ No image generated. Please check Replicate API credits.');
        return;
      }

      // 3) Preview + add to gallery
      setPreviewUrl(data.image_url);
      
      const newItem: GenItem = {
        id: crypto.randomUUID(),
        image_url: data.image_url,
        prompt,
        created_at: new Date().toISOString()
      };
      
      setItems(prev => [newItem, ...prev]);
      
      toast.success("Image generated successfully! 🎉");
      
      // Reset form
      setPrompt("");
      setSelfie(null);
      setExtra1(null);
      setExtra2(null);
      
    } catch (error: any) {
      console.error("❌ Generation exception:", error);
      
      // Enhanced error handling
      const errorMsg = error?.message || "Generation error";
      
      if (errorMsg.includes('402') || errorMsg.includes('Payment Required')) {
        showReplicateError(errorMsg);
        toast.error('⚠️ Replicate API credits exhausted', { duration: 5000 });
      } else if (errorMsg.includes('Insufficient credit')) {
        showReplicateError(errorMsg);
        toast.error('⚠️ Insufficient Replicate credits', { duration: 5000 });
      } else {
        toast.error(errorMsg);
      }
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="p-6 space-y-6 bg-[#0B0B0D] min-h-screen">
      {/* Replicate Status Banner */}
      <ReplicateStatusBanner 
        show={replicateStatus.show}
        errorMessage={replicateStatus.errorMessage}
        onClose={hideReplicateError}
      />

      {/* Header */}
      <div className="space-y-2">
        <h2 className="text-3xl font-bold bg-gradient-to-r from-pink-500 to-purple-600 bg-clip-text text-transparent">
          Photoglow · Gen-4
        </h2>
        <p className="text-gray-400 text-sm">
          Generate cinematic images with AI. Add up to 3 reference images (selfie, scene, object).
        </p>
      </div>

      {/* Form */}
      <Card className="p-6 space-y-4 bg-[#18181B] border-purple-500/30">
        <div className="space-y-2">
          <Label htmlFor="prompt" className="text-white">Prompt</Label>
          <Textarea
            id="prompt"
            className="bg-[#0B0B0D] border-purple-500/30 text-white min-h-[100px]"
            placeholder="portrait cinematic golden hour, 85mm lens, ultra realistic, professional photography"
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
          />
        </div>

        <div className="grid grid-cols-1 gap-4">
          {/* Selfie Upload */}
          <div className="space-y-2">
            <Label className="text-white flex items-center gap-2">
              <Upload className="w-4 h-4" />
              Selfie (optional)
            </Label>
            <div className="relative">
              <input
                type="file"
                accept="image/*"
                onChange={(e) => setSelfie(e.target.files?.[0] ?? null)}
                className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
              />
              <div className="border-2 border-dashed border-purple-500/30 rounded-lg p-4 text-center hover:border-purple-500/50 transition-colors">
                <ImageIcon className="w-8 h-8 mx-auto mb-2 text-purple-400" />
                <p className="text-sm text-gray-300">
                  {selfie ? selfie.name : "Click to upload selfie"}
                </p>
              </div>
            </div>
          </div>

          {/* Extra 1 */}
          <div className="space-y-2">
            <Label className="text-white flex items-center gap-2">
              <Upload className="w-4 h-4" />
              Reference Image 1 (optional)
            </Label>
            <div className="relative">
              <input
                type="file"
                accept="image/*"
                onChange={(e) => setExtra1(e.target.files?.[0] ?? null)}
                className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
              />
              <div className="border-2 border-dashed border-purple-500/30 rounded-lg p-4 text-center hover:border-purple-500/50 transition-colors">
                <ImageIcon className="w-8 h-8 mx-auto mb-2 text-purple-400" />
                <p className="text-sm text-gray-300">
                  {extra1 ? extra1.name : "Click to upload reference"}
                </p>
              </div>
            </div>
          </div>

          {/* Extra 2 */}
          <div className="space-y-2">
            <Label className="text-white flex items-center gap-2">
              <Upload className="w-4 h-4" />
              Reference Image 2 (optional)
            </Label>
            <div className="relative">
              <input
                type="file"
                accept="image/*"
                onChange={(e) => setExtra2(e.target.files?.[0] ?? null)}
                className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
              />
              <div className="border-2 border-dashed border-purple-500/30 rounded-lg p-4 text-center hover:border-purple-500/50 transition-colors">
                <ImageIcon className="w-8 h-8 mx-auto mb-2 text-purple-400" />
                <p className="text-sm text-gray-300">
                  {extra2 ? extra2.name : "Click to upload reference"}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Generate Button */}
        <Button
          onClick={onGenerate}
          disabled={loading}
          className="w-full bg-gradient-to-r from-pink-500 to-purple-600 hover:from-pink-600 hover:to-purple-700"
        >
          {loading ? (
            <>
              <Loader2 className="w-4 h-4 mr-2 animate-spin" />
              Generating...
            </>
          ) : (
            <>
              <Sparkles className="w-4 h-4 mr-2" />
              Generate with Gen-4
            </>
          )}
        </Button>
      </Card>

      {/* Preview */}
      {previewUrl && (
        <Card className="p-6 bg-[#18181B] border-purple-500/30">
          <div className="space-y-3">
            <div className="flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-purple-400" />
              <h3 className="text-xl font-semibold text-white">Latest Generation</h3>
            </div>
            <img
              src={previewUrl}
              alt="Generated preview"
              className="w-full rounded-lg shadow-xl"
            />
          </div>
        </Card>
      )}

      {/* Gallery */}
      {items.length > 0 && (
        <div className="space-y-4">
          <div className="flex items-center gap-2">
            <ImageIcon className="w-5 h-5 text-purple-400" />
            <h3 className="text-xl font-semibold text-white">Gallery</h3>
            <span className="text-sm text-gray-400">({items.length} images)</span>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {items.map((item) => (
              <Card key={item.id} className="overflow-hidden bg-[#18181B] border-purple-500/20 hover:border-purple-500/50 transition-colors">
                <img
                  src={item.image_url}
                  alt={item.prompt}
                  className="w-full aspect-video object-cover"
                />
                <div className="p-3 space-y-1">
                  <p className="text-xs text-gray-300 line-clamp-2">
                    {item.prompt}
                  </p>
                  <p className="text-[10px] text-gray-500">
                    {new Date(item.created_at).toLocaleString()}
                  </p>
                </div>
              </Card>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
