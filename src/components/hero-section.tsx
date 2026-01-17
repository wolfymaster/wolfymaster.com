import { ArrowRight, Code2, Briefcase } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

const industries = [
  "Healthcare",
  "Cybersecurity",
  "Manufacturing",
  "Agency",
  "Advertising",
  "Construction",
];

export function HeroSection() {
  const scrollToSection = (id: string) => {
    const element = document.querySelector(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section 
      id="about" 
      className="relative min-h-screen flex items-center pt-16 overflow-hidden flex-wrap"
    >
      <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-accent/10 dark:from-primary/10 dark:to-accent/5" />
      
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/10 dark:bg-primary/5 rounded-full blur-3xl animate-pulse" />
      <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-accent/20 dark:bg-accent/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: "1s" }} />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-24">
        <div className="grid lg:grid-cols-5 gap-12 lg:gap-16 items-center">
          <div className="lg:col-span-3 space-y-8">
            <div className="space-y-4">
              <div className="flex flex-wrap items-center gap-3">
                <Badge variant="secondary" className="px-3 py-1" data-testid="badge-role">
                  <Code2 className="w-3 h-3 mr-1" />
                  Software Engineer
                </Badge>
                <Badge variant="outline" className="px-3 py-1" data-testid="badge-experience">
                  <Briefcase className="w-3 h-3 mr-1" />
                  20+ Years Experience
                </Badge>
              </div>

              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight" data-testid="heading-hero">
                <span className="text-foreground">Architecture-First</span>
                <br />
                <span className="text-primary">Software</span>
                <span className="text-foreground"> That</span>
                <br />
                <span className="text-foreground">Actually Scales</span>
              </h1>

              <p className="text-lg font-medium text-foreground mb-2" data-testid="text-hero-tagline">
                Anyone can build with AI. I build the right thing.
              </p>

              <p className="text-lg sm:text-xl text-muted-foreground max-w-2xl" data-testid="text-hero-intro">
                Hi, I'm <span className="text-foreground font-semibold" data-testid="text-name-highlight">Paul Sherer</span>. 
                I'm an entrepreneur and architect who turns complex challenges into 
                elegant, maintainable systems. No AI shortcuts that become technical debt. 
                No disposable prototypes. Just thoughtful engineering built to last.
              </p>
            </div>

            <div className="flex flex-wrap gap-3">
              {industries.map((industry, index) => (
                <Badge 
                  key={industry} 
                  variant="outline" 
                  className="text-sm font-normal"
                  data-testid={`badge-industry-${index}`}
                >
                  {industry}
                </Badge>
              ))}
            </div>

            <div className="flex flex-col sm:flex-row gap-4 flex-wrap">
              <Button 
                size="lg" 
                onClick={() => scrollToSection("#contact")}
                data-testid="button-request-quote"
              >
                Request a Quote
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
              <Button 
                size="lg" 
                variant="outline"
                onClick={() => scrollToSection("#projects")}
                data-testid="button-view-projects"
              >
                View Projects
              </Button>
            </div>

            <div className="flex items-center gap-8 pt-4 flex-wrap">
              <div data-testid="stat-years">
                <p className="text-3xl font-bold text-foreground" data-testid="text-stat-years-value">20+</p>
                <p className="text-sm text-muted-foreground" data-testid="text-stat-years-label">Years Experience</p>
              </div>
              <div className="h-12 w-px bg-border" />
              <div data-testid="stat-industries">
                <p className="text-3xl font-bold text-foreground" data-testid="text-stat-industries-value">6+</p>
                <p className="text-sm text-muted-foreground" data-testid="text-stat-industries-label">Industries</p>
              </div>
              <div className="h-12 w-px bg-border" />
              <div data-testid="stat-projects">
                <p className="text-3xl font-bold text-foreground" data-testid="text-stat-projects-value">100+</p>
                <p className="text-sm text-muted-foreground" data-testid="text-stat-projects-label">Projects</p>
              </div>
            </div>
          </div>

          <div className="lg:col-span-2 relative">
            <div className="relative aspect-square max-w-md mx-auto">
              <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-accent/20 dark:from-primary/10 dark:to-accent/10 rounded-3xl blur-2xl" />
              <div className="relative bg-card border border-card-border rounded-3xl p-8 h-full flex flex-col justify-center">
                <div className="space-y-6">
                  <div className="flex items-center gap-4 flex-wrap">
                    <div className="w-16 h-16 rounded-full bg-primary/10 dark:bg-primary/20 flex items-center justify-center" data-testid="avatar-initials">
                      <span className="text-2xl font-bold text-primary" data-testid="text-initials">PS</span>
                    </div>
                    <div>
                      <h3 className="font-semibold text-lg" data-testid="text-profile-name">Paul Sherer</h3>
                      <p className="text-sm text-muted-foreground" data-testid="text-profile-handle">@wolfymaster</p>
                    </div>
                  </div>

                  <div className="space-y-3">
                    <div className="flex items-center gap-2 text-sm flex-wrap" data-testid="status-available">
                      <div className="w-2 h-2 rounded-full bg-status-online" />
                      <span className="text-muted-foreground" data-testid="text-availability">Available for projects</span>
                    </div>
                    <div className="text-sm text-muted-foreground" data-testid="text-location">
                      Austin, Texas
                    </div>
                  </div>

                  <div className="grid grid-cols-3 gap-4 pt-4 border-t border-border">
                    <TechIcon name="TypeScript" color="hsl(var(--primary))" />
                    <TechIcon name="React" color="hsl(var(--chart-2))" />
                    <TechIcon name="Node.js" color="hsl(var(--chart-3))" />
                    <TechIcon name="Go" color="hsl(var(--chart-2))" />
                    <TechIcon name="Rust" color="hsl(var(--chart-5))" />
                    <TechIcon name="C#" color="hsl(var(--chart-3))" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function TechIcon({ name, color }: { name: string; color: string }) {
  return (
    <div className="flex flex-col items-center gap-1 p-2 rounded-lg bg-muted/50" data-testid={`tech-icon-${name.toLowerCase().replace(/[.#]/g, '')}`}>
      <div 
        className="w-8 h-8 rounded-md flex items-center justify-center text-xs font-bold text-primary-foreground"
        style={{ backgroundColor: color }}
        data-testid={`tech-badge-${name.toLowerCase().replace(/[.#]/g, '')}`}
      >
        {name.slice(0, 2).toUpperCase()}
      </div>
      <span className="text-xs text-muted-foreground truncate" data-testid={`tech-label-${name.toLowerCase().replace(/[.#]/g, '')}`}>{name}</span>
    </div>
  );
}
