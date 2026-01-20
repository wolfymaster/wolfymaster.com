import { ExternalLink, Github, Tv, Zap, Shield, Code } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";

const features = [
  { icon: Tv, title: "Unified Architecture", description: "One platform, no duct tape" },
  { icon: Zap, title: "Plugin System", description: "Extensible without rewrites" },
  { icon: Shield, title: "Production Ready", description: "Built for 24/7 operation" },
];

const techStack = [
  "Rust",
  "TypeScript",
  "Go",
  "NATS",
  "gRPC",
  "XState",
  "Bun",
];

export function FeaturedProject() {
  return (
    <section id="featured" className="py-24 bg-muted/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <Badge variant="secondary" className="mb-4" data-testid="badge-featured">
            <Code className="w-3 h-3 mr-1" />
            Featured Open Source Project
          </Badge>
          <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-4" data-testid="heading-featured">
            Woofx3
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto" data-testid="text-featured-description">
            Built for scale, not demos. A production-ready streaming platform with 
            modular architecture, designed for 24/7 reliability and long-term maintainability.
          </p>
        </div>

        <div className="grid lg:grid-cols-5 gap-8 lg:gap-12 items-center">
          <div className="lg:col-span-3 order-2 lg:order-1">
            <Card className="overflow-hidden bg-primary/5 dark:bg-primary/10 border-primary/20">
              <CardContent className="p-0">
                <div className="aspect-video relative bg-gradient-to-br from-primary/80 to-accent/80 dark:from-primary/60 dark:to-accent/60 flex items-center justify-center">
                <iframe
                  style={ { borderRadius: '20px', mask: 'radial-gradient(circle at center, black 50%, transparent 98%)' } }
                  width="98%"
                  height="98%"
                  src="https://www.youtube.com/embed/ng-1iMn-KnU?rel=0" 
                  title="what is woofx3" 
                  frameborder="0" 
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" 
                  referrerpolicy="strict-origin-when-cross-origin" 
                  allowfullscreen
                ></iframe>
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="lg:col-span-2 order-1 lg:order-2 space-y-6">
            <div className="space-y-4">
              {features.map((feature, index) => (
                <div key={feature.title} className="flex items-start gap-4 flex-wrap" data-testid={`feature-item-${index}`}>
                  <div className="w-10 h-10 rounded-lg bg-primary/10 dark:bg-primary/20 flex items-center justify-center flex-shrink-0">
                    <feature.icon className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-foreground" data-testid={`text-feature-title-${index}`}>{feature.title}</h4>
                    <p className="text-sm text-muted-foreground" data-testid={`text-feature-desc-${index}`}>{feature.description}</p>
                  </div>
                </div>
              ))}
            </div>

            <div className="space-y-3">
              <h4 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider" data-testid="heading-tech-stack">
                Tech Stack
              </h4>
              <div className="flex flex-wrap gap-2">
                {techStack.map((tech, index) => (
                  <Badge key={tech} variant="outline" className="text-xs" data-testid={`badge-tech-${index}`}>
                    {tech}
                  </Badge>
                ))}
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-3 pt-4 flex-wrap">
              <a
                href="https://woofx3.tv"
                target="_blank"
                rel="noopener noreferrer"
                data-testid="link-woofx3-live"
              >
                <Button className="w-full sm:w-auto">
                  Visit Woofx3
                  <ExternalLink className="h-4 w-4 ml-2" />
                </Button>
              </a>
              <a
                href="https://github.com/wolfymaster/woofx3"
                target="_blank"
                rel="noopener noreferrer"
                data-testid="link-woofx3-github"
              >
                <Button variant="outline" className="w-full sm:w-auto">
                  <Github className="h-4 w-4 mr-2" />
                  View Source
                </Button>
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
