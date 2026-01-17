import { useState, useMemo } from "react";
import { Play, Film, ExternalLink } from "lucide-react";
import { SiYoutube, SiTwitch } from "react-icons/si";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

function getEmbedHost(): string {
  if (typeof window !== "undefined") {
    return window.location.hostname;
  }
  return "localhost";
}

interface Clip {
  id: string;
  title: string;
  platform: "youtube" | "twitch";
  thumbnail: string;
  embedUrl: string;
  duration: string;
  featured?: boolean;
}

const clips: Clip[] = [
  {
    id: "1",
    title: "Building WoofX3 Architecture",
    platform: "youtube",
    thumbnail: "https://img.youtube.com/vi/dQw4w9WgXcQ/maxresdefault.jpg",
    embedUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
    duration: "2:34",
    featured: true,
  },
  {
    id: "2",
    title: "Live Coding Session Highlights",
    platform: "twitch",
    thumbnail: "https://static-cdn.jtvnw.net/previews-ttv/live_user_wolfymaster-440x248.jpg",
    embedUrl: "https://player.twitch.tv/?video=1234567890&parent=localhost",
    duration: "1:45",
  },
  {
    id: "3",
    title: "TypeScript Tips & Tricks",
    platform: "youtube",
    thumbnail: "https://img.youtube.com/vi/dQw4w9WgXcQ/hqdefault.jpg",
    embedUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
    duration: "3:12",
  },
  {
    id: "4",
    title: "Debugging Like a Pro",
    platform: "youtube",
    thumbnail: "https://img.youtube.com/vi/dQw4w9WgXcQ/hqdefault.jpg",
    embedUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
    duration: "4:20",
  },
  {
    id: "5",
    title: "Stream Raid Chaos",
    platform: "twitch",
    thumbnail: "https://static-cdn.jtvnw.net/previews-ttv/live_user_wolfymaster-440x248.jpg",
    embedUrl: "https://player.twitch.tv/?video=1234567890&parent=localhost",
    duration: "0:58",
    featured: true,
  },
  {
    id: "6",
    title: "React Performance Deep Dive",
    platform: "youtube",
    thumbnail: "https://img.youtube.com/vi/dQw4w9WgXcQ/hqdefault.jpg",
    embedUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
    duration: "5:30",
  },
];

function MatrixRain() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none opacity-20 dark:opacity-30">
      <div className="matrix-rain absolute inset-0" />
    </div>
  );
}

function ClipCard({ clip, index, onPlay }: { clip: Clip; index: number; onPlay: () => void }) {
  const PlatformIcon = clip.platform === "youtube" ? SiYoutube : SiTwitch;
  const platformColor = clip.platform === "youtube" ? "text-red-500" : "text-purple-500";

  return (
    <Card
      className={`group relative overflow-visible cursor-pointer ${
        clip.featured ? "md:col-span-2 md:row-span-2" : ""
      }`}
      onClick={onPlay}
      data-testid={`card-clip-${index}`}
    >
      <div className="absolute -inset-[1px] rounded-lg bg-gradient-to-r from-primary/50 via-primary/20 to-primary/50 opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-sm" />
      <div className="absolute -inset-[1px] rounded-lg bg-gradient-to-r from-primary/30 via-transparent to-primary/30 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
      
      <CardContent className="relative p-0 overflow-hidden rounded-lg bg-card">
        <div className={`relative ${clip.featured ? "aspect-video" : "aspect-video"}`}>
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent z-10" />
          <div className="absolute inset-0 bg-gradient-to-br from-primary/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10" />
          
          <img
            src={clip.thumbnail}
            alt={clip.title}
            className="absolute inset-0 w-full h-full object-cover"
            loading="lazy"
            data-testid={`img-clip-thumbnail-${index}`}
          />

          <div className="absolute inset-0 flex items-center justify-center z-20">
            <Button
              size="icon"
              variant="secondary"
              className="rounded-full opacity-80 group-hover:opacity-100 transition-opacity"
              data-testid={`button-play-clip-${index}`}
            >
              <Play className="w-5 h-5 ml-0.5" />
            </Button>
          </div>

          <div className="absolute top-3 left-3 z-20 flex items-center gap-2 flex-wrap">
            <Badge variant="secondary" className="bg-background/80 backdrop-blur-sm" data-testid={`badge-clip-platform-${index}`}>
              <PlatformIcon className={`w-3 h-3 mr-1 ${platformColor}`} />
              {clip.platform === "youtube" ? "YouTube" : "Twitch"}
            </Badge>
          </div>

          <div className="absolute top-3 right-3 z-20">
            <Badge variant="secondary" className="bg-background/80 backdrop-blur-sm font-mono text-xs" data-testid={`badge-clip-duration-${index}`}>
              {clip.duration}
            </Badge>
          </div>

          <div className="absolute bottom-0 left-0 right-0 p-4 z-20">
            <h3 className={`font-semibold text-primary-foreground ${clip.featured ? "text-lg" : "text-sm"} line-clamp-2`} data-testid={`text-clip-title-${index}`}>
              {clip.title}
            </h3>
          </div>
        </div>

        <div className="absolute inset-0 pointer-events-none overflow-hidden rounded-lg">
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-primary/5 group-hover:to-primary/10 transition-colors duration-300" />
          <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-primary/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        </div>
      </CardContent>
    </Card>
  );
}

