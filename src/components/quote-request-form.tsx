import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { Send, Clock, Mail, MapPin, CheckCircle2 } from "lucide-react";
import { SiGithub, SiLinkedin, SiTwitch } from "react-icons/si";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { insertQuoteRequestSchema, type InsertQuoteRequest } from "@/types";
import { apiRequest } from "@/lib/queryClient";
import { generateNonce } from "@/lib/nonce";

const projectTypes = [
  { value: "web-application", label: "Web Application" },
  { value: "mobile-app", label: "Mobile App" },
  { value: "api-development", label: "API Development" },
  { value: "consulting", label: "Technical Consulting" },
  { value: "system-integration", label: "System Integration" },
  { value: "other", label: "Other" },
];

const budgetRanges = [
  { value: "under-10k", label: "Under $10,000" },
  { value: "10k-25k", label: "$10,000 - $25,000" },
  { value: "25k-50k", label: "$25,000 - $50,000" },
  { value: "50k-100k", label: "$50,000 - $100,000" },
  { value: "over-100k", label: "Over $100,000" },
  { value: "discuss", label: "Let's Discuss" },
];

const socialLinks = [
  { href: "https://github.com/wolfymaster", icon: SiGithub, label: "GitHub" },
  { href: "https://linkedin.com/in/wolfymaster", icon: SiLinkedin, label: "LinkedIn" },
  { href: "https://twitch.tv/wolfymaster", icon: SiTwitch, label: "Twitch" },
];

