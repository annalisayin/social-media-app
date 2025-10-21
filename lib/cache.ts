// lib/cache.ts
/* eslint-disable @typescript-eslint/no-explicit-any */
type CacheEntry = { value: any; expiresAt: number | null };

const cache = new Map<string, CacheEntry>();

export function setCache(key: string, value: any, ttlSeconds?: number) {
  const expiresAt = ttlSeconds ? Date.now() + ttlSeconds * 1000 : null;
  cache.set(key, { value, expiresAt });
}

export function getCache(key: string) {
  const entry = cache.get(key);
  if (!entry) return null;
  if (entry.expiresAt && Date.now() > entry.expiresAt) {
    cache.delete(key);
    return null;
  }
  return entry.value;
}

export function clearCache(key?: string) {
  if (key) cache.delete(key);
  else cache.clear();
}
