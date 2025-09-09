import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/Button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, Area, AreaChart } from 'recharts';
import { Droplets, Download, AlertTriangle } from 'lucide-react';
import { Badge } from '@/components/ui/badge';

// Mock data for water quality trends
const waterQualityData = [
  { date: '2024-01-01', turbidity: 2.3, ph: 7.2, bacterial: 45, temperature: 22.5, dissolvedOxygen: 8.2 },
  { date: '2024-01-08', turbidity: 3.1, ph: 7.0, bacterial: 62, temperature: 23.1, dissolvedOxygen: 7.8 },
  { date: '2024-01-15', turbidity: 2.8, ph: 7.1, bacterial: 58, temperature: 22.8, dissolvedOxygen: 8.0 },
  { date: '2024-01-22', turbidity: 4.2, ph: 6.8, bacterial: 85, temperature: 24.2, dissolvedOxygen: 7.2 },
  { date: '2024-01-29', turbidity: 5.8, ph: 6.5, bacterial: 120, temperature: 25.1, dissolvedOxygen: 6.8 },
  { date: '2024-02-05', turbidity: 7.2, ph: 6.2, bacterial: 180, temperature: 26.3, dissolvedOxygen: 6.1 },
  { date: '2024-02-12', turbidity: 6.8, ph: 6.4, bacterial: 165, temperature: 25.8, dissolvedOxygen: 6.4 },
  { date: '2024-02-19', turbidity: 5.2, ph: 6.7, bacterial: 142, temperature: 24.9, dissolvedOxygen: 7.0 },
  { date: '2024-02-26', turbidity: 4.1, ph: 6.9, bacterial: 98, temperature: 23.7, dissolvedOxygen: 7.5 },
  { date: '2024-03-05', turbidity: 3.2, ph: 7.1, bacterial: 72, temperature: 22.9, dissolvedOxygen: 8.1 },
];

