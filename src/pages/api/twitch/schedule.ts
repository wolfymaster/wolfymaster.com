import type { APIRoute } from "astro";
import { getSchedule } from "@/lib/server/twitch";

export const prerender = false;

export const GET: APIRoute = async () => {
  try {
    const schedule = await getSchedule();

    return new Response(JSON.stringify(schedule), {
      status: 200,
      headers: {
        "Content-Type": "application/json",
        "Cache-Control": "public, max-age=300", // Cache for 5 minutes
      },
    });
  } catch (error) {
    console.error("Error in /api/twitch/schedule:", error);

    return new Response(
      JSON.stringify({ segments: [], error: "Failed to fetch schedule" }),
      {
        status: 500,
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
  }
};
