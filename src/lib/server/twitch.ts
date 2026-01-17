/**
 * Twitch API client for fetching stream status and schedule.
 *
 * Required environment variables:
 * - TWITCH_CLIENT_ID: Your Twitch application client ID
 * - TWITCH_CLIENT_SECRET: Your Twitch application client secret
 * - TWITCH_BROADCASTER_ID: The broadcaster's Twitch user ID
 */

const TWITCH_API_BASE = "https://api.twitch.tv/helix";
const TWITCH_AUTH_URL = "https://id.twitch.tv/oauth2/token";

// Cache for the app access token
let cachedToken: { token: string; expiresAt: number } | null = null;

/**
 * Gets an app access token from Twitch, caching it until expiry.
 */
async function getAppAccessToken(): Promise<string> {
  const clientId = import.meta.env.TWITCH_CLIENT_ID;
  const clientSecret = import.meta.env.TWITCH_CLIENT_SECRET;

  if (!clientId || !clientSecret) {
    throw new Error("Twitch credentials not configured");
  }

  // Return cached token if still valid (with 5 min buffer)
  if (cachedToken && cachedToken.expiresAt > Date.now() + 5 * 60 * 1000) {
    return cachedToken.token;
  }

  const params = new URLSearchParams({
    client_id: clientId,
    client_secret: clientSecret,
    grant_type: "client_credentials",
  });

  const response = await fetch(TWITCH_AUTH_URL, {
    method: "POST",
    body: params,
  });

  if (!response.ok) {
    throw new Error(`Failed to get Twitch access token: ${response.status}`);
  }

  const data = await response.json();
  cachedToken = {
    token: data.access_token,
    expiresAt: Date.now() + data.expires_in * 1000,
  };

  return cachedToken.token;
}

/**
 * Makes an authenticated request to the Twitch API.
 */
async function twitchApiRequest<T>(endpoint: string): Promise<T> {
  const clientId = import.meta.env.TWITCH_CLIENT_ID;
  const token = await getAppAccessToken();

  const response = await fetch(`${TWITCH_API_BASE}${endpoint}`, {
    headers: {
      "Client-ID": clientId,
      Authorization: `Bearer ${token}`,
    },
  });

  if (!response.ok) {
    throw new Error(`Twitch API error: ${response.status}`);
  }

  return response.json();
}

export interface TwitchStreamStatus {
  isLive: boolean;
  title?: string;
  viewerCount?: number;
}

interface TwitchStreamsResponse {
  data: Array<{
    id: string;
    user_id: string;
    user_login: string;
    user_name: string;
    game_id: string;
    game_name: string;
    type: string;
    title: string;
    viewer_count: number;
    started_at: string;
    language: string;
    thumbnail_url: string;
    is_mature: boolean;
  }>;
}

/**
 * Gets the current stream status for the configured broadcaster.
 */
export async function getStreamStatus(): Promise<TwitchStreamStatus> {
  const broadcasterId = import.meta.env.TWITCH_BROADCASTER_ID;

  if (!broadcasterId) {
    console.warn("TWITCH_BROADCASTER_ID not configured");
    return { isLive: false };
  }

  try {
    const response = await twitchApiRequest<TwitchStreamsResponse>(
      `/streams?user_id=${broadcasterId}`
    );

    if (response.data && response.data.length > 0) {
      const stream = response.data[0];
      return {
        isLive: true,
        title: stream.title,
        viewerCount: stream.viewer_count,
      };
    }

    return { isLive: false };
  } catch (error) {
    console.error("Error fetching Twitch stream status:", error);
    return { isLive: false };
  }
}

export interface TwitchScheduleSegment {
  id: string;
  title: string;
  startTime: string;
  category?: string;
}

interface TwitchScheduleResponse {
  data: {
    segments: Array<{
      id: string;
      start_time: string;
      end_time: string;
      title: string;
      canceled_until: string | null;
      category: {
        id: string;
        name: string;
      } | null;
      is_recurring: boolean;
    }> | null;
    broadcaster_id: string;
    broadcaster_name: string;
    broadcaster_login: string;
    vacation: null | {
      start_time: string;
      end_time: string;
    };
  };
}

/**
 * Gets the upcoming schedule for the configured broadcaster.
 */
export async function getSchedule(): Promise<TwitchScheduleSegment[]> {
  const broadcasterId = import.meta.env.TWITCH_BROADCASTER_ID;

  if (!broadcasterId) {
    console.warn("TWITCH_BROADCASTER_ID not configured");
    return [];
  }

  try {
    const response = await twitchApiRequest<TwitchScheduleResponse>(
      `/schedule?broadcaster_id=${broadcasterId}`
    );

    if (!response.data?.segments) {
      return [];
    }

    // Filter out canceled segments and map to our format
    return response.data.segments
      .filter((segment) => !segment.canceled_until)
      .slice(0, 10) // Limit to next 10 segments
      .map((segment) => ({
        id: segment.id,
        title: segment.title,
        startTime: segment.start_time,
        category: segment.category?.name,
      }));
  } catch (error) {
    console.error("Error fetching Twitch schedule:", error);
    return [];
  }
}
