import { ThemeProvider } from "@/components/theme-provider";
import { Navigation } from "@/components/navigation";
import { Footer } from "@/components/footer";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Copy, Check } from "lucide-react";
import { useState } from "react";

const brandColors = [
  {
    name: "Primary (Coral)",
    value: "#EC6758",
    hsl: "HSL: 6 79% 64%",
    usage: "Primary buttons, CTAs, key interactive elements",
    className: "bg-[#EC6758]",
  },
  {
    name: "Accent (Purple)",
    value: "#9146FF",
    hsl: "HSL: 264 100% 64%",
    usage: "Focus rings, secondary highlights, accents",
    className: "bg-[#9146FF]",
  },
  {
    name: "Light Background",
    value: "#F0F0FF",
    hsl: "HSL: 240 100% 97%",
    usage: "Light mode background with subtle lavender tint",
    className: "bg-[#F0F0FF] border border-border",
  },
  {
    name: "Dark Background",
    value: "#000000",
    hsl: "HSL: 0 0% 0%",
    usage: "Pure black for dark mode",
    className: "bg-[#000000] border border-border",
  },
];

const typographySamples = [
  {
    name: "Inter",
    description: "Primary font for headings and UI elements",
    weights: ["400", "600", "700"],
    sample: "The quick brown fox jumps over the lazy dog",
    className: "font-sans",
  },
  {
    name: "JetBrains Mono",
    description: "Monospace font for code snippets and technical details",
    weights: ["400"],
    sample: "const code = 'example';",
    className: "font-mono",
  },
];

const spacingScale = [
  { name: "4", value: "1rem", usage: "p-4, gap-4" },
  { name: "8", value: "2rem", usage: "p-8, gap-8" },
  { name: "12", value: "3rem", usage: "my-12" },
  { name: "16", value: "4rem", usage: "py-16" },
  { name: "24", value: "6rem", usage: "space-y-24" },
];

const designPrinciples = [
  {
    title: "Authority Through Experience",
    description: "Visual hierarchy emphasizing 20+ years expertise",
  },
  {
    title: "Living Portfolio",
    description: "Dynamic integration with active projects (Twitch, WoofX3)",
  },
  {
    title: "Dual Purpose",
    description: "Seamlessly blend showcase with lead generation",
  },
];

function ColorCard({ color }: { color: typeof brandColors[0] }) {
  const [copied, setCopied] = useState(false);

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <Card className="overflow-hidden">
      <div className={`h-32 ${color.className} relative`}>
        <button
          onClick={() => copyToClipboard(color.value)}
          className="absolute top-2 right-2 p-2 bg-black/20 hover:bg-black/40 rounded-md backdrop-blur-sm transition-colors"
          aria-label="Copy color value"
        >
          {copied ? (
            <Check className="h-4 w-4 text-white" />
          ) : (
            <Copy className="h-4 w-4 text-white" />
          )}
        </button>
      </div>
      <CardHeader>
        <CardTitle className="text-lg">{color.name}</CardTitle>
        <CardDescription className="font-mono text-sm">{color.value}</CardDescription>
        <CardDescription className="text-xs">{color.hsl}</CardDescription>
      </CardHeader>
      <CardContent>
        <p className="text-sm text-muted-foreground">{color.usage}</p>
      </CardContent>
    </Card>
  );
}

export function BrandPage() {
  return (
    <ThemeProvider defaultTheme="dark" storageKey="wolfymaster-theme">
      <div className="min-h-screen bg-background">
        <Navigation />
        <main className="pt-16">
          {/* Hero Section */}
          <section className="relative py-24 px-4 sm:px-6 lg:px-8 border-b border-border">
            <div className="max-w-7xl mx-auto">
              <div className="max-w-4xl">
                <h1 className="text-6xl font-bold mb-6">
                  <span className="text-primary">Wolfy</span>
                  <span className="text-foreground">Master</span> Brand Guide
                </h1>
                <p className="text-xl text-muted-foreground mb-8">
                  A comprehensive style guide for the WolfyMaster brand, ensuring consistency
                  across all digital touchpoints.
                </p>
                <div className="flex gap-4">
                  <Button size="lg">Download Assets</Button>
                  <Button variant="outline" size="lg">
                    View Guidelines
                  </Button>
                </div>
              </div>
            </div>
          </section>

          {/* Design Principles */}
          <section className="py-16 px-4 sm:px-6 lg:px-8 border-b border-border">
            <div className="max-w-7xl mx-auto">
              <h2 className="text-4xl font-bold mb-12">Design Principles</h2>
              <div className="grid md:grid-cols-3 gap-8">
                {designPrinciples.map((principle, index) => (
                  <Card key={index}>
                    <CardHeader>
                      <CardTitle>{principle.title}</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-muted-foreground">{principle.description}</p>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </section>

          {/* Color Palette */}
          <section className="py-16 px-4 sm:px-6 lg:px-8 border-b border-border bg-muted/30">
            <div className="max-w-7xl mx-auto">
              <h2 className="text-4xl font-bold mb-4">Color Palette</h2>
              <p className="text-muted-foreground mb-12 max-w-3xl">
                Our color system is built around a coral primary and purple accent, creating a
                distinctive brand identity that balances warmth with technical sophistication.
              </p>
              <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                {brandColors.map((color, index) => (
                  <ColorCard key={index} color={color} />
                ))}
              </div>
            </div>
          </section>

          {/* Typography */}
          <section className="py-16 px-4 sm:px-6 lg:px-8 border-b border-border">
            <div className="max-w-7xl mx-auto">
              <h2 className="text-4xl font-bold mb-4">Typography</h2>
              <p className="text-muted-foreground mb-12 max-w-3xl">
                We use Inter for all UI elements and headings, with JetBrains Mono for code and
                technical content.
              </p>
              <div className="space-y-12">
                {typographySamples.map((font, index) => (
                  <Card key={index}>
                    <CardHeader>
                      <CardTitle className="text-2xl">{font.name}</CardTitle>
                      <CardDescription>{font.description}</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-6">
                      <div>
                        <p className="text-sm font-medium mb-2">Weights:</p>
                        <div className="flex gap-2">
                          {font.weights.map((weight) => (
                            <Badge key={weight} variant="secondary">
                              {weight}
                            </Badge>
                          ))}
                        </div>
                      </div>
                      <div>
                        <p className="text-sm font-medium mb-2">Sample:</p>
                        <p className={`${font.className} text-lg`}>{font.sample}</p>
                      </div>
                      <div>
                        <p className="text-sm font-medium mb-2">Scale:</p>
                        <div className="space-y-2">
                          <p className={`${font.className} text-sm`}>text-sm (12px)</p>
                          <p className={`${font.className} text-base`}>text-base (16px)</p>
                          <p className={`${font.className} text-lg`}>text-lg (18px)</p>
                          <p className={`${font.className} text-xl`}>text-xl (20px)</p>
                          <p className={`${font.className} text-2xl`}>text-2xl (24px)</p>
                          <p className={`${font.className} text-4xl`}>text-4xl (36px)</p>
                          <p className={`${font.className} text-6xl`}>text-6xl (60px)</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </section>

          {/* Spacing System */}
          <section className="py-16 px-4 sm:px-6 lg:px-8 border-b border-border bg-muted/30">
            <div className="max-w-7xl mx-auto">
              <h2 className="text-4xl font-bold mb-4">Spacing System</h2>
              <p className="text-muted-foreground mb-12 max-w-3xl">
                Consistent spacing creates visual rhythm and hierarchy. We use a scale based on
                4px units.
              </p>
              <div className="grid md:grid-cols-5 gap-6">
                {spacingScale.map((spacing, index) => (
                  <Card key={index}>
                    <CardHeader>
                      <CardTitle className="text-2xl">{spacing.name}</CardTitle>
                      <CardDescription className="font-mono">{spacing.value}</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div
                        className="bg-primary/20 rounded"
                        style={{ height: spacing.value, width: "100%" }}
                      />
                      <p className="text-xs text-muted-foreground mt-2 font-mono">
                        {spacing.usage}
                      </p>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </section>

          {/* Components Showcase */}
          <section className="py-16 px-4 sm:px-6 lg:px-8 border-b border-border">
            <div className="max-w-7xl mx-auto">
              <h2 className="text-4xl font-bold mb-4">Components</h2>
              <p className="text-muted-foreground mb-12 max-w-3xl">
                Our component library is built on shadcn/ui with custom styling to match the
                WolfyMaster brand.
              </p>
              <div className="space-y-8">
                {/* Buttons */}
                <Card>
                  <CardHeader>
                    <CardTitle>Buttons</CardTitle>
                    <CardDescription>Primary actions and interactions</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex flex-wrap gap-4">
                      <Button>Primary Button</Button>
                      <Button variant="secondary">Secondary</Button>
                      <Button variant="outline">Outline</Button>
                      <Button variant="ghost">Ghost</Button>
                    </div>
                    <div className="flex flex-wrap gap-4">
                      <Button size="sm">Small</Button>
                      <Button size="default">Default</Button>
                      <Button size="lg">Large</Button>
                    </div>
                  </CardContent>
                </Card>

                {/* Badges */}
                <Card>
                  <CardHeader>
                    <CardTitle>Badges</CardTitle>
                    <CardDescription>Labels and status indicators</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="flex flex-wrap gap-4">
                      <Badge>Default</Badge>
                      <Badge variant="secondary">Secondary</Badge>
                      <Badge variant="outline">Outline</Badge>
                    </div>
                  </CardContent>
                </Card>

                {/* Cards */}
                <Card>
                  <CardHeader>
                    <CardTitle>Cards</CardTitle>
                    <CardDescription>Container components for content</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="grid md:grid-cols-2 gap-4">
                      <Card>
                        <CardHeader>
                          <CardTitle>Card Example</CardTitle>
                          <CardDescription>This is a card description</CardDescription>
                        </CardHeader>
                        <CardContent>
                          <p className="text-sm text-muted-foreground">
                            Cards use rounded-xl borders and subtle shadows for depth.
                          </p>
                        </CardContent>
                      </Card>
                      <Card>
                        <CardHeader>
                          <CardTitle>Another Card</CardTitle>
                          <CardDescription>With consistent styling</CardDescription>
                        </CardHeader>
                        <CardContent>
                          <p className="text-sm text-muted-foreground">
                            All cards follow the same visual language.
                          </p>
                        </CardContent>
                      </Card>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </section>

          {/* Logo Usage */}
          <section className="py-16 px-4 sm:px-6 lg:px-8 border-b border-border bg-muted/30">
            <div className="max-w-7xl mx-auto">
              <h2 className="text-4xl font-bold mb-4">Logo Usage</h2>
              <p className="text-muted-foreground mb-12 max-w-3xl">
                The WolfyMaster logo consists of two parts: "Wolfy" in primary coral and "Master"
                in foreground color.
              </p>
              <div className="grid md:grid-cols-2 gap-8">
                <Card>
                  <CardHeader>
                    <CardTitle>Logo Composition</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex items-center text-2xl font-bold">
                      <span className="text-primary">Wolfy</span>
                      <span className="text-foreground">Master</span>
                    </div>
                    <Separator />
                    <div className="space-y-2 text-sm">
                      <p>
                        <strong>Font:</strong> Inter, Bold (700)
                      </p>
                      <p>
                        <strong>Size:</strong> text-xl (20px) minimum
                      </p>
                      <p>
                        <strong>Spacing:</strong> No space between words
                      </p>
                    </div>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader>
                    <CardTitle>Usage Guidelines</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="space-y-2 text-sm">
                      <p>✓ Use on light and dark backgrounds</p>
                      <p>✓ Maintain minimum size for readability</p>
                      <p>✓ Keep colors consistent (coral + foreground)</p>
                      <p>✗ Don't modify the color scheme</p>
                      <p>✗ Don't add effects or shadows</p>
                      <p>✗ Don't stretch or distort</p>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </section>

          {/* Layout System */}
          <section className="py-16 px-4 sm:px-6 lg:px-8">
            <div className="max-w-7xl mx-auto">
              <h2 className="text-4xl font-bold mb-4">Layout System</h2>
              <p className="text-muted-foreground mb-12 max-w-3xl">
                Consistent container widths and responsive breakpoints ensure a cohesive experience
                across all devices.
              </p>
              <div className="grid md:grid-cols-3 gap-6">
                <Card>
                  <CardHeader>
                    <CardTitle>max-w-7xl</CardTitle>
                    <CardDescription>Full sections</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="bg-primary/10 rounded p-4 text-center text-sm">
                      Main content width
                    </div>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader>
                    <CardTitle>max-w-4xl</CardTitle>
                    <CardDescription>Content blocks</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="bg-primary/10 rounded p-4 text-center text-sm">
                      Narrower content
                    </div>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader>
                    <CardTitle>max-w-prose</CardTitle>
                    <CardDescription>Text content</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="bg-primary/10 rounded p-4 text-center text-sm">
                      Optimal reading width
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </section>
        </main>
        <Footer />
      </div>
    </ThemeProvider>
  );
}
