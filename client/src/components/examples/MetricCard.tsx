import { MetricCard } from '../metric-card';
import { Users, Briefcase, Target } from 'lucide-react';

export default function MetricCardExample() {
  return (
    <div className="p-8 grid grid-cols-1 md:grid-cols-3 gap-6">
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
        title="Network Growth"
        value="1,284"
        change="+156"
        trend="up"
        icon={Users}
        description="connections"
      />
    </div>
  );
}
