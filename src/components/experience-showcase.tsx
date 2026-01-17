import { 
  Shield, 
  Factory, 
  Building2,
  Mountain,
  Heart,
  TrendingUp
} from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

const industries = [
  {
    name: "Cybersecurity",
    icon: Shield,
    years: "4 years",
    achievements: [
      "Exposure management platform",
      "Guided cybersecurity training",
      "Aggregate reporting systems",
    ],
  },
  {
    name: "Manufacturing",
    icon: Factory,
    years: "Top Industry",
    achievements: [
      "Data processing pipelines",
      "Vendor integration systems",
      "Operational dashboards",
    ],
  },
  {
    name: "Construction",
    icon: Building2,
    years: "Top Industry",
    achievements: [
      "Project management tools",
      "System-to-system communication",
      "Business process automation",
    ],
  },
  {
    name: "Outdoor Recreation",
    icon: Mountain,
    years: "Top Industry",
    achievements: [
      "Custom web applications",
      "Backend systems",
      "API development",
    ],
  },
  {
    name: "Healthcare",
    icon: Heart,
    years: "Experience",
    achievements: [
      "Patient record migration",
      "Data pipeline design",
      "Disaster recovery automation",
    ],
  },
];

export function ExperienceShowcase() {
  return (
    <section id="experience" className="py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <Badge variant="secondary" className="mb-4" data-testid="badge-experience">
            <TrendingUp className="w-3 h-3 mr-1" />
            Industry Experience
          </Badge>
          <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-4" data-testid="heading-experience">
            Systems Built to Last
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto" data-testid="text-experience-description">
            Delivering diverse solutions ranging from web development to complex 
            enterprise systems across multiple industries since 2009.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {industries.map((industry, index) => (
            <Card 
              key={industry.name} 
              className="hover-elevate group transition-all duration-300"
              data-testid={`card-industry-${index}`}
            >
              <CardContent className="p-6">
                <div className="flex items-start gap-4 mb-4 flex-wrap">
                  <div className="w-12 h-12 rounded-xl bg-primary/10 dark:bg-primary/20 flex items-center justify-center">
                    <industry.icon className="w-6 h-6 text-primary" />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-semibold text-lg text-foreground" data-testid={`text-industry-name-${index}`}>{industry.name}</h3>
                    <p className="text-sm text-muted-foreground" data-testid={`text-industry-years-${index}`}>{industry.years}</p>
                  </div>
                </div>
                <ul className="space-y-2">
                  {industry.achievements.map((achievement, achievementIndex) => (
                    <li key={achievement} className="flex items-center gap-2 text-sm text-muted-foreground flex-wrap" data-testid={`text-achievement-${index}-${achievementIndex}`}>
                      <div className="w-1.5 h-1.5 rounded-full bg-primary" />
                      {achievement}
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
