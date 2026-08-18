/**
 * IndexedDB-backed cache for processed product images.
 * Stores background-removed image blobs keyed by original URL.
 * Each image is processed only once per browser — subsequent loads are instant.
 */

const DB_NAME = 'ProductImageCache';
const DB_VERSION = 1;
const STORE_NAME = 'processedImages';

function openDB() {
  return new Promise((resolve, reject) => {
    const request = indexedDB.open(DB_NAME, DB_VERSION);

    request.onupgradeneeded = (e) => {
      const db = e.target.result;
      if (!db.objectStoreNames.contains(STORE_NAME)) {
        db.createObjectStore(STORE_NAME);
      }
    };

    request.onsuccess = () => resolve(request.result);
    request.onerror = () => reject(request.error);
  });
}

/**
 * Retrieve a cached processed image blob URL.
 * @param {string} originalUrl - The original image URL used as the cache key.
 * @returns {Promise<string|null>} Object URL of the cached blob, or null if not cached.
 */
export async function getCachedImage(originalUrl) {
  try {
    const db = await openDB();
    return new Promise((resolve) => {
      const tx = db.transaction(STORE_NAME, 'readonly');
      const store = tx.objectStore(STORE_NAME);
      const request = store.get(originalUrl);

      request.onsuccess = () => {
        if (request.result) {
          resolve(URL.createObjectURL(request.result));
        } else {
          resolve(null);
        }
      };
      request.onerror = () => resolve(null);
    });
  } catch {
    return null;
  }
}

/**
 * Store a processed image blob in the cache.
 * @param {string} originalUrl - The original image URL (cache key).
 * @param {Blob} blob - The processed image blob to cache.
 */
export async function setCachedImage(originalUrl, blob) {
  try {
    const db = await openDB();
    return new Promise((resolve, reject) => {
      const tx = db.transaction(STORE_NAME, 'readwrite');
      const store = tx.objectStore(STORE_NAME);
      const request = store.put(blob, originalUrl);

      request.onsuccess = () => resolve();
      request.onerror = () => reject(request.error);
    });
  } catch {
    // Silently fail — caching is best-effort
  }
}

/**
 * Clear the entire image cache (useful for admin/debug).
 */
export async function clearImageCache() {
  try {
    const db = await openDB();
    return new Promise((resolve) => {
      const tx = db.transaction(STORE_NAME, 'readwrite');
      const store = tx.objectStore(STORE_NAME);
      store.clear();
      tx.oncomplete = () => resolve();
    });
  } catch {
    // Silently fail
  }
}
