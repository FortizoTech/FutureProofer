import { MetricCard } from "@/components/metric-card";
import { InsightCard } from "@/components/insight-card";
import { ForecastChart } from "@/components/forecast-chart";
import { Target, Briefcase, TrendingUp, Users, Play, UserPlus, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useUser } from "@/context/user-context";
import { useLocation } from "wouter";

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

                {/* Right Column: Quick Actions - Mobile: Horizontal Swipe */}
                <div className="space-y-4 md:space-y-6">
                    <div className="bg-card rounded-xl border shadow-sm p-4 md:p-6 h-full">
                        <h3 className="font-serif text-lg font-semibold mb-4">Quick Actions</h3>
                        <div className="flex overflow-x-auto snap-x no-scrollbar gap-3 pb-2 md:grid md:grid-cols-1 md:gap-4 md:pb-0">
                            <Button variant="outline" className="h-auto py-4 flex-shrink-0 w-[85%] sm:w-auto snap-center flex items-center justify-start gap-4 hover:bg-primary/5 hover:border-primary/30 transition-all px-6" onClick={() => setLocation('/connect')}>
                                <div className="p-2 bg-primary/10 rounded-full">
                                    <UserPlus className="h-5 w-5 text-primary" />
                                </div>
                                <div className="text-left">
                                    <span className="font-semibold block">Find a Mentor</span>
                                    <span className="text-xs text-muted-foreground">Connect with experts</span>
                                </div>
                            </Button>
                            <Button variant="outline" className="h-auto py-4 flex-shrink-0 w-[85%] sm:w-auto snap-center flex items-center justify-start gap-4 hover:bg-primary/5 hover:border-primary/30 transition-all px-6" onClick={() => setLocation('/learning')}>
                                <div className="p-2 bg-primary/10 rounded-full">
                                    <Play className="h-5 w-5 text-primary" />
                                </div>
                                <div className="text-left">
                                    <span className="font-semibold block">Masterclasses</span>
                                    <span className="text-xs text-muted-foreground">Watch new content</span>
                                </div>
                            </Button>
                            <Button variant="outline" className="h-auto py-4 flex-shrink-0 w-[85%] sm:w-auto snap-center flex items-center justify-start gap-4 hover:bg-primary/5 hover:border-primary/30 transition-all px-6" onClick={() => setLocation('/insights')}>
                                <div className="p-2 bg-primary/10 rounded-full">
                                    <TrendingUp className="h-5 w-5 text-primary" />
                                </div>
                                <div className="text-left">
                                    <span className="font-semibold block">View Insights</span>
                                    <span className="text-xs text-muted-foreground">Check market trends</span>
                                </div>
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
                <div className="flex overflow-x-auto snap-x no-scrollbar gap-4 pb-4 md:grid md:grid-cols-3 md:gap-6 md:pb-0">
                    <div className="min-w-[85%] sm:min-w-[350px] snap-center">
                        <InsightCard
                            title="Data Science Demand Rising"
                            description="AI and machine learning skills are projected to grow by 45% in the next 2 years in West Africa."
                            category="Career Forecast"
                            priority="high"
                            trend="up"
                            value="45%"
                            change="+12%"
                            onClick={() => setLocation('/insights')}
                        />
                    </div>
                    <div className="min-w-[85%] sm:min-w-[350px] snap-center">
                        <InsightCard
                            title="Python Skills Gap"
                            description="There's a significant shortage of Python developers in your region. Consider upskilling."
                            category="Skill Demand"
                            priority="medium"
                            trend="up"
                            change="+8%"
                            onClick={() => setLocation('/insights')}
                        />
                    </div>
                    <div className="min-w-[85%] sm:min-w-[350px] snap-center">
                        <InsightCard
                            title="Remote Work Opportunities"
                            description="International remote positions increased by 67% for your skill set."
                            category="Job Market"
                            priority="medium"
                            trend="up"
                            value="67%"
                            change="+15%"
                            onClick={() => setLocation('/insights')}
                        />
                    </div>
                </div>
            </div>
        </div>
    );
}
