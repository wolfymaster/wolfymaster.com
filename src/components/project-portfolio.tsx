import { ExternalLink, Github, Layers } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import type { Project } from "@/types";

const projects: Project[] = [
  {
    id: "1",
    title: "WoofX3",
    description: "All-in-one platform for best-in-class live streaming with unified chatbot, alerts, and plugin system.",
    technologies: ["Rust", "TypeScript", "Go", "NATS", "gRPC"],
    liveUrl: "https://woofx3.tv",
    githubUrl: "https://github.com/wolfymaster/woofx3",
    featured: true,
    industry: "Streaming",
  },
  {
    id: "2",
    title: "Tech Uncensored",
    description: "Tech community platform with podcast, workshops, and educational content for developers.",
    technologies: ["React", "Node.js", "PostgreSQL", "WebSockets"],
    liveUrl: "https://open.spotify.com/show/3yMZnF0xnB1r07PT7V8Dpl",
    featured: true,
    industry: "Education",
  },
  {
    id: "3",
    title: "SightGain Platform",
    description: "Enterprise threat exposure management platform for cybersecurity teams.",
    technologies: ["TypeScript", "React", "Go", "Kubernetes"],
    liveUrl: "https://www.sightgain.com",
    featured: true,
    industry: "Cybersecurity",
  },
  {
    id: "4",
    title: "Mentorship Framework",
    description: "Professional development platform for organizations focused on mentorship and growth.",
    technologies: ["Next.js", "TypeScript", "Tailwind CSS"],
    liveUrl: "https://www.wolfymaster.com/mentorerie",
    featured: false,
    industry: "Education",
  },
  {
    id: "5",
    title: "NWPA Tech",
    description: "Technology education initiative exploring innovation in Northwestern Pennsylvania.",
    technologies: ["React", "Node.js", "Community Platforms"],
    liveUrl: "https://www.wolfymaster.com/nwpatech",
    featured: false,
    industry: "Education",
  },
  {
    id: "6",
    title: "Digital Signage System",
    description: "Raspberry Pi-based digital signage solution presented at tech meetups.",
    technologies: ["Raspberry Pi", "Python", "React", "WebSockets"],
    featured: false,
    industry: "IoT",
  },
];

export function ProjectPortfolio() {
  return (
    <section id="projects" className="py-24 bg-muted/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <Badge variant="secondary" className="mb-4" data-testid="badge-projects">
            <Layers className="w-3 h-3 mr-1" />
            Project Portfolio
          </Badge>
          <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-4" data-testid="heading-projects">
            Selected Work & Projects
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto" data-testid="text-projects-description">
            A collection of projects spanning streaming technology, cybersecurity, 
            education, and community building.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.map((project) => (
            <Card 
              key={project.id} 
              className={`hover-elevate group transition-all duration-300 ${
                project.featured ? "md:col-span-1 lg:row-span-1" : ""
              }`}
              data-testid={`card-project-${project.id}`}
            >
              <CardContent className="p-6 h-full flex flex-col">
                <div className="flex items-start justify-between gap-4 mb-4 flex-wrap">
                  <div>
                    <h3 className="font-semibold text-lg text-foreground group-hover:text-primary transition-colors" data-testid={`text-project-title-${project.id}`}>
                      {project.title}
                    </h3>
                    {project.industry && (
                      <p className="text-sm text-muted-foreground" data-testid={`text-project-industry-${project.id}`}>{project.industry}</p>
                    )}
                  </div>
                  {project.featured && (
                    <Badge variant="default" className="shrink-0">Featured</Badge>
                  )}
                </div>

                <p className="text-sm text-muted-foreground mb-4 flex-1" data-testid={`text-project-description-${project.id}`}>
                  {project.description}
                </p>

                <div className="space-y-4">
                  <div className="flex flex-wrap gap-1.5">
                    {project.technologies.slice(0, 4).map((tech) => (
                      <Badge key={tech} variant="outline" className="text-xs">
                        {tech}
                      </Badge>
                    ))}
                    {project.technologies.length > 4 && (
                      <Badge variant="outline" className="text-xs">
                        +{project.technologies.length - 4}
                      </Badge>
                    )}
                  </div>

                  <div className="flex items-center gap-2 flex-wrap">
                    {project.liveUrl && (
                      <a
                        href={project.liveUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        data-testid={`link-project-live-${project.id}`}
                      >
                        <Button size="sm" variant="ghost">
                          <ExternalLink className="h-3 w-3 mr-1" />
                          Live
                        </Button>
                      </a>
                    )}
                    {project.githubUrl && (
                      <a
                        href={project.githubUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        data-testid={`link-project-github-${project.id}`}
                      >
                        <Button size="sm" variant="ghost">
                          <Github className="h-3 w-3 mr-1" />
                          Code
                        </Button>
                      </a>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
