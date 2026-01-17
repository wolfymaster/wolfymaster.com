import type { APIRoute } from "astro";
import { getStreamStatus } from "@/lib/server/twitch";

export const prerender = false;

export const GET: APIRoute = async () => {
  try {
    const status = await getStreamStatus();

    return new Response(JSON.stringify(status), {
      status: 200,
      headers: {
        "Content-Type": "application/json",
        "Cache-Control": "public, max-age=30", // Cache for 30 seconds
      },
    });
  } catch (error) {
    console.error("Error in /api/twitch/status:", error);

    return new Response(
      JSON.stringify({ isLive: false, error: "Failed to fetch stream status" }),
      {
        status: 500,
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
  }
};