export function ShortsClipsSection() {
  const [selectedClip, setSelectedClip] = useState<Clip | null>(null);
  const embedHost = useMemo(() => getEmbedHost(), []);

  const getEmbedUrl = (clip: Clip) => {
    if (clip.platform === "twitch") {
      return clip.embedUrl.replace("parent=localhost", `parent=${embedHost}`);
    }
    return clip.embedUrl;
  };

  return (
    <section id="clips" className="py-24 relative overflow-hidden">
      <MatrixRain />
      
      <div className="absolute inset-0 bg-gradient-to-b from-background via-background/95 to-background pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center mb-16">
          <Badge variant="secondary" className="mb-4 bg-primary/10 border-primary/20" data-testid="badge-clips">
            <Film className="w-3 h-3 mr-1" />
            Shorts & Clips
          </Badge>
          <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-4" data-testid="heading-clips">
            The Video Wall
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto" data-testid="text-clips-description">
            Highlights, tutorials, and stream moments. 
            Click to watch.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 lg:gap-6">
          {clips.map((clip, index) => (
            <ClipCard
              key={clip.id}
              clip={clip}
              index={index}
              onPlay={() => setSelectedClip(clip)}
            />
          ))}
        </div>

        <div className="mt-12 text-center">
          <Button variant="outline" asChild>
            <a
              href="https://youtube.com/@wolfymaster"
              target="_blank"
              rel="noopener noreferrer"
              data-testid="link-youtube-channel"
            >
              <SiYoutube className="w-4 h-4 mr-2 text-red-500" />
              View All on YouTube
              <ExternalLink className="w-3 h-3 ml-2" />
            </a>
          </Button>
        </div>
      </div>

      <Dialog open={!!selectedClip} onOpenChange={() => setSelectedClip(null)}>
        <DialogContent className="max-w-4xl p-0 overflow-hidden bg-card border-primary/20">
          <DialogHeader className="p-4 pb-0">
            <DialogTitle className="text-foreground flex items-center gap-2 flex-wrap" data-testid="text-dialog-title">
              {selectedClip?.platform === "youtube" ? (
                <SiYoutube className="w-4 h-4 text-red-500" />
              ) : (
                <SiTwitch className="w-4 h-4 text-purple-500" />
              )}
              {selectedClip?.title}
            </DialogTitle>
          </DialogHeader>
          <div className="aspect-video w-full">
            {selectedClip && (
              <iframe
                src={getEmbedUrl(selectedClip)}
                className="w-full h-full"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                data-testid="iframe-video-player"
              />
            )}
          </div>
        </DialogContent>
      </Dialog>
    </section>
  );
}
