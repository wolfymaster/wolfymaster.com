import { Code2 } from "lucide-react";
import { SiGithub, SiLinkedin, SiTwitch, SiYoutube, SiX } from "react-icons/si";
import { Button } from "@/components/ui/button";

const socialLinks = [
  { href: "https://github.com/wolfymaster", icon: SiGithub, label: "GitHub" },
  { href: "https://linkedin.com/in/wolfymaster", icon: SiLinkedin, label: "LinkedIn" },
  { href: "https://twitch.tv/wolfymaster", icon: SiTwitch, label: "Twitch" },
  { href: "https://twitter.com/wolfymaster", icon: SiX, label: "X" },
  { href: "https://youtube.com/wolfymaster", icon: SiYoutube, label: "YouTube" },
];

const quickLinks = [
  { href: "#about", label: "About" },
  { href: "#projects", label: "Projects" },
  { href: "#experience", label: "Experience" },
  { href: "#twitch", label: "Twitch" },
  { href: "#contact", label: "Contact" },
];

const projectLinks = [
  { href: "https://woofx3.tv", label: "Woofx3" },
  { href: "https://github.com/wolfymaster/woofx3", label: "Open Source" },
  { href: "https://open.spotify.com/show/5Ov0HvlXUtjrMiSVPhSSSO", label: "Podcast" },
  { href: "https://articles.wolfymaster.com", label: "Blog" },
];

export function Footer() {
  const scrollToSection = (href: string) => {
    if (href.startsWith("#")) {
      const element = document.querySelector(href);
      if (element) {
        element.scrollIntoView({ behavior: "smooth" });
      }
    }
  };

  return (
    <footer className="bg-muted/30 border-t border-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 lg:gap-12">
          <div className="col-span-2 md:col-span-1">
            <a 
              href="#" 
              className="flex items-center gap-2 text-xl font-bold mb-4 flex-wrap"
              onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
              data-testid="link-footer-logo"
            >
              <Code2 className="h-6 w-6 text-primary" />
              <span className="text-primary" data-testid="text-footer-logo-1">Wolfy</span>
              <span className="text-foreground" data-testid="text-footer-logo-2">Master</span>
            </a>
            <p className="text-sm text-muted-foreground mb-6" data-testid="text-footer-about">
              Director of Software Engineering with 15+ years of experience building 
              solutions across Cybersecurity, Manufacturing, Construction, and more.
            </p>
            <div className="flex flex-wrap gap-2">
              {socialLinks.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  data-testid={`link-footer-${link.label.toLowerCase()}`}
                >
                  <Button variant="ghost" size="icon">
                    <link.icon className="h-4 w-4" />
                  </Button>
                </a>
              ))}
            </div>
          </div>

          <div>
            <h3 className="font-semibold text-foreground mb-4" data-testid="heading-footer-quicklinks">Quick Links</h3>
            <ul className="space-y-2">
              {quickLinks.map((link) => (
                <li key={link.href}>
                  <button
                    onClick={() => scrollToSection(link.href)}
                    className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                    data-testid={`link-footer-nav-${link.label.toLowerCase()}`}
                  >
                    {link.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="font-semibold text-foreground mb-4" data-testid="heading-footer-projects">Projects</h3>
            <ul className="space-y-2">
              {projectLinks.map((link, index) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                    data-testid={`link-footer-project-${index}`}
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="font-semibold text-foreground mb-4" data-testid="heading-footer-connect">Connect</h3>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li data-testid="text-footer-location">Erie, Pennsylvania</li>
              <li data-testid="text-footer-availability">Available for freelance</li>
              <li>
                <a
                  href="#contact"
                  onClick={(e) => {
                    e.preventDefault();
                    scrollToSection("#contact");
                  }}
                  className="text-primary hover:underline"
                  data-testid="link-footer-quote"
                >
                  Request a Quote
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-border">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 flex-wrap">
            <p className="text-sm text-muted-foreground" data-testid="text-copyright">
              <span data-testid="text-copyright-year">{new Date().getFullYear()}</span> Paul Sherer. All rights reserved.
            </p>
            <p className="text-sm text-muted-foreground" data-testid="text-tagline">
              Architecture-first software that actually scales
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
