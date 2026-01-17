/**
 * Simple in-memory rate limiter.
 *
 * Note: This works for single-instance deployments. For production with
 * multiple instances (e.g., load-balanced or serverless), use a shared
 * store like Redis/Upstash or a database.
 */

const RATE_LIMIT_MAX = 5;
const RATE_LIMIT_WINDOW_MS = 10 * 60 * 1000; // 10 minutes

interface RateLimitEntry {
  timestamps: number[];
}

// In-memory store - cleared on server restart
const rateLimitStore = new Map<string, RateLimitEntry>();

// Cleanup old entries periodically (every 5 minutes)
setInterval(() => {
  const now = Date.now();
  const windowStart = now - RATE_LIMIT_WINDOW_MS;

  for (const [key, entry] of rateLimitStore.entries()) {
    entry.timestamps = entry.timestamps.filter(ts => ts > windowStart);
    if (entry.timestamps.length === 0) {
      rateLimitStore.delete(key);
    }
  }
}, 5 * 60 * 1000);

export interface RateLimitResult {
  allowed: boolean;
  remaining: number;
  resetAt: number;
}

export function checkRateLimit(ip: string): RateLimitResult {
  const now = Date.now();
  const windowStart = now - RATE_LIMIT_WINDOW_MS;

  // Get or create entry
  let entry = rateLimitStore.get(ip);
  if (!entry) {
    entry = { timestamps: [] };
    rateLimitStore.set(ip, entry);
  }

  // Filter timestamps within the sliding window
  entry.timestamps = entry.timestamps.filter(ts => ts > windowStart);

  // Check if rate limit exceeded
  if (entry.timestamps.length >= RATE_LIMIT_MAX) {
    const oldestInWindow = Math.min(...entry.timestamps);
    const resetAt = oldestInWindow + RATE_LIMIT_WINDOW_MS;
    return {
      allowed: false,
      remaining: 0,
      resetAt,
    };
  }

  // Add current timestamp
  entry.timestamps.push(now);

  return {
    allowed: true,
    remaining: RATE_LIMIT_MAX - entry.timestamps.length,
    resetAt: now + RATE_LIMIT_WINDOW_MS,
  };
}

export function getClientIp(request: Request): string {
  // Try common headers for proxied requests
  const forwardedFor = request.headers.get("x-forwarded-for");
  if (forwardedFor) {
    return forwardedFor.split(",")[0].trim();
  }

  const realIp = request.headers.get("x-real-ip");
  if (realIp) {
    return realIp;
  }

  // Cloudflare
  const cfIp = request.headers.get("cf-connecting-ip");
  if (cfIp) {
    return cfIp;
  }

  return "unknown";
}
