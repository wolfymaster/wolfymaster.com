import { useState } from "react";
import { Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { SiGithub, SiLinkedin, SiTwitch } from "react-icons/si";

const navLinks = [
  { href: "#about", label: "About" },
  { href: "#twitch", label: "Twitch" },
  { href: "#podcast", label: "Podcast" },
  { href: "#experience", label: "Experience" },
  { href: "#contact", label: "Contact" },
];

const externalLinks = [
  { href: "https://articles.wolfymaster.com", label: "Blog" },
];

const socialLinks = [
  { href: "https://github.com/wolfymaster", icon: SiGithub, label: "GitHub", className: "" },
  { href: "https://linkedin.com/in/wolfymaster", icon: SiLinkedin, label: "LinkedIn", className: "" },
  { href: "https://twitch.tv/wolfymaster", icon: SiTwitch, label: "Twitch", className: "text-accent" },
];

export function Navigation() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const scrollToSection = (href: string) => {
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
    setMobileMenuOpen(false);
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-lg border-b border-border">
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between gap-4 h-16 flex-wrap">
          <a 
            href="#" 
            className="flex items-center text-xl font-bold flex-wrap"
            data-testid="link-logo"
          >
            <span className="text-primary" data-testid="text-logo-wolfy">Wolfy</span><span className="text-foreground" data-testid="text-logo-master">Master</span>
          </a>

          <div className="hidden md:flex items-center gap-1 flex-wrap">
            {navLinks.map((link) => (
              <Button
                key={link.href}
                variant="ghost"
                onClick={() => scrollToSection(link.href)}
                data-testid={`link-nav-${link.label.toLowerCase()}`}
              >
                {link.label}
              </Button>
            ))}
            {externalLinks.map((link) => (
              <Button
                key={link.href}
                variant="ghost"
                asChild
              >
                <a
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  data-testid={`link-nav-${link.label.toLowerCase()}`}
                >
                  {link.label}
                </a>
              </Button>
            ))}
          </div>

          <div className="flex items-center gap-2 flex-wrap">
            <div className="hidden sm:flex items-center gap-1 flex-wrap">
              {socialLinks.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  data-testid={`link-social-${link.label.toLowerCase()}`}
                >
                  <Button variant="ghost" size="icon" className={link.className}>
                    <link.icon className="h-4 w-4" />
                  </Button>
                </a>
              ))}
            </div>
            <Button
              variant="ghost"
              size="icon"
              className="md:hidden"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              data-testid="button-mobile-menu"
            >
              {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </Button>
          </div>
        </div>

        {mobileMenuOpen && (
          <div className="md:hidden py-4 border-t border-border">
            <div className="flex flex-col gap-1">
              {navLinks.map((link) => (
                <Button
                  key={link.href}
                  variant="ghost"
                  className="justify-start"
                  onClick={() => scrollToSection(link.href)}
                  data-testid={`link-mobile-nav-${link.label.toLowerCase()}`}
                >
                  {link.label}
                </Button>
              ))}
              {externalLinks.map((link) => (
                <Button
                  key={link.href}
                  variant="ghost"
                  className="justify-start"
                  asChild
                >
                  <a
                    href={link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    data-testid={`link-mobile-nav-${link.label.toLowerCase()}`}
                  >
                    {link.label}
                  </a>
                </Button>
              ))}
            </div>
            <div className="flex items-center gap-2 mt-4 pt-4 border-t border-border flex-wrap">
              {socialLinks.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  data-testid={`link-mobile-social-${link.label.toLowerCase()}`}
                >
                  <Button variant="ghost" size="icon" className={link.className}>
                    <link.icon className="h-4 w-4" />
                  </Button>
                </a>
              ))}
            </div>
          </div>
        )}
      </nav>
    </header>
  );
}
