import { useQuery } from "@tanstack/react-query";
import { ExternalLink, ArrowRight, ArrowDown } from "lucide-react";
import { SiTwitch } from "react-icons/si";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import type { TwitchStreamStatus } from "@/types";

function TwitchStatusPill() {
  const { data: streamStatus, isLoading } = useQuery<TwitchStreamStatus>({
    queryKey: ["/api/twitch/status"],
    refetchInterval: 60000,
  });

  if (isLoading) {
    return (
      <Badge variant="secondary" className="animate-pulse" data-testid="badge-twitch-loading">
        <div className="h-3 w-20 bg-muted rounded" />
      </Badge>
    );
  }

  const isLive = streamStatus?.isLive;

  return (
    <a
      href="https://twitch.tv/wolfymaster"
      target="_blank"
      rel="noopener noreferrer"
      data-testid={isLive ? "link-twitch-live" : "link-twitch-offline"}
    >
      <Badge 
        variant={isLive ? "destructive" : "secondary"}
        data-testid={isLive ? "badge-twitch-live" : "badge-twitch-offline"}
      >
        {isLive ? (
          <>
            <span className="relative flex h-2 w-2 mr-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-white opacity-75" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-white" />
            </span>
            LIVE NOW
          </>
        ) : (
          <>
            <SiTwitch className="w-3 h-3 mr-1" />
            Twitch Channel
          </>
        )}
      </Badge>
    </a>
  );
}

export function LiveShowcaseHero() {
  const scrollToSection = (id: string) => {
    const element = document.querySelector(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section id="showcase" className="relative min-h-[60vh] flex items-center py-6 overflow-hidden">
      <div className="absolute inset-0 bg-[linear-gradient(rgba(var(--primary-rgb),0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(var(--primary-rgb),0.03)_1px,transparent_1px)] bg-[size:50px_50px] [mask-image:radial-gradient(ellipse_80%_50%_at_50%_0%,#000_70%,transparent_110%)]" />
      
      <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-accent/5" />
      <div className="absolute top-1/3 left-1/4 w-80 h-80 bg-primary/10 rounded-full blur-3xl" />
      <div className="absolute bottom-1/4 right-1/4 w-64 h-64 bg-accent/10 rounded-full blur-3xl" />

      <div className="relative max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8 w-full text-center">
        <div className="space-y-8">
          <div className="flex flex-wrap items-center justify-center gap-3">
            <TwitchStatusPill />
            <Badge variant="outline" data-testid="badge-status-available">
              <span className="w-2 h-2 rounded-full bg-status-online mr-2" />
              Available for projects
            </Badge>
          </div>

          <div className="space-y-4">
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight" data-testid="heading-showcase">
              <span className="text-foreground">Software Engineer</span>
              <span className="block text-primary mt-2">Warren, Pennsylvania</span>
            </h1>
            <p className="text-xl sm:text-2xl lg:text-3xl text-muted-foreground font-medium" data-testid="text-showcase-subtitle">
              Live Coding on Twitch | Software Development
            </p>

            <p className="text-lg text-muted-foreground max-w-2xl mx-auto" data-testid="text-showcase-tagline">
              Driving engineering strategies and achieving organizational goals.
              <div className="text-foreground font-medium block"> Serving Erie, Warren, and Northwest Pennsylvania.</div>
              <div className="text-foreground font-medium block">50+ clients served since 2009.</div>
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-3 justify-center flex-wrap">
            <Button 
              size="lg"
              onClick={() => scrollToSection("#about")}
              data-testid="button-learn-more"
            >
              Learn More
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
            <Button 
              size="lg" 
              variant="outline"
              onClick={() => scrollToSection("#contact")}
              data-testid="button-get-quote"
            >
              Get a Quote
            </Button>
            <Button size="lg" variant="ghost" className="text-accent" asChild>
              <a
                href="https://twitch.tv/wolfymaster"
                target="_blank"
                rel="noopener noreferrer"
                data-testid="link-watch-live"
              >
                <SiTwitch className="mr-2 h-4 w-4" />
                Watch Live
                <ExternalLink className="ml-2 h-3 w-3" />
              </a>
            </Button>
          </div>

          <div className="flex items-center justify-center gap-6 pt-2 flex-wrap text-sm text-muted-foreground">
            <span data-testid="text-stat-mini-years">15+ Years Experience</span>
            <span className="hidden sm:inline text-border">|</span>
            <span data-testid="text-stat-mini-industries">50+ Clients</span>
            <span className="hidden sm:inline text-border">|</span>
            <span data-testid="text-stat-mini-projects">5+ Industries</span>
          </div>

          <div className="pt-4">
            <Button 
              variant="ghost" 
              size="sm"
              onClick={() => scrollToSection("#featured")}
              className="text-muted-foreground"
              data-testid="button-scroll-content"
            >
              <ArrowDown className="h-4 w-4 animate-bounce" />
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
