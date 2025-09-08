import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, BarChart, Bar } from 'recharts';
import { Activity, Droplets, Thermometer, Zap, AlertCircle, TrendingUp, Download } from 'lucide-react';
import { mockSensorData } from '@/data/mockData';
import { format } from 'date-fns';

const SensorData = () => {
  // Mock historical data for charts
  const historicalData = [
    { date: '2024-01-15', turbidity: 12.1, ph: 6.9, bacterial: 320, temperature: 23.5 },
    { date: '2024-01-16', turbidity: 14.3, ph: 6.7, bacterial: 380, temperature: 24.1 },
    { date: '2024-01-17', turbidity: 16.8, ph: 6.5, bacterial: 420, temperature: 24.8 },
    { date: '2024-01-18', turbidity: 18.2, ph: 6.4, bacterial: 480, temperature: 25.2 },
    { date: '2024-01-19', turbidity: 20.1, ph: 6.2, bacterial: 550, temperature: 25.6 },
    { date: '2024-01-20', turbidity: 15.2, ph: 6.8, bacterial: 450, temperature: 24.5 }
  ];

  const getQualityColor = (quality: string) => {
    switch (quality) {
      case 'excellent': return 'text-success';
      case 'good': return 'text-success';
      case 'fair': return 'text-warning';
      case 'poor': return 'text-destructive';
      case 'critical': return 'text-destructive';
      default: return 'text-muted-foreground';
    }
  };

  const getQualityBadge = (quality: string) => {
    switch (quality) {
      case 'excellent': return 'bg-success text-white';
      case 'good': return 'bg-success text-white';
      case 'fair': return 'bg-warning text-white';
      case 'poor': return 'bg-destructive text-white';
      case 'critical': return 'bg-risk-critical text-white';
      default: return 'bg-muted';
    }
  };

  const calculateProgress = (value: number, parameter: string) => {
    // Safe ranges (0-100%)
    const ranges = {
      turbidity: { min: 0, max: 30 },
      ph: { min: 6, max: 8.5 },
      bacterial: { min: 0, max: 1000 },
      temperature: { min: 20, max: 30 },
      dissolved_oxygen: { min: 0, max: 10 }
    };

    const range = ranges[parameter as keyof typeof ranges];
    if (!range) return 0;

    return Math.min(100, Math.max(0, ((value - range.min) / (range.max - range.min)) * 100));
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Water Quality Sensors</h1>
          <p className="text-muted-foreground">
            Monitor water quality parameters and environmental conditions
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm">
            <Download className="w-4 h-4 mr-2" />
            Export Data
          </Button>
          <Button size="sm">
            <TrendingUp className="w-4 h-4 mr-2" />
            View Trends
          </Button>
        </div>
      </div>

      {/* Current Sensor Readings */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {mockSensorData.map((sensor) => (
          <Card key={sensor.id}>
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle className="text-lg">Sensor {sensor.sensorId}</CardTitle>
                  <p className="text-sm text-muted-foreground">📍 {sensor.location.name}</p>
                </div>
                <Badge className={getQualityBadge(sensor.quality)}>
                  {sensor.quality.toUpperCase()}
                </Badge>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              {/* Turbidity */}
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Droplets className="w-4 h-4 text-primary" />
                    <span className="text-sm font-medium">Turbidity</span>
                  </div>
                  <span className="text-sm font-bold">{sensor.parameters.turbidity} NTU</span>
                </div>
                <Progress value={calculateProgress(sensor.parameters.turbidity, 'turbidity')} />
              </div>

              {/* pH Level */}
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Activity className="w-4 h-4 text-primary" />
                    <span className="text-sm font-medium">pH Level</span>
                  </div>
                  <span className="text-sm font-bold">{sensor.parameters.ph}</span>
                </div>
                <Progress value={calculateProgress(sensor.parameters.ph, 'ph')} />
              </div>

              {/* Bacterial Count */}
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <AlertCircle className="w-4 h-4 text-primary" />
                    <span className="text-sm font-medium">Bacterial</span>
                  </div>
                  <span className="text-sm font-bold">{sensor.parameters.bacterial} CFU/ml</span>
                </div>
                <Progress value={calculateProgress(sensor.parameters.bacterial, 'bacterial')} />
              </div>

              {/* Temperature */}
              {sensor.parameters.temperature && (
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Thermometer className="w-4 h-4 text-primary" />
                      <span className="text-sm font-medium">Temperature</span>
                    </div>
                    <span className="text-sm font-bold">{sensor.parameters.temperature}°C</span>
                  </div>
                  <Progress value={calculateProgress(sensor.parameters.temperature, 'temperature')} />
                </div>
              )}

              {/* Dissolved Oxygen */}
              {sensor.parameters.dissolved_oxygen && (
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Zap className="w-4 h-4 text-primary" />
                      <span className="text-sm font-medium">Dissolved O₂</span>
                    </div>
                    <span className="text-sm font-bold">{sensor.parameters.dissolved_oxygen} mg/L</span>
                  </div>
                  <Progress value={calculateProgress(sensor.parameters.dissolved_oxygen, 'dissolved_oxygen')} />
                </div>
              )}

              <div className="pt-2 border-t">
                <p className="text-xs text-muted-foreground">
                  Last updated: {format(new Date(sensor.timestamp), 'MMM dd, yyyy HH:mm')}
                </p>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Charts Section */}
      <div className="grid gap-6 lg:grid-cols-2">
        {/* Turbidity Trend */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Droplets className="w-5 h-5" />
              Water Quality Trends
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={historicalData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="date" tickFormatter={(date) => format(new Date(date), 'MMM dd')} />
                  <YAxis />
                  <Tooltip 
                    labelFormatter={(date) => format(new Date(date), 'MMM dd, yyyy')}
                  />
                  <Legend />
                  <Line type="monotone" dataKey="turbidity" stroke="hsl(var(--primary))" strokeWidth={2} name="Turbidity (NTU)" />
                  <Line type="monotone" dataKey="ph" stroke="hsl(var(--success))" strokeWidth={2} name="pH Level" />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        {/* Bacterial Count Chart */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <AlertCircle className="w-5 h-5" />
              Bacterial Contamination
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={historicalData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="date" tickFormatter={(date) => format(new Date(date), 'MMM dd')} />
                  <YAxis />
                  <Tooltip 
                    labelFormatter={(date) => format(new Date(date), 'MMM dd, yyyy')}
                    formatter={(value) => [`${value} CFU/ml`, 'Bacterial Count']}
                  />
                  <Bar dataKey="bacterial" fill="hsl(var(--destructive))" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Sensor Status Summary */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Activity className="w-5 h-5" />
            Sensor Network Status
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            <div className="p-4 bg-muted/30 rounded-lg">
              <p className="text-sm font-medium text-muted-foreground">Total Sensors</p>
              <p className="text-2xl font-bold">{mockSensorData.length}</p>
            </div>
            <div className="p-4 bg-success/10 rounded-lg">
              <p className="text-sm font-medium text-muted-foreground">Online</p>
              <p className="text-2xl font-bold text-success">{mockSensorData.length}</p>
            </div>
            <div className="p-4 bg-warning/10 rounded-lg">
              <p className="text-sm font-medium text-muted-foreground">Poor Quality</p>
              <p className="text-2xl font-bold text-warning">
                {mockSensorData.filter(s => s.quality === 'poor' || s.quality === 'critical').length}
              </p>
            </div>
            <div className="p-4 bg-destructive/10 rounded-lg">
              <p className="text-sm font-medium text-muted-foreground">Critical</p>
              <p className="text-2xl font-bold text-destructive">
                {mockSensorData.filter(s => s.quality === 'critical').length}
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Parameter Guidelines */}
      <Card>
        <CardHeader>
          <CardTitle>Water Quality Guidelines</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            <div className="p-4 border rounded-lg">
              <h4 className="font-medium mb-2">Turbidity (NTU)</h4>
              <div className="space-y-1 text-sm">
                <p><span className="inline-block w-3 h-3 bg-success rounded mr-2"></span>0-5: Excellent</p>
                <p><span className="inline-block w-3 h-3 bg-warning rounded mr-2"></span>5-15: Fair</p>
                <p><span className="inline-block w-3 h-3 bg-destructive rounded mr-2"></span>&gt;15: Poor</p>
              </div>
            </div>
            <div className="p-4 border rounded-lg">
              <h4 className="font-medium mb-2">pH Level</h4>
              <div className="space-y-1 text-sm">
                <p><span className="inline-block w-3 h-3 bg-success rounded mr-2"></span>6.5-8.5: Safe</p>
                <p><span className="inline-block w-3 h-3 bg-warning rounded mr-2"></span>6.0-6.5: Acidic</p>
                <p><span className="inline-block w-3 h-3 bg-destructive rounded mr-2"></span>&lt;6.0: Dangerous</p>
              </div>
            </div>
            <div className="p-4 border rounded-lg">
              <h4 className="font-medium mb-2">Bacterial (CFU/ml)</h4>
              <div className="space-y-1 text-sm">
                <p><span className="inline-block w-3 h-3 bg-success rounded mr-2"></span>0-100: Safe</p>
                <p><span className="inline-block w-3 h-3 bg-warning rounded mr-2"></span>100-500: Moderate</p>
                <p><span className="inline-block w-3 h-3 bg-destructive rounded mr-2"></span>&gt;500: High Risk</p>
              </div>
            </div>
            <div className="p-4 border rounded-lg">
              <h4 className="font-medium mb-2">Temperature (°C)</h4>
              <div className="space-y-1 text-sm">
                <p><span className="inline-block w-3 h-3 bg-success rounded mr-2"></span>20-25: Optimal</p>
                <p><span className="inline-block w-3 h-3 bg-warning rounded mr-2"></span>25-30: Warm</p>
                <p><span className="inline-block w-3 h-3 bg-destructive rounded mr-2"></span>&gt;30: Too Hot</p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default SensorData;