import { InsightCard } from '../insight-card';

export default function InsightCardExample() {
  return (
    <div className="p-8 space-y-4 max-w-md">
      <InsightCard
        title="Data Science Demand Rising"
        description="AI and machine learning skills are projected to grow by 45% in the next 2 years in West Africa."
        category="Career Forecast"
        priority="high"
        trend="up"
        value="45%"
        change="+12%"
        onClick={() => console.log('Insight clicked')}
      />
      <InsightCard
        title="E-Commerce Growth Opportunity"
        description="Local e-commerce market shows strong expansion potential with increasing internet penetration."
        category="Market Trend"
        priority="medium"
        trend="up"
        change="+8%"
        onClick={() => console.log('Insight clicked')}
      />
    </div>
  );
}
