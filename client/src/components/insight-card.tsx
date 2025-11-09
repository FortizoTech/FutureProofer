import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { TrendingUp, TrendingDown, ArrowRight, AlertCircle } from "lucide-react";
import { cn } from "@/lib/utils";

interface InsightCardProps {
  title: string;
  description: string;
  category: string;
  priority: "low" | "medium" | "high";
  trend?: "up" | "down" | "neutral";
  value?: string;
  change?: string;
  onClick?: () => void;
}

const priorityStyles = {
  low: "bg-blue-500/10 text-blue-700 dark:text-blue-400 border-blue-500/20",
  medium: "bg-amber-500/10 text-amber-700 dark:text-amber-400 border-amber-500/20",
  high: "bg-red-500/10 text-red-700 dark:text-red-400 border-red-500/20",
};

export function InsightCard({
  title,
  description,
  category,
  priority,
  trend = "neutral",
  value,
  change,
  onClick,
}: InsightCardProps) {
  return (
    <Card className="hover-elevate active-elevate-2 transition-all cursor-pointer" onClick={onClick} data-testid={`card-insight-${title.toLowerCase().replace(/\s+/g, '-')}`}>
      <CardHeader className="space-y-3">
        <div className="flex items-start justify-between gap-2">
          <div className="flex items-center gap-2">
            {priority === "high" && <AlertCircle className="h-4 w-4 text-destructive" />}
            <Badge variant="outline" className={cn("text-xs", priorityStyles[priority])}>
              {category}
            </Badge>
          </div>
          {trend !== "neutral" && (
            <div className={cn("flex items-center gap-1 text-xs font-medium", 
              trend === "up" ? "text-green-600 dark:text-green-400" : "text-red-600 dark:text-red-400"
            )}>
              {trend === "up" ? <TrendingUp className="h-3 w-3" /> : <TrendingDown className="h-3 w-3" />}
              {change}
            </div>
          )}
        </div>
        <div>
          <CardTitle className="font-serif text-lg mb-2">{title}</CardTitle>
          {value && (
            <div className="text-3xl font-bold font-serif text-primary mb-2">{value}</div>
          )}
          <CardDescription className="text-sm leading-relaxed">{description}</CardDescription>
        </div>
      </CardHeader>
      <CardContent>
        <Button variant="ghost" className="w-full justify-between group" size="sm">
          View Details
          <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
        </Button>
      </CardContent>
    </Card>
  );
}
