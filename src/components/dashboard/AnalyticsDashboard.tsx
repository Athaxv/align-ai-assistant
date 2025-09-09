import React from 'react';
import HealthTrendsChart from './charts/HealthTrendsChart';
import WaterQualityChart from './charts/WaterQualityChart';
import InterventionChart from './charts/InterventionChart';

const AnalyticsDashboard = () => {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Analytics Dashboard</h1>
        <p className="text-muted-foreground">Comprehensive data visualization and trend analysis</p>
      </div>
      
      <div className="grid gap-6">
        <HealthTrendsChart />
        <WaterQualityChart />
        <InterventionChart />
      </div>
    </div>
  );
};

export default AnalyticsDashboard;