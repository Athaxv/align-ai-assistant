import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/Button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { Droplets, MapPin, Cloud, BookOpen, Users, AlertTriangle, Camera, MessageSquare } from 'lucide-react';
import { mockLocations } from '@/data/mockData';

const PublicDashboard = () => {
  const [selectedLanguage, setSelectedLanguage] = useState('en');

  const languages = [
    { code: 'en', name: 'English' },
    { code: 'as', name: 'Assamese' },
    { code: 'bn', name: 'Bengali' },
    { code: 'hi', name: 'Hindi' }
  ];

  const nearbyWaterBodies = [
    { name: 'Brahmaputra River', distance: '2.3 km', status: 'safe', quality: 'good', lastTested: '2024-01-10' },
    { name: 'Community Well', distance: '0.8 km', status: 'unsafe', quality: 'poor', lastTested: '2024-01-08' },
    { name: 'Village Pond', distance: '1.5 km', status: 'safe', quality: 'fair', lastTested: '2024-01-09' }
  ];

  const weatherData = {
    temperature: 28,
    humidity: 78,
    rainfall: 12,
    floodRisk: 'medium' as 'low' | 'medium' | 'high',
    forecast: 'Moderate rain expected in next 24 hours'
  };

  const healthAlerts = [
    { id: 1, type: 'Water Quality', severity: 'high', message: 'Avoid drinking from Community Well - contamination detected', location: 'Guwahati District' },
    { id: 2, type: 'Disease Outbreak', severity: 'medium', message: 'Increased cases of diarrhea reported in nearby villages', location: 'Kamrup District' },
    { id: 3, type: 'Flood Warning', severity: 'low', message: 'River levels rising - monitor flood-prone areas', location: 'Jorhat District' }
  ];

  const educationalContent = [
    { id: 1, title: 'Safe Water Storage', category: 'hygiene', duration: '5 min read', difficulty: 'beginner' },
    { id: 2, title: 'Recognizing Water-borne Diseases', category: 'prevention', duration: '8 min read', difficulty: 'intermediate' },
    { id: 3, title: 'Monsoon Health Tips', category: 'seasonal', duration: '6 min read', difficulty: 'beginner' }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'safe': return 'bg-green-500';
      case 'unsafe': return 'bg-red-500';
      case 'unknown': return 'bg-gray-500';
      default: return 'bg-yellow-500';
    }
  };

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'high': return 'bg-red-500';
      case 'medium': return 'bg-yellow-500';
      case 'low': return 'bg-blue-500';
      default: return 'bg-gray-500';
    }
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="border-b bg-card">
        <div className="container mx-auto px-4 py-4">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-2xl font-bold">Public Health Dashboard</h1>
              <p className="text-muted-foreground">Stay informed about water quality and health in your area</p>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-sm text-muted-foreground">Language:</span>
              {languages.map((lang) => (
                <Button
                  key={lang.code}
                  variant={selectedLanguage === lang.code ? 'default' : 'outline'}
                  size="sm"
                  onClick={() => setSelectedLanguage(lang.code)}
                >
                  {lang.name}
                </Button>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-6">
        <Tabs defaultValue="overview" className="space-y-4">
          <TabsList className="grid w-full grid-cols-5">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="water-info">Water Info</TabsTrigger>
            <TabsTrigger value="health-map">Health Map</TabsTrigger>
            <TabsTrigger value="education">Education</TabsTrigger>
            <TabsTrigger value="report">Report</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-6">
            {/* Quick Stats */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <Card>
                <CardContent className="p-4">
                  <div className="flex items-center gap-3">
                    <Droplets className="h-8 w-8 text-blue-500" />
                    <div>
                      <p className="text-sm text-muted-foreground">Water Bodies</p>
                      <p className="text-2xl font-bold">12</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardContent className="p-4">
                  <div className="flex items-center gap-3">
                    <AlertTriangle className="h-8 w-8 text-yellow-500" />
                    <div>
                      <p className="text-sm text-muted-foreground">Active Alerts</p>
                      <p className="text-2xl font-bold">3</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardContent className="p-4">
                  <div className="flex items-center gap-3">
                    <Cloud className="h-8 w-8 text-gray-500" />
                    <div>
                      <p className="text-sm text-muted-foreground">Temperature</p>
                      <p className="text-2xl font-bold">{weatherData.temperature}°C</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardContent className="p-4">
                  <div className="flex items-center gap-3">
                    <BookOpen className="h-8 w-8 text-green-500" />
                    <div>
                      <p className="text-sm text-muted-foreground">Resources</p>
                      <p className="text-2xl font-bold">24</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Current Alerts */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <AlertTriangle className="h-5 w-5" />
                  Current Health Alerts
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {healthAlerts.map((alert) => (
                    <div key={alert.id} className="p-3 border rounded-lg">
                      <div className="flex items-start justify-between gap-3">
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-1">
                            <Badge className={`${getSeverityColor(alert.severity)} text-white`}>
                              {alert.severity.toUpperCase()}
                            </Badge>
                            <span className="font-medium">{alert.type}</span>
                          </div>
                          <p className="text-sm text-muted-foreground mb-1">{alert.message}</p>
                          <div className="flex items-center gap-1 text-xs text-muted-foreground">
                            <MapPin className="h-3 w-3" />
                            {alert.location}
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="water-info" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Nearby Water Bodies</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {nearbyWaterBodies.map((body, index) => (
                    <div key={index} className="p-4 border rounded-lg">
                      <div className="flex items-center justify-between">
                        <div>
                          <h3 className="font-medium">{body.name}</h3>
                          <p className="text-sm text-muted-foreground">{body.distance} away</p>
                        </div>
                        <div className="text-right">
                          <Badge className={`${getStatusColor(body.status)} text-white mb-1`}>
                            {body.status.toUpperCase()}
                          </Badge>
                          <p className="text-xs text-muted-foreground">Quality: {body.quality}</p>
                          <p className="text-xs text-muted-foreground">Tested: {body.lastTested}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Weather Information</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-3">
                    <div className="flex justify-between">
                      <span>Temperature:</span>
                      <span className="font-medium">{weatherData.temperature}°C</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Humidity:</span>
                      <span className="font-medium">{weatherData.humidity}%</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Rainfall (24h):</span>
                      <span className="font-medium">{weatherData.rainfall}mm</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Flood Risk:</span>
                      <Badge className={weatherData.floodRisk === 'high' ? 'bg-red-500 text-white' : weatherData.floodRisk === 'medium' ? 'bg-yellow-500 text-white' : 'bg-green-500 text-white'}>
                        {weatherData.floodRisk.toUpperCase()}
                      </Badge>
                    </div>
                  </div>
                  <div className="p-3 bg-secondary rounded-lg">
                    <h4 className="font-medium mb-2">Forecast</h4>
                    <p className="text-sm text-muted-foreground">{weatherData.forecast}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="health-map">
            <Card>
              <CardHeader>
                <CardTitle>Disease Outbreak Map</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-96 bg-secondary rounded-lg flex items-center justify-center">
                  <div className="text-center">
                    <MapPin className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                    <h3 className="font-medium mb-2">Interactive Disease Map</h3>
                    <p className="text-sm text-muted-foreground">
                      View disease hotspots and outbreak patterns in your region
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="education" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Educational Resources</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {educationalContent.map((content) => (
                    <Card key={content.id} className="cursor-pointer hover:shadow-md transition-shadow">
                      <CardContent className="p-4">
                        <div className="space-y-2">
                          <h3 className="font-medium">{content.title}</h3>
                          <div className="flex items-center gap-2">
                            <Badge variant="outline">{content.category}</Badge>
                            <Badge variant="outline">{content.difficulty}</Badge>
                          </div>
                          <p className="text-sm text-muted-foreground">{content.duration}</p>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Quick Health Tips</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="p-3 border-l-4 border-blue-500 bg-blue-50">
                    <p className="text-sm font-medium">💧 Always boil water for at least 1 minute before drinking</p>
                  </div>
                  <div className="p-3 border-l-4 border-green-500 bg-green-50">
                    <p className="text-sm font-medium">🧼 Wash hands frequently with soap for 20 seconds</p>
                  </div>
                  <div className="p-3 border-l-4 border-yellow-500 bg-yellow-50">
                    <p className="text-sm font-medium">🚰 Store drinking water in clean, covered containers</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="report">
            <Card>
              <CardHeader>
                <CardTitle>Community Reporting</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-muted-foreground">
                  Help your community by reporting water quality issues or health concerns anonymously.
                </p>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <Button className="h-20 flex-col gap-2">
                    <Droplets className="h-6 w-6" />
                    <span>Report Water Issue</span>
                  </Button>
                  
                  <Button variant="outline" className="h-20 flex-col gap-2">
                    <AlertTriangle className="h-6 w-6" />
                    <span>Report Health Concern</span>
                  </Button>
                  
                  <Button variant="outline" className="h-20 flex-col gap-2">
                    <Camera className="h-6 w-6" />
                    <span>Upload Photo</span>
                  </Button>
                  
                  <Button variant="outline" className="h-20 flex-col gap-2">
                    <MessageSquare className="h-6 w-6" />
                    <span>Send Anonymous Tip</span>
                  </Button>
                </div>
                
                <div className="p-4 bg-secondary rounded-lg">
                  <h4 className="font-medium mb-2">Privacy Notice</h4>
                  <p className="text-sm text-muted-foreground">
                    All reports are anonymous and used only for public health monitoring. 
                    Your location data helps us better serve your community.
                  </p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default PublicDashboard;