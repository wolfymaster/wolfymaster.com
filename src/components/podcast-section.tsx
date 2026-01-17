import { Mic, ExternalLink, Headphones, Clock } from "lucide-react";
import { SiSpotify } from "react-icons/si";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

const episodes = [
  {
    id: "1",
    title: "Whispers in the Shadows",
    description: "This was a Christmas gift for someone special. Not so secretly wanting to be a voice-over actor. Might do more of these.",
    date: "Oct 23, 2024",
    duration: "7 min",
    spotifyUrl: "https://open.spotify.com/episode/2rMVLeFqxSBzS17hKQJDPR",
  },
  {
    id: "2",
    title: "An Afternoon at the Beach",
    description: "The internet is such a wonderful, scary place. As a young child I was perplexed by its vastness and the endless amount of things I could discover.",
    date: "Nov 7, 2020",
    duration: "11 min",
    spotifyUrl: "https://open.spotify.com/episode/4qHwg3kTSL35Q0YNgZcC4v",
  },
  {
    id: "3",
    title: "Lofty Goals",
    description: "To reach your goals, you have to operate above them. Starting below your average speed goal drew down the average.",
    date: "Nov 4, 2020",
    duration: "4 min",
    spotifyUrl: "https://open.spotify.com/episode/7GgbrqV113qRBaZ5d2hhZc",
  },
  {
    id: "4",
    title: "Why I Teach",
    description: "Teaching is humbling. It makes you stronger, wiser in your craft because it helps you elevate everyone around you.",
    date: "May 24, 2020",
    duration: "7 min",
    spotifyUrl: "https://open.spotify.com/episode/3o0sKb72PA2e7lm8fpgkuP",
  },
];

export function PodcastSection() {
  return (
    <section id="podcast" className="py-24 bg-muted/30 relative overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_50%_at_50%_-20%,rgba(29,185,84,0.15),transparent)]" />
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-[#1DB954]/10 rounded-full blur-3xl" />
      <div className="absolute bottom-0 right-1/4 w-72 h-72 bg-[#1DB954]/5 rounded-full blur-3xl" />
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <Badge variant="secondary" className="mb-4" data-testid="badge-podcast">
            <Mic className="w-3 h-3 mr-1" />
            Podcast
          </Badge>
          <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-4" data-testid="heading-podcast">
            Wolfy on the Radio
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto" data-testid="text-podcast-description">
            Sharing thoughts on life, personal experiences, and general musings. 
            Come along and join the conversation.
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <div className="grid sm:grid-cols-2 gap-4">
              {episodes.map((episode, index) => (
                <Card 
                  key={episode.id} 
                  className="hover-elevate group transition-all duration-300"
                  data-testid={`card-episode-${index}`}
                >
                  <CardContent className="p-6">
                    <div className="flex items-start justify-between gap-2 mb-3 flex-wrap">
                      <Badge variant="outline" className="text-xs" data-testid={`badge-episode-date-${index}`}>
                        {episode.date}
                      </Badge>
                      <div className="flex items-center gap-1 text-xs text-muted-foreground" data-testid={`text-episode-duration-${index}`}>
                        <Clock className="w-3 h-3" />
                        {episode.duration}
                      </div>
                    </div>
                    <h3 className="font-semibold text-foreground mb-2" data-testid={`text-episode-title-${index}`}>
                      {episode.title}
                    </h3>
                    <p className="text-sm text-muted-foreground mb-4 line-clamp-2" data-testid={`text-episode-description-${index}`}>
                      {episode.description}
                    </p>
                    <Button size="sm" variant="ghost" className="w-full justify-start" asChild>
                      <a
                        href={episode.spotifyUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        data-testid={`link-episode-${index}`}
                      >
                        <Headphones className="h-3 w-3 mr-2" />
                        Listen Now
                        <ExternalLink className="h-3 w-3 ml-auto" />
                      </a>
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          <div className="h-full">
            <Card className="bg-primary/5 dark:bg-primary/10 border-primary/20 h-full flex flex-col">
              <CardContent className="p-6 flex flex-col h-full">
                <div className="flex items-center justify-center gap-3 mb-3">
                  <Mic className="w-5 h-5 text-primary" />
                  <h3 className="font-semibold text-lg text-foreground" data-testid="text-podcast-name">
                    Wolfy on the Radio
                  </h3>
                </div>
                <p className="text-sm text-muted-foreground mb-4 text-center" data-testid="text-podcast-tagline">
                  Personal stories & life musings
                </p>
                <div className="flex flex-col gap-3 mb-6">
                  <Button className="w-full" asChild>
                    <a
                      href="https://open.spotify.com/show/5Ov0HvlXUtjrMiSVPhSSSO"
                      target="_blank"
                      rel="noopener noreferrer"
                      data-testid="link-podcast-spotify"
                    >
                      <SiSpotify className="h-4 w-4 mr-2" />
                      Listen on Spotify
                    </a>
                  </Button>
                  <Button variant="outline" className="w-full" asChild>
                    <a
                      href="https://wolfyontheradio.com"
                      target="_blank"
                      rel="noopener noreferrer"
                      data-testid="link-podcast-website"
                    >
                      <ExternalLink className="h-4 w-4 mr-2" />
                      Visit Website
                    </a>
                  </Button>
                </div>

                <div className="border-t border-primary/20 pt-6 mt-auto">
                  <h4 className="font-semibold text-foreground mb-4 text-sm" data-testid="heading-podcast-about">
                    About the Podcast
                  </h4>
                  <ul className="space-y-2 text-sm text-muted-foreground">
                    <li className="flex items-start gap-2 flex-wrap" data-testid="text-podcast-topic-0">
                      <div className="w-1.5 h-1.5 rounded-full bg-primary mt-2 flex-shrink-0" />
                      Life experiences and personal stories
                    </li>
                    <li className="flex items-start gap-2 flex-wrap" data-testid="text-podcast-topic-1">
                      <div className="w-1.5 h-1.5 rounded-full bg-primary mt-2 flex-shrink-0" />
                      Thoughts on growth and self-improvement
                    </li>
                    <li className="flex items-start gap-2 flex-wrap" data-testid="text-podcast-topic-2">
                      <div className="w-1.5 h-1.5 rounded-full bg-primary mt-2 flex-shrink-0" />
                      Candid conversations and musings
                    </li>
                    <li className="flex items-start gap-2 flex-wrap" data-testid="text-podcast-topic-3">
                      <div className="w-1.5 h-1.5 rounded-full bg-primary mt-2 flex-shrink-0" />
                      A glimpse into the mind of an engineer
                    </li>
                  </ul>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
}
