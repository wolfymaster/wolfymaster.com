import { ThemeProvider } from "@/components/theme-provider";
import { Navigation } from "@/components/navigation";
import { Footer } from "@/components/footer";
import { Button } from "@/components/ui/button";
import { Home, ArrowLeft } from "lucide-react";

export function NotFoundPage() {
  return (
    <ThemeProvider defaultTheme="dark" storageKey="wolfymaster-theme">
      <div className="min-h-screen bg-background flex flex-col">
        <Navigation />
        <main className="flex-1 pt-16 flex items-center justify-center px-4 sm:px-6 lg:px-8">
          <div className="max-w-2xl mx-auto text-center">
            <div className="mb-8">
              <h1 className="text-9xl font-bold mb-4">
                <span className="text-primary">4</span>
                <span className="text-foreground">0</span>
                <span className="text-accent">4</span>
              </h1>
              <h2 className="text-4xl font-bold mb-4 text-foreground">
                Page Not Found
              </h2>
              <p className="text-xl text-muted-foreground mb-8 max-w-md mx-auto">
                The page you're looking for doesn't exist or has been moved. 
                Let's get you back on track.
              </p>
            </div>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Button 
                size="lg" 
                onClick={() => window.location.href = '/'}
                className="min-w-[200px]"
              >
                <Home className="h-4 w-4 mr-2" />
                Go Home
              </Button>
              <Button 
                variant="outline" 
                size="lg"
                onClick={() => window.history.back()}
                className="min-w-[200px]"
              >
                <ArrowLeft className="h-4 w-4 mr-2" />
                Go Back
              </Button>
            </div>

            <div className="mt-16 pt-8 border-t border-border">
              <p className="text-sm text-muted-foreground mb-4">
                Popular pages you might be looking for:
              </p>
              <div className="flex flex-wrap gap-2 justify-center">
                <Button variant="ghost" size="sm" onClick={() => window.location.href = '/'}>
                  Home
                </Button>
                <Button variant="ghost" size="sm" onClick={() => window.location.href = '/#about'}>
                  About
                </Button>
                <Button variant="ghost" size="sm" onClick={() => window.location.href = '/#experience'}>
                  Experience
                </Button>
                <Button variant="ghost" size="sm" onClick={() => window.location.href = '/#twitch'}>
                  Twitch
                </Button>
                <Button variant="ghost" size="sm" onClick={() => window.location.href = '/#contact'}>
                  Contact
                </Button>
                <Button variant="ghost" size="sm" onClick={() => window.location.href = '/brand'}>
                  Brand Guide
                </Button>
              </div>
            </div>
          </div>
        </main>
        <Footer />
      </div>
    </ThemeProvider>
  );
}
