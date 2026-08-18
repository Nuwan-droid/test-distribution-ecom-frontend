import { useState, useEffect, useRef } from 'react';
import { getCachedImage, setCachedImage } from '../utils/imageCache';

/**
 * Custom hook that processes a product image to remove its background.
 * 
 * Strategy (progressive enhancement):
 *   1. Immediately returns the original image URL (CSS mix-blend-mode handles it visually).
 *   2. Checks IndexedDB cache — if found, swaps to the cached transparent version instantly.
 *   3. If not cached, lazily loads the AI model and processes in the background.
 *   4. Stores the result in IndexedDB so future loads are instant.
 * 
 * The AI model (~40MB) is downloaded only on first use and browser-cached.
 * 
 * @param {string} imageUrl - The original product image URL.
 * @param {boolean} enabled - Whether to enable background removal (default: true).
 * @returns {{ processedSrc: string, isProcessed: boolean, isProcessing: boolean }}
 */
export default function useProcessedImage(imageUrl, enabled = true) {
  const [processedSrc, setProcessedSrc] = useState(imageUrl);
  const [isProcessed, setIsProcessed] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const abortRef = useRef(false);
  const urlRef = useRef(imageUrl);

  useEffect(() => {
    // Reset if URL changes
    urlRef.current = imageUrl;
    abortRef.current = false;
    setProcessedSrc(imageUrl);
    setIsProcessed(false);
    setIsProcessing(false);

    if (!enabled || !imageUrl) return;

    let objectUrl = null;

    const process = async () => {
      // Step 1: Check cache
      try {
        const cached = await getCachedImage(imageUrl);
        if (abortRef.current || urlRef.current !== imageUrl) return;

        if (cached) {
          objectUrl = cached;
          setProcessedSrc(cached);
          setIsProcessed(true);
          return; // Cache hit — done!
        }
      } catch {
        // Cache miss, continue to processing
      }

      // Step 2: Process with AI (lazy-load the heavy module)
      setIsProcessing(true);

      try {
        const { removeBackground } = await import('@imgly/background-removal');
        if (abortRef.current || urlRef.current !== imageUrl) return;

        const blob = await removeBackground(imageUrl);
        if (abortRef.current || urlRef.current !== imageUrl) return;

        // Step 3: Cache the result
        await setCachedImage(imageUrl, blob);

        objectUrl = URL.createObjectURL(blob);
        setProcessedSrc(objectUrl);
        setIsProcessed(true);
      } catch (err) {
        console.warn('[useProcessedImage] Background removal failed, using original:', err.message);
        // Falls back to original image — CSS mix-blend-mode still handles it
      } finally {
        if (urlRef.current === imageUrl) {
          setIsProcessing(false);
        }
      }
    };

    process();

    return () => {
      abortRef.current = true;
      if (objectUrl) {
        URL.revokeObjectURL(objectUrl);
      }
    };
  }, [imageUrl, enabled]);

  return { processedSrc, isProcessed, isProcessing };
}
