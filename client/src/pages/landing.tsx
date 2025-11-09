import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { TrendingUp, Sparkles, Users, Target, CheckCircle2, ArrowRight, BarChart3, MessageSquare, BookOpen } from "lucide-react";
import { useLocation } from "wouter";
import logoUrl from "@assets/Future_Proofer_Logo-ig-square-1080-1080-removebg-preview_1762643734864.png";
import heroImageUrl from "@assets/generated_images/Black_professional_royal_blue_suit_5d13b154.png";

export default function Landing() {
  const [, setLocation] = useLocation();

  const features = [
    {
      icon: TrendingUp,
      title: "AI-Powered Forecasts",
      description: "Get precise career and business predictions based on West African market trends",
    },
    {
      icon: BarChart3,
      title: "Market Intelligence",
      description: "Access real-time insights on skill demand, job markets, and growth opportunities",
    },
    {
      icon: MessageSquare,
      title: "BusinessMate AI",
      description: "Your 24/7 AI advisor for strategic career and business guidance",
    },
    {
      icon: BookOpen,
      title: "ThinkForge Learning",
      description: "Personalized learning paths with masterclasses tailored to your goals",
    },
  ];

  const stats = [
    { value: "10,000+", label: "Youth Empowered" },
    { value: "2,000+", label: "SMEs Supported" },
    { value: "15", label: "ECOWAS Nations" },
    { value: "89%", label: "Success Rate" },
  ];

  const testimonials = [
    {
      name: "Amara Johnson",
      role: "Data Analyst",
      location: "Freetown, Sierra Leone",
      content: "Future Proofer helped me identify emerging skills in data science. Within 6 months, I landed my dream job with a 40% salary increase.",
    },
    {
      name: "Ibrahim Kamara",
      role: "SME Owner",
      location: "Conakry, Guinea",
      content: "The market insights from Future Proofer guided our expansion strategy. Our revenue grew 150% in one year.",
    },
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Navigation */}
      <nav className="sticky top-0 z-50 border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <img src={logoUrl} alt="Future Proofer" className="h-14" />
            </div>
            <div className="hidden md:flex items-center gap-8">
              <a href="#features" className="text-sm font-medium hover:text-primary transition-colors">Features</a>
              <a href="#how-it-works" className="text-sm font-medium hover:text-primary transition-colors">How It Works</a>
              <a href="#testimonials" className="text-sm font-medium hover:text-primary transition-colors">Testimonials</a>
              <a href="#pricing" className="text-sm font-medium hover:text-primary transition-colors">Pricing</a>
            </div>
            <div className="flex items-center gap-3">
              <Button 
                variant="ghost" 
                onClick={() => setLocation('/login')}
                data-testid="button-login"
              >
                Log In
              </Button>
              <Button 
                onClick={() => setLocation('/signup')}
                data-testid="button-signup"
              >
                Get Started
              </Button>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="py-20 md:py-32 bg-gradient-to-br from-background via-background to-primary/5">
        <div className="container max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-8">
              <div>
                <Badge className="mb-4 bg-primary/10 text-primary border-primary/20">
                  <Sparkles className="h-3 w-3 mr-1" />
                  AI-Powered Foresight
                </Badge>
                <h1 className="font-serif text-5xl md:text-6xl font-bold mb-6 leading-tight">
                  AI Foresight for Smarter Careers and Stronger Businesses
                </h1>
                <p className="text-xl text-muted-foreground leading-relaxed">
                  Empowering Africa's next generation with intelligent career planning and business strategy through localized AI insights.
                </p>
              </div>
              <div className="flex flex-col sm:flex-row gap-4">
                <Button 
                  size="lg" 
                  className="text-lg px-8"
                  onClick={() => setLocation('/signup')}
                  data-testid="button-hero-signup"
                >
                  Start Free Trial
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
                <Button 
                  size="lg" 
                  variant="outline" 
                  className="text-lg px-8"
                  onClick={() => setLocation('/login')}
                  data-testid="button-hero-demo"
                >
                  Watch Demo
                </Button>
              </div>
              <div className="flex items-center gap-6 pt-4">
                <div className="flex -space-x-3">
                  {[1, 2, 3, 4].map((i) => (
                    <div key={i} className="h-10 w-10 rounded-full bg-primary/20 border-2 border-background flex items-center justify-center">
                      <Users className="h-5 w-5 text-primary" />
                    </div>
                  ))}
                </div>
                <div className="text-sm">
                  <p className="font-semibold">10,000+ professionals</p>
                  <p className="text-muted-foreground">already future-proofing their careers</p>
                </div>
              </div>
            </div>
            <div className="relative">
              <div className="relative z-10 rounded-2xl overflow-hidden">
                <img 
                  src={heroImageUrl} 
                  alt="Professional success with Future Proofer" 
                  className="w-full h-auto rounded-2xl shadow-2xl"
                />
                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent p-6">
                  <Badge className="mb-2 bg-white/20 text-white border-white/30 backdrop-blur-sm">
                    <Sparkles className="h-3 w-3 mr-1" />
                    AI-Powered Growth
                  </Badge>
                  <p className="text-white font-medium text-lg">Transform Your Career & Business Future</p>
                </div>
              </div>
              <div className="absolute -bottom-6 -right-6 bg-gradient-to-br from-primary to-accent rounded-2xl p-6 shadow-xl max-w-xs">
                <Card className="shadow-xl">
                  <CardContent className="p-6">
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <h3 className="font-serif font-semibold">Career Forecast</h3>
                        <Badge variant="secondary">AI Generated</Badge>
                      </div>
                      <div className="space-y-3">
                        <div className="flex items-center justify-between p-3 bg-muted rounded-lg">
                          <span className="text-sm">Data Science Demand</span>
                          <span className="font-bold text-green-600">+45%</span>
                        </div>
                        <div className="flex items-center justify-between p-3 bg-muted rounded-lg">
                          <span className="text-sm">Python Skills Gap</span>
                          <span className="font-bold text-amber-600">High</span>
                        </div>
                        <div className="flex items-center justify-between p-3 bg-muted rounded-lg">
                          <span className="text-sm">Remote Opportunities</span>
                          <span className="font-bold text-green-600">+67%</span>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 border-y border-border bg-muted/30">
        <div className="container max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, idx) => (
              <div key={idx} className="text-center">
                <div className="text-4xl md:text-5xl font-bold font-serif text-primary mb-2">{stat.value}</div>
                <div className="text-sm text-muted-foreground">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20 md:py-32">
        <div className="container max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <Badge className="mb-4">Features</Badge>
            <h2 className="font-serif text-4xl md:text-5xl font-bold mb-4">Everything You Need to Succeed</h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Comprehensive tools powered by AI to help you navigate your career and business journey
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {features.map((feature, idx) => (
              <Card key={idx} className="hover-elevate active-elevate-2 transition-all">
                <CardContent className="p-8">
                  <div className="p-3 bg-primary/10 rounded-lg w-fit mb-4">
                    <feature.icon className="h-6 w-6 text-primary" />
                  </div>
                  <h3 className="font-serif text-2xl font-semibold mb-3">{feature.title}</h3>
                  <p className="text-muted-foreground leading-relaxed">{feature.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section id="how-it-works" className="py-20 md:py-32 bg-muted/30">
        <div className="container max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <Badge className="mb-4">How It Works</Badge>
            <h2 className="font-serif text-4xl md:text-5xl font-bold mb-4">Simple, Powerful, Effective</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {[
              { step: "01", title: "Choose Your Focus", desc: "Select Career or Business mode" },
              { step: "02", title: "Input Your Profile", desc: "Share your skills and goals" },
              { step: "03", title: "Get AI Insights", desc: "Receive personalized forecasts" },
              { step: "04", title: "Take Action", desc: "Follow learning paths and strategies" },
            ].map((item, idx) => (
              <div key={idx} className="text-center">
                <div className="text-5xl font-bold font-serif text-primary/20 mb-4">{item.step}</div>
                <h3 className="font-serif text-xl font-semibold mb-2">{item.title}</h3>
                <p className="text-muted-foreground">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section id="testimonials" className="py-20 md:py-32">
        <div className="container max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <Badge className="mb-4">Success Stories</Badge>
            <h2 className="font-serif text-4xl md:text-5xl font-bold mb-4">Trusted by Thousands</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {testimonials.map((testimonial, idx) => (
              <Card key={idx}>
                <CardContent className="p-8">
                  <p className="text-lg leading-relaxed mb-6 italic">"{testimonial.content}"</p>
                  <div>
                    <p className="font-semibold">{testimonial.name}</p>
                    <p className="text-sm text-muted-foreground">{testimonial.role}</p>
                    <p className="text-sm text-muted-foreground">{testimonial.location}</p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 md:py-32 bg-gradient-to-br from-primary to-accent text-primary-foreground">
        <div className="container max-w-4xl mx-auto px-6 text-center">
          <h2 className="font-serif text-4xl md:text-5xl font-bold mb-6">Ready to Future-Proof Your Career?</h2>
          <p className="text-xl mb-8 opacity-90">Join thousands of professionals and businesses across West Africa</p>
          <Button 
            size="lg" 
            variant="secondary"
            className="text-lg px-8"
            onClick={() => setLocation('/signup')}
            data-testid="button-cta-signup"
          >
            Start Your Free Trial
            <ArrowRight className="ml-2 h-5 w-5" />
          </Button>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 border-t border-border">
        <div className="container max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
            <div>
              <img src={logoUrl} alt="Future Proofer" className="h-10 mb-4" />
              <p className="text-sm text-muted-foreground">AI foresight for smarter careers and stronger businesses</p>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Product</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li><a href="#" className="hover:text-primary">Features</a></li>
                <li><a href="#" className="hover:text-primary">Pricing</a></li>
                <li><a href="#" className="hover:text-primary">BusinessMate AI</a></li>
                <li><a href="#" className="hover:text-primary">ThinkForge</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Company</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li><a href="#" className="hover:text-primary">About</a></li>
                <li><a href="#" className="hover:text-primary">Careers</a></li>
                <li><a href="#" className="hover:text-primary">Contact</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Contact</h4>
              <p className="text-sm text-muted-foreground">info@fortizotechnologies.com</p>
              <p className="text-sm text-muted-foreground">+220 7330 540</p>
            </div>
          </div>
          <div className="pt-8 border-t border-border text-center text-sm text-muted-foreground">
            <p>© 2024 Fortizo Technologies. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
