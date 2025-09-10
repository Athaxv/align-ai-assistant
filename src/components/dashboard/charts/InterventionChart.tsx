import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/Button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
import { Activity, Download, Target, CheckCircle } from 'lucide-react';
import { Badge } from '@/components/ui/badge';

// Mock data for intervention history
const interventionData = [
  { month: 'Jan 2024', waterTreatment: 12, awareness: 8, medical: 5, vaccination: 3, completed: 18, inProgress: 10 },
  { month: 'Feb 2024', waterTreatment: 15, awareness: 12, medical: 8, vaccination: 5, completed: 25, inProgress: 15 },
  { month: 'Mar 2024', waterTreatment: 18, awareness: 15, medical: 10, vaccination: 7, completed: 32, inProgress: 18 },
  { month: 'Apr 2024', waterTreatment: 22, awareness: 18, medical: 12, vaccination: 8, completed: 38, inProgress: 22 },
  { month: 'May 2024', waterTreatment: 25, awareness: 20, medical: 15, vaccination: 10, completed: 45, inProgress: 25 },
  { month: 'Jun 2024', waterTreatment: 28, awareness: 22, medical: 18, vaccination: 12, completed: 52, inProgress: 28 },
];

const interventionTypes = [
  { name: 'Water Treatment', value: 140, color: 'hsl(var(--chart-1))' },
  { name: 'Awareness Campaign', value: 95, color: 'hsl(var(--chart-2))' },
  { name: 'Medical Response', value: 68, color: 'hsl(var(--chart-3))' },
  { name: 'Vaccination', value: 45, color: 'hsl(var(--chart-4))' },
];

const successMetrics = [
  { intervention: 'Water Purification - Bukavu', target: 1000, achieved: 850, successRate: 85 },
  { intervention: 'Health Education Campaign', target: 2000, achieved: 1950, successRate: 97.5 },
  { intervention: 'Emergency Medical Response', target: 50, achieved: 48, successRate: 96 },
  { intervention: 'Community Vaccination Drive', target: 800, achieved: 720, successRate: 90 },
];

