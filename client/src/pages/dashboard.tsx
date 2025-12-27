import { MetricCard } from "@/components/metric-card";
import { InsightCard } from "@/components/insight-card";
import { ForecastChart } from "@/components/forecast-chart";
import { Target, Briefcase, TrendingUp, Users, Play, UserPlus, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useUser } from "@/context/user-context";
import { useLocation } from "wouter";
import { MOCK_INSIGHTS } from "@/lib/mock-db";
import MagicBento from "@/components/MagicBento";

export default function Dashboard() {
    const { user } = useUser();
    const [, setLocation] = useLocation();

    // Mock data - will be replaced with real data
    const forecastData = [
        { name: 'Jan', value: 65, forecast: 68 },
        { name: 'Feb', value: 72, forecast: 75 },
        { name: 'Mar', value: 68, forecast: 78 },
        { name: 'Apr', value: 78, forecast: 82 },
        { name: 'May', value: 85, forecast: 88 },
        { name: 'Jun', value: 82, forecast: 90 },
        { name: 'Jul', value: 0, forecast: 95 },
        { name: 'Aug', value: 0, forecast: 98 },
    ];

    const currentDate = new Date().toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' });

    return (
        <div className="space-y-6 pb-10">
            {/* Header Section */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                    <h1 className="font-serif text-2xl md:text-3xl font-bold mb-1" data-testid="text-page-title">
                        Welcome back, {user.fullName?.split(' ')[0] || 'User'}
                    </h1>
                    <p className="text-sm md:text-base text-muted-foreground">{currentDate} • {user.selectedCareer || "Career Explorer"}</p>
                </div>
                <div className="flex gap-3">
                    <Button onClick={() => setLocation('/learning-paths')} className="shadow-md w-full md:w-auto">
                        <Play className="h-4 w-4 mr-2" /> Resume Learning
                    </Button>
                </div>
            </div>

            {/* Key Metrics Grid - Mobile: 2 cols, Desktop: 4 cols */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 md:gap-6">
                <MetricCard
                    title="Skills Matched"
                    value="87%"
                    change="+5%"
                    trend="up"
                    icon={Target}
                    description="vs last month"
                />
                <MetricCard
                    title="Job Opportunities"
                    value="142"
                    change="+23"
                    trend="up"
                    icon={Briefcase}
                    description="new this week"
                />
                <MetricCard
                    title="Market Demand"
                    value="High"
                    icon={TrendingUp}
                />
                <MetricCard
                    title="Network Growth"
                    value="1,284"
                    change="+156"
                    trend="up"
                    icon={Users}
                    description="connections"
                />
            </div>

            {/* Main Content Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Left Column: Forecast */}
                <div className="lg:col-span-2">
                    <ForecastChart
                        title="Career Trajectory Forecast"
                        description="AI-predicted skill demand and career growth potential over the next 8 months"
                        data={forecastData}
                    />
                </div>

                {/* Right Column: Quick Actions */}
                <div className="space-y-4 md:space-y-6">
                    <div className="bg-card rounded-xl border shadow-sm p-4 md:p-6 h-full">
                        <h3 className="font-serif text-lg font-semibold mb-4">Quick Actions</h3>
                        {/* Mobile: Icon Grid, Desktop: Vertical List with Labels */}
                        <div className="grid grid-cols-3 gap-2 md:flex md:flex-col md:gap-4">
                            <Button
                                variant="outline"
                                className="h-16 w-full flex-col gap-1 md:h-auto md:flex-row md:justify-start md:gap-4 md:px-6 md:py-4 hover:bg-primary/5 hover:border-primary/30 transition-all"
                                onClick={() => setLocation('/connect')}
                            >
                                <div className="p-2 bg-primary/10 rounded-full md:p-2">
                                    <UserPlus className="h-4 w-4 md:h-5 md:w-5 text-primary" />
                                </div>
                                <div className="hidden md:block text-left">
                                    <span className="font-semibold block">Find a Mentor</span>
                                    <span className="text-xs text-muted-foreground">Connect with experts</span>
                                </div>
                                <span className="text-[10px] md:hidden">Mentor</span>
                            </Button>
                            <Button
                                variant="outline"
                                className="h-16 w-full flex-col gap-1 md:h-auto md:flex-row md:justify-start md:gap-4 md:px-6 md:py-4 hover:bg-primary/5 hover:border-primary/30 transition-all"
                                onClick={() => setLocation('/learning')}
                            >
                                <div className="p-2 bg-primary/10 rounded-full md:p-2">
                                    <Play className="h-4 w-4 md:h-5 md:w-5 text-primary" />
                                </div>
                                <div className="hidden md:block text-left">
                                    <span className="font-semibold block">Masterclasses</span>
                                    <span className="text-xs text-muted-foreground">Watch new content</span>
                                </div>
                                <span className="text-[10px] md:hidden">Learn</span>
                            </Button>
                            <Button
                                variant="outline"
                                className="h-16 w-full flex-col gap-1 md:h-auto md:flex-row md:justify-start md:gap-4 md:px-6 md:py-4 hover:bg-primary/5 hover:border-primary/30 transition-all"
                                onClick={() => setLocation('/insights')}
                            >
                                <div className="p-2 bg-primary/10 rounded-full md:p-2">
                                    <TrendingUp className="h-4 w-4 md:h-5 md:w-5 text-primary" />
                                </div>
                                <div className="hidden md:block text-left">
                                    <span className="font-semibold block">View Insights</span>
                                    <span className="text-xs text-muted-foreground">Check market trends</span>
                                </div>
                                <span className="text-[10px] md:hidden">Insights</span>
                            </Button>
                        </div>
                    </div>
                </div>
            </div>

            {/* Priority Insights Section - Mobile: Horizontal Swipe */}
            <div className="space-y-4 md:space-y-6">
                <div className="flex items-center justify-between">
                    <div>
                        <h2 className="font-serif text-lg md:text-xl font-semibold">Priority Insights</h2>
                        <p className="text-xs md:text-sm text-muted-foreground">AI-generated recommendations for your career</p>
                    </div>
                    <Button variant="outline" size="sm" onClick={() => setLocation('/insights')}>
                        View All <ArrowRight className="h-3 w-3 ml-1" />
                    </Button>
                </div>
                <div className="flex overflow-x-auto snap-x no-scrollbar gap-4 pb-4 -mx-4 px-4 md:mx-0 md:px-0 md:grid md:grid-cols-3 md:pb-0">
                    {MOCK_INSIGHTS.slice(0, 3).map((insight) => (
                        <div key={insight.id} className="min-w-[85%] sm:min-w-[350px] snap-center">
                            <InsightCard
                                title={insight.title}
                                description={insight.description}
                                category={insight.category}
                                priority={insight.impact.toLowerCase() as "high" | "medium" | "low"}
                                trend={insight.metrics[0].trend as "up" | "down" | "neutral"}
                                value={insight.metrics[0].value}
                                change={insight.metrics[0].trend === "up" ? "Positive" : "Negative"}
                                onClick={() => setLocation(`/insights/${insight.id}`)}
                            />
                        </div>
                    ))}
                </div>
            </div>
        </div>

            {/* Magic Bento Section */ }
    <div className="space-y-4 md:space-y-6">
        <h2 className="font-serif text-lg md:text-xl font-semibold">System Overview</h2>
        <MagicBento
            textAutoHide={true}
            enableStars={true}
            enableSpotlight={true}
            enableBorderGlow={true}
            enableTilt={true}
            enableMagnetism={true}
            clickEffect={true}
            spotlightRadius={300}
            particleCount={12}
            glowColor="132, 0, 255"
        />
    </div>
        </div >
    );
}
