import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/Button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { MapPin, Layers, Filter, Maximize, Activity, Droplets, AlertTriangle } from 'lucide-react';
import { mockLocations, mockRiskAssessment, mockHealthReports, mockSensorData } from '@/data/mockData';

const InteractiveMap = () => {
  const [selectedLocation, setSelectedLocation] = useState<string | null>(null);
  const [mapLayer, setMapLayer] = useState('risk');
  const [timeRange, setTimeRange] = useState('7d');

  const getRiskLevel = (locationId: string) => {
    const riskData = mockRiskAssessment.find(r => r.location.id === locationId);
    return riskData?.overallRisk || 'low';
  };

  const getRiskColor = (riskLevel: string) => {
    switch (riskLevel) {
      case 'critical': return 'bg-risk-critical';
      case 'high': return 'bg-risk-high';
      case 'medium': return 'bg-risk-medium';
      case 'low': return 'bg-risk-low';
      default: return 'bg-muted';
    }
  };

  const getLocationStats = (locationId: string) => {
    const reports = mockHealthReports.filter(r => r.location.id === locationId);
    const sensors = mockSensorData.filter(s => s.location.id === locationId);
    const riskData = mockRiskAssessment.find(r => r.location.id === locationId);

    return {
      reports: reports.length,
      activeReports: reports.filter(r => r.status === 'active').length,
      sensors: sensors.length,
      riskLevel: riskData?.overallRisk || 'low',
      prediction: riskData?.prediction
    };
  };

  const selectedLocationData = selectedLocation 
    ? mockLocations.find(l => l.id === selectedLocation)
    : null;

  const selectedLocationStats = selectedLocation 
    ? getLocationStats(selectedLocation)
    : null;

  const selectedRiskData = selectedLocation
    ? mockRiskAssessment.find(r => r.location.id === selectedLocation)
    : null;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Risk Assessment Map</h1>
          <p className="text-muted-foreground">
            Interactive visualization of outbreak risks and health data across regions
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm">
            <Maximize className="w-4 h-4 mr-2" />
            Fullscreen
          </Button>
          <Button size="sm">
            <Filter className="w-4 h-4 mr-2" />
            Advanced Filters
          </Button>
        </div>
      </div>

      {/* Map Controls */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Layers className="w-5 h-5" />
            Map Controls
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 md:grid-cols-4">
            <div>
              <label className="text-sm font-medium">Map Layer</label>
              <Select value={mapLayer} onValueChange={setMapLayer}>
                <SelectTrigger className="mt-1">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="risk">Risk Assessment</SelectItem>
                  <SelectItem value="health">Health Reports</SelectItem>
                  <SelectItem value="sensors">Water Quality</SelectItem>
                  <SelectItem value="weather">Weather Data</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <label className="text-sm font-medium">Time Range</label>
              <Select value={timeRange} onValueChange={setTimeRange}>
                <SelectTrigger className="mt-1">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="24h">Last 24 Hours</SelectItem>
                  <SelectItem value="7d">Last 7 Days</SelectItem>
                  <SelectItem value="30d">Last 30 Days</SelectItem>
                  <SelectItem value="90d">Last 90 Days</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Map and Details */}
      <div className="grid gap-6 lg:grid-cols-3">
        {/* Map Visualization */}
        <div className="lg:col-span-2">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <MapPin className="w-5 h-5" />
                Regional Risk Map
              </CardTitle>
            </CardHeader>
            <CardContent>
              {/* Mock Map - In real implementation, would use Mapbox or similar */}
              <div className="relative h-96 bg-muted/20 rounded-lg border-2 border-dashed border-muted flex items-center justify-center">
                <div className="text-center">
                  <MapPin className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                  <p className="text-lg font-medium text-muted-foreground mb-2">Interactive Map</p>
                  <p className="text-sm text-muted-foreground max-w-md">
                    In a real implementation, this would display an interactive map using Mapbox or Google Maps
                    showing color-coded regions based on risk levels and health data.
                  </p>
                </div>

                {/* Mock Location Markers */}
                <div className="absolute inset-0 p-4">
                  {mockLocations.map((location, index) => {
                    const riskLevel = getRiskLevel(location.id);
                    const isSelected = selectedLocation === location.id;
                    
                    return (
                      <div
                        key={location.id}
                        className={`absolute cursor-pointer transform -translate-x-1/2 -translate-y-1/2 ${
                          isSelected ? 'scale-125' : 'hover:scale-110'
                        } transition-transform`}
                        style={{
                          left: `${20 + index * 15}%`,
                          top: `${30 + index * 10}%`,
                        }}
                        onClick={() => setSelectedLocation(location.id)}
                      >
                        <div className={`w-6 h-6 rounded-full ${getRiskColor(riskLevel)} border-2 border-white shadow-lg`} />
                        <div className="absolute top-8 left-1/2 transform -translate-x-1/2 bg-white px-2 py-1 rounded shadow text-xs font-medium whitespace-nowrap">
                          {location.name}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Map Legend */}
              <div className="mt-4 flex items-center gap-6">
                <div className="flex items-center gap-4">
                  <span className="text-sm font-medium">Risk Levels:</span>
                  <div className="flex items-center gap-1">
                    <div className="w-3 h-3 rounded-full bg-risk-low"></div>
                    <span className="text-xs">Low</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <div className="w-3 h-3 rounded-full bg-risk-medium"></div>
                    <span className="text-xs">Medium</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <div className="w-3 h-3 rounded-full bg-risk-high"></div>
                    <span className="text-xs">High</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <div className="w-3 h-3 rounded-full bg-risk-critical"></div>
                    <span className="text-xs">Critical</span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Location Details */}
        <div className="space-y-6">
          {selectedLocationData && selectedLocationStats ? (
            <>
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <MapPin className="w-5 h-5" />
                    {selectedLocationData.name}
                  </CardTitle>
                  <Badge className={`${getRiskColor(selectedLocationStats.riskLevel)} text-white w-fit`}>
                    {selectedLocationStats.riskLevel.toUpperCase()} RISK
                  </Badge>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid gap-3">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <Activity className="w-4 h-4 text-muted-foreground" />
                        <span className="text-sm">Health Reports</span>
                      </div>
                      <div className="text-right">
                        <p className="font-medium">{selectedLocationStats.reports}</p>
                        <p className="text-xs text-muted-foreground">
                          {selectedLocationStats.activeReports} active
                        </p>
                      </div>
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <Droplets className="w-4 h-4 text-muted-foreground" />
                        <span className="text-sm">Water Sensors</span>
                      </div>
                      <p className="font-medium">{selectedLocationStats.sensors}</p>
                    </div>

                    {selectedLocationStats.prediction && (
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <AlertTriangle className="w-4 h-4 text-muted-foreground" />
                          <span className="text-sm">Next Week Prediction</span>
                        </div>
                        <div className="text-right">
                          <Badge className={`${getRiskColor(selectedLocationStats.prediction.nextWeek)} text-white`}>
                            {selectedLocationStats.prediction.nextWeek.toUpperCase()}
                          </Badge>
                          <p className="text-xs text-muted-foreground">
                            {Math.round(selectedLocationStats.prediction.confidence * 100)}% confidence
                          </p>
                        </div>
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>

              {selectedRiskData && (
                <Card>
                  <CardHeader>
                    <CardTitle>Risk Factors</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    {Object.entries(selectedRiskData.factors).map(([factor, value]) => (
                      <div key={factor} className="space-y-1">
                        <div className="flex justify-between text-sm">
                          <span className="capitalize">{factor.replace(/([A-Z])/g, ' $1')}</span>
                          <span className="font-medium">{value}%</span>
                        </div>
                        <div className="w-full bg-muted rounded-full h-2">
                          <div 
                            className="bg-primary h-2 rounded-full transition-all duration-300" 
                            style={{ width: `${value}%` }}
                          />
                        </div>
                      </div>
                    ))}
                  </CardContent>
                </Card>
              )}

              {selectedRiskData?.recommendedActions && selectedRiskData.recommendedActions.length > 0 && (
                <Card>
                  <CardHeader>
                    <CardTitle>Recommended Actions</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-2">
                      {selectedRiskData.recommendedActions.map((action, index) => (
                        <li key={index} className="flex items-start gap-2 text-sm">
                          <div className="w-1.5 h-1.5 bg-primary rounded-full mt-2 flex-shrink-0" />
                          <span>{action}</span>
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              )}
            </>
          ) : (
            <Card>
              <CardContent className="p-8 text-center">
                <MapPin className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                <p className="text-lg font-medium text-muted-foreground mb-2">
                  Select a Location
                </p>
                <p className="text-sm text-muted-foreground">
                  Click on any location marker on the map to view detailed information about risk assessments, health data, and recommended actions.
                </p>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
};

export default InteractiveMap;