const WaterQualityChart = () => {
  const [selectedParameter, setSelectedParameter] = useState('all');
  const [location, setLocation] = useState('all');

  const getQualityStatus = (value: number, parameter: string) => {
    switch (parameter) {
      case 'turbidity':
        if (value <= 1) return { status: 'excellent', color: 'bg-green-500' };
        if (value <= 4) return { status: 'good', color: 'bg-blue-500' };
        if (value <= 10) return { status: 'fair', color: 'bg-yellow-500' };
        return { status: 'poor', color: 'bg-red-500' };
      case 'ph':
        if (value >= 6.5 && value <= 8.5) return { status: 'good', color: 'bg-green-500' };
        if (value >= 6.0 && value <= 9.0) return { status: 'fair', color: 'bg-yellow-500' };
        return { status: 'poor', color: 'bg-red-500' };
      case 'bacterial':
        if (value <= 50) return { status: 'excellent', color: 'bg-green-500' };
        if (value <= 100) return { status: 'good', color: 'bg-blue-500' };
        if (value <= 200) return { status: 'fair', color: 'bg-yellow-500' };
        return { status: 'poor', color: 'bg-red-500' };
      default:
        return { status: 'unknown', color: 'bg-gray-500' };
    }
  };

  const latestData = waterQualityData[waterQualityData.length - 1];

  return (
    <Card className="col-span-full">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-4">
        <div>
          <CardTitle className="flex items-center gap-2">
            <Droplets className="h-5 w-5 text-primary" />
            Water Quality Trends
          </CardTitle>
          <p className="text-sm text-muted-foreground mt-1">
            Real-time monitoring of water quality parameters across locations
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Select value={selectedParameter} onValueChange={setSelectedParameter}>
            <SelectTrigger className="w-40">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Parameters</SelectItem>
              <SelectItem value="turbidity">Turbidity (NTU)</SelectItem>
              <SelectItem value="ph">pH Level</SelectItem>
              <SelectItem value="bacterial">Bacterial Count</SelectItem>
              <SelectItem value="temperature">Temperature</SelectItem>
              <SelectItem value="dissolvedOxygen">Dissolved Oxygen</SelectItem>
            </SelectContent>
          </Select>
          <Select value={location} onValueChange={setLocation}>
            <SelectTrigger className="w-32">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Locations</SelectItem>
              <SelectItem value="bukavu">Bukavu</SelectItem>
              <SelectItem value="goma">Goma</SelectItem>
              <SelectItem value="uvira">Uvira</SelectItem>
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
          <ResponsiveContainer width="100%" height="100%">
            {selectedParameter === 'all' ? (
              <LineChart data={waterQualityData}>
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
                <Line 
                  type="monotone" 
                  dataKey="turbidity" 
                  stroke="hsl(var(--chart-1))" 
                  strokeWidth={2}
                  name="Turbidity (NTU)"
                  dot={{ fill: 'hsl(var(--chart-1))' }}
                />
                <Line 
                  type="monotone" 
                  dataKey="ph" 
                  stroke="hsl(var(--chart-2))" 
                  strokeWidth={2}
                  name="pH Level"
                  dot={{ fill: 'hsl(var(--chart-2))' }}
                />
                <Line 
                  type="monotone" 
                  dataKey="bacterial" 
                  stroke="hsl(var(--chart-3))" 
                  strokeWidth={2}
                  name="Bacterial Count"
                  dot={{ fill: 'hsl(var(--chart-3))' }}
                />
              </LineChart>
            ) : (
              <AreaChart data={waterQualityData}>
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
                <Area 
                  type="monotone" 
                  dataKey={selectedParameter} 
                  stroke="hsl(var(--primary))" 
                  fill="hsl(var(--primary)/0.2)"
                  strokeWidth={2}
                />
              </AreaChart>
            )}
          </ResponsiveContainer>
        </div>

        {/* Current Quality Status */}
        <div className="grid grid-cols-5 gap-4 mt-6 pt-4 border-t">
          <div className="text-center">
            <div className="flex items-center justify-center gap-2 mb-1">
              <div className={`w-3 h-3 rounded-full ${getQualityStatus(latestData.turbidity, 'turbidity').color}`} />
              <Badge variant={getQualityStatus(latestData.turbidity, 'turbidity').status === 'poor' ? 'destructive' : 'default'}>
                {getQualityStatus(latestData.turbidity, 'turbidity').status}
              </Badge>
            </div>
            <p className="text-lg font-bold">{latestData.turbidity} NTU</p>
            <p className="text-sm text-muted-foreground">Turbidity</p>
          </div>
          <div className="text-center">
            <div className="flex items-center justify-center gap-2 mb-1">
              <div className={`w-3 h-3 rounded-full ${getQualityStatus(latestData.ph, 'ph').color}`} />
              <Badge variant={getQualityStatus(latestData.ph, 'ph').status === 'poor' ? 'destructive' : 'default'}>
                {getQualityStatus(latestData.ph, 'ph').status}
              </Badge>
            </div>
            <p className="text-lg font-bold">{latestData.ph}</p>
            <p className="text-sm text-muted-foreground">pH Level</p>
          </div>
          <div className="text-center">
            <div className="flex items-center justify-center gap-2 mb-1">
              <div className={`w-3 h-3 rounded-full ${getQualityStatus(latestData.bacterial, 'bacterial').color}`} />
              <Badge variant={getQualityStatus(latestData.bacterial, 'bacterial').status === 'poor' ? 'destructive' : 'default'}>
                {getQualityStatus(latestData.bacterial, 'bacterial').status}
              </Badge>
            </div>
            <p className="text-lg font-bold">{latestData.bacterial}</p>
            <p className="text-sm text-muted-foreground">Bacterial Count</p>
          </div>
          <div className="text-center">
            <p className="text-lg font-bold">{latestData.temperature}°C</p>
            <p className="text-sm text-muted-foreground">Temperature</p>
          </div>
          <div className="text-center">
            <p className="text-lg font-bold">{latestData.dissolvedOxygen} mg/L</p>
            <p className="text-sm text-muted-foreground">Dissolved O₂</p>
          </div>
        </div>

        {/* Alert Section */}
        {(latestData.turbidity > 5 || latestData.ph < 6.5 || latestData.bacterial > 100) && (
          <div className="mt-4 p-4 bg-destructive/10 border border-destructive/20 rounded-lg">
            <div className="flex items-center gap-2 text-destructive">
              <AlertTriangle className="h-4 w-4" />
              <span className="font-medium">Water Quality Alert</span>
            </div>
            <p className="text-sm text-muted-foreground mt-1">
              Current water quality parameters exceed safe thresholds. Immediate intervention recommended.
            </p>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default WaterQualityChart;