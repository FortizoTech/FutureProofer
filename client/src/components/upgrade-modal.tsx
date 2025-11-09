import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Check, Sparkles, X } from "lucide-react";
import { useState } from "react";

interface UpgradeModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function UpgradeModal({ open, onOpenChange }: UpgradeModalProps) {
  const [selectedPlan, setSelectedPlan] = useState<"premium" | "business">("premium");

  const plans = {
    premium: {
      name: "Premium",
      price: "$15",
      period: "month",
      description: "Perfect for professionals",
      features: [
        "Unlimited AI insights",
        "Advanced career forecasts",
        "Personalized learning paths",
        "Priority support",
        "Export reports",
        "BusinessMate AI chat",
        "Market trend analysis",
      ],
      notIncluded: [],
    },
    business: {
      name: "Business",
      price: "$99",
      period: "month",
      description: "For growing SMEs",
      features: [
        "Everything in Premium",
        "Team collaboration (5 users)",
        "Market intelligence reports",
        "Custom insights",
        "API access",
        "Dedicated support",
        "White-label options",
        "Advanced analytics",
      ],
      notIncluded: [],
    },
  };

  const plan = plans[selectedPlan];

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto" data-testid="modal-upgrade">
        <DialogHeader>
          <div className="flex items-center gap-2 mb-2">
            <div className="p-2 bg-gradient-to-br from-primary to-accent rounded-lg">
              <Sparkles className="h-5 w-5 text-white" />
            </div>
            <DialogTitle className="font-serif text-2xl">Upgrade Your Plan</DialogTitle>
          </div>
          <DialogDescription>
            Unlock advanced AI insights and powerful features to accelerate your career or business growth
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-6 mt-6">
          {/* Plan Selection Tabs */}
          <div className="flex gap-3">
            <button
              onClick={() => setSelectedPlan("premium")}
              className={`flex-1 p-4 rounded-lg border-2 transition-all ${
                selectedPlan === "premium"
                  ? "border-primary bg-primary/5"
                  : "border-border hover:border-primary/50"
              }`}
              data-testid="button-select-premium"
            >
              <div className="text-left">
                <div className="flex items-center justify-between mb-1">
                  <h3 className="font-serif font-semibold text-lg">Premium</h3>
                  {selectedPlan === "premium" && <Check className="h-5 w-5 text-primary" />}
                </div>
                <p className="text-sm text-muted-foreground">For professionals</p>
                <div className="mt-2">
                  <span className="text-2xl font-bold font-serif">$15</span>
                  <span className="text-muted-foreground">/month</span>
                </div>
              </div>
            </button>

            <button
              onClick={() => setSelectedPlan("business")}
              className={`flex-1 p-4 rounded-lg border-2 transition-all relative ${
                selectedPlan === "business"
                  ? "border-primary bg-primary/5"
                  : "border-border hover:border-primary/50"
              }`}
              data-testid="button-select-business"
            >
              <Badge className="absolute -top-2 -right-2 bg-accent text-accent-foreground">
                Popular
              </Badge>
              <div className="text-left">
                <div className="flex items-center justify-between mb-1">
                  <h3 className="font-serif font-semibold text-lg">Business</h3>
                  {selectedPlan === "business" && <Check className="h-5 w-5 text-primary" />}
                </div>
                <p className="text-sm text-muted-foreground">For SMEs</p>
                <div className="mt-2">
                  <span className="text-2xl font-bold font-serif">$99</span>
                  <span className="text-muted-foreground">/month</span>
                </div>
              </div>
            </button>
          </div>

          {/* Features List */}
          <Card>
            <CardContent className="p-6">
              <h4 className="font-serif font-semibold text-lg mb-4">What's included in {plan.name}</h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {plan.features.map((feature, idx) => (
                  <div key={idx} className="flex items-start gap-2">
                    <Check className="h-4 w-4 text-primary shrink-0 mt-0.5" />
                    <span className="text-sm">{feature}</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Benefits */}
          <div className="bg-gradient-to-br from-primary/10 to-accent/10 rounded-lg p-6 border border-primary/20">
            <h4 className="font-serif font-semibold mb-3">Why upgrade now?</h4>
            <ul className="space-y-2 text-sm">
              <li className="flex items-center gap-2">
                <div className="h-1.5 w-1.5 rounded-full bg-primary" />
                <span>Get 2 months free with annual billing (save 20%)</span>
              </li>
              <li className="flex items-center gap-2">
                <div className="h-1.5 w-1.5 rounded-full bg-primary" />
                <span>Cancel anytime, no questions asked</span>
              </li>
              <li className="flex items-center gap-2">
                <div className="h-1.5 w-1.5 rounded-full bg-primary" />
                <span>30-day money-back guarantee</span>
              </li>
            </ul>
          </div>

          {/* Action Buttons */}
          <div className="flex gap-3">
            <Button
              variant="outline"
              onClick={() => onOpenChange(false)}
              className="flex-1"
              data-testid="button-cancel-upgrade"
            >
              Maybe Later
            </Button>
            <Button
              onClick={() => {
                console.log(`Upgrade to ${selectedPlan}`);
                onOpenChange(false);
              }}
              className="flex-1"
              size="lg"
              data-testid="button-confirm-upgrade"
            >
              Upgrade to {plan.name}
            </Button>
          </div>

          <p className="text-xs text-center text-muted-foreground">
            Secure payment processing. Your card will be charged {plan.price} per {plan.period}.
          </p>
        </div>
      </DialogContent>
    </Dialog>
  );
}
