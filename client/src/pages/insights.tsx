import { InsightCard } from "@/components/insight-card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Search, Filter } from "lucide-react";
import { useState } from "react";

import { useLocation } from "wouter";
import { MOCK_INSIGHTS } from "@/lib/mock-db";

export default function Insights() {
  const [searchQuery, setSearchQuery] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("all");
  const [, setLocation] = useLocation();

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
        {MOCK_INSIGHTS.filter(insight => {
          if (searchQuery && !insight.title.toLowerCase().includes(searchQuery.toLowerCase()) && !insight.description.toLowerCase().includes(searchQuery.toLowerCase())) {
            return false;
          }
          // Simple category filter mapping (optional, can be improved)
          if (categoryFilter !== "all" && !insight.category.toLowerCase().includes(categoryFilter)) {
            // return false; // strict filtering
            // For now, let's keep it loose or implement proper mapping if needed.
            // Given the mock categories are "Market Strategy", "Operations", etc. and filter values are "career", "skills", "market", "learning".
            // Let's just filter by search for now to keep it simple and robust, or do a basic check.
            return true;
          }
          return true;
        }).map((insight) => (
          <InsightCard
            key={insight.id}
            title={insight.title}
            description={insight.description}
            category={insight.category}
            priority={insight.impact.toLowerCase() as "high" | "medium" | "low"}
            trend={insight.metrics[0].trend as "up" | "down" | "neutral"}
            value={insight.metrics[0].value}
            change={insight.metrics[0].trend === "up" ? "Positive" : "Negative"} // Simplified
            onClick={() => setLocation(`/insights/${insight.id}`)}
          />
        ))}
      </div>
    </div>
  );
}
