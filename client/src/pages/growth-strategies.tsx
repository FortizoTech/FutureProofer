import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { TrendingUp, Target, Lightbulb, Users, ArrowRight, CheckCircle2, AlertCircle } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export default function GrowthStrategies() {
  const strategies = [
    {
      title: "Digital Transformation Initiative",
      description: "Modernize your business operations with cloud-based tools and automation",
      priority: "high" as const,
      impact: 85,
      effort: 60,
      timeline: "3-6 months",
      roi: "+150% revenue growth",
      status: "recommended" as const,
      steps: [
        "Audit current digital infrastructure",
        "Identify automation opportunities",
        "Implement cloud-based CRM system",
        "Train team on new tools",
      ],
    },
    {
      title: "Market Expansion to ECOWAS Region",
      description: "Expand your customer base across West African markets",
      priority: "medium" as const,
      impact: 75,
      effort: 80,
      timeline: "6-12 months",
      roi: "+200% market reach",
      status: "in-progress" as const,
      steps: [
        "Market research in target countries",
        "Establish local partnerships",
        "Adapt product for local markets",
        "Launch pilot programs",
      ],
    },
    {
      title: "Customer Retention Program",
      description: "Build loyalty programs to increase customer lifetime value",
      priority: "high" as const,
      impact: 90,
      effort: 40,
      timeline: "1-3 months",
      roi: "+45% customer retention",
      status: "recommended" as const,
      steps: [
        "Design loyalty rewards system",
        "Implement customer feedback loop",
        "Create personalized communication",
        "Launch retention campaign",
      ],
    },
  ];

  const metrics = [
    { label: "Revenue Growth Potential", value: "156%", icon: TrendingUp },
    { label: "Market Opportunities", value: "23", icon: Target },
    { label: "Strategic Initiatives", value: "8", icon: Lightbulb },
    { label: "Potential Partnerships", value: "15", icon: Users },
  ];

  return (
    <div className="space-y-8">
      <div>
        <h1 className="font-serif text-3xl font-bold mb-2" data-testid="text-page-title">Growth Strategies</h1>
        <p className="text-muted-foreground">AI-powered strategic recommendations for sustainable business growth</p>
      </div>

      {/* Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {metrics.map((metric, idx) => (
          <Card key={idx}>
            <CardContent className="p-6">
              <div className="flex items-center justify-between mb-4">
                <div className="p-2 bg-primary/10 rounded-md">
                  <metric.icon className="h-4 w-4 text-primary" />
                </div>
              </div>
              <div className="text-3xl font-bold font-serif mb-1">{metric.value}</div>
              <div className="text-sm text-muted-foreground">{metric.label}</div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* AI Insight Banner */}
      <Card className="bg-gradient-to-br from-primary/10 to-accent/10 border-primary/20">
        <CardContent className="p-6">
          <div className="flex items-start gap-4">
            <div className="p-3 bg-primary/20 rounded-lg">
              <Lightbulb className="h-6 w-6 text-primary" />
            </div>
            <div className="flex-1">
              <h3 className="font-serif font-semibold text-lg mb-2">AI Strategic Analysis</h3>
              <p className="text-sm text-muted-foreground mb-4">
                Based on your business profile and market trends, we've identified 8 high-impact growth opportunities. 
                Our AI models predict a potential 156% revenue increase over 12 months by implementing the recommended strategies.
              </p>
              <Button size="sm" data-testid="button-view-full-analysis">
                View Full Analysis
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Strategies */}
      <Tabs defaultValue="recommended" className="w-full">
        <TabsList>
          <TabsTrigger value="recommended" data-testid="tab-recommended">Recommended</TabsTrigger>
          <TabsTrigger value="in-progress" data-testid="tab-in-progress">In Progress</TabsTrigger>
          <TabsTrigger value="completed" data-testid="tab-completed">Completed</TabsTrigger>
        </TabsList>

        <TabsContent value="recommended" className="mt-6 space-y-6">
          {strategies
            .filter((s) => s.status === "recommended")
            .map((strategy, idx) => (
              <Card key={idx} className="hover-elevate active-elevate-2 transition-all" data-testid={`card-strategy-${idx}`}>
                <CardHeader>
                  <div className="flex items-start justify-between gap-4 flex-wrap">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        <CardTitle className="font-serif text-xl">{strategy.title}</CardTitle>
                        <Badge
                          variant="outline"
                          className={
                            strategy.priority === "high"
                              ? "bg-red-500/10 text-red-700 dark:text-red-400 border-red-500/20"
                              : "bg-amber-500/10 text-amber-700 dark:text-amber-400 border-amber-500/20"
                          }
                        >
                          {strategy.priority === "high" ? "High Priority" : "Medium Priority"}
                        </Badge>
                      </div>
                      <CardDescription>{strategy.description}</CardDescription>
                    </div>
                    <div className="flex gap-2">
                      <Button variant="outline" size="sm" data-testid="button-learn-more">
                        Learn More
                      </Button>
                      <Button size="sm" data-testid="button-start-strategy">
                        Start Strategy
                      </Button>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div>
                      <p className="text-sm text-muted-foreground mb-1">Timeline</p>
                      <p className="font-medium">{strategy.timeline}</p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground mb-1">Expected ROI</p>
                      <p className="font-medium text-green-600 dark:text-green-400">{strategy.roi}</p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground mb-1">Effort Level</p>
                      <p className="font-medium">{strategy.effort > 70 ? "High" : strategy.effort > 40 ? "Medium" : "Low"}</p>
                    </div>
                  </div>

                  <div className="space-y-3">
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">Impact Score</span>
                      <span className="font-medium">{strategy.impact}/100</span>
                    </div>
                    <Progress value={strategy.impact} className="h-2" />
                  </div>

                  <div>
                    <h4 className="font-medium mb-3">Implementation Steps</h4>
                    <div className="space-y-2">
                      {strategy.steps.map((step, stepIdx) => (
                        <div key={stepIdx} className="flex items-start gap-2 text-sm">
                          <div className="p-0.5 bg-primary/10 rounded-full mt-0.5">
                            <div className="h-4 w-4 flex items-center justify-center text-primary text-xs font-medium">
                              {stepIdx + 1}
                            </div>
                          </div>
                          <span>{step}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
        </TabsContent>

        <TabsContent value="in-progress" className="mt-6 space-y-6">
          {strategies
            .filter((s) => s.status === "in-progress")
            .map((strategy, idx) => (
              <Card key={idx} className="border-primary/20">
                <CardHeader>
                  <div className="flex items-center gap-2 mb-2">
                    <CardTitle className="font-serif text-xl">{strategy.title}</CardTitle>
                    <Badge className="bg-primary/10 text-primary border-primary/20">In Progress</Badge>
                  </div>
                  <CardDescription>{strategy.description}</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-3">
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">Progress</span>
                      <span className="font-medium">35% Complete</span>
                    </div>
                    <Progress value={35} className="h-2" />
                  </div>
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <AlertCircle className="h-4 w-4" />
                    <span>Next milestone: Complete market research (Due in 5 days)</span>
                  </div>
                  <Button className="w-full" variant="outline" data-testid="button-view-progress">
                    View Detailed Progress
                  </Button>
                </CardContent>
              </Card>
            ))}
        </TabsContent>

        <TabsContent value="completed" className="mt-6">
          <Card>
            <CardContent className="p-12 text-center">
              <CheckCircle2 className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
              <h3 className="font-serif text-xl font-semibold mb-2">No Completed Strategies Yet</h3>
              <p className="text-muted-foreground mb-6">
                Start implementing recommended strategies to track your progress here
              </p>
              <Button data-testid="button-explore-strategies">Explore Strategies</Button>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
