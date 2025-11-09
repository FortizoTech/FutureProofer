import { Card, CardContent } from "@/components/ui/card";
import { Briefcase, TrendingUp, CheckCircle2 } from "lucide-react";
import { cn } from "@/lib/utils";

interface ModeSelectorProps {
  selected?: "career" | "business";
  onSelect?: (mode: "career" | "business") => void;
}

export function ModeSelector({ selected, onSelect }: ModeSelectorProps) {
  const modes = [
    {
      id: "career" as const,
      title: "Career Mode",
      description: "Personal career planning, skill development, and job market insights",
      icon: TrendingUp,
      features: ["Career trajectory forecasts", "Skill demand analysis", "Personalized learning paths"],
    },
    {
      id: "business" as const,
      title: "Business Mode",
      description: "Business strategy, market analysis, and growth opportunities",
      icon: Briefcase,
      features: ["Market trend analysis", "Growth strategy insights", "Competitive intelligence"],
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6" data-testid="mode-selector">
      {modes.map((mode) => (
        <Card
          key={mode.id}
          className={cn(
            "cursor-pointer transition-all hover-elevate active-elevate-2",
            selected === mode.id && "border-primary ring-2 ring-primary/20"
          )}
          onClick={() => {
            console.log(`Selected mode: ${mode.id}`);
            onSelect?.(mode.id);
          }}
          data-testid={`card-mode-${mode.id}`}
        >
          <CardContent className="p-6">
            <div className="flex items-start justify-between mb-4">
              <div className="p-3 bg-primary/10 rounded-lg">
                <mode.icon className="h-6 w-6 text-primary" />
              </div>
              {selected === mode.id && (
                <CheckCircle2 className="h-6 w-6 text-primary" />
              )}
            </div>
            <h3 className="font-serif font-semibold text-xl mb-2">{mode.title}</h3>
            <p className="text-sm text-muted-foreground mb-4">{mode.description}</p>
            <ul className="space-y-2">
              {mode.features.map((feature, idx) => (
                <li key={idx} className="flex items-start gap-2 text-sm">
                  <CheckCircle2 className="h-4 w-4 text-primary shrink-0 mt-0.5" />
                  <span>{feature}</span>
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
