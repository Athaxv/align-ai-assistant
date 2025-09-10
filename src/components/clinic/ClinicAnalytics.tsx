import React, { useState } from 'react';
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
  Cell,
  Area,
  AreaChart
} from 'recharts';
import { TrendingUp, Users, Calendar, Stethoscope } from 'lucide-react';

const ClinicAnalytics = () => {
  const [timeRange, setTimeRange] = useState('7');

  // Generate mock data for demonstration
  const generateDailyData = () => {
    const days = parseInt(timeRange);
    const data = [];
    
    for (let i = days - 1; i >= 0; i--) {
      const date = new Date();
      date.setDate(date.getDate() - i);
      
      data.push({
        date: date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
        fullDate: date.toISOString().split('T')[0],
        patients: Math.floor(Math.random() * 15) + 5,
        fever: Math.floor(Math.random() * 8) + 2,
        diarrhea: Math.floor(Math.random() * 6) + 1,
        respiratory: Math.floor(Math.random() * 4) + 1,
        followUps: Math.floor(Math.random() * 5)
      });
    }
    return data;
  };

  const dailyData = generateDailyData();

  // Age group distribution
  const ageGroupData = [
    { name: '0-18', value: 35, fill: '#ef4444' },
    { name: '19-35', value: 28, fill: '#f97316' },
    { name: '36-55', value: 22, fill: '#eab308' },
    { name: '56+', value: 15, fill: '#22c55e' }
  ];

  // Top symptoms data
  const symptomData = [
    { symptom: 'Fever', count: 45, color: '#ef4444' },
    { symptom: 'Diarrhea', count: 32, color: '#f97316' },
    { symptom: 'Headache', count: 28, color: '#eab308' },
    { symptom: 'Nausea', count: 24, color: '#22c55e' },
    { symptom: 'Body Ache', count: 18, color: '#6366f1' }
  ];

  // Calculate statistics
  const totalPatients = dailyData.reduce((sum, day) => sum + day.patients, 0);
  const avgPatientsPerDay = totalPatients / dailyData.length;
  const totalFollowUps = dailyData.reduce((sum, day) => sum + day.followUps, 0);
  const followUpRate = ((totalFollowUps / totalPatients) * 100).toFixed(1);

  return (
    <div className="space-y-6">
      {/* Time Range Selector */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle>Clinic Analytics</CardTitle>
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
                <Users className="h-4 w-4 text-primary" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Total Patients</p>
                <p className="text-xl font-bold">{totalPatients}</p>
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
                <p className="text-xl font-bold">{avgPatientsPerDay.toFixed(1)}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-warning/10 rounded-lg">
                <Calendar className="h-4 w-4 text-warning" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Follow-ups</p>
                <p className="text-xl font-bold">{totalFollowUps}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-success/10 rounded-lg">
                <Stethoscope className="h-4 w-4 text-success" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Follow-up Rate</p>
                <p className="text-xl font-bold">{followUpRate}%</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Daily Patients Trend */}
        <Card>
          <CardHeader>
            <CardTitle>Daily Patient Count</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <AreaChart data={dailyData}>
                <CartesianGrid strokeDasharray="3 3" className="opacity-30" />
                <XAxis dataKey="date" />
                <YAxis />
                <Tooltip />
                <Area 
                  type="monotone" 
                  dataKey="patients" 
                  stroke="hsl(var(--primary))" 
                  fill="hsl(var(--primary))"
                  fillOpacity={0.3}
                />
              </AreaChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Top Symptoms */}
        <Card>
          <CardHeader>
            <CardTitle>Most Common Symptoms</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={symptomData} layout="horizontal">
                <CartesianGrid strokeDasharray="3 3" className="opacity-30" />
                <XAxis type="number" />
                <YAxis dataKey="symptom" type="category" width={80} />
                <Tooltip />
                <Bar 
                  dataKey="count" 
                  fill="hsl(var(--primary))" 
                  radius={[0, 4, 4, 0]}
                />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Age Group Distribution */}
        <Card>
          <CardHeader>
            <CardTitle>Patient Age Groups</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={ageGroupData}
                  cx="50%"
                  cy="50%"
                  outerRadius={80}
                  dataKey="value"
                  label={({name, value}) => `${name}: ${value}%`}
                  labelLine={false}
                >
                  {ageGroupData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.fill} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Symptom Trends */}
        <Card>
          <CardHeader>
            <CardTitle>Symptom Trends</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={dailyData}>
                <CartesianGrid strokeDasharray="3 3" className="opacity-30" />
                <XAxis dataKey="date" />
                <YAxis />
                <Tooltip />
                <Line 
                  type="monotone" 
                  dataKey="fever" 
                  stroke="#ef4444" 
                  strokeWidth={2}
                  name="Fever"
                />
                <Line 
                  type="monotone" 
                  dataKey="diarrhea" 
                  stroke="#f97316" 
                  strokeWidth={2}
                  name="Diarrhea"
                />
                <Line 
                  type="monotone" 
                  dataKey="respiratory" 
                  stroke="#22c55e" 
                  strokeWidth={2}
                  name="Respiratory"
                />
              </LineChart>
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
              <h4 className="font-medium text-blue-900 mb-1">Patient Volume</h4>
              <p className="text-sm text-blue-700">
                Daily patient volume is {avgPatientsPerDay > 10 ? 'high' : 'moderate'} with an average of {avgPatientsPerDay.toFixed(1)} patients per day.
              </p>
            </div>
            
            <div className="p-3 bg-green-50 border border-green-200 rounded-lg">
              <h4 className="font-medium text-green-900 mb-1">Follow-up Rate</h4>
              <p className="text-sm text-green-700">
                {parseFloat(followUpRate) > 20 
                  ? `High follow-up rate of ${followUpRate}% indicates good patient care tracking.`
                  : `Follow-up rate of ${followUpRate}% could be improved for better patient outcomes.`}
              </p>
            </div>
            
            <div className="p-3 bg-yellow-50 border border-yellow-200 rounded-lg">
              <h4 className="font-medium text-yellow-900 mb-1">Common Symptoms</h4>
              <p className="text-sm text-yellow-700">
                Fever and diarrhea are the most common symptoms. Consider stocking relevant medications.
              </p>
            </div>
            
            <div className="p-3 bg-purple-50 border border-purple-200 rounded-lg">
              <h4 className="font-medium text-purple-900 mb-1">Patient Demographics</h4>
              <p className="text-sm text-purple-700">
                Children (0-18) make up the largest patient group. Consider pediatric preparations.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ClinicAnalytics;