import { SubscriptionPlans } from '../subscription-plans';

export default function SubscriptionPlansExample() {
  return (
    <div className="p-8 max-w-6xl">
      <div className="mb-8">
        <h2 className="font-serif text-3xl font-semibold mb-2">Choose Your Plan</h2>
        <p className="text-muted-foreground">Select the perfect plan for your needs</p>
      </div>
      <SubscriptionPlans userType="individual" />
    </div>
  );
}
