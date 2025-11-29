/**
 * PhotoGlow Figma Plugin - Main Thread
 * Version: V2 (Preview System Refactor)
 * Date: November 5, 2024
 */

// Show UI
figma.showUI(__html__, { width: 360, height: 640 });

// Log startup
console.log("[PhotoGlow] Plugin started");

/**
 * Handle messages from UI
 */
figma.ui.onmessage = async (msg) => {
  console.log("[main] Received message:", msg.type);
  
  try {
    switch (msg.type) {
      case "preview:ready":
        handlePreviewReady(msg);
        break;
        
      case "apply-selection":
        await handleApplyToSelection(msg);
        break;
        
      case "request-latest-blob":
        handleRequestLatestBlob();
        break;
        
      default:
        console.warn("[main] Unknown message type:", msg.type);
    }
  } catch (error) {
    console.error("[main] Error handling message:", error);
    figma.notify(`Error: ${error.message}`, { error: true });
  }
};

/**
 * Handle preview ready notification
 */
function handlePreviewReady(msg) {
  const { seed, meta } = msg;
  console.log("[handlePreviewReady] Preview generated:", {
    seed,
    px: meta?.px,
    framing: meta?.framing
  });
  
  // Could store preview metadata on selection
  // For now, just log it
}

/**
 * Apply preview image to selected node
 */
async function handleApplyToSelection(msg) {
  const { bytes, name, meta } = msg;
  
  // Get current selection
  const selection = figma.currentPage.selection;
  
  if (selection.length === 0) {
    figma.notify("⚠️ Please select a layer first");
    return;
  }
  
  const node = selection[0];
  
  // Check if node supports fills
  if (!("fills" in node)) {
    figma.notify("⚠️ Selected layer doesn't support images");
    return;
  }
  
  try {
    // Create image from bytes
    const image = figma.createImage(Uint8Array.from(bytes));
    
    // Clone current fills to avoid mutation
    const currentFills = clone(node.fills);
    
    // Create new image fill
    const imageFill = {
      type: "IMAGE",
      scaleMode: "FILL",
      imageHash: image.hash
    };
    
    // Replace first fill or add new one
    if (currentFills.length > 0) {
      currentFills[0] = imageFill;
    } else {
      currentFills.push(imageFill);
    }
    
    // Apply fills
    node.fills = currentFills;
    
    // Success notification
    const seedInfo = meta?.seed ? ` (seed: ${meta.seed})` : '';
    figma.notify(`✅ Image applied${seedInfo}`);
    
    console.log("[handleApplyToSelection] Success:", {
      nodeName: node.name,
      seed: meta?.seed,
      px: meta?.px
    });
    
  } catch (error) {
    console.error("[handleApplyToSelection] Error:", error);
    figma.notify(`❌ Failed to apply image: ${error.message}`, { error: true });
  }
}

/**
 * Handle request for latest blob (alternative flow)
 */
function handleRequestLatestBlob() {
  // UI should have the blob, this is just a bridge
  // Not used in current flow, but kept for compatibility
  console.log("[handleRequestLatestBlob] Requested");
}

/**
 * Helper: Deep clone object
 */
function clone(val) {
  return JSON.parse(JSON.stringify(val));
}

/**
 * Handle selection changes
 */
figma.on("selectionchange", () => {
  const selection = figma.currentPage.selection;
  console.log("[selectionchange] Selection count:", selection.length);
  
  // Notify UI about selection change
  figma.ui.postMessage({
    type: "selection-changed",
    count: selection.length,
    hasImageSupport: selection.length > 0 && "fills" in selection[0]
  });
});

/**
 * Plugin lifecycle
 */
console.log("[PhotoGlow] Ready for preview generation");
