import type { APIGatewayProxyEvent, APIGatewayProxyResult } from "aws-lambda";
import { z } from "zod";
import { sendQuoteEmail } from "../lib/mailgun";
import { validateNonce } from "../lib/nonce";
import { checkRateLimit } from "../lib/rateLimit";

const quoteRequestSchema = z.object({
  name: z.string().min(1, "Name is required"),
  email: z.string().email("Invalid email address"),
  projectType: z.string().min(1, "Project type is required"),
  budget: z.string().min(1, "Budget range is required"),
  message: z.string().min(10, "Please provide more details about your project"),
  // Honeypot field - should always be empty for legitimate submissions
  website: z.string().max(0, "Invalid submission").optional(),
});

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "Content-Type, X-Form-Nonce",
  "Access-Control-Allow-Methods": "POST, OPTIONS",
};

function jsonResponse(
  statusCode: number,
  body: object,
  extraHeaders?: Record<string, string>
): APIGatewayProxyResult {
  return {
    statusCode,
    headers: {
      "Content-Type": "application/json",
      ...corsHeaders,
      ...extraHeaders,
    },
    body: JSON.stringify(body),
  };
}

function getClientIp(event: APIGatewayProxyEvent): string {
  // Try to get the real IP from various headers
  const forwardedFor = event.headers["X-Forwarded-For"] || event.headers["x-forwarded-for"];
  if (forwardedFor) {
    // X-Forwarded-For can contain multiple IPs; the first one is the client
    return forwardedFor.split(",")[0].trim();
  }

  return event.requestContext.identity?.sourceIp || "unknown";
}

export async function handler(
  event: APIGatewayProxyEvent
): Promise<APIGatewayProxyResult> {
  // Handle preflight OPTIONS request
  if (event.httpMethod === "OPTIONS") {
    return {
      statusCode: 200,
      headers: corsHeaders,
      body: "",
    };
  }

  try {
    // 1. Validate nonce from header
    const nonce = event.headers["X-Form-Nonce"] || event.headers["x-form-nonce"];
    const nonceResult = validateNonce(nonce);
    if (!nonceResult.valid) {
      console.warn("Nonce validation failed:", nonceResult.error);
      return jsonResponse(400, {
        error: "Invalid request",
        message: "Please refresh the page and try again.",
      });
    }

    // 2. Check rate limit
    const clientIp = getClientIp(event);
    const rateLimitResult = await checkRateLimit(clientIp);
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
    if (!event.body) {
      return jsonResponse(400, { error: "Request body is required" });
    }

    let parsedBody: unknown;
    try {
      parsedBody = JSON.parse(event.body);
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
}
