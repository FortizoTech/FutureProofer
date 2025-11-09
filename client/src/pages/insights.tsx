import { InsightCard } from "@/components/insight-card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Search, Filter } from "lucide-react";
import { useState } from "react";

export default function Insights() {
  const [searchQuery, setSearchQuery] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("all");

  return (
    <div className="space-y-8">
      <div>
        <h1 className="font-serif text-3xl font-bold mb-2" data-testid="text-page-title">AI Insights</h1>
        <p className="text-muted-foreground">Comprehensive analysis and forecasts for your career path</p>
      </div>

      <div className="flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search insights..."
            className="pl-10"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            data-testid="input-search-insights"
          />
        </div>
        <div className="flex gap-2">
          <Select value={categoryFilter} onValueChange={setCategoryFilter}>
            <SelectTrigger className="w-[180px]" data-testid="select-filter-category">
              <Filter className="h-4 w-4 mr-2" />
              <SelectValue placeholder="Category" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Categories</SelectItem>
              <SelectItem value="career">Career Forecast</SelectItem>
              <SelectItem value="skills">Skill Demand</SelectItem>
              <SelectItem value="market">Job Market</SelectItem>
              <SelectItem value="learning">Learning Path</SelectItem>
            </SelectContent>
          </Select>
          <Button variant="outline" data-testid="button-filter">
            Apply Filters
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <InsightCard
          title="Data Science Demand Rising"
          description="AI and machine learning skills are projected to grow by 45% in the next 2 years in West Africa. This represents a significant opportunity for career advancement."
          category="Career Forecast"
          priority="high"
          trend="up"
          value="45%"
          change="+12%"
          onClick={() => console.log('View insight details')}
        />
        <InsightCard
          title="Python Skills Gap"
          description="There's a significant shortage of Python developers in your region. Consider upskilling to take advantage of this demand."
          category="Skill Demand"
          priority="medium"
          trend="up"
          change="+8%"
          onClick={() => console.log('View insight details')}
        />
        <InsightCard
          title="Remote Work Opportunities"
          description="International remote positions increased by 67% for your skill set, opening global opportunities."
          category="Job Market"
          priority="medium"
          trend="up"
          value="67%"
          change="+15%"
          onClick={() => console.log('View insight details')}
        />
        <InsightCard
          title="Cloud Computing Skills"
          description="Cloud platforms (AWS, Azure, GCP) show 89% growth in job postings across ECOWAS nations."
          category="Skill Demand"
          priority="high"
          trend="up"
          value="89%"
          change="+22%"
          onClick={() => console.log('View insight details')}
        />
        <InsightCard
          title="Digital Marketing Expansion"
          description="E-commerce growth driving 52% increase in digital marketing roles in West Africa."
          category="Job Market"
          priority="low"
          trend="up"
          change="+5%"
          onClick={() => console.log('View insight details')}
        />
        <InsightCard
          title="Upskilling Recommendation"
          description="Based on your profile, we recommend focusing on data visualization and analytics tools."
          category="Learning Path"
          priority="medium"
          onClick={() => console.log('View insight details')}
        />
      </div>
    </div>
  );
}
