import { useState, useEffect } from 'react';
import { LazyImage } from './LazyImage';
import { supabase } from '@/lib/supabase/client';

interface ScrollingMosaicProps {
  onPhotoClick?: (photoIndex: number, photoUrl: string) => void;
}

export function ScrollingMosaic({ onPhotoClick }: ScrollingMosaicProps) {
  const [mosaicPhotos, setMosaicPhotos] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  // Fallback photos if Supabase fails
  const fallbackPhotos = [
    'https://images.unsplash.com/photo-1560250097-0b93528c311a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwcm9mZXNzaW9uYWwlMjBwb3J0cmFpdCUyMHBob3RvfGVufDF8fHx8MTc2MDUyMjE5M3ww&ixlib=rb-4.1.0&q=80&w=400',
    'https://images.unsplash.com/photo-1581093458791-9d42e7d44e1f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx1cmJhbiUyMGZhc2hpb24lMjBwb3J0cmFpdHxlbnwxfHx8fDE3NjA1MjIxOTN8MA&ixlib=rb-4.1.0&q=80&w=400',
    'https://images.unsplash.com/photo-1719257751404-1dea075324bd?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxidXNpbmVzcyUyMGhlYWRzaG90fGVufDF8fHx8MTc2MDUyMjE5M3ww&ixlib=rb-4.1.0&q=80&w=400',
    'https://images.unsplash.com/photo-1653419403196-ab64c4c740c3?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxsaWZlc3R5bGUlMjBwb3J0cmFpdHxlbnwxfHx8fDE3NjA1MTkxMDZ8MA&ixlib=rb-4.1.0&q=80&w=400',
    'https://images.unsplash.com/photo-1609846685336-9cb06880bb48?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmaXRuZXNzJTIwcG9ydHJhaXR8ZW58MXx8fHwxNzYwNDg1ODcwfDA&ixlib=rb-4.1.0&q=80&w=400',
    'https://images.unsplash.com/photo-1597202992582-9ee5c6672095?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjcmVhdGl2ZSUyMHBvcnRyYWl0JTIwcGhvdG98ZW58MXx8fHwxNzYwNTIxMjE0fDA&ixlib=rb-4.1.0&q=80&w=400',
    'https://images.unsplash.com/photo-1640876305588-dbdab5869200?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxlbGVnYW50JTIwcG9ydHJhaXR8ZW58MXx8fHwxNzYwNTA5NjQ1fDA&ixlib=rb-4.1.0&q=80&w=400',
    'https://images.unsplash.com/photo-1607664919395-9ee609a88ba7?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjYXN1YWwlMjBwb3J0cmFpdCUyMHBob3RvfGVufDF8fHx8MTc2MDUyMTIxM3ww&ixlib=rb-4.1.0&q=80&w=400',
    'https://images.unsplash.com/photo-1680557345345-6f9ef109d252?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxvdXRkb29yJTIwcG9ydHJhaXR8ZW58MXx8fHwxNzYwNTIxMjE3fDA&ixlib=rb-4.1.0&q=80&w=400',
    'https://images.unsplash.com/photo-1636379688556-f9cc75dca5bc?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzdHVkaW8lMjBwb3J0cmFpdHxlbnwxfHx8fDE3NjA0MzEwMzh8MA&ixlib=rb-4.1.0&q=80&w=400',
    'https://images.unsplash.com/photo-1627161683077-e34782c24d81?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwb3J0cmFpdCUyMGhlYWRzaG90JTIwcHJvZmVzc2lvbmFsfGVufDF8fHx8MTc2MDUyMjU3Mnww&ixlib=rb-4.1.0&q=80&w=400',
    'https://images.unsplash.com/photo-1589351189946-b8eb5e170ba6?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmYXNoaW9uJTIwbW9kZWwlMjBwaG90b3xlbnwxfHx8fDE3NjA1MjI1NzJ8MA&ixlib=rb-4.1.0&q=80&w=400',
    'https://images.unsplash.com/photo-1560250097-0b93528c311a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxidXNpbmVzcyUyMHBvcnRyYWl0JTIwbWFufGVufDF8fHx8MTc2MDUyMjU3M3ww&ixlib=rb-4.1.0&q=80&w=400',
    'https://images.unsplash.com/photo-1655249481446-25d575f1c054?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx3b21hbiUyMHByb2Zlc3Npb25hbCUyMGhlYWRzaG90fGVufDF8fHx8MTc2MDUyMjU3M3ww&ixlib=rb-4.1.0&q=80&w=400',
    'https://images.unsplash.com/photo-1607880609114-742ed2638069?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxsaWZlc3R5bGUlMjBwb3J0cmFpdCUyMG91dGRvb3J8ZW58MXx8fHwxNzYwNTIyNTczfDA&ixlib=rb-4.1.0&q=80&w=400',
  ];

  // Fetch photos from Supabase ai_gallery bucket
  useEffect(() => {
    async function fetchGalleryPhotos() {
      try {
        console.log('🔍 [ScrollingMosaic] Starting gallery fetch...');
        
        // Step 1: List all items at bucket root
        const { data: rootItems, error: rootError } = await supabase.storage
          .from('ai_gallery')
          .list('', {
            limit: 100,
            sortBy: { column: 'name', order: 'asc' }
          });

        if (rootError) {
          console.error('❌ [ScrollingMosaic] Error listing root:', rootError);
          setMosaicPhotos(fallbackPhotos);
          setIsLoading(false);
          return;
        }

        console.log('📦 [ScrollingMosaic] Root items:', rootItems);
        console.log(`📂 [ScrollingMosaic] Found ${rootItems?.length || 0} items at bucket root`);

        // Get public URL base
        const { data: { publicUrl: projectUrl } } = supabase.storage
          .from('ai_gallery')
          .getPublicUrl('');
        
        const baseUrl = projectUrl.replace(/\/$/, '');
        console.log('🔗 [ScrollingMosaic] Base URL:', baseUrl);

        const allPhotos: string[] = [];
        const foldersToCheck: string[] = [];

        // Step 2: Build list of folders to check (handle nested structure)
        if (rootItems && rootItems.length > 0) {
          for (const item of rootItems) {
            // Skip files
            if (item.id) {
              console.log(`⏭️  [ScrollingMosaic] Skipping file at root: ${item.name}`);
              continue;
            }

            // Check if this folder contains images or subfolders
            const { data: subItems } = await supabase.storage
              .from('ai_gallery')
              .list(item.name, { limit: 10 });

            if (subItems && subItems.length > 0) {
              const hasImages = subItems.some(subItem => 
                subItem.id && subItem.name.match(/\.(jpg|jpeg|png|webp)$/i)
              );
              
              const hasSubfolders = subItems.some(subItem => !subItem.id);

              console.log(`📁 [ScrollingMosaic] Folder "${item.name}":`, {
                hasImages,
                hasSubfolders,
                itemCount: subItems.length
              });

              if (hasImages) {
                // Folder contains images directly
                foldersToCheck.push(item.name);
                console.log(`✅ [ScrollingMosaic] Added folder with images: ${item.name}`);
              } else if (hasSubfolders) {
                // Folder contains subfolders (like "categories/")
                console.log(`🗂️  [ScrollingMosaic] Descending into "${item.name}" for subfolders...`);
                for (const subFolder of subItems) {
                  if (!subFolder.id) {
                    const fullPath = `${item.name}/${subFolder.name}`;
                    foldersToCheck.push(fullPath);
                    console.log(`✅ [ScrollingMosaic] Added subfolder: ${fullPath}`);
                  }
                }
              }
            }
          }
        }

        console.log(`📋 [ScrollingMosaic] Total folders to check: ${foldersToCheck.length}`, foldersToCheck);

        // Step 3: Fetch photos from each folder
        for (const folderPath of foldersToCheck) {
          console.log(`🔎 [ScrollingMosaic] Listing files in: ${folderPath}`);
          
          const { data: files, error } = await supabase.storage
            .from('ai_gallery')
            .list(folderPath, {
              limit: 3,
              sortBy: { column: 'created_at', order: 'desc' }
            });

          if (error) {
            console.error(`❌ [ScrollingMosaic] Error listing ${folderPath}:`, error);
            continue;
          }

          console.log(`📄 [ScrollingMosaic] Found ${files?.length || 0} items in ${folderPath}`);

          if (files && files.length > 0) {
            for (const file of files) {
              // Skip folders and non-image files
              if (!file.id) {
                console.log(`⏭️  [ScrollingMosaic] Skipping subfolder in ${folderPath}: ${file.name}`);
                continue;
              }
              if (!file.name.match(/\.(jpg|jpeg|png|webp)$/i)) {
                console.log(`⏭️  [ScrollingMosaic] Skipping non-image in ${folderPath}: ${file.name}`);
                continue;
              }
              
              const publicUrl = `${baseUrl}/${folderPath}/${file.name}`;
              console.log(`✅ [ScrollingMosaic] Added photo: ${publicUrl}`);
              allPhotos.push(publicUrl);
            }
          }
        }

        console.log(`📸 [ScrollingMosaic] Total photos collected: ${allPhotos.length}`);

        // Shuffle photos for variety
        const shuffled = allPhotos.sort(() => Math.random() - 0.5);
        
        // Use first 15 photos or fallback (silently use fallback if not enough photos)
        if (shuffled.length >= 10) {
          setMosaicPhotos(shuffled.slice(0, 15));
          console.log(`✅ [ScrollingMosaic] Loaded ${shuffled.length} photos from gallery`);
        } else {
          // Silently use fallback photos without warning
          setMosaicPhotos(fallbackPhotos);
          if (shuffled.length > 0) {
            console.log(`ℹ️ [ScrollingMosaic] Using fallback photos (found ${shuffled.length} gallery photos)`);
          }
        }
      } catch (error) {
        // Silently use fallback on error (no need to alarm users)
        setMosaicPhotos(fallbackPhotos);
      } finally {
        setIsLoading(false);
      }
    }

    fetchGalleryPhotos();
  }, []);

  // Use fallback during loading
  const displayPhotos = isLoading || mosaicPhotos.length === 0 ? fallbackPhotos : mosaicPhotos;
  
  // Quadruple for continuous seamless scroll
  const allPhotos = [...displayPhotos, ...displayPhotos, ...displayPhotos, ...displayPhotos];

  return (
    <div className="relative w-full py-6 overflow-hidden bg-black" style={{ contain: 'layout style paint' }}>
      {/* Edge fade masks - optimized with will-change */}
      <div className="absolute left-0 top-0 bottom-0 w-32 bg-gradient-to-r from-black to-transparent pointer-events-none z-10" style={{ willChange: 'auto' }} />
      <div className="absolute right-0 top-0 bottom-0 w-32 bg-gradient-to-l from-black to-transparent pointer-events-none z-10" style={{ willChange: 'auto' }} />

      {/* Top Row - Scrolling Left - Optimized with CSS animation */}
      <div className="flex gap-3 mb-3 animate-scroll-left" style={{ width: 'max-content', willChange: 'transform' }}>
        {/* Triple the images for seamless infinite scroll */}
        {[...allPhotos, ...allPhotos, ...allPhotos].map((photo, index) => {
          const originalIndex = index % 15;
          
          return (
            <div
              key={`top-${index}`}
              className="relative flex-shrink-0 w-40 h-48 rounded-2xl overflow-hidden shadow-lg group"
              style={{ 
                transform: 'translate3d(0, 0, 0)',
                backfaceVisibility: 'hidden',
                WebkitBackfaceVisibility: 'hidden'
              }}
            >
              <LazyImage
                src={photo}
                alt={`AI Generated Photo ${index + 1}`}
                className="w-full h-full object-cover cursor-pointer"
                onClick={() => onPhotoClick?.(originalIndex, photo)}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent pointer-events-none" />
              
              {/* Simplified hover overlay - no blur for better performance */}
              <div 
                className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-200 cursor-pointer"
                onClick={() => onPhotoClick?.(originalIndex, photo)}
              >
                <div className="bg-black/90 px-3 py-1.5 rounded-full border border-pink-500/30">
                  <p className="text-white text-xs">View Style</p>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Center Text Overlay - simplified blur */}
      <div className="absolute inset-0 flex items-center justify-center z-20 pointer-events-none">
        <div className="bg-black/90 backdrop-blur-md border border-pink-500/30 rounded-3xl px-6 py-4 shadow-2xl shadow-pink-500/20">
          <h2 className="text-2xl md:text-3xl lg:text-4xl mb-1 text-center">
            <span className="bg-gradient-to-r from-pink-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
              50,000+
            </span>
            <span className="text-white"> AI Photos</span>
          </h2>
          <p className="text-gray-300 text-center text-xs md:text-sm">
            Created by real users worldwide
          </p>
        </div>
      </div>

      {/* Bottom Row - Scrolling Right - Optimized with CSS animation */}
      <div className="flex gap-3 animate-scroll-right" style={{ width: 'max-content', willChange: 'transform' }}>
        {/* Triple the images for seamless infinite scroll */}
        {[...allPhotos, ...allPhotos, ...allPhotos].map((photo, index) => {
          const originalIndex = index % 15;
          
          return (
            <div
              key={`bottom-${index}`}
              className="relative flex-shrink-0 w-40 h-48 rounded-2xl overflow-hidden shadow-lg group"
              style={{ 
                transform: 'translate3d(0, 0, 0)',
                backfaceVisibility: 'hidden',
                WebkitBackfaceVisibility: 'hidden'
              }}
            >
              <LazyImage
                src={photo}
                alt={`AI Generated Photo ${index + 6}`}
                className="w-full h-full object-cover cursor-pointer"
                onClick={() => onPhotoClick?.(originalIndex, photo)}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent pointer-events-none" />
              
              {/* Simplified hover overlay - no blur for better performance */}
              <div 
                className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-200 cursor-pointer"
                onClick={() => onPhotoClick?.(originalIndex, photo)}
              >
                <div className="bg-black/90 px-3 py-1.5 rounded-full border border-pink-500/30">
                  <p className="text-white text-xs">View Style</p>
                </div>
              </div>
            </div>
          );
        })}
      </div>
      
      <style>{`
        @keyframes scroll-left {
          from {
            transform: translate3d(0, 0, 0);
          }
          to {
            transform: translate3d(-33.333%, 0, 0);
          }
        }
        
        @keyframes scroll-right {
          from {
            transform: translate3d(-33.333%, 0, 0);
          }
          to {
            transform: translate3d(0, 0, 0);
          }
        }
        
        .animate-scroll-left {
          animation: scroll-left 100s linear infinite;
        }
        
        .animate-scroll-right {
          animation: scroll-right 100s linear infinite;
        }
        
        /* Pause animation on hover for better UX */
        .animate-scroll-left:hover,
        .animate-scroll-right:hover {
          animation-play-state: paused;
        }
      `}</style>
    </div>
  );
}