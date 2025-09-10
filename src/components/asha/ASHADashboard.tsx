import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  Users, 
  MapPin, 
  Calendar, 
  AlertTriangle, 
  CheckCircle, 
  FileText,
  BarChart3,
  Plus,
  Activity,
  Clock,
  TrendingUp,
  Bell
} from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import DailySurveyForm from './DailySurveyForm';
import ASHATasksPanel from './ASHATasksPanel';
import ASHALogsHistory from './ASHALogsHistory';
import ASHAStatistics from './ASHAStatistics';

const ASHADashboard = () => {
  const { user } = useAuth();
  const [showSurveyForm, setShowSurveyForm] = useState(false);

  // Mock data for ASHA worker
  const dashboardStats = {
    surveysThisWeek: 12,
    suspectedCases: 8,
    activeTasks: 3,
    completedTasks: 15,
    alertsReceived: 2,
  };

  const recentActivities = [
    { id: 1, type: 'survey', description: 'Completed daily survey for Village A', time: '2 hours ago' },
    { id: 2, type: 'task', description: 'Conducted awareness session on water safety', time: '1 day ago' },
    { id: 3, type: 'alert', description: 'Received outbreak alert for nearby area', time: '2 days ago' },
  ];

  const activeAlerts = [
    {
      id: 1,
      title: 'Increased diarrhea cases in nearby villages',
      severity: 'high',
      description: 'Extra vigilance required. Report any suspected cases immediately.',
      time: '1 day ago'
    },
    {
      id: 2,
      title: 'Water quality advisory',
      severity: 'medium',
      description: 'Advise community to boil water before consumption.',
      time: '3 days ago'
    }
  ];

  if (showSurveyForm) {
    return <DailySurveyForm onClose={() => setShowSurveyForm(false)} />;
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="border-b bg-card">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold">Welcome, {user?.name}</h1>
              <p className="text-muted-foreground">ASHA Worker Dashboard</p>
            </div>
            <Button onClick={() => setShowSurveyForm(true)} className="gap-2">
              <Plus className="h-4 w-4" />
              New Survey
            </Button>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-6">
        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-5 gap-4 mb-6">
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-primary/10 rounded-lg">
                  <Calendar className="h-4 w-4 text-primary" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">This Week</p>
                  <p className="text-xl font-bold">{dashboardStats.surveysThisWeek}</p>
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
                  <p className="text-sm text-muted-foreground">Suspected Cases</p>
                  <p className="text-xl font-bold">{dashboardStats.suspectedCases}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-info/10 rounded-lg">
                  <Clock className="h-4 w-4 text-info" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Active Tasks</p>
                  <p className="text-xl font-bold">{dashboardStats.activeTasks}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-success/10 rounded-lg">
                  <CheckCircle className="h-4 w-4 text-success" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Completed</p>
                  <p className="text-xl font-bold">{dashboardStats.completedTasks}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-destructive/10 rounded-lg">
                  <Bell className="h-4 w-4 text-destructive" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">New Alerts</p>
                  <p className="text-xl font-bold">{dashboardStats.alertsReceived}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left Column - Alerts & Activities */}
          <div className="space-y-6">
            {/* Active Alerts */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <AlertTriangle className="h-5 w-5 text-warning" />
                  Active Alerts
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {activeAlerts.map((alert) => (
                  <div key={alert.id} className="p-3 border rounded-lg">
                    <div className="flex items-start justify-between gap-2 mb-2">
                      <h4 className="font-medium text-sm">{alert.title}</h4>
                      <Badge variant={alert.severity === 'high' ? 'destructive' : 'secondary'}>
                        {alert.severity}
                      </Badge>
                    </div>
                    <p className="text-xs text-muted-foreground mb-2">{alert.description}</p>
                    <p className="text-xs text-muted-foreground">{alert.time}</p>
                  </div>
                ))}
              </CardContent>
            </Card>

            {/* Recent Activities */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Activity className="h-5 w-5" />
                  Recent Activities
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {recentActivities.map((activity) => (
                  <div key={activity.id} className="flex items-start gap-3 p-2">
                    <div className="p-1 bg-primary/10 rounded">
                      {activity.type === 'survey' && <FileText className="h-3 w-3 text-primary" />}
                      {activity.type === 'task' && <CheckCircle className="h-3 w-3 text-success" />}
                      {activity.type === 'alert' && <Bell className="h-3 w-3 text-warning" />}
                    </div>
                    <div className="flex-1">
                      <p className="text-sm">{activity.description}</p>
                      <p className="text-xs text-muted-foreground">{activity.time}</p>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>

          {/* Right Column - Main Tabs */}
          <div className="lg:col-span-2">
            <Tabs defaultValue="overview" className="space-y-4">
              <TabsList className="grid w-full grid-cols-4">
                <TabsTrigger value="overview">Overview</TabsTrigger>
                <TabsTrigger value="tasks">Tasks</TabsTrigger>
                <TabsTrigger value="reports">Reports</TabsTrigger>
                <TabsTrigger value="stats">Statistics</TabsTrigger>
              </TabsList>

              <TabsContent value="overview" className="space-y-4">
                <Card>
                  <CardHeader>
                    <CardTitle>Quick Actions</CardTitle>
                  </CardHeader>
                  <CardContent className="grid grid-cols-2 gap-4">
                    <Button onClick={() => setShowSurveyForm(true)} className="h-auto p-4 flex-col gap-2">
                      <Plus className="h-6 w-6" />
                      <span>Daily Survey</span>
                    </Button>
                    <Button variant="outline" className="h-auto p-4 flex-col gap-2">
                      <MapPin className="h-6 w-6" />
                      <span>Set Location</span>
                    </Button>
                    <Button variant="outline" className="h-auto p-4 flex-col gap-2">
                      <FileText className="h-6 w-6" />
                      <span>View Reports</span>
                    </Button>
                    <Button variant="outline" className="h-auto p-4 flex-col gap-2">
                      <BarChart3 className="h-6 w-6" />
                      <span>Analytics</span>
                    </Button>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="tasks">
                <ASHATasksPanel />
              </TabsContent>

              <TabsContent value="reports">
                <ASHALogsHistory />
              </TabsContent>

              <TabsContent value="stats">
                <ASHAStatistics />
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ASHADashboard;