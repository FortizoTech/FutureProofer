import { MetricCard } from "@/components/metric-card";
import { InsightCard } from "@/components/insight-card";
import { ForecastChart } from "@/components/forecast-chart";
import { Target, Briefcase, TrendingUp, Users } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function Dashboard() {
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

  return (
    <div className="space-y-8">
      <div>
        <h1 className="font-serif text-3xl font-bold mb-2" data-testid="text-page-title">Career Dashboard</h1>
        <p className="text-muted-foreground">Your personalized AI-powered career insights</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
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

      <ForecastChart
        title="Career Trajectory Forecast"
        description="AI-predicted skill demand and career growth potential over the next 8 months"
        data={forecastData}
      />

      <div>
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="font-serif text-2xl font-semibold">Priority Insights</h2>
            <p className="text-muted-foreground text-sm">AI-generated recommendations for your career</p>
          </div>
          <Button variant="outline" data-testid="button-view-all-insights">View All</Button>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <InsightCard
            title="Data Science Demand Rising"
            description="AI and machine learning skills are projected to grow by 45% in the next 2 years in West Africa."
            category="Career Forecast"
            priority="high"
            trend="up"
            value="45%"
            change="+12%"
            onClick={() => console.log('Navigate to insight detail')}
          />
          <InsightCard
            title="Python Skills Gap"
            description="There's a significant shortage of Python developers in your region. Consider upskilling."
            category="Skill Demand"
            priority="medium"
            trend="up"
            change="+8%"
            onClick={() => console.log('Navigate to insight detail')}
          />
          <InsightCard
            title="Remote Work Opportunities"
            description="International remote positions increased by 67% for your skill set."
            category="Job Market"
            priority="medium"
            trend="up"
            value="67%"
            change="+15%"
            onClick={() => console.log('Navigate to insight detail')}
          />
        </div>
      </div>
    </div>
  );
}
