// Photoglow Admin — Generator Plugin
// Jobs API avec polling pour FLUX, Gen-4, Gen-4 Turbo

// ⚠️ ADAPTER SELON VOTRE PROJET SUPABASE
const PROJECT_ID = 'YOUR_PROJECT_ID'; // À remplacer !
const BASE_URL_API = `https://${PROJECT_ID}.supabase.co/functions/v1/make-server-ab844084`;
const V1_JOBS = `${BASE_URL_API}/v1/jobs`;
const V1_JOB = (id) => `${BASE_URL_API}/v1/jobs/${id}`;
const SIGNED_UPLOAD = `${BASE_URL_API}/storage-signed-upload`;

figma.showUI(__html__, { width: 400, height: 680, themeColors: true });

function uiLog(v) {
  figma.ui.postMessage({ 
    type: 'log', 
    value: typeof v === 'string' ? v : JSON.stringify(v, null, 2) 
  });
}

function uiError(message) {
  figma.ui.postMessage({ type: 'error', message });
}

function uiDone(url) {
  figma.ui.postMessage({ type: 'done', image_url: url });
}

figma.ui.onmessage = async (msg) => {
  if (msg.type === 'cancel') {
    figma.closePlugin();
    return;
  }

  if (msg.type !== 'start-job') return;

  try {
    const { 
      model, 
      mode, 
      aspect_ratio, 
      prompt_final, 
      prompt_strength, 
      seed, 
      fileMeta, 
      fileBytes 
    } = msg;

    // 1) Upload image d'entrée si img2img → URL Supabase publique (bucket uploads)
    let inputImageUrl;
    
    if (mode === 'img2img' && fileBytes && fileMeta) {
      uiLog('📤 Uploading reference image to Supabase...');
      
      try {
        // Demander une signed URL pour upload
        const uploadRes = await fetch(SIGNED_UPLOAD, {
          method: 'POST',
          headers: { 
            'content-type': 'application/json',
            'origin': 'null' // Important pour Figma CORS
          },
          body: JSON.stringify({
            filename: fileMeta.name,
            contentType: fileMeta.type,
            bucket: 'uploads'
          })
        });

        if (!uploadRes.ok) {
          throw new Error(`Signed upload request failed: ${uploadRes.status}`);
        }

        const uploadData = await uploadRes.json();
        
        if (!uploadData?.signedUrl || !uploadData?.publicUrl) {
          throw new Error('Invalid signed upload response');
        }

        // Upload le fichier vers Supabase Storage
        const putRes = await fetch(uploadData.signedUrl, {
          method: 'PUT',
          headers: { 
            'content-type': fileMeta.type 
          },
          body: new Uint8Array(fileBytes)
        });

        if (!putRes.ok) {
          throw new Error(`Storage upload failed: ${putRes.status}`);
        }

        inputImageUrl = uploadData.publicUrl;
        uiLog(`✅ Image uploaded: ${inputImageUrl}`);
        
      } catch (uploadError) {
        uiError(`Upload failed: ${uploadError.message}`);
        return;
      }
    }

    // 2) POST /v1/jobs (création du job)
    const body = {
      mode,
      model,
      prompt_final,
      aspect_ratio
    };

    if (seed !== undefined) {
      body.seed = seed;
    }

    if (mode === 'img2img') {
      body.image_url = inputImageUrl;
      body.prompt_strength = prompt_strength ?? 0.65;
    }

    uiLog({ '🧾 Job request': body });

    let jobRes;
    try {
      jobRes = await fetch(V1_JOBS, {
        method: 'POST',
        headers: {
          'content-type': 'application/json',
          'origin': 'null' // Important pour Figma CORS
        },
        body: JSON.stringify(body)
      });
    } catch (fetchError) {
      throw new Error(`Network error: ${fetchError.message}`);
    }

    if (!jobRes.ok) {
      const errorData = await jobRes.json();
      throw new Error(errorData.error || `Job creation failed: ${jobRes.status}`);
    }

    const created = await jobRes.json();

    if (!created?.ok || !created?.job_id) {
      throw new Error('Job creation failed: ' + JSON.stringify(created));
    }

    const jobId = created.job_id;
    uiLog(`🪪 Job created: ${jobId}`);
    uiLog('⏳ Polling for completion...');

    // 3) Poll GET /v1/jobs/{id}
    let tries = 0;
    const maxTries = 60; // 90 secondes max (60 * 1.5s)
    let imageUrl = null;

    while (tries++ < maxTries) {
      await new Promise(r => setTimeout(r, 1500)); // Wait 1.5s between polls

      let statusRes;
      try {
        statusRes = await fetch(V1_JOB(jobId), {
          headers: {
            'origin': 'null'
          }
        });
      } catch (pollError) {
        uiLog(`⚠️ Poll attempt ${tries} failed: ${pollError.message}`);
        continue;
      }

      if (!statusRes.ok) {
        uiLog(`⚠️ Poll returned ${statusRes.status}`);
        continue;
      }

      const st = await statusRes.json();
      const status = st?.status;

      uiLog(`📡 Status: ${status} (attempt ${tries}/${maxTries})`);

      if (status === 'succeeded' && st?.image_url) {
        imageUrl = st.image_url;
        break;
      }

      if (status === 'failed' || status === 'canceled') {
        throw new Error(`Job ${status}: ${st?.error || 'Unknown error'}`);
      }

      // Continue polling si queued ou running
    }

    if (!imageUrl) {
      throw new Error('Timeout: job did not complete in time');
    }

    uiLog(`🎉 Image ready: ${imageUrl}`);

    // 4) Télécharger et insérer dans Figma
    uiLog('📥 Downloading image...');
    
    const imgRes = await fetch(imageUrl);
    if (!imgRes.ok) {
      throw new Error(`Image download failed: ${imgRes.status}`);
    }

    const bytes = await imgRes.arrayBuffer();
    const image = await figma.createImageAsync(new Uint8Array(bytes));

    const rect = figma.createRectangle();
    rect.resize(512, 512);
    rect.fills = [{ 
      type: 'IMAGE', 
      scaleMode: 'FILL', 
      imageHash: image.hash 
    }];

    figma.currentPage.appendChild(rect);
    figma.viewport.scrollAndZoomIntoView([rect]);

    uiDone(imageUrl);
    uiLog('✨ Image inserted into Figma!');

  } catch (e) {
    console.error('Plugin error:', e);
    uiError(e?.message || String(e));
  }
};