export function QuoteRequestForm() {
  const { toast } = useToast();

  const form = useForm<InsertQuoteRequest>({
    resolver: zodResolver(insertQuoteRequestSchema),
    defaultValues: {
      name: "",
      email: "",
      projectType: "",
      budget: "",
      message: "",
      website: "", // Honeypot field
    },
  });

  const submitMutation = useMutation({
    mutationFn: async (data: InsertQuoteRequest) => {
      const nonce = await generateNonce();
      return apiRequest("POST", "/api/quotes", data, {
        "X-Form-Nonce": nonce,
      });
    },
    onSuccess: () => {
      toast({
        title: "Quote Request Submitted",
        description: "Thank you! I'll get back to you within 24-48 hours.",
      });
      form.reset();
    },
    onError: () => {
      toast({
        title: "Something went wrong",
        description: "Please try again or email me directly.",
        variant: "destructive",
      });
    },
  });

  const onSubmit = (data: InsertQuoteRequest) => {
    submitMutation.mutate(data);
  };

  return (
    <section id="contact" className="py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <Badge variant="secondary" className="mb-4" data-testid="badge-contact">
            <Mail className="w-3 h-3 mr-1" />
            Get In Touch
          </Badge>
          <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-4" data-testid="heading-contact">
            Let's Talk About Your Project
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto" data-testid="text-contact-description">
            Have a project in mind? Fill out the form.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12">
          <Card>
            <CardContent className="p-8">
              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                  <div className="grid sm:grid-cols-2 gap-4">
                    <FormField
                      control={form.control}
                      name="name"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Name</FormLabel>
                          <FormControl>
                            <Input 
                              placeholder="Your name" 
                              {...field} 
                              data-testid="input-name"
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="email"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Email</FormLabel>
                          <FormControl>
                            <Input 
                              type="email" 
                              placeholder="you@company.com" 
                              {...field}
                              data-testid="input-email"
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>

                  <div className="grid sm:grid-cols-2 gap-4">
                    <FormField
                      control={form.control}
                      name="projectType"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Project Type</FormLabel>
                          <Select onValueChange={field.onChange} value={field.value}>
                            <FormControl>
                              <SelectTrigger data-testid="select-project-type">
                                <SelectValue placeholder="Select type" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              {projectTypes.map((type) => (
                                <SelectItem key={type.value} value={type.value}>
                                  {type.label}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="budget"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Budget Range</FormLabel>
                          <Select onValueChange={field.onChange} value={field.value}>
                            <FormControl>
                              <SelectTrigger data-testid="select-budget">
                                <SelectValue placeholder="Select budget" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              {budgetRanges.map((range) => (
                                <SelectItem key={range.value} value={range.value}>
                                  {range.label}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>

                  <FormField
                    control={form.control}
                    name="message"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Project Details</FormLabel>
                        <FormControl>
                          <Textarea
                            placeholder="Tell me about your project, goals, timeline, and any specific requirements..."
                            className="min-h-[120px] resize-none"
                            {...field}
                            data-testid="input-message"
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  {/* Honeypot field - hidden from users, visible to bots */}
                  <div
                    aria-hidden="true"
                    style={{
                      position: "absolute",
                      left: "-9999px",
                      top: "-9999px",
                      opacity: 0,
                      height: 0,
                      overflow: "hidden",
                    }}
                  >
                    <FormField
                      control={form.control}
                      name="website"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Website</FormLabel>
                          <FormControl>
                            <Input
                              type="text"
                              placeholder="Your website"
                              autoComplete="off"
                              tabIndex={-1}
                              {...field}
                            />
                          </FormControl>
                        </FormItem>
                      )}
                    />
                  </div>

                  <Button
                    type="submit"
                    size="lg"
                    className="w-full"
                    disabled={submitMutation.isPending}
                    data-testid="button-submit-quote"
                  >
                    {submitMutation.isPending ? (
                      <>Submitting...</>
                    ) : (
                      <>
                        <Send className="h-4 w-4 mr-2" />
                        Submit Quote Request
                      </>
                    )}
                  </Button>
                </form>
              </Form>
            </CardContent>
          </Card>

          <div className="space-y-6">
            <Card>
              <CardContent className="p-8">
                <h3 className="text-xl font-semibold text-foreground mb-6" data-testid="heading-why-work">
                  How I Work
                </h3>
                <div className="space-y-4">
                  <div className="flex items-start gap-3 flex-wrap" data-testid="benefit-experience">
                    <CheckCircle2 className="h-5 w-5 text-primary mt-0.5" />
                    <div>
                      <p className="font-medium text-foreground" data-testid="text-benefit-title-0">Architecture First</p>
                      <p className="text-sm text-muted-foreground" data-testid="text-benefit-desc-0">
                        Discovery, design, then build. No AI shortcuts that become debt.
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3 flex-wrap" data-testid="benefit-fullstack">
                    <CheckCircle2 className="h-5 w-5 text-primary mt-0.5" />
                    <div>
                      <p className="font-medium text-foreground" data-testid="text-benefit-title-1">Built for Scale</p>
                      <p className="text-sm text-muted-foreground" data-testid="text-benefit-desc-1">
                        Systems designed to grow with your business, not against it.
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3 flex-wrap" data-testid="benefit-communication">
                    <CheckCircle2 className="h-5 w-5 text-primary mt-0.5" />
                    <div>
                      <p className="font-medium text-foreground" data-testid="text-benefit-title-2">The Right Thing</p>
                      <p className="text-sm text-muted-foreground" data-testid="text-benefit-desc-2">
                        AI accelerates delivery. Experience ensures we build correctly.
                      </p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-8">
                <h3 className="text-xl font-semibold text-foreground mb-6" data-testid="heading-contact-info">
                  Contact Information
                </h3>
                <div className="space-y-4">
                  <div className="flex items-center gap-3 flex-wrap" data-testid="contact-response-time">
                    <Clock className="h-5 w-5 text-muted-foreground" />
                    <div>
                      <p className="font-medium text-foreground" data-testid="text-response-label">Response Time</p>
                      <p className="text-sm text-muted-foreground" data-testid="text-response-value">24-48 hours</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3 flex-wrap" data-testid="contact-location">
                    <MapPin className="h-5 w-5 text-muted-foreground" />
                    <div>
                      <p className="font-medium text-foreground" data-testid="text-location-label">Location</p>
                      <p className="text-sm text-muted-foreground" data-testid="text-location-value">Erie, PA (EST)</p>
                    </div>
                  </div>
                </div>

                <div className="mt-6 pt-6 border-t border-border">
                  <p className="text-sm text-muted-foreground mb-4" data-testid="text-connect">Connect with me:</p>
                  <div className="flex gap-3 flex-wrap">
                    {socialLinks.map((link) => (
                      <a
                        key={link.href}
                        href={link.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        data-testid={`link-contact-${link.label.toLowerCase()}`}
                      >
                        <Button variant="outline" size="icon">
                          <link.icon className="h-4 w-4" />
                        </Button>
                      </a>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
}
