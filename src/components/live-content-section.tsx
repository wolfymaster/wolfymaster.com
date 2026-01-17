import { useState, useMemo, useRef } from "react";
import { Play } from "lucide-react";
import { SiYoutube, SiTwitch } from "react-icons/si";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
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
  thumbnail: string;
  platform: "youtube" | "twitch";
  duration: string;
  embedUrl: string;
}

const featuredClips: Clip[] = [
  {
    id: "1",
    title: "Building Woofx3 Architecture",
    thumbnail: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=400&h=225&fit=crop",
    platform: "youtube",
    duration: "2:34",
    embedUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ?autoplay=1",
  },
  {
    id: "2",
    title: "Live Coding Session",
    thumbnail: "https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=400&h=225&fit=crop",
    platform: "twitch",
    duration: "1:45",
    embedUrl: "https://player.twitch.tv/?video=123456789&parent=localhost&autoplay=true",
  },
  {
    id: "3",
    title: "TypeScript Tips",
    thumbnail: "https://images.unsplash.com/photo-1516116216624-53e697fedbea?w=400&h=225&fit=crop",
    platform: "youtube",
    duration: "3:12",
    embedUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ?autoplay=1",
  },
  {
    id: "4",
    title: "Debugging Like a Pro",
    thumbnail: "https://images.unsplash.com/photo-1542831371-29b0f74f9713?w=400&h=225&fit=crop",
    platform: "youtube",
    duration: "4:20",
    embedUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ?autoplay=1",
  },
  {
    id: "5",
    title: "System Design Deep Dive",
    thumbnail: "https://images.unsplash.com/photo-1504639725590-34d0984388bd?w=400&h=225&fit=crop",
    platform: "youtube",
    duration: "8:15",
    embedUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ?autoplay=1",
  },
  {
    id: "6",
    title: "React Performance",
    thumbnail: "https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=400&h=225&fit=crop",
    platform: "youtube",
    duration: "5:42",
    embedUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ?autoplay=1",
  },
];

function CompactClipCard({ clip, index, onPlay }: { clip: Clip; index: number; onPlay: () => void }) {
  const PlatformIcon = clip.platform === "youtube" ? SiYoutube : SiTwitch;

  return (
    <div
      className="group relative flex-shrink-0 w-48 sm:w-56 cursor-pointer"
      onClick={onPlay}
      data-testid={`card-clip-${index}`}
    >
      <div className="relative aspect-video rounded-md overflow-hidden bg-card border border-border">
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent z-10 opacity-50 group-hover:opacity-100 transition-opacity duration-200" />
        
        <img
          src={clip.thumbnail}
          alt={clip.title}
          className="absolute inset-0 w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
          loading="lazy"
          data-testid={`img-clip-${index}`}
        />

        <div className="absolute inset-0 flex items-center justify-center z-20 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
          <div className="w-10 h-10 rounded-full bg-primary flex items-center justify-center">
            <Play className="w-4 h-4 text-primary-foreground ml-0.5" />
          </div>
        </div>

        <div className="absolute top-2 left-2 z-20">
          <Badge variant="secondary" className="bg-black/70 backdrop-blur-sm text-xs border-0" data-testid={`badge-clip-platform-${index}`}>
            <PlatformIcon className="w-2.5 h-2.5 mr-1" />
            {clip.duration}
          </Badge>
        </div>

        <div className="absolute bottom-0 left-0 right-0 p-2 z-20">
          <p className="text-xs font-medium text-white line-clamp-1 drop-shadow-md" data-testid={`text-clip-title-${index}`}>
            {clip.title}
          </p>
        </div>
      </div>
    </div>
  );
}

export function LiveContentSection() {
  const [selectedClip, setSelectedClip] = useState<Clip | null>(null);
  const embedHost = useMemo(() => getEmbedHost(), []);
  const scrollRef = useRef<HTMLDivElement>(null);

  const getEmbedUrl = (clip: Clip) => {
    if (clip.platform === "twitch") {
      return clip.embedUrl.replace("parent=localhost", `parent=${embedHost}`);
    }
    return clip.embedUrl;
  };


  return (
    <section id="live-content" className="relative py-4 bg-muted/30 border-b border-border">
      <div className="relative max-w-[100vw] mx-auto">
        <div className="flex items-center gap-4">
          <div
            ref={scrollRef}
            className="flex gap-3 overflow-x-auto scrollbar-hide px-4 sm:px-0 sm:pr-6 lg:pr-8 py-2 scroll-smooth flex-1 justify-center"
            style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
          >
            {featuredClips.map((clip, index) => (
              <CompactClipCard
                key={clip.id}
                clip={clip}
                index={index}
                onPlay={() => setSelectedClip(clip)}
              />
            ))}
          </div>
        </div>
      </div>

      <Dialog open={!!selectedClip} onOpenChange={() => setSelectedClip(null)}>
        <DialogContent className="max-w-4xl p-0 overflow-hidden bg-black border-primary/20">
          <DialogHeader className="p-4 pb-0">
            <DialogTitle className="text-white flex items-center gap-2 flex-wrap" data-testid="text-clip-dialog-title">
              {selectedClip?.platform === "youtube" ? (
                <SiYoutube className="w-4 h-4 text-primary" />
              ) : (
                <SiTwitch className="w-4 h-4 text-accent" />
              )}
              {selectedClip?.title}
            </DialogTitle>
          </DialogHeader>
          <div className="aspect-video w-full bg-black">
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
