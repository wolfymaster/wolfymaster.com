import { ArrowRight, Code2, Briefcase, GraduationCap } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

const industries = [
  "Cybersecurity",
  "Manufacturing",
  "Construction",
  "Healthcare",
  "Outdoor Recreation",
];

export function IntroCTASection() {
  const scrollToSection = (id: string) => {
    const element = document.querySelector(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section 
      id="about" 
      className="relative py-20 lg:py-28 overflow-hidden"
    >
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-muted/30 to-transparent" />

      <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="space-y-8">
          <div className="space-y-4">
            <div className="flex flex-wrap items-center gap-3">
              <Badge variant="secondary" data-testid="badge-role">
                <Code2 className="w-3 h-3 mr-1" />
                Software Engineering Leader
              </Badge>
              <Badge variant="outline" data-testid="badge-experience">
                <Briefcase className="w-3 h-3 mr-1" />
                15+ Years Experience
              </Badge>
              <Badge variant="outline" data-testid="badge-instructor">
                <GraduationCap className="w-3 h-3 mr-1" />
                Instructor & Mentor
              </Badge>
            </div>

            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight" data-testid="heading-about">
              <span className="text-foreground">Hi, I'm </span>
              <span className="text-foreground font-extrabold">Paul</span>
            </h2>

            <p className="text-base text-muted-foreground max-w-2xl" data-testid="text-intro-secondary">
              Since 2009, I've provided software engineering expertise for over 50 clients, 
              delivering solutions ranging from web development to complex enterprise systems. 
              I design and maintain APIs, backend systems, and data processing pipelines that 
              enable businesses to derive actionable insights.
            </p>

            <p className="text-base text-muted-foreground max-w-2xl" data-testid="text-intro-instructor">
              I'm also an instructor at Fullstack Academy and a mentor at Springboard, 
              helping individuals transition into software development careers through 
              technical training, career advice, and hands-on support.
            </p>
          </div>

          <div className="flex flex-wrap gap-2">
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
              data-testid="button-request-quote-cta"
            >
              Request a Quote
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
