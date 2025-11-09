import { ForecastChart } from '../forecast-chart';

const sampleData = [
  { name: 'Jan', value: 65, forecast: 68 },
  { name: 'Feb', value: 72, forecast: 75 },
  { name: 'Mar', value: 68, forecast: 78 },
  { name: 'Apr', value: 78, forecast: 82 },
  { name: 'May', value: 85, forecast: 88 },
  { name: 'Jun', value: 82, forecast: 90 },
];

export default function ForecastChartExample() {
  return (
    <div className="p-8 max-w-4xl">
      <ForecastChart
        title="Skill Demand Forecast"
        description="Projected demand for AI/ML skills in West African market"
        data={sampleData}
      />
    </div>
  );
}
