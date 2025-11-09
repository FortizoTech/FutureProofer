import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Clock, BarChart3, Play } from "lucide-react";
import { Progress } from "@/components/ui/progress";

interface CourseCardProps {
  title: string;
  description: string;
  duration: string;
  difficulty: "beginner" | "intermediate" | "advanced";
  category: string;
  thumbnail?: string;
  progress?: number;
  enrolled?: boolean;
  onAction?: () => void;
}

const difficultyColors = {
  beginner: "bg-green-500/10 text-green-700 dark:text-green-400 border-green-500/20",
  intermediate: "bg-amber-500/10 text-amber-700 dark:text-amber-400 border-amber-500/20",
  advanced: "bg-red-500/10 text-red-700 dark:text-red-400 border-red-500/20",
};

export function CourseCard({
  title,
  description,
  duration,
  difficulty,
  category,
  thumbnail,
  progress,
  enrolled = false,
  onAction,
}: CourseCardProps) {
  return (
    <Card className="overflow-hidden hover-elevate active-elevate-2 transition-all" data-testid={`card-course-${title.toLowerCase().replace(/\s+/g, '-')}`}>
      {thumbnail && (
        <div className="aspect-video bg-gradient-to-br from-primary/20 to-accent/20 flex items-center justify-center">
          <Play className="h-12 w-12 text-primary/40" />
        </div>
      )}
      <CardHeader>
        <div className="flex items-start justify-between gap-2 mb-2">
          <Badge variant="outline" className="text-xs">{category}</Badge>
          <Badge variant="outline" className={difficultyColors[difficulty]}>
            {difficulty}
          </Badge>
        </div>
        <CardTitle className="font-serif text-lg">{title}</CardTitle>
        <CardDescription className="text-sm">{description}</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex items-center gap-4 text-sm text-muted-foreground">
          <div className="flex items-center gap-1">
            <Clock className="h-4 w-4" />
            <span>{duration}</span>
          </div>
          <div className="flex items-center gap-1">
            <BarChart3 className="h-4 w-4" />
            <span className="capitalize">{difficulty}</span>
          </div>
        </div>
        {enrolled && typeof progress === 'number' && (
          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">Progress</span>
              <span className="font-medium">{progress}%</span>
            </div>
            <Progress value={progress} className="h-2" />
          </div>
        )}
      </CardContent>
      <CardFooter>
        <Button 
          className="w-full" 
          variant={enrolled ? "default" : "outline"}
          onClick={() => {
            console.log(enrolled ? 'Continue learning' : 'Start learning');
            onAction?.();
          }}
          data-testid={`button-course-${enrolled ? 'continue' : 'start'}`}
        >
          {enrolled ? "Continue Learning" : "Start Learning"}
        </Button>
      </CardFooter>
    </Card>
  );
}
