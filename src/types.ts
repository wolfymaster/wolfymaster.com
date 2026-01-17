import { z } from "zod";

export interface TwitchStreamStatus {
  isLive: boolean;
  title?: string;
  viewerCount?: number;
}

export interface TwitchScheduleSegment {
  id: string;
  title: string;
  startTime: string;
  category?: string;
}

export interface Project {
  id: string;
  title: string;
  description: string;
  technologies: string[];
  liveUrl?: string;
  githubUrl?: string;
  featured?: boolean;
  industry?: string;
}

export const insertQuoteRequestSchema = z.object({
  name: z.string().min(1, "Name is required"),
  email: z.string().email("Invalid email address"),
  projectType: z.string().min(1, "Project type is required"),
  budget: z.string().min(1, "Budget range is required"),
  message: z.string().min(10, "Please provide more details about your project"),
  // Honeypot field - should always be empty for legitimate submissions
  website: z.string().optional(),
});

export type InsertQuoteRequest = z.infer<typeof insertQuoteRequestSchema>;
