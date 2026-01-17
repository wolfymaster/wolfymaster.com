import { DynamoDBClient } from "@aws-sdk/client-dynamodb";
import {
  DynamoDBDocumentClient,
  GetCommand,
  PutCommand,
} from "@aws-sdk/lib-dynamodb";

const client = new DynamoDBClient({});
const docClient = DynamoDBDocumentClient.from(client);

const RATE_LIMIT_MAX = 5;
const RATE_LIMIT_WINDOW_MS = 10 * 60 * 1000; // 10 minutes

interface RateLimitRecord {
  pk: string;
  timestamps: number[];
  ttl: number;
}

export interface RateLimitResult {
  allowed: boolean;
  remaining: number;
  resetAt: number;
}

export async function checkRateLimit(ip: string): Promise<RateLimitResult> {
  const tableName = process.env.RATE_LIMIT_TABLE;
  if (!tableName) {
    console.warn("RATE_LIMIT_TABLE not configured, allowing request");
    return { allowed: true, remaining: RATE_LIMIT_MAX, resetAt: 0 };
  }

  const pk = `ip#${ip}`;
  const now = Date.now();
  const windowStart = now - RATE_LIMIT_WINDOW_MS;

  // Get existing record
  const getResult = await docClient.send(
    new GetCommand({
      TableName: tableName,
      Key: { pk },
    })
  );

  const existingRecord = getResult.Item as RateLimitRecord | undefined;

  // Filter timestamps within the sliding window
  const recentTimestamps = existingRecord?.timestamps?.filter(
    (ts) => ts > windowStart
  ) || [];

  // Check if rate limit exceeded
  if (recentTimestamps.length >= RATE_LIMIT_MAX) {
    const oldestInWindow = Math.min(...recentTimestamps);
    const resetAt = oldestInWindow + RATE_LIMIT_WINDOW_MS;
    return {
      allowed: false,
      remaining: 0,
      resetAt,
    };
  }

  // Add current timestamp and update record
  const updatedTimestamps = [...recentTimestamps, now];
  const ttl = Math.floor((now + RATE_LIMIT_WINDOW_MS) / 1000); // TTL in seconds

  await docClient.send(
    new PutCommand({
      TableName: tableName,
      Item: {
        pk,
        timestamps: updatedTimestamps,
        ttl,
      },
    })
  );

  return {
    allowed: true,
    remaining: RATE_LIMIT_MAX - updatedTimestamps.length,
    resetAt: now + RATE_LIMIT_WINDOW_MS,
  };
}
