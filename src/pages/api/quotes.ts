import type { APIRoute } from "astro";
import { z } from "zod";
import { sendQuoteEmail } from "@/lib/server/mailgun";
import { validateNonce } from "@/lib/server/nonce";
import { checkRateLimit, getClientIp } from "@/lib/server/rateLimit";

const quoteRequestSchema = z.object({
  name: z.string().min(1, "Name is required"),
  email: z.string().email("Invalid email address"),
  projectType: z.string().min(1, "Project type is required"),
  budget: z.string().min(1, "Budget range is required"),
  message: z.string().min(10, "Please provide more details about your project"),
  // Honeypot field - should always be empty for legitimate submissions
  website: z.string().max(0, "Invalid submission").optional(),
});

function jsonResponse(
  status: number,
  body: object,
  extraHeaders?: Record<string, string>
): Response {
  return new Response(JSON.stringify(body), {
    status,
    headers: {
      "Content-Type": "application/json",
      ...extraHeaders,
    },
  });
}

export const POST: APIRoute = async ({ request }) => {
  try {
    // 1. Validate nonce from header
    const nonce = request.headers.get("x-form-nonce");
    const nonceResult = validateNonce(nonce);
    if (!nonceResult.valid) {
      console.warn("Nonce validation failed:", nonceResult.error);
      return jsonResponse(400, {
        error: "Invalid request",
        message: "Please refresh the page and try again.",
      });
    }

    // 2. Check rate limit
    const clientIp = getClientIp(request);
    const rateLimitResult = checkRateLimit(clientIp);
    if (!rateLimitResult.allowed) {
      console.warn(`Rate limit exceeded for IP: ${clientIp}`);
      return jsonResponse(
        429,
        {
          error: "Too many requests",
          message: "Please wait before submitting another request.",
        },
        {
          "X-RateLimit-Remaining": "0",
          "X-RateLimit-Reset": rateLimitResult.resetAt.toString(),
        }
      );
    }

    // 3. Parse request body
    let parsedBody: unknown;
    try {
      parsedBody = await request.json();
    } catch {
      return jsonResponse(400, { error: "Invalid JSON in request body" });
    }

    // 4. Validate with zod schema (includes honeypot check)
    const result = quoteRequestSchema.safeParse(parsedBody);
    if (!result.success) {
      const errors = result.error.flatten().fieldErrors;

      // If honeypot field was filled, log it but return generic error
      if (errors.website) {
        console.warn("Honeypot triggered:", { ip: clientIp });
        return jsonResponse(400, {
          error: "Invalid submission",
          message: "Your request could not be processed.",
        });
      }

      return jsonResponse(400, {
        error: "Validation failed",
        details: errors,
      });
    }

    // 5. Send email via Mailgun (exclude honeypot field)
    const { website: _honeypot, ...emailData } = result.data;
    await sendQuoteEmail(emailData);

    return jsonResponse(
      200,
      {
        success: true,
        message: "Quote request submitted successfully",
      },
      {
        "X-RateLimit-Remaining": rateLimitResult.remaining.toString(),
      }
    );
  } catch (error) {
    console.error("Error processing quote request:", error);

    return jsonResponse(500, {
      error: "Internal server error",
      message: "Failed to process quote request. Please try again later.",
    });
  }
};

// Disable prerendering for this API route
export const prerender = false;
