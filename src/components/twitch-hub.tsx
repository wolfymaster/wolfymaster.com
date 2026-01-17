import { useQuery } from "@tanstack/react-query";
import { ExternalLink, Calendar, Users, Video, Radio } from "lucide-react";
import { SiTwitch } from "react-icons/si";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import type { TwitchStreamStatus, TwitchScheduleSegment } from "@/types";

const streamFeatures = [
  "Live coding sessions",
  "Open source development",
  "Tech discussions",
  "Community hangouts",
];

export function TwitchHub() {
  const { data: streamStatus } = useQuery<TwitchStreamStatus>({
    queryKey: ["/api/twitch/status"],
    refetchInterval: 60000,
  });

  const { data: schedule } = useQuery<TwitchScheduleSegment[]>({
    queryKey: ["/api/twitch/schedule"],
    refetchInterval: 300000,
  });

  return (
    <section id="twitch" className="py-24 bg-accent/30 dark:bg-accent/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <Badge className="mb-4 bg-accent/10 text-accent border-accent/20" data-testid="badge-twitch">
            <SiTwitch className="w-3 h-3 mr-1" />
            Live Content
          </Badge>
          <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-4" data-testid="heading-twitch">
            Join the Live Coding Sessions
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto" data-testid="text-twitch-description">
            Watch me build real projects live on Twitch. Ask questions, learn techniques, 
            and hang out with the community.
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-6">
            <Card className="overflow-hidden border-accent/20 bg-accent/5 dark:bg-accent/10">
              <CardContent className="p-0">
                <div className="aspect-video bg-gradient-to-br from-accent/80 to-primary/80 dark:from-accent/60 dark:to-primary/60 flex items-center justify-center relative">
                  <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:30px_30px]" />
                  
                  {streamStatus?.isLive ? (
                    <div className="relative z-10 text-center">
                      <div className="flex items-center justify-center gap-2 mb-4 flex-wrap" data-testid="status-twitch-live">
                        <span className="relative flex h-4 w-4">
                          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-destructive opacity-75" />
                          <span className="relative inline-flex rounded-full h-4 w-4 bg-destructive" />
                        </span>
                        <span className="text-primary-foreground font-bold text-lg" data-testid="text-live-status">LIVE NOW</span>
                      </div>
                      {streamStatus.title && (
                        <p className="text-primary-foreground/80 mb-2" data-testid="text-live-title">{streamStatus.title}</p>
                      )}
                      {streamStatus.viewerCount !== undefined && (
                        <div className="flex items-center justify-center gap-1 text-primary-foreground/60 mb-6 flex-wrap" data-testid="status-viewer-count">
                          <Users className="h-4 w-4" />
                          <span data-testid="text-viewer-count">{streamStatus.viewerCount.toLocaleString()} watching</span>
                        </div>
                      )}
                      <a
                        href="https://twitch.tv/wolfymaster"
                        target="_blank"
                        rel="noopener noreferrer"
                        data-testid="link-twitch-join-live"
                      >
                        <Button>
                          <Radio className="h-4 w-4 mr-2" />
                          Join Stream Now
                        </Button>
                      </a>
                    </div>
                  ) : (
                    <div className="relative z-10 text-center p-8">
                      <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-background/10 backdrop-blur-lg flex items-center justify-center border border-background/20" data-testid="twitch-logo-offline">
                        <SiTwitch className="w-10 h-10 text-primary-foreground" />
                      </div>
                      <h3 className="text-2xl font-bold text-primary-foreground mb-2" data-testid="text-twitch-handle">
                        @wolfymaster
                      </h3>
                      <p className="text-primary-foreground/70 mb-6" data-testid="text-offline-message">
                        Currently offline. Follow to get notified when I go live!
                      </p>
                      <a
                        href="https://twitch.tv/wolfymaster"
                        target="_blank"
                        rel="noopener noreferrer"
                        data-testid="link-twitch-channel"
                      >
                        <Button>
                          <SiTwitch className="h-4 w-4 mr-2" />
                          Follow on Twitch
                          <ExternalLink className="h-3 w-3 ml-2" />
                        </Button>
                      </a>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>

            <div className="grid sm:grid-cols-2 gap-4">
              {streamFeatures.map((feature, index) => (
                <div
                  key={feature}
                  className="flex items-center gap-3 p-4 rounded-lg bg-muted/50 border border-border flex-wrap"
                  data-testid={`stream-feature-${index}`}
                >
                  <Video className="h-5 w-5 text-accent" />
                  <span className="text-foreground" data-testid={`text-stream-feature-${index}`}>{feature}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="space-y-6">
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center gap-2 mb-4 flex-wrap">
                  <Calendar className="h-5 w-5 text-accent" />
                  <h3 className="font-semibold text-foreground" data-testid="heading-stream-schedule">Stream Schedule</h3>
                </div>
                
                {schedule && schedule.length > 0 ? (
                  <div className="space-y-3">
                    {schedule.slice(0, 5).map((segment) => (
                      <div
                        key={segment.id}
                        className="p-3 rounded-lg bg-muted/50 border border-border"
                        data-testid={`schedule-item-${segment.id}`}
                      >
                        <p className="font-medium text-sm text-foreground" data-testid={`text-schedule-title-${segment.id}`}>
                          {segment.title}
                        </p>
                        <p className="text-xs text-muted-foreground mt-1" data-testid={`text-schedule-time-${segment.id}`}>
                          {new Date(segment.startTime).toLocaleDateString(undefined, {
                            weekday: "short",
                            month: "short",
                            day: "numeric",
                            hour: "numeric",
                            minute: "2-digit",
                          })}
                        </p>
                        {segment.category && (
                          <Badge variant="outline" className="mt-2 text-xs" data-testid={`badge-schedule-category-${segment.id}`}>
                            {segment.category}
                          </Badge>
                        )}
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-8">
                    <Calendar className="h-12 w-12 mx-auto text-muted-foreground/40 mb-3" />
                    <p className="text-sm text-muted-foreground">
                      Check Twitch for the latest schedule
                    </p>
                  </div>
                )}

                <a
                  href="https://twitch.tv/wolfymaster/schedule"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block mt-4"
                  data-testid="link-twitch-schedule"
                >
                  <Button variant="outline" size="sm" className="w-full">
                    View Full Schedule
                    <ExternalLink className="h-3 w-3 ml-2" />
                  </Button>
                </a>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <h3 className="font-semibold text-foreground mb-4" data-testid="heading-why-watch">
                  Why Watch?
                </h3>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  <li className="flex items-start gap-2 flex-wrap" data-testid="text-why-watch-0">
                    <div className="w-1.5 h-1.5 rounded-full bg-accent mt-2" />
                    Learn real-world development techniques
                  </li>
                  <li className="flex items-start gap-2 flex-wrap" data-testid="text-why-watch-1">
                    <div className="w-1.5 h-1.5 rounded-full bg-accent mt-2" />
                    See how Woofx3 is built from scratch
                  </li>
                  <li className="flex items-start gap-2 flex-wrap" data-testid="text-why-watch-2">
                    <div className="w-1.5 h-1.5 rounded-full bg-accent mt-2" />
                    Ask questions and get real-time answers
                  </li>
                  <li className="flex items-start gap-2 flex-wrap" data-testid="text-why-watch-3">
                    <div className="w-1.5 h-1.5 rounded-full bg-accent mt-2" />
                    Join a supportive developer community
                  </li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
}
