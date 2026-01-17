/**
 * Generates a nonce for form submission protection.
 * Format: timestamp.signature
 * Where signature = HMAC-SHA256(timestamp, secret)
 */
export async function generateNonce(): Promise<string> {
  const secret = import.meta.env.VITE_NONCE_SECRET;

  if (!secret) {
    console.warn("VITE_NONCE_SECRET not configured");
    return "";
  }

  const timestamp = Date.now().toString();

  // Create HMAC-SHA256 signature using Web Crypto API
  const encoder = new TextEncoder();
  const keyData = encoder.encode(secret);
  const messageData = encoder.encode(timestamp);

  const key = await crypto.subtle.importKey(
    "raw",
    keyData,
    { name: "HMAC", hash: "SHA-256" },
    false,
    ["sign"]
  );

  const signature = await crypto.subtle.sign("HMAC", key, messageData);

  // Convert signature to hex string
  const signatureHex = Array.from(new Uint8Array(signature))
    .map((b) => b.toString(16).padStart(2, "0"))
    .join("");

  return `${timestamp}.${signatureHex}`;
}
