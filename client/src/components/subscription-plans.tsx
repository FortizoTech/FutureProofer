import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Check } from "lucide-react";
import { cn } from "@/lib/utils";

interface Plan {
  id: string;
  name: string;
  price: string;
  period: string;
  description: string;
  features: string[];
  recommended?: boolean;
  cta: string;
}

interface SubscriptionPlansProps {
  userType?: "individual" | "business";
}

const individualPlans: Plan[] = [
  {
    id: "free",
    name: "Free",
    price: "0",
    period: "forever",
    description: "Get started with basic insights",
    features: [
      "3 AI insights per month",
      "Basic career forecasts",
      "Access to learning library",
      "Community support",
    ],
    cta: "Current Plan",
  },
  {
    id: "premium",
    name: "Premium",
    price: "15",
    period: "month",
    description: "Advanced insights for professionals",
    features: [
      "Unlimited AI insights",
      "Advanced career forecasts",
      "Personalized learning paths",
      "Priority support",
      "Export reports",
      "BusinessMate AI chat",
    ],
    recommended: true,
    cta: "Upgrade Now",
  },
];

const businessPlans: Plan[] = [
  {
    id: "business",
    name: "Business",
    price: "99",
    period: "month",
    description: "For growing SMEs",
    features: [
      "Everything in Premium",
      "Team collaboration (5 users)",
      "Market intelligence reports",
      "Custom insights",
      "API access",
      "Dedicated support",
    ],
    recommended: true,
    cta: "Start Trial",
  },
  {
    id: "enterprise",
    name: "Enterprise",
    price: "Custom",
    period: "",
    description: "For large organizations",
    features: [
      "Everything in Business",
      "Unlimited team members",
      "White-label options",
      "Custom AI models",
      "SLA guarantee",
      "Account manager",
    ],
    cta: "Contact Sales",
  },
];

export function SubscriptionPlans({ userType = "individual" }: SubscriptionPlansProps) {
  const plans = userType === "individual" ? individualPlans : businessPlans;

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6" data-testid="subscription-plans">
      {plans.map((plan) => (
        <Card
          key={plan.id}
          className={cn(
            "flex flex-col",
            plan.recommended && "border-primary ring-2 ring-primary/20"
          )}
          data-testid={`card-plan-${plan.id}`}
        >
          <CardHeader>
            <div className="flex items-center justify-between mb-2">
              <CardTitle className="font-serif text-2xl">{plan.name}</CardTitle>
              {plan.recommended && (
                <Badge className="bg-primary text-primary-foreground">Recommended</Badge>
              )}
            </div>
            <CardDescription>{plan.description}</CardDescription>
            <div className="mt-4">
              <div className="flex items-baseline gap-1">
                {plan.price !== "Custom" && <span className="text-sm font-medium">$</span>}
                <span className="text-4xl font-bold font-serif">{plan.price}</span>
                {plan.period && <span className="text-muted-foreground">/{plan.period}</span>}
              </div>
            </div>
          </CardHeader>
          <CardContent className="flex-1">
            <ul className="space-y-3">
              {plan.features.map((feature, idx) => (
                <li key={idx} className="flex items-start gap-2 text-sm">
                  <Check className="h-4 w-4 text-primary shrink-0 mt-0.5" />
                  <span>{feature}</span>
                </li>
              ))}
            </ul>
          </CardContent>
          <CardFooter>
            <Button
              className="w-full"
              variant={plan.recommended ? "default" : "outline"}
              onClick={() => console.log(`Selected plan: ${plan.id}`)}
              data-testid={`button-plan-${plan.id}`}
            >
              {plan.cta}
            </Button>
          </CardFooter>
        </Card>
      ))}
    </div>
  );
}
