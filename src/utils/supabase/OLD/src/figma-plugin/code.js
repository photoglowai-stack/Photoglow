// ============================================
// Photoglow - Main Thread (code.js)
// ============================================

const API = "https://image-generator-api-chi.vercel.app/api/v1-preview";

figma.showUI(__html__, { width: 360, height: 520 });

// ============================================
// HELPER: Ensure target rectangle
// ============================================
function ensureTargetRect() {
  const sel = figma.currentPage.selection[0];
  if (sel && sel.type === 'RECTANGLE') return sel;
  const r = figma.createRectangle();
  r.resize(448, 576);
  figma.currentPage.appendChild(r);
  figma.currentPage.selection = [r];
  return r;
}

// ============================================
// PREVIEW: Fast preview with binary response
// ============================================
let previewAbort = null;

async function runPreview(form) {
  try {
    if (previewAbort) previewAbort.abort();
    previewAbort = new AbortController();
    
    console.log('[Preview] Starting with form:', form);
    
    const res = await fetch(API, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ ...form, fast: true, proxy: true }), // IMPORTANT: proxy=true returns binary
      signal: previewAbort.signal
    });
    
    if (!res.ok) {
      throw new Error(`Preview HTTP ${res.status}`);
    }
    
    const blob = await res.blob(); // <-- image/jpeg returned by API
    const buf = await blob.arrayBuffer();
    const img = await figma.createImageAsync(new Uint8Array(buf));
    
    const node = ensureTargetRect();
    node.fills = [{ type: 'IMAGE', imageHash: img.hash, scaleMode: 'FILL' }];
    
    figma.notify('✅ Preview generated');
    console.log('[Preview] Success');
    
  } catch (e) {
    if (e.name === 'AbortError') return;
    figma.notify('❌ Preview failed', { error: true });
    console.error('[Preview]', e);
  }
}

// ============================================
// SAVE: High quality with Supabase URL
// ============================================
async function runSave(form) {
  try {
    figma.notify('⏳ Génération HQ…');
    console.log('[Save] Starting with form:', form);
    
    const res = await fetch(API, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ ...form, ratio: '3:4', fast: false, save: true, safe: false })
    });
    
    if (!res.ok) {
      const errorText = await res.text();
      throw new Error(errorText);
    }
    
    const { image_url } = await res.json();
    
    if (!image_url) {
      throw new Error('No image_url in response');
    }
    
    console.log('[Save] Got image_url:', image_url);

    // Download the Supabase URL
    const bin = await fetch(image_url);
    if (!bin.ok) {
      throw new Error(`Download ${bin.status}`);
    }
    
    const buf = await bin.arrayBuffer();
    const img = await figma.createImageAsync(new Uint8Array(buf));
    
    const node = ensureTargetRect();
    node.fills = [{ type: 'IMAGE', imageHash: img.hash, scaleMode: 'FILL' }];
    
    figma.notify('✅ Image finale générée');
    console.log('[Save] Success');
    
  } catch (e) {
    figma.notify('❌ Save failed', { error: true });
    console.error('[Save]', e);
  }
}

// ============================================
// MESSAGE HANDLING
// ============================================
let debounceTimer = null;

figma.ui.onmessage = async (msg) => {
  if (msg?.type === 'preview') {
    if (debounceTimer) clearTimeout(debounceTimer);
    debounceTimer = setTimeout(() => runPreview(msg.form || {}), 450);
  }
  
  if (msg?.type === 'save') {
    runSave(msg.form || {});
  }
  
  // Legacy: Handle create-image-rectangles (Gen4 generation)
  if (msg?.type === 'create-image-rectangles' && msg?.images) {
    try {
      const images = msg.images;
      const metadata = msg.metadata || {};
      
      console.log('[Figma] Creating rectangles for', images.length, 'images');
      
      const rectangles = [];
      let xOffset = 0;
      const spacing = 50;
      
      for (let i = 0; i < images.length; i++) {
        const imgData = images[i];
        const bytes = new Uint8Array(imgData.bytes);
        
        const img = await figma.createImageAsync(bytes);
        
        const rect = figma.createRectangle();
        rect.resize(1024, 1024);
        rect.fills = [{ type: 'IMAGE', imageHash: img.hash, scaleMode: 'FILL' }];
        rect.x = xOffset;
        rect.name = `Gen4 - ${metadata.prompt?.substring(0, 30) || 'Image'} [${i + 1}]`;
        
        figma.currentPage.appendChild(rect);
        rectangles.push(rect);
        
        xOffset += 1024 + spacing;
      }
      
      figma.currentPage.selection = rectangles;
      figma.viewport.scrollAndZoomIntoView(rectangles);
      
      figma.notify(`✅ ${rectangles.length} image(s) added to canvas`);
      console.log('[Figma] Images added successfully');
    } catch (e) {
      const errorMsg = `Create rectangles error: ${String(e)}`;
      figma.notify(errorMsg, { error: true, timeout: 5000 });
      console.error('[Figma] Create rectangles failed:', e);
    }
  }
  
  // Legacy: API calls (credits, etc.)
  if (msg?.type === 'api-call') {
    // This is handled by a different part of the code
    // For now, we'll just log it
    console.log('[Figma] API call received:', msg.path);
  }
  
  // Legacy: Base URL update
  if (msg?.type === 'set-base-url') {
    console.log('[Figma] Base URL set to:', msg.url);
  }
};
