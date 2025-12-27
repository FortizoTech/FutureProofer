import { useRoute, useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { ArrowLeft, TrendingUp, TrendingDown, ArrowRight, CheckCircle2, Share2, Bookmark } from "lucide-react";
import { MOCK_INSIGHTS } from "@/lib/mock-db";
import { cn } from "@/lib/utils";

export default function InsightDetails() {
    const [, params] = useRoute("/insights/:id");
    const [, setLocation] = useLocation();
    const insightId = params?.id;
    const insight = MOCK_INSIGHTS.find(i => i.id === insightId);

    if (!insight) {
        // Fallback or redirect if not found
        return (
            <div className="container mx-auto px-4 py-12 text-center">
                <h2 className="text-2xl font-bold mb-4">Insight not found</h2>
                <Button onClick={() => setLocation("/insights")}>Return to Insights</Button>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-background pb-20">
            {/* Header / Nav */}
            <div className="bg-background border-b sticky top-0 z-10">
                <div className="container mx-auto px-4 h-16 flex items-center justify-between">
                    <Button variant="ghost" size="sm" className="-ml-2" onClick={() => setLocation("/insights")}>
                        <ArrowLeft className="h-4 w-4 mr-2" />
                        Back to Insights
                    </Button>
                    <div className="flex gap-2">
                        <Button variant="ghost" size="icon">
                            <Bookmark className="h-4 w-4" />
                        </Button>
                        <Button variant="ghost" size="icon">
                            <Share2 className="h-4 w-4" />
                        </Button>
                    </div>
                </div>
            </div>

            <div className="container mx-auto px-4 py-6 md:py-10">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                    {/* Main Content */}
                    <div className="lg:col-span-8 space-y-8">
                        {/* Title Section */}
                        <div className="space-y-4">
                            <div className="flex items-center gap-3">
                                <Badge variant="secondary" className="bg-primary/10 text-primary hover:bg-primary/20">
                                    {insight.category}
                                </Badge>
                                <span className="text-sm text-muted-foreground">{insight.date}</span>
                            </div>
                            <h1 className="text-3xl md:text-4xl font-serif font-bold leading-tight">
                                {insight.title}
                            </h1>
                            <p className="text-lg md:text-xl text-muted-foreground leading-relaxed">
                                {insight.description}
                            </p>
                        </div>

                        {/* Metrics Row (Swipeable on Mobile) */}
                        <div className="w-full overflow-x-auto pb-4 -mx-4 px-4 md:mx-0 md:px-0 md:pb-0 no-scrollbar">
                            <div className="flex md:grid md:grid-cols-3 gap-4 min-w-max md:min-w-0">
                                {insight.metrics.map((metric, idx) => (
                                    <Card key={idx} className="w-[160px] md:w-auto shrink-0 bg-card/50">
                                        <CardContent className="p-4">
                                            <p className="text-sm text-muted-foreground mb-1">{metric.label}</p>
                                            <div className="flex items-end gap-2">
                                                <span className="text-2xl font-bold">{metric.value}</span>
                                                {metric.trend === "up" ? (
                                                    <TrendingUp className="h-4 w-4 text-green-500 mb-1" />
                                                ) : (
                                                    <TrendingDown className="h-4 w-4 text-green-500 mb-1" />
                                                )}
                                            </div>
                                        </CardContent>
                                    </Card>
                                ))}
                            </div>
                        </div>

                        <Separator />

                        {/* Report Content */}
                        <div
                            className="prose dark:prose-invert max-w-none prose-lg prose-headings:font-serif prose-p:leading-relaxed text-foreground/90"
                            dangerouslySetInnerHTML={{ __html: insight.content }}
                        />
                    </div>

                    {/* Sidebar Actions */}
                    <div className="lg:col-span-4 space-y-6">
                        <Card className="bg-gradient-to-br from-primary/5 to-accent/5 border-primary/20 sticky top-24 z-10 bg-background">
                            <CardHeader>
                                <CardTitle className="font-serif text-xl flex items-center gap-2">
                                    <CheckCircle2 className="h-5 w-5 text-primary" />
                                    Recommended Actions
                                </CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                {insight.actionSteps.map((step, idx) => (
                                    <div key={idx} className="flex gap-3 items-start p-3 rounded-lg bg-background/50 border hover:border-primary/50 transition-colors">
                                        <div className="h-6 w-6 rounded-full bg-primary/10 text-primary flex items-center justify-center text-xs font-bold shrink-0 mt-0.5">
                                            {idx + 1}
                                        </div>
                                        <p className="text-sm leading-snug">{step}</p>
                                    </div>
                                ))}
                                <Button className="w-full mt-4 group">
                                    Start Implementation
                                    <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                                </Button>
                            </CardContent>
                        </Card>

                        {/* Related Insights */}
                        {insight.relatedIds && insight.relatedIds.length > 0 && (
                            <div className="space-y-4">
                                <h3 className="font-serif font-bold text-lg">Related Insights</h3>
                                {MOCK_INSIGHTS.filter(i => insight.relatedIds?.includes(i.id)).map(related => (
                                    <Card
                                        key={related.id}
                                        className="cursor-pointer hover:border-primary/50 transition-colors group"
                                        onClick={() => setLocation(`/insights/${related.id}`)}
                                    >
                                        <CardContent className="p-4">
                                            <Badge variant="outline" className="mb-2 text-xs">{related.category}</Badge>
                                            <h4 className="font-bold group-hover:text-primary transition-colors mb-1">
                                                {related.title}
                                            </h4>
                                            <div className="flex items-center gap-2 text-xs text-muted-foreground">
                                                <span>{related.impact} Impact</span>
                                                <span>•</span>
                                                <span>{related.date}</span>
                                            </div>
                                        </CardContent>
                                    </Card>
                                ))}
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}
