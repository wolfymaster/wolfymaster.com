import { createHmac } from "node:crypto";

const NONCE_VALIDITY_MS = 5 * 60 * 1000; // 5 minutes

/**
 * Validates a nonce from the frontend.
 * Nonce format: timestamp.signature
 * Where signature = HMAC-SHA256(timestamp, secret)
 */
export function validateNonce(nonce: string | null): {
  valid: boolean;
  error?: string;
} {
  const secret = import.meta.env.NONCE_SECRET;

  if (!secret) {
    console.warn("NONCE_SECRET not configured, skipping nonce validation");
    return { valid: true };
  }

  if (!nonce) {
    return { valid: false, error: "Missing nonce" };
  }

  const parts = nonce.split(".");
  if (parts.length !== 2) {
    return { valid: false, error: "Invalid nonce format" };
  }

  const [timestampStr, signature] = parts;
  const timestamp = parseInt(timestampStr, 10);

  if (Number.isNaN(timestamp)) {
    return { valid: false, error: "Invalid timestamp in nonce" };
  }

  // Check if nonce is within validity window
  const now = Date.now();
  const age = now - timestamp;

  if (age < 0) {
    return { valid: false, error: "Nonce timestamp is in the future" };
  }

  if (age > NONCE_VALIDITY_MS) {
    return { valid: false, error: "Nonce has expired" };
  }

  // Verify signature
  const expectedSignature = createHmac("sha256", secret)
    .update(timestampStr)
    .digest("hex");

  if (signature !== expectedSignature) {
    return { valid: false, error: "Invalid nonce signature" };
  }

  return { valid: true };
}