const InterventionChart = () => {
  const [chartType, setChartType] = useState('timeline');
  const [timeRange, setTimeRange] = useState('6months');

  const renderCustomizedLabel = ({ cx, cy, midAngle, innerRadius, outerRadius, percent }: any) => {
    const RADIAN = Math.PI / 180;
    const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
    const x = cx + radius * Math.cos(-midAngle * RADIAN);
    const y = cy + radius * Math.sin(-midAngle * RADIAN);

    return (
      <text x={x} y={y} fill="white" textAnchor={x > cx ? 'start' : 'end'} dominantBaseline="central">
        {`${(percent * 100).toFixed(0)}%`}
      </text>
    );
  };

  return (
    <Card className="col-span-full">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-4">
        <div>
          <CardTitle className="flex items-center gap-2">
            <Activity className="h-5 w-5 text-primary" />
            Intervention History & Success Metrics
          </CardTitle>
          <p className="text-sm text-muted-foreground mt-1">
            Track intervention implementation and measure success rates
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Select value={chartType} onValueChange={setChartType}>
            <SelectTrigger className="w-32">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="timeline">Timeline</SelectItem>
              <SelectItem value="distribution">Distribution</SelectItem>
              <SelectItem value="success">Success Rate</SelectItem>
            </SelectContent>
          </Select>
          <Select value={timeRange} onValueChange={setTimeRange}>
            <SelectTrigger className="w-32">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="3months">3 Months</SelectItem>
              <SelectItem value="6months">6 Months</SelectItem>
              <SelectItem value="1year">1 Year</SelectItem>
            </SelectContent>
          </Select>
          <Button variant="outline" size="sm">
            <Download className="h-4 w-4 mr-2" />
            Export
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        <div className="h-96">
          {chartType === 'timeline' && (
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={interventionData}>
                <CartesianGrid strokeDasharray="3 3" className="stroke-gray-400" />
                <XAxis 
                  dataKey="month" 
                  tick={{ fontSize: 12 }}
                  tickFormatter={(value) => value.split(' ')[0]}
                />
                <YAxis tick={{ fontSize: 12 }} />
                <Tooltip 
                  contentStyle={{
                    backgroundColor: 'hsl(var(--card))',
                    border: '1px solid hsl(var(--border))',
                    borderRadius: '8px'
                  }}
                />
                <Legend />
                <Bar dataKey="waterTreatment" stackId="a" fill="hsl(var(--chart-1))" name="Water Treatment" />
                <Bar dataKey="awareness" stackId="a" fill="hsl(var(--chart-2))" name="Awareness Campaign" />
                <Bar dataKey="medical" stackId="a" fill="hsl(var(--chart-3))" name="Medical Response" />
                <Bar dataKey="vaccination" stackId="a" fill="hsl(var(--chart-4))" name="Vaccination" />
              </BarChart>
            </ResponsiveContainer>
          )}
          
          {chartType === 'distribution' && (
            <div className="flex items-center justify-center h-full">
              <PieChart width={400} height={350}>
                <Pie
                  data={interventionTypes}
                  cx={200}
                  cy={175}
                  labelLine={false}
                  label={renderCustomizedLabel}
                  outerRadius={120}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {interventionTypes.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip 
                  contentStyle={{
                    backgroundColor: 'hsl(var(--card))',
                    border: '1px solid hsl(var(--border))',
                    borderRadius: '8px'
                  }}
                />
              </PieChart>
            </div>
          )}

          {chartType === 'success' && (
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={interventionData} layout="horizontal">
                <CartesianGrid strokeDasharray="3 3" className="stroke-muted/30" />
                <XAxis type="number" tick={{ fontSize: 12 }} />
                <YAxis dataKey="month" type="category" tick={{ fontSize: 12 }} width={80} />
                <Tooltip 
                  contentStyle={{
                    backgroundColor: 'hsl(var(--card))',
                    border: '1px solid hsl(var(--border))',
                    borderRadius: '8px'
                  }}
                />
                <Legend />
                <Bar dataKey="completed" fill="hsl(var(--chart-1))" name="Completed" />
                <Bar dataKey="inProgress" fill="hsl(var(--chart-2))" name="In Progress" />
              </BarChart>
            </ResponsiveContainer>
          )}
        </div>

        {/* Success Metrics Table */}
        <div className="mt-6 pt-4 border-t">
          <div className="flex items-center gap-2 mb-4">
            <Target className="h-4 w-4 text-primary" />
            <h4 className="font-medium">Success Metrics</h4>
          </div>
          <div className="space-y-3">
            {successMetrics.map((metric, index) => (
              <div key={index} className="flex items-center justify-between p-3 bg-muted/50 rounded-lg">
                <div className="flex-1">
                  <p className="font-medium text-sm">{metric.intervention}</p>
                  <div className="flex items-center gap-4 mt-1">
                    <span className="text-xs text-muted-foreground">
                      Target: {metric.target.toLocaleString()}
                    </span>
                    <span className="text-xs text-muted-foreground">
                      Achieved: {metric.achieved.toLocaleString()}
                    </span>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Badge 
                    variant={metric.successRate >= 90 ? 'default' : metric.successRate >= 75 ? 'secondary' : 'destructive'}
                    className="flex items-center gap-1"
                  >
                    {metric.successRate >= 90 && <CheckCircle className="h-3 w-3" />}
                    {metric.successRate}%
                  </Badge>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Summary Statistics */}
        <div className="grid grid-cols-4 gap-4 mt-6 pt-4 border-t">
          <div className="text-center">
            <p className="text-2xl font-bold text-chart-1">348</p>
            <p className="text-sm text-muted-foreground">Total Interventions</p>
          </div>
          <div className="text-center">
            <p className="text-2xl font-bold text-chart-2">210</p>
            <p className="text-sm text-muted-foreground">Completed</p>
          </div>
          <div className="text-center">
            <p className="text-2xl font-bold text-chart-3">118</p>
            <p className="text-sm text-muted-foreground">In Progress</p>
          </div>
          <div className="text-center">
            <p className="text-2xl font-bold text-primary">89.2%</p>
            <p className="text-sm text-muted-foreground">Success Rate</p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default InterventionChart;