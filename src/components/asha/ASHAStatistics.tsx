import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell
} from 'recharts';
import { TrendingUp, Calendar, Users, AlertTriangle } from 'lucide-react';

const ASHAStatistics = () => {
  const [reports, setReports] = useState<any[]>([]);
  const [timeRange, setTimeRange] = useState('7');

  useEffect(() => {
    // Load reports from localStorage
    const savedReports = JSON.parse(localStorage.getItem('asha_surveys') || '[]');
    setReports(savedReports);
  }, []);

  // Generate mock data for demonstration
  const generateMockData = () => {
    const days = parseInt(timeRange);
    const mockData = [];
    
    for (let i = days - 1; i >= 0; i--) {
      const date = new Date();
      date.setDate(date.getDate() - i);
      
      mockData.push({
        date: date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
        fullDate: date.toISOString().split('T')[0],
        surveys: Math.floor(Math.random() * 5) + 1,
        cases: Math.floor(Math.random() * 8),
        symptoms: Math.floor(Math.random() * 12) + 3
      });
    }
    return mockData;
  };

  const chartData = generateMockData();

  // Symptom distribution data
  const symptomData = [
    { name: 'Fever', value: 35, fill: '#ef4444' },
    { name: 'Diarrhea', value: 28, fill: '#f97316' },
    { name: 'Nausea', value: 20, fill: '#eab308' },
    { name: 'Headache', value: 15, fill: '#22c55e' },
    { name: 'Other', value: 12, fill: '#6366f1' }
  ];

  // Calculate statistics
  const totalSurveys = chartData.reduce((sum, day) => sum + day.surveys, 0);
  const totalCases = chartData.reduce((sum, day) => sum + day.cases, 0);
  const avgCasesPerDay = totalCases / chartData.length;
  const peakDay = chartData.reduce((max, day) => day.cases > max.cases ? day : max, chartData[0]);

  return (
    <div className="space-y-6">
      {/* Time Range Selector */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle>Health Survey Statistics</CardTitle>
            <Select value={timeRange} onValueChange={setTimeRange}>
              <SelectTrigger className="w-40">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="7">Last 7 days</SelectItem>
                <SelectItem value="14">Last 14 days</SelectItem>
                <SelectItem value="30">Last 30 days</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardHeader>
      </Card>

      {/* Summary Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-primary/10 rounded-lg">
                <Calendar className="h-4 w-4 text-primary" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Total Surveys</p>
                <p className="text-xl font-bold">{totalSurveys}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-warning/10 rounded-lg">
                <Users className="h-4 w-4 text-warning" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Total Cases</p>
                <p className="text-xl font-bold">{totalCases}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-info/10 rounded-lg">
                <TrendingUp className="h-4 w-4 text-info" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Avg/Day</p>
                <p className="text-xl font-bold">{avgCasesPerDay.toFixed(1)}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-destructive/10 rounded-lg">
                <AlertTriangle className="h-4 w-4 text-destructive" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Peak Day</p>
                <p className="text-xl font-bold">{peakDay?.cases || 0}</p>
                <p className="text-xs text-muted-foreground">{peakDay?.date}</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Daily Cases Trend */}
        <Card>
          <CardHeader>
            <CardTitle>Daily Cases Trend</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={chartData}>
                <CartesianGrid strokeDasharray="3 3" className="opacity-30" />
                <XAxis dataKey="date" />
                <YAxis />
                <Tooltip />
                <Line 
                  type="monotone" 
                  dataKey="cases" 
                  stroke="hsl(var(--primary))" 
                  strokeWidth={2}
                  dot={{ fill: 'hsl(var(--primary))', strokeWidth: 2 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Survey Activity */}
        <Card>
          <CardHeader>
            <CardTitle>Survey Activity</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={chartData}>
                <CartesianGrid strokeDasharray="3 3" className="opacity-30" />
                <XAxis dataKey="date" />
                <YAxis />
                <Tooltip />
                <Bar 
                  dataKey="surveys" 
                  fill="hsl(var(--primary))" 
                  radius={[4, 4, 0, 0]}
                />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Symptom Distribution */}
        <Card>
          <CardHeader>
            <CardTitle>Most Common Symptoms</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={symptomData}
                  cx="50%"
                  cy="50%"
                  outerRadius={80}
                  dataKey="value"
                  label={({name, value}) => `${name}: ${value}%`}
                  labelLine={false}
                >
                  {symptomData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.fill} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Weekly Comparison */}
        <Card>
          <CardHeader>
            <CardTitle>Cases vs Symptoms Reported</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={chartData}>
                <CartesianGrid strokeDasharray="3 3" className="opacity-30" />
                <XAxis dataKey="date" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="cases" fill="hsl(var(--primary))" radius={[2, 2, 0, 0]} />
                <Bar dataKey="symptoms" fill="hsl(var(--secondary))" radius={[2, 2, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      {/* Insights */}
      <Card>
        <CardHeader>
          <CardTitle>Key Insights</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="p-3 bg-blue-50 border border-blue-200 rounded-lg">
              <h4 className="font-medium text-blue-900 mb-1">Survey Consistency</h4>
              <p className="text-sm text-blue-700">
                You've maintained regular survey activity with an average of {(totalSurveys / parseInt(timeRange)).toFixed(1)} surveys per day.
              </p>
            </div>
            
            <div className="p-3 bg-green-50 border border-green-200 rounded-lg">
              <h4 className="font-medium text-green-900 mb-1">Community Health</h4>
              <p className="text-sm text-green-700">
                {totalCases === 0 
                  ? "No cases reported - community health appears stable."
                  : `${totalCases} cases detected, showing active community monitoring.`}
              </p>
            </div>
            
            <div className="p-3 bg-yellow-50 border border-yellow-200 rounded-lg">
              <h4 className="font-medium text-yellow-900 mb-1">Peak Activity</h4>
              <p className="text-sm text-yellow-700">
                Highest case count was {peakDay?.cases || 0} on {peakDay?.date || 'N/A'}. Monitor for patterns.
              </p>
            </div>
            
            <div className="p-3 bg-purple-50 border border-purple-200 rounded-lg">
              <h4 className="font-medium text-purple-900 mb-1">Common Symptoms</h4>
              <p className="text-sm text-purple-700">
                Fever and diarrhea are most commonly reported. Focus prevention efforts accordingly.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ASHAStatistics;