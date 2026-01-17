import { useQuery } from "@tanstack/react-query";
import { ExternalLink, Radio, Calendar, Users } from "lucide-react";
import { Button } from "@/components/ui/button";
import type { TwitchStreamStatus } from "@/types";

export function TwitchLiveBar() {
  const { data: streamStatus, isLoading } = useQuery<TwitchStreamStatus>({
    queryKey: ["/api/twitch/status"],
    refetchInterval: 60000,
  });

  if (isLoading) {
    return (
      <div className="sticky top-16 z-40 bg-muted/50 border-b border-border backdrop-blur-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3">
          <div className="flex items-center justify-center gap-4">
            <div className="h-4 w-48 bg-muted rounded animate-pulse" />
          </div>
        </div>
      </div>
    );
  }

  const isLive = streamStatus?.isLive;

  return (
    <div className={`sticky top-16 z-40 border-b border-border backdrop-blur-md ${
      isLive 
        ? "bg-destructive/10 dark:bg-destructive/20" 
        : "bg-muted/50"
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3">
        <div className="flex flex-wrap items-center justify-center gap-4">
          {isLive ? (
            <>
              <div className="flex items-center gap-2 flex-wrap" data-testid="status-live-indicator">
                <span className="relative flex h-3 w-3">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-destructive opacity-75" />
                  <span className="relative inline-flex rounded-full h-3 w-3 bg-destructive" />
                </span>
                <span className="font-semibold text-destructive" data-testid="text-live-now">LIVE NOW</span>
              </div>
              
              {streamStatus?.title && (
                <span className="text-sm text-muted-foreground hidden sm:inline truncate max-w-xs" data-testid="text-stream-title">
                  {streamStatus.title}
                </span>
              )}
              
              {streamStatus?.viewerCount !== undefined && (
                <div className="flex items-center gap-1 text-sm text-muted-foreground flex-wrap" data-testid="text-viewer-count">
                  <Users className="h-3 w-3" />
                  <span data-testid="text-viewer-count-value">{streamStatus.viewerCount.toLocaleString()}</span>
                </div>
              )}

              <a
                href="https://twitch.tv/wolfymaster"
                target="_blank"
                rel="noopener noreferrer"
                data-testid="link-twitch-live"
              >
                <Button size="sm">
                  <Radio className="h-3 w-3 mr-1" />
                  Join Stream
                  <ExternalLink className="h-3 w-3 ml-1" />
                </Button>
              </a>
            </>
          ) : (
            <>
              <div className="flex items-center gap-2 text-muted-foreground flex-wrap" data-testid="status-offline-indicator">
                <Calendar className="h-4 w-4" />
                <span className="text-sm" data-testid="text-offline-schedule">Check Twitch for stream schedule</span>
              </div>
              <a
                href="https://twitch.tv/wolfymaster"
                target="_blank"
                rel="noopener noreferrer"
                data-testid="link-twitch-offline"
              >
                <Button size="sm" variant="outline">
                  Visit Channel
                  <ExternalLink className="h-3 w-3 ml-1" />
                </Button>
              </a>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
