import { QueryClientProvider } from "@tanstack/react-query";
import { TooltipProvider } from "@/components/ui/tooltip";
import { ThemeProvider } from "@/components/theme-provider";
import { Toaster } from "@/components/ui/toaster";
import { queryClient } from "@/lib/queryClient";

import { Navigation } from "@/components/navigation";
import { LiveContentSection } from "@/components/live-content-section";
import { LiveShowcaseHero } from "@/components/live-showcase-hero";
import { FeaturedProject } from "@/components/featured-project";
import { IntroCTASection } from "@/components/intro-cta-section";
import { ExperienceShowcase } from "@/components/experience-showcase";
import { PodcastSection } from "@/components/podcast-section";
import { TwitchHub } from "@/components/twitch-hub";
import { QuoteRequestForm } from "@/components/quote-request-form";
import { Footer } from "@/components/footer";

export function HomePage() {
  return (
    <ThemeProvider defaultTheme="dark" storageKey="wolfymaster-theme">
      <QueryClientProvider client={queryClient}>
        <TooltipProvider>
          <div className="min-h-screen bg-background">
            <Navigation />
            <main className="pt-16">
              <LiveContentSection />
              <LiveShowcaseHero />
              <FeaturedProject />
              <IntroCTASection />
              <TwitchHub />
              <PodcastSection />
              <ExperienceShowcase />
              <QuoteRequestForm />
            </main>
            <Footer />
          </div>
          <Toaster />
        </TooltipProvider>
      </QueryClientProvider>
    </ThemeProvider>
  );
}
