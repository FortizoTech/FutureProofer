import { ChatInterface } from "@/components/chat-interface";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Sparkles, TrendingUp, Lightbulb, Target, MessageSquare } from "lucide-react";

export default function BusinessMate() {
  const suggestions = [
    "What skills should I learn next?",
    "Analyze my career trajectory",
    "Find market opportunities in my region",
    "Suggest business strategies for SMEs",
    "Latest industry trends in West Africa",
    "Help me pivot my career",
  ];

  const capabilities = [
    {
      icon: TrendingUp,
      title: "Market Analysis",
      description: "Real-time insights on market trends and opportunities across ECOWAS nations",
    },
    {
      icon: Lightbulb,
      title: "Strategic Guidance",
      description: "AI-powered recommendations for career development and business growth",
    },
    {
      icon: Target,
      title: "Goal Planning",
      description: "Personalized roadmaps aligned with your professional objectives",
    },
    {
      icon: MessageSquare,
      title: "24/7 Availability",
      description: "Always-on support for your career and business questions",
    },
  ];

  return (
    <div className="space-y-8">
      <div>
        <div className="flex items-center gap-3 mb-3">
          <div className="p-3 bg-gradient-to-br from-primary to-accent rounded-lg">
            <Sparkles className="h-6 w-6 text-white" />
          </div>
          <div>
            <h1 className="font-serif text-3xl font-bold" data-testid="text-page-title">BusinessMate AI</h1>
            <p className="text-muted-foreground">Your intelligent career and business advisor powered by AI</p>
          </div>
        </div>
        <Badge className="bg-primary/10 text-primary border-primary/20">
          Powered by Advanced AI Models
        </Badge>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Chat Interface - Takes 2 columns */}
        <div className="lg:col-span-2">
          <ChatInterface 
            title="BusinessMate AI Assistant"
            suggestions={suggestions}
          />
        </div>

        {/* Sidebar with capabilities */}
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="font-serif">What I Can Do</CardTitle>
              <CardDescription>AI-powered capabilities to help you succeed</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {capabilities.map((capability, idx) => (
                <div key={idx} className="flex gap-3">
                  <div className="p-2 bg-primary/10 rounded-md h-fit">
                    <capability.icon className="h-4 w-4 text-primary" />
                  </div>
                  <div>
                    <h4 className="font-medium text-sm mb-1">{capability.title}</h4>
                    <p className="text-xs text-muted-foreground leading-relaxed">{capability.description}</p>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-primary/10 to-accent/10 border-primary/20">
            <CardHeader>
              <CardTitle className="font-serif text-lg">Pro Tip</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm leading-relaxed">
                Ask specific questions about your industry, location, and goals for the most accurate and actionable insights. The more context you provide, the better I can help!
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="font-serif text-lg">Recent Topics</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              {[
                "Data Science Career Path",
                "SME Digital Transformation",
                "Remote Work Opportunities",
                "Skill Development Plan",
              ].map((topic, idx) => (
                <button
                  key={idx}
                  className="w-full text-left px-3 py-2 text-sm rounded-md hover-elevate active-elevate-2 transition-all"
                  onClick={() => console.log(`Load topic: ${topic}`)}
                  data-testid={`button-topic-${idx}`}
                >
                  {topic}
                </button>
              ))}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
