import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Network, Workflow, CircuitBoard, GitBranch, Sparkles, Download, Share2 } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export default function SystemsThinking() {
  const systemMaps = [
    {
      title: "Customer Acquisition System",
      description: "End-to-end flow from marketing to customer conversion",
      nodes: 12,
      connections: 18,
      bottlenecks: 2,
      opportunities: 5,
      lastUpdated: "2 days ago",
    },
    {
      title: "Product Development Cycle",
      description: "Innovation pipeline from ideation to market launch",
      nodes: 15,
      connections: 22,
      bottlenecks: 1,
      opportunities: 3,
      lastUpdated: "1 week ago",
    },
    {
      title: "Supply Chain Network",
      description: "Procurement, logistics, and delivery operations",
      nodes: 20,
      connections: 31,
      bottlenecks: 3,
      opportunities: 7,
      lastUpdated: "3 days ago",
    },
  ];

  const insights = [
    {
      type: "bottleneck",
      title: "Payment Processing Delays",
      description: "Manual verification causing 3-day delays in customer onboarding",
      impact: "High",
      suggestion: "Implement automated KYC verification to reduce onboarding time by 80%",
    },
    {
      type: "opportunity",
      title: "Cross-Selling Potential",
      description: "70% of customers purchase only one product category",
      impact: "Medium",
      suggestion: "Create bundled offerings and personalized recommendations",
    },
    {
      type: "risk",
      title: "Single Supplier Dependency",
      description: "85% of raw materials from one supplier creates vulnerability",
      impact: "High",
      suggestion: "Diversify supplier base across 3-4 reliable partners",
    },
  ];

  return (
    <div className="space-y-8">
      <div>
        <div className="flex items-center gap-3 mb-3">
          <div className="p-3 bg-gradient-to-br from-primary to-accent rounded-lg">
            <Network className="h-6 w-6 text-white" />
          </div>
          <div>
            <h1 className="font-serif text-3xl font-bold" data-testid="text-page-title">Systems Thinking Tool</h1>
            <p className="text-muted-foreground">Visualize and optimize your business as an interconnected system</p>
          </div>
        </div>
        <Badge className="bg-primary/10 text-primary border-primary/20">
          <Sparkles className="h-3 w-3 mr-1" />
          AI-Powered Analysis
        </Badge>
      </div>

      {/* Overview Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {[
          { icon: Network, label: "System Maps", value: "3", color: "text-blue-600" },
          { icon: CircuitBoard, label: "Total Nodes", value: "47", color: "text-purple-600" },
          { icon: GitBranch, label: "Connections", value: "71", color: "text-green-600" },
          { icon: Workflow, label: "Bottlenecks", value: "6", color: "text-red-600" },
        ].map((stat, idx) => (
          <Card key={idx}>
            <CardContent className="p-6">
              <div className="flex items-center justify-between mb-4">
                <div className={`p-2 bg-primary/10 rounded-md ${stat.color}`}>
                  <stat.icon className="h-4 w-4" />
                </div>
              </div>
              <div className="text-3xl font-bold font-serif mb-1">{stat.value}</div>
              <div className="text-sm text-muted-foreground">{stat.label}</div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* AI Insights Banner */}
      <Card className="bg-gradient-to-br from-primary/10 to-accent/10 border-primary/20">
        <CardContent className="p-6">
          <div className="flex items-start gap-4">
            <div className="p-3 bg-primary/20 rounded-lg">
              <Sparkles className="h-6 w-6 text-primary" />
            </div>
            <div className="flex-1">
              <h3 className="font-serif font-semibold text-lg mb-2">System Health Analysis</h3>
              <p className="text-sm text-muted-foreground mb-4">
                Our AI has analyzed your business systems and identified 6 critical bottlenecks that could be limiting growth. 
                Addressing these issues could improve overall system efficiency by 45% and reduce operational costs by 30%.
              </p>
              <div className="flex gap-3">
                <Button size="sm" data-testid="button-view-recommendations">
                  View Recommendations
                </Button>
                <Button size="sm" variant="outline" data-testid="button-run-analysis">
                  Run New Analysis
                </Button>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* System Maps */}
      <div>
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="font-serif text-2xl font-semibold">System Maps</h2>
            <p className="text-muted-foreground text-sm">Visual representations of your business processes</p>
          </div>
          <Button data-testid="button-create-map">
            <Network className="h-4 w-4 mr-2" />
            Create New Map
          </Button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {systemMaps.map((map, idx) => (
            <Card key={idx} className="hover-elevate active-elevate-2 transition-all" data-testid={`card-system-map-${idx}`}>
              <CardHeader>
                <div className="flex items-start justify-between gap-4">
                  <div className="flex-1">
                    <CardTitle className="font-serif text-lg mb-2">{map.title}</CardTitle>
                    <CardDescription>{map.description}</CardDescription>
                  </div>
                  <div className="flex gap-1">
                    <Button variant="ghost" size="icon" data-testid="button-download-map">
                      <Download className="h-4 w-4" />
                    </Button>
                    <Button variant="ghost" size="icon" data-testid="button-share-map">
                      <Share2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                {/* Visual Representation Placeholder */}
                <div className="aspect-video bg-gradient-to-br from-primary/5 to-accent/5 rounded-lg border border-border flex items-center justify-center">
                  <Network className="h-16 w-16 text-muted-foreground/30" />
                </div>

                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <p className="text-muted-foreground">Nodes</p>
                    <p className="font-semibold">{map.nodes}</p>
                  </div>
                  <div>
                    <p className="text-muted-foreground">Connections</p>
                    <p className="font-semibold">{map.connections}</p>
                  </div>
                  <div>
                    <p className="text-muted-foreground">Bottlenecks</p>
                    <p className="font-semibold text-red-600 dark:text-red-400">{map.bottlenecks}</p>
                  </div>
                  <div>
                    <p className="text-muted-foreground">Opportunities</p>
                    <p className="font-semibold text-green-600 dark:text-green-400">{map.opportunities}</p>
                  </div>
                </div>

                <div className="flex items-center justify-between pt-4 border-t border-border">
                  <span className="text-xs text-muted-foreground">Updated {map.lastUpdated}</span>
                  <Button variant="outline" size="sm" data-testid="button-open-map">
                    Open Map
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* Insights */}
      <Tabs defaultValue="all" className="w-full">
        <TabsList>
          <TabsTrigger value="all" data-testid="tab-all">All Insights</TabsTrigger>
          <TabsTrigger value="bottlenecks" data-testid="tab-bottlenecks">Bottlenecks</TabsTrigger>
          <TabsTrigger value="opportunities" data-testid="tab-opportunities">Opportunities</TabsTrigger>
          <TabsTrigger value="risks" data-testid="tab-risks">Risks</TabsTrigger>
        </TabsList>

        <TabsContent value="all" className="mt-6 space-y-4">
          {insights.map((insight, idx) => (
            <Card key={idx} data-testid={`card-insight-${idx}`}>
              <CardContent className="p-6">
                <div className="flex items-start gap-4">
                  <div className={`p-2 rounded-md ${
                    insight.type === "bottleneck" ? "bg-red-500/10" :
                    insight.type === "opportunity" ? "bg-green-500/10" :
                    "bg-amber-500/10"
                  }`}>
                    {insight.type === "bottleneck" ? <CircuitBoard className="h-5 w-5 text-red-600 dark:text-red-400" /> :
                     insight.type === "opportunity" ? <Sparkles className="h-5 w-5 text-green-600 dark:text-green-400" /> :
                     <Workflow className="h-5 w-5 text-amber-600 dark:text-amber-400" />}
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <h4 className="font-semibold">{insight.title}</h4>
                      <Badge variant="outline" className={
                        insight.impact === "High" ? "bg-red-500/10 text-red-700 dark:text-red-400 border-red-500/20" :
                        "bg-amber-500/10 text-amber-700 dark:text-amber-400 border-amber-500/20"
                      }>
                        {insight.impact} Impact
                      </Badge>
                    </div>
                    <p className="text-sm text-muted-foreground mb-3">{insight.description}</p>
                    <div className="flex items-start gap-2 p-3 bg-muted rounded-md">
                      <Sparkles className="h-4 w-4 text-primary shrink-0 mt-0.5" />
                      <div>
                        <p className="text-xs font-medium mb-1">AI Suggestion</p>
                        <p className="text-xs text-muted-foreground">{insight.suggestion}</p>
                      </div>
                    </div>
                  </div>
                  <Button variant="outline" size="sm" data-testid="button-take-action">
                    Take Action
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </TabsContent>

        <TabsContent value="bottlenecks" className="mt-6">
          <p className="text-center text-muted-foreground py-8">Filter by bottlenecks...</p>
        </TabsContent>

        <TabsContent value="opportunities" className="mt-6">
          <p className="text-center text-muted-foreground py-8">Filter by opportunities...</p>
        </TabsContent>

        <TabsContent value="risks" className="mt-6">
          <p className="text-center text-muted-foreground py-8">Filter by risks...</p>
        </TabsContent>
      </Tabs>
    </div>
  );
}
