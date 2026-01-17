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

export default function Home() {
  return (
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
  );
}
