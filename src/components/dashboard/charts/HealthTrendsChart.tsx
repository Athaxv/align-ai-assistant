import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/Button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { CalendarDays, Download, TrendingUp } from 'lucide-react';

// Mock data for health trends
const healthTrendsData = [
  { date: '2024-01-01', diarrhea: 12, fever: 8, vomiting: 5, totalCases: 25 },
  { date: '2024-01-08', diarrhea: 18, fever: 12, vomiting: 8, totalCases: 38 },
  { date: '2024-01-15', diarrhea: 15, fever: 10, vomiting: 6, totalCases: 31 },
  { date: '2024-01-22', diarrhea: 22, fever: 15, vomiting: 12, totalCases: 49 },
  { date: '2024-01-29', diarrhea: 28, fever: 18, vomiting: 15, totalCases: 61 },
  { date: '2024-02-05', diarrhea: 35, fever: 25, vomiting: 20, totalCases: 80 },
  { date: '2024-02-12', diarrhea: 42, fever: 30, vomiting: 25, totalCases: 97 },
  { date: '2024-02-19', diarrhea: 38, fever: 28, vomiting: 22, totalCases: 88 },
  { date: '2024-02-26', diarrhea: 32, fever: 22, vomiting: 18, totalCases: 72 },
  { date: '2024-03-05', diarrhea: 28, fever: 20, vomiting: 15, totalCases: 63 },
];

const HealthTrendsChart = () => {
  const [timeRange, setTimeRange] = useState('3months');
  const [chartType, setChartType] = useState('symptoms');

  const handleExport = () => {
    // Export functionality
    console.log('Exporting health trends data...');
  };

  return (
    <Card className="col-span-full">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-4">
        <div>
          <CardTitle className="flex items-center gap-2">
            <TrendingUp className="h-5 w-5 text-primary" />
            Health Trends Analysis
          </CardTitle>
          <p className="text-sm text-muted-foreground mt-1">
            Time-series analysis of reported health cases by symptom type
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Select value={timeRange} onValueChange={setTimeRange}>
            <SelectTrigger className="w-32">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="1month">1 Month</SelectItem>
              <SelectItem value="3months">3 Months</SelectItem>
              <SelectItem value="6months">6 Months</SelectItem>
              <SelectItem value="1year">1 Year</SelectItem>
            </SelectContent>
          </Select>
          <Select value={chartType} onValueChange={setChartType}>
            <SelectTrigger className="w-32">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="symptoms">By Symptoms</SelectItem>
              <SelectItem value="total">Total Cases</SelectItem>
              <SelectItem value="comparative">Comparative</SelectItem>
            </SelectContent>
          </Select>
          <Button variant="outline" size="sm" onClick={handleExport}>
            <Download className="h-4 w-4 mr-2" />
            Export
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        <div className="h-96">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={healthTrendsData}>
              <CartesianGrid strokeDasharray="3 3" className="stroke-muted/30" />
              <XAxis 
                dataKey="date" 
                tick={{ fontSize: 12 }}
                tickFormatter={(value) => new Date(value).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
              />
              <YAxis tick={{ fontSize: 12 }} />
              <Tooltip 
                labelFormatter={(value) => new Date(value).toLocaleDateString('en-US', { 
                  weekday: 'short', 
                  month: 'short', 
                  day: 'numeric' 
                })}
                contentStyle={{
                  backgroundColor: 'hsl(var(--card))',
                  border: '1px solid hsl(var(--border))',
                  borderRadius: '8px'
                }}
              />
              <Legend />
              {chartType === 'symptoms' && (
                <>
                  <Line 
                    type="monotone" 
                    dataKey="diarrhea" 
                    stroke="hsl(var(--chart-1))" 
                    strokeWidth={3}
                    name="Diarrhea Cases"
                    dot={{ fill: 'hsl(var(--chart-1))' }}
                    activeDot={{ r: 8 }}
                  />
                  <Line 
                    type="monotone" 
                    dataKey="fever" 
                    stroke="hsl(var(--chart-2))" 
                    strokeWidth={3}
                    name="Fever Cases"
                    dot={{ fill: 'hsl(var(--chart-2))' }}
                    activeDot={{ r: 8 }}
                  />
                  <Line 
                    type="monotone" 
                    dataKey="vomiting" 
                    stroke="hsl(var(--chart-3))" 
                    strokeWidth={3}
                    name="Vomiting Cases"
                    dot={{ fill: 'hsl(var(--chart-3))' }}
                    activeDot={{ r: 8 }}
                  />
                </>
              )}
              {chartType === 'total' && (
                <Line 
                  type="monotone" 
                  dataKey="totalCases" 
                  stroke="hsl(var(--primary))" 
                  strokeWidth={3}
                  name="Total Cases"
                  dot={{ fill: 'hsl(var(--primary))' }}
                  activeDot={{ r: 8 }}
                />
              )}
            </LineChart>
          </ResponsiveContainer>
        </div>
        
        {/* Summary Statistics */}
        <div className="grid grid-cols-4 gap-4 mt-6 pt-4 border-t">
          <div className="text-center">
            <p className="text-2xl font-bold text-chart-1">156</p>
            <p className="text-sm text-muted-foreground">Total Diarrhea</p>
          </div>
          <div className="text-center">
            <p className="text-2xl font-bold text-chart-2">108</p>
            <p className="text-sm text-muted-foreground">Total Fever</p>
          </div>
          <div className="text-center">
            <p className="text-2xl font-bold text-chart-3">86</p>
            <p className="text-sm text-muted-foreground">Total Vomiting</p>
          </div>
          <div className="text-center">
            <p className="text-2xl font-bold text-primary">350</p>
            <p className="text-sm text-muted-foreground">Total Cases</p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default HealthTrendsChart